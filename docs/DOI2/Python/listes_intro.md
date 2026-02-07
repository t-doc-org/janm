<!-- Copyright 2024 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
exec:
  python:
    files:
      pizzeria.sql:
    packages: [sqlite3]
```

# Listes - Notions de base

## Lecture d'une base de données en Python
Une base de données est particulièrement utile quand elle connectée à une application. Avec Python, cela est par exemple possible grâce au module `sqlite3`. Sur cette page, ce module a déjà été chargé. De plus, la base de données de l'application de commande d'une pizzeria a été créée. Son schéma relationnel est donné ci-dessous.
```{image} images/pizzeria.png
:width: 75%
:alt: Schéma pizzeria
:align: center
```


```{exec} python
:name: pizzeria
:when: load
:class: hidden

import pathlib
import sqlite3

path = pathlib.Path('database.sqlite')
exists = path.exists()
db = sqlite3.connect(path)
if not exists:
  db.executescript(pathlib.Path('pizzeria.sql').read_text())

def execute_sql(request):
    results = db.execute(request).fetchall()
    if results == None or results == [] :
        return
    if len(results[0]) == 1:
        return [x[0] for x in results]
    return results
```



On peut dès lors utiliser la fonction `execute_sql()` prenant en paramètre la requête SQL que l'on souhaite exécuter sur cette base de données. On peut récupérer le résultat de cette requête en faisant précéder la fonction d'une variable (de manière analogue à un `input()`).

Ainsi, le code ci-dessous permet de récupérer tous les noms de pizzas, et de les stocker dans la variable `noms` avant de les afficher.

```{exec} python
:after: pizzeria

noms = execute_sql('select nom from Pizza')
print(noms)
```

De manière similaire, en modifiant la requête SQL, on pourrait récupérer et afficher tous les prix des pizzas :
```{exec} python
:after: pizzeria

résultats = execute_sql('select prix from Pizza')
print("Prix des pizzas : ", résultats)
```
Evidemment, les requêtes SQL peuvent contenir toutes les instructions vues dans le précédent chapitre, comme, par exemple, des `WHERE` :
```{exec} python
:after: pizzeria

cheap_pizzas = execute_sql('select nom from Pizza WHERE prix <= 15')
print("Les pizzas les moins chères sont :", cheap_pizzas)
```

## Qu'est-ce qu'une liste ?
Comme vous pouvez le constater dans les exemples ci-dessus, le code Python contient à chaque fois une seule variable (`noms`, `résultats`, `cheap_pizzas`). Cependant, lorsqu'on affiche cette variable, de nombreuses valeures sont affichées. C'est parce que ces variables sont des **listes**. 

Là où une variable de type `int`, `float`, `str`, ou `bool` ne pouvait contenir qu'une seule valeur, une `list` peut en contenir plusieurs. Celles-ci sont très pratiques quand un programme contient une grande quantité de données, afin de toutes les enregistrer dans une seule variable.

Les listes précédentes ont été créées via la base de données, mais il est également possible de les créer sois-même. Une liste est entourée de crochets `[]` et les valeurs sont séparées par des virgules `,`.
```{exec} python
panier = ["Poires", "Champignons", "Raviolis", "Pêches"]
print("Dans le panier il y a :", panier)
```
```{exec} python
notes_math = [3.5, 4.8, 5.7, 4.1, 4.5, 5, 3.8, 5.9, 3.2, 4.4, 6]
print("Mes notes en math sont :", notes_math)
```

```{tip}
Pour écrire des crochets sur :
 - Windows : `[` {kbd}`AltGr`+ {kbd}`è` ou `]` {kbd}`AltGr`+ {kbd}`!`

 - Mac : `[` {kbd}`Option`+ {kbd}`5` ou `]` {kbd}`Option`+ {kbd}`6`
```



## Indexation
L'indexation permet d'accéder à **un élément précis** d'une liste. Pour ce faire, on peut faire suivre une liste d'une paire de crochets `[]` entre lesquelles on écrit l'index de l'élément souhaité. L'index correspond à la *position* de l'élément dans la liste, sachant que le premier élément à l'index `0`, le deuxième l'index `1`, etc. 


```{exec} python
:after: pizzeria

