<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Tri rapide

## Qu'est-ce que le tri rapide ?
Pour ranger une pile de copies par note, vous pourriez choisir une copie au hasard comme *référence*, puis faire deux tas : à gauche les copies moins bien notées que la référence, à droite les mieux notées. La copie de référence se retrouve alors exactement à sa place définitive, entre les deux tas. Il ne reste plus qu'à ranger chacun des deux tas... de la même manière !

C'est le principe du *tri rapide* (*quicksort* en anglais), lui aussi basé sur l'idée *diviser pour régner* :

1. on choisit un élément de la liste, appelé le *pivot* (ici, toujours le **dernier** élément de la zone à trier) ;
2. on réorganise la zone pour placer les éléments plus petits que le pivot à sa gauche, et les plus grands à sa droite : c'est la *partition*. Le pivot est alors à sa place définitive ;
3. on trie la partie gauche et la partie droite, par deux appels récursifs.

Le cas de base est une zone de 0 ou 1 élément, qui n'a pas besoin d'être triée.

```{code-block} text
:linenos:
Pour trier la zone de la liste comprise entre les positions debut et fin :
    Si la zone contient au plus un élément : ne rien faire
    Sinon :
        Partitionner la zone autour du pivot, et noter la position finale p du pivot
        Trier la zone de debut à p - 1 (appel récursif)
        Trier la zone de p + 1 à fin (appel récursif)
```

Contrairement au tri fusion, qui fait le gros du travail **après** les appels récursifs (en fusionnant), le tri rapide le fait **avant** (en partitionnant). Observez-le dans la visualisation : l'arbre des appels et la pile d'appels fonctionnent comme pour le tri fusion.

<div class="tri-visu" data-algo="rapide" data-liste="7 3 9 1 5 8 2 6"></div>

## La partition
Pour partitionner la zone, on la parcourt de gauche à droite en maintenant, au début de la zone, une *zone des petits* qui contient tous les éléments plus petits que le pivot rencontrés jusque-là. La variable `i` indique la position où commence la zone des grands, c'est-à-dire où ranger le prochain petit élément. Chaque élément est comparé au pivot :

- s'il est plus petit, on l'échange avec l'élément en position `i`, ce qui l'ajoute à la zone des petits, et `i` avance d'une case ;
- sinon, on ne fait rien : il reste dans la zone des grands.

Pour finir, on échange le pivot avec l'élément en position `i` : il se retrouve juste après les petits, à sa place définitive.

Voici la partition de `[7, 3, 9, 1, 5]`, avec le pivot `5` :

| Élément examiné | Comparaison | Opération | Liste | `i` |
| :-------------: | :---------: | :-------- | :---- | :-: |
| `7` (position 0) | `7 > 5` | aucune | `[7, 3, 9, 1, 5]` | `0` |
| `3` (position 1) | `3 < 5` | échange de `3` et `7` | `[3, 7, 9, 1, 5]` | `1` |
| `9` (position 2) | `9 > 5` | aucune | `[3, 7, 9, 1, 5]` | `1` |
| `1` (position 3) | `1 < 5` | échange de `1` et `7` | `[3, 1, 9, 7, 5]` | `2` |
| fin du parcours | | échange du pivot `5` et de `9` | `[3, 1, 5, 7, 9]` | `2` |

Le pivot `5` est maintenant en position 2, avec les petits `[3, 1]` à sa gauche et les grands `[7, 9]` à sa droite. La fonction `partition` retourne cette position finale. Elle ne fait pas d'échange inutile lorsque l'élément est déjà au bon endroit (`i == j`).

```{exec} python
:linenos:
def partition(liste, debut, fin):
    pivot = liste[fin]
    i = debut
    for j in range(debut, fin):
        if liste[j] < pivot:
            if i != j:
                temp = liste[i]
                liste[i] = liste[j]
                liste[j] = temp
            i = i + 1
    # On place le pivot juste après les petits
    if i != fin:
        temp = liste[i]
        liste[i] = liste[fin]
        liste[fin] = temp
    return i

nombres = [7, 3, 9, 1, 5]
p = partition(nombres, 0, 4)
print(nombres, "- position du pivot :", p)
```

## Le code du tri rapide
Comme le tri par sélection, le tri rapide trie la liste **sur place**, sans en créer de nouvelle. Les appels récursifs ne travaillent donc pas sur des tranches (qui seraient des copies), mais sur une **zone** de la liste d'origine, délimitée par les positions `debut` et `fin`. Pour trier toute la liste, le premier appel porte sur la zone de `0` à `len(liste) - 1`.

