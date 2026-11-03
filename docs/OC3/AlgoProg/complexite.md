<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Complexité algorithmique

## Qu'est-ce que la complexité d'un algorithme ?
Un même problème peut souvent être résolu par plusieurs algorithmes différents. Ils donnent tous le bon résultat, mais certains sont beaucoup plus rapides que d'autres, surtout lorsque la quantité de données devient grande. Chercher un prénom parmi les 25 élèves d'une classe se fait en un clin d'œil, quelle que soit la méthode. Chercher parmi les 9 millions d'habitants de la Suisse est une tout autre histoire...

Mesurer la durée d'un programme en secondes n'est pas une bonne idée : elle dépend de l'ordinateur, de ce qu'il fait en même temps, du langage utilisé... On compte plutôt le nombre d'*opérations élémentaires* (une comparaison, une addition, une affectation, etc.) que l'algorithme effectue, **en fonction de la taille $n$ des données**, par exemple la longueur d'une liste. C'est ce qu'on appelle la *complexité* de l'algorithme.

La question n'est donc pas "combien de temps prend mon programme ?", mais "**comment** ce temps augmente-t-il quand les données grandissent ?".

## Compter les opérations
Pour compter les opérations d'un algorithme, on peut simplement ajouter un compteur dans le programme. La fonction ci-dessous calcule la somme des éléments d'une liste, et compte au passage le nombre d'additions effectuées. On l'appelle sur des listes aléatoires de 10, 100 et 1000 éléments.

```{exec} python
:linenos:
from random import randint

def liste_aleatoire(n):
    liste = []
    for i in range(n):
        liste.append(randint(1, 100))
    return liste

def somme(liste):
    total = 0
    nb_operations = 0
    for valeur in liste:
        total = total + valeur
        nb_operations = nb_operations + 1
    print("Liste de", len(liste), "éléments :", nb_operations, "additions")
    return total

somme(liste_aleatoire(10))
somme(liste_aleatoire(100))
somme(liste_aleatoire(1000))
```

Sans surprise, il faut une addition par élément : quand la liste est 10 fois plus longue, il y a 10 fois plus d'opérations.

Prenons maintenant un autre problème : savoir si une liste contient deux fois la même valeur (par exemple deux élèves nés le même jour). Une solution consiste à comparer chaque élément avec **tous** ceux qui le suivent, grâce à deux boucles imbriquées.

```{exec} python
:linenos:
from random import randint

def liste_aleatoire(n):
    liste = []
    for i in range(n):
        liste.append(randint(1, 100))
    return liste

def contient_doublon(liste):
    doublon = False
    nb_comparaisons = 0
    for i in range(len(liste)):
        for j in range(i + 1, len(liste)):
            nb_comparaisons = nb_comparaisons + 1
            if liste[i] == liste[j]:
                doublon = True
    print("Liste de", len(liste), "éléments :", nb_comparaisons, "comparaisons")
    return doublon

contient_doublon(liste_aleatoire(10))
contient_doublon(liste_aleatoire(100))
contient_doublon(liste_aleatoire(1000))
```

Cette fois, quand la liste est 10 fois plus longue, il y a environ **100 fois** plus d'opérations ! Le premier élément est comparé aux $n - 1$ suivants, le deuxième aux $n - 2$ suivants, et ainsi de suite, ce qui donne au total :

$$(n - 1) + (n - 2) + \ldots + 2 + 1 = \frac{n \cdot (n - 1)}{2}$$

## La notation grand O
Ce qui nous intéresse, ce n'est pas le nombre exact d'opérations, mais la manière dont il *grandit* avec $n$. On le résume avec la notation *grand O*, en ne gardant que le terme qui grandit le plus vite et en oubliant les constantes qui le multiplient. Par exemple :

- $3n + 5$ opérations s'écrit $O(n)$ ;
- $\frac{n \cdot (n - 1)}{2} = \frac{n^2}{2} - \frac{n}{2}$ opérations s'écrit $O(n^2)$.

Le tableau ci-dessous présente les trois complexités que nous rencontrerons le plus souvent, avec le nombre d'opérations correspondant pour différentes tailles de données.

| Notation | Nom | Exemple typique | $n = 10$ | $n = 1000$ | $n = 1\,000\,000$ |
| :------: | :-- | :-------------- | :------: | :--------: | :---------------: |
| $O(1)$ | constante | accéder à `liste[i]` | $1$ | $1$ | $1$ |
| $O(n)$ | linéaire | parcourir une liste avec un `for` | $10$ | $1000$ | $10^6$ |
| $O(n^2)$ | quadratique | deux boucles imbriquées sur la liste | $100$ | $10^6$ | $10^{12}$ |

