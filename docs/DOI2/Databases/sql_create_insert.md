<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

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
:when:
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
:when:
:class: hidden
select * from Utilisateur;
```


### Clefs étrangères

Lors de la création d'une table contenant des clefs étrangères, on doit également les spécifier avec `FOREIGN KEY ... REFERENCES ...`. Après le `FOREIGN KEY`, on spécifie entre parenthèses quelle colonne est la clef étrangère. Puis, après le `REFERENCES`, on donne le nom de la table et de sa colonne référencée. Dans l'exemple ci-dessous, `utilisateur` est une clef étrangère référençant la colonne `id_utilisateur` de la table `Utilisateur`. De plus, `livre` est une clef étrangère référençant la colonne `numero_isbn` de la table `Livre`.

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
:when:
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

### L'intérêt de la clef primaire

À quoi sert la clef primaire ? Son rôle est de garantir que chaque ligne soit **unique**. Sans clef primaire, rien n'empêche d'enregistrer deux fois la même donnée. Exécutez la cellule ci-dessous. Celle-ci essaie d'insérer 2x un utilisateur
avec la même adresse email. Comme l'attribut `email` avait été déclaré comme `PRIMARY KEY`, la requête échoue avec l'erreur `UNIQUE constraint failed`.


```{exec} sql
:name: demo-pk-avec
CREATE TABLE Membre (
    nom TEXT,
    prenom TEXT,
    email TEXT,
    PRIMARY KEY(email)
);

INSERT INTO Membre(nom, prenom, email) VALUES ('Jan', 'Maxime', 'maxime@exemple.ch');
INSERT INTO Membre(nom, prenom, email) VALUES ('Queloz', 'Aurélien', 'maxime@exemple.ch');
```
### L'intérêt de la clef étrangère

La clef étrangère empêche d'enregistrer une donnée incohérente. Dans l'exemple ci-dessous, on essaie
d'ajouter un emprunt pour l'utilisateur n°`999`, qui n'existe pas dans la table `Utilisateur`. La
base **refuse** l'insertion avec le message `FOREIGN KEY constraint failed`.

```{exec} sql
:name: demo-fk-setup
:when:
:class: hidden
PRAGMA foreign_keys = ON;

CREATE TABLE Utilisateur (
    nom TEXT,
    id_utilisateur INTEGER,
    PRIMARY KEY(id_utilisateur AUTOINCREMENT)
);

INSERT INTO Utilisateur(nom) VALUES ('Alice');

CREATE TABLE Emprunt (
    livre INTEGER,
    utilisateur INTEGER,
    id_emprunt INTEGER,
    PRIMARY KEY(id_emprunt AUTOINCREMENT),
    FOREIGN KEY(utilisateur) REFERENCES Utilisateur(id_utilisateur)
);
```

```{exec} sql
:after: demo-fk-setup
INSERT INTO Emprunt(livre, utilisateur) VALUES (12, 999);
```

## Exercices

```{role} type(quiz-select)
:right:
:options: |
: INTEGER
: REAL
: TEXT
: DATE
```

```{role} auto(quiz-select)
:right:
:options: |
: avec AUTOINCREMENT
: sans AUTOINCREMENT
```

```{role} ouinon(quiz-select)
:right:
:options: |
: oui
: non
```

### Exercice {num1}`exercice`
Quel type de données faut-il utiliser pour chacune de ces colonnes ?

```{quiz}
:style: max-width: 34rem;
1. {type}`REAL`
Le prix d'un article

2. {type}`TEXT`
Le nom d'une ville

3. {type}`INTEGER`
Le nombre d'habitants d'une ville

4. {type}`DATE`
La date de sortie d'un film

5. {type}`TEXT`
Le numéro de téléphone d'un client

6. {type}`REAL`
La note obtenue à une évaluation

7. {type}`INTEGER`
Le numéro de maillot d'un joueur

