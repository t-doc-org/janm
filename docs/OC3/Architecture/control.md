<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# L'unité de commande

Aux TP précédents, vous avez construit l'ALU, le banc de registres et la mémoire,
qui contient déjà un petit programme. Mais c'est vous qui actionniez tout à la
main : vous choisissiez `Rd` et `Rs`, vous mettiez `LD` à `1`, vous changiez
l'adresse de la mémoire... Pour que le processeur exécute son programme **tout
seul**, il faut remplacer ces interrupteurs par des circuits.

Nous allons y arriver pas à pas, en alternant théorie et pratique dans Logix :

1. **Chercher les instructions** : le compteur de programme `pc` (le *program
   counter* du chapitre précédent, TP 1), puis le registre d'instruction (TP 2).
2. **Exécuter les instructions** : les deux étapes d'une instruction, le
   multiplexeur d'écriture et le registre de sortie. Vous ferez alors tourner le
   programme **à la main**, en jouant vous-même le rôle de l'unité de commande
   (TP 3).
3. **Automatiser** : le compteur d'étapes (TP 4), puis l'*unité de commande*, qui
   remplacera vos derniers interrupteurs (TP 5).

## Le processeur complet
Voici le processeur que vous aurez construit à la fin de cette page. Les
composants des TP précédents sont reliés à quelques nouveaux composants.

```{figure} images/cpu_schema.svg
:width: 100%
:alt: Le processeur complet. En haut, le compteur de programme pc donne l'adresse à la RAM ; la RAM envoie la case lue au registre d'instruction RI, dont l'opcode part vers l'unité de commande, dont les champs Rd et Rs vont au banc de registres et dont les deux bits op vont directement à l'ALU. En bas, le multiplexeur d'écriture choisit entre la mémoire et le résultat de l'ALU ce qui entre dans le banc de registres ; le banc alimente l'ALU, et la lecture Rd alimente le registre de sortie, qui affiche sa valeur. Les signaux de commande sont indiqués en bleu
:align: center

Le processeur complet. Les flèches noires transportent des données ; les petits
signaux en bleu commandent les composants. La plupart viennent de l'unité de
commande, mais `src` est un simple fil issu de `RI` (vous verrez pourquoi).
```

| composant | rôle | dans Logix | construit au |
| :-------- | :--- | :--------- | :----------- |
| banc de registres (`r0` à `r3`) | retient les valeurs de travail | votre circuit | TP registres |
| ALU | calcule (addition, soustraction, ...) | votre composant `ALU` | TP ALU |
| RAM | contient le programme | *RAM* | TP mémoire |
| compteur de programme `pc` | contient l'adresse de la prochaine case à lire | *Compteur N-bit* | TP 1 |
| registre d'instruction `RI` | retient l'instruction lue : opcode, `Rd` et `Rs` | *Registre N-bit* et *Tranches* | TP 2 |
| multiplexeur d'écriture | choisit ce qui entre dans le registre `Rd` | *Multiplexeur* | TP 3 |
| registre de sortie | affiche la valeur d'un registre (instruction `OUT`) | *Registre N-bit* | TP 3 |
| compteur d'étapes | indique où en est l'instruction en cours | *Compteur N-bit* et *Décodeur* | TP 4 |
| unité de commande | produit les signaux de commande | *Décodeur* et portes | TP 5 |

Pas d'inquiétude si certains noms de la figure (`T1`, `T2`, `src`, lecture `Rd`...)
sont encore inconnus : chacun est expliqué plus bas, au moment où l'on en a besoin.

```{admonition} Avant de commencer
:class: tip
Ouvrez dans [Logix](https://maximejan.github.io/logix/) le fichier du TP mémoire
(ALU, banc de registres, et RAM qui contient déjà le programme) : vous allez le
compléter TP après TP, et l'enregistrer à la fin de chacun. Quelques règles pour
toute la page :

- Nommez vos composants (`pc`, `RI`...) : un circuit lisible est un circuit
  réparable.
- Tous les registres et compteurs se branchent sur la **même** horloge que le banc
  de registres et la RAM.
- **Faire un front montant**, c'est cliquer deux fois sur l'horloge : le premier
  clic la fait passer de `0` à `1` (c'est le front montant), le second la ramène à
  `0`, prête pour le suivant.
- **Faire un `reset`**, c'est mettre l'entrée `reset` (créée au TP 1) à `1`, puis
  la remettre à `0`.
- Les composants de cette page se trouvent dans la palette de Logix sous les noms
  *Compteur N-bit*, *Registre N-bit*, *Tranche*, *Multiplexeur*, *Décodeur*, et
  les portes *AND* (`ET`), *OR* (`OU`) et *NOT* (`NON`). Leurs réglages (nombre de
  bits...) se changent dans le panneau des propriétés, après avoir cliqué sur le
  composant. Chaque entrée et chaque sortie d'un composant porte un petit nom
  (`EN`, `LD`, `Q`...) : il est expliqué la première fois qu'on l'utilise.
- Gardez l'afficheur `résultat` de l'ALU : il aide à vérifier les calculs.
```

## Partie 1 : chercher les instructions

