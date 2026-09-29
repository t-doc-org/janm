<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# L'unité de commande

Nous avons tous les organes d'un processeur, et nous savons ce qu'est un
programme : une suite d'instructions que la machine doit chercher, décoder et
exécuter, encore et encore. Il manque pourtant le chef d'orchestre : **qui** dit
à chaque composant quoi faire, et surtout **quand** ? C'est le rôle de
l'*unité de commande* (aussi appelée *séquenceur*).

## Le program counter
Un *compteur* est un registre un peu particulier : au lieu d'être chargé de
l'extérieur, il réutilise l'additionneur (chapitre « Additionneur ») pour
**ajouter 1** à sa propre valeur à chaque front montant d'horloge.

Dans notre processeur, ce compteur sert à repérer, une à une, les instructions
du programme à exécuter : c'est pourquoi on l'appelle le *program counter* (ou
*compteur ordinal* en français). Il indique à tout moment la position, dans le
programme, de la prochaine instruction. Comme n'importe quel registre, il garde
son entrée de charge `LD` : elle permet de lui imposer directement une valeur
précise plutôt que de simplement ajouter 1, ce qui servira à « sauter » ailleurs
dans le programme (par exemple pour une boucle).

Dans la démonstration ci-dessous, faites avancer l'horloge : le compteur ajoute
`1` à chaque front montant tant que `en` vaut `1`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciIsIm8iOiJGYWl0ZXMgYXZhbmNlciBsJ2hvcmxvZ2UgKGNsaXF1ZXogZGVzc3VzKSA6IGxlIGNvbXB0ZXVyIGFqb3V0ZSAxIMOgIGNoYXF1ZSB0b3AgdGFudCBxdWUgJ2VuJyB2YXV0IDEuIExhIHJlbWlzZSDDoCAwIGxlIHJhbcOobmUgw6AgMC4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiRU4iLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6NjAsInN0YXRlIjp7InZhbHVlIjoxfSwibGFiZWwiOiJlbiJ9LHsiaWQiOiJjbGsiLCJ0eXBlIjoiQ0xPQ0siLCJ4Ijo0MCwieSI6MTYwLCJsYWJlbCI6ImhvcmxvZ2UifSx7ImlkIjoiUlNUIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjI0MCwic3RhdGUiOnsidmFsdWUiOjB9LCJsYWJlbCI6InJlbWlzZSDDoCAwIn0seyJpZCI6ImNudCIsInR5cGUiOiJDT1VOVEVSIiwieCI6MjQwLCJ5IjoxMjB9LHsiaWQiOiJRIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQ0MCwieSI6MTYwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoiY29tcHRlIn1dLCJ3aXJlcyI6W3siaWQiOiJ3MSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJFTiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiRU4ifX0seyJpZCI6IncyIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNsayIsInBvcnQiOiJDTEsifSwidG8iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiQ0xLIn19LHsiaWQiOiJ3MyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJSU1QiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IlJTVCJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IlEifSwidG8iOnsiY29tcG9uZW50SWQiOiJRIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 360px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un compteur qui s'incrémente à chaque front montant d'horloge
```

## Faire agir un composant, c'est lui envoyer un signal
Reprenons nos composants. Chacun possède, en plus de ses entrées de données, des
entrées de **commande** qui décident de son comportement :

- un registre a son entrée de charge `LD` : il capture la valeur présente à son
  entrée au front montant ;
- un multiplexeur a son entrée de sélection (par exemple `src`, qui choisit ce
  qui entre dans le banc de registres) ;
- la mémoire a son entrée `écrire` ;
- le program counter peut s'incrémenter ou être chargé ;
- l'ALU reçoit son code opération.

Faire faire quelque chose au processeur, ce n'est donc rien d'autre que **mettre
les bons signaux de commande à `1`, au bon moment**. Une combinaison précise de
signaux, à un instant donné, réalise une petite action : en général, un registre
capture une valeur, choisie au besoin par un multiplexeur. Tout le travail du processeur
se ramène à une longue suite de ces petits transferts.

## Une instruction, plusieurs micro-étapes
Une instruction ne se fait pas en un seul front montant. On la découpe en une
poignée de *micro-étapes*, chacune réalisée en un front montant. C'est
obligatoire : un registre ne capture une valeur **qu'au front montant**. Une
valeur qui doit d'abord être rangée dans un registre n'est donc utilisable qu'à
l'étape suivante.

L'étape "Chercher" du cycle est toujours la même, quelle que soit l'instruction.
Elle utilise deux registres d'aide : un *registre d'adresse* qui fournit son
adresse à la mémoire, et un *registre d'instruction* qui retient l'instruction
lue (pour que le program counter puisse avancer sans l'effacer).

La mémoire lit à l'adresse contenue dans le registre d'adresse. Il faut donc
d'abord charger le registre d'adresse (étape 1) avant que le registre
d'instruction puisse capturer l'instruction lue (étape 3). Si l'on chargeait les
deux au même front montant, le registre d'instruction capturerait ce que la
mémoire présentait *avant* que le registre d'adresse change : la mauvaise case.
En plus, on ne fait qu'une seule action par étape, pour que le déroulement reste
facile à suivre.

Dans la colonne « signaux à `1` », `LD X` signifie « X capture la valeur présente à son entrée au front montant ». `src` règle le *multiplexeur d'écriture*, qui choisit ce qui entre dans le banc de registres.

| étape | ce qui se passe | signaux à `1` |
| :---: | :-------------- | :------------ |
| 1 | le registre d'adresse capture la valeur du program counter | `LD RA` |
| 2 | le program counter s'incrémente | incrémenter `pc` |
| 3 | le registre d'instruction capture l'instruction lue en mémoire, à l'adresse contenue dans le registre d'adresse | `LD RI` |

Une fois l'instruction dans le registre d'instruction, son **opcode** est connu,
et les micro-étapes suivantes dépendent de lui. Prenons `LOAD r0, valeur`, qui doit
aller chercher sa valeur dans l'octet suivant :

| étape | ce qui se passe | signaux à `1` |
| :---: | :-------------- | :------------ |
| 4 | le registre d'adresse capture la valeur du program counter (l'adresse de la valeur) | `LD RA` |
| 5 | le program counter s'incrémente | incrémenter `pc` |
| 6 | le registre `r0` capture la valeur lue en mémoire | `src` = mémoire, `LD r0` |

L'instruction est terminée : on repart à l'étape 1 pour la suivante. On voit que
**exécuter une instruction, c'est dérouler une petite chorégraphie de signaux**,
fixée d'avance pour chaque opcode.

## Le compteur d'étapes
Pour savoir dans quelle micro-étape on se trouve, le processeur utilise un petit
*compteur d'étapes* : il compte `1`, `2`, `3`, `4`... et il est remis à zéro au
début de chaque nouvelle instruction. Un *décodeur* transforme sa valeur en une
seule ligne active à la fois : la ligne `T1` pendant l'étape 1, `T2` pendant
l'étape 2, et ainsi de suite. À chaque front montant, on avance d'une étape.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciBkJ8OpdGFwZXMiLCJvIjoiRmFpdGVzIGF2YW5jZXIgbCdob3Jsb2dlIDogbGUgY29tcHRldXIgZCfDqXRhcGVzIGNvbXB0ZSAwLCAxLCAyLCAzLCAwLCAuLi4gZXQgbGUgZMOpY29kZXVyIGFsbHVtZSB1bmUgc2V1bGUgbGlnbmUgw6AgbGEgZm9pcyAoVDAsIHB1aXMgVDEsIHB1aXMgVDIsIHB1aXMgVDMpLiBDJ2VzdCBjZSBxdWkgaW5kaXF1ZSBhdSBzw6lxdWVuY2V1ciBkYW5zIHF1ZWxsZSBtaWNyby3DqXRhcGUgb24gc2UgdHJvdXZlLiBMYSByZW1pc2Ugw6AgesOpcm8gcmVsYW5jZSDDoCBsJ8OpdGFwZSAwLiIsInMiOltdLCJhIjpbXSwiaSI6W10sInUiOltdLCJrIjoibm9uZSIsInIiOltdLCJsIjoxLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJFTiIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo0MCwic3RhdGUiOnsidmFsdWUiOjF9LCJsYWJlbCI6ImVuIn0seyJpZCI6ImNsayIsInR5cGUiOiJDTE9DSyIsIngiOjQwLCJ5IjoxNDAsImxhYmVsIjoiaG9ybG9nZSJ9LHsiaWQiOiJSU1QiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6MjQwLCJzdGF0ZSI6eyJ2YWx1ZSI6MH0sImxhYmVsIjoicmVtaXNlIMOgIDAifSx7ImlkIjoiY250IiwidHlwZSI6IkNPVU5URVIiLCJ4IjoyMjAsInkiOjEyMCwic3RhdGUiOnsid2lkdGgiOjJ9fSx7ImlkIjoiZGVjIiwidHlwZSI6IkRFQ09ERVIiLCJ4IjozODAsInkiOjEwMH0seyJpZCI6IlQwIiwidHlwZSI6Ik9VVFBVVCIsIngiOjU2MCwieSI6NDAsImxhYmVsIjoiVDAifSx7ImlkIjoiVDEiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NTYwLCJ5IjoxMDAsImxhYmVsIjoiVDEifSx7ImlkIjoiVDIiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NTYwLCJ5IjoxNjAsImxhYmVsIjoiVDIifSx7ImlkIjoiVDMiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NTYwLCJ5IjoyMjAsImxhYmVsIjoiVDMifV0sIndpcmVzIjpbeyJpZCI6IncxIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IkVOIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImNudCIsInBvcnQiOiJFTiJ9fSx7ImlkIjoidzIiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiY2xrIiwicG9ydCI6IkNMSyJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImNudCIsInBvcnQiOiJDTEsifX0seyJpZCI6InczIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IlJTVCIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiUlNUIn19LHsiaWQiOiJ3NCIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiUSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJpbiJ9fSx7ImlkIjoidzUiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiZGVjIiwicG9ydCI6Im91dDAifSwidG8iOnsiY29tcG9uZW50SWQiOiJUMCIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc2IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJvdXQxIn0sInRvIjp7ImNvbXBvbmVudElkIjoiVDEiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3NyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0Ijoib3V0MiJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlQyIiwicG9ydCI6ImluMCJ9fSx7ImlkIjoidzgiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiZGVjIiwicG9ydCI6Im91dDMifSwidG8iOnsiY29tcG9uZW50SWQiOiJUMyIsInBvcnQiOiJpbjAifX1dLCJjdXN0b21EZWZpbml0aW9ucyI6e319fQ&embed=1
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
:alt: L'unité de commande reçoit l'opcode du registre d'instruction et les lignes d'étapes T1..T4 issues d'un compteur d'étapes suivi d'un décodeur, et elle produit les signaux de commande (`LD`, `src`, écrire, code op.) envoyés aux registres, à la mémoire et à l'ALU
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
instruments (les signaux) d'entrer en jeu. La musique, ce sont les valeurs qui
passent d'un registre à l'autre, étape après étape.

```{important}
- Commander le processeur, c'est mettre les bons **signaux de commande** à `1` au
  bon moment ; chaque front montant réalise une micro-étape.
