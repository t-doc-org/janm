<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

:orphan:
:nosidebar:



```{exec} sql
:name: sql-create-insert-all
:when: never
:class: hidden
PRAGMA foreign_keys = ON;

CREATE TABLE Livre (
    titre TEXT,
    auteur TEXT,
    date_pub DATE,
    numero_isbn INTEGER,
    prix REAL,
    PRIMARY KEY(numero_isbn)
);

CREATE TABLE Utilisateur (
    nom TEXT,
    prenom TEXT,
    role TEXT,
    id_utilisateur INTEGER,
    PRIMARY KEY(id_utilisateur AUTOINCREMENT)
);

CREATE TABLE Emprunt (
    livre INTEGER,
    utilisateur INTEGER,
    date_emprunt DATE,
    id_emprunt INTEGER,
    PRIMARY KEY(id_emprunt AUTOINCREMENT),
    FOREIGN KEY(utilisateur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY(livre) REFERENCES Livre(numero_isbn)
);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('1984', 'George Orwell', '1949-06-08', 9780451524935, 9.99);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Le Petit Prince', 'Antoine de Saint-Exupéry', '1943-04-06', 9782070612758, 7.50);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Les Misérables', 'Victor Hugo', '1862-03-30', 9782253004220, 12.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('L`Étranger', 'Albert Camus', '1942-05-19', 9782070360024, 8.70);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Le Comte de Monte-Cristo', 'Alexandre Dumas', '1844-08-28', 9782070105618, 14.99);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Les Trois Mousquetaires', 'Alexandre Dumas', '1846-03-15', 9782070405732, 12.99);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Madame Bovary', 'Gustave Flaubert', '1857-04-01', 9782070360604, 10.50);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Don Quichotte', 'Miguel de Cervantes', '1605-01-16', 9782070117153, 15.80);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Crime et Châtiment', 'Fiodor Dostoïevski', '1866-11-01', 9782070360405, 11.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Orgueil et Préjugés', 'Jane Austen', '1813-01-28', 9782070318746, 9.50);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Germinal', 'Émile Zola', '1885-03-01', 9782070443943, 10.99);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Les Fleurs du mal', 'Charles Baudelaire', '1857-06-25', 9782070413113, 8.20);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('L`Odyssée', 'Homère', '0800-01-01', 9782080700241, 13.50);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('La Divine Comédie', 'Dante Alighieri', '1320-09-14', 9782253084079, 16.40);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Ulysse', 'James Joyce', '1922-02-02', 9782253943635, 17.99);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Moby Dick', 'Herman Melville', '1851-10-18', 9782070408485, 12.00);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Le Nom de la Rose', 'Umberto Eco', '1980-09-01', 9782070388824, 11.50);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('À la recherche du temps perdu', 'Marcel Proust', '1913-11-14', 9782070107586, 22.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Le Seigneur des Anneaux', 'J.R.R. Tolkien', '1954-07-29', 9782266154115, 29.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Harry Potter à l`école des sorciers', 'J.K. Rowling', '1997-06-26', 9782070643022, 8.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Le Meilleur des mondes', 'Aldous Huxley', '1932-01-01', 9782070368222, 9.20);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Harry Potter et la Chambre des Secrets', 'J.K. Rowling', '1998-07-02', 9782070643039, 8.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Harry Potter et le Prisonnier d`Azkaban', 'J.K. Rowling', '1999-07-08', 9782070643046, 8.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Harry Potter et la Coupe de Feu', 'J.K. Rowling', '2000-07-08', 9782070643053, 9.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Harry Potter et l`Ordre du Phénix', 'J.K. Rowling', '2003-06-21', 9782070643060, 10.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Harry Potter et le Prince de Sang-Mêlé', 'J.K. Rowling', '2005-07-16', 9782070643077, 10.90);

INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix) VALUES
('Harry Potter et les Reliques de la Mort', 'J.K. Rowling', '2007-07-21', 9782070643084, 11.90);


