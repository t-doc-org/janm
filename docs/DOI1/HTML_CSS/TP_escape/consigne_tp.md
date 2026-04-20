<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Consignes TP

## Introduction

Durant 3 séances de TP, vous allez mettre en pratique les connaissances et
compétences acquises en HTML et CSS afin de créer votre propre **Escape Game**
sous forme de site web, entièrement en HTML et CSS, et sur VSCode.

Le principe: le joueur se retrouve "enfermé" sur une première page HTML et doit,
en explorant les différentes pages reliées entre elles par des hyperliens, suivre
différentes directions, trouver des indices, résoudre une série d'énigmes et
atteindre la page finale : la "sortie".

Votre escape game est un ensemble de pages HTML reliées entre elles par des
balises `<a>`:

- Chaque **page** représente une pièce, une énigme ou un indice. Chaque pièce
  peut donc avoir du texte, des images, des vidéos, des sons, et son style
  particulier.
- Chaque **lien** entre pages correspond à une action: une porte à ouvrir, un
  tiroir à fouiller, un objet à observer, un choix à effectuer, etc.
- Le joueur doit observer attentivement les pages (texte, images, tableau,
  liste...) pour résoudre des énigmes et savoir **sur quel lien cliquer**
  ensuite.
- Si le joueur se trompe, il peut atterrir sur une page "game over" et devoir
  recommencer depuis le début.

## Déroulement

Le projet est réalisé en 3 phases successives:

1. **Conception**: avant de commencer à coder, il est **obligatoire** de
   dessiner la structure de votre jeu à l'aide de l'outil disponible dans la
   page [Créateur de schéma](createur_schema.md): chaque **bulle** représente
   une page, chaque **flèche étiquetée** représente un lien. Ce schéma sert de
   plan de construction pour votre projet, c'est à ce moment que vous
   réfléchissez à votre histoire, vos énigmes, etc. N'oubliez pas de
   **sauvegarder** votre schéma !

2. **Programmation HTML**: une fois le schéma validé, vous créez les pages HTML.
   Chaque bulle du schéma correspond à un fichier `.html`, et chaque flèche
   correspond à un lien `<a>`. La structure de votre jeu doit correspondre
   exactement à votre schéma.

3. **Programmation CSS**: une fois les pages HTML créées et fonctionnelles, vous
   leur appliquez un style commun via un unique fichier `style.css` lié à toutes
   les pages. C'est à cette étape que vous soignez l'ambiance visuelle de votre
   jeu.


## Organisation du projet

Sur VSCode, créez un dossier `escape_game` dans lequel vous placerez:

- Un fichier `index.html` (page d'accueil du jeu).
- Les autres pages HTML de votre jeu (`salle2.html`, `tiroir.html`,
  `game_over.html`, `fin.html`, ...).
- Un fichier `style.css` commun à toutes les pages.
- Un sous-dossier `images/` pour vos illustrations.

Toutes les pages HTML doivent être reliées au **même** fichier `style.css` via
la balise `<link>` dans le `<head>`.

## Évaluation

Le projet sera évalué avec un coefficient 0.5. Le tableau ci-dessous liste
l'ensemble des critères et leur valeur. Chaque critère est évalué de 0 à la
valeur maximale indiquée.

| Critère | Points |
|---------|:------:|
| **Schéma et organisation** | |
| Schéma préparatoire contenant au moins 10 bulles avec un début et au moins une fin gagnante et une fin perdante | 3 |
| La forme du rendu est respectée en adéquation avec l'organisation demandée | 3 |
| **HTML** | |
| L'escape game est composé d'au moins 10 pages (y compris l'accueil et les fins). La page `index.html` est le départ de l'escape game | 3 |
| Structure HTML complète sur chaque page (`<html>`, `<head>`, `<meta>`, `<title>`, `<body>`) | 2 |
| Toutes les balises HTML travaillées en cours se retrouvent dans le projet utilisées de manière pertinente | 4 |
| Tous les liens du schéma sont fonctionnels et le jeu est jouable de l'accueil à la victoire | 3 |
| **CSS** | |
| Au moins 10 propriétés CSS différentes sont utilisées correctement | 5 |
| Le sélecteur de classe est utilisé de manière pertinente au moins 3 fois | 3 |
| Les balises `<div>` sont utilisées au moins 2 fois de manière pertinente en lien avec une classe et du CSS pour appliquer un même style à un groupe | 2 |
| **Créativité** | |
| Intrigue et énigmes intéressantes | 3 |
| Orthographe et grammaire correcte | 2 |
| Style visuel soigné et ambiance graphique immersive | 3 |
| **Total** | **35** |

## Rendu

Informations à venir...

## Note sur le plagiat

**Important**: ce TP doit être réalisé **individuellement** durant les 3
périodes mises à disposition. En **aucun cas** vous n'avez le droit de:

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
