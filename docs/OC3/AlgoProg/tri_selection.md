<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Tri par sélection

## Qu'est-ce qu'un algorithme de tri ?
*Trier* une liste, c'est réordonner ses éléments du plus petit au plus grand (ou l'inverse). C'est l'une des opérations les plus courantes en informatique : classement d'une compétition, résultats d'une recherche du plus pertinent au moins pertinent, contacts par ordre alphabétique... Et comme on l'a vu avec la recherche dichotomique, une liste triée permet souvent d'écrire des algorithmes beaucoup plus rapides par la suite.

Python sait évidemment trier une liste tout seul, mais il existe de nombreuses manières de le faire, plus ou moins rapides. Dans les pages qui suivent, nous allons étudier les plus célèbres, comprendre leur fonctionnement, les programmer, et comparer leur complexité.

## Le principe du tri par sélection
Imaginez que vous deviez ranger les élèves d'une classe par taille, du plus petit au plus grand. Une méthode naturelle consiste à chercher le plus petit élève et à le placer au début de la rangée, puis à chercher le plus petit parmi ceux qui restent et à le placer en deuxième position, et ainsi de suite. C'est exactement le principe du *tri par sélection* : à chaque étape, on **sélectionne** le minimum de la partie non triée, et on l'**échange** avec le premier élément de cette partie.

```{code-block} text
:linenos:
Pour chaque position i, de la première à l'avant-dernière :
    Chercher la position du minimum parmi les éléments de la position i jusqu'à la fin
    Échanger ce minimum avec l'élément de la position i
```

Après le premier passage, le plus petit élément est à sa place définitive au début de la liste. Après le deuxième passage, les deux plus petits sont à leur place, etc. Le dernier élément n'a pas besoin d'être traité : quand tous les autres sont à leur place, il l'est forcément aussi.

Observez l'algorithme en action dans la visualisation ci-dessous, étape par étape ou en lecture automatique. Vous pouvez aussi tirer de nouvelles listes.

<div class="tri-visu" data-algo="selection" data-liste="7 3 9 1 5 8 2 6"></div>

## Exemple pas à pas
Le tableau ci-dessous résume le tri de la liste `[7, 3, 9, 1, 5]`. La partie déjà triée est en gras.

| Passage | Partie non triée | Minimum | Échange | Liste après le passage |
| :-----: | :--------------- | :-----: | :------ | :--------------------- |
| `i = 0` | `[7, 3, 9, 1, 5]` | `1` | `1` et `7` | [**1**, 3, 9, 7, 5] |
| `i = 1` | `[3, 9, 7, 5]` | `3` | aucun, il est déjà à sa place | [**1**, **3**, 9, 7, 5] |
| `i = 2` | `[9, 7, 5]` | `5` | `5` et `9` | [**1**, **3**, **5**, 7, 9] |
| `i = 3` | `[7, 9]` | `7` | aucun, il est déjà à sa place | [**1**, **3**, **5**, **7**, **9**] |

## Modifier et échanger des éléments d'une liste
Pour programmer ce tri, il faut savoir **modifier** un élément d'une liste. Pour cela, on affecte une nouvelle valeur à l'élément, désigné par son index.

```{exec} python
:linenos:
scores = [10, 25, 7]
scores[2] = 30               # remplace le 7 par 30
scores[0] = scores[0] + 5    # ajoute 5 au premier score
print(scores)
```

Pour **échanger** deux éléments, il ne suffit pas d'écrire `liste[i] = liste[j]` puis `liste[j] = liste[i]` : la première affectation écrase la valeur de `liste[i]`, qui est alors perdue (souvenez-vous du faux échange de la page sur les variables). Il faut d'abord la sauvegarder dans une variable temporaire.

```{exec} python
:linenos:
lettres = ["A", "B", "C", "D"]
temp = lettres[0]
lettres[0] = lettres[3]
lettres[3] = temp
print(lettres)
```

Enfin, une fonction peut recevoir une liste en paramètre et la **modifier directement**. Dans ce cas, la modification reste visible après l'appel, même sans `return`.

```{exec} python
:linenos:
def bonus(notes):
    notes[0] = notes[0] + 0.5

mes_notes = [4.5, 5, 3.5]
bonus(mes_notes)
print(mes_notes)
```

```{important}
- `liste[i] = valeur` remplace l'élément d'index `i`.
- Pour échanger deux éléments, on passe par une variable temporaire.
- Une fonction qui modifie une liste reçue en paramètre la modifie **pour tout le programme**.
```

