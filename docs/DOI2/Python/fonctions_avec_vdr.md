```{metadata}
solutions: dynamic
```
# Fonctions avec valeur de retour

## Qu'est-ce qu'une valeur de retour ?
Jusqu'à présent, le code d'une fonction était totalement indépendant du reste du programme. De ce fait, une valeur calculée dans une fonction ne pouvait pas être réutilisée dans une autre partie du programme. Par exemple, avec la fonction suivante, il n'est pas possible de trouver l'aire de deux triangles combinés.

```{exec} python
def aire_triangle(base, hauteur):
    aire = base * hauteur
    print(aire)

#Impossible d'additionner ces deux résultats
aire_triangle(5, 10)
aire_triangle(10, 13)
```

Avec une valeur de retour et le mot-clef `return`, il sera maintenant possibler de *retourner* une valeur calculée dans une fonction vers le programme principal. Celle-ci pourra ensuite être récupérée par exemple dans une variable comme ci-dessous.

```{exec} python
def aire_triangle(base, hauteur):
    aire = base * hauteur
    return aire

#Les valeurs de retour sont récupérées dans des variables
aire1 = aire_triangle(5, 10)
aire2 = aire_triangle(10, 13)

#On peut utiliser ces variables pour obtenir l'aire total
aire_totale = aire1 + aire2
print("Aire totale :", aire_totale)
```

## Exercices

### Exercice {num1}`exercice`
Chacun des programmes suivant comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


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
    n_chiens = int(input("Combien de chiens as-tu ?"))
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
Définissez une fonction nommée `sanctions_STX` permettant de déterminer les sanctions à STX en fonction du nombre de retard et du nombre d'absences injustifiées. Pour rappel les sanctions sont les suivantes : 
 - Au moins 3 retards ou 2 absences injustifiées : `retenue`
 - Au moins 6 retards ou 4 absences injustifiées : `retenue samedi matin`
 - Au moins 9 retards ou 6 absences injustifiées : `avertissement écrit`
 - Au moins 12 retards ou 8 absences injustifiées : `menace d'exclusion`
  - Au moins 15 retards ou 10 absences injustifiées : `exclusion`
  - En dessous de tout cela : `rien`

Utilisez ensuite la fonction pour déterminer les sanctions de 2 élèves : un ayant 4 retards et 0 absences injustifiées et l'autre avec 2 retards et 2 absences injustifiées.

Si les deux sanctions sont pareilles, votre programme affichera en plus : `Deux mêmes sanctions...`

```{exec} python
:editor: bd778a87-0aed-4285-b0de-519b3aef5d48

def sanctions_STX(n_retards, n_absences_inj):

```

````{solution}
```{exec} python
def sanctions_STX(n_retards, n_absences_inj):
    if n_retards >= 15 or n_absences_ing >= 10:
        return "exclusion"
    elif n_retards >= 12 or n_absences_ing >= 8:
        return "menace d'exclusion"
    elif n_retards >= 9 or n_absences_ing >= 6:
        return "avertissement"
    elif n_retards >= 6 or n_absences_ing >= 4:
        return "retenue samedi"
    elif n_retards >= 3 or n_absences_ing >= 2:
        return "retenue"
    else:
        return "rien"
sanction1 = sanction_STX(4, 0)
sanction2 = sanction_STX(2, 2)
if sanction1 == sanction2:
    print("Même sanction")

```
````