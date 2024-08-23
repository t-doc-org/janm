# Sorties et entrées

## La fonction print()

Avec la fonction `print()`, tout ce qui se trouve entre ses parenthèses est affiché à l'utilisateur dans la console. Pour commencer, on peut simplement mettre des valeurs littérales de tout type entre les parenthèses du `print()` pour les afficher. Ainsi, vous pouvez exécuter le programme suivant pour voir les valeurs entre parenthèses être affichées dans la console.

```{code-block} python
:caption: Utilisation de la fonction print()
print("Bonjour, le prix du beurre en CHF est de")
print(5)
print("Et celui des œufs de")
print(1.2)
```

La fonction `print()` permet également d'afficher le contenu de variables. Au lieu d'une valeur, il suffit de mettre le nom d'une variable préalablement définie entre les parenthèses du `print()`. Ainsi, le programme ci-dessous permettra d'afficher le total du prix des courses avec un texte explicatif.

```{code-block} python
:caption: Utilisation de print() pour afficher le contenu de variables
pain = 3
carottes = 2
beurre = 5
total = pain + carottes + beurre
print("Le total des courses est de")
print(total)
print("CHF")
```

Vous pouvez constater que la sortie de ce programme n'est pas idéale. En effet, le texte affiché apparaît sur trois lignes différentes, ce qui le rend peu lisible. En Python, si vous souhaitez écrire plusieurs éléments sur la même ligne (comme ici deux valeurs de type `str` autour d'une variable), alors vous pouvez séparer ces éléments par des virgules à l'intérieur des parenthèses du `print()`. Ainsi, l'exemple précédent peut être réécrit de la manière suivante :

```{code-block} python
:caption: Utilisation de print avec des virgules
pain = 3
carottes = 2
beurre = 5
total = pain + carottes + beurre
print("Le total des courses est de", total, "CHF")
```

Finalement il est aussi possible de directement écrire des expressions à l'intérieur des parenthèses du `print()` pour en afficher l'évaluation. Ainsi, le programme suivant permet d'afficher "AHAHAHAHAH".

```{code-block} python
n = 5
print("AH" * n)
```

## La fonction input()

L'utilisation de la fonction `input()` permet de mettre temporairement en pause l'exécution du programme en attendant que l'utilisateur écrive une valeur au clavier et appuie sur la touche ENTER pour confirmer. Entre les parenthèses de `input()`, il est possible de mettre un texte pour donner une indication à l'utilisateur sur la valeur qu'il doit écrire. Pour conserver une valeur demandée via un `input()`, celle-ci doit être enregistrée dans une variable. Ainsi, le programme ci-dessous permet de demander le prénom de l'utilisateur, de le stocker dans une variable, puis de le saluer convenablement avec son prénom.

```{code-block} python
:caption: Utilisation de la fonction input()
prenom = input("Quel est votre prénom ?")
print("Bonjour", prenom)
```

## Fonctions de conversion de types int() et float()

Lorsque l'on demande à l'utilisateur d'entrer une valeur numérique (un âge, une année, une quantité, etc.) il est impératif de convertir l'input avec une fonction de conversion de type. En effet, par défaut, une valeur entrée par l'utilisateur est de type `str`. Cela signifie qu'avec un `input()` "normal", même si l'utilisateur écrit la valeur 4 et que celle-ci est enregistrée dans une variables nommée `nombre_de_personnes`, le type de cettte variable sera de type `str`. Ainsi, si cette variable est ensuite multipliée par 20, le résultat de cette expression sera alors `"44444444444444444444"` (20 fois le caractère `"4"`). Il est alors impératif d'entourer le `input()` de la fonction `int()` dans le cas d'une valeur entière, ou de la fonction `float()` dans le cas d'une valeur réelle.

```{code-block} python
:caption: Programme corrigé avec int()
nombre_de_personnes = int(input("Combien de personnes serez-vous ?"))
grammes_beurre = 20 * nombre_de_personnes
print("Vous avez besoin de", grammes_beurre, "grammes de beurre")
```

```{code-block} python
:caption: Utilisaiton de float()
base = float(input("Quelle est la base du triangle en cm ?"))
hauteur = float(input("Quelle est la hauteur du triangle en cm ?"))
print("L'aire du triangle est de", base * hauteur / 2, "cm2")
```
