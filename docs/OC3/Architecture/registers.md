<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Registres et bus

Nous savons maintenant retenir **un** bit avec une bascule. Pour construire un
processeur, il faut retenir des **octets** entiers, et permettre à tous ses
composants d'échanger ces octets. C'est le rôle des *registres* et du *bus*.

## Le registre
Reprenons la *bascule D* du chapitre précédent : elle ne mémorise qu'**un seul
bit**, capturé au moment précis d'un front montant de l'horloge `clk`. Pour retenir
plusieurs bits à la fois, il suffit d'aligner plusieurs bascules D côte à côte et
de les brancher sur la même horloge. On appelle cela un registre. Un registre construit avec 8 bascules D mémorise ainsi un octet entier
d'un seul coup.

On ajoute presque toujours au registre une entrée de commande supplémentaire, la
**charge** (ou *load*, notée `charger`). Dans Logix, cette
entrée porte l'étiquette `LD` (pour *load*). Elle décide si le registre doit
réellement enregistrer une nouvelle valeur au prochain front montant, ou s'il doit plutôt
conserver ce qu'il contient déjà :

- si `charger = 1`, la valeur présentée à l'entrée est capturée au prochain front montant ;
- si `charger = 0`, le registre **garde** son contenu, même si l'horloge continue
  de battre.

Sans cette entrée, un registre recopierait sa donnée d'entrée à chaque front montant, qu'on
le veuille ou non. Avec elle, on choisit précisément le moment où une nouvelle
valeur doit être mémorisée, et celui où l'ancienne doit être préservée.

On représente un registre par un symbole unique, une simple boîte, plutôt que de
dessiner toutes les bascules D séparées : une entrée de donnée (sur plusieurs
bits), l'horloge `clk`, l'entrée `charger`, et une sortie qui présente en
permanence la valeur mémorisée.

```{figure} images/registre.svg
:width: 60%
:alt: Symbole d'un registre 8 bits : une entrée de donnée sur 8 bits à gauche, une entrée charger, une horloge clk avec son triangle, et une sortie Q sur 8 bits à droite
:align: center

Le symbole d'un registre 8 bits. Le trait barré d'un `8` rappelle qu'il s'agit
d'un faisceau de 8 fils.
```


```{important}
- Un registre de `n` bits, c'est `n` bascules D partageant la même horloge `clk`:
  elles capturent toutes leur bit au même front montant.
- L'entrée `charger` décide si le registre enregistre une nouvelle valeur
  (`charger = 1`) ou conserve la précédente (`charger = 0`).
```

