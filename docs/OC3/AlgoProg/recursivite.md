<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Fonctions récursives

## Qu'est-ce qu'une fonction récursive ?
Vous faites la queue au cinéma et vous aimeriez savoir à quelle position vous êtes, mais la file est trop longue pour compter. Vous demandez alors à la personne devant vous : "Quelle est ta position ?". Elle n'en sait rien non plus, et pose la même question à la personne devant elle, et ainsi de suite. Seule la première personne de la file sait immédiatement qu'elle est en position 1. Elle répond, et chacun peut alors calculer sa position en ajoutant 1 à la réponse reçue, jusqu'à vous.

Chaque personne résout donc le problème en posant **la même question**, mais à une file **plus courte**. En programmation, une fonction qui fonctionne de cette manière, en s'appelant **elle-même**, est appelée une *fonction récursive*. Pour qu'elle ne s'appelle pas à l'infini, il faut un cas où la réponse est connue directement, comme pour la première personne de la file : c'est le *cas de base*.

## Un premier exemple
La fonction ci-dessous affiche un compte à rebours. Pour compter à rebours depuis `n`, il suffit d'afficher `n`, puis de compter à rebours depuis `n - 1`, c'est-à-dire d'appeler la même fonction avec un nombre plus petit. Le cas de base est `n == 0` : on affiche alors le décollage, sans nouvel appel.

```{exec} python
:linenos:
def compte_a_rebours(n):
    if n == 0:
        print("Décollage !")
    else:
        print(n)
        compte_a_rebours(n - 1)

compte_a_rebours(5)
```

```{important}
Une fonction récursive contient toujours deux ingrédients :
- un **cas de base**, dans lequel la fonction ne s'appelle pas elle-même ;
- un **appel récursif** sur un problème **plus petit**, qui se rapproche du cas de base.
```

## Récursion et valeur de retour
En mathématiques, la *factorielle* d'un nombre $n$, notée $n!$, est le produit de tous les entiers de 1 à $n$ : $5! = 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 120$. On remarque que $5! = 5 \cdot 4!$, et plus généralement que $n! = n \cdot (n - 1)!$. La factorielle se définit donc naturellement de manière récursive, avec le cas de base $1! = 1$.

```{exec} python
:linenos:
def factorielle(n):
    if n <= 1:
        return 1
    return n * factorielle(n - 1)

print(factorielle(5))
```

## La pile d'appels
Que se passe-t-il exactement lors de l'appel `factorielle(4)` ? Pour calculer `4 * factorielle(3)`, Python doit d'abord connaître la valeur de `factorielle(3)`. Il met donc le calcul de `factorielle(4)` **en attente** et lance un nouvel appel. Celui-ci se met à son tour en attente de `factorielle(2)`, qui attend `factorielle(1)`. Ce dernier appel est le cas de base : il retourne directement `1`, et chaque appel en attente peut alors terminer son calcul, dans l'ordre inverse.

```{code-block} text
factorielle(4)
│  calcule 4 * factorielle(3)
│  │  calcule 3 * factorielle(2)
│  │  │  calcule 2 * factorielle(1)
│  │  │  │  cas de base : retourne 1
│  │  │  retourne 2 * 1 = 2
│  │  retourne 3 * 2 = 6
│  retourne 4 * 6 = 24
```

Python garde la trace des appels en attente dans une *pile d'appels* : chaque nouvel appel est posé au sommet de la pile, comme une assiette sur une pile d'assiettes, et c'est toujours l'appel du sommet qui s'exécute. Quand il se termine, il est retiré de la pile, et l'appel qui se trouve en dessous reprend là où il s'était arrêté. Le dernier appel lancé est donc toujours le premier terminé.

On peut observer cet ordre en ajoutant des `print` au début et à la fin de la fonction :

```{exec} python
:linenos:
def factorielle(n):
    print("Début de l'appel avec n =", n)
    if n <= 1:
        resultat = 1
    else:
        resultat = n * factorielle(n - 1)
    print("Fin de l'appel avec n =", n, ": retourne", resultat)
    return resultat

factorielle(4)
```

## Le cas de base est indispensable
Sans cas de base, ou si les appels ne se rapprochent jamais du cas de base, la fonction s'appelle elle-même indéfiniment. Comme chaque appel en attente occupe de la mémoire dans la pile d'appels, Python finit par arrêter le programme avec une erreur. Par exemple, sans le test `if n == 0`, le compte à rebours continuerait avec `-1`, `-2`, `-3`... jusqu'à l'erreur :

