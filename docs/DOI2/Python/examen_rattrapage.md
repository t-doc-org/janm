% Copyright 2025 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{metadata}
orphan: true
hide: [navbar, primary-sidebar, prev-next, footer]
```

# Examen de rattrapage - Programmation Python
## Question 1 - Streaming de musique
Pas ici ! Répondez sur l'interface de Exam.net


## Question 2 - Résultats sportifs
```{exec} python
:name: sport
:class: hidden
import random

def execute_sql(request):
    temps = [18.76, 13.22, 17.3, 11.87, 15.74, 16.35, 12.62, 18.32, 16.87, 10.34, 14.33, 13.65, 12.67, 14.7, 16.28, 16.52, 12.13, 15.44, 11.49, 14.94, 10.45, 17.75, 17.03, 18.77, 12.18, 17.7, 14.42, 17.11, 13.56, 18.19, 10.82, 15.11, 15.61, 10.45, 16.25, 12.02, 17.93, 18.24, 14.04, 16.6, 10.91, 11.36, 16.27, 11.7, 11.84, 15.38, 16.13, 17.11, 10.86, 17.92, 12.01, 15.95, 12.82, 10.69, 11.62, 17.99, 17.22, 15.17, 16.42, 12.78, 14.67, 14.04, 12.57, 14.38, 14.07, 17.37, 11.18, 10.72, 16.72, 16.1, 13.83, 17.1, 16.3, 15.71, 17.72, 11.68, 12.63, 18.15, 16.25, 12.94, 15.48, 14.22, 18.06, 17.64, 12.62, 18.4, 18.01, 16.52, 11.25, 15.51, 16.85, 11.35, 13.2, 15.66, 15.43, 18.78, 16.7, 13.17, 18.27, 15.71, 18.48, 14.95, 13.89, 17.19, 14.74, 12.86, 13.9, 17.4, 11.98, 11.45, 13.15, 17.57, 11.59, 17.64, 16.08, 16.82, 10.63, 12.19, 10.48, 13.9, 14.71, 17.67, 14.56, 17.18, 14.59, 15.04, 16.75, 17.87, 16.79, 11.12, 17.79, 16.44, 10.76, 17.32, 10.88, 17.2, 14.6, 14.56, 12.7, 12.19, 10.8, 13.42, 13.29, 12.66, 14.16, 18.37, 13.29, 14.86, 16.22, 14.41]
    return temps

```
Lors d'une compétition d'athlétisme, les temps (en secondes) de tous les coureurs du 100m sont stockés dans une base de données dans une table `Course`. Le code ci-dessous permet de récupérer la liste de ces temps.

A partir de cette liste, et **sans toucher au SQL** :

1. Trouvez et affichez le meilleur temps (le plus petit).
2. Créez une nouvelle liste contenant uniquement les temps qui sont supérieurs à 13 secondes (les coureurs les plus lents), puis affichez cette liste.

Votre code doit continuer de fonctionner, même si le contenu de la base de données change.

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: b3a1d7f0-1234-4abc-9def-567890abcdef
:after: sport
temps = execute_sql("SELECT temps FROM Course")
print("Tous les temps :", temps)

```

## Question 3 - Bulles sous-marines
Pas ici ! Répondez sur l'interface de Exam.net

## Question 4 - Sorcier
Pas ici ! Répondez sur l'interface de Exam.net

## Question 5 - Conseil de transport
On souhaite développer un programme qui recommande un moyen de transport en fonction de la distance à parcourir (en km) et de la météo.

La logique est la suivante :
 - Si la distance est inférieure ou égale à 2 km, le transport recommandé est `"à pied"`
 - Si la distance est inférieure ou égale à 10 km et que la météo est `"soleil"`, le transport recommandé est `"vélo"`
 - Dans tous les autres cas, le transport recommandé est `"bus"`

a) Définissez une fonction nommée `recommander_transport` prenant en paramètre une distance et une météo et **retournant** le moyen de transport recommandé sous forme de texte.

b) Utilisez cette fonction pour afficher **sur la même ligne** le transport recommandé pour un trajet de 8 km par temps de soleil, puis pour un trajet de 15 km sous la pluie.

**Votre code ne doit contenir qu'une seule fonction `print()`**

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: f1a2b3c4-5678-4def-abcd-ef0123456789

```
