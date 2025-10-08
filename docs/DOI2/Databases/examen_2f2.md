---
orphan: true
---

<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```
```{exec} sql
:name: ikariam-create-all
:include: databases/ikariam.sql
:class: hidden
:when: never

```

```{exec} sql
:name: create-client
:class: hidden
:when: never
CREATE TABLE Client(nom TEXT, id_client INTEGER, date_naissance DATE, PRIMARY KEY(id_client AUTOINCREMENT));
```

```{exec} sql
:name: select-ville
:class: hidden
:when: never
select * from Ville;
```


```{exec} sql
:name: select-last2-batiment
:class: hidden
:when: never
select * from Batiment
ORDER BY id_batiment DESC
LIMIT 2;
```

# Examen 2F2
## Question 1 - Des clefs
Pas ici ! Répondez sur l'interface de Exam.net

## Question 2 - Nom ou id de ville ?
Pas ici ! Répondez sur l'interface de Exam.net

## Question 3 -  Créer une table
```{image} images/ikariam.png
:width: 50%
:alt: Schéma relationnel
:align: center
```
Créez la table `Ville` avec une requête SQL en veillant à bien préciser tous les types de données, la clef primaire, et la/les clef(s) étrangère(s).

**N'oubliez pas de copier-coller ce code dans la question Exam.net**

```{exec} sql
:editor: 782a242a-0b57-404e-906c-de49c7cab4cf32
:then: select-ville

```


## Question 4 - SELECT et INSERT
```{image} images/ikariam.png
:width: 50%
:alt: Schéma relationnel
:align: center
```
Pour cet exercice, toutes les tables d'Ikariam ont déjà été créées et des données y ont été insérées.
**N'oubliez pas de copier-coller ces codes dans les questions Exam.net**

1) Sélectionnez toutes les colonnes de la ville `Delos`.
```{exec} sql
:after: ikariam-create-all
:editor: 91be5cc8-63f4-46f0-aefd-4a809209208832

```

2) Ajoutez 2 nouveaux bâtiments dans cette ville
  - Un forum de niveau 1
  - Une caserne de niveau 4

Entre 2 requêtes d'insertion, il ne faut pas oublier le `;`.

```{exec} sql
:after: ikariam-create-all
:editor: f017d659-5d32-4583-9d89-d3edb3de3a1832
:then: select-last2-batiment

```

## Question 5 - Un INSERT erroné
```{image} images/ikariam.png
:width: 50%
:alt: Schéma relationnel
:align: center
```
Pour cet exercice, toutes les tables d'Ikariam ont déjà été créées et des données y ont été insérées.

Exécutez la requête `INSERT` ci-dessous. Pourquoi ne fonctionne-t-elle pas ? Expliquez en 1-2 phrases **sur l'interface Exam.net**.
```{exec} sql
:after: ikariam-create-all
:then: select-ville
INSERT INTO Ville(nom, joueur, population, argent, date_fondation)
VALUES('Fribourg', 'maxime.jan@edufr.ch', 40000, 0.1, '2025-10-07')
```



## Question 6 - Encore des SELECT
```{image} images/ikariam.png
:width: 50%
:alt: Schéma relationnel
:align: center
```
Pour cet exercice, toutes les tables d'Ikariam ont déjà été créées et des données y ont été insérées. Dans toutes les requêtes suivantes, veillez à ne jamais sélectionner plus de données que nécessaire.



1. Affichez tous les noms de ville ayant une population strictement inférieure à 2000 habitants et une somme d'argent supérieure ou égale à 3000 pièces d'or.
```{exec} sql
:after: ikariam-create-all
:editor: 5a829b6a-4de5-404d-99e6-91a227358bbc32

```

2. Affichez tous les pseudos et les adresses emails des joueurs ayant une adresse email `@proton.com`
```{exec} sql
:after: ikariam-create-all
:editor: 01cc8c9a-1b69-4fd4-919a-fcee51d2038d32

```

3. Affichez toutes les colonnes des villes fondées en mars 2024 en les triant de la plus riche à la plus pauvre. Notez que la date est stockée sous le format `aaaa-mm-jj`, donc le 8 octobre 2025 est noté `2025-10-08`.
```{exec} sql
:after: ikariam-create-all
:editor: b157ae71-1bed-4814-a18b-1d3a823e61e932

```

4. Affichez le pseudo du joueur possédant la ville `Naxos`.
```{exec} sql
:after: ikariam-create-all
:editor: 824867f7-1ecf-4174-b748-780e015f97e632

```


5. Affichez les noms de toutes les villes possédant une `Caserne` de niveau strictement supérieur à 7
```{exec} sql
:after: ikariam-create-all
:editor: 2cedfd35-e14a-4710-ba87-5a577b889e4a32

```

**N'oubliez pas de copier-coller ces codes dans les questions Exam.net**

```{image} images/ikariam.png
:width: 50%
:alt: Schéma relationnel
:align: center
```