```{code-block} text
5
4
...
-992
RecursionError: maximum recursion depth exceeded
```

## Deux outils pour la suite
Les fonctions récursives qui travaillent sur des listes ont souvent besoin de couper une liste en morceaux. On utilise pour cela les *tranches* : `liste[a:b]` est une **nouvelle** liste qui contient les éléments de l'index `a` (compris) à l'index `b` (exclu), exactement comme un `range(a, b)`. Si on omet `a`, la tranche commence au début de la liste ; si on omet `b`, elle va jusqu'à la fin. Les tranches fonctionnent aussi avec les `str`.

Pour couper une liste en deux, il faut aussi calculer l'index du milieu, qui doit être un nombre entier. On utilise pour cela la *division entière* `//`, déjà rencontrée avec la recherche dichotomique : elle donne le résultat de la division, arrondi vers le bas.

```{exec} python
:linenos:
lettres = ["A", "B", "C", "D", "E", "F", "G"]
print(lettres[2:5])      # de l'index 2 à l'index 5 exclu
print(lettres[:3])       # les 3 premiers éléments
print(lettres[3:])       # à partir de l'index 3
print(lettres[1:])       # tout sauf le premier élément

print(7 / 2, 7 // 2)     # division normale et division entière
milieu = len(lettres) // 2
print(lettres[:milieu], lettres[milieu:])

mot = "Fribourg"
print(mot[1:4])          # les tranches fonctionnent aussi avec les str
```

## Récursion sur une liste
La somme des éléments d'une liste est égale à son premier élément, plus la somme **du reste** de la liste. Le reste étant une liste plus courte, on peut calculer sa somme par un appel récursif. Le cas de base est la liste vide, dont la somme vaut 0.

```{exec} python
:linenos:
def somme(liste):
    if len(liste) == 0:
        return 0
    return liste[0] + somme(liste[1:])

print(somme([4, 8, 15, 16, 23, 42]))
```

## Diviser pour régner
Une autre manière de rendre un problème plus petit consiste à le **couper en deux**. Pour trouver le maximum d'une liste, on peut par exemple chercher le maximum de la moitié gauche, puis celui de la moitié droite, et garder le plus grand des deux. Chaque moitié est elle-même coupée en deux, et ainsi de suite jusqu'à des listes d'un seul élément, dont le maximum est évident.

```{exec} python
:linenos:
def maximum(liste):
    if len(liste) == 1:
        return liste[0]
    milieu = len(liste) // 2
    max_gauche = maximum(liste[:milieu])
    max_droite = maximum(liste[milieu:])
    if max_gauche > max_droite:
        return max_gauche
    return max_droite

print(maximum([7, 3, 9, 1, 5, 8, 2, 6]))
```

Ici, chaque appel lance **deux** appels récursifs. On peut représenter l'ensemble des appels par un *arbre des appels*, où chaque appel est relié aux appels qu'il lance. Pour la liste `[7, 3, 9, 1]`, on obtient :

```{code-block} text
                       maximum([7, 3, 9, 1])
                      /                     \
           maximum([7, 3])               maximum([9, 1])
           /           \                 /           \
   maximum([7])   maximum([3])   maximum([9])   maximum([1])
```

Cette stratégie, qui consiste à découper un problème en sous-problèmes plus petits, à les résoudre récursivement, puis à combiner leurs résultats, s'appelle *diviser pour régner*. C'est exactement le principe des deux algorithmes de tri des pages suivantes : le tri fusion et le tri rapide.

```{important}
- `liste[a:b]` donne une nouvelle liste avec les éléments des index `a` à `b - 1`.
- `a // b` donne le résultat de la division arrondi vers le bas.
- *Diviser pour régner* : couper le problème en deux, résoudre chaque moitié par un appel récursif, puis combiner les deux résultats.
```

## Exercices

```{role} nombre(quiz-input)
:right: width: 6rem;
:check: remove
```

```{role} suite(quiz-input)
:right: width: 8rem;
:check: remove([^0-9])
```

### Exercice {num1}`exercice-algo`
Répondez aux questions ci-dessous **sans exécuter** les programmes. Pour les affichages, écrivez les nombres dans l'ordre, séparés par des espaces.

```````{quiz}
1.  {nombre}`10` Que retourne `f(4)` ?
    ```{code-block} python
    def f(n):
        if n == 0:
            return 0
        return n + f(n - 1)
    ```

