% Copyright 2024 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{role} html(code)
:language: html
```

# Bootstrap

**Bootstrap** est un *framework* CSS : une collection de styles déjà écrits que
l'on ajoute à une page pour la mettre en forme rapidement, sans avoir à écrire
soi-même tout le CSS. Il a été créé à l'origine par Twitter et il est aujourd'hui
très utilisé dans le développement web.

Bootstrap propose beaucoup d'outils (boutons, menus, fenêtres...), mais dans ce
chapitre nous nous concentrons sur **une seule chose** : la **grille**, qui permet
d'organiser le contenu d'une page en **lignes** et en **colonnes**.

## Installer Bootstrap

Pour utiliser Bootstrap sur une page, il suffit d'ajouter deux balises dans le
fichier HTML.

1. Dans la balise `<head>`, ajoutez la balise `<link>` ci-dessous. Elle charge
   les styles de Bootstrap :

```{code} html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
```

2. Juste avant la **fermeture** de la balise `</body>`, ajoutez la balise
   `<script>` ci-dessous. Elle charge les fonctionnalités interactives :

```{code} html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
```

## La grille : lignes et colonnes

La grille de Bootstrap repose sur **trois classes** que l'on emboîte les unes dans
les autres :

1. `container` : la zone qui contient toute la grille.
2. `row` : une **ligne** de la grille.
3. `col` : une **colonne** à l'intérieur d'une ligne.

L'idée est toujours la même : un `container` contient des `row` (les lignes), et
chaque `row` contient des `col` (les colonnes).

### Le conteneur `container`

On place d'abord tout le contenu dans une balise `<div>` ayant la classe
`container`. Elle centre le contenu et lui donne une largeur adaptée à l'écran.

```{code} html
<body>
  <div class="container">
    ...
  </div>
</body>
```

### Les lignes `row`

À l'intérieur du `container`, on groupe dans une `<div class="row">` tous les
éléments qui doivent apparaître sur la **même ligne**. Ici, il y aurait donc
trois lignes distinctes, l'une en dessous de l'autre :

```{code} html
<div class="container">
  <div class="row"> ... </div>
  <div class="row"> ... </div>
  <div class="row"> ... </div>
</div>
```

### Les colonnes `col`

Enfin, à l'intérieur de chaque ligne, on entoure chaque élément d'une
`<div class="col">`. Toutes les colonnes d'une même ligne se partagent
**automatiquement et à parts égales** la largeur disponible : deux `col` occupent
chacune la moitié de la ligne, trois `col` occupent chacune un tiers, et ainsi de
suite.

```{code} html
<div class="container">
  <div class="row">
    <div class="col"> Colonne 1 </div>
    <div class="col"> Colonne 2 </div>
    <div class="col"> Colonne 3 </div>
  </div>
