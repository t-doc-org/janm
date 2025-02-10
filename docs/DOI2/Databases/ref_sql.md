% Adapté du cours de Caroline Blank <caro@c-space.org>
% Copyright 2025 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

# Langage SQL - Notions de base

Les bases de données relationnelles peuvent être créées et manipulées grâce au langage **SQL**[^sn1]. Il ne s'agit pas d'un langage de programmation, mais d'un langage de requête permettant d'influer directement sur la base de données en créant des tables, insérant des données, et en y recherchant des informations.
[^sn1]: Structured Query Language (langage de requête structuré)

## Création de tables

Le langage SQL permet de créer des tables en spécifiant leur nom et le nom des
différentes colonnes.

Pour créer une table, il faut utiliser l'instruction `CREATE TABLE` suivi du nom de la table et d'une paire de parenthèses. Entre ces parenthèses, nous indiquons la
liste des nom des colonnes, ainsi que leur type de données. Les données peuvent être de type `TEXT`, `INTEGER` (nombre entier) ou `REAL` (nombre réel).\
Chaque instruction doit se terminer par un point-virgule.

```{exec} sql
:name: sql-livre
:then: sql-livre-select
CREATE TABLE Livre (
    titre TEXT,
    auteur TEXT,
    date_pub TEXT,
    isbn INTEGER,
    prix REAL,
    PRIMARY KEY(ISBN)
);

```

```{exec} sql
:name: sql-livre-select
:when: never
:class: hidden
select * from Livre;
```

### Identifiants artificiels numériques

Lorsque la clef primaire d'une table est un identifiant artificiel créé uniquement pour ce rôle, on peut utiliser le mot-clef `AUTOINCREMENT` dans la définition de la `PRIMARY KEY` afin que SQL se charge lui-même d'attribuer ce numéro unique aux futures lignes de la table. La valeur de cet identifiant doit obligatoirement être `INTEGER`

```{exec} sql
:name: sql-user
:then: sql-user-select
CREATE TABLE Utilisateur (
    nom TEXT,
    prenom TEXT,
    role TEXT,
    uid INTEGER,
    PRIMARY KEY(uid AUTOINCREMENT)
);

```

```{exec} sql
:name: sql-user-select
:when: never
:class: hidden
select * from Utilisateur;
```


### Clefs étrangères

Lors de la création d'une table contenant des clefs étrangères, on doit également les spécifier avec `FOREIGN KEY ... REFERENCES ...`. Après le `FOREIGN KEY`, on spécifie entre parenthèses quelle colonne est la clef étrangère. Puis, après le `REFERENCES`, on donne le nom de la table et de sa colonne référencée. Dans l'exemple ci-dessous, `utilisateur` est une clef étrangère référençant la colonne `uid` de la table `Utilisateur`. De plus, `livre` est une clef étrangère référançant la colonne `isbn` de la table `livre`.

```{exec} sql
:name: sql-borrow
:then: sql-borrow-select
CREATE TABLE Emprunt (
    livre INTEGER,
    utilisateur INTEGER,
    date TEXT,
    eid INTEGER,
    PRIMARY KEY(eid AUTOINCREMENT),
    FOREIGN KEY(utilisateur) REFERENCES Utilisateur(uid),
    FOREIGN KEY(livre) REFERENCES Livre(isbn)
);

```

```{exec} sql
:name: sql-borrow-select
:when: never
:class: hidden
select * from Emprunt;
```


## Insertion de données

Pour insérer une ligne dans une table, il faut utiliser l'instruction
`INSERT INTO ... VALUES ...`. Après `INSERT INTO`, il faut préciser le nom de la table dans laquelle nous souhaitons ajoutons une ligne, ainsi que les noms de colonnes à remplir. Nous ajoutons ensuite le mot-clef `VALUES` et une paire de parenthèses entre lesquelles nous indiquons
les valeurs à insérer dans chaque colonne. L'ordre des valeurs doit être le même que celui établit plus tôt dans la requête.

Les valeurs de type `TEXT` doivent être entre guillemets, et la séparation entre les unités et les décimales d'une valeur `REAL` se fait avec un point.

