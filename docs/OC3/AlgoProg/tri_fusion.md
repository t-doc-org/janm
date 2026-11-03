<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Tri fusion

## Qu'est-ce que le tri fusion ?
Deux enseignants ont chacun corrigé la moitié des copies d'un examen, et chacun a trié sa pile de copies par ordre alphabétique. Pour obtenir une seule pile triée, inutile de tout recommencer : il suffit de regarder la première copie de chaque pile, de prendre celle qui vient en premier dans l'alphabet, et de recommencer jusqu'à ce que les deux piles soient vides. Cette opération s'appelle une *fusion*.

Le *tri fusion* applique le principe *diviser pour régner* vu dans la page sur les fonctions récursives :

1. on **coupe** la liste en deux moitiés ;
2. on **trie** chaque moitié, par un appel récursif ;
3. on **fusionne** les deux moitiés triées.

Le cas de base est une liste de 0 ou 1 élément, qui est forcément déjà triée.

```{code-block} text
:linenos:
Pour trier une liste :
    Si elle contient au plus un élément, elle est déjà triée : la retourner telle quelle
    Sinon :
        Couper la liste en deux moitiés
        Trier la moitié gauche (appel récursif)
        Trier la moitié droite (appel récursif)
        Retourner la fusion des deux moitiés triées
```

Observez l'algorithme dans la visualisation ci-dessous. Sous les barres, l'*arbre des appels* montre tous les appels récursifs : l'appel en cours en orange, les appels en attente en bleu, et les appels terminés en vert. La *pile d'appels* affiche les appels en attente, du premier lancé jusqu'à celui en cours.

<div class="tri-visu" data-algo="fusion" data-liste="7 3 9 1 5 8 2 6"></div>

## La fusion de deux listes triées
Le cœur de l'algorithme est la fusion. Comme les deux listes sont triées, leur plus petit élément est forcément leur premier élément (leur *tête*). On compare donc les deux têtes, on place la plus petite dans le résultat, et on avance dans la liste d'où elle vient. Quand l'une des deux listes est épuisée, on ajoute simplement tous les éléments restants de l'autre.

Voici la fusion de `[1, 3, 7, 9]` et `[2, 5, 6, 8]` :

| Têtes comparées | Élément placé | Résultat |
| :-------------: | :-----------: | :------- |
| `1` et `2` | `1` | `[1]` |
| `3` et `2` | `2` | `[1, 2]` |
| `3` et `5` | `3` | `[1, 2, 3]` |
| `7` et `5` | `5` | `[1, 2, 3, 5]` |
| `7` et `6` | `6` | `[1, 2, 3, 5, 6]` |
| `7` et `8` | `7` | `[1, 2, 3, 5, 6, 7]` |
| `9` et `8` | `8` | `[1, 2, 3, 5, 6, 7, 8]` |
| la liste de droite est vide | `9` | `[1, 2, 3, 5, 6, 7, 8, 9]` |

En Python, deux variables `i` et `j` indiquent la position de la tête de chaque liste :

```{exec} python
:linenos:
def fusion(gauche, droite):
    resultat = []
    i = 0
    j = 0
    # Tant qu'aucune des deux listes n'est épuisée, on compare les têtes
    while i < len(gauche) and j < len(droite):
        if gauche[i] <= droite[j]:
            resultat.append(gauche[i])
            i = i + 1
        else:
            resultat.append(droite[j])
            j = j + 1
    # On ajoute les éléments restants (une seule des deux boucles s'exécute)
    while i < len(gauche):
        resultat.append(gauche[i])
        i = i + 1
    while j < len(droite):
        resultat.append(droite[j])
        j = j + 1
    return resultat

print(fusion([1, 3, 7, 9], [2, 5, 6, 8]))
```

## Le code du tri fusion
Grâce à la fonction `fusion`, le tri fusion lui-même tient en quelques lignes. Contrairement aux tris par sélection et par insertion, il ne modifie pas la liste reçue : il **retourne une nouvelle liste** triée.

