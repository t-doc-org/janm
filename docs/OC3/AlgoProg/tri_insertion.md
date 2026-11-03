<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Tri par insertion

## Qu'est-ce que le tri par insertion ?
Lorsque vous jouez aux cartes, vous rangez probablement votre main sans y penser : vous prenez les cartes une par une, et vous **insérez** chaque nouvelle carte à sa place parmi celles que vous tenez déjà, qui sont triées. Pour cela, vous la faites glisser vers la gauche tant que la carte voisine est plus grande. C'est exactement le principe du *tri par insertion*.

Au début, le premier élément forme à lui seul une partie triée. On prend ensuite le deuxième élément et on l'insère dans cette partie triée, puis le troisième, et ainsi de suite. Pour insérer un élément, on l'échange avec son voisin de gauche **tant que** ce voisin est plus grand que lui.

```{code-block} text
:linenos:
Pour chaque position i, de la deuxième à la dernière :
    Tant que l'élément n'est pas au début de la liste et que son voisin de gauche est plus grand :
        Échanger l'élément avec son voisin de gauche
```

<div class="tri-visu" data-algo="insertion" data-liste="7 3 9 1 5 8 2 6"></div>

## Exemple pas à pas
Le tableau ci-dessous résume le tri de la liste `[7, 3, 9, 1, 5]`. La partie triée est en gras.

| Étape | Élément à insérer | Comparaisons et échanges | Liste après l'insertion |
| :---: | :---------------: | :----------------------- | :---------------------- |
| `i = 1` | `3` | `7 > 3` : échange | [**3**, **7**, 9, 1, 5] |
| `i = 2` | `9` | `7 < 9` : déjà à sa place | [**3**, **7**, **9**, 1, 5] |
| `i = 3` | `1` | `9 > 1` : échange, `7 > 1` : échange, `3 > 1` : échange | [**1**, **3**, **7**, **9**, 5] |
| `i = 4` | `5` | `9 > 5` : échange, `7 > 5` : échange, `3 < 5` : stop | [**1**, **3**, **5**, **7**, **9**] |

Remarquez une différence importante avec le tri par sélection : ici, la partie triée n'est pas *définitive*. Après l'étape `i = 2`, le `3` est en première position, mais il sera encore déplacé quand le `1` sera inséré.

## Le code Python

```{exec} python
:linenos:
def tri_insertion(liste):
    for i in range(1, len(liste)):
        j = i
        # On fait reculer l'élément tant que son voisin de gauche est plus grand
        while j > 0 and liste[j - 1] > liste[j]:
            temp = liste[j - 1]
            liste[j - 1] = liste[j]
            liste[j] = temp
            j = j - 1

nombres = [7, 3, 9, 1, 5, 8, 2, 6]
tri_insertion(nombres)
print(nombres)
```

1. La boucle `for` commence à l'index `1` : le premier élément forme déjà une partie triée à lui seul.
2. La variable `j` suit la position de l'élément en train d'être inséré. À chaque échange, il recule d'une case, d'où le `j = j - 1`.
3. La boucle `while` s'arrête dans deux cas : soit l'élément est arrivé au début de la liste (`j` vaut `0`), soit son voisin de gauche est plus petit, et l'élément est alors à sa place.

```{tip}
Lorsque `j` vaut `0`, la condition `j > 0` est fausse, et Python n'évalue même pas la seconde
condition : il sait déjà que le `and` sera faux. C'est pour cela qu'on teste `j > 0` en
**premier** : on évite ainsi de calculer `liste[j - 1]`, c'est-à-dire `liste[-1]`, qui n'a pas
de sens ici (en Python, il désigne le dernier élément de la liste, et dans beaucoup d'autres
langages, il provoquerait une erreur).
```

## À vous de jouer
Triez la liste ci-dessous en suivant **exactement** le tri par insertion : chaque comparaison et chaque échange doivent être faits dans le bon ordre.

<div class="tri-exo" data-algo="insertion" data-liste="5 2 8 1 6"></div>

