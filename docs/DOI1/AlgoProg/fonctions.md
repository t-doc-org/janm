# Fonctions

## Qu'est-ce qu'une fonction ?
Dans un programme, certains blocs d'instructions doivent être réutilisés à plusieurs endroits. On peut par exemple imaginer une dizaine d'instructions permettant de vérifier qu'un mot de passe est suffisamment robuste (au moins 12 caractères, une majuscule, un caractère spécial, etc.). Ces instructions devront non seulement être utilisées lors de l'inscription d'un nouvel utilisateur, mais également lors du changement de mot de passe.

On pourrait simplement copier/coller ces dix lignes à ces deux endroits du programme. Dès lors, le programme pourrait être représenté avec le schéma ci-dessous, dans lequel les cases bleues représente le même code dupliqué à deux endroits différents.

```{image} images/func_copy_paste.png
:width: 25%
:alt: Schéma d'un programme
:align: center
```


Toutefois, recopier les mêmes instructions plusieurs fois vient avec des désavantages
 - Si le code doit être modifié, il faudra aller le changer partout où il a été copié/collé
 - Du point de vue d'un programmeur qui découvre le code,  il n'est pas clair au 1er coup d'oeil que ces lignes copiées/collées sont les mêmes et qu'elles doivent le rester
 - Pour ce même programmeur, l'utilité de ces lignes n'est non plus pas directement clair. Il devra lire ces lignes pour les analyser et les comprendre.


Pour pallier à ces problèmes, le code utilisé 2x ne doit pas être copié/collé, mais déplacé "en marge" du programme principale dans une **fonction**. Lorsque, dans notre programme, on souhaite utiliser ces instructions mises en marge, on ne fait alors qu'un appel à cette fonction. Le programme ressemblera dès lors à cela :

```{image} images/func_side.png
:width: 50%
:alt: Schéma d'un programme
:align: center
```

Avec cela, lorsqu'on modifie une fois le code à réutiliser, la modification impactera tous les appels de fonction. De plus, le nom de la fonction (ici `F`) devrait être significatif et nommer l'action effectuée par la fonction. Dans l'exemple de la vérification de sécurité du mot de passe, la fonction aurait pu avoir comme nom `vérifie_sécurité_mdp`. Ainsi, avec une fonction, le programme devient plus lisible et est plus facilement modifiable.

## Définir une fonction

Les fonctions se définissent en général dans un fichier distinct, ou, pour ce cours, au début du code. Le mot-clef permettant de définir une fonction est `def`. Celui-ci est suivi du nom de la fonction puis d'une paire de parenthèse (vide pour l'instant) et de deux-points. Les instructions indentées sous la définition constituent *corps* de la fonction, c'est-à-dire le bloc d'instructions à exécuter lorsque la fonction est appelée.

Dans l'exemple ci-dessous, on définit une fonction nommée `affiche_salutations` dont le corps affiche simplement 2 textes.

```{exec} python
:linenos:
def affiche_salutations():
    print("Bonjour")
    print("Comment allez-vous ?")
```

Lorsqu'on exécute ce code, rien ne se passe. En effet, ici la fonction `affiche_salutations` a été définie, mais **jamais appelée**. Pour appeler une fonction, on écrit simplement son nom suivi d'une paire de parenthèses. Dans l'exemple ci-dessous, la fonction est appelée 2x à différents endroits du programme

```{exec} python
:linenos:
def affiche_salutations():
    print("Bonjour")
    print("Comment allez-vous ?")

print("Début du programme")
affiche_salutations()
print("Pouvez-vous répéter svp, je n'ai pas compris")
affiche_salutations()
```

## Fonction avec paramètres
Les fonctions peuvent être *paramétrées*. C'est-à-dire que leur exécution va dépendre de valeurs qui seront précisées au moment de l'appel. Par exemple, une fonction `calcul_et_affiche_aire_triangle` doit pouvoir être par paramétrée par la base et la hauteur du triangle. Ces paramètres se placent entre les parenthèses de la définition de la fonction et sont séparés par une virgule. Ils peuvent ensuite être réutilisés dans le corps de la fonction.

```{exec} python
:linenos:
def calcul_et_affiche_aire_triangle(base, hauteur):
    aire = base * hauteur / 2
    print("L'aire d'un triangle de", base, "de base et", hauteur, "de hauteur est de", aire)
```

