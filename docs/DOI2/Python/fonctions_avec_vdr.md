<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
exec:
  python:
    files:
      pizzeria.sql:
```

# Fonctions avec valeur de retour

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

## Afficher n'est pas retourner

Jusqu'à présent, nos fonctions **affichaient** leur résultat avec un `print`. Reprenons par exemple une fonction qui calcule l'aire d'un triangle.

```{exec} python
def aire_triangle(base, hauteur):
    aire = base * hauteur / 2
    print(aire)

aire_triangle(5, 10)
aire_triangle(10, 13)
```

Ce programme affiche bien les deux aires (`25.0` et `65.0`), mais il y a un problème : ces deux valeurs sont **perdues** une fois affichées. Impossible de les additionner pour obtenir l'aire totale, de les comparer, ou de les réutiliser plus loin. La fonction a montré le résultat à l'écran, mais elle ne l'a pas *donné* au programme.

```{note}
Il est crucial de se rappeler qu'avec un `print()`, la valeur calculée par la fonction est ensuite perdue. Pour la réutiliser dans le programme principal, il faudra impérativement utiliser un `return`.
```

Avec le mot-clef `return`, la fonction **rend** sa valeur au programme au lieu de simplement l'afficher. On peut alors la récupérer dans une variable et l'utiliser à notre guise, par exemple pour additionner deux aires.

```{exec} python
def aire_triangle(base, hauteur):
    aire = base * hauteur / 2
    return aire

aire1 = aire_triangle(5, 10)
aire2 = aire_triangle(10, 13)

aire_totale = aire1 + aire2
print("Aire totale :", aire_totale)
```

```{important}
- `print` **affiche** une valeur à l'écran. On la voit, mais le programme ne peut pas la réutiliser.
- `return` **rend** une valeur au programme. Rien ne s'affiche, mais on peut la récupérer et la réutiliser.
```

## Récupérer la valeur de retour

Une valeur retournée n'est utile que si on la **récupère**. Dans le programme ci-dessous, la fonction calcule bien le double de 5, mais comme le résultat n'est rangé nulle part, il est immédiatement **perdu** : le programme n'affiche donc rien du tout.

```{exec} python
def double(nombre):
    return nombre * 2

double(5)   # la valeur 10 est calculée... puis jetée
```

Pour utiliser la valeur retournée, il faut la **capter** en la plaçant après une variable et un `=`, exactement comme on le faisait avec un `input()`.

```{exec} python
def double(nombre):
    return nombre * 2

resultat = double(5)
print(resultat)
```

```{warning}
C'est l'erreur la plus fréquente avec les fonctions : écrire `double(5)` en pensant que « ça va
afficher 10 ». Une fonction qui `return` **n'affiche jamais rien** toute seule. Si vous voulez
voir la valeur, il faut soit la ranger dans une variable, soit l'afficher vous-même avec un
`print`.
```

## Utiliser une valeur de retour

Une fois qu'une fonction retourne une valeur, son appel peut s'utiliser **partout où vous pourriez écrire cette valeur** : directement dans un `print`, dans un calcul, dans une condition, ou même comme paramètre d'une autre fonction.

```{exec} python
def double(nombre):
    return nombre * 2

print(double(5))                # afficher directement le résultat
total = double(5) + double(10)  # utiliser le résultat dans un calcul
print("Total :", total)

if double(5) > 8:               # utiliser le résultat dans une condition
    print("Le double de 5 est plus grand que 8")
```

## Le `return` met fin à la fonction

Dès qu'un `return` est exécuté, la fonction **s'arrête immédiatement** : les instructions qui le suivent dans le corps de la fonction ne sont jamais exécutées. Dans l'exemple ci-dessous, si le nombre est positif, le premier `return` renvoie sa valeur et quitte la fonction ; le second `return` n'est atteint que pour les nombres négatifs. On n'a donc même pas besoin d'un `else`.

```{exec} python
def valeur_absolue(nombre):
    if nombre >= 0:
        return nombre
    return -nombre

