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
La fonction ci-dessous permet de calculer et de retourner le périmètre d'un cercle. Appelez cette fonction 2x en récupérant la valeur de retour pour déterminer le périmètre total d'un cercle de rayon 3 et de rayon 5
```{exec} python
:editor: b26eb950-7938-4664-ba62-e7de3b0860e5
def périmètre_cercle(rayon):
    périmètre = 2 * 3.14159 * rayon
    return périmètre

#Complétez le code ici
```

### Exercice {num1}`exercice`
Le code ci-dessous fait appel à une fonction calculant et retournant un prix réduit de 20%. Définissez cette fonction et écrivez son corps.

```{exec} python
:editor: 27b156f5-3d04-41af-b2ed-20a0a8adbf5e

prix = 56
prix_réduit = réduction_20(prix)
print("Prix réduit :", prix_réduit, "CHF")
```