2.  {nombre}`16` Que retourne `g(5)` ?
    ```{code-block} python
    def g(n):
        if n == 1:
            return 1
        return 2 * g(n - 1)
    ```

3.  {suite}`1 2 3` Qu'affiche `h(3)` ?
    ```{code-block} python
    def h(n):
        if n > 0:
            h(n - 1)
            print(n)
    ```

4.  {suite}`2 1 1 2` Qu'affiche `k(2)` ?
    ```{code-block} python
    def k(n):
        if n > 0:
            print(n)
            k(n - 1)
            print(n)
    ```

5.  {nombre}`6` Combien d'appels de la fonction `factorielle` de la théorie l'appel `factorielle(6)` provoque-t-il au total (en comptant le premier) ?
```````

````{solution}
1.  **10.** $f(4) = 4 + f(3) = 4 + 3 + f(2) = 4 + 3 + 2 + 1 + f(0) = 10$ : la fonction calcule la
    somme des nombres de 1 à $n$.
2.  **16.** $g(5) = 2 \cdot g(4) = 2 \cdot 2 \cdot g(3) = \ldots = 2^4 \cdot g(1) = 16$.
3.  **1 2 3.** Piège classique : le `print` se trouve **après** l'appel récursif. `h(3)` lance
    d'abord `h(2)`, qui lance `h(1)`, qui lance `h(0)` (qui ne fait rien). C'est donc `h(1)` qui
    affiche en premier, au moment de terminer, puis `h(2)`, puis `h(3)`.
4.  **2 1 1 2.** Chaque appel affiche son nombre une première fois avant l'appel récursif, et une
    seconde fois après. Les affichages "après" se font dans l'ordre inverse des appels.
5.  **6** : `factorielle(6)`, `factorielle(5)`, ... jusqu'à `factorielle(1)`, le cas de base.
````

### Exercice {num1}`exercice-algo`
Chacune des fonctions ci-dessous comporte **une erreur**. Exécutez-les pour observer le problème, puis corrigez-les.

1.  ```{exec} python
    :editor:
    def factorielle(n):
        if n <= 1:
            return 0
        return n * factorielle(n - 1)

    print(factorielle(5))    # devrait afficher 120
    ```

2.  ```{exec} python
    :editor:
    def factorielle(n):
        if n <= 1:
            return 1
        n * factorielle(n - 1)

    print(factorielle(5))    # devrait afficher 120
    ```

3.  ```{exec} python
    :editor:
    # Doit afficher 5, 4, 3, 2, 1 puis "Décollage !"
    def compte_a_rebours(n):
        if n == 0:
            print("Décollage !")
        else:
            compte_a_rebours(n - 1)
            print(n)

    compte_a_rebours(5)
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    def factorielle(n):
        if n <= 1:
            return 1
        return n * factorielle(n - 1)

    print(factorielle(5))
    ```
    Le cas de base retourne la valeur sur laquelle reposent tous les autres calculs : avec
    `return 0`, chaque appel multiplie par 0, et le résultat final vaut toujours 0.

2.  ```{exec} python
    :linenos:
    def factorielle(n):
        if n <= 1:
            return 1
        return n * factorielle(n - 1)

    print(factorielle(5))
    ```
    Sans `return`, le calcul `n * factorielle(n - 1)` est effectué puis perdu, et la fonction
    retourne `None`. L'appel qui l'attendait essaie alors de calculer `3 * None`, d'où l'erreur.

3.  ```{exec} python
    :linenos:
    def compte_a_rebours(n):
        if n == 0:
            print("Décollage !")
        else:
            print(n)
            compte_a_rebours(n - 1)

    compte_a_rebours(5)
    ```
    Avec le `print` placé après l'appel récursif, les nombres ne sont affichés qu'au moment où
    les appels se terminent, c'est-à-dire dans l'ordre inverse, après le décollage.
````

### Exercice {num1}`exercice-algo`
Écrivez une fonction récursive `puissance(x, n)` qui retourne $x^n$ pour un entier $n \geq 0$, **sans** utiliser l'opérateur `**`. Utilisez pour cela le fait que $x^n = x \cdot x^{n - 1}$ et que $x^0 = 1$.

```{exec} python
:editor: 01a18737-4f87-783d-88d2-5d0d753cf7a5
def puissance(x, n):
    #Complétez le corps de la fonction

