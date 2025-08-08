<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

# Variables

## Qu'est-ce qu'une variable ?
En programmation, l'un des concepts fondamental est celui de *variable*. Ce terme désigne en fait la **mémoire** du programme. Une variable permet de stocker **une valeur** dans la mémoire du programme et de lui donner **un nom**. On peut se représenter une variable comme une boîte dans laquelle on range une valeur et sur laquelle on colle une étiquette indiquant son contenu. De manière schématique, on a donc ci-dessous deux variables. La première, appelée `nom`, contient le texte `"Jan"`. La variable `age` contient quant à elle la valeur `26`.

```{image} images/var.png
:width: 50%
:alt: Exemple visuel de deux variables
:align: center
```

En Python, on peut créer des variables (et donc stocker des valeurs dans la mémoire du programme) en avec la syntaxe `nom_de_la_variable = valeur`. Ainsi, les deux variables ci-dessus peuvent être créées de la manière suivante :

```{exec} python
:linenos:
nom = "Jan"
age = 26
```
L'exécution de ce programme ne donne rien, mais les deux variables ont bien été créées. On peut visualiser le contenu des variables en utilisant le `print()` vu précédemment. En effet, si l'on met le nom d'une variable préalablement déclarée dans un `print()`, sa valeur sera alors affichée. Finalement, pour donner du sens à la valeur affichée, on peut afficher un texte à ses côtés en le séparant par une virgule.
```{exec} python
:linenos:
prénom = "Iliya"
pays = "Bulgarie"
ville = "Fribourg"
print(prénom)
print("Je viens de", pays, "et j'habite à", ville)
```

Le nom des variables ne doit jamais contenir d'espaces ! Ainsi, dans le cas où le nom d'une variable contiendrait plusieurs mots, on les sépare avec des "tirets en bas". Par exemple. `année_de_naissance` ou `poids_en_grammes`.

## Types de valeurs
En Python, les valeurs que l'on stocke dans les variables peuvent être de 4 types différents. Dans l'exemple précédent, `nom` contient un texte, c'est-à-dire une valeur de type `str`. La variable `age` contient quant à elle un nombre entier, qui est une valeur de type `int`. Le tableau ci-dessous résume les quatre types de valeurs possibles.

| Type      | Nom complet      | Description                      | Exemple            |
|---------  |--------   |----------------------------------|--------------------|
| `int`   | integer   | Nombres entiers                  | `4`                  |
| `float` | flottant  | Nombres à virgules               | `4.125`              |
| `str`   | string    | Texte / Chaînes de caractères            | `"Bonjour"`          |
| `bool`  | booléen   | Résultat d'un test: Vrai ou Faux | 2<1 renvoie `False`  |

```{important}
- Pour séparer les unités des décimales, les flottants utilisent un **point**, et non une virgule
- Le texte des strings est toujours entourant de **guillemets**
```

Dans l'exemple ci-dessous, 4 variables de 4 types différents sont déclarées.
```{exec} python
:linenos:
:when: never
année = 2025
distance_km = 45.32
collège = "Collège Sainte-Croix"
promu = True
```

## Opérations arithmétiques
Avec Python, il est très facile d'effectuer des opérations arithmétiques (autrement dit, des calculs). On peut utiliser les opérateurs suivants. La priorité des opérations est la même qu'en mathématiques. On peut utiliser des parenthèses pour modifier cette priorité.
| Opérateur | Nom                                   | Exemple | Résultat |
| :-------: | :-----------------------------------: | :-----: | :------: |
| `+`         | Addition                              | `3 + 4`   | `7`        |
| `-`         | Soustraction                          | `9 - 12`  | `-3`       |
| `*`         | Multiplication                        | `5 * 6`   | `30`       |
| `/`         | Division                              | `11 / 2`  | `5.5`      |
| `**`        | Puissance                             | `2 ** 3`  | `8`        |

Ces opérateurs peuvent être utilisés comme ci-dessus avec des valeurs, ou avec des variables, comme le montre l'exemple ci-dessous.
```{exec} python
:linenos:
nombre_de_personnes = 13
prix_par_personne = 5.75
réduction = 10.5
total = nombre_de_personnes * prix_par_personne - réduction
print("Le prix total est de", total, "CHF")
```

## Ordre d'exécution des instructions
Dans tous les langages de programmation, les lignes de code s'exécutent les unes après les autres de haut en bas. Lorsqu'une ligne s'effectue, elle **ne peut pas influencer une ligne précédente**. Par exemple, dans le programme ci-dessous, la valeur de `b` est définie comme le double de `a`. Toutefois, lorsque la valeur de `a` change, cela n'impacte pas la valeur de `b` qui a déjà été calculée.

```{exec} python
:linenos:
a = 5
b = a * 2
a = 9
print(a, b)
```

Afin de bien comprendre l'exécution d'un programme, nous allons utiliser un tableau d'état. Celui-ci permettra d'établir la valeur de chaque variable à tout moment du programme. Dans l'exemple ci-dessous, on comprend bien que le changement de valeur de `a` n'impacte pas les valeurs de `b`, `c`, et `d`.

````{list-grid}
:style: grid-template-columns: 1fr min-content;
- # Programme
  ```{exec} python
  :linenos:
  a = 10
  b = 30
  c = a + b
  d = c * a
  a = 2 * a

  print(a, b, c, d)
  ```
