<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{exec} sql
:name: sql-create-insert-all
:when:
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



# SQL - Joindre plusieurs tables

```{image} images/biblio_schema.png
:width: 75%
:alt: Schéma relationnel
:align: center
```
## Utilisation de JOIN ... ON ...
Les requêtes `SELECT` vues jusqu'ici ont permis de rechercher des informations dans une seule table à la fois. Toutefois, certaines requêtes demandent des informations s'étalant sur plusieurs tables à la fois. Par exemple, si on souhaite rechercher tous les titres de livres qu'un certain utilisateur a emprunté, les trois tables devront être mises à contribution.

Pour joindre deux tables entre elles, on commence par sélectionner la 1ère avec le `FROM` comme d'habitude. Puis, juste après ce `FROM`, on ajoute le mot-clef `JOIN` suivi du nom de la seconde table nécessaire. Ce `JOIN` doit ensuite être complété par le mot-clef `ON` et une égalité indiquant la logique reliant ces deux tables. Dans l'exemple de la bibliothèque, un emprunt est lié à un utilisateur grâce au `id_utilisateur` référencé dans les emprunts. Ainsi, la requête ci-dessous permet de coller chaque utilisateur à ses emprunts.

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

```{role} num(quiz-input)
:right: width: 5rem; clear: right;
:check: trim
```

```{role} on1(quiz-select)
:options: |
: Emprunt.livre = Livre.numero_isbn
: Emprunt.livre = Livre.titre
: Emprunt.id_emprunt = Livre.numero_isbn
: Emprunt.livre = Emprunt.utilisateur
```

```{role} on2(quiz-select)
:options: |
: Seance.salle = Salle.id_salle
: Seance.id_seance = Salle.id_salle
: Seance.salle = Salle.nom
: Salle.nb_places = Seance.salle
```

### Exercice {num1}`exercice`
Avant d'écrire vos propres `JOIN`, il faut bien comprendre **ce qu'un `JOIN` produit**. Exécutez
la requête ci-dessous, observez attentivement le résultat, puis répondez aux questions.

```{exec} sql
:after: sql-create-insert-all
:name: sql-join-comprendre
:output-style: max-height: 30rem
SELECT *
FROM Utilisateur
JOIN Emprunt ON Emprunt.utilisateur = Utilisateur.id_utilisateur
```

```{quiz}
:style: max-width: 34rem;
1. {num}`10`
Combien de lignes le résultat contient-il ?

2. {num}`3`
Combien de fois *Catherine Leroy* apparaît-elle dans le résultat ?

3. {num}`6`
La table `Utilisateur` contient 10 utilisateurs. Combien d'entre eux apparaissent au moins une
fois dans le résultat ?
```

````{solution}
Un `JOIN` ne colle pas les tables l'une à côté de l'autre : il produit **une ligne par couple de
lignes qui vérifient la condition du `ON`**.

1.  La table `Emprunt` contient 10 lignes, et chacune correspond à exactement un utilisateur. Le
    résultat contient donc 10 lignes, soit autant que la table `Emprunt`.
2.  Catherine Leroy a emprunté 3 livres. Ses informations sont donc **recopiées 3 fois**, une fois
    par emprunt. C'est normal et attendu.
3.  Seuls 6 utilisateurs ont emprunté au moins un livre. Les 4 autres n'apparaissent **pas du
    tout** dans le résultat : sans emprunt, aucun couple ne vérifie la condition du `ON`.

Retenez ces deux effets : un `JOIN` peut **répéter** des lignes, et il peut aussi en **faire
disparaître**.
````

### Exercice {num1}`exercice`
Pour chacune des jointures ci-dessous, choisissez la condition `ON` correcte.

```{quiz}
:style: max-width: 40rem;
1. Pour relier la table `Emprunt` à la table `Livre` de la bibliothèque :\
   `SELECT * FROM Emprunt JOIN Livre ON` {on1}`Emprunt.livre = Livre.numero_isbn`

2. Pour relier la table `Seance` à la table `Salle` d'un cinéma :\
   `SELECT * FROM Seance JOIN Salle ON` {on2}`Seance.salle = Salle.id_salle`
```

