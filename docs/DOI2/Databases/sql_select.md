<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{exec} sql
:name: sql-create-insert-all
:when:
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
:when:
select * from canton;
```


```{exec} sql
:name: sql-canton
:class: hidden
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


# SQL - Sélectionner des données

```{image} images/biblio_schema.png
:width: 75%
:alt: Schéma relationnel
:align: center
```

## Sélectionner des données
L'instruction `SELECT ... FROM ...` permet de rechercher des données dans une table. On fait suivre le mot-clef `SELECT` du nom de(s) colonne(s) que l'on souhaite afficher, et le `FROM` de la table contenant ces données. Ainsi, la requête suivante nous permet d'afficher tous les titres et auteurs de notre table `Livre`.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select1
:editor:
SELECT titre, auteur FROM Livre
```

Et celle-ci affiche le nom et le prénom de tous les utilisateurs de la bibliothèque.

```{exec} sql
:after: sql-create-insert-all
:name: sql-user-select1
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

La requête suivante permet d'afficher les titres des livres écrits par J.K. Rowling après 2003.

```{exec} sql
:after: sql-create-insert-all
:name: sql-livre-select7
:editor:
SELECT titre FROM Livre WHERE auteur = 'J.K. Rowling' AND date_pub > '2003-12-31'
```

```{important}
Une date s'écrit **entre guillemets simples** et se compare comme du texte, caractère par
caractère. Il faut donc toujours donner une date **complète** au format `'AAAA-MM-JJ'`.
Écrire `date_pub > 2003` (sans guillemets et sans mois ni jour) ne produit aucune erreur, mais
donne un résultat faux : SQL compare alors un nombre à du texte et retourne **tous** les livres.
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

```{role} input(quiz-input)
:right: width: 12rem; clear: right;
:check: split lowercase
```

```{role} num(quiz-input)
:right: width: 5rem; clear: right;
:check: trim
```

```{role} pourcent(quiz-select)
:right:
:options: |
: 'Zola%'
: '%Zola'
: '%Zola%'
```

### Exercice {num1}`exercice`
Voici la table `canton`, qui servira de base aux deux prochains exercices.

```{exec} sql
:after: sql-canton
:class: hidden
:when: load
select * from canton;
```

**Avant d'exécuter les requêtes ci-dessous**, lisez-les attentivement et prédisez leur résultat.
La requête est-elle correcte ou produira-t-elle une erreur ? Si elle est correcte, combien de
lignes affichera-t-elle ? Indiquez ce nombre dans la case à droite (ou le mot `erreur` si la
requête ne fonctionne pas), puis exécutez la requête pour vérifier.

```````{quiz}
1.  {input}`1`
    ```{exec} sql
    :after: sql-canton
    select * from canton where nb_communes = 45;
    ```

2.  {input}`erreur`
    ```{exec} sql
    :after: sql-canton
    select * from canton where chef_lieu = Coire;
    ```

3.  {input}`1`
    ```{exec} sql
    :after: sql-canton
    select nom, superficie from canton where nom = 'Fribourg';
    ```

4.  {input}`3`
    ```{exec} sql
    :after: sql-canton
    select * from canton where population > 500000;
    ```

5.  {input}`3`
    ```{exec} sql
    :after: sql-canton
    select * from canton where abr < 'GR';
    ```

6.  {input}`7`
    ```{exec} sql
    :after: sql-canton
    select * from canton order by superficie asc;
    ```

7.  {input}`0`
    ```{exec} sql
    :after: sql-canton
    select * from canton where nom like 'F';
    ```

8.  {input}`0`
    ```{exec} sql
    :after: sql-canton
    select * from canton where chef_lieu = 'coire';
    ```

9.  {input}`7`
    ```{exec} sql
    :after: sql-canton
    select nom, superficie from canton order by nb_communes desc;
    ```

10. {input}`3`
    ```{exec} sql
    :after: sql-canton
    select * from canton
      where nb_communes > 100 and population > 300000 and superficie < 3000;
    ```

11. {input}`0`
    ```{exec} sql
    :after: sql-canton
    select nom from canton where nom = 'Fribourg' and nom = 'Genève';
    ```
