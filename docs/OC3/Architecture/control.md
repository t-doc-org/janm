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
:alt: Le processeur complet. En haut, le compteur de programme pc donne l'adresse à la RAM ; la RAM envoie la case lue au registre d'instruction RI, dont l'opcode part vers l'unité de commande, dont les champs Rd et Rs vont au banc de registres et dont les deux bits op vont directement à l'ALU. En bas, le multiplexeur d'écriture choisit entre la mémoire et le résultat de l'ALU ce qui entre dans le banc de registres ; le banc alimente l'ALU, et la lecture Rd alimente le registre de sortie, qui affiche sa valeur. Les signaux de commande sont indiqués en bleu
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
| registre d'instruction `RI` | retient l'instruction lue : opcode, `Rd` et `Rs` | `REG` + `SLICE` | nouveau |
| multiplexeur d'écriture | choisit ce qui entre dans le registre `Rd` | `MUX` | nouveau |
| registre de sortie | retient et affiche la lecture `Rd` quand l'instruction est `OUT` | `REG` | nouveau |
| unité de commande | produit tous les signaux en bleu | `COUNTER`, `DECODER` et portes | nouveau |

## Le compteur de programme
Le *compteur de programme* (`pc`, pour *program counter*, aussi appelé *compteur
ordinal*) est un **compteur** : un registre qui ajoute `1` à sa propre valeur à
chaque front montant, tant que son entrée `EN` vaut `1`. Il contient l'adresse de
la prochaine case à lire dans la mémoire, et sa sortie est reliée directement à
l'entrée `A` de la RAM. Dans notre processeur, c'est l'unité de
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

## Une instruction en deux étapes
Un registre ne capture une valeur **qu'au front montant**. Une instruction se
déroule donc en *étapes*, une par front montant. Pendant l'étape `T1`, par
exemple, le signal `LD RI` vaut `1` ; c'est au front montant qui **termine** `T1`
que `RI` capture, et on passe alors à `T2`. Dans les tableaux, `LD X` signifie
« le registre `X` capture la valeur présente à son entrée ».

**Chercher (`T1`).** La RAM présente en permanence la case dont l'adresse est dans
le `pc`. Au front montant qui termine `T1`, `RI` capture cette instruction **et**
le `pc` avance de `1`. Il n'y a pas de conflit : au front montant, tous les
registres capturent **en même temps** la valeur présente juste avant le front.
`RI` reçoit donc bien la case pointée par l'ancienne valeur du `pc`.

**Exécuter (`T2`).** La suite dépend de l'instruction, c'est-à-dire de son
opcode :

| instruction | signaux à `1` pendant `T2` |
| :---------- | :------------------------- |
| `LOAD Rd, valeur` | `src` = mémoire, `LD Rd`, incrémenter `pc` |
| `ADD`, `SUB`, `AND`, `OR` | `src` = ALU, `LD Rd` |
| `OUT Rd` | `LD sortie` |
| `STOP` | `EN` du compteur d'étapes à `0` |

`src` règle le multiplexeur d'écriture : `0` = mémoire, `1` = résultat de l'ALU.
Et l'opération de l'ALU ? Inutile de la commander : grâce au choix des opcodes,
les deux bits de droite de l'opcode **sont** le code `op` de l'ALU (`ADD` =
`0100`, donc `op = 00`). On les branche directement sur l'ALU.

`LOAD` demande un peu d'attention : sa valeur se trouve dans la case **suivante**
de la mémoire. Or, pendant `T2`, le `pc` pointe justement déjà sur cette case :
la RAM présente la valeur, et `Rd` la capture. Au même front, le `pc` avance
encore, pour passer par-dessus la valeur.

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
:alt: L'unité de commande reçoit l'opcode du registre d'instruction et les lignes d'étapes T1 et T2 issues d'un compteur d'étapes suivi d'un décodeur, et elle produit les signaux de commande (LD, incrémenter pc, src) envoyés aux registres, au compteur de programme et au multiplexeur d'écriture
:align: center

