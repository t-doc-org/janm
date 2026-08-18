<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Introduction

## Qu'est-ce qu'une base de données ?

Une base de données peut être définie comme un **ensemble structuré et organisé d’informations**, stockées de manière à pouvoir être consultées, modifiées et exploitées de façon efficace. Contrairement à un simple fichier texte où l'on noterait des données en vrac, une base de données repose sur une logique de structuration qui permet de non seulement retrouver une information rapidement, mais également de limiter la quantité de données enregistrées.

## Tables

Dans le cadre des bases de données relationnelles, qui constituent aujourd’hui le modèle le plus répandu, les informations sont représentées sous forme de tableaux (appelés *tables*). Un tableau représente un **ensemble d'entités** à enregistrer. Par exemple, un tableau pourrait permettre d'enregistrer des données sur des élèves, des articles, ou des vêtements. Le tableau ci-dessous permet quant à lui d'enregistrer les données de matchs de foot.

| id_match | équipe_1         | équipe_2   | score_équipe_1 | score_équipe_2 | date |
|--------------|----------------------|----------------|--------------------|--------------------|------------------------|
| 1            | USA                  | Suisse         | 0                  | 4                  | 2025-06-10             |
| 2            | Mexique              | Suisse         | 2                  | 4                  | 2025-06-07             |
| 3            | Suisse               | Luxembourg     | 3                  | 1                  | 2025-03-25             |
| 4            | Northern Ireland     | Suisse         | 1                  | 1                  | 2025-03-21             |
| 5            | Suisse               | Islande        | 2                  | 0                  | 2025-07-06             |

Dans cette table on remarque que :

 - Chaque colonne représente un **attribut** d'un match. C'est-à-dire qu'un match de foot est défini comme étant la combinaison de deux équipes, deux scores, une date, et un ID.
 - Chaque ligne représente **une entité concrète**. Par exemple, la dernière ligne représente le match Suisse-Islande du 6 juillet 2025 avec l'ID 5.

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

```{role} input(quiz-input)
:right: width: 18rem; clear: right;
:check: split lowercase
```

```{role} num(quiz-input)
:right: width: 5rem; clear: right;
:check: trim
```

```{role} ouinon(quiz-select)
:right:
:options: |
: oui
: non
```

### Exercice {num1}`exercice`
La table ci-dessous provient de la base de données d'un aéroport et enregistre les vols du jour.
Lisez-la attentivement et répondez aux questions.

| id_vol | compagnie | ville_depart | ville_arrivee | heure_depart | retard_min |
|--------|-----------|--------------|---------------|--------------|------------|
| 1      | Swiss     | Genève       | Lisbonne      | 07:15        | 0          |
| 2      | EasyJet   | Genève       | Barcelone     | 09:40        | 25         |
| 3      | Swiss     | Zurich       | New York      | 13:05        | 0          |
| 4      | Edelweiss | Zurich       | Palma         | 06:30        | 45         |
| 5      | EasyJet   | Bâle         | Berlin        | 18:20        | 10         |
| 6      | Swiss     | Genève       | Londres       | 20:55        | 5          |

```{quiz}
1. {num}`6`
Combien d'**attributs** un vol possède-t-il ?

2. {num}`6`
Combien d'**entités** cette table contient-elle ?

3. {input}`id_vol`
Quelle colonne peut faire office de **clef primaire** ?

4. {input}`Palma`
Quelle est la ville d'arrivée du vol représenté par la 4ème ligne ?

5. {num}`3`
Combien de vols partent de Genève ?

6. {num}`3`
Combien de compagnies différentes apparaissent dans cette table ?
```

### Exercice {num1}`exercice`
Pour chacune des colonnes ci-dessous, déterminez si elle peut faire office de **clef primaire**
de sa table. Rappelez-vous qu'une clef primaire doit avoir une valeur **unique** pour chaque
entité, et ce pour toujours.