## Complexité
Contrairement au tri par sélection, le travail du tri par insertion dépend beaucoup du **contenu** de la liste :

- **Meilleur cas : la liste est déjà triée.** Chaque élément est comparé une seule fois à son voisin de gauche, qui est plus petit : aucun échange. Cela fait $n - 1$ comparaisons, soit du $O(n)$.
- **Pire cas : la liste est triée à l'envers.** Chaque élément doit reculer jusqu'au début de la liste : 1 échange pour le deuxième élément, 2 pour le troisième, etc. On retrouve $\frac{n \cdot (n - 1)}{2}$ comparaisons et autant d'échanges, soit du $O(n^2)$.
- **Cas moyen : une liste aléatoire.** Chaque élément recule en moyenne jusqu'à la moitié de la partie triée : environ $\frac{n^2}{4}$ comparaisons, ce qui reste du $O(n^2)$.

Vérifiez-le dans la visualisation de la théorie en choisissant les différents types de liste, ou avec le programme ci-dessous.

```{exec} python
:linenos:
from random import randint

def tri_insertion_compte(liste):
    nb_comparaisons = 0
    for i in range(1, len(liste)):
        j = i
        while j > 0:
            nb_comparaisons = nb_comparaisons + 1
            if liste[j - 1] > liste[j]:
                temp = liste[j - 1]
                liste[j - 1] = liste[j]
                liste[j] = temp
                j = j - 1
            else:
                j = 0    # l'élément est à sa place : on sort de la boucle
    return nb_comparaisons

n = 1000
triee = []
inverse = []
aleatoire = []
for k in range(n):
    triee.append(k)
    inverse.append(n - k)
    aleatoire.append(randint(1, 1000))

print("Liste déjà triée :", tri_insertion_compte(triee), "comparaisons")
print("Liste aléatoire :", tri_insertion_compte(aleatoire), "comparaisons")
print("Liste triée à l'envers :", tri_insertion_compte(inverse), "comparaisons")
```

```{important}
Tri par insertion, pour une liste de $n$ éléments :
- meilleur cas (liste déjà triée) : $n - 1$ comparaisons, aucun échange, donc $O(n)$ ;
- pire cas (liste triée à l'envers) : $\frac{n \cdot (n - 1)}{2}$ comparaisons et autant d'échanges, donc $O(n^2)$ ;
- en moyenne : $O(n^2)$, mais environ deux fois moins de comparaisons que le tri par sélection.
```

Le tri par insertion est donc particulièrement efficace sur les listes **presque triées**, une situation très fréquente en pratique : par exemple un classement que l'on met à jour après l'ajout de quelques nouveaux résultats.

## Exercices

```{role} liste(quiz-input)
:right: width: 11rem;
:check: remove([^0-9])
```

```{role} nombre(quiz-input)
:right: width: 6rem;
:check: remove
```

```{role} choix(quiz-select)
:right:
:options: |
: sélection
: insertion
```

### Exercice {num1}`exercice-algo`
On trie la liste `[6, 2, 8, 4, 1, 9, 3]` avec le tri par insertion. Répondez **sans exécuter** de programme. Pour les listes, écrivez par exemple `[4, 2, 7]`.

```{quiz}
:style: max-width: 40rem;
1. {liste}`[2, 6, 8, 4, 1, 9, 3]`
Que vaut la liste après l'insertion du deuxième élément (`i = 1`) ?

2. {liste}`[2, 4, 6, 8, 1, 9, 3]`
Que vaut la liste après l'insertion du quatrième élément (`i = 3`) ?

3. {liste}`[1, 2, 4, 6, 8, 9, 3]`
Que vaut la liste après l'insertion du cinquième élément (`i = 4`) ?

4. {nombre}`11`
Combien d'échanges le tri effectue-t-il au total ?

5. {nombre}`9`
Combien de comparaisons le tri effectue-t-il sur la liste `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]` ?

6. {nombre}`45`
Et sur la liste `[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]` ?
```

