<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Listes et boucles for

## Qu'est-ce qu'une liste ?
Là où une variable de type `int`, `float`, `str`, ou `bool` ne peut contenir qu'une seule valeur, une *liste* (type `list`) peut en contenir **plusieurs**. Les listes sont très pratiques quand un programme contient une grande quantité de données, afin de toutes les enregistrer dans une seule variable.

Une liste est entourée de crochets `[]` et ses valeurs sont séparées par des virgules `,`.
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
L'indexation permet d'accéder à **un élément précis** d'une liste. Pour ce faire, on fait suivre la liste d'une paire de crochets `[]` entre lesquels on écrit l'index de l'élément souhaité. L'index correspond à la *position* de l'élément dans la liste, sachant que le premier élément a l'index `0`, le deuxième l'index `1`, etc.

```{exec} python
:linenos:
joueurs = ["Sommer", "Akanji", "Xhaka", "Embolo", "Freuler", "Vargas"]

print("Liste complète :", joueurs)
print("Premier joueur :", joueurs[0])
print("5ème joueur :", joueurs[4])
```

Un index peut aussi être contenu dans une variable, ce qui permet par exemple de laisser l'utilisateur choisir l'élément à afficher.

```{exec} python
:linenos:
joueurs = ["Sommer", "Akanji", "Xhaka", "Embolo", "Freuler", "Vargas"]

index = int(input("Quel index sélectionnes-tu ?"))
print("Tu as sélectionné :", joueurs[index])
```

```{important}
 - Le premier élément d'une liste est toujours à l'**index 0**.
 - Dans une liste de n éléments, le dernier élément sera à l'**index n-1**.
```

## Fonctions sur les listes
En Python, il existe de nombreuses fonctions très pratiques pouvant être utilisées sur les listes. Voici celles que nous utiliserons dans ce cours.

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

 - `ma_liste.remove(element)` : retire **1x** l'élément de `ma_liste`
    ```{exec} python
    outils = ["tournevis", "vis", "vis", "vis", "clous", "marteau"]
    outils.remove("clous")
    outils.remove("vis")
    print(outils)
    ```

## Contrôler si un élément est dans une liste
Sans lire manuellement chaque élément d'une liste, il est possible de tester si un élément en fait partie grâce à la structure `if element in liste`. Par exemple, le programme ci-dessous contrôle si un prénom fait partie des invités d'une fête.

```{exec} python
:linenos:
invités = ["Mila", "Loris", "Anja", "Kilian", "Sara", "Pedro"]
prénom = input("Quel est ton prénom ?")

if prénom in invités:
    print("Bienvenue à la fête,", prénom)
else:
    print("Désolé, tu n'es pas sur la liste")
```

La liste peut même être écrite directement dans la condition :

```{exec} python
:linenos:
achat = input("Qu'as-tu acheté ?")

if achat in ["pomme", "poire", "pêche", "abricot", "raisin"]:
    print("C'est un fruit")
elif achat in ["poivron", "chou-rouge", "carotte"]:
    print("C'est un légume")
else:
    print("Je ne sais pas ce que c'est")
```

## Parcourir chaque élément d'une liste
Quand on traite les éléments d'une liste, il est courant de vouloir exécuter la même opération **pour chacun** de ses éléments. En Python, l'instruction *Pour chaque ... dans ...* se traduit avec les mots-clefs `for ... in ...`. Les instructions indentées en dessous sont exécutées en boucle pour chaque élément de la liste : la nouvelle variable définie après le `for` prend tour à tour la valeur de chaque élément de la liste placée après le `in`.

```{exec} python
:linenos:
invités = ["Mila", "Loris", "Anja", "Kilian", "Sara", "Pedro"]

#Pour chaque prénom dans la liste des invités
for prénom in invités:
    print("Bonjour", prénom)
```

La boucle `for` est souvent combinée à une variable qui *accumule* un résultat au fil des tours. Dans l'exemple ci-dessous, le programme compte le nombre de notes insuffisantes d'une liste.

```{exec} python
:linenos:
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

```{important}
- `for element in liste` parcourt **tous** les éléments de la liste, du premier au dernier.
- Une variable qui accumule un résultat (un total, un compteur, un maximum) se définit **avant** la boucle, puis se met à jour **dans** la boucle.
```

## La boucle for avec range()
La fonction `range()` produit une *suite de nombres entiers*. Combinée à une boucle `for`, elle permet de répéter un bloc d'instructions un nombre précis de fois, sans devoir gérer soi-même un compteur comme avec un `while`. Les deux programmes ci-dessous affichent par exemple exactement la même chose.

<table>
<tr><th>Avec <code>while</code></th><th>Avec <code>for ... in range()</code></th></tr>
<tr>
<td>

```{code-block} python
compteur = 0
while compteur < 5:
    print(compteur)
    compteur = compteur + 1