```{quiz}
:style: max-width: 34rem;
1. {ouinon}`oui`
L'adresse e-mail d'un utilisateur

2. {ouinon}`non`
Le nom de famille d'un élève

3. {ouinon}`oui`
La plaque d'immatriculation d'une voiture

4. {ouinon}`non`
La date de naissance d'un client

5. {ouinon}`non`
Le titre d'un livre

6. {ouinon}`oui`
Le numéro ISBN d'un livre

7. {ouinon}`non`
Le mot de passe d'un utilisateur

8. {ouinon}`non`
Le nom d'une ville
```

````{solution}
Les colonnes 2, 4, 5, 7 et 8 ne conviennent pas car **rien ne garantit que leur valeur soit
unique** : deux élèves peuvent avoir le même nom de famille, deux clients peuvent être nés le
même jour, deux livres différents peuvent porter le même titre, deux utilisateurs peuvent
choisir le même mot de passe, et plusieurs villes de Suisse s'appellent *Villars*.

Les colonnes 1, 3 et 6 conviennent car leur unicité est garantie : une adresse e-mail, une plaque
d'immatriculation et un numéro ISBN sont attribués à un seul élément à la fois.

Lorsqu'aucune colonne ne convient, on en crée une exprès (`id_eleve`, `id_livre`, ...).
````

### Exercice {num1}`exercice`
La base de données partielle ci-dessous contient des données relatives à l'organisation de Paléo 2025. En lisant manuellement ces données, répondez à ces questions.