Essayez ci-dessous. Réglez la donnée, mettez `charger` à `1` ou `0`, puis faites
un front montant d'horloge : la sortie ne change qu'au front montant, et seulement si `charger = 1`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiB1biByZWdpc3RyZSA0IGJpdHMiLCJvIjoiUsOpZ2xleiBsYSBkb25uw6llLCBtZXR0ZXogJ2NoYXJnZXInIMOgIDEgb3UgMCwgcHVpcyBmYWl0ZXMgdW4gdG9wIGQnaG9ybG9nZS4gTGUgcmVnaXN0cmUgbmUgY2FwdHVyZSBsYSBkb25uw6llIHF1ZSBzaSBjaGFyZ2VyIHZhdXQgMSA7IHNpbm9uIGlsIGdhcmRlIHNhIHZhbGV1ci4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiRCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo2MCwic3RhdGUiOnsid2lkdGgiOjQsInZhbHVlIjo1fSwibGFiZWwiOiJkb25uw6llIn0seyJpZCI6IkxEIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjE2MCwic3RhdGUiOnsidmFsdWUiOjF9LCJsYWJlbCI6ImNoYXJnZXIifSx7ImlkIjoiY2xrIiwidHlwZSI6IkNMT0NLIiwieCI6NDAsInkiOjI0MCwibGFiZWwiOiJob3Jsb2dlIn0seyJpZCI6InJlZyIsInR5cGUiOiJSRUciLCJ4IjoyNDAsInkiOjEyMH0seyJpZCI6IlEiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDQwLCJ5IjoxNjAsInN0YXRlIjp7IndpZHRoIjo0fSwibGFiZWwiOiJRIn1dLCJ3aXJlcyI6W3siaWQiOiJ3MSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJEIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6InJlZyIsInBvcnQiOiJEIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJMRCIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJyZWciLCJwb3J0IjoiTEQifX0seyJpZCI6InczIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNsayIsInBvcnQiOiJDTEsifSwidG8iOnsiY29tcG9uZW50SWQiOiJyZWciLCJwb3J0IjoiQ0xLIn19LHsiaWQiOiJ3NCIsImZyb20iOnsiY29tcG9uZW50SWQiOiJyZWciLCJwb3J0IjoiUSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IlEiLCJwb3J0IjoiaW4wIn19XSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 360px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un registre 4 bits avec entrée charger
```


## Le banc de registres
Un processeur regroupe souvent quelques registres en un *banc de registres* : par
exemple quatre registres `r0`, `r1`, `r2`, `r3` qui servent de mémoire de travail.
On a alors besoin de deux choses : choisir dans lequel **écrire**, et choisir
lequel **lire**. Ce sont exactement les deux briques du chapitre sur le
multiplexage :

- pour **écrire**, un *décodeur* transforme le numéro du registre voulu en un
  signal `charger` dirigé vers ce seul registre (les autres conservent leur
  valeur) ;
- pour **lire**, un *multiplexeur* choisit, selon un numéro, quel registre présente
  sa valeur en sortie.

Un banc de registres n'est donc rien de plus que des registres, un décodeur et un
multiplexeur assemblés. Nous nous en servirons pour construire le processeur.

## Le bus
En plus de ses registres, un processeur contient de nombreux autres composants. Tous ceux-ci doivent régulièrement
s'échanger des octets. On pourrait imaginer tirer un fil dédié entre chaque paire
de composants, mais, de cette manière, le nombre de
fils exploserait et le câblage deviendrait ingérable.

La solution retenue dans presque tous les processeurs est de faire partager à
tous les composants un même faisceau de fils, le *bus*. Au lieu de relier chaque
composant à chaque autre, chacun se raccorde une seule fois à ce bus commun.

```{figure} images/bus.svg
:width: 100%
:alt: Trois registres R1, R2, R3 raccordés à un même faisceau de fils horizontal, le bus ; chaque registre possède une commande charger et une commande activer
:align: center

Trois registres partageant un même bus. Chacun peut **charger** (lire le bus) ou
**activer sa sortie** (poser sa valeur sur le bus).
```

Mais partager un même fil pose un problème : que se passe-t-il si deux composants
y déposent chacun une valeur différente au même instant ? Le bus se retrouverait
avec deux tensions contradictoires, un vrai court-circuit. Une règle stricte
s'impose donc :

```{important}
- À chaque instant, **un seul** composant a le droit de poser sa valeur sur le
  bus, grâce à un signal qui lui est propre (une entrée "activer la sortie").
- N'importe quel nombre de composants peuvent en revanche **lire** ce qui s'y
  trouve, en le capturant dans leur registre grâce à leur entrée `charger`, au
  prochain front montant d'horloge.
