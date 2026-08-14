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

On peut le mettre à l'épreuve. Cliquez sur `A` et `B` dans la démonstration
ci-dessous et vérifiez les quatre cas : la somme `S` vaut `1` seulement quand une
seule des deux entrées vaut `1`, et la retenue `C` ne s'allume que pour `1 + 1`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBkZW1pLWFkZGl0aW9ubmV1ciBlbiBtYXJjaGUiLCJvIjoiQ2xpcXVleiBBIGV0IEIgZXQgb2JzZXJ2ZXogbGEgc29tbWUgUyA9IEEg4oqVIEIgZXQgbGEgcmV0ZW51ZSBDID0gQSDiiKcgQi4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiQSIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo0MCwic3RhdGUiOnsidmFsdWUiOjF9LCJsYWJlbCI6IkEifSx7ImlkIjoiQiIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoxNDAsInN0YXRlIjp7InZhbHVlIjoxfSwibGFiZWwiOiJCIn0seyJpZCI6InhvcjEiLCJ0eXBlIjoiWE9SIiwieCI6MTgwLCJ5Ijo0MH0seyJpZCI6ImFuZDEiLCJ0eXBlIjoiQU5EIiwieCI6MTgwLCJ5IjoxNDB9LHsiaWQiOiJTIiwidHlwZSI6Ik9VVFBVVCIsIngiOjMyMCwieSI6NDAsImxhYmVsIjoiUyJ9LHsiaWQiOiJDIiwidHlwZSI6Ik9VVFBVVCIsIngiOjMyMCwieSI6MTQwLCJsYWJlbCI6IkMifV0sIndpcmVzIjpbeyJpZCI6IncxIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IkEiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoieG9yMSIsInBvcnQiOiJpbjAifX0seyJpZCI6IncyIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IkIiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoieG9yMSIsInBvcnQiOiJpbjEifX0seyJpZCI6InczIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6InhvcjEiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiUyIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc0IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IkEiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiYW5kMSIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc1IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IkIiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiYW5kMSIsInBvcnQiOiJpbjEifX0seyJpZCI6Inc2IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImFuZDEiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiQyIsInBvcnQiOiJpbjAifX1dLCJjdXN0b21EZWZpbml0aW9ucyI6e319fQ&embed=1
:style: height: 420px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un demi-additionneur en fonctionnement
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

## L'overflow
Un additionneur 4 bits ne dispose que de quatre sorties `s3…s0` : il ne peut donc
représenter que les nombres de `0` à `15`. Que se passe-t-il quand la somme
dépasse cette limite ?

Reprenons `1011` (11) `+ 0111` (7). La vraie somme vaut `18`, qui s'écrit `10010`
sur **cinq** bits. Mais le circuit n'a que quatre sorties : il ne garde que
`0010` (2), et le cinquième bit s'échappe dans la **retenue sortante** du dernier
additionneur (celui des bits de poids fort).

Cette retenue sortante finale est donc un signal précieux : lorsqu'elle vaut `1`,
c'est que la somme a débordé des quatre bits et que le résultat conservé est
faux. On appelle cela un *dépassement de capacité* (en anglais *overflow*).

```{important}
- Pour une addition de nombres positifs sur `n` bits, la **retenue sortante du
  dernier additionneur** vaut `1` exactement lorsqu'il y a dépassement de
  capacité : le résultat ne tient pas sur `n` bits.
- Dans un processeur, ce bit n'est pas jeté : il est conservé dans un indicateur
  spécial (un *drapeau*) pour que le programme puisse réagir.
```

Nous n'avons additionné ici que des nombres positifs. Avec les nombres négatifs,
codés en complément à deux au chapitre suivant, le dépassement se repère un peu
différemment.


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

