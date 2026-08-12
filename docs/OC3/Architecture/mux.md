<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Multiplexeur et décodeur

## Choisir un signal parmi plusieurs
Jusqu'ici, nos circuits *calculaient* : ils prenaient des bits en entrée et en
produisaient d'autres. Un processeur a besoin d'un autre type de brique, capable
de **choisir** quel signal laisser passer. Par exemple, l'unité de calcul devra
décider si elle envoie en sortie le résultat d'une addition ou celui d'une
soustraction ; et plusieurs composants devront, chacun à leur tour, poser leur
valeur sur un fil partagé, le *bus*.

Le composant qui réalise ce choix s'appelle un *multiplexeur* (souvent abrégé
*mux*). On peut le voir comme un **sélecteur**, à la manière d'un bouton rotatif :
plusieurs entrées de données se présentent, quelques entrées de *sélection* (la
commande) en désignent une, et l'unique sortie recopie sa valeur. Un
multiplexeur fait donc passer **une entrée parmi plusieurs** vers une seule
sortie.

## Le multiplexeur 2 vers 1
Le plus simple a **deux entrées de données** `a` et `b`, **un bit de sélection**
`s`, et une sortie `y`. Son fonctionnement tient en une phrase : `y` recopie `a`
quand `s` vaut `0`, et `b` quand `s` vaut `1`. Le bit `s` agit comme un
interrupteur qui désigne l'entrée à laisser passer.

On le représente par un symbole en forme de trapèze : les entrées de données `a`
et `b` à gauche, le bit de sélection `s` en dessous, et la sortie `y` à droite.

```{figure} images/mux2_symbole.svg
:width: 55%
:alt: Symbole d'un multiplexeur 2 vers 1 : deux entrées a et b à gauche, un bit de sélection s en dessous, une sortie y à droite
:align: center

Le symbole du multiplexeur 2 vers 1.
```

| `s` | `y` |
| :-: | :-: |
| `0` | `a` |
| `1` | `b` |

On traduit ce comportement en une expression logique avec les opérateurs déjà
connus :

`y = (¬s ∧ a) ∨ (s ∧ b)`

Elle se lit bien : quand `s = 0`, alors `¬s = 1`, donc le premier terme vaut `a`
et le second vaut `0` : `y = a`. Quand `s = 1`, le premier terme s'annule et le
second vaut `b` : `y = b`. Il suffit donc de deux portes ET, d'une porte OU et
d'une porte NON.

```{figure} images/mux2.svg
:width: 90%
:alt: Un multiplexeur 2 vers 1 au niveau des portes : une porte NON produit ¬s, deux portes ET calculent a ET ¬s et b ET s, et une porte OU les combine en y
:align: center

Le multiplexeur 2 vers 1 : `y = (¬s ∧ a) ∨ (s ∧ b)`.
```

```{important}
Un multiplexeur 2 vers 1 **choisit** entre deux entrées avec un bit de
sélection : `y = a` si `s = 0`, `y = b` si `s = 1`. Son expression est
`y = (¬s ∧ a) ∨ (s ∧ b)`.
```

