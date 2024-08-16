# Sorties et entrées

## Qu'est-ce qu'une sortie ?

Pour le moment, les programmes que vous avez étudiés et écrits sont
capables d'enregistrer, lire, et modifier des variables, ainsi que
d'évaluer des expressions. En tant que développeur, nous avons pu
inspecter le contenu des variables grâce à la fenêtre du même nom dans
Thonny. Toutefois, il faut bien différencier le rôle du programmeur de
celui de l'utilisateur. En effet, en tant que programmeur, vous avez
accès au code source de votre programme et à des interfaces spéciales
comme la fenêtre *Variables*. L'utilisateur de votre programme n'aura en
revanche ni accès au code, ni aux outils de Thonny. Celui-ci ne verra
que ce que le programme décrit explicitement comme devant être affiché à
l'utilisateur. Lorsque vous lancez un jeu vidéo, vous ne voyez en effet
ni son code, ni l'état de la mémoire, uniquement les images que les
développeurs ont choisi de vous montrer. Il en va de même pour les
programmes que vous écrivez en Python. Pour le moment, ceux-ci
n'affichent rien. Comme vous écrivez et testez vos programmes, vous
endossez les deux rôles à la fois, mais il est important de savoir se
mettre à la place de l'utilisateur lorsque vous exécutez vos
programmes.\
Ainsi, vos programmes n'ont pas encore de *sortie*. Une sortie
correspond au contenu qui est affiché ou produit par un programme. Cela
peut correspondre par exemple à une image, à du son, à un fichier, ou,
comme nous l'avons mentionné dans l'introduction de ce cours, à du
texte. Dans Thonny, ce texte apparaît dans la fenêtre *Console* et, en
Python, on peut en afficher avec la fonction `print()`.

## La fonction print

Ce cours reviendra plus tard sur la notion de fonction. Pour le moment,
il suffit de savoir qu'il s'agit d'un petit bout de code permettant
d'effectuer une action particulière qui diffère en fonction de ce qu'il
se trouve entre les parenthèses qui la suivent. Dans le cas de
`print()`, tout ce qui se trouve entre ses parenthèses est affiché à
l'utilisateur dans la console. Pour commencer, on peut simplement mettre
des valeurs littérales de tout type entre les parenthèses du `print()`
pour les afficher. Ainsi, vous pouvez exécuter le programme suivant pour
voir les valeurs entre parenthèses être affichées dans la console.

```{code-block} python
:caption: Utilisation de la fonction print()
print("Bonjour, le prix du beurre en CHF est de")
print(5)
print("Et celui des œufs de")
print(1.2)
```

La fonction `print()` permet également d'afficher le contenu de
variables. Au lieu d'une valeur, il suffit de mettre le nom d'une
variable préalablement définie entre les parenthèses du `print()`.
Ainsi, le programme ci-dessous permettra d'afficher le total du prix des
courses avec un texte explicatif.

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