### Exercice {num1}`exercice`
Construisez vous-même un **demi-additionneur** dans le simulateur ci-dessous :
deux entrées `A` et `B`, et deux sorties, la somme `S` et la retenue `C`. La
consigne est rappelée dans le bandeau de gauche, et le bouton bleu vérifie votre
circuit une fois qu'il est terminé.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQ29uc3RydWlyZSB1biBkZW1pLWFkZGl0aW9ubmV1ciIsIm8iOiJSw6lhbGlzZXogbGUgY2lyY3VpdCBkJ3VuIGRlbWktYWRkaXRpb25uZXVyIDogbGEgc29ydGllIFMgZXN0IGxhIHNvbW1lIChBIOKKlSBCKSBldCBsYSBzb3J0aWUgQyBlc3QgbGEgcmV0ZW51ZSAoQSDiiKcgQikuIiwicyI6W10sImEiOlsiSU5QVVQiLCJPVVRQVVQiLCJBTkQiLCJPUiIsIk5PVCIsIlhPUiJdLCJpIjpbWyJBIiwxXSxbIkIiLDFdXSwidSI6W1siUyIsMV0sWyJDIiwxXV0sImsiOiJ0dCIsInIiOltbWzAsMF0sWzAsMF1dLFtbMCwxXSxbMSwwXV0sW1sxLDBdLFsxLDBdXSxbWzEsMV0sWzAsMV1dXX0=&embed=1
:style: height: 440px; aspect-ratio: auto; border: 1px solid black;
:title: Simulateur Logix : construire un demi-additionneur (S = A ⊕ B, C = A ∧ B)
```

### Exercice {num1}`exercice`
À vous l'**additionneur complet** : trois entrées `A`, `B` et la retenue entrante
`Cin`, et deux sorties, la somme `S` et la retenue sortante `Cout`. Vous pouvez le
câbler directement, ou assembler deux demi-additionneurs et une porte OU comme
dans la théorie.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQ29uc3RydWlyZSB1biBhZGRpdGlvbm5ldXIgY29tcGxldCIsIm8iOiJSw6lhbGlzZXogdW4gYWRkaXRpb25uZXVyIGNvbXBsZXQgOiB0cm9pcyBlbnRyw6llcyBBLCBCIGV0IENpbiAocmV0ZW51ZSBlbnRyYW50ZSksIGRldXggc29ydGllcyBTIChzb21tZSkgZXQgQ291dCAocmV0ZW51ZSBzb3J0YW50ZSkuIiwicyI6W10sImEiOlsiSU5QVVQiLCJPVVRQVVQiLCJBTkQiLCJPUiIsIk5PVCIsIlhPUiJdLCJpIjpbWyJBIiwxXSxbIkIiLDFdLFsiQ2luIiwxXV0sInUiOltbIlMiLDFdLFsiQ291dCIsMV1dLCJrIjoidHQiLCJyIjpbW1swLDAsMF0sWzAsMF1dLFtbMCwwLDFdLFsxLDBdXSxbWzAsMSwwXSxbMSwwXV0sW1swLDEsMV0sWzAsMV1dLFtbMSwwLDBdLFsxLDBdXSxbWzEsMCwxXSxbMCwxXV0sW1sxLDEsMF0sWzAsMV1dLFtbMSwxLDFdLFsxLDFdXV19&embed=1
:style: height: 460px; aspect-ratio: auto; border: 1px solid black;
:title: Simulateur Logix : construire un additionneur complet (S et Cout)
```