- # Tableau d'états
  | ligne | a | b | c | d |
  |:-----:|:-:|:-:|:-:|:-:|
  | 1 | 10| / | / | / |
  | 2 | 10| 30| / | / |
  | 3 | 10| 30| 40| / |
  | 4 | 10| 30| 40| 400|
  | 5 | 20| 30| 40| 400|
````

## Opérateurs d'affectation combinée
Les opérateurs d'affectation combinée permettent de modifier la valeur des variables avec une notation simplifiée. Il existe pour tous les opérateurs mathématiques, voici les principaux.

| Opérateur | Exemple | Équivalent à |
| :-------: | :-----: | :----------: |
| `+=`        | `x += 6`  | `x = x + 6`    |
| `-=`        | `x -= 6`  | `x = x - 6`    |
| `*=`       | `x \*= 6` | `x = x * 6`    |
| `/=`        | `x /= 6`  | `x = x / 6`    |

## Exercices
### Exercice {num1}`exercice`

De quel type sont les valeurs suivantes?

```{role} select(quiz-select)
:right:
:options: |
: int
: float
: str
: bool
```

```{quiz}
:style: max-width: 20rem;
1.  {select}`int`   `60`
2.  {select}`str`   `"Hello Bob"`
3.  {select}`float` `1.34`
4.  {select}`bool`  `True`
5.  {select}`str`   `"45"`
6.  {select}`float` `-1.23`
7.  {select}`str`   `"False"`
8.  {select}`float` `0.34`
9.  {select}`int`   `-12`
10. {select}`bool`  `False`
```
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

Quel est le résultat des expressions suivantes en Python?

```{role} input(quiz-input)
:right: width: 5rem;
:check: json trim
```

```{quiz}
:style: max-width: 30rem;
1.  {input}`{"5": true}`
    {quiz-hint}`Il faut effectuer la division de 15 par 3.`
    `15 / 3`
2.  {input}`{"21": true}`
    {quiz-hint}`Il faut multiplier 3 avec 7`
    `3 * 7`
3.  {input}`{"3.5": true,
             "3,5": "En Python, il faut utiliser un point pour les nombres à
                     virgule."}`
    {quiz-hint}`Il faut effectuer la division.`
    `7 / 2`
4.  {input}`{"-2": true,
             "2": "En Python, l'ordre de priorité est le même qu'en maths."}`
    `4 - 3 * 2`
5.  {input}`{"8": true}`
    `(1 + 2) ** 2 - 1`
```

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
**Sans exécuter** le programme ci-dessous, prédites ce qu'il affichera. Une fois votre hypothèse faite, exécutez le code pour la vérifier. Quelle est donc l'impact des guillemets dans un `print()` ?

```{exec} python
salutations = "Bonjour"
print(salutations)
print("salutations")
```

````{solution}
Lorsque `salutations` est écrit sans guillemets dans un `print()`, il fait référence à la variable. L'affichage substitue donc la variable par son contenu, c'est-à-dire `"Bonjour"`. En revanche, lorsque des guillemets entourent `salutations`, alors le mot est considéré comme une valeur de type `str` et le mot est alors affiché tel quel.
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

- 25 élèves prennent part à la sortie
- La journée débute à *FriBowling*. Le prix du bowling est de 10CHF par personne et par heure. Les élèves jouent durant 1h30.
- En sortant, un élève chanceux et généreux trouve un billet de 50CHF sur le sol et décide de le mettre dans la caisse de classe pour payer les activités suivantes.
- Puis, les élèves se rendent à la piscine de la Motta. L'entrée coûte 4.5 CHF par élève. Toutefois, comme le groupe dépasse 20 personnes, un rabais de 20% est accordé.
- L'après-midi, la classe fait un mini-golf urbain. Le prix pour tout le groupe est de 125CHF

Affichez le montant que chaque élève devra payer sachant que dans cet univers fictif (et décidemment très généreux) le collège paie la moitié du montant de la journée.

**ATTENTION** : Pour vous y retrouver, veillez à inclure des commentaires dans votre code !

```{exec} python
:editor: 01987ee4-8971-7a6e-8535-e69a98261be1
nombre_élèves =

#Calcul du prix du bowling
tarif_bowling = 10
durée_bowling =
prix_total_bowling =

#A vous de continuer depuis ici !
```

````{solution}
```{exec} python
nombre_élèves = 25

#Calcul du prix du bowling
tarif_bowling = 10
durée_bowling = 1.5
prix_bowling = nombre_élèves * tarif_bowling * durée_bowling

#Billet trouvé sur le sol
billet_trouvé = 50

#Prix de la piscine
tarif_piscine = 4.5
rabais_piscine = 0.8
prix_piscine = nombre_élèves * tarif_piscine * rabais_piscine

#Prix du mini-golf urbain
prix_mini_golf = 125

#Calcul du prix total
total = prix_bowling - billet_trouvé + prix_piscine + prix_mini_golf

#Prise en charge de la moitié par le collège
total = total / 2

#Calcul du prix par élève
prix_par_élève = total / nombre_élèves

#Affichage du prix par élève
print("Chaque élève doit payer", prix_par_élève, "CHF")

```
````