Voici ce circuit **en fonctionnement**. Cliquez sur les entrées `a`, `b` et `s`
pour changer leur valeur, et observez la sortie `y` : elle recopie `a` tant que
`s` vaut `0`, puis bascule sur `b` dès que `s` vaut `1`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBtdWx0aXBsZXhldXIgMiB2ZXJzIDEiLCJvIjoiQ2xpcXVleiBsZXMgZW50csOpZXMgYSwgYiBldCBzLCBwdWlzIG9ic2VydmV6IGxhIHNvcnRpZSB5LiBRdWFuZCBzID0gMCwgeSByZWNvcGllIGEgOyBxdWFuZCBzID0gMSwgeSByZWNvcGllIGIuIiwicyI6W10sImEiOltdLCJpIjpbXSwidSI6W10sImsiOiJub25lIiwiciI6W10sImwiOjEsImMiOnsidmVyc2lvbiI6MiwibmFtZSI6ImNpcmN1aXQiLCJjb21wb25lbnRzIjpbeyJpZCI6ImEiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6NDAsInN0YXRlIjp7InZhbHVlIjoxfSwibGFiZWwiOiJhIn0seyJpZCI6ImIiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6MTQwLCJzdGF0ZSI6eyJ2YWx1ZSI6MH0sImxhYmVsIjoiYiJ9LHsiaWQiOiJzIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjIyMCwic3RhdGUiOnsidmFsdWUiOjB9LCJsYWJlbCI6InMifSx7ImlkIjoibnMiLCJ0eXBlIjoiTk9UIiwieCI6MTgwLCJ5Ijo0MH0seyJpZCI6ImFuZDEiLCJ0eXBlIjoiQU5EIiwieCI6MzIwLCJ5Ijo0MH0seyJpZCI6ImFuZDIiLCJ0eXBlIjoiQU5EIiwieCI6MTgwLCJ5IjoxNDB9LHsiaWQiOiJvcjEiLCJ0eXBlIjoiT1IiLCJ4Ijo0NjAsInkiOjQwfSx7ImlkIjoieSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo2MDAsInkiOjQwLCJsYWJlbCI6InkifV0sIndpcmVzIjpbeyJpZCI6IncxIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6InMiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoibnMiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJhIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImFuZDEiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3MyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJucyIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJhbmQxIiwicG9ydCI6ImluMSJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiYiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJhbmQyIiwicG9ydCI6ImluMCJ9fSx7ImlkIjoidzUiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoicyIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJhbmQyIiwicG9ydCI6ImluMSJ9fSx7ImlkIjoidzYiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiYW5kMSIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJvcjEiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3NyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJhbmQyIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6Im9yMSIsInBvcnQiOiJpbjEifX0seyJpZCI6Inc4IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6Im9yMSIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJ5IiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 420px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un multiplexeur 2 vers 1 en fonctionnement
```

## Le multiplexeur 4 vers 1
Pour choisir parmi **quatre** entrées `e0`, `e1`, `e2`, `e3`, un seul bit de
sélection ne suffit plus : il en faut **deux**, `s1` et `s0`. Le nombre binaire
`s1 s0` (de `0` à `3`) désigne alors l'entrée à recopier.

Son symbole reprend celui du 2 vers 1, avec quatre entrées de données et **deux**
bits de commande :

```{figure} images/mux4_symbole.svg
:width: 60%
:alt: Symbole d'un multiplexeur 4 vers 1 : quatre entrées e0 à e3 à gauche, deux bits de sélection s1 et s0 en dessous, une sortie y à droite
:align: center

Le symbole du multiplexeur 4 vers 1 et ses deux bits de sélection.
```

| `s1` | `s0` | entrée choisie | `y`  |
| :--: | :--: | :------------: | :--: |
| `0`  | `0`  | `e0`           | `e0` |
| `0`  | `1`  | `e1`           | `e1` |
| `1`  | `0`  | `e2`           | `e2` |
| `1`  | `1`  | `e3`           | `e3` |


## Le décodeur
Le multiplexeur *choisit* une entrée parmi plusieurs. Un composant voisin, le
*décodeur*, fait en quelque sorte l'inverse : à partir d'un petit **nombre
binaire**, il **active une seule sortie**, celle dont le numéro correspond à ce
nombre.

Un décodeur 2 vers 4 possède **deux entrées de sélection** (`s1`, `s0`) et
**quatre sorties** (`out0`, `out1`, `out2`, `out3`). Le nombre `s1 s0` (de `0` à
`3`) désigne la sortie qui passe à `1` ; toutes les autres restent à `0`.

| `s1` | `s0` | sortie active |
| :--: | :--: | :-----------: |
| `0`  | `0`  | `out0`        |
| `0`  | `1`  | `out1`        |
| `1`  | `0`  | `out2`        |
| `1`  | `1`  | `out3`        |

C'est un composant d'**adressage** : il transforme un numéro en un signal unique.
On s'en sert pour désigner une case de la mémoire, choisir un registre, ou encore
décoder le code d'une instruction. On peut le voir comme une rangée de lampes
numérotées dont l'entrée n'allume que celle qui porte son numéro.

Essayez ci-dessous : changez le nombre de sélection et observez la sortie qui
s'allume.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBkw6ljb2RldXIgMiB2ZXJzIDQiLCJvIjoiQ2xpcXVleiBzdXIgbCdlbnRyw6llIGRlIHPDqWxlY3Rpb24gKGxlIG5vbWJyZSBzMSBzMCwgZGUgMCDDoCAzKSBldCBvYnNlcnZleiA6IHVuZSBzZXVsZSBzb3J0aWUgcydhbGx1bWUsIGNlbGxlIGRvbnQgbGUgbnVtw6lybyBjb3JyZXNwb25kIGF1IG5vbWJyZSBjaG9pc2kuIiwicyI6W10sImEiOltdLCJpIjpbXSwidSI6W10sImsiOiJub25lIiwiciI6W10sImwiOjEsImMiOnsidmVyc2lvbiI6MiwibmFtZSI6ImNpcmN1aXQiLCJjb21wb25lbnRzIjpbeyJpZCI6InNlbCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoxMjAsInN0YXRlIjp7IndpZHRoIjoyLCJ2YWx1ZSI6Mn0sImxhYmVsIjoiczEgczAifSx7ImlkIjoiZGVjIiwidHlwZSI6IkRFQ09ERVIiLCJ4IjoyMjAsInkiOjgwfSx7ImlkIjoibzAiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDIwLCJ5Ijo0MCwibGFiZWwiOiJvdXQwIn0seyJpZCI6Im8xIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQyMCwieSI6MTIwLCJsYWJlbCI6Im91dDEifSx7ImlkIjoibzIiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDIwLCJ5IjoxODAsImxhYmVsIjoib3V0MiJ9LHsiaWQiOiJvMyIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0MjAsInkiOjI2MCwibGFiZWwiOiJvdXQzIn1dLCJ3aXJlcyI6W3siaWQiOiJ3MSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJzZWwiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiZGVjIiwicG9ydCI6ImluIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0Ijoib3V0MCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6Im8wIiwicG9ydCI6ImluMCJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiZGVjIiwicG9ydCI6Im91dDEifSwidG8iOnsiY29tcG9uZW50SWQiOiJvMSIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc0IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJvdXQyIn0sInRvIjp7ImNvbXBvbmVudElkIjoibzIiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3NSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0Ijoib3V0MyJ9LCJ0byI6eyJjb21wb25lbnRJZCI6Im8zIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 380px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un décodeur 2 vers 4 en fonctionnement
```