print(valeur_absolue(7))
print(valeur_absolue(-4))
```

## Exercices

```{role} aff(quiz-input)
:right: width: 8rem;
:check: lowercase trim
```

### Exercice {num1}`exercice`
Les cinq programmes ci-dessous se ressemblent, mais n'affichent pas la même chose. Pour chacun,
prédisez **ce qui s'affiche à l'écran**, puis vérifiez en réfléchissant à ce que fait vraiment
chaque appel de fonction. Si le programme n'affiche rien, écrivez `rien`.

```````{quiz}
1.  {aff}`Terminé`
    ```{code-block} python
    def double(nombre):
        return nombre * 2

    double(5)
    print("Terminé")
    ```

2.  {aff}`10`
    ```{code-block} python
    def double(nombre):
        return nombre * 2

    resultat = double(5)
    print(resultat)
    ```

3.  {aff}`10`
    ```{code-block} python
    def double(nombre):
        print(nombre * 2)

    double(5)
    ```

4.  {aff}`30`
    ```{code-block} python
    def double(nombre):
        return nombre * 2

    print(double(5) + double(10))
    ```

5.  {aff}`17`
    ```{code-block} python
    def prix_total(quantite):
        return quantite * 3

    commande = prix_total(4)
    print(commande + 5)
    ```