```

Essayez ci-dessous : deux registres partagent un même bus. Le bouton *activer*
pose la valeur d'un registre sur le bus (un seul à la fois, sinon le bus signale un
conflit) ; le bouton *charger* fait entrer la valeur du bus dans un registre au
prochain front montant. En gardant *activer r0* et *charger r1* à `1`, faites un
front montant : la valeur passe de `r0` à `r1`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBidXMgKHJlZ2lzdHJlcywgYWN0aXZlciBldCBjaGFyZ2VyKSIsIm8iOiJEZXV4IHJlZ2lzdHJlcyBwYXJ0YWdlbnQgdW4gYnVzLiAnYWN0aXZlcicgcG9zZSBsYSB2YWxldXIgZCd1biByZWdpc3RyZSBzdXIgbGUgYnVzICh1biBzZXVsIMOgIGxhIGZvaXMsIHNpbm9uIGNvbmZsaXQgcm91Z2UpIDsgJ2NoYXJnZXInIGZhaXQgZW50cmVyIGxhIHZhbGV1ciBkdSBidXMgZGFucyB1biByZWdpc3RyZSBhdSBwcm9jaGFpbiB0b3AgZCdob3Jsb2dlLiBFc3NheWV6IDogZ2FyZGV6ICdhY3RpdmVyIHIwJyDDoCAxIGV0ICdjaGFyZ2VyIHIxJyDDoCAxLCBmYWl0ZXMgdW4gdG9wIDogcjEgcHJlbmQgbGEgdmFsZXVyIGRlIHIwLiBBY3RpdmV6IGxlcyBkZXV4ICdhY3RpdmVyJyBlbiBtw6ptZSB0ZW1wcyBwb3VyIHZvaXIgbGUgY29uZmxpdC4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiZW5BIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjgwLCJzdGF0ZSI6eyJ2YWx1ZSI6MX0sImxhYmVsIjoiYWN0aXZlciByMCJ9LHsiaWQiOiJsZEEiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6MjAwLCJzdGF0ZSI6eyJ2YWx1ZSI6MH0sImxhYmVsIjoiY2hhcmdlciByMCJ9LHsiaWQiOiJyQSIsInR5cGUiOiJSRUciLCJ4IjoyMjAsInkiOjEyMCwic3RhdGUiOnsid2lkdGgiOjQsInEiOjl9fSx7ImlkIjoiYnVzIiwidHlwZSI6IkJVUyIsIngiOjQwMCwieSI6MTIwLCJzdGF0ZSI6eyJ3aWR0aCI6NCwic291cmNlcyI6Mn19LHsiaWQiOiJyQiIsInR5cGUiOiJSRUciLCJ4Ijo1NjAsInkiOjEyMCwic3RhdGUiOnsid2lkdGgiOjQsInEiOjB9fSx7ImlkIjoiZW5CIiwidHlwZSI6IklOUFVUIiwieCI6NzQwLCJ5Ijo4MCwic3RhdGUiOnsidmFsdWUiOjB9LCJsYWJlbCI6ImFjdGl2ZXIgcjEifSx7ImlkIjoibGRCIiwidHlwZSI6IklOUFVUIiwieCI6NzQwLCJ5IjoyMDAsInN0YXRlIjp7InZhbHVlIjoxfSwibGFiZWwiOiJjaGFyZ2VyIHIxIn0seyJpZCI6ImNsayIsInR5cGUiOiJDTE9DSyIsIngiOjM2MCwieSI6MzQwLCJsYWJlbCI6ImhvcmxvZ2UifSx7ImlkIjoib3V0IiwidHlwZSI6Ik9VVFBVVCIsIngiOjQwMCwieSI6MjgwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoidmFsZXVyIHN1ciBsZSBidXMifV0sIndpcmVzIjpbeyJpZCI6IncxIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6InJBIiwicG9ydCI6IlEifSwidG8iOnsiY29tcG9uZW50SWQiOiJidXMiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJlbkEiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiYnVzIiwicG9ydCI6ImVuMCJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoickIiLCJwb3J0IjoiUSJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImJ1cyIsInBvcnQiOiJpbjEifX0seyJpZCI6Inc0IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImVuQiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJidXMiLCJwb3J0IjoiZW4xIn19LHsiaWQiOiJ3NSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJidXMiLCJwb3J0IjoiYnVzIn0sInRvIjp7ImNvbXBvbmVudElkIjoickEiLCJwb3J0IjoiRCJ9fSx7ImlkIjoidzYiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiYnVzIiwicG9ydCI6ImJ1cyJ9LCJ0byI6eyJjb21wb25lbnRJZCI6InJCIiwicG9ydCI6IkQifX0seyJpZCI6Inc3IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImJ1cyIsInBvcnQiOiJidXMifSwidG8iOnsiY29tcG9uZW50SWQiOiJvdXQiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3OCIsImZyb20iOnsiY29tcG9uZW50SWQiOiJsZEEiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoickEiLCJwb3J0IjoiTEQifX0seyJpZCI6Inc5IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImxkQiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJyQiIsInBvcnQiOiJMRCJ9fSx7ImlkIjoidzEwIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNsayIsInBvcnQiOiJDTEsifSwidG8iOnsiY29tcG9uZW50SWQiOiJyQSIsInBvcnQiOiJDTEsifX0seyJpZCI6IncxMSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbGsiLCJwb3J0IjoiQ0xLIn0sInRvIjp7ImNvbXBvbmVudElkIjoickIiLCJwb3J0IjoiQ0xLIn19XSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 430px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : deux registres partageant un bus (activer et charger)
```

