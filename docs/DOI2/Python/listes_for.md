<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
exec:
  python:
    files:
      pizzeria.sql:
    packages: [sqlite3]
```

# Listes - Boucle for
Sur cette page, il est également possible d'utiliser Python avec la base de données de la pizzeria dont le schéma relationnel est donné ci-dessous.

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
        return []
    if len(results[0]) == 1:
        return [x[0] for x in results]
    return results
```



## Parcourir chaque élément d'une liste
Quand on traite les éléments d'une liste, il est courant de vouloir exécuter la même opération **pour chacun** de ses éléments. Par exemple, si l'on récupère la liste de tous les noms d'utilisateur de notre plateforme, on pourrait vouloir écrire un message personnalisé **pour chaque** personne dans cette liste. En français, l'algorithme serait le suivant :

```{code-block} text
Récupérer la liste des noms d'utilisateurs dans la liste *noms*
Pour chaque nom dans la liste *noms*:
    Afficher "Bonjour" suivi du nom
```
En Python, l'instruction *Pour chaque ... dans ...* se traduit avec les mots-clefs `for ... in ...` comme dans l'exemple ci-dessous.

```{exec} python
:after: pizzeria

noms = execute_sql("SELECT nom FROM Utilisateur")
print(noms)

#Pour chaque nom dans la liste des noms
for nom in noms:
    print("Bonjour", nom)
```

Avec la boucle `for ... in ...`, les instructions indentées en dessous sont exécutées en boucle les unes après les autres pour chaque élément de la liste. La nouvelle variable définie après le `for` prend tour à tour la valeur de chaque élément de la liste placée après le `in`.

Ce concept s'illustre dans l'exemple ci-dessous où une liste de notes est définie, puis où le programme compte le nombre de notes insuffisantes.

```{exec} python
notes = [4.5, 5.75, 3.5, 4.25, 3, 5, 3.75, 4.5]
nb_insuffisantes = 0

#Pour chaque note dans la liste des notes
for note in notes:
    if note < 4:
        print(note, ": Tu peux faire mieux !")
        nb_insuffisantes = nb_insuffisantes + 1
    else:
        print(note, ": Bravo !")

print("Au total il y a", nb_insuffisantes, "notes insuffisantes")
```


Comme dernier exemple, lisez attentivement le programme ci-dessous. Celui-ci permet de calculer la quantité de pizzas "Margherita" commandées.

```{exec} python
:after: pizzeria

nb_marga = execute_sql("SELECT quantite FROM Pizza JOIN Commande ON Commande.id_pizza = Pizza.id_pizza WHERE nom = 'Margherita'")
print("Quantités commandées :", nb_marga)

total = 0

#Pour chaque quantité dans la liste des quantités
for n in nb_marga:
    total += n

print(total, "pizza Margherita ont été commandées au total")
```


## Exercices

### Exercice {num1}`exercice-listes`
Chacun des programmes suivant comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique.
1.  ```{exec} python
    :editor: 3a57b4f1-345c-4d8c-8d22-3e6e61e40698
    #Affiche la liste des tâches à faire avec le texte TODO avant chaque tâche
    todo = ["Réviser math", "Devoir de français", "Apprendre Scedryk par coeur"]
    for tâche in todo:
        print("TODO :", todo)
    ```

2.  ```{exec} python
    :editor: 59f23471-e484-4cd5-823b-51f5d54133df
    #Affiche et numérote la liste des sources pour un travail
    sources = ["wikipedia.org", "universalis.fr", "cnrtl.fr", "rts.ch"]

    num_source = 0

    for source in sources:
        print(num_source, ":", source)
    
    print("Au total il y a", num_source, "sources")
    ```
3.  ```{exec} python
    :editor: c7f3e429-0171-47e0-ada8-b184f65d4a5f
    :after: pizzeria
    #Calcule le prix total de toutes les pizzas avec champignons
    prix = execute_sql("SELECT prix FROM Pizza WHERE description LIKE '%champignons%'")

    total = 0

    for prix:
        total = total + prix
    print("Prix total des pizzas avec champignons :", total, "CHF")

    ```

