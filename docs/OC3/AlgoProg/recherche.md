<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Recherche et complexité

Un *algorithme de recherche* répond à la question suivante : une valeur se trouve-t-elle dans une liste, et si oui, à quelle position ? Par convention, les algorithmes de cette page retournent la **position** de la valeur si elle se trouve dans la liste, et `-1` sinon.

## La recherche linéaire
La méthode la plus simple consiste à parcourir la liste depuis le début et à comparer chaque élément à la valeur cherchée, jusqu'à la trouver ou jusqu'à arriver au bout de la liste.

```{exec} python
:linenos:
def recherche_lineaire(liste, valeur):
    for i in range(len(liste)):
        if liste[i] == valeur:
            return i
    return -1

nombres = [42, 7, 33, 15, 8, 61, 27, 50, 3, 19]
print(recherche_lineaire(nombres, 27))
print(recherche_lineaire(nombres, 100))
```

<div class="tri-visu" data-algo="lineaire" data-liste="42 7 33 15 8 61 27 50 3 19 36 24" data-cherche="27"></div>

## La complexité d'un algorithme
Pour comparer l'efficacité de deux algorithmes, on ne mesure pas leur durée en secondes, qui dépend de l'ordinateur. On compte plutôt le nombre d'opérations qu'ils effectuent (ici, des comparaisons) **en fonction de la taille $n$ de la liste**. C'est la *complexité* de l'algorithme.

Pour la recherche linéaire, ce nombre dépend de la position de la valeur cherchée :

- dans le **meilleur cas**, la valeur est le premier élément : une seule comparaison suffit ;
- dans le **pire cas**, la valeur est absente : il faut comparer les $n$ éléments.

On retient en général le pire cas. La recherche linéaire effectue donc jusqu'à $n$ comparaisons : si la liste devient 10 fois plus longue, il faut 10 fois plus de comparaisons. On dit qu'elle est en $O(n)$ (lire "grand O de $n$").

## La recherche dichotomique
Pour trouver un mot dans un dictionnaire, on ne lit pas les pages une par une : on ouvre le dictionnaire au milieu, on regarde si le mot se trouve avant ou après, puis on recommence dans la bonne moitié. C'est le principe de la *recherche dichotomique*, qui ne fonctionne que si la liste est **triée**.

On garde en mémoire la zone de la liste où la valeur peut encore se trouver, de la position `debut` à la position `fin`. À chaque étape, on compare l'élément du milieu de la zone à la valeur cherchée, ce qui permet d'éliminer la moitié de la zone :

```{code-block} text
:linenos:
debut ← 0
fin ← longueur de la liste - 1
Tant que debut ≤ fin :
    milieu ← (debut + fin) // 2
    Si liste[milieu] = valeur :
        Retourner milieu
    Sinon, si liste[milieu] < valeur :
        debut ← milieu + 1
    Sinon :
        fin ← milieu - 1
Retourner -1
```

L'opérateur `//` est la *division entière* : il donne le résultat de la division arrondi vers le bas (`7 // 2` vaut `3`). Lorsque `debut` dépasse `fin`, la zone est vide : la valeur n'est pas dans la liste.

Le tableau ci-dessous montre la recherche de `23` dans la liste `[2, 5, 8, 12, 16, 23, 38, 42, 56, 61, 72, 77, 85, 91, 99]`.

| Zone de recherche | Milieu | Comparaison | Conclusion |
| :---------------- | :----: | :---------: | :--------- |
| positions 0 à 14 | position 7 : `42` | `42 > 23` | la zone devient 0 à 6 |
| positions 0 à 6 | position 3 : `12` | `12 < 23` | la zone devient 4 à 6 |
| positions 4 à 6 | position 5 : `23` | `23 = 23` | trouvé en position 5 ! |

<div class="tri-visu" data-algo="dichotomie" data-liste="2 5 8 12 16 23 38 42 56 61 72 77 85 91 99" data-cherche="23"></div>

## À vous de jouer
Retrouvez la valeur indiquée en suivant **exactement** la recherche dichotomique : à chaque étape, cliquez sur l'élément du milieu de la zone de recherche, puis sur "Comparer".

