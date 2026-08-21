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
3. Cliquez ensuite sur *Open Folder* ou *Ouvrir un dossier* et sélectionnez le dossier que vous avez créé 
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





## Évaluation

Le projet sera évalué avec un coefficient 0.5. Le tableau ci-dessous liste
l'ensemble des critères et leur valeur. Chaque critère est évalué de 0 à la
valeur maximale indiquée.

| Critère | Points |
|---------|:------:|
| **Conception et organisation** | |
| Sujet culturel pertinent (validé par l'enseignant) et plan des 3 pages préparé | 2 |
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
| **Total** | **36** |

## Rendu

1. Vérifiez que votre site fonctionne : ouvrez `index.html` et naviguez entre
   les 3 pages, dans les deux sens.
2. Faites un clic-droit sur le dossier `mon_site` contenant tout le projet.
3. Windows : cliquez sur `Compresser vers... --> Fichier ZIP`.
   MacOS : cliquez sur `Compresser`.
4. Renommez ce fichier ZIP en `prenom_nom_classe.zip`.
   Par exemple `Maxime_Jan_1F8.zip`.
5. Envoyez ce fichier ZIP par email à `maxime.jan@edufr.ch`.

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