### Le compteur de programme
Pour exécuter le programme, le processeur doit lire les cases de la mémoire **l'une
après l'autre**. Jusqu'ici, c'est vous qui changiez l'adresse ; désormais, ce sera
le *compteur de programme* (`pc`, le *program counter* du chapitre précédent).
C'est un **compteur** : un registre qui ajoute `1` à sa propre valeur à chaque
front montant. Il contient l'adresse de la prochaine case à lire.

Dans Logix, il s'appelle *Compteur N-bit*. Comme les autres composants, il a des
entrées à gauche et une sortie à droite, chacune désignée par une abréviation
anglaise :

| connecteur | de l'anglais | rôle |
| :--------: | :----------- | :--- |
| `EN` | *enable* : activer | quand `EN` vaut `1`, le compteur ajoute `1` à chaque front montant ; quand `EN` vaut `0`, il garde sa valeur |
| `LD` | *load* : charger | quand `LD` vaut `1`, le compteur prend la valeur de `D` |
| `D` | *data* : donnée | la valeur à charger ; non branchée, elle vaut `0` |
| `CLK` | *clock* : horloge | l'horloge, dont les fronts montants font avancer le compteur |
| `Q` | (sortie) | la valeur actuelle du compteur |

La sortie `Q` du `pc` est reliée à l'entrée `A` (*address* : adresse) de la RAM :
la RAM présente alors sur sa propre sortie `Q` le contenu de la case pointée.

Si l'on laisse `D` non branchée, l'entrée `LD` sert de **remise à zéro**.
Attention, ce `LD` ne fonctionne pas comme celui d'un registre : il agit **tout de
suite**, sans attendre de front montant, et tant qu'il vaut `1`, le compteur reste
à `0` même si l'horloge avance. C'est pourquoi un `reset` se fait en deux temps :
`1`, puis `0`.

Faites avancer l'horloge ci-dessous : le compteur ajoute `1` à chaque front
montant tant que l'interrupteur `en` vaut `1`, et l'interrupteur `reset`, relié à
`LD`, le ramène à `0`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciIsIm8iOiJGYWl0ZXMgYXZhbmNlciBsJ2hvcmxvZ2UgZW4gY2xpcXVhbnQgZGVzc3VzIChkZXV4IGNsaWNzIDogMCDihpIgMSwgYydlc3QgbGUgZnJvbnQgbW9udGFudCwgcHVpcyByZXRvdXIgw6AgMCkuIExlIGNvbXB0ZXVyIGFqb3V0ZSAxIMOgIGNoYXF1ZSBmcm9udCBtb250YW50IHRhbnQgcXVlICdlbicgdmF1dCAxLiAncmVzZXQnLCByZWxpw6kgw6AgTEQsIGxlIHJhbcOobmUgw6AgMCB0b3V0IGRlIHN1aXRlLCBzYW5zIGF0dGVuZHJlIGwnaG9ybG9nZS4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiRU4iLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6NjAsInN0YXRlIjp7InZhbHVlIjoxfSwibGFiZWwiOiJlbiJ9LHsiaWQiOiJjbGsiLCJ0eXBlIjoiQ0xPQ0siLCJ4Ijo0MCwieSI6MTYwLCJsYWJlbCI6ImhvcmxvZ2UifSx7ImlkIjoiUlNUIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjI0MCwic3RhdGUiOnsidmFsdWUiOjB9LCJsYWJlbCI6InJlc2V0In0seyJpZCI6ImNudCIsInR5cGUiOiJDT1VOVEVSIiwieCI6MjQwLCJ5IjoxMjB9LHsiaWQiOiJRIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQ0MCwieSI6MTYwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoiY29tcHRlIn1dLCJ3aXJlcyI6W3siaWQiOiJ3MSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJFTiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiRU4ifX0seyJpZCI6IncyIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNsayIsInBvcnQiOiJDTEsifSwidG8iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiQ0xLIn19LHsiaWQiOiJ3MyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJSU1QiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkxEIn19LHsiaWQiOiJ3NCIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbnQiLCJwb3J0IjoiUSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlEiLCJwb3J0IjoiaW4wIn19XSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 360px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un compteur qui s'incrémente à chaque front montant d'horloge
```

### TP 1 : le compteur de programme
1.  **Placez le compteur.** Placez un *Compteur N-bit*, réglez-le sur 4 bits et
    nommez-le `pc`. Reliez son entrée `CLK` à l'horloge, et sa sortie `Q` à
    l'entrée `A` (l'adresse) de la RAM, à la place de l'entrée manuelle
    `adresse` : supprimez cette entrée.
2.  **Faites le ménage.** Supprimez aussi les entrées `écrire` et
    `donnée mémoire` de la RAM : le processeur ne fait que **lire** la mémoire, et
    une entrée non branchée vaut `0`.
3.  **Pilotez-le à la main.** Pour l'instant, c'est vous qui commandez le
    compteur. Ajoutez une entrée `incrémenter pc`, reliée à `EN` (le `pc`
    avance quand elle vaut `1`), et une entrée `reset`, reliée à `LD` (laissez
    `D` libre : charger `D`, c'est alors charger `0`).
4.  **Vérifiez.** Mettez `reset` à `1` puis à `0` : `pc` vaut `0000` et la RAM
    affiche `0001 0000`. Mettez `incrémenter pc` à `1` et faites quelques fronts
    montants : la RAM affiche une à une les cases du programme (`0000 1101`,
    `0001 0100`, `0000 0010`...). Un nouveau `reset` vous ramène au début.

````{solution}
Circuit corrigé : {download}`tp_processeur_1.json <solutions/tp_processeur_1.json>`. Dans Logix, ouvrez-le avec le bouton *Charger un JSON* (flèche vers le haut).

- `pc` (*Compteur N-bit*, 4 bits) : `Q` → `A` de la RAM, `EN` ← `incrémenter pc`,
  `LD` ← `reset`, `CLK` ← horloge.
- Les entrées `adresse`, `écrire` et `donnée mémoire` ont disparu. Les autres
  entrées manuelles (`Rd`, `Rs`, `LD`, `donnée`, `op`) sont encore là : elles
  seront remplacées dans les TP suivants.
````

### Le registre d'instruction
La RAM présente en permanence la case pointée par le `pc`. Mais dès que le `pc`
avance, cette case change ! Pour exécuter une instruction, le processeur doit donc
la **garder** quelque part : c'est le rôle du *registre d'instruction* (`RI`).
C'est un registre de 8 bits, un *Registre N-bit*, comme ceux du banc. Rappel de
ses connecteurs : `D` (*data*) reçoit la valeur à retenir, ici la sortie `Q` de la
RAM ; `LD` (*load* : charger) décide s'il capture : si `LD` vaut `1`, le registre
copie `D` au prochain front montant, sinon il garde sa valeur ; `CLK` reçoit
l'horloge ; et la sortie `Q` donne la valeur retenue.

Une fois l'instruction dans `RI`, il reste à la découper en champs, comme au
chapitre précédent. C'est le rôle du composant *Tranche* : il a une entrée (le mot
complet) et une sortie (un champ de ce mot). Dans ses propriétés, *Bit haut* et
*Bit bas* donnent les numéros du premier et du dernier bit du champ, le bit `0`
étant celui de droite. Trois *Tranches* extraient l'opcode (bits `7` à `4`), `Rd`
(bits `3` et `2`) et `Rs` (bits `1` et `0`).

```{figure} images/instruction_format.svg
:width: 60%
:alt: Une instruction de 8 bits découpée en trois champs : opcode 0100 (4 bits), Rd 00 (2 bits) et Rs 01 (2 bits), qui se décode en "ADD r0, r1 : r0 reçoit r0 + r1"
:align: center

