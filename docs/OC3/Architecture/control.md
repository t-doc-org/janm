<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# L'unité de commande

Aux TP précédents, vous avez construit l'ALU, le banc de registres et la mémoire,
qui contient déjà un petit programme. Mais c'est vous qui actionniez tout à la
main : vous choisissiez `Rd` et `Rs`, vous mettiez `LD` à `1`, vous changiez
l'adresse de la mémoire... Pour que le processeur exécute son programme **tout
seul**, il faut remplacer ces interrupteurs par des circuits. C'est le sujet de
cette page : quelques composants qui vont chercher les instructions dans la
mémoire, et l'*unité de commande*, qui envoie les bons signaux au bon moment.

## Les composants du processeur
Voici le processeur complet. Les composants déjà construits aux TP précédents
sont reliés à quelques nouveaux composants.

```{figure} images/cpu_schema.svg
:width: 100%
:alt: Le processeur complet. En haut, le compteur de programme pc alimente le registre d'adresse RA, qui donne l'adresse à la RAM ; la RAM envoie la case lue au registre d'instruction RI, dont l'opcode part vers l'unité de commande, dont les champs Rd et Rs vont au banc de registres et dont les deux bits op vont directement à l'ALU. En bas, le multiplexeur d'écriture choisit entre la mémoire, le résultat de l'ALU et le registre Rs ce qui entre dans le banc de registres ; le banc alimente l'ALU, et la lecture Rd alimente le registre de sortie relié à un afficheur. Les signaux de commande sont indiqués en bleu
:align: center

Le processeur complet. Les flèches noires transportent des données ; les petits
signaux en bleu sont envoyés par l'unité de commande.
```

| composant | rôle | dans Logix | origine |
| :-------- | :--- | :--------- | :------ |
| banc de registres (`r0` à `r3`) | retient les valeurs de travail | votre circuit | TP registres |
| ALU | calcule (addition, soustraction, ...) | votre composant `ALU` | TP ALU |
| RAM | contient le programme | `RAM` | TP mémoire |
| compteur de programme `pc` | contient l'adresse de la prochaine case à lire | `COUNTER` | nouveau |
| registre d'adresse `RA` | retient l'adresse envoyée à la RAM | `REG` | nouveau |
| registre d'instruction `RI` | retient l'instruction lue : opcode, `Rd` et `Rs` | `REG` + `SLICE` | nouveau |
| multiplexeur d'écriture | choisit ce qui entre dans le registre `Rd` | `MUX` | nouveau |
| registre de sortie | retient la lecture `Rd` quand l'instruction est `OUT` | `REG` | nouveau |
| unité de commande | produit tous les signaux en bleu | `COUNTER`, `DECODER` et portes | nouveau |

## Le compteur de programme
Le *compteur de programme* (`pc`, pour *program counter*, aussi appelé *compteur
ordinal*) est un **compteur** : un registre qui ajoute `1` à sa propre valeur à
chaque front montant, tant que son entrée `EN` vaut `1`. Il contient l'adresse de
la prochaine case à lire dans la mémoire. Dans notre processeur, c'est l'unité de
commande qui le fait avancer : son signal *incrémenter pc* est relié à l'entrée
`EN` du compteur.

Le compteur de Logix a aussi une entrée `LD` : tant qu'elle vaut `1`, le compteur
prend la valeur présente sur son entrée `D`. Si `D` n'est pas branchée, elle vaut
`0` : l'entrée `LD` sert alors de **remise à zéro**.

