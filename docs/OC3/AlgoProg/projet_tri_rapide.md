<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Partie 5 : le tri rapide

## Vidéo
```{youtube} zhduMmmLAgI
```

## Démonstration
Le tri rapide choisit un élément de la zone à trier, appelé le *pivot*, puis réorganise la zone pour placer les éléments plus petits que le pivot à sa gauche et les plus grands à sa droite : c'est la *partition*. Le pivot est alors à sa place définitive, et le tri rapide trie ensuite les deux côtés de la même manière : comme le tri fusion, il est *récursif*. L'arbre des appels et la pile d'appels de la démonstration fonctionnent comme pour le tri fusion.

Il existe plusieurs manières de choisir le pivot et de faire la partition. Dans ce projet (démonstration, exercice et code de la partie 6), le pivot est toujours le **dernier** élément de la zone, et la partition se fait comme décrit sous la démonstration.

<div class="tri-visu" data-algo="rapide" data-liste="7 3 9 1 5 8 2 6"></div>

### La partition
Pour partitionner la zone, on la parcourt de gauche à droite en maintenant, au début de la zone, une *zone des petits* qui contient tous les éléments plus petits que le pivot rencontrés jusque-là. La variable `i` indique la position où commence la zone des grands, c'est-à-dire où ranger le prochain petit élément. Chaque élément est comparé au pivot :

- s'il est plus petit, on l'échange avec l'élément en position `i`, ce qui l'ajoute à la zone des petits, et `i` avance d'une case ;
- sinon, on ne fait rien : il reste dans la zone des grands.

Pour finir, on échange le pivot avec l'élément en position `i` : il se retrouve juste après les petits, à sa place définitive. On ne fait pas d'échange inutile lorsqu'un élément est déjà au bon endroit.

Voici la partition de `[7, 3, 9, 1, 5]`, avec le pivot `5` :

| Élément examiné | Comparaison | Opération | Liste | `i` |
| :-------------: | :---------: | :-------- | :---- | :-: |
| `7` (position 0) | `7 > 5` | aucune | `[7, 3, 9, 1, 5]` | `0` |
| `3` (position 1) | `3 < 5` | échange de `3` et `7` | `[3, 7, 9, 1, 5]` | `1` |
| `9` (position 2) | `9 > 5` | aucune | `[3, 7, 9, 1, 5]` | `1` |
| `1` (position 3) | `1 < 5` | échange de `1` et `7` | `[3, 1, 9, 7, 5]` | `2` |
| fin du parcours | | échange du pivot `5` et de `9` | `[3, 1, 5, 7, 9]` | `2` |

Le pivot `5` est maintenant en position 2, avec les petits `[3, 1]` à sa gauche et les grands `[7, 9]` à sa droite. Le tri rapide trie ensuite la zone des positions 0 à 1, puis celle des positions 3 à 4.

## Exemple à la main
Triez la liste ci-dessous en suivant **exactement** le tri rapide : chaque comparaison avec le pivot et chaque échange doivent être faits dans le bon ordre. Les appels se font automatiquement.

<div class="tri-exo" data-algo="rapide" data-liste="5 2 8 1 6 3"></div>

## Complexité
Le travail du tri rapide dépend de la **qualité des pivots**, c'est-à-dire de la manière dont ils coupent les zones. Sur une liste mélangée, le pivot coupe en général la zone en deux parties de tailles comparables. On retrouve alors la situation du tri fusion : environ $\log_2(n)$ niveaux d'appels, et chaque niveau compare tous les éléments à leur pivot, soit environ $n$ opérations par niveau. Le tri rapide est donc en $O(n \log n)$ **en moyenne**. En pratique, il est même souvent plus rapide que le tri fusion, car il travaille sur place, sans créer de nouvelles listes : d'où son nom. Mais attention, ce n'est pas toujours le cas...

## Questions

### Question {num1}`question-tri:q-rapide-partition`
Effectuez à la main la **première** partition du tri rapide de la liste `[6, 1, 8, 3, 5, 2, 7, 4]`, dont le pivot est `4`. Présentez chaque étape dans un tableau comme celui de l'exemple. Quelle est la position finale du pivot ? Quelles zones de la liste le tri rapide trie-t-il ensuite ?

### Question {num1}`question-tri:q-rapide-pire`
1. Dans la démonstration, triez une liste aléatoire de 16 éléments, puis une liste déjà triée de 16 éléments. Comparez la forme des deux arbres des appels et le nombre de comparaisons.
2. Expliquez pourquoi le tri rapide est lent sur une liste déjà triée. Combien de comparaisons effectue-t-il dans ce cas pour une liste de $n$ éléments ? Quelle est alors sa complexité ?
3. Proposez une autre manière de choisir le pivot qui éviterait ce problème sur une liste déjà triée.

## Comparer les quatre tris
Dans la démonstration ci-dessous, vous pouvez choisir l'algorithme dans le menu déroulant. La liste ne change pas lorsque vous changez d'algorithme, ce qui permet de comparer les quatre tris sur exactement la même liste. Essayez-la avec une liste aléatoire, puis avec une liste déjà triée et une liste triée à l'envers.

<div class="tri-visu" data-algo="choix" data-taille="32"></div>

```{admonition} Pour le rapport
:class: note
- **Questions {numref}`%s <question-tri:q-rapide-partition>` et {numref}`%s <question-tri:q-rapide-pire>`** :
  le tableau de la partition et les réponses, avec les nombres relevés dans la démonstration et
  vos explications.
```
