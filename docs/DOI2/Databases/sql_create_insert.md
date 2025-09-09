<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```
# SQL - Créer et insérer

Les bases de données relationnelles peuvent être créées et manipulées grâce au langage **SQL** (Structured Query Language). Il ne s'agit pas d'un langage de programmation, mais d'un langage de requête permettant d'influer directement sur la base de données en créant des tables, insérant des données, et en y recherchant des informations.

Pour exemplifier la création de tables et l'insertion de données, la base de données d'une bibliothèque basée sur le schéma relationnel ci-dessous sera créée.


```{image} images/biblio_schema.png
:width: 75%
:alt: Schéma relationnel
:align: center
```


## Création de tables

Le langage SQL permet de créer des tables en spécifiant leur nom et le nom des différentes colonnes.

Pour créer une table, il faut utiliser l'instruction `CREATE TABLE` suivi du nom de la table et d'une paire de parenthèses. Entre ces parenthèses, nous indiquons la liste des attributs, ainsi que leur type de données. 

Les types de données peuvent être les suivants :

- `INTEGER` pour un nombre entier
- `REAL` pour un nombre réel
- `TEXT` pour du texte
- `DATE` pour une date au format `AAAA-MM-JJ`

Finalement, on précise la clef primaire avec `PRIMARY KEY` suivi de parenthèses entre lesquelles on précise l'attribut devant faire office de clef primaire.

```{exec} sql
:name: sql-livre
:then: sql-livre-select
CREATE TABLE Livre (
    titre TEXT,
    auteur TEXT,
    date_pub DATE,
    numero_isbn INTEGER,
    prix REAL,
    PRIMARY KEY(numero_isbn)
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
:after: sql-livre
:name: sql-user
:then: sql-user-select
CREATE TABLE Utilisateur (
    nom TEXT,
    prenom TEXT,
    role TEXT,
    id_utilisateur INTEGER,
    PRIMARY KEY(id_utilisateur AUTOINCREMENT)
);

```

```{exec} sql
:name: sql-user-select
:when: never
:class: hidden
select * from Utilisateur;
```


### Clefs étrangères

Lors de la création d'une table contenant des clefs étrangères, on doit également les spécifier avec `FOREIGN KEY ... REFERENCES ...`. Après le `FOREIGN KEY`, on spécifie entre parenthèses quelle colonne est la clef étrangère. Puis, après le `REFERENCES`, on donne le nom de la table et de sa colonne référencée. Dans l'exemple ci-dessous, `utilisateur` est une clef étrangère référençant la colonne `utilisateur_id` de la table `Utilisateur`. De plus, `livre` est une clef étrangère référançant la colonne `numero_isbn` de la table `livre`.

```{exec} sql
:after: sql-user
:name: sql-borrow
:then: sql-borrow-select
CREATE TABLE Emprunt (
    livre INTEGER,
    utilisateur INTEGER,
    date_emprunt DATE,
    id_emprunt INTEGER,
    PRIMARY KEY(id_emprunt AUTOINCREMENT),
    FOREIGN KEY(utilisateur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY(livre) REFERENCES Livre(numero_isbn)
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
`INSERT INTO ... VALUES ...`. Après `INSERT INTO`, il faut préciser le nom de la table dans laquelle nous souhaitons ajoutons une ligne, ainsi que les colonnes à remplir. Nous ajoutons ensuite le mot-clef `VALUES` et une paire de parenthèses entre lesquelles nous indiquons
les valeurs à insérer dans chaque colonne. L'ordre des valeurs doit être le même que celui établi plus tôt dans la requête.

Les valeurs de type `TEXT` et `DATE` doivent être entre guillemets simples, et la séparation entre les unités et les décimales d'une valeur `REAL` se fait avec un point.

```{exec} sql
:after: sql-livre
:name: sql-livre-insert1
:then: sql-livre-select
:editor:
INSERT INTO Livre(titre, auteur, date_pub, numero_isbn, prix)
VALUES ('La Vérité sur l`Affaire Harry Québert', 'Joël Dicker', '2012-03-01', 9782877068161, 23.95);
```

Lorsqu'on insère des données dans une table contenant une clef primaire qui a été définie avec `AUTOINCREMENT`, on peut omettre sa valeur et SQL se charge de l'attribuer automatiquement.


```{exec} sql
:after: sql-user
:name: sql-user-insert1
:then: sql-user-select
:editor:
INSERT INTO Utilisateur(nom, prenom, role) VALUES ('Jan', 'Maxime', 'enseignant');

INSERT INTO Utilisateur(nom, prenom, role) VALUES ('Queloz', 'Aurélien', 'élève');
```

## Exercices

### Exercice {num1}`exercice`
Le schéma relationnel ci-dessous ne contient qu'une seule table et représente une base de données d'évaluations.
```{image} images/ex4.png
:width: 25%
:alt: Schéma relationnel
:align: center
```

#### Partie A
Ecrivez la requête SQL `CREATE TABLE` permettant de créer la table `Evaluation`. Veillez à bien préciser les types de données, la clef primaire et l'éventuel `AUTOINCREMENT`.


```{exec} sql
:name: select-evaluation
:when: never
:class: hidden
select * from Evaluation;
```

```{exec} sql
:editor: 01990f75-6c5a-77ca-ba13-01db7dc18b40
:then: select-evaluation
:name: eleve-create-evaluation
```

````{solution}
```{exec} sql
:then: select-evaluation
:name: solution-create-evaluation
CREATE TABLE Evaluation(
    titre TEXT,
    branche TEXT,
    note REAL,
    date DATE,
    id_evaluation INTEGER,
    PRIMARY KEY(id_evaluation AUTOINCREMENT)
)
```
````

#### Partie B
Ajoutez 2 évaluations dans la table créée dans la partie A :
 - Une évaluation de math nommée "Géométrie" faite le 2025-12-11 à laquelle vous avez fait 4.75 
  - Une évaluation d'informatique nommée "Base de données" faite le 2025-10-30 à laquelle vous avez fait 6 


```{exec} sql
:editor: 01991a0b-4cae-728e-9744-5f011ed08d3a
:after: eleve-create-evaluation
:then: select-evaluation
```


````{solution}
```{exec} sql
:then: select-evaluation
:after: solution-create-evaluation
INSERT INTO Evaluation(branche, titre, note, date) VALUES('Math', 'Géométrie', 4.75, '2025-12-11');

INSERT INTO Evaluation(branche, titre, note, date) VALUES('Informatique', 'Bases de données', 6, '2025-10-30')
```
````


### Exercice {num1}`exercice`
Le schéma relationnel ci-dessous décrit une base de données d'équipes de foot et leurs joueur.euse.s. 
```{image} images/ex5.png
:width: 50%
:alt: Schéma relationnel
:align: center
```

#### Partie A
Commencez par écrire, ci-dessous, la requête permettant de créer la table `Equipe`.
```{exec} sql
:editor: 01992e22-d137-7c9a-8f7b-9f623bdab7b8
:name: eleve-create-equipe
:then: select-equipe
```

```{exec} sql
:when: never
:class: hidden
:name: select-equipe
SELECT * FROM Equipe
```

Si votre code SQL est correct, le code ci-dessous devrait permettre de créer et enregistrer 3 nouvelles équipes.

```{exec} sql
:after: eleve-create-equipe
:name: insert-equipe
:then: select-equipe
INSERT INTO Equipe(nom, entraineur, budget)
VALUES('PSG', 'Luis Enrique', 850000000);

INSERT INTO Equipe(nom, entraineur, budget)
VALUES('FC Gottéron', 'Jean-Marc Genoud', 2500);

INSERT INTO Equipe(nom, entraineur, budget)
VALUES('Young Boys', 'Giorgio Contini', 77900000);
```


````{solution}
```{exec} sql
:name: solution-create-equipe
:then: select-equipe
CREATE TABLE Equipe(
    nom TEXT,
    président TEXT,
    budget REAL,
    PRIMARY KEY(nom)
)
```
````

#### Partie B
Créez maintenant la table `Joueur`. N'oubliez pas de référencer la clef étrangère avec `FOREIGN KEY ... REFERENCES ...`. (Ne mettez pas d'accent sur le *e* de l'attribut *equipe*)

```{exec} sql
:editor: 01992e30-d3cb-77c7-a4bb-09cb857dbe00
:name: eleve-create-joueur
:after: insert-equipe
:then: select-joueur
```
```{exec} sql
:when: never
:class: hidden
:name: select-joueur
SELECT * FROM Joueur
```
Si votre code est correct, la requête `INSERT INTO` ci-dessous ne doit **PAS** fonctionner. Pourquoi est-ce le cas ? Si cette requête ajoute bel et bien un 1er joueur à cette table, retravaillez le référencement de la clef étrangère dans la création de table.

```{exec} sql
:when: never
:class: hidden
:name: pragma-CE
:after: eleve-create-joueur
PRAGMA foreign_keys = ON;
```



```{exec} sql
:after: pragma-CE
:then: select-joueur

INSERT INTO Joueur(prénom, nom, numéro_maillot, equipe)
VALUES('Kylian', 'Mbappé', 10, 'Real Madrid')
```
````{solution}
```{exec} sql
:name: solution-create-joueur
:after: solution-create-equipe
:then: select-joueur
CREATE TABLE Joueur(
    prénom TEXT,
    nom TEXT, 
    numéro_maillot INTEGER, 
    equipe TEXT, 
    id_joueur INTEGER, 
    primary KEY (id_joueur AUTOINCREMENT),
    FOREIGN KEY(equipe) references Equipe(nom)
)
```

Le `INSERT INTO` ne fonctionne pas car la clef étrangère `equipe` qui devrait ici prendre la valeur `Real Madrid` ferait  référence à une valeur qui n'existe pas dans la colonne `nom` de la table `Equipe`. 
````
#### Partie C
Ajoutez maintenant 3 nouveaux joueurs dans cette base de données.
 - Aurélien Queloz (n° 12) est dans l'équipe entrainée par Jean-Marc Genoud
 - Isaac Genoud (n° 7) fait partie de la même équipe
 - Maxime Dupasquier (n° 3) est quant à lui dans l'équipe de Giorgi Contini.

Grâce au `AUTOINCREMENT`, ces joueurs devraient avoir **automatiquement** les `id_joueur` 1, 2, 3.
 ```{exec} sql
:editor: 01992e4a-8378-79be-a44a-551312f61caa
:after: pragma-CE
:then: select-joueur


```

````{solution}
```{exec} sql
:after: solution-create-joueur
:then: select-joueur
INSERT INTO joueur(nom, prénom, numéro_maillot, equipe)
VALUES('Queloz', 'Aurélien', 12, 'FC Gottéron');

INSERT INTO joueur(nom, prénom, numéro_maillot, equipe)
VALUES('Genoud', 'Isaac', 7, 'FC Gottéron');

INSERT INTO joueur(nom, prénom, numéro_maillot, equipe)
VALUES('Dupasquier', 'Maxime', 3, 'Young Boys');
```
````