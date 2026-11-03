<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Algorithmes de recherche

## Qu'est-ce qu'un algorithme de recherche ?
Chercher un contact dans son téléphone, un mot dans un dictionnaire, un produit dans le catalogue d'un magasin en ligne : rechercher une information est l'une des tâches les plus fréquentes d'un ordinateur. Dans sa version la plus simple, le problème est le suivant : étant donné une liste et une valeur, la valeur se trouve-t-elle dans la liste, et si oui, à quelle position ?

Par convention, les fonctions de cette page retournent la **position** de la valeur dans la liste si elle s'y trouve, et `-1` sinon (`-1` ne pouvant pas être une position valide). Nous allons étudier deux algorithmes, et comparer leur complexité en comptant le nombre de **comparaisons** entre un élément de la liste et la valeur cherchée.

## La recherche linéaire
La méthode la plus naturelle consiste à parcourir la liste depuis le début et à comparer chaque élément à la valeur cherchée, jusqu'à la trouver ou jusqu'à arriver au bout de la liste. C'est la *recherche linéaire* (ou *séquentielle*).

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

Le `return i` placé dans la boucle arrête la fonction dès que la valeur est trouvée. Le `return -1` n'est atteint que si la boucle s'est terminée sans trouver la valeur.

<div class="tri-visu" data-algo="lineaire" data-liste="42 7 33 15 8 61 27 50 3 19 36 24" data-cherche="27"></div>

Comme on l'a vu dans la page sur la complexité, le nombre de comparaisons dépend de la position de la valeur cherchée :

- **meilleur cas** : la valeur est le premier élément, une seule comparaison suffit ;
- **pire cas** : la valeur est absente (ou en dernière position), il faut comparer les $n$ éléments.

La recherche linéaire est donc en $O(n)$. Son grand avantage : elle fonctionne sur **n'importe quelle** liste, triée ou non.

## La recherche dichotomique
Pour trouver un mot dans un dictionnaire papier, personne ne lit les pages une par une depuis le début ! On ouvre le dictionnaire vers le milieu, on regarde si le mot cherché se trouve avant ou après, puis on recommence dans la bonne moitié. C'est aussi la meilleure stratégie au jeu du Devin de 1{sup}`ère` année : en proposant toujours le milieu des nombres encore possibles, on élimine la moitié des possibilités à chaque essai.

Cette méthode, appelée *recherche dichotomique* (du grec *dikhotomia*, "couper en deux"), ne fonctionne que si la liste est **triée**. On garde en mémoire la zone de la liste où la valeur peut encore se trouver, délimitée par les positions `debut` et `fin`, et on répète les étapes suivantes :

```{code-block} text
:linenos:
Tant que la zone de recherche n'est pas vide :
    Comparer l'élément du milieu de la zone à la valeur cherchée
    S'il est égal à la valeur : la valeur est trouvée
    S'il est plus petit : la valeur ne peut être qu'à droite, la zone devient la moitié droite
    S'il est plus grand : la valeur ne peut être qu'à gauche, la zone devient la moitié gauche
Si la zone est vide : la valeur n'est pas dans la liste
```

Le tableau ci-dessous montre la recherche de `23` dans la liste `[2, 5, 8, 12, 16, 23, 38, 42, 56, 61, 72, 77, 85, 91, 99]`.

| Zone de recherche | Milieu | Comparaison | Conclusion |
| :---------------- | :----: | :---------: | :--------- |
| positions 0 à 14 | position 7 : `42` | `42 > 23` | la valeur est à gauche : la zone devient 0 à 6 |
| positions 0 à 6 | position 3 : `12` | `12 < 23` | la valeur est à droite : la zone devient 4 à 6 |
| positions 4 à 6 | position 5 : `23` | `23 = 23` | trouvé en position 5 ! |

Trois comparaisons suffisent, là où la recherche linéaire en aurait demandé six. Observez l'algorithme dans la visualisation ci-dessous, puis essayez avec une valeur absente.

<div class="tri-visu" data-algo="dichotomie" data-liste="2 5 8 12 16 23 38 42 56 61 72 77 85 91 99" data-cherche="23"></div>

Pour calculer la position du milieu, on a besoin d'un nombre **entier**. L'opérateur `//` effectue une *division entière* : il donne le résultat de la division, arrondi vers le bas (`7 // 2` vaut `3`). Le milieu de la zone de `debut` à `fin` est donc `(debut + fin) // 2`.