Les trois champs d'une instruction, rappel du chapitre précédent.
```

`Rd` et `Rs` vont directement au banc de registres : ce n'est plus vous qui
choisissez les registres, c'est l'instruction.

### TP 2 : le registre d'instruction
1.  **Placez RI.** Placez un *Registre N-bit* de 8 bits nommé `RI`. Reliez son
    entrée `D` à la sortie `Q` de la RAM (la case lue), et son `CLK` à
    l'horloge. Ajoutez une entrée `LD RI`, reliée à son entrée `LD` : quand elle
    vaut `1`, `RI` capture la case lue au front montant.
2.  **Découpez l'instruction.** Ajoutez trois *Tranches* sur la sortie `Q` de
    `RI`, et réglez leur *Bit haut* et leur *Bit bas* : `7` et `4` pour
    l'`opcode`, `3` et `2` pour `Rd`, `1` et `0` pour `Rs`.
3.  **Branchez-les.** La *Tranche* `Rd` va **partout où arrivait l'entrée
    manuelle `Rd`** : sur le décodeur du banc **et** sur l'entrée de sélection
    `sel` du multiplexeur `lecture Rd`. La *Tranche* `Rs` va sur l'entrée `sel`
    du multiplexeur `lecture Rs`. Supprimez ensuite les entrées manuelles `Rd` et `Rs`. L'`opcode`
    ne servira qu'au TP 5.
4.  **Vérifiez.** Faites un `reset`, puis mettez `incrémenter pc` et `LD RI` à
    `1`. Au premier front montant, `RI` capture `0001 0000` (`LOAD r0`) et le
    `pc` passe à `0001`. Faites un deuxième front montant : `RI` capture
    `0000 1101`... qui n'est pas une instruction, mais la valeur `13` ! Il faudra
    donc mettre `LD RI` à `1` **au bon moment** : c'est le sujet de la partie
    suivante.

````{solution}
Circuit corrigé : {download}`tp_processeur_2.json <solutions/tp_processeur_2.json>`. Dans Logix, ouvrez-le avec le bouton *Charger un JSON* (flèche vers le haut).

- `RI` (*Registre N-bit*, 8 bits) : `D` ← `Q` de la RAM, `LD` ← `LD RI`,
  `CLK` ← horloge.
- *Tranches* sur la sortie de `RI` : bits 7 à 4 (`opcode`, pas encore relié),
  3 et 2 (`Rd`, vers le décodeur et le multiplexeur de lecture `Rd`), 1 et 0
  (`Rs`, vers le multiplexeur de lecture `Rs`).
````

## Partie 2 : exécuter les instructions

### Une instruction en deux étapes
Un registre ne capture une valeur **qu'au front montant**. Or, pour savoir quoi
faire, le processeur doit d'abord **avoir** l'instruction dans `RI`. Une
instruction se déroule donc en deux *étapes*, une par front montant : pendant
`T1`, on va chercher l'instruction, que `RI` capture au front montant qui
**termine** `T1` ; pendant `T2`, on l'exécute, et le front montant qui termine
`T2` enregistre son résultat. Dans les tableaux, le front numéro *k* est toujours
celui qui **termine** l'étape de la ligne *k*.

Les signaux qui commandent les registres s'écrivent `LD X` ("charger `X`") : si
`LD X` vaut `1` pendant une étape, le registre `X` capture la valeur présente à
son entrée au front montant qui termine cette étape. `LD Rd` désigne le registre
dont le **numéro** est dans le champ `Rd` de l'instruction.

```{figure} images/deux_etapes.svg
:width: 90%
:alt: Chronogramme d'une instruction. En haut, deux bandeaux côte à côte : T1, Fetch (chercher), où RI reçoit l'instruction lue et le pc avance, puis T2, Execute (exécuter), où l'instruction agit et Rd ou la sortie capture ; à droite, en gris clair, le T1 de l'instruction suivante. Au milieu, le signal d'horloge clk en créneau, dont trois fronts montants sont marqués d'une flèche orange vers le haut : au début de T1, entre T1 et T2, et à la fin de T2. En bas, une bande bleue qui couvre toute la durée de T2, intitulée Decode (décoder) : en continu, précise que les Tranches et le décodeur découpent RI dès qu'il change, sans attendre de front montant.
:align: center

