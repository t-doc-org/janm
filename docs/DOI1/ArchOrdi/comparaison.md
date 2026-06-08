<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Comparer plusieurs ordinateurs

Pour choisir une machine, on ne se fie pas à un seul chiffre (prix, fréquence,
nombre de cœurs) : on compare **composant par composant**, selon l'**usage**
visé. Comme les caractéristiques brutes sont trompeuses, on mesure la vraie
performance du CPU et du GPU avec des **benchmarks** : un score de test
standardisé, où plus le score est élevé, plus le composant est performant.

| Usage | Composant déterminant |
|:--|:--|
| Bureautique, navigation | SSD + assez de RAM (le CPU/GPU importe peu) |
| Jeux vidéo 3D | Carte graphique (GPU), puis CPU |
| Montage vidéo, 3D | CPU (multi-cœurs) + beaucoup de RAM + GPU |

**Outils de comparaison (gratuits) :**

| Composant | Sites |
|:--|:--|
| Processeur (CPU) | [cpubenchmark.net](https://www.cpubenchmark.net/), [nanoreview.net/en/cpu-compare](https://nanoreview.net/en/cpu-compare) |
| Carte graphique (GPU) | [videocardbenchmark.net](https://www.videocardbenchmark.net/), [nanoreview.net/en/gpu-compare](https://nanoreview.net/en/gpu-compare) |

```{note}
Les scores de benchmark évoluent dans le temps : on regarde l'**écart** entre
deux composants, pas la valeur exacte. Tapez le nom complet du composant (ex.
`AMD Ryzen 7 7735HS`) dans le moteur de recherche du site.
```

## Exercice

Trois ordinateurs portables sont en vente chez Digitec. Ouvrez les trois fiches
produit :

- [Lenovo ThinkBook 16 Gen 7](https://www.digitec.ch/fr/s1/product/lenovo-thinkbook-16-gen-7-16-1000-go-32-go-ch-amd-ryzen-7-7735hs-ordinateur-portable-47076912)
- [HP OmniBook X Flip x360 14](https://www.digitec.ch/fr/s1/product/hp-omnibook-x-flip-x360-14-fm0702nz-14-512-go-32-go-ch-intel-core-ultra-7-258v-ordinateur-portable-60239746)
- [HP ProBook 4 G1i](https://www.digitec.ch/fr/s1/product/hp-probook-4-g1i-16-512-go-16-go-ch-intel-core-ultra-5-225u-ordinateur-portable-59918296)

1. Relevez les caractéristiques de chaque machine et complétez le tableau :

   | | **Lenovo ThinkBook 16** | **HP OmniBook X Flip 14** | **HP ProBook 4 G1i** |
   |:--|:--|:--|:--|
   | Processeur | | | |
   | RAM | | | |
   | Stockage (SSD) | | | |
   | Taille de l'écran | | | |
   | Prix | | | |

2. Comparez les trois processeurs sur
   [cpubenchmark.net](https://www.cpubenchmark.net/) (scores single-thread et
   multi-thread). Lequel est le plus faible ? Lesquels sont au coude-à-coude ?

3. Aucune de ces machines ne possède de carte graphique dédiée. Pour quel type
   d'usage sont-elles conçues ?

4. Laquelle recommanderiez-vous pour un usage **étudiant polyvalent**
   (bureautique, navigation, prise de notes, un peu de programmation) ?
   Justifiez votre choix en tenant compte du processeur, de la RAM, du
   stockage, du format et du prix.

````{admonition} Solution
:class: note dropdown
1. Caractéristiques relevées sur les fiches produit :

   | | **Lenovo ThinkBook 16** | **HP OmniBook X Flip 14** | **HP ProBook 4 G1i** |
   |:--|:--|:--|:--|
   | Processeur | AMD Ryzen 7 7735HS | Intel Core Ultra 7 258V | Intel Core Ultra 5 225U |
   | RAM | 32 Go | 32 Go | 16 Go |
   | Stockage (SSD) | 1 To | 512 Go | 512 Go |
   | Taille de l'écran | 16 pouces | 14 pouces (tactile, convertible) | 16 pouces |
   | Prix | à relever (les prix varient) | à relever | à relever |

2. Le **Core Ultra 5 225U** est le processeur le plus faible des trois. Le
   **Ryzen 7 7735HS** et le **Core Ultra 7 258V** sont nettement devant et
   proches l'un de l'autre : le Ryzen, avec ses 8 cœurs et 16 fils d'exécution,
   est très bon en multi-thread, tandis que le Core Ultra 7, plus récent,
   brille en single-thread et en autonomie. (Vérifiez les scores actuels sur le
   site.)

3. N'ayant qu'un GPU intégré, ces machines sont conçues pour la **bureautique**,
   la **navigation** et la **productivité**, pas pour les jeux 3D ni le montage
   vidéo lourd.

4. Les trois conviennent à un usage étudiant. Le choix dépend des priorités :

   - **Lenovo ThinkBook 16** : grand écran 16 pouces, 1 To de stockage et CPU
     très performant en multitâche. Idéal pour travailler longtemps et stocker
     beaucoup de fichiers.
   - **HP OmniBook X Flip 14** : le plus moderne et le plus mobile (14 pouces,
     écran tactile convertible, excellente autonomie), mais seulement 512 Go.
     Idéal pour la mobilité et la prise de notes.
   - **HP ProBook 4 G1i** : l'entrée de gamme (16 Go de RAM, CPU le moins
     puissant), à privilégier si le **prix** est le critère principal.

   Une réponse correcte justifie le choix avec ces critères : il n'y a pas une
   seule bonne réponse, mais un compromis adapté aux priorités de l'élève.
````
