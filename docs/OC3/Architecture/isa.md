<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Le jeu d'instructions

Nous avons toutes les pièces d'un processeur : des registres pour retenir, une
mémoire pour ranger, une ALU pour calculer, un bus pour tout relier. Il nous
manque une question : qu'est-ce qu'un *programme*, vu par le processeur ? La
réponse tient en une phrase : une suite de nombres rangés dans la mémoire.

Notre processeur travaillera avec **quatre registres** de travail, `r0`, `r1`,
`r2` et `r3` : ce sont ses cases de calcul, ultra-rapides, sur lesquelles portent
la plupart des instructions.

## Une instruction, c'est un nombre
Un processeur ne comprend ni le français ni Python : il ne sait manipuler que des
**nombres**. Un programme, pour lui, est une suite de nombres rangés dans des
cases consécutives de la mémoire. Chacun est une *instruction* : un ordre
élémentaire, du genre "mets la valeur 13 dans `r0`" ou "ajoute `r1` à `r0`".

Pour être lisible, une instruction est découpée en champs. Le premier, le *code
opération* (ou *opcode*), dit **quoi faire**. Les suivants désignent **sur quels
registres** agir. Comme il y a quatre registres, il faut `2` bits pour en nommer
un (`00` = `r0`, `01` = `r1`, `10` = `r2`, `11` = `r3`). Sur nos 8 bits, on réserve
donc les 4 bits de gauche à l'opcode, puis 2 bits pour le registre de destination
`Rd`, et 2 bits pour le second registre `Rs`.

```{figure} images/instruction_format.svg
:width: 80%
:alt: Une instruction de 8 bits découpée en trois champs : opcode 0010 (4 bits), Rd 00 (2 bits) et Rs 01 (2 bits), qui se décode en "ADD r0, r1 : r0 reçoit r0 + r1"
:align: center

Une instruction se lit en trois morceaux : l'opcode (l'action), puis les deux
registres concernés.
```

Par convention, le **premier registre est toujours la destination** : c'est lui
qui reçoit le résultat. Ainsi `ADD r0, r1` signifie "`r0` reçoit `r0 + r1`". C'est
la même règle que dans les vrais assembleurs (x86, ARM).