````{solution}
Une condition de `JOIN` met toujours en relation **la clef étrangère d'une table** avec **la clef
primaire de l'autre**. C'est exactement ce que représente la flèche du schéma relationnel.

Les autres propositions échouent car elles comparent deux clefs primaires entre elles, comparent
des colonnes qui n'ont aucun rapport, ou comparent une clef étrangère à une colonne qui n'est pas
celle qui est référencée.
````

### Exercice {num1}`exercice`
Les requêtes ci-dessous portent sur la base de données de la bibliothèque, mais il leur manque les
conditions des `JOIN`. Complétez les `______`.

1.  Afficher les titres des livres empruntés par l'utilisateur dont le nom est *Petit*.

```{exec} sql
:after: sql-create-insert-all
:editor: 3ccaaa86-04f7-45d9-b72c-b386369d1284
SELECT Livre.titre
FROM Utilisateur
JOIN Emprunt ON ______ = ______
JOIN Livre ON ______ = ______
WHERE Utilisateur.nom = 'Petit'
```

````{solution}
```{exec} sql
:after: sql-create-insert-all
SELECT Livre.titre
FROM Utilisateur
JOIN Emprunt ON Emprunt.utilisateur = Utilisateur.id_utilisateur
JOIN Livre ON Emprunt.livre = Livre.numero_isbn
WHERE Utilisateur.nom = 'Petit'
```
````

2.  Afficher le nom et le prénom de l'utilisateur qui a emprunté *1984*.

```{exec} sql
:after: sql-create-insert-all
:editor: 7ea5d478-b0f8-4d6b-a4b6-997c0f3f4779
SELECT Utilisateur.nom, Utilisateur.prenom
FROM Livre
JOIN Emprunt ON ______ = ______
JOIN Utilisateur ON ______ = ______
WHERE Livre.titre = '1984'
```

````{solution}
```{exec} sql
:after: sql-create-insert-all
SELECT Utilisateur.nom, Utilisateur.prenom
FROM Livre
JOIN Emprunt ON Emprunt.livre = Livre.numero_isbn
JOIN Utilisateur ON Emprunt.utilisateur = Utilisateur.id_utilisateur
WHERE Livre.titre = '1984'
```
Remarquez que les deux conditions sont exactement les mêmes qu'à la question 1 : peu importe par
quelle table on commence, ce sont toujours les mêmes flèches du schéma que l'on suit.
````

3.  Afficher la date et le titre de tous les emprunts faits par des enseignants.

```{exec} sql
:after: sql-create-insert-all
:editor: c3696475-94c3-4264-b4b3-7607e3940cc2
SELECT ______, ______
FROM Utilisateur
JOIN Emprunt ON ______ = ______
JOIN Livre ON ______ = ______
WHERE ______
```

````{solution}
```{exec} sql
:after: sql-create-insert-all
SELECT Emprunt.date_emprunt, Livre.titre
FROM Utilisateur
JOIN Emprunt ON Emprunt.utilisateur = Utilisateur.id_utilisateur
JOIN Livre ON Emprunt.livre = Livre.numero_isbn
WHERE Utilisateur.role = 'enseignant'
```
Cette requête retourne 4 emprunts.
````

### Exercice {num1}`exercice`
Les deux exercices suivants portent sur la base de données d'un cinéma, dont voici le schéma
relationnel.

```{image} images/cinema_schema.png
:width: 85%
:alt: Schéma relationnel de la base de données du cinéma
:align: center
```

```{exec} sql
:include: databases/cinema.sql
:name: cinema
:when:
:style: display: none;
```

Voici son contenu.

```{exec} sql
:after: cinema
:class: hidden
:when: load
SELECT * FROM Film;
```

```{exec} sql
:after: cinema
:class: hidden
:when: load
SELECT * FROM Salle;
```

```{exec} sql
:after: cinema
:class: hidden
:when: load
SELECT * FROM Seance;
```