print(puissance(2, 10))    # 1024
print(puissance(5, 3))     # 125
print(puissance(7, 0))     # 1
```

````{solution}
```{exec} python
:linenos:
def puissance(x, n):
    if n == 0:
        return 1
    return x * puissance(x, n - 1)

print(puissance(2, 10))    # 1024
print(puissance(5, 3))     # 125
print(puissance(7, 0))     # 1
```
Le cas de base est $n = 0$. À chaque appel, $n$ diminue de 1 et se rapproche donc du cas de
base : la fonction fait $n + 1$ appels au total.
````

### Exercice {num1}`exercice-algo`
Un *palindrome* est un mot qui se lit de la même manière dans les deux sens, comme `kayak` ou `radar`. Un mot est un palindrome si sa première et sa dernière lettre sont égales, **et** si le mot obtenu en retirant ces deux lettres est lui-même un palindrome.

Écrivez une fonction récursive `est_palindrome(mot)` qui retourne `True` si le mot est un palindrome, et `False` sinon. Réfléchissez bien au cas de base : quels mots sont des palindromes à coup sûr ?

```{exec} python
:editor: 01a18737-4f8a-70fa-b658-1f8ab06a2160
def est_palindrome(mot):
    #Complétez le corps de la fonction

print(est_palindrome("kayak"))     # True
print(est_palindrome("radar"))     # True
print(est_palindrome("elle"))      # True
print(est_palindrome("python"))    # False
```

````{solution}
```{exec} python
:linenos:
def est_palindrome(mot):
    if len(mot) <= 1:
        return True
    if mot[0] != mot[len(mot) - 1]:
        return False
    return est_palindrome(mot[1:len(mot) - 1])

print(est_palindrome("kayak"))     # True
print(est_palindrome("radar"))     # True
print(est_palindrome("elle"))      # True
print(est_palindrome("python"))    # False
```
1. Un mot de 0 ou 1 lettre est toujours un palindrome : c'est le cas de base. Le cas du mot vide
   est nécessaire pour les mots de longueur paire, comme `elle`, qui finissent par devenir `""`.
2. Dès que la première et la dernière lettre diffèrent, la réponse est `False`, sans appel
   récursif : c'est un deuxième cas où la réponse est connue directement.
3. La tranche `mot[1:len(mot) - 1]` retire la première et la dernière lettre.
````

### Exercice {num1}`exercice-algo`
La *suite de Fibonacci* commence par 0 et 1, et chaque nombre suivant est la somme des deux précédents : 0, 1, 1, 2, 3, 5, 8, 13, 21, ... On a donc $F(0) = 0$, $F(1) = 1$ et $F(n) = F(n - 1) + F(n - 2)$.

1. Écrivez une fonction récursive `fibonacci(n)` qui retourne $F(n)$. Vérifiez que `fibonacci(10)` vaut `55`.
2. La fonction `nb_appels(n)` ci-dessous calcule combien d'appels de `fibonacci` sont nécessaires pour calculer $F(n)$. Exécutez-la pour $n = 10$, $20$ et $25$. Que constatez-vous ? Comment l'expliquer ?

```{exec} python
:editor: 01a18737-4f8c-77a3-9ae4-fe5788573062
def fibonacci(n):
    #Complétez le corps de la fonction

def nb_appels(n):
    if n <= 1:
        return 1
    return 1 + nb_appels(n - 1) + nb_appels(n - 2)

print(fibonacci(10))    # 55
print(nb_appels(10), nb_appels(20), nb_appels(25))
```

````{solution}
```{exec} python
:linenos:
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def nb_appels(n):
    if n <= 1:
        return 1
    return 1 + nb_appels(n - 1) + nb_appels(n - 2)

print(fibonacci(10))    # 55
print(nb_appels(10), nb_appels(20), nb_appels(25))
```
1. Il y a deux cas de base, $F(0) = 0$ et $F(1) = 1$, que l'on peut regrouper en `return n`.
2. Il faut 177 appels pour $F(10)$, 21 891 pour $F(20)$ et 242 785 pour $F(25)$ : le nombre
   d'appels explose ! Chaque appel en lance **deux** autres, et les mêmes valeurs sont
   recalculées un très grand nombre de fois : pour calculer $F(25)$, la fonction calcule
   $F(23)$ deux fois, $F(22)$ trois fois, etc. Une simple boucle, qui calcule chaque nombre de
   la suite une seule fois, serait incomparablement plus rapide. Une fonction récursive est
   souvent élégante, mais il faut toujours se demander combien d'appels elle provoque.
````
