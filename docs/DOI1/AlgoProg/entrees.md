```{metadata}
solutions: dynamic
```
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
Lorsque l'utilisateur doit rentré une valeur numérique (c'est-à-dire une valeur `int` ou `float`), la fonction `input()` doit être contenue dans la fonction de conversion `int()` ou `float()` correspondante comme ci-dessous 
```{exec} python
:linenos:
nb_invités = int(input("Combien de personnes sont invitées ?"))
prix_par_personne = float(input("Quel est le prix en CHF par personne ?"))
total = nb_invités * prix_par_personne
print("Le prix total est de", total, "CHF")
```
## Exercices


### Exercice {num1}`exercice`
Écrivez un programme Python demandant à l'utilisateur son nom, son prénom, ainsi que la ville ou le village dans laquelle il/elle habite. Ce programme affichera ensuite un texte saluant l'utilisateur correctement. Le programme devrait se dérouler de la manière suivante :

```{code-block} text
Quel est ton nom?
Quel est ton prénom?
Où habites-tu?
Bonjour {afficher le prénom} {afficher le nom}, heureux de faire ta connaissance.
Je vois que tu habites à {afficher le lieu}.
```

```{exec} python
:editor: 01989971-667c-7a23-9178-fe068c410f2b
#Ecrivez votre code ici

```

````{solution}
```{exec} python
:linenos:
nom = input("Quel est votre nom ?")
prenom = input("Quel est votre prénom ?")
ville = input("Où habitez-vous ?")
print("Bonjour", prenom, nom, ", heureux de faire ta connaissance")
print("Je vois que tu habites à", ville)
```
````

### Exercice {num1}`exercice`
Le programme ci-dessous devrait permettre de calculer l'année de naissance de l'utilisateur. Toutefois, celui-ci contient au moins une erreur par ligne. Trouvez-les et corrigez-les.

```{exec} python
:editor: 01989974-a6fe-7772-993a-b328c3037344
age = input("Quel âge avez-vous ?")
annee = input("En quelle année sommes-nous")
print("Vous êtes né.e en" annee - age "ou en" annee - age - 1)
```

````{solution}
```{exec} python
:linenos:
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
Quelle température en Fahrenheit souhaitez-vous convertir ?
Merci, xxx °F équivalent à yyy °C
```

```{exec} python
:editor: 01989975-6db0-7faf-861a-f5705647315f
#Ecrivez votre code ici

```
````{solution}
```{exec} python
:linenos:
fahrenheit = float(input("Quelle température en F souhaitez-vous convertir ?"))
celsius = (fahrenheit - 32) / 1.8
print("Merci,", fahrenheit, "°F équivaut à", celsius, "°C")
```
````

### Exercice {num1}`exercice`
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
:editor: 01989a68-020b-7273-a825-129e9a0b9b5c
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

print(nb_oeufs * nb_cakes, "oeufs")
print(nb_citrons * nb_cakes, "citrons")
print(kg_farine * nb_cakes, "kg de farine")
print(kg_sucre * nb_cakes, "kg de sucre")

```
````

### Exercice {num1}`exercice`
Développez un programme permettant de calculer la note que vous avez obtenue à un examen en fonction du nombre de points. On note $P_{\text{obt}}$ le nombre de points obtenus et $P_{\text{max}}$ le nombre de points maximal de l'examen. Dans le cas où le barème n'est pas adapté, la formule permettant de calculer la note est : 

$$\text{note} = \frac{P_{\text{obt}}}{P_{\text{max}}} \cdot 5 + 1$$

L'exécution du programme devrait alors ressembler à cela :
```{code-block} text
Combien de points pouvait-on obtenir au maximum ?
Combien de points avez-vous obtenu ?
Votre note est de : xxx
```

```{exec} python
:editor: 0198997c-b076-7805-a162-6cd394a862bb
#Ecrivez votre code ici

```

````{solution}
```{exec} python
:linenos:
p_max = float(input("Combien de points pouvait-on obtenir au maximum ?"))
p_obt = float(input("Combien de points avez-vous obtenu ?"))
note = p_obt / p_max * 5 + 1
print("Votre note est de :", note)
```
````