**Sans écrire aucune requête**, indiquez combien de `JOIN` seraient nécessaires pour répondre à
chacune des questions ci-dessous. Aidez-vous du schéma : comptez le nombre de flèches à parcourir
pour aller de la table de départ à la table d'arrivée.

```{quiz}
:style: max-width: 36rem;
1. {num}`0`
Quelles séances coûtent plus de 16 CHF ?

2. {num}`1`
Quel film est projeté à 10h30 ?

3. {num}`0`
Combien de places compte la salle *Rouge* ?

4. {num}`2`
Dans quelle salle *Parasite* est-il projeté à 21h00 ?

5. {num}`1`
Quel réalisateur est projeté à 22h00 ?

6. {num}`2`
Quel est le genre du film projeté dans la salle *Verte* à 14h00 ?
```

````{solution}
Les questions 1 et 3 ne concernent qu'une seule table (`Seance` pour l'une, `Salle` pour l'autre) :
aucun `JOIN` n'est nécessaire.

Les questions 2 et 5 partent d'une séance et vont chercher une information dans `Film` : une seule
flèche est parcourue, donc un seul `JOIN`.

Les questions 4 et 6 relient `Film` et `Salle`, qui ne sont **pas** reliées directement. Il faut
passer par la table `Seance` au milieu, donc parcourir deux flèches et écrire deux `JOIN`.
````

### Exercice {num1}`exercice`
Écrivez maintenant les requêtes répondant aux questions ci-dessous, en n'utilisant **qu'une seule**
requête par question. Les heures sont enregistrées comme des nombres : 10h30 s'écrit `1030` et
21h00 s'écrit `2100`.

```{note}
Pour les questions qui demandent *le plus* ou *le moins* de quelque chose, triez le résultat avec
un `ORDER BY` et lisez la **première ligne** affichée.
```

```````{quiz}
1. Quel film est projeté à 10h30 ? {input}`Les Triplettes de Belleville`
```{exec} sql
:after: cinema
:editor: 0c724ada-76b5-4c16-82af-b11266c2a9ed
```
````{solution}
```{exec} sql
:after: cinema
SELECT Film.titre FROM Film
JOIN Seance ON Seance.film = Film.id_film
WHERE Seance.heure = 1030
```
````
```````

```````{quiz}
2. Dans quelle salle *Parasite* est-il projeté à 21h00 ? {input}`Bleue`
```{exec} sql
:after: cinema
:editor: cedacee2-671e-45c9-9403-59ffa91ba3e9
```
````{solution}
```{exec} sql
:after: cinema
SELECT Salle.nom FROM Salle
JOIN Seance ON Seance.salle = Salle.id_salle
JOIN Film ON Seance.film = Film.id_film
WHERE Film.titre = 'Parasite' AND Seance.heure = 2100
```
````
```````

```````{quiz}
3. Combien de places compte la salle où *Interstellar* est projeté à 20h00 ? {input}`120`
```{exec} sql
:after: cinema
:editor: ce2e9b60-40a5-412d-a8bc-60eb587d3019
```
````{solution}
```{exec} sql
:after: cinema
SELECT Salle.nb_places FROM Salle
JOIN Seance ON Seance.salle = Salle.id_salle
JOIN Film ON Seance.film = Film.id_film
WHERE Film.titre = 'Interstellar' AND Seance.heure = 2000
```
````
```````

```````{quiz}
4. Quel réalisateur est projeté à 22h00 ? {input}`Jean-Pierre Jeunet`
```{exec} sql
:after: cinema
:editor: 408d63cd-31e6-4274-b12e-18107d1a9a91
```
````{solution}
```{exec} sql
:after: cinema
SELECT Film.realisateur FROM Film
JOIN Seance ON Seance.film = Film.id_film
WHERE Seance.heure = 2200
```
````
```````

```````{quiz}
5. Dans quelle salle peut-on voir un film de *Christopher Nolan* à 11h00 ? {input}`Rouge`
```{exec} sql
:after: cinema
:editor: 36d46adf-e819-4ecf-a6fc-575a70dfe50e
```
````{solution}
```{exec} sql
:after: cinema
SELECT Salle.nom FROM Salle
JOIN Seance ON Seance.salle = Salle.id_salle
JOIN Film ON Seance.film = Film.id_film
WHERE Film.realisateur = 'Christopher Nolan' AND Seance.heure = 1100
```
````
```````

