<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# L'unité de commande

Nous avons tous les organes d'un processeur, et nous savons ce qu'est un
programme : une suite d'instructions que la machine doit chercher, décoder et
exécuter, encore et encore. Il manque pourtant le chef d'orchestre : **qui** dit
à chaque composant quoi faire, et surtout **quand** ? C'est le rôle de
l'*unité de commande* (aussi appelée *séquenceur*).

## Faire agir un composant, c'est lui envoyer un signal
Reprenons nos composants. Chacun possède, en plus de ses entrées de données, des
entrées de **commande** qui décident de son comportement :

- un registre a son entrée `charger` (capturer la valeur du bus) et son signal
  "activer la sortie" (poser sa valeur sur le bus) ;
- la mémoire a son entrée `écrire` ;
- le program counter peut s'incrémenter ou être chargé ;
- l'ALU reçoit son code opération.

Faire faire quelque chose au processeur, ce n'est donc rien d'autre que **mettre
les bons signaux de commande à `1`, au bon moment**. Une combinaison précise de
signaux, à un instant donné, réalise une petite action : en général, un composant
pose une valeur sur le bus et un autre la capture. Tout le travail du processeur
se ramène à une longue suite de ces petits transferts.

## Une instruction, plusieurs micro-étapes
Une instruction ne se fait pas en un seul front montant. On la découpe en une
poignée de *micro-étapes*, chacune réalisant **un seul** transfert sur le bus, en
un front montant. C'est obligatoire : le bus ne peut transporter qu'**une** valeur à la
fois (rappelez-vous la règle du bus), donc on ne peut déplacer qu'une donnée par
front montant.