8. {type}`TEXT`
L'adresse e-mail d'un utilisateur
```

````{solution}
Le numéro de téléphone (question 5) est le piège classique : bien qu'il ne soit composé que de
chiffres, ce n'est **pas un nombre**. On ne fait jamais de calcul avec un numéro de téléphone, et
surtout un `INTEGER` supprimerait le `0` du début (`0791234567` deviendrait `791234567`). La même
logique s'applique aux numéros AVS et aux numéros IBAN.

Retenez la question à se poser : *est-ce que je pourrais avoir envie de faire un calcul avec cette
valeur ?* Si la réponse est non, c'est du `TEXT`.
````

### Exercice {num1}`exercice`
Pour chacune de ces clefs primaires, déterminez si le mot-clef `AUTOINCREMENT` est nécessaire.

```{quiz}
:style: max-width: 34rem;
1. {auto}`sans AUTOINCREMENT`
`numero_isbn` dans une table `Livre`

2. {auto}`avec AUTOINCREMENT`
`id_commentaire` dans une table `Commentaire`

3. {auto}`sans AUTOINCREMENT`
`email` dans une table `Utilisateur`

4. {auto}`avec AUTOINCREMENT`
`id_emprunt` dans une table `Emprunt`

5. {auto}`sans AUTOINCREMENT`
`plaque` dans une table `Voiture`