</div>
```

Voici un exemple complet, **rendu par le navigateur**. Chaque colonne est colorée
pour bien voir comment la grille répartit l'espace : trois colonnes égales sur la
première ligne, deux sur la deuxième, une seule (toute la largeur) sur la
troisième.

```{exec} html
:when: load
:style: height: 22rem;
:output-style: height: 14rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <style>
      .col { background-color: lightblue; border: 1px solid steelblue; padding: 8px; }
      .row { margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col">1re colonne</div>
        <div class="col">2e colonne</div>
        <div class="col">3e colonne</div>
      </div>
      <div class="row">
        <div class="col">1re de 2 colonnes</div>
        <div class="col">2e de 2 colonnes</div>
      </div>
      <div class="row">
        <div class="col">Sur cette ligne il n'y a qu'une colonne</div>
      </div>
    </div>
  </body>
</html>
```

```{note}
Sur un petit écran (téléphone), les colonnes d'une même ligne se placent
automatiquement **les unes en dessous des autres** pour rester lisibles. C'est
tout l'intérêt de Bootstrap : la mise en page s'adapte à la taille de l'écran.
```

## Exercices

### Exercice {num2}`exercice`

Notez la classe Bootstrap qui permet de :

```{role} input(quiz-input)
:right: width: 10rem;
:check: json trim
```

```{quiz}
:style: max-width: 40rem;
1.  {input}`{"container": true}`
    ... créer la zone qui contient toute la grille ?
2.  {input}`{"row": true}`
    ... créer une **ligne** ?
3.  {input}`{"col": true}`
    ... créer une **colonne** à l'intérieur d'une ligne ?
```

### Exercice {num2}`exercice`

Lisez le code ci-dessous **sans l'exécuter** et prédisez le résultat.

```{code-block} html
<div class="container">
  <div class="row">
    <div class="col">A</div>
    <div class="col">B</div>
    <div class="col">C</div>
    <div class="col">D</div>
  </div>
  <div class="row">
    <div class="col">E</div>
    <div class="col">F</div>
  </div>
</div>
```

```{role} rep(quiz-input)
:right: width: 6rem;
:check: json lowercase trim
```

```{role} ouinon(quiz-select)
:right:
:options: |
: oui
: non
```

```{role} largeur(quiz-select)
:right: width: 9rem;
:options: |
: plus larges
: plus étroites
```

```{quiz}
:style: max-width: 46rem;
1. {rep}`{"4": true}`
Combien de colonnes y a-t-il sur la **première** ligne ?

2. {ouinon}`non`
La colonne E est-elle sur la même ligne que la colonne A ?

3. {ouinon}`oui`
Les quatre colonnes de la première ligne ont-elles toutes la **même largeur** ?

4. {ouinon}`oui`
Une colonne de la **première** ligne est-elle plus **étroite** qu'une colonne de la **deuxième** ligne ?

5. {largeur}`plus étroites`
Si on ajoutait une cinquième colonne à la première ligne, les colonnes de cette ligne deviendraient...
```

````{solution}
1.  **4 colonnes** (A, B, C, D).
2.  **Non.** E est dans la **deuxième** `row`, donc sur une nouvelle ligne, en
    dessous de A.
3.  **Oui.** Les `col` d'une même ligne se partagent la largeur **à parts égales** :
    ici chacune occupe un quart de la ligne.
4.  **Oui.** Sur la première ligne, chaque colonne occupe un **quart** de la largeur ;
    sur la deuxième, chaque colonne en occupe la **moitié**. Une colonne de la première
    ligne est donc deux fois plus étroite.
5.  **Plus étroites.** Comme les colonnes se partagent toujours la largeur à parts
    égales, ajouter une colonne réduit la part de chacune : un **cinquième** de la
    ligne au lieu d'un quart.
````

### Exercice {num2}`exercice`

La page ci-dessous devrait afficher les trois colonnes **côte à côte**, mais elles
s'affichent les unes **en dessous** des autres. Exécutez le code pour observer le
problème, puis corrigez-le.

```{exec} html
:editor: b7f1c2a3-0001-4aaa-9bbb-a10000000001
:style: height: 20rem;
:output-style: height: 12rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <style>
      .col { background-color: lightblue; border: 1px solid steelblue; padding: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="col">Colonne 1</div>
      <div class="col">Colonne 2</div>
      <div class="col">Colonne 3</div>
    </div>
  </body>
</html>
```

````{solution}
Il manque la ligne `<div class="row"> ... </div>` **autour** des colonnes. Une
colonne (`col`) ne se place correctement que si elle est à l'intérieur d'une ligne
(`row`). Sans `row`, les colonnes ne se répartissent pas et s'empilent.

```{exec} html
:when: load click
:editor:
:style: height: 20rem;
:output-style: height: 12rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <style>
      .col { background-color: lightblue; border: 1px solid steelblue; padding: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col">Colonne 1</div>
        <div class="col">Colonne 2</div>
        <div class="col">Colonne 3</div>
      </div>
    </div>
  </body>
</html>
```
````

### Exercice {num2}`exercice`

En utilisant l'éditeur ci-dessous, complétez la `row` pour obtenir une **galerie de
trois photos** côte à côte. La première colonne est déjà remplie : elle contient un
sous-titre `<h3>`, une image `<img>` et une légende `<p>`. Ajoutez les **deux
colonnes manquantes** sur le même modèle (utilisez les images
`https://picsum.photos/id/1025/200/140` et `https://picsum.photos/id/1003/200/140`).

```{exec} html
:editor: b7f1c2a3-0002-4aaa-9bbb-a10000000002
:style: height: 26rem;
:output-style: height: 18rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <style>
      .col { background-color: lightblue; border: 1px solid steelblue; padding: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Photo 1</h3>
          <img src="https://picsum.photos/id/1020/200/140">
          <p>Une vue de la nature.</p>
        </div>
        <!-- Ajoutez ici les deux autres colonnes, sur le même modèle -->
      </div>
    </div>
  </body>
</html>
```

````{solution}
```{exec} html
:when: load click
:editor:
:style: height: 26rem;
:output-style: height: 18rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <style>
      .col { background-color: lightblue; border: 1px solid steelblue; padding: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Photo 1</h3>
          <img src="https://picsum.photos/id/1020/200/140">
          <p>Une vue de la nature.</p>
        </div>
        <div class="col">
          <h3>Photo 2</h3>
          <img src="https://picsum.photos/id/1025/200/140">
          <p>Un ami à quatre pattes.</p>
        </div>
        <div class="col">
          <h3>Photo 3</h3>
          <img src="https://picsum.photos/id/1003/200/140">
          <p>Un moment en plein air.</p>
        </div>
      </div>
    </div>
  </body>
</html>
```
````

### Exercice {num2}`exercice`

Le contenu de la fiche ci-dessous est déjà écrit, mais il n'a **aucune structure de
grille** : tout s'affiche les uns en dessous des autres. Ajoutez les `div`
(`container`, `row` et `col`) pour l'organiser en **deux lignes** :

1. une première ligne avec **deux colonnes** : l'image à gauche, le titre `<h2>` et
   le paragraphe `<p>` à droite ;
2. une deuxième ligne avec **une seule colonne** contenant le second `<h2>` et la
   liste `<ul>`.

N'ajoutez que des `div` : ne modifiez pas les autres balises.

```{exec} html
:editor: b7f1c2a3-0003-4aaa-9bbb-a10000000003
:style: height: 26rem;
:output-style: height: 18rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <style>
      .col { background-color: lightblue; border: 1px solid steelblue; padding: 8px; }
      .row { margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <img src="https://picsum.photos/id/1062/260/180">
    <h2>Le renard</h2>
    <p>Le renard roux est un petit carnivore très répandu en Europe. Il est
    reconnaissable à son pelage roux et à sa longue queue touffue.</p>
    <h2>Ses caractéristiques</h2>
    <ul>
      <li>Pelage roux et queue touffue</li>
      <li>Animal surtout nocturne</li>
      <li>Se nourrit de petits rongeurs, de fruits et d'insectes</li>
    </ul>
  </body>
</html>
```

````{solution}
```{exec} html
:when: load click
:editor:
:style: height: 30rem;
:output-style: height: 20rem;
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <style>
      .col { background-color: lightblue; border: 1px solid steelblue; padding: 8px; }
      .row { margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col">
          <img src="https://picsum.photos/id/1062/260/180">
        </div>
        <div class="col">
          <h2>Le renard</h2>
          <p>Le renard roux est un petit carnivore très répandu en Europe. Il est
          reconnaissable à son pelage roux et à sa longue queue touffue.</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>Ses caractéristiques</h2>
          <ul>
            <li>Pelage roux et queue touffue</li>
            <li>Animal surtout nocturne</li>
            <li>Se nourrit de petits rongeurs, de fruits et d'insectes</li>
          </ul>
        </div>
      </div>
    </div>
  </body>
</html>
```
````