Vous pouvez constater que la sortie de ce programme n'est pas idéale. En
effet, le texte affiché apparaît sur trois lignes différentes, ce qui le
rend peu lisible. De plus, la fonction `print()` est écrite trois fois à
la suite. En Python, si vous souhaitez écrire plusieurs éléments sur la
même ligne (comme ici deux valeurs de type `str` autour d'une variable),
alors vous pouvez séparer ces éléments par des virgules à l'intérieur
des parenthèses du `print()`. Ainsi, l'exemple précédent peut être
réécrit de la manière suivante :

```{code-block} python
:caption: Utilisation de print avec des virgules
pain = 3
carottes = 2
beurre = 5
total = pain + carottes + beurre
print("Le total des courses est de", total, "CHF")
```

Finalement il est aussi possible de directement écrire des
expressions à l'intérieur des parenthèses du `print()` pour en afficher
l'évaluation. Ainsi, le programme suivant permet d'afficher dix fois le
texte *Fish & Chips*.

```{code-block} python
plat1 = "Fish"
plat2 = "Chips "
n = 10
print( (plat1 + " & " + plat2) * n)
```

## Qu'est-ce qu'une entrée ?

Les programmes que nous avons étudiés jusqu'ici nous permettent de faire
divers calculs et d'afficher les résultats à l'utilisateur. Toutefois,
ils ont un grand inconvénient : l'utilisateur ne peut que constater le
résultat et ne peut pas interagir avec le programme. Il est évident que
cela n'a pas de sens pour, par exemple, un jeu vidéo que l'on ne puisse
pas le contrôler. Ainsi, un programme a souvent besoin d'*entrées*. Une
entrée est une interaction que l'utilisateur peut faire avec le
programme durant son exécution. Il peut s'agir d'un mouvement de souris,
d'un clic, d'un son dans le microphone, etc. Dans le cadre de nos
programmes textuels, l'entrée qui nous sera la plus utile est la saisie
de texte au clavier qui s'effectue, en Python, avec la fonction
`input()`.

## La fonction input

L'utilisation de la fonction `input()` permet de mettre temporairement
en pause l'exécution du programme en attendant que l'utilisateur écrive
une valeur au clavier et appuie sur la touche ENTER pour confirmer.
Entre les parenthèses de `input()`, il est possible de mettre un texte
pour donner une indication à l'utilisateur sur la valeur qu'il doit
écrire. Pour conserver une valeur demandée via un `input()`, celle-ci
doit être enregistrée dans une variable. Ainsi, le programme ci-dessous
permet de demander le prénom de l'utilisateur, de le stocker dans une
variable, puis de le saluer convenablement avec son prénom.

```{code-block} python
:caption: Utilisation de la fonction input()
prenom = input("Quel est votre prénom ?")
print("Bonjour", prenom)
```

## Fonctions de conversion de types

Nous allons maintenant essayer de créer un programme permettant de
calculer les quantités devant être achetées pour une recette en fonction
du nombre de personnes. Un premier essai pourrait être le suivant.

```{code-block} python
:caption: Un programme pas tout à fait correct
nombre_de_personnes = input("Combien de personnes serez-vous ?")
grammes_beurre = 20 * nombre_de_personnes
print("Vous avez besoin de", grammes_beurre, "grammes de beurre")
```

A priori, on se dit que si l'on exécute ce programme et que
l'utilisateur entre la valeur `4`, alors le texte affiché devrait nous
indiquer d'acheter 80 grammes de beurre. Or, ce n'est pas du tout ce
qu'il se passe actuellement. En effet, si vous essayez cette exécution
par vous-même, vous constaterez que le résultat dans la console est le
suivant :

Que s'est-il passé ? En fait, les valeurs entrées par l'utilisateur à
l'aide d'un `input()` sont toujours considérées comme étant de type
`str`. Ainsi, dans notre programme, l'expression
`20 * nombre_de_personnes` se réduit à `20 * "4"`, et comme un `str`
multiplié par un `int` a l'effet de répéter la chaîne de caractères, on
obtient alors le texte `44444444444444444444`. Pour éviter ce problème,
il faut le plus rapidement possible convertir cette valeur dans le type
adéquat. Comme le nombre de personnes est ici un nombre entier, nous
allons donc devoir convertir cette entrée en `int`. Le nom de la
fonction de conversion est très facile à retenir puisque celui-ci est le
même que le nom du type : `int()`. Il suffit alors de mettre entre les
parenthèses de `int()` la valeur que nous souhaitons transformer en
nombre entier pour initier la conversion. Dans notre cas, la valeur à
convertir est celle du `input()`. Ainsi, nous allons mettre tout le
`input()` à l'intérieur des parenthèses du `int()`. Il suffit ainsi de
modifier la première ligne du programme, comme ci-dessous, afin que
celui-ci nous propose bien d'acheter 80 grammes de beurre lorsque
l'utilisateur entre la valeur `4`.

```{code-block} python
:caption: Programme corrigé avec int()
nombre_de_personnes = int(input("Combien de personnes serez-vous ?"))
grammes_beurre = 20 * nombre_de_personnes
print("Vous avez besoin de", grammes_beurre, "grammes de beurre")
```

Lorsque l'utilisateur doit entrer une valeur de type `float`, l'entrée
peut être également convertie avec une fonction de même nom. Par
exemple, le programme ci-dessous permet de demander à l'utilisateur la
taille de la base et de la hauteur d'un triangle, puis affiche son aire.

```{code-block} python
:caption: Utilisaiton de float()
base = float(input("Quelle est la base du triangle en cm ?"))
hauteur = float(input("Quelle est la hauteur du triangle en cm ?"))
print("L'aire du triangle est de", base * hauteur / 2, "cm2")
```

## Exercices

### Exercice 1
Le programme ci-dessous contient une erreur par ligne. Trouvez-les et
corrigez-les.

```{code-block} python
print "Bienvenue dans ce nouveau programme !"
print(nombre_de_pommes = 10)
print("Vous devez payer" nombre_de_pommes * 1.5 "CHF")
print(Fin du programme)
```


````{admonition} Solution
:class: note dropdown
```{code-block} python
print("Bienvenue dans ce nouveau programme !")
nombre_de_pommes = 10
print("Vous devez payer", nombre_de_pommes * 1.5, "CHF")
print("Fin du programme")
```
````

### Exercice 2
1.  Sans exécuter le programme ci-dessous, essayez de prédire ce qu'il
    affichera dans la console.

```{code-block} python
salutations = "Bonjour"
print(salutations)
print("salutations")
```

2.  Après avoir vérifié votre réponse, expliquez brièvement l'impact des
    guillemets sur le mot `salutations`.


````{admonition} Solution
:class: note dropdown
1.  `Bonjour`\
    `salutations`

2.  Lorsque le mot `salutations` est écrit sans guillemets, il fait
    référence à la variable. L'affichage substitue donc la variable par
    son contenu. Lorsque des guillemets entourent `salutations`, alors
    le mot est considéré comme une valeur de type `str` et le mot est
    alors affiché tel quel.
````


### Exercice 3
Complétez le code Python ci-dessous (sans rien supprimer à ce qui est
déjà écrit) pour que celui-ci affiche exactement le texte suivant :

```{code-block} python
parole = "NA "
héro = "BATMAN"
print(parole)
```


````{admonition} Solution
:class: note dropdown

```{code-block} python
parole = "NA "
héro = "BATMAN"
print(parole * 16, héros)
print("Gotham m'appelle")
```
````

### Exercice 4
Écrivez un programme Python demandant à l'utilisateur son nom, son
prénom, ainsi que la ville ou le village dans laquelle il/elle habite.
Ce programme affichera ensuite un texte saluant l'utilisateur
correctement. Par exemple, si l'utilisateur s'appelle Maxime Jan et
qu'il habite à Fribourg, alors le programme affichera :

`Quel est votre pr´enom ?Maxime Jan`\
`Où habitez-vous ?Fribourg`\
`Bienvenue dans ce programme Maxime Jan`\
`Je vois que vous habitez à Fribourg`\
`A bientôt !`



````{admonition} Solution
:class: note dropdown
```{code-block} python
nom = input("Quel est votre nom ?")
prenom = input("Quel est votre prénom ?")
ville = input("Où habitez-vous ?")
print("Bonjour", prenom, nom)
print("Je vois que vous habitez à", ville)
print("A bientôt !")
```
````

### Exercice 5
Le programme ci-dessous devrait permettre de calculer l'année de
naissance de l'utilisateur. Toutefois, celui-ci contient au moins une
erreur par ligne. Trouvez-les et corrigez-les.

```{code-block} python
age = input("Quel âge avez-vous ?")
annee = input("En quelle année sommes-nous")
print("Vous êtes né.e en" annee - age "ou en" annee - age - 1)
```

````{admonition} Solution
:class: note dropdown
```{code-block} python
age = int(input("Quel âge avez-vous ?"))
annee = int(input("En quelle année sommes-nous"))
print("Vous êtes né.e en", annee - age, "ou en", annee - age - 1)
```
````

### Exercice 6
Écrivez un programme permettant de convertir des degrés Fahrenheit en
degrés Celsius. Pour une température en Fahrenheit $F$, on trouve son
équivalent en Celsius $C$ avec la formule :

::: center
$C = \frac{F - 32}{1.8}$
:::

Par exemple, si l'utilisateur entre la valeur `60.2`, alors le programme
affichera :

`Quelle température en Fahrenheit souhaitez-vous convertir ?60.2`\
`Merci, 60.2 °F équivalent à 15.666666666666668 °C`

````{admonition} Solution
:class: note dropdown
```{code-block} python
fahrenheit = float(input("Quelle température en F souhaitez-vous convertir ?"))
celsius = (fahrenheit - 32) / 1.8
print("Merci,", fahrenheit, "°F équivaut à", celsius, "°C")
```
````