## Exercices

### Exercice {num1}`exercice`
Un aiguillage électronique dirige les trains sur la voie `a` quand `s = 0`, et sur
la voie `b` quand `s = 1` : exactement le comportement d'un multiplexeur 2 vers 1.
Les valeurs `a` et `b` indiquent si un train attend sur chaque voie (`1` = train
présent), et `y` indique si un train va effectivement s'engager sur l'aiguillage.

Complétez la table de vérité de cet aiguillage en choisissant la valeur de `y`
pour chacune des huit lignes.

```{role} bit(quiz-select)
:options: |
: 0
: 1
```

```{quiz}
:style: max-width: 20rem;
| `s` | `a` | `b` | `y` |
| :-: | :-: | :-: | :-: |
| `0` | `0` | `0` | {bit}`0` |
| `0` | `0` | `1` | {bit}`0` |
| `0` | `1` | `0` | {bit}`1` |
| `0` | `1` | `1` | {bit}`1` |
| `1` | `0` | `0` | {bit}`0` |
| `1` | `0` | `1` | {bit}`1` |
| `1` | `1` | `0` | {bit}`0` |
| `1` | `1` | `1` | {bit}`1` |
```

### Exercice {num1}`exercice`
Une console de mixage possède quatre entrées audio `e0`, `e1`, `e2` et `e3`,
branchées sur un multiplexeur 4 vers 1 (le même type de circuit qui, plus tard,
servira à choisir quelle donnée poser sur le bus). L'ingénieur du son a réglé les
niveaux suivants : `e0 = 1`, `e1 = 0`, `e2 = 1`, `e3 = 0`.

Pour chaque position du sélecteur `s1 s0`, complétez l'entrée sélectionnée et la
valeur de `y`.

```{role} entree(quiz-select)
:options: |
: e0
: e1
: e2
: e3
```

```{quiz}
:style: max-width: 30rem;
| `s1` | `s0` | entrée choisie | `y`      |
| :--: | :--: | :------------: | :------: |
| `0`  | `0`  | {entree}`e0`   | {bit}`1` |
| `0`  | `1`  | {entree}`e1`   | {bit}`0` |
| `1`  | `0`  | {entree}`e2`   | {bit}`1` |
| `1`  | `1`  | {entree}`e3`   | {bit}`0` |
```


### Exercice {num1}`exercice`
Un multiplexeur a besoin d'un bit de sélection par doublement du nombre
d'entrées : `n` bits de sélection permettent de choisir parmi $2^n$ entrées.
Répondez aux questions suivantes.

1.  Combien de bits de sélection faut-il pour un multiplexeur 8 vers 1 ?
2.  Combien d'entrées peut-on choisir avec 4 bits de sélection ?

````{solution}
1.  Il faut `3` bits, car $2^3 = 8$.
2.  On peut choisir parmi $2^4 = 16$ entrées.
````