On peut comparer le bus à un micro qu'on se passe dans une réunion : une seule
personne parle à la fois (elle "pose" sa voix sur le micro), mais tout le monde
peut écouter en même temps. Si deux personnes attrapent le micro et parlent
ensemble, plus personne ne comprend rien : c'est exactement le conflit qu'on
interdit sur un bus.

## Le Program Counter
Un *compteur* est un registre un peu particulier : au lieu d'être chargé de
l'extérieur, il réutilise l'additionneur vu au chapitre précédent pour
**ajouter 1** à sa propre valeur à chaque front montant d'horloge.

Dans notre processeur, ce compteur servira à repérer, une à une, les instructions
du programme à exécuter : c'est pourquoi on l'appelle le *program counter* (ou
*compteur de programme* en français). Il indique à tout moment
la position, dans le programme, de la prochaine instruction. Comme n'importe quel
registre, il garde tout de même son entrée `charger` : elle permet de lui imposer
directement une valeur précise plutôt que de simplement ajouter 1, ce qui servira
plus tard à "sauter" ailleurs dans le programme, par exemple pour une boucle.

Dans la démonstration ci-dessous, faites avancer l'horloge : le compteur ajoute
`1` à chaque front montant.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsZSBjb21wdGV1ciIsIm8iOiJGYWl0ZXMgYXZhbmNlciBsJ2hvcmxvZ2UgKGNsaXF1ZXogZGVzc3VzKSA6IGxlIGNvbXB0ZXVyIGFqb3V0ZSAxIMOgIGNoYXF1ZSB0b3AgdGFudCBxdWUgJ2FjdGl2ZXInIHZhdXQgMS4gTGEgcmVtaXNlIMOgIDAgbGUgcmFtw6huZSDDoCAwLiIsInMiOltdLCJhIjpbXSwiaSI6W10sInUiOltdLCJrIjoibm9uZSIsInIiOltdLCJsIjoxLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJFTiIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo2MCwic3RhdGUiOnsidmFsdWUiOjF9LCJsYWJlbCI6ImFjdGl2ZXIifSx7ImlkIjoiY2xrIiwidHlwZSI6IkNMT0NLIiwieCI6NDAsInkiOjE2MCwibGFiZWwiOiJob3Jsb2dlIn0seyJpZCI6IlJTVCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoyNDAsInN0YXRlIjp7InZhbHVlIjowfSwibGFiZWwiOiJyZW1pc2Ugw6AgMCJ9LHsiaWQiOiJjbnQiLCJ0eXBlIjoiQ09VTlRFUiIsIngiOjI0MCwieSI6MTIwfSx7ImlkIjoiUSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0NDAsInkiOjE2MCwic3RhdGUiOnsid2lkdGgiOjR9LCJsYWJlbCI6ImNvbXB0ZSJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiRU4iLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkVOIn19LHsiaWQiOiJ3MiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbGsiLCJwb3J0IjoiQ0xLIn0sInRvIjp7ImNvbXBvbmVudElkIjoiY250IiwicG9ydCI6IkNMSyJ9fSx7ImlkIjoidzMiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiUlNUIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImNudCIsInBvcnQiOiJSU1QifX0seyJpZCI6Inc0IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImNudCIsInBvcnQiOiJRIn0sInRvIjp7ImNvbXBvbmVudElkIjoiUSIsInBvcnQiOiJpbjAifX1dLCJjdXN0b21EZWZpbml0aW9ucyI6e319fQ&embed=1
:style: height: 360px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un compteur qui s'incrémente à chaque front montant d'horloge
```


## Exercices
### Exercice {num1}`exercice`

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQ29uc3RydWlyZSB1biByZWdpc3RyZSA0IGJpdHMiLCJvIjoiQXNzZW1ibGV6IHVuIHJlZ2lzdHJlIDQgYml0cyDDoCBwYXJ0aXIgZGUgcXVhdHJlIGJhc2N1bGVzIEQgcGFydGFnZWFudCBsYSBtw6ptZSBob3Jsb2dlIDogY2hhcXVlIGJpdCBkaSBlbnRyZSBkYW5zIGxhIGJhc2N1bGUgaSwgdG91dGVzIHJlw6dvaXZlbnQgbGEgbcOqbWUgaG9ybG9nZSwgZXQgY2hhcXVlIHNvcnRpZSBRIGRvbm5lIHFpLiDDgCBjaGFxdWUgdG9wLCBsZXMgcXVhdHJlIGJpdHMgc29udCBtw6ltb3Jpc8OpcyBlbiBtw6ptZSB0ZW1wcy4iLCJzIjpbIlBsYWNleiBxdWF0cmUgYmFzY3VsZXMgRC4iLCJSZWxpZXogZDAuLmQzIGF1eCBlbnRyw6llcyBEIGRlcyBxdWF0cmUgYmFzY3VsZXMuIiwiUmVsaWV6IGwnaG9ybG9nZSDDoCBsJ2VudHLDqWUgY2xrIGRlIENIQVFVRSBiYXNjdWxlIChtw6ptZSBob3Jsb2dlIHBvdXIgdG91dGVzKS4iLCJSZWxpZXogbGVzIHNvcnRpZXMgUSBhdXggc29ydGllcyBxMC4ucTMuIiwiVGVzdGV6IDogY2hhbmdleiBsZXMgZGksIGZhaXRlcyB1biB0b3AsIGxlcyBxdWF0cmUgYml0cyBzb250IGVucmVnaXN0csOpcyBlbnNlbWJsZS4iXSwiYSI6WyJERkYiXSwiaSI6W10sInUiOltdLCJrIjoibm9uZSIsInIiOltdLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJkMCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo0MCwibGFiZWwiOiJkMCJ9LHsiaWQiOiJkMSIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoxMDAsImxhYmVsIjoiZDEifSx7ImlkIjoiZDIiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6MTYwLCJsYWJlbCI6ImQyIn0seyJpZCI6ImQzIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjIwMCwibGFiZWwiOiJkMyJ9LHsiaWQiOiJjbGsiLCJ0eXBlIjoiQ0xPQ0siLCJ4Ijo0MCwieSI6MzAwLCJsYWJlbCI6ImhvcmxvZ2UifSx7ImlkIjoicTAiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDgwLCJ5Ijo0MCwibGFiZWwiOiJxMCJ9LHsiaWQiOiJxMSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0ODAsInkiOjEwMCwibGFiZWwiOiJxMSJ9LHsiaWQiOiJxMiIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0ODAsInkiOjE2MCwibGFiZWwiOiJxMiJ9LHsiaWQiOiJxMyIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0ODAsInkiOjIwMCwibGFiZWwiOiJxMyJ9XSwid2lyZXMiOltdLCJjdXN0b21EZWZpbml0aW9ucyI6e319fQ&embed=1
:style: height: 440px; aspect-ratio: auto; border: 1px solid black;
:title: Exercice Logix : construire un registre 4 bits avec quatre bascules D
```