6. {auto}`avec AUTOINCREMENT`
`id_video` dans une table `Video`
```

````{solution}
La règle est toujours la même : `AUTOINCREMENT` sert uniquement lorsque la clef primaire est un
**identifiant artificiel**, c'est-à-dire un numéro qui n'existe nulle part ailleurs et que l'on a
créé uniquement pour identifier les lignes. C'est le cas des questions 2, 4 et 6.

À l'inverse, un numéro ISBN, une adresse e-mail et une plaque d'immatriculation existent déjà
dans le monde réel : c'est nous qui les fournissons au moment de l'insertion, SQL n'a rien à
inventer. De plus, `AUTOINCREMENT` n'est possible que sur une colonne de type `INTEGER`, ce qui
exclut d'office l'e-mail et la plaque.
````

### Exercice {num1}`exercice`
Chacune des requêtes ci-dessous comporte **une erreur**. Parfois, l'erreur fait directement buguer
la requête avec un message d'erreur rouge. D'autres fois, la requête s'exécute sans problème mais
la table créée est mal conçue.

Corrigez chacune de ces requêtes. Lisez bien les messages d'erreur, ils peuvent vous aider.

```{exec} sql
:name: select-fix-ville
:when:
:class: hidden
SELECT * FROM Ville;
```

```{exec} sql
:name: select-fix-pays
:when:
:class: hidden
SELECT * FROM Pays;
```

```{exec} sql
:name: select-fix-jeu
:when:
:class: hidden
SELECT * FROM Jeu;
```

```{exec} sql
:name: select-fix-film
:when:
:class: hidden
SELECT * FROM Film;
```

```{exec} sql
:name: select-fix-eleve
:when:
:class: hidden
SELECT * FROM Eleve;
```


1.  ```{exec} sql
    :editor: 08c3bb91-657c-4da2-9ea2-18d7b8cab7c2
    :then: select-fix-ville
    CREATE TABLE Ville (
        nom TEXT,
        canton TEXT,
        population INTEGER,
    );
    ```

2.  ```{exec} sql
    :editor: 6f303eab-26b6-4c02-b63b-cbf3efca808d
    :then: select-fix-pays
    CREATE TABLE Pays (
        nom TEXT,
        capitale TEXT,
        population INTEGER,
        PRIMARY KEY(nom AUTOINCREMENT)
    );
    ```

3.  ```{exec} sql
    :editor: 245f5834-59b4-4589-97d8-d517923fe254
    :then: select-fix-jeu
    CREATE TABLE Jeu (
        titre TEXT,
        studio TEXT,
        prix REAL,
        PRIMARY KEY(id_jeu)
    );
    ```

4.  ```{exec} sql
    :editor: 49deaca9-1f65-4c93-8854-275950b52f5c
    :then: select-fix-film
    CREATE TABLE Film (
        titre TEXT,
        annee,
        duree INTEGER,
        id_film INTEGER,
        PRIMARY KEY(id_film AUTOINCREMENT)
    );
    ```

5.  ```{exec} sql
    :editor: 2ae20379-1c15-402f-8617-45587544d342
    :then: select-fix-eleve
    CREATE TABLE Eleve (
        nom TEXT,
        prenom TEXT,
        classe TEXT
    );
    ```

````{solution}
1.  Il y a une **virgule en trop** après `population INTEGER`. La dernière ligne avant la
    parenthèse fermante ne doit pas être suivie d'une virgule. Au passage, cette table n'a pas de
    clef primaire (voir la question 5).

    ```{exec} sql
    :then: select-fix-ville
    CREATE TABLE Ville (
        nom TEXT,
        canton TEXT,
        population INTEGER,
        id_ville INTEGER,
        PRIMARY KEY(id_ville AUTOINCREMENT)
    );
    ```

2.  `AUTOINCREMENT` n'est possible que sur une clef primaire de type `INTEGER`, or `nom` est du
    `TEXT`. Comme le nom d'un pays est unique, il suffit de retirer `AUTOINCREMENT`.

    ```{exec} sql
    :then: select-fix-pays
    CREATE TABLE Pays (
        nom TEXT,
        capitale TEXT,
        population INTEGER,
        PRIMARY KEY(nom)
    );
    ```

3.  La clef primaire `id_jeu` est référencée alors que **cette colonne n'a jamais été créée**. Il
    faut la déclarer dans la liste des attributs.

    ```{exec} sql
    :then: select-fix-jeu
    CREATE TABLE Jeu (
        titre TEXT,
        studio TEXT,
        prix REAL,
        id_jeu INTEGER,
        PRIMARY KEY(id_jeu AUTOINCREMENT)
    );
    ```

4.  Le **type de données de `annee` a été oublié**. Cette requête ne produit aucun message
    d'erreur, mais la colonne acceptera alors n'importe quoi.

    ```{exec} sql
    :then: select-fix-film
    CREATE TABLE Film (
        titre TEXT,
        annee INTEGER,
        duree INTEGER,
        id_film INTEGER,
        PRIMARY KEY(id_film AUTOINCREMENT)
    );
    ```

5.  Cette requête fonctionne, mais la table **n'a aucune clef primaire**. Aucune des trois colonnes
    n'étant unique, il faut en créer une.

    ```{exec} sql
    :then: select-fix-eleve
    CREATE TABLE Eleve (
        nom TEXT,
        prenom TEXT,
        classe TEXT,
        id_eleve INTEGER,
        PRIMARY KEY(id_eleve AUTOINCREMENT)
    );
    ```
````

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
:when:
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
Le schéma relationnel ci-dessous est celui d'une plateforme de streaming musical.

```{image} images/musique_schema.png
:width: 45%
:alt: Schéma relationnel de la plateforme de streaming musical
:align: center
```

La table `Artiste` a déjà été créée et remplie pour vous. Exécutez le bloc ci-dessous pour voir
son contenu.

```{exec} sql
:name: musique-artiste
:then: musique-artiste-select
CREATE TABLE Artiste (
    nom TEXT,
    pays TEXT,
    id_artiste INTEGER,
    PRIMARY KEY(id_artiste AUTOINCREMENT)
);