utilisateurs = execute_sql("SELECT nom FROM Utilisateur")

print("Liste complète :", utilisateurs)
print("Premier utilisateur", utilisateurs[0])
print("5ème utilisateur :", utilisateurs[4])
```

Avec l'exemple suivant, on peut sélectionné n'importe quel utilisateur grâce à son index.
```{exec} python
:after: pizzeria
utilisateurs = execute_sql("SELECT nom FROM Utilisateur")

index = int(input("Quel index sélectionnes-tu ?"))
utilisateur_sélectionné = utilisateurs[index]
print("Tu as sélectionné :", utilisateur_sélectionné)
```

```{important}
 - Le premier élément d'une liste est toujours à l'**index 0**.
 - Dans une liste de n éléments, le dernier élément sera à l'**index n-1**.
```

## Fonctions sur les listes
En Python, il existe de nombreuses fonctions très pratiques pouvant être utilisées sur les listes. En voici quelques unes qui seront utiles dans le cadre de ce cours.

 - `len(ma_liste)` : retourne le nombre (=la longueur) d'éléments dans `ma_liste`
    ```{exec} python
    lettres = ["S", "A", "L", "U", "T"]
    print(len(lettres))
    ```

 - `ma_liste.append(element)` : ajoute un élément à la fin de `ma_liste`
    ```{exec} python
    outils = ["tournevis", "vis", "vis", "vis", "clous", "marteau"]
    outils.append("scie")
    outils.append("hache")
    print(outils)
    ```

 - `ma_liste.remove(element)` : retire **1x** l'élément à `ma_liste`
    ```{exec} python
    outils = ["tournevis", "vis", "vis", "vis", "clous", "marteau"]
    outils.remove("clous")
    outils.remove("vis")
    print(outils)
    ```


## Exercices
### Exercice {num1}`exercice-listes`
Chacun des programmes suivant comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique.
1.  ```{exec} python
    :editor: 019a6a67-3215-7ea8-81b7-8237c8056c7c
    couleurs_arc_en_ciel = "rouge" "orange" "jaune" "vert" "bleu" "indigo" "violet"
    print(couleurs_arc_en_ciel)
    ```

2.  ```{exec} python
    :editor: 019a6a6a-afb3-7bac-949a-a668c6385777
    profs_d_informatique = [Canvel, Marro, Dutoit, Blank, Lehmann, Jan]
    print(profs_d_informatique)
    ```
3.  ```{exec} python
    :editor: 019a6a6d-7624-7ad2-b4b0-0568806366e4
    ordre_d_arrivée = ["Isaac", "Victor", "Pascal", "Lucien", "Bruno", "Aurélien"]
    print("Gagnant de la course :", ordre_d_arrivée[1])
    ```


4.  ```{exec} python
    :editor: 019a6a6d-87b1-7592-a4c3-90147e45aea9
    :after: pizzeria

    pizzas = execute_sql("SELECT nom FROM Pizza")

    n_pizzas = pizzas.len()
    print("Il y a", n_pizzas, "pizzas différentes")
    ```


5.  ```{exec} python
    :editor: 019a6a6d-9708-7c24-86a0-6573105e2a2c
    sac = [] #Définit une liste vide
    objet = input("Quel objet veux-tu mettre dans ton sac ?")
    while objet != "STOP":
        append(sac.objet)
        objet = input("Quel autre objet veux-tu mettre dans ton sac ?")
    print("Contenu du sac", sac)
    ```

6.  ```{exec} python
    :editor: 019a6a6d-a2f9-7d9b-8aa4-829fdc0378f4
    #Retire tous les 0 de la liste
    bits = [1, 0, 1, 1, 0, 1, 0] #Ne pas toucher à cette ligne
    bits.remove(0)
    print(bits)
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    couleurs_arc_en_ciel = ["rouge", "orange", "jaune", "vert", "bleu", "indigo", "violet"]
    print(couleurs_arc_en_ciel)
    ```

2.  ```{exec} python
    :linenos:
    profs_d_informatique = ["Canvel", "Marro", "Dutoit", "Blank", "Lehmann", "Jan"]
    print(profs_d_informatique)
    ```

3.  ```{exec} python
    :linenos:
    #La 1ère personne est la 1ère arrivée à la fin de la course
    ordre_d_arrivée = ["Isaac", "Victor", "Pascal", "Lucien", "Bruno", "Aurélien"]
    print("Gagnant de la course :", ordre_d_arrivée[0])
    ```


4.  ```{exec} python
    :linenos:
    :after: pizzeria

    pizzas = execute_sql("SELECT nom FROM Pizza")
    
    n_pizzas = len(pizzas)
    print("Il y a", n_pizzas, "pizzas différentes")
    ```

5.  ```{exec} python
    :linenos:
    sac = [] #Définit une liste vide
    objet = input("Quel objet veux-tu mettre dans ton sac ?")
    while objet != "STOP":
        sac.append(objet)
        objet = input("Quel autre objet veux-tu mettre dans ton sac ?")
    print("Contenu du sac", sac)
    ```

6.  ```{exec} python
    :linenos:
    #Retire tous les 0 de la liste
    bits = [1, 0, 1, 1, 0, 1, 0] #Ne pas toucher à cette ligne
    bits.remove(0)
    bits.remove(0)
    bits.remove(0)
    print(bits)
    ```
````

### Exercice {num1}`exercice-listes`
 1. Ecrivez un programme qui recherche toutes les adresses emails des utilisateurs de l'application de la pizzeria, les stocke dans une variables `emails`, puis les affiche.
```{exec} python
    :editor: 019a6a81-5b11-7669-9fd0-7aa50dc31aee
    :after: pizzeria

