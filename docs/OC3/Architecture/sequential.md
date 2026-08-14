<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Circuits séquentiels

## Se souvenir d'un bit
Jusqu'ici, tous nos circuits étaient *combinatoires* : leur sortie ne dépend que
de la valeur des entrées à l'instant présent. Un additionneur ou un multiplexeur
oublient tout dès qu'on change leurs entrées, ils n'ont aucun passé. C'est
parfait pour calculer, mais un ordinateur doit aussi **retenir** des informations : le
contenu d'une case mémoire, un résultat en attente d'être réutilisé, le nombre de
tours déjà effectués dans une boucle, etc. Il nous faut donc une nouvelle famille de
circuits, capables de se souvenir d'une valeur même quand les entrées changent ou
disparaissent.

On appelle ces circuits des circuits *séquentiels* : leur sortie dépend non
seulement des entrées du moment, mais aussi de ce qui s'est passé avant,
c'est-à-dire de leur **état**. Ce sont eux qui serviront de brique de base aux
*registres*, de petites mémoires internes au processeur.

L'ingrédient qui rend cette mémoire possible dans nos circuits logiques est la *rétroaction* (ou *feedback*). Il s'agit
d'un fil qui **reboucle une sortie vers une entrée du même circuit**. Dans un
circuit combinatoire, l'information circulait toujours dans un seul sens, des
entrées vers la sortie. Avec la rétroaction, la sortie peut désormais influencer sa propre entrée.

Voici ci-dessous un circuit séquentiel très simple. La sortie de la porte OU est réingurgitée dans l'une de ses entrées. Quel effet ce branchement a-t-il sur le bit de sortie ?

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQ2lyY3VpdCBzw6lxdWVudGllbCBPVSIsIm8iOiIiLCJzIjpbXSwiYSI6WyJJTlBVVCIsIk9VVFBVVCJdLCJpIjpbWyJBIiwxXV0sInUiOltbIlMiLDFdXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiTm91dmVhdSBjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJjX21zcmM2ZTlsMmJ6YyIsInR5cGUiOiJJTlBVVCIsIngiOjYwLCJ5Ijo4MCwic3RhdGUiOnsidmFsdWUiOjAsIndpZHRoIjoxLCJsYWJlbCI6IiJ9LCJsYWJlbCI6IkEifSx7ImlkIjoiY19tc3JjNm16NnBwZTUiLCJ0eXBlIjoiT1IiLCJ4IjoxNDAsInkiOjgwfSx7ImlkIjoiY19tc3JjeHAybzNpbm4iLCJ0eXBlIjoiT1VUUFVUIiwieCI6MjYwLCJ5Ijo4MCwic3RhdGUiOnsid2lkdGgiOjEsImxhYmVsIjoiIn0sImxhYmVsIjoiUyJ9XSwid2lyZXMiOlt7ImlkIjoid19tc3JjeGg2eGRiaDMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiY19tc3JjNm16NnBwZTUiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY19tc3JjNm16NnBwZTUiLCJwb3J0IjoiaW4xIn19LHsiaWQiOiJ3X21zcmN4bWZ0Ynh4cSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjX21zcmM2ZTlsMmJ6YyIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJjX21zcmM2bXo2cHBlNSIsInBvcnQiOiJpbjAifX0seyJpZCI6IndfbXNyY3h0dnhnc3p4IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNfbXNyYzZtejZwcGU1IiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImNfbXNyY3hwMm8zaW5uIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 320px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un circuit séquentiel avec une porte OR
```


## La bascule SR
Le circuit séquentiel le plus simple s'appelle la *bascule SR* (ou *SR latch*,
"S" pour *set* et "R" pour *reset*). Il se construit avec deux portes *NON-OU*
(ou *NOR*, `¬(a ∨ b)`) dont les sorties sont **croisées** :

```{figure} images/bascule_sr.svg
:width: 80%
:alt: Bascule SR : deux portes NON-OU croisées, avec les entrées R et S à gauche et les sorties Q et non-Q à droite, la sortie de chaque porte revenant sur une entrée de l'autre
:align: center