```{quiz}
1. {input}`suisse`
De quel pays vient *Me & George* ?

2. {input}`22:45`
A quelle heure est programmé *David Guetta* ?

3. {num}`3`
Combien de concerts sont programmés sur la *Grande Scène* ?

4. {input}`Trinix`
Quel artiste se produit-il sur la scène *Les Arches* ?

5. {input}`Belleville`
Sur quelle scène joue *Zaho de Sagazan* ?

6. {input}`David Guetta`
Quel artiste joue sur la *Grande Scène* à 22:45 ?

7. {input}`23:45`
À quelle heure deux concerts ont-ils lieu en même temps ?

8. {num}`3`
Combien d'artistes français sont programmés ?
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


| id_prog | artiste | scene | heure_debut |
|---------|------------|------------|-------------|
| 1       | 2          | 2          | 21:00       |
| 2       | 1          | 1          | 23:45       |
| 3       | 5          | 1          | 20:40       |
| 4       | 4          | 3          | 23:45       |
| 5       | 3          | 1          | 22:45       |

```{note}
Pour répondre aux questions 5 à 8, vous avez dû **naviguer entre deux ou trois tables** : partir
d'un artiste, passer par la programmation, puis arriver à une scène. C'est exactement ce travail
que l'instruction `JOIN` fera automatiquement pour vous à la fin de ce chapitre.
```


### Exercice {num1}`exercice`
Sur un bout de papier, ou de manière numérique, établissez le schéma relationnel de la base de données de Paléo de l'exercice précédent.

````{solution}
```{image} images/ex2.png
:width: 60%
:alt: Solution de l'exercice sur le schéma relationnel de Paléo
:align: center
```
````

### Exercice {num1}`exercice`
Le schéma relationnel ci-dessous est celui d'un cabinet vétérinaire. Il contient **trois
défauts**. Retrouvez-les, puis proposez une version corrigée du schéma.

```{image} images/veto_faux.png
:width: 85%
:alt: Schéma relationnel fautif d'un cabinet vétérinaire
:align: center
```

````{solution} Indices
- Regardez d'abord quelles tables possèdent une clef primaire, et lesquelles n'en ont pas.
- Ensuite, pour chaque clef primaire, demandez-vous si sa valeur est vraiment **unique**.
- Enfin, cherchez une information qui est enregistrée **à deux endroits différents**.
````

````{solution}
**Défaut 1 — la table `Proprietaire` n'a pas de clef primaire.** Aucune de ses colonnes n'est
soulignée. Deux propriétaires peuvent porter le même nom, il faut donc créer un
`id_proprietaire`.

**Défaut 2 — la clef primaire de `Animal` est mal choisie.** Le nom d'un animal n'a rien
d'unique : deux chats peuvent s'appeler *Minou*. Il faut créer un `id_animal`. Au passage, la
table `Consultation` n'a elle non plus aucune clef primaire.

**Défaut 3 — les informations du propriétaire sont enregistrées deux fois.** Les colonnes
`nom_proprietaire` et `telephone_proprietaire` de la table `Consultation` répètent des données
qui se trouvent déjà dans la table `Proprietaire`. Si un propriétaire change de numéro de
téléphone, il faudrait le modifier à des dizaines d'endroits, et on risque d'oublier. Ces deux
colonnes doivent être supprimées : on peut retrouver le propriétaire en passant par l'animal.

```{image} images/veto_correct.png
:width: 90%
:alt: Version corrigée du schéma relationnel du cabinet vétérinaire
:align: center
```
````

### Exercice {num1}`exercice`
Dessinez le schéma relationnel d'une base de données permettant à un site de partage de vidéos
d'enregistrer ses chaînes et leurs vidéos.

- Une chaîne est décrite par un pseudo, une adresse e-mail et une date de création.
- Une vidéo est décrite par un titre, une durée, une date de publication et un nombre de vues.
- Chaque vidéo est publiée par une seule chaîne, mais une chaîne peut publier autant de vidéos
  qu'elle le souhaite.

````{solution}
La chaîne peut utiliser son e-mail comme clef primaire (une adresse e-mail est unique), mais
créer un `id_chaine` reste plus simple. Le pseudo, lui, ne convient pas nécessairement : deux
chaînes pourraient le porter.

Pour la vidéo, aucune colonne n'est garantie unique (deux chaînes peuvent publier une vidéo avec
le même titre le même jour), il faut donc obligatoirement créer un `id_video`.

C'est la table `Video` qui contient la clef étrangère `chaine`, et non l'inverse : si on mettait
une colonne `video` dans la table `Chaine`, on ne pourrait enregistrer qu'**une seule** vidéo par
chaîne.

```{image} images/youtube_schema.png
:width: 60%
:alt: Solution du schéma relationnel du site de partage de vidéos
:align: center
```
````

### Exercice {num1}`exercice`
Dessinez le schéma relationnel de la base de données d'une version "light" d'Instagram, telle qu’elle pouvait l'être dans les premières années d'existence de l'application.
- Instagram possède des utilisateurs qui, en s’inscrivant, doivent donner un pseudo, une adresse e-mail et un mot de passe.
- Les utilisateurs peuvent poster des photos et des vidéos. Les postes de cette version d’Instagram ne peuvent contenir qu’une seule image ou une seule vidéo, ainsi qu’une description, et une localisation. Il faut noter qu’il est impossible de stocker une image ou une vidéo dans un tableau. A la place on stocke le chemin d’accès (par exemple C:/Users/…/photo4193.jpeg).
- Chaque poste peut être commenté par d’autres utilisateurs.


````{solution}
Pour cet exercice, des solutions alternatives proches de celle ci-dessous sont possibles. Notamment, la clef primaire de la table `Utilisateur` pourrait être l'email ou un nouveau champ `id_utilisateur`. En revanche, la colonne `mot_de_passe` ne peut pas être clef primaire car plusieurs utilisateurs pourraient avoir le même mot de passe.

En ce qui concerne la table `Post`, il est impératif de créer un `id_post` pour faire office de clef primaire, car aucune des autres colonnes n'est garantie comme étant unique.

Finalement, la table des commentaires doit bien contenir 2 clefs étrangères (référençant le post sur lequel le commentaire est fait, et quel utilisateur l'a écrit) en plus du texte en lui-même. Cette table ne doit pas forcément contenir de clef primaire, mais on peut y ajouter un `id_commentaire` si besoin.
```{image} images/ex3.png
:width: 60%
:alt: Solution du schéma relationnel de la version light d'Instagram
:align: center
```
````
