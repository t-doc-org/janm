<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Variables et entrées utilisateur

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
:when:
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

## Entrées utilisateur
```{youtube} fnV53iHgp_c
```
Dans les programmes que nous avons écrits jusqu'à présent, l'utilisateur n'avait jamais son mot à dire sur ce qu'il se passait : il cliquait sur *Play* et voyait le résultat s'afficher. Toutefois, dans la grande majorité des programmes, l'utilisateur doit pouvoir **interagir** avec le programme avec son clavier, sa souris, sa manette de jeu, son microphone, etc. Toutes ces interactions que l'utilisateur peut avoir avec le programme **durant son exécution** sont appelées des entrées utilisateur. Dans ce cours, nous n'allons traiter qu'un seul type d'entrée utilisateur : l'écriture de texte au clavier.

### La fonction input

Pour que l'utilisateur puisse écrire une valeur au clavier durant l'exécution du programme, on utilise la fonction `input()`. Entre ses parenthèses, on met le texte à afficher à l'utilisateur pour lui indiquer ce qu'il doit écrire. Finalement, l'entrée de l'utilisateur doit être enregistrée dans une variable. De ce fait, le `input()` est toujours mis comme la valeur d'une variable, c'est-à-dire sous la forme `variable = input()`. L'exemple ci-dessous permet par exemple de demander le prénom de l'utilisateur, puis de le saluer.

```{exec} python
:linenos:
prénom = input("Quel est votre prénom ?")
print("Bonjour", prénom)
```

