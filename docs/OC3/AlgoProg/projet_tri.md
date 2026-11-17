<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Présentation du projet

## Introduction
*Trier* une liste, c'est réordonner ses éléments du plus petit au plus grand (ou l'inverse). C'est l'une des opérations les plus courantes en informatique : classement d'une compétition, résultats d'une recherche du plus pertinent au moins pertinent, contacts par ordre alphabétique... Et comme on l'a vu avec la [recherche dichotomique](recherche.md), une liste triée permet souvent d'écrire des algorithmes beaucoup plus rapides par la suite.

Python sait évidemment trier une liste tout seul, avec `sorted(liste)` ou `liste.sort()`. Mais comment fait-il ? Il existe de nombreux algorithmes de tri, plus ou moins rapides. Dans ce projet, vous allez :

1. vous entraîner à déterminer la complexité de petits algorithmes ;
2. découvrir le fonctionnement de quatre algorithmes de tri célèbres : le tri par sélection, le tri par insertion, le tri fusion et le tri rapide ;
3. programmer vous-mêmes le tri par sélection et le tri par insertion en Python (le code du tri fusion et du tri rapide vous est fourni) ;
4. mesurer leur temps d'exécution et représenter les résultats sur des graphiques, pour vérifier que la complexité prévue par la théorie se retrouve dans la pratique ;
5. rédiger un rapport qui présente votre travail.

## Organisation
- Le projet se fait par **groupes de 2 ou 3**.
- Chaque partie correspond à une page de ce chapitre :
  - [Partie 1 : complexité de petits algorithmes](projet_complexite.md)
  - [Partie 2 : le tri par sélection](projet_tri_selection.md), à découvrir puis à programmer
  - [Partie 3 : le tri par insertion](projet_tri_insertion.md), à découvrir puis à programmer
  - [Partie 4 : le tri fusion](projet_tri_fusion.md), à découvrir
  - [Partie 5 : le tri rapide](projet_tri_rapide.md), à découvrir
  - [Partie 6 : mesurer et comparer](projet_mesures.md)
- À partir de la partie 2, le code s'écrit et s'exécute **sur votre ordinateur**, avec Python installé (par exemple avec [Thonny](https://thonny.org) ou Visual Studio Code), et non plus dans le navigateur : les mesures de temps y sont plus fiables, et la bibliothèque *matplotlib*, qui permet de tracer des graphiques, doit être installée.
- Les questions auxquelles vous devez répondre dans le rapport sont numérotées de manière continue d'une partie à l'autre (Question 1, Question 2, ...). Chaque partie se termine par un encadré qui récapitule ce qu'il faut mettre dans le rapport.

```{tip}
Commencez le rapport dès la partie 1 et complétez-le au fur et à mesure, plutôt que de tout
rédiger à la fin.
```

## Le rapport
Le rapport est un document rédigé par le groupe avec un traitement de texte. Il contient :

1. **Une page de titre** : titre du projet, noms des membres du groupe, classe et date.
2. **Les réponses aux questions** des parties 1 à 6, numérotées comme dans l'énoncé. Les réponses sont rédigées et **justifiées** : un résultat sans explication ne suffit pas.
3. **Le code** de vos deux fonctions de tri, `tri_selection` et `tri_insertion`, commenté. Copiez-le dans une police à chasse fixe (par exemple *Consolas* ou *Courier New*), en conservant l'indentation.
4. **Les graphiques** de la partie 6. Chaque graphique a un titre, des axes nommés avec leur unité et une légende. Il est accompagné de quelques phrases qui décrivent ce qu'on y observe.
5. **Une conclusion** : quel tri choisiriez-vous, dans quelle situation, et pourquoi ? Vos mesures confirment-elles la théorie ? Quelles difficultés avez-vous rencontrées, et comment les avez-vous surmontées ?
