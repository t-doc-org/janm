<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Registres et banc de registres

Nous savons maintenant retenir **un** bit avec une bascule. Pour construire un
processeur, il faut retenir des **octets** entiers, et pouvoir choisir dans quel
registre écrire et lequel lire. C'est le rôle des *registres* et du *banc de
registres*.

## Le registre
Reprenons la *bascule D* du chapitre précédent : elle ne mémorise qu'**un seul
bit**, capturé au moment précis d'un front montant de l'horloge `clk`. Pour retenir
plusieurs bits à la fois, il suffit d'aligner plusieurs bascules D côte à côte et
de les brancher sur la même horloge. On appelle cela un registre. Un registre construit avec 8 bascules D mémorise ainsi un octet entier
d'un seul coup.

On ajoute presque toujours au registre une entrée de commande supplémentaire : la
**charge** (*load*), notée `LD` dans Logix, comme sur les bascules D. Elle décide
si le registre doit réellement enregistrer une nouvelle valeur au prochain front
montant, ou s'il doit plutôt conserver ce qu'il contient déjà :

- si `LD = 1`, la valeur présentée à l'entrée est capturée au prochain front montant ;
- si `LD = 0`, le registre **garde** son contenu, même si l'horloge continue
  de battre.

Sans cette entrée, un registre recopierait sa donnée d'entrée à chaque front montant, qu'on
le veuille ou non. Avec elle, on choisit précisément le moment où une nouvelle
valeur doit être mémorisée, et celui où l'ancienne doit être préservée.

On représente un registre par un symbole unique, une simple boîte, plutôt que de
dessiner toutes les bascules D séparées : une entrée de donnée (sur plusieurs
bits), l'horloge `clk`, l'entrée `LD`, et une sortie qui présente en
permanence la valeur mémorisée.

```{figure} images/registre.svg
:width: 60%
:alt: Symbole d'un registre 8 bits : une entrée de donnée sur 8 bits à gauche, une entrée LD, une horloge clk avec son triangle, et une sortie Q sur 8 bits à droite
:align: center

Le symbole d'un registre 8 bits. Le trait barré d'un `8` rappelle qu'il s'agit
d'un faisceau de 8 fils.
```


```{important}
- Un registre de `n` bits, c'est `n` bascules D partageant la même horloge `clk`:
  elles capturent toutes leur bit au même front montant.
- L'entrée `LD` décide si le registre enregistre une nouvelle valeur
  (`LD = 1`) ou conserve la précédente (`LD = 0`).
```

Essayez ci-dessous. Réglez la donnée, mettez `LD` à `1` ou `0`, puis faites
un front montant d'horloge : la sortie ne change qu'au front montant, et seulement si `LD = 1`.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiB1biByZWdpc3RyZSA0IGJpdHMgKGVudHLDqWUgTEQpIiwibyI6IlLDqWdsZXogbGEgZG9ubsOpZSwgbWV0dGV6ICdMRCcgw6AgMSBvdSAwLCBwdWlzIGZhaXRlcyB1biB0b3AgZCdob3Jsb2dlLiBMZSByZWdpc3RyZSBuZSBjYXB0dXJlIGxhIGRvbm7DqWUgcXVlIHNpIExEIHZhdXQgMSA7IHNpbm9uIGlsIGdhcmRlIHNhIHZhbGV1ci4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiRCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo2MCwic3RhdGUiOnsid2lkdGgiOjQsInZhbHVlIjo1fSwibGFiZWwiOiJkb25uw6llIn0seyJpZCI6IkxEIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjE2MCwic3RhdGUiOnsidmFsdWUiOjF9LCJsYWJlbCI6IkxEIn0seyJpZCI6ImNsayIsInR5cGUiOiJDTE9DSyIsIngiOjQwLCJ5IjoyNDAsImxhYmVsIjoiaG9ybG9nZSJ9LHsiaWQiOiJyZWciLCJ0eXBlIjoiUkVHIiwieCI6MjQwLCJ5IjoxMjB9LHsiaWQiOiJRIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQ0MCwieSI6MTYwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoiUSJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiRCIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJyZWciLCJwb3J0IjoiRCJ9fSx7ImlkIjoidzIiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiTEQiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoicmVnIiwicG9ydCI6IkxEIn19LHsiaWQiOiJ3MyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJjbGsiLCJwb3J0IjoiQ0xLIn0sInRvIjp7ImNvbXBvbmVudElkIjoicmVnIiwicG9ydCI6IkNMSyJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoicmVnIiwicG9ydCI6IlEifSwidG8iOnsiY29tcG9uZW50SWQiOiJRIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 360px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : un registre 4 bits avec entrée LD
```


## Le banc de registres
Un processeur regroupe souvent quelques registres en un *banc de registres* : par
exemple quatre registres `r0`, `r1`, `r2`, `r3` qui servent de mémoire de travail.
On a alors besoin de deux choses : choisir dans lequel **écrire**, et choisir
lequel **lire**. Ce sont exactement les deux briques du chapitre sur le
multiplexage :

- pour **écrire**, un *décodeur* transforme le numéro du registre voulu en un
  signal `LD` dirigé vers ce seul registre (les autres conservent leur
  valeur) ;
- pour **lire**, un *multiplexeur* choisit, selon un numéro, quel registre présente
  sa valeur en sortie.

```{figure} images/register_file.svg
:width: 90%
:alt: Banc de registres : la donnée à écrire arrive sur les quatre registres r0 à r3 ; un décodeur commandé par Rd envoie LD à un seul registre ; deux multiplexeurs, dessinés l'un derrière l'autre et commandés par Rd et par Rs, choisissent les deux registres lus, qui partent vers les entrées A et B de l'ALU
:align: center

