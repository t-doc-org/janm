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

# Listes - Elément dans une liste
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



## Contrôler si un élément est dans une liste
Sans lire manuellement chaque élément d'une liste, il est possible de tester si un élément en fait partie grâce à la structure `if element in liste`. Par exemple, le programme ci-dessous recherche tous les noms d'utilisateur et contrôle si `Mila Schaller` personnes en font partie ou non.

```{exec} python
:after: pizzeria

noms = execute_sql("SELECT nom FROM Utilisateur")
print(noms)

if "Mila Schaller" in noms:
    print("Cette personne fait partie des utilisateurs")
else :
    print("Cette personne ne fait pas partie des utilisateurs")

```



Il est évidemment également possible de définir soi-même des listes pour les utiliser dans un `if` comme dans les exemples ci-dessous
```{exec} python
réponse = input("Quel est le meilleur collège de Suisse ?")

réponses_correctes = ["STX", "stx", "Sainte-Croix", "Ste-Croix", "Heilig Kreuz"]

if réponse in réponses_correctes:
    print("Bonne réponse")
else:
    print("Mauvaise réponse")
```

```{exec} python
achat = input("Qu'as-tu acheté ?")

if achat in ["pomme", "poire", "pêche", "abricot", "raisin"]:
    print("C'est un fruit")
elif achat in ["poivron", "chou-rouge", "carotte"]:
    print("C'est un légume")
else:
    print("Je ne sais pas ce que c'est")
```

## Exercices

### Exercice {num1}`exercice-listes`
Le programme ci-dessous demande une couleur de l'arc-en-ciel à l'utilisateur. S'il entre bel et bien une de ces couleurs, le programme affichera `Bravo`, sinon il affichera `Faux`

```{exec} python
:editor: 8d882558-5e69-491c-a921-cd6847e6d127
couleur = input("Entre une couleur de l'arc-en-ciel")
couleurs_arc_en_ciel = ["rouge", "orange", "jaune", "vert", "bleu", "indigo", "violet"]

# Complétez le programme à partir de là

```

````{solution}
```{exec} python
:linenos:
couleur = input("Entre une couleur de l'arc-en-ciel")
couleurs_arc_en_ciel = ["rouge", "orange", "jaune", "vert", "bleu", "indigo", "violet"]

if couleur in couleurs_arc_en_ciel:
    print("Bravo")
else:
    print("Faux")
```
````

### Exercice {num1}`exercice-listes`
Le programme ci-dessous recherche les noms de toutes les pizzas de la base de données. Complétez le programme de sorte qu'il demande à l'utilisateur quelle pizza il souhaite commande. Si cette pizza (par exemple `Hawaï`) existe dans la liste, le programme affichera `Commande confirmée pour 1x pizza Hawaï`. Sinon, il affichera `La pizza Hawaï n'existe pas`.

```{exec} python
:after: pizzeria
:linenos:
:editor: 470e4e5e-6c65-46ba-a812-c18b7b254ee6
pizzas = execute_sql("SELECT nom from Pizza")

# Complétez le programme à partir de là
```


````{solution}
```{exec} python
:after: pizzeria
:linenos:
pizzas = execute_sql("SELECT nom from Pizza")

choix = input("Quelle pizza veux-tu commander ?")

if choix in pizzas:
    print("Commande confirmée pour 1x", choix)
else:
    print("Cette pizza n'existe pas")
```
````



### Exercice {num1}`exercice-listes`

Le programme ci-dessous demande à l'utilisateur quel moyen de locomotion il utilise pour se rendre au travail et doit ensuite afficher un message en conséquence.

- `C'est très écologique!` lorsque l'utilisateur entre la valeur `à pied`, `trottinette`, `skateboard` ou `vélo`
- `C'est un bon geste!` lorsque l'utilisateur entre la valeur `bus", `train` ou
`tram`
- `C'est acceptable!` s'il entre la valeur `voiture`, `moto`, `scooter`,
`sidecar` ou `vespa`.
- `Sans commentaire.` s'il entre la valeur `avion`
- `Sans avis.` s'il entre une autre valeur