INSERT INTO Artiste(nom, pays) VALUES ('Stromae', 'Belgique');
INSERT INTO Artiste(nom, pays) VALUES ('Angèle', 'Belgique');
INSERT INTO Artiste(nom, pays) VALUES ('Orelsan', 'France');
```

```{exec} sql
:name: musique-artiste-select
:when:
:class: hidden
SELECT * FROM Artiste;
```

#### Partie A
La création de la table `Album` est presque terminée : il ne reste que les **deux dernières
lignes** à écrire. Remplacez les `...` par le code correct.

```{exec} sql
:editor: e55f5789-2934-4006-ba31-b331200b29d6
:name: musique-album
:after: musique-artiste
:then: musique-album-select
CREATE TABLE Album (
    id_album INTEGER,
    titre TEXT,
    annee INTEGER,
    nb_pistes INTEGER,
    artiste INTEGER,
    PRIMARY KEY(...),
    FOREIGN KEY(...) REFERENCES ...
);
```

```{exec} sql
:name: musique-album-select
:when:
:class: hidden
SELECT * FROM Album;
```

````{solution}
```{exec} sql
:name: musique-album-solution
:after: musique-artiste
:then: musique-album-select
CREATE TABLE Album (
    id_album INTEGER,
    titre TEXT,
    annee INTEGER,
    nb_pistes INTEGER,
    artiste INTEGER,
    PRIMARY KEY(id_album AUTOINCREMENT),
    FOREIGN KEY(artiste) REFERENCES Artiste(id_artiste)
);
```
La clef étrangère `artiste` ne référence pas la table `Artiste` toute entière, mais bien **sa
clef primaire** : `Artiste(id_artiste)`.
````

#### Partie B
Si votre table est correctement créée, le bloc ci-dessous doit ajouter trois albums.

```{exec} sql
:after: musique-album
:name: musique-album-insert
:then: musique-album-select
INSERT INTO Album(titre, annee, nb_pistes, artiste) VALUES ('Racine carrée', 2013, 15, 1);
INSERT INTO Album(titre, annee, nb_pistes, artiste) VALUES ('Nonante-Cinq', 2021, 13, 2);
INSERT INTO Album(titre, annee, nb_pistes, artiste) VALUES ('Civilisation', 2021, 15, 3);
```

Ajoutez maintenant vous-même l'album *Multitude* de Stromae, sorti en 2022 et contenant 12 pistes.

```{exec} sql
:editor: ebdb9456-f026-4a05-b7d8-63dc742ccee1
:after: musique-album-insert
:then: musique-album-select
```

````{solution}
```{exec} sql
:after: musique-album-insert
:then: musique-album-select
INSERT INTO Album(titre, annee, nb_pistes, artiste) VALUES ('Multitude', 2022, 12, 1);
```
Comme `id_album` a été déclaré avec `AUTOINCREMENT`, on ne l'écrit pas : SQL lui donne
automatiquement la valeur 4. En revanche, la clef étrangère `artiste` doit bien être renseignée,
et avec le **numéro** de Stromae (`1`), pas avec son nom.
````

### Exercice {num1}`exercice`
On reprend la même plateforme de streaming, cette fois entièrement créée et remplie avec les trois
artistes de l'exercice précédent. Pour chacune des requêtes ci-dessous, **prédisez d'abord** si
elle va fonctionner, puis exécutez-la pour vérifier.

```{exec} sql predict
:name: predict-artiste-select
:when:
:class: hidden
SELECT * FROM Artiste;
```

```{exec} sql predict
:name: predict-album-select
:when:
:class: hidden
SELECT * FROM Album;
```

```{exec} sql predict
:name: musique-complet
:when:
:class: hidden
PRAGMA foreign_keys = ON;

CREATE TABLE Artiste (
    nom TEXT,
    pays TEXT,
    id_artiste INTEGER,
    PRIMARY KEY(id_artiste AUTOINCREMENT)
);

CREATE TABLE Album (
    id_album INTEGER,
    titre TEXT,
    annee INTEGER,
    nb_pistes INTEGER,
    artiste INTEGER,
    PRIMARY KEY(id_album AUTOINCREMENT),
    FOREIGN KEY(artiste) REFERENCES Artiste(id_artiste)
);

INSERT INTO Artiste(nom, pays) VALUES ('Stromae', 'Belgique');
INSERT INTO Artiste(nom, pays) VALUES ('Angèle', 'Belgique');
INSERT INTO Artiste(nom, pays) VALUES ('Orelsan', 'France');
```

```````{quiz}
1.  {ouinon}`oui`
    ```{exec} sql predict
    :after: musique-complet
    :then: predict-artiste-select
    INSERT INTO Artiste(nom, pays) VALUES ('Damso', 'Belgique');
    ```

