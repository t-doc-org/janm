<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Soustracteur

## De l'addition à la soustraction
Nous savons maintenant additionner avec un circuit. Pour soustraire, on pourrait
inventer un tout nouveau circuit, avec des "emprunts" à la place des retenues.
Mais il existe une idée bien plus économique : **transformer la soustraction en
addition**. En effet, soustraire, c'est ajouter l'opposé :

$$a - b = a + (-b)$$

Il suffit donc de savoir représenter `-b` en binaire. C'est exactement ce que
permet le **complément à deux**, que vous avez rencontré en 1ère année.

## Le complément à deux
Sur `n` bits, le complément à deux code un nombre négatif `-b` par la valeur
$2^n - b$. En pratique, on n'a pas besoin de faire cette soustraction : on obtient
`-b` en **deux gestes simples** :

1. **inverser** tous les bits de `b` (remplacer chaque `0` par `1` et
   inversement) : c'est le rôle de la porte NON, et on le note `¬b` ;
2. **ajouter `1`** au résultat.

Prenons `b = 3`, soit `0011` sur 4 bits :

```{code-block} text
b        = 0011   (3)
¬b       = 1100   (on inverse chaque bit)
¬b + 1   = 1101   (on ajoute 1)  ->  -3
```

Le motif `1101` représente donc `-3`. On peut le vérifier : ajouté à `0011` (3),
il doit donner `0` (sur 4 bits). Et c'est bien le cas, `0011 + 1101 = 10000`, dont
seuls les 4 bits de droite comptent : `0000`.

```{important}
Pour obtenir `-b` en complément à deux : on **inverse** tous les bits de `b`
(`¬b`), puis on **ajoute `1`**.
```

```{note}
Sur `n` bits, le complément à deux représente les entiers de $-2^{n-1}$ à
$2^{n-1} - 1$. Sur 4 bits, cela va donc de `1000` ($-8$) à `0111` ($+7$) ; sur
8 bits, de $-128$ à $+127$. L'intervalle est **asymétrique** : il y a toujours un
négatif de plus que de positifs, car le motif `0…0` occupe une des places
positives.
```

## Soustraire, c'est additionner
En remplaçant `-b` par `¬b + 1` dans notre égalité de départ, on obtient la
formule clé du soustracteur :

$$a - b = a + \neg b + 1$$

Autrement dit, pour calculer `a - b`, il suffit de reprendre **le même
additionneur** que dans le chapitre précédent, et de lui fournir :

- `a` tel quel ;
- `¬b`, c'est-à-dire chaque bit de `b` inversé par une porte NON ;
- une retenue entrante `Cin` égale à `1`, qui réalise le `+ 1`.

Voici par exemple `7 - 2` posé de cette façon :

```{code-block} text
retenues   1 1 1
           0 1 1 1    ( a = 7 )
         + 1 1 0 1    ( ¬b, avec b = 2 )
         +       1    ( Cin = 1 )
           -------
        (1) 0 1 0 1    ( résultat : 5 )
```

Le résultat sur 4 bits est `0101`, soit `5` : on a bien `7 - 2 = 5`. La retenue
sortante `(1)` déborde et n'est pas conservée.

## Le circuit
Il ne reste plus qu'à câbler cette idée. On reprend la chaîne d'**additionneurs
complets** du chapitre précédent, on **inverse chaque bit de `b`** avec une porte
NON, et on fixe la **première retenue entrante à `1`**.

```{figure} images/soustracteur_4bits.svg
:width: 100%
:alt: Un soustracteur 4 bits formé de quatre additionneurs complets ; chaque entrée b passe par une porte NON avant d'entrer dans l'additionneur, et la retenue entrante du premier additionneur vaut 1
:align: center

Un soustracteur 4 bits : les additionneurs complets sont inchangés, seuls `¬b` et
`Cin = 1` diffèrent de l'additionneur.
```

Le circuit est donc presque identique à l'additionneur : **les additionneurs
complets ne changent pas du tout**, on ajoute simplement quatre portes NON et on
force `Cin = 1`.