### Exercice {num1}`exercice`
Dans le simulateur ci-dessous, câblez un **additionneur 4 bits**, disposé comme le
**schéma du cours** : les quatre « Additionneur complet » sont déjà en ligne (`a3`
à gauche, `a0` à droite), avec les entrées `a` et `b` en haut et les sommes `s` en
bas. À vous de relier chaque `a`/`b` à son additionneur, de **chaîner les
retenues** (le `Cout` de chacun vers le `Cin` de son voisin de gauche, le premier
`Cin` restant à `0`), puis de relier les sorties `s` et `cout`. Le bouton bleu
vérifie votre circuit sur plusieurs additions, dont des cas de dépassement.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQWRkaXRpb25uZXVyIDQgYml0cyA6IGNoYcOubmVyIGRlcyBhZGRpdGlvbm5ldXJzIGNvbXBsZXRzIiwibyI6IkPDomJsZXogdW4gYWRkaXRpb25uZXVyIDQgYml0cywgZGlzcG9zw6kgY29tbWUgbGUgc2Now6ltYSA6IHF1YXRyZSDCqyBBZGRpdGlvbm5ldXIgY29tcGxldCDCuyBlbiBsaWduZSAoYTMgw6AgZ2F1Y2hlLCBhMCDDoCBkcm9pdGUpLCBhIGV0IGIgYXUtZGVzc3VzLCBzIGVuIGRlc3NvdXMuIiwicyI6WyJSZWxpZXogY2hhcXVlIGFfaSBldCBiX2kgw6AgQSBldCBCIGRlIHNvbiBhZGRpdGlvbm5ldXIuIiwiQ2hhw65uZXogbGVzIHJldGVudWVzIDogQ291dCBkJ3VuIGFkZGl0aW9ubmV1ciB2ZXJzIGxlIENpbiBkZSBzb24gdm9pc2luIGRlIGdhdWNoZSA7IGxlIENpbiBkZSBkcm9pdGUgKGEwKSByZXN0ZSDDoCAwLiIsIlJlbGlleiBsZXMgc29ydGllcyBTIMOgIHNfaSBldCBsYSBkZXJuacOocmUgcmV0ZW51ZSDDoCBjb3V0LiIsIkNsaXF1ZXogVsOpcmlmaWVyLiJdLCJhIjpbIkZVTExBRERFUiJdLCJpIjpbWyJhMCIsMV0sWyJhMSIsMV0sWyJhMiIsMV0sWyJhMyIsMV0sWyJiMCIsMV0sWyJiMSIsMV0sWyJiMiIsMV0sWyJiMyIsMV1dLCJ1IjpbWyJzMCIsMV0sWyJzMSIsMV0sWyJzMiIsMV0sWyJzMyIsMV0sWyJjb3V0IiwxXV0sImsiOiJ0dCIsInIiOltbWzAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMF1dLFtbMSwwLDAsMCwxLDAsMCwwXSxbMCwxLDAsMCwwXV0sW1swLDEsMCwwLDEsMCwwLDBdLFsxLDEsMCwwLDBdXSxbWzEsMSwwLDAsMCwwLDEsMF0sWzEsMSwxLDAsMF1dLFtbMSwxLDEsMCwxLDAsMCwwXSxbMCwwLDAsMSwwXV0sW1sxLDEsMSwxLDEsMCwwLDBdLFswLDAsMCwwLDFdXSxbWzEsMSwwLDEsMSwxLDEsMF0sWzAsMSwwLDAsMV1dLFtbMSwwLDAsMSwxLDAsMCwxXSxbMCwxLDAsMCwxXV0sW1sxLDAsMSwwLDAsMSwwLDFdLFsxLDEsMSwxLDBdXSxbWzAsMCwwLDEsMCwwLDAsMV0sWzAsMCwwLDAsMV1dLFtbMSwxLDEsMSwxLDEsMSwxXSxbMCwxLDEsMSwxXV0sW1swLDEsMSwwLDEsMSwwLDBdLFsxLDAsMCwxLDBdXSxbWzAsMCwxLDEsMSwxLDAsMF0sWzEsMSwxLDEsMF1dLFtbMCwxLDAsMSwxLDAsMSwwXSxbMSwxLDEsMSwwXV0sW1swLDEsMSwxLDAsMSwwLDBdLFswLDAsMCwwLDFdXSxbWzEsMCwxLDEsMCwxLDAsMF0sWzEsMSwxLDEsMF1dXSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiYTAiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0NjAsInkiOjQwLCJzdGF0ZSI6eyJvcmllbnRhdGlvbiI6ImRvd24ifSwibGFiZWwiOiJhMCJ9LHsiaWQiOiJhMSIsInR5cGUiOiJJTlBVVCIsIngiOjM0MCwieSI6NDAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9LCJsYWJlbCI6ImExIn0seyJpZCI6ImEyIiwidHlwZSI6IklOUFVUIiwieCI6MjAwLCJ5Ijo0MCwic3RhdGUiOnsib3JpZW50YXRpb24iOiJkb3duIn0sImxhYmVsIjoiYTIifSx7ImlkIjoiYTMiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo2MCwieSI6NDAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9LCJsYWJlbCI6ImEzIn0seyJpZCI6ImIwIiwidHlwZSI6IklOUFVUIiwieCI6NDYwLCJ5IjoxMjAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9LCJsYWJlbCI6ImIwIn0seyJpZCI6ImIxIiwidHlwZSI6IklOUFVUIiwieCI6MzQwLCJ5IjoxMjAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9LCJsYWJlbCI6ImIxIn0seyJpZCI6ImIyIiwidHlwZSI6IklOUFVUIiwieCI6MjAwLCJ5IjoxMjAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9LCJsYWJlbCI6ImIyIn0seyJpZCI6ImIzIiwidHlwZSI6IklOUFVUIiwieCI6NjAsInkiOjEyMCwic3RhdGUiOnsib3JpZW50YXRpb24iOiJkb3duIn0sImxhYmVsIjoiYjMifSx7ImlkIjoiZmEwIiwidHlwZSI6IkZVTExBRERFUiIsIngiOjQ0MCwieSI6MjAwLCJzdGF0ZSI6eyJvcmllbnRhdGlvbiI6ImRvd24ifX0seyJpZCI6ImZhMSIsInR5cGUiOiJGVUxMQURERVIiLCJ4IjozMDAsInkiOjIwMCwic3RhdGUiOnsib3JpZW50YXRpb24iOiJkb3duIn19LHsiaWQiOiJmYTIiLCJ0eXBlIjoiRlVMTEFEREVSIiwieCI6MTYwLCJ5IjoyMDAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9fSx7ImlkIjoiZmEzIiwidHlwZSI6IkZVTExBRERFUiIsIngiOjQwLCJ5IjoyMDAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9fSx7ImlkIjoiczAiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDgwLCJ5IjozNjAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9LCJsYWJlbCI6InMwIn0seyJpZCI6InMxIiwidHlwZSI6Ik9VVFBVVCIsIngiOjM0MCwieSI6MzYwLCJzdGF0ZSI6eyJvcmllbnRhdGlvbiI6ImRvd24ifSwibGFiZWwiOiJzMSJ9LHsiaWQiOiJzMiIsInR5cGUiOiJPVVRQVVQiLCJ4IjoyMDAsInkiOjM2MCwic3RhdGUiOnsib3JpZW50YXRpb24iOiJkb3duIn0sImxhYmVsIjoiczIifSx7ImlkIjoiczMiLCJ0eXBlIjoiT1VUUFVUIiwieCI6ODAsInkiOjM2MCwic3RhdGUiOnsib3JpZW50YXRpb24iOiJkb3duIn0sImxhYmVsIjoiczMifSx7ImlkIjoiY291dCIsInR5cGUiOiJPVVRQVVQiLCJ4IjowLCJ5IjozNjAsInN0YXRlIjp7Im9yaWVudGF0aW9uIjoiZG93biJ9LCJsYWJlbCI6ImNvdXQifV0sIndpcmVzIjpbXSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 580px; aspect-ratio: auto; border: 1px solid black;
:title: Exercice Logix : un additionneur 4 bits en chaînant quatre additionneurs complets
```

Une fois le circuit validé, observez la **retenue sortante** `cout` sur l'addition
`1011 + 0111` (soit `11 + 7`) : les sorties `s3..s0` affichent `0010` (2) et
`cout` vaut `1`. Le vrai résultat, `18`, ne tient pas sur 4 bits : cette retenue
finale signale un **dépassement de capacité**.