### Exercice {num1}`exercice`
À l'entrée du FriBowling, un afficheur montre le score de la partie en cours. Il
est piloté par un **registre** `R` de 4 bits (valeurs de `0` à `15`), muni d'une
entrée `charger` : si `charger = 1`, `R` capture au prochain front montant la valeur
présentée sur son entrée ; si `charger = 0`, `R` **garde** son contenu, quelle que
soit la valeur présentée.

Voici, pour six fronts montants successifs, la valeur présentée à l'entrée et celle de
`charger`. Au départ, avant le premier front montant, l'afficheur montre `R = 0`. Complétez
le contenu de `R` après chaque front montant.

```{role} r(quiz-input)
:right: width: 4rem;
:check: json trim
```

```{quiz}
:style: max-width: 26rem;
| front montant | entrée | `charger` | `R` après le front montant |
| :-: | :----: | :-------: | :--------------: |
| 1   | `7`    | `1`       | {r}`{"7": true}`  |
| 2   | `12`   | `0`       | {r}`{"7": true, "12": "charger vaut 0 : le registre garde son contenu précédent."}` |
| 3   | `12`   | `1`       | {r}`{"12": true}` |
| 4   | `9`    | `0`       | {r}`{"12": true, "9": "charger vaut 0 : R ne capture rien, il garde sa dernière valeur."}` |
| 5   | `15`   | `1`       | {r}`{"15": true}` |
| 6   | `0`    | `0`       | {r}`{"15": true, "0": "charger vaut 0 : le contenu de R ne change pas, même si l'entrée vaut 0."}` |
```

### Exercice {num1}`exercice`
Trois registres `R1`, `R2` et `R3` du processeur sont reliés au **même bus**.
Rappel : à chaque étape, **un seul** registre a le droit de poser sa valeur sur le
bus ("activer sa sortie") ; en revanche, plusieurs registres peuvent **charger**
cette même valeur en même temps.