La logique de commande combine l'opcode et l'étape courante pour produire les
signaux de commande.
```

### Le compteur d'étapes
Pour connaître l'étape en cours, l'unité de commande utilise un *compteur
d'étapes* de 1 bit, suivi d'un *décodeur 1 vers 2* : sa sortie `0` vaut `1`
pendant `T1`, sa sortie `1` pendant `T2`. À chaque front montant, on passe à
l'autre étape : `T1`, `T2`, `T1`, `T2`... Chaque instruction dure donc toujours
**2 étapes**.

Faites avancer l'horloge ci-dessous et regardez la ligne allumée passer de `T1` à
`T2`, puis revenir à `T1`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciBkJ8OpdGFwZXMiLCJvIjoiRmFpdGVzIGF2YW5jZXIgbCdob3Jsb2dlIDogbGUgY29tcHRldXIgZCfDqXRhcGVzICgxIGJpdCkgY29tcHRlIDAsIDEsIDAsIDEuLi4sIGV0IGxlIGTDqWNvZGV1ciBhbGx1bWUgdW5lIHNldWxlIGxpZ25lIMOgIGxhIGZvaXMgOiBUMSwgcHVpcyBUMiwgcHVpcyBkZSBub3V2ZWF1IFQxLiBMYSByZW1pc2Ugw6AgMCAocmVsacOpZSDDoCBMRCkgcmFtw6huZSDDoCBsJ8OpdGFwZSBUMS4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiRU4iLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6NDAsInN0YXRlIjp7InZhbHVlIjoxfSwibGFiZWwiOiJlbiJ9LHsiaWQiOiJjbGsiLCJ0eXBlIjoiQ0xPQ0siLCJ4Ijo0MCwieSI6MTQwLCJsYWJlbCI6ImhvcmxvZ2UifSx7ImlkIjoiUlNUIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjI0MCwic3RhdGUiOnsidmFsdWUiOjB9LCJsYWJlbCI6InJlbWlzZSDDoCAwIn0seyJpZCI6ImNudCIsInR5cGUiOiJDT1VOVEVSIiwieCI6MjAwLCJ5IjoxMTAsInN0YXRlIjp7IndpZHRoIjoxfX0seyJpZCI6ImRlYyIsInR5cGUiOiJERUNPREVSIiwieCI6NDIwLCJ5IjoxMjAsInN0YXRlIjp7IndpZHRoIjoxfX0seyJpZCI6IlQxIiwidHlwZSI6Ik9VVFBVVCIsIngiOjYwMCwieSI6MTEwLCJsYWJlbCI6IlQxIn0seyJpZCI6IlQyIiwidHlwZSI6Ik9VVFBVVCIsIngiOjYwMCwieSI6MTkwLCJsYWJlbCI6IlQyIn1dLCJ3aXJlcyI6W3siaWQiOiJ3MSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJFTiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiRU4ifX0seyJpZCI6IncyIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNsayIsInBvcnQiOiJDTEsifSwidG8iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiQ0xLIn19LHsiaWQiOiJ3MyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJSU1QiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkxEIn19LHsiaWQiOiJ3NCIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiUSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJpbiJ9fSx7ImlkIjoidzUiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiZGVjIiwicG9ydCI6Im91dDAifSwidG8iOnsiY29tcG9uZW50SWQiOiJUMSIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc2IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJvdXQxIn0sInRvIjp7ImNvbXBvbmVudElkIjoiVDIiLCJwb3J0IjoiaW4wIn19XSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 340px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un compteur d'étapes de 1 bit dont le décodeur allume T1 et T2 l'une après l'autre
```

### Quand chaque signal vaut-il `1` ?
Pour reconnaître l'instruction, un second décodeur (4 vers 16) transforme
l'opcode en une ligne par instruction : `STOP` (sortie `0`), `LOAD` (`1`) et
`OUT` (`2`). Les quatre instructions de calcul (`0100` à `0111`) se reconnaissent
encore plus simplement : ce sont les seules dont l'opcode commence par `01`, donc
dont le bit `6` de `RI` vaut `1`. On appelle ce bit `calcul`.