Faites avancer l'horloge ci-dessous : le compteur ajoute `1` à chaque front
montant tant que l'interrupteur `en` vaut `1`, et l'interrupteur `remise à 0`,
relié à `LD`, le ramène à `0`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciIsIm8iOiJGYWl0ZXMgYXZhbmNlciBsJ2hvcmxvZ2UgKGNsaXF1ZXogZGVzc3VzKSA6IGxlIGNvbXB0ZXVyIGFqb3V0ZSAxIMOgIGNoYXF1ZSB0b3AgdGFudCBxdWUgJ2VuJyB2YXV0IDEuIExhIHJlbWlzZSDDoCAwIGxlIHJhbcOobmUgw6AgMC4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiRU4iLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6NjAsInN0YXRlIjp7InZhbHVlIjoxfSwibGFiZWwiOiJlbiJ9LHsiaWQiOiJjbGsiLCJ0eXBlIjoiQ0xPQ0siLCJ4Ijo0MCwieSI6MTYwLCJsYWJlbCI6ImhvcmxvZ2UifSx7ImlkIjoiUlNUIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjI0MCwic3RhdGUiOnsidmFsdWUiOjB9LCJsYWJlbCI6InJlbWlzZSDDoCAwIn0seyJpZCI6ImNudCIsInR5cGUiOiJDT1VOVEVSIiwieCI6MjQwLCJ5IjoxMjB9LHsiaWQiOiJRIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQ0MCwieSI6MTYwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoiY29tcHRlIn1dLCJ3aXJlcyI6W3siaWQiOiJ3MSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJFTiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiRU4ifX0seyJpZCI6IncyIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNsayIsInBvcnQiOiJDTEsifSwidG8iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiQ0xLIn19LHsiaWQiOiJ3MyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJSU1QiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkxEIn19LHsiaWQiOiJ3NCIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiUSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlEiLCJwb3J0IjoiaW4wIn19XSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 360px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un compteur qui s'incrémente à chaque front montant d'horloge
```

## Une instruction en plusieurs étapes
Un registre ne capture une valeur **qu'au front montant**. Une instruction se
déroule donc en plusieurs *étapes*, une par front montant. Pendant l'étape `T1`,
par exemple, le signal `LD RA` vaut `1` ; c'est au front montant qui **termine**
`T1` que `RA` capture, et on passe alors à `T2`. L'ordre compte : la RAM lit la
case dont l'adresse est dans `RA`, il faut donc d'abord charger `RA` (`T1`) pour
que `RI` capture ensuite la bonne instruction (`T3`).

Dans les tableaux, `LD X` signifie « le registre `X` capture la valeur présente à
son entrée ».

**Chercher.** Les trois premières étapes sont les mêmes pour toutes les
instructions :

| étape | ce qui se passe | signal à `1` |
| :---: | :-------------- | :----------- |
| `T1` | `RA` capture la valeur du `pc` | `LD RA` |
| `T2` | le `pc` avance de `1` | incrémenter `pc` |
| `T3` | `RI` capture l'instruction lue dans la mémoire | `LD RI` |

**Exécuter.** La suite dépend de l'instruction, c'est-à-dire de son opcode :

| instruction | `T4` | `T5` | `T6` |
| :---------- | :--- | :--- | :--- |
| `LOAD Rd, valeur` | `LD RA` | incrémenter `pc` | `src` = mémoire, `LD Rd` |
| `ADD`, `SUB`, `AND`, `OR` | `src` = ALU, `LD Rd` | - | - |
| `COPY Rd, Rs` | `src` = `Rs`, `LD Rd` | - | - |
| `OUT Rd` | `LD sortie` | - | - |
| `STOP` | `EN` du compteur d'étapes à `0` | - | - |

`src` règle le multiplexeur d'écriture, dont les entrées sont numérotées comme
sur le schéma : `00` = mémoire, `01` = résultat de l'ALU, `10` = registre `Rs`.
Et l'opération de l'ALU ? Inutile de la commander : grâce au choix des opcodes,
les deux bits de droite de l'opcode **sont** le code `op` de l'ALU (`ADD` =
`0100`, donc `op = 00`). On les branche directement sur l'ALU.

`LOAD` est l'instruction la plus longue : sa valeur se trouve dans la case
**suivante** de la mémoire. Elle refait donc le même trajet que pour chercher
l'instruction (`T4` et `T5`), puis range la valeur lue dans `Rd` (`T6`). Les
autres instructions n'ont besoin que d'une étape.

Et l'étape « décoder » du cycle ? Elle ne prend pas d'étape à part : dès que `RI`
contient l'instruction, les `SLICE` et le décodeur d'opcode la découpent en
permanence.

## L'unité de commande
L'unité de commande reçoit l'opcode de l'instruction (depuis `RI`). Elle contient
un compteur d'étapes, qui lui indique l'étape en cours, et une *logique de
commande* faite de portes, qui en déduit à chaque instant la valeur de tous les
signaux.

```{figure} images/sequenceur_schema.svg
:width: 95%
:alt: L'unité de commande reçoit l'opcode du registre d'instruction et les lignes d'étapes T1 à T8 issues d'un compteur d'étapes suivi d'un décodeur, et elle produit les signaux de commande (LD, incrémenter pc, src) envoyés aux registres, au compteur de programme et au multiplexeur d'écriture
:align: center