```

2. Ecrivez un programme qui recherche tous les numéros de téléphone commençant par `078` puis les affiche.
```{exec} python
    :editor: 019a6aa8-f179-7dd0-accb-a80c81275124
    :after: pizzeria

```

````{solution}
1. 
```{exec} python
:linenos:
emails = execute_sql("SELECT email FROM Utilisateur")
print("Emails :", emails)
```

2.
```{exec} python

:linenos:
tel = execute_sql("SELECT telephone1 FROM Utilisateur WHERE telephone LIKE '078%'")
print("n° de téléphone commençant par 078 :", tel)
```

````

### Exercice {num1}`exercice-listes`
Complétez le programme suivant en utilisant l'indexation de manière à ce que le
programme affiche le texte suivant:

```{code-block} text
rouge
noir
brun
bleu
```

```{exec} python
:editor: 5487e3b6-2af5-48fc-82d6-29ccd2600828
couleurs = ["noir", "blanc", "brun", "gris", "rouge", "jaune", "bleu"]

#Complétez les index corrects
print(couleurs[...])
print(couleurs[...])
print(couleurs[...])
print(couleurs[...])
```

````{solution}
```{exec} python
:linenos:
couleurs = ["noir", "blanc", "brun", "gris", "rouge", "jaune", "bleu"]
print(couleurs[4])
print(couleurs[0])
print(couleurs[2])
print(couleurs[6])
```
````


### Exercice {num1}`exercice-listes`
Le programme ci-dessous recherche tous les prix des pizzas et, avec le `ORDER BY`, les trie du plus petit au plus grand. Complétez ce programme de manière qu'il affiche uniquement le prix le plus bas et le plus élevée. Souvenez-vous que :

 - Le 1er élément d'une liste est toujours à l'index 0
 - Le dernier élément d'une liste de longueur n est à l'index n-1
 - La longueur d'une liste est donnée avec la fonction `len()`

```{exec} python
:editor: 019a6a8f-c799-770f-9168-3df90e739050
:after: pizzeria
prix = execute_sql("SELECT prix FROM Pizza ORDER BY prix ASC")