2.  {ouinon}`non`
    ```{exec} sql predict
    :after: musique-complet
    :then: predict-artiste-select
    INSERT INTO Artiste(nom, pays) VALUES (Damso, Belgique);
    ```

3.  {ouinon}`non`
    ```{exec} sql predict
    :after: musique-complet
    :then: predict-album-select
    INSERT INTO Album(titre, annee, nb_pistes, artiste)
    VALUES ('Multitude', 2022, 12, 99);
    ```

4.  {ouinon}`oui`
    ```{exec} sql predict
    :after: musique-complet
    :then: predict-album-select
    INSERT INTO Album(titre, artiste) VALUES ('Racine carrée', 1);
    ```

5.  {ouinon}`non`
    ```{exec} sql predict
    :after: musique-complet
    :then: predict-artiste-select
    INSERT INTO Artiste(nom, pays, id_artiste) VALUES ('Zaho de Sagazan', 'France');
    ```

6.  {ouinon}`non`
    ```{exec} sql predict
    :after: musique-complet
    :then: predict-album-select
    INSERT INTO Album VALUES ('Nonante-Cinq', 2021, 13, 2);
    ```
```````

````{solution}
1.  **Fonctionne.** Les deux valeurs `TEXT` sont bien entre guillemets simples, et `id_artiste`
    est omis car il est en `AUTOINCREMENT`.
2.  **Ne fonctionne pas.** Les guillemets simples manquent. SQL cherche alors une *colonne*
    appelée `Damso` et affiche `no such column: Damso`.
3.  **Ne fonctionne pas.** La clef étrangère `artiste` vaut `99`, or aucun artiste ne porte le
    numéro 99. C'est exactement le rôle de la clef étrangère que d'interdire cela :
    `FOREIGN KEY constraint failed`.
4.  **Fonctionne.** Rien n'oblige à remplir toutes les colonnes : `annee` et `nb_pistes` resteront
    simplement vides.
5.  **Ne fonctionne pas.** Trois colonnes sont annoncées mais seulement deux valeurs sont
    fournies : `2 values for 3 columns`.
6.  **Ne fonctionne pas.** Quand on n'écrit pas la liste des colonnes après le nom de la table, il
    faut donner une valeur pour **toutes** les colonnes, `id_album` compris. La table en a 5, on
    n'en donne que 4.
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
:when:
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
    entraineur TEXT,
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
:when:
:class: hidden
:name: select-joueur
SELECT * FROM Joueur
```
Avant de l'exécuter, prédisez le résultat de la requête `INSERT INTO` ci-dessous.

```{quiz}
:style: max-width: 30rem;
{ouinon}`non`
Cette requête va-t-elle fonctionner ?
```

Si votre code est correct, cette requête ne doit **PAS** fonctionner. Pourquoi est-ce le cas ? Si cette requête ajoute bel et bien un 1er joueur à cette table, retravaillez le référencement de la clef étrangère dans la création de table.

```{exec} sql
:when:
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


### Exercice {num1}`exercice`
Le schéma relationnel ci-dessous décrit une base de données d'une bibliothèque de mangas et de leurs éditeurs.

```{image} images/manga_schema.png
:width: 45%
:alt: Schéma relationnel d'une bibliothèque de mangas et de leurs éditeurs
:align: center
```

#### Partie A
Commencez par écrire, ci-dessous, la requête permettant de créer la table `Editeur`.

```{exec} sql
:editor: 6df5ff6c-1a8a-4bdc-9dbf-c6dfa1ba24c1
:name: eleve-create-editeur
:then: select-editeur
```

```{exec} sql
:when:
:class: hidden
:name: select-editeur
SELECT * FROM Editeur
```

Si votre code SQL est correct, le bloc ci-dessous devrait permettre de créer et enregistrer 3 nouveaux éditeurs.

```{exec} sql
:after: eleve-create-editeur
:name: insert-editeur
:then: select-editeur
INSERT INTO Editeur(nom, pays) VALUES ('Glénat', 'France');