La logique de commande combine l'opcode et l'étape courante pour produire les
signaux de commande.
```

### Le compteur d'étapes
Pour connaître l'étape en cours, l'unité de commande utilise un *compteur
d'étapes* (un compteur de 3 bits) suivi d'un *décodeur 3 vers 8* : une seule de
ses sorties vaut `1` à la fois (sortie `0` = `T1`, sortie `1` = `T2`, ..., sortie
`7` = `T8`). À chaque front montant, on passe à l'étape suivante, et après `T8` le
compteur revient tout seul à `T1`.

Chaque instruction dure donc toujours **8 étapes** : celles dont elle n'a pas
besoin (par exemple `T5` à `T8` pour `ADD`) ne font rien. C'est un peu plus lent,
mais beaucoup plus simple : inutile de détecter la fin de chaque instruction.

La démonstration ci-dessous montre le principe avec seulement 4 étapes (un
compteur de 2 bits) : faites avancer l'horloge et regardez la ligne allumée passer
de `T1` à `T4`, puis revenir à `T1`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciBkJ8OpdGFwZXMiLCJvIjoiRmFpdGVzIGF2YW5jZXIgbCdob3Jsb2dlIDogbGUgY29tcHRldXIgZCfDqXRhcGVzIGNvbXB0ZSAwLCAxLCAyLCAzLCBwdWlzIHJldmllbnQgw6AgMCwgZXQgbGUgZMOpY29kZXVyIGFsbHVtZSB1bmUgc2V1bGUgbGlnbmUgw6AgbGEgZm9pcyAoVDEsIHB1aXMgVDIsIHB1aXMgVDMsIHB1aXMgVDQsIHB1aXMgZGUgbm91dmVhdSBUMSkuIExhIHJlbWlzZSDDoCAwIHJlbGFuY2Ugw6AgbCfDqXRhcGUgVDEuIiwicyI6W10sImEiOltdLCJpIjpbXSwidSI6W10sImsiOiJub25lIiwiciI6W10sImwiOjEsImMiOnsidmVyc2lvbiI6MiwibmFtZSI6ImNpcmN1aXQiLCJjb21wb25lbnRzIjpbeyJpZCI6IkVOIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjQwLCJzdGF0ZSI6eyJ2YWx1ZSI6MX0sImxhYmVsIjoiZW4ifSx7ImlkIjoiY2xrIiwidHlwZSI6IkNMT0NLIiwieCI6NDAsInkiOjE0MCwibGFiZWwiOiJob3Jsb2dlIn0seyJpZCI6IlJTVCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoyNDAsInN0YXRlIjp7InZhbHVlIjowfSwibGFiZWwiOiJyZW1pc2Ugw6AgMCJ9LHsiaWQiOiJjbnQiLCJ0eXBlIjoiQ09VTlRFUiIsIngiOjIyMCwieSI6MTIwLCJzdGF0ZSI6eyJ3aWR0aCI6Mn19LHsiaWQiOiJkZWMiLCJ0eXBlIjoiREVDT0RFUiIsIngiOjM4MCwieSI6MTAwfSx7ImlkIjoiVDAiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NTYwLCJ5Ijo0MCwibGFiZWwiOiJUMSJ9LHsiaWQiOiJUMSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo1NjAsInkiOjEwMCwibGFiZWwiOiJUMiJ9LHsiaWQiOiJUMiIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo1NjAsInkiOjE2MCwibGFiZWwiOiJUMyJ9LHsiaWQiOiJUMyIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo1NjAsInkiOjIyMCwibGFiZWwiOiJUNCJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiRU4iLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkVOIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbGsiLCJwb3J0IjoiQ0xLIn0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkNMSyJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiUlNUIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImNudCIsInBvcnQiOiJMRCJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IlEifSwidG8iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0IjoiaW4ifX0seyJpZCI6Inc1IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJvdXQwIn0sInRvIjp7ImNvbXBvbmVudElkIjoiVDAiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3NiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0Ijoib3V0MSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlQxIiwicG9ydCI6ImluMCJ9fSx7ImlkIjoidzciLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiZGVjIiwicG9ydCI6Im91dDIifSwidG8iOnsiY29tcG9uZW50SWQiOiJUMiIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc4IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJvdXQzIn0sInRvIjp7ImNvbXBvbmVudElkIjoiVDMiLCJwb3J0IjoiaW4wIn19XSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 380px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un compteur d'étapes dont le décodeur allume T1, T2, T3, T4 l'une après l'autre
```