Dans Logix, un composant *SLICE* fait exactement ce découpage : il extrait
d'un mot un champ de bits choisi. Changez l'instruction ci-dessous et regardez ses
trois champs apparaître.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBkw6ljb2RlciB1bmUgaW5zdHJ1Y3Rpb24iLCJvIjoiQ2hhbmdleiBsYSB2YWxldXIgZGUgbCdpbnN0cnVjdGlvbiAoOCBiaXRzKSA6IGxlIGNvbXBvc2FudCBTTElDRSBlbiBleHRyYWl0IGxlcyB0cm9pcyBjaGFtcHMsIGwnb3Bjb2RlIChiaXRzIDcgw6AgNCksIFJkIChiaXRzIDMgZXQgMikgZXQgUnMgKGJpdHMgMSBldCAwKS4gRXNzYXlleiAwMDEwMDAwMSAoQUREIHIwLCByMSkgOiBvcGNvZGUgPSAwMDEwLCBSZCA9IDAwLCBScyA9IDAxLiIsInMiOltdLCJhIjpbXSwiaSI6W10sInUiOltdLCJrIjoibm9uZSIsInIiOltdLCJsIjoxLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJJIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjEyMCwic3RhdGUiOnsid2lkdGgiOjgsInZhbHVlIjozM30sImxhYmVsIjoiaW5zdHJ1Y3Rpb24ifSx7ImlkIjoib3AiLCJ0eXBlIjoiU0xJQ0UiLCJ4IjoyNjAsInkiOjQwLCJzdGF0ZSI6eyJ3aWR0aCI6OCwiaGkiOjcsImxvIjo0fX0seyJpZCI6InJkIiwidHlwZSI6IlNMSUNFIiwieCI6MjYwLCJ5IjoxMjAsInN0YXRlIjp7IndpZHRoIjo4LCJoaSI6MywibG8iOjJ9fSx7ImlkIjoicnMiLCJ0eXBlIjoiU0xJQ0UiLCJ4IjoyNjAsInkiOjIwMCwic3RhdGUiOnsid2lkdGgiOjgsImhpIjoxLCJsbyI6MH19LHsiaWQiOiJvbyIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0NDAsInkiOjYwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoib3Bjb2RlIn0seyJpZCI6Im9kIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQ0MCwieSI6MTQwLCJzdGF0ZSI6eyJ3aWR0aCI6Mn0sImxhYmVsIjoiUmQifSx7ImlkIjoib3MiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDQwLCJ5IjoyMjAsInN0YXRlIjp7IndpZHRoIjoyfSwibGFiZWwiOiJScyJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiSSIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJvcCIsInBvcnQiOiJpbiJ9fSx7ImlkIjoidzIiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiSSIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJyZCIsInBvcnQiOiJpbiJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiSSIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJycyIsInBvcnQiOiJpbiJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoib3AiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoib28iLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3NSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJyZCIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJvZCIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc2IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6InJzIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6Im9zIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 320px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un composant SLICE extrait l'opcode, Rd et Rs d'une instruction
```

## Un petit jeu d'instructions
La liste des instructions qu'un processeur sait exécuter s'appelle son *jeu
d'instructions*. Voici le nôtre :

| opcode | instruction | effet |
| :----: | :---------- | :---- |
| `0000` | `STOP` | arrête le processeur |
| `0001` | `LOAD Rd, valeur` | `Rd` reçoit la `valeur` (sur 2 octets, voir plus bas) |
| `0010` | `ADD Rd, Rs` | `Rd` reçoit `Rd + Rs` |
| `0011` | `SUB Rd, Rs` | `Rd` reçoit `Rd - Rs` |
| `0100` | `COPY Rd, Rs` | `Rd` reçoit une copie de `Rs` |
| `0101` | `OUT Rd` | affiche le contenu de `Rd` |

On retrouve nos composants : `ADD`, `SUB` font travailler l'ALU sur deux
registres, `COPY` recopie un registre dans un autre, et `LOAD` fait entrer une
valeur de l'extérieur.

```{important}
- Un registre se nomme sur `2` bits : `r0 = 00`, `r1 = 01`, `r2 = 10`, `r3 = 11`.
- Le **premier** registre d'une instruction est la **destination** (il reçoit le
  résultat). `ADD r0, r1` fait donc `r0 ← r0 + r1`.