Pour se rendre compte de ce que cela représente, imaginons un ordinateur capable d'effectuer un milliard ($10^9$) d'opérations par seconde. Pour une liste d'un million d'éléments, un algorithme en $O(n)$ prend environ **une milliseconde**. Un algorithme en $O(n^2)$ prend environ $10^{12} / 10^9 = 1000$ secondes, soit **plus d'un quart d'heure** !

```{important}
Pour estimer la complexité d'un programme qui traite une liste de $n$ éléments :
- des instructions sans boucle, ou une boucle qui fait toujours le même nombre de tours (par exemple `range(10)`), donnent du $O(1)$ ;
- une boucle qui parcourt la liste donne du $O(n)$ ;
- deux boucles **imbriquées** qui parcourent la liste donnent du $O(n^2)$ ;
- deux boucles **l'une après l'autre** donnent $O(n) + O(n)$, c'est-à-dire toujours du $O(n)$.
```

## Meilleur cas et pire cas
Le nombre d'opérations ne dépend pas toujours seulement de la taille des données, mais aussi de leur **contenu**. La fonction ci-dessous cherche une valeur dans une liste et s'arrête dès qu'elle la trouve.

```{exec} python
:linenos:
def contient(liste, valeur):
    nb_comparaisons = 0
    for element in liste:
        nb_comparaisons = nb_comparaisons + 1
        if element == valeur:
            print(nb_comparaisons, "comparaison(s)")
            return True
    print(nb_comparaisons, "comparaison(s)")
    return False

nombres = [12, 7, 33, 5, 21, 18, 9, 40]
contient(nombres, 12)   # la valeur est au début
contient(nombres, 9)    # la valeur est vers la fin
contient(nombres, 50)   # la valeur n'est pas dans la liste
```

Dans le *meilleur cas*, la valeur cherchée est la première de la liste : une seule comparaison suffit. Dans le *pire cas*, elle est absente, et il faut comparer les $n$ éléments. Pour être certain qu'un algorithme reste rapide dans toutes les situations, on s'intéresse en général au **pire cas** : on dit que cette recherche est en $O(n)$.

## Exercices

```{role} complexite(quiz-select)
:right:
:options: |
: O(1)
: O(n)
: O(n²)
```

```{role} nombre(quiz-input)
:right: width: 6rem;
:check: remove
```

### Exercice {num1}`exercice-algo`
Donnez la complexité de chacune des fonctions ci-dessous, en fonction de la longueur $n$ de la liste reçue en paramètre.

```````{quiz}
1.  {complexite}`O(1)`
    ```{code-block} python
    def premier_plus_dernier(liste):
        return liste[0] + liste[len(liste) - 1]
    ```

2.  {complexite}`O(n)`
    ```{code-block} python
    def maximum(liste):
        maxi = liste[0]
        for valeur in liste:
            if valeur > maxi:
                maxi = valeur
        return maxi
    ```

3.  {complexite}`O(n)`
    ```{code-block} python
    def affiche_somme_et_negatifs(liste):
        total = 0
        for valeur in liste:
            total = total + valeur
        nb_negatifs = 0
        for valeur in liste:
            if valeur < 0:
                nb_negatifs = nb_negatifs + 1
        print(total, nb_negatifs)
    ```

4.  {complexite}`O(n²)`
    ```{code-block} python
    def nb_paires_dix(liste):
        compteur = 0
        for a in liste:
            for b in liste:
                if a + b == 10:
                    compteur = compteur + 1
        return compteur
    ```

5.  {complexite}`O(n)`
    ```{code-block} python
    def affiche_triple(liste):
        for valeur in liste:
            for k in range(3):
                print(valeur)
    ```

6.  {complexite}`O(1)`
    ```{code-block} python
    def affiche_cent_fois(liste):
        for k in range(100):
            print(liste[0])
    ```

7.  {complexite}`O(n²)`
    ```{code-block} python
    def triangle(liste):
        for i in range(len(liste)):
            for j in range(i):
                print(liste[i], liste[j])
    ```
```````

````{solution}
1.  **$O(1)$.** Aucune boucle : la fonction fait toujours le même nombre d'opérations, que la
    liste contienne 10 ou un million d'éléments.
2.  **$O(n)$.** Une boucle qui parcourt chaque élément une fois.
3.  **$O(n)$.** Deux boucles, mais **l'une après l'autre** : $n + n = 2n$ opérations, ce qui
    reste du $O(n)$. Seules des boucles **imbriquées** multiplient les nombres de tours.