```{exec} sql
:after: sql-livre
:name: sql-livre-insert1
:then: sql-livre-select
:editor:
INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('La Vérité sur l`Affaire Harry Québert', 'Joël Dicker', 2012, 9782877068161, 23.95);
```

Lorsqu'on insère des données dans une table contenant une clef primaire qui a été définie avec `AUTOINCREMENT`, on peut omettre sa valeur et SQL se charge de l'attribuer automatiquement.


```{exec} sql
:after: sql-user
:name: sql-user-insert1
:then: sql-user-select
:editor:
INSERT INTO Utilisateur(nom, prenom, role) VALUES
('Jan', 'Maxime', 'enseignant');
INSERT INTO Utilisateur(nom, prenom, role) VALUES
('Queloz', 'Aurélien', 'élève');
```

## Sélectionner des données
L'instruction `SELECT ... WHERE ...` permet de rechercher des données dans une table. On fait suivre le mot-clef `SELECT` du nom de(s) colonne(s) que l'on souhaite afficher, et le `WHERE` de la table contenant ces données. Ainsi, la requête suivante nous permet d'afficher tous les titres et auteurs dans notre table Livre.

```{exec} sql
:after: sql-livre
:name: sql-livre-insert-many
:class: hidden
INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('1984', 'George Orwell', 1949, 9780451524935, 9.99);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Le Petit Prince', 'Antoine de Saint-Exupéry', 1943, 9782070612758, 7.50);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Les Misérables', 'Victor Hugo', 1862, 9782253004220, 12.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('L`Étranger', 'Albert Camus', 1942, 9782070360024, 8.70);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Le Comte de Monte-Cristo', 'Alexandre Dumas', 1844, 9782070105618, 14.99);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Les Trois Mousquetaires', 'Alexandre Dumas', 1846, 9782070405732, 12.99);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Madame Bovary', 'Gustave Flaubert', 1857, 9782070360604, 10.50);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Don Quichotte', 'Miguel de Cervantes', 1605, 9782070117153, 15.80);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Crime et Châtiment', 'Fiodor Dostoïevski', 1866, 9782070360405, 11.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Orgueil et Préjugés', 'Jane Austen', 1813, 9782070318746, 9.50);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Germinal', 'Émile Zola', 1885, 9782070443943, 10.99);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Les Fleurs du mal', 'Charles Baudelaire', 1857, 9782070413113, 8.20);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('L`Odyssée', 'Homère', -800, 9782080700241, 13.50);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('La Divine Comédie', 'Dante Alighieri', 1320, 9782253084079, 16.40);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Ulysse', 'James Joyce', 1922, 9782253943635, 17.99);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Moby Dick', 'Herman Melville', 1851, 9782070408485, 12.00);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Le Nom de la Rose', 'Umberto Eco', 1980, 9782070388824, 11.50);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('À la recherche du temps perdu', 'Marcel Proust', 1913, 9782070107586, 22.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Le Seigneur des Anneaux', 'J.R.R. Tolkien', 1954, 9782266154115, 29.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Harry Potter à l`école des sorciers', 'J.K. Rowling', 1997, 9782070643022, 8.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Le Meilleur des mondes', 'Aldous Huxley', 1932, 9782070368222, 9.20);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Harry Potter et la Chambre des Secrets', 'J.K. Rowling', 1998, 9782070643039, 8.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Harry Potter et le Prisonnier d`Azkaban', 'J.K. Rowling', 1999, 9782070643046, 8.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Harry Potter et la Coupe de Feu', 'J.K. Rowling', 2000, 9782070643053, 9.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Harry Potter et l`Ordre du Phénix', 'J.K. Rowling', 2003, 9782070643060, 10.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Harry Potter et le Prince de Sang-Mêlé', 'J.K. Rowling', 2005, 9782070643077, 10.90);

INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('Harry Potter et les Reliques de la Mort', 'J.K. Rowling', 2007, 9782070643084, 11.90);

```

```{exec} sql
:after: sql-livre-insert-many
:name: sql-livre-select1
:editor:
SELECT Livre.titre, Livre.auteur FROM Livre
```

Si on souhaite ne pas avoir de lignes "doublons" dans les résultats, on peut faire suivre `SELECT` du mot-clef `DISTINCT` afin de les retirer du résultat de la recherche et n'avoir ainsi que des lignes uniques.

```{exec} sql
:after: sql-livre-insert-many
:name: sql-livre-select2
:editor:
SELECT DISTINCT Livre.auteur FROM Livre
```

On peut également utiliser `SELECT *` pour sélectionner toutes les colonnes d'un seul coup.

```{exec} sql
:after: sql-livre-insert-many
:name: sql-livre-select3
:editor:
SELECT * FROM Livre
```

## Filtrer les données
Les résultats obtenus à l'aide d'une requête `SELECT ... FROM ...` peuvent être filtrés en faisant suivre cette requête d'un `WHERE`. Ce mot-clef est suivi d'une condition qui s'écrit de manière similaire à Python en utilisant les opérateurs de comparaisons `=`, `!=`, `>`, `>=`, `<`, `<=`. La requête suivante permet par exemple de sélectionner toutes les lignes où le prix est inférieur ou égal à 10CHF.

```{exec} sql
:after: sql-livre-insert-many
:name: sql-livre-select4
:editor:
SELECT * FROM Livre WHERE Livre.prix <= 10
```

Celle ci-dessous permet de sélectionner les titres de livre écrit par J.K. Rowling.

```{exec} sql
:after: sql-livre-insert-many
:name: sql-livre-select5
:editor:
SELECT Livre.Titre FROM Livre WHERE Livre.auteur = 'J.K. Rowling'
```
### Opérateurs logiques
Comme en Python, il est possible de chaîner plusieurs conditions avec les opérateurs logiques `AND` et `OR`. La requête suivante permet d'afficher tous les livres écrits par Alexandre Dumas ou par Gustave Flaubert.

```{exec} sql
:after: sql-livre-insert-many
:name: sql-livre-select6
:editor:
SELECT Livre.Titre FROM Livre WHERE Livre.auteur = 'Alexandre Dumas' OR Livre.Auteur = 'Gustave Flaubert'
```

La requête suivante permet d'afficher toutes les infos des livres écrits par J.K. Rowling après 2003.

```{exec} sql
:after: sql-livre-insert-many
:name: sql-livre-select7
:editor:
SELECT Livre.Titre FROM Livre WHERE Livre.auteur = 'J.K. Rowling' AND Livre.date_pub > 2003
```