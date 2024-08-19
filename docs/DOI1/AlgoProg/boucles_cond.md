# Boucles conditionnelles

## Qu'est-ce qu'une boucle conditionnelle ?

Dans le précédent chapitre, nous avons commencé à programmer notre jeu du Devin, mais avons également remarqué que le problème de ce début de programme était qu'on ne pouvait deviner qu'une seule fois le nombre mystère avant que le programme s'arrête. Grâce à une boucle, il sera alors possible de demander plusieurs fois à l'utilisateur de deviner un nombre jusqu'à ce qu'il ait trouvé le nombre mystère. De manière générale, une boucle conditionnelle permet de répéter l'exécution d'un bloc d'instructions plusieurs fois *tant qu*'une certaine condition est respectée. On peut typiquement penser à un système de connexion qui ne laisse pas l'utilisateur entrer dans le système avant que le bon mot de passe soit donné. Le programme ressemblerait alors à ceci.

```{code-block} text
Afficher "Connectez-vous"
Demander le mot de passe à l’utilisateur
Tant que le mot de passe est différent de "Fr1B0urg"
    Afficher "Mot de passe incorrect"
    Redemander le mot de passe à l’utilisateur
Afficher "Mot de passe correct, bienvenue"
```

Grâce à l'instruction `tant que`, le bloc d'instruction indenté en dessous est répété en boucle tant que la condition `mot de passe est différent de "Fr1B0urg"` est vraie. Comme la dernière instruction n'est pas indentée, celle-ci ne sera pas exécutée avant que l'exécution de la boucle soit terminée, et ainsi que le mot de passe soit correct. Ainsi, en fonction des entrées de l'utilisateur, on peut distinguer les exécutions suivantes.

````{admonition} Exécution 1
:class: note dropdown
L'utilisateur entre directement le bon mot de passe à la ligne 2 :

1.  L'expression conditionnelle de la ligne 3 est fausse, donc on ne rentre pas dans la boucle.

2.  `"Mot de passe correct"` est affiché`
````

````{admonition} Exécution 2
:class: note dropdown
L'utilisateur entre le mauvais mot de passe à la ligne 2, mais le bon mot de passe au 2ème essai à la ligne 5 :

1.  L'expression de la ligne 3 est vraie, donc on rentre dans la
    boucle.
2.  `Mot de passe incorrect` est affiché.
3.  Le mot de passe est redemandé (et l'utilisateur entre le bon).
4.  Comme on arrive à la fin du bloc d'instructions indenté, on
    retourne vers le haut à la ligne du `tant que`. L'expression
    conditionnelle est réévaluée. Cette fois, elle est fausse, donc
    on ne rentre plus dans la boucle.
5.  `"Mot de passe correct"` est affiché.
````

````{admonition} Exécution 3
:class: note dropdown
L'utilisateur entre le mauvais mot de passe à la ligne 2, puis entre
    15 fois le mauvais mot de passe quand on le lui redemande, avant
    d'entrer finalement le bon mot de passe.

1.  L'expression de la ligne 3 est vraie, donc on rentre dans la
    boucle.
2.  `Mot de passe incorrect` est affiché.
3.  Le mot de passe est redemandé (et l'utilisateur en entre un
    faux).
4.  Comme on arrive à la fin du bloc d'instructions indenté, on
    retourne vers le haut à la ligne du `tant que`. L'expression
    conditionnelle est réévaluée. Celle-ci est toujours vraie, donc
    on rentre à nouveau dans la boucle.
5.  `"Mot de passe incorrect"` est affiché.
6.  Le mot de passe est redemandé (et l'utilisateur en entre un
    faux).
7.  Comme on arrive à la fin du bloc d'instructions indenté, on
    retourne vers le haut à la ligne du `tant que`.\
    Ainsi de suite avec l'utilisateur qui entre encore 13 fois le
    mauvais mot de passe. Jusqu'à ce que :\
49.  Le mot de passe est redemandé (et l'utilisateur entre le bon).
50.  On retourne à la ligne du `tant que`. La condition est
    maintenant fausse, donc on ne rentre plus dans la boucle.
51. `"Mot de passe correct"` est affiché.
````
## La boucle while

En Python, la boucle conditionnelle `tant que` se traduit littéralement par le mot anglais `while`. Ce mot-clef est suivi d'une expression conditionnelle qui détermine la condition d'arrêt de la boucle, et la ligne se termine par deux points. À chaque fois que le programme passe par cette ligne, l'expression conditionnelle est réévaluée, et, à chaque fois que le résultat de cette évaluation est `True`, le bloc d'instructions indenté en dessous est exécuté. Après ce bloc indenté, l'exécution remonte à la ligne du `while` pour réévaluer l'expression conditionnelle. Ainsi, l'exemple du programme de connexion avec un mot de passe peut s'écrire de la manière suivante en Python.

```{code-block} python
:caption: Programme Python de contrôle de mot de passe
print("Connectez-vous")
mdp = input("Entrez le mot de passe")
while mdp != "Fr1B0urg" :
    print("Mot de passe incorrect")
    mdp = input("Entrez à nouveau le mot de passe")
