% Copyright 2024 Caroline Blank <caro@c-space.org>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

# CSS

Le langage **CSS** (**C**ascading **S**tyle **S**heet en français feuilles de
style en cascade) permet de mettre en forme les documents HTML. Il permet
notamment de modifier la police, la couleur, la taille et l'emplacement du
contenu.\
CSS est un langage basé sur des règles: il permet de définir des règles de style
pour un type d'élément donné, par exemple les titres principaux `<h1></h1>` ou
les paragraphes `<p></p>`

## Structure du code CSS

La règle commence par un sélecteur qui indique à quelles balises cette règle
doit s'appliquer. Ensuite, la liste des propriétés ainsi que leurs valeurs sont
indiquées entre accolades.

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

(referencement)=
## Référencement

Comme le ficher HTML (`.html`) et le fichier CSS (`.css`) sont deux fichiers
distincts, il faut ajouter au document HTML une référence au fichier CSS. Cela
se fait dans le `<head>` du document HTML avec la balise `<link>`.

La balise `<link>` a deux attributs:

1. `rel` (précise à quoi sert le fichier référencé)
2. `href` (chemin d'accès au document):

```{code} html
<link href="style.css" rel="stylesheet" type="text/css"/>
```

## Sélecteur

Dans ce cours, nous allons travailler sur 3 types de sélecteurs:

1. Sélecteur de type
2. Sélecteur d'identifiant
3. Sélecteur de classe

### Sélecteur de type

Le sélecteur de type permet d'appliquer un style à toutes les balises de même
type (`h1`, `h2`, `p`, ...).

Il est de la forme:

```{code} css
h1 {                      /* Cette règle définit le style du titre principal. */
  color: green;           /* La couleur du texte est verte. */
  text-align: center;     /* L'alignement du texte est centré. */
}
```

Ce style s'appliquera au contenu de toutes les balises `<h1>...</h1>`

### Sélecteur d'identifiant

Le sélecteur d'identifiant permet d'appliquer un style à un élément précis. Pour
cela, il faut ajouter un nouvel attribut `id` à la balise HTML concernée.

<table><tr style="text-align: center">
  <th>Fichier HTML</th><th>Fichier CSS</th>
</tr><tr><td>

```{code} html
<p id="intro">
Dans ce paragraphe, j'écris
l'introduction de mon texte.
</p>
```

</td><td style="padding-left: 1rem">

```{code} css
#intro {
  text-align: justify;
  color: blue;
}
```

</td></tr></table>

Ce style ne s'appliquera qu'à un élément unique, la balise dont l'`id` est
"intro".

### Sélecteur par classe

Le sélecteur de classe permet d'appliquer un style à plusieurs éléments qui
appartiennent à une même classe (groupe). Pour cela, il faut ajouter un nouvel
attribut class à la balise HTML concernée.

<table><tr style="text-align: center">
  <th>Fichier HTML</th><th>Fichier CSS</th>
</tr><tr><td>

```{code} html
<p class="centre">
Le texte de ce paragraphe sera centré.
</p>
```

</td><td style="padding-left: 1rem">

```{code} css
.centre {
  text-align: center;
}
```

</td></tr></table>

Ce style ne s'appliquera qu'aux balises dont la classe est "centre".

[Tuto](https://developer.mozilla.org/fr/docs/Learn/Getting_started_with_the_web/CSS_basics)
bases du CSS.

## Conteneurs `<div>`

Un conteneur est un élément qui contient plusieurs éléments et qui est défini
comme un bloc. Il est défini en HTML par la balise `<div>...</div>`. Dans le
fichier CSS, il est possible de définir différentes propriétés d'un bloc, comme
la hauteur (height), la largeur (width), la marge intérieure (padding), la marge
extérieure (margin) ou la bordure (border).

```{image} images/conteneur.png
:alt: Définition des marges d'un conteneur
:align: center
```

<table><tr style="text-align: center">
  <th>Fichier HTML</th><th>Fichier CSS</th>
</tr><tr><td>

```{code} html
<div id="mon_conteneur">
<h2> Mon sous-titre</h2>
<p> Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Suspendisse ut erat eu risus
pharetra volutpat eu eget velit. Suspendisse
ultrices felis a facilisis feugiat. </p>
</div>
```

</td><td style="padding-left: 1rem">

```{code} css
#mon_conteneur {
  background_color: red;
  width: 100%;
  height: 400px:
  border: 2px solid;
  padding: 1em;
}
```

</td></tr></table>

## Exercices

### Exercice 4

But: Appliquer un fichier CSS au document index.html.

1. Télécharger le fichier [`style.css`](style.css) et le sauvegarder sur
   OneDrive dans le dossier "Informatique/HTML-CSS/exercices".
2. Ajouter le référencement à la page `style.css` dans le `<head>` du document
   `index.html`. (cf. [](#referencement))
3. Actualiser la page du navigateur (appuyer sur {kbd}`F5`).

### Exercice 5

1. Qu'est-ce qui a changé?
2. Cliquer sur `style.css` pour que le document s'afficher et essayer de le
   comprendre.
    - À quels éléments s'appliquent les différentes propriétés?
    - Quelle est la différence entre `h1{...}` et `#source{...}`? Quand va-t-on
      utiliser le deuxième?
3. Vous allez maintenant modifier cette page.Pour valider une modification:
    - Sauvegarder le document dans VSCode ({kbd}`ctrl` + {kbd}`s` ou
      {kbd}`command` + {kbd}`s`).
    - Actualiser la page du navigateur (appuyer sur {kbd}`F5`).
4. Modifier la couleur des titres et des sous-titres. Vous pouvez utiliser
   les noms en anglais ou le code RGB.\
   [Liste des couleurs](https://www.rapidtables.com/web/color/RGB_Color.html)
5. Modifier la police de caractère (font) des titres (pas des sous-titres) en
   "fantasy".
6. Modifier la couleur de fond de la page HTML.
7. Ajouter une couleur de fond aux titres et aux sous-titres.
8. Modifier le code pour que toutes les sources s'affichent en gris foncé.
   (Il faut utiliser un sélecteur de classe.)
9. Ajouter une bordure au tableau.

### Exercice 6

À vous de jouer! Réfléchir à la structure de votre site internet:

1. Quelles seront les différentes pages?
2. Nommer la première page de votre site `index.html`. Vous pouvez en créer
   d'autres et les référencer avec des liens pour pouvoir naviguer entre les
   différentes pages de votre site. (cf. [](#hyperliens))
3. Quel sera le style de votre site? Pouvez-vous le réaliser avec les outils vus
   en classe? Sinon rechercher sur internet comment faire.

## Liens utiles

- [Tuto](https://developer.mozilla.org/fr/docs/Web/HTML) pour le HTML.
- [Tuto](https://developer.mozilla.org/fr/docs/Web/CSS) pour le CSS.
- [Tuto](https://www.w3schools.com/) en anglais.