```{exec} python
:linenos:
def recherche_dichotomique(liste, valeur):
    debut = 0
    fin = len(liste) - 1
    while debut <= fin:
        milieu = (debut + fin) // 2
        if liste[milieu] == valeur:
            return milieu
        elif liste[milieu] < valeur:
            debut = milieu + 1
        else:
            fin = milieu - 1
    return -1

nombres = [2, 5, 8, 12, 16, 23, 38, 42, 56, 61, 72, 77, 85, 91, 99]
print(recherche_dichotomique(nombres, 23))
print(recherche_dichotomique(nombres, 60))
```

1. La zone de recherche contient les positions de `debut` à `fin`. Au départ, c'est toute la liste.
2. Si l'élément du milieu est plus petit que la valeur, toute la partie gauche (milieu compris) est éliminée : la zone commence désormais à `milieu + 1`. Dans le cas contraire, elle se termine à `milieu - 1`.
3. La boucle s'arrête lorsque la zone est vide, c'est-à-dire lorsque `debut` dépasse `fin` : la valeur n'est alors pas dans la liste.

## À vous de jouer
Retrouvez la valeur indiquée en suivant **exactement** la recherche dichotomique : à chaque étape, cliquez sur l'élément du milieu de la zone de recherche, puis sur "Comparer". Attention à bien calculer le milieu lorsque la zone contient un nombre pair d'éléments !

<div class="tri-exo" data-algo="dichotomie" data-liste="3 8 12 17 21 25 30 34 41 47 52 58 63 70 76 84" data-cherche="63"></div>

## Complexité
À chaque comparaison, la recherche dichotomique élimine **la moitié** de la zone de recherche. Pour une liste de 1000 éléments, la zone contient au plus 500 éléments après la première comparaison, puis 250, 125, 62, 31, 15, 7, 3, 1, et enfin plus aucun. Il faut donc au plus 10 comparaisons, même dans le pire cas.

Le nombre de fois qu'on peut diviser $n$ par 2 avant d'arriver à 1 s'appelle le *logarithme en base 2* de $n$, noté $\log_2(n)$. Par exemple, $\log_2(8) = 3$ car $2^3 = 8$, et $\log_2(1024) = 10$ car $2^{10} = 1024$. La recherche dichotomique effectue au plus environ $\log_2(n)$ comparaisons : elle est en $O(\log n)$.

Le logarithme grandit **extrêmement** lentement : quand la liste devient deux fois plus longue, il ne faut qu'**une** comparaison de plus.

| Taille $n$ de la liste | Recherche linéaire (pire cas) | Recherche dichotomique (pire cas) |
| :--------------------: | :---------------------------: | :-------------------------------: |
| $15$ | $15$ | $4$ |
| $1000$ | $1000$ | $10$ |
| $1\,000\,000$ | $1\,000\,000$ | $20$ |
| $8\,000\,000\,000$ (population mondiale) | $8\,000\,000\,000$ | $33$ |

Le programme ci-dessous compte les comparaisons des deux recherches, dans le pire cas (valeur absente), pour des listes triées de plus en plus grandes.

```{exec} python
:linenos:
def lineaire_compte(liste, valeur):
    nb_comparaisons = 0
    for i in range(len(liste)):
        nb_comparaisons = nb_comparaisons + 1
        if liste[i] == valeur:
            return nb_comparaisons
    return nb_comparaisons

def dichotomique_compte(liste, valeur):
    nb_comparaisons = 0
    debut = 0
    fin = len(liste) - 1
    while debut <= fin:
        milieu = (debut + fin) // 2
        nb_comparaisons = nb_comparaisons + 1
        if liste[milieu] == valeur:
            return nb_comparaisons
        elif liste[milieu] < valeur:
            debut = milieu + 1
        else:
            fin = milieu - 1
    return nb_comparaisons

for n in [10, 100, 1000, 10000, 100000]:
    liste = []
    for k in range(n):
        liste.append(2 * k)     # nombres pairs, déjà triés
    valeur = 2 * n + 1          # nombre impair : absent de la liste
    print(n, "éléments :", lineaire_compte(liste, valeur), "comparaisons (linéaire),",
          dichotomique_compte(liste, valeur), "comparaisons (dichotomique)")
```

```{important}
- Recherche linéaire : $O(n)$ dans le pire cas, mais fonctionne sur n'importe quelle liste.
- Recherche dichotomique : $O(\log n)$, mais la liste doit être **triée**.
- $\log_2(n)$ est le nombre de fois qu'on peut diviser $n$ par 2 avant d'arriver à 1 : il augmente de 1 seulement quand $n$ double.
```

La recherche dichotomique montre tout l'intérêt d'avoir une liste triée. Si l'on doit faire de nombreuses recherches dans la même liste, il vaut la peine de la trier une fois pour toutes. Encore faut-il savoir trier une liste efficacement : c'est l'objet des pages suivantes.

