// Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
// SPDX-License-Identifier: MIT
//
// Client-side exam mode for t-doc pages served by the exam server
// (see ../exam-server in the t-doc directory).
//
// This module is loaded on exam pages via page metadata:
//
//   ```{metadata}
//   scripts:
//     - src: exam.js           # relative to _static/
//       type: module
//   styles:
//     - exam.css
//   ```
//
// It only activates when the page is served from the exam server (URL of the
// form /exam/<id>/page/...). On the public site (GitHub Pages) it shows a
// small "training mode" banner and does nothing else, so exam pages can be
// used for practice.
//
// Lifecycle (this.phase):
//   gate -> active <-> locked -> resume -> active -> submitted
// - gate: opaque overlay shown on load; the student clicks to enter
//   fullscreen and start (the click is required by the Fullscreen API).
// - active: the exam is monitored (focus loss / fullscreen exit => lock).
// - locked: opaque overlay; the teacher unlocks from the dashboard.
// - resume: unlocked; the student clicks to re-enter fullscreen and resume.
// - submitted: final overlay, page is over.
//
// IMPORTANT: this module is fully self-contained. It does NOT import any
// t-doc module, so the exam bar, the autosave and the focus lock keep working
// even if t-doc's own JavaScript fails to load. It reads student answers
// through two stable, documented t-doc interfaces:
//   - <tdoc-exec editor="ID"> elements and their `runner.text` property
//     (t-doc >= 0.81, see https://common.t-doc.org/reference/exec.html);
//   - the localStorage entries `tdoc:editor:<ID>` as a fallback.

'use strict';

const SAVE_MS = 30000;   // Autosave interval (only sends when answers changed)
const POLL_MS = 6000;    // Status poll interval

// ------------------------------------------------------------- tiny helpers

const qs = (el, sel) => el.querySelector(sel);
const qsa = (el, sel) => el.querySelectorAll(sel);

function elmt(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
}

const domLoaded = new Promise(resolve => {
    if (document.readyState !== 'loading') {
        resolve();
    } else {
        document.addEventListener('DOMContentLoaded', resolve);
    }
});

// ---------------------------------------------------------------- context

