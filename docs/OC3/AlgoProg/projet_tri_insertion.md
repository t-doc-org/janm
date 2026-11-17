<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Partie 3 : le tri par insertion

## Le principe
Lorsque vous jouez aux cartes, vous rangez probablement votre main sans y penser : vous prenez les cartes une par une, et vous **insérez** chaque nouvelle carte à sa place parmi celles que vous tenez déjà, qui sont triées. Pour cela, vous la faites glisser vers la gauche tant que la carte voisine est plus grande. C'est exactement le principe du *tri par insertion*.

Au début, le premier élément forme à lui seul une partie triée. On prend ensuite le deuxième élément et on l'insère dans cette partie triée, puis le troisième, et ainsi de suite. Pour insérer un élément, on l'échange avec son voisin de gauche **tant que** ce voisin est plus grand que lui.

```{code-block} text
:linenos:
Pour chaque position i, de la deuxième à la dernière :
    Tant que l'élément n'est pas au début de la liste et que son voisin de gauche est plus grand :
        Échanger l'élément avec son voisin de gauche
```

<!-- Vidéo : tri par insertion -->

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

## À vous de jouer
Triez la liste ci-dessous en suivant **exactement** le tri par insertion : chaque comparaison et chaque échange doivent être faits dans le bon ordre.

<div class="tri-exo" data-algo="insertion" data-liste="5 2 8 1 6"></div>

## Questions

### Question {num1}`question-tri:q-insertion-trace`
Triez à la main la liste `[8, 3, 6, 1, 5, 2]` avec le tri par insertion. Présentez votre réponse dans un tableau comme celui de l'exemple, avec, pour chaque étape, les comparaisons et les échanges effectués et la liste obtenue. Combien de comparaisons et d'échanges avez-vous effectués au total ?

### Question {num1}`question-tri:q-insertion-cas`
1. Dans la visualisation, triez une liste de 16 éléments déjà triée, puis une liste aléatoire, puis une liste triée à l'envers. Relevez à chaque fois le nombre de comparaisons et d'échanges.
2. Quel est le meilleur cas du tri par insertion ? Combien de comparaisons et d'échanges effectue-t-il alors pour une liste de $n$ éléments ? Quelle est sa complexité dans ce cas ?
3. Mêmes questions pour le pire cas.
4. Pourquoi le tri par insertion est-il particulièrement intéressant pour trier une liste **presque triée** ? Donnez un exemple concret d'une telle situation.

## Programmer le tri par insertion
Dans votre fichier `tris.py`, ajoutez la fonction ci-dessous juste après `tri_selection`, ainsi qu'une ligne de vérification à la fin du fichier. Comme `tri_selection`, la fonction `tri_insertion` trie sur place la liste reçue, puis la retourne. Les outils vus avec le tri par sélection (modifier et échanger des éléments) vous seront à nouveau utiles.

```{code-block} python
:linenos:
def tri_insertion(liste):
    # À compléter
    return liste
```

```{code-block} python
print(tri_insertion([7, 3, 9, 1, 5, 8, 2, 6]))
```

Complétez la fonction `tri_insertion(liste)`, en suivant le principe décrit au début de cette page.

```{admonition} Indices
:class: tip dropdown
- La boucle `for` commence à l'index `1` : le premier élément forme déjà une partie triée à lui
  seul.
- Une variable `j` suit la position de l'élément en train d'être inséré. Une boucle `while` le
  fait reculer d'une case à chaque échange, tant qu'il n'est pas au début de la liste et que son
  voisin de gauche est plus grand.
- Dans la condition du `while`, testez `j > 0` en **premier** : lorsque `j` vaut `0`, Python
  n'évalue alors même pas la seconde condition, et ne calcule pas `liste[j - 1]`, c'est-à-dire
  `liste[-1]`, qui désignerait le dernier élément de la liste.
```

### Question {num1}`question-tri:q-code-insertion`
Vérifiez votre fonction sur des listes variées, comme pour le tri par sélection : une liste vide, une liste d'un seul élément, une liste déjà triée, une liste triée à l'envers, une liste qui contient des doublons... Lorsque votre fonction est correcte, ajoutez-y des commentaires pour expliquer ses étapes importantes.

```{admonition} Pour le rapport
:class: note
- **Questions {numref}`%s <question-tri:q-insertion-trace>` et {numref}`%s <question-tri:q-insertion-cas>`** :
  le tableau et les réponses, avec les nombres relevés dans la visualisation et vos explications.
- **Question {numref}`%s <question-tri:q-code-insertion>`** : le code de votre fonction
  `tri_insertion`, commenté.
```
