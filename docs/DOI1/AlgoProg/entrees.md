# Entrées utilisateur

## Qu'est-ce qu'une entrée utilisateur ?

Dans les programmes que nous avons écrit jusqu'à présent, l'utilisateur n'avait jamais son mot à dire sur ce qu'il se passait : il cliquait sur *Play* et voyait le résultat s'afficher. Toutefois, dans la grande majorité des programmes, l'utilisateur doit pouvoir **intéragir** avec le programme avec son clavier, sa souris, sa manette de jeu, son microphone, etc. Toutes ces intéractions que l'utilisateur peut avoir avec le programme **durant son exécution** sont appelées des entrées utilisateur. Dans ce cours, nous n'allons traiter qu'un seul type d'entrée utilisateur : l'écriture de texte au clavier.

## La fonction input

Pour que l'utilisateur puisse écrire une valeur au clavier durant l'exécution du programme, on utilise la fonction `input()`. Entre ses parenthèses, on met le texte à afficher à l'utilisateur pour lui indiquer ce qu'il doit écrire. Finalement, l'entrée de l'utilisateur doit être enregistré dans une variable. De ce fait, le `input()` est toujours mis comme la valeur d'une variable, c'est-à-dire sous la forme `variable = input()`. L'exemple ci-dessous permet par exemple de demander le prénom de l'utilisateur, puis de le saluer.

```{exec} python
:linenos:
prénom = input("Quel est votre prénom ?")
print("Bonjour", prénom)
```

## Fonctions de conversion de types


## Exercices

### Exercice {num1}`exercice`
Le programme ci-dessous contient une erreur par ligne. Trouvez-les et corrigez-les.

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



### Exercice {num1}`exercice`
Complétez le code Python ci-dessous (sans rien supprimer à ce qui est déjà écrit) pour que celui-ci affiche exactement le texte suivant :

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

### Exercice {num1}`exercice`
Écrivez un programme Python demandant à l'utilisateur son nom, son prénom, ainsi que la ville ou le village dans laquelle il/elle habite. Ce programme affichera ensuite un texte saluant l'utilisateur correctement. Par exemple, si l'utilisateur s'appelle Maxime Jan et qu'il habite à Fribourg, alors le programme affichera :

```{code-block} text
Quel est votre pr´enom ?Maxime Jan`
Où habitez-vous ?Fribourg`
Bienvenue dans ce programme Maxime Jan`
Je vois que vous habitez à Fribourg`
A bientôt !
```



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

### Exercice {num1}`exercice`
Le programme ci-dessous devrait permettre de calculer l'année de naissance de l'utilisateur. Toutefois, celui-ci contient au moins une erreur par ligne. Trouvez-les et corrigez-les.

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

### Exercice {num1}`exercice`
Écrivez un programme permettant de convertir des degrés Fahrenheit en degrés Celsius. Pour une température en Fahrenheit $F$, on trouve son équivalent en Celsius $C$ avec la formule :


$$C = \frac{F - 32}{1.8}$$


Par exemple, si l'utilisateur entre la valeur `60.2`, alors le programme affichera :

```{code-block} text
Quelle température en Fahrenheit souhaitez-vous convertir ?60.2
Merci, 60.2 °F équivalent à 15.666666666666668 °C
```

````{admonition} Solution
:class: note dropdown
```{code-block} python
fahrenheit = float(input("Quelle température en F souhaitez-vous convertir ?"))
celsius = (fahrenheit - 32) / 1.8
print("Merci,", fahrenheit, "°F équivaut à", celsius, "°C")
```
````