```

</td>
<td>

```{code-block} python
for compteur in range(5):
    print(compteur)
```

</td>
</tr>
</table>

La fonction `range()` peut recevoir un, deux ou trois paramètres. Dans tous les cas, la valeur de **fin n'est jamais atteinte** : elle est exclue de la suite.

| Instruction | Nombres produits | Explication |
| :---------- | :--------------- | :---------- |
| `range(5)` | `0, 1, 2, 3, 4` | de 0 jusqu'à 5 (exclu) |
| `range(2, 6)` | `2, 3, 4, 5` | de 2 jusqu'à 6 (exclu) |
| `range(0, 10, 3)` | `0, 3, 6, 9` | de 0 jusqu'à 10 (exclu), de 3 en 3 |
| `range(10, 0, -2)` | `10, 8, 6, 4, 2` | de 10 jusqu'à 0 (exclu), en descendant de 2 en 2 |

```{exec} python
:linenos:
print("Compte à rebours :")
for i in range(10, 0, -1):
    print(i)
print("Décollage !")
```

### Parcourir les index d'une liste
En combinant `range()` et `len()`, on obtient la suite de **tous les index** d'une liste : `range(len(ma_liste))`. Cela est utile lorsqu'on a besoin de connaître la **position** de chaque élément, et pas seulement sa valeur. Dans l'exemple ci-dessous, la variable `i` prend tour à tour les valeurs `0`, `1`, `2`, etc., et `arrivée[i]` donne le coureur à cette position.

```{exec} python
:linenos:
arrivée = ["Isaac", "Victor", "Pascal", "Lucien", "Bruno", "Aurélien"]

for i in range(len(arrivée)):
    print(i + 1, ":", arrivée[i])
```

Connaître l'index permet aussi d'accéder aux **voisins** d'un élément. Le programme ci-dessous compare chaque température à celle du jour suivant pour compter le nombre de jours où il a fait plus chaud que la veille. Comme le dernier élément n'a pas de suivant, la boucle s'arrête à l'avant-dernier index, d'où le `len(températures) - 1`.

```{exec} python
:linenos:
températures = [12, 15, 14, 17, 19, 16, 18]
nb_hausses = 0

for i in range(len(températures) - 1):
    if températures[i + 1] > températures[i]:
        nb_hausses = nb_hausses + 1

print("La température a augmenté", nb_hausses, "fois")
```

```{important}
- `range(fin)`, `range(début, fin)` et `range(début, fin, pas)` : la valeur de **fin est toujours exclue**.
- `for element in liste` donne directement les **valeurs** de la liste.
- `for i in range(len(liste))` donne les **index** de la liste : la valeur s'obtient alors avec `liste[i]`.
```

## Exercices

```{role} rep(quiz-input)
:right: width: 7rem;
:check: lowercase trim
```

### Exercice {num1}`exercice-python`
Les trois instructions ci-dessous sont exécutées **l'une après l'autre**. Suivez le contenu de la
liste à la main, puis répondez.

```{code-block} python
sac = ["pomme", "pain", "eau"]
sac.append("pomme")
sac.remove("pomme")
```

```{quiz}
:style: max-width: 32rem;
1. {rep}`3`
À la fin, que vaut `len(sac)` ?

2. {rep}`pain`
À la fin, que vaut `sac[0]` ?

3. {rep}`pomme`
À la fin, que vaut `sac[2]` ?
```

````{solution}
Après le `append`, la liste vaut `["pomme", "pain", "eau", "pomme"]`.

Le `remove` ne retire qu'**une seule** occurrence, et c'est la **première** rencontrée : c'est
donc la pomme du début qui disparaît, pas celle de la fin. La liste finale vaut
`["pain", "eau", "pomme"]`.

La liste a donc bien retrouvé sa longueur de départ, mais son contenu a changé d'ordre : le
premier élément n'est plus `pomme` mais `pain`.
````

### Exercice {num1}`exercice-python`
Pour chacun des programmes ci-dessous, indiquez ce que vaut la variable indiquée **à la fin** de
l'exécution. Répondez sans exécuter les programmes : parcourez la liste à la main, élément par
élément.

```````{quiz}
1.  {rep}`21` Que vaut `total` ?
    ```{code-block} python
    nombres = [3, 7, 2, 9]
    total = 0
    for n in nombres:
        total = total + n
    ```

