<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Composants d'un ordinateur

Un ordinateur est composé de plusieurs éléments qui travaillent ensemble. On
distingue les **composants internes** (à l'intérieur du boîtier) et les
**périphériques** (connectés à l'extérieur).

## Carte mère

La **carte mère** est la pièce centrale à laquelle tous les autres composants
se connectent. Elle joue le rôle de chef d'orchestre en permettant aux
composants de communiquer entre eux.

````{list-grid}
:style: grid-template-columns: 1fr 1fr; text-align: center;

- ```{figure} images/motherboard1.jpg
  :alt: Carte mère avec ses connecteurs visibles
  :align: center
  :width: 90%

  Carte mère avec emplacement CPU, slots RAM et connecteurs SATA
  ```

- ```{figure} images/motherboard2.png
  :alt: Carte mère gaming ASRock Fatal1ty H97
  :align: center
  :width: 90%

  Carte mère gaming ASRock Fatal1ty H97
  ```
````

Elle fournit notamment :

- Un emplacement pour le processeur
- Des connecteurs pour la mémoire vive
- Des connecteurs pour les disques durs
- Un panneau d'entrées/sorties (ports USB, HDMI, jack audio, etc.)

La principale caractéristique d'une carte mère est sa **compatibilité** avec
les autres composants et le nombre de ports disponibles.

## Processeur

Le **processeur**, aussi appelé **CPU** (*Central Processing Unit*), est le
composant qui exécute les instructions des programmes : calculs, branchements
conditionnels, appels de fonctions, etc.

```{figure} images/cpu.jpg
:alt: Intel Core i7-12700KF, face avant et dos avec contacts
:align: center
:width: 50%

Intel Core i7-12700KF (face avant et dos avec contacts)
```

Ses principales caractéristiques sont :

- La **fréquence d'horloge** (en Hz) : approximativement le nombre d'opérations
  effectuées par seconde. Par exemple, un processeur à 2 GHz peut effectuer
  environ 2'000'000'000 opérations par seconde.
- Le **nombre de cœurs** (*cores*) : chaque cœur peut traiter des instructions
  indépendamment. Les cœurs fonctionnent en parallèle.

```{important}
La fréquence d'horloge est donnée pour un seul cœur. Elle ne suffit donc pas
à comparer deux processeurs. En pratique, on utilise des **benchmarks** (tests
de performance standardisés) pour comparer deux CPU.
```

## Mémoire vive

La **mémoire vive**, aussi appelée **RAM** (*Random-Access Memory*), stocke
temporairement les programmes et les données en cours d'utilisation par le
processeur.

```{figure} images/ram.jpg
:alt: Barrettes de mémoire vive DDR
:align: center
:width: 50%

Barrettes de mémoire vive DDR
```

Elle est **volatile** : son contenu est effacé dès que l'ordinateur est éteint.

Ses caractéristiques sont :

- La **capacité** (en Go)
- La **génération** (DDR4, DDR5, etc.)

Lorsque la RAM est pleine, l'ordinateur ralentit car il doit déplacer des
données vers le disque dur, qui est bien plus lent.

## Disque dur

Le **disque dur** stocke les données de manière **permanente** : les fichiers,
le système d'exploitation, les applications. Son contenu est conservé même
lorsque l'ordinateur est éteint.

Ses caractéristiques sont :

- La **capacité** (en Go ou To)
- La **vitesse de lecture/écriture**

Il existe deux types de disques durs :

````{list-grid}
:style: grid-template-columns: 1fr 1fr; text-align: center;

- ```{figure} images/hdd.jpg
  :alt: HDD ouvert montrant le plateau magnétique et le bras de lecture
  :align: center
  :width: 90%

  HDD ouvert : plateau magnétique et bras de lecture-écriture
  ```

- ```{figure} images/ssd.jpg
  :alt: SSD M.2 Samsung 980 Pro 1 To
  :align: center
  :width: 90%

  SSD M.2 Samsung 980 Pro (1 To)
  ```
````

| | **HDD** (*Hard Disk Drive*) | **SSD** (*Solid-State Drive*) |
|:--|:--|:--|
| Technologie | Disques magnétiques rotatifs | Mémoire flash (comme les cartes SD) |
| Mécanisme | Mécanique | Électronique |
| Vitesse | Plus lent | Très rapide |
| Prix | Moins cher | Plus cher |
| Fragilité | Fragile aux chocs | Résistant |

## RAM vs disque dur

Ces deux mémoires ont des rôles complémentaires :

| | **RAM** | **Disque dur** |
|:--|:--|:--|
| Permanence | Volatile (perdue à l'extinction) | Permanente |
| Vitesse | Très rapide | Plus lent |
| Capacité | Plus faible | Plus grande |
| Utilisation | Données en cours de traitement | Stockage à long terme |

Quand on ouvre un programme, ses données sont copiées du disque dur vers la
RAM afin que le processeur puisse y accéder rapidement.

## Carte graphique

La **carte graphique** contient un **GPU** (*Graphics Processing Unit*), qui
est spécialisé dans le traitement parallèle massif. Elle contient également sa
propre mémoire vidéo.

```{figure} images/gpu.jpg
:alt: Carte graphique AMD avec triple système de refroidissement
:align: center
:width: 50%

Carte graphique AMD avec triple système de refroidissement
```

### CPU vs GPU

| | **CPU** | **GPU** |
|:--|:--|:--|
| Instructions | Séquence d'instructions différentes | Même instruction sur des milliers de valeurs |
| Cœurs | Peu, mais puissants | Très nombreux, mais moins puissants individuellement |
| Exécution | Séquentielle | Massivement parallèle |

Une carte graphique dédiée est nécessaire si on utilise l'ordinateur pour :

- Jouer à des jeux vidéo 3D modernes
- Faire du montage vidéo ou de la modélisation 3D
- Entraîner des modèles d'intelligence artificielle

Dans les autres cas (bureautique, navigation web, programmation), le processeur
intègre généralement un GPU suffisant.


## Périphériques

Les **périphériques** sont des appareils connectés à l'ordinateur depuis
l'extérieur. On les classe en trois catégories selon le sens du flux
d'information :

### Périphériques d'entrée

Ils transmettent des informations **vers** l'ordinateur :

- **Saisie** : clavier, pavé numérique
- **Pointage** : souris, pavé tactile
- **Contrôle** : manette de jeu
- **Acquisition** : scanner, webcam, microphone
- **Lecture** : lecteur de disque optique (DVD, Blu-ray)

### Périphériques de sortie

Ils transmettent des informations **depuis** l'ordinateur vers l'utilisateur :

- Écran
- Imprimante
- Enceinte acoustique, casque audio

### Périphériques d'entrée-sortie

Ils permettent un échange dans **les deux sens** :

- **Stockage externe** : disque dur externe, clé USB, carte SD
- **Réseau** : routeur
- **Interface** : écran tactile, casque de réalité virtuelle (VR)

## Exercices

### Exercice 1

Quel composant assure chacun de ces rôles ?

```{role} composant(quiz-select)
:right:
:options: |
: Processeur
: Carte mère
: RAM
: Disque dur
: Carte graphique
: Bloc d'alimentation
```

```{quiz}
:style: max-width: 44rem;
1.  {composant}`RAM`
    Stocker temporairement les données utilisées par le processeur
2.  {composant}`Carte mère`
    Connecter tous les autres composants entre eux
3.  {composant}`Disque dur`
    Stocker des données de manière permanente, même après extinction
4.  {composant}`Processeur`
    Exécuter les instructions d'un programme (calculs, conditions, etc.)
5.  {composant}`Carte graphique`
    Effectuer des millions de calculs en parallèle pour afficher des images 3D
6.  {composant}`Bloc d'alimentation`
    Fournir le courant électrique à tous les composants
```

### Exercice 2

Quel composant est principalement en cause dans chaque situation ?

```{role} cause(quiz-select)
:right:
:options: |
: Processeur
: Carte mère
: RAM
: Disque dur (HDD/SSD)
```

```{quiz}
:style: max-width: 44rem;
1.  {cause}`RAM`
    Vous ouvrez 20 fenêtres de navigateur et l'ordinateur ralentit fortement
2.  {cause}`RAM`
    Vous rédigez un document Word, l'ordinateur s'éteint, et le fichier a disparu au redémarrage
3.  {cause}`Disque dur (HDD/SSD)`
    Un message indique qu'il n'y a plus de place pour télécharger un fichier
4.  {cause}`Processeur`
    Un calcul scientifique très complexe prend plusieurs heures à s'exécuter
```

### Exercice 3

Vous avez un ordinateur avec un SSD (500 Go) et un HDD (2 To). Sur lequel installez-vous chaque élément ?

```{role} disque(quiz-select)
:right:
:options: |
: SSD
: HDD
```

```{quiz}
:style: max-width: 44rem;
1.  {disque}`SSD`
    Le système d'exploitation (Windows, macOS...)
2.  {disque}`SSD`
    Un jeu vidéo avec des temps de chargement longs
3.  {disque}`HDD`
    Une collection de 500 films en haute définition
4.  {disque}`SSD`
    Vos applications utilisées quotidiennement
5.  {disque}`HDD`
    Des archives de photos personnelles rarement consultées
```

### Exercice 4

Classez chaque périphérique selon son type.

```{role} type(quiz-select)
:right:
:options: |
: Entrée
: Sortie
: Entrée-sortie
```

```{quiz}
:style: max-width: 36rem;
1.  {type}`Entrée`
    Clavier
2.  {type}`Sortie`
    Imprimante
3.  {type}`Entrée-sortie`
    Clé USB
4.  {type}`Entrée`
    Webcam
5.  {type}`Sortie`
    Enceinte acoustique
6.  {type}`Entrée-sortie`
    Écran tactile
7.  {type}`Entrée`
    Scanner
8.  {type}`Entrée`
    Manette de jeu
9.  {type}`Entrée-sortie`
    Carte SD
10. {type}`Entrée`
    Microphone
```

### Exercice 5

Deux laptops sont en vente. Les caractéristiques de leurs processeurs sont indiquées ci-dessous. Utilisez [cpubenchmark.net](https://www.cpubenchmark.net/) pour déterminer lequel est le plus puissant.

| | **Intel Core i5-13500H** | **AMD Ryzen 7 7745HX** |
|:--|:--|:--|
| Cœurs | 12 (4 performants + 8 efficaces) | 8 |
| Fréquence maximale | 4.7 GHz | 5.1 GHz |

````{admonition} Solution
:class: note dropdown
L'**AMD Ryzen 7 7745HX** est plus puissant dans les deux catégories :

| | **Intel Core i5-13500H** | **AMD Ryzen 7 7745HX** |
|:--|:--|:--|
| Score multithread | 20 992 | 32 449 |
| Score single thread | 3 369 | 3 933 |

Malgré ses 12 cœurs, l'Intel est dépassé par l'AMD sur les deux mesures. Les caractéristiques brutes (nombre de cœurs, fréquence) ne permettaient pas de le prévoir.
````