## Exercices

```{role} suite(quiz-input)
:right: width: 9rem;
:check: remove([^0-9])
```

```{role} nombre(quiz-input)
:right: width: 6rem;
:check: remove
```

### Exercice {num1}`exercice-algo`
On effectue des recherches dans la liste triée `[3, 8, 12, 17, 21, 25, 30, 34, 41, 47, 52]` (11 éléments). Répondez **sans exécuter** de programme. Pour les suites de valeurs, écrivez-les dans l'ordre, séparées par des espaces.

```{quiz}
:style: max-width: 42rem;
1. {suite}`25 41 30 34`
Avec la recherche dichotomique, quelles valeurs sont comparées à `34`, dans l'ordre ?

2. {nombre}`8`
Combien de comparaisons la recherche linéaire effectue-t-elle pour trouver `34` ?

3. {suite}`25 12 3 8`
Avec la recherche dichotomique, quelles valeurs sont comparées à `5`, qui est absent de la liste ?

4. {nombre}`-1`
Que retourne `recherche_dichotomique([9, 2, 7, 4, 1], 9)` ?
```

````{solution}
1. Zone 0 à 10 : milieu en position 5 (`25 < 34`), la zone devient 6 à 10. Milieu en position 8
   (`41 > 34`), la zone devient 6 à 7. Milieu en position $(6 + 7) // 2 = 6$ (`30 < 34`), la zone
   devient 7 à 7. Milieu en position 7 : `34`, trouvé !
2. **8** : `34` est en position 7, il faut donc comparer les 8 premiers éléments.
3. `25 > 5` (zone 0 à 4), `12 > 5` (zone 0 à 1), `3 < 5` (zone 1 à 1), `8 > 5` : la zone devient
   vide, `5` n'est pas dans la liste.
4. **-1**, alors que `9` est bien dans la liste ! Le milieu `7` est plus petit que `9`, donc
   l'algorithme élimine toute la partie gauche... qui contient justement le `9`. La recherche
   dichotomique ne donne un résultat correct que sur une liste **triée**.
````

### Exercice {num1}`exercice-algo`
Combien de comparaisons la recherche dichotomique effectue-t-elle **au maximum** pour une liste triée de la taille indiquée ?

```{quiz}
:style: max-width: 30rem;
1. {nombre}`7` 100 éléments
2. {nombre}`10` 1000 éléments
3. {nombre}`11` 2000 éléments
4. {nombre}`20` 1 000 000 éléments
```

````{solution}
1. **7** : dans le pire cas, les zones successives contiennent 100, 50, 25, 12, 6, 3 puis 1
   élément, avec une comparaison pour chacune. On a $2^6 = 64 < 100 < 128 = 2^7$.
2. **10** : voir la théorie.
3. **11** : une liste deux fois plus longue ne demande qu'**une** comparaison de plus.
4. **20** : $2^{20} = 1\,048\,576$, soit un peu plus d'un million.
````

### Exercice {num1}`exercice-algo`
Retrouvez la valeur indiquée avec la recherche dichotomique. Est-elle dans la liste ?

<div class="tri-exo" data-algo="dichotomie" data-liste="4 9 13 18 22 27 31 36 40 45 49 54 58 63 67 72 76 81 85 90" data-cherche="50"></div>

### Exercice {num1}`exercice-algo`
Chacune des fonctions ci-dessous devrait effectuer une recherche dichotomique, mais comporte **une erreur**. Exécutez-les pour observer le problème, puis corrigez-les.

1.  ```{exec} python
    :editor:
    def recherche_dichotomique(liste, valeur):
        debut = 0
        fin = len(liste) - 1
        while debut < fin:
            milieu = (debut + fin) // 2
            if liste[milieu] == valeur:
                return milieu
            elif liste[milieu] < valeur:
                debut = milieu + 1
            else:
                fin = milieu - 1
        return -1

    print(recherche_dichotomique([2, 5, 8, 12, 16], 16))    # devrait afficher 4
    ```

2.  ```{exec} python
    :editor:
    def recherche_dichotomique(liste, valeur):
        debut = 0
        fin = len(liste) - 1
        while debut <= fin:
            milieu = (debut + fin) / 2
            if liste[milieu] == valeur:
                return milieu
            elif liste[milieu] < valeur:
                debut = milieu + 1
            else:
                fin = milieu - 1
        return -1

    print(recherche_dichotomique([2, 5, 8, 12, 16], 16))    # devrait afficher 4
    ```