Une instruction occupe deux étapes, chercher (`T1`) puis exécuter (`T2`), entre
trois fronts montants : celui qui la commence, celui qui sépare `T1` et `T2`, et
celui qui la termine (et commence l'instruction suivante). Le décodage n'est pas
une étape : il se fait en continu.
```

**Chercher (`T1`).** La RAM présente en permanence la case dont l'adresse est dans
le `pc`. Au front montant qui termine `T1`, `RI` capture cette instruction **et**
le `pc` avance de `1` : pendant `T1`, `LD RI` et incrémenter `pc` valent `1`. Il
n'y a pas de conflit : au front montant, tous les registres capturent **en même
temps** la valeur présente juste avant le front. `RI` reçoit donc bien la case
pointée par l'ancienne valeur du `pc`.

**Exécuter (`T2`).** La suite dépend de l'instruction : ranger une valeur dans un
registre, ou l'afficher. Il nous manque encore deux composants pour cela : le
multiplexeur d'écriture et le registre de sortie, juste après.

**Et l'étape "décoder" ?** Au chapitre précédent, le cycle d'un processeur
comptait trois temps : chercher, décoder, exécuter (*fetch, decode, execute*).
Notre processeur n'en a que deux, car il n'a pas besoin d'étape à part pour
décoder : dès que `RI` contient l'instruction, les *Tranches* (et, au TP 5, le
décodeur d'opcode) la découpent **en permanence**, sans attendre de front
montant. Pendant `T2`, l'instruction est donc déjà décodée.

```{admonition} Dans un vrai processeur
:class: note
Un vrai processeur, lui, consacre bien une étape au décodage. Ses instructions sont
bien plus nombreuses (des centaines), et parfois de longueurs différentes (de 1 à 15 octets sur
un processeur Intel ou AMD) : les décoder demande un vrai travail, qui prend au
moins un cycle d'horloge. De plus, il travaille **à la chaîne** (on parle de
*pipeline*) : pendant qu'une instruction s'exécute, la suivante est décodée, et
celle d'après est déjà cherchée en mémoire. Chaque instruction met plusieurs
cycles d'horloge à traverser la chaîne, mais il en sort une à chaque cycle
d'horloge (et même plusieurs sur les processeurs actuels).
```

### Le multiplexeur d'écriture
Pendant `T2`, une instruction `LOAD` ou une instruction de calcul range une valeur
dans le registre `Rd`. Mais laquelle ?

- Pour `LOAD Rd, valeur`, c'est la valeur lue dans la **mémoire** (la case qui
  suit l'instruction : nous verrons plus bas comment la lire).
- Pour `ADD`, `SUB`, `AND` et `OR`, c'est le **résultat de l'ALU**.

Un *multiplexeur d'écriture* choisit donc ce qui entre dans le banc de registres.
Rappel : le *Multiplexeur* de Logix a des entrées de données numérotées `0`, `1`...
et une entrée de sélection `sel` (*select*) ; sa sortie recopie l'entrée dont le
numéro arrive sur `sel`. Ici, l'entrée `0` reçoit la sortie de la RAM, l'entrée
`1` le résultat de l'ALU, et le signal branché sur `sel` s'appelle `src` (pour
*source*).

Comment régler `src` ? Grâce au choix des opcodes, c'est très simple. Les quatre
instructions de calcul (`0100` à `0111`) sont les seules dont l'opcode commence par
`01`, c'est-à-dire dont le bit `6` de `RI` vaut `1` (aucun de nos opcodes ne
commence par `1` : le bit `7` vaut toujours `0`, il suffit donc de regarder le bit
`6`). On appelle ce bit `calcul`, et on le branche directement sur `src` :
`src = calcul`, sans aucune porte.

Et l'opération de l'ALU ? Inutile de la commander non plus : les deux bits de
droite de l'opcode **sont** le code `op` de l'ALU (`SUB` = `0101`, donc
`op = 01`, la soustraction). On branche donc les bits `5` et `4` de `RI`
directement sur l'entrée `op` de l'ALU.

### Le registre de sortie
L'instruction `OUT Rd` montre le contenu du registre `Rd`. Le banc de registres le
lit déjà en permanence : c'est la lecture `Rd`, qui part vers l'entrée `A` de
l'ALU. Il suffit donc d'un *registre de sortie* de 8 bits dont l'entrée est la
lecture `Rd` : quand son signal `LD sortie` vaut `1`, il capture cette valeur au
front montant. Un registre de Logix affiche toujours sa valeur : pas besoin
d'afficheur. C'est l'écran de notre processeur.

### Les signaux de chaque étape
Nous pouvons maintenant dire quels signaux valent `1` à chaque étape (`src` et
`op`, eux, se règlent tout seuls). Tous les autres valent `0`.

| étape | instruction | signaux à `1` |
| :---: | :---------- | :------------ |
| `T1` | toutes | `LD RI`, incrémenter `pc` |
| `T2` | `LOAD Rd, valeur` | `LD Rd`, incrémenter `pc` |
| `T2` | `ADD`, `SUB`, `AND`, `OR` | `LD Rd` |
| `T2` | `OUT Rd` | `LD sortie` |
| `T2` | `STOP` | aucun : le processeur s'arrête |

`LOAD` demande un peu d'attention : sa valeur se trouve dans la case **suivante**
de la mémoire. Or, pendant `T2`, le `pc` pointe justement déjà sur cette case :
la RAM présente la valeur, le multiplexeur d'écriture la laisse passer
(`src = 0`) et `Rd` la capture. Au même front, le `pc` avance encore, pour passer
par-dessus la valeur.

### Exercice {num1}`exercice`
La mémoire contient le programme test du TP mémoire. Au départ, `pc = 0000`,
`RI = 0000 0000` et tous les registres valent `0000 0000`. Pour chacun des huit
premiers fronts montants, donnez la valeur du `pc` après le front (sur 4 bits,
par exemple `0001`), puis l'autre registre mis à jour et sa nouvelle valeur (sur
8 bits).

```{role} reg(quiz-select)
:right:
:options: |
: RI
: r0
: r1
: sortie
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
| 7 | `T1` | {v}`{"0110": true}` | {reg}`RI` | {v}`{"0010 0000": true, "00100000": true}` |
| 8 | `T2` | {v}`{"0110": true}` | {reg}`sortie` | {v}`{"0000 1111": true, "00001111": true}` |
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
- Fronts 7 et 8 : `RI` capture `OUT r0` (`0010 0000`), le `pc` passe à `0110` ;
  puis le registre de sortie capture la lecture `r0`, `0000 1111`, et le `pc`
  n'avance pas.