On peut maintenant appeler cette fonction en précisant obligatoirement les valeurs des paramètres entre les parenthèses.
```{exec} python
:linenos:
def calcul_et_affiche_aire_triangle(base, hauteur):
    aire = base * hauteur / 2
    print("L'aire d'un triangle de", base, "de base et", hauteur, "de hauteur est de", aire)

calcul_et_affiche_aire_triangle(10, 20)
calcul_et_affiche_aire_triangle(20, 10)
calcul_et_affiche_aire_triangle(35, 54)
```


## Utilisation de fonctions provenant de modules

### Module `math`
En Python, il est possible d'obtenir et d'utiliser des fonctions d'autres développeurs du monde entier en les important dans son code via des modules. Ce concept facilite grandement le développement, car, à la place de soi-même recoder des fonctions complexes, il est possible de prendre celles qui ont déjà été codées par des développeurs expérimentés.

Par exemple, de nombreuses fonctions permettant de faire des calculs mathématiques sont disponibles dans le module `math`. Dans celui-ci, on retrouve par exemple la fonction `sqrt` calculant la racine carrée. Avec la structure `from ... import ...` placée **1x** au début du code, il est possible d'importer cette fonction dans notre code.
```{exec} python
:linenos:
from math import sqrt

print("La racine carrée de 2 est", sqrt(2))
print("La racine carrée de 16 est", sqrt(16))
```