print("Mot de passe correct")
```

## Etude de cas : le jeu du Devin

Nous possédons maintenant presque tous les éléments pour créer le jeu du Devin en entier. Pour commencer, reprenons le code que nous avions élaboré dans le chapitre sur les branchements conditionnels.

```{code-block} python
:caption: Jeu du Devin incomplet (un seul essai)
nombre_mystere = 76
nombre_du_joueur = int(input("À quel nombre est-ce que je pense ?"))
if nombre_du_joueur > nombre_mystere:
    print("Le nombre est trop grand")
elif nombre_du_joueur < nombre_mystere:
    print("Le nombre est trop petit")
else:
    print("Félicitations ! Tu as trouvé le nombre mystère")
```

Nous voulons ici que toutes les instructions, sauf la première, soient répétées tant que l'utilisateur n'a pas trouvé le nombre mystère, c'est-à-dire *tant que le nombre du joueur est différent du nombre mystère*. Ainsi, on peut ajouter un `while`, avec la condition `nombre_du_joueur != nombre_mystere`, et indenter toutes les autres instructions sous ce `while`.

```{code-block} python
:caption: Jeu du Devin complet (mais avec un bug !)
nombre_mystere = 76
while nombre_du_joueur != nombre_mystere:
    nombre_du_joueur = int(input("À quel nombre est-ce que je pense ?"))
    if nombre_du_joueur > nombre_mystere:
        print("Le nombre est trop grand")
    elif nombre_du_joueur < nombre_mystere:
        print("Le nombre est trop petit")
    else:
        print("Félicitations ! Tu as trouvé le nombre mystère")
```

Ce programme semble contenir tous les éléments nous permettant de jouer à notre jeu du Devin. Toutefois, si vous essayez de l'exécuter, vous obtiendrez l'erreur suivante.

En lisant ce message d'erreur, on peut comprendre ce qui est incorrect dans notre programme. On voit que, lorsque la ligne 2 est exécutée, la variable `nombre_du_joueur` n'a pas été définie. En effet, on utilise ici cette variable dans une expression avant de l'avoir créée. Pour remédier à ce problème, il faut donc créer cette variable avant la ligne du `while`. La valeur initiale de cette variable n'a aucune importance, tant qu'elle est différente du nombre mystère. On peut ainsi décider de l'initialiser, par exemple, à `-1`.

```{code-block} python
:caption: Jeu du Devin complet
nombre_mystere = 76
nombre_du_joueur = -1
while nombre_du_joueur != nombre_mystere:
    nombre_du_joueur = int(input("À quel nombre est-ce que je pense ?"))
    if nombre_du_joueur > nombre_mystere:
        print("Le nombre est trop grand")
    elif nombre_du_joueur < nombre_mystere:
        print("Le nombre est trop petit")
    else:
        print("Félicitations ! Tu as trouvé le nombre mystère")
```

À ce point-là, le programme est complètement fonctionnel. Toutefois, le nombre mystère n'est pas si mystérieux que ça puisqu'il ne change pas d'exécution en exécution. Nous allons donc modifier ce nombre mystère pour que celui-ci soit aléatoire. Pour cela, nous allons devoir importer un nouveau module nommé `random`. Celui-ci importe entre autres la fonction `randint()`. Elle permet de choisir un nombre entier aléatoire compris entre deux bornes. Ces bornes doivent être écrites entre les parenthèses du `randint()` et sont séparées par une virgule. Ainsi, voici le programme complet du jeu du Devin.

```{code-block} python
from random import *
print("Je pense à un nombre entre 1 et 100")
nombre_mystere = randint(1, 100)
while nombre_du_joueur != nombre_mystere:
    nombre_du_joueur = int(input("À quel nombre est-ce que je pense ?"))
    if nombre_du_joueur > nombre_mystere:
        print("Le nombre est trop grand")
    elif nombre_du_joueur < nombre_mystere:
        print("Le nombre est trop petit")
    else:
        print("Félicitations ! Tu as trouvé le nombre mystère")
