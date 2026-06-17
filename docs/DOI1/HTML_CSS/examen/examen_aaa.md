% Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{metadata}
orphan: true
hide: [navbar, primary-sidebar, prev-next, footer]
```


# Question 2 - Créer une page HTML

En partant du squelette ci-dessous, créez une page de présentation de la
Suisse. Votre page doit contenir :

1. Le texte `Mon pays` dans l'onglet.
2. Un titre principal `La Suisse` en haut de la page.
3. Deux sous-titres : `Villes principales` et `Sites touristiques` bien placés.
4. Dans le paragraphe déjà présent, un retour à la ligne entre les deux phrases.
5. Une liste numérotée des trois plus grandes villes de Suisse : `Zurich`, `Genève`, `Bâle`
6. Un tableau des sites touristiques est déjà commencé dans le squelette.
   **Complétez-le** en ajoutant une **troisième colonne** intitulée `Type`,
   puis remplissez-la avec les valeurs suivantes :
   - Le Cervin : `Montagne`
   - Le château de Chillon : `Château`
   - Les chutes du Rhin : `Cascade`
7. Une image. Vous pouvez utiliser l'URL
   `https://picsum.photos/300/200`.

```{exec} html
:editor: 3f9a1c20-8b4e-4d77-9a12-5c6e7f801a01
:style: height: 30rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <p>Cette section présente les principales villes de Suisse. En particulier, la liste ci-dessous vous montre les 3 plus grandes villes de Suisse.</p>

    <table border="1">
      <tr>
        <th>Site touristique</th>
        <th>Canton</th>
      </tr>
      <tr>
        <td>Le Cervin</td>
        <td>Valais</td>
      </tr>
      <tr>
        <td>Le château de Chillon</td>
        <td>Vaud</td>
      </tr>
      <tr>
        <td>Les chutes du Rhin</td>
        <td>Schaffhouse</td>
      </tr>
    </table>

  </body>
</html>
```




# Question 3 - Mettre en forme avec du CSS

Modifiez la page Web ci-dessous afin de la mettre en forme avec les éléments suivants :

1. Le titre principal doit être en blanc,
   sur un fond brun, et centré (propriété `text-align` et valeur `center`)
2. Les sous-titres doivent avoir la couleur `saddlebrown` et une taille de `30px`.
3. La couleur de fond de la 1ère ligne et la 3ème ligne du tableau doit être en `saddlebrown`. Celle de la 2ème et de la 4ème en `rosybrown`. (L'entête reste blanc).
4. La police d'écriture de toute la page est en `verdana`
5. Les deux paragraphes de la section `Le saviez-vous` doivent être individuellement encadrés (propriété `border` et valeur `3px solid brown`). Le paragraphe du haut de la page ne doit pas être encadré
6. En ne touchant plus au CSS depuis le point précédent, encadrez également le sous-sous-titre `Conseil de conservation` et son paragraphe dans un cadre commun.


```{exec} html
:editor: 5e6cdc9d-5e50-4a3a-a0ff-8b0e41184769
:name: ex-cafe-html
:style: height: 30rem;
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
    </style>
</head>
<body>
    <h1>Le café dans le monde</h1>

    <h2>Origines</h2>
    <p>Le café est cultivé dans plus de 70 pays, principalement situés autour de
    l'équateur. Les deux espèces les plus connues sont l'arabica et le robusta.</p>

    <h2>Les plus grands producteurs</h2>
    <table border="1">-
      <tr>
        <th>Pays</th>
        <th>Production annuelle</th>
        <th>Espèce principale</th>
      </tr>
      <tr>
        <td>Brésil</td>
        <td>3 700 000 tonnes</td>
        <td>Arabica</td>
      </tr>
      <tr>
        <td>Vietnam</td>
        <td>1 800 000 tonnes</td>
        <td>Robusta</td>
      </tr>
      <tr>
        <td>Colombie</td>
        <td>850 000 tonnes</td>
        <td>Arabica</td>
      </tr>
            <tr>
        <td>Argentine</td>
        <td>790 000 tonnes</td>
        <td>Robusta</td>
      </tr>
    </table>

    <h2>Le saviez-vous ?</h2>
    <p>La Suisse réexporte du café pour plusieurs milliards de
    francs chaque année.</p>
    <p>Un espresso ne contient pas plus de caféine qu'un café
    filtre, car il est servi en plus petite quantité.</p>

    
    <h3>Conseil de conservation</h3>
    <p>Conservez le café dans un récipient hermétique, à l'abri de la lumière.</p>



</body>
</html>
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