La bascule SR : deux portes NON-OU dont les sorties sont croisées.
```

Deux entrées commandent ce circuit :

- `S` (*set*, "mettre à 1") : demande de faire passer la mémoire à `1` ;
- `R` (*reset*, "remettre à 0") : demande de faire passer la mémoire à `0`.

Et deux sorties, toujours opposées l'une à l'autre sauf dans un cas particulier :

- `Q` : la valeur retenue par la bascule, celle qui nous intéresse ;
- `¬Q` : son complément, l'inverse de `Q`.

Voici le comportement de ce circuit :

| `S` | `R` | `Q`               | Effet                                   |
| :-: | :-: | :---------------: | :-------------------------------------- |
| `1` | `0` | `1`               | on **met** la mémoire à `1`             |
| `0` | `1` | `0`               | on **efface** la mémoire (remise à `0`) |
| `0` | `0` | valeur précédente | la mémoire **garde** sa valeur          |
| `1` | `1` | interdit          | état incohérent, à éviter               |


Essayez la bascule SR avec le composant de Logix ci-dessous. 


```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsYSBiYXNjdWxlIFNSIiwibyI6IkNsaXF1ZXogUyAobWV0dHJlIMOgIDEpIGV0IFIgKHJlbWV0dHJlIMOgIDApLCBwdWlzIHJlbMOiY2hlei1sZXMgKFM9MCwgUj0wKSA6IGxhIHNvcnRpZSBRIGdhcmRlIHNhIGRlcm5pw6hyZSB2YWxldXIuIFM9Uj0xIGVzdCBsJ8OpdGF0IGludGVyZGl0LiIsInMiOltdLCJhIjpbXSwiaSI6W10sInUiOltdLCJrIjoibm9uZSIsInIiOltdLCJsIjoxLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJTIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjYwLCJzdGF0ZSI6eyJ2YWx1ZSI6MH0sImxhYmVsIjoiUyJ9LHsiaWQiOiJSIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjE4MCwic3RhdGUiOnsidmFsdWUiOjB9LCJsYWJlbCI6IlIifSx7ImlkIjoic3JsIiwidHlwZSI6IlNSTEFUQ0giLCJ4IjoyMjAsInkiOjEwMH0seyJpZCI6IlEiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDIwLCJ5IjoxMjAsImxhYmVsIjoiUSJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiUyIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJzcmwiLCJwb3J0IjoiUyJ9fSx7ImlkIjoidzIiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiUiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJzcmwiLCJwb3J0IjoiUiJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoic3JsIiwicG9ydCI6IlEifSwidG8iOnsiY29tcG9uZW50SWQiOiJRIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 320px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : une bascule SR en fonctionnement
```

## La bascule D
La bascule SR a deux défauts. Premièrement, la
combinaison `S = R = 1` est interdite. Même si elle ne pose pas de problèmes dans le simulateur Logix,  il faut toujours veiller à ne jamais l'envoyer par erreur dans un vrai circuit électrique. Le deuxième problème est plus subtil : rien dans ce circuit ne permet de synchroniser le changement de données avec d'autres bascules SR. Dans la mémoire d'un processeur, cela est primordial.

La *bascule D* (D pour *data*) corrige ces deux défauts. Le bit d'entrée
`D` commande le *set* et le *reset* : la combinaison interdite `S = R = 1` ne peut jamais
se produire. Elle ne possède plus qu'une seule entrée de donnée, `D`, accompagnée
d'une seconde entrée un peu particulière : l'**horloge**, notée `clk` (de l'anglais *clock*). Une horloge est
un signal qui bat régulièrement, en alternant entre `0` et `1`, un peu comme le
tic-tac d'une horloge murale ou le métronome qui donne la mesure à tout un
orchestre. Lorsque l'horloge passe de `0` à `1`, on parle d'un **flanc montant**.

```{figure} images/bascule_d.svg
:width: 55%
:alt: Symbole de la bascule D : une entrée de donnée D à gauche, une entrée d'horloge clk marquée d'un petit triangle, et les sorties Q et non-Q à droite
:align: center

