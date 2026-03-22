% Copyright 2024 Caroline Blank <caro@c-space.org>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

# CSS

Le langage **CSS** (**C**ascading **S**tyle **S**heet en français feuilles de
style en cascade) permet de mettre en forme les documents HTML. Il permet
notamment de modifier la police, la couleur, la taille et l'emplacement du
contenu.

CSS est un langage basé sur des règles: il permet de définir des règles de style
pour un type d'élément donné, par exemple les titres principaux `<h1></h1>` ou
les paragraphes `<p></p>`.

(referencement)=
## Référencement

Il existe deux façons d'associer du CSS à un document HTML.

### Fichier CSS séparé

Le CSS peut être écrit dans un fichier séparé (par exemple `style.css`). Pour
lier ce fichier à une page HTML, il faut ajouter une balise `<link>` dans le
`<head>` du document HTML. Cette balise a deux attributs importants:

1. `rel` indique la relation (ici une feuille de style)
2. `href` indique le chemin vers le fichier CSS

```{code} html
<head>
  <link href="style.css" rel="stylesheet" type="text/css"/>
</head>
```

Cette méthode est recommandée car elle permet de séparer le contenu (HTML) de
la présentation (CSS) et de réutiliser le même fichier CSS sur plusieurs pages.

### Balise `<style>`

Le CSS peut aussi être écrit directement dans le `<head>` du document HTML, à
l'intérieur de la balise `<style>`:

```{code} html
<head>
  <style>
    h1 {
      color: green;
    }
  </style>
</head>
```

Cette méthode est pratique pour de petits projets ou pour tester rapidement.
C'est celle utilisée dans les exercices ci-dessous.

## Structure du code CSS

La règle commence par un **sélecteur** qui indique à quelles balises cette règle
doit s'appliquer. Ensuite, la liste des **propriétés** ainsi que leurs **valeurs**
sont indiquées entre accolades. Chaque déclaration se termine par un
point-virgule.

```{code} css
sélecteur {
  propriété1: valeur1;
  propriété2: valeur2;
}
```

Exemples:

```{code} css
h1 {                      /* Cette règle définit le style du titre principal. */
  color: green;           /* La couleur du texte est verte. */
  text-align: center;     /* L'alignement du texte est centré. */
}
```

```{code} css
p {                       /* Cette règle définit le style des paragraphes. */
  font-family: verdana;   /* La police utilisée est verdana. */
  font-size: 20px;        /* La taille de la police est 20 pixels. */
}
```

## Propriétés CSS

