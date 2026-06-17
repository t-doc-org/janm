% Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{metadata}
orphan: true
hide: [navbar, primary-sidebar, prev-next, footer]
```


# Question 2 - Créer une page HTML

En partant du squelette ci-dessous, créez une page de présentation du système
solaire. Votre page doit contenir :

1. Le texte `Astronomie` dans l'onglet.
2. Un titre principal `Le système solaire` en haut de la page.
3. Deux sous-titres : `Les planètes rocheuses` et `Les planètes géantes` bien placés.
4. Dans le paragraphe déjà présent, un retour à la ligne entre les deux phrases.
5. Une liste numérotée des quatre planètes rocheuses, de la plus proche du Soleil à la plus éloignée : `Mercure`, `Vénus`, `Terre`, `Mars`
6. Un tableau des planètes géantes est déjà commencé dans le squelette.
   **Complétez-le** en ajoutant une **nouvelle ligne** pour la planète `Neptune`,
   avec les valeurs suivantes :
   - Diamètre (km) : `49 244`
   - Type : `Géante de glace`
7. Une image. Vous pouvez utiliser l'URL
   `https://picsum.photos/300/200`.

```{exec} html
:editor: 2b7e9f04-1c83-4a6d-9e52-7f0a3d6c8b15
:style: height: 30rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <p>Cette page présente le système solaire. En particulier, la liste ci-dessous montre les quatre planètes rocheuses, de la plus proche à la plus éloignée du Soleil.</p>

    <table border="1">
      <tr>
        <th>Planète</th>
        <th>Diamètre (km)</th>
        <th>Type</th>
      </tr>
      <tr>
        <td>Jupiter</td>
        <td>139 820</td>
        <td>Géante gazeuse</td>
      </tr>
      <tr>
        <td>Saturne</td>
        <td>116 460</td>
        <td>Géante gazeuse</td>
      </tr>
      <tr>
        <td>Uranus</td>
        <td>50 724</td>
        <td>Géante de glace</td>
      </tr>
    </table>

  </body>
</html>
```




# Question 3 - Mettre en forme avec du CSS

Modifiez la page Web ci-dessous afin de la mettre en forme avec les éléments suivants :

1. Le titre principal doit être en blanc,
   sur un fond `chocolate`, et en taille `45px `
2. Les sous-titres doivent avoir la couleur `sienna` et une taille de `28px`
3. La 1ère et 3ème colonne doivent avoir une couleur de fond en `peru`
4. La police d'écriture de toute la page est en `Georgia`
5. Les deux paragraphes de la section `Le saviez-vous` doivent être individuellement encadrés (propriété `border` et valeur `2px dashed sienna`). Le paragraphe du haut de la page ne doit pas être encadré
6. En ne touchant plus au CSS depuis le point précédent, encadrez également le sous-sous-titre `Conseil de dégustation` et son paragraphe dans un cadre commun.


```{exec} html
:editor: 9d4c1a87-6e2b-4f30-8a91-3c5d7e0f2b46
:name: ex-choco-html
:style: height: 30rem;
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
    </style>
</head>
<body>
    <h1>Le chocolat dans le monde</h1>

    <h2>Origines</h2>
    <p>Le cacao est cultivé dans les régions tropicales, principalement en Afrique
    de l'Ouest et en Amérique du Sud. Il provient des fèves du cacaoyer.</p>

    <h2>Les plus grands producteurs</h2>
    <table border="1">
      <tr>
        <th>Pays</th>
        <th>Production annuelle</th>
        <th>Continent</th>
      </tr>
      <tr>
        <td>Côte d'Ivoire</td>
        <td>2 200 000 tonnes</td>
        <td>Afrique</td>
      </tr>
      <tr>
        <td>Ghana</td>
        <td>800 000 tonnes</td>
        <td>Afrique</td>
      </tr>
      <tr>
        <td>Indonésie</td>
        <td>650 000 tonnes</td>
        <td>Asie</td>
      </tr>
      <tr>
        <td>Équateur</td>
        <td>340 000 tonnes</td>
        <td>Amérique</td>
      </tr>
    </table>

    <h2>Le saviez-vous ?</h2>
    <p>La Suisse est l'un des plus grands consommateurs de chocolat au monde,
    avec près de 11 kg par personne et par an.</p>
    <p>Il faut environ une année de récolte d'un cacaoyer pour produire seulement
    500 grammes de chocolat.</p>


    <h3>Conseil de dégustation</h3>
    <p>Dégustez le chocolat à température ambiante pour mieux en apprécier les arômes.</p>



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
