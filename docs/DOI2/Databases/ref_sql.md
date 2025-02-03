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
INSERT INTO Livre(titre, auteur, date_pub, isbn, prix) VALUES
('La Vérité sur l`Affaire Harry Québert', 'Joël Dicker', 2012, 9782877068161, 23.95);
```

Lorsqu'on insère des données dans une table contenant une clef primaire qui a été définie avec `AUTOINCREMENT`, on peut omettre sa valeur et SQL se charge de l'attribuer automatiquement.


```{exec} sql
:after: sql-user
:name: sql-user-insert1
:then: sql-user-select
INSERT INTO Utilisateur(nom, prenom, role) VALUES
('Jan', 'Maxime', 'enseignant');
INSERT INTO Utilisateur(nom, prenom, role) VALUES
('Queloz', 'Aurélien', 'élève');
```

## Sélectionner des données