<div class="tri-exo" data-algo="dichotomie" data-liste="3 8 12 17 21 25 30 34 41 47 52 58 63 70 76 84" data-cherche="63"></div>

## Programmer la recherche dichotomique
Traduisez le pseudo-code en Python en complétant la fonction ci-dessous. Exécutez ensuite la cellule de test : elle vérifie votre fonction sur plusieurs cas, dont les cas particuliers où un programme se trompe souvent (valeur au début ou à la fin de la liste, valeur absente, liste vide...).

```{exec} python
:name: recherche-dichotomique-eleve
:editor: 01a1e937-b281-7b94-9453-4c06150cf303
def recherche_dichotomique(liste, valeur):
    #Complétez le corps de la fonction

```

```{exec} python
:after: recherche-dichotomique-eleve
nombres = [2, 5, 8, 12, 16, 23, 38, 42, 56, 61, 72, 77, 85, 91, 99]

def teste(liste, valeur, attendu):
    obtenu = recherche_dichotomique(liste, valeur)
    if obtenu == attendu:
        print("Correct   : recherche de", valeur, "→", obtenu)
    else:
        print("INCORRECT : recherche de", valeur, "→", obtenu, "au lieu de", attendu)

teste(nombres, 23, 5)
teste(nombres, 2, 0)       # premier élément
teste(nombres, 99, 14)     # dernier élément
teste(nombres, 60, -1)     # valeur absente
teste(nombres, 1, -1)      # plus petite que toutes les valeurs
teste(nombres, 100, -1)    # plus grande que toutes les valeurs
teste([3, 8, 12, 17, 21, 25], 21, 4)    # nombre pair d'éléments
teste([7], 7, 0)           # un seul élément
teste([], 5, -1)           # liste vide
```

## Complexité de la recherche dichotomique
Chaque comparaison élimine la moitié de la zone. Pour une liste de 1000 éléments, la zone passe à 500 éléments, puis 250, 125, 62, 31, 15, 7, 3, 1 : il faut au plus 10 comparaisons. Le nombre de fois qu'on peut diviser $n$ par 2 avant d'arriver à 1 s'appelle le *logarithme en base 2* de $n$, noté $\log_2(n)$. La recherche dichotomique est en $O(\log n)$.

| Taille $n$ de la liste | Recherche linéaire (pire cas) | Recherche dichotomique (pire cas) |
| :--------------------: | :---------------------------: | :-------------------------------: |
| $1000$ | $1000$ | $10$ |
| $1\,000\,000$ | $1\,000\,000$ | $20$ |

## La notation grand O
La notation grand O résume la manière dont le nombre d'opérations grandit avec $n$. On ne garde que le terme qui grandit le plus vite, sans les constantes qui le multiplient : $3n + 5$ opérations s'écrit $O(n)$, et $\frac{n^2}{2}$ opérations s'écrit $O(n^2)$.

| Notation | Nom | $n = 1000$ | $n = 1\,000\,000$ |
| :------: | :-- | :--------: | :---------------: |
| $O(1)$ | constante | $1$ | $1$ |
| $O(\log n)$ | logarithmique | $10$ | $20$ |
| $O(n)$ | linéaire | $1000$ | $10^6$ |
| $O(n^2)$ | quadratique | $10^6$ | $10^{12}$ |

```{important}
Pour estimer la complexité d'un programme qui traite une liste de $n$ éléments :
- des instructions sans boucle, ou une boucle qui fait toujours le même nombre de tours (par exemple `range(10)`) : $O(1)$ ;
- une boucle dont la variable est multipliée (ou divisée) par 2 à chaque tour, jusqu'à atteindre $n$ : $O(\log n)$ ;
- une boucle qui parcourt la liste : $O(n)$ ;
- deux boucles qui parcourent la liste **l'une après l'autre** : $O(n) + O(n)$, c'est-à-dire toujours $O(n)$ ;
- deux boucles **imbriquées** qui parcourent la liste : $n \cdot n$ tours, c'est-à-dire $O(n^2)$.

Lorsque le nombre d'opérations dépend du contenu de la liste, on donne la complexité dans le **pire cas**.
```
