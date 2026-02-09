---
orphan: true
---

<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

# Examen programmationn Python - 2F2
## Question 1 - Classement d'une course
Pas ici ! Répondez sur l'interface de Exam.net


## Question 2 - Calcul de notes
```{exec} python
:name: python-liste-notes
:class: hidden
#L'arnaque du siècle
def execute_sql(request):
  if request == "SELECT note FROM Bulletin":
    return [3.5, 4.7, 2.6, 6, 2.2, 4.2, 3.3, 4.4, 2.8, 3.6, 3.8, 4.9]
  else:
    raise Exception("Invalid SQL request")
```
Pour cet exercice, une mini-base de données contient quelques notes stockées dans une table `Bulletin`. On peut les récupérer et les lire de la manière suivante :
```{exec} python
:after: python-liste-notes
notes = execute_sql("SELECT note FROM Bulletin")
print("Liste de notes :", notes)
```

A partir de cette liste, et **sans toucher au SQL** calculez et affichez les valeurs suivantes :

1. Le nombre de bonnes notes (4.75 et plus).
2. La pire note obtenue.

Votre code doit continuer de fonctionner, même si le contenu de la base de données change.

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:after: python-liste-notes
:editor: 4ce4e89b-fbb5-4e7f-b20d-f08cdc72fc59
notes = execute_sql("SELECT note FROM Bulletin")

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
:editor: c070aa4e-1d1d-47cf-9175-7936d7975bf4

``` 