print("Prix le plus bas :")
print("Prix le plus haut:")
```

### Exercice {num1}`exercice-listes`

1.  Créez une liste, nommée `sports` avec les éléments suivants: `kayak`,
    `escrime` et `escalade`.
2.  Affichez la liste et son nombre d'éléments.
3.  Demandez un sport à l'utilisateur et ajoutez-le à la liste `sports`.
4.  Afficher la liste et son nombre d'éléments.
5.  Effacez l'élément `escalade`.
6.  Affichez la liste et son nombre d'éléments.

```{exec} python
:editor: 019a6ab8-e2eb-7e6b-8059-a807dc944f8b
# Écrivez le programme ici
```

````{solution}

```{exec} python
:linenos:
sports = ["kayak", "escrime", "escalade"]
print(sports, len(sports))
sport = input("Entrer un sport: ")
sports.append(sport)
print(sports, len(sports))
sports.remove("escalade")
print(sports, len(sports))
```
````


### Exercice {num1}`exercice-listes`
Dans la base de données de la pizzeria, la colonne *description* de la table *Pizza* contient les ingrédients. Le programme ci-dessous doit alors permettre de sélectionner toutes les descriptions possédant respectivement l'ingrédient `jambon` et `champignon`, puis d'afficher leur nombre. Finalement, le programme affichera quel ingrédient est le plus utilisé.

Complétez le programme ci-dessous de manière qu'il fonctionne correctement.
```{exec} python
:editor: 019a6aad-5c8b-7006-9ef5-f0c2e1ef5942
:after: pizzeria
pizza_avec_jambon = execute_sql("SELECT nom FROM Pizza WHERE description ...")
pizza_avec_champignons = execute_sql("SELECT nom FROM Pizza WHERE description ...")

print("Nombre de pizzas avec du jambon :", ...)
print("Nombre de pizzas avec des champignons :", ...)

if ... :
    print("Il y a plus de pizzas avec champignons")
else:
    print("Il y a plus de pizzas avec du jambon")
```






### Exercice {num1}`exercice-listes`
Dans l'application de la pizzeria, on souhaite ajouter une fonctionnalité permettant aux utilisateurs de composer leur propre pizza avec les ingrédients de leur choix. Ainsi, le programme ci-dessous doit continuellement demander à l'utilisateur un ingrédient à rajouter, jusqu'à ce qu'il écrive "STOP". 

Un exemple d'exécution pourrait être le suivant :
```{code-block} text
Quel ingrédient voulez-vous ajouter ? <--- [ananas]
Quel ingrédient voulez-vous ajouter ? <--- [jambon]
Quel ingrédient voulez-vous ajouter ? <--- [ananas]
Quel ingrédient voulez-vous ajouter ? <--- [ananas]
Quel ingrédient voulez-vous ajouter ? <--- [STOP]
Votre pizza sera faite de : ['sauce tomate', 'mozzarella', 'ananas', 'jambon', 'ananas', 'ananas']
```

L'algorithme de ce programme est le suivant
```{code-block} text
Définir une liste contenant les ingrédients de base d'une pizza (sauce tomate et mozzarella)
Demander à l'utilisateur un nouvel ingrédient à ajouter et le stocker dans la variable choix
Tant que choix est différent de "STOP"
    Ajouter le choix à la liste des ingrédients
    Redemander un ingrédient à ajouter et le stocker dans la variable choix
Afficher la liste des ingrédients finale
```

Ecrivez ce programme au complet ci-dessous
```{exec} python
:editor: 019a6aa3-f3c2-7cb1-8e50-2168f735c246
#Ecrivez votre code ici
```

````{solution}
Ecrivez ce programme au complet ci-dessous
```{exec} python
ingredients = ["sauce tomate", "mozzarella"]
ingredient = input("Quel ingredient veux-tu ajouter ?")
while ingredient != "STOP":
    ingredients.append(ingredient)
    ingredient = input("Quel ingredient veux-tu ajouter ?")
print("Liste d'ingrédients finale :", ingredients)
```

````