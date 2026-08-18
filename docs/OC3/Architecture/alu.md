<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# L'unité arithmétique et logique (ALU)

Nous avons maintenant tous les morceaux qui savent *calculer* : l'additionneur,
le soustracteur, et les portes logiques `ET`, `OU`, `XOR`, `NON`. Un processeur
ne les garde pas éparpillés : il les rassemble dans un seul composant capable de
réaliser, à la demande, l'une ou l'autre de ces opérations. Ce composant est
l'*unité arithmétique et logique*, ou *ALU* (de l'anglais *Arithmetic Logic
Unit*).

## Qu'est-ce qu'une ALU ?
L'ALU est la **calculatrice** du processeur. Elle reçoit deux valeurs à traiter,
`A` et `B` (les *opérandes*), ainsi qu'un *code opération* qui indique **quelle**
opération effectuer, et elle produit un *résultat*. C'est exactement le principe
d'une calculatrice de poche : on tape deux nombres et on choisit une touche
(`+`, `−`, etc.) ; ici, le code opération joue le rôle de la touche.

```{figure} images/alu_symbole.svg
:width: 65%
:alt: Symbole de l'ALU en forme de trapèze : entrées A et B par le haut, code opération sur la gauche, résultat en bas, drapeaux sur la droite
:align: center

Le symbole habituel d'une ALU. Les opérandes `A` et `B` entrent par le haut, le
code opération choisit l'opération, et le résultat sort par le bas.
```

Une même ALU réunit donc plusieurs opérations. Par exemple, avec un code
opération sur 2 bits, on peut choisir parmi quatre opérations :

| code | opération       |
| :--: | :-------------- |
| `00` | `A + B`         |
| `01` | `A - B`         |
| `10` | `A ET B`        |
| `11` | `A OU B`        |

## Toutes les opérations à la fois, puis un choix
Comment une ALU peut-elle "choisir" une opération ? On pourrait croire qu'elle
décide d'abord, puis calcule. En réalité, c'est l'inverse : un circuit est
toujours actif, il calcule en permanence. L'additionneur produit sans arrêt
`A + B`, la porte `ET` produit sans arrêt `A ET B`, et ainsi de suite pour
**toutes** les opérations, en même temps.

Le code opération ne sert donc pas à lancer un calcul, mais à **choisir lequel de
ces résultats** on garde. C'est précisément le travail du *multiplexeur* : ses
entrées sont les résultats de toutes les opérations, sa commande est le code
opération, et sa sortie est le résultat retenu.

```{figure} images/alu_interne.svg
:width: 90%
:alt: Structure interne d'une ALU : A et B alimentent quatre blocs (A+B, A-B, A ET B, A OU B) qui calculent en parallèle ; leurs sorties entrent dans un multiplexeur commandé par le code opération, dont la sortie est le résultat
:align: center

À l'intérieur d'une ALU : toutes les opérations calculent en parallèle, et le
multiplexeur ne laisse passer que celle qu'indique le code opération.
```

On reconnaît ici tout ce qu'on a construit dans ce chapitre : le bloc `A + B` est
l'additionneur, le bloc `A - B` est le soustracteur (qui réutilise lui-même
l'additionneur et le complément à deux), et les blocs `ET` et `OU` sont de
simples portes logiques appliquées bit à bit. L'ALU n'est donc pas un composant
nouveau : c'est un **assemblage** de circuits déjà connus, coiffés d'un
multiplexeur.

