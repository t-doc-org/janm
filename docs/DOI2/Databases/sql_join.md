<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```


```{exec} sql
:name: sql-create-insert-all
:when: never
:class: hidden
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

````{solution}
```{exec} sql
:name: sql-canton
:then: sql-canton-select
create table canton (
  nom text not null,
  abr text not null,
  chef_lieu text not null,
  nb_communes int not null,
  population int not null,
  superficie decimal(6,2) not null
);
insert into canton values
  ('Fribourg', 'FR', 'Fribourg', 126, 334465, 1670.7),
  ('Genève', 'GE', 'Genève', 45, 514114, 282.48),
  ('Berne', 'BE', 'Berne', 335, 1051437, 5959.44),
  ('Zurich', 'ZH', 'Zurich', 160, 1579967, 1729),
  ('Tessin', 'TI', 'Bellinzone', 106, 354023, 2812.2),
  ('Grison', 'GR', 'Coire', 101, 202538, 7105.44),
  ('Uri', 'UR', 'Altdorf', 19, 37317, 1076.57);
```
````


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

### Exercice {num1}`exercice`