Le symbole de la bascule D : la donnée `D`, l'horloge `clk` (petit triangle), et
la sortie `Q`.
```

Le comportement de la bascule D tient en une phrase : sur le moment exact de chaque flanc montant de `clk`, la valeur de `D` est recopiée dans `Q`. Entre deux flancs montants, `Q` conserve sa valeur. Vous pouvez voir la bascule D comme une sorte d'appareil photo : même si l'image devant l'objectif change, on ne capture l'image que pile lorsqu'on appuie sur le déclencheur.

| `D`        | Flanc montant          | `Q`             |
| :--------: | :---------------------: | :-------------: |
| `0` ou `1` | non | garde sa valeur |
| `0`        | oui                     | `0`             |
| `1`        | oui                     | `1`             |



```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsYSBiYXNjdWxlIEQgZXQgc29uIGhvcmxvZ2UiLCJvIjoiUsOpZ2xleiBsYSBkb25uw6llIEQsIHB1aXMgZmFpdGVzIGF2YW5jZXIgbCdob3Jsb2dlIChjbGlxdWV6IGRlc3N1cyBwb3VyIHByb2R1aXJlIHVuIHRvcCkuIFEgbmUgcmVjb3BpZSBEIHF1J2F1IG1vbWVudCBkJ3VuIHRvcCA7IGVudHJlIGRldXggdG9wcywgUSBnYXJkZSBzYSB2YWxldXIgbcOqbWUgc2kgRCBjaGFuZ2UuIiwicyI6W10sImEiOltdLCJpIjpbXSwidSI6W10sImsiOiJub25lIiwiciI6W10sImwiOjEsImMiOnsidmVyc2lvbiI6MiwibmFtZSI6ImNpcmN1aXQiLCJjb21wb25lbnRzIjpbeyJpZCI6IkQiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6NjAsInN0YXRlIjp7InZhbHVlIjoxfSwibGFiZWwiOiJEIn0seyJpZCI6ImNsayIsInR5cGUiOiJDTE9DSyIsIngiOjQwLCJ5IjoxODAsImxhYmVsIjoiaG9ybG9nZSJ9LHsiaWQiOiJkZmYiLCJ0eXBlIjoiREZGIiwieCI6MjIwLCJ5IjoxMDB9LHsiaWQiOiJRIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQ0MCwieSI6MTIwLCJsYWJlbCI6IlEifV0sIndpcmVzIjpbeyJpZCI6IncxIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IkQiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiZGZmIiwicG9ydCI6IkQifX0seyJpZCI6IncyIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNsayIsInBvcnQiOiJDTEsifSwidG8iOnsiY29tcG9uZW50SWQiOiJkZmYiLCJwb3J0IjoiQ0xLIn19LHsiaWQiOiJ3MyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJkZmYiLCJwb3J0IjoiUSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlEiLCJwb3J0IjoiaW4wIn19XSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 340px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : une bascule D rythmée par une horloge
```

## Exercices

### Exercice {num1}`exercice`
Un boîtier d'alarme de voiture est commandé par une bascule SR : le bouton `S`
**arme** l'alarme (`Q = 1` signifie "alarme active"), le bouton `R` la
**désarme**. Quand aucun des deux boutons n'est pressé (`S = 0`, `R = 0`),
l'alarme garde son état précédent : c'est la **mémoire** de la bascule.

Voici, étape par étape, l'état des boutons. Au départ, avant l'étape 1, l'alarme
est désactivée : `Q = 0`. Complétez la valeur de `Q` après chaque étape.

```{role} bit(quiz-select)
:options: |
: 0
: 1
```

```{quiz}
:style: max-width: 22rem;
| étape | `S` | `R` | `Q`      |
| :---: | :-: | :-: | :------: |
| 1     | `1` | `0` | {bit}`1` |
| 2     | `0` | `0` | {bit}`1` |
| 3     | `0` | `1` | {bit}`0` |
| 4     | `0` | `0` | {bit}`0` |
| 5     | `1` | `0` | {bit}`1` |
| 6     | `0` | `0` | {bit}`1` |
```

### Exercice {num1}`exercice`
Le même boîtier envoie l'état d'une porte à un petit écran, cette fois avec une
**bascule D**. Une horloge interne génère un **top** toutes les secondes ; à
chaque top, la bascule recopie sur `Q` la valeur qui se trouvait sur son entrée
`D` juste avant (`D = 1` signifie "porte ouverte"). Entre deux tops, `Q` reste
inchangé, même si `D` varie.

Voici la valeur de `D` mesurée juste avant chacun des six tops. Au départ, avant
le premier top, l'écran affiche `Q = 0`. Complétez `Q` après chaque top.

```{quiz}
:style: max-width: 22rem;
| top | `D` | `Q`      |
| :-: | :-: | :------: |
| 1   | `1` | {bit}`1` |
| 2   | `0` | {bit}`0` |
| 3   | `0` | {bit}`0` |
| 4   | `1` | {bit}`1` |
| 5   | `1` | {bit}`1` |
| 6   | `0` | {bit}`0` |
```

### Exercice {num1}`exercice`

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiUmVjb25zdHJ1aXJlIGxhIGJhc2N1bGUgU1IiLCJvIjoiUmVjb25zdHJ1aXNleiB1bmUgYmFzY3VsZSBTUiBhdmVjIGRldXggcG9ydGVzIE5PTi1PVSBjcm9pc8OpZXMuIFJlbGlleiBSIGV0IHVuZSByw6l0cm9hY3Rpb24gw6AgbGEgcHJlbWnDqHJlIE5PTi1PVSAoc29ydGllIFEpLCBldCBTIGV0IGwnYXV0cmUgcsOpdHJvYWN0aW9uIMOgIGxhIHNlY29uZGUgKHNvcnRpZSDCrFEpIDogbGEgc29ydGllIGRlIGNoYXF1ZSBwb3J0ZSByZXZpZW50IHN1ciB1bmUgZW50csOpZSBkZSBsJ2F1dHJlLiIsInMiOlsiUGxhY2V6IGRldXggcG9ydGVzIE5PTi1PVSAoTk9SKS4iLCJQb3J0ZSBkdSBoYXV0IDogZW50csOpZXMgUiBldCBsYSBzb3J0aWUgZGUgbGEgcG9ydGUgZHUgYmFzIDsgc2Egc29ydGllIGVzdCBRLiIsIlBvcnRlIGR1IGJhcyA6IGVudHLDqWVzIFMgZXQgbGEgc29ydGllIGRlIGxhIHBvcnRlIGR1IGhhdXQgOyBzYSBzb3J0aWUgZXN0IMKsUS4iLCJSZWxpZXogUSBldCDCrFEgYXV4IHNvcnRpZXMuIiwiVGVzdGV6IDogUz0xIG1ldCBRIMOgIDEsIFI9MSBsZSByZW1ldCDDoCAwLCBldCBTPVI9MCBjb25zZXJ2ZSBsYSB2YWxldXIuIl0sImEiOlsiTk9SIl0sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiUyIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo2MCwibGFiZWwiOiJTIn0seyJpZCI6IlIiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6MjAwLCJsYWJlbCI6IlIifSx7ImlkIjoiUSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0NDAsInkiOjYwLCJsYWJlbCI6IlEifSx7ImlkIjoiblEiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDQwLCJ5IjoyMDAsImxhYmVsIjoiwqxRIn1dLCJ3aXJlcyI6W10sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 380px; aspect-ratio: auto; border: 1px solid black;
:title: Exercice Logix : reconstruire une bascule SR avec deux portes NON-OU
```