````{solution}
1. `6 > 2` : le `2` recule d'une case.
2. Après `i = 2`, le `8` n'a pas bougé (`6 < 8`). À l'étape `i = 3`, le `4` recule derrière le `8`,
   puis derrière le `6`, et s'arrête car `2 < 4`.
3. Le `1` est plus petit que tous les éléments de la partie triée : il recule jusqu'au début de la
   liste, en 4 échanges.
4. Échanges à chaque étape : 1 (pour `2`), 0 (pour `8`), 2 (pour `4`), 4 (pour `1`), 0 (pour `9`),
   puis 4 (pour `3`, qui recule derrière `9`, `8`, `6` et `4`). Total : 11 échanges.
5. Meilleur cas : une seule comparaison par élément à partir du deuxième, soit $n - 1 = 9$.
6. Pire cas : $\frac{10 \cdot 9}{2} = 45$ comparaisons (et 45 échanges).
````

### Exercice {num1}`exercice-algo`
Triez cette liste plus longue avec le tri par insertion. Seuls les **échanges** sont demandés.

<div class="tri-exo" data-algo="insertion" data-mode="echanges" data-liste="14 3 27 9 21 5 18 11"></div>

### Exercice {num1}`exercice-algo`
Chacune des fonctions ci-dessous devrait trier la liste par insertion dans l'ordre croissant, mais comporte **une erreur**. Exécutez-les pour observer le problème, puis corrigez-les.

1.  ```{exec} python
    :editor:
    def tri_insertion(liste):
        for i in range(1, len(liste)):
            j = i
            while j > 0 and liste[j - 1] < liste[j]:
                temp = liste[j - 1]
                liste[j - 1] = liste[j]
                liste[j] = temp
                j = j - 1

    nombres = [7, 3, 9, 1, 5]
    tri_insertion(nombres)
    print(nombres)
    ```

2.  ```{exec} python
    :editor:
    def tri_insertion(liste):
        for i in range(1, len(liste) - 1):
            j = i
            while j > 0 and liste[j - 1] > liste[j]:
                temp = liste[j - 1]
                liste[j - 1] = liste[j]
                liste[j] = temp
                j = j - 1

    nombres = [7, 3, 9, 5, 1]
    tri_insertion(nombres)
    print(nombres)
    ```

3.  ```{exec} python
    :editor:
    def tri_insertion(liste):
        for i in range(1, len(liste)):
            j = i
            if j > 0 and liste[j - 1] > liste[j]:
                temp = liste[j - 1]
                liste[j - 1] = liste[j]
                liste[j] = temp
                j = j - 1

    nombres = [7, 3, 9, 1, 5]
    tri_insertion(nombres)
    print(nombres)
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    def tri_insertion(liste):
        for i in range(1, len(liste)):
            j = i
            while j > 0 and liste[j - 1] > liste[j]:
                temp = liste[j - 1]
                liste[j - 1] = liste[j]
                liste[j] = temp
                j = j - 1

    nombres = [7, 3, 9, 1, 5]
    tri_insertion(nombres)
    print(nombres)
    ```
    L'élément doit reculer tant que son voisin de gauche est **plus grand** que lui. Avec `<`,
    la fonction trie la liste dans l'ordre décroissant.

2.  ```{exec} python
    :linenos:
    def tri_insertion(liste):
        for i in range(1, len(liste)):
            j = i
            while j > 0 and liste[j - 1] > liste[j]:
                temp = liste[j - 1]
                liste[j - 1] = liste[j]
                liste[j] = temp
                j = j - 1

    nombres = [7, 3, 9, 5, 1]
    tri_insertion(nombres)
    print(nombres)
    ```
    Avec `range(1, len(liste) - 1)`, le dernier élément n'est jamais inséré : il reste à la fin
    de la liste, même s'il est le plus petit.

