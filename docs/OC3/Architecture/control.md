<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# L'unité de commande

Aux TP précédents, vous avez construit l'ALU, le banc de registres et la mémoire,
qui contient déjà un petit programme. Mais c'est vous qui actionniez tout à la
main : vous choisissiez `Rd` et `Rs`, vous mettiez `LD` à `1`, vous changiez
l'adresse de la mémoire... Pour que le processeur exécute son programme **tout
seul**, il faut remplacer ces interrupteurs par des circuits.

Nous allons y arriver pas à pas, en alternant théorie et pratique dans Logix :

1. **Chercher les instructions** : le compteur de programme `pc` (en anglais *program
   counter*, TP 1), puis le registre d'instruction (TP 2).
2. **Exécuter les instructions** : les deux étapes d'une instruction, le
   multiplexeur d'écriture et le registre de sortie. Vous ferez alors tourner le
   programme **à la main**, en jouant vous-même le rôle de l'unité de commande
   (TP 3).
3. **Automatiser** : l'*unité de commande*, qui remplacera vos interrupteurs
   (TP 4).

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
| unité de commande | produit les signaux de commande | *Décodeur* et portes | TP 4 |

Pas d'inquiétude si certains noms de la figure (`T1`, `T2`, `src`, lecture `Rd`...)
sont encore inconnus : chacun est expliqué plus bas, au moment où l'on en a besoin.

## Partie 1 : chercher les instructions