### Exercice {num1}`exercice`


```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiTcOpbW9yaXNlciBsYSBzb21tZSIsIm8iOiJMZSBjaXJjdWl0IGNpLWRlc3NvdXMgY29udGllbnQgdW4gYWRkaXRpb25uZXVyIDQgYml0cy4gTGVzIDQgYml0cyBkZSBzb21tZSBzb250IHPDqXBhcsOpcyDDoCBzYSBzb3J0aWUuIEZhaXRlcyBlbiBzb3J0ZSBxdWUgY2VzIDQgYml0cyBzb2llbnQgY29ycmVjdGVtZW50IG3DqW1vcmlzw6lzIGRhbnMgTWVtMyBNZW0yIE1lbTEgZXQgTWVtMCBVTklRVUVNRU5UIHN1ciB1biBmbGFuYyBtb250YW50IGRlIGwnaG9ybG9nZSIsInMiOltdLCJhIjpbIklOUFVUIiwiT1VUUFVUIiwiREZGIl0sImkiOltbIkEiLDFdXSwidSI6W1siUyIsMV1dLCJrIjoibm9uZSIsInIiOltdLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJOb3V2ZWF1IGNpcmN1aXQiLCJjb21wb25lbnRzIjpbeyJpZCI6ImNfbXNybXd0M2Ixc2hqIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjIwLCJzdGF0ZSI6eyJ2YWx1ZSI6MCwid2lkdGgiOjQsImxhYmVsIjoiIn0sImxhYmVsIjoiQSJ9LHsiaWQiOiJjX21zcm13eXVsYTR6aiIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo4MCwic3RhdGUiOnsidmFsdWUiOjAsIndpZHRoIjo0LCJsYWJlbCI6IiJ9LCJsYWJlbCI6IkIifSx7ImlkIjoiY19tc3JteDhuZmxhOTkiLCJ0eXBlIjoiQURERVIiLCJ4IjoxODAsInkiOjQwLCJzdGF0ZSI6eyJ3aWR0aCI6NH19LHsiaWQiOiJjX21zcm16OG1raW82dyIsInR5cGUiOiJJTlBVVCIsIngiOjE0MCwieSI6MzYwLCJzdGF0ZSI6eyJ2YWx1ZSI6MCwid2lkdGgiOjEsImxhYmVsIjoiIiwib3JpZW50YXRpb24iOiJ1cCJ9LCJsYWJlbCI6Ik1lbTMifSx7ImlkIjoiY19tc3JuMDUwNXY2bGYiLCJ0eXBlIjoiU1BMSVRURVIiLCJ4IjozNDAsInkiOjgwLCJzdGF0ZSI6eyJ3aWR0aCI6NCwib3JpZW50YXRpb24iOiJkb3duIn19LHsiaWQiOiJjX21zcm4xdzhyMjh1cyIsInR5cGUiOiJDTE9DSyIsIngiOjQwLCJ5IjoyMjAsInN0YXRlIjp7InZhbHVlIjowLCJydW5uaW5nIjpmYWxzZSwiZnJlcSI6MSwibGFzdFRvZ2dsZUF0IjowfX0seyJpZCI6ImNfbXNybjI2Zmx5bDlpIiwidHlwZSI6IklOUFVUIiwieCI6MjQwLCJ5IjozNjAsInN0YXRlIjp7InZhbHVlIjowLCJ3aWR0aCI6MSwibGFiZWwiOiIiLCJvcmllbnRhdGlvbiI6InVwIn0sImxhYmVsIjoiTWVtMiJ9LHsiaWQiOiJjX21zcm4yYWJ6dGtzZiIsInR5cGUiOiJJTlBVVCIsIngiOjM0MCwieSI6MzYwLCJzdGF0ZSI6eyJ2YWx1ZSI6MCwid2lkdGgiOjEsImxhYmVsIjoiIiwib3JpZW50YXRpb24iOiJ1cCJ9LCJsYWJlbCI6Ik1lbTEifSx7ImlkIjoiY19tc3JuMmM5ZHFwYzkiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0NDAsInkiOjM2MCwic3RhdGUiOnsidmFsdWUiOjAsIndpZHRoIjoxLCJsYWJlbCI6IiIsIm9yaWVudGF0aW9uIjoidXAifSwibGFiZWwiOiJNZW0wIn1dLCJ3aXJlcyI6W3siaWQiOiJ3X21zcm14OXd2bHhjZiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjX21zcm13dDNiMXNoaiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJjX21zcm14OG5mbGE5OSIsInBvcnQiOiJBIn19LHsiaWQiOiJ3X21zcm14YmU2OTByNSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjX21zcm13eXVsYTR6aiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJjX21zcm14OG5mbGE5OSIsInBvcnQiOiJCIn19LHsiaWQiOiJ3X21zcm4wazQybTdyMyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjX21zcm14OG5mbGE5OSIsInBvcnQiOiJTIn0sInRvIjp7ImNvbXBvbmVudElkIjoiY19tc3JuMDUwNXY2bGYiLCJwb3J0IjoiaW4ifX1dLCJjdXN0b21EZWZpbml0aW9ucyI6e319fQ&embed=1
:style: height: 600px; aspect-ratio: auto; border: 1px solid black;
:title: Exercice Logix : mémoriser la somme d'une addition 4 bits avec des bascules D
```
