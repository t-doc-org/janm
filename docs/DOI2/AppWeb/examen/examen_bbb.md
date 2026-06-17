% Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{metadata}
orphan: true
hide: [navbar, primary-sidebar, prev-next, footer]
```


# Question 1 - Correction de code
Le code Javascript ci-dessous contient plusieurs erreurs de syntaxe. Trouver les et corrigez les.

```{exec} html
:editor: b330b8f5-a60f-4009-90a2-097add6cd53a
:output-style: height: 0;
<!DOCTYPE html>
<html><body>
    <script>
    
    fonction afficheMessage():
        console.log(Au revoir)

    let note = 4
    let bonus = 0.5
    let note += bonus
    if note > 4.5 and note < 5.5:
        print("C'est une bonne note")
    elif note > 4:
        print("C'est une note correcte")
    else:
        print("C'est une note insuffisante")

    afficheMessage()
    </script>
    
</body></html>
```


# Question 2 - Quiz

Complétez le code pour créer un petit **quiz** :

1. 
- un clic sur **"Vrai"** affiche `Bonne réponse` **dans un paragraphe**
- un clic sur **"Faux"** affiche `Mauvaise réponse"` **dans un paragraphe**

2. Modifiez le code de sorte que le texte `Bonne réponse` apparaisse en vert, alors que `Mauvaise réponse` apparaisse en rouge.

```{exec} html
:editor: 99cda5d6-704c-44a9-bd7c-88cc69f1ddf9
<!DOCTYPE html>
<html><body>
  <h2>Le soleil est une étoile ?</h2>
  <button>Vrai</button>
  <button>Faux</button>

  <script>

  </script>
</body></html>
```




```{raw} html
<style>
  .janm-copy-wrap {
    margin: 0.3rem 0 1.2rem;
  }
  .janm-copy-btn {
    padding: 0.35rem 0.9rem;
    font-size: 0.85rem;
    line-height: 1.2;
    border: 1px solid var(--pst-color-border, #ccc);
    border-radius: 0.3rem;
    background: var(--pst-color-surface, #fff);
    color: var(--pst-color-text-base, #333);
    cursor: pointer;
  }
  .janm-copy-btn:hover { background: var(--pst-color-border, #eee); }
</style>
<script>
  (() => {
    // Échappe les caractères qui seraient sinon interprétés comme du HTML lors
    // du collage, afin de conserver le code tel quel.
    const escapeHtml = (text) =>
      text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

    // Renvoie le CODE COURANT d'un bloc {exec} : le contenu vivant de l'éditeur
    // CodeMirror s'il existe, sinon le <pre> d'origine.
    // ⚠ Ne PAS lire pre.innerText quand un éditeur est présent : t-doc masque ce
    // <pre> mais y laisse le code de BASE — on copierait alors l'énoncé, pas la
    // réponse de l'élève.
    const liveCode = (block) => {
      const view = block.querySelector("div.cm-editor")?.tdocEditor;
      if (view) return view.state.doc.toString();
      const pre = block.querySelector("pre");
      return pre ? pre.innerText : "";
    };

    const copyText = async (text, btn) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Repli pour les contextes sans accès au presse-papiers
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch {}
        ta.remove();
      }
      const original = btn.textContent;
      btn.textContent = "Copié !";
      setTimeout(() => { btn.textContent = original; }, 1500);
    };

    const addButton = (block) => {
      if (block.dataset.janmCopy) return;  // évite les doublons
      block.dataset.janmCopy = "1";
      const wrap = document.createElement("div");
      wrap.className = "janm-copy-wrap";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "janm-copy-btn";
      btn.textContent = "Copier le code";
      btn.title = "Copier le code courant (modifications incluses)";
      // Le code est relu À CHAQUE clic → toujours la version à jour de l'éditeur.
      btn.addEventListener("click", () => copyText(escapeHtml(liveCode(block)), btn));
      wrap.appendChild(btn);
      block.after(wrap);
    };

    // Les div.tdoc-exec sont déjà dans le HTML au chargement (seul l'éditeur
    // CodeMirror est ajouté ensuite), donc un simple scan suffit ; on relit le
    // contenu au clic, pas ici.
    const scan = () =>
      document.querySelectorAll("div.tdoc-exec").forEach(addButton);

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", scan);
    } else {
      scan();
    }
    setTimeout(scan, 1500);  // filet de sécurité si le rendu est tardif
  })();
</script>
```