```````

````{solution} Explications
1.  Un seul canton a 45 communes : Genève.
2.  Cette requête produit une erreur, car il manque les guillemets simples autour de `Coire`.
    Sans eux, SQL cherche une *colonne* appelée `Coire`.
3.  Un seul canton s'appelle Fribourg. Notez que seules deux colonnes sont affichées, mais cela
    ne change rien au nombre de lignes.
4.  Genève, Berne et Zurich dépassent les 500'000 habitants.
5.  Les opérateurs de comparaison pour du texte utilisent l'ordre alphabétique.\
    Exemples: `'a' < 'b'` ou `'p' > 'd'`. Les abréviations placées avant `GR` dans l'ordre
    alphabétique sont `BE`, `FR` et `GE`.
6.  Un `ORDER BY` ne filtre rien : il ne fait que **changer l'ordre** des lignes. Les 7 cantons
    sont donc affichés.
7.  Aucune ligne. `LIKE 'F'` cherche un nom **exactement** égal à `F`. Pour trouver les noms qui
    commencent par F, il faut écrire `LIKE 'F%'`.
8.  Aucune ligne. Contrairement au `LIKE`, l'opérateur `=` distingue les majuscules des
    minuscules : `'coire'` n'est pas `'Coire'`.
9.  Sept lignes également. On peut parfaitement trier selon une colonne qui n'est pas affichée :
    le tri se fait avant la sélection des colonnes.
10. Rien n'empêche de chaîner plus de deux conditions avec `and`. Une ligne n'est retenue que si
    **toutes** les conditions sont vraies : Fribourg, Zurich et Tessin remplissent les trois.
11. Aucune ligne : un canton ne peut pas s'appeler à la fois Fribourg **et** Genève. Quand on veut
    *plusieurs valeurs possibles pour une même colonne*, c'est un `or` qu'il faut utiliser.
````

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


### Exercice {num1}`exercice`
Chacune des requêtes ci-dessous, écrite sur la base de données de la bibliothèque, comporte **une
erreur**. Parfois l'erreur produit un message rouge, parfois la requête s'exécute mais ne retourne
pas ce qui était demandé. Corrigez-les.

1.  On souhaite afficher le titre des livres coûtant moins de 10 CHF.
    ```{exec} sql
    :after: sql-create-insert-all
    :editor: 3109bb2e-716c-4e17-8e36-701035f5490b
    SELECT titre WHERE prix < 10
    ```

2.  On souhaite afficher tous les livres de Victor Hugo.
    ```{exec} sql
    :after: sql-create-insert-all
    :editor: ae2942b9-e605-443d-8e70-047dfdca6316
    SELECT * FROM Livre WHERE auteur = Victor Hugo
    ```

3.  On souhaite afficher tous les livres du plus cher au moins cher.
    ```{exec} sql
    :after: sql-create-insert-all
    :editor: 3ebce8a4-10ca-495a-954f-c35bcf45f3c8
    SELECT * FROM Livre ORDER prix BY DESC
    ```

4.  On souhaite afficher tous les livres de la saga Harry Potter.
    ```{exec} sql
    :after: sql-create-insert-all
    :editor: d9569268-b095-4a11-af6f-1aace3bfdb1c
    SELECT * FROM Livre WHERE titre LIKE 'Harry'
    ```

5.  On souhaite afficher les livres qui coûtent moins de 10 CHF ou plus de 20 CHF.
    ```{exec} sql
    :after: sql-create-insert-all
    :editor: 764ac472-3e1f-4395-9094-2047fb4acf8d
    SELECT * FROM Livre WHERE prix < 10 AND prix > 20
    ```

````{solution}
1.  Le `FROM` a été oublié : SQL ne sait pas dans quelle table chercher.
    ```{exec} sql
    :after: sql-create-insert-all
    SELECT titre FROM Livre WHERE prix < 10
    ```

2.  Il manque les guillemets simples autour du texte recherché.
    ```{exec} sql
    :after: sql-create-insert-all
    SELECT * FROM Livre WHERE auteur = 'Victor Hugo'
    ```

3.  Les deux mots-clefs `ORDER BY` vont ensemble et se placent **avant** le nom de la colonne.
    ```{exec} sql
    :after: sql-create-insert-all
    SELECT * FROM Livre ORDER BY prix DESC
    ```

4.  La requête ne produit aucune erreur, mais retourne zéro ligne : sans `%`, le `LIKE` cherche un
    titre exactement égal à `Harry`.
    ```{exec} sql
    :after: sql-create-insert-all
    SELECT * FROM Livre WHERE titre LIKE 'Harry%'
    ```

5.  Aucune erreur non plus, mais aucun résultat : un prix ne peut pas être à la fois inférieur à 10
    et supérieur à 20. Il fallait un `OR`.
    ```{exec} sql
    :after: sql-create-insert-all
    SELECT * FROM Livre WHERE prix < 10 OR prix > 20
    ```
````

### Exercice {num1}`exercice`
Les exercices suivants utilisent la table `jeu` ci-dessous, qui recense quelques jeux vidéo.

```{exec} sql
:name: sql-jeu-select
:class: hidden
:when:
select * from jeu;
```

```{exec} sql
:name: sql-jeu
:class: hidden
:then: sql-jeu-select
create table jeu (
  titre text not null,
  studio text not null,
  genre text not null,
  annee int not null,
  note real not null,
  prix real not null
);
insert into jeu values
  ('The Legend of Zelda: Breath of the Wild', 'Nintendo', 'Aventure', 2017, 9.7, 59.90),
  ('Super Mario Odyssey', 'Nintendo', 'Plateforme', 2017, 9.4, 54.90),
  ('Mario Kart 8 Deluxe', 'Nintendo', 'Course', 2017, 9.2, 49.90),
  ('Minecraft', 'Mojang', 'Bac à sable', 2011, 9.0, 26.95),
  ('Stardew Valley', 'ConcernedApe', 'Simulation', 2016, 8.9, 13.99),
  ('Hollow Knight', 'Team Cherry', 'Aventure', 2017, 9.1, 14.99),
  ('Celeste', 'Maddy Makes Games', 'Plateforme', 2018, 9.4, 19.99),
  ('Rocket League', 'Psyonix', 'Sport', 2015, 8.6, 0.00),
  ('Among Us', 'Innersloth', 'Party game', 2018, 7.8, 4.30),
  ('Terraria', 'Re-Logic', 'Bac à sable', 2011, 8.8, 9.99),
  ('It Takes Two', 'Hazelight', 'Aventure', 2021, 9.3, 39.90),
  ('Portal 2', 'Valve', 'Réflexion', 2011, 9.5, 8.19);