Dans la démonstration ci-dessous (une petite ALU sur 1 bit), réglez `A` et `B`,
puis changez le code opération `op` (2 bits) et observez le résultat basculer d'une
opération à l'autre.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiB1bmUgQUxVIDEgYml0IMOgIHF1YXRyZSBvcMOpcmF0aW9ucyIsIm8iOiJSw6lnbGV6IEEgZXQgQiwgcHVpcyBjaG9pc2lzc2V6IGwnb3DDqXJhdGlvbiBhdmVjIG9wICgyIGJpdHMpIDogMDAgPSBFVCwgMDEgPSBPVSwgMTAgPSBYT1IsIDExID0gTk9OIEEuIExlcyBxdWF0cmUgcG9ydGVzIGNhbGN1bGVudCBlbiBwZXJtYW5lbmNlIDsgbGUgbXVsdGlwbGV4ZXVyIDQgdmVycyAxLCBjb21tYW5kw6kgcGFyIG9wLCBuZSBsYWlzc2UgcGFzc2VyIHF1ZSBsZSByw6lzdWx0YXQgY2hvaXNpLiIsInMiOltdLCJhIjpbXSwiaSI6W10sInUiOltdLCJrIjoibm9uZSIsInIiOltdLCJsIjoxLCJjIjp7InZlcnNpb24iOjIsIm5hbWUiOiJjaXJjdWl0IiwiY29tcG9uZW50cyI6W3siaWQiOiJBIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjYwLCJzdGF0ZSI6eyJ2YWx1ZSI6MX0sImxhYmVsIjoiQSJ9LHsiaWQiOiJCIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjEyMCwic3RhdGUiOnsidmFsdWUiOjB9LCJsYWJlbCI6IkIifSx7ImlkIjoib3AiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6MzAwLCJzdGF0ZSI6eyJ3aWR0aCI6MiwidmFsdWUiOjJ9LCJsYWJlbCI6Im9wIn0seyJpZCI6ImdBTkQiLCJ0eXBlIjoiQU5EIiwieCI6MjIwLCJ5Ijo0MH0seyJpZCI6ImdPUiIsInR5cGUiOiJPUiIsIngiOjIyMCwieSI6MTIwfSx7ImlkIjoiZ1hPUiIsInR5cGUiOiJYT1IiLCJ4IjoyMjAsInkiOjIwMH0seyJpZCI6ImdOT1QiLCJ0eXBlIjoiTk9UIiwieCI6MjIwLCJ5IjoyODB9LHsiaWQiOiJtdXgiLCJ0eXBlIjoiTVVYIiwieCI6NDIwLCJ5IjoxNjAsInN0YXRlIjp7InNlbGVjdFdpZHRoIjoyLCJkYXRhV2lkdGgiOjF9fSx7ImlkIjoiUiIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo1ODAsInkiOjE4MCwibGFiZWwiOiJyw6lzdWx0YXQifV0sIndpcmVzIjpbeyJpZCI6IncxIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IkEiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiZ0FORCIsInBvcnQiOiJpbjAifX0seyJpZCI6IncyIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IkIiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiZ0FORCIsInBvcnQiOiJpbjEifX0seyJpZCI6InczIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IkEiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoiZ09SIiwicG9ydCI6ImluMCJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiQiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJnT1IiLCJwb3J0IjoiaW4xIn19LHsiaWQiOiJ3NSIsImZyb20iOnsiY29tcG9uZW50SWQiOiJBIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImdYT1IiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3NiIsImZyb20iOnsiY29tcG9uZW50SWQiOiJCIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImdYT1IiLCJwb3J0IjoiaW4xIn19LHsiaWQiOiJ3NyIsImZyb20iOnsiY29tcG9uZW50SWQiOiJBIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6ImdOT1QiLCJwb3J0IjoiaW4wIn19LHsiaWQiOiJ3OCIsImZyb20iOnsiY29tcG9uZW50SWQiOiJnQU5EIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6Im11eCIsInBvcnQiOiJpbjAifX0seyJpZCI6Inc5IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6ImdPUiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJtdXgiLCJwb3J0IjoiaW4xIn19LHsiaWQiOiJ3MTAiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiZ1hPUiIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJtdXgiLCJwb3J0IjoiaW4yIn19LHsiaWQiOiJ3MTEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiZ05PVCIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJtdXgiLCJwb3J0IjoiaW4zIn19LHsiaWQiOiJ3MTIiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoib3AiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoibXV4IiwicG9ydCI6InNlbCJ9fSx7ImlkIjoidzEzIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6Im11eCIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJSIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 420px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : une ALU 1 bit à quatre opérations, sélectionnées par un multiplexeur 4 vers 1
```



## Exercices

### Exercice {num1}`exercice`
On utilise l'ALU dont le code opération sur 2 bits est celui du tableau ci-dessus
(`00` = `A + B`, `01` = `A - B`, `10` = `A ET B`, `11` = `A OU B`). Les valeurs
sont sur 4 bits. Pour chaque ligne, donnez le résultat (en décimal).

```{role} r(quiz-input)
:right: width: 4rem;
:check: json trim
```

```{quiz}
:style: max-width: 30rem;
| `A` | `B` | code | résultat          |
| :-: | :-: | :--: | :---------------: |
| 6   | 3   | `00` | {r}`{"9": true}`  |
| 6   | 3   | `01` | {r}`{"3": true}`  |
| 6   | 3   | `10` | {r}`{"2": true}`  |
| 6   | 3   | `11` | {r}`{"7": true}`  |
| 12  | 10  | `10` | {r}`{"8": true}`  |
```

````{solution}
On écrit `6 = 0110` et `3 = 0011` :

- `A + B` : $6 + 3 = 9$.
- `A - B` : $6 - 3 = 3$.
- `A ET B` : bit à bit, `0110 ET 0011 = 0010`, soit `2`.
- `A OU B` : bit à bit, `0110 OU 0011 = 0111`, soit `7`.

Pour la dernière ligne, `12 = 1100` et `10 = 1010` : `1100 ET 1010 = 1000`, soit
`8`.
````



### Exercice {num1}`exercice`
Construisez une petite ALU sur 1 bit à **deux opérations**. Si `op = 0`, le
résultat doit être `A XOR B` (le bit de somme d'une addition) ; si `op = 1`, le
résultat doit être `A ET B`. Utilisez une porte `XOR`, une porte `ET` et un
multiplexeur commandé par `op`. Le bouton de contrôle vérifie votre circuit.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQ29uc3RydWlyZSB1bmUgbWluaS1BTFUiLCJvIjoiQ29uc3RydWlzZXogdW5lIHBldGl0ZSBBTFUgMSBiaXQgw6AgZGV1eCBvcMOpcmF0aW9ucyA6IHNpIG9wID0gMCwgbGUgcsOpc3VsdGF0IGVzdCBBIFhPUiBCIChsZSBiaXQgZGUgc29tbWUgZCd1bmUgYWRkaXRpb24pIDsgc2kgb3AgPSAxLCBsZSByw6lzdWx0YXQgZXN0IEEgRVQgQi4gVXRpbGlzZXogdW5lIHBvcnRlIFhPUiwgdW5lIHBvcnRlIEVULCBldCB1biBtdWx0aXBsZXhldXIgY29tbWFuZMOpIHBhciBvcCBwb3VyIGNob2lzaXIgZW50cmUgbGVzIGRldXguIiwicyI6WyJDYWxjdWxleiBBIFhPUiBCIGF2ZWMgdW5lIHBvcnRlIFhPUi4iLCJDYWxjdWxleiBBIEVUIEIgYXZlYyB1bmUgcG9ydGUgRVQuIiwiUGxhY2V6IHVuIG11bHRpcGxleGV1ciA6IGVudHLDqWUgMCA9IGxlIFhPUiwgZW50csOpZSAxID0gbGUgRVQsIGNvbW1hbmRlIHNlbCA9IG9wLiIsIlJlbGlleiBsYSBzb3J0aWUgZHUgbXVsdGlwbGV4ZXVyIMOgIFIuIiwiVsOpcmlmaWV6IGF2ZWMgbGUgYm91dG9uIGRlIGNvbnRyw7RsZS4iXSwiYSI6WyJYT1IiLCJBTkQiLCJNVVgiXSwiaSI6W1siQSIsMV0sWyJCIiwxXSxbIm9wIiwxXV0sInUiOltbIlIiLDFdXSwiayI6InR0IiwiciI6W1tbMCwwLDBdLFswXV0sW1swLDEsMF0sWzFdXSxbWzEsMCwwXSxbMV1dLFtbMSwxLDBdLFswXV0sW1swLDAsMV0sWzBdXSxbWzAsMSwxXSxbMF1dLFtbMSwwLDFdLFswXV0sW1sxLDEsMV0sWzFdXV0sImMiOnsidmVyc2lvbiI6MiwibmFtZSI6ImNpcmN1aXQiLCJjb21wb25lbnRzIjpbeyJpZCI6IkEiLCJ0eXBlIjoiSU5QVVQiLCJ4Ijo0MCwieSI6NjAsImxhYmVsIjoiQSJ9LHsiaWQiOiJCIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjE0MCwibGFiZWwiOiJCIn0seyJpZCI6Im9wIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjI0MCwibGFiZWwiOiJvcCJ9LHsiaWQiOiJSIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQ4MCwieSI6MTIwLCJsYWJlbCI6IlIifV0sIndpcmVzIjpbXSwiY3VzdG9tRGVmaW5pdGlvbnMiOnt9fX0&embed=1
:style: height: 430px; aspect-ratio: auto; border: 1px solid black;
:title: Exercice Logix auto-corrigé : construire une mini-ALU 1 bit avec XOR, ET et un multiplexeur
```

