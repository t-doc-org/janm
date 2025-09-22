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


# SQL - Sélectionner des données

```{image} images/biblio_schema.png
:width: 75%
:alt: Schéma relationnel
:align: center
```

## Sélectionner des données
L'instruction `SELECT ... FROM ...` permet de rechercher des données dans une table. On fait suivre le mot-clef `SELECT` du nom de(s) colonne(s) que l'on souhaite afficher, et le `FROM` de la table contenant ces données. Ainsi, la requête suivante nous permet d'afficher tous les titres et auteurs dans notre table Livre.

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
SELECT DISTINCT auteur FROM Livre
```

On peut également utiliser `SELECT *` pour sélectionner toutes les colonnes d'un seul coup.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select3
:editor:
SELECT * FROM Livre
```


## Trier les données
Les requêtes `SELECT` peuvent être suivies des mots-clef `ORDER BY` afin de trier les résultats par ordre croissant/ascendant (`ASC`) ou décroissant/descendant (`DESC`). Pour cela, il faut faire suivre le `ORDER BY` de la colonne selon laquelle trier les données, ainsi que de `ASC` ou `DESC` pour donner l'ordre de tri. La requête suivant permet ainsi d'afficher tous les livres du plus cher au moins cher.
```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select-order-by
:editor:
SELECT titre, prix FROM Livre
ORDER BY prix DESC
```


## Filtrer les données
Les résultats obtenus à l'aide d'une requête `SELECT ... FROM ...` peuvent être filtrés en faisant suivre cette requête d'un `WHERE`. Ce mot-clef est suivi d'une condition qui s'écrit de manière similaire à Python en utilisant les opérateurs de comparaisons `=`, `!=`, `>`, `>=`, `<`, `<=`. La requête suivante permet par exemple de sélectionner toutes les lignes où le prix est inférieur ou égal à 10CHF.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select4
:editor:
SELECT * FROM Livre WHERE prix <= 10
```

Celle ci-dessous permet de sélectionner les titres de livre écrit par J.K. Rowling.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select5
:editor:
SELECT titre FROM Livre WHERE auteur = 'J.K. Rowling'
```
### Opérateurs logiques
Comme en Python, il est possible de chaîner plusieurs conditions avec les opérateurs logiques `AND` et `OR`. La requête suivante permet d'afficher tous les livres écrits par Alexandre Dumas ou par Gustave Flaubert.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select6
:editor:
SELECT titre FROM Livre WHERE auteur = 'Alexandre Dumas' OR Auteur = 'Gustave Flaubert'
```

La requête suivante permet d'afficher toutes les infos des livres écrits par J.K. Rowling après 2003.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select7
:editor:
SELECT titre FROM Livre WHERE auteur = 'J.K. Rowling' AND date_pub > 2003
```

### Opérateur `LIKE`

Le mot-clef `LIKE` peut s'utiliser comme un opérateur de comparaison sur du texte, de manière similaire à un `=`. Il permet de vérifier qu'une colonne soit *semblable à* une valeur que l'on définit. Ces similitudes peuvent se décliner de trois manières

 - La valeur commence par un certain texte. Par exemple, pour trouver tous les prénoms d'utilisateur qui commencent par "M" ou pour trouver tous les livres dont le  titre commence par "Harry". Pour cela, il faut ajouter le signe `%` (qui peut être compris par "n'importe quel texte") après la valeur commençant le mot. 
    ```{exec} sql
    :after: sql-create-insert-all
    :name: sql-livre-select8
    :editor:
    SELECT * FROM Livre WHERE titre LIKE 'Harry%'
    ```
 - La valeur se termine par un certain texte. Par exemple pour trouver tous les livres dont la date de publication se termine par "2". Cette fois, le signe `%` doit précéder la valeur terminant le mot.
     ```{exec} sql
    :after: sql-create-insert-all
    :name: sql-livre-select9
    :editor:
    SELECT * FROM Livre WHERE date_pub LIKE '%2'
    ```
 - La valeur contient un certain texte. Par exemple pour trouver tous les livres dont le titre contient "le". Le signe `%` doit ici entourer la valeur à contenir.
      ```{exec} sql
    :after: sql-create-insert-all
    :name: sql-livre-select10
    :editor:
    SELECT * FROM Livre WHERE titre LIKE '%le%'
    ```


## Exercices

### Exercice {num1}`exercice`

En dessous des requêtes se trouve une table `canton`. **Avant d'exécuter ces requêtes** ci-dessous, lisez-les attentivement et prédites leur résultat. La requête est-elle correcte ou produira-t-elle une erreur ? Si elle est correcte, quelle sera la ou les lignes affichées ? 