Le banc de registres : le décodeur choisit où écrire ; deux multiplexeurs,
dessinés l'un derrière l'autre, choisissent les deux registres lus (l'un selon
`Rd`, l'autre selon `Rs`).
```

La donnée à écrire arrive **en même temps** sur l'entrée des quatre registres.
Seul celui qui reçoit `LD = 1` (choisi par le décodeur) la capture au prochain
front montant ; les trois autres l'ignorent et gardent leur valeur. Dans le
processeur, un multiplexeur choisira quelle valeur présenter à cette entrée
d'écriture : le résultat de l'ALU, une valeur lue en mémoire, ou le contenu d'un
autre registre.

Un banc de registres n'est donc rien de plus que des registres, un décodeur et un
multiplexeur assemblés. Nous nous en servirons pour construire le processeur.

## Exercices
### Exercice {num1}`exercice`

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQ29uc3RydWlyZSB1biByZWdpc3RyZSA0IGJpdHMiLCJvIjoiQXNzZW1ibGV6IHVuIHJlZ2lzdHJlIDQgYml0cyDDoCBwYXJ0aXIgZGUgcXVhdHJlIGJhc2N1bGVzIEQgcGFydGFnZWFudCBsYSBtw6ptZSBob3Jsb2dlIDogY2hhcXVlIGJpdCBkaSBlbnRyZSBkYW5zIGxhIGJhc2N1bGUgaSwgdG91dGVzIHJlw6dvaXZlbnQgbGEgbcOqbWUgaG9ybG9nZSwgZXQgY2hhcXVlIHNvcnRpZSBRIGRvbm5lIHFpLiDDgCBjaGFxdWUgdG9wLCBsZXMgcXVhdHJlIGJpdHMgc29udCBtw6ltb3Jpc8OpcyBlbiBtw6ptZSB0ZW1wcy4iLCJzIjpbIlBsYWNleiBxdWF0cmUgYmFzY3VsZXMgRC4iLCJSZWxpZXogZDAuLmQzIGF1eCBlbnRyw6llcyBEIGRlcyBxdWF0cmUgYmFzY3VsZXMuIiwiUmVsaWV6IGwnaG9ybG9nZSDDoCBsJ2VudHLDqWUgY2xrIGRlIENIQVFVRSBiYXNjdWxlIChtw6ptZSBob3Jsb2dlIHBvdXIgdG91dGVzKS4iLCJSZWxpZXogbGVzIHNvcnRpZXMgUSBhdXggc29ydGllcyBxMC4ucTMuIiwiVGVzdGV6IDogY2hhbmdleiBsZXMgZGksIGZhaXRlcyB1biB0b3AsIGxlcyBxdWF0cmUgYml0cyBzb250IGVucmVnaXN0csOpcyBlbnNlbWJsZS4iXSwiYSI6WyJERkYiXSwiaSI6W10sInUiOltdLCJrIjoibm9uZSIsInIiOltdLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJkMCIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo0MCwibGFiZWwiOiJkMCJ9LHsiaWQiOiJkMSIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5IjoxMDAsImxhYmVsIjoiZDEifSx7ImlkIjoiZDIiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6MTYwLCJsYWJlbCI6ImQyIn0seyJpZCI6ImQzIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjIwMCwibGFiZWwiOiJkMyJ9LHsiaWQiOiJjbGsiLCJ0eXBlIjoiQ0xPQ0siLCJ4Ijo0MCwieSI6MzAwLCJsYWJlbCI6ImhvcmxvZ2UifSx7ImlkIjoicTAiLCJ0eXBlIjoiT1VUUFVUIiwieCI6NDgwLCJ5Ijo0MCwibGFiZWwiOiJxMCJ9LHsiaWQiOiJxMSIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0ODAsInkiOjEwMCwibGFiZWwiOiJxMSJ9LHsiaWQiOiJxMiIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0ODAsInkiOjE2MCwibGFiZWwiOiJxMiJ9LHsiaWQiOiJxMyIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo0ODAsInkiOjIwMCwibGFiZWwiOiJxMyJ9XSwid2lyZXMiOltdLCJjdXN0b21EZWZpbml0aW9ucyI6e319fQ&embed=1
:style: height: 440px; aspect-ratio: auto; border: 1px solid black;
:title: Exercice Logix : construire un registre 4 bits avec quatre bascules D
```

Une fois câblé, changez les `di` et faites un front montant : les quatre bits sont bien
enregistrés **en même temps**. C'est cette idée, `n` bascules D sous une même
horloge, qui définit un registre.

### Exercice {num1}`exercice`
À l'entrée du FriBowling, un afficheur montre le score de la partie en cours. Il
est piloté par un **registre** `R` de 4 bits (valeurs de `0000` à `1111`), muni
d'une entrée `LD` : si `LD = 1`, `R` capture au prochain front montant la valeur
présentée sur son entrée ; si `LD = 0`, `R` **garde** son contenu, quelle que
soit la valeur présentée.

Voici, pour six fronts montants successifs, la valeur présentée à l'entrée et celle de
`LD`. Au départ, avant le premier front montant, l'afficheur montre `R = 0000`.
Complétez le contenu de `R` après chaque front montant (écrivez les 4 bits).

```{role} r(quiz-input)
:right: width: 4.5rem;
:check: json trim
```

```{quiz}
:style: max-width: 28rem;
| front montant | entrée | `LD` | `R` après le front montant |
| :-: | :----: | :-------: | :--------------: |
| 1   | `0111` | `1`       | {r}`{"0111": true, "111": "Écrivez les 4 bits : 0111."}` |
| 2   | `1100` | `0`       | {r}`{"0111": true, "111": "Écrivez les 4 bits : 0111.", "1100": "LD vaut 0 : le registre garde son contenu précédent."}` |
| 3   | `1100` | `1`       | {r}`{"1100": true}` |
| 4   | `1001` | `0`       | {r}`{"1100": true, "1001": "LD vaut 0 : R ne capture rien, il garde sa dernière valeur."}` |
| 5   | `1111` | `1`       | {r}`{"1111": true}` |
| 6   | `0000` | `0`       | {r}`{"1111": true, "0000": "LD vaut 0 : le contenu de R ne change pas, même si l'entrée vaut 0000."}` |
```

### Exercice {num1}`exercice`
Un processeur possède un banc de quatre registres `r0`, `r1`, `r2` et `r3`.
Avant le premier front montant, ils contiennent tous `0000 0000`.

À chaque front montant, on présente une **donnée** (8 bits) à l'entrée
d'écriture du banc, on choisit un registre avec `Rd` (2 bits : `00` = `r0`,
`01` = `r1`, `10` = `r2`, `11` = `r3`) et on règle `LD`. Rappel : la donnée
arrive sur l'entrée des quatre registres, mais seul le registre désigné par `Rd`
la capture, et seulement si `LD = 1`.