```{exec} python
:linenos:
def fusion(gauche, droite):
    resultat = []
    i = 0
    j = 0
    while i < len(gauche) and j < len(droite):
        if gauche[i] <= droite[j]:
            resultat.append(gauche[i])
            i = i + 1
        else:
            resultat.append(droite[j])
            j = j + 1
    while i < len(gauche):
        resultat.append(gauche[i])
        i = i + 1
    while j < len(droite):
        resultat.append(droite[j])
        j = j + 1
    return resultat

def tri_fusion(liste):
    if len(liste) <= 1:
        return liste
    milieu = len(liste) // 2
    gauche = tri_fusion(liste[:milieu])
    droite = tri_fusion(liste[milieu:])
    return fusion(gauche, droite)

nombres = [7, 3, 9, 1, 5, 8, 2, 6]
print(tri_fusion(nombres))
```

1. Le cas de base (`len(liste) <= 1`) est indispensable : sans lui, la fonction couperait des listes vides en deux indéfiniment.
2. Les tranches `liste[:milieu]` et `liste[milieu:]` créent les deux moitiés.
3. Les deux appels récursifs retournent les moitiés **triées**, qu'il ne reste plus qu'à fusionner.

L'arbre ci-dessous résume tous les appels pour la liste `[7, 3, 9, 1, 5, 8, 2, 6]`. Les appels descendent en coupant les listes en deux jusqu'au cas de base, puis les résultats remontent en étant fusionnés.

```{code-block} text
tri_fusion([7, 3, 9, 1, 5, 8, 2, 6])
├── tri_fusion([7, 3, 9, 1])
│   ├── tri_fusion([7, 3])
│   │   ├── tri_fusion([7])  →  [7]
│   │   ├── tri_fusion([3])  →  [3]
│   │   └── fusion           →  [3, 7]
│   ├── tri_fusion([9, 1])
│   │   ├── tri_fusion([9])  →  [9]
│   │   ├── tri_fusion([1])  →  [1]
│   │   └── fusion           →  [1, 9]
│   └── fusion               →  [1, 3, 7, 9]
├── tri_fusion([5, 8, 2, 6])
│   ├── ...                  →  [5, 8]
│   ├── ...                  →  [2, 6]
│   └── fusion               →  [2, 5, 6, 8]
└── fusion                   →  [1, 2, 3, 5, 6, 7, 8, 9]
```

## À vous de jouer
Triez la liste ci-dessous en suivant **exactement** le tri fusion. Les découpages et les appels récursifs se font automatiquement ; à chaque fusion, comparez les têtes des deux moitiés (sélectionnez-les puis cliquez sur "Comparer"), puis placez la plus petite dans la liste fusionnée (sélectionnez-la puis cliquez sur "Placer").

<div class="tri-exo" data-algo="fusion" data-liste="5 2 8 1 6 3"></div>

## Complexité
Pour estimer le nombre d'opérations du tri fusion, regardons l'arbre des appels **niveau par niveau**.

- **Combien de niveaux ?** À chaque niveau, les listes sont deux fois plus courtes. Une liste de 8 éléments donne des listes de 4, puis de 2, puis de 1 élément : 3 niveaux de découpage. Une liste de 16 éléments en demande 4, une liste de 1024 éléments 10. On retrouve le *logarithme en base 2* de la page sur la recherche : le nombre de fois qu'on peut diviser $n$ par 2 avant d'arriver à 1, noté $\log_2(n)$. Par exemple, $\log_2(8) = 3$ car $2^3 = 8$, et $\log_2(1\,000\,000) \approx 20$.
- **Combien d'opérations par niveau ?** À chaque niveau, les fusions placent chaque élément de la liste exactement une fois : environ $n$ opérations par niveau.

Au total, le tri fusion effectue donc environ $n \cdot \log_2(n)$ opérations : il est en $O(n \log n)$, et ce quel que soit le contenu de la liste. Comme $\log_2(n)$ grandit très lentement, la différence avec $O(n^2)$ est énorme dès que les listes deviennent grandes :

| $n$ | $n^2$ (sélection) | $n \cdot \log_2(n)$ (fusion) |
| :-: | :---------------: | :--------------------------: |
| $10$ | $100$ | environ $33$ |
| $1000$ | $10^6$ | environ $10\,000$ |
| $1\,000\,000$ | $10^{12}$ | environ $2 \cdot 10^7$ |