````

### TP 3 : jouez l'unité de commande
1.  **Le multiplexeur d'écriture.** Placez un *Multiplexeur* nommé
    `mux d'écriture`, réglé sur *Bits de sélection* : 1 bit (2 voies) et
    *Largeur des données* : 8 bits. Entrée `0` : la sortie `Q` de la RAM ;
    entrée `1` : le résultat de l'ALU. Reliez sa sortie à l'entrée `D` des
    quatre registres, à la place de l'entrée manuelle `donnée` : supprimez-la.
2.  **calcul et op.** Ajoutez deux *Tranches* sur la sortie de `RI` : le bit `6`
    seul (`calcul` : *Bit haut* et *Bit bas* à `6`), relié à l'entrée `sel` du
    multiplexeur d'écriture, et les bits `5` et `4` (`op`), reliés à l'entrée `op`
    de l'ALU à la place de l'entrée manuelle `op` : supprimez-la.
3.  **Le registre de sortie.** Placez un **registre** (*Registre N-bit*, et non
    le composant *Sortie* de la palette) de 8 bits nommé `sortie`. Son
    entrée `D` est la lecture `Rd` du banc (la sortie du multiplexeur qui
    alimente l'entrée `A` de l'ALU), son `CLK` l'horloge. Ajoutez une entrée
    `LD sortie`, reliée à son entrée `LD`.
4.  **Renommez** l'entrée manuelle `LD` du banc (celle qui arrive sur les quatre
    portes `ET`) en `LD Rd`.

Il vous reste quatre interrupteurs de commande : `incrémenter pc`, `LD RI`,
`LD Rd` et `LD sortie`. L'unité de commande, c'est vous ! Avant chaque front
montant, il faut les régler selon l'étape et l'instruction en cours. Complétez
d'abord le tableau, à l'aide du tableau des signaux de chaque étape. Chaque ligne
donne les réglages **pendant** l'étape : ils agissent au front montant qui la
termine. La colonne *instruction* indique l'instruction traitée ; pendant `T1`,
c'est celle qu'on va chercher (`RI` contient encore la précédente).

```{role} sig(quiz-select)
:options: |
: 0
: 1
```

