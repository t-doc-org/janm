<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```
```{exec} sql
:name: sql-insert-bank
:class: hidden
:when: never
-- Activer l’intégrité référentielle dans SQLite
PRAGMA foreign_keys = ON;


-- =======================
-- Tables
-- =======================

CREATE TABLE IF NOT EXISTS Article (
    numero_article   INTEGER PRIMARY KEY,
    nom              TEXT NOT NULL,
    prix             REAL NOT NULL CHECK (prix >= 0),
    quantite         INTEGER NOT NULL CHECK (quantite >= 0)
);

CREATE TABLE IF NOT EXISTS Client (
    numero_client    INTEGER PRIMARY KEY,
    nom              TEXT NOT NULL,
    adresse          TEXT
);

CREATE TABLE IF NOT EXISTS Commande (
    numero_commande  INTEGER PRIMARY KEY,
    -- références vers Article et Client du schéma
    article          INTEGER NOT NULL,
    client           INTEGER NOT NULL,
    FOREIGN KEY(article) REFERENCES Article(numero_article) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY(client)  REFERENCES Client(numero_client)  ON UPDATE CASCADE ON DELETE RESTRICT
);

-- (Optionnel mais utile) Index pour accélérer les recherches
CREATE INDEX IF NOT EXISTS idx_commande_article ON Commande(article);
CREATE INDEX IF NOT EXISTS idx_commande_client  ON Commande(client);

-- =======================
-- Données fictives
-- =======================

-- Articles
INSERT INTO Article (numero_article, nom, prix, quantite) VALUES
  (1, 'Stylo bille bleu', 1.20, 500),
  (2, 'Cahier A4 96p',    2.90, 300),
  (3, 'Clavier USB',     19.99, 120),
  (4, 'Souris optique',  12.50, 200),
  (5, 'Écran 24"',      149.00,  45);

-- Clients
INSERT INTO Client (numero_client, nom, adresse) VALUES
  (100, 'Alice Dupont',  '12 rue des Lilas, 75010 Paris'),
  (101, 'Bob Martin',    '5 av. des Frères Lumière, 69008 Lyon'),
  (102, 'Carla Rossi',   '28 bd National, 13003 Marseille'),
  (103, 'Daniel Nguyen', '17 place du Capitole, 31000 Toulouse');

-- Commandes (chaque ligne relie un article et un client)
INSERT INTO Commande (numero_commande, article, client) VALUES
  (1000, 1, 100),  -- Alice commande un stylo
  (1001, 2, 100),  -- Alice commande un cahier
  (1002, 3, 101),  -- Bob commande un clavier
  (1003, 4, 102),  -- Carla commande une souris
  (1004, 5, 103),  -- Daniel commande un écran
  (1005, 1, 103);  -- Daniel commande aussi un stylo

```

```{exec} sql
:name: select-compte
:class: hidden
:when: never
select * from compte;
```


```{exec} sql
:name: select-client
:class: hidden
:when: never
select * from Client;
```

# Examen formatif

```{image} images/banque_faux.png
:width: 75%
:alt: Schéma relationnel
:align: center
```
## Question 2 -  Créer une table
Créez la table Compte avec une requête SQL. Si vous avez apporté des corrections à cette table dans l'exercice précédent, prenez les en compte dans votre code.

**N'oubliez pas de copier-coller ce code dans la question Exam.net**

```{exec} sql
:name: q2
:editor: fdshhfdshfds
:then: select-compte

```



## Question 3 - Insérez des données
Insérez 2 nouveaux clients dans la base de données :
 - Madame Suzanne Rudiger née le 09-03-1956
 - Monsieur Isaac Genoud né le 07-10-1997

La table des clients est déjà créée pour vous. Vous pouvez donc directement écrire les requêtes d'insertion. Rappel : entre 2 requêtes d'insertion, il faut un point-virgule

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} sql
:after: sql-insert-bank
:editor: hdashsadhsadsahd
:then: select-client

```


## Question 6 - SELECT
Sur la base du schéma relationnel ci-dessus, écrivez une requête permettant de sélectionner tous les articles de moins de 100CHF ayant la lettre "a" dans leur nom.

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} sql
:after: sql-insert-bank
:editor: 

```

## Question 7 - SELECT
Sur la base du schéma relationnel ci-dessus, écrivez une seule requête permettant de sélectionner les numéros de commande des achats de 'Stylo bille bleu'

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} sql
:after: sql-insert-bank
:editor:

```