```

## Etude de cas : calcul d'une moyenne

Nous allons maintenant créer un programme dans lequel l'utilisateur pourra consécutivement entrer les notes qu'il a faites dans une branche afin que le programme lui calcule sa moyenne. Bien que nous connaissions déjà tous les concepts théoriques permettant de réaliser ce programme, celui-ci nous permettra de découvrir quelques astuces de développement qui vous seront utiles pour la suite.\ Pour commencer, il faut réfléchir à la manière dont on procède normalement pour calculer sa moyenne dans une branche. Typiquement, on commence par additionner toutes les notes que l'on a, puis, on divise ce total par le nombre de notes. C'est également ce que l'on va faire dans notre programme. Il nous faudra donc une variable détenant la somme des notes, ainsi qu'une variable détenant le nombre de notes. Comme l'utilisateur va donner ses notes au fur et à mesure, on ne connaît aucune de ces deux valeurs au début du programme. On va donc les initialiser à `0`.

```{code-block} python
somme_notes = 0
nb_notes = 0
```

À chaque fois que l'utilisateur entrera une note, on l'ajoutera à la variable `somme_notes`, et on incrémentera la variable `nb_notes` de `1`. La prochaine étape logique est donc de demander à l'utilisateur d'entrer des notes en boucle.

```{code-block} python
somme_notes = 0
nb_notes = 0
while ... :
    note = float(input("Entrez une note"))
```

Quelle devrait être la condition d'arrêt de cette boucle ? On aimerait en sortir lorsque l'utilisateur a terminé d'entrer toutes ses notes. Comme nous ne savons pas quand cela va se produire, il faut que l'utilisateur ait un moyen de nous le communiquer. Une idée est que si l'utilisateur n'entre pas une note valide (c'est-à-dire supérieure ou égale à 1 et inférieure ou égale à 6), alors on sort de la boucle et le programme se termine. Comme il s'agit d'une condition sur la variable `note`, il est également impératif de la créer avant le `while`, même si sa valeur initiale n'a pas vraiment d'importance. Nous pouvons donc ajouter cette nouvelle variable à notre programme avec une expression conditionnelle utilisant l'opérateur logique `and` pour contrôler les deux bornes d'une note valide.

```{code-block} python
somme_notes = 0
nb_notes = 0
note = 4
while note >= 1 and note <= 6 :
    note = float(input("Entrez une note. Entrez une note invalide pour terminer"))
```

Il faut maintenant mettre à jour les variables `somme_notes` et `nb_notes` en faisant attention à ne pas changer leur valeur lorsque la note entrée est invalide. Pour cela, on peut utiliser un branchement conditionnel avec un seul `if` contrôlant la validité de la note. Il ne reste alors plus qu'à afficher la moyenne, qui correspond à la division de `somme_notes` par `nb_notes`, à la fin du programme. Ainsi, le programme suivant est terminé et permet de facilement calculer une moyenne.

```{code-block} python
somme_notes = 0
nb_notes = 0
note = 4
while note >= 1 and note <= 6 :
    note = float(input("Entrez une note. Entrez une note invalide pour terminer"))
    if note >= 1 and note <= 6:
        somme_notes += note
        nb_notes += 1
print("Votre moyenne est de", somme_notes / nb_notes)
```

En programmation, on retrouve souvent des variables ayant un comportement similaire à `somme_notes` et `nb_notes`. On appelle `somme_notes` une variable *accumulateur*, puisqu'on y accumule constamment de nouvelles valeurs. `nb_notes` est appelé une variable *compteur*, puisqu'elle compte combien de fois une certaine action est effectuée. Retenez bien ces concepts, car ils vous seront souvent utiles ! Par exemple, quand vous développerez plus tard un petit jeu vidéo, vous aurez très probablement besoin d'un accumulateur pour stocker les points que le joueur marque au fur et à mesure de sa progression. De plus, un compteur pourrait vous être utile pour connaître le nombre d'ennemis éliminés une fois la partie terminée.

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
