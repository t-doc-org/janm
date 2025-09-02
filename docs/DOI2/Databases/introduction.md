<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Introduction

## Qu'est-ce qu'une base de données ?

Une base de données peut être définie comme un **ensemble structuré et organisé d’informations**, stockées de manière à pouvoir être consultées, modifiées et exploitées de façon efficace. Contrairement à un simple fichier texte où l'on noterait des données en vrac, une base de données repose sur une logique de structuration qui permet de non seulement retrouver une information rapidement, mais également de limiter la quantité de données enregistrer.

## Tables

Dans le cadre des bases de données relationnelles, qui constituent aujourd’hui le modèle le plus répandu, les informations sont représentées sous forme de tableaux (appelés *tables*). Un tableau représente un **ensemble d'entités** à enregistrer. Par exemple, un tableau pourrait permettre d'enregistrer des données sur des élèves, des articles, ou des vêtements. Le tableau ci-dessous permet quant à lui d'enregistrer les données de matchs de foot.

| id_match | équipe_1         | équipe_2   | score_équipe_1 | score_equipe_2| date |
|--------------|----------------------|----------------|--------------------|--------------------|------------------------|
| 1            | USA                  | Suisse         | 0                  | 4                  | 2025-06-10             |
| 2            | Mexique              | Suisse         | 2                  | 4                  | 2025-06-07             |
| 3            | Suisse               | Luxembourg     | 3                  | 1                  | 2025-03-25             |
| 4            | Northern Ireland     | Suisse         | 1                  | 1                  | 2025-03-21             |
| 5            | Suisse               | Islande        | 2                  | 0                  | 2025-07-06             |

Dans cette table on remarque que :

 - Chaque colonne représente un **attribut** d'un match. C'est-à-dire qu'un match de foot est défini comme étant la combinaison de deux équipes, deux scores, une date, et un ID.
 - Chaque ligne représente **une entité concrète**. Par exemple, la dernière ligne représente le match Suisse-Islande du 7 juin 2025 avec l'ID 5.

On peut ainsi définir une base de données relationnelle comme une collection de ces tables.

 ## Relations entre les tables

 Les tables des bases de données relationnelles sont rarement indépendantes. Celles-ci sont *reliées* entre elles par le biais de certaines colonnes contenant les mêmes valeurs. L'exemple de base de données ci-dessous contient une table représentant des films, et une deuxième contenant des critiques sur ces films.

 | id_film | titre                  | réalisateur       | année |
|---------|------------------------|------------------|-------|
| 1       | Inception              | Christopher Nolan | 2010  |
| 2       | Avatar: The Way of Water | James Cameron    | 2022  |


| id_critique | id_film | nom_critique | note | commentaire                          |
|-------------|---------|--------------|------|--------------------------------------|
| 1           | 1       | Sarah        | 9    | Un film captivant et intelligent.     |
| 2           | 2       | Tom          | 7    | Très intéressant mais un peu complexe.|
| 3           | 2       | Lucas        | 8    | Superbes images, mais un peu long.    |
| 4           | 1       | Inès         | 9    | Magnifique expérience visuelle !      |
| 5           | 2       | Ahmed        | 10   | Meilleur film que j’ai vu cette année.|

Ici, les deux tables partagent l'attribut **id_film**. Grâce à celui-ci, des films de la 1ère table peuvent être liés à des critiques de la 2ème table. Ainsi, Inception a reçu 2 critiques, alors que Avatar en a reçu 3.

## Schémas relationnels

Lorsque la taille des bases de données relationnelles devient importante, il peut être difficile de se repérer entre toutes ses tables. Pour cette raison, on dessine un schéma pour expliquer l'organisation des tables et la manière dont elles sont reliées entre elles. Pour l'exemple précédent de la base de données des films, le schéma relationnel est le suivant : 

```{image} images/movie_schema.png
:width: 50%
:alt: Schéma relationnel de la base de données des films
:align: center
```

Ce schéma nous permet d'observer les éléments suivants :

- La base de données contient 2 tables. Une contenant les données de films, l'autre les données de critique
- Les attributs soulignés sont des **clefs primaires**. Une clef primaire est un attribut dont la valeur sera unique pour chaque entité.
- Une flèche est tirée depuis l'attribut `id_film` de la table critique, vers la clef primaire de la table Film. Cela permet de comprendre que ces deux colonnes reliées contiendront les mêmes valeurs permettant de faire le lien entre un film et une critique.


## Exercices

### Exercice {num1}`exercice`
La base de données partielle ci-dessous contient des données relatives à l'organisation de Paléo 2025. En lisant manuellement ces données, répondez à ces questions.

```{role} input(quiz-input)
:right: width: 18rem; clear: right;
:check: split lowercase
```

```{quiz}
1. {input}`suisse`
De quel pays vient *Me & George* ?

2. {input}`22:45`
A quelle heure est programmé *David Guetta* ?

3. {input}`3`
Combien de concerts sont programmés sur la *Grande Scène* ?

4. {input}`Trinix`
Quel artiste se produit-il sur la scène *Les Arches* ?
```


| id_artiste | nom                       | pays    |
|------------|---------------------------|---------|
| 1          | Queens of the Stone Age   | USA     |
| 2          | Zaho de Sagazan           | France  |
| 3          | David Guetta              | France  |
| 4          | Trinix                    | France  |
| 5          | Me & George               | Suisse  |

| id_scene | nom           | capacite_approx |
|----------|---------------|-----------------|
| 1        | Grande Scène  | 35000           |
| 2        | Belleville    | 10000           |
| 3        | Les Arches    | 8000            |


| id_prog | id_artiste | id_scene | heure_debut |
|---------|------------|------------|-------------|
| 1       | 2          | 2          | 21:00       |
| 2       | 1          | 1          | 23:45       |
| 3       | 5          | 1          | 20:40       |
| 4       | 4          | 3          | 23:45       |
| 5       | 3          | 1          | 22:45       |


### Exercice {num1}`exercice`
Sur un bout de papier, ou de manière numérique, établissez le schéma relationnel de la base de données de Paléo de l'exercice précédent.

### Exercice {num1}`exercice`
Dessinez le schéma relationnel de la base de données d'une version "light" d'Instagram, telle qu’elle pouvait l'être dans les premières années d'existence de l'application.
- Instagram possède des utilisateurs qui, en s’inscrivant, doivent donner un pseudo, une adresse e-mail et un mot de passe.
- Les utilisateurs peuvent poster des photos et des vidéos. Les postes de cette version d’Instagram ne peuvent contenir qu’une seule image ou une seule vidéo, ainsi qu’une description, et une localisation. Il faut noter qu’il est impossible de stocker une image ou une vidéo dans un tableau. A la place on stocke le chemin d’accès (par exemple C:/Users/…/photo4193.jpeg).
- Chaque poste peut être commenté par d’autres utilisateurs.