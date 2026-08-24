<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Consignes TP

## Introduction

Durant les premières séances de TP de cette année, vous allez mettre en pratique les connaissances et
compétences acquises en HTML et CSS afin de créer votre propre site Web consacré à un sujet de votre choix.

Vos tâches seront :

1. Trouver un sujet adéquat et motivant
2. Créer une site Web avec HTML et CSS sur ce sujet
3. Effectuer une recherche documentaire sur ce sujet pour compléter votre site


## Choix du sujet
Vous avez une grande liberté dans le choix de votre sujet. Prenez-en un qui vous intéresse, que vous aimez, qui vous motive : le travail n'en sera que plus facile et de meilleure qualité !
Voici quelques exemples de thématiques pour vous inspirer :

 - Site Web pour votre société locale (club de sport, groupe de musique, ...)
 - Site Web fictif pour une équipe de sport, un groupe de musique, ...
 - Blog de critiques (livres, jeux-vidéos, films, ...)
 - Blog de cuisine / voyage / ...
 - Site Web présentant quoi que ce soit (un jeu-vidéo, un réalisateur, un mouvement musical, un évènement, un groupe de musique, ...)
 - Guide touristique pour une ville, un pays
 - Portfolio de créations personnelles (dessins, peinture, textes, photographies, ...)
 - ...

Laissez cours à votre imagination. Veillez simplement à **valider votre sujet auprès de l'enseignant** avant de vous lancer dans la suite du processus.


## Mise en place

1. Sur votre ordinateur, idéalement sur OneDrive, créez un nouveau dossier qui contiendra tous les fichiers de votre site Web
2. Ouvrez (Visual Studio Code)[../vscode.md] et cliquez en haut à gauche sur *File* (ou *Fichier* en français)
3. Cliquez ensuite sur *Open Folder* (*Ouvrir un dossier*) et sélectionnez le dossier que vous avez créé 
```{figure} ../images/openfolder.png
:alt: Ouvrir un dossier sur VSCode
:width: 40%
:align: center
```
4. Une fois votre dossier ouvert, dans l'explorateur à gauche, cliquez sur l'icône *New file*.
```{figure} ../images/newfile.png
:alt: Créer un nouveau fichier sur VSCode
:width: 40%
:align: center
```
5. Entrez le nom **exact** `index.html` : il s'agira de la page d'accueil de votre site Web. Vous répétrez ce processus à chaque fois que vous voudrez créer un nouveau fichier
6. Répétez donc tout de suite cette opération pour créer un fichier `style.css`
7. Dans le fichier HTML, collez le squelette ci-dessous :
```{code} html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>TEST</h1>
  </body>
</html>
```

8. Dans le fichier CSS, écrivez :
```{code} css
h1 {
  color : purple;
}
```

9. Faites un clic-droite dans l'explorateur de fichiers sur `index.html` et cliquez sur `Open in Integreated Browser`. Si une nouvelle fenêtre s'ouvre avec une page contenant le mot *TEST* en violet, la mise en place est terminée.

```{figure} ../images/htmlpreview.png
:alt: Ouvrir un fichier HTML sur VSCode
:width: 60%
:align: center
```

## Recherche documentaire
Lors de la visite de la bibliothécaire, vous effectuerez une recherche documentaire sur votre sujet. Celui-ci peut être élargi afin de trouver des documents pertinents. Durant ces 2 périodes, vous êtes chargés de :