```

Une subtilité pour `LOAD` : la valeur à charger (par exemple `13`) ne tient pas
dans les 4 bits qui restent. On l'écrit donc dans l'**octet suivant** : `LOAD`
occupe **deux octets**, l'instruction proprement dite, puis la valeur. C'est ainsi
que fonctionnent les vrais processeurs : certaines instructions sont plus longues
que d'autres.

## Le cycle d'exécution
Comment le processeur enchaîne-t-il les instructions ? Il répète sans fin un même
*cycle* en trois temps. Le *compteur ordinal* (`pc`) garde l'adresse de la
prochaine instruction.

```{figure} images/cycle.svg
:width: 70%
:alt: Le cycle en trois étapes : Chercher (lire l'instruction pointée par le compteur ordinal), Décoder (séparer opcode et registres), Exécuter (agir puis passer à la suivante), en boucle
:align: center

Le processeur répète sans fin le même cycle : chercher, décoder, exécuter.
```

1.  **Chercher** : lire dans la mémoire l'instruction à l'adresse indiquée par
    `pc`, et faire avancer `pc`.
2.  **Décoder** : séparer l'opcode et les registres ; l'opcode détermine l'action.
3.  **Exécuter** : réaliser l'action, en pilotant les composants concernés.

Pour une instruction `LOAD`, l'étape d'exécution va simplement lire **l'octet
suivant** (la valeur) et la ranger dans le registre, en faisant à nouveau avancer
`pc`.

## Un programme complet
Voici un programme rangé en mémoire à partir de l'adresse `0`. Il met `13` dans
`r0`, `2` dans `r1`, les additionne dans `r0`, puis affiche le résultat.

| adresse | contenu binaire | instruction |
| :-----: | :-------------: | :---------- |
| `0` | `0001 00 00` | `LOAD r0, …` |
| `1` | `0000 1101` | (valeur : `13`) |
| `2` | `0001 01 00` | `LOAD r1, …` |
| `3` | `0000 0010` | (valeur : `2`) |
| `4` | `0010 00 01` | `ADD r0, r1` |
| `5` | `0101 00 00` | `OUT r0` |
| `6` | `0000 0000` | `STOP` |

En suivant le cycle, `r0` prend la valeur `13`, `r1` prend `2`, puis `ADD r0, r1`
met `13 + 2 = 15` dans `r0`, qui est affiché avant l'arrêt. Le processeur ne fait
pourtant jamais rien de compliqué : il répète chercher, décoder, exécuter.

```{important}
- Un programme est une suite de **nombres** en mémoire ; chacun est une
  instruction faite d'un **opcode** et de **registres**.
- Le processeur répète sans fin le cycle **chercher, décoder, exécuter**, en
  suivant le **compteur ordinal**.
```

## Exercices

### Exercice {num1}`exercice`
Décodez chaque instruction : donnez son nom (menu déroulant) et le numéro des
registres visés (en décimal, de `0` à `3`). Servez-vous du tableau du jeu
d'instructions.

```{role} nom(quiz-select)
:right:
:options: |
: STOP
: LOAD
: ADD
: SUB
: COPY
: OUT
```

```{role} r(quiz-input)
:right: width: 3.5rem;
:check: json trim
```

```{quiz}
:style: max-width: 34rem;
1.  `0010 01 11` : {nom}`ADD` avec Rd = {r}`{"1": true}` et Rs = {r}`{"3": true}`
2.  `0100 00 10` : {nom}`COPY` avec Rd = {r}`{"0": true}` et Rs = {r}`{"2": true}`
3.  `0101 11 00` : {nom}`OUT` sur le registre {r}`{"3": true}`
4.  `0001 10 00` : {nom}`LOAD` sur le registre {r}`{"2": true}`
```

### Exercice {num1}`exercice`
On exécute ce programme. Au départ, tous les registres valent `0`.

| adresse | instruction |
| :-----: | :---------- |
| `0` | `LOAD r0, 5` |
| `2` | `LOAD r1, 3` |
| `4` | `COPY r2, r0` |
| `5` | `ADD r0, r1` |
| `6` | `OUT r0` |
| `7` | `STOP` |

Donnez le contenu des registres demandés à la fin, ainsi que la valeur affichée.

```{quiz}
:style: max-width: 26rem;
1.  `r0` après `ADD r0, r1` : {r}`{"8": true}`
2.  `r2` à la fin : {r}`{"5": true}`
3.  `r1` à la fin : {r}`{"3": true}`
4.  valeur affichée par `OUT r0` : {r}`{"8": true}`
```

````{solution}
- `LOAD r0, 5` : `r0 = 5`.
- `LOAD r1, 3` : `r1 = 3`.
- `COPY r2, r0` : `r2` reçoit une copie de `r0`, donc `r2 = 5` (et `r0` ne change
  pas).
- `ADD r0, r1` : `r0` reçoit `5 + 3 = 8`.
- `OUT r0` affiche donc `8`. À la fin : `r0 = 8`, `r1 = 3`, `r2 = 5`.
````

### Exercice {num1}`exercice`
Écrivez, avec le jeu d'instructions du cours, un programme qui met `10` dans `r0`
et `4` dans `r1`, **garde une copie** de `r0` dans `r2`, calcule `r0 - r1` dans
`r0`, puis affiche d'abord `r0` et ensuite `r2`.

````{solution}
```{code-block} text
LOAD r0, 10     r0 = 10
LOAD r1, 4      r1 = 4
COPY r2, r0     r2 = 10  (on garde l'ancienne valeur de r0)
SUB r0, r1      r0 = 10 - 4 = 6
OUT r0          affiche 6
OUT r2          affiche 10
STOP
```
La copie dans `r2` est indispensable : `SUB r0, r1` **écrase** `r0`, donc sans la
copie préalable on perdrait la valeur `10`.
````

### Exercice {num1}`exercice`
L'instruction `ADD r0, r1` range son résultat dans `r0`, en **écrasant** l'ancien
contenu de `r0`. Un élève veut calculer `r0 + r1` tout en gardant intactes les
valeurs de `r0` et de `r1`. Expliquez comment y arriver avec les instructions du
cours.

````{solution}
On recopie d'abord `r0` dans un registre libre, par exemple `COPY r2, r0`, puis on
fait l'addition dans cette copie : `ADD r2, r1`. À la fin, `r2` contient `r0 + r1`,
tandis que `r0` et `r1` sont inchangés. C'est le rôle typique de `COPY` : préserver
une valeur avant une opération qui écraserait un registre.
````
