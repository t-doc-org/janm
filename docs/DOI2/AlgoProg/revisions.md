# Révisions

## Exercices

### Exercice 1
Expliquez la différence entre les deux programmes suivants.

1.  
```{code-block} python
:caption: Programme 1
n = 5
if n < 10:
    n += 1
    print(n)
```

2. 
```{code-block} python
:caption: Programme 2
n = 5
while n < 10:
    n += 1
    print(n)
```


````{admonition} Solution
:class: note dropdown
Comme le premier programme utilise un `if`, le bloc d'instruction indenté en dessous n'est exécuté qu'une seule fois. Ce programme affichera simplement `6`. Dans le 2ème programme, l'exécution revient à la ligne du while après avoir exécuté une première fois le bloc indenté en dessous et réévalue l'expression conditionnelle. Le bloc est donc exécuté en boucle tant que `n` est plus petit que `10`. Ainsi, ce programme affiche 6, puis 7, puis 8, puis 9, puis 10. Si cela n'est pas clair pour vous, suivez le programme en complétant un tableau d'état pour vous convaincre de cet affichage.
````

### Exercice 2
Faites le tableau d'état et donnez l'affichage de l'exécution du programme suivant.

```{code-block} python
x = 0
y = 20
while x < y:
    y -= x * 2
    x = x + 2
    print(x + y)
```

````{admonition} Solution
:class: note dropdown
Affichage (avec des retours à la ligne plutôt que des espaces) : `22 20 14 4`

Tableau d'état :

| x  | y  |
| :--| :--|
| 0  |    |
| 0  | 20 |
| 0  | 20 |
| 2  | 20 |
| 2  | 16 |
| 4  | 16 |
| 4  | 8  |
| 6  | 8  |
| 6  | -4 |
| 8  | -4 |

````

### Exercice 3
Quel est l'affichage du programme suivant ? Réfléchissez bien avant de commencer à évaluer manuellement beaucoup d'expressions, la solution n'est pas si compliquée.

```{code-block} python
x = 10
y = 20
n = 800
compteur = 0
while compteur < 100:
    x += (x + y * n)
    y -= 2 * x
    n **= 3
    n = 1000
    y = x + y + n
    compteur += 1
    print(n)
```


````{admonition} Solution
:class: note dropdown
Le programme affichera simplement 1000. En effet, malgré le bloc d'instruction complexe qui se répète 100 fois, la valeur de `n` est à chaque fois réinitialisée à 1000.
````

### Exercice 4
1.  Écrivez un programme utilisant seulement 2 instructions `print()` affichant un compte à rebours de 1000 jusqu'à 0. L'exécution du programme ressemblera à ceci :
```{code-block} text
1000
999
998
...
2
1
0
BOOM
```

2.  Complétez ce programme avec une nouvelle instruction `print()` de manière à ce qu'à chaque fois qu'il affiche un nombre inférieur à 10 il affiche également le texte `"FUYEZ !"`, comme suivant :
```{code-block} text
1000
999
998
...
2 FUYEZ
1 FUYEZ
0 FUYEZ
BOOM`
```

````{admonition} Solution
:class: note dropdown
1. 
```{code-block} python
compte_a_rebours = 1000
while compte_a_rebours >= 0:
    print(compte_a_rebours)
    compte_a_rebours -= 1
print("BOOM")
```

2. 
```{code-block} python
compte_a_rebours = 1000
while compte_a_rebours >= 0:
    if compte_a_rebours < 10:
        print(compte_a_rebours, "FUYEZ !")
    else:
        print(compte_a_rebours)
    compte_a_rebours -= 1
print("BOOM")
```
````

### Exercice 5
Écrivez un programme dans lequel l'utilisateur peut choisir un nombre pour lequel il souhaite voir apparaître sa table de multiplication jusqu'à 10. Un message d'au revoir sera également affiché à la fin. Votre programme ne doit utiliser que 2 instructions `print()`. Un exemple d'exécution pourrait être le suivant :


````{admonition} Solution
:class: note dropdown
Il y a deux manières différentes pour résoudre ce problème. Toutefois, à moins d'être très à l'aise, je vous conseille de rester sur la première solution, car la 2ème est moins intuitive.


```{code-block} python
:caption: Solution 1
n = int(input("Quelle table de multiplication voulez-vous voir ?"))
multiplicateur = 1
while multiplicateur <= 10:
    print(multiplicateur, "*", n, "=", multiplicateur * n)
    multiplicateur += 1
```

```{code-block} python
:caption: Solution 2
n = int(input("Quelle table de multiplication voulez-vous voir ?"))
nombre_de_base = n
compteur = 0
while compteur < 10:
    compteur += 1
    print(compteur, "*", nombre_de_base, "=", n)
    n += nombre_de_base
```
````

### Exercice 6
Lisez attentivement le programme suivant. Décrivez ensuite précisément son fonctionnement. Testez-le ensuite pour vérifier votre raisonnement.

```{code-block} python
pizza = "sauce tomate, mozarella"
prix_base = 12.5
prix_jambon = 4
prix_ananas = 2
prix_champignons = 2.5
prix_pepperoni = 3
ingredient = ""
while ingredient != "fin":
    ingredient = input("Que voulez-vous ajouter sur la pizza ?")
    ingredient_ok = True
    if ingredient == "jambon":
        prix_base += prix_jambon
    elif ingredient == "ananas":
        prix_base += prix_ananas
    elif ingredient == "pepperoni":
        prix_base += prix_pepperoni
    elif ingredient == "fin" :
        print("Commande terminée")
        ingredient_ok = False 
    else:
        print("On ne peut pas faire cela...")
        ingredient_ok = False
    if ingredient_ok:
        print(ingredient, " a été ajouté sur la pizza")
        pizza += ", " + ingredient
print("Votre pizza est composée de", pizza)
print("Coût :", prix_base)
```


````{admonition} Solution
:class: note dropdown
Ce programme permet à l'utilisateur de composer petit à petit la pizza qu'il souhaite commander tout en calculant son prix. Il est seulement possible d'ajouter du jambon, des ananas, des champignons, et des pepperonis. Si l'utilisateur entre un autre ingrédient, le programme affiche que cela n'est pas possible, et l'ingrédient n'est pas ajouté sur la pizza. Quand l'utilisateur a fini de composer sa pizza, il peut écrire `fin` pour afficher la composition entière ainsi que le prix total.
````

### Exercice 7
Écrivez un programme dans lequel l'utilisateur peut consécutivement entrer les notes qu'il a faites dans une branche. À la fin, le programme affichera le nombre de notes insuffisantes qui ont été entrées. Les notes invalides seront simplement ignorées. Pour terminer le programme, l'utilisateur entrera la note `99`. Un exemple d'exécution peut être le suivant.

````{admonition} Solution
:class: note dropdown
```{code-block} python
nb_notes_insuf = 0
note = 0
while note != 99:
    note = float(input("Entrez une note"))
    if note >= 1 and note < 4:
        nb_notes_insuf += 1
print("Vous avez fait", nb_notes_insuf, "notes insuffisantes")
```
````