| front montant | donnée      | `Rd` | `LD` |
| :-----------: | :---------: | :--: | :--: |
| 1             | `0000 0111` | `10` | `1`  |
| 2             | `0001 0100` | `00` | `1`  |
| 3             | `0110 0011` | `01` | `0`  |
| 4             | `0010 1010` | `10` | `1`  |
| 5             | `1111 1111` | `11` | `1`  |

Complétez le contenu des quatre registres après chaque front montant.

| front montant | `r0` | `r1` | `r2` | `r3` |
| :-----------: | :--: | :--: | :--: | :--: |
| avant         | `0000 0000` | `0000 0000` | `0000 0000` | `0000 0000` |
| 1             |      |      |      |      |
| 2             |      |      |      |      |
| 3             |      |      |      |      |
| 4             |      |      |      |      |
| 5             |      |      |      |      |

````{solution}
| front montant | `r0`        | `r1`        | `r2`        | `r3`        |
| :-----------: | :---------: | :---------: | :---------: | :---------: |
| avant         | `0000 0000` | `0000 0000` | `0000 0000` | `0000 0000` |
| 1             | `0000 0000` | `0000 0000` | `0000 0111` | `0000 0000` |
| 2             | `0001 0100` | `0000 0000` | `0000 0111` | `0000 0000` |
| 3             | `0001 0100` | `0000 0000` | `0000 0111` | `0000 0000` |
| 4             | `0001 0100` | `0000 0000` | `0010 1010` | `0000 0000` |
| 5             | `0001 0100` | `0000 0000` | `0010 1010` | `1111 1111` |