```````

````{solution}
1.  **`Terminé`** seulement. La fonction calcule bien `10`, mais comme cet appel `double(5)` n'est
    rangé dans aucune variable, la valeur est aussitôt **perdue**. La seule chose affichée est le
    `print("Terminé")` de la dernière ligne. C'est le piège n° 1 des fonctions : un `return`
    n'affiche rien tout seul.

2.  **`10`**. Cette fois l'appel est capté dans la variable `resultat`, que le `print` affiche
    ensuite.

3.  **`10`** également — mais pour une raison **opposée** au programme 2 ! Ici la fonction ne
    retourne rien : c'est elle-même qui contient le `print`. Le résultat s'affiche donc pendant
    l'appel. Les programmes 2 et 3 affichent la même chose, mais dans le programme 3 on ne
    pourrait **pas** réutiliser la valeur `10` ailleurs, alors que dans le programme 2, oui.

4.  **`30`**. Un appel qui retourne une valeur peut s'utiliser directement dans un calcul :
    `double(5)` vaut 10, `double(10)` vaut 20, et c'est leur somme qui est affichée.

5.  **`17`**. L'appel `prix_total(4)` retourne `12`, qui est rangé dans `commande`. La dernière
    ligne affiche donc `commande + 5`, soit `17`.
````

### Exercice {num1}`exercice`
Chacun des programmes suivants comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique.
1.  ```{exec} python
    :linenos:
    :editor: 25bc7166-7fd7-446e-8ae1-e5b19450f1ce
    def périmètre_carré(côté):
        périmètre = côté * 4
        print(périmètre)
        
    p1 = périmètre_carré(5)
    p2 = périmètre_carré(7)
    total = p1 + p2
    print(total)
    ```

2.  ```{exec} python
    :linenos:
    :editor: 22cad6a7-ebfc-4632-b2df-086bd2b76ece
    def maximum(liste):
        maximum = -99999
        for n in liste:
            if n > maximum:
                maximum = n
        return maximum
    
    #Doit afficher le maximum de la liste ci-dessous
    ma_liste = [4, 6, 2, 8, -4, 3, 10, 9, 4, 7, -3]
    maximum(ma_liste)
    ```

3.  ```{exec} python
    :editor: fb55007c-246a-464b-9410-c4433be0c0f8
    def applique_réduction(prix, code):
        if code == "STX":
            return prix * 0.8
        elif code == "JANM":
            return prix * 0.65
        elif code == "FRI":
            return prix * 0.9
        else:
            return prix

    prix_de_base_1 = 67
    prix_de_base_2 = 45
    applique_réduction(prix_de_base_1, "JANM")
    applique_réduction(prix_de_base_2, "STX")
    prix_réduit_total = prix_de_base_1 + prix_de_base_2
    print(prix_réduit_total)
    ```

4.  ```{exec} python
    :editor: 1f050de4-e7e7-40d4-b3bf-6fe948d6db43
    def ajoute_s(mot, nombre):
        if nombre > 1:
            mot + "s"
        else:
            mot

    n_chat = int(input("Combien de chats as-tu ?"))
    n_chien = int(input("Combien de chiens as-tu ?"))
    txt_chat = ajoute_s("chat", n_chat) 
    txt_chien = ajoute_s("chien", n_chien)
    print("Tu as", n_chat, txt_chat, "et", n_chien, txt_chien )
    ```


````{solution}
1.  ```{exec} python
    :linenos:
    def périmètre_carré(côté):
        périmètre = côté * 4
        return périmètre

    p1 = périmètre_carré(5)
    p2 = périmètre_carré(7)
    total = p1 + p2
    print(total)
    ```

2.  ```{exec} python
    :linenos:
    def maximum(liste):
        maximum = -99999
        for n in liste:
            if n > maximum:
                maximum = n
        return maximum
    
    #Doit afficher le maximum de la liste ci-dessous
    ma_liste = [4, 6, 2, 8, -4, 3, 10, 9, 4, 7, -3]
    m = maximum(ma_liste)
    print(m)
    ```

3.  ```{exec} python
    :linenos:
    def applique_réduction(prix, code):
        if code == "STX":
            return prix * 0.8
        elif code == "JANM":
            return prix * 0.65
        elif code == "FRI":
            return prix * 0.9
        else:
            return prix

    prix_de_base_1 = 67
    prix_de_base_2 = 45
    réduit_1 = applique_réduction(prix_de_base_1, "JANM")
    réduit_2 = applique_réduction(prix_de_base_2, "STX")
    prix_réduit_total = réduit_1 + réduit_2
    print(prix_réduit_total)
    ```


4.  ```{exec} python
    :linenos:
    def ajoute_s(mot, nombre):
        if nombre > 1:
            return mot + "s"
        else:
            return mot

    n_chat = int(input("Combien de chats as-tu ?"))
    n_chien = int(input("Combien de chiens as-tu ?"))
    txt_chat = ajoute_s("chat", n_chat)
    txt_chien = ajoute_s("chien", n_chien)
    print("Tu as", n_chat, txt_chat, "et", n_chien, txt_chien )
    ```
````

### Exercice {num1}`exercice`
La fonction ci-dessous permet de calculer et de retourner le périmètre d'un cercle. Appelez cette fonction 2x en récupérant la valeur de retour pour déterminer le périmètre total d'un cercle de rayon 3 et de rayon 5
```{exec} python
:editor: b26eb950-7938-4664-ba62-e7de3b0860e5
def périmètre_cercle(rayon):
    périmètre = 2 * 3.14159 * rayon
    return périmètre

#Complétez le code ici
```

````{solution}
```{exec} python
def périmètre_cercle(rayon):
    périmètre = 2 * 3.14159 * rayon
    return périmètre

p1 = périmètre_cercle(3)
p2 = périmètre_cercle(5)
total = p1 + p2
print("Le périmètre total est de", total)
```
````

### Exercice {num1}`exercice`
Le code ci-dessous fait appel à une fonction calculant et retournant un prix réduit de 20%. Définissez cette fonction et écrivez son corps.

```{exec} python
:editor: 27b156f5-3d04-41af-b2ed-20a0a8adbf5e

prix = 56
prix_réduit = réduction_20(prix)
print("Prix réduit :", prix_réduit, "CHF")
```

````{solution}
```{exec} python
def réduction_20(p):
    return p * 0.8