## Le code Python
On peut maintenant traduire l'algorithme en Python. La fonction `tri_selection` ne retourne rien : elle trie directement la liste reçue en paramètre.

```{exec} python
:linenos:
def tri_selection(liste):
    n = len(liste)
    for i in range(n - 1):
        # Recherche du minimum de la partie non triée
        position_min = i
        for j in range(i + 1, n):
            if liste[j] < liste[position_min]:
                position_min = j
        # Échange du minimum avec le premier élément de la partie non triée
        if position_min != i:
            temp = liste[i]
            liste[i] = liste[position_min]
            liste[position_min] = temp

nombres = [7, 3, 9, 1, 5, 8, 2, 6]
tri_selection(nombres)
print(nombres)
```

1. La boucle extérieure parcourt les positions `0` à `n - 2` : c'est la position `i` à remplir avec le minimum de la partie non triée.
2. La boucle intérieure cherche la **position** du minimum (et non sa valeur), car c'est elle dont on a besoin pour faire l'échange. On part du principe que le minimum est en position `i`, puis on compare chaque élément suivant au minimum trouvé jusque-là.
3. L'échange n'est fait que si le minimum n'est pas déjà à sa place.

## À vous de jouer
Triez la liste ci-dessous en suivant **exactement** le tri par sélection. Sélectionnez deux éléments en cliquant dessus, puis choisissez l'opération : chaque comparaison et chaque échange doivent être faits dans le bon ordre.

<div class="tri-exo" data-algo="selection" data-liste="5 2 8 1 6"></div>

## Complexité
Pour une liste de $n$ éléments, le premier passage compare le minimum provisoire aux $n - 1$ éléments suivants, le deuxième passage fait $n - 2$ comparaisons, et ainsi de suite jusqu'au dernier passage, qui n'en fait qu'une. On retrouve la somme de la page sur la complexité :

$$(n - 1) + (n - 2) + \ldots + 2 + 1 = \frac{n \cdot (n - 1)}{2}$$

Le tri par sélection est donc en $O(n^2)$. Surtout, ce nombre de comparaisons ne dépend **pas** du contenu de la liste : même une liste déjà triée demande exactement le même travail, car l'algorithme doit tout parcourir pour être sûr d'avoir trouvé le minimum. Vérifiez-le dans la visualisation de la théorie en choisissant une liste "déjà triée", ou avec le programme ci-dessous.

```{exec} python
:linenos:
from random import randint

def tri_selection_compte(liste):
    nb_comparaisons = 0
    n = len(liste)
    for i in range(n - 1):
        position_min = i
        for j in range(i + 1, n):
            nb_comparaisons = nb_comparaisons + 1
            if liste[j] < liste[position_min]:
                position_min = j
        if position_min != i:
            temp = liste[i]
            liste[i] = liste[position_min]
            liste[position_min] = temp
    return nb_comparaisons

for n in [10, 100, 1000]:
    aleatoire = []
    triee = []
    for k in range(n):
        aleatoire.append(randint(1, 1000))
        triee.append(k)
    print(n, "éléments :", tri_selection_compte(aleatoire), "comparaisons (liste aléatoire),",
          tri_selection_compte(triee), "comparaisons (liste déjà triée)")
```

En revanche, le tri par sélection fait très peu d'**échanges** : au plus un par passage, soit au plus $n - 1$ échanges au total.

```{important}
Tri par sélection, pour une liste de $n$ éléments :
- comparaisons : toujours $\frac{n \cdot (n - 1)}{2}$, quel que soit le contenu de la liste, donc $O(n^2)$ ;
- échanges : au plus $n - 1$.
```

## Exercices

```{role} liste(quiz-input)
:right: width: 11rem;
:check: remove([^0-9])
```

```{role} nombre(quiz-input)
:right: width: 6rem;
:check: remove
```

### Exercice {num1}`exercice-algo`
On trie la liste `[6, 2, 8, 4, 1, 9, 3]` avec le tri par sélection. Répondez **sans exécuter** de programme. Pour les listes, écrivez par exemple `[4, 2, 7]`.

```{quiz}
:style: max-width: 40rem;
1. {liste}`[1, 2, 8, 4, 6, 9, 3]`
Que vaut la liste après le premier passage ?

2. {liste}`[1, 2, 8, 4, 6, 9, 3]`
Que vaut la liste après le deuxième passage ?

3. {liste}`[1, 2, 3, 4, 6, 9, 8]`
Que vaut la liste après le troisième passage ?

4. {nombre}`21`
Combien de comparaisons le tri effectue-t-il au total ?

5. {nombre}`3`
Combien d'échanges le tri effectue-t-il au total ?
```