L'étape "Chercher" du cycle est toujours la même, quelle que soit l'instruction.
Elle utilise deux registres d'aide : un *registre d'adresse* qui fournit son
adresse à la mémoire, et un *registre d'instruction* qui retient l'instruction
lue (pour que le program counter puisse avancer sans l'effacer).

| étape | ce qui se passe | signaux à `1` |
| :---: | :-------------- | :------------ |
| 1 | le program counter pose son adresse sur le bus, le registre d'adresse la charge | activer `pc`, charger `RA` |
| 2 | le program counter s'incrémente | incrémenter `pc` |
| 3 | la mémoire pose l'instruction lue sur le bus, le registre d'instruction la charge | activer la mémoire, charger `RI` |

Une fois l'instruction dans le registre d'instruction, son **opcode** est connu,
et les micro-étapes suivantes dépendent de lui. Prenons `LOAD r0, valeur`, qui doit
aller chercher sa valeur dans l'octet suivant :

| étape | ce qui se passe | signaux à `1` |
| :---: | :-------------- | :------------ |
| 4 | le program counter pose l'adresse de la valeur sur le bus, le registre d'adresse la charge | activer `pc`, charger `RA` |
| 5 | le program counter s'incrémente | incrémenter `pc` |
| 6 | la mémoire pose la valeur sur le bus, le registre `r0` la charge | activer la mémoire, charger `r0` |

L'instruction est terminée : on repart à l'étape 1 pour la suivante. On voit que
**exécuter une instruction, c'est dérouler une petite chorégraphie de signaux**,
fixée d'avance pour chaque opcode.

## Le compteur d'étapes
Pour savoir dans quelle micro-étape on se trouve, le processeur utilise un petit
*compteur d'étapes* : il compte `1`, `2`, `3`, `4`... et il est remis à zéro au
début de chaque nouvelle instruction. Un *décodeur* transforme sa valeur en une
seule ligne active à la fois : la ligne `T1` pendant l'étape 1, `T2` pendant
l'étape 2, et ainsi de suite. À chaque front montant, on avance d'une étape.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciBkJ8OpdGFwZXMiLCJvIjoiRmFpdGVzIGF2YW5jZXIgbCdob3Jsb2dlIDogbGUgY29tcHRldXIgZCfDqXRhcGVzIGNvbXB0ZSAwLCAxLCAyLCAzLCAwLCAuLi4gZXQgbGUgZMOpY29kZXVyIGFsbHVtZSB1bmUgc2V1bGUgbGlnbmUgw6AgbGEgZm9pcyAoVDAsIHB1aXMgVDEsIHB1aXMgVDIsIHB1aXMgVDMpLiBDJ2VzdCBjZSBxdWkgaW5kaXF1ZSBhdSBzw6lxdWVuY2V1ciBkYW5zIHF1ZWxsZSBtaWNyby3DqXRhcGUgb24gc2UgdHJvdXZlLiBMYSByZW1pc2Ugw6AgesOpcm8gcmVsYW5jZSDDoCBsJ8OpdGFwZSAwLiIsInMiOltdLCJhIjpbXSwiaSI6W10sInUiOltdLCJrIjoibm9uZSIsInIiOltdLCJsIjoxLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJFTiIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo0MCwic3RhdGUiOnsidmFsdWUiOjF9LCJsYWJlbCI6ImFjdGl2ZXIifSx7ImlkIjoiY2xrIiwidHlwZSI6IkNMT0NLIiwieCI6NDAsInkiOjE0MCwibGFiZWwiOiJob3Jsb2dlIn0seyJpZCI6IlJTVCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoyNDAsInN0YXRlIjp7InZhbHVlIjowfSwibGFiZWwiOiJyZW1pc2Ugw6AgMCJ9LHsiaWQiOiJjbnQiLCJ0eXBlIjoiQ09VTlRFUiIsIngiOjIyMCwieSI6MTIwLCJzdGF0ZSI6eyJ3aWR0aCI6Mn19LHsiaWQiOiJkZWMiLCJ0eXBlIjoiREVDT0RFUiIsIngiOjM4MCwieSI6MTAwfSx7ImlkIjoiVDAiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NTYwLCJ5Ijo0MCwibGFiZWwiOiJUMCJ9LHsiaWQiOiJUMSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo1NjAsInkiOjEwMCwibGFiZWwiOiJUMSJ9LHsiaWQiOiJUMiIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo1NjAsInkiOjE2MCwibGFiZWwiOiJUMiJ9LHsiaWQiOiJUMyIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo1NjAsInkiOjIyMCwibGFiZWwiOiJUMyJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiRU4iLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkVOIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbGsiLCJwb3J0IjoiQ0xLIn0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkNMSyJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiUlNUIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImNudCIsInBvcnQiOiJSU1QifX0seyJpZCI6Inc0IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNudCIsInBvcnQiOiJRIn0sInRvIjp7ImNvbXBvbmVudElkIjoiZGVjIiwicG9ydCI6ImluIn19LHsiaWQiOiJ3NSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0Ijoib3V0MCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlQwIiwicG9ydCI6ImluMCJ9fSx7ImlkIjoidzYiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiZGVjIiwicG9ydCI6Im91dDEifSwidG8iOnsiY29tcG9uZW50SWQiOiJUMSIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc3IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJvdXQyIn0sInRvIjp7ImNvbXBvbmVudElkIjoiVDIiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3OCIsImZyb20iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0Ijoib3V0MyJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlQzIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 380px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un compteur d'étapes dont le décodeur allume T0, T1, T2, T3 l'une après l'autre
```

## L'unité de commande : une grande table de décisions
L'unité de commande est le circuit qui décide, à chaque instant, quels signaux de
commande valent `1`. Ses entrées sont **l'opcode** de l'instruction en cours (lu
dans le registre d'instruction) et **l'étape** en cours (`T1`, `T2`, ...) ; ses
sorties sont **tous** les signaux de commande du processeur.

```{figure} images/sequenceur_schema.svg
:width: 95%
:alt: L'unité de commande reçoit l'opcode du registre d'instruction et les lignes d'étapes T1..T4 issues d'un compteur d'étapes suivi d'un décodeur, et elle produit les signaux de commande (charger, activer, écrire, code op.) envoyés aux registres, à la mémoire et à l'ALU
:align: center

L'unité de commande combine l'opcode et l'étape courante pour produire les signaux de
commande envoyés à tous les composants.
```

Au fond, l'unité de commande n'est qu'une grande **table** : pour chaque couple
(opcode, étape), elle indique quels signaux mettre à `1`. Et une table qui
transforme des entrées en sorties, nous savons la réaliser : avec des décodeurs
(pour reconnaître l'opcode et l'étape) et des portes `ET`/`OU` (pour activer
chaque signal dans les bonnes cases). L'unité de commande ne contient donc, elle
aussi, que des circuits déjà connus.

On peut la voir comme un **chef d'orchestre** qui lit une partition : à chaque
temps (l'étape), et selon le morceau joué (l'opcode), il fait signe aux bons
instruments (les signaux) d'entrer en jeu. La musique, ce sont les transferts qui
s'enchaînent sur le bus.

```{important}
- Commander le processeur, c'est mettre les bons **signaux de commande** à `1` au
  bon moment ; chaque front montant réalise un seul transfert sur le bus.
- L'unité de commande lit l'**opcode** et l'**étape** courante (donnée par un compteur
  d'étapes + décodeur) et en déduit tous les signaux : c'est une grande table
  faite de décodeurs et de portes.
```

## Exercices

### Exercice {num1}`exercice`
Voici l'étape 1 du cycle (commune à toutes les instructions) : *le compteur
ordinal pose son adresse sur le bus, et le registre d'adresse la capture*.

Pour chacun des signaux suivants, dites s'il doit valoir `1` ou `0` pendant cette
étape.

```{role} b(quiz-select)
:right:
:options: |
: 0
: 1
```

```{quiz}
:style: max-width: 30rem;
1.  activer la sortie du program counter : {b}`1`
2.  charger le registre d'adresse : {b}`1`
3.  écrire dans la mémoire : {b}`0`
4.  charger un registre (`r0` à `r3`) : {b}`0`
```

### Exercice {num1}`exercice`
L'instruction `ADD r0, r1` s'exécute, après l'étape "Chercher", en une **seule**
micro-étape (l'étape 4) : l'ALU lit directement `r0` et `r1` dans le banc de
registres, calcule leur somme, et `r0` la charge. Pour cette étape 4, dites si
chaque signal doit valoir `1` ou `0`.

```{quiz}
:style: max-width: 30rem;
1.  activer la sortie de l'ALU : {b}`1`
2.  charger le registre `r0` : {b}`1`
3.  activer la mémoire : {b}`0`
4.  incrémenter le program counter : {b}`0`
```

### Exercice {num1}`exercice`
Un élève propose de faire toute l'instruction `LOAD r0, valeur` en **un seul** front montant
d'horloge, pour aller plus vite : poser l'adresse de la valeur, lire la mémoire et
charger `r0` en même temps. Expliquez, en vous appuyant sur le rôle du bus,
pourquoi c'est impossible et pourquoi il faut plusieurs micro-étapes.

````{solution}
Le bus ne transporte qu'**une seule** valeur à la fois. Or `LOAD r0, valeur`
demande de faire circuler deux valeurs différentes sur le bus : d'abord l'adresse
de l'octet à lire (du program counter vers le registre d'adresse), puis la valeur
elle-même (de la mémoire vers `r0`). Ces deux transferts ne peuvent pas se produire
en même temps sans violer la règle du bus (un seul émetteur à la fois). Il faut
donc au moins deux fronts montants, donc deux micro-étapes successives.
````

## TP : l'unité de commande et l'assemblage du processeur
C'est le grand assemblage final : vous allez réunir, dans [Logix](https://maximejan.github.io/logix/), tous les blocs
construits aux pages précédentes en un **processeur complet**, puis lui faire
exécuter un vrai programme.

```{tip}
- Nommez vos composants (`pc`, `RA`, `RI`, `ALU`, `REGISTRES`...) : un circuit
  lisible est un circuit réparable.
- Réutilisez vos composants **encapsulés** (l'`ALU` et le banc de `REGISTRES`) et
  le composant `BUS` : le schéma reste alors proche de celui du cours.
```

L'unité de commande produit, à chaque front montant, les signaux de commande. Les signaux
*activer* pilotent les entrées `en` du `BUS` (qui pose sur le bus) ; les signaux
*charger* disent quels registres capturent le bus.

| étape | signaux à `1` (communes à toutes les instructions) |
| :---: | :------------------------------------------------- |
| 1 | activer `pc`, charger `RA` |
| 2 | incrémenter `pc` |
| 3 | activer mémoire, charger `RI` |

| opcode | étape 4 | étape 5 | étape 6 |
| :----- | :------ | :------ | :------ |
| `ADD` | activer ALU (`op`=addition), charger registre `Rd` | - | - |
| `SUB` | activer ALU (`op`=soustraction), charger registre `Rd` | - | - |
| `ET` | activer ALU (`op`=ET), charger registre `Rd` | - | - |
| `OU` | activer ALU (`op`=OU), charger registre `Rd` | - | - |
| `COPY` | activer registre `Rs`, charger registre `Rd` | - | - |
| `OUT` | activer registre `Rd`, charger sortie | - | - |
| `LOAD` | activer `pc`, charger `RA` | incrémenter `pc` | activer mémoire, charger registre `Rd` |
| `STOP` | arrêter l'horloge | - | - |

Marche à suivre :

1.  **Le compteur d'étapes** : un compteur suivi d'un décodeur donne les lignes
    `T1`, `T2`, `T3`... (une seule active à la fois), avec une **remise à zéro** en
    fin d'instruction.
2.  **L'unité de commande** : à partir de l'**opcode** (décodé) et des lignes d'**étapes**,
    produisez chaque signal de commande comme un **OU** de cas "(cet opcode) ET
    (cette étape)", en suivant la table ci-dessus. Avancez signal par signal.
3.  **L'assemblage** : placez le `BUS`, le `program counter` (`pc`), le registre
    d'adresse, la `RAM`, le registre d'instruction (`RI`) avec ses trois `SLICE`
    (`[7:4]`, `[3:2]`, `[1:0]`), votre banc de `REGISTRES` et votre `ALU` encapsulés,
    et un registre de sortie relié à un afficheur.
4.  **Chargez le programme test** en mémoire :

    ```{code-block} text
    adresse   contenu binaire   signification
       0       0001 00 00        LOAD r0, …
       1       0000 1101         13
       2       0001 01 00        LOAD r1, …
       3       0000 0010         2
       4       0010 00 01        ADD r0, r1
       5       0101 00 00        OUT r0
       6       0000 0000         STOP
    ```

5.  Remettez `pc` et le compteur d'étapes à zéro, lancez l'horloge : le processeur
    doit charger `13` dans `r0`, `2` dans `r1`, calculer leur somme dans `r0`,
    afficher `15`, puis s'arrêter.
6.  **Enregistrez** votre processeur. Vous venez de construire un ordinateur.
