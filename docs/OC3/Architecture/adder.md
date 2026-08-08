<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Additionneurs

## Addition binaire
En 1ère année, vous avez appris la représentation des entiers en base 2 ainsi que
leur addition. Pour retrouver la valeur décimale d'un nombre binaire, on multiplie
chaque chiffre par la puissance de 2 qui correspond à sa position, comme dans
l'exemple ci-dessous :

$$101100_2 = 0 \cdot 2^0 + 0 \cdot 2^1 + 1 \cdot 2^2 + 1 \cdot 2^3 + 0 \cdot 2^4 + 1 \cdot 2^5 = 4 + 8 + 32 = 44_{10}$$

Vous avez aussi appris à additionner deux nombres binaires, chiffre par chiffre,
en suivant ces règles :

- $0_2 + 0_2 = 0_2$
- $0_2 + 1_2 = 1_2$ et $1_2 + 0_2 = 1_2$
- $1_2 + 1_2 = 10_2$ 
- $1_2 + 1_2 + 1_2 = 11_2$ 

Pour des nombres à plusieurs bits, le chiffre des *deuzaines* se reporte sur la colonne de gauche, exactement comme pour une addition en colonne comme vous l'avez appris en primaire. Par exemple, `0110` (6) plus `0011` (3) :

```{code-block} text
retenues   1 1
           0 1 1 0    (6)
         + 0 0 1 1    (3)
           -------
           1 0 0 1    (9)
```



## Circuit d'addition de 2 bits
Si l'on considère `a` et `b` comme étant des bits à additionner, alors on peut produire la table de vérité suivante, où `C` est la retenue (carry en anglais) produite par l'addition, et `S` le chiffre des unités.


| `a` | `b` | `a + b` en binaire | somme `S` | retenue `C` |
| :-: | :-: | :----------------: | :-------: | :---------: |
| `0` | `0` | `0`                | `0`       | `0`         |
| `0` | `1` | `1`                | `1`       | `0`         |
| `1` | `0` | `1`                | `1`       | `0`         |
| `1` | `1` | `10`               | `0`       | `1`         |

Ces deux valeurs peuvent être calculées à partir de `a` et `b` avec des opérateurs que nous connaissons déjà bien :

- la somme `S` vaut `1` quand `a` et `b` sont **différents** : c'est le **OU
  exclusif**, `S = a ⊕ b` ;
- la retenue `C` ne vaut `1` que lorsque `a` **et** `b` valent `1` : c'est le
  **ET**, `C = a ∧ b`.

Le petit circuit qui réalise ces deux sorties porte un nom : le
*demi-additionneur*.

### Le demi-additionneur
Ce circuit (*half adder* en anglais) se résume à une porte XOR pour la somme `S`
et une porte ET pour la retenue `C`, branchées sur les mêmes entrées `a` et `b`.

```{figure} images/demi_additionneur.svg
:width: 75%
:alt: Schéma du demi-additionneur
:align: center
```



## Circuit d'addition de 3 bits
Le demi-additionneur a un défaut : il additionne bien deux bits, mais il ne sait
pas tenir compte de la **retenue qui arrive** de la colonne précédente. Or, dès
la deuxième colonne d'une addition, il faut additionner **trois** bits : `a`,
`b` et la retenue entrante `Cin`.

Le circuit qui additionne ces trois bits s'appelle un *additionneur complet*
(*full adder*). Sa table de vérité compte donc huit lignes :

| `a` | `b` | `Cin` | `S` | `Cout` |
| :-: | :-: | :---: | :-: | :----: |
| `0` | `0` | `0`   | `0` | `0`    |
| `0` | `0` | `1`   | `1` | `0`    |
| `0` | `1` | `0`   | `1` | `0`    |
| `0` | `1` | `1`   | `0` | `1`    |
| `1` | `0` | `0`   | `1` | `0`    |
| `1` | `0` | `1`   | `0` | `1`    |
| `1` | `1` | `0`   | `0` | `1`    |
| `1` | `1` | `1`   | `1` | `1`    |



- **La somme `S`.** Elle vaut `1` sur quatre lignes, d'où la forme développée :

  `S = (¬a ∧ ¬b ∧ Cin) ∨ (¬a ∧ b ∧ ¬Cin) ∨ (a ∧ ¬b ∧ ¬Cin) ∨ (a ∧ b ∧ Cin)`

  Cette expression peut être réduite à

  `S = a ⊕ b ⊕ Cin`

- **La retenue `Cout`.** Elle aussi vaut `1` sur quatre lignes :

  `Cout = (¬a ∧ b ∧ Cin) ∨ (a ∧ ¬b ∧ Cin) ∨ (a ∧ b ∧ ¬Cin) ∨ (a ∧ b ∧ Cin)`

  Cette expression peut être réduite (voir exercices) à :

  `Cout = (a ∧ b) ∨ (a ∧ Cin) ∨ (b ∧ Cin)`