```{quiz}
| front | étape | instruction | incrémenter `pc` | `LD RI` | `LD Rd` | `LD sortie` |
| :---: | :---: | :---------- | :--------------: | :-----: | :-----: | :---------: |
| 1 | `T1` | `LOAD r0, 13` | {sig}`1` | {sig}`1` | {sig}`0` | {sig}`0` |
| 2 | `T2` | `LOAD r0, 13` | {sig}`1` | {sig}`0` | {sig}`1` | {sig}`0` |
| 3 | `T1` | `LOAD r1, 2` | {sig}`1` | {sig}`1` | {sig}`0` | {sig}`0` |
| 4 | `T2` | `LOAD r1, 2` | {sig}`1` | {sig}`0` | {sig}`1` | {sig}`0` |
| 5 | `T1` | `ADD r0, r1` | {sig}`1` | {sig}`1` | {sig}`0` | {sig}`0` |
| 6 | `T2` | `ADD r0, r1` | {sig}`0` | {sig}`0` | {sig}`1` | {sig}`0` |
| 7 | `T1` | `OUT r0` | {sig}`1` | {sig}`1` | {sig}`0` | {sig}`0` |
| 8 | `T2` | `OUT r0` | {sig}`0` | {sig}`0` | {sig}`0` | {sig}`1` |
```

5.  **Lancez le programme à la main.** Faites un `reset`. Puis, pour chaque ligne
    du tableau, réglez les quatre interrupteurs et faites **un** front montant.
    Vérifiez au passage : après le 2e front, `r0` vaut `0000 1101` ; après le
    4e, `r1` vaut `0000 0010` ; après le 6e, `r0` vaut `0000 1111` ; après le
    8e, le registre de sortie affiche `0000 1111`, soit `15`.

````{solution}
Circuit corrigé : {download}`tp_processeur_3.json <solutions/tp_processeur_3.json>`. Dans Logix, ouvrez-le avec le bouton *Charger un JSON* (flèche vers le haut).

- `mux d'écriture` (*Multiplexeur* 8 bits, sélection 1 bit) : `0` ← `Q` de la
  RAM, `1` ← résultat de l'ALU, `sel` ← *Tranche* `calcul` (bit 6), sortie →
  `D` des quatre registres.
- *Tranche* `op` (bits 5 et 4) → `op` de l'ALU.
- `sortie` (*Registre N-bit*, 8 bits) : `D` ← lecture `Rd`, `LD` ← `LD sortie`.

Pendant `T1`, on cherche toujours l'instruction suivante : incrémenter `pc` et
`LD RI` valent `1`, les autres `0`. Pendant `T2`, on suit le tableau de l'étape
`T2`. Attention au 6e front : `ADD` n'occupe qu'une case, le `pc` ne doit
**pas** avancer.
````

## Partie 3 : automatiser

### L'unité de commande
Jouer l'unité de commande, c'est fastidieux : il est temps de la construire.
Elle reçoit l'opcode de l'instruction (depuis `RI`). Elle contient un *compteur
d'étapes*, qui lui indique l'étape en cours, et une *logique de commande* faite de
portes, qui en déduit à chaque instant la valeur de tous les signaux. Elle fait
exactement ce que vous faisiez à la main au TP 3.

```{figure} images/sequenceur_schema.svg
:width: 95%
:alt: Schéma de l'unité de commande : le registre d'instruction envoie l'opcode à un bloc bleu "Logique de commande (portes ET, OU, NON)", qui reçoit aussi par le bas les étapes T1 et T2 venant de la chaîne horloge, compteur d'étapes, décodeur. À droite, trois signaux de commande sortent de la logique, "LD RI, LD Rd", "LD sortie" et "incrémenter pc", vers une boîte "pc, RI, registres, sortie"
:align: center

La logique de commande combine l'opcode et l'étape courante pour produire les
signaux de commande.
```

### Le compteur d'étapes
Pour connaître l'étape en cours, l'unité de commande utilise un compteur de
**1 bit**, suivi d'un *décodeur 1 vers 2*. Rappel : un *Décodeur* a une entrée et
des sorties numérotées `0`, `1`... ; seule la sortie dont le numéro est la valeur
de l'entrée vaut `1`. Ici, sa sortie `0` vaut `1` pendant `T1`, sa sortie `1`
pendant `T2`. À chaque front montant, on passe à l'autre étape :
`T1`, `T2`, `T1`, `T2`... Chaque instruction dure donc toujours **2 étapes**.
(On pourrait se passer du décodeur : `T2` est la sortie du compteur, et `T1` son
inverse, avec une porte `NON`. Le décodeur fait exactement cela, et il resterait
valable avec plus de deux étapes.)