## TP : construire l'ALU dans Logix
Ouvrez [Logix](https://maximejan.github.io/logix/) dans un nouvel onglet et construisez l'ALU de ce chapitre, celle qui
servira au processeur. **N'enregistrez pas ce TP en tant qu'exercice** : c'est un
circuit libre, que vous garderez pour la suite.

1.  Placez deux entrées `A` et `B` (largeur **8 bits**) et une entrée `op` sur
    **2 bits** : `00` = addition, `01` = soustraction, `10` = ET, `11` = OU.
2.  Calculez les quatre résultats **en parallèle** : l'addition et la soustraction
    avec l'additionneur (et l'astuce du complément à deux pour `A - B`), le `ET` et
    le `OU` avec des portes appliquées bit à bit.
3.  Réunissez les quatre résultats dans un **multiplexeur** commandé par `op` : sa
    sortie est le résultat de l'ALU.
4.  Testez chaque opération sur quelques valeurs (vérifiez par exemple `A + B`,
    `A - B`, `A ET B`, `A OU B`).
5.  **Encapsulez** votre circuit en un seul composant réutilisable nommé `ALU`
    (fonction de création de composant / sous-circuit de Logix). Vous le
    réutiliserez tel quel, comme une boîte noire, à la fin du chapitre.
6.  **Enregistrez** votre travail.