3.  ```{exec} python
    :editor:
    def recherche_dichotomique(liste, valeur):
        debut = 0
        fin = len(liste) - 1
        while debut <= fin:
            milieu = (debut + fin) // 2
            if liste[milieu] == valeur:
                return milieu
            elif liste[milieu] < valeur:
                fin = milieu - 1
            else:
                debut = milieu + 1
        return -1

    print(recherche_dichotomique([2, 5, 8, 12, 16], 16))    # devrait afficher 4
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    def recherche_dichotomique(liste, valeur):
        debut = 0
        fin = len(liste) - 1
        while debut <= fin:
            milieu = (debut + fin) // 2
            if liste[milieu] == valeur:
                return milieu
            elif liste[milieu] < valeur:
                debut = milieu + 1
            else:
                fin = milieu - 1
        return -1

    print(recherche_dichotomique([2, 5, 8, 12, 16], 16))
    ```
    Lorsque `debut` et `fin` sont égaux, la zone contient encore **un** élément, qui doit être
    comparé. Avec `debut < fin`, la boucle s'arrête trop tôt et ce dernier élément n'est jamais
    examiné.

2.  ```{exec} python
    :linenos:
    def recherche_dichotomique(liste, valeur):
        debut = 0
        fin = len(liste) - 1
        while debut <= fin:
            milieu = (debut + fin) // 2
            if liste[milieu] == valeur:
                return milieu
            elif liste[milieu] < valeur:
                debut = milieu + 1
            else:
                fin = milieu - 1
        return -1

    print(recherche_dichotomique([2, 5, 8, 12, 16], 16))
    ```
    L'opérateur `/` donne toujours un `float` (`4 / 2` vaut `2.0`), et un index de liste doit
    être un `int`. Il faut la division entière `//`.

3.  ```{exec} python
    :linenos:
    def recherche_dichotomique(liste, valeur):
        debut = 0
        fin = len(liste) - 1
        while debut <= fin:
            milieu = (debut + fin) // 2
            if liste[milieu] == valeur:
                return milieu
            elif liste[milieu] < valeur:
                debut = milieu + 1
            else:
                fin = milieu - 1
        return -1

    print(recherche_dichotomique([2, 5, 8, 12, 16], 16))
    ```
    Si l'élément du milieu est plus **petit** que la valeur cherchée, celle-ci se trouve à
    **droite** : c'est `debut` qu'il faut déplacer. Ici, les deux cas sont inversés, et la
    recherche part toujours du mauvais côté.
````

### Exercice {num1}`exercice-algo`
La recherche dichotomique ne sert pas qu'à chercher dans des listes : elle permet de trouver une valeur dans n'importe quel ensemble ordonné. Écrivez une fonction `racine_entiere(n)` qui retourne la *racine carrée entière* d'un entier $n \geq 0$, c'est-à-dire le plus grand entier $r$ tel que $r^2 \leq n$. Par exemple, la racine entière de 50 est 7, car $7^2 = 49 \leq 50$ mais $8^2 = 64 > 50$.

Plutôt que d'essayer tous les nombres un par un, cherchez $r$ par dichotomie entre `0` et `n` : si le carré du milieu est inférieur ou égal à $n$, le milieu est un candidat et la réponse se trouve à droite (lui compris) ; sinon, elle se trouve à gauche. Combien d'étapes faut-il pour $n = 1\,000\,000$ ?

```{exec} python
:editor: 01a18747-14da-7017-8ffc-eac34ca0dbc8
def racine_entiere(n):
    #Complétez le corps de la fonction

print(racine_entiere(50))         # 7
print(racine_entiere(144))        # 12
print(racine_entiere(1000000))    # 1000
```

````{solution}
```{exec} python
:linenos:
def racine_entiere(n):
    debut = 0
    fin = n
    resultat = 0
    while debut <= fin:
        milieu = (debut + fin) // 2
        if milieu * milieu <= n:
            resultat = milieu       # milieu est un candidat
            debut = milieu + 1      # on cherche s'il en existe un plus grand
        else:
            fin = milieu - 1
    return resultat

print(racine_entiere(50))         # 7
print(racine_entiere(144))        # 12
print(racine_entiere(1000000))    # 1000
```
1. Contrairement à la recherche dans une liste, on ne s'arrête pas dès qu'on trouve un candidat :
   on mémorise le meilleur candidat trouvé jusque-là dans `resultat`, et on continue à chercher
   s'il en existe un plus grand.
2. La zone de recherche contient au départ $n + 1$ nombres. Pour $n = 1\,000\,000$, il faut donc
   environ $\log_2(1\,000\,000) \approx 20$ étapes, au lieu d'un millier en essayant les nombres
   un par un à partir de 0.
````