### Convertir une entrée
La fonction `input()` donne **toujours** une valeur de type `str`, même lorsque l'utilisateur tape un nombre. Lorsque l'utilisateur doit entrer une valeur numérique (c'est-à-dire une valeur `int` ou `float`), la fonction `input()` doit donc être contenue dans la fonction de conversion `int()` ou `float()` correspondante, comme ci-dessous. 
```{exec} python
:linenos:
nb_invités = int(input("Combien de personnes sont invitées ?"))
prix_par_personne = float(input("Quel est le prix en CHF par personne ?"))
total = nb_invités * prix_par_personne
print("Le prix total est de", total, "CHF")
```

```{important}
- `input()` donne toujours un `str`.
- `int()` convertit en nombre entier, `float()` en nombre à virgule.
- Sans conversion, `"12" + "3"` donne `"123"` et non `15`.
```

## Exercices

```{role} input(quiz-input)
:right: width: 5rem;
:check: json trim
```

### Exercice {num1}`exercice-python`
Pour chacune des questions ci-dessous, répondez **sans exécuter** le code : suivez la valeur des
variables ligne après ligne, en vous souvenant qu'une ligne ne peut pas influencer les lignes
précédentes.

```````{quiz}
1.  {input}`{"15": true,
              "10": "Après la ligne 3, a ne vaut plus 5 : il faut utiliser sa nouvelle valeur."}`
    Que vaut `b` à la fin ?
    ```{code-block} python
    :linenos:
    a = 5
    b = a * 2
    a = b - a
    b = a + b
    ```

2.  {input}`{"7": true,
              "3": "À la ligne 3, x prend la valeur de y. La valeur 3 est alors perdue."}`
    Que vaut `y` à la fin ?
    ```{code-block} python
    :linenos:
    x = 3
    y = 7
    x = y
    y = x
    ```

3.  {input}`{"14": true,
              "20": "La multiplication est prioritaire sur l'addition.",
              "38": "La puissance est prioritaire sur la multiplication."}`
    Que vaut `2 + 3 * 2 ** 2` ?

4.  {input}`{"123": true, "\"123\"": true,
              "15": "Ce sont deux valeurs de type str : le + colle les textes."}`
    Que vaut `"12" + "3"` ?

5.  {input}`{"15": true}`
    Que vaut `int("12") + 3` ?
```````

````{solution}
1.  **15.** Le tableau d'états est le suivant : après la ligne 2, `b` vaut 10 ; à la ligne 3, `a`
    prend la valeur `10 - 5`, soit 5 ; à la ligne 4, `b` vaut donc `5 + 10`, soit 15.
2.  **7.** Piège classique : ce programme **n'échange pas** les valeurs de `x` et `y`. À la
    ligne 3, `x` reçoit 7 et l'ancienne valeur 3 est écrasée. À la ligne 4, `y` reçoit donc la
    valeur actuelle de `x`, c'est-à-dire 7. Pour échanger deux variables, il faudrait d'abord
    sauvegarder l'une d'elles dans une troisième variable.
3.  **14.** On calcule d'abord la puissance ($2^2 = 4$), puis la multiplication ($3 \cdot 4 = 12$),
    et enfin l'addition.
4.  **`"123"`.** Les deux valeurs sont des `str` : l'opérateur `+` colle les deux textes l'un
    après l'autre au lieu de les additionner. C'est exactement ce qui arrive si l'on oublie de
    convertir un `input()`.
5.  **15.** La fonction `int()` convertit d'abord le texte `"12"` en nombre entier, qui peut
    alors être additionné à 3.
````

### Exercice {num1}`exercice-python`

Chacun des programmes suivants comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique. Lisez bien les messages d'erreur qui peuvent vous aider à corriger les codes.

1.  ```{exec} python
    :editor:
    note = 4,5
    bonus = 0,2
    note_finale = note + bonus
    print("La note finale est", note_finale)
    ```

2.  ```{exec} python
    :editor:
    longueur = 7
    largeur = 12
    périmetre = 2 * (Longueur + Largeur)
    print(périmetre)
    ```

3.  ```{exec} python
    :editor:
    prix_pain = 3
    prix_beurre = 5
    print("Le prix du pain et du beurre est de" prix_pain + prix_beurre "CHF")
    ```

4.  ```{exec} python
    :editor:
    année_collège = input("En quelle année du collège es-tu ?")
    print("Encore", 4 - année_collège, " an(s) avant d'avoir ta matu !")
    ```

5.  ```{exec} python
    :editor:
    #Essayez avec la note 4.5
    note = int(input("Quelle est ta dernière note en informatique ?"))
    print("Ta dernière note d'informatique est", note)
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    note = 4.5
    bonus = 0.2
    note_finale = note + bonus
    print("La note finale est", note_finale)
    ```
    Les nombres à virgule s'écrivent avec un **point**. Avec une virgule, Python ne plante pas,
    mais il crée tout autre chose qu'un nombre (deux valeurs séparées), d'où le résultat
    étrange.

2.  ```{exec} python
    :linenos:
    longueur = 7
    largeur = 12
    périmetre = 2 * (longueur + largeur)
    print(périmetre)
    ```
    Python distingue les majuscules des minuscules : `Longueur` et `longueur` sont deux noms de
    variables différents.

3.  ```{exec} python
    :linenos:
    prix_pain = 3
    prix_beurre = 5
    print("Le prix du pain et du beurre est de", prix_pain + prix_beurre, "CHF")
    ```

4.  ```{exec} python
    :linenos:
    année_collège = int(input("En quelle année du collège es-tu ?"))
    print("Encore", 4 - année_collège, " an(s) avant d'avoir ta matu !")
    ```
    Un `input()` donne toujours un `str` : il faut le convertir pour pouvoir faire un calcul.

5.  ```{exec} python
    :linenos:
    #Essayez avec la note 4.5
    note = float(input("Quelle est ta dernière note en informatique ?"))
    print("Ta dernière note d'informatique est", note)
    ```
    `int()` ne sait convertir que des nombres entiers : pour une note à virgule, il faut
    `float()`.
````

### Exercice {num1}`exercice-python`
Ecrivez un programme permettant de calculer les quantités requises pour une recette de cake au citron. Les quantités dans le début de programme ci-dessous sont pour une personne. De plus, le programme laissera l'utilisateur choisir la quantité de sucre (en kg) qu'il souhaite mettre dans son cake. Le programme final affichera donc les textes suivants.

```{code-block} text
Combien de kg de sucre souhaitez-vous ajouter par cake ?
Combien de cakes voulez-vous faire ?
Vous avez besoin de :
 - xxx oeufs
 - yyy citrons
 - zzz kg de farine
 - www kg de sucre.
```

```{exec} python
:editor: 01a162e3-3a81-72b5-8c81-cfb0a3ba6b79
nb_oeufs = 2
nb_citrons = 3
kg_farine = 0.2
kg_sucre = #Continuez ici

```

````{solution}
```{exec} python
:linenos:
nb_oeufs = 2
nb_citrons = 3
kg_farine = 0.2
kg_sucre = float(input("Combien de kg de sucre souhaitez-vous ajouter par cake ?"))
nb_cakes = int(input("Combien de cakes voulez-vous faire ?"))

print("Vous avez besoin de :")

print(" -", nb_oeufs * nb_cakes, "oeufs")
print(" -", nb_citrons * nb_cakes, "citrons")
print(" -", kg_farine * nb_cakes, "kg de farine")
print(" -", kg_sucre * nb_cakes, "kg de sucre")

```
````

### Exercice {num1}`exercice-python`
Complétez le programme ci-dessous pour calculer le montant que chaque élève doit payer pour la sortie de classe en fonction des données suivantes :

- 25 élèves prennent part à la sortie
- La journée débute à *FriBowling*. Le prix du bowling est de 10CHF par personne et par heure. Les élèves jouent durant 1h30.
- En sortant, un élève chanceux et généreux trouve un billet de 50CHF sur le sol et décide de le mettre dans la caisse de classe pour payer les activités suivantes.
- Puis, les élèves se rendent à la piscine de la Motta. L'entrée coûte 4.5 CHF par élève. Toutefois, comme le groupe dépasse 20 personnes, un rabais de 20% est accordé.
- L'après-midi, la classe fait un mini-golf urbain. Le prix pour tout le groupe est de 125CHF

Affichez le montant que chaque élève devra payer sachant que dans cet univers fictif (et décidemment très généreux) le collège paie la moitié du montant de la journée.

**ATTENTION** : Pour vous y retrouver, veillez à inclure des commentaires dans votre code !

```{exec} python
:editor: 01a162e3-3a77-7403-8b5d-d7001c628aa9
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