````{solution}
1. Le minimum de toute la liste est `1` : il est échangé avec `6`, le premier élément.
2. Le minimum de `[2, 8, 4, 6, 9, 3]` est `2`, qui est déjà en position 1 : pas d'échange, la
   liste ne change pas.
3. Le minimum de `[8, 4, 6, 9, 3]` est `3` : il est échangé avec `8`.
4. Pour 7 éléments : $6 + 5 + 4 + 3 + 2 + 1 = \frac{7 \cdot 6}{2} = 21$ comparaisons.
5. Les passages suivants donnent `[1, 2, 3, 4, 6, 9, 8]` (pas d'échange, `4` est en place),
   puis encore aucun échange pour `6`, et enfin l'échange de `9` et `8`. Au total : `1` et `6`,
   `3` et `8`, puis `8` et `9`, soit 3 échanges.
````

### Exercice {num1}`exercice-algo`
Triez cette liste plus longue avec le tri par sélection. Cette fois, seuls les **échanges** sont demandés : à vous de trouver mentalement le minimum à chaque passage.

<div class="tri-exo" data-algo="selection" data-mode="echanges" data-liste="14 3 27 9 21 5 18 11"></div>

### Exercice {num1}`exercice-algo`
Chacune des fonctions ci-dessous devrait trier la liste par sélection, mais comporte **une erreur**. Exécutez-les pour observer le problème, puis corrigez-les.

1.  ```{exec} python
    :editor:
    def tri_selection(liste):
        n = len(liste)
        for i in range(n - 1):
            position_min = 0
            for j in range(i + 1, n):
                if liste[j] < liste[position_min]:
                    position_min = j
            if position_min != i:
                temp = liste[i]
                liste[i] = liste[position_min]
                liste[position_min] = temp

    nombres = [7, 3, 9, 1, 5]
    tri_selection(nombres)
    print(nombres)
    ```

2.  ```{exec} python
    :editor:
    def tri_selection(liste):
        n = len(liste)
        for i in range(n - 1):
            position_min = i
            for j in range(i + 1, n - 1):
                if liste[j] < liste[position_min]:
                    position_min = j
            if position_min != i:
                temp = liste[i]
                liste[i] = liste[position_min]
                liste[position_min] = temp

    nombres = [5, 3, 8, 1]
    tri_selection(nombres)
    print(nombres)
    ```

3.  ```{exec} python
    :editor:
    def tri_selection(liste):
        n = len(liste)
        for i in range(n - 1):
            position_min = i
            for j in range(i + 1, n):
                if liste[j] < liste[position_min]:
                    position_min = j
            if position_min != i:
                liste[i] = liste[position_min]
                liste[position_min] = liste[i]

    nombres = [7, 3, 9, 1, 5]
    tri_selection(nombres)
    print(nombres)
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    def tri_selection(liste):
        n = len(liste)
        for i in range(n - 1):
            position_min = i
            for j in range(i + 1, n):
                if liste[j] < liste[position_min]:
                    position_min = j
            if position_min != i:
                temp = liste[i]
                liste[i] = liste[position_min]
                liste[position_min] = temp

    nombres = [7, 3, 9, 1, 5]
    tri_selection(nombres)
    print(nombres)
    ```
    Le minimum provisoire doit être le premier élément de la partie **non triée**, c'est-à-dire
    `liste[i]`. Avec `position_min = 0`, dès le deuxième passage, le minimum provisoire est le
    plus petit élément de toute la liste (déjà placé en position 0), et l'algorithme le déplace
    à nouveau.

2.  ```{exec} python
    :linenos:
    def tri_selection(liste):
        n = len(liste)
        for i in range(n - 1):
            position_min = i
            for j in range(i + 1, n):
                if liste[j] < liste[position_min]:
                    position_min = j
            if position_min != i:
                temp = liste[i]
                liste[i] = liste[position_min]
                liste[position_min] = temp

    nombres = [5, 3, 8, 1]
    tri_selection(nombres)
    print(nombres)
    ```
    La fin d'un `range()` est exclue : avec `range(i + 1, n - 1)`, le dernier élément de la liste
    n'est jamais examiné. Si le minimum s'y trouve, il n'est pas trouvé.

3.  ```{exec} python
    :linenos:
    def tri_selection(liste):
        n = len(liste)
        for i in range(n - 1):
            position_min = i
            for j in range(i + 1, n):
                if liste[j] < liste[position_min]:
                    position_min = j
            if position_min != i:
                temp = liste[i]
                liste[i] = liste[position_min]
                liste[position_min] = temp

    nombres = [7, 3, 9, 1, 5]
    tri_selection(nombres)
    print(nombres)
    ```
    C'est le faux échange : la première affectation écrase `liste[i]`, et la seconde recopie
    donc la même valeur. Des éléments disparaissent et d'autres apparaissent deux fois.
````

### Exercice {num1}`exercice-algo`
1. Modifiez la fonction `tri_selection` pour qu'elle trie la liste dans l'ordre **décroissant**.
2. Testez ensuite la fonction d'origine (ordre croissant) sur une liste de prénoms. Fonctionne-t-elle ? Pourquoi ?

```{exec} python
:editor: 01a186ca-b362-7b26-af1a-758b4bcc975c
def tri_selection_decroissant(liste):
    #Complétez le corps de la fonction

nombres = [7, 3, 9, 1, 5, 8, 2, 6]
tri_selection_decroissant(nombres)
print(nombres)
```

````{solution}
```{exec} python
:linenos:
def tri_selection_decroissant(liste):
    n = len(liste)
    for i in range(n - 1):
        position_max = i
        for j in range(i + 1, n):
            if liste[j] > liste[position_max]:
                position_max = j
        if position_max != i:
            temp = liste[i]
            liste[i] = liste[position_max]
            liste[position_max] = temp

nombres = [7, 3, 9, 1, 5, 8, 2, 6]
tri_selection_decroissant(nombres)
print(nombres)

def tri_selection(liste):
    n = len(liste)
    for i in range(n - 1):
        position_min = i
        for j in range(i + 1, n):
            if liste[j] < liste[position_min]:
                position_min = j
        if position_min != i:
            temp = liste[i]
            liste[i] = liste[position_min]
            liste[position_min] = temp

prénoms = ["Mila", "Loris", "Anja", "Kilian", "Sara", "Pedro"]
tri_selection(prénoms)
print(prénoms)
```
1. Il suffit d'inverser la comparaison : on sélectionne cette fois le **maximum** de la partie
   non triée. Seul le signe `<` change vraiment ; renommer la variable en `position_max` rend
   simplement le code plus lisible.
2. La fonction trie les prénoms par ordre alphabétique sans aucune modification : en Python, les
   opérateurs `<` et `>` comparent les `str` selon l'ordre alphabétique (`"Anja" < "Loris"`
   vaut `True`). L'algorithme ne s'intéresse qu'au résultat des comparaisons, pas au type des
   éléments.