1.  ```{exec} sql
    :after: sql-canton
    select * from canton where nb_communes = 45;
    ```

2.  ```{exec} sql
    :after: sql-canton
    select * from canton where chef_lieu = Coire;
    ```

    ````{solution} Explication
    Cette requête produit une erreur, car il manque les guillemets simples
    autour de Coire.
    ````

3.  ```{exec} sql
    :after: sql-canton
    select nom, superficie from canton where nom = 'Fribourg';
    ```

4.  ```{exec} sql
    :after: sql-canton
    select * from canton where population > 500000;
    ```

5.  ```{exec} sql
    :after: sql-canton
    select * from canton where abr < 'GR';
    ```

    ````{solution} Explication
    Les opérateurs de comparaison pour du texte utilisent l'ordre alphabétique.\
    Exemples: 'a' < 'b' ou 'p' > 'd'
    ````

6.  ```{exec} sql
    :after: sql-canton
    select * from canton order by superficie asc;
    ```

```{exec} sql
:after: sql-canton
:class: hidden
:when: load
select * from canton;
```


### Exercice {num1}`exercice`
En vous basant sur la table `canton` ci-dessus, écrivez les requêtes SQL répondant aux critères suivants.

1.  Écrire une requête SQL qui retourne toutes les colonnes du canton dont le
chef-lieu est Bellinzone.

```{exec} sql
:after: sql-canton
:editor: 5e6516e0-18bb-4d38-8c90-767e1fd1f729
```

````{solution}
```{exec} sql
:after: sql-canton
select * from canton where chef_lieu = 'Bellinzone';
```
````

2.  Écrire une requête SQL qui retourne toutes les colonnes des cantons dont la
population est inférieure à 300'000 habitants.

```{exec} sql
:after: sql-canton
:editor: 57e619f9-cc9e-47d6-9cf5-a510f74465df
```

````{solution}
```{exec} sql
:after: sql-canton
select * from canton where population < 300000;
```
````

3.  Écrire une requête SQL qui retourne toutes les colonnes des cantons dans
l'ordre alphabétique des abréviations.

```{exec} sql
:after: sql-canton
:editor: e584473c-6e0d-41ca-bad5-b7f1888eae10
```

````{solution}
```{exec} sql
:after: sql-canton
select * from canton order by abr asc;
```
````

4.  Écrire une requête SQL qui retourne le nom, l'abréviation et le chef-lieu
des cantons.

```{exec} sql
:after: sql-canton
:editor: caf9b02f-d802-4876-a1ad-0b183c6bdc41
```

````{solution}
```{exec} sql
:after: sql-canton
select nom, abr, chef_lieu from canton;
```
````


5.  Écrire une requête SQL qui retourne le nom, l'abréviation et le chef-lieu
des cantons ordonnés selon le nombre d'habitants du plus grand au plus
petit.

```{exec} sql
:after: sql-canton
:editor: 591d0ad5-71f4-4f8c-9281-f2639abe7a2e
```

````{solution}
```{exec} sql
:after: sql-canton
select nom, abr, chef_lieu from canton order by population desc;
```
````

6.  Écrire une requête SQL qui retourne toutes les colonnes des cantons qui ont
plus de 100 communes et une population inférieure à 500'000 habitants.

```{exec} sql
:after: sql-canton
:editor: 5dc7f7ee-caa7-439c-90a6-c636d8e15551
```

````{solution}
```{exec} sql
:after: sql-canton
select * from canton where nb_communes > 100 and population < 500000;
```
````

7.  Écrire une requête SQL qui retourne toutes les colonnes des cantons dont le
chef-lieu est Altdorf ou le nombre de communes supérieur ou égal à 150.

```{exec} sql
:after: sql-canton
:editor: 80d34995-7472-4051-a8af-577363ee3858
```

````{solution}
```{exec} sql
:after: sql-canton
select * from canton where chef_lieu = 'Altdorf' or nb_communes >= 150;
```
````

8.  Écrire une requête SQL qui retourne le nom des cantons dont l'abréviation
n'est pas FR.

```{exec} sql
:after: sql-canton
:editor: cfa9c7e3-cead-4b27-9405-3644a1b27335
```

````{solution}
```{exec} sql
:after: sql-canton
select nom from canton where abr != 'FR';
```
````

9.  Écrire une requête SQL qui retourne le nom et l'abréviation des cantons dont
la population se trouve entre 300'000 et 500'000 habitants.

```{exec} sql
:after: sql-canton
:editor: 931ab749-fafb-4d51-b65f-c0c6aedd893a
```

````{solution}
```{exec} sql
:after: sql-canton
select nom, abr from canton where population > 300000 and population < 500000;
```
````