4.  ```{exec} python
    :editor: d2a4d8ed-c98d-4af5-9a55-5a022f69b29c

    votes = ["oui", "non", "non", "oui", "oui", "non", "non", "oui", "non", "oui", "oui"]
    oui = 0
    non = 0
    for v in votes:
        if v == "oui":
            oui += 1
        elif v == "non":
            non += 1

        if oui > non:
            print("Les OUI l'emporte")
        elif non > oui:
            print("Les NON l'emporte")
        else:
            print("Egalité")
    ```


````{solution}
1.  ```{exec} python
    :linenos:
    #Affiche la liste des tâches à faire avec le texte TODO avant chaque tâche
    todo = ["Réviser math", "Devoir de français", "Apprendre Scedryk par coeur"]
    for tâche in todo:
        print("TODO :", tâche)
    ```

2.  ```{exec} python
    :linenos:
    #Affiche et numérote la liste des sources pour un travail
    sources = ["wikipedia.org", "universalis.fr", "cnrtl.fr", "rts.ch"]

    num_source = 0

    for source in sources:
        num_source += 1
        print(num_source, ":", source)
    
    print("Au total il y a", num_source, "sources")
    ```

3.  ```{exec} python
    :linenos:
    :after: pizzeria
    #Calcule le prix total de toutes les pizzas avec champignons
    prix = execute_sql("SELECT prix FROM Pizza WHERE description LIKE '%champignons%'")

    total = 0

    for p in prix:
        total = total + p
    print("Prix total des pizzas avec champignons :", total, "CHF")

    ```


4.  ```{exec} python
    :linenos:
    votes = ["oui", "non", "non", "oui", "oui", "non", "non", "oui", "non", "oui", "oui"]
    oui = 0
    non = 0
    for v in votes:
        if v == "oui":
            oui += 1
        elif v == "non":
            non += 1

    if oui > non:
        print("Les OUI l'emporte")
    elif non > oui:
        print("Les NON l'emporte")
    else:
        print("Egalité")
    ```
````


### Exercice {num1}`exercice-listes`
Complétez le programme ci-dessous afin qu'il affiche correctement l'itinéraire
de la manière suivante:

```{code-block} text
Début de l'itinéraire
Vas à Bulle
Vas à Riaz
Vas à Marsens
Vas à Echarlens
Vas à Charmey
Tu es arrivé!
```

```{exec} python
:editor: dc635abe-c4ee-4beb-badd-02733dff234e
itineraire = ["Bulle", "Riaz", "Marsens", "Echarlens", "Charmey"]

# Complétez le programme à partir de là
```

````{solution}
```{exec} python
:linenos:
itineraire = ["Bulle", "Riaz", "Marsens", "Echarlens", "Charmey"]
print("Début de l'itinéraire")
for ville in itineraire:
    print("Vas à", ville)
print("Tu es arrivé!")
```
````

### Exercice {num1}`exercice-listes`
Le programme ci-dessous définit deux listes contenant des gains et des pertes en CHF. Complétez-le avec **2** boucles `for ... in ...` de sorte qu'il affiche le solde final.

```{exec} python
:editor: 2dd6801e-37d0-491b-8807-c493ec8d8e78
gains = [100, 50, 200.25, 90.50, 80, 200]
pertes = [40, 59.95, 145]

# Complétez le programme à partir de là
```

````{solution}
```{exec} python
:linenos:
gains = [100, 50, 200.25, 90.50, 80, 200]
pertes = [40, 59.95, 145]
total = 0
for g in gains:
    total += g
for p in pertes:
    total -= p
print("Solde final :", total, "CHF")
```
````