```{exec} python
:linenos:
def partition(liste, debut, fin):
    pivot = liste[fin]
    i = debut
    for j in range(debut, fin):
        if liste[j] < pivot:
            if i != j:
                temp = liste[i]
                liste[i] = liste[j]
                liste[j] = temp
            i = i + 1
    if i != fin:
        temp = liste[i]
        liste[i] = liste[fin]
        liste[fin] = temp
    return i

def tri_rapide(liste, debut, fin):
    if debut < fin:
        p = partition(liste, debut, fin)
        tri_rapide(liste, debut, p - 1)
        tri_rapide(liste, p + 1, fin)

nombres = [7, 3, 9, 1, 5, 8, 2, 6]
tri_rapide(nombres, 0, len(nombres) - 1)
print(nombres)
```

1. La condition `debut < fin` signifie que la zone contient au moins deux éléments. Dans le cas contraire (zone d'un seul élément, ou zone vide), la fonction ne fait rien : c'est le cas de base.
2. Après la partition, le pivot est à sa place définitive en position `p`. Il n'est inclus dans aucune des deux zones suivantes.
3. Une zone peut être vide, par exemple si le pivot était le plus petit élément de sa zone : l'appel récursif correspondant tombe alors directement dans le cas de base.

## À vous de jouer
Triez la liste ci-dessous en suivant **exactement** le tri rapide : chaque comparaison avec le pivot et chaque échange doivent être faits dans le bon ordre. Les appels récursifs se font automatiquement.

<div class="tri-exo" data-algo="rapide" data-liste="5 2 8 1 6 3"></div>

## Complexité
Le travail du tri rapide dépend de la **qualité des pivots**, c'est-à-dire de la manière dont ils coupent les zones.

- **Cas moyen.** Sur une liste mélangée, le pivot coupe en général la zone en deux parties de tailles comparables. On retrouve alors la situation du tri fusion : environ $\log_2(n)$ niveaux d'appels, et chaque niveau compare tous les éléments à leur pivot, soit environ $n$ opérations par niveau. Le tri rapide est donc en $O(n \log n)$ en moyenne. En pratique, il est même souvent plus rapide que le tri fusion, car il travaille sur place, sans créer de nouvelles listes : d'où son nom.
- **Pire cas.** Si la liste est **déjà triée**, le pivot (le dernier élément) est toujours le plus grand de sa zone. La partition produit alors une zone de gauche qui ne contient qu'un élément de moins, et une zone de droite vide. Il faut $n$ niveaux d'appels, avec $n - 1$, puis $n - 2$, ... comparaisons : on retrouve $\frac{n \cdot (n - 1)}{2}$ comparaisons, soit du $O(n^2)$. Paradoxalement, le tri rapide est donc très lent sur une liste déjà triée !

Vérifiez-le dans la visualisation de la théorie avec une liste "déjà triée" : l'arbre des appels devient un long escalier. Le programme ci-dessous compte les comparaisons pour une liste aléatoire et pour une liste déjà triée de 500 éléments.

```{exec} python
:linenos:
from random import randint

nb_comparaisons = [0]    # une liste, pour pouvoir la modifier dans la fonction

def partition(liste, debut, fin):
    pivot = liste[fin]
    i = debut
    for j in range(debut, fin):
        nb_comparaisons[0] = nb_comparaisons[0] + 1
        if liste[j] < pivot:
            if i != j:
                temp = liste[i]
                liste[i] = liste[j]
                liste[j] = temp
            i = i + 1
    if i != fin:
        temp = liste[i]
        liste[i] = liste[fin]
        liste[fin] = temp
    return i

def tri_rapide(liste, debut, fin):
    if debut < fin:
        p = partition(liste, debut, fin)
        tri_rapide(liste, debut, p - 1)
        tri_rapide(liste, p + 1, fin)

n = 500
aleatoire = []
triee = []
for k in range(n):
    aleatoire.append(randint(1, 100000))
    triee.append(k)

tri_rapide(aleatoire, 0, n - 1)
print("Liste aléatoire :", nb_comparaisons[0], "comparaisons")
nb_comparaisons[0] = 0
tri_rapide(triee, 0, n - 1)
print("Liste déjà triée :", nb_comparaisons[0], "comparaisons")
```

```{important}
Tri rapide, pour une liste de $n$ éléments :
- en moyenne, $O(n \log n)$, et très rapide en pratique car il trie sur place ;
- dans le pire cas (par exemple une liste déjà triée lorsque le pivot est le dernier élément), $O(n^2)$ ;
- le choix du pivot est donc crucial.
```

## Récapitulatif des quatre tris

| Tri | Meilleur cas | Cas moyen | Pire cas | Mémoire supplémentaire |
| :-- | :----------: | :-------: | :------: | :--------------------- |
| Sélection | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | non |
| Insertion | $O(n)$ | $O(n^2)$ | $O(n^2)$ | non |
| Fusion | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | oui (nouvelles listes) |
| Rapide | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | non |

La fonction de tri intégrée à Python (`liste.sort()`) utilise un algorithme appelé *Timsort*, qui combine le tri fusion et le tri par insertion pour profiter des avantages des deux.

## Exercices

```{role} liste(quiz-input)
:right: width: 11rem;
:check: remove([^0-9])
```

```{role} nombre(quiz-input)
:right: width: 6rem;
:check: remove
```

```{role} tri(quiz-select)
:right:
:options: |
: sélection
: insertion
: fusion
: rapide
```

### Exercice {num1}`exercice-algo`
On partitionne la liste `[3, 8, 1, 9, 6, 2, 5]` (pivot `5`) avec la fonction `partition` de la théorie. Répondez **sans exécuter** de programme. Pour les listes, écrivez par exemple `[4, 2, 7]`.

```{quiz}
:style: max-width: 40rem;
1. {liste}`[3, 1, 2, 5, 6, 8, 9]`
Que vaut la liste après la partition ?

2. {nombre}`3`
Quelle position la fonction `partition` retourne-t-elle ?

3. {nombre}`6`
Combien de comparaisons avec le pivot la partition effectue-t-elle ?

4. {nombre}`3`
Combien d'échanges effectue-t-elle (en comptant le placement du pivot) ?

5. {nombre}`45`
Combien de comparaisons le tri rapide complet effectue-t-il sur la liste `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]` ?
```