Pour un million d'éléments, sur un ordinateur effectuant un milliard d'opérations par seconde, le tri par sélection prend plus d'un quart d'heure ; le tri fusion, environ deux centièmes de seconde !

```{exec} python
:linenos:
from random import randint

nb_comparaisons = [0]    # une liste, pour pouvoir la modifier dans la fonction

def fusion(gauche, droite):
    resultat = []
    i = 0
    j = 0
    while i < len(gauche) and j < len(droite):
        nb_comparaisons[0] = nb_comparaisons[0] + 1
        if gauche[i] <= droite[j]:
            resultat.append(gauche[i])
            i = i + 1
        else:
            resultat.append(droite[j])
            j = j + 1
    while i < len(gauche):
        resultat.append(gauche[i])
        i = i + 1
    while j < len(droite):
        resultat.append(droite[j])
        j = j + 1
    return resultat

def tri_fusion(liste):
    if len(liste) <= 1:
        return liste
    milieu = len(liste) // 2
    return fusion(tri_fusion(liste[:milieu]), tri_fusion(liste[milieu:]))

for n in [10, 100, 1000, 10000]:
    liste = []
    for k in range(n):
        liste.append(randint(1, 100000))
    nb_comparaisons[0] = 0
    tri_fusion(liste)
    print(n, "éléments :", nb_comparaisons[0], "comparaisons, contre", n * (n - 1) // 2, "pour le tri par sélection")
```

```{important}
Tri fusion, pour une liste de $n$ éléments :
- l'arbre des appels compte environ $\log_2(n)$ niveaux, et chaque niveau demande environ $n$ opérations ;
- la complexité est donc en $O(n \log n)$, dans tous les cas ;
- contrairement aux tris précédents, il a besoin de mémoire supplémentaire pour créer les nouvelles listes.
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
Répondez aux questions ci-dessous **sans exécuter** de programme. Pour les listes, écrivez par exemple `[4, 2, 7]`.

```{quiz}
:style: max-width: 40rem;
1. {liste}`[1, 2, 5, 6, 7, 8, 9]`
Que retourne `fusion([2, 5, 8], [1, 6, 7, 9])` ?

2. {nombre}`6`
Combien de comparaisons de têtes cette fusion effectue-t-elle ?

3. {nombre}`15`
Combien d'appels de `tri_fusion` (en comptant le premier) le tri de la liste `[7, 3, 9, 1, 5, 8, 2, 6]` provoque-t-il ?

4. {nombre}`4`
Combien de niveaux de découpage faut-il pour une liste de 16 éléments ?