INSERT INTO Utilisateur(nom, prenom, role) VALUES
('Dupont', 'Alice', 'enseignant'),
('Martin', 'Benoît', 'bibliothécaire'),
('Leroy', 'Catherine', 'enseignant'),
('Moreau', 'David', 'enseignant'),
('Bernard', 'Elise', 'élève'),
('Petit', 'François', 'élève'),
('Robert', 'Gabrielle', 'élève'),
('Richard', 'Hélène', 'élève'),
('Durand', 'Isabelle', 'bibliothécaire'),
('Dubois', 'Jules', 'élève');

INSERT INTO Emprunt(livre, utilisateur, date_emprunt) VALUES
(9780451524935, 6, '2025-02-01'),
(9782070612758, 3, '2025-02-03'),
(9782253004220, 3, '2025-02-05'),
(9782070360024, 2, '2025-02-07'),
(9782070105618, 8, '2025-02-10'),
(9782070405732, 6, '2025-02-12'),
(9782070360604, 2, '2025-02-15'),
(9782070117153, 1, '2025-02-18'),
(9782070360405, 7, '2025-02-20'),
(9782070318746, 3, '2025-02-22');


```

```{exec} sql
:name: sql-canton-select
:class: hidden
:when: never
select * from canton;
```



# SQL - Joindre plusieurs tables

```{image} images/biblio_schema.png
:width: 75%
:alt: Schéma relationnel
:align: center
```
## Utilisation de JOIN ... ON ...
Les requêtes `SELECT` vues jusqu'ici ont permis de rechercher des informations dans une seule table à la fois. Toutefois, certaines requêtes demandent des informations s'étalant sur plusieurs tables à la fois. Par exemple, si on souhaite rechercher tous les titres de livres qu'un certain utilisateur a emprunté, les trois tables devront être mises à contribution.

Pour joindre deux tables entre elles, on commence par sélectionner la 1ère avec le `FROM` comme d'habitude. Puis, juste après ce `FROM`, on ajoute la seconde table nécessaire. Ce `JOIN` doit ensuite être complété par une égalité indiquant la logique reliant ces deux tables. Dans l'exemple de la bibliothèque, un emprunt est lié à un utilisateur grâce au `id_utilisateur` référencé dans les emprunts. Ainsi, la requête ci-dessous permet de coller chaque utilisateur à ses emprunts.

Lorsqu'on utilise plusieurs tables en même temps dans une requête, il est parfois nécessaire de faire précéder le nom d'une colonne par sa table pour éviter les ambiguités (par exemple `Utilisateur.id_utilisateur` plutôt que juste `id_utilisateur`).

```{exec} sql
:after: sql-create-insert-all
:name: sql-join1
:editor:
SELECT *
FROM Utilisateur
JOIN Emprunt ON Emprunt.utilisateur = Utilisateur.id_utilisateur
```

On peut utiliser autant de `JOIN` que souhaité pour coller plusieurs tables ensemble. La requête suivante nous permet de lier chaque livre à chaque utilisateur l'ayant emprunté.

```{exec} sql
:after: sql-create-insert-all
:name: sql-join2
:editor:
SELECT *
FROM Utilisateur
JOIN Emprunt ON Emprunt.utilisateur = Utilisateur.id_utilisateur
JOIN Livre ON Emprunt.livre = Livre.numero_isbn
```

Cette requête peut être simplement complétée par un `WHERE` et affinée après le `SELECT` pour trouver tous les noms de livres empruntés par l'utilisateur dont le prénom est *Catherine*.

```{exec} sql
:after: sql-create-insert-all
:name: sql-join3
:editor:
SELECT Livre.titre
FROM Utilisateur
JOIN Emprunt ON Emprunt.utilisateur = Utilisateur.id_utilisateur
JOIN Livre ON Emprunt.livre = Livre.numero_isbn
WHERE Utilisateur.prenom = 'Catherine'
```


## Exercices
```{role} input(quiz-input)
:right: width: 18rem; clear: right;
:check: split lowercase
```
```{exec} sql
:include: databases/isa.sql
:name: isa
:when: never
:style: display: none;