```{tip}
La retenue sortante `Cout` renseigne sur le signe du résultat (en non signé) :
elle vaut `1` quand `a ≥ b` (le résultat est positif, il n'y a pas eu d'emprunt)
et `0` quand `a < b` (le résultat est négatif, écrit en complément à deux).
```

## Un circuit qui additionne **et** soustrait
On peut aller un cran plus loin. Remarquons qu'une porte XOR se comporte comme un
**inverseur commandé** : `b ⊕ 0 = b` (on ne change rien) mais `b ⊕ 1 = ¬b` (on
inverse). En remplaçant les portes NON par des portes XOR pilotées par un même
signal de commande `M`, et en reliant aussi `M` à la retenue entrante, on obtient
un circuit qui **additionne quand `M = 0`** et **soustrait quand `M = 1`**.

Voyons d'abord cet inverseur commandé isolément. Dans la démonstration ci-dessous,
cliquez sur `M` : quand `M = 0`, la sortie recopie `b` ; quand `M = 1`, elle
l'inverse.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsJ2ludmVyc2V1ciBjb21tYW5kw6kiLCJvIjoiQ2xpcXVleiBNIDogcXVhbmQgTSA9IDAsIGxhIHNvcnRpZSByZWNvcGllIGIgOyBxdWFuZCBNID0gMSwgZWxsZSBpbnZlcnNlIGIuIEMnZXN0IGxlIGPFk3VyIGRlIGwnYWRkaXRpb25uZXVyLXNvdXN0cmFjdGV1ci4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiYiIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo0MCwic3RhdGUiOnsidmFsdWUiOjF9LCJsYWJlbCI6ImIifSx7ImlkIjoiTSIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoxNDAsInN0YXRlIjp7InZhbHVlIjowfSwibGFiZWwiOiJNIn0seyJpZCI6IngiLCJ0eXBlIjoiWE9SIiwieCI6MTgwLCJ5Ijo0MH0seyJpZCI6Im8iLCJ0eXBlIjoiT1VUUFVUIiwieCI6MzIwLCJ5Ijo0MCwibGFiZWwiOiJiIOKKlSBNIn1dLCJ3aXJlcyI6W3siaWQiOiJ3MSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJiIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IngiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJNIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IngiLCJwb3J0IjoiaW4xIn19LHsiaWQiOiJ3MyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJ4IiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6Im8iLCJwb3J0IjoiaW4wIn19XSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 360px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : l'inverseur commandé b ⊕ M
```

```{figure} images/additionneur_soustracteur.svg
:width: 100%
:alt: Un additionneur-soustracteur 4 bits ; chaque bit de b passe par une porte XOR dont la seconde entrée est le signal de commande M, qui pilote aussi la retenue entrante Cin
:align: center