5. {nombre}`10`
Que vaut $\log_2(1024)$ ?
```

````{solution}
1. Les têtes comparées sont successivement `2`/`1`, `2`/`6`, `5`/`6`, `8`/`6`, `8`/`7` et
   `8`/`9`. Il ne reste alors que `9` dans la liste de droite, qui est ajouté sans comparaison.
2. **6** comparaisons : la dernière valeur, `9`, est ajoutée sans comparaison une fois la liste
   de gauche épuisée.
3. **15** appels : 1 pour la liste complète, 2 pour les moitiés de 4, 4 pour les listes de 2, et
   8 pour les listes d'un seul élément. De manière générale, il y a $2n - 1$ appels pour une
   liste de $n$ éléments (lorsque $n$ est une puissance de 2).
4. **4** : $16 \to 8 \to 4 \to 2 \to 1$.
5. **10**, car $2^{10} = 1024$.
````

### Exercice {num1}`exercice-algo`
Triez cette liste plus longue avec le tri fusion. Cette fois, seuls les **placements** sont demandés : à vous de comparer mentalement les têtes des deux moitiés.

<div class="tri-exo" data-algo="fusion" data-mode="echanges" data-liste="14 3 27 9 21 5 18 11"></div>

### Exercice {num1}`exercice-algo`
Chacun des programmes ci-dessous comporte **une erreur**. Exécutez-les pour observer le problème, puis corrigez-les.

1.  ```{exec} python
    :editor:
    def fusion(gauche, droite):
        resultat = []
        i = 0
        j = 0
        while i < len(gauche) and j < len(droite):
            if gauche[i] <= droite[j]:
                resultat.append(gauche[i])
                i = i + 1
            else:
                resultat.append(droite[j])
                j = j + 1
        return resultat

    print(fusion([1, 3, 7, 9], [2, 5, 6, 8]))    # devrait afficher [1, 2, 3, 5, 6, 7, 8, 9]
    ```

2.  ```{exec} python
    :editor:
    def fusion(gauche, droite):
        resultat = []
        i = 0
        j = 0
        while i < len(gauche) and j < len(droite):
            if gauche[i] <= droite[j]:
                resultat.append(gauche[i])
                i = i + 1
            else:
                resultat.append(droite[j])
                j = j + 1
        while i < len(gauche):
            resultat.append(gauche[i])
            i = i + 1
        while j < len(droite):
            resultat.append(droite[j])
            j = j + 1
        return resultat

    def tri_fusion(liste):
        if len(liste) <= 1:
            return liste
        milieu = len(liste) // 2
        return fusion(liste[:milieu], liste[milieu:])

    print(tri_fusion([7, 3, 9, 1, 5, 8, 2, 6]))
    ```

3.  ```{exec} python
    :editor:
    def fusion(gauche, droite):
        resultat = []
        i = 0
        j = 0
        while i < len(gauche) and j < len(droite):
            if gauche[i] <= droite[j]:
                resultat.append(gauche[i])
                j = j + 1
            else:
                resultat.append(droite[j])
                i = i + 1
        while i < len(gauche):
            resultat.append(gauche[i])
            i = i + 1
        while j < len(droite):
            resultat.append(droite[j])
            j = j + 1
        return resultat

    print(fusion([1, 3, 7, 9], [2, 5, 6, 8]))    # devrait afficher [1, 2, 3, 5, 6, 7, 8, 9]
    ```

````{solution}
1.  Il manque les deux boucles qui ajoutent les éléments restants. Dès que l'une des listes est
    épuisée, la boucle s'arrête, et les éléments restants de l'autre liste (ici le `9`) sont
    perdus.
    ```{exec} python
    :linenos:
    def fusion(gauche, droite):
        resultat = []
        i = 0
        j = 0
        while i < len(gauche) and j < len(droite):
            if gauche[i] <= droite[j]:
                resultat.append(gauche[i])
                i = i + 1
            else:
                resultat.append(droite[j])
                j = j + 1
        while i < len(gauche):
            resultat.append(gauche[i])
            i = i + 1
        while j < len(droite):
            resultat.append(droite[j])
            j = j + 1
        return resultat

    print(fusion([1, 3, 7, 9], [2, 5, 6, 8]))
    ```

2.  La fonction fusionne les deux moitiés **sans les avoir triées** : il manque les deux appels
    récursifs. Or la fusion ne fonctionne que si les deux listes reçues sont triées.
    ```{exec} python
    :linenos:
    def fusion(gauche, droite):
        resultat = []
        i = 0
        j = 0
        while i < len(gauche) and j < len(droite):
            if gauche[i] <= droite[j]:
                resultat.append(gauche[i])
                i = i + 1
            else:
                resultat.append(droite[j])
                j = j + 1
        while i < len(gauche):
            resultat.append(gauche[i])
            i = i + 1
        while j < len(droite):
            resultat.append(droite[j])
            j = j + 1
        return resultat

    def tri_fusion(liste):
        if len(liste) <= 1:
            return liste
        milieu = len(liste) // 2
        gauche = tri_fusion(liste[:milieu])
        droite = tri_fusion(liste[milieu:])
        return fusion(gauche, droite)

    print(tri_fusion([7, 3, 9, 1, 5, 8, 2, 6]))
    ```

3.  Après avoir placé un élément, c'est la tête de la liste **d'où il vient** qui doit avancer :
    `i` pour la liste de gauche, `j` pour celle de droite. Ici, les deux sont inversés : la même
    valeur est placée plusieurs fois, et d'autres sont sautées.
    ```{exec} python
    :linenos:
    def fusion(gauche, droite):
        resultat = []
        i = 0
        j = 0
        while i < len(gauche) and j < len(droite):
            if gauche[i] <= droite[j]:
                resultat.append(gauche[i])
                i = i + 1
            else:
                resultat.append(droite[j])
                j = j + 1
        while i < len(gauche):
            resultat.append(gauche[i])
            i = i + 1
        while j < len(droite):
            resultat.append(droite[j])
            j = j + 1
        return resultat

    print(fusion([1, 3, 7, 9], [2, 5, 6, 8]))
    ```
````

### Exercice {num1}`exercice-algo`
Une course de ski s'est déroulée en deux manches, avec des concurrents différents dans chaque manche. Les temps de chaque manche (en secondes) sont déjà triés. Utilisez la fonction `fusion` pour établir le classement général, puis affichez le podium (les trois meilleurs temps) et le nombre total de concurrents.

```{exec} python
:editor: 01a18737-4f91-72f1-9223-748aee9a96a7
manche_1 = [61.2, 62.8, 63.5, 65.1, 68.9]
manche_2 = [60.7, 63.1, 64.4, 66.0]