4.  **$O(n^2)$.** Pour chacun des $n$ éléments `a`, la boucle intérieure parcourt les $n$
    éléments `b` : $n \cdot n = n^2$ tours.
5.  **$O(n)$.** Les boucles sont imbriquées, mais la boucle intérieure fait toujours 3 tours,
    quelle que soit la taille de la liste : $3n$ opérations, donc du $O(n)$.
6.  **$O(1)$.** Piège : il y a bien une boucle, mais elle fait toujours 100 tours, que la liste
    soit longue ou non. Le nombre d'opérations ne dépend pas de $n$.
7.  **$O(n^2)$.** La boucle intérieure fait 0, puis 1, puis 2, ... puis $n - 1$ tours, soit
    $\frac{n \cdot (n - 1)}{2}$ au total, exactement comme pour `contient_doublon`.
````

### Exercice {num1}`exercice-algo`
Répondez **sans exécuter** les programmes : combien de fois l'instruction `compteur = compteur + 1` est-elle exécutée ?

```````{quiz}
1.  {nombre}`16` avec `n = 4`
    ```{code-block} python
    for i in range(n):
        for j in range(n):
            compteur = compteur + 1
    ```

2.  {nombre}`10` avec `n = 5`
    ```{code-block} python
    for i in range(n):
        for j in range(i + 1, n):
            compteur = compteur + 1
    ```

3.  {nombre}`12` avec `n = 6`
    ```{code-block} python
    for i in range(n):
        compteur = compteur + 1
    for j in range(n):
        compteur = compteur + 1
    ```

4.  {nombre}`499500` avec `n = 1000`
    ```{code-block} python
    for i in range(n):
        for j in range(i + 1, n):
            compteur = compteur + 1
    ```

5.  {nombre}`50` La fonction `contient` de la théorie est appelée, dans le **pire cas**, sur une liste de 50 éléments.
```````

````{solution}
1.  **16** : 4 tours de la boucle extérieure, et 4 tours de la boucle intérieure à chaque fois.
2.  **10** : la boucle intérieure fait $4 + 3 + 2 + 1 + 0 = 10$ tours au total, soit
    $\frac{5 \cdot 4}{2}$.
3.  **12** : $6 + 6$, les deux boucles sont l'une après l'autre.
4.  **499 500** : c'est la formule $\frac{n \cdot (n - 1)}{2} = \frac{1000 \cdot 999}{2}$. Pas
    question de compter à la main !
5.  **50** : dans le pire cas (valeur absente), la fonction compare tous les éléments.
````

### Exercice {num1}`exercice-algo`
Dans la théorie, la fonction `contient_doublon` cherche un doublon en comparant chaque élément à tous les suivants, en $O(n^2)$. Mais si la liste est **triée**, deux valeurs égales sont forcément **côte à côte** !

Écrivez une fonction `contient_doublon_triee(liste)` qui suppose que la liste reçue est triée, et qui retourne `True` si elle contient un doublon, `False` sinon, en ne comparant que les éléments **voisins**. Comme dans la théorie, la fonction affichera le nombre de comparaisons effectuées. Quelle est sa complexité ?

```{exec} python
:editor: 01a186ca-b35e-7e01-a725-58b1ad0d9c8e
def contient_doublon_triee(liste):
    #Complétez le corps de la fonction

print(contient_doublon_triee([2, 5, 8, 8, 13, 21]))    # True
print(contient_doublon_triee([2, 5, 8, 13, 21, 34]))   # False
```

````{solution}
```{exec} python
:linenos:
def contient_doublon_triee(liste):
    doublon = False
    nb_comparaisons = 0
    for i in range(len(liste) - 1):
        nb_comparaisons = nb_comparaisons + 1
        if liste[i] == liste[i + 1]:
            doublon = True
    print(nb_comparaisons, "comparaisons")
    return doublon

print(contient_doublon_triee([2, 5, 8, 8, 13, 21]))    # True
print(contient_doublon_triee([2, 5, 8, 13, 21, 34]))   # False
```
1. Chaque élément n'est comparé qu'à son voisin de droite : $n - 1$ comparaisons, c'est-à-dire
   du $O(n)$. Pour une liste de 1000 éléments, cela fait 999 comparaisons au lieu de 499 500 !
2. La boucle s'arrête à l'avant-dernier index, car le dernier élément n'a pas de voisin de
   droite.
3. Cet exemple montre qu'une liste **triée** permet souvent d'écrire des algorithmes beaucoup plus
   rapides. Encore faut-il savoir trier une liste, et le faire efficacement : c'est l'objet des
   pages suivantes.
````
