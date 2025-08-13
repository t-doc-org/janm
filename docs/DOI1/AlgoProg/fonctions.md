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

## Définir une fonction

## Définir une fonction avec paramètres


## Définir une fonction avec valeur de retour


## Exercices

### Exercice 1
Définissez une fonction nommée `affiche_sourire` qui affiche simplement `:)` lorsqu'elle est appelée. Appelez une fois votre fonction pour vérifier votre solution.

````{admonition} Solution
:class: note dropdown
``` {code-block} python
def affiche_sourire():
    print(":)")
affiche_sourire()
```
````

### Exercice 2
1. Définissez une fonction nommée `affiche_emoji` prenant un paramètre `niveau_humeur` qui est une valeur numérique entre 0 (très mauvaise humeur) et 10 (excellente humeur). Si la valeur de ce paramètre est inférieur à 3, la fonction affichera l'émoji `:(`, si la valeur est supérieur à 7, elle affichera `:)`. Sinon, elle affichera `:|`. 

2. Ajoutez le code suivant à votre programme afin d'utiliser la fonction.

```{code-block} python
humeur = float(input("Sur 10, quel est ton niveau d'humeur ?"))
affiche_emoji(humeur)
```

````{admonition} Solution
:class: note dropdown
```{code-block} python
def affiche_emoji(niveau_humeur):
    if niveau_humeur < 3:
        print(":(")
    elif niveau_humeur > 7:
        print(":)")
    else:
        print(":|")
humeur = float(input("Sur 10, quel est ton niveau d'humeur ?"))
affiche_emoji(humeur)
```

````

<!--- ### Exercice 3
Donnez l'affichage du programme suivant et créez son tableau d'état.

``` {code-block} python
def mystery_1(z): z += 1 print(z) def mystery_2(x): x *= 2 if x >= 0:
mystery_1(x + 2) else: mystery_1(x)

y = 5 mystery_1(y) mystery_2(y) mystery_2(y - 10) print(y)
```
```

``` Answer
Affichage avec un retour à la ligne plutôt qu'un espace entre chaque
nombre : `6 13 -9 5`\
Tableau d'état :

   **x**   **y**   **z**
  ------- ------- -------
             5    
             5       5
             5       6
     5       5    
    10       5    
    10       5      12
    10       5      13
             5    
    -5       5    
    -10      5    
    -10      5      -10
    -10      5      -9
             5    
``` --->

### Exercice 3
Écrivez une fonction nommée `salutations()` prenant 2 paramètres. Le premier est un prénom et le deuxième un âge. Dans le cas où cet âge est plus petit que 18, la fonction affichera `"Salut"` suivi du prénom. Dans le cas contraire, la fonction affichera `"Bonjour"` suivi du prénom. Après avoir défini cette fonction, les appels suivants devraient afficher `""Bonjour Maxime"` et `""Salut Axel"`.

``` {code-block} python
salutations("Maxime", 26)
salutations("Axel", 16)
```

````{admonition} Solution
:class: note dropdown
``` {code-block} python
def salutations(prenom, age):
    if age < 18:
        print("Salut", prenom)
    else:
        print("Bonjour", prenom)
salutations("Maxime", 26)
salutations("Axel", 16)
```
````

### Exercice 4
Écrivez une fonction nommée `compte_a_rebours` prenant un paramètre nommé `maximum`. Un appel à la fonction affichera alors un compte à rebours jusqu'à 0 en partant du maximum. Ainsi, un appel à `compte_a_rebours(400)` affichera :

```{code-block} text
400
399
398
...
2
1
0
BOOM
```

````{admonition} Solution
:class: note dropdown
``` {code-block} python
def afficher_compte_a_rebours(maximum):
    while maximum >= 0:
        print(maximum)
        maximum -= 1
    print("BOOM")
afficher_compte_a_rebours(400)
afficher_compte_a_rebours(1000)
```
````

### Exercice 5
La fonction ci-dessous permet simplement d'additionner 2 nombres. Complétez ce programme de manière à ce que la somme des 5 variables soit affichée. Vous n'avez **pas le droit** d'utiliser vous-même l'opérateur +, uniquement la fonction `addi()`.

``` {code-block} python
def addi(x, y):
    somme = x + y
    return somme
a = 10
b = 2.1
c = 8
d = 78.14
e = 29
print("a+b+c+d+e vaut", )
```

````{admonition} Solution
:class: note dropdown
``` {code-block} python
def addi(x, y):
    somme = x + y
    return somme
a = 10
b = 2.1
c = 8
d = 78.14
e = 29
print("a+b+c+d+e vaut", addi(addi( addi(a, b), addi(c, d)), e) )
```
````

### Exercice 6
Définissez une fonction nommée `aire_rectangle()` prenant en entrée une longueur et une largeur et retournant l'aire du rectangle décrit par ces valeurs. Utilisez ensuite cette fonction pour afficher l'aire totale de deux rectangles de 65x71cm et de 7x70cm.

````{admonition} Solution
:class: note dropdown
``` {code-block} python
def aire_rectangle(largeur, longeur):
    aire = largeur * longueur
    return aire
print(aire_rectangle(65, 71) + aire_rectangle(7, 70))
```
````

### Exercice 7
Lisez attentivement le programme suivant et décrivez brièvement son fonctionnement. Expliquez ensuite l'intérêt d'avoir défini la fonction `montant_est_valide`.

``` {code-block} python
def montant_est_valide(note):
    if montant > 0 and montant <= 1000000:
        return True
    else:
        return False

montant = 1
banque = 0
while montant_est_valide(montant):
    montant = float(input("Quel montant souhaitez-vous créditer ?"))
    if montant_est_valide(montant):
        banque += montant

print("Vous avez maintenant ", banque, " CHF en banque")
```

````{admonition} Solution
:class: note dropdown
Dans ce programme, l'utilisateur peut petit à petit ajouter de l'argent à son compte en banque. Cet ajout se termine lorsque le montant donné n'est plus valide :(c'est-à-dire qu'il est négatif ou supérieur à 1000000). A ce moment, le programme affiche le montant total qui a été crédité en banque. L'avantage d'avoir défini une fonction `montant_est_valide(montant)` est double :

1.  Le programme est plus court et surtout beaucoup plus lisible et plus facile à comprendre. En effet, il est plus simple de comprendre la ligne
    `while montant_est_valide(montant)` que
    `while montant > 0 and montant <= 1000000`

2.  Comme l'opération de contrôle de montant doit être effectuée 2 fois, la fonction permet de définir la logique une seule fois et de la réutiliser autant que l'on le veut. Ainsi, si le montant maximal passe de 1000000 à 999, il suffit alors de modifier la ligne de condition dans la fonction. Sans fonction, il aurait fallu modifier ce nombre deux fois, ce qui engendre souvent des oublis et des bugs.
````

### Exercice 8
Écrivez une fonction nommée `conversion_en_secondes()` prenant en paramètre des heures, des minutes, et des secondes et retournant l'équivalent en secondes. Utilisez ensuite cette fonction pour calculer la différence en secondes entre 10h55m32s et 8h33m51s

````{admonition} Solution
:class: note dropdown
``` {code-block} python
def conversion_en_secondes(heures, minutes, secondes):
    return heures * 3600 + minutes * 60 + secondes

secondes1 = conversion_en_secondes(10, 55, 32)
secondes2 = conversion_en_secondes(8, 33, 51)
print(secondes1 - secondes2)
```
````
