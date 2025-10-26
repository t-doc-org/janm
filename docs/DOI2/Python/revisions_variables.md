<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Révisions - Variables

```{youtube} bBvxqsyg_ec
```

## Qu'est-ce qu'une variable ?
En programmation, l'un des concepts fondamental est celui de *variable*. Ce terme désigne en fait la **mémoire** du programme. Une variable permet de stocker **une valeur** dans la mémoire du programme et de lui donner **un nom**. On peut se représenter une variable comme une boîte dans laquelle on range une valeur et sur laquelle on colle une étiquette indiquant son contenu. De manière schématique, on a donc ci-dessous deux variables. La première, appelée `nom`, contient le texte `"Jan"`. La variable `age` contient quant à elle la valeur `26`.

```{image} images/var.png
:width: 50%
:alt: Exemple visuel de deux variables
:align: center
```

En Python, on peut créer des variables (et donc stocker des valeurs dans la mémoire du programme) avec la syntaxe `nom_de_la_variable = valeur`. Ainsi, les deux variables ci-dessus peuvent être créées de la manière suivante :

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

## Afficher une variable
Afin qu'un programme affiche le contenu d'une variable, on peut utiliser la fonction `print()`. On peut y écrire, entre ses parenthèses, le nom d'une variable ou une valeur `str` directement comme ci-dessous.
```{exec} python
:linenos:
pays = "Suisse"
print("La variable ci-dessus contient la valeur :")
print(pays)
```
Il est également possible de mettre du texte **et** des variables dans un seul `print()`. Pour cela, il ne faut pas oublier de les séparer par des virgules.
```{exec} python
:linenos:
nom = "Gremaud"
prénom = "Lucien"
ville = "Fribourg"
print("Bonjour je m'appelle", prénom, nom, "et j'habite à", ville)
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

## Commentaires
Comme un code Python peut être difficile à lire et à comprendre, on peut y ajouter des commentaires pour faciliter sa compréhension. Un commentaire est un texte quelconque qui ne sera pas pris en compte durant l'exécution du programme, et qui doit donc servir à expliquer ce qu'il se passe dans le code. Tout texte qui suit le signe `#` sur une ligne est considéré comme un commentaire. Pour exemplifier leur utilité, le programme ci-dessous vous est donné sans explication préalable, mais avec des commentaires.

```{exec} python
:linenos:
# Ce programme calcule le prix total des courses hebdomadaires

# Déclaration des variables
prix_pommes = 3.2     # en CHF/kg
poids_pommes = 1.5    # en kg
prix_pain = 2.8       # en CHF/pièce
prix_lait = 1.6       # en CHF/bouteille
prix_riz = 4.5        # en CHF/paquet
reduction = 2.0       # en CHF

# Calculs intermédiaires
total_pommes = prix_pommes * poids_pommes
sous_total = total_pommes + prix_pain + prix_lait + prix_riz

# Application de la taxe (TVA de 7.7 %)
taxe = sous_total * 0.077

# Calcul du total final avec réduction
total_ttc = sous_total + taxe - reduction

# Affichage du résultat final
print("Le montant total à payer est de", total_ttc, "CHF")
```




## Exercices de révision
### Exercice {num1}`exercice-revision`

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

### Exercice {num1}`exercice-revision`

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


### Exercice {num1}`exercice-revision`

Chacun des programmes suivant comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique. Lisez bien les messages d'erreur qui peuvent vous aider à corriger les codes.

1.  ```{exec} python
    :editor:
    print("Bonjour)
    ```

2.  ```{exec} python
    :editor:
    print(hello)
    ```

3.  ```{exec} python
    :editor:
    note = 4,5
    bonus = 0,2
    note_finale = note + bonus
    print("La note finale est", note_finale)
    ```
4.  ```{exec} python
    :editor:
    prénom = Maxime
    print("Je m'appelle", prénom)
    ```

5.  ```{exec} python
    :editor:
    longueur = 7
    largeur = 12
    périmetre = 2 * (Longueur + Largeur)
    print(périmetre)
    ```


6.  ```{exec} python
    :editor:
    prix_pain = 3
    prix_beurre = 5
    print("Le prix du pain et du beurre est de" prix_pain + prix_beurre "CHF")
    ```

7.  ```{exec} python
    :editor:
    côté = 5
    aire = côté ** 2
    print("aire")
    ```