- L'unité de commande lit l'**opcode** et l'**étape** courante (donnée par un compteur
  d'étapes + décodeur) et en déduit tous les signaux : c'est une grande table
  faite de décodeurs et de portes.
```

## Exercices

### Exercice {num1}`exercice`
Le **program counter** (`pc`) est un registre spécial : à chaque front montant, s'il n'est
pas chargé (`LD = 0`), il **ajoute 1** à sa valeur. S'il est chargé
(`LD = 1`), il prend directement la valeur imposée (un **saut**), au lieu de
s'incrémenter.

Au départ, avant le premier front montant, `pc = 0`. Voici sept fronts montants successifs, avec la
valeur de `LD` et, quand elle s'applique, la valeur de saut. Complétez `pc`
après chaque front montant.

```{role} r(quiz-input)
:right: width: 4rem;
:check: json trim
```

```{quiz}
:style: max-width: 28rem;
| front montant | `LD` | valeur de saut | `pc` après le front montant |
| :-: | :-------: | :------------: | :---------------: |
| 1   | `0`       | /              | {r}`{"1": true}`  |
| 2   | `0`       | /              | {r}`{"2": true}`  |
| 3   | `1`       | `10`           | {r}`{"10": true}` |
| 4   | `0`       | /              | {r}`{"11": true}` |
| 5   | `0`       | /              | {r}`{"12": true}` |
| 6   | `1`       | `0`            | {r}`{"0": true}`  |
| 7   | `0`       | /              | {r}`{"1": true}`  |
```

### Exercice {num1}`exercice`
Voici l'étape 1 du cycle (commune à toutes les instructions) : *le registre
d'adresse capture la valeur du compteur ordinal*.

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
1.  charger le registre d'adresse (`LD RA`) : {b}`1`
2.  incrémenter le `pc` : {b}`0`
3.  écrire dans la mémoire (`écrire`) : {b}`0`
4.  charger un registre `r0` à `r3` (`LD Rd`) : {b}`0`
```

