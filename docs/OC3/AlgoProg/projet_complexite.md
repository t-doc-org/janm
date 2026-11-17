<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Partie 1 : complexité de petits algorithmes

Avant d'étudier les algorithmes de tri, entraînez-vous à déterminer la complexité d'un algorithme en lisant son code. Toutes les règles nécessaires se trouvent dans la page [Recherche et complexité](recherche.md) : relisez en particulier la section « La notation grand O » et son encadré.

Répondez aux questions **sans exécuter** les programmes, sauf à la {numref}`question %s <question-tri:q-verif>`, dont le but est justement de vérifier vos réponses par l'expérience.

## Question {num1}`question-tri:q-complexite`
Donnez la complexité de chacune des fonctions ci-dessous, en fonction de la longueur $n$ de la liste reçue en paramètre, et justifiez chaque réponse en une ou deux phrases. Les complexités possibles sont $O(1)$, $O(\log n)$, $O(n)$ et $O(n^2)$.

1.  ```{code-block} python
    def premier_plus_dernier(liste):
        return liste[0] + liste[len(liste) - 1]
    ```

2.  ```{code-block} python
    def maximum(liste):
        maxi = liste[0]
        for valeur in liste:
            if valeur > maxi:
                maxi = valeur
        return maxi
    ```

3.  ```{code-block} python
    def affiche_somme_et_negatifs(liste):
        total = 0
        for valeur in liste:
            total = total + valeur
        nb_negatifs = 0
        for valeur in liste:
            if valeur < 0:
                nb_negatifs = nb_negatifs + 1
        print(total, nb_negatifs)
    ```

4.  ```{code-block} python
    def nb_paires_dix(liste):
        compteur = 0
        for a in liste:
            for b in liste:
                if a + b == 10:
                    compteur = compteur + 1
        return compteur
    ```

5.  ```{code-block} python
    def affiche_triple(liste):
        for valeur in liste:
            for k in range(3):
                print(valeur)
    ```

6.  ```{code-block} python
    def affiche_cent_fois(liste):
        for k in range(100):
            print(liste[0])
    ```

7.  ```{code-block} python
    def triangle(liste):
        for i in range(len(liste)):
            for j in range(i):
                print(liste[i], liste[j])
    ```

8.  ```{code-block} python
    def affiche_puissances_de_deux(liste):
        i = 1
        while i < len(liste):
            print(liste[i])
            i = i * 2
    ```

9.  Les deux listes reçues en paramètre ont la même longueur $n$. Réfléchissez bien à la manière dont Python vérifie qu'une valeur est `in` une liste.
    ```{code-block} python
    def elements_communs(liste1, liste2):
        communs = []
        for valeur in liste1:
            if valeur in liste2:
                communs.append(valeur)
        return communs
    ```

10. Donnez la complexité dans le meilleur cas **et** dans le pire cas, et décrivez une liste qui correspond à chacun des deux cas.
    ```{code-block} python
    def tous_positifs(liste):
        for valeur in liste:
            if valeur < 0:
                return False
        return True
    ```

## Question {num1}`question-tri:q-verif`
Vérifiez par l'expérience vos réponses à la {numref}`question %s <question-tri:q-complexite>` pour les fonctions `maximum` (2), `triangle` (7) et `affiche_puissances_de_deux` (8). Pour cela, ajoutez dans chacune de ces trois fonctions une variable `compteur`, qui vaut `0` au départ, augmente de 1 à chaque tour de la boucle **la plus intérieure**, et que la fonction retourne à la fin. Supprimez les `print` des fonctions : la fonction `triangle` afficherait près d'un demi-million de lignes pour une liste de 1000 éléments !

Appelez ensuite chaque fonction sur des listes aléatoires de 10, 100 et 1000 éléments, et présentez les résultats dans un tableau. Par combien le nombre de tours est-il multiplié quand la liste devient 10 fois plus longue ? Ces résultats sont-ils cohérents avec vos réponses à la {numref}`question %s <question-tri:q-complexite>` ?

```{exec} python
:editor: 01a1e844-f8b7-7a47-ba80-823364d0e2f1
from random import randint

def liste_aleatoire(n):
    liste = []
    for i in range(n):
        liste.append(randint(1, 100))
    return liste

# Écrivez ici vos trois fonctions modifiées


for n in [10, 100, 1000]:
    liste = liste_aleatoire(n)
    # Appelez ici vos trois fonctions et affichez les résultats
```

## Question {num1}`question-tri:q-temps`
On mesure la durée d'exécution de trois programmes :

- un programme en $O(n^2)$ met 2 secondes pour traiter une liste de 10 000 éléments ;
- un programme en $O(n)$ met lui aussi 2 secondes pour une liste de 10 000 éléments ;
- un programme en $O(\log n)$ met 2 secondes pour une liste de 1000 éléments.

Combien de temps environ faut-il aux deux premiers programmes pour une liste de 20 000 éléments ? Et pour une liste de 100 000 éléments ? Combien de temps faut-il au troisième programme pour une liste d'un million d'éléments ? Justifiez vos calculs.

```{admonition} Pour le rapport
:class: note
- **Question {numref}`%s <question-tri:q-complexite>`** : la complexité de chacune des 10 fonctions, avec sa justification (meilleur et pire cas pour la fonction 10).
- **Question {numref}`%s <question-tri:q-verif>`** : le code de vos trois fonctions modifiées, le tableau des résultats et votre analyse.
- **Question {numref}`%s <question-tri:q-temps>`** : les trois estimations, avec les calculs.
```