````{solution}
1.  ```{exec} python
    :linenos:
    print("Bonjour")
    ```

2.  ```{exec} python
    :linenos:
    print("hello")
    ```

3.  ```{exec} python
    :linenos:
    note = 4.5
    bonus = 0.2
    note_finale = note + bonus
    print("La note finale est", note_finale)
    ```
4.  ```{exec} python
    :linenos:
    prénom = "Maxime"
    print("Je m'appelle", prénom)
    ```

5.  ```{exec} python
    :linenos:
    longueur = 7
    largeur = 12
    périmetre = 2 * (longueur + largeur)
    print(périmetre)
    ```


6.  ```{exec} python
    :linenos:
    prix_pain = 3
    prix_beurre = 5
    print("Le prix du pain et du beurre est de", prix_pain + prix_beurre, "CHF")
    ```

7.  ```{exec} python
    :linenos:
    côté = 5
    aire = côté ** 2
    print(aire)
    ```
````


### Exercice {num1}`exercice-revision`
Complétez le programme ci-dessous de manière à ce qu'il permette de calculer la moyenne des notes principales dans la variable du même nom. La note de math est de 4, et celles de français et d'allemand sont de 5 et demi.

Finalement, affichez la moyenne calculée avec un `print()`. Le programme devrait afficher `La moyenne principale est de 5`.

```{exec} python
:editor: 019a201a-49fa-7d28-869b-23021823ece6
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

### Exercice {num1}`exercice-revision`
Écrivez un programme en Python permettant de calculer le volume $V$ d'un cylindre en fonction de son rayon et de son hauteur. Votre programme contiendra les lignes suivantes :

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
:editor: 019a201a-7a40-71eb-b1c7-fab1a75325e7
#Ecrivez votre code ici

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
print("Le volume est de", volume, "m3")
```
````

### Exercice {num1}`exercice-revision`
Complétez le programme Python ci-dessous permettant de calculer le prix total d'un ordinateur sachant que
 - Le processeur coûte 250 CHF
 - Une barrette de 4Go de RAM coûte 29.95 CHF
 - On souhaite mettre 4 barrettes de RAM dans notre ordinateur
 - Le reste des composants coûte 870 CHF
 - Une réduction de 15% est appliquée sur le total 

Le programme final doit afficher `Le prix total de l'ordinateur après réduction est de 1053.83 CHF` 

```{exec} python
:editor: 019a2046-a9f2-77c5-9a86-f4c98a8a3fbe
prix_processeur = 
prix_barrette = 
nombre_barrettes = 
prix_autres = 

#A vous de continuer depuis ici !
```


````{solution}
```{exec} python
:linenos:
prix_processeur = 250
prix_barrette = 29.95
nombre_barrettes = 4
prix_autres = 870

# Calcul du prix total avant réduction
total_avant_reduction = prix_processeur + (prix_barrette * nombre_barrettes) + prix_autres

# Application de la réduction de 15 %
reduction = 0.15
total_apres_reduction = total_avant_reduction * (1 - reduction)

# Affichage du résultat
print("Le prix total de l'ordinateur après réduction est de", total_apres_reduction, "CHF")

```
````

### Exercice {num1}`exercice-revision`
Complétez le programme ci-dessous pour calculer le montant que chaque élève doit payer pour la sortie de classe en fonction des données suivantes :

- 25 élèves prennent part à la sortie
- La journée débute à *FriBowling*. Le prix du bowling est de 10CHF par personne et par heure. Les élèves jouent durant 1h30.
- En sortant, un élève chanceux et généreux trouve un billet de 50CHF sur le sol et décide de le mettre dans la caisse de classe pour payer les activités suivantes.
- Puis, les élèves se rendent à la piscine de la Motta. L'entrée coûte 4.5 CHF par élève. Toutefois, comme le groupe dépasse 20 personnes, un rabais de 20% est accordé.
- L'après-midi, la classe fait un mini-golf urbain. Le prix pour tout le groupe est de 125CHF

Affichez le montant que chaque élève devra payer sachant que dans cet univers fictif (et décidemment très généreux) le collège paie la moitié du montant de la journée.

**ATTENTION** : Pour vous y retrouver, veillez à inclure des commentaires dans votre code !

```{exec} python
:editor: 019a201a-b6c2-701b-a29a-cf8e4b8d7f6f
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


