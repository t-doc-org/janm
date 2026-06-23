% Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{metadata}
orphan: true
hide: [navbar, primary-sidebar, prev-next, footer]
```


# Question 1 - Prix des bananes

Écrivez un programme qui calcule le prix d'un certain nombre de bananes à
1.50 CHF pièce. Si le nombre de bananes est négatif, le texte `ERREUR` apparaît dans la console. S'il est supérieur à 100, le texte `On en a pas assez` apparaît. Sinon, le prix total est calculé et affiché.

**Attention :** comme `prompt()` ne fonctionne pas sur exam.net, vous pouvez vous contenter de modifier manuellement la valeur de la variable `nbBananes` déjà présente dans le programme pour le tester.


```{exec} html
:editor: 6fd18edf-61fd-4f4c-9d05-0366d30a2350
:style: max-height: 16rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let nbBananes = 6

</script></body></html>
```


# Question 2 - Fabriquer des trombones

Dans cette question, vous allez reproduire 2 fonctionnalités de base de l'usine à trombones

1. Implémentez la fonctionnalité de fabrication des trombones. Lorsqu'on clique sur le bouton, le nombre de trombone visible à l'écran doit être augmenté de 1.
2. Ajoutez un 2ème bouton à la page avec le texte `Améliorer clic`. Lorsqu'on clique sur ce bouton, si l'on a au moins 5 trombones, ceux-ci sont retirés du compte et la puissance du clic est améliorée de 1. Par exemple, avec une puissance de 3, chaque clic sur le bouton fabriquer augmentera le compte des trombones de 3.

```{exec} html
:editor: 7533482d-0efc-418c-8f78-88e5f8cb2d4f
<!DOCTYPE html>
<html><body>
  <p>Nombre de trombones <span id="spanTrombones">0</span>
  <button>Fabriquer</button>
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