1. `Rd = 10` (`r2`) et `LD = 1` : le décodeur envoie `LD` à `r2` seulement. `r2`
   capture `0000 0111`, les autres restent à `0000 0000`.
2. `Rd = 00` (`r0`) et `LD = 1` : `r0` capture `0001 0100`. `r2` garde sa valeur.
3. `LD = 0` : aucun registre ne reçoit la charge. Même si la donnée `0110 0011`
   arrive sur l'entrée des quatre registres et que `Rd` désigne `r1`, rien ne
   change.
4. `Rd = 10` (`r2`) et `LD = 1` : `r2` capture `0010 1010`. Son ancienne valeur
   est remplacée : un registre ne garde que la **dernière** valeur écrite.
5. `Rd = 11` (`r3`) et `LD = 1` : `r3` capture `1111 1111`, la plus grande valeur
   qu'un registre de 8 bits peut contenir.
````

## TP : le banc de registres dans Logix
Ce TP part du précédent : ouvrez dans [Logix](https://maximejan.github.io/logix/)
votre circuit **ALU** enregistré la dernière fois. Vous allez lui ajouter quatre
registres pour en faire la mémoire de travail du processeur.

1.  **Quatre registres.** Placez quatre registres (`REG`) `r0` à `r3` contenant des données de 8 bits, tous reliés
    à la **même** horloge `clk`.
2.  **Choisir où écrire.** Ajoutez un **décodeur** : il reçoit un numéro `Rd`
    (2 bits) et envoie le signal `LD` vers **un seul** registre. Seul celui-là
    enregistrera au prochain front montant ; les autres gardent leur valeur.
3.  **Choisir quoi lire.** Ajoutez **deux multiplexeurs** : l'un commandé par `Rd`,
    l'autre par `Rs`. Ils présentent en sortie le contenu de deux registres à la
    fois.
4.  **Brancher l'ALU.** Reliez ces deux sorties aux entrées `A` et `B` de votre
    `ALU`, et reliez son entrée `op` à un interrupteur. Placez un **afficheur** sur
    la sortie de l'ALU.
5.  **La donnée à écrire.** Ajoutez une entrée manuelle **donnée** (8 bits) et
    reliez-la directement à l'entrée de donnée des quatre registres. Seul le
    registre choisi par `Rd` et `LD` l'enregistre au front montant. (Plus tard,
    un multiplexeur choisira ce qui arrive sur ce fil.)
6.  **Testez à la main.** Vous réglez tout avec des interrupteurs :

    1. Écrire `0000 0101` dans `r0` : `donnée = 0000 0101`, `Rd = 00`, `LD = 1`,
       faites un front montant.
    2. Écrire `0000 0011` dans `r1` : `donnée = 0000 0011`, `Rd = 01`, `LD = 1`,
       faites un front montant.
    3. Lire et calculer : `Rd = 00`, `Rs = 01`, `op = 00` (addition). L'afficheur
       de l'ALU indique `0000 1000`.

    Changez `op` pour voir les autres opérations sur ces deux mêmes registres.
7.  **Enregistrez** votre circuit et **gardez le fichier JSON** : il servira à
    l'assemblage du processeur.