Il suffit ensuite de relire le tableau des étapes **signal par signal**. Par
exemple, incrémenter `pc` vaut `1` à l'étape `T1`, et aussi à l'étape `T2` quand
l'instruction est `LOAD` : on l'écrit `T1 OU (LOAD ET T2)`. Voici tous les
signaux :

| signal | relié à | vaut `1` quand |
| :----- | :------ | :------------- |
| `LD RI` | `LD` du registre d'instruction | `T1` |
| incrémenter `pc` | `EN` du compteur de programme | `T1` OU (`LOAD` ET `T2`) |
| `LD Rd` | `LD` du banc de registres | (`calcul` OU `LOAD`) ET `T2` |
| `LD sortie` | `LD` du registre de sortie | `OUT` ET `T2` |
| `src` | sélection du multiplexeur d'écriture | `calcul` (aucune porte) |
| `op` | `op` de l'ALU | bits `5` et `4` de `RI` (aucune porte) |
| avancer les étapes | `EN` du compteur d'étapes | NON (`STOP` ET `T2`) |

Trois remarques :

- Pendant `T1`, `RI` contient encore l'instruction **précédente** (au départ,
  `0000 0000`, c'est-à-dire `STOP`). C'est pourquoi un signal qui dépend de
  l'instruction teste toujours aussi `T2`.
- `src` et `op` font exception : ils ne servent qu'au moment où `Rd` capture, ils
  peuvent donc dépendre de l'instruction seule. Pour `OUT`, l'ALU calcule
  n'importe quoi, mais personne ne capture son résultat.
- `STOP` met l'entrée `EN` du compteur d'étapes à `0` à l'étape `T2` : plus rien
  ne bouge, le processeur est figé.

```{important}
- Une instruction se déroule en deux étapes, une par front montant : chercher
  (`T1`), puis exécuter (`T2`).
- L'unité de commande combine l'**opcode** et l'**étape** courante pour produire
  chaque signal de commande : elle n'est faite que d'un compteur d'étapes, de
  décodeurs et de quelques portes `ET`, `OU` et `NON`.
```

## Exercices

### Exercice {num1}`exercice`
La mémoire contient le programme test du TP mémoire. Au départ, `pc = 0000`,
`RI = 0000 0000` et tous les registres valent `0000 0000`. Pour chacun des six
premiers fronts montants, donnez la valeur du `pc` après le front, puis l'autre
registre mis à jour et sa nouvelle valeur.

```{role} reg(quiz-select)
:right:
:options: |
: RI
: r0
: r1
```

```{role} v(quiz-input)
:right: width: 7rem;
:check: json trim
```

```{quiz}
:style: max-width: 40rem;
| front | étape | `pc` après | registre mis à jour | sa valeur |
| :---: | :---: | :--------: | :-----------------: | :-------: |
| 1 | `T1` | {v}`{"0001": true}` | {reg}`RI` | {v}`{"0001 0000": true, "00010000": true}` |
| 2 | `T2` | {v}`{"0010": true}` | {reg}`r0` | {v}`{"0000 1101": true, "00001101": true}` |
| 3 | `T1` | {v}`{"0011": true}` | {reg}`RI` | {v}`{"0001 0100": true, "00010100": true}` |
| 4 | `T2` | {v}`{"0100": true}` | {reg}`r1` | {v}`{"0000 0010": true, "00000010": true}` |
| 5 | `T1` | {v}`{"0101": true}` | {reg}`RI` | {v}`{"0100 0001": true, "01000001": true}` |
| 6 | `T2` | {v}`{"0101": true}` | {reg}`r0` | {v}`{"0000 1111": true, "00001111": true}` |
```

````{solution}
- Fronts 1 et 2 : `RI` capture `LOAD r0` (case `0000`) et le `pc` passe à
  `0001` ; puis `r0` capture la valeur de la case `0001`, `0000 1101`, et le `pc`
  passe à `0010`.
