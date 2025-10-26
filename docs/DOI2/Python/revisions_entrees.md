```{metadata}
solutions: show
```
# Révisions - Entrées utilisateur

```{youtube} fnV53iHgp_c
```


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
## Exercices de révision

### Exercice {num1}`exercice-revision`

Chacun des programmes suivant comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique.
1.  ```{exec} python
    :editor:
    input("Comment t'appelles-tu ?")
    print("Bonjour", prénom)
    ```
2.  ```{exec} python
    :editor:
    ville = input(Où habites-tu)
    print("Moi aussi j'habite à", ville, "!")
    ```

3.  ```{exec} python
    :editor:
    année_collège = input("En quelle année du collège es-tu ?")
    print("Encore", 4 - année_collège, " an(s) avant d'avoir ta matu !")
    ```


4.  ```{exec} python
    :editor:
    #Essayez avec la note 4.5
    note = int(input("Quelle est ta dernière note en informatique ?"))
    print("Ta dernière note d'informatique est", note)
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    prénom = input("Comment t'appelles-tu ?")
    print("Bonjour", prénom)
    ```
2.  ```{exec} python
    :linenos:
    ville = input("Où habites-tu")
    print("Moi aussi j'habite à", ville, "!")
    ```

3.  ```{exec} python
    :linenos:
    année_collège = int(input("En quelle année du collège es-tu ?"))
    print("Encore", 4 - année_collège, " an(s) avant d'avoir ta matu !")
    ```


4.  ```{exec} python
    :linenos:
    #Essayez avec la note 4.5
    note = float(input("Quelle est ta dernière note en informatique ?"))
    print("Ta dernière note d'informatique est", note)
    ```
````



### Exercice {num1}`exercice-revision`
Écrivez un programme Python demandant à l'utilisateur son nom, son prénom, ainsi que la ville ou le village dans laquelle il/elle habite. Ce programme affichera ensuite un texte saluant l'utilisateur correctement. Le programme devrait se dérouler de la manière suivante :

```{code-block} text
Quel est ton nom?
Quel est ton prénom?
Où habites-tu?
Bonjour {afficher le prénom} {afficher le nom}, heureux de faire ta connaissance.
Je vois que tu habites à {afficher le lieu}.
```

```{exec} python
:editor: 019a2067-e21e-723c-a1bc-8c8b3c5e98cb
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
### Exercice {num1}`exercice-revision`

Complétez ce programme permettant de calculer l'aire et le périmètre d'un rectangle en fonction des valeurs en centimètre demandées à l'utilisateur. Testez ce programme avec les valeurs `3.4` et `6.1`. Dans ce cas, le programme devrait afficher `L'aire vaut 20.74 cm2` et `Le périmètre vaut 19.0 cm`.


```{exec} python
:editor: e35ab3c5-b735-4fc5-b20d-0b261633aa15
# Complétez le programme
largeur = input()
longueur = input()
aire =
périmètre = 
print("L'aire vaut")
print("Le périmètre vaut")
```



````{solution}
```{exec} python
:linenos:
# Ne pas oublier de convertir les inputs en float
largeur = float(input("Quelle est la largeur du rectangle"))
longueur = float(input("Quelle est la longueur du rectangle"))

# Calcul de l'aire
aire = largeur * longueur

# Affichage de la réponse
print("L'aire vaut", aire)
```
````



### Exercice {num1}`exercice-revision`
Écrivez un programme permettant de convertir des degrés Fahrenheit en degrés Celsius. Pour une température en Fahrenheit $F$, on trouve son équivalent en Celsius $C$ avec la formule :


$$C = \frac{F - 32}{1.8}$$

L'exécution du programme devrait ressembler à cela :
```{code-block} text
Quelle température en Fahrenheit souhaitez-vous convertir ?
Merci, xxx °F équivalent à yyy °C
```
Vous pouvez vérifier votre programme en contrôlant que `60.2`°F valent bien `15.666`°C et que `100`°F valent `37.777`°C

```{exec} python
:editor: 019a2068-49bb-7fcb-9342-d30ee491fdec
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

### Exercice {num1}`exercice-revision`
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
:editor: 019a2068-aaef-7529-9f20-4107fe10114e
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