Faites avancer l'horloge ci-dessous et regardez la ligne allumée passer de `T1` à
`T2`, puis revenir à `T1`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciBkJ8OpdGFwZXMiLCJvIjoiRmFpdGVzIGF2YW5jZXIgbCdob3Jsb2dlIDogbGUgY29tcHRldXIgZCfDqXRhcGVzICgxIGJpdCkgY29tcHRlIDAsIDEsIDAsIDEuLi4sIGV0IGxlIGTDqWNvZGV1ciBhbGx1bWUgdW5lIHNldWxlIGxpZ25lIMOgIGxhIGZvaXMgOiBUMSwgcHVpcyBUMiwgcHVpcyBkZSBub3V2ZWF1IFQxLiAncmVzZXQnIChyZWxpw6kgw6AgTEQpIHJhbcOobmUgw6AgbCfDqXRhcGUgVDEuIiwicyI6W10sImEiOltdLCJpIjpbXSwidSI6W10sImsiOiJub25lIiwiciI6W10sImwiOjEsImMiOnsidmVyc2lvbiI6MiwibmFtZSI6ImNpcmN1aXQiLCJjb21wb25lbnRzIjpbeyJpZCI6IkVOIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjQwLCJzdGF0ZSI6eyJ2YWx1ZSI6MX0sImxhYmVsIjoiZW4ifSx7ImlkIjoiY2xrIiwidHlwZSI6IkNMT0NLIiwieCI6NDAsInkiOjE0MCwibGFiZWwiOiJob3Jsb2dlIn0seyJpZCI6IlJTVCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoyNDAsInN0YXRlIjp7InZhbHVlIjowfSwibGFiZWwiOiJyZXNldCJ9LHsiaWQiOiJjbnQiLCJ0eXBlIjoiQ09VTlRFUiIsIngiOjIwMCwieSI6MTEwLCJzdGF0ZSI6eyJ3aWR0aCI6MX19LHsiaWQiOiJkZWMiLCJ0eXBlIjoiREVDT0RFUiIsIngiOjQyMCwieSI6MTIwLCJzdGF0ZSI6eyJ3aWR0aCI6MX19LHsiaWQiOiJUMSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo2MDAsInkiOjExMCwibGFiZWwiOiJUMSJ9LHsiaWQiOiJUMiIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo2MDAsInkiOjE5MCwibGFiZWwiOiJUMiJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiRU4iLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkVOIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbGsiLCJwb3J0IjoiQ0xLIn0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkNMSyJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiUlNUIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImNudCIsInBvcnQiOiJMRCJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IlEifSwidG8iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0IjoiaW4ifX0seyJpZCI6Inc1IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJvdXQwIn0sInRvIjp7ImNvbXBvbmVudElkIjoiVDEiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3NiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0Ijoib3V0MSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlQyIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 340px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un compteur d'étapes de 1 bit dont le décodeur allume T1 et T2 l'une après l'autre
```

### TP 4 : le compteur d'étapes
1.  **Le compteur.** Placez un compteur de **1 bit** nommé `compteur d'étapes`.
    Reliez son `CLK` à l'horloge et son `LD` à l'entrée `reset` (la même que pour
    le `pc` : un `reset` remet les deux compteurs à `0`). Ajoutez une entrée
    `avancer`, reliée à son entrée `EN`, et mettez-la à `1`.
2.  **Le décodeur.** Placez un *Décodeur* de *Largeur d'entrée* 1 bit (1 vers 2)
    sur la sortie du compteur : sa sortie `0` est `T1`, sa sortie `1` est `T2`.
    Ajoutez deux sorties (lampes) nommées `T1` et `T2` sur ces deux fils, comme
    dans la démo : vous verrez l'étape en cours.
3.  **Un premier signal automatique.** Pendant `T1`, on charge **toujours** `RI` :
    `LD RI = T1`. Reliez donc la sortie `T1` du décodeur à l'entrée `LD` de `RI`,
    et supprimez l'interrupteur `LD RI`.
4.  **Vérifiez.** Faites un `reset` : `T1` est allumée. À chaque front montant,
    `T1` et `T2` s'allument tour à tour. Relancez le programme comme au TP 3, en
    ne réglant plus que `incrémenter pc`, `LD Rd` et `LD sortie` : au 8e front
    montant, le registre de sortie affiche `0000 1111`, comme au TP 3.

````{solution}
Circuit corrigé : {download}`tp_processeur_4.json <solutions/tp_processeur_4.json>`. Dans Logix, ouvrez-le avec le bouton *Charger un JSON* (flèche vers le haut).

- `compteur d'étapes` (compteur 1 bit) : `EN` ← `avancer`, `LD` ← `reset`,
  `CLK` ← horloge, sortie → décodeur 1 vers 2.
- Sortie `0` du décodeur (`T1`) → `LD` de `RI` et lampe `T1` ; sortie `1`
  (`T2`) → lampe `T2`.
````

### Quand chaque signal vaut-il 1 ?
Il reste à remplacer vos trois derniers interrupteurs, et l'entrée `avancer`, par
des portes. Pour cela, l'unité de commande doit reconnaître l'instruction. Un
autre décodeur, 4 vers 16 cette fois, transforme l'opcode en une ligne par
instruction. Pour les quatre instructions de calcul, le bit `calcul` suffit :

| opcode | instruction | ligne utilisée |
| :----: | :---------- | :------------- |
| `0000` | `STOP` | sortie `0` du décodeur : `STOP` |
| `0001` | `LOAD Rd, valeur` | sortie `1` : `LOAD` |
| `0010` | `OUT Rd` | sortie `2` : `OUT` |
| `0100` à `0111` | `ADD`, `SUB`, `AND`, `OR` | bit `6` de `RI` : `calcul` |

Il suffit ensuite de relire le tableau des signaux de chaque étape **signal par
signal**. Par
exemple, incrémenter `pc` vaut `1` à l'étape `T1`, et aussi à l'étape `T2` quand
l'instruction est `LOAD` : on l'écrit `T1 OU (LOAD ET T2)`. Voici tous les
signaux :