### Quand chaque signal vaut-il `1` ?
Pour reconnaître l'instruction, un second décodeur (4 vers 16) transforme
l'opcode en une ligne par instruction : `STOP` (sortie `0`), `LOAD` (`1`), `COPY`
(`2`) et `OUT` (`3`). Les quatre instructions de calcul (`0100` à `0111`) se
reconnaissent encore plus simplement : ce sont les seules dont l'opcode commence
par `01`, donc dont le bit `6` de `RI` vaut `1`. On appelle ce bit `calcul`.

Il suffit ensuite de relire les tableaux des étapes **signal par signal**. Par
exemple, `LD RA` vaut `1` à l'étape `T1`, et aussi à l'étape `T4` quand
l'instruction est `LOAD` : on l'écrit `T1 OU (LOAD ET T4)`. Voici tous les
signaux :

| signal | relié à | vaut `1` quand |
| :----- | :------ | :------------- |
| `LD RA` | `LD` du registre d'adresse | `T1` OU (`LOAD` ET `T4`) |
| incrémenter `pc` | `EN` du compteur de programme | `T2` OU (`LOAD` ET `T5`) |
| `LD RI` | `LD` du registre d'instruction | `T3` |
| `LD Rd` | `LD` du banc de registres | ((`calcul` OU `COPY`) ET `T4`) OU (`LOAD` ET `T6`) |
| `LD sortie` | `LD` du registre de sortie | `OUT` ET `T4` |
| `src` (bit de droite) | sélection du multiplexeur d'écriture | `calcul` |
| `src` (bit de gauche) | sélection du multiplexeur d'écriture | `COPY` |
| `op` | `op` de l'ALU | aucune porte : bits `5` et `4` de `RI` |
| avancer les étapes | `EN` du compteur d'étapes | NON (`STOP` ET `T4`) |

Trois remarques :

- Pendant `T1` à `T3`, `RI` contient encore l'instruction **précédente** (au
  départ, `0000 0000`, c'est-à-dire `STOP`). C'est pourquoi un signal qui dépend
  de l'instruction teste toujours aussi `T4`, `T5` ou `T6`.
