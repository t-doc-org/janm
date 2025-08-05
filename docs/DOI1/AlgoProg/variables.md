<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Variables

## Qu'est-ce qu'une variable ?


## Exercices

### Exercice 1
Ce code Python déclare 5 variables, mais contient une erreur par ligne.
Trouvez ces erreurs et corrigez-les.

```{code-block} python
6 = age
message = Je suis absent
note = 4,5
porte_ouverte = false
nombre de voitures = 10
```

````{admonition} Solution
:class: note dropdown
```{code-block} python
age = 6
message = "Je suis absent"
note = 4.5
porte_ouverte = False
nombre_de_voitures = 10
```


1.  A la création d'une variable, le nom doit toujours être à gauche du signe égal, et la valeur à droite.

2.  Une valeur de type `str` doit être entourée de guillemets.

3.  Une valeur de type `float` s'écrit non pas avec une virgule mais avec un point.

4.  Une valeur de type `bool` prend une majuscule à `True` et `False`.

5.  Les noms de variables ne peuvent pas contenir d'espaces. Généralement, en Python, on les remplace alors par des tirets en bas.
````

### Exercice 2
Déterminez la valeur de chacune des variables de ce programme en créant un tableau d'états.

```{code-block} python
x = 10
y = 2
z = y * x
y = z + x
x = y - z / 2
z = z * 2
y = 5
```

````{admonition} Solution
:class: note dropdown
| x  | y  | z  |
| :--| :--| :--|
| 10 |    |    |
| 10 | 2  |    |
| 10 | 2  | 20 |
| 10 | 30 | 20 |
| 20 | 30 | 20 |
| 20 | 30 | 40 |
| 20 | 5  | 40 |

````

### Exercice 3
Déterminez la valeur de chacune des variables de ce programme en créant un tableau d'états.

```{code-block} python
nombre_habitants = 150 + 25 * 2
cout = 100
prix = nombre_habitants * cout
cout = cout / 2
nombre_habitants = nombre_habitants - 100
prix = prix + nombre_habitants * cout
nombre_habitants = 400
prix = prix + nombre_habitants * cout
```

````{admonition} Solution
:class: note dropdown
| nombre_habitants  | cout  | prix  |
| :--| :--| :--|
| 200 |    |    |
| 200 | 100  |    |
| 200 | 100  | 20000 |
| 200 | 50 | 20000 |
| 100 | 50 | 20000 |
| 100 | 50 | 25000 |
| 400 | 50  | 25000 |
| 400 | 50  | 45000 |

````

### Exercice 4
Complétez le programme ci-dessous de manière à ce qu'il permette de calculer la moyenne des notes principales dans la variable du même nom. La note de math est de 4 et demi, la note de français de 6 et la note d'allemand de 5 et demi.

```{code-block} python
math = 
francais = 
allemand = 
moyenne = 
```

````{admonition} Solution
:class: note dropdown
```{code-block} python
math = 4.5
francais = 6
allemand = 5.5
moyenne = (math + francais + allemand) / 3
```
Pour calculer la moyenne, on additionne toutes les notes avant de les diviser par 3. Comme la division a la priorité sur l'addition, il ne faut pas oublier de régler la priorité des opérations avec une paire de parenthèses
````

### Exercice 5
Écrivez un petit programme en Python permettant de calculer le volume $V$ d'un cylindre en fonction de son rayon et de son hauteur. Votre programme contiendra les lignes suivantes :

-   Créer une variable `pi` contenant la valeur `3.14`.

-   Créer une variable `hauteur` contenant la valeur `30`

-   Créer une variable `rayon` contenant la moitié de 11

-   Créer une variable `aire_disque` contenant le résultat de
    $\pi \cdot r^2$

-   Créer une variable `volume` contenant le résultat de l'aire du
    disque multiplié par la hauteur.

Au terme de l'exécution de ce programme, la variable `volume` devrait
contenir la valeur `2849.55`


````{admonition} Solution
:class: note dropdown
```{code-block} python
pi = 3.14
hauteur = 30
rayon = 11 / 2 #ou rayon = 5.5
aire_disque = pi * rayon ** 2
volume = aire_disque * hauteur
```
````

### Exercice 6
Écrivez un programme Python contenant une variable `x` initialisée à 10.
Puis, complétez ce programme pour que celui-ci effectue les opérations
suivantes

-   Ajoute 3 à `x`

-   Retire 8 à `x`

-   Multiplie `x` par 10

-   Divise `x` par 5

-   Élève `x` à la puissance 3

A la fin de l'exécution de ce programme, la variable `x` devrait
contenir la valeur `1000`


````{admonition} Solution
:class: note dropdown
```{code-block} python
x = 10
x += 3
x -= 8
x *= 10
x /= 5
x **= 3
```
````

### Exercice 7 (difficile)
Lisez attentivement le programme ci-dessous et expliquez, en français, ce qu'il fait (vous n'avez pas besoin d'évaluer les expressions). Veillez à bien expliquer à quoi correspondent les variables `h1`, `h2`, et `total`.

```{code-block} python
CHF_par_h1 = 32.5
CHF_par_h2 = 40
heure_debut = 20
temps_de_travail = 8.5
h1 = (heure_debut + temps_de_travail)
h2 = temps_de_travail - h1
total = h1 * CHF_par_h1 + h2 * CHF_par_h2
```

````{admonition} Solution
:class: note dropdown
Ce programme permet de calculer et stocker le salaire d'un employé dans la variable `total`. De toute évidence, cet employé travail de nuit comme il a commencé à 20h et a travaillé durant 8 heures et demie. La variable `h1` contient le nombre d'heures passées après minuit (en effet, le reste de la division entière de 28.5 par 24 nous donne 4.5, et l'employé a bien fini de travailler à 4 heure et demie). Ainsi, en soustrayant `h1` aux nombres d'heures travaillées au total, `h2` contient le nombre d'heures travaillées avant minuit. Ces deux variables permettent de calculer le salaire total avec les taux corrects.
````