2.  {rep}`3` Que vaut `compteur` ?
    ```{code-block} python
    mots = ["chat", "chien", "rat", "souris"]
    compteur = 0
    for m in mots:
        if len(m) > 3:
            compteur = compteur + 1
    ```

3.  {rep}`6` Que vaut `resultat` ?
    ```{code-block} python
    notes = [3, 5, 4, 6]
    resultat = 0
    for note in notes:
        resultat = note
    ```

4.  {rep}`24` Que vaut `produit` ?
    ```{code-block} python
    valeurs = [2, 3, 4]
    produit = 1
    for v in valeurs:
        produit = produit * v
    ```

5.  {rep}`PYTHON` Que vaut `mot` ?
    ```{code-block} python
    lettres = ["P", "Y", "T", "H", "O", "N"]
    mot = ""
    for l in lettres:
        mot = mot + l
    ```
```````

````{solution}
1.  **21.** À chaque tour, l'élément est ajouté au total : 0, puis 3, 10, 12 et enfin 21. C'est le
    schéma de l'**accumulateur**, que l'on retrouve dans presque tous les exercices de cette page.
2.  **3.** Seul `rat` fait 3 lettres ; `chat`, `chien` et `souris` en font plus de 3.
3.  **6.** Piège classique : l'instruction est `resultat = note` et non `resultat = resultat +
    note`. La variable est donc **écrasée** à chaque tour et ne conserve que la dernière valeur de
    la liste. Une seule lettre de différence, et le programme ne fait plus du tout la même chose.
4.  **24.** Même schéma que le n° 1, mais avec une multiplication. Notez que `produit` doit partir
    de **1** et non de 0 : en partant de 0, tout produit vaudrait 0.
5.  **PYTHON.** L'accumulateur fonctionne aussi avec du texte : `+` colle les chaînes les unes
    après les autres. La variable doit alors partir de la chaîne vide `""`.
````

### Exercice {num1}`exercice-python`
Pour chacun des programmes ci-dessous, indiquez ce que vaut la variable indiquée **à la fin** de
l'exécution. Répondez sans exécuter les programmes : écrivez d'abord la suite de nombres produite
par le `range()`, puis suivez la boucle tour après tour.

```````{quiz}
1.  {rep}`10` Que vaut `total` ?
    ```{code-block} python
    total = 0
    for i in range(5):
        total = total + i
    ```

2.  {rep}`15` Que vaut `total` ?
    ```{code-block} python
    total = 0
    for i in range(1, 6):
        total = total + i
    ```

3.  {rep}`18` Que vaut `total` ?
    ```{code-block} python
    total = 0
    for i in range(0, 10, 3):
        total = total + i
    ```

4.  {rep}`5` Que vaut `compteur` ?
    ```{code-block} python
    compteur = 0
    for i in range(10, 0, -2):
        compteur = compteur + 1
    ```

5.  {rep}`2` Que vaut `compteur` ?
    ```{code-block} python
    valeurs = [3, 7, 5, 8, 2, 9]
    compteur = 0
    for i in range(len(valeurs) - 1):
        if valeurs[i] > valeurs[i + 1]:
            compteur = compteur + 1
    ```
