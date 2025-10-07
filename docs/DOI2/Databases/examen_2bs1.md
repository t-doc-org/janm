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
:name: select-batiment
:class: hidden
:when: never
select * from Batiment;
```


```{exec} sql
:name: select-last2-batiment
:class: hidden
:when: never
select * from Batiment
ORDER BY id_batiment DESC
LIMIT 2;
```

# Examen 2BS1
## Question 1 - Des clefs
Pas ici ! Répondez sur l'interface de Exam.net

## Question 2- Nom ou id de ville ?
Pas ici ! Répondez sur l'interface de Exam.net

## Question 3 -  Créer une table
```{image} images/ikariam.png
:width: 50%
:alt: Schéma relationnel
:align: center
```
Créez la table `Batiment` avec une requête SQL en veillant à bien préciser tous les types de données, la clef primaire, et la/les clef(s) étrangère(s).

**N'oubliez pas de copier-coller ce code dans la question Exam.net**

```{exec} sql
:editor: b90c7327-a07d-44e4-986e-0918b59c0599
:then: select-batiment

```


## Question 4 - SELECT et INSERT
Pour cet exercice, toutes les tables d'Ikariam ont déjà été créées et des données y ont été insérées.
**N'oubliez pas de copier-coller ces codes dans les questions Exam.net**

1) Sélectionnez toutes les colonnes de la ville `Syros`.
```{exec} sql
:after: ikariam-create-all
:editor: 5dc10543-2fa7-43a0-8bba-5094e876d250

```

2) Ajoutez 2 nouveaux bâtiments dans cette ville
  - Un forum de niveau 1
  - Une caserne de niveau 4

Entre 2 requêtes d'insertion, il ne faut pas oublier le `;`.

```{exec} sql
:after: ikariam-create-all
:editor: c694e795-284d-4308-8b16-21e270ea3b5f
:then: select-last2-batiment

```

## Question 5 - Un INSERT erroné
Pour cet exercice, toutes les tables d'Ikariam ont déjà été créées et des données y ont été insérées.

Exécutez la requête `INSERT` ci-dessous. Pourquoi ne fonctionne-t-elle pas ? Expliquez en 1-2 phrases 

**N'oubliez pas de copier-coller ce code sur l'interface Exam.net**.
```{exec} sql
:after: ikariam-create-all
:then: select-ville
INSERT INTO Ville(nom, joueur, population, argent, date_fondation)
VALUES('Fribourg', 'maxime.jan@edufr.ch', 40000, 0.1, '2025-10-07')
```



## Question 6 - Encore des SELECT
Pour cet exercice, toutes les tables d'Ikariam ont déjà été créées et des données y ont été insérées. Dans toutes les requêtes suivantes, veillez à ne jamais sélectionner plus de données que nécessaire.



1. Affichez tous les noms de ville ayant une population strictement inférieure à 2500 habitants ou une somme d'argent supérieure ou égale à 5000 pièces d'or.
```{exec} sql
:after: ikariam-create-all
:editor: b1a9bf31-5a61-40a2-92fa-afe2f54f0778

```

2. Affichez tous les pseudos et les adresses emails des joueurs ayant une adresse email `@proton.com`
```{exec} sql
:after: ikariam-create-all
:editor: e898de8d-81a7-4c20-be12-057622c1784d

```

3. Affichez toutes les colonnes des villes fondées en mars 2024 en les triant de la plus riche à la plus pauvre. Notez que la date est stockée sous le format `aaaa-mm-jj`, donc le 8 octobre 2025 est noté `2025-10-08`.
```{exec} sql
:after: ikariam-create-all
:editor: 8bddd446-c164-4ffc-baf9-930e8bad0f73

```

4. Affichez le pseudo du joueur possédant la ville `Naxos`.
```{exec} sql
:after: ikariam-create-all
:editor: d48feb98-f4c9-4d31-939a-7249d8af852b

```


5. Affichez les noms de toutes les villes possédant une `Caserne` de niveau strictement supérieur à 7
```{exec} sql
:after: ikariam-create-all
:editor: c3b3bbba-9f91-4d98-985e-99e361d3c08b

```

**N'oubliez pas de copier-coller ces codes dans les questions Exam.net**