### Exercice {num1}`exercice`
Dans le simulateur ci-dessous, réalisez un **multiplexeur 4 vers 1** en assemblant
**trois composants « Multiplexeur »** (chacun un 2 vers 1), comme dans la
construction en arbre vue plus haut. Les entrées `e0..e3`, les bits de sélection
`s1`, `s0` et la sortie `y` sont déjà placés. Reliez les deux mux du premier étage
(commandés par `s0`) puis le mux du second étage (commandé par `s1`). Le bouton
bleu vérifie votre circuit sur toutes les combinaisons.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiTXVsdGlwbGV4ZXVyIDQgdmVycyAxIGF2ZWMgZGVzIG11bHRpcGxleGV1cnMgMiB2ZXJzIDEiLCJvIjoiRW4gYXNzZW1ibGFudCB0cm9pcyBjb21wb3NhbnRzIMKrIE11bHRpcGxleGV1ciDCuyAoY2hhY3VuIHVuIDIgdmVycyAxKSwgcsOpYWxpc2V6IHVuIG11bHRpcGxleGV1ciA0IHZlcnMgMS4gTGVzIGVudHLDqWVzIGUwLi5lMywgbGVzIGJpdHMgZGUgc8OpbGVjdGlvbiBzMSwgczAgZXQgbGEgc29ydGllIHkgc29udCBkw6lqw6AgcGxhY8Opcy4iLCJzIjpbIkZhaXRlcyBnbGlzc2VyIHRyb2lzIE11bHRpcGxleGV1cnMgZGVwdWlzIGxhIHBhbGV0dGUuIiwiUHJlbWllciDDqXRhZ2UgOiB1biBtdXggY2hvaXNpdCBlbnRyZSBlMCBldCBlMSwgbCdhdXRyZSBlbnRyZSBlMiBldCBlMyA7IGNvbW1hbmRlei1sZXMgdG91cyBkZXV4IHBhciBzMCAoZW50csOpZSBzZWwpLiIsIlNlY29uZCDDqXRhZ2UgOiBsZSB0cm9pc2nDqG1lIG11eCBjaG9pc2l0IGVudHJlIGxlcyBkZXV4IHNvcnRpZXMgcHLDqWPDqWRlbnRlcywgY29tbWFuZMOpIHBhciBzMSwgZXQgcHJvZHVpdCB5LiIsIkNsaXF1ZXogVsOpcmlmaWVyLiJdLCJhIjpbIk1VWCJdLCJpIjpbWyJlMCIsMV0sWyJlMSIsMV0sWyJlMiIsMV0sWyJlMyIsMV0sWyJzMSIsMV0sWyJzMCIsMV1dLCJ1IjpbWyJ5IiwxXV0sImsiOiJ0dCIsInIiOltbWzAsMCwwLDAsMCwwXSxbMF1dLFtbMCwwLDAsMCwwLDFdLFswXV0sW1swLDAsMCwwLDEsMF0sWzBdXSxbWzAsMCwwLDAsMSwxXSxbMF1dLFtbMCwwLDAsMSwwLDBdLFswXV0sW1swLDAsMCwxLDAsMV0sWzBdXSxbWzAsMCwwLDEsMSwwXSxbMF1dLFtbMCwwLDAsMSwxLDFdLFsxXV0sW1swLDAsMSwwLDAsMF0sWzBdXSxbWzAsMCwxLDAsMCwxXSxbMF1dLFtbMCwwLDEsMCwxLDBdLFsxXV0sW1swLDAsMSwwLDEsMV0sWzBdXSxbWzAsMCwxLDEsMCwwXSxbMF1dLFtbMCwwLDEsMSwwLDFdLFswXV0sW1swLDAsMSwxLDEsMF0sWzFdXSxbWzAsMCwxLDEsMSwxXSxbMV1dLFtbMCwxLDAsMCwwLDBdLFswXV0sW1swLDEsMCwwLDAsMV0sWzFdXSxbWzAsMSwwLDAsMSwwXSxbMF1dLFtbMCwxLDAsMCwxLDFdLFswXV0sW1swLDEsMCwxLDAsMF0sWzBdXSxbWzAsMSwwLDEsMCwxXSxbMV1dLFtbMCwxLDAsMSwxLDBdLFswXV0sW1swLDEsMCwxLDEsMV0sWzFdXSxbWzAsMSwxLDAsMCwwXSxbMF1dLFtbMCwxLDEsMCwwLDFdLFsxXV0sW1swLDEsMSwwLDEsMF0sWzFdXSxbWzAsMSwxLDAsMSwxXSxbMF1dLFtbMCwxLDEsMSwwLDBdLFswXV0sW1swLDEsMSwxLDAsMV0sWzFdXSxbWzAsMSwxLDEsMSwwXSxbMV1dLFtbMCwxLDEsMSwxLDFdLFsxXV0sW1sxLDAsMCwwLDAsMF0sWzFdXSxbWzEsMCwwLDAsMCwxXSxbMF1dLFtbMSwwLDAsMCwxLDBdLFswXV0sW1sxLDAsMCwwLDEsMV0sWzBdXSxbWzEsMCwwLDEsMCwwXSxbMV1dLFtbMSwwLDAsMSwwLDFdLFswXV0sW1sxLDAsMCwxLDEsMF0sWzBdXSxbWzEsMCwwLDEsMSwxXSxbMV1dLFtbMSwwLDEsMCwwLDBdLFsxXV0sW1sxLDAsMSwwLDAsMV0sWzBdXSxbWzEsMCwxLDAsMSwwXSxbMV1dLFtbMSwwLDEsMCwxLDFdLFswXV0sW1sxLDAsMSwxLDAsMF0sWzFdXSxbWzEsMCwxLDEsMCwxXSxbMF1dLFtbMSwwLDEsMSwxLDBdLFsxXV0sW1sxLDAsMSwxLDEsMV0sWzFdXSxbWzEsMSwwLDAsMCwwXSxbMV1dLFtbMSwxLDAsMCwwLDFdLFsxXV0sW1sxLDEsMCwwLDEsMF0sWzBdXSxbWzEsMSwwLDAsMSwxXSxbMF1dLFtbMSwxLDAsMSwwLDBdLFsxXV0sW1sxLDEsMCwxLDAsMV0sWzFdXSxbWzEsMSwwLDEsMSwwXSxbMF1dLFtbMSwxLDAsMSwxLDFdLFsxXV0sW1sxLDEsMSwwLDAsMF0sWzFdXSxbWzEsMSwxLDAsMCwxXSxbMV1dLFtbMSwxLDEsMCwxLDBdLFsxXV0sW1sxLDEsMSwwLDEsMV0sWzBdXSxbWzEsMSwxLDEsMCwwXSxbMV1dLFtbMSwxLDEsMSwwLDFdLFsxXV0sW1sxLDEsMSwxLDEsMF0sWzFdXSxbWzEsMSwxLDEsMSwxXSxbMV1dXSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiZTAiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6NDAsImxhYmVsIjoiZTAifSx7ImlkIjoiZTEiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6MTIwLCJsYWJlbCI6ImUxIn0seyJpZCI6ImUyIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjIwMCwibGFiZWwiOiJlMiJ9LHsiaWQiOiJlMyIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoyODAsImxhYmVsIjoiZTMifSx7ImlkIjoiczEiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6MzgwLCJsYWJlbCI6InMxIn0seyJpZCI6InMwIiwidHlwZSI6IklOUFVUIiwieCI6MjAwLCJ5IjozODAsImxhYmVsIjoiczAifSx7ImlkIjoieSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo2NDAsInkiOjE2MCwibGFiZWwiOiJ5In1dLCJ3aXJlcyI6W10sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 520px; aspect-ratio: auto; border: 1px solid black;
:title: Exercice Logix : un multiplexeur 4 vers 1 à partir de trois multiplexeurs 2 vers 1
```

### Exercice {num1}`exercice`
Pour chaque valeur du nombre de sélection `s1 s0`, indiquez quelle sortie du
décodeur 2 vers 4 passe à `1`.

```{role} sortie(quiz-select)
:options: |
: out0
: out1
: out2
: out3
```

```{quiz}
:style: max-width: 24rem;
| `s1` | `s0` | sortie à `1`   |
| :--: | :--: | :------------: |
| `0`  | `1`  | {sortie}`out1` |
| `1`  | `1`  | {sortie}`out3` |
| `0`  | `0`  | {sortie}`out0` |
| `1`  | `0`  | {sortie}`out2` |
```

### Exercice {num1}`exercice`
Un décodeur suit la même règle que le multiplexeur pour le nombre de bits : `n`
entrées de sélection commandent $2^n$ sorties.

1.  Combien de sorties possède un décodeur à `3` entrées de sélection ?
2.  Combien d'entrées de sélection faut-il pour un décodeur à `16` sorties ?

````{solution}
1.  `2^3 = 8` sorties : c'est un décodeur 3 vers 8.
2.  Il faut `4` entrées, car $2^4 = 16$ : c'est un décodeur 4 vers 16.
````
