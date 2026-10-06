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

- une entrée `adresse` (notée `A` dans Logix) : le numéro de la case visée ;
- une entrée `donnée` (notée `D`) : la valeur à écrire ;
- une entrée `écrire` (souvent notée *WE*, pour *write enable*) : `1` pour écrire,
  `0` sinon ;
- l'horloge `clk` (notée `CLK`) ;
- une sortie `lecture` (notée `Q`) : le contenu de la case actuellement adressée.

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
alors de relier chaque sortie du décodeur à l'entrée `LD` d'un registre : la
case dont l'adresse est présentée est la seule à recevoir l'ordre d'enregistrer,
tandis que toutes les autres conservent leur contenu. Le décodeur transforme donc
l'adresse en une sélection : "c'est cette case-là, et elle seule".

Dans Logix, le composant `RAM` contient déjà tout ce mécanisme : vous n'aurez pas
à le reconstruire.

## TP : la mémoire dans Logix
Ce TP part du précédent : ouvrez dans [Logix](https://maximejan.github.io/logix/)
le fichier du TP registres (banc de registres + ALU). Vous allez y ajouter la
mémoire qui contiendra le programme du processeur, puis la remplir avec des
octets précis.

1.  **La mémoire.** Placez un composant `RAM` réglé sur des **adresses de 4 bits**
    et des **données de 8 bits** : Logix affiche alors `RAM 16×8` sur le composant
    (16 cases d'un octet). Reliez son entrée `CLK` à la **même** horloge que les
    registres.
2.  **Les commandes manuelles.** Comme pour les registres, pilotez la mémoire à la
    main pour l'instant. Ajoutez :

    - une entrée **adresse** (4 bits), reliée à l'entrée `A` de la RAM ;
    - une entrée **donnée mémoire** (8 bits), reliée à l'entrée `D` ;
    - une entrée **écrire** (1 bit), reliée à l'entrée `WE`.

    Inutile d'ajouter un afficheur : la RAM montre elle-même, en binaire, le
    contenu de la case adressée (c'est aussi ce qui sort sur `Q`). Plus tard, c'est
    le compteur de programme qui fournira l'adresse.
3.  **Rangez ces octets.** Pour écrire une case : réglez `adresse` et
    `donnée mémoire`, mettez `écrire = 1`, faites un front montant, puis remettez
    `écrire = 0`. Rangez ainsi le contenu suivant :

    | adresse | contenu     |
    | :-----: | :---------: |
    | `0000`  | `0001 0000` |
    | `0001`  | `0000 1101` |
    | `0010`  | `0001 0100` |
    | `0011`  | `0000 0010` |
    | `0100`  | `0100 0001` |
    | `0101`  | `0011 0000` |
    | `0110`  | `0000 0000` |

    La case `0110` doit contenir `0000 0000` : comme la mémoire part à zéro, il n'y
    a rien à y écrire.
4.  **Vérifiez.** Mettez `écrire = 0`, puis parcourez les adresses de `0000` à
    `0111` en changeant **seulement** `adresse` : la RAM doit afficher exactement
    le tableau ci-dessus, et `0000 0000` à l'adresse `0111`. Vous pouvez
    aussi cliquer sur la RAM pour voir tout son contenu d'un coup. Si une case est
    fausse, réécrivez-la.
5.  **Enregistrez** votre circuit et **gardez le fichier JSON**. Ces octets ne sont
    pas choisis au hasard : au chapitre suivant, vous découvrirez qu'ils forment un
    petit programme, que votre processeur exécutera à la fin du cours.

````{solution}
Circuit corrigé : {download}`tp_memoire.json <solutions/tp_memoire.json>`. Dans Logix, ouvrez-le avec le bouton *Charger un JSON* (flèche vers le haut).
La RAM y est déjà remplie : cliquez dessus pour voir son contenu.

- `RAM` réglée sur des adresses de 4 bits et des données de 8 bits
  (`RAM 16×8`), `CLK` reliée à la même horloge que les registres.
- `adresse` sur `A`, `donnée mémoire` sur `D`, `écrire` sur `WE`.
- Pour écrire une case : `adresse` et `donnée mémoire` réglées, `écrire = 1`, un
  front montant, puis `écrire = 0` avant de changer d'adresse. Sinon, le
  front suivant écrit aussi dans la nouvelle case.
````
