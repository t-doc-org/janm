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


# SQL - Sélectionner des données

## Sélectionner des données
L'instruction `SELECT ... WHERE ...` permet de rechercher des données dans une table. On fait suivre le mot-clef `SELECT` du nom de(s) colonne(s) que l'on souhaite afficher, et le `WHERE` de la table contenant ces données. Ainsi, la requête suivante nous permet d'afficher tous les titres et auteurs dans notre table Livre.

```{exec} sql
:after: sql-create-insert-all
:editor:
SELECT nom, prenom FROM Utilisateur
```


Si on souhaite ne pas avoir de lignes "doublons" dans les résultats, on peut faire suivre `SELECT` du mot-clef `DISTINCT` afin de les retirer du résultat de la recherche et n'avoir ainsi que des lignes uniques.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select2
:editor:
SELECT DISTINCT Livre.auteur FROM Livre
```

On peut également utiliser `SELECT *` pour sélectionner toutes les colonnes d'un seul coup.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select3
:editor:
SELECT * FROM Livre
```

## Filtrer les données
Les résultats obtenus à l'aide d'une requête `SELECT ... FROM ...` peuvent être filtrés en faisant suivre cette requête d'un `WHERE`. Ce mot-clef est suivi d'une condition qui s'écrit de manière similaire à Python en utilisant les opérateurs de comparaisons `=`, `!=`, `>`, `>=`, `<`, `<=`. La requête suivante permet par exemple de sélectionner toutes les lignes où le prix est inférieur ou égal à 10CHF.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select4
:editor:
SELECT * FROM Livre WHERE Livre.prix <= 10
```

Celle ci-dessous permet de sélectionner les titres de livre écrit par J.K. Rowling.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select5
:editor:
SELECT Livre.Titre FROM Livre WHERE Livre.auteur = 'J.K. Rowling'
```
### Opérateurs logiques
Comme en Python, il est possible de chaîner plusieurs conditions avec les opérateurs logiques `AND` et `OR`. La requête suivante permet d'afficher tous les livres écrits par Alexandre Dumas ou par Gustave Flaubert.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select6
:editor:
SELECT Livre.Titre FROM Livre WHERE Livre.auteur = 'Alexandre Dumas' OR Livre.Auteur = 'Gustave Flaubert'
```

La requête suivante permet d'afficher toutes les infos des livres écrits par J.K. Rowling après 2003.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select7
:editor:
SELECT Livre.Titre FROM Livre WHERE Livre.auteur = 'J.K. Rowling' AND Livre.date_pub > 2003
```

### Opérateur `LIKE`

Le mot-clef `LIKE` peut s'utiliser comme un opérateur de comparaison sur du texte, de manière similaire à un `=`. Il permet de vérifier qu'une colonne soit *semblable à* une valeur que l'on définit. Ces similitudes peuvent se décliner de trois manières

 - La valeur commence par un certain texte. Par exemple, pour trouver tous les prénoms d'utilisateur qui commencent par "M" ou pour trouver tous les livres dont le  titre commence par "Harry". Pour cela, il faut ajouter le signe `%` (qui peut être compris par "n'importe quel texte") après la valeur commençant le mot. 
    ```{exec} sql
    :after: sql-create-insert-all
    :name: sql-livre-select8
    :editor:
    SELECT * FROM Livre WHERE Livre.titre LIKE 'Harry%'
    ```
 - La valeur se termine par un certain texte. Par exemple pour trouver tous les livres dont la date de publication se termine par "2". Cette fois, le signe `%` doit précéder la valeur terminant le mot.
     ```{exec} sql
    :after: sql-create-insert-all
    :name: sql-livre-select9
    :editor:
    SELECT * FROM Livre WHERE Livre.date_pub LIKE '%2'
    ```
 - La valeur contient un certain texte. Par exemple pour trouver tous les livres dont le titre contient "le". Le signe `%` doit ici entourer la valeur à contenir.
      ```{exec} sql
    :after: sql-create-insert-all
    :name: sql-livre-select10
    :editor:
    SELECT * FROM Livre WHERE Livre.titre LIKE '%le%'
    ```



### Joindre plusieurs tables
Les requêtes `SELECT` précédentes ont permis de rechercher des informations dans une seule table à la fois. Si toutefois on souhaite rechercher tous les titres de livres qu'un certain utilisateur a emprunté, les trois tables devront être mises à contribution dans la même requête.

Pour joindre deux tables entre elles, on utilise `JOIN ... ON ...` dans une requête `SELECT`. On fait suivre le `JOIN` de la table à rajouter à la requête, et le `ON` des champs qui permettent de lier ces deux tables, avec un signe d'égalité. Ces deux champs sont simplement la clef étrangère et la clef primaire référencée. Par exemple, la requête suivante me permet de lier la table des Utilisateurs avec la table des Emprunts. 

```{exec} sql
:after: sql-create-insert-all
:name: sql-join1
:editor:
SELECT *
FROM Utilisateur
JOIN Emprunt ON Emprunt.utilisateur = Utilisateur.id_utilisateur
```
Comme vous pouvez le constater avec le résultat de cette requête, tous les emprunts de livre ont été collés à leur utilisateur.

On peut utiliser autant de `JOIN` que souhaiter pour coller plusieurs tables ensemble. La requête suivante nous permet de coller les 3 tables ensemble :

```{exec} sql
:after: sql-create-insert-all
:name: sql-join2
:editor:
SELECT *
FROM Utilisateur
JOIN Emprunt ON Emprunt.utilisateur = Utilisateur.id_utilisateur
JOIN Livre ON Emprunt.livre = Livre.numero_isbn
```

Cette requête peut être simplement complétée par un `WHERE` et affinée après le `SELECT` pour trouver tous les noms de livres empruntés par l'utilisateur dont le prénom est *Catherine*

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