prix = 56
prix_réduit = réduction_20(prix)
print("Prix réduit :", prix_réduit, "CHF")
```
````

### Exercice {num1}`exercice`
Définissez une fonction nommée `sanctions_STX` permettant de déterminer les sanctions à STX en fonction du nombre de retards et du nombre d'absences injustifiées. Pour rappel, les sanctions sont les suivantes :
 - Au moins 3 retards ou 2 absences injustifiées : `retenue`
 - Au moins 6 retards ou 4 absences injustifiées : `retenue samedi matin`
 - Au moins 9 retards ou 6 absences injustifiées : `avertissement écrit`
 - Au moins 12 retards ou 8 absences injustifiées : `menace d'exclusion`
 - Au moins 15 retards ou 10 absences injustifiées : `exclusion`
 - En dessous de tout cela : `rien`

Utilisez ensuite la fonction pour déterminer les sanctions de 2 élèves : l'un ayant 4 retards et 0 absence injustifiée, l'autre 2 retards et 2 absences injustifiées.

Si les deux sanctions sont pareilles, votre programme affichera en plus : `Deux mêmes sanctions...`

```{exec} python
:editor: bd778a87-0aed-4285-b0de-519b3aef5d48

def sanctions_STX(n_retards, n_absences_inj):

```

````{solution}
```{exec} python
def sanctions_STX(n_retards, n_absences_inj):
    if n_retards >= 15 or n_absences_inj >= 10:
        return "exclusion"
    elif n_retards >= 12 or n_absences_inj >= 8:
        return "menace d'exclusion"
    elif n_retards >= 9 or n_absences_inj >= 6:
        return "avertissement écrit"
    elif n_retards >= 6 or n_absences_inj >= 4:
        return "retenue samedi matin"
    elif n_retards >= 3 or n_absences_inj >= 2:
        return "retenue"
    else:
        return "rien"

sanction1 = sanctions_STX(4, 0)
sanction2 = sanctions_STX(2, 2)
print("Sanction du 1er élève :", sanction1)
print("Sanction du 2ème élève :", sanction2)
if sanction1 == sanction2:
    print("Deux mêmes sanctions...")

```
````


### Exercice {num1}`exercice`
Une fonction devient vraiment utile lorsqu'on la réutilise sur des données différentes. Écrivez
une fonction `moyenne` qui reçoit une **liste de nombres** en paramètre et qui **retourne** leur
moyenne. Utilisez-la ensuite, sans la réécrire, pour afficher successivement le prix moyen des
pizzas et la quantité moyenne commandée dans la base de données de la pizzeria.

```{exec} python
:after: pizzeria
:editor: 019a7c31-4d02-7f18-9a5e-2c6d41b0e5aa
def moyenne(liste):
    # Complétez le corps de la fonction

prix = execute_sql("SELECT prix FROM Pizza")
quantités = execute_sql("SELECT quantite FROM Commande")

# Appelez la fonction deux fois et affichez les deux résultats
```

````{solution}
```{exec} python
:linenos:
:after: pizzeria
def moyenne(liste):
    total = 0
    for valeur in liste:
        total = total + valeur
    return total / len(liste)

prix = execute_sql("SELECT prix FROM Pizza")
quantités = execute_sql("SELECT quantite FROM Commande")

print("Prix moyen d'une pizza :", moyenne(prix), "CHF")
print("Quantité moyenne par commande :", moyenne(quantités))
```
Le prix moyen est d'environ 18.33 CHF et la quantité moyenne d'environ 1.67 pizza par commande.

Remarquez que la fonction ne sait rien des pizzas : elle reçoit une liste de nombres et rend
leur moyenne, un point c'est tout. C'est ce qui permet de l'appeler deux fois sur des données
qui n'ont aucun rapport entre elles. Sans valeur de retour, il aurait fallu écrire deux fois le
même calcul.
````