````{solution}
1. `3 < 5` : il est déjà au bon endroit (`i` passe à 1). `8 > 5` : rien. `1 < 5` : échange avec
   `8` (`i` passe à 2). `9` et `6` sont plus grands. `2 < 5` : échange avec `8` (`i` passe à
   3). Enfin, le pivot est échangé avec `9`, l'élément en position 3.
2. **3** : la valeur finale de `i`. Les trois petits `3`, `1` et `2` occupent les positions 0 à 2.
3. **6** : chaque élément de la zone, sauf le pivot lui-même, est comparé une fois au pivot.
4. **3** : `1` et `8`, `2` et `8`, puis le pivot `5` et `9`. Le `3` était déjà au bon endroit.
5. **45** : c'est le pire cas. À chaque appel, le pivot est le plus grand élément de sa zone, qui
   ne diminue que d'un élément : $9 + 8 + \ldots + 1 = \frac{10 \cdot 9}{2} = 45$ comparaisons.
````

### Exercice {num1}`exercice-algo`
Triez cette liste plus longue avec le tri rapide. Seuls les **échanges** sont demandés : à vous de comparer mentalement chaque élément au pivot.

<div class="tri-exo" data-algo="rapide" data-mode="echanges" data-liste="14 3 27 9 21 5 18 11"></div>

### Exercice {num1}`exercice-algo`
Chacun des programmes ci-dessous comporte **une erreur**. Exécutez-les pour observer le problème, puis corrigez-les.

1.  ```{exec} python
    :editor:
    def partition(liste, debut, fin):
        pivot = liste[fin]
        i = debut
        for j in range(debut, fin):
            if liste[j] < pivot:
                if i != j:
                    temp = liste[i]
                    liste[i] = liste[j]
                    liste[j] = temp
                i = i + 1
        return i

    def tri_rapide(liste, debut, fin):
        if debut < fin:
            p = partition(liste, debut, fin)
            tri_rapide(liste, debut, p - 1)
            tri_rapide(liste, p + 1, fin)

    nombres = [7, 3, 9, 1, 5, 8, 2, 6]
    tri_rapide(nombres, 0, len(nombres) - 1)
    print(nombres)
    ```