```

```{exec} sql
:after: sql-jeu
:class: hidden
:when: load
select * from jeu;
```

Pour commencer, où faut-il placer le signe `%` ? On cherche ici des auteurs dans une table
`Livre`.

```{quiz}
:style: max-width: 32rem;
1. {pourcent}`'Zola%'`
Le nom de l'auteur **commence** par Zola

2. {pourcent}`'%Zola'`
Le nom de l'auteur **se termine** par Zola

3. {pourcent}`'%Zola%'`
Le nom de l'auteur **contient** Zola
```

Écrivez maintenant les requêtes suivantes sur la table `jeu`. Toutes nécessitent un `LIKE`.

1.  Afficher tous les jeux dont le titre commence par *Super*.

```{exec} sql
:after: sql-jeu
:editor: ef404ae6-fb04-45b3-adb8-c6763ec95bd9
```

````{solution}
```{exec} sql
:after: sql-jeu
select * from jeu where titre like 'Super%';
```
````

2.  Afficher tous les jeux dont le titre contient *Mario*.

```{exec} sql
:after: sql-jeu
:editor: 8100626e-f0f3-4a98-8113-d4cb2dd67c65
```

````{solution}
```{exec} sql
:after: sql-jeu
select * from jeu where titre like '%Mario%';
```
````

3.  Afficher le titre et le studio des jeux dont le nom du studio se termine par *o* **et** qui
    coûtent plus de 50 CHF.

```{exec} sql
:after: sql-jeu
:editor: 305b9c7f-d4dc-47ee-935e-b3a8f0f754b0
```

````{solution}
```{exec} sql
:after: sql-jeu
select titre, studio from jeu where studio like '%o' and prix > 50;
```
````

4.  Afficher les jeux dont le genre se termine par *ure* **et** dont la note dépasse 9.2.

```{exec} sql
:after: sql-jeu
:editor: 73bae7c3-21de-4ada-8da3-d0129d1362fb
```

````{solution}
```{exec} sql
:after: sql-jeu
select * from jeu where genre like '%ure' and note > 9.2;
```
````

5.  Afficher les jeux dont le titre contient la lettre *a*, qui coûtent moins de 20 CHF **et**
    dont la note est supérieure ou égale à 8.8.

```{exec} sql
:after: sql-jeu
:editor: 3a831e83-f38f-468f-8af6-46b4d2255071
```

````{solution}
```{exec} sql
:after: sql-jeu
select * from jeu where titre like '%a%' and prix < 20 and note >= 8.8;
```
Rien n'empêche d'enchaîner trois conditions avec deux `and` : la ligne n'est retenue que si les
trois sont vraies en même temps. Cette requête retourne 3 jeux. Notez au passage que le `LIKE` ne
fait pas la différence entre majuscules et minuscules : *Portal 2* est bien trouvé.
````

### Exercice {num1}`exercice`
Toujours sur la table `jeu`, écrivez les requêtes suivantes. Elles nécessitent toutes un
`DISTINCT`, un `ORDER BY`, ou les deux.

1.  Afficher la liste des genres présents dans la table, sans doublon.

```{exec} sql
:after: sql-jeu
:editor: 6e48b780-75a4-4bb7-97c2-ef9e2b97f0b6
```

````{solution}
```{exec} sql
:after: sql-jeu
select distinct genre from jeu;
```
Sans le `DISTINCT`, la requête afficherait 12 lignes (une par jeu) au lieu des 8 genres réellement
différents.
````

2.  Afficher la liste des studios, sans doublon, par ordre alphabétique.

```{exec} sql
:after: sql-jeu
:editor: 0c31316d-3bb5-4600-9ec6-fbb31d4af0cb
```

````{solution}
```{exec} sql
:after: sql-jeu
select distinct studio from jeu order by studio asc;
```
````

3.  Afficher les années de sortie, sans doublon, de la plus récente à la plus ancienne.

```{exec} sql
:after: sql-jeu
:editor: bb7e8b3a-c289-4386-8739-95aac654a706
```

````{solution}
```{exec} sql
:after: sql-jeu
select distinct annee from jeu order by annee desc;
```
````

4.  Afficher le titre et la note des jeux d'aventure **ou** de plateforme, du mieux noté au moins
    bien noté.

```{exec} sql
:after: sql-jeu
:editor: 0d80a461-1424-49b8-8169-98f05e29b671
```

````{solution}
```{exec} sql
:after: sql-jeu
select titre, note from jeu where genre = 'Aventure' or genre = 'Plateforme' order by note desc;
```
````

5.  Afficher le titre et le prix des jeux qui coûtent moins de 20 CHF, sont sortis après 2014 et
    ont une note supérieure à 8.5, du moins cher au plus cher.

```{exec} sql
:after: sql-jeu
:editor: 78043a03-05f7-4cd7-86bb-aef0d1b3e039
```

````{solution}
```{exec} sql
:after: sql-jeu
select titre, prix from jeu where prix < 20 and annee > 2014 and note > 8.5
order by prix asc;
```
Les trois conditions sont chaînées par deux `and`, et le `order by` se place toujours **après**
l'ensemble du `where`.
````

### Exercice {num1}`exercice`
Cet exercice fonctionne dans l'autre sens : les requêtes sont données, à vous de dire **ce
qu'elles font**. Répondez en une phrase, en français, sans les exécuter. Elles portent sur la base
de données de la bibliothèque.

1.  `SELECT DISTINCT auteur FROM Livre ORDER BY auteur ASC`
2.  `SELECT titre, prix FROM Livre WHERE prix > 15 OR auteur = 'Victor Hugo'`
3.  `SELECT nom FROM Utilisateur WHERE role != 'élève'`
4.  `SELECT * FROM Livre WHERE titre LIKE '%Potter%' AND prix < 10 AND date_pub > '2000-01-01'`
5.  `SELECT titre, date_pub FROM Livre WHERE date_pub < '1900-01-01' ORDER BY date_pub ASC`

````{solution}
1.  Affiche la liste de tous les auteurs de la bibliothèque, sans doublon, par ordre alphabétique.
2.  Affiche le titre et le prix des livres qui coûtent plus de 15 CHF, ainsi que ceux écrits par
    Victor Hugo (même s'ils coûtent moins de 15 CHF).
3.  Affiche le nom de tous les utilisateurs qui ne sont pas des élèves, c'est-à-dire les
    enseignants et les bibliothécaires.
4.  Affiche toutes les informations des livres de la saga Harry Potter qui coûtent moins de 10 CHF
    et qui ont été publiés après le 1er janvier 2000. Un seul livre remplit les trois conditions.
5.  Affiche le titre et la date de publication des livres publiés avant 1900, du plus ancien au
    plus récent.
````