Avant l'étape 1, les registres contiennent `R1 = 9`, `R2 = 3`, `R3 = 0`. Voici la
suite des opérations :

```{code-block} text
Étape 1 : R1 active sa sortie ; R3 charge.
Étape 2 : R2 active sa sortie ; R1 charge.
Étape 3 : R3 active sa sortie ; R1 charge et R2 charge.
Étape 4 : R1 active sa sortie ; personne ne charge.
```

Complétez le contenu des trois registres après chaque étape.

| étape | `R1` | `R2` | `R3` |
| :---: | :--: | :--: | :--: |
| avant | `9`  | `3`  | `0`  |
| 1     |      |      |      |
| 2     |      |      |      |
| 3     |      |      |      |
| 4     |      |      |      |

````{solution}
| étape | `R1` | `R2` | `R3` |
| :---: | :--: | :--: | :--: |
| avant | `9`  | `3`  | `0`  |
| 1     | `9`  | `3`  | `9`  |
| 2     | `3`  | `3`  | `9`  |
| 3     | `9`  | `9`  | `9`  |
| 4     | `9`  | `9`  | `9`  |

1. `R1` pose `9` sur le bus, seul `R3` charge : `R3` devient `9`, `R1` et `R2`
   sont inchangés.
2. `R2` pose `3` sur le bus, `R1` charge : `R1` devient `3`.
3. `R3` pose `9` sur le bus, `R1` **et** `R2` chargent en même temps : les deux
   deviennent `9`. Ceci est autorisé, seule la pose doit être unique.
4. `R1` pose `9` sur le bus, mais personne ne charge : la valeur circule sur le
   bus un instant, puis se perd. Aucun registre ne change.
````

### Exercice {num1}`exercice`
Le **program counter** (`pc`) est un registre spécial : à chaque front montant, s'il n'est
pas chargé (`charger = 0`), il **ajoute 1** à sa valeur. S'il est chargé
(`charger = 1`), il prend directement la valeur imposée (un **saut**), au lieu de
s'incrémenter.

Au départ, avant le premier front montant, `pc = 0`. Voici sept fronts montants successifs, avec la
valeur de `charger` et, quand elle s'applique, la valeur de saut. Complétez `pc`
après chaque front montant.

```{quiz}
:style: max-width: 28rem;
| front montant | `charger` | valeur de saut | `pc` après le front montant |
| :-: | :-------: | :------------: | :---------------: |
| 1   | `0`       | /              | {r}`{"1": true}`  |
| 2   | `0`       | /              | {r}`{"2": true}`  |
| 3   | `1`       | `10`           | {r}`{"10": true}` |
| 4   | `0`       | /              | {r}`{"11": true}` |
| 5   | `0`       | /              | {r}`{"12": true}` |
| 6   | `1`       | `0`            | {r}`{"0": true}`  |
| 7   | `0`       | /              | {r}`{"1": true}`  |
```



Une fois câblé, changez les `di` et faites un front montant : les quatre bits sont bien
enregistrés **en même temps**. C'est cette idée, `n` bascules D sous une même
horloge, qui définit un registre.

## TP : registres, bus et banc de registres dans Logix
Ouvrez [Logix](https://maximejan.github.io/logix/) et construisez la mémoire de travail du processeur.

1.  Placez un registre (`REG`) et vérifiez son comportement : il ne capture la
    donnée que si `charger` (l'entrée `LD`) vaut `1`, au front montant.
2.  Reliez deux registres à un composant `BUS` : donnez à chacun un signal *activer*
    (l'entrée `en` du bus) et un *charger*. Vérifiez qu'un **seul** peut poser sa
    valeur à la fois (sinon le bus signale un conflit), et faites passer une valeur
    d'un registre à l'autre.
3.  Construisez le **banc de registres** : quatre registres `r0` à `r3`, un
    **décodeur** qui, à partir du numéro `Rd`, dirige le `charger` vers un seul
    registre, et **deux multiplexeurs** de lecture (commandés par `Rd` et `Rs`) qui
    présentent deux registres en sortie (pour alimenter l'ALU).
4.  Testez, puis **encapsulez** le banc de registres en un composant réutilisable
    nommé `REGISTRES`.
5.  **Enregistrez** votre travail.