### Exercice {num1}`exercice`
L'instruction `ADD r0, r1` s'exécute, après l'étape "Chercher", en une **seule**
micro-étape (l'étape 4) : l'ALU lit directement `r0` et `r1` dans le banc de
registres, calcule leur somme, et `r0` la charge. Le multiplexeur d'écriture est
réglé sur l'ALU (`src` = `00`). Pour cette étape 4, dites si chaque signal doit
valoir `1` ou `0`.

```{quiz}
:style: max-width: 30rem;
1.  charger le registre `r0` (`LD Rd`) : {b}`1`
2.  charger le registre d'instruction (`LD RI`) : {b}`0`
3.  incrémenter le `pc` : {b}`0`
4.  charger le registre de sortie (`LD sortie`) : {b}`0`
```

### Exercice {num1}`exercice`
Un élève propose de faire toute l'instruction `LOAD r0, valeur` en **un seul** front montant
d'horloge, pour aller plus vite : ranger l'adresse de la valeur dans le registre
d'adresse, lire la mémoire et charger `r0` en même temps. Expliquez, en vous
appuyant sur le fonctionnement des registres, pourquoi c'est impossible et
pourquoi il faut plusieurs micro-étapes.

````{solution}
Un registre ne capture une valeur **qu'au front montant**. Or la mémoire lit à
l'adresse contenue dans le registre d'adresse `RA`. Il faut donc d'abord ranger
l'adresse de la valeur dans `RA`, à un front montant. Ce n'est qu'ensuite que la
mémoire présente la bonne valeur à sa sortie, et `r0` ne peut la capturer qu'à un
front montant suivant. Si tout se faisait au même front montant, `r0`
capturerait ce que la mémoire présentait *avant* que `RA` change, c'est-à-dire le
contenu de la mauvaise case. Il faut donc au moins deux fronts montants, donc
deux micro-étapes successives.
````

## TP : l'unité de commande et l'assemblage du processeur
C'est le grand assemblage final : vous allez réunir, dans [Logix](https://maximejan.github.io/logix/), tous les blocs
construits aux pages précédentes en un **processeur complet**, puis lui faire
exécuter un vrai programme.

```{tip}
- Nommez vos composants (`pc`, `RA`, `RI`, `ALU`...) : un circuit
  lisible est un circuit réparable.
- Partez du fichier du TP registres (banc de registres + ALU) et réutilisez votre
  composant `ALU` **encapsulé**.
```

L'unité de commande produit, à chaque front montant, les signaux de commande. Les signaux
`LD` disent quel registre capture au front montant ; `src` règle le multiplexeur
d'écriture, c'est-à-dire ce qui entre dans `Rd` (`00` : résultat de l'ALU, `01` :
registre `Rs`, `10` : donnée lue en mémoire) ; `op` choisit l'opération de l'ALU
(`00` : addition, `01` : soustraction, `10` : ET, `11` : OU).

| étape | signaux à `1` (communes à toutes les instructions) |
| :---: | :------------------------------------------------- |
| 1 | `LD RA` |
| 2 | incrémenter `pc` |
| 3 | `LD RI` |

| opcode | étape 4 | étape 5 | étape 6 |
| :----- | :------ | :------ | :------ |
| `ADD` | `src` = ALU, `op` = `00`, `LD Rd` | - | - |
| `SUB` | `src` = ALU, `op` = `01`, `LD Rd` | - | - |
| `ET` | `src` = ALU, `op` = `10`, `LD Rd` | - | - |
| `OU` | `src` = ALU, `op` = `11`, `LD Rd` | - | - |
| `COPY` | `src` = `Rs`, `LD Rd` | - | - |
| `OUT` | `LD sortie` | - | - |
| `LOAD` | `LD RA` | incrémenter `pc` | `src` = mémoire, `LD Rd` |
| `STOP` | arrêter l'horloge | - | - |

Marche à suivre :

1.  **Le compteur d'étapes** : un compteur suivi d'un décodeur donne les lignes
    `T1`, `T2`, `T3`... (une seule active à la fois), avec une **remise à zéro** en
    fin d'instruction.
2.  **L'unité de commande** : à partir de l'**opcode** (décodé) et des lignes d'**étapes**,
    produisez chaque signal de commande comme un **OU** de cas "(cet opcode) ET
    (cette étape)", en suivant la table ci-dessus. Avancez signal par signal.
3.  **L'assemblage** : partez du fichier du TP registres (banc de registres +
    `ALU`) et ajoutez :

    - le `program counter` (`pc`) ;
    - le registre d'adresse `RA` : son entrée est reliée au `pc`, sa sortie à
      l'adresse de la `RAM` ;
    - la `RAM` ;
    - le registre d'instruction `RI` : son entrée est reliée à la sortie de la
      `RAM` ; ajoutez ses trois `SLICE` (`[7:4]`, `[3:2]`, `[1:0]`) ;
    - le multiplexeur d'écriture (ALU / `Rs` / mémoire), devant l'entrée de donnée
      du banc de registres ;
    - un registre de sortie (entrée = lecture `Rd`) relié à un afficheur.
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