- `src` et `op` font exception : ils ne servent qu'au moment où `Rd` capture, ils
  peuvent donc dépendre de l'instruction seule. Pour `LOAD`, `COPY` ou `OUT`,
  l'ALU calcule n'importe quoi, mais `src` ne choisit pas son résultat.
- `STOP` met l'entrée `EN` du compteur d'étapes à `0` à l'étape `T4` : plus rien
  ne bouge, le processeur est figé.

```{important}
- Une instruction se déroule en plusieurs étapes, une par front montant :
  chercher (`T1` à `T3`), puis exécuter (`T4` à `T6` au plus).
- L'unité de commande combine l'**opcode** et l'**étape** courante pour produire
  chaque signal de commande : elle n'est faite que d'un compteur d'étapes, de
  décodeurs et de portes `ET`, `OU` et `NON`.
```

## Exercices

### Exercice {num1}`exercice`
La mémoire contient le programme test du TP mémoire. Au départ, `pc = 0000`,
`RA = 0000`, `RI = 0000 0000` et `r0 = 0000 0000`. Le processeur exécute la
première instruction, `LOAD r0, …` (adresses `0000` et `0001`).

Pour chaque étape, indiquez le registre qui est mis à jour (il capture une valeur
ou il avance) et la valeur qu'il contient après l'étape.

```{role} reg(quiz-select)
:right:
:options: |
: pc
: RA
: RI
: r0
```

```{role} v(quiz-input)
:right: width: 7rem;
:check: json trim
```

```{quiz}
:style: max-width: 34rem;
| étape | registre mis à jour | valeur après l'étape |
| :---: | :-----------------: | :------------------: |
| `T1`  | {reg}`RA` | {v}`{"0000": true}` |
| `T2`  | {reg}`pc` | {v}`{"0001": true}` |
| `T3`  | {reg}`RI` | {v}`{"0001 0000": true, "00010000": true}` |
| `T4`  | {reg}`RA` | {v}`{"0001": true}` |
| `T5`  | {reg}`pc` | {v}`{"0010": true}` |
| `T6`  | {reg}`r0` | {v}`{"0000 1101": true, "00001101": true}` |
```

````{solution}
- `T1` : `RA` capture la valeur du `pc`, `0000` (sa valeur ne change pas, mais il
  capture bien).