- Fronts 3 et 4 : même chose pour `LOAD r1` : `r1 = 0000 0010`, `pc = 0100`.
- Front 5 : `RI` capture `ADD r0, r1` (`0100 0001`), le `pc` passe à `0101`.
- Front 6 : `r0` capture `0000 1101 + 0000 0010 = 0000 1111`. Attention : le `pc`
  n'avance **pas**, puisque `ADD` n'occupe qu'une case. Il pointe déjà sur
  l'instruction suivante.
````

### Exercice {num1}`exercice`
Le processeur exécute l'instruction `SUB r1, r0`. Nous sommes à l'étape `T2`.
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
1.  `LD RI` : {b}`0`
2.  incrémenter `pc` : {b}`0`
3.  `LD Rd` : {b}`1`
4.  `LD sortie` : {b}`0`
5.  `src` : {b}`1`
6.  `op` : {deux}`01`
```

````{solution}
À l'étape `T2`, l'instruction `SUB` range `r1 - r0` dans `r1` : seul `LD Rd`
vaut `1` (et `Rd` désigne `r1`). Le multiplexeur d'écriture doit laisser passer le
résultat de l'ALU, donc `src = 1` (c'est le bit `calcul` de `0101`). Et `op` vaut
les deux bits de droite de l'opcode de `SUB` (`0101`) : `op = 01`, la
soustraction.
````

### Exercice {num1}`exercice`
Imaginons un autre jeu d'instructions, où `ADD` = `0010`, `SUB` = `0011` et
`OUT` = `0100`, et où `AND` et `OR` n'existent pas. Le décodeur d'opcode donne
alors les lignes `ADD` (sortie `2`) et `SUB` (sortie `3`).

1. Peut-on encore brancher directement deux bits de l'opcode sur l'entrée `op` de
   l'ALU ? Pourquoi ?
2. Donnez alors l'expression de chaque bit de `op`, et celle de `src`.
3. Quel avantage a notre jeu d'instructions ?

````{solution}
1. Non. Les deux bits de droite de `ADD` (`0010`) valent `10`, ce qui
   commanderait un ET au lieu d'une addition.
2. `op` (bit de droite) = `SUB` et `op` (bit de gauche) = `0` : il faut le
   décodeur d'opcode et un fusionneur. Et `src` = `ADD` OU `SUB` : une porte de
   plus.
3. En choisissant les opcodes `01xx` avec les deux derniers bits égaux au code de
   l'ALU, `op` et `src` ne demandent aucune porte, et les quatre opérations de
   l'ALU deviennent des instructions sans rien ajouter à l'unité de commande. Les
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
| `adresse` (RAM) | la sortie du compteur de programme `pc` |
| `Rd` et `Rs` | deux champs du registre d'instruction `RI` |
| `donnée` (registres) | la sortie du multiplexeur d'écriture |
| `LD` (registres) | le signal `LD Rd` |
| `op` (ALU) | les bits `5` et `4` de `RI` |
| `écrire` et `donnée mémoire` (RAM) | rien : supprimez-les. Une entrée non branchée vaut `0`, et le processeur ne fait que lire la mémoire |

Suivez le schéma du processeur, et nommez vos composants (`pc`, `RI`...) : un
circuit lisible est un circuit réparable. Tous les registres et compteurs se
branchent sur la **même** horloge que le banc de registres et la RAM.

1.  **Le compteur de programme.** Placez un compteur `pc` (4 bits) et reliez sa
    sortie à l'entrée `A` de la RAM, à la place de l'entrée manuelle `adresse`.
2.  **Le registre d'instruction.** Placez un registre `RI` (8 bits) dont l'entrée
    est reliée à la sortie `Q` de la RAM. Ajoutez cinq `SLICE` sur sa sortie : les
    bits 7 à 4 pour l'opcode, 3 et 2 pour `Rd`, 1 et 0 pour `Rs`, 5 et 4 pour
    `op`, et le bit 6 seul pour `calcul`. Reliez `Rd` et `Rs` au banc de
    registres, et `op` à l'entrée `op` de l'ALU, à la place des entrées manuelles.
3.  **Le multiplexeur d'écriture.** Placez un multiplexeur 8 bits dont la
    sélection est sur 1 bit. Entrée `0` : la sortie `Q` de la RAM ; entrée `1` :
    le résultat de l'ALU ; sélection : `calcul`. Reliez sa sortie à l'entrée de
    donnée des registres, à la place de l'entrée manuelle `donnée`.
4.  **Le registre de sortie.** Placez un registre de 8 bits dont l'entrée est la
    lecture `Rd` du banc. Logix affiche sa valeur : c'est l'écran du processeur.
5.  **Le compteur d'étapes.** Placez un compteur de 1 bit suivi d'un décodeur 1
    vers 2 : ses sorties `0` et `1` sont les étapes `T1` et `T2`. Pour le tester,
    reliez provisoirement son entrée `EN` à `1` et regardez alterner `T1` et `T2`.
6.  **L'unité de commande.** Placez un décodeur 4 vers 16 sur l'opcode pour
    obtenir les lignes `STOP`, `LOAD` et `OUT`. Puis construisez, avec des portes
    `ET`, `OU` et `NON`, chaque signal du tableau « Quand chaque signal vaut-il
    `1` ? », et reliez-le à sa place.

    Vérifiez : après 1 front montant, `pc = 0001` et `RI = 0001 0000` ; après 2,
    `r0 = 0000 1101` et `pc = 0010`.
7.  **Lancez le programme.** Ajoutez une entrée `reset` reliée à l'entrée `LD` des
    deux compteurs (laissez leur entrée `D` libre) : mettez-la à `1`, puis
    remettez-la à `0`. Les deux compteurs repartent de `0`. Faites ensuite avancer
    l'horloge à la main et vérifiez (en comptant les fronts montants depuis le
    reset) :

    - au 2e front montant, `r0` vaut `0000 1101` ;
    - au 4e, `r1` vaut `0000 0010` ;
    - au 6e, `r0` vaut `0000 1111` ;
    - au 8e, le registre de sortie montre `0000 1111` ;
    - ensuite, le processeur se fige sur `STOP`.
8.  **Enregistrez** votre processeur. Vous venez de construire un ordinateur.

````{solution}
Circuit corrigé : {download}`tp_processeur.json <solutions/tp_processeur.json>`. Dans Logix, ouvrez-le avec le bouton *Charger un JSON* (flèche vers le haut).
Mettez `reset` à `1` puis à `0`, puis cliquez sur l'horloge : le registre de
sortie montre `0000 1111` au 8e front montant.

Le chemin de données :

| composant | entrées | sortie vers |
| :-------- | :------ | :---------- |
| `pc` (compteur 4 bits) | `EN` ← incrémenter `pc`, `LD` ← `reset` | `A` de la RAM |
| `RI` (registre 8 bits) | `D` ← `Q` de la RAM, `LD` ← `T1` | 5 `SLICE` |
| mux d'écriture | `0` ← `Q` RAM, `1` ← ALU, sélection ← `calcul` | `D` des 4 registres |
| registre de sortie | `D` ← lecture `Rd`, `LD` ← `LD sortie` | (affiche sa valeur) |
| compteur d'étapes (1 bit) | `EN` ← avancer les étapes, `LD` ← `reset` | décodeur 1 vers 2 |

L'unité de commande (4 portes `ET`, 2 portes `OU`, 1 porte `NON`) :

| signal | portes |
| :----- | :----- |
| incrémenter `pc` | `T1` OU (`LOAD` ET `T2`) |
| `LD Rd` | (`calcul` OU `LOAD`) ET `T2` |
| `LD sortie` | `OUT` ET `T2` |
| avancer les étapes | NON (`STOP` ET `T2`) |

`LD RI` est relié directement à `T1`, `op` vient de la `SLICE` bits 5 et 4 de
`RI`, et `calcul` (la `SLICE` bit 6) commande directement le mux d'écriture.
````