Le module `math` contient une grande quantité de fonctions que vous pouvez retrouver [ici](https://docs.python.org/3/library/math.html).

### Module `random`
Un autre module très pratique est `random`. Celui-ci contient de nombreuses fonctions permettant d'obtenir des valeurs aléatoires et ainsi d'introduire du hasard dans nos programme. En particulier, `randint` permet d'obtenir un entier aléatoire entre deux bornes données entre parenthèses. Observez et exécutez plusieurs fois le programme ci-dessous pour comprendre l'utilisation de `randint`.

```{exec} python
from random import randint

a = randint(0, 10)
b = randint(1000, 2000)
c = randint(-100, 100)
print("A :", a)
print("B :", b)
print("C :", c)
```



## Exercices

### Exercice {num1}`exercice`
Le code ci-dessous définit 3 fonctions. Il contient également un petit programme demandant à l'utilisateur son humeur de 1 à 10 (10 étant la meilleure humeur possible). Complétez le programme **uniquement en appelant les fonctions** adéquates.

```{exec} python
:editor: 0198c246-69e1-7971-8a36-58b4ba567824
def affiche_content():
    print("😊")

def affiche_neutre():
    print("😐")

def affiche_triste():
    print("😢")

humeur = int(input("De 1 à 10, comment vas-tu ?"))

if humeur < 3:

elif humeur < 6:

else:
```

````{solution}
```{exec} python
:linenos:
def affiche_content():
    print("😊")
def affiche_neutre():
    print("😐")
def affiche_triste():
    print("😢")

humeur = int(input("De 1 à 10, comment vas-tu ?"))

if humeur < 3:
    affiche_content()
elif humeur < 6:
    affiche_neutre()
else:
    affiche_triste()
```
````

### Exercice {num1}`exercice`
Le programme ci-dessous appelle 2 fonctions qui n'existent pas. Définissez les et complétez leur corps avec un texte approprié de manière que le programme fonctionne affiche :

```{code-block} text
Bombe amorcée
TIC
TAC
TIC
TAC
...
TIC
TAC
BOOOOOM
```

```{exec} python
:editor: 0198c25d-378e-7564-bd1f-f0e57f4c9b57
#Définissez vos fonctions ici

compteur = 10
print("Bombe amorcée !")
while compteur > 0:
    compteur -= 1
    tic_tac()
explosion()
```

````{solution}
```{exec} python
:linenos:
def tic_tac():
    print("TIC TAC")
def explosion():
    print("BOOM")

compteur = 10
print("Bombe amorcée !")
while compteur > 0:
    compteur -= 1
    tic_tac()
explosion()
```
````



### Exercice {num1}`exercice`
Définissez une fonction nommée `calcule_et_affiche_aire_cercle`, paramétrée par le rayon $r$ du cercle. L'aire peut être calculée par la formule $\pi \cdot r^2$. Utilisez la valeur `3.14` pour $\pi$. Appelez ensuite la fonction pour afficher l'aire de cercles de 3, 10 et 80 de rayon.

```{exec} python
:editor: 0198c266-96d0-7d6d-bb24-aec73a93ca8f
#Ecrivez votre code ici

```

````{solution}
```{exec} python
:linenos:
def calcule_et_affiche_aire_cercle(rayon):
    aire = 3.14 * rayon ** 2
    print("L'aire est de", aire)

calcule_et_affiche_aire_cercle(3)
calcule_et_affiche_aire_cercle(10)
calcule_et_affiche_aire_cercle(80)
```
````


### Exercice {num1}`exercice`
Définissez une fonction nommée `affiche_prévision_météo` paramétrée par une température (en °C) et une pression (en hPa). En fonction de ces deux paramètres, le corps de la fonction affichera différents texte :

- Si la température est supérieure à 25 et que la pression est supérieure à 1015 : `Grand ciel bleu`.

- Si la température est inférieure ou égale à 0 : `Froid glacial`.

- Si la pression est inférieure à 1000 ou que la température est supérieure à 30 : `Temps orageux`.

- Dans les autres cas : `Météo changeante`.

Appelez finalement cette fonction pour afficher les prévisions pour un température de 27°C une pression de 1011 hPa, puis pour 15°C et 990 hPa
```{exec} python
:editor: 0198c270-9e16-72e4-a5a6-66ce31774e75
#Ecrivez votre code ici

```

````{solution}
```{exec} python
:linenos:
def affiche_prévision_météo(temperature, pression):
    if temperature > 25 and pression > 1015:
        print("Grand ciel bleu")
    elif temperature <= 0:
        print("Froid glacial")
    elif pression < 1000 or temperature > 30:
        print("Temps orageux")
    else:
        print("Météo changeante")

affiche_prévision_météo(27, 1011)
affiche_prévision_météo(15, 990)
````

### Exercice {num1}`exercice`
La fonction `affiche_livret` définie ci-dessous permet d'afficher le livret de multiplication du nombre donné en paramètre. Sans toucher au corps de cette fonction, et en ne l'appelant qu'une seule fois, complétez le programme de manière à afficher tous les livrets de multiplication de 2 à 10.

```{exec} python
:editor: 0198c283-c568-7431-8382-38dd0494b66f
def affiche_livret(n):
    print("Affichage du livret de", n)
    i = 2
    while i <= 10:
        print(i, "x", n, "=", i*n)
        i += 1
    
#Complétez le programme ici
```

````{solution}
```{exec} python
:linenos:
def affiche_livret(n):
    print("Affichage du livret de", n)
    i = 2
    while i <= 10:
        print(i, "x", n, "=", i*n)
        i += 1
    
multiple = 2
while multiple <= 10:
    affiche_livret(multiple)
    multiple += 1
````

### Exercice {num1}`exercice`
Définissez une fonction `quiz` prenant en paramètre une question et sa réponse correcte pour compléter le programme ci-dessous. Le corps de la fonction doit poser cette question à l'utilisateur pour obtenir une réponse (avec la fonction `input`). Puis, cette réponse doit être vérifiée en la comparant à la réponse correcte donnée en paramètre. Si celle-ci est correcte, le texte `Correct` est affiché. Sinon, on affiche `Mauvaise réponse`.

```{exec} python
:editor: 0198c2d0-be13-7af7-a996-c6e576502300
#Définissez la fonction ici

quiz("Quel est le meilleur collège de Suisse ?", "STX")
quiz("Quelle est la capitale du Groenland ?", "Nuuk")
quiz("Qui a été élu président des USA en 2016 ?", "Trump")
```

````{solution}
```{exec} python
:linenos:
def quiz(question, reponse_correcte):
    reponse_utilisateur = input(question)
    if reponse_utilisateur == reponse_correcte:
        print("Correct")
    else:
        print("Mauvaise réponse")
    
quiz("Quel est le meilleur collège de Suisse ?", "STX")
quiz("Quelle est la capitale du Groenland ?", "Nuuk")
quiz("Qui a été élu président des USA en 2016 ?", "Trump")
````


### Exercice {num1}`exercice`
Complétez le programme ci-dessous de sorte qu'il demande à l'utilisateur un nombre, puis affiche sa racine carrée. Pour cela, commencez par importer la fonction `sqrt` du module `math`. Comme il est impossible de calculer la racine carrée d'un nombre négatif, le programme affichera `IMPOSSIBLE` si l'utilisateur entre un tel nombre. Deux exemples d'exécution sont donnés ci-dessous.
Exemples d'exécutions :


```{code-block} text
Entre un nombre : <--- [4]
La racine carrée de 4 est 2.0
>>>
Entre un nombre <--- [-1]
IMPOSSIBLE
```


```{exec} python
:editor: 687cf93e-55fc-46f7-9343-27c38cc5dbb6
from ... import ...
```

````{solution}
```{exec} python
:linenos:
from math import sqrt
x = float(input("Entre un nombre"))
if x >= 0:
    print("La racine carrée de", x, "est", sqrt(x))
else:
    print("IMPOSSIBLE")
````


### Exercice {num1}`exercice`
Grâce à Pythagore, il est possible de calculer l'hypothénuse d'un triangle rectangle avec la formule ci-dessous.

```{image} images/pythagore.jpg
:width: 40%
:alt: a^2 + b^2 = c^2
:align: center
```
En appliquant une racine carrée des deux côtés, on obtient que l'hypothénuse est obtenue à partie de $a$ et $b$ avec $\sqrt{a^2 + b^2}$.

1. Ecrivez un programme Python demandant à l'utilisateur les côtés $a$ et $b$ d'un triangle, puis affichant l'hypothénuse.
```{exec} python
:editor: f2182148-d96d-4545-a0c3-6061172e155a
#Ecrivez votre programme ici
```


2. Transformez ce programme qui demande 2 nombres à un utilisateur en une fonction `calcule_et_affiche_hyp` prenant en paramètre `a` et `b`. Ce programme ne contiendra **plus aucun input**. En revanche, un programmeur pourra par exemple utiliser `calcule_et_affiche_hyp(4, 10)` pour afficher l'hypothénuse d'un triangle avec $a=4$ et $b=10$.

```{exec} python
:editor: c5ddfd27-6f5e-4583-a056-2aad1af5a4f4
#Importez sqrt et définissez la fonction ici



#Programme principal à ne pas toucher
calcule_et_affiche_hyp(4, 10)
calcule_et_affiche_hyp(2.1, 9.3)
calcule_et_affiche_hyp(10, 2.5)
```

````{solution}
1.
```{exec} python
:linenos:
from math import sqrt

a = float(input("Quelle est la valeur de a ?"))
b = float(input("Quelle est la valeur de b ?"))
c = sqrt(a ** 2 + b ** 2)
print("L'hypoténuse vaut :", c)
```

2.
```{exec} python
:linenos:
from math import sqrt

def calcule_et_affiche_hyp(a, b):
    print("L'hypoténuse vaut :", sqrt(a**2 + b**2))

# Programme principal
calcule_et_affiche_hyp(4, 10)
calcule_et_affiche_hyp(2.1, 9.3)
calcule_et_affiche_hyp(10, 2.5)
```
````

### Exercice {num1}`exercice`
Complétez le programme ci-dessous de sorte qu'il affiche une année du 20ème siècle au hasard.

```{exec} python
:editor: 42ee1dbc-81a6-489a-a9f4-7e5429c4a28c
from random import randint
annee_20_eme_siecle =
print(annee_20_eme_siecle)
```

````{solution}
```{exec} python
:linenos:
from random import randint
annee_20_eme_siecle = randint(1900, 1999)
print(annee_20_eme_siecle)
````

### Exercice {num1}`exercice`
Dans le jeu du Devin, un nombre mystère est tiré au hasard entre 1 et 100. Puis, le joueur doit essayer de deviner ce nombre. A chaque tentative infructueuse, le programme affiche `Trop bas` ou `Trop haut` afin de guider le joueur vers la bonne réponse. Quand le nombre mystère est finalement deviné, le programme affiche `Bravo ! Tu as trouvé le nombre mystère en x essais`, où `x` est remplacé le nombre de tentative du joueur.

Ecrivez un programme permettant de joueur à ce jeu ci-dessous.
```{exec} python
:editor: b62084b2-8ade-44a9-b5af-42eec254fc0a
from random import randint

#Complétez le programme à partir de là

```

````{solution}
```{exec} python
:linenos:
from random import randint
nb_mystere = randint(1, 100)
tentative = int(input("Devine le nombre entre 1 et 100"))
nb_tentatives = 1
while tentative != nb_mystere:
    if tentative > nb_mystere:
        print("Trop haut !")
    else:
        print("Trop bas !")
    tentative = int(input("Réessaie !"))
    nb_tentatives += 1
print("Bravo ! Tu as trouvé le nombre mystère en", nb_tentatives, "tentatives.")
````