L'additionneur-soustracteur : le signal `M` inverse `b` (via les XOR) et fixe la
retenue entrante. `M = 0` additionne, `M = 1` soustrait.
```

Quand `M = 0`, chaque XOR laisse passer `b` inchangé et `Cin = 0` : le circuit
additionne. Quand `M = 1`, chaque XOR inverse `b` en `¬b` et `Cin = 1` : on
retrouve exactement le soustracteur `a + ¬b + 1`. C'est précisément la brique
dont nous aurons besoin pour construire l'unité de calcul du processeur.

## Exercices

### Exercice {num1}`exercice`
Donnez le complément à deux **sur 6 bits**, c'est-à-dire la représentation de
`-b`, pour chacune des valeurs suivantes. Détaillez les deux étapes (`¬b` puis
`+ 1`).

1.  `b = 20`
2.  `b = 13`
3.  `b = 25`
4.  `b = 32`

````{solution}
1.  `20 = 010100`, `¬b = 101011`, puis `101011 + 1 = 101100` : c'est `-20`.
2.  `13 = 001101`, `¬b = 110010`, puis `110010 + 1 = 110011` : c'est `-13`.
3.  `25 = 011001`, `¬b = 100110`, puis `100110 + 1 = 100111` : c'est `-25`.
4.  `32 = 100000`, `¬b = 011111`, puis `011111 + 1 = 100000` : c'est `-32`. Sur
    6 bits, `-32` est la plus petite valeur représentable, et son motif est son
    propre complément à deux.
````

### Exercice {num1}`exercice`
Effectuez les soustractions suivantes sur 4 bits, en passant par l'addition
`a + ¬b + 1`. Donnez le résultat en binaire, puis en décimal.

1.  `7 - 4`
2.  `4 - 7`
3.  `5 - 5`

````{solution}
1.  `0111 + 1011 + 1 = 10011`, soit `0011` sur 4 bits : `3`. La retenue sortante
    vaut `1` (résultat positif).
2.  `0100 + 1000 + 1 = 1101`, soit `1101` : c'est `-3` en complément à deux. La
    retenue sortante vaut `0` (résultat négatif).
3.  `0101 + 1010 + 1 = 10000`, soit `0000` : `0`, comme attendu.
````

### Exercice {num1}`exercice`
On applique `a = 6` (`0110`) et `b = 2` (`0010`) au soustracteur.

1.  Quelles valeurs arrivent réellement sur les entrées des additionneurs, après
    les portes NON ? Que vaut la retenue entrante ?
2.  Donnez la sortie `s` (en binaire et en décimal) ainsi que la retenue sortante
    `Cout`, et interprétez cette dernière.

````{solution}
1.  Les portes NON transforment `b = 0010` en `¬b = 1101`. La retenue entrante
    vaut `Cin = 1`.
2.  `0110 + 1101 + 1 = 10100`, soit `0100` sur 4 bits : `s = 4`. On a bien
    `6 - 2 = 4`. La retenue sortante vaut `Cout = 1`, ce qui confirme que `a ≥ b`
    et que le résultat est positif.
````



### Exercice {num1}`exercice`
Dans le simulateur ci-dessous, transformez un **additionneur 4 bits** en
**soustracteur** `a - b`. Les quatre « Additionneur complet » sont déjà en ligne
(comme sur le schéma), avec `a` et `b` au-dessus et `s` en dessous. Rappel :
`a - b = a + ¬b + 1`. Ajoutez donc une **porte NON** sur chaque `b`, reliez `a`
directement à son additionneur, et forcez la première retenue entrante (à droite,
celle de `a0`) à `1` avec une **entrée réglée sur `1`**. Chaînez ensuite les
retenues et reliez les sorties. Testez sur `6 - 3`, `4 - 7` et `5 - 5` : le
résultat est en complément à deux.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiU291c3RyYWN0ZXVyIDQgYml0cyBhdmVjIGRlcyBhZGRpdGlvbm5ldXJzIGNvbXBsZXRzIiwibyI6IlRyYW5zZm9ybWV6IGNldCBhZGRpdGlvbm5ldXIgNCBiaXRzIGVuIHNvdXN0cmFjdGV1ciBhIC0gYiAoYSAtIGIgPSBhICsgwqxiICsgMSkuIEludmVyc2V6IGNoYXF1ZSBiX2kgYXZlYyB1bmUgcG9ydGUgTk9OIGF2YW50IHNvbiBhZGRpdGlvbm5ldXIsIGV0IGZvcmNleiBsZSBwcmVtaWVyIENpbiAow6AgZHJvaXRlKSDDoCAxIGF2ZWMgdW5lIGVudHLDqWUgcsOpZ2zDqWUgc3VyIDEuIiwicyI6WyJBam91dGV6IHVuZSBwb3J0ZSBOT04gc3VyIGNoYXF1ZSBiX2kgKGVudHJlIGJfaSBldCBsJ2VudHLDqWUgQikuIiwiUmVsaWV6IGNoYXF1ZSBhX2kgw6AgQSBkaXJlY3RlbWVudC4iLCJQbGFjZXogdW5lIGVudHLDqWUgw6AgMSBldCByZWxpZXotbGEgYXUgQ2luIGRlIGwnYWRkaXRpb25uZXVyIGRlIGRyb2l0ZSAoYTApLiIsIkNoYcOubmV6IGxlcyByZXRlbnVlcyBldCByZWxpZXogbGVzIHNvcnRpZXMgUyDDoCBzX2ksIGxhIGRlcm5pw6hyZSByZXRlbnVlIMOgIGNvdXQuIiwiVGVzdGV6IGEgLSBiIHN1ciBxdWVscXVlcyB2YWxldXJzIDsgbGUgcsOpc3VsdGF0IGVzdCBlbiBjb21wbMOpbWVudCDDoCBkZXV4LiJdLCJhIjpbIkZVTExBRERFUiIsIk5PVCJdLCJpIjpbXSwidSI6W10sImsiOiJub25lIiwiciI6W10sImMiOnsidmVyc2lvbiI6MiwibmFtZSI6ImNpcmN1aXQiLCJjb21wb25lbnRzIjpbeyJpZCI6ImEwIiwidHlwZSI6IklOUFVUIiwieCI6NDYwLCJ5Ijo0MCwibGFiZWwiOiJhMCJ9LHsiaWQiOiJhMSIsInR5cGUiOiJJTlBVVCIsIngiOjM0MCwieSI6NDAsImxhYmVsIjoiYTEifSx7ImlkIjoiYTIiLCJ0eXBlIjoiSU5QVVQiLCJ4IjoyMDAsInkiOjQwLCJsYWJlbCI6ImEyIn0seyJpZCI6ImEzIiwidHlwZSI6IklOUFVUIiwieCI6NjAsInkiOjQwLCJsYWJlbCI6ImEzIn0seyJpZCI6ImIwIiwidHlwZSI6IklOUFVUIiwieCI6NDYwLCJ5IjoxMjAsImxhYmVsIjoiYjAifSx7ImlkIjoiYjEiLCJ0eXBlIjoiSU5QVVQiLCJ4IjozNDAsInkiOjEyMCwibGFiZWwiOiJiMSJ9LHsiaWQiOiJiMiIsInR5cGUiOiJJTlBVVCIsIngiOjIwMCwieSI6MTIwLCJsYWJlbCI6ImIyIn0seyJpZCI6ImIzIiwidHlwZSI6IklOUFVUIiwieCI6NjAsInkiOjEyMCwibGFiZWwiOiJiMyJ9LHsiaWQiOiJmYTAiLCJ0eXBlIjoiRlVMTEFEREVSIiwieCI6NDQwLCJ5IjoyMDAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9fSx7ImlkIjoiZmExIiwidHlwZSI6IkZVTExBRERFUiIsIngiOjMwMCwieSI6MjAwLCJzdGF0ZSI6eyJvcmllbnRhdGlvbiI6ImRvd24ifX0seyJpZCI6ImZhMiIsInR5cGUiOiJGVUxMQURERVIiLCJ4IjoxNjAsInkiOjIwMCwic3RhdGUiOnsib3JpZW50YXRpb24iOiJkb3duIn19LHsiaWQiOiJmYTMiLCJ0eXBlIjoiRlVMTEFEREVSIiwieCI6NDAsInkiOjIwMCwic3RhdGUiOnsib3JpZW50YXRpb24iOiJkb3duIn19LHsiaWQiOiJzMCIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0ODAsInkiOjM2MCwibGFiZWwiOiJzMCJ9LHsiaWQiOiJzMSIsInR5cGUiOiJPVVRQVVQiLCJ4IjozNDAsInkiOjM2MCwibGFiZWwiOiJzMSJ9LHsiaWQiOiJzMiIsInR5cGUiOiJPVVRQVVQiLCJ4IjoyMDAsInkiOjM2MCwibGFiZWwiOiJzMiJ9LHsiaWQiOiJzMyIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo4MCwieSI6MzYwLCJsYWJlbCI6InMzIn0seyJpZCI6ImNvdXQiLCJ0eXBlIjoiT1VUUFVUIiwieCI6MCwieSI6MzYwLCJsYWJlbCI6ImNvdXQifV0sIndpcmVzIjpbXSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 580px; aspect-ratio: auto; border: 1px solid black;
:title: Exercice Logix : un soustracteur 4 bits en chaînant quatre additionneurs complets
```