```````{quiz}
6. Quel est le genre du film projeté dans la salle *Verte* à 14h00 ? {input}`Science-fiction`
```{exec} sql
:after: cinema
:editor: fa18879a-d1f7-475c-bdcb-4601c6519f83
```
````{solution}
```{exec} sql
:after: cinema
SELECT Film.genre FROM Film
JOIN Seance ON Seance.film = Film.id_film
JOIN Salle ON Seance.salle = Salle.id_salle
WHERE Salle.nom = 'Verte' AND Seance.heure = 1400
```
````
```````

```````{quiz}
7. Quel est le nom de la salle qui accueille la séance la moins chère ? {input}`Verte`
```{exec} sql
:after: cinema
:editor: 3a4cbd10-d2ac-424b-b73a-61dc30fcdd2a
```
````{solution}
```{exec} sql
:after: cinema
SELECT Salle.nom FROM Salle
JOIN Seance ON Seance.salle = Salle.id_salle
ORDER BY Seance.prix ASC
```
````
```````

```````{quiz}
8. Quel est le film le plus long projeté dans la salle *Rouge* ? {input}`Interstellar`
```{exec} sql
:after: cinema
:editor: 952844a2-eb71-4540-9f3c-c07f751641a0
```
````{solution}
```{exec} sql
:after: cinema
SELECT Film.titre FROM Film
JOIN Seance ON Seance.film = Film.id_film
JOIN Salle ON Seance.salle = Salle.id_salle
WHERE Salle.nom = 'Rouge'
ORDER BY Film.duree_min DESC
```
````
```````

```{exec} sql
:include: databases/isa.sql
:name: isa
:when:
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

```{note}
Pour les questions qui demandent *le plus* ou *le moins* de quelque chose, triez le résultat avec
un `ORDER BY` et lisez la **première ligne** affichée.
```



```````{quiz}

1. Pour s'échauffer sans utiliser encore de `JOIN`, trouvez quelle branche est donnée en salle P110 à 13h30. (Attention le format d'heure est tel que 16h30 = 1630, 9h00 = 900) {input}`géographie`
```{exec} sql
:editor: 019985a8-4b28-7d3c-9e1d-ecb1a508fda5
:after: isa
:output-style: max-height: 30rem

```

````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT branche FROM Cours WHERE salle = 'P110' AND heure_debut = 1330
```
````
```````

```````{quiz}
2. Quel est le nom de famille du MCL (Maître De Classe) de la 1F2 ? Pour cette requête et les suivantes, vous aurez besoin d'un `JOIN`. {input}`dupont`
```{exec} sql
:editor: 019985c0-a579-7f12-8a48-4d51b654c27b
:after: isa
:output-style: max-height: 30rem
```
````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT Enseignant.nom FROM Enseignant JOIN Classe ON id_enseignant = mcl
WHERE Classe.nom = '1F2'
```
````
```````

```````{quiz}
3. Quel est le nom de la classe ayant comme MCL un enseignant dont le prénom est *Antoine* . {input}`1bp1`
```{exec} sql
:editor: 019985c1-9110-7e3d-a352-36ad2dfe1a20
:after: isa
:output-style: max-height: 30rem
```
````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT Classe.nom FROM Classe
JOIN Enseignant ON Enseignant.id_enseignant = Classe.mcl
WHERE Enseignant.prenom = 'Antoine'
```
````
```````

```````{quiz}
4. Quelle branche donne *Laura Conti* ? {input}`histoire`
```{exec} sql
:editor: 019985c6-dbf3-7646-87b5-e474dc29ff4d
:after: isa
:output-style: max-height: 30rem
```
````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT branche FROM Cours 
JOIN Enseignant ON Enseignant.id_enseignant = Cours.enseignant
WHERE Enseignant.nom = 'Conti' AND Enseignant.prenom = 'Laura'
```
````

