---
orphan: true
---

<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

# Examen programmationn Python - 2F3
## Question 1 - Classement d'une course
Pas ici ! Répondez sur l'interface de Exam.net


## Question 2 - Vente de boissons
```{exec} python
:name: python-liste-notes
:class: hidden
import random
achats = ["coca"] * 20 + ["sprite"] * 30 + ["fanta"] * 25 + ["eau gazeuse"] * 18 + ["vin"] * 16 + ["bière"] * 31
ventes = ["coca"] * 11 + ["sprite"] * 20 + ["fanta"] * 12 + ["eau gazeuse"] * 17 + ["vin"] * 13 + ["bière"] * 25
random.shuffle(ventes)
random.shuffle(achats)
```
Dans cette question, la variable `achats` contient une liste des boissons qui ont été achetées par un bar. Si on y retrouve 20x le texte `"coca"`, cela signifie que le bar a acheté 20 bouteilles de coca. De manière similaire, `ventes` contient une liste de toutes les boissons vendues. Exécutez la cellule ci-dessous pour visualiser le contenu de ces listes.
```{exec} python
:after: python-liste-notes
print("Achats :", achats)
print("Ventes :", ventes)
```

A partir de cette liste, calculez et affichez le nombre de bouteille d'alcool encore en stock (non vendues) de ce bar, sachant que ses seules boissons alcoolisées sont le vin et la bière.

Votre code doit continuer de fonctionner, même si le contenu de la liste change.

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:after: python-liste-notes
:editor: a5b7e7eb-a538-4524-b847-a75e8c87af25
print("Achats :", achats)
print("Ventes :", ventes)
#Continuez à programmer ici
```


## Question 3 - Les tuyaux de Flappybird
Pas ici ! Répondez sur l'interface de Exam.net

## Question 4 - Roger et ses fraises
Pas ici ! Répondez sur l'interface de Exam.net

## Question 5 - Estimation d'oeuvres d'art
Une galerie d'art cherche à développer un programme lui permettant de facilement estimer le prix de différentes oeuvres qui lui sont présentées.

Avant de développer le programme au complet, une première version de test est développée dans laquelle une fonction nommée `estimation` prend en paramètre le type d'oeuvre et l'année de création de l'oeuvre. Celle-ci retourne l'estimation en CHF pour cette oeuvre suivant la logique ci-dessous.

 - Un tableau daté d'avant 1900 est estimé à 10000CHF
 - Une statue créée après 2000 est estimée à 5000CHF
 - Les autres oeuvres sont estimées à 500CHF

 a) Implémentez la fonction `estimation` au complet
 
 b) Utilisez cette fonction afin d'estimer le prix de vente total d'une statue de 2003 et d'une tapisserie de 1670.


**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: e5483a40-e514-4364-bf6a-c65f32688835

# Ecrivez le code ici

``` 