2.  ```{exec} python
    :editor:
    def partition(liste, debut, fin):
        pivot = liste[fin]
        i = debut
        for j in range(debut, fin):
            if liste[j] < pivot:
                if i != j:
                    temp = liste[i]
                    liste[i] = liste[j]
                    liste[j] = temp
                i = i + 1
        if i != fin:
            temp = liste[i]
            liste[i] = liste[fin]
            liste[fin] = temp
        return i

    def tri_rapide(liste, debut, fin):
        if debut < fin:
            p = partition(liste, debut, fin)
            tri_rapide(liste, debut, p - 1)
            tri_rapide(liste, p + 1, fin)

    nombres = [7, 3, 9, 1, 5, 8, 2, 6]
    tri_rapide(nombres, 0, len(nombres))
    print(nombres)
    ```

3.  ```{exec} python
    :editor:
    def partition(liste, debut, fin):
        pivot = liste[fin]
        i = debut
        for j in range(debut, fin):
            if liste[j] < pivot:
                if i != j:
                    temp = liste[i]
                    liste[i] = liste[j]
                    liste[j] = temp
                i = i + 1
        if i != fin:
            temp = liste[i]
            liste[i] = liste[fin]
            liste[fin] = temp
        return i

    def tri_rapide(liste, debut, fin):
        if debut < fin:
            p = partition(liste, debut, fin)
            tri_rapide(liste, debut, p - 1)

    nombres = [7, 3, 9, 1, 5, 8, 2, 6]
    tri_rapide(nombres, 0, len(nombres) - 1)
    print(nombres)
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    def partition(liste, debut, fin):
        pivot = liste[fin]
        i = debut
        for j in range(debut, fin):
            if liste[j] < pivot:
                if i != j:
                    temp = liste[i]
                    liste[i] = liste[j]
                    liste[j] = temp
                i = i + 1
        if i != fin:
            temp = liste[i]
            liste[i] = liste[fin]
            liste[fin] = temp
        return i

    def tri_rapide(liste, debut, fin):
        if debut < fin:
            p = partition(liste, debut, fin)
            tri_rapide(liste, debut, p - 1)
            tri_rapide(liste, p + 1, fin)

    nombres = [7, 3, 9, 1, 5, 8, 2, 6]
    tri_rapide(nombres, 0, len(nombres) - 1)
    print(nombres)
    ```
    Le pivot n'est jamais placé entre les petits et les grands : il reste à la fin de la zone.
    La position retournée ne correspond donc pas à sa position réelle, et il n'est jamais trié.

2.  ```{exec} python
    :linenos:
    def partition(liste, debut, fin):
        pivot = liste[fin]
        i = debut
        for j in range(debut, fin):
            if liste[j] < pivot:
                if i != j:
                    temp = liste[i]
                    liste[i] = liste[j]
                    liste[j] = temp
                i = i + 1
        if i != fin:
            temp = liste[i]
            liste[i] = liste[fin]
            liste[fin] = temp
        return i

    def tri_rapide(liste, debut, fin):
        if debut < fin:
            p = partition(liste, debut, fin)
            tri_rapide(liste, debut, p - 1)
            tri_rapide(liste, p + 1, fin)

    nombres = [7, 3, 9, 1, 5, 8, 2, 6]
    tri_rapide(nombres, 0, len(nombres) - 1)
    print(nombres)
    ```
    `fin` est la position du **dernier** élément de la zone, et non sa longueur : pour toute la
    liste, c'est `len(nombres) - 1`. Avec `len(nombres)`, la partition essaie de lire
    `liste[8]`, qui n'existe pas.

3.  ```{exec} python
    :linenos:
    def partition(liste, debut, fin):
        pivot = liste[fin]
        i = debut
        for j in range(debut, fin):
            if liste[j] < pivot:
                if i != j:
                    temp = liste[i]
                    liste[i] = liste[j]
                    liste[j] = temp
                i = i + 1
        if i != fin:
            temp = liste[i]
            liste[i] = liste[fin]
            liste[fin] = temp
        return i

    def tri_rapide(liste, debut, fin):
        if debut < fin:
            p = partition(liste, debut, fin)
            tri_rapide(liste, debut, p - 1)
            tri_rapide(liste, p + 1, fin)

    nombres = [7, 3, 9, 1, 5, 8, 2, 6]
    tri_rapide(nombres, 0, len(nombres) - 1)
    print(nombres)
    ```
    Il manque l'appel récursif sur la partie droite. À chaque niveau, seule la partie gauche de
    la zone est traitée : les parties droites ne sont jamais triées, et seuls les pivots
    successifs se retrouvent à leur place.
