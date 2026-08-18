<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# La mémoire vive (RAM)

Un registre retient un octet, mais un programme, lui, manipule des centaines ou
des milliers de valeurs, et il faut aussi ranger quelque part la liste des
instructions à exécuter. Aligner autant de registres nommés un par un serait
ingérable. On regroupe donc un grand nombre de cases mémoire dans un seul
composant, la *mémoire vive*, où l'on range et récupère les valeurs grâce à un
numéro.

## Qu'est-ce que la mémoire vive ?
La *mémoire vive*, ou *RAM* (de l'anglais *Random Access Memory*), est une longue
suite de **cases**, chacune capable de retenir une valeur, exactement comme un
registre. Ce qui la rend utilisable, c'est que chaque case porte un numéro unique,
son *adresse* : pour lire ou modifier une valeur, on ne fouille pas toute la
mémoire, on donne simplement l'adresse de la case voulue.


```{figure} images/ram_cases.svg
:width: 45%
:alt: Une colonne de huit cases numérotées de 0 à 7 ; la case d'adresse 2, mise en évidence, contient la valeur 1100
:align: center

Une petite mémoire de 8 cases. Donner l'adresse `2` désigne directement la
troisième case, sans toucher aux autres.
```

C'est cet accès direct par le numéro qui donne son nom à la mémoire : "accès
aléatoire" signifie ici qu'on atteint **n'importe quelle** case aussi vite,
directement par son adresse, quel que soit l'endroit où elle se trouve.

Combien de cases peut-on adresser ? Une adresse est un nombre binaire : avec $k$
bits d'adresse, on écrit les nombres de $0$ à $2^k - 1$, donc on peut désigner
exactement $2^k$ cases. On retrouve le lien vu avec le décodeur : `3` bits
d'adresse donnent $2^3 = 8$ cases, et pour adresser `256` cases il faut `8` bits.


## Lire et écrire
On ne fait que deux choses avec la mémoire : **lire** le contenu d'une case, ou y
**écrire** une nouvelle valeur. Dans les deux cas, on commence par présenter
l'adresse de la case concernée. La mémoire possède pour cela quelques entrées et
une sortie :

- une entrée `adresse` : le numéro de la case visée ;
- une entrée `donnée` : la valeur à écrire ;
- une entrée `écrire` (souvent notée *WE*, pour *write enable*) : `1` pour écrire,
  `0` sinon ;
- l'horloge `clk` ;
- une sortie `lecture` : le contenu de la case actuellement adressée.

```{figure} images/ram_symbole.svg
:width: 70%
:alt: Symbole de la mémoire RAM : entrées adresse (3 bits), donnée (4 bits), écrire, horloge, et sortie lecture (4 bits)
:align: center

Le symbole d'une mémoire. Ici les adresses sont sur 3 bits (8 cases) et les
valeurs sur 4 bits, pour rester lisible ; un vrai ordinateur en a bien davantage.
```

Les deux opérations n'ont pas le même fonctionnement :

- **Lire** ne modifie rien : la sortie `lecture` affiche en permanence le contenu
  de la case pointée par `adresse`. Il suffit de changer l'adresse pour voir
  aussitôt une autre case, sans front montant.
- **Écrire** modifie la mémoire : quand `écrire = 1`, la valeur présente sur
  `donnée` est rangée dans la case `adresse` au prochain front montant, comme la
  charge d'un registre. Si `écrire = 0`, aucun front montant ne modifie la mémoire.



Essayez ci-dessous : écrivez une valeur à une adresse, puis relisez plusieurs
cases en changeant seulement l'adresse. Vous pouvez également ouvrir cet exemple sur Logix, puis cliquer sur la RAM pour consulter son contenu en entier.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiRMOpbW8gOiBsYSBtw6ltb2lyZSB2aXZlIChSQU0pIiwibyI6IlLDqWdsZXogdW5lIGFkcmVzc2UgZXQgdW5lIGRvbm7DqWUsIG1ldHRleiAnw6ljcmlyZScgw6AgMSBldCBmYWl0ZXMgdW4gdG9wIGQnaG9ybG9nZSA6IGxhIGRvbm7DqWUgZXN0IHJhbmfDqWUgZGFucyBsYSBjYXNlIGFkcmVzc8OpZS4gUmVwYXNzZXogJ8OpY3JpcmUnIMOgIDAgcHVpcyBjaGFuZ2V6IGwnYWRyZXNzZSA6IGxhIHNvcnRpZSBhZmZpY2hlIGF1c3NpdMO0dCBsZSBjb250ZW51IGRlIGxhIGNhc2UgcG9pbnTDqWUgKGxhIGxlY3R1cmUgbmUgZGVtYW5kZSBwYXMgZGUgdG9wKS4iLCJzIjpbXSwiYSI6W10sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwibCI6MSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiQSIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo2MCwic3RhdGUiOnsid2lkdGgiOjMsInZhbHVlIjoyfSwibGFiZWwiOiJhZHJlc3NlIn0seyJpZCI6IkRJIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjE2MCwic3RhdGUiOnsid2lkdGgiOjQsInZhbHVlIjo1fSwibGFiZWwiOiJkb25uw6llIn0seyJpZCI6IldFIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjI0MCwic3RhdGUiOnsidmFsdWUiOjF9LCJsYWJlbCI6IsOpY3JpcmUifSx7ImlkIjoiY2xrIiwidHlwZSI6IkNMT0NLIiwieCI6NDAsInkiOjM0MCwibGFiZWwiOiJob3Jsb2dlIn0seyJpZCI6InJhbSIsInR5cGUiOiJSQU0iLCJ4IjoyNjAsInkiOjE2MH0seyJpZCI6IkRPIiwidHlwZSI6Ik9VVFBVVCIsIngiOjQ4MCwieSI6MjAwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoibGVjdHVyZSJ9XSwid2lyZXMiOlt7ImlkIjoidzEiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiQSIsInBvcnQiOiJvdXQifSwidG8iOnsiY29tcG9uZW50SWQiOiJyYW0iLCJwb3J0IjoiQUREUiJ9fSx7ImlkIjoidzIiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiREkiLCJwb3J0Ijoib3V0In0sInRvIjp7ImNvbXBvbmVudElkIjoicmFtIiwicG9ydCI6IkRBVEFfSU4ifX0seyJpZCI6InczIiwiZnJvbSI6eyJjb21wb25lbnRJZCI6IldFIiwicG9ydCI6Im91dCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6InJhbSIsInBvcnQiOiJXRSJ9fSx7ImlkIjoidzQiLCJmcm9tIjp7ImNvbXBvbmVudElkIjoiY2xrIiwicG9ydCI6IkNMSyJ9LCJ0byI6eyJjb21wb25lbnRJZCI6InJhbSIsInBvcnQiOiJDTEsifX0seyJpZCI6Inc1IiwiZnJvbSI6eyJjb21wb25lbnRJZCI6InJhbSIsInBvcnQiOiJEQVRBX09VVCJ9LCJ0byI6eyJjb21wb25lbnRJZCI6IkRPIiwicG9ydCI6ImluMCJ9fV0sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 470px; aspect-ratio: auto; border: 1px solid black;
:title: Démonstration Logix : écrire et lire dans une mémoire vive
```

## À l'intérieur : des registres et un décodeur
Une mémoire n'a rien de magique : à l'intérieur, chaque case **est** un registre,
comme ceux de la section précédente. Le seul ingrédient nouveau, c'est ce qui
choisit **quel** registre lire ou écrire à partir de l'adresse. Et cet ingrédient,
nous le connaissons déjà : c'est le *décodeur*.

Rappelons son rôle : un décodeur reçoit une adresse sur $k$ bits et met à `1` une
seule de ses $2^k$ sorties, celle dont le numéro correspond à l'adresse. Il suffit
alors de relier chaque sortie du décodeur à l'entrée `charger` d'un registre : la
case dont l'adresse est présentée est la seule à recevoir l'ordre d'enregistrer,
tandis que toutes les autres conservent leur contenu. Le décodeur transforme donc
l'adresse en une sélection : "c'est cette case-là, et elle seule".

C'est exactement ce que vous reconstruirez dans le dernier exercice.

## Exercices

### Exercice {num1}`exercice`
Répondez à chaque question par un nombre.

```{role} r(quiz-input)
:right: width: 4rem;
:check: json trim
```

```{quiz}
:style: max-width: 30rem;
1.  Une mémoire de 8 cases : combien de bits faut-il pour son adresse ?
    {r}`{"3": true}`
2.  Avec des adresses de 4 bits, combien de cases peut-on désigner ?
    {r}`{"16": true}`
3.  Une mémoire de 256 cases : combien de bits d'adresse ?
    {r}`{"8": true}`
4.  Avec des adresses de 10 bits, combien de cases ? {r}`{"1024": true}`
```

### Exercice {num1}`exercice`
Une petite mémoire (adresses de `0` à `7`, valeurs de `0` à `15`) part entièrement
à zéro : toutes ses cases contiennent `0`. On lui applique la suite d'opérations
suivante :

```{code-block} text
1. écrire 5  à l'adresse 2
2. écrire 9  à l'adresse 0
3. écrire 12 à l'adresse 2
4. lire l'adresse 2
5. lire l'adresse 0
6. lire l'adresse 5
7. écrire 7  à l'adresse 5
8. lire l'adresse 5
```

Donnez la valeur renvoyée par chacune des quatre lectures.

```{quiz}
:style: max-width: 24rem;
| opération          | valeur lue        |
| :----------------- | :---------------: |
| 4. lire adresse 2  | {r}`{"12": true}` |
| 5. lire adresse 0  | {r}`{"9": true}`  |
| 6. lire adresse 5  | {r}`{"0": true, "5": "L'adresse 5 n'a encore jamais été écrite : elle vaut toujours 0."}` |
| 8. lire adresse 5  | {r}`{"7": true}`  |
```

````{solution}
- Lecture 4 : l'adresse 2 a d'abord reçu `5` (op. 1), puis `12` (op. 3) qui a
  **écrasé** l'ancienne valeur. La case 2 contient donc `12`.
- Lecture 5 : l'adresse 0 a reçu `9` (op. 2) et n'a plus changé : `9`.
- Lecture 6 : personne n'a écrit à l'adresse 5 avant cette lecture, elle vaut
  encore `0` (valeur de départ).
- Lecture 8 : entre-temps, l'op. 7 a écrit `7` à l'adresse 5 : `7`.
````

### Exercice {num1}`exercice`
On relie une mémoire à un afficheur 7 segments. À l'entrée du FriBowling, cet
afficheur doit montrer le meilleur score de la journée, rangé dans la case
d'adresse `0`. Un employé propose ce protocole pour "lire" le meilleur score :

```{code-block} text
Mettre l'adresse à 0, mettre écrire à 1, faire un front montant.
```

Ce protocole est-il correct pour **lire** le score ? Sinon, corrigez-le et
expliquez ce que la version proposée ferait réellement.

````{solution}
Le protocole est faux : avec `écrire = 1`, le front montant ne lit pas la case,
il **écrit** dedans. La valeur présente sur l'entrée `donnée` viendrait donc
écraser le meilleur score rangé à l'adresse 0.

Pour lire, il ne faut surtout pas écrire : on met `adresse` à `0` et `écrire` à
`0`, et on regarde simplement la sortie `lecture`, qui affiche déjà le contenu de
la case. Aucun front montant n'est nécessaire pour une lecture.
````

### Exercice {num1}`exercice`
Une mémoire, c'est un ensemble de registres (les cases) plus un **décodeur** qui
choisit lequel écrire. Construisez la partie écriture d'une mémoire à **2 cases**.
L'adresse, la donnée, l'horloge et les deux cases sont déjà placées : ajoutez un
décodeur et deux registres, puis reliez le tout de façon que l'adresse `0` écrive
dans la case 0 et l'adresse `1` dans la case 1.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiTGEgc8OpbGVjdGlvbiBkJ8OpY3JpdHVyZSBkJ3VuZSBtw6ltb2lyZSIsIm8iOiJVbmUgbcOpbW9pcmUsIGMnZXN0IHVuIGVuc2VtYmxlIGRlIHJlZ2lzdHJlcyAobGVzIGNhc2VzKSBwbHVzIHVuIGTDqWNvZGV1ciBxdWkgY2hvaXNpdCBsZXF1ZWwgw6ljcmlyZS4gQ29uc3RydWlzZXogbGEgbcOpbW9pcmUgw6AgMiBjYXNlcyA6IGxlIGTDqWNvZGV1ciB0cmFuc2Zvcm1lIGwnYWRyZXNzZSBlbiB1biBzaWduYWwgJ2NoYXJnZXInIHBvdXIgbGEgYm9ubmUgY2FzZS4iLCJzIjpbIlBsYWNleiB1biBkw6ljb2RldXIgZXQgZGV1eCByZWdpc3RyZXMgKGxlcyBkZXV4IGNhc2VzKS4iLCJSZWxpZXogbCdhZHJlc3NlIMOgIGwnZW50csOpZSBkdSBkw6ljb2RldXIuIiwiUmVsaWV6IGxhIHNvcnRpZSBvdXQwIGR1IGTDqWNvZGV1ciDDoCBsJ2VudHLDqWUgTEQgKGNoYXJnZXIpIGR1IHJlZ2lzdHJlIGRlIGxhIGNhc2UgMCwgZXQgb3V0MSDDoCBjZWxsZSBkZSBsYSBjYXNlIDEuIiwiUmVsaWV6IGxhIGRvbm7DqWUgw6AgbCdlbnRyw6llIEQgZGVzIERFVVggcmVnaXN0cmVzLCBldCBsJ2hvcmxvZ2Ugw6AgbGV1ciBlbnRyw6llIENMSy4iLCJSZWxpZXogbGEgc29ydGllIFEgZGUgY2hhcXVlIHJlZ2lzdHJlIMOgIHNhIGNhc2UuIiwiVGVzdGV6IDogYWRyZXNzZSAwLCB1bmUgZG9ubsOpZSwgdW4gdG9wIDogc2V1bGUgbGEgY2FzZSAwIGNoYW5nZS4gQWRyZXNzZSAxIDogc2V1bGUgbGEgY2FzZSAxIGNoYW5nZS4iXSwiYSI6WyJERUNPREVSIiwiUkVHIl0sImkiOltdLCJ1IjpbXSwiayI6Im5vbmUiLCJyIjpbXSwiYyI6eyJ2ZXJzaW9uIjoyLCJuYW1lIjoiY2lyY3VpdCIsImNvbXBvbmVudHMiOlt7ImlkIjoiQSIsInR5cGUiOiJJTlBVVCIsIngiOjQwLCJ5Ijo2MCwic3RhdGUiOnsid2lkdGgiOjIsInZhbHVlIjowfSwibGFiZWwiOiJhZHJlc3NlIn0seyJpZCI6IkRJIiwidHlwZSI6IklOUFVUIiwieCI6NDAsInkiOjE2MCwic3RhdGUiOnsid2lkdGgiOjQsInZhbHVlIjo2fSwibGFiZWwiOiJkb25uw6llIn0seyJpZCI6ImNsayIsInR5cGUiOiJDTE9DSyIsIngiOjQwLCJ5IjozMDAsImxhYmVsIjoiaG9ybG9nZSJ9LHsiaWQiOiJxMCIsInR5cGUiOiJPVVRQVVQiLCJ4Ijo1MDAsInkiOjgwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoiY2FzZSAwIn0seyJpZCI6InExIiwidHlwZSI6Ik9VVFBVVCIsIngiOjUwMCwieSI6MjIwLCJzdGF0ZSI6eyJ3aWR0aCI6NH0sImxhYmVsIjoiY2FzZSAxIn1dLCJ3aXJlcyI6W10sImN1c3RvbURlZmluaXRpb25zIjp7fX19&embed=1
:style: height: 450px; aspect-ratio: auto; border: 1px solid black;
:title: Exercice Logix : construire la sélection d'écriture d'une mémoire avec un décodeur et deux registres
```

Une fois câblé, choisissez une adresse, présentez une donnée et faites un front montant :
seule la case sélectionnée par le décodeur change. C'est ce mécanisme, répété pour
des centaines de cases, qui constitue une mémoire.

## TP : la mémoire dans Logix
Ouvrez [Logix](https://maximejan.github.io/logix/) et préparez la mémoire qui contiendra le programme du processeur.

1.  Placez un composant `RAM` et réglez-le sur des **adresses de 4 bits** et des
    **données de 8 bits** (16 cases d'un octet chacune).
2.  Ajoutez devant elle un **registre d'adresse** (registre 4 bits) qui fournira
    l'adresse à la RAM (dans le processeur final, il la recevra du bus), ainsi
    qu'une entrée de donnée et le signal `écrire`.
3.  Testez : écrivez quelques octets à différentes adresses, puis relisez-les en
    changeant seulement l'adresse (la lecture est immédiate, sans front montant).
4.  La `RAM` est déjà un composant : pas besoin de l'encapsuler. **Enregistrez**
    votre travail, cette mémoire accueillera le programme du processeur.