```
### Exercice {num1}`exercice`
Dans cet exercice, nous considérons la base de données d'ISA avec le schéma relationnel ci-dessous.

```{image} images/isa.png
:width: 75%
:alt: Schéma relationnel d'ISA
:align: center
```

Répondez aux questions ci-dessous en n'utilisant **qu'une seule** requête SQLite par question. Vérifiez à chaque fois votre réponse en l'entrant dans l'encadré à côté.



```````{quiz}

1. Pour s'échauffer sans utiliser encore de `JOIN`, trouvez quelle branche est donnée en salle P110 à 13h30. (Attention le format d'heure est tel que 16h30 = 1630, 9h00 = 900) {input}`géographie`
```{exec} sql
:editor: 019985a8-4b28-7d3c-9e1d-ecb1a508fda5
:after: isa
:output-style: max-height: 30rem

```
```````

```````{quiz}
2. Quel est le nom de famille du MCL (Maître De Classe) de la 1F2 ? Pour cette requête et les suivantes, vous aurez besoin d'un `JOIN`. {input}`dupont`
```{exec} sql
:editor: 019985c0-a579-7f12-8a48-4d51b654c27b
:after: isa
:output-style: max-height: 30rem
```
```````

```````{quiz}
3. Quel est le nom de la classe ayant comme MCL un enseignant dont le prénom est *Antoine* . {input}`1bp1`
```{exec} sql
:editor: 019985c1-9110-7e3d-a352-36ad2dfe1a20
:after: isa
:output-style: max-height: 30rem
```
```````

```````{quiz}
4. Quelle branche donne *Laura Conti* ? {input}`histoire`
```{exec} sql
:editor: 019985c6-dbf3-7646-87b5-e474dc29ff4d
:after: isa
:output-style: max-height: 30rem
```
```````

```````{quiz}
5. Dans quelle classe se trouve *Eva Savary* ? {input}`2d2`
```{exec} sql
:editor: 019985c8-01c1-73a7-a057-0973939a6a4f
:after: isa
:output-style: max-height: 30rem
```
```````

```````{quiz}
6. Quel est le nom de famille de l'enseignant.e de Français travaillant avec le plus petit taux ?{input}`schaller`
```{exec} sql
:editor: 019985cc-5ff2-73d5-ac57-5b195c17521b
:after: isa
:output-style: max-height: 30rem
```
```````

```````{quiz}
7. Quelle classe a cours de Physique en salle E220  ?{input}`1d1`
```{exec} sql
:editor: 019985d5-c6e4-7722-ba09-68435801cbea
:after: isa
:output-style: max-height: 30rem
```
```````


```````{quiz}
8. Quelle est la branche qui finit le plus tard pour la classe 2F2 ?{input}`sport`
```{exec} sql
:editor: 019985d9-12a9-706e-8b3e-30248076d364
:after: isa
:output-style: max-height: 30rem
```
```````



### Exercice {num1}`exercice`
Cet exercice utilise à nouveau la base de données d'ISA

```{image} images/isa.png
:width: 75%
:alt: Schéma relationnel d'ISA
:align: center
```

Répondez aux questions ci-dessous en n'utilisant **qu'une seule** requête SQLite par question. Dans cet exercice, chaque question requiert entre 2 et 3 `JOIN` par requête.

```````{quiz}
1. Quel est le nom de famille du MCL de *Sara Ngoy* ? {input}`keller`
```{exec} sql
:editor: 019985dd-ae95-7e26-bcc9-71316b123284
:after: isa
:output-style: max-height: 30rem
```
```````

```````{quiz}
2. Dans quelle salle à lieu le cours de Français de la classe de l'élève Emma Durand?  {input}`p101`
```{exec} sql
:editor: db7245d0-f7fa-4185-b504-c6c0b39857af
:after: isa
:output-style: max-height: 30rem
```

<!-- Exercise by Emma Zürch 2BP1 -->
````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
select salle
from cours
join classe on cours.classe=id_classe
join eleve on eleve.classe=id_classe
where eleve.nom='Durand' and eleve.prenom='Emma' and branche='Français'
```
````
```````


