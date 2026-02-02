---
orphan: true
---

<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

# Examen programmationn Python
## Question 1 - Liste notions de base
Pas ici ! Répondez sur l'interface de Exam.net


## Question 2 - Refuge pour animaux
Le logiciel d'un refuge pour animaux possède une base de données avec une table `Animal` contenant toutes les informations nécessaires sur les animaux actuellement au refuge. Ce refuge héberge toute sorte d'animaux : des chats, des chiens, des lapins, des perroquets, ... Les seuls reptiles dans ce refuge sont des serpents et de lézards.

Le code ci-dessous permet de récupérer, depuis la base de données, la liste contenant le nom de chaque animal. Complétez ce programme afin d'afficher le nombre de reptiles présents dans ce refuge.


**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:name: animal
:class: hidden
import random


def execute_sql(request):
    serpents = ["serpent"] * 2
    lezards = ["lézard"] * 6
    autres = ["chien", "chat", "lapin", "furet", "cochon d'inde", "perroquet", "canari", "hamster", "rat"] * 10

    animaux_refuge = serpents + lezards + autres

    random.shuffle(animaux_refuge)
    return animaux_refuge

```
```{exec} python
:editor: 73621740-0ff8-4e90-aee4-77138e5be9a5
:after: animal
animaux = execute_sql("SELECT nom FROM Animal")

```

## Question 3 - Pygame
Pas ici ! Répondez sur l'interface de Exam.net


## Question 4 - Vente de tissu
​Dans un magasin de tissu, le prix d'une toile est fixé en fonction de sa surface (en m2) et de sa couleur de la manière suivante :
 - Un tissu bleu vaut 15CHF par m2
 - Toutes les autres couleurs valent 10CHF par m2

a) Définissez une fonction nommée calcul_prix_tissu prenant en paramètre une surface et une couleur et retournant le prix du tissu décrit par ces valeurs.

b) Utilisez cette fonction pour déterminer le prix total d'un achat d'un tissu rouge de 4m2 et d'un bleu de 10m2.

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 96fe7369-dffa-4237-9259-0a64c870dc81

```