3.  ```{exec} python
    :linenos:
    def tri_insertion(liste):
        for i in range(1, len(liste)):
            j = i
            while j > 0 and liste[j - 1] > liste[j]:
                temp = liste[j - 1]
                liste[j - 1] = liste[j]
                liste[j] = temp
                j = j - 1

    nombres = [7, 3, 9, 1, 5]
    tri_insertion(nombres)
    print(nombres)
    ```
    Avec un `if`, chaque élément ne recule que d'**une seule** case, même s'il devrait reculer
    davantage : le `1`, par exemple, ne passe que devant le `9`. Il faut un `while` pour que
    l'élément continue de reculer **tant que** son voisin de gauche est plus grand.
````

### Exercice {num1}`exercice-algo`
Le tableau des meilleurs scores d'un jeu est une liste toujours triée dans l'ordre croissant. À la fin de chaque partie, le nouveau score doit y être ajouté **à sa place**.

Écrivez une fonction `ajoute_score(scores, nouveau)` qui ajoute le nouveau score à la fin de la liste, puis le fait reculer jusqu'à sa place, comme une étape du tri par insertion. Quelle est la complexité de cette fonction ? Pourquoi est-ce bien plus rapide que de tout retrier ?

```{exec} python
:editor: 01a186ca-b367-7bed-9ff7-813fbdf6efcc
def ajoute_score(scores, nouveau):
    #Complétez le corps de la fonction

scores = [120, 340, 560, 800, 1250]
ajoute_score(scores, 600)
print(scores)    # [120, 340, 560, 600, 800, 1250]
ajoute_score(scores, 50)
print(scores)    # [50, 120, 340, 560, 600, 800, 1250]
```

````{solution}
```{exec} python
:linenos:
def ajoute_score(scores, nouveau):
    scores.append(nouveau)
    j = len(scores) - 1
    while j > 0 and scores[j - 1] > scores[j]:
        temp = scores[j - 1]
        scores[j - 1] = scores[j]
        scores[j] = temp
        j = j - 1

scores = [120, 340, 560, 800, 1250]
ajoute_score(scores, 600)
print(scores)    # [120, 340, 560, 600, 800, 1250]
ajoute_score(scores, 50)
print(scores)    # [50, 120, 340, 560, 600, 800, 1250]
```
1. Le corps de la fonction est exactement une étape du tri par insertion : le nouvel élément part
   de la dernière position et recule tant que son voisin de gauche est plus grand.
2. Dans le pire cas (un nouveau score plus petit que tous les autres), le score recule jusqu'au
   début : $n$ échanges au plus, soit du $O(n)$.
3. Retrier toute la liste avec le tri par sélection coûterait $O(n^2)$, alors que la liste était
   déjà triée. C'est le meilleur cas du tri par insertion, qui en profite pleinement.
````

### Exercice {num1}`exercice-algo`
Pour chacune des situations ci-dessous, quel tri choisiriez-vous ?

```{quiz}
:style: max-width: 40rem;
1. {choix}`insertion`
On doit retrier une liste de 100 000 résultats après y avoir ajouté 3 nouveaux résultats à la fin.

2. {choix}`sélection`
Chaque échange est très coûteux (par exemple, déplacer physiquement de lourdes caisses dans un
entrepôt), alors que les comparaisons sont rapides.

3. {choix}`insertion`
La liste est déjà triée, mais on veut le vérifier avec le moins de comparaisons possible.
```

````{solution}
1. **Insertion** : la liste est presque triée. Seuls les 3 nouveaux éléments doivent reculer, le
   reste ne demande qu'une comparaison par élément. Le tri par sélection ferait, lui, ses
   $\frac{n \cdot (n - 1)}{2}$ comparaisons habituelles, soit environ 5 milliards.
2. **Sélection** : il fait au plus $n - 1$ échanges, alors que le tri par insertion peut en faire
   $\frac{n \cdot (n - 1)}{2}$ dans le pire cas.
3. **Insertion** : sur une liste déjà triée, il ne fait que $n - 1$ comparaisons et aucun échange.
````
