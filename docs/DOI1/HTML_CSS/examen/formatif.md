% Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{metadata}
orphan: true
hide: [navbar, primary-sidebar, prev-next, footer]
```

# Question 1
Le code HTML ci-dessous comporte plusieurs erreurs. Trouvez-les et corrigez-les
```{exec} html
:editor: 5b087ebf-ac02-47dd-8811-9a059c6b8b24
:style: height: 18rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <title>Bienvenue sur mon site</title>
    <p>Vous trouverez ci-dessous la table des matières<p>
    <li>
        <ul>Qui suis-je ?</ul>
        <ul>Mes passions</ul>
        <ul>Ma famille</ul>
    </li>
    <h2>Une photo de moi en vacances</h2>
    <img scr="https://images.pexels.com/photos/38075655/pexels-photo-38075655.jpeg" widht=200>
  </body>
</html>
```

# Question 2
Complétez la balise `<style>` ci-dessous avec du CSS de sorte à ce que
 - Le fond de la page soit rose
 - Tous les textes de la page soient en vert
 - Les paragraphes aient une taille de 20px
```{exec} html
:editor: dc1171e0-0d77-43f9-8354-f1e47110fb96
:style: height: 18rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>

    </style>
  </head>
  <body>
    <h1>Lorem ipsum dolor sit amet</h1>
    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
  </body>
</html>
```

# Question 3
Modifiez le code HTML et ajoutez du CSS afin de rendre le titre de la page, ainsi que le dernier paragraphe, rouge. Pour cela, vous **devez** utiliser un sélecteur de classe.
```{exec} html
:editor: 956b4dda-24bb-42fc-842d-e8f557d2b3fe
:style: height: 18rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>

    </style>
  </head>
  <body>
    <h1>Lorem ipsum dolor sit amet</h1>
    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
  </body>
</html>
```

# Question 4
Complétez le code HTML ci-dessous sans toucher au CSS de sorte que le titre ainsi que le premier paragraphe aient une couleur de fond orange. Cette couleur de fond ne doit pas être en deux partie.
```{exec} html
:editor: debd44f5-d875-4314-a022-c46c492597c2
:style: height: 18rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
        .fond{
            background-color: orange;
        }
    </style>
  </head>
  <body>
    <h1>Lorem ipsum dolor sit amet</h1>
    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
  </body>
</html>
```