#Complétez le programme ici
```

````{solution}
```{exec} python
:linenos:
def fusion(gauche, droite):
    resultat = []
    i = 0
    j = 0
    while i < len(gauche) and j < len(droite):
        if gauche[i] <= droite[j]:
            resultat.append(gauche[i])
            i = i + 1
        else:
            resultat.append(droite[j])
            j = j + 1
    while i < len(gauche):
        resultat.append(gauche[i])
        i = i + 1
    while j < len(droite):
        resultat.append(droite[j])
        j = j + 1
    return resultat

manche_1 = [61.2, 62.8, 63.5, 65.1, 68.9]
manche_2 = [60.7, 63.1, 64.4, 66.0]

classement = fusion(manche_1, manche_2)
print("Podium :", classement[:3])
print("Nombre de concurrents :", len(classement))
```
Les deux listes étant déjà triées, une seule fusion suffit : $O(n)$ opérations, au lieu de
retrier toute la liste. La tranche `classement[:3]` donne les trois premiers temps.
````

### Exercice {num1}`exercice-algo`
Modifiez le tri fusion pour qu'il trie la liste dans l'ordre **décroissant**. Une seule ligne doit changer : laquelle ?

```{exec} python
:editor: 01a18737-4f94-75ac-8af1-67ef24e04155
def fusion(gauche, droite):
    resultat = []
    i = 0
    j = 0
    while i < len(gauche) and j < len(droite):
        if gauche[i] <= droite[j]:
            resultat.append(gauche[i])
            i = i + 1
        else:
            resultat.append(droite[j])
            j = j + 1
    while i < len(gauche):
        resultat.append(gauche[i])
        i = i + 1
    while j < len(droite):
        resultat.append(droite[j])
        j = j + 1
    return resultat

def tri_fusion(liste):
    if len(liste) <= 1:
        return liste
    milieu = len(liste) // 2
    gauche = tri_fusion(liste[:milieu])
    droite = tri_fusion(liste[milieu:])
    return fusion(gauche, droite)

print(tri_fusion([7, 3, 9, 1, 5, 8, 2, 6]))    # devrait afficher [9, 8, 7, 6, 5, 3, 2, 1]
```

````{solution}
```{exec} python
:linenos:
def fusion(gauche, droite):
    resultat = []
    i = 0
    j = 0
    while i < len(gauche) and j < len(droite):
        if gauche[i] >= droite[j]:
            resultat.append(gauche[i])
            i = i + 1
        else:
            resultat.append(droite[j])
            j = j + 1
    while i < len(gauche):
        resultat.append(gauche[i])
        i = i + 1
    while j < len(droite):
        resultat.append(droite[j])
        j = j + 1
    return resultat

def tri_fusion(liste):
    if len(liste) <= 1:
        return liste
    milieu = len(liste) // 2
    gauche = tri_fusion(liste[:milieu])
    droite = tri_fusion(liste[milieu:])
    return fusion(gauche, droite)

print(tri_fusion([7, 3, 9, 1, 5, 8, 2, 6]))
```
Seule la comparaison de la ligne 6 change : on place désormais la **plus grande** des deux têtes.
La fonction `tri_fusion` elle-même ne compare jamais d'éléments : elle se contente de couper et
de déléguer le travail à `fusion`. Les deux moitiés sont alors triées dans l'ordre décroissant,
et la fusion les combine en conservant cet ordre.
````