### Le compteur de programme
Pour exécuter le programme, le processeur doit lire les cases de la mémoire **l'une
après l'autre**. Jusqu'ici, c'est vous qui changiez l'adresse ; désormais, ce sera
le *compteur de programme* (`pc`, de l'anglais *program counter*).
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

Une fois l'instruction dans `RI`, il reste à la découper en ses trois champs
(opcode, `Rd` et `Rs`, voir le chapitre précédent). C'est le rôle du composant
*Tranche* : il a une entrée (le mot complet) et une sortie (un champ de ce mot). Dans ses propriétés, *Bit haut* et
*Bit bas* donnent les numéros du premier et du dernier bit du champ, le bit `0`
étant celui de droite. Trois *Tranches* extraient l'opcode (bits `7` à `4`), `Rd`
(bits `3` et `2`) et `Rs` (bits `1` et `0`).

```{figure} images/instruction_format.svg
:width: 60%
:alt: Une instruction de 8 bits découpée en trois champs : opcode 0100 (4 bits), Rd 00 (2 bits) et Rs 01 (2 bits), qui se décode en "ADD r0, r1 : r0 reçoit r0 + r1"
:align: center

Les trois champs d'une instruction, rappel du chapitre précédent.
```

Changez l'instruction ci-dessous et regardez les trois *Tranches* faire
apparaître ses champs.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBkw6ljb2RlciB1bmUgaW5zdHJ1Y3Rpb24iLCJvIjoiQ2hhbmdleiBsYSB2YWxldXIgZGUgbCdpbnN0cnVjdGlvbiAoOCBiaXRzKSA6IGxlIGNvbXBvc2FudCBTTElDRSBlbiBleHRyYWl0IGxlcyB0cm9pcyBjaGFtcHMsIGwnb3Bjb2RlIChiaXRzIDcgw6AgNCksIFJkIChiaXRzIDMgZXQgMikgZXQgUnMgKGJpdHMgMSBldCAwKS4gRXNzYXlleiAwMTAwMDAwMSAoQUREIHIwLCByMSkgOiBvcGNvZGUgPSAwMTAwLCBSZCA9IDAwLCBScyA9IDAxLiIsInMiOltdLCJhIjpbXSwiaSI6W10sInUiOltdLCJrIjoibm9uZSIsInIiOltdLCJsIjoxLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJJIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjEyMCwic3RhdGUiOnsid2lkdGgiOjgsInZhbHVlIjo2NX0sImxhYmVsIjoiaW5zdHJ1Y3Rpb24ifSx7ImlkIjoib3AiLCJ0eXBlIjoiU0xJQ0UiLCJ4IjoyNjAsInkiOjQwLCJzdGF0ZSI6eyJ3aWR0aCI6OCwiaGkiOjcsImxvIjo0fX0seyJpZCI6InJkIiwidHlwZSI6IlNMSUNFIiwieCI6MjYwLCJ5IjoxMjAsInN0YXRlIjp7IndpZHRoIjo4LCJoaSI6MywibG8iOjJ9fSx7ImlkIjoicnMiLCJ0eXBlIjoiU0xJQ0UiLCJ4IjoyNjAsInkiOjIwMCwic3RhdGUiOnsid2lkdGgiOjgsImhpIjoxLCJsbyI6MH19LHsiaWQiOiJvbyIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0NDAsInkiOjYwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoib3Bjb2RlIn0seyJpZCI6Im9kIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQ0MCwieSI6MTQwLCJzdGF0ZSI6eyJ3aWR0aCI6Mn0sImxhYmVsIjoiUmQifSx7ImlkIjoib3MiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDQwLCJ5IjoyMjAsInN0YXRlIjp7IndpZHRoIjoyfSwibGFiZWwiOiJScyJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiSSIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJvcCIsInBvcnQiOiJpbiJ9fSx7ImlkIjoidzIiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiSSIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJyZCIsInBvcnQiOiJpbiJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiSSIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJycyIsInBvcnQiOiJpbiJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoib3AiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoib28iLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3NSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJyZCIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJvZCIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc2IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6InJzIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6Im9zIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 320px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : trois composants Tranche extraient l'opcode, Rd et Rs d'une instruction
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
    ne servira qu'au TP 4.
4.  **Vérifiez.** Faites un `reset`, puis mettez `incrémenter pc` et `LD RI` à
    `1`. Au premier front montant, `RI` capture `0001 0000` (`LOAD r0`) et le
    `pc` passe à `0001`. Faites un deuxième front montant : `RI` capture
    `0000 1101`... qui n'est pas une instruction, mais la valeur `13` ! Il faudra
    donc mettre `LD RI` à `1` **au bon moment** : c'est le sujet de la partie
    suivante.

````{solution}
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
| `T2` | `STOP` | aucun : il ne se passe rien |

`LOAD` demande un peu d'attention : sa valeur se trouve dans la case **suivante**
de la mémoire. Or, pendant `T2`, le `pc` pointe justement déjà sur cette case :
la RAM présente la valeur, le multiplexeur d'écriture la laisse passer
(`src = 0`) et `Rd` la capture. Au même front, le `pc` avance encore, pour passer
par-dessus la valeur.

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
montant, il faut les régler selon l'étape et l'instruction en cours. Le tableau
ci-dessous applique le tableau des signaux de chaque étape au programme de votre
RAM. Chaque ligne donne les réglages **pendant** l'étape : ils agissent au front
montant qui la termine. La colonne *instruction* indique l'instruction traitée ; pendant `T1`,
c'est celle qu'on va chercher (`RI` contient encore la précédente).

| front | étape | instruction | incrémenter `pc` | `LD RI` | `LD Rd` | `LD sortie` |
| :---: | :---: | :---------- | :--------------: | :-----: | :-----: | :---------: |
| 1 | `T1` | `LOAD r0, 13` | `1` | `1` | `0` | `0` |
| 2 | `T2` | `LOAD r0, 13` | `1` | `0` | `1` | `0` |
| 3 | `T1` | `LOAD r1, 2` | `1` | `1` | `0` | `0` |
| 4 | `T2` | `LOAD r1, 2` | `1` | `0` | `1` | `0` |
| 5 | `T1` | `ADD r0, r1` | `1` | `1` | `0` | `0` |
| 6 | `T2` | `ADD r0, r1` | `0` | `0` | `1` | `0` |
| 7 | `T1` | `OUT r0` | `1` | `1` | `0` | `0` |
| 8 | `T2` | `OUT r0` | `0` | `0` | `0` | `1` |

5.  **Lancez le programme à la main.** Faites un `reset`. Puis, pour chaque ligne
    du tableau, réglez les quatre interrupteurs et faites **un** front montant.
    Vérifiez au passage : après le 2e front, `r0` vaut `0000 1101` ; après le
    4e, `r1` vaut `0000 0010` ; après le 6e, `r0` vaut `0000 1111` ; après le
    8e, le registre de sortie affiche `0000 1111`, soit `15`.

````{solution}
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
Jouer l'unité de commande, c'est fastidieux : il est temps de la construire. Elle
fait exactement ce que vous faisiez à la main au TP 3 : à partir de l'**étape** en
cours et de l'**opcode** de l'instruction (dans `RI`), elle calcule chaque signal
avec quelques portes.

```{figure} images/sequenceur_schema.svg
:width: 95%
:alt: Schéma de l'unité de commande : le registre d'instruction envoie l'opcode à un bloc bleu "Logique de commande (portes ET, OU)", qui reçoit aussi par le bas les étapes T1 et T2 venant de la chaîne horloge, compteur d'étapes, décodeur. À droite, trois signaux de commande sortent de la logique, "LD RI, LD Rd", "LD sortie" et "incrémenter pc", vers une boîte "pc, RI, registres, sortie"
:align: center

La logique de commande combine l'opcode et l'étape courante pour produire les
signaux de commande.
```

**L'étape en cours.** Un compteur de **1 bit** (*Compteur N-bit* réglé sur 1 bit),
suivi d'un *Décodeur* 1 vers 2, suffit. Rappel : un *Décodeur* a une entrée et des
sorties numérotées `0`, `1`... ; seule la sortie dont le numéro est la valeur de
l'entrée vaut `1`. Ici, la sortie `0` vaut `1` pendant `T1`, la sortie `1` pendant
`T2`, et chaque front montant fait passer à l'autre étape. Faites avancer
l'horloge ci-dessous pour le voir.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciBkJ8OpdGFwZXMiLCJvIjoiRmFpdGVzIGF2YW5jZXIgbCdob3Jsb2dlIDogbGUgY29tcHRldXIgZCfDqXRhcGVzICgxIGJpdCkgY29tcHRlIDAsIDEsIDAsIDEuLi4sIGV0IGxlIGTDqWNvZGV1ciBhbGx1bWUgdW5lIHNldWxlIGxpZ25lIMOgIGxhIGZvaXMgOiBUMSwgcHVpcyBUMiwgcHVpcyBkZSBub3V2ZWF1IFQxLiAncmVzZXQnIChyZWxpw6kgw6AgTEQpIHJhbcOobmUgw6AgbCfDqXRhcGUgVDEuIiwicyI6W10sImEiOltdLCJpIjpbXSwidSI6W10sImsiOiJub25lIiwiciI6W10sImwiOjEsImMiOnsidmVyc2lvbiI6MiwibmFtZSI6ImNpcmN1aXQiLCJjb21wb25lbnRzIjpbeyJpZCI6IkVOIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjQwLCJzdGF0ZSI6eyJ2YWx1ZSI6MX0sImxhYmVsIjoiZW4ifSx7ImlkIjoiY2xrIiwidHlwZSI6IkNMT0NLIiwieCI6NDAsInkiOjE0MCwibGFiZWwiOiJob3Jsb2dlIn0seyJpZCI6IlJTVCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoyNDAsInN0YXRlIjp7InZhbHVlIjowfSwibGFiZWwiOiJyZXNldCJ9LHsiaWQiOiJjbnQiLCJ0eXBlIjoiQ09VTlRFUiIsIngiOjIwMCwieSI6MTEwLCJzdGF0ZSI6eyJ3aWR0aCI6MX19LHsiaWQiOiJkZWMiLCJ0eXBlIjoiREVDT0RFUiIsIngiOjQyMCwieSI6MTIwLCJzdGF0ZSI6eyJ3aWR0aCI6MX19LHsiaWQiOiJUMSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo2MDAsInkiOjExMCwibGFiZWwiOiJUMSJ9LHsiaWQiOiJUMiIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo2MDAsInkiOjE5MCwibGFiZWwiOiJUMiJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiRU4iLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkVOIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbGsiLCJwb3J0IjoiQ0xLIn0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkNMSyJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiUlNUIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImNudCIsInBvcnQiOiJMRCJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IlEifSwidG8iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0IjoiaW4ifX0seyJpZCI6Inc1IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImRlYyIsInBvcnQiOiJvdXQwIn0sInRvIjp7ImNvbXBvbmVudElkIjoiVDEiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3NiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJkZWMiLCJwb3J0Ijoib3V0MSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlQyIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 340px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un compteur d'étapes de 1 bit dont le décodeur allume T1 et T2 l'une après l'autre
```

**L'instruction.** Un second *Décodeur*, 4 vers 16, transforme l'opcode en une
ligne par instruction ; pour les quatre instructions de calcul, le bit `calcul`
suffit :

| opcode | instruction | ligne utilisée |
| :----: | :---------- | :------------- |
| `0001` | `LOAD Rd, valeur` | sortie `1` du décodeur : `LOAD` |
| `0010` | `OUT Rd` | sortie `2` : `OUT` |
| `0100` à `0111` | `ADD`, `SUB`, `AND`, `OR` | bit `6` de `RI` : `calcul` |

**Les signaux.** Il suffit de relire le tableau des signaux de chaque étape,
signal par signal. Par exemple, incrémenter `pc` vaut `1` à l'étape `T1`, et aussi
à l'étape `T2` quand l'instruction est `LOAD` : `T1 OU (LOAD ET T2)`. Un signal qui
dépend de l'instruction teste toujours aussi `T2`, car pendant `T1`, `RI` contient
encore l'instruction précédente.

| signal | relié à | vaut `1` quand |
| :----- | :------ | :------------- |
| `LD RI` | `LD` du registre d'instruction | `T1` (un simple fil) |
| incrémenter `pc` | `EN` du compteur de programme | `T1` OU (`LOAD` ET `T2`) |
| `LD Rd` | `LD` du banc de registres | (`calcul` OU `LOAD`) ET `T2` |
| `LD sortie` | `LD` du registre de sortie | `OUT` ET `T2` |
| `src` | sélection du multiplexeur d'écriture | `calcul` (aucune porte) |
| `op` | `op` de l'ALU | bits `5` et `4` de `RI` (aucune porte) |

### TP 4 : l'unité de commande
1.  **Le compteur d'étapes.** Placez un *Compteur N-bit* de **1 bit** nommé
    `compteur d'étapes` : `CLK` ← horloge, `LD` ← `reset` (un `reset` remet ainsi
    les deux compteurs à `0`), `EN` ← une nouvelle entrée `avancer`, mise à `1`.
    Ajoutez un *Décodeur* de *Largeur d'entrée* 1 bit sur sa sortie : sortie `0`
    = `T1`, sortie `1` = `T2`. Deux lampes (*Sortie*) `T1` et `T2` permettent de
    voir l'étape.
