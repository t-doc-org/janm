# Fonctions

## Qu'est-ce qu'une fonction ?

Nous avons déjà mentionné plusieurs fois le mot *fonction* dans ce cours, notamment avec `print()` et `input()`, mais aussi avec `int()`, `float()`, `sqrt()`, et `randint()`. De notre point de vue, nous avons utilisé ces fonctions comme des sortes de boîtes noires dans lesquelles nous avons envoyé une valeur (entre les parenthèses) pour, parfois, en recevoir une autre en retour. La figure suivante schématise ce qu'il se passe lorsque l'on exécute le code ci-dessous.

``` {code-block} python
:caption: Utilisation des fonctions sqrt() et int()
from math import *
x = sqrt(100)
y = int("100")
```

![image](images/func.png)

Nous ne savons en effet pas vraiment quelles opérations sont exécutées lorsque l'on fait appel à ces fonctions. Tout ce que l'on sait, c'est que l'on donne une certaine valeur à `sqrt()` et que celle-ci nous retourne sa racine carrée. De même pour `int()`, à laquelle on donne une certaine valeur et qui nous la retourne convertie en nombre entier. Derrière ces fonctions se cachent pourtant de nombreuses lignes de code écrites par d'autres programmeur.euses permettant de réaliser ces opérations. Toutefois, il est bien plus pratique et lisible de simplement écrire `sqrt()` ou `int()` que de recopier un algorithme complexe à chaque fois que l'on veut effectuer une racine carrée ou une conversion en nombre entier.\ Cela constitue l'intérêt principal des fonctions et on peut ainsi en utiliser de nombreuses provenant directement de Python ou de modules que l'on télécharge et importe dans notre programme. Dans ce chapitre, nous allons voir comment vous pouvez vous-même créer vos propres fonctions.

## Définir une fonction

Comme première fonction, nous allons simplement en créer une nommée `saluer()`, ne prenant rien entre ses parenthèses, et permettant d'afficher des textes de salutation. Pour définir une fonction, il faut utiliser le mot-clef `def` et le faire suivre du nom qu'on souhaite lui donner ainsi que d'une paire de parenthèses. Comme souvent en Python, cette ligne doit se terminer par deux-points. Finalement, le bloc d'instructions à exécuter lorsque l'on appelle la fonction, nommé *corps* de la fonction, est indenté en dessous de la ligne de définition. Ainsi, la fonction `saluer()` peut-être définie de la manière suivante :

``` {code-block} python
:caption: Définition d'une fonction saluer()
def saluer():
    print("Bonjour")
    print("Comment allez-vous ?")
```

Que se passe-t-il lorsque vous exécutez ce programme ? Pour le moment, absolument rien. En effet, celui-ci permet uniquement de *définir* ce que fait la fonction `saluer()`. Si on veut afficher le texte de salutation, il faut alors utiliser cette fonction. Cela est très simple, il suffit d'écrire le nom de la fonction suivi d'une paire de parenthèse. Ainsi, le programme suivant permet d'afficher trois fois les messages de salutation.

``` {code-block} python
:caption: Définition et utilisation de la fonction saluer()
def saluer():
    print("Bonjour")
    print("Comment allez-vous ?")
saluer()
saluer()
saluer()
```

## Définir une fonction avec paramètres

Les fonctions que nous avons utilisées dans les précédents chapitres prenaient toutes au moins une valeur entre leurs parenthèses. On appelle ces valeurs des *paramètres*. Ainsi, on pourrait ajouter un paramètre à notre fonction, de manière que l'on puisse ensuite écrire par exemple `saluer("Maxime")` ou `saluer("Caroline")` de manière que cette fonction salue à chaque fois un prénom différent.\ Pour ce faire, on doit indiquer au moment de définir la fonction que celle-ci attend un paramètre. Sur la ligne du `def`, on doit alors mettre le nom que l'on veut donner au paramètre entre la paire de parenthèses. Un paramètre est en fait une variable, à la différence que celle-ci tient sa valeur de l'appel à la fonction, et qu'elle n'est utilisable que dans le corps de celle-ci. Le programme devient donc comme suit pour afficher trois messages de salutation personnalisés.

``` {code-block} python
:caption: Définition et utilisation d'une fonction paramétrée saluer()
def saluer(prenom):
    print("Bonjour", prenom)
    print("Comment allez-vous ?")
saluer("Maxime")
saluer("Caroline")
saluer("Iliya")
```

Au début du programme, la ligne `saluer("Maxime")` est exécutée. L'exécution saute alors à la ligne de définition de cette fonction et la valeur`"Maxime"` est attribuée à la variable `prenom`. L'exécution du corps de la fonction peut ensuite commencer, et le premier message affiché sera bien `Bonjour Maxime`. Quand cette fonction est terminée, l'exécution saute cette fois à la ligne `salut("Caroline")`, qui la ramène immédiatement à la ligne de la définition de `saluer()` pour attribuer la valeur `"Caroline"` à `prenom`. Ainsi de suite, le paramètre prend différentes valeurs, et la fonction est exécutée en fonction de cette valeur.\ Il est également possible de définir une fonction avec plusieurs paramètres. Dans ce cas, les noms des différents paramètres doivent être séparés par des virgules entre les parenthèses de la ligne de définition. Lors de l'utilisation de la fonction, les valeurs doivent également être séparées par des virgules et celles-ci sont attribuées aux paramètres dans le même ordre. Dans le programme suivant, la fonction `quiz()` permet de poser une question à l'utilisateur, et de contrôler si sa réponse (un nombre) est correcte ou non. Il devient alors facile de créer un quiz en utilisant la fonction `quiz()` et en lui donnant la question comme premier argument, et la bonne réponse comme deuxième argument.

``` {code-block} python
:caption: Définition et utilisation d'une fonction quiz() avec plusieurs paramètres
def quiz(question, bonne_reponse):
    reponse_joueur = int(input(question))
    if bonne_reponse == reponse_joueur:
        print("Bonne réponse")
    else:
        print("Mauvaise réponse")
quiz("Combien il y a-t-il de cantons en Suisse ?", 26)
quiz("En quelle année Donald Trump est-il devenu président des USA ?", 2016)
quiz("Quel est le résultat de 2*(5+4)", 18)
```
