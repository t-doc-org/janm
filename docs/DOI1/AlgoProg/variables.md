<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Variables

## Qu'est-ce qu'une variable ?


## Exercices

### Exercice {num1}`exercice`
Ce code Python déclare 5 variables puis affiche leur contenu. Toutefois, ce programme contient une erreur par ligne.
Trouvez ces erreurs et corrigez-les.

```{exec} python
:editor: 01987eac-6664-7a95-aa28-f73f9e4cc25a
6 = age
message = Je suis absent
note = 4,5
porte_ouverte = false
nombre de voitures = 10
print(age, message note, porte_ouverte, nombre_de_voitures)
```

````{solution}
```{exec} python
:linenos:
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

### Exercice {num1}`exercice`
Déterminez la valeur de chacune des variables de ce programme en créant un tableau d'états.

```{exec} python
x = 10
y = 2
z = y * x
y = z + x
x = y - z / 2
z = z * 2
y = 5
```

````{solution}
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

### Exercice {num1}`exercice`
Déterminez la valeur de chacune des variables de ce programme en créant un tableau d'états.

```{exec} python
nombre_habitants = 150 + 25 * 2
cout = 100
prix = nombre_habitants * cout
cout = cout / 2
nombre_habitants = nombre_habitants - 100
prix = prix + nombre_habitants * cout
nombre_habitants = 400
prix = prix + nombre_habitants * cout
```

````{solution}
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

### Exercice {num1}`exercice`
Complétez le programme ci-dessous de manière à ce qu'il permette de calculer la moyenne des notes principales dans la variable du même nom. La note de math est de 4, et celles de français et d'allemand sont de 5 et demi.

Finalement, affichez la moyenne calculée avec un `print()`. Le programme devrait afficher `La moyenne principale est de 5`.

```{exec} python
:editor: 01987eb9-f096-7b0c-a022-445cb30469ee
math = 
francais = 
allemand = 
moyenne = 
print()
```

````{solution}
```{exec} python
:linenos:
math = 4
francais = 5.5
allemand = 5.5
moyenne = (math + francais + allemand) / 3
print("La moyenne principale est de", moyenne)
```
Pour calculer la moyenne, on additionne toutes les notes avant de les diviser par 3. Comme la division a la priorité sur l'addition, il ne faut pas oublier de régler la priorité des opérations avec une paire de parenthèses.

Dans le `print()`, on commence par mettre le texte en guillemets, puis on le sépare de la variable `moyenne` par une virgule.
````

### Exercice {num1}`exercice`
Écrivez un petit programme en Python permettant de calculer le volume $V$ d'un cylindre en fonction de son rayon et de son hauteur. Votre programme contiendra les lignes suivantes :

-   Créer une variable `pi` contenant la valeur `3.14`.

-   Créer une variable `hauteur` contenant la valeur `30`

-   Créer une variable `diamètre` contenant la valeur `11`

-   Créer une variable `rayon` contenant la moitié de `diamètre` (c'est à dire `diamètre` divisé par 2).

-   Créer une variable `aire_disque` contenant le résultat de
    $\pi \cdot r^2$

-   Créer une variable `volume` contenant le résultat de l'aire du
    disque multiplié par la hauteur.

-   Afficher le contenu de la variable `volume` avec un texte explicatif. Si tout est correct, le programme doit afficher `Le volume est de 2849.55 m3`.

```{exec} python
:editor: 01987ec3-570e-74b8-9c99-80738baa4db6

```

````{solution}
```{exec} python
:linenos:
pi = 3.14
hauteur = 30
diamètre = 11
rayon = diamètre / 2
aire_disque = pi * rayon ** 2
volume = aire_disque * hauteur
```
````

### Exercice {num1}`exercice`
Le programme ci-dessous contient 2 erreurs dues à l'ordre des opérations. C'est-à-dire que l'ordre de certaines lignes a été inversé. Identifiez ces erreurs et réordrez les lignes de sorte que le programme fonctionne correctement. Attention : même si le programme s'exécute sans erreur, vérifiez que le total est bien de `18.9 CHF`.

```{exec} python
:editor: 01987ec9-c2b6-78b5-9ceb-ebe049d5f3f5
prix_haricots = 3.5
prix_carottes = 2.9
prix_poulet = 9.9
prix_légumes = prix_haricots + prix_carottes + prix_aubergines
prix_aubergines = 4.1
total = prix_légumes + prix_poulet
réduction_poulet = 1.5
prix_poulet -= réduction_poulet
print("Le total des courses est de", total, "CHF")
```

````{solution}
```{exec} python
:linenos:
prix_haricots = 3.5
prix_carottes = 2.9
prix_poulet = 9.9
prix_aubergines = 4.1
prix_légumes = prix_haricots + prix_carottes + prix_aubergines
réduction_poulet = 1.5
prix_poulet -= réduction_poulet
total = prix_légumes + prix_poulet
print("Le total des courses est de", total, "CHF")
```
1. On ne peut pas utiliser une variable avant de l'avoir déclarée. De ce fait, on ne peut pas utiliser `prix_aubergines` dans le calcul de `prix_légumes` avant d'avoir défini le prix des aubergines. Il suffit de mettre la déclaration de `prix_aubergines` avant le calcul du prix des légumes pour que cela fonctionne
2. Le `total` est calculé notamment avec `prix_poulet`. Or, ce prix est réduit après son addition au total. Dans ce cas, **Le total ne se met pas à jour**. Il est donc primordial de calculer le total seulement une fois que `prix_poulet` a obtenu sa valeur définitive.
````

### Exercice {num1}`exercice`
Complétez le programme ci-dessous pour calculer le montant que chaque élève doit payer pour la sortie de classe en fonction des données suivantes :

- 25 élèves prennent par à la sortie
- La journée débute à *FriBowling*. Le prix du bowling est de 10CHF par personne et par heure. Les élèves jouent durant 1h30.
- 

```{exec} python
:editor: 01987ee4-8971-7a6e-8535-e69a98261be1
nombre_élèves =
tarif_bowling = 10
durée_bowling =
prix_total_bowling =
#A vous de continuer depuis ici !
```

````{solution}
````