| Propriété | Description | Exemple de valeur |
|-----------|-------------|-------------------|
| `color` | Couleur du texte | `red`, `rgb(255,0,0)`, `#ff0000` |
| `background-color` | Couleur de fond de l'élément | `yellow`, `lightblue`, `#faebd7` |
| `font-family` | Police de caractères | `Arial`, `verdana`, `fantasy` |
| `font-size` | Taille de la police | `20px`, `1.5em`, `120%` |
| `font-weight` | Graisse du texte (épaisseur) | `bold`, `normal`, `600` |
| `font-style` | Style de la police | `italic`, `normal` |
| `text-align` | Alignement horizontal du texte | `left`, `center`, `right`, `justify` |
| `text-decoration` | Décoration du texte | `underline`, `none`, `line-through` |
| `text-transform` | Transformation de la casse | `uppercase`, `lowercase`, `capitalize` |
| `line-height` | Hauteur de ligne (interligne) | `1.5`, `24px` |
| `letter-spacing` | Espacement entre les lettres | `2px`, `0.1em` |
| `border` | Bordure (épaisseur style couleur) | `2px solid black`, `1px dashed red` |
| `border-radius` | Arrondi des coins | `10px`, `50%` |
| `border-collapse` | Fusion des bordures de tableau | `collapse`, `separate` |
| `margin` | Marge extérieure (autour de l'élément) | `10px`, `0 auto` |
| `padding` | Marge intérieure (entre contenu et bordure) | `5px`, `10px 20px` |
| `width` | Largeur de l'élément | `300px`, `100%`, `50%` |
| `height` | Hauteur de l'élément | `200px`, `auto` |
| `list-style` | Style des puces de liste | `none`, `disc`, `square` |
| `cursor` | Forme du curseur au survol | `pointer`, `default`, `crosshair` |

Les **couleurs** peuvent être indiquées de trois façons:
- Par leur **nom en anglais**: `red`, `green`, `blue`, `black`, `white`, `cornsilk`...
- En **code RGB**: `rgb(255, 0, 0)` pour le rouge pur
- En **code hexadécimal**: `#ff0000` pour le rouge pur

[Liste des couleurs](https://htmlcolorcodes.com/color-names/) disponibles en HTML/CSS.

## Sélecteurs

Dans ce cours, nous allons travailler sur 2 types de sélecteurs:

1. Sélecteur de type
2. Sélecteur de classe

### Sélecteur de type

Le sélecteur de type permet d'appliquer un style à **toutes** les balises de
même type (`h1`, `h2`, `p`, ...).

```{code} css
h1 {                      /* Cette règle définit le style du titre principal. */
  color: green;           /* La couleur du texte est verte. */
  text-align: center;     /* L'alignement du texte est centré. */
}
```

Ce style s'appliquera au contenu de toutes les balises `<h1>...</h1>`.

### Sélecteur de classe

Le sélecteur de classe permet d'appliquer un style à **plusieurs éléments**
qui appartiennent à une même classe (groupe). Pour cela, il faut ajouter un
attribut `class` à la balise HTML concernée.

<table><tr style="text-align: center">
  <th>Fichier HTML</th><th>Fichier CSS</th>
</tr><tr><td>

```{code} html
<p class="centre">
Le texte de ce paragraphe sera centré.
</p>
<p>
Ce paragraphe ne sera pas centré.
</p>
```

</td><td style="padding-left: 1rem">

```{code} css
.centre {
  text-align: center;
}
```

</td></tr></table>

Ce style ne s'appliquera qu'aux balises dont la classe est `"centre"`.

Un élément peut aussi appartenir à **plusieurs classes** en les séparant par un
espace:

```{code} html
<p class="centre rouge">Ce texte est centré et rouge.</p>
```

[Tuto](https://developer.mozilla.org/fr/docs/Learn/Getting_started_with_the_web/CSS_basics)
bases du CSS.

## Conteneurs `<div>`

La balise `<div>` est un élément **bloc** qui permet de regrouper plusieurs
éléments HTML. Seul, un `<div>` n'a aucun effet visuel — c'est le CSS qui lui
donne une apparence.

L'intérêt du `<div>` apparaît lorsqu'on le combine avec un **sélecteur de
classe**: on peut ainsi styliser indépendamment différentes zones d'une même
page.

<table><tr style="text-align: center">
  <th>Fichier HTML</th><th>Fichier CSS</th>
</tr><tr><td>

```{code} html
<div class="alerte">
  <h2>Attention</h2>
  <p>Le site sera en maintenance
  ce soir de 22h à 23h.</p>
</div>

<div class="info">
  <h2>Information</h2>
  <p>Les inscriptions sont ouvertes.</p>
</div>
```

</td><td style="padding-left: 1rem">

```{code} css
.alerte {
  background-color: #ffe0e0;
  border-left: 4px solid red;
  padding: 10px;
  margin: 10px 0;
}

.info {
  background-color: #e0f0ff;
  border-left: 4px solid blue;
  padding: 10px;
  margin: 10px 0;
}
```

</td></tr></table>

Les deux `<div>` ont une structure HTML identique, mais chacun reçoit un style
différent grâce à sa classe.

## Exercices

### Exercice {num2}`exercice`

Notez la propriété CSS qui permet de:

```{role} input(quiz-input)
:right: width: 16rem;
:check: json trim
```

```{quiz}
:style: max-width: 48rem;
1.  {input}`{"color": true}`
    ... changer la couleur du texte?
2.  {input}`{"background-color": true}`
    ... changer la couleur de fond?
3.  {input}`{"font-size": true}`
    ... changer la taille de la police?
4.  {input}`{"text-align": true}`
    ... aligner le texte?
5.  {input}`{"font-family": true}`
    ... changer la police de caractères?
6.  {input}`{"border": true}`
    ... ajouter une bordure?
7.  {input}`{"font-weight": true}`
    ... mettre le texte en gras?
8.  {input}`{"padding": true}`
    ... ajouter une marge intérieure?
9.  {input}`{"border-radius": true}`
    ... arrondir les coins d'un élément?
10. {input}`{"text-decoration": true}`
    ... souligner du texte?
```

### Exercice {num2}`exercice`

Quel type de sélecteur faut-il utiliser?

```{role} choix(quiz-select)
:right:
:options: |
: sélecteur de type
: sélecteur de classe
```

```{quiz}
:style: max-width: 40rem;
1.  {choix}`sélecteur de type`
    Appliquer un style à tous les `<h1>` de la page
2.  {choix}`sélecteur de classe`
    Appliquer un style à certains `<p>` seulement
3.  {choix}`sélecteur de type`
    Appliquer un style à tous les `<p>` de la page
4.  {choix}`sélecteur de classe`
    Appliquer un style à plusieurs éléments de types différents
5.  {choix}`sélecteur de type`
    Appliquer un style à tous les `<h2>` de la page
6.  {choix}`sélecteur de classe`
    Mettre en évidence certains mots dans différents paragraphes
```

### Exercice {num2}`exercice`

Complétez les règles CSS pour:

1. Mettre le `<h1>` en `darkblue` et centré
2. Mettre les `<h2>` en `green`
3. Mettre les `<p>` en police `Georgia` et taille `16px`

```{exec} html
:editor: f6a7b8c9-d0e1-2345-fab0-678901234567
:style: height: 16rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      h1 {
      }
      h2 {
      }
      p {
      }
    </style>
  </head>
  <body>
    <h1>Les planètes du système solaire</h1>
    <h2>Les planètes telluriques</h2>
    <p>Mercure, Vénus, la Terre et Mars sont des planètes rocheuses.</p>
    <h2>Les géantes gazeuses</h2>
    <p>Jupiter, Saturne, Uranus et Neptune sont composées principalement de gaz.</p>
  </body>
</html>
```

````{solution}
```{exec} html
:when: load
:editor:
:style: height: 16rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      h1 {
        color: darkblue;
        text-align: center;
      }
      h2 {
        color: green;
      }
      p {
        font-family: Georgia;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <h1>Les planètes du système solaire</h1>
    <h2>Les planètes telluriques</h2>
    <p>Mercure, Vénus, la Terre et Mars sont des planètes rocheuses.</p>
    <h2>Les géantes gazeuses</h2>
    <p>Jupiter, Saturne, Uranus et Neptune sont composées principalement de gaz.</p>
  </body>
</html>
```
````

### Exercice {num2}`exercice`

Complétez le CSS pour:

1. Donner à `<body>` une couleur de fond `lightyellow`
2. Définir la classe `encadre`: bordure `2px solid steelblue`, `padding` de
   `8px`, couleur de fond `#e8f4f8`

```{exec} html
:editor: 07b8c9d0-e1f2-3456-0abc-789012345678
:style: height: 16rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
      }
      .encadre {
      }
    </style>
  </head>
  <body>
    <h1>Mes matières préférées</h1>
    <p>J'aime beaucoup les mathématiques.</p>
    <p class="encadre">L'informatique est ma matière favorite.</p>
    <p>Le français est important pour communiquer.</p>
    <p class="encadre">La physique explique comment fonctionne le monde.</p>
  </body>
</html>
```

````{solution}
```{exec} html
:when: load
:editor:
:style: height: 16rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        background-color: lightyellow;
      }
      .encadre {
        border: 2px solid steelblue;
        padding: 8px;
        background-color: #e8f4f8;
      }
    </style>
  </head>
  <body>
    <h1>Mes matières préférées</h1>
    <p>J'aime beaucoup les mathématiques.</p>
    <p class="encadre">L'informatique est ma matière favorite.</p>
    <p>Le français est important pour communiquer.</p>
    <p class="encadre">La physique explique comment fonctionne le monde.</p>
  </body>
</html>
```
````

### Exercice {num2}`exercice`

Le contenu d'une page a été défini en HTML de la manière suivante.

```{exec} html
:name: ex-labrador-html
:when: never
:style: height: 30rem;
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Labrador</title>
</head>
<body>
    <h1>Le Labrador</h1>

    <h2>Origine et caractéristiques</h2>

    <p>Le Labrador est une race de chien originaire du Canada, plus précisément
    de Terre-Neuve. Il est connu pour son tempérament amical, son intelligence
    et sa grande capacité d'adaptation.</p>

    <h3>Caractéristiques</h3>
    <table>
      <tr>
        <th>Taille</th><th>Poids</th><th>Espérance de vie</th><th>Couleurs</th>
      </tr>
      <tr>
        <td>54 à 57 cm</td><td>25 à 36 kg</td><td>10 à 14 ans</td>
        <td>Noir, jaune, chocolat</td>
      </tr>
    </table>

    <h2>Comportement et utilisation</h2>
    <p>Très sociable, le Labrador est souvent utilisé comme chien guide pour les
    personnes malvoyantes, mais aussi comme chien de sauvetage et compagnon
    familial.</p>

    <h2>Photo</h2>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1024px-Labrador_Retriever_portrait.jpg">

    <p>Source: texte généré par Copilot.</p>
</body>
</html>
```

Au moyen du CSS, modifiez les éléments suivants:

1.  Le titre principal doit être en bleu et centré.
2.  Les sous-titres de niveau 2 doivent être en couleur
    ([choix de couleurs](https://htmlcolorcodes.com/color-names/)).
3.  La table doit avoir une bordure (propriétés: `border` et `border-collapse`).
4.  La table doit prendre `100%` de la largeur de la page.
5.  L'image doit avoir une largeur de `300px`.
6.  La propriété `font-family` des paragraphes doit être `"Goudy Bookletter 1911"`.
7.  La couleur de fond `background-color` de la page doit être `cornsilk`.

```{exec} html
:editor: 76fa6122-75cd-449c-a539-d4141d082c56
:after: ex-labrador-html
:when: load
:reset: hide
<style>
  /* Écrivez le CSS ici */
</style>
```

````{solution}
```{exec} html
:after: ex-labrador-html
:when: load
:reset: hide
<style>
  h1 {
    color: blue;
    text-align: center;
  }
  h2 {
    color: darkorange;
  }
  table {
    border: 2px solid black;
    border-collapse: collapse;
    width: 100%;
  }
  img {
    width: 300px;
  }
  p {
    font-family: "Goudy Bookletter 1911";
  }
  body {
    background-color: cornsilk;
  }
</style>
```
````

### Exercice {num2}`exercice`

Le contenu d'une page a été défini en HTML de la manière suivante.

```{exec} html
:name: ex-escalade-html
:when: never
:style: height: 30rem;
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>L'escalade sportive</title>
</head>
<body>
    <h1>L'escalade sportive</h1>

    <h2>Présentation</h2>
    <p>L'escalade sportive consiste à gravir des parois rocheuses naturelles ou
    des murs artificiels. Elle est devenue discipline olympique en 2021 lors
    des Jeux de Tokyo.</p>

    <h2>Les trois disciplines</h2>
    <p class="discipline">La difficulté: grimper le plus haut possible sur une
    voie longue sans limite de temps.</p>
    <p>Le bloc: résoudre de courtes séquences de mouvements sur des structures
    de 4 à 5 mètres, sans corde.</p>
    <p class="discipline">La vitesse: deux grimpeurs s'affrontent sur une voie
    standardisée de 15 mètres. Le record du monde est inférieur à 5 secondes.</p>

    <h2>Matériel essentiel</h2>
    <p>Chaussons de grimpe, baudrier, corde, dégaines et magnésie constituent
    l'équipement de base pour pratiquer l'escalade en sécurité.</p>
    <p class="source">Source: Fédération française de la montagne et de l'escalade, 2024.</p>
</body>
</html>
```

La page contient deux classes CSS à définir:
- `discipline`: pour mettre en avant les disciplines olympiques
- `source`: pour la référence en bas de page

Au moyen du CSS:

1.  Le `<h1>` doit être centré et en couleur `#2c3e50`.
2.  Les `<h2>` doivent être en couleur `#e67e22`.
3.  La classe `discipline` doit avoir: fond `#eaf4fb`, bordure gauche
    `4px solid #2980b9` (`border-left`) et un `padding` de `8px`.
4.  La classe `source` doit être en italique, couleur `gray` et taille `12px`.
5.  La couleur de fond de la page doit être `#f9f9f9`.

```{exec} html
:editor: 1a2b3c4d-5e6f-7890-abcd-ef0123456789
:after: ex-escalade-html
:when: load
:reset: hide
<style>
  /* Écrivez le CSS ici */
</style>
```

````{solution}
```{exec} html
:after: ex-escalade-html
:when: load
:reset: hide
<style>
  h1 {
    text-align: center;
    color: #2c3e50;
  }
  h2 {
    color: #e67e22;
  }
  .discipline {
    background-color: #eaf4fb;
    border-left: 4px solid #2980b9;
    padding: 8px;
  }
  .source {
    font-style: italic;
    color: gray;
    font-size: 12px;
  }
  body {
    background-color: #f9f9f9;
  }
</style>
```
````

### Exercice {num2}`exercice`

Le contenu d'une page a été défini en HTML de la manière suivante.

```{exec} html
:name: ex-paleo-html
:when: never
:style: height: 30rem;
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Paléo Festival</title>
</head>
<body>
    <h1>Paléo Festival de Nyon</h1>

    <h2>Présentation</h2>
    <p>Le Paléo Festival de Nyon est le plus grand festival de musique en plein
    air de Suisse. Il se tient chaque année en juillet sur la plaine de l'Asse,
    à Nyon, et accueille environ 230 000 spectateurs sur six jours.</p>

    <h2>Les scènes</h2>
    <table>
      <tr>
        <th>Scène</th>
        <th>Capacité</th>
        <th>Style musical</th>
      </tr>
      <tr>
        <td>Grande Scène</td>
        <td>40 000 personnes</td>
        <td>Pop, rock, world</td>
      </tr>
      <tr>
        <td>La Ruche</td>
        <td>12 000 personnes</td>
        <td>Électro, hip-hop</td>
      </tr>
      <tr>
        <td>Le Village du Monde</td>
        <td>8 000 personnes</td>
        <td>Musiques du monde</td>
      </tr>
    </table>

    <h2>Têtes d'affiche</h2>
    <p class="vedette">Coldplay — Grande Scène, vendredi soir</p>
    <p class="vedette">Stromae — Grande Scène, samedi soir</p>
    <p>Des dizaines d'autres artistes se produisent sur les six scènes
    tout au long de la semaine.</p>

    <p class="info">Billetterie: paleo.ch — Prochaine édition: juillet 2026</p>
</body>
</html>
```

La page contient deux classes CSS à définir:
- `vedette`: pour les artistes principaux
- `info`: pour les informations pratiques

Au moyen du CSS:

1.  Le `<h1>` doit être centré, en blanc (`color: white`) sur fond `#1a1a2e`.
2.  Les `<h2>` doivent être en couleur `#e94560`.
3.  La table doit occuper `100%` de la largeur, avec `border-collapse: collapse`
    et une bordure `1px solid #ccc` sur chaque cellule (`td` et `th`).
4.  La classe `vedette` doit être en gras, avec fond `#fff3cd` et `padding` de `6px`.
5.  La classe `info` doit être centrée, en italique et de couleur `#555`.
6.  Le fond de la page doit être `#f4f4f4`.

```{exec} html
:editor: b2c3d4e5-f6a7-8901-bcde-f23456789012
:after: ex-paleo-html
:when: load
:reset: hide
<style>
  /* Écrivez le CSS ici */
</style>
```

````{solution}
```{exec} html
:after: ex-paleo-html
:when: load
:reset: hide
<style>
  h1 {
    text-align: center;
    color: white;
    background-color: #1a1a2e;
  }
  h2 {
    color: #e94560;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td, th {
    border: 1px solid #ccc;
    padding: 6px;
  }
  .vedette {
    font-weight: bold;
    background-color: #fff3cd;
    padding: 6px;
  }
  .info {
    text-align: center;
    font-style: italic;
    color: #555;
  }
  body {
    background-color: #f4f4f4;
  }
</style>
```
````