2.  **Le décodeur d'opcode.** Placez un *Décodeur* de *Largeur d'entrée* 4 bits
    sur la *Tranche* `opcode` : sa sortie `1` est `LOAD`, sa sortie `2` est `OUT`.
    Placez-le loin du décodeur d'étapes, pour ne pas confondre leurs sorties.
3.  **Les signaux.** Construisez chaque signal avec des portes (3 *AND* et 2 *OR*
    en tout), reliez-le **là où arrivait son interrupteur**, puis supprimez
    l'interrupteur :

    - `LD RI` = `T1` (un simple fil) ;
    - incrémenter `pc` = `T1` OU (`LOAD` ET `T2`) ;
    - `LD Rd` = (`calcul` OU `LOAD`) ET `T2` (vers les quatre portes `ET` du banc) ;
    - `LD sortie` = `OUT` ET `T2`.

4.  **Lancez le programme.** Faites un `reset`, puis avancez l'horloge sans
    toucher à rien d'autre, et vérifiez :

    - au 1er front montant, `T2` s'allume, `RI` vaut `0001 0000` et `pc` vaut
      `0001` ;
    - au 2e, `r0` vaut `0000 1101` ;
    - au 4e, `r1` vaut `0000 0010` ;
    - au 6e, `r0` vaut `0000 1111` ;
    - au 8e, le registre de sortie montre `0000 1111`.

    Si `r0` reste à `0` au 2e front, vérifiez `LD Rd` ; si `RI` ne change jamais,
    vérifiez le fil `T1` → `LD` de `RI` ; si `T1` et `T2` n'alternent
    pas, vérifiez que `avancer` vaut `1`.
5.  **Enregistrez** votre processeur. Vous venez de construire un ordinateur.

````{solution}
Circuit corrigé : {download}`tp_processeur.json <solutions/tp_processeur.json>`. Dans Logix, ouvrez-le avec le bouton *Charger un JSON* (flèche vers le haut).
Mettez `reset` à `1` puis à `0`, puis cliquez sur l'horloge : le registre de
sortie montre `0000 1111` au 8e front montant.

L'unité de commande (3 portes `ET`, 2 portes `OU`) :

| signal | portes |
| :----- | :----- |
| incrémenter `pc` | `T1` OU (`LOAD` ET `T2`) |
| `LD Rd` | (`calcul` OU `LOAD`) ET `T2` |
| `LD sortie` | `OUT` ET `T2` |

`LD RI` est relié directement à `T1`, `op` vient de la *Tranche* bits 5 et 4 de
`RI`, et `calcul` (la *Tranche* bit 6) commande directement le mux d'écriture.
````
