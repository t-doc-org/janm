// Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// Module de visualisation et d'exercices sur les algorithmes de tri.
//
// Utilisation dans une page MyST (HTML brut) :
//   <div class="tri-visu" data-algo="selection" data-liste="7 3 9 1 5"></div>
//   <div class="tri-exo"  data-algo="insertion" data-liste="7 3 9 1 5"></div>
//
// data-algo  : selection | insertion | fusion | rapide   (visu : "choix" = menu déroulant)
// data-liste : valeurs séparées par des espaces (facultatif, sinon liste aléatoire)
// data-taille: taille de la liste aléatoire (défaut 8)
// data-mode  : (exercice) complet = comparaisons + échanges (défaut) | echanges = échanges seulement

(function () {
  'use strict';

  const NOMS = {
    selection: 'Tri par sélection',
    insertion: 'Tri par insertion',
    fusion: 'Tri fusion',
    rapide: 'Tri rapide',
    lineaire: 'Recherche linéaire',
    dichotomie: 'Recherche dichotomique',
  };
  const RECHERCHES = { lineaire: true, dichotomie: true };

  // ------------------------------------------------------------------
  // Enregistreur d'étapes
  // ------------------------------------------------------------------
  class Trace {
    constructor(valeurs) {
      this.vals = valeurs.slice();
      this.n = valeurs.length;
      this.main = valeurs.map((_, i) => i);   // identifiants des éléments, par position
      this.aux = null;                        // ligne auxiliaire (tri fusion)
      this.trie = new Array(this.n).fill(0);  // 0 = non, 1 = partiellement, 2 = définitivement
      this.zone = null;                       // [lo, hi] zone active (les autres sont grisées)
      this.petits = null;                     // [lo, hi] éléments < pivot (tri rapide)
      this.moities = null;                    // [lo, mid, hi] (tri fusion)
      this.marques = {};                      // id -> 'min' | 'cle' | 'pivot'
      this.appels = [];                       // appels récursifs : {lo, hi, d, etat, label}
      this.pile = [];                         // indices (dans appels) des appels en cours
      this.comp = 0;
      this.ech = 0;
      this.frames = [];
      this.info('Liste de départ.');
    }
    v(i) { return this.vals[this.main[i]]; }
    // Début d'un appel récursif : l'appel précédent passe en attente
    appeler(lo, hi, label) {
      if (this.pile.length) this.appels[this.pile[this.pile.length - 1]].etat = 'attente';
      this.appels.push({ lo: lo, hi: hi, d: this.pile.length, etat: 'actif', label: label });
      this.pile.push(this.appels.length - 1);
    }
    // Fin de l'appel en cours : l'appel qui l'avait lancé reprend
    retour() {
      const id = this.pile.pop();
      this.appels[id].etat = 'fini';
      if (this.pile.length) this.appels[this.pile[this.pile.length - 1]].etat = 'actif';
    }
    snap(texte, action, hl) {
      this.frames.push({
        appels: this.appels.map(a => a.etat),
        pile: this.pile.slice(),
        main: this.main.slice(),
        aux: this.aux ? this.aux.slice() : null,
        trie: this.trie.slice(),
        zone: this.zone ? this.zone.slice() : null,
        petits: this.petits ? this.petits.slice() : null,
        moities: this.moities ? this.moities.slice() : null,
        marques: Object.assign({}, this.marques),
        hl: hl || {},
        comp: this.comp,
        ech: this.ech,
        texte: texte,
        action: action || null,
      });
    }
    info(texte) { this.snap(texte, null, {}); }
    comparer(i, j, texte) {
      this.comp++;
      this.snap(texte, { type: 'comparer', a: i, b: j },
        { [this.main[i]]: 'compare', [this.main[j]]: 'compare' });
    }
    comparerSeul(i, texte) {
      this.comp++;
      this.snap(texte, { type: 'comparer', a: i }, { [this.main[i]]: 'compare' });
    }
    echanger(i, j, texte) {
      this.ech++;
      const t = this.main[i]; this.main[i] = this.main[j]; this.main[j] = t;
      this.snap(texte, { type: 'echanger', a: i, b: j },
        { [this.main[i]]: 'swap', [this.main[j]]: 'swap' });
    }
    placer(i, k, texte) {
      this.ech++;
      const id = this.main[i];
      this.aux[k] = id; this.main[i] = null;
      this.snap(texte, { type: 'placer', a: i }, { [id]: 'swap' });
    }
  }

  function rel(a, b) { return a < b ? '<' : (a > b ? '>' : '='); }

  // ------------------------------------------------------------------
  // Les algorithmes
  // ------------------------------------------------------------------
  function triSelection(valeurs) {
    const t = new Trace(valeurs), n = t.n;
    for (let i = 0; i < n - 1; i++) {
      let m = i;
      t.zone = [i, n - 1];
      t.marques = { [t.main[m]]: 'min' };
      t.info(`On cherche le minimum de la partie non triée (positions ${i} à ${n - 1}). Minimum provisoire : ${t.v(m)}.`);
      for (let j = i + 1; j < n; j++) {
        const a = t.v(j), b = t.v(m);
        if (a < b) {
          t.comparer(j, m, `On compare ${a} et ${b} : ${a} < ${b}, ${a} devient le nouveau minimum.`);
          m = j;
          t.marques = { [t.main[m]]: 'min' };
          t.frames[t.frames.length - 1].marques = Object.assign({}, t.marques);
        } else {
          t.comparer(j, m, `On compare ${a} et ${b} : ${a} > ${b}, le minimum reste ${b}.`);
        }
      }
      if (m !== i) {
        const vi = t.v(i), vm = t.v(m);
        t.marques = {};
        t.echanger(i, m, `On échange le minimum ${vm} avec ${vi} (position ${i}).`);
      } else {
        t.marques = {};
        t.info(`Le minimum ${t.v(i)} est déjà à la position ${i} : pas d'échange.`);
      }
      t.trie[i] = 2;
      t.info(`${t.v(i)} est à sa place définitive.`);
    }
    t.trie[n - 1] = 2;
    t.zone = null;
    t.info('Le dernier élément est forcément à sa place : la liste est triée !');
    return t;
  }
  function triInsertion(valeurs) {
    const t = new Trace(valeurs), n = t.n;
    t.trie[0] = 1;
    t.info(`Le premier élément, ${t.v(0)}, forme à lui seul une partie triée.`);
    for (let i = 1; i < n; i++) {
      let j = i;
      t.marques = { [t.main[j]]: 'cle' };
      t.info(`On insère ${t.v(j)} dans la partie triée (positions 0 à ${i - 1}).`);
      while (j > 0) {
        const a = t.v(j - 1), b = t.v(j);
        if (a > b) {
          t.comparer(j - 1, j, `On compare ${a} et ${b} : ${a} > ${b}.`);
          t.echanger(j - 1, j, `On échange ${a} et ${b} : ${b} recule d'une position.`);
          j--;
        } else {
          t.comparer(j - 1, j, `On compare ${a} et ${b} : ${a} < ${b}, ${b} est à sa place dans la partie triée.`);
          break;
        }
      }
      if (j === 0) t.info(`${t.v(0)} est arrivé au début de la liste.`);
      for (let k = 0; k <= i; k++) t.trie[k] = 1;
      t.marques = {};
    }
    t.trie.fill(2);
    t.info('Tous les éléments ont été insérés : la liste est triée !');
    return t;
  }

  // Affichage d'une portion de liste, abrégée si elle est longue
  function texteListe(t, lo, hi) {
    const r = [];
    for (let k = lo; k <= hi; k++) r.push(t.v(k));
    if (r.length > 8) return '[' + r.slice(0, 6).join(', ') + ', … (' + r.length + ' éléments)]';
    return '[' + r.join(', ') + ']';
  }

  // Tri rapide : version en place avec indices, pivot = dernier élément.
  // Correspond au code Python tri_rapide(liste, debut, fin) / partition(liste, debut, fin).
  function triRapide(valeurs) {
    const t = new Trace(valeurs);
    function rapide(lo, hi) {
      const lab = `tri_rapide(liste, ${lo}, ${hi})`;
      t.appeler(lo, hi, lab);
      t.zone = [lo, hi];
      t.petits = null;
      if (lo >= hi) {
        if (lo === hi) {
          t.trie[lo] = 2;
          t.info(`Appel de ${lab} : la zone ne contient qu'un élément (${t.v(lo)}), il n'y a rien à faire.`);
        } else {
          t.info(`Appel de ${lab} : la zone est vide, il n'y a rien à faire.`);
        }
        t.retour();
        return;
      }
      const pid = t.main[hi], p = t.v(hi);
      t.marques = { [pid]: 'pivot' };
      t.info(`Appel de ${lab} : on partitionne la zone des positions ${lo} à ${hi}. Le pivot est le dernier élément : ${p}.`);
      let i = lo;
      for (let j = lo; j < hi; j++) {
        const a = t.v(j);
        if (a < p) {
          t.comparer(j, hi, `On compare ${a} au pivot ${p} : ${a} < ${p}, il va dans la zone des petits.`);
          if (i !== j) {
            const vi = t.v(i);
            t.echanger(i, j, `On échange ${a} et ${vi} pour ranger ${a} avec les petits.`);
          }
          i++;
          t.petits = [lo, i - 1];
          if (i - 1 === j) t.info(`${a} est déjà au bon endroit : la zone des petits s'agrandit.`);
        } else {
          t.comparer(j, hi, `On compare ${a} au pivot ${p} : ${a} > ${p}, il reste à droite.`);
        }
      }
      if (i !== hi) {
        const vi = t.v(i);
        t.echanger(i, hi, `On place le pivot ${p} juste après les petits, en l'échangeant avec ${vi}.`);
      }
      t.marques = {};
      t.petits = null;
      t.trie[i] = 2;
      t.info(`Le pivot ${p} est à sa place définitive (position ${i}). Il reste à trier la partie de gauche (positions ${lo} à ${i - 1}) puis celle de droite (positions ${i + 1} à ${hi}) : deux appels récursifs.`);
      rapide(lo, i - 1);
      rapide(i + 1, hi);
      t.zone = [lo, hi];
      t.info(`Retour dans ${lab} : ses deux appels récursifs sont terminés, les positions ${lo} à ${hi} sont triées. ${lab} se termine.`);
      t.retour();
    }
    rapide(0, t.n - 1);
    t.zone = null;
    t.trie.fill(2);
    t.info('Le premier appel est terminé : la liste est triée !');
    return t;
  }

  // Tri fusion : version qui coupe la liste en deux (milieu = len(liste) // 2),
  // trie chaque moitié par un appel récursif, puis fusionne les deux moitiés triées.
  function triFusion(valeurs) {
    const t = new Trace(valeurs);
    function fusion(lo, hi) {
      const lab = `tri_fusion(${texteListe(t, lo, hi)})`;
      t.appeler(lo, hi, lab);
      t.zone = [lo, hi];
      t.moities = null;
      if (lo >= hi) {
        t.info(`Appel de ${lab} : un seul élément, la liste est déjà triée. On la retourne telle quelle.`);
        t.retour();
        return;
      }
      const mid = lo + Math.floor((hi - lo + 1) / 2) - 1;
      t.moities = [lo, mid, hi];
      t.info(`Appel de ${lab} : on coupe la liste en deux, ${texteListe(t, lo, mid)} et ${texteListe(t, mid + 1, hi)}, et on trie chaque moitié par un appel récursif.`);
      fusion(lo, mid);
      fusion(mid + 1, hi);
      t.zone = [lo, hi]; t.moities = [lo, mid, hi];
      t.aux = new Array(t.n).fill(null);
      t.info(`Retour dans ${lab} : les deux moitiés ${texteListe(t, lo, mid)} et ${texteListe(t, mid + 1, hi)} sont triées. On les fusionne.`);
      let i = lo, j = mid + 1, k = lo;
      while (i <= mid && j <= hi) {
        const a = t.v(i), b = t.v(j);
        if (a <= b) {
          t.comparer(i, j, `On compare les têtes des deux moitiés : ${a} ${rel(a, b)} ${b}.`);
          t.placer(i, k, `On place ${a}, le plus petit, dans la liste fusionnée.`);
          i++;
        } else {
          t.comparer(i, j, `On compare les têtes des deux moitiés : ${a} ${rel(a, b)} ${b}.`);
          t.placer(j, k, `On place ${b}, le plus petit, dans la liste fusionnée.`);
          j++;
        }
        k++;
      }
      while (i <= mid) { t.placer(i, k, `La moitié droite est vide : on place ${t.v(i)}.`); i++; k++; }
      while (j <= hi) { t.placer(j, k, `La moitié gauche est vide : on place ${t.v(j)}.`); j++; k++; }
      for (let q = lo; q <= hi; q++) { t.main[q] = t.aux[q]; }
      t.aux = null;
      t.moities = null;
      t.info(`${lab} retourne la liste fusionnée ${texteListe(t, lo, hi)}.`);
      t.retour();
    }
    fusion(0, t.n - 1);
    t.zone = null;
    t.trie.fill(2);
    t.info('Le premier appel a retourné son résultat : la liste est triée !');
    return t;
  }

  // ------------------------------------------------------------------
  // Algorithmes de recherche (une seule sorte d'opération : comparer un
  // élément à la valeur cherchée)
  // ------------------------------------------------------------------
  function rechercheLineaire(valeurs, cible) {
    const t = new Trace(valeurs), n = t.n;
    t.cible = cible;
    t.frames[0].texte = `Liste de départ. Valeur cherchée : ${cible}.`;
    t.info(`On parcourt la liste depuis le début, en comparant chaque élément à ${cible}.`);
    for (let i = 0; i < n; i++) {
      t.zone = [i, n - 1];
      const v = t.v(i);
      if (v === cible) {
        t.trie[i] = 2;
        t.comparerSeul(i, `On compare ${v} à ${cible} : égalité !`);
        t.info(`${cible} est trouvé en position ${i}, après ${t.comp} comparaison${t.comp > 1 ? 's' : ''}. La fonction retourne ${i}.`);
        return t;
      }
      t.comparerSeul(i, `On compare ${v} à ${cible} : ${v} ≠ ${cible}, on passe à l'élément suivant.`);
    }
    t.zone = [n, n - 1];
    t.info(`Tous les éléments ont été comparés : ${cible} n'est pas dans la liste (${t.comp} comparaisons). La fonction retourne -1.`);
    return t;
  }

  function rechercheDichotomique(valeurs, cible) {
    const t = new Trace(valeurs.slice().sort((a, b) => a - b)), n = t.n;
    t.cible = cible;
    t.frames[0].texte = `Liste de départ (triée). Valeur cherchée : ${cible}.`;
    let debut = 0, fin = n - 1;
    t.zone = [debut, fin];
    t.info(`La liste est triée. On cherche ${cible} entre les positions ${debut} et ${fin}.`);
    while (debut <= fin) {
      const m = Math.floor((debut + fin) / 2), v = t.v(m);
      t.zone = [debut, fin];
      const quoi = `Le milieu de la zone (positions ${debut} à ${fin}) est la position ${m}. On compare ${v} à ${cible}`;
      if (v === cible) {
        t.trie[m] = 2;
        t.comparerSeul(m, `${quoi} : égalité !`);
        t.info(`${cible} est trouvé en position ${m}, après ${t.comp} comparaison${t.comp > 1 ? 's' : ''}. La fonction retourne ${m}.`);
        return t;
      }
      if (v < cible) {
        t.comparerSeul(m, `${quoi} : ${v} < ${cible}, donc ${cible} ne peut être qu'à droite. On élimine ${v} et tout ce qui se trouve à sa gauche.`);
        debut = m + 1;
      } else {
        t.comparerSeul(m, `${quoi} : ${v} > ${cible}, donc ${cible} ne peut être qu'à gauche. On élimine ${v} et tout ce qui se trouve à sa droite.`);
        fin = m - 1;
      }
      if (debut <= fin) {
        t.zone = [debut, fin];
        t.info(`Il reste à chercher entre les positions ${debut} et ${fin}.`);
      }
    }
    t.zone = [n, n - 1];
    t.info(`La zone de recherche est vide : ${cible} n'est pas dans la liste (${t.comp} comparaison${t.comp > 1 ? 's' : ''}). La fonction retourne -1.`);
    return t;
  }

  const ALGOS = { selection: triSelection, insertion: triInsertion, fusion: triFusion, rapide: triRapide,
    lineaire: rechercheLineaire, dichotomie: rechercheDichotomique };

  // ------------------------------------------------------------------
  // Listes
  // ------------------------------------------------------------------
  function listeAleatoire(n, type) {
    const max = Math.max(30, n * 3);
    const pool = [];
    for (let v = 1; v <= max; v++) pool.push(v);
    for (let k = pool.length - 1; k > 0; k--) {
      const r = Math.floor(Math.random() * (k + 1));
      [pool[k], pool[r]] = [pool[r], pool[k]];
    }
    const l = pool.slice(0, n);
    if (type === 'triee') l.sort((a, b) => a - b);
    else if (type === 'inverse') l.sort((a, b) => b - a);
    else if (type === 'presque' && n >= 2) {
      l.sort((a, b) => a - b);
      for (let s = 0; s < Math.max(1, Math.floor(n / 8)); s++) {
        const k = Math.floor(Math.random() * (n - 1));
        [l[k], l[k + 1]] = [l[k + 1], l[k]];
      }
    }
    return l;
  }

  // Choisit une valeur cherchée : un élément de la liste, ou une valeur absente
  function choisirCible(liste, presente) {
    if (presente) return liste[Math.floor(Math.random() * liste.length)];
    const max = Math.max(...liste) + 5;
    let c;
    do { c = 1 + Math.floor(Math.random() * max); } while (liste.includes(c));
    return c;
  }

  function lireListe(el) {
    const s = (el.dataset.liste || '').trim();
    if (!s) return null;
    return s.split(/[\s,;]+/).map(Number).filter(x => !isNaN(x));
  }

  // Icônes SVG (24 x 24, trait = couleur du texte)
  const ICONES = {
    debut: ['<path d="M6 5v14"/><path d="M18 5 8 12l10 7z"/>', true],
    precedent: ['<path d="M16 5 7 12l9 7z"/>', true],
    lecture: ['<path d="M8 5l11 7-11 7z"/>', true],
    pause: ['<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>', true],
    suivant: ['<path d="M8 5l9 7-9 7z"/>', true],
    fin: ['<path d="M6 5l10 7-10 7z"/><path d="M18 5v14"/>', true],
    ok: ['<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16.5 9.5"/>', false],
    erreur: ['<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>', false],
    indice: ['<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/>', false],
    info: ['<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/>', false],
    bravo: ['<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5.5a2.5 2.5 0 0 0 2.6 3.6M16 6h2.5a2.5 2.5 0 0 1-2.6 3.6M12 13v4M9 20h6M10 17h4v3h-4z"/>', false],
  };
  function icone(nom) {
    const [contenu, plein] = ICONES[nom];
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'tri-icone' + (plein ? ' tri-icone-pleine' : ''));
    svg.innerHTML = contenu;
    return svg;
  }

  function h(tag, cls, txt) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  }

  // ------------------------------------------------------------------
  // Scène : affichage des barres
  // ------------------------------------------------------------------
  class Scene {
    constructor(parent, onClic) {
      this.root = h('div', 'tri-scene');
      parent.appendChild(this.root);
      this.pileEl = h('div', 'tri-pile');
      parent.appendChild(this.pileEl);
      this.onClic = onClic;
      this.bars = [];
    }
    init(trace) {
      this.trace = trace;
      this.root.innerHTML = '';
      this.bars = [];
      const n = trace.n;
      this.max = Math.max(...trace.vals);
      this.avecAux = trace.frames.some(f => f.aux);
      this.H = n > 16 ? 150 : 170;
      this.labels = n <= 16;
      let hauteurTotale = this.avecAux ? 2 * this.H + 40 : this.H + 22;
      this.root.classList.toggle('tri-sans-valeurs', !this.labels);
      // indices
      const idx = h('div', 'tri-indices');
      idx.style.top = (this.H + 2) + 'px';
      if (this.labels) {
        for (let i = 0; i < n; i++) {
          const s = h('span', '', String(i));
          s.style.left = (i * 100 / n) + '%';
          s.style.width = (100 / n) + '%';
          idx.appendChild(s);
        }
      }
      this.root.appendChild(idx);
      if (this.avecAux) {
        const fond = h('div', 'tri-aux-fond');
        fond.style.top = (this.H + 26) + 'px';
        fond.style.height = (this.H - 6) + 'px';
        fond.appendChild(h('span', '', 'liste fusionnée'));
        this.fondAux = fond;
        this.root.appendChild(fond);
      }
      for (let id = 0; id < n; id++) {
        const b = h('div', 'tri-barre');
        const hauteur = Math.max(10, Math.round((this.H - 26) * trace.vals[id] / this.max));
        b.style.height = hauteur + 'px';
        b.style.width = 'calc(' + (100 / n) + '% - ' + (n > 16 ? 2 : 6) + 'px)';
        b.dataset.id = id;
        b._h = hauteur;
        if (this.labels) b.appendChild(h('span', 'tri-val', String(trace.vals[id])));
        b.addEventListener('click', () => this.onClic && this.onClic(id));
        this.root.appendChild(b);
        this.bars.push(b);
      }
      // Arbre des appels récursifs
      this.crochets = [];
      this.avecAppels = trace.appels.length > 0;
      this.pileEl.style.display = this.avecAppels ? '' : 'none';
      if (this.avecAppels) {
        const prof = Math.max(...trace.appels.map(a => a.d)) + 1;
        const ligne = Math.max(6, Math.min(16, Math.floor(150 / prof)));
        const haut = hauteurTotale + 4;
        const titre = h('div', 'tri-arbre-titre', 'Arbre des appels récursifs');
        titre.style.top = haut + 'px';
        this.root.appendChild(titre);
        for (const a of trace.appels) {
          if (a.lo > a.hi) { this.crochets.push(null); continue; }
          const c = h('div', 'tri-appel');
          c.style.left = 'calc(' + (a.lo * 100 / n) + '% + 2px)';
          c.style.width = 'calc(' + ((a.hi - a.lo + 1) * 100 / n) + '% - 4px)';
          c.style.top = (haut + 18 + a.d * ligne) + 'px';
          c.style.height = (ligne - 3) + 'px';
          c.title = a.label;
          this.root.appendChild(c);
          this.crochets.push(c);
        }
        hauteurTotale = haut + 18 + prof * ligne + 4;
      }
      this.root.style.height = hauteurTotale + 'px';
    }
    afficher(f, opts) {
      opts = opts || {};
      const n = this.trace.n;
      const pos = {};
      f.main.forEach((id, i) => { if (id !== null) pos[id] = ['m', i]; });
      if (f.aux) f.aux.forEach((id, k) => { if (id !== null) pos[id] = ['a', k]; });
      if (this.fondAux) {
        this.fondAux.style.display = f.aux ? 'block' : 'none';
        if (f.aux && f.moities) {
          const [lo, , hi] = f.moities;
          this.fondAux.style.left = (lo * 100 / n) + '%';
          this.fondAux.style.width = ((hi - lo + 1) * 100 / n) + '%';
        }
      }
      for (let id = 0; id < n; id++) {
        const b = this.bars[id], p = pos[id];
        if (!p) { b.style.display = 'none'; continue; }
        b.style.display = '';
        const i = p[1];
        b.style.left = 'calc(' + (i * 100 / n) + '% + ' + (n > 16 ? 1 : 3) + 'px)';
        b.style.top = (p[0] === 'm' ? this.H - b._h : 2 * this.H + 20 - b._h) + 'px';
        const c = ['tri-barre'];
        const st = f.hl[id] || f.marques[id];
        if (st) c.push('st-' + st);
        if (p[0] === 'm') {
          if (f.trie[i] === 2) c.push('st-trie');
          else if (f.trie[i] === 1) c.push('st-trie-part');
          if (f.petits && i >= f.petits[0] && i <= f.petits[1]) c.push('st-petit');
          if (f.moities) {
            if (i >= f.moities[0] && i <= f.moities[1]) c.push('st-gauche');
            else if (i > f.moities[1] && i <= f.moities[2]) c.push('st-droite');
          }
          if (f.zone && (i < f.zone[0] || i > f.zone[1]) && f.trie[i] !== 2) c.push('st-hors');
        }
        if (opts.selection && opts.selection.has(id)) c.push('st-choisi');
        if (opts.indice && opts.indice.has(id)) c.push('st-indice');
        b.className = c.join(' ');
      }
      if (this.avecAppels) this.afficherAppels(f);
    }
    afficherAppels(f) {
      const appels = this.trace.appels;
      this.crochets.forEach((c, k) => {
        if (!c) return;
        const etat = f.appels[k];
        if (etat === undefined) { c.style.display = 'none'; return; }
        c.style.display = '';
        c.className = 'tri-appel ap-' + etat;
      });
      this.pileEl.innerHTML = '';
      this.pileEl.appendChild(h('span', 'tri-pile-titre', 'Pile d\'appels :'));
      if (!f.pile.length) {
        this.pileEl.appendChild(h('span', 'tri-pile-vide', 'vide'));
        return;
      }
      f.pile.forEach((k, idx) => {
        if (idx > 0) this.pileEl.appendChild(h('span', 'tri-pile-fleche', '→'));
        const actif = idx === f.pile.length - 1;
        this.pileEl.appendChild(h('code', 'tri-pile-appel' + (actif ? ' ap-actif' : ' ap-attente'), appels[k].label));
      });
    }
  }

  function legende(algo) {
    if (RECHERCHES[algo]) {
      const l = h('div', 'tri-legende');
      for (const [c, t] of [['compare', 'élément comparé'], ['hors', 'éliminé'], ['trie', 'valeur trouvée']]) {
        const s = h('span', 'tri-leg');
        s.appendChild(h('i', 'st-' + c));
        s.appendChild(document.createTextNode(t));
        l.appendChild(s);
      }
      return l;
    }
    const items = [['compare', 'comparaison'], ['swap', algo === 'fusion' ? 'déplacement' : 'échange']];
    if (algo === 'selection') items.push(['min', 'minimum provisoire']);
    if (algo === 'insertion') items.push(['cle', 'élément à insérer'], ['trie-part', 'partie triée']);
    if (algo === 'rapide') items.push(['pivot', 'pivot'], ['petit', 'plus petit que le pivot']);
    if (algo === 'fusion') items.push(['gauche', 'moitié gauche'], ['droite', 'moitié droite']);
    items.push(['trie', 'à sa place définitive']);
    if (algo === 'fusion' || algo === 'rapide') {
      items.push(['ap-actif', 'appel en cours'], ['ap-attente', 'appel en attente'], ['ap-fini', 'appel terminé']);
    }
    const l = h('div', 'tri-legende');
    for (const [c, t] of items) {
      const s = h('span', 'tri-leg');
      s.appendChild(h('i', 'st-' + c));
      s.appendChild(document.createTextNode(t));
      l.appendChild(s);
    }
    return l;
  }

  function bouton(txt, titre, cb, nomIcone) {
    const b = h('button', 'tri-btn');
    if (nomIcone) b.appendChild(icone(nomIcone));
    if (txt) b.appendChild(document.createTextNode(txt));
    b.type = 'button';
    if (titre) b.title = titre;
    b.addEventListener('click', cb);
    return b;
  }

  function choixListe(n, type, avecType, tailles) {
    const box = h('span', 'tri-choix-liste');
    const sel = h('select', 'tri-select');
    tailles = (tailles || [5, 6, 8, 10, 12, 16, 24, 32]).slice();
    if (!tailles.includes(n)) { tailles.push(n); tailles.sort((a, b) => a - b); }
    for (const k of tailles) {
      const o = h('option', '', k + ' éléments'); o.value = k;
      if (k === n) o.selected = true;
      sel.appendChild(o);
    }
    box.appendChild(sel);
    let selType = null;
    if (avecType) {
      selType = h('select', 'tri-select');
      for (const [v, t] of [['aleatoire', 'aléatoire'], ['presque', 'presque triée'], ['inverse', 'triée à l\'envers'], ['triee', 'déjà triée']]) {
        const o = h('option', '', t); o.value = v;
        if (v === type) o.selected = true;
        selType.appendChild(o);
      }
      box.appendChild(selType);
    }
    return { box, sel, selType };
  }

  // ------------------------------------------------------------------
  // Widget de visualisation
  // ------------------------------------------------------------------
  class Visu {
    constructor(el) {
      this.el = el;
      this.algo = ALGOS[el.dataset.algo] ? el.dataset.algo : 'selection';
      this.avecChoix = !ALGOS[el.dataset.algo];
      this.recherche = !!RECHERCHES[this.algo];
      const typeInit = this.algo === 'dichotomie' ? 'triee' : 'aleatoire';
      this.liste = lireListe(el) || listeAleatoire(Number(el.dataset.taille) || (this.recherche ? 16 : 8), typeInit);
      if (this.algo === 'dichotomie') this.liste.sort((a, b) => a - b);
      this.cible = el.dataset.cherche ? Number(el.dataset.cherche) : choisirCible(this.liste, true);
      this.k = 0;
      this.timer = null;
      el.classList.add('tri-widget');
      const tete = h('div', 'tri-tete');
      if (this.avecChoix) {
        this.selAlgo = h('select', 'tri-select tri-select-algo');
        for (const a in ALGOS) {
          if (RECHERCHES[a]) continue;
          const o = h('option', '', NOMS[a]); o.value = a;
          this.selAlgo.appendChild(o);
        }
        this.selAlgo.addEventListener('change', () => { this.algo = this.selAlgo.value; this.reset(); });
        tete.appendChild(this.selAlgo);
      } else {
        this.titre = h('span', 'tri-titre', NOMS[this.algo]);
        tete.appendChild(this.titre);
      }
      this.compteurs = h('span', 'tri-compteurs');
      tete.appendChild(this.compteurs);
      el.appendChild(tete);
      if (this.recherche) {
        this.cibleEl = h('div', 'tri-cible');
        el.appendChild(this.cibleEl);
      }
      this.scene = new Scene(el, null);
      this.texte = h('div', 'tri-texte');
      el.appendChild(this.texte);
      const ctrl = h('div', 'tri-controles');
      ctrl.appendChild(bouton('', 'Début', () => { this.stop(); this.aller(0); }, 'debut'));
      ctrl.appendChild(bouton('', 'Étape précédente', () => { this.stop(); this.aller(this.k - 1); }, 'precedent'));
      this.btnPlay = bouton('Lecture', 'Lecture / pause', () => this.basculer(), 'lecture');
      this.btnPlay.classList.add('tri-btn-play');
      ctrl.appendChild(this.btnPlay);
      ctrl.appendChild(bouton('', 'Étape suivante', () => { this.stop(); this.aller(this.k + 1); }, 'suivant'));
      ctrl.appendChild(bouton('', 'Fin', () => { this.stop(); this.aller(this.trace.frames.length - 1); }, 'fin'));
      const vit = h('label', 'tri-vitesse', 'Vitesse ');
      this.vitesse = h('input');
      this.vitesse.type = 'range'; this.vitesse.min = 1; this.vitesse.max = 10; this.vitesse.value = 5;
      this.vitesse.addEventListener('input', () => this.majVitesse());
      vit.appendChild(this.vitesse);
      ctrl.appendChild(vit);
      el.appendChild(ctrl);
      const ctrl2 = h('div', 'tri-controles');
      const cl = choixListe(this.liste.length, 'aleatoire', !this.recherche,
        this.recherche ? [7, 15, 16, 31, 32, 63, 100] : null);
      this.selTaille = cl.sel; this.selType = cl.selType;
      ctrl2.appendChild(cl.box);
      if (this.recherche) {
        this.selPresence = h('select', 'tri-select');
        for (const [v, t] of [['oui', 'valeur présente'], ['non', 'valeur absente']]) {
          const o = h('option', '', t); o.value = v;
          this.selPresence.appendChild(o);
        }
        ctrl2.appendChild(this.selPresence);
      }
      ctrl2.appendChild(bouton('Nouvelle liste', 'Tirer une nouvelle liste', () => {
        if (this.recherche) {
          this.liste = listeAleatoire(Number(this.selTaille.value), typeInit);
          this.cible = choisirCible(this.liste, this.selPresence.value === 'oui');
        } else {
          this.liste = listeAleatoire(Number(this.selTaille.value), this.selType.value);
        }
        this.reset();
      }));
      el.appendChild(ctrl2);
      this.leg = legende(this.algo);
      el.appendChild(this.leg);
      this.majVitesse();
      this.reset();
    }
    reset() {
      this.stop();
      this.trace = ALGOS[this.algo](this.liste, this.cible);
      this.scene.init(this.trace);
      if (this.cibleEl) this.cibleEl.textContent = 'Valeur cherchée : ' + this.cible;
      const leg = legende(this.algo);
      this.el.replaceChild(leg, this.leg);
      this.leg = leg;
      this.k = 0;
      // affichage initial sans animation
      this.scene.root.classList.add('tri-sans-anim');
      this.aller(0);
      void this.scene.root.offsetHeight;
      this.scene.root.classList.remove('tri-sans-anim');
    }
    aller(k) {
      const nb = this.trace.frames.length;
      this.k = Math.max(0, Math.min(nb - 1, k));
      const f = this.trace.frames[this.k];
      this.scene.afficher(f);
      this.texte.textContent = f.texte;
      const motEch = this.algo === 'fusion' ? 'Déplacements' : 'Échanges';
      this.compteurs.textContent = this.recherche
        ? `Comparaisons : ${f.comp} · Étape ${this.k} / ${nb - 1}`
        : `Comparaisons : ${f.comp} · ${motEch} : ${f.ech} · Étape ${this.k} / ${nb - 1}`;
      if (this.k === nb - 1) this.stop();
    }
    majVitesse() {
      const v = Number(this.vitesse.value);
      this.delai = Math.round(1400 * Math.pow(0.68, v - 1));
      this.el.style.setProperty('--tri-duree', Math.min(450, Math.round(this.delai * 0.7)) + 'ms');
      if (this.timer) { this.stop(); this.lecture(); }
    }
    basculer() { if (this.timer) this.stop(); else this.lecture(); }
    lecture() {
      if (this.k >= this.trace.frames.length - 1) this.aller(0);
      this.majBoutonLecture(true);
      this.timer = setInterval(() => this.aller(this.k + 1), this.delai);
    }
    stop() {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
      if (this.btnPlay) this.majBoutonLecture(false);
    }
    majBoutonLecture(enLecture) {
      this.btnPlay.replaceChildren(icone(enLecture ? 'pause' : 'lecture'),
        document.createTextNode(enLecture ? 'Pause' : 'Lecture'));
    }
  }

  // ------------------------------------------------------------------
  // Widget d'exercice
  // ------------------------------------------------------------------
  class Exo {
    constructor(el) {
      this.el = el;
      this.algo = ALGOS[el.dataset.algo] ? el.dataset.algo : 'selection';
      this.complet = el.dataset.mode !== 'echanges';
      this.recherche = !!RECHERCHES[this.algo];
      this.listeInit = lireListe(el);
      this.liste = this.listeInit || listeAleatoire(Number(el.dataset.taille) || (this.recherche ? 15 : 6),
        this.algo === 'dichotomie' ? 'triee' : 'aleatoire');
      if (this.algo === 'dichotomie') this.liste.sort((a, b) => a - b);
      this.cible = el.dataset.cherche ? Number(el.dataset.cherche) : choisirCible(this.liste, true);
      el.classList.add('tri-widget', 'tri-widget-exo');
      const tete = h('div', 'tri-tete');
      tete.appendChild(h('span', 'tri-titre', 'Exercice : ' + NOMS[this.algo]));
      this.compteurs = h('span', 'tri-compteurs');
      tete.appendChild(this.compteurs);
      el.appendChild(tete);
      if (this.recherche) {
        this.cibleEl = h('div', 'tri-cible');
        el.appendChild(this.cibleEl);
      }
      const consigne = h('div', 'tri-consigne');
      const quoi = this.algo === 'fusion'
        ? (this.complet ? 'comparez les têtes des deux moitiés, puis placez le plus petit élément'
          : 'placez les éléments dans la liste fusionnée')
        : (this.complet ? 'effectuez les comparaisons et les échanges' : 'effectuez les échanges');
      consigne.textContent = this.recherche
        ? 'Cherchez la valeur indiquée en suivant exactement l\'algorithme : à chaque étape, cliquez sur l\'élément ' +
          'que l\'algorithme compare à la valeur cherchée, puis sur "Comparer".'
        : `Triez la liste en suivant exactement l'algorithme : ${quoi}, dans le bon ordre. ` +
          'Cliquez sur une ou deux barres pour les sélectionner, puis choisissez l\'opération.';
      el.appendChild(consigne);
      this.scene = new Scene(el, (id) => this.clic(id));
      this.scene.root.classList.add('tri-cliquable');
      const ctrl = h('div', 'tri-controles');
      if (this.recherche) ctrl.appendChild(bouton('Comparer', 'Comparer l\'élément sélectionné à la valeur cherchée', () => this.jouer('comparer')));
      else {
        if (this.complet) ctrl.appendChild(bouton('Comparer', 'Comparer les deux éléments sélectionnés', () => this.jouer('comparer')));
        if (this.algo === 'fusion') ctrl.appendChild(bouton('Placer', 'Placer l\'élément sélectionné dans la liste fusionnée', () => this.jouer('placer')));
        else ctrl.appendChild(bouton('Échanger', 'Échanger les deux éléments sélectionnés', () => this.jouer('echanger')));
      }
      for (const b of ctrl.children) b.classList.add('tri-btn-action');
      ctrl.appendChild(bouton('Indice', 'Montrer la prochaine opération', () => this.indice()));
      ctrl.appendChild(bouton('Recommencer', 'Recommencer avec la même liste', () => this.reset()));
      ctrl.appendChild(bouton('Nouvelle liste', 'Recommencer avec une nouvelle liste', () => {
        this.liste = listeAleatoire(this.liste.length, this.algo === 'dichotomie' ? 'triee' : 'aleatoire');
        if (this.recherche) this.cible = choisirCible(this.liste, Math.random() < 0.8);
        this.reset();
      }));
      el.appendChild(ctrl);
      this.retour = h('div', 'tri-retour');
      el.appendChild(this.retour);
      this.texte = h('div', 'tri-texte');
      el.appendChild(this.texte);
      el.appendChild(legende(this.algo));
      this.reset();
    }
    requise(f) { return f.action && (this.complet || f.action.type !== 'comparer'); }
    reset() {
      this.trace = ALGOS[this.algo](this.liste, this.cible);
      this.scene.init(this.trace);
      if (this.cibleEl) this.cibleEl.textContent = 'Valeur cherchée : ' + this.cible;
      this.k = 0;
      this.erreurs = 0;
      this.faites = 0;
      this.indices = 0;
      this.selection = new Set();
      this.indiceIds = null;
      this.fini = false;
      this.retour.textContent = '';
      this.retour.className = 'tri-retour';
      this.scene.root.classList.add('tri-sans-anim');
      this.avancer(null);
      void this.scene.root.offsetHeight;
      this.scene.root.classList.remove('tri-sans-anim');
    }
    // avance jusqu'à la frame précédant la prochaine action requise
    avancer(texteAction) {
      const fr = this.trace.frames;
      let dernierInfo = null;
      while (this.k + 1 < fr.length && !this.requise(fr[this.k + 1])) {
        this.k++;
        if (!fr[this.k].action) dernierInfo = fr[this.k].texte;
      }
      this.prochaine = this.k + 1 < fr.length ? fr[this.k + 1] : null;
      const f = fr[this.k];
      this.majAffichage();
      const morceaux = [];
      if (texteAction) morceaux.push(texteAction);
      if (dernierInfo && dernierInfo !== texteAction) morceaux.push(dernierInfo);
      this.texte.textContent = morceaux.join(' ');
      if (!this.prochaine) {
        this.fini = true;
        let bravo = 'la liste est triée !';
        if (this.recherche) {
          const pos = this.trace.frames[this.k].trie.indexOf(2);
          bravo = pos >= 0 ? `${this.cible} est trouvé en position ${pos} !`
            : `${this.cible} n'est pas dans la liste, et vous l'avez prouvé !`;
        }
        this.message(`Bravo, ${bravo} ${this.faites} opérations, ` +
          `${this.erreurs} erreur${this.erreurs > 1 ? 's' : ''}` +
          (this.indices ? `, ${this.indices} indice${this.indices > 1 ? 's' : ''}` : '') + '.', 'tri-ok', 'bravo');
      }
      void f;
    }
    majAffichage() {
      const f = this.trace.frames[this.k];
      this.scene.afficher(f, { selection: this.selection, indice: this.indiceIds });
      this.compteurs.textContent = `Opérations : ${this.faites} · Erreurs : ${this.erreurs}`;
    }
    clic(id) {
      if (this.fini) return;
      const f = this.trace.frames[this.k];
      if (f.main.indexOf(id) < 0) return;   // élément déjà dans la ligne auxiliaire
      if (this.selection.has(id)) this.selection.delete(id);
      else {
        if (this.selection.size >= (this.recherche ? 1 : 2)) this.selection.clear();
        this.selection.add(id);
      }
      this.majAffichage();
    }
    jouer(type) {
      if (this.fini) return;
      const f = this.trace.frames[this.k];
      const choisis = [...this.selection].map(id => f.main.indexOf(id)).sort((a, b) => a - b);
      const besoin = (type === 'placer' || this.recherche) ? 1 : 2;
      if (choisis.length !== besoin) {
        this.message(besoin === 1 ? 'Sélectionnez un élément.' : 'Sélectionnez deux éléments.', 'tri-info', 'info');
        return;
      }
      const att = this.prochaine.action;
      let ok = att.type === type;
      if (ok) {
        if (type === 'placer' || att.b === undefined) ok = choisis.length === 1 && choisis[0] === att.a;
        else ok = choisis[0] === Math.min(att.a, att.b) && choisis[1] === Math.max(att.a, att.b);
      }
      if (!ok) {
        this.erreurs++;
        this.el.classList.remove('tri-secousse');
        void this.el.offsetWidth;
        this.el.classList.add('tri-secousse');
        this.message('Ce n\'est pas la bonne opération.' +
          (this.erreurs >= 3 ? ' Besoin d\'aide ? Cliquez sur "Indice".' : ''), 'tri-ko', 'erreur');
        this.selection.clear();
        this.majAffichage();
        return;
      }
      // action correcte
      const va = f.main[att.a] !== null ? this.trace.vals[f.main[att.a]] : null;
      const vb = att.b !== undefined ? this.trace.vals[f.main[att.b]] : null;
      let msg;
      if (type === 'comparer' && att.b === undefined) {
        msg = `Bonne comparaison : ${va} ${rel(va, this.cible)} ${this.cible}.`;
      } else if (type === 'comparer') {
        const x = Math.min(att.a, att.b), y = Math.max(att.a, att.b);
        const vx = this.trace.vals[f.main[x]], vy = this.trace.vals[f.main[y]];
        msg = `Bonne comparaison : ${vx} ${rel(vx, vy)} ${vy}.`;
      } else if (type === 'echanger') msg = `Bon échange : ${va} et ${vb}.`;
      else msg = `${va} est placé dans la liste fusionnée.`;
      this.faites++;
      this.selection.clear();
      this.indiceIds = null;
      this.k++;
      this.avancer(this.trace.frames[this.k].texte);
      if (!this.fini) this.message(msg, 'tri-ok', 'ok');
    }
    indice() {
      if (this.fini || !this.prochaine) return;
      const f = this.trace.frames[this.k];
      const a = this.prochaine.action;
      this.indices++;
      this.indiceIds = new Set([f.main[a.a]].concat(a.b !== undefined ? [f.main[a.b]] : []));
      const noms = { comparer: 'comparer', echanger: 'échanger', placer: 'placer' };
      this.message(`Prochaine opération : ${noms[a.type]} l'élément ou les éléments entourés en pointillé.`, 'tri-info', 'indice');
      this.majAffichage();
    }
    message(t, cls, nomIcone) {
      this.retour.className = 'tri-retour ' + cls;
      this.retour.replaceChildren();
      if (nomIcone) this.retour.appendChild(icone(nomIcone));
      this.retour.appendChild(h('span', '', t));
    }
  }

  function init() {
    document.querySelectorAll('.tri-visu').forEach(el => { if (!el._tri) el._tri = new Visu(el); });
    document.querySelectorAll('.tri-exo').forEach(el => { if (!el._tri) el._tri = new Exo(el); });
  }

  // Exposé pour les tests et la réutilisation
  window.TriAlgos = { ALGOS, init, listeAleatoire };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