Utilisez pour cela la notation `if ... in ...` quand cela est pertinent.

```{exec} python
:editor: 21b10226-a456-4ab1-b04d-df9cef3aaf81
véhicule = input("Quel moyen de locomotion utilises-tu pour te rendre au travail ?")

# Complétez le programme à partir de là
print("C'est très écologique!")
print("C'est un bon geste!")
print("C'est acceptable!")
print("Sans commentaire.")
print("Sans avis.")
```

````{solution}
```{exec} python
:linenos:
locomotion = input("Quel moyen de locomotion utilises-tu pour aller au travail: ")

if locomotion in ["à pied", "trottinette", "skateboard", "vélo"]:
    print("C'est très écologique!")
elif locomotion in ["bus", "train", "tram"]:
    print("C'est un bon geste!")
elif locomotion in ["voiture", "sidecar", "vespa", "moto", "scooter"]:
    print("C'est acceptable!")
elif locomotion == "avion":
    print("Sans commentaire.")
else:
    print("Sans avis.")
```
````



### Exercice {num1}`exercice-listes`
Depuis la station de métro où l'utilisateur se trouve, il peut se rendre aux
arrêts qui se trouvent dans la liste `ligne_sud` et `ligne_nord`. Lorsque
celui-ci entre sa destination dans le programme ci-dessous, celui-ci doit lui afficher s'il doit prendre la ligne sud, la
ligne nord, ou s'il ne peut pas se rendre à sa destination.

```{exec} python
:editor: e77565d0-b927-412b-b3e5-e6e7e8a00c72
destination = input("Où veux-tu aller: ")

ligne_nord = ["Châtelet", "Opéra", "République", "Bastille"]
ligne_sud = ["Gare du Nord", "Gare de Lyon", "Saint-Michel Notre-Dame", "Auber", "Porte d'Italie"]

# Complétez le programme à partir de là
print("Prends la ligne nord.")
print("Prends la ligne sud.")
print("Tu ne peux pas te rendre à cet arrêt.")
```

````{solution}
```{exec} python
:linenos:
destination = input("Où veux-tu aller: ")

ligne_nord = ["Châtelet", "Opéra", "République", "Bastille"]
ligne_sud = ["Gare du Nord", "Gare de Lyon", "Saint-Michel Notre-Dame",
             "Auber", "Porte d'Italie"]

if destination in ligne_nord:
    print("Prends la ligne nord.")
elif destination in ligne_sud:
    print("Prends la ligne sud.")
else:
    print("Tu ne peux pas te rendre à cet arrêt.")
```
````


### Exercice {num1}`exercice-listes`
Complétez le programme ci-dessous afin que l'utilisateur puisse petit à petit
créer une liste avec les codes postaux dans lesquels il souhaite se rendre.
Cette liste des codes postaux ne doit jamais contenir de doublons! Si
l'utilisateur essaie d'en entrer un, le programme affichera "Erreur, ce code
postal est déjà dans la liste" et continuera ensuite normalement. Le programme
s'arrête quand l'utilisateur entre un code postal négatif. À ce moment, la liste
des codes postaux est simplement affichée.

```{exec} python
:editor: 61ad2b94-75ec-449a-9bb9-a9f5691fe626
# Complétez le programme
codes_postaux = []
code_postal = int(input("Entre un code postal: "))

while code_postal > 0:
    # Complétez le programme à partir de là
```

````{solution}
```{exec} python
:linenos:
codes_postaux = []
code_postal = int(input("Entre un code postal : "))
while code_postal >= 0:
    if code_postal in codes_postaux:
        print("Erreur, ce code postal est déjà dans la liste.")
    else:
        codes_postaux.append(code_postal)
    code_postal = int(input("Entre un code postal : "))

print(codes_postaux)
```
````