- `T2` : le `pc` avance : `0001`.
- `T3` : la RAM présente la case `0000` (l'adresse contenue dans `RA`) ; `RI`
  capture `0001 0000`, c'est-à-dire `LOAD r0`.
- `T4` : l'instruction est `LOAD`, donc `RA` capture à nouveau le `pc` : `0001`.
- `T5` : le `pc` avance : `0010`. Il pointe déjà sur l'instruction suivante.
- `T6` : la RAM présente la case `0001`, qui contient la valeur `0000 1101` ;
  `r0` la capture.
````

### Exercice {num1}`exercice`
Le processeur exécute l'instruction `SUB r1, r0`. Nous sommes à l'étape `T4`.
Donnez la valeur de chaque signal de commande.

```{role} b(quiz-select)
:right:
:options: |
: 0
: 1
```

```{role} deux(quiz-select)
:right:
:options: |
: 00
: 01
: 10
: 11
```

```{quiz}
:style: max-width: 30rem;
1.  `LD RA` : {b}`0`
2.  incrémenter `pc` : {b}`0`
3.  `LD RI` : {b}`0`
4.  `LD Rd` : {b}`1`
5.  `LD sortie` : {b}`0`
6.  `src` : {deux}`01`
7.  `op` : {deux}`01`
```

````{solution}
À l'étape `T4`, l'instruction `SUB` range `r1 - r0` dans `r1` : seul `LD Rd`
vaut `1` (et `Rd` désigne `r1`). Le multiplexeur d'écriture doit laisser passer le
résultat de l'ALU, donc `src = 01`. Et `op` vaut les deux bits de droite de
l'opcode de `SUB` (`0101`) : `op = 01`, la soustraction.
````

### Exercice {num1}`exercice`
Imaginons un autre jeu d'instructions, où `ADD` = `0010`, `SUB` = `0011`,
`COPY` = `0100`, `OUT` = `0101`, et où `AND` et `OR` n'existent pas. Le décodeur
d'opcode donne alors les lignes `ADD` (sortie `2`) et `SUB` (sortie `3`).

1. Peut-on encore brancher directement deux bits de l'opcode sur l'entrée `op` de
   l'ALU ? Pourquoi ?
2. Donnez alors l'expression de chaque bit de `op`.
3. Quel avantage a notre jeu d'instructions ?

````{solution}
1. Non. Les deux bits de droite de `ADD` (`0010`) valent `10`, ce qui
   commanderait un ET au lieu d'une addition.
2. `op` (bit de droite) = `SUB` et `op` (bit de gauche) = `0` : il faut le
   décodeur d'opcode et un fusionneur.
3. En choisissant les opcodes `01xx` avec les deux derniers bits égaux au code de
   l'ALU, `op` ne demande aucune porte, et les quatre opérations de l'ALU
   deviennent des instructions sans rien ajouter à l'unité de commande. Les
   concepteurs de vrais processeurs choisissent leurs opcodes de la même façon,
   pour simplifier le décodage.
````

## TP : assembler le processeur
Ce TP part du précédent : ouvrez dans [Logix](https://maximejan.github.io/logix/)
le fichier du TP mémoire (ALU, banc de registres, et RAM qui contient déjà le
programme). Vous allez remplacer, une à une, les entrées manuelles des TP
précédents par les composants de cette page :

| entrée manuelle | remplacée par |
| :-------------- | :------------ |
| `adresse` (RAM) | la sortie du registre d'adresse `RA` |
| `Rd` et `Rs` | deux champs du registre d'instruction `RI` |
| `donnée` (registres) | la sortie du multiplexeur d'écriture |
| `LD` (registres) | le signal `LD Rd` |
| `op` (ALU) | les bits `5` et `4` de `RI` |
| `écrire` (RAM) | rien : laissez-la à `0`, le processeur ne fait que lire la mémoire |
| `donnée mémoire` (RAM) | rien : elle ne sert plus |

Suivez le schéma du processeur, et nommez vos composants (`pc`, `RA`, `RI`...) :
un circuit lisible est un circuit réparable. Tous les registres et compteurs se
branchent sur la **même** horloge que le banc de registres et la RAM.

1.  **Le compteur de programme et le registre d'adresse.** Placez un compteur `pc`
    (4 bits) et un registre `RA` (4 bits). Reliez la sortie du `pc` à l'entrée de
    `RA`, et la sortie de `RA` à l'entrée `A` de la RAM, à la place de l'entrée
    manuelle `adresse`.
2.  **Le registre d'instruction.** Placez un registre `RI` (8 bits) dont l'entrée
    est reliée à la sortie `Q` de la RAM. Ajoutez cinq `SLICE` sur sa sortie : les
    bits 7 à 4 pour l'opcode, 3 et 2 pour `Rd`, 1 et 0 pour `Rs`, 5 et 4 pour
    `op`, et le bit 6 seul pour `calcul`. Reliez `Rd` et `Rs` au banc de
    registres, et `op` à l'entrée `op` de l'ALU, à la place des entrées manuelles.
3.  **Le multiplexeur d'écriture.** Placez un multiplexeur 8 bits dont la
    sélection `src` est sur 2 bits. Entrée `0` : la sortie `Q` de la RAM ; entrée
    `1` : le résultat de l'ALU ; entrée `2` : la lecture `Rs` du banc. Reliez sa
    sortie à l'entrée de donnée des registres, à la place de l'entrée manuelle
    `donnée`.
4.  **Le registre de sortie.** Placez un registre de 8 bits dont l'entrée est la
    lecture `Rd` du banc, et un afficheur sur sa sortie.
5.  **Le compteur d'étapes.** Placez un compteur de 3 bits suivi d'un décodeur 3
    vers 8 : ses sorties `0` à `7` sont les étapes `T1` à `T8`. Pour le tester,
    reliez provisoirement son entrée `EN` à `1` et regardez défiler `T1` à `T8`.
6.  **L'unité de commande.** Placez un décodeur 4 vers 16 sur l'opcode pour
    obtenir les lignes `STOP`, `LOAD`, `COPY` et `OUT`. Puis construisez, avec des
    portes `ET`, `OU` et `NON`, chaque signal du tableau « Quand chaque signal
    vaut-il `1` ? », et reliez-le à sa place. Pour `src`, réunissez les deux bits
    avec un fusionneur 2 bits (bit de droite = bit `0`).

    Commencez par `LD RA`, incrémenter `pc` et `LD RI`, puis vérifiez : après 3
    fronts montants, `RA = 0000`, `pc = 0001` et `RI = 0001 0000`.
7.  **Lancez le programme.** Ajoutez une entrée `reset` reliée à l'entrée `LD` des
    deux compteurs (laissez leur entrée `D` libre) : mettez-la à `1`, puis
    remettez-la à `0`. Les deux compteurs repartent de `0`. Faites ensuite avancer
    l'horloge à la main et vérifiez (en comptant les fronts montants depuis le
    reset) :

    - au 6e front montant, `r0` vaut `0000 1101` ;
    - au 14e, `r1` vaut `0000 0010` ;
    - au 20e, `r0` vaut `0000 1111` ;
    - au 28e, l'afficheur montre `0000 1111` ;
    - ensuite, le processeur se fige sur `STOP`.
8.  **Enregistrez** votre processeur. Vous venez de construire un ordinateur.

````{solution}
Circuit corrigé : {download}`tp_processeur.json <solutions/tp_processeur.json>`. Dans Logix, ouvrez-le avec le bouton *Charger un JSON* (flèche vers le haut).
Mettez `reset` à `1` puis à `0`, puis cliquez sur l'horloge : l'afficheur montre
`0000 1111` au 28e front montant.

Le chemin de données :

| composant | entrées | sortie vers |
| :-------- | :------ | :---------- |
| `pc` (compteur 4 bits) | `EN` ← incrémenter `pc`, `LD` ← `reset` | `D` de `RA` |
| `RA` (registre 4 bits) | `LD` ← `LD RA` | `A` de la RAM |
| `RI` (registre 8 bits) | `D` ← `Q` de la RAM, `LD` ← `T3` | 5 `SLICE` |
| mux d'écriture | `0` ← `Q` RAM, `1` ← ALU, `2` ← lecture `Rs`, sélection ← `src` | `D` des 4 registres |
| registre de sortie | `D` ← lecture `Rd`, `LD` ← `LD sortie` | afficheur |
| compteur d'étapes (3 bits) | `EN` ← avancer les étapes, `LD` ← `reset` | décodeur 3 vers 8 |

L'unité de commande (6 portes `ET`, 4 portes `OU`, 1 porte `NON`) :

| signal | portes |
| :----- | :----- |
| `LD RA` | `T1` OU (`LOAD` ET `T4`) |
| incrémenter `pc` | `T2` OU (`LOAD` ET `T5`) |
| `LD Rd` | ((`calcul` OU `COPY`) ET `T4`) OU (`LOAD` ET `T6`) |
| `LD sortie` | `OUT` ET `T4` |
| avancer les étapes | NON (`STOP` ET `T4`) |
| `src` | fusionneur 2 bits : bit `0` ← `calcul`, bit `1` ← `COPY` |

`op` vient directement de la `SLICE` bits 5 et 4 de `RI`, et `calcul` de la
`SLICE` bit 6.
````