### Exercice {num1}`exercice-listes`
Le programme ci-dessous récupère toutes les quantités de pizzas commandées. Sans toucher à la requête SQL, complétez le programme de sorte qu'il trouve la plus grosse commande. Pour cela, l'algorithme en français est le suivant :

```{code-block} text
Récupérer la liste des quantités commandées
Définir une variable commande_maximum avec une valeur négative
Pour chaque quantité dans la liste
    Si cette quantité est plus grande que commande_maximum
        commande_maximum prend la valeur de cette quantité
Afficher commande_maximum
```

```{exec} python
:after: pizzeria
:editor: 438b05b3-4329-4d29-bb65-d85bde77a3a9
quantités = execute_sql("SELECT quantite FROM Commande")

# Complétez le programme à partir de là
```


````{solution}
```{exec} python
:linenos:
:after: pizzeria
quantités = execute_sql("SELECT quantite FROM Commande")

commande_maximum = -1

for qte in quantités:
    if qte > commande_maximum:
        commande_maximum = qte
print("Maximum :", commande_maximum)
```
````


### Exercice {num1}`exercice-listes`
Le programme ci-dessous récupère le statut des commandes de pizza (`livrée`, `en livraison`, ou `en préparation`). Sans toucher à la requête SQL, complétez le programme Python de sorte qu'il affiche le nombre de commandes qui ont été livrées.


```{exec} python
:after: pizzeria
:editor: 7d29f613-0533-438c-b3ad-7039d1dba998
statuts = execute_sql("SELECT statut FROM Commande")

# Complétez le programme à partir de là
```


````{solution}
```{exec} python
:linenos:
:after: pizzeria
statuts = execute_sql("SELECT statut FROM Commande")
nb_livrées = 0
for statut in statuts:
    if statut == "livrée":
        nb_livrées += 1
print("Nombre de pizzas livrées :", nb_livrées)
```
````


### Exercice {num1}`exercice-listes`
```{exec} python
:name: python-liste-notes
:class: hidden
#L'arnaque du siècle
def execute_sql(request):
  if request == "SELECT note FROM Bulletin":
    return [3.6, 5.7, 3.6, 5.8, 2.2, 5.2, 2.4, 4.6, 2.8, 3.6, 3.8, 4.1]
  else:
    raise Exception("Invalid SQL request")
```
Pour cet exercice, une mini-base de données contient quelques notes stockées dans une table `Bulletin`. On peut les récupérer de la manière suivante :
```{exec} python
:after: python-liste-notes
notes = execute_sql("SELECT note FROM Bulletin")
print("Liste de notes :", notes)
```

Avec cette liste, calculez les valeurs suivantes :

1. Le nombre de bonnes notes (4.5 et plus).
2. La moyenne. On calcule une moyenne en additionnant toutes les valeurs, puis en les divisant par leur nombre.
3. La meilleure note obtenue.

```{exec} python
:after: python-liste-notes
:editor: 7b52a83c-340a-4748-8f66-4b415d06aef6
notes = execute_sql("SELECT note FROM Bulletin")

# Complétez le progamme à partir de là
nb_bonnes_notes =
moyenne =
meilleure_note =

print("Il y a ", nb_bonnes_notes, "bonnes notes.")
print("La moyenne est de", moyenne)
print("La meilleure note obtenue est", meilleure_note)
```

````{solution}
```{exec} python
:linenos:
:after: python-liste-notes
notes = execute_sql("SELECT note FROM Bulletin")

#Calcul du nombre de bonnes notes
nb_bonnes_notes = 0
for note in notes:
    if note > 4.5:
        nb_bonnes_notes += 1

#Calcul de la moyenne
moyenne = 0
for note in notes:
    moyenne += note
moyenne = moyenne / len(notes)

#Calcul de la meilleure note
meilleure_note = 0
for note in notes:
    if note > meilleure_note:
        meilleure_note = note

print("Il y a", nb_bonnes_notes, "bonnes notes.")
print("La moyenne est de", moyenne)
print("La meilleure note obtenue est", meilleure_note)

```
````