INSERT INTO Editeur(nom, pays) VALUES ('Kana', 'Belgique');

INSERT INTO Editeur(nom, pays) VALUES ('Kazé', 'France');
```

````{solution}
```{exec} sql
:name: solution-create-editeur
:then: select-editeur
CREATE TABLE Editeur(
    nom TEXT,
    pays TEXT,
    id_editeur INTEGER,
    PRIMARY KEY(id_editeur AUTOINCREMENT)
)
```
````

#### Partie B
Créez maintenant la table `Manga`. N'oubliez pas de référencer la clef étrangère avec `FOREIGN KEY ... REFERENCES ...`.

```{exec} sql
:editor: b17d2a7f-3897-4694-bcec-98983127be46
:name: eleve-create-manga
:after: insert-editeur
:then: select-manga
```

```{exec} sql
:when:
:class: hidden
:name: select-manga
SELECT * FROM Manga
```

Avant de l'exécuter, prédisez le résultat de la requête `INSERT INTO` ci-dessous.

```{quiz}
:style: max-width: 30rem;
{ouinon}`non`
Cette requête va-t-elle fonctionner ?
```

Si votre code est correct, cette requête ne doit **PAS** fonctionner. Pourquoi est-ce le cas ? Si cette requête ajoute bel et bien un manga à cette table, retravaillez le référencement de la clef étrangère dans la création de table.

```{exec} sql
:when:
:class: hidden
:name: pragma-manga
:after: eleve-create-manga
PRAGMA foreign_keys = ON;
```

```{exec} sql
:after: pragma-manga
:then: select-manga
INSERT INTO Manga(titre, nb_tomes, prix, editeur)
VALUES ('Berserk', 41, 8.50, 99)
```

````{solution}
```{exec} sql
:name: solution-create-manga
:after: solution-create-editeur
:then: select-manga
CREATE TABLE Manga(
    titre TEXT,
    nb_tomes INTEGER,
    prix REAL,
    editeur INTEGER,
    id_manga INTEGER,
    PRIMARY KEY(id_manga AUTOINCREMENT),
    FOREIGN KEY(editeur) REFERENCES Editeur(id_editeur)
)
```

Le `INSERT INTO` ne fonctionne pas car la clef étrangère `editeur` prendrait ici la valeur `99`, qui ne correspond à aucun `id_editeur` existant dans la table `Editeur`. La clef étrangère `editeur` ne référence pas la table `Editeur` toute entière, mais bien **sa clef primaire** : `Editeur(id_editeur)`.
````

#### Partie C
Ajoutez maintenant 3 nouveaux mangas dans cette base de données.
 - *One Piece* (108 tomes, 7.60 CHF) est publié par Glénat
 - *Naruto* (72 tomes, 7.60 CHF) est publié par Kana
 - *Fullmetal Alchemist* (27 tomes, 8.95 CHF) est publié par Kazé

Grâce au `AUTOINCREMENT`, les éditeurs Glénat, Kana et Kazé ont reçu **automatiquement** les `id_editeur` 1, 2 et 3.

```{exec} sql
:editor: c5e2657d-92f2-4e54-b03d-8ea36efa458e
:after: pragma-manga
:then: select-manga
```

````{solution}
```{exec} sql
:after: solution-create-manga
:then: select-manga
INSERT INTO Manga(titre, nb_tomes, prix, editeur) VALUES ('One Piece', 108, 7.60, 1);

INSERT INTO Manga(titre, nb_tomes, prix, editeur) VALUES ('Naruto', 72, 7.60, 2);

INSERT INTO Manga(titre, nb_tomes, prix, editeur) VALUES ('Fullmetal Alchemist', 27, 8.95, 3);
```
La clef étrangère `editeur` doit être renseignée avec le **numéro** de l'éditeur (`1`, `2` ou `3`), pas avec son nom.
````