```````

````{solution}
1.  **10.** `range(5)` produit `0, 1, 2, 3, 4` : le 5 est exclu. On a donc $0 + 1 + 2 + 3 + 4 = 10$.
2.  **15.** `range(1, 6)` produit `1, 2, 3, 4, 5`. Pour additionner les nombres de 1 à 5, la fin
    doit être fixée à **6**.
3.  **18.** `range(0, 10, 3)` produit `0, 3, 6, 9` : le nombre suivant, 12, dépasse la fin.
4.  **5.** `range(10, 0, -2)` produit `10, 8, 6, 4, 2` : cinq nombres, le 0 étant exclu. La
    valeur de `i` n'est pas utilisée ici, la boucle sert seulement à compter ses tours.
5.  **2.** La boucle compare chaque élément à son **voisin de droite** : 3 et 7, 7 et 5, 5 et 8,
    8 et 2, puis 2 et 9. Seules les paires 7/5 et 8/2 sont dans le "mauvais" ordre. Notez le
    `len(valeurs) - 1` : sans lui, au dernier tour, `valeurs[i + 1]` désignerait un élément qui
    n'existe pas.
````

### Exercice {num1}`exercice-python`
Chacun des programmes suivants comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique.
1.  ```{exec} python
    :editor:
    sac = [] #Définit une liste vide
    objet = input("Quel objet veux-tu mettre dans ton sac ?")
    while objet != "STOP":
        append(sac.objet)
        objet = input("Quel autre objet veux-tu mettre dans ton sac ?")
    print("Contenu du sac", sac)
    ```

2.  ```{exec} python
    :editor:
    #Retire tous les 0 de la liste
    bits = [1, 0, 1, 1, 0, 1, 0] #Ne pas toucher à cette ligne
    bits.remove(0)
    print(bits)
    ```

3.  ```{exec} python
    :editor:
    #Affiche la liste des tâches à faire avec le texte TODO avant chaque tâche
    todo = ["Réviser math", "Devoir de français", "Apprendre Scedryk par coeur"]
    for tâche in todo:
        print("TODO :", todo)
    ```

4.  ```{exec} python
    :editor:
    votes = ["oui", "non", "non", "oui", "oui", "non", "non", "oui", "non", "oui", "oui"]
    oui = 0
    non = 0
    for v in votes:
        if v == "oui":
            oui += 1
        elif v == "non":
            non += 1

        if oui > non:
            print("Les OUI l'emportent")
        elif non > oui:
            print("Les NON l'emportent")
        else:
            print("Egalité")
    ```

5.  ```{exec} python
    :editor:
    #Affiche les nombres de 1 à 10
    for i in range(10):
        print(i)
    ```

6.  ```{exec} python
    :editor:
    #Compte combien de fois un nombre est suivi d'un nombre plus grand
    nombres = [4, 9, 2, 7, 7, 10]
    compteur = 0
    for i in range(len(nombres)):
        if nombres[i + 1] > nombres[i]:
            compteur += 1
    print(compteur)
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    sac = [] #Définit une liste vide
    objet = input("Quel objet veux-tu mettre dans ton sac ?")
    while objet != "STOP":
        sac.append(objet)
        objet = input("Quel autre objet veux-tu mettre dans ton sac ?")
    print("Contenu du sac", sac)
    ```

2.  ```{exec} python
    :linenos:
    #Retire tous les 0 de la liste
    bits = [1, 0, 1, 1, 0, 1, 0] #Ne pas toucher à cette ligne
    while 0 in bits:
        bits.remove(0)
    print(bits)
    ```
    `remove()` ne retire qu'**une seule** occurrence de la valeur, et la liste en contient
    trois. Plutôt que d'écrire trois fois `bits.remove(0)`, on répète le `remove` **tant que**
    la liste contient encore un `0` : ce programme fonctionne quel que soit le nombre de zéros.

3.  ```{exec} python
    :linenos:
    #Affiche la liste des tâches à faire avec le texte TODO avant chaque tâche
    todo = ["Réviser math", "Devoir de français", "Apprendre Scedryk par coeur"]
    for tâche in todo:
        print("TODO :", tâche)
    ```
    À chaque tour, c'est la variable `tâche` qui contient l'élément courant. Afficher `todo`
    affiche la liste **complète** à chaque tour.

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
        print("Les OUI l'emportent")
    elif non > oui:
        print("Les NON l'emportent")
    else:
        print("Egalité")
    ```
    Le résultat du vote ne doit être affiché qu'**une seule fois**, une fois que tous les votes
    ont été comptés : le `if` final doit donc être **sorti** de la boucle (désindenté).

5.  ```{exec} python
    :linenos:
    #Affiche les nombres de 1 à 10
    for i in range(1, 11):
        print(i)
    ```
    La valeur de fin d'un `range()` est toujours **exclue**, et `range(10)` commence à 0 : il
    produit donc les nombres de 0 à 9.

6.  ```{exec} python
    :linenos:
    #Compte combien de fois un nombre est suivi d'un nombre plus grand
    nombres = [4, 9, 2, 7, 7, 10]
    compteur = 0
    for i in range(len(nombres) - 1):
        if nombres[i + 1] > nombres[i]:
            compteur += 1
    print(compteur)
    ```
    Au dernier tour, `i` vaut l'index du dernier élément, et `nombres[i + 1]` n'existe pas
    (`list index out of range`). Comme le dernier élément n'a pas de suivant, la boucle doit
    s'arrêter à l'avant-dernier index.
````