```````

```````{quiz}
5. Dans quelle classe se trouve *Eva Savary* ? {input}`2d2`
```{exec} sql
:editor: 019985c8-01c1-73a7-a057-0973939a6a4f
:after: isa
:output-style: max-height: 30rem
```
````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT Classe.nom
FROM Classe
JOIN Eleve ON Eleve.classe = Classe.id_classe
WHERE Eleve.nom = 'Savary' AND Eleve.prenom = 'Eva'
```
````
```````

```````{quiz}
6. Quel est le nom de famille de l'enseignant.e de Français travaillant avec le plus petit taux ?{input}`schaller`
```{exec} sql
:editor: 019985cc-5ff2-73d5-ac57-5b195c17521b
:after: isa
:output-style: max-height: 30rem
```
````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT Enseignant.nom
FROM Enseignant
JOIN Cours ON Cours.enseignant = Enseignant.id_enseignant
WHERE branche = 'Français'
ORDER BY taux_travail ASC
```
````
```````

```````{quiz}
7. Quelle classe a cours de Physique en salle E220  ?{input}`1d1`
```{exec} sql
:editor: 019985d5-c6e4-7722-ba09-68435801cbea
:after: isa
:output-style: max-height: 30rem
```
````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT Classe.nom
FROM Classe
JOIN Cours ON Classe.id_classe = Cours.classe
WHERE branche = 'Physique' AND salle = 'E220'
```
````
```````


```````{quiz}
8. Quelle est la branche qui finit le plus tard pour la classe 2F2 ?{input}`sport`
```{exec} sql
:editor: 019985d9-12a9-706e-8b3e-30248076d364
:after: isa
:output-style: max-height: 30rem
```
````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT branche
FROM Cours
JOIN Classe ON Classe.id_classe = Cours.Classe
WHERE Classe.nom = '2F2'
ORDER BY heure_fin DESC
```
````
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
````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT Enseignant.nom
FROM Enseignant
JOIN Classe ON Enseignant.id_enseignant = Classe.mcl
JOIN Eleve ON Eleve.classe = Classe.id_classe
WHERE Eleve.prenom = 'Sara' AND Eleve.nom = 'Ngoy'
```
````
```````

<!-- Exercise by Emma Zerpa 2BP1 -->
```````{quiz}
2. Dans quelle salle à lieu le cours de Français de la classe de l'élève Emma Durand?  {input}`p101`
```{exec} sql
:editor: db7245d0-f7fa-4185-b504-c6c0b39857af
:after: isa
:output-style: max-height: 30rem
```

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

<!-- Exercise by Emma Zürch 2BP1 -->

```````{quiz}
3. Quelle branche que suit l’élève Clara Zaugg finit le plus tard ?  {input}`musique`
```{exec} sql
:editor: 3de3c6ea-49c0-41a3-8509-2e30a0513720
:after: isa
:output-style: max-height: 30rem
```

````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
SELECT Cours.branche FROM Eleve
JOIN Classe ON Eleve.classe = Classe.id_classe
JOIN Cours ON Cours.classe = Classe.id_classe
WHERE Eleve.nom = 'Zaugg' AND Eleve.prenom = 'Clara'
ORDER BY Cours.heure_fin DESC
```
````
```````


<!-- Exercise by Dionys Volken 2BP1 -->

```````{quiz}
4. Quel enseignant donne quel cours à Elio de la 3BP1 dans la Salle E205 ? Pour contrôler votre réponse, écrivez le prénom et nom de l'enseignant suivi directement de la branche {input}`marco rossi informatique`
```{exec} sql
:editor: 47c8a246-9d36-4d44-9767-9e3b74b87358
:after: isa
:output-style: max-height: 30rem
```

````{solution}
```{exec} sql
:after: isa
:output-style: max-height: 30rem
Select Enseignant.prenom, Enseignant.nom, Cours.branche from Eleve
Join Cours on Eleve.classe = Cours.classe
Join Enseignant on Cours.enseignant = id_enseignant
Join Classe on Eleve.classe = id_classe
Where Eleve.prenom = 'Elio' and Cours.salle = 'E205' and Classe.nom = '3BP1'
```
````
```````


