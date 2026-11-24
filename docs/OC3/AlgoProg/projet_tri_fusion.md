<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Partie 4 : le tri fusion

Le tri fusion et le tri rapide sont plus rapides que les tris par sélection et par insertion, mais aussi plus difficiles à programmer : vous n'aurez pas à les écrire, leur code vous sera fourni dans la [partie 6](projet_mesures.md). Il est par contre important de bien comprendre leur fonctionnement.

## Vidéo
```{youtube} WlpUoBHOIhs
```

## Démonstration
Le tri fusion coupe la liste en deux moitiés, trie chaque moitié, puis fusionne les deux moitiés triées. Pour trier chaque moitié, il s'utilise lui-même : c'est un algorithme *récursif*. Les moitiés sont coupées à leur tour, jusqu'à des listes de 0 ou 1 élément, qui sont forcément déjà triées.

Dans la démonstration ci-dessous, sous la liste, l'*arbre des appels* montre toutes les fois où le tri fusion est utilisé sur une partie de la liste : l'appel en cours en orange, les appels en attente en bleu, et les appels terminés en vert. La *pile d'appels* affiche les appels en attente, du premier lancé jusqu'à celui en cours.

<div class="tri-visu" data-algo="fusion" data-liste="7 3 9 1 5 8 2 6"></div>

### La fusion de deux listes triées
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

### L'arbre des appels
L'arbre ci-dessous résume tous les appels du tri fusion pour la liste `[7, 3, 9, 1, 5, 8, 2, 6]`. Les appels descendent en coupant les listes en deux jusqu'au cas de base, puis les résultats remontent en étant fusionnés.

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

## Exemple à la main
Triez la liste ci-dessous en suivant **exactement** le tri fusion. Les découpages et les appels se font automatiquement ; à chaque fusion, comparez les têtes des deux moitiés (sélectionnez-les puis cliquez sur "Comparer"), puis placez la plus petite dans la liste fusionnée (sélectionnez-la puis cliquez sur "Placer").

<div class="tri-exo" data-algo="fusion" data-liste="5 2 8 1 6 3"></div>

## Complexité
Pour estimer le nombre d'opérations du tri fusion, regardons l'arbre des appels **niveau par niveau**.

- **Combien de niveaux ?** À chaque niveau, les listes sont deux fois plus courtes. Une liste de 8 éléments donne des listes de 4, puis de 2, puis de 1 élément : 3 niveaux de découpage. On retrouve le *logarithme en base 2* vu avec la [recherche dichotomique](recherche.md) : il y a environ $\log_2(n)$ niveaux.
- **Combien d'opérations par niveau ?** À chaque niveau, les fusions placent chaque élément de la liste exactement une fois : environ $n$ opérations par niveau.

Au total, le tri fusion effectue donc environ $n \cdot \log_2(n)$ opérations : il est en $O(n \log n)$, et ce quel que soit le contenu de la liste. Contrairement aux tris par sélection et par insertion, il a toutefois besoin de mémoire supplémentaire, car il crée de nouvelles listes au lieu de travailler dans la liste d'origine.

## Questions

### Question {num1}`question-tri:q-fusion-arbre`
Dessinez l'arbre des appels du tri fusion pour la liste `[6, 1, 8, 3, 5, 2, 7, 4]`, sans abréviation, en indiquant pour chaque appel la liste reçue et la liste retournée. Détaillez ensuite la dernière fusion dans un tableau comme celui de la fusion de `[1, 3, 7, 9]` et `[2, 5, 6, 8]`.

### Question {num1}`question-tri:q-fusion-niveaux`
1. Combien de niveaux de découpage l'arbre des appels compte-t-il pour une liste de 16 éléments ? De 1024 éléments ? D'un million d'éléments ?
2. Dans la démonstration, relevez le nombre de comparaisons du tri fusion pour des listes aléatoires de 8, de 16 et de 32 éléments. Comparez-les au nombre de comparaisons du tri par sélection pour les mêmes tailles.
3. Pour une liste d'un million d'éléments, estimez le nombre d'opérations du tri par sélection et celui du tri fusion. Sur un ordinateur qui effectue un milliard d'opérations par seconde, combien de temps chacun prendrait-il environ ?

```{admonition} Pour le rapport
:class: note
- **Question {numref}`%s <question-tri:q-fusion-arbre>`** : l'arbre des appels complet, dessiné à
  la main (photo lisible) ou à l'ordinateur, et le tableau de la dernière fusion.
- **Question {numref}`%s <question-tri:q-fusion-niveaux>`** : les réponses, avec les nombres
  relevés dans la démonstration et vos calculs.
```