````

### Exercice {num1}`exercice-algo`
Pour éviter le pire cas sur les listes déjà triées, on peut choisir le pivot **au hasard** dans la zone. Il suffit, au début de la partition, d'échanger un élément tiré au hasard entre `debut` et `fin` avec le dernier élément de la zone : le reste de la fonction ne change pas.

Modifiez la fonction `partition` en conséquence, puis comparez le nombre de comparaisons obtenu sur une liste déjà triée de 500 éléments avec celui de la théorie.

```{exec} python
:editor: 01a18737-4f98-7adc-9189-5086a9bdd3f2
from random import randint

nb_comparaisons = [0]

def partition(liste, debut, fin):
    #Ajoutez ici le choix d'un pivot au hasard

    pivot = liste[fin]
    i = debut
    for j in range(debut, fin):
        nb_comparaisons[0] = nb_comparaisons[0] + 1
        if liste[j] < pivot:
            if i != j:
                temp = liste[i]
                liste[i] = liste[j]
                liste[j] = temp
            i = i + 1
    if i != fin:
        temp = liste[i]
        liste[i] = liste[fin]
        liste[fin] = temp
    return i

def tri_rapide(liste, debut, fin):
    if debut < fin:
        p = partition(liste, debut, fin)
        tri_rapide(liste, debut, p - 1)
        tri_rapide(liste, p + 1, fin)

triee = []
for k in range(500):
    triee.append(k)
tri_rapide(triee, 0, 499)
print("Liste déjà triée :", nb_comparaisons[0], "comparaisons")
```

````{solution}
```{exec} python
:linenos:
from random import randint

nb_comparaisons = [0]

def partition(liste, debut, fin):
    k = randint(debut, fin)
    temp = liste[k]
    liste[k] = liste[fin]
    liste[fin] = temp

    pivot = liste[fin]
    i = debut
    for j in range(debut, fin):
        nb_comparaisons[0] = nb_comparaisons[0] + 1
        if liste[j] < pivot:
            if i != j:
                temp = liste[i]
                liste[i] = liste[j]
                liste[j] = temp
            i = i + 1
    if i != fin:
        temp = liste[i]
        liste[i] = liste[fin]
        liste[fin] = temp
    return i

def tri_rapide(liste, debut, fin):
    if debut < fin:
        p = partition(liste, debut, fin)
        tri_rapide(liste, debut, p - 1)
        tri_rapide(liste, p + 1, fin)

triee = []
for k in range(500):
    triee.append(k)
tri_rapide(triee, 0, 499)
print("Liste déjà triée :", nb_comparaisons[0], "comparaisons")
```
Avec un pivot au hasard, le tri d'une liste déjà triée ne demande plus qu'environ 5000
comparaisons, au lieu de 124 750. Plus aucune liste particulière ne provoque systématiquement
le pire cas : il faudrait être extrêmement malchanceux pour que le hasard choisisse à chaque
fois le plus grand élément de la zone.
````

### Exercice {num1}`exercice-algo`
Pour chacune des situations ci-dessous, quel tri choisiriez-vous ?

```{quiz}
:style: max-width: 40rem;
1. {tri}`fusion`
On doit trier une très grande liste, et il est indispensable que le tri reste en $O(n \log n)$
même dans le pire cas. La mémoire n'est pas un problème.

2. {tri}`rapide`
On doit trier une très grande liste mélangée au hasard, le plus vite possible en pratique, avec
peu de mémoire disponible.

3. {tri}`insertion`
On ajoute régulièrement quelques éléments à la fin d'une liste déjà triée, et il faut la retrier
à chaque fois.
```

````{solution}
1. **Fusion** : c'est le seul des quatre tris qui garantit $O(n \log n)$ dans tous les cas. Son
   défaut, la mémoire supplémentaire, n'est ici pas un problème.
2. **Rapide** : en moyenne en $O(n \log n)$, il trie sur place et se révèle très rapide en
   pratique. Sur une liste mélangée au hasard, le pire cas est extrêmement improbable.
3. **Insertion** : sur une liste presque triée, il est proche de son meilleur cas en $O(n)$.
   Attention, le tri rapide avec le dernier élément comme pivot serait ici dans son **pire**
   cas !
````