- Trouver 3 sources pertinentes concernant votre sujet sur les plateformes présentées, dont au moins une présente à la biliothèque de STX
- Rédiger une très courte bibliographie contenant ces 3 sources au format demandé dans [le guide du Travail de Maturité](https://new.cscfr.ch/images/stories/media/tm/TM_Guide_2026_27_F.pdf)
- Présenter ces 3 sources à l'enseignant au plus tard durant le dernier TP consacré à ce projet. La source de la bibliothèque doit être présentée en "physique"
- Pour chaque source, rédiger quelques phrases résumant les informations que vous y avez trouvées

## Développement et objectifs

Une fois la mise en place effectuée, développez votre site Web en respectant les conditions suivantes :

 - Le site Web contient au moins 3 pages HTML dont le contenu (images, textes, vidéos, ...) est pertinent dans le sujet choisi
 - Le site Web contient une page HTML contenant votre résultat de la recherche documentaire (bibliographie et résumés)
 - Le site Web utilise correctement au moins une fois toutes les balises HTML travaillées en cours (voir [théorie HTML](../html.md)) de manière pertinente
 - Le site Web utilise correctement au moins 10 propriétés CSS différentes
 - Le site Web utilise des classes et des `div` de manière pertinente
 - Le style visuel du site Web est soigné
 - L'orthographe et la grammaire du site Web sont irréprochables

## Évaluation

Le projet sera évalué avec un coefficient 0.5. Le tableau ci-dessous liste
l'ensemble des critères et leur valeur. Chaque critère est évalué de 0 à la
valeur maximale indiquée.

| Critère | Points |
|---------|:------:|
| **Conception et organisation** | |
| Sujet pertinent (validé par l'enseignant) et plan des pages préparé | 2 |
| Organisation des fichiers conforme (dossier, `index.html`, `style.css`) | 2 |
| **HTML** | |
| Le site comporte 3 pages reliées par un même menu de navigation présent sur chaque page. `index.html` est la page d'accueil | 3 |
| Structure HTML complète sur chaque page (`<html>`, `<head>`, `<meta>`, `<title>`, `<body>`) | 2 |
| Les balises travaillées en cours (titres, paragraphes, listes, images, liens) sont utilisées de manière pertinente | 4 |
| Au moins un `<table>` pertinent et au moins une liste (`<ul>` ou `<ol>`) pertinente | 2 |
| Tous les liens du menu sont fonctionnels sur les 3 pages | 2 |
| **CSS** | |
| Un unique fichier `style.css` est lié à toutes les pages | 1 |
| Au moins 10 propriétés CSS différentes sont utilisées correctement | 5 |
| Le sélecteur de classe est utilisé de manière pertinente au moins 3 fois | 3 |
| Les balises `<div>` sont utilisées au moins 2 fois de manière pertinente, en lien avec une classe et du CSS, pour styliser un groupe | 2 |
| **Contenu et soin** | |
| Contenu informatif exact, suffisant et intéressant | 3 |
| Orthographe et grammaire correctes | 2 |
| Style visuel soigné et cohérent entre les 3 pages | 3 |
| **Recherche documentaire** | |
| 3 sources pertinentes trouvées, dont au moins une empruntée à la bibliothèque de STX et présentée physiquement | 3 |
| Bibliographie rédigée au format demandé dans le guide du Travail de Maturité | 2 |
| Résumé pertinent des informations trouvées pour chacune des 3 sources | 3 |
| La recherche documentaire est présentée sur une page dédiée du site | 1 |
| **Total** | **45** |

## Rendu

[TODO]

## Note sur le plagiat

**Important** : ce TP doit être réalisé **individuellement** durant les 3
périodes mises à disposition. En **aucun cas** vous n'avez le droit de :

- Copier/coller ou recopier manuellement du code provenant d'une source externe
  (intelligence artificielle, template ou tutoriel internet, autre projet, ...).
- Faire appel à une aide externe au cours pour vous aider à avancer
  (intelligence artificielle, membre de la famille, ...).
- Utiliser des concepts HTML ou CSS qui n'ont pas été travaillés en cours cette
  année (balises non vues en cours, JavaScript, frameworks, pseudo-classes
  avancées, flexbox, grid, ...).

L'entre-aide entre élèves est acceptée pour autant que cela n'implique pas de
copier le code de quelqu'un d'autre. Tout manquement à ces règles entraînera
automatiquement la note **1**.