### Exercice {num1}`exercice-python`
Complétez le programme ci-dessous afin que l'utilisateur puisse petit à petit
créer une liste avec les codes postaux dans lesquels il souhaite se rendre.
Cette liste des codes postaux ne doit jamais contenir de doublons ! Si
l'utilisateur essaie d'en entrer un, le programme affichera `Erreur, ce code
postal est déjà dans la liste` et continuera ensuite normalement. Le programme
s'arrête quand l'utilisateur entre un code postal négatif. À ce moment, la liste
des codes postaux est simplement affichée.

```{exec} python
:editor: 01a162e5-bab0-749d-8a46-526f0c40a9ef
# Complétez le programme
codes_postaux = []
code_postal = int(input("Entre un code postal: "))

while code_postal >= 0:
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

### Exercice {num1}`exercice-python`
La liste ci-dessous contient toutes les notes d'un bulletin. Avec cette liste, calculez les valeurs suivantes :

1. Le nombre de bonnes notes (4.5 et plus).
2. La moyenne. On calcule une moyenne en additionnant toutes les valeurs, puis en les divisant par leur nombre.
3. La meilleure note obtenue.

```{exec} python
:editor: 01a162e5-bab6-718f-ab31-3cd0fe11bd3f
notes = [3.6, 5.7, 3.6, 5.8, 2.2, 5.2, 2.4, 4.6, 2.8, 3.6, 3.8, 4.1]

# Complétez le programme à partir de là
nb_bonnes_notes =
moyenne =
meilleure_note =

print("Il y a", nb_bonnes_notes, "bonnes notes.")
print("La moyenne est de", moyenne)
print("La meilleure note obtenue est", meilleure_note)
```

````{solution}
```{exec} python
:linenos:
notes = [3.6, 5.7, 3.6, 5.8, 2.2, 5.2, 2.4, 4.6, 2.8, 3.6, 3.8, 4.1]

#Calcul du nombre de bonnes notes
nb_bonnes_notes = 0
for note in notes:
    if note >= 4.5:
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

### Exercice {num1}`exercice-python`
Écrivez un programme qui vérifie si une liste de nombres est **triée** dans l'ordre croissant,
c'est-à-dire si chaque élément est plus petit ou égal à celui qui le suit. Le programme affichera
`La liste est triée` ou `La liste n'est pas triée`. Testez-le avec les trois listes proposées.

```{exec} python
:editor: 01a16300-2597-7e54-88d8-da38ff3a9ade
nombres = [2, 5, 5, 8, 13, 21]    # triée
#nombres = [2, 5, 4, 8, 13, 21]   # pas triée
#nombres = [21, 13, 8, 5, 2]      # pas triée

#Écrivez votre code ici
```

````{solution}
```{exec} python
:linenos:
nombres = [2, 5, 5, 8, 13, 21]

triée = True
for i in range(len(nombres) - 1):
    if nombres[i] > nombres[i + 1]:
        triée = False

if triée:
    print("La liste est triée")
else:
    print("La liste n'est pas triée")
```
1. On part du principe que la liste est triée, et on cherche une preuve du contraire : il suffit
   d'**une seule** paire de voisins dans le mauvais ordre pour que la liste ne soit pas triée.
2. Il ne faut **surtout pas** remettre `triée = True` dans un `else` à l'intérieur de la boucle :
   la dernière paire comparée effacerait alors le résultat de toutes les précédentes.
3. La boucle s'arrête à l'avant-dernier index, car le dernier élément n'a pas de voisin de
   droite.
````

### Exercice {num1}`exercice-python`
Écrivez un programme qui crée une **nouvelle liste** `inverse` contenant les éléments de la liste
`podium` dans l'ordre inverse, puis l'affiche. Utilisez une boucle `for` avec un `range()` qui
parcourt les index **en partant de la fin**. Le programme doit afficher :

```{code-block} text
['Bronze', 'Argent', 'Or']
```

```{exec} python
:editor: 01a16300-259a-75db-a254-678c95f0724d
podium = ["Or", "Argent", "Bronze"]
inverse = []

#Complétez le programme ici
```

````{solution}
```{exec} python
:linenos:
podium = ["Or", "Argent", "Bronze"]
inverse = []

for i in range(len(podium) - 1, -1, -1):
    inverse.append(podium[i])

print(inverse)
```
1. Le dernier index de la liste est `len(podium) - 1`, c'est donc le **début** du `range()`.
2. On veut descendre jusqu'à l'index `0` **compris**. Comme la fin est toujours exclue, il faut
   indiquer `-1` comme valeur de fin.
3. Le pas de `-1` fait descendre les index un par un : `range(2, -1, -1)` produit `2, 1, 0`.
````