### L'additionneur complet

Il suffit maintenant de câbler ces deux expressions pour obtenir un circuit additionnant 3 bits :

```{figure} images/additionneur_complet.svg
:width: 100%
:alt: Schéma de l'additionneur complet
:align: center
```


## Chainer les additionneurs
Lorsque l'on veut additionner 2 mots binaires d'une taille arbitraire, un seul additionneur complet ne peut pas suffire. Pour cela, on en met **plusieurs à la suite** : la retenue
sortante de chaque additionneur devient la retenue entrante de son voisin de
gauche. La toute première retenue entrante vaut `0`.

Soient `a` et `b` deux mots binaires de 4 bits, dont le bit de poids faible est `a0`/`b0`, celui à sa gauche `a1`/`b1`, puis `a2`/`b2` et finalement, le bit de poids fort, `a3`/`b3`. 

```{figure} images/additionneur_4bits.svg
:width: 100%
:alt: Quatre additionneurs complets chaînés
:align: center

Un additionneur 4 bits : la retenue se propage de droite à gauche.
```

Le résultat `s` composé de `s3`...`s0` est la somme de `a` et `b`. C'est exactement ce type de circuit, en plus large (32 ou 64 bits), qui se
trouve au cœur de l'unité de calcul d'un processeur.


## Exercices

### Exercice {num1}`exercice`
Posez et effectuez les additions binaires suivantes, colonne par colonne, en
notant les retenues. Vérifiez votre résultat en repassant en base 10.

1.  `0101 + 0011`
2.  `0111 + 0110`
3.  `1011 + 0111`

````{solution}
1.  `0101` (5) `+ 0011` (3) `= 1000` (8).
2.  `0111` (7) `+ 0110` (6) `= 1101` (13).
3.  `1011` (11) `+ 0111` (7) `= 10010` (18). Attention : le résultat déborde sur
    **5** bits, la dernière retenue sortante devient le bit de poids fort.
````

### Exercice {num1}`exercice`
Complétez la table de vérité du demi-additionneur en choisissant la valeur de la
somme `S` et de la retenue `C` pour chaque ligne.

```{role} bit(quiz-select)
:options: |
: 0
: 1
```

```{quiz}
:style: max-width: 24rem;
| `a` | `b` | `S` | `C` |
| :-: | :-: | :-: | :-: |
| `0` | `0` | {bit}`0` | {bit}`0` |
| `0` | `1` | {bit}`1` | {bit}`0` |
| `1` | `0` | {bit}`1` | {bit}`0` |
| `1` | `1` | {bit}`0` | {bit}`1` |
```

### Exercice {num1}`exercice`
On veut retrouver, à partir de la table de vérité de l'additionneur complet,
l'expression simplifiée de la retenue sortante `Cout`. Construisez le tableau de
Karnaugh de `Cout` (lignes `a`, colonnes `b` et `Cin`) et donnez son expression.

| `a` | `b` | `Cin` | `Cout` |
| :-: | :-: | :---: | :----: |
| `0` | `0` | `0`   | `0`    |
| `0` | `0` | `1`   | `0`    |
| `0` | `1` | `0`   | `0`    |
| `0` | `1` | `1`   | `1`    |
| `1` | `0` | `0`   | `0`    |
| `1` | `0` | `1`   | `1`    |
| `1` | `1` | `0`   | `1`    |
| `1` | `1` | `1`   | `1`    |

````{solution}
|         | `b·Cin = 00` | `b·Cin = 01` | `b·Cin = 11` | `b·Cin = 10` |
| :-----: | :----------: | :----------: | :----------: | :----------: |
| `a = 0` | `0`          | `0`          | `1`          | `0`          |
| `a = 1` | `0`          | `1`          | `1`          | `1`          |

Trois groupes de deux cases, qui se chevauchent :

- les cases `b·Cin = 11` : `a` change, mais `b` et `Cin` valent toujours `1`,
  d'où `b ∧ Cin` ;
- les cases `a = 1`, `b·Cin = 01` et `11` : `b` change, mais `a` et `Cin` valent
  toujours `1`, d'où `a ∧ Cin` ;
- les cases `a = 1`, `b·Cin = 11` et `10` : `Cin` change, mais `a` et `b` valent
  toujours `1`, d'où `a ∧ b`.

`Cout = (a ∧ b) ∨ (a ∧ Cin) ∨ (b ∧ Cin)`

On retrouve bien l'idée intuitive : il y a une retenue dès qu'au moins deux des
trois bits valent `1`.
````