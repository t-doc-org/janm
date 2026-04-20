<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Introduction à JavaScript

## JavaScript vs Python

En 2ème année, vous découvrez un nouveau langage de programmation :
**JavaScript**. Son rôle principal est de rendre vos pages Web
**dynamiques**, c'est-à-dire capables de réagir aux actions de l'utilisateur
(clics, saisies au clavier, etc.). Mais avant d'interagir avec le HTML et le
CSS, il est essentiel de maîtriser ses bases en tant que langage de
programmation.

Bonne nouvelle : vous connaissez déjà Python, et les deux langages partagent
les mêmes **concepts** (variables, types, opérations, conditions, boucles,
fonctions). Seule la **syntaxe** change. Dans toute cette partie théorique,
vous retrouverez donc systématiquement le code Python mis en parallèle avec
son équivalent JavaScript.

## Inclure JavaScript dans une page Web

En JavaScript, le code doit être écrit à l'intérieur d'une balise `<script>`
placée dans une page HTML. Dans les exercices de ce cours, vous retrouverez
donc toujours la structure suivante :

```{code-block} html
<!DOCTYPE html>
<html>
<body>

  <!-- Contenu HTML ici -->

  <script>
    // Code JavaScript ici
  </script>

</body>
</html>
```

La balise `<script>` se place généralement juste avant la fermeture de
`</body>`, afin que le contenu HTML soit chargé avant l'exécution du code
JavaScript.

Dans la première partie du cours, vous n'utiliserez **pas** le HTML autour du
JavaScript : vous vous concentrerez uniquement sur les bases du langage
(`console.log()`, variables, conditions, boucles, fonctions). La partie HTML
sera abordée ensuite.

## Accolades et indentation

En Python, les blocs d'instructions sont délimités par l'**indentation**
(décalage à droite). En JavaScript, ce sont les **accolades** `{ }` qui
délimitent les blocs.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
if age >= 18:
    print("Majeur")
    print("OK")
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
if (age >= 18) {
    console.log("Majeur");
    console.log("OK");
}
```

</td></tr></table>

En JavaScript, l'indentation n'est donc **pas obligatoire** : on pourrait
tout écrire sur une seule ligne. Cependant, il reste une très bonne pratique
d'indenter son code pour améliorer sa lisibilité.

## Points-virgules

Chaque instruction JavaScript se termine par un **point-virgule** `;`.

```{code-block} javascript
let nom = "Jan";
console.log(nom);
```

## Commentaires

Comme en Python, on peut ajouter des commentaires pour expliquer son code.
La syntaxe est cependant différente : on utilise `//` à la place de `#`.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
# Ceci est un commentaire
prix = 3.2  # en CHF/kg
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
// Ceci est un commentaire
let prix = 3.2; // en CHF/kg
```

</td></tr></table>

JavaScript permet également d'écrire des commentaires sur **plusieurs
lignes** en les entourant de `/*` et `*/` :

```{code-block} javascript
/*
   Ce commentaire occupe
   plusieurs lignes.
*/
```