````

### Exercice {num1}`exercice-algo`
Écrivez une fonction `nb_echanges_selection(liste)` qui trie la liste par sélection et **retourne** le nombre d'échanges effectués. Avant d'exécuter votre programme, essayez de prédire le résultat pour chacune des trois listes proposées. La troisième devrait vous surprendre !

```{exec} python
:editor: 01a186ca-b364-74e9-9dba-a2a1f982a058
def nb_echanges_selection(liste):
    #Complétez le corps de la fonction

print(nb_echanges_selection([1, 2, 3, 4, 5, 6]))
print(nb_echanges_selection([2, 1, 4, 3, 6, 5]))
print(nb_echanges_selection([6, 5, 4, 3, 2, 1]))
```

````{solution}
```{exec} python
:linenos:
def nb_echanges_selection(liste):
    nb_echanges = 0
    n = len(liste)
    for i in range(n - 1):
        position_min = i
        for j in range(i + 1, n):
            if liste[j] < liste[position_min]:
                position_min = j
        if position_min != i:
            temp = liste[i]
            liste[i] = liste[position_min]
            liste[position_min] = temp
            nb_echanges = nb_echanges + 1
    return nb_echanges

print(nb_echanges_selection([1, 2, 3, 4, 5, 6]))
print(nb_echanges_selection([2, 1, 4, 3, 6, 5]))
print(nb_echanges_selection([6, 5, 4, 3, 2, 1]))
```
1. Une liste déjà triée ne demande **aucun** échange : chaque minimum est déjà à sa place.
2. Pour `[2, 1, 4, 3, 6, 5]`, il faut 3 échanges, un pour chaque paire inversée.
3. La liste triée à l'envers ne demande elle aussi que **3** échanges, et non 5 : en échangeant
   `1` et `6`, on place d'un coup deux éléments à leur place définitive (l'un au début, l'autre
   à la fin). Il en va de même pour `2` et `5`, puis pour `3` et `4`.
````