| signal | relié à | vaut `1` quand |
| :----- | :------ | :------------- |
| `LD RI` | `LD` du registre d'instruction | `T1` (déjà fait au TP 4) |
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
- Le dernier signal arrête le processeur : à l'étape `T2` d'un `STOP`, l'entrée
  `EN` du compteur d'étapes passe à `0`. Le compteur reste alors bloqué sur `T2` :
  plus rien ne bouge, le processeur est figé. Pourquoi pas simplement
  NON `STOP` ? Parce qu'au départ, `RI` contient `0000 0000`, c'est-à-dire `STOP` :
  le compteur d'étapes ne démarrerait jamais ! En testant aussi `T2`, le premier
  `T1` peut se dérouler et aller chercher la vraie première instruction.

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
2. Le bit de droite de `op` doit valoir `0` pour `ADD` et `1` pour `SUB` : c'est
   exactement le bit `4` de l'opcode, un simple fil. Le bit de gauche doit valoir
   `0` : il faut un fusionneur pour coller un `0` devant le bit `4`. Pour `src`,
   il faut `1` pour `ADD` et `SUB`, et `0` pour `LOAD` : le bit `5` de l'opcode
   convient, car `ADD` et `SUB` sont les seules instructions dont il vaut `1`.
   (On peut aussi utiliser le décodeur d'opcode : `op` à droite = `SUB` et
   `src` = `ADD` OU `SUB`, mais cela coûte une porte.)
3. On s'en sort encore avec des fils, mais il faut un fusionneur et des astuces
   propres à ces deux instructions : en ajoutant `AND` et `OR` à ce jeu, elles ne
   marcheraient plus. Notre jeu, lui, choisit des opcodes `01xx` dont les deux
   derniers bits sont le code de l'ALU : `op` et `src` sont de simples fils, et
   les quatre opérations de l'ALU deviennent des instructions sans rien ajouter à
   l'unité de commande. Les concepteurs de vrais processeurs choisissent leurs
   opcodes de la même façon, pour simplifier le décodage.
````

### TP 5 : l'unité de commande
1.  **Reconnaître l'instruction.** Placez un *Décodeur* de *Largeur d'entrée*
    4 bits (4 vers 16) sur la *Tranche* `opcode` : ses sorties `0`, `1` et `2` sont
    les lignes `STOP`, `LOAD` et `OUT`. Placez-le loin du décodeur d'étapes : les
    deux ont des sorties `0`, `1`... faciles à confondre. Des lampes `STOP`,
    `LOAD` et `OUT` peuvent aider.
2.  **La logique de commande.** Avec des portes `ET`, `OU` et `NON` (*AND*, *OR*
    et *NOT* dans la palette), construisez
    les quatre signaux qui restent dans le tableau ci-dessus : incrémenter `pc`,
    `LD Rd`, `LD sortie` et avancer les étapes. Il vous faut en tout 4 portes
    `ET`, 2 portes `OU` et 1 porte `NON`. Reliez chaque signal **là où arrivait
    son interrupteur** (`LD Rd` va donc sur les quatre portes `ET` du banc), puis
    supprimez cet interrupteur.
3.  **Lancez le programme.** Mettez `reset` à `1`, puis à `0`. Faites ensuite
    avancer l'horloge à la main, sans toucher à rien d'autre, et vérifiez (en
    comptant les fronts montants depuis le `reset`) :

    - au 1er front montant, `T2` s'allume, `RI` vaut `0001 0000` et `pc` vaut
      `0001` ;
    - au 2e, `r0` vaut `0000 1101` ;
    - au 4e, `r1` vaut `0000 0010` ;
    - au 6e, `r0` vaut `0000 1111` ;
    - au 8e, le registre de sortie montre `0000 1111` ;
    - ensuite, le processeur se fige sur `STOP` : `T2` reste allumée, `pc` reste
      à `0111`, plus rien ne change.

    Si `r0` reste à `0` au 2e front, vérifiez `LD Rd` ; si `RI` ne change jamais,
    vérifiez le fil `T1` → `LD` de `RI` ; si le processeur ne démarre pas,
    vérifiez avancer les étapes.
4.  **Enregistrez** votre processeur. Vous venez de construire un ordinateur.

````{solution}
Circuit corrigé : {download}`tp_processeur.json <solutions/tp_processeur.json>`. Dans Logix, ouvrez-le avec le bouton *Charger un JSON* (flèche vers le haut).
Mettez `reset` à `1` puis à `0`, puis cliquez sur l'horloge : le registre de
sortie montre `0000 1111` au 8e front montant.

L'unité de commande (4 portes `ET`, 2 portes `OU`, 1 porte `NON`) :

| signal | portes |
| :----- | :----- |
| incrémenter `pc` | `T1` OU (`LOAD` ET `T2`) |
| `LD Rd` | (`calcul` OU `LOAD`) ET `T2` |
| `LD sortie` | `OUT` ET `T2` |
| avancer les étapes | NON (`STOP` ET `T2`) |

`LD RI` est relié directement à `T1`, `op` vient de la *Tranche* bits 5 et 4 de
`RI`, et `calcul` (la *Tranche* bit 6) commande directement le mux d'écriture.
````

```{important}
- Une instruction se déroule en deux étapes, une par front montant : chercher
  (`T1`), puis exécuter (`T2`). Le décodage, lui, se fait en continu.
- L'unité de commande combine l'**opcode** et l'**étape** courante pour produire
  chaque signal de commande : elle n'est faite que d'un compteur d'étapes, de
  décodeurs et de quelques portes `ET`, `OU` et `NON`.
```
