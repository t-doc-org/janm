% Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{metadata}
orphan: true
hide: [navbar, primary-sidebar, prev-next, footer]
```


# Question 1 - Correction de code
Le code Javascript ci-dessous contient plusieurs erreurs de syntaxe. Trouver les et corrigez les.

```{exec} html
:editor: d2da7f42-bdc2-4414-a7d3-165ab6733e23
:output-style: height: 0;
<!DOCTYPE html>
<html><body>
    <script>
    
    fonction afficheMessage:
        console.log(Au revoir)

    let note = 4
    let bonus = 0.5
    let note = note + bonus
    if note > 5:
        print("C'est une bonne note")
    elif note > 4:
        print("C'est une note correcte")
    else:
        print("C'est une note insuffisante")

    afficheMessage()
    </script>
    
</body></html>
```


# Question 2 - Allumer/éteindre
1. Ajoutez le code nécessaire pour que :

    - un clic sur le bouton **"Allumer"** donne à la page un fond **jaune** ;
    - un clic sur le bouton **"Éteindre"** donne à la page un fond **noir**.

    Rappel : on change le fond de la page avec
    `document.body.style.backgroundColor = "...";`

2. Ajoutez un paragraphe à la page. Au début, celui-ci est vide. Puis, quand on clique sur le bouton **Allumer**, celui-ci se remplit avec le texte `Bonjour`. Quand on clique sur le bouton **Eteindre**, il se remplit avec le texte `Bonsoir`
```{exec} html
:editor: e7a49698-15b5-410a-b962-a1b1164f4e7e
<!DOCTYPE html>
<html><body>
  <button id="boutonOn">Allumer</button>
  <button id="boutonOff">Éteindre</button>

  <script>
    // Complétez ici

  </script>
</body></html>
```




```{raw} html
<style>
  .janm-copy-btn {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    z-index: 5;
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    line-height: 1.2;
    border: 1px solid var(--pst-color-border, #ccc);
    border-radius: 0.3rem;
    background: var(--pst-color-surface, #fff);
    color: var(--pst-color-text-base, #333);
    cursor: pointer;
    opacity: 0.7;
  }
  .janm-copy-btn:hover { opacity: 1; }
</style>
<script>
  (() => {
    const escapeHtml = (text) =>
      text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

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

    const addButtons = () => {
      // Chaque bloc de code interactif est un <pre> dans .highlight
      document.querySelectorAll(".bd-article .highlight > pre").forEach((pre) => {
        const container = pre.parentElement;
        if (container.querySelector(".janm-copy-btn")) return;
        if (getComputedStyle(container).position === "static") {
          container.style.position = "relative";
        }
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "janm-copy-btn";
        btn.textContent = "Copier";
        btn.addEventListener("click", () => copyText(escapeHtml(pre.innerText), btn));
        container.appendChild(btn);
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", addButtons);
    } else {
      addButtons();
    }
    // Les éditeurs {exec} peuvent être réécrits après le chargement : on réessaie.
    setTimeout(addButtons, 1000);
  })();
</script>
```