const m = location.pathname.match(/^(.*\/exam\/[^/]+)\/page\//);
const apiBase = m ? `${m[1]}/api` : undefined;

// ------------------------------------------------------- answer collection

// Strip the trailing "headerlink" anchor from a heading.
function headingText(h) {
    const c = h.cloneNode(true);
    for (const a of qsa(c, 'a.headerlink')) a.remove();
    return c.textContent.trim();
}

// Return the text of the heading of the section containing an element.
function labelFor(el) {
    const section = el.closest('section');
    if (!section) return undefined;
    const h = qs(section, 'h1, h2, h3, h4, h5, h6');
    return h ? headingText(h) : undefined;
}

// Collect all answers on the page.
function collect() {
    const answers = {editors: {}, fields: {}, labels: {}};

    // {exec} blocks with an :editor: ID. `runner.text` is the documented
    // accessor (t-doc >= 0.81); fall back to the editor's localStorage entry,
    // then to the block's original content.
    for (const el of qsa(document, 'tdoc-exec[editor]')) {
        const id = el.getAttribute('editor');
        if (!id || id === 'none') continue;
        let text;
        try {
            text = el.runner?.text;
        } catch (e) { /* fall through */ }
        if (text === undefined) {
            text = localStorage.getItem(`tdoc:editor:${id}`)
                   ?? qs(el, 'pre')?.textContent ?? '';
        }
        answers.editors[id] = text;
        const label = labelFor(el);
        if (label) answers.labels[id] = label;
    }

    // Explicit exam fields: any element with a data-exam-id attribute
    // (textarea, input, select, radio/checkbox groups).
    for (const el of qsa(document, '[data-exam-id]')) {
        const id = el.dataset.examId;
        if (el.type === 'radio') {
            if (!(id in answers.fields)) answers.fields[id] = null;
            if (el.checked) answers.fields[id] = el.value;
        } else if (el.type === 'checkbox') {
            if (!Array.isArray(answers.fields[id])) answers.fields[id] = [];
            if (el.checked) answers.fields[id].push(el.value);
        } else {
            answers.fields[id] = el.value;
        }
        if (!(id in answers.labels)) {
            const label = labelFor(el);
            if (label) answers.labels[id] = label;
        }
    }

    // {quiz} fields, identified by their order on the page.
    let qi = 0;
    for (const quiz of qsa(document, 'tdoc-quiz')) {
        let fi = 0;
        for (const f of qsa(quiz, '.tdoc-quiz-field')) {
            const id = `quiz:${qi}:${fi++}`;
            answers.fields[id] = f.value;
            const label = labelFor(quiz);
            if (label) answers.labels[id] = label;
        }
        ++qi;
    }
    return answers;
}

// Return the labels (or ids) of unanswered questions, for the submit dialog.
function emptyQuestions() {
    const a = collect();
    const out = [];
    for (const [id, code] of Object.entries(a.editors)) {
        if (!code.trim()) out.push(a.labels[id] ?? `Code [${id}]`);
    }
    for (const [id, v] of Object.entries(a.fields)) {
        const empty = v === null || v === ''
                      || (Array.isArray(v) && v.length === 0)
                      || (typeof v === 'string' && !v.trim());
        if (empty) out.push(a.labels[id] ?? id);
    }
    return [...new Set(out)];
}

// -------------------------------------------------------------- exam mode

class Exam {
    constructor() {
        this.phase = 'gate';
        this.unloading = false;
        // Signature of the last answers we sent, to skip unchanged autosaves.
        this.lastSavedSig = null;
        // Degrade gracefully on browsers without the Fullscreen API.
        this.fsRequired = !!document.documentElement.requestFullscreen;
    }

    async start() {
        await domLoaded;
        this.addBar();
        this.addOverlay();
        this.showGate();

        window.addEventListener('blur', () => this.onBlur());
        window.addEventListener('beforeunload', () => {
            this.unloading = true;
            if (this.phase !== 'submitted') this.beacon('save', collect());
        });
        window.addEventListener('pagehide', () => { this.unloading = true; });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden' && !this.unloading) {
                this.reportFocusLoss('visibility-hidden');
            }
        });
        document.addEventListener('fullscreenchange', () => {
            if (this.fsRequired && !document.fullscreenElement) {
                this.reportFocusLoss('fullscreen-exit');
            }
        });

        this.saveTimer = setInterval(() => this.save(), SAVE_MS);
        this.pollTimer = setInterval(() => this.poll(), POLL_MS);
        this.tickTimer = setInterval(() => this.tick(), 1000);
        await this.poll();
        await this.save();
    }

    // Enter fullscreen. Must be called from a user gesture (click). If the
    // browser refuses, degrade: don't require fullscreen anymore, otherwise
    // the student would be locked in a loop.
    async enterFullscreen() {
        if (!this.fsRequired || document.fullscreenElement) return;
        try {
            await document.documentElement.requestFullscreen();
        } catch (e) {
            console.warn('[exam] fullscreen refused, degrading:', e);
            this.fsRequired = false;
        }
    }

    // --- server communication

    async api(path, body) {
        const resp = await fetch(`${apiBase}/${path}`, body === undefined ? {
            cache: 'no-store',
        } : {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
        if (!resp.ok) throw new Error(`${path}: HTTP ${resp.status}`);
        return await resp.json();
    }

    // Fire-and-forget send that survives page unload.
    beacon(path, data) {
        try {
            navigator.sendBeacon(`${apiBase}/${path}`,
                                 new Blob([JSON.stringify(data)],
                                          {type: 'application/json'}));
        } catch (e) { /* best effort */ }
    }

    async save() {
        if (this.phase === 'submitted') return;
        const answers = collect();
        const sig = JSON.stringify(answers);
        // Nothing changed since the last successful save: skip the request.
        // (Unload, focus-loss and submit send unconditionally, as a safety net.)
        if (sig === this.lastSavedSig) return;
        this.setSaveState("Sauvegarde…");
        try {
            await this.api('save', answers);
            this.lastSavedSig = sig;
            const t = new Date().toLocaleTimeString('fr-CH');
            this.setSaveState(`Sauvegardé à ${t}`);
        } catch (e) {
            this.setSaveState("Hors ligne — nouvelle tentative…", true);
        }
    }

    async poll() {
        let st;
        try {
            st = await this.api('status');
        } catch (e) {
            this.setSaveState("Hors ligne — nouvelle tentative…", true);
            return;
        }
        if (st.name) qs(this.bar, '.tdoc-exam-name').textContent = st.name;
        this.setRemaining(st.remaining);   // server-authoritative countdown
        if (st.submitted) {
            if (this.phase !== 'submitted') this.onSubmitted();
            return;
        }
        if (st.locked && ['gate', 'active', 'resume'].includes(this.phase)) {
            this.showLock();
        } else if (!st.locked && this.phase === 'locked') {
            this.showResume();
        }
    }

    // --- countdown timer (only when the exam has a time limit)

    // Resync the countdown from the server's authoritative "remaining" (in
    // seconds). null/undefined means the exam has no time limit.
    setRemaining(sec) {
        if (sec === null || sec === undefined) {
            this.remainingBase = null;
            const el = qs(this.bar, '.tdoc-exam-timer');
            if (el) el.textContent = '';
            return;
        }
        this.remainingBase = sec;
        this.remainingAt = Date.now();
        this.renderTimer(sec);
    }

    renderTimer(sec) {
        const el = qs(this.bar, '.tdoc-exam-timer');
        if (!el) return;
        const pad = n => String(n).padStart(2, '0');
        const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
        el.textContent = '⏱ ' +
            (h ? `${h}:${pad(m)}:${pad(sec % 60)}` : `${m}:${pad(sec % 60)}`);
        el.classList.toggle('warn', sec <= 300);   // last 5 minutes
    }

    // Called every second: interpolate the countdown between server polls and
    // auto-submit when it reaches zero.
    tick() {
        if (this.remainingBase === null || this.remainingBase === undefined) {
            return;
        }
        if (this.phase === 'submitted') return;
        const left = this.remainingBase
            - Math.floor((Date.now() - this.remainingAt) / 1000);
        this.renderTimer(Math.max(0, left));
        if (left <= 0 && !this.timeUp) {
            this.timeUp = true;
            this.onTimeUp();
        }
    }

    async onTimeUp() {
        this.phase = 'submitted';   // set first: stops ticking and re-entry
        this.renderTimer(0);
        clearInterval(this.saveTimer);
        try {
            await this.api('submit', {answers: collect()});
        } catch (e) { /* the server enforces the deadline anyway */ }
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
        this.setOverlay(
            "Temps écoulé",
            "Le temps imparti est écoulé. Vos réponses ont été enregistrées "
            + "automatiquement. Vous pouvez fermer cette page.",
            'submitted');
    }

    // --- focus handling

    onBlur() {
        // Focus moving into an iframe on the same page keeps document focus.
        setTimeout(() => {
            if (document.hasFocus()) return;
            if (document.visibilityState === 'hidden') return;  // handled
            this.reportFocusLoss('window-blur');
        }, 0);
    }

    reportFocusLoss(detail) {
        // Only monitor while the exam is actively being taken.
        if (this.phase !== 'active' || this.unloading) return;
        this.showLock();
        this.beacon('event', {type: 'focus-lost', detail});
        this.beacon('save', collect());
    }

    // --- UI

    addBar() {
        this.bar = elmt(`
<div class="tdoc-exam-bar">
<span class="tdoc-exam-title">Examen</span>
<span class="tdoc-exam-name"></span>
<span class="tdoc-exam-timer"></span>
<span class="tdoc-exam-save"></span>
<button type="button" class="tdoc-exam-submit">Rendre l'examen</button>
</div>`);
        document.body.prepend(this.bar);
        document.body.classList.add('tdoc-exam-active');
        qs(this.bar, '.tdoc-exam-submit')
            .addEventListener('click', () => this.confirmSubmit());
    }

    addOverlay() {
        this.overlay = elmt(`
<div class="tdoc-exam-overlay hidden">
<div class="tdoc-exam-overlay-box">
<h2></h2><p class="msg"></p>
<p><button type="button" class="action hidden"></button></p>
</div></div>`);
        document.body.appendChild(this.overlay);
    }

    // Show the main overlay. kind styles it (gate|locked|resume|submitted);
    // all kinds are opaque so the exam content is hidden while not active.
    setOverlay(title, message, kind, button, onClick) {
        qs(this.overlay, 'h2').textContent = title;
        qs(this.overlay, '.msg').textContent = message;
        const btn = qs(this.overlay, 'button.action');
        btn.classList.toggle('hidden', !button);
        if (button) {
            btn.textContent = button;
            btn.onclick = onClick;
        }
        this.overlay.className = `tdoc-exam-overlay tdoc-exam-${kind}`;
    }

    hideOverlay() {
        this.overlay.className = 'tdoc-exam-overlay hidden';
    }

    setSaveState(text, warn = false) {
        const el = qs(this.bar, '.tdoc-exam-save');
        el.textContent = text;
        el.classList.toggle('warn', warn);
    }

    showGate() {
        this.phase = 'gate';
        this.setOverlay(
            "Prêt·e à commencer ?",
            "L'examen se déroule en plein écran. Ne quittez pas la page "
            + "(changement d'onglet, autre fenêtre, sortie du plein écran), "
            + "sinon l'examen sera bloqué.",
            'gate', "Commencer en plein écran",
            async () => {
                await this.enterFullscreen();
                this.phase = 'active';
                this.hideOverlay();
                this.save();
            });
    }

    showLock() {
        this.phase = 'locked';
        this.setOverlay(
            "Examen bloqué",
            "Vous avez quitté la page de l'examen. "
            + "Appelez votre enseignant pour être débloqué·e.",
            'locked');
    }

    showResume() {
        this.phase = 'resume';
        this.setOverlay(
            "Examen débloqué",
            "Votre enseignant a débloqué votre examen. "
            + "Reprenez en plein écran.",
            'resume', "Reprendre en plein écran",
            async () => {
                await this.enterFullscreen();
                this.phase = 'active';
                this.hideOverlay();
            });
    }

    confirmSubmit() {
        if (this.phase === 'submitted') return;
        const empty = emptyQuestions();
        const warning = empty.length === 0 ? '' : `
<div class="tdoc-exam-warning">
<p>&#9888;&#65039; <b>Questions sans réponse :</b></p>
<ul>${empty.map(l => `<li>${l.replace(/</g, '&lt;')}</li>`).join('')}</ul>
</div>`;
        const modal = elmt(`
<div class="tdoc-exam-overlay tdoc-exam-confirm">
<div class="tdoc-exam-overlay-box">
<h2>Rendre l'examen ?</h2>
${warning}
<p>Vous ne pourrez plus modifier vos réponses.</p>
<p><button type="button" class="no">Retourner à l'examen</button>
<button type="button" class="yes${empty.length ? ' warn' : ''}">
${empty.length ? 'Rendre quand même' : "Oui, rendre l'examen"}</button></p>
</div></div>`);
        document.body.appendChild(modal);
        qs(modal, 'button.no').addEventListener('click', () => modal.remove());
        qs(modal, 'button.yes').addEventListener('click', async () => {
            modal.remove();
            await this.submit();
        });
    }

    async submit() {
        try {
            await this.api('submit', {answers: collect()});
        } catch (e) {
            this.setSaveState("Échec de la remise — réessayez", true);
            return;
        }
        this.onSubmitted();
    }

    onSubmitted() {
        this.phase = 'submitted';
        clearInterval(this.saveTimer);
        clearInterval(this.tickTimer);
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
        this.setOverlay(
            "Examen rendu",
            "Vos réponses ont été enregistrées. "
            + "Vous pouvez fermer cette page.",
            'submitted');
    }
}

// ------------------------------------------------------------------- main

if (apiBase) {
    new Exam().start();  // Background
} else {
    // Not served by the exam server: training mode.
    domLoaded.then(() => {
        const banner = elmt(`
<div class="tdoc-exam-training">Mode entraînement — cette page peut être
utilisée comme un exercice. En examen, les réponses seraient sauvegardées
automatiquement. <button type="button">OK</button></div>`);
        qs(banner, 'button').addEventListener('click', () => banner.remove());
        document.body.prepend(banner);
    });
}
