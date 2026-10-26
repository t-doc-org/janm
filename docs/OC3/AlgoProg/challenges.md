<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Challenges

Chaque challenge de cette page consiste à programmer un **mini-jeu** complet, jouable directement dans la page. Ensemble, ils mobilisent toutes les notions vues jusqu'ici : variables, entrées utilisateur, branchements, boucles, listes et fonctions. Contrairement aux exercices, un challenge ne vous dit pas quelle notion utiliser : à vous de choisir les bons outils et d'organiser votre programme. Les jeux sont classés par difficulté croissante, et la plupart se terminent par une partie *Pour aller plus loin* facultative.

Vous devez réaliser **deux défis à choix**. Sous le titre de chaque défi, le menu *Compétences travaillées* indique quelles notions il mobilise (un `✗` signale une notion absente du défi). Choisissez vos deux défis de manière à ce qu'ensemble, ils couvrent **toutes** les notions.

```{tip}
Avant de vous lancer dans le code, décrivez en français le déroulement d'une partie : qu'est-ce
qui se répète à chaque tour ? qu'est-ce qui ne se fait qu'une fois, au début ou à la fin ? quelles
informations le jeu doit-il garder en mémoire ?
```

## Quelques outils supplémentaires
Les mini-jeux ci-dessous utilisent trois petits outils qui prolongent ce que vous connaissez déjà.

**Le module `random`** permet d'introduire du hasard. La fonction `randint(a, b)` donne un nombre entier aléatoire entre `a` et `b` (**compris**). Pour tirer un élément d'une liste au hasard, il suffit de tirer son index. Exécutez le programme ci-dessous plusieurs fois.

```{exec} python
:linenos:
from random import randint

dé = randint(1, 6)
print("Le dé affiche", dé)

couleurs = ["rouge", "vert", "bleu"]
print("Couleur tirée au sort :", couleurs[randint(0, len(couleurs) - 1)])
```

**L'opérateur `not in`** est le contraire de `in` : il vaut `True` si l'élément ne fait **pas** partie de la liste.

```{exec} python
:linenos:
invités = ["Mila", "Loris", "Anja"]
if "Kilian" not in invités:
    print("Kilian n'est pas invité")
```

**Un `str` se manipule presque comme une liste de caractères.** On peut connaître sa longueur avec `len()`, le parcourir caractère par caractère avec un `for`, et tester si un caractère en fait partie avec `in`.

```{exec} python
:linenos:
mot = "Fribourg"
print(len(mot))       # 8 caractères
for lettre in mot:    # parcourt le texte caractère par caractère
    print(lettre)
if "o" in mot:
    print("Il y a un o dans", mot)
```

## Calcul mental

```{admonition} Compétences travaillées
:class: note dropdown
| Notion | Dans ce défi |
| :----- | :----------- |
| Variables et entrées utilisateur | calculs, `input()` avec conversion `int()` |
| Branchements conditionnels | `if` / `elif` / `else` |
| Boucles conditionnelles | ✗ |
| Listes et boucles for | `for ... in range()` (pas de liste) |
| Fonctions | ✗ |

**Pour aller plus loin** ajoute : une fonction avec paramètres et `return`, une liste et l'indexation.
```

Pour s'échauffer, programmez un jeu de calcul mental en **10 questions**. À chaque question, le jeu tire deux nombres au hasard entre 2 et 12 et demande leur produit. Le jeu compte les bonnes réponses, mais aussi la *série* en cours (le nombre de bonnes réponses d'affilée), et retient la meilleure série de la partie. À la fin, il affiche le score, la meilleure série, et un message qui dépend du score :

- 9 ou 10 : `Génie du calcul !`
- 6 à 8 : `Pas mal du tout !`
- 5 ou moins : `Il est temps de réviser tes livrets...`

```{code-block} text
Question 1 : 7 x 8 = ?
Ta réponse : <-- [56]
Juste ! Série en cours : 1
Question 2 : 12 x 4 = ?
Ta réponse : <-- [48]
Juste ! Série en cours : 2
Question 3 : 9 x 6 = ?
Ta réponse : <-- [56]
Faux, la réponse était 54
...
Score : 8 / 10 - meilleure série : 5
Pas mal du tout !
```

```{exec} python
:editor: 01a1630f-72bd-7922-ba61-29a15e4673b2
from random import randint

#Écrivez votre jeu ici
```

````{solution}
```{exec} python
:linenos:
from random import randint

score = 0
série = 0
meilleure_série = 0

for question in range(1, 11):
    a = randint(2, 12)
    b = randint(2, 12)
    print("Question", question, ":", a, "x", b, "= ?")
    réponse = int(input("Ta réponse :"))
    if réponse == a * b:
        score = score + 1
        série = série + 1
        if série > meilleure_série:
            meilleure_série = série
        print("Juste ! Série en cours :", série)
    else:
        série = 0
        print("Faux, la réponse était", a * b)

print("Score :", score, "/ 10 - meilleure série :", meilleure_série)
if score >= 9:
    print("Génie du calcul !")
elif score >= 6:
    print("Pas mal du tout !")
else:
    print("Il est temps de réviser tes livrets...")
```
1. Le nombre de questions étant connu à l'avance, une boucle `for` avec `range(1, 11)` est plus
   simple qu'un `while`. La variable `question` sert en plus à afficher le numéro de la question.
2. Les deux nombres sont tirés **dans** la boucle, pour qu'ils changent à chaque question.
3. Une mauvaise réponse remet la série à 0, mais pas la meilleure série : c'est pour cela qu'il
   faut deux variables différentes.
````

```{admonition} Pour aller plus loin
:class: tip
Rendez le jeu plus varié : à chaque question, l'opération est tirée au hasard parmi `+`, `-` et
`x`. Écrivez pour cela une fonction `calcule(a, b, opération)` qui retourne le résultat de
l'opération demandée.
```

````{solution} Solution du bonus
```{exec} python
:linenos:
from random import randint

def calcule(a, b, opération):
    if opération == "+":
        return a + b
    elif opération == "-":
        return a - b
    else:
        return a * b

opérations = ["+", "-", "x"]
score = 0
série = 0
meilleure_série = 0

for question in range(1, 11):
    a = randint(2, 12)
    b = randint(2, 12)
    opération = opérations[randint(0, 2)]
    print("Question", question, ":", a, opération, b, "= ?")
    réponse = int(input("Ta réponse :"))
    if réponse == calcule(a, b, opération):
        score = score + 1
        série = série + 1
        if série > meilleure_série:
            meilleure_série = série
        print("Juste ! Série en cours :", série)
    else:
        série = 0
        print("Faux, la réponse était", calcule(a, b, opération))

print("Score :", score, "/ 10 - meilleure série :", meilleure_série)
```
````

## Pierre, feuille, ciseaux

```{admonition} Compétences travaillées
:class: note dropdown
| Notion | Dans ce défi |
| :----- | :----------- |
| Variables et entrées utilisateur | `input()` (sans conversion), compteurs |
| Branchements conditionnels | `if` / `elif` / `else`, `and`, `or` |
| Boucles conditionnelles | `while` avec condition composée |
| Listes et boucles for | indexation, `in` |
| Fonctions | paramètres et `return` |

**Pour aller plus loin** ajoute : une liste de listes, `for ... in range(len())`.
```

Programmez une partie de pierre-feuille-ciseaux contre l'ordinateur, en **3 manches gagnantes**. Pour rappel, la pierre bat les ciseaux, les ciseaux battent la feuille, et la feuille bat la pierre.

1. Commencez par écrire une fonction `gagnant(coup_joueur, coup_ordi)` qui **retourne** `"joueur"`, `"ordi"` ou `"égalité"` selon les deux coups reçus en paramètres. Testez-la avant de continuer : `gagnant("pierre", "ciseaux")` doit retourner `"joueur"`.
2. Écrivez ensuite le programme principal. À chaque manche, l'utilisateur entre son coup, l'ordinateur joue un coup au hasard, et le score est mis à jour. Un coup qui n'est ni `pierre`, ni `feuille`, ni `ciseaux` est refusé. La partie s'arrête dès qu'un des deux joueurs atteint 3 points.

```{code-block} text
Ton coup ? <-- [pierre]
L'ordinateur joue ciseaux
Tu gagnes la manche ! Score : 1 - 0
Ton coup ? <-- [papier]
Coup invalide !
Ton coup ? <-- [feuille]
L'ordinateur joue feuille
Égalité ! Score : 1 - 0
...
Ton coup ? <-- [ciseaux]
L'ordinateur joue feuille
Tu gagnes la manche ! Score : 3 - 1
Bravo, tu remportes la partie !
```

```{exec} python
:editor: 01a1630f-72c0-70bc-9504-2f6764c1edc6
from random import randint

coups = ["pierre", "feuille", "ciseaux"]

def gagnant(coup_joueur, coup_ordi):
    #Complétez le corps de la fonction

#Écrivez le programme principal ici
```

````{solution}
```{exec} python
:linenos:
from random import randint

coups = ["pierre", "feuille", "ciseaux"]

def gagnant(coup_joueur, coup_ordi):
    if coup_joueur == coup_ordi:
        return "égalité"
    elif (coup_joueur == "pierre" and coup_ordi == "ciseaux") or (coup_joueur == "ciseaux" and coup_ordi == "feuille") or (coup_joueur == "feuille" and coup_ordi == "pierre"):
        return "joueur"
    else:
        return "ordi"

points_joueur = 0
points_ordi = 0

while points_joueur < 3 and points_ordi < 3:
    coup_joueur = input("Ton coup ?")
    if coup_joueur in coups:
        coup_ordi = coups[randint(0, 2)]
        print("L'ordinateur joue", coup_ordi)
        résultat = gagnant(coup_joueur, coup_ordi)
        if résultat == "joueur":
            points_joueur = points_joueur + 1
            print("Tu gagnes la manche ! Score :", points_joueur, "-", points_ordi)
        elif résultat == "ordi":
            points_ordi = points_ordi + 1
            print("L'ordinateur gagne la manche ! Score :", points_joueur, "-", points_ordi)
        else:
            print("Égalité ! Score :", points_joueur, "-", points_ordi)
    else:
        print("Coup invalide !")

if points_joueur == 3:
    print("Bravo, tu remportes la partie !")
else:
    print("Dommage, l'ordinateur remporte la partie...")
```
1. La fonction ne fait **que** décider du gagnant : elle n'affiche rien et ne modifie pas le
   score. Le programme principal récupère sa valeur de retour et s'occupe du reste.
2. Le coup de l'ordinateur est tiré en choisissant un index au hasard entre 0 et 2.
3. La boucle continue **tant que** personne n'a atteint 3 points : il faut donc que les deux
   scores soient inférieurs à 3, d'où le `and`.
````

```{admonition} Pour aller plus loin
:class: tip
Ajoutez un quatrième et un cinquième coup, comme dans la version *pierre-feuille-ciseaux-lézard-Spock* :
les ciseaux coupent la feuille, la feuille recouvre la pierre, la pierre écrase le lézard, le
lézard empoisonne Spock, Spock casse les ciseaux, les ciseaux décapitent le lézard, le lézard mange
la feuille, la feuille désavoue Spock, Spock vaporise la pierre, et la pierre écrase les ciseaux.
Quelle partie du programme faut-il modifier ? Pouvez-vous éviter d'écrire une condition géante ?
```

````{solution} Solution du bonus
```{exec} python
:linenos:
from random import randint

coups = ["pierre", "feuille", "ciseaux", "lézard", "spock"]

# victoires[i] contient la liste des coups battus par coups[i]
victoires = [["ciseaux", "lézard"],     # pierre
             ["pierre", "spock"],       # feuille
             ["feuille", "lézard"],     # ciseaux
             ["spock", "feuille"],      # lézard
             ["ciseaux", "pierre"]]     # spock

def gagnant(coup_joueur, coup_ordi):
    if coup_joueur == coup_ordi:
        return "égalité"
    for i in range(len(coups)):
        if coups[i] == coup_joueur:
            if coup_ordi in victoires[i]:
                return "joueur"
    return "ordi"

print(gagnant("spock", "pierre"))     # joueur
print(gagnant("lézard", "ciseaux"))   # ordi
print(gagnant("feuille", "feuille"))  # égalité
```
Seule la fonction `gagnant` doit changer : le programme principal reste identique, il suffit
d'ajouter les nouveaux coups dans la liste `coups` (et de remplacer `randint(0, 2)` par
`randint(0, len(coups) - 1)`). Plutôt que d'écrire dix conditions, on range les règles dans une
liste de listes : `victoires[i]` contient les coups battus par `coups[i]`.
````

## La chasse au trésor

```{admonition} Compétences travaillées
:class: note dropdown
| Notion | Dans ce défi |
| :----- | :----------- |
| Variables et entrées utilisateur | calculs, `input()` avec conversion `int()` |
| Branchements conditionnels | `if` / `elif` / `else`, `and` |
| Boucles conditionnelles | `while` avec condition composée |
| Listes et boucles for | ✗ |
| Fonctions | paramètres et `return` (plusieurs `return`) |

**Pour aller plus loin** ajoute : listes (`append`, indexation), `for ... in range(len())`, boucles imbriquées.
```

Un trésor est enterré sur une île de 10 x 10 cases. Sa position (une colonne et une ligne entre 1 et 10) est tirée au hasard au début de la partie. Le joueur dispose de **6 pelles** : à chaque essai, il choisit une case où creuser. S'il ne trouve pas le trésor, le jeu lui donne un indice selon la *distance* qui le sépare du trésor, c'est-à-dire le nombre de cases à parcourir horizontalement **plus** le nombre de cases à parcourir verticalement :

| Distance | Indice |
| :------: | :----- |
| 1 ou 2 | `Brûlant !` |
| 3 ou 4 | `Chaud` |
| 5 à 7 | `Tiède` |
| 8 et plus | `Froid` |

Votre programme contiendra au moins deux fonctions : `valeur_absolue(nombre)` (la même que dans la page sur les fonctions), qui permet de calculer les écarts sans se soucier de leur signe, et `indice(distance)`, qui retourne le texte de l'indice.

```{code-block} text
Un trésor est caché sur une île de 10 x 10 cases. Tu as 6 pelles.
Colonne (1 à 10) : <-- [5]
Ligne (1 à 10) : <-- [5]
Tiède - il te reste 5 pelle(s)
Colonne (1 à 10) : <-- [8]
Ligne (1 à 10) : <-- [5]
Chaud - il te reste 4 pelle(s)
Colonne (1 à 10) : <-- [8]
Ligne (1 à 10) : <-- [2]
Brûlant ! - il te reste 3 pelle(s)
Colonne (1 à 10) : <-- [9]
Ligne (1 à 10) : <-- [2]
Trésor trouvé ! Tu es riche !
```

```{exec} python
:editor: 01a1630f-72c2-7a33-8469-099f2c361169
from random import randint

trésor_x = randint(1, 10)
trésor_y = randint(1, 10)

#Écrivez votre jeu ici
```

````{solution}
```{exec} python
:linenos:
from random import randint

def valeur_absolue(nombre):
    if nombre >= 0:
        return nombre
    return -nombre

def indice(distance):
    if distance <= 2:
        return "Brûlant !"
    elif distance <= 4:
        return "Chaud"
    elif distance <= 7:
        return "Tiède"
    else:
        return "Froid"

trésor_x = randint(1, 10)
trésor_y = randint(1, 10)
pelles = 6
trouvé = False

print("Un trésor est caché sur une île de 10 x 10 cases. Tu as", pelles, "pelles.")
while pelles > 0 and trouvé == False:
    x = int(input("Colonne (1 à 10) :"))
    y = int(input("Ligne (1 à 10) :"))
    pelles = pelles - 1
    distance = valeur_absolue(x - trésor_x) + valeur_absolue(y - trésor_y)
    if distance == 0:
        trouvé = True
    else:
        print(indice(distance), "- il te reste", pelles, "pelle(s)")

if trouvé:
    print("Trésor trouvé ! Tu es riche !")
else:
    print("Plus de pelles... Le trésor était en colonne", trésor_x, "ligne", trésor_y)
```
1. La partie peut s'arrêter pour deux raisons : le trésor est trouvé, ou il n'y a plus de pelles.
   La condition du `while` combine donc les deux avec un `and`, et un `if` après la boucle
   détermine laquelle des deux s'est produite.
2. La variable `trouvé` est un booléen qui passe à `True` lorsque la distance vaut 0.
3. Sans valeur absolue, un écart de `-3` et un écart de `+3` ne donneraient pas la même distance,
   alors que le trésor est aussi loin dans les deux cas.
````

```{admonition} Pour aller plus loin
:class: tip
Avant chaque essai, affichez la carte de l'île, avec un `X` sur les cases déjà creusées et un `.`
sur les autres. Pour vous souvenir des trous, rangez leurs colonnes et leurs lignes dans deux
listes `trous_x` et `trous_y`.
```

````{solution} Solution du bonus
```{exec} python
:linenos:
from random import randint

def valeur_absolue(nombre):
    if nombre >= 0:
        return nombre
    return -nombre

def indice(distance):
    if distance <= 2:
        return "Brûlant !"
    elif distance <= 4:
        return "Chaud"
    elif distance <= 7:
        return "Tiède"
    else:
        return "Froid"

trous_x = []
trous_y = []

def creusé(x, y):
    for i in range(len(trous_x)):
        if trous_x[i] == x and trous_y[i] == y:
            return True
    return False

def affiche_carte():
    for y in range(1, 11):
        ligne = ""
        for x in range(1, 11):
            if creusé(x, y):
                ligne = ligne + "X "
            else:
                ligne = ligne + ". "
        print(ligne)

trésor_x = randint(1, 10)
trésor_y = randint(1, 10)
pelles = 6
trouvé = False

while pelles > 0 and trouvé == False:
    affiche_carte()
    x = int(input("Colonne (1 à 10) :"))
    y = int(input("Ligne (1 à 10) :"))
    trous_x.append(x)
    trous_y.append(y)
    pelles = pelles - 1
    distance = valeur_absolue(x - trésor_x) + valeur_absolue(y - trésor_y)
    if distance == 0:
        trouvé = True
    else:
        print(indice(distance), "- il te reste", pelles, "pelle(s)")

if trouvé:
    print("Trésor trouvé ! Tu es riche !")
else:
    print("Plus de pelles... Le trésor était en colonne", trésor_x, "ligne", trésor_y)
```
Le trou numéro `i` se trouve en colonne `trous_x[i]` et en ligne `trous_y[i]`. La carte est
construite ligne par ligne grâce à une boucle dans une boucle : la boucle extérieure parcourt
les lignes, la boucle intérieure ajoute un caractère par colonne à la variable `ligne`.
````

## Le Loto

```{admonition} Compétences travaillées
:class: note dropdown
| Notion | Dans ce défi |
| :----- | :----------- |
| Variables et entrées utilisateur | `input()` avec conversion `int()` |
| Branchements conditionnels | `if` / `elif` / `else`, `or` |
| Boucles conditionnelles | `while` |
| Listes et boucles for | `append`, `len()`, indexation, `in`, `not in`, `for ... in liste` |
| Fonctions | ✗ |

**Pour aller plus loin** ajoute : fonctions avec paramètres et `return` (dont une qui retourne une liste).
```

Au Swiss Loto, le joueur choisit 6 numéros différents entre 1 et 42, puis 6 numéros sont tirés au sort. Plus le joueur a de bons numéros, plus il gagne d'argent. Programmez une grille de Loto :

1. Le joueur entre ses 6 numéros un par un. Un numéro hors de la plage 1 à 42, ou déjà choisi, est refusé.
2. Le jeu tire 6 numéros **différents** au hasard.
3. Le jeu affiche le tirage, les bons numéros du joueur et son gain, grâce à la liste `gains` : `gains[n]` est le gain (en CHF) pour `n` bons numéros.

```{code-block} text
Choisis un numéro entre 1 et 42 : <-- [7]
Choisis un numéro entre 1 et 42 : <-- [13]
Choisis un numéro entre 1 et 42 : <-- [13]
Tu as déjà choisi ce numéro !
Choisis un numéro entre 1 et 42 : <-- [50]
Ce numéro n'existe pas !
Choisis un numéro entre 1 et 42 : <-- [21]
Choisis un numéro entre 1 et 42 : <-- [30]
Choisis un numéro entre 1 et 42 : <-- [38]
Choisis un numéro entre 1 et 42 : <-- [42]
Tes numéros : [7, 13, 21, 30, 38, 42]
Tirage : [30, 2, 13, 41, 7, 19]
Tes bons numéros : [7, 13, 30]
Tu gagnes 10 CHF
```

```{exec} python
:editor: 01a1630f-72c4-7ba5-8a16-581e192423f1
from random import randint

gains = [0, 0, 0, 10, 100, 5000, 1000000]

#Écrivez votre jeu ici
```

````{solution}
```{exec} python
:linenos:
from random import randint

gains = [0, 0, 0, 10, 100, 5000, 1000000]

# 1. Choix des numéros du joueur
mes_numéros = []
while len(mes_numéros) < 6:
    n = int(input("Choisis un numéro entre 1 et 42 :"))
    if n < 1 or n > 42:
        print("Ce numéro n'existe pas !")
    elif n in mes_numéros:
        print("Tu as déjà choisi ce numéro !")
    else:
        mes_numéros.append(n)
print("Tes numéros :", mes_numéros)

# 2. Tirage au sort
tirage = []
while len(tirage) < 6:
    n = randint(1, 42)
    if n not in tirage:
        tirage.append(n)
print("Tirage :", tirage)

# 3. Bons numéros et gain
bons = []
for n in mes_numéros:
    if n in tirage:
        bons.append(n)
print("Tes bons numéros :", bons)
print("Tu gagnes", gains[len(bons)], "CHF")
```
1. On ne sait pas à l'avance combien de numéros le joueur va entrer (il peut se tromper) : on
   répète donc **tant que** la liste ne contient pas 6 numéros.
2. Le tirage suit exactement la même logique : un numéro tiré qui est déjà sorti est simplement
   ignoré, et on recommence jusqu'à en avoir 6.
3. Le nombre de bons numéros sert directement d'index dans la liste `gains`.
````

```{admonition} Pour aller plus loin
:class: tip
Un joueur décide de jouer les mêmes numéros chaque semaine, à 2.50 CHF la grille, jusqu'à obtenir
**au moins 5 bons numéros**. Simulez cette situation : combien de semaines (et d'années) faut-il
attendre, et combien d'argent le joueur a-t-il dépensé ? Pour éviter de réécrire du code, créez
une fonction `tire_numéros()` qui retourne un tirage, et une fonction `nb_bons(mes_numéros,
tirage)` qui retourne le nombre de bons numéros. Exécutez le programme plusieurs fois.
```

````{solution} Solution du bonus
```{exec} python
:linenos:
from random import randint

def tire_numéros():
    tirage = []
    while len(tirage) < 6:
        n = randint(1, 42)
        if n not in tirage:
            tirage.append(n)
    return tirage

def nb_bons(mes_numéros, tirage):
    nombre = 0
    for n in mes_numéros:
        if n in tirage:
            nombre = nombre + 1
    return nombre

mes_numéros = [7, 13, 21, 30, 38, 42]
semaines = 1
while nb_bons(mes_numéros, tire_numéros()) < 5:
    semaines = semaines + 1

print("Il a fallu", semaines, "semaines, soit environ", int(semaines / 52), "ans.")
print("Argent dépensé :", semaines * 2.5, "CHF")
```
En moyenne, il faut attendre plus de 24 000 semaines, soit environ 465 ans... pour un gain de
5000 CHF.
````

## Le jeu du cochon

```{admonition} Compétences travaillées
:class: note dropdown
| Notion | Dans ce défi |
| :----- | :----------- |
| Variables et entrées utilisateur | `input()` (sans conversion), compteurs |
| Branchements conditionnels | `if` / `else`, `and` |
| Boucles conditionnelles | `while` |
| Listes et boucles for | ✗ |
| Fonctions | fonctions sans paramètre, `return` qui interrompt la fonction |

**Pour aller plus loin** ajoute : un paramètre de fonction.
```

Le *jeu du cochon* est un jeu de dés qui se joue à deux, ici contre l'ordinateur. Le premier à atteindre **50 points** gagne. À son tour, un joueur lance un dé autant de fois qu'il le souhaite, et additionne les résultats :

- s'il décide de s'arrêter, il *garde* les points de son tour, qui s'ajoutent à son score ;
- mais s'il fait un **1**, il perd tous les points de son tour, et c'est au tour de l'adversaire !

Tout l'intérêt du jeu est donc de savoir quand s'arrêter. L'ordinateur, lui, suit une stratégie simple : il relance tant que le total de son tour est inférieur à 15.

Votre programme contiendra deux fonctions : `tour_joueur()` et `tour_ordi()`, qui jouent chacune un tour complet et **retournent** le nombre de points gagnés pendant ce tour.

```{code-block} text
*** Ton tour *** Score : 0 contre 0
Tu fais 4 - total du tour : 4
Relancer (l) ou garder (g) ? <-- [l]
Tu fais 6 - total du tour : 10
Relancer (l) ou garder (g) ? <-- [g]
*** Tour de l'ordinateur ***
L'ordinateur fait 3 - total du tour : 3
L'ordinateur fait 1 et perd les points de ce tour !
*** Ton tour *** Score : 10 contre 0
Tu fais 1... tu perds les points de ce tour !
*** Tour de l'ordinateur ***
...
Bravo, tu gagnes 52 à 41 !
```

```{exec} python
:editor: 01a1630f-72c6-750f-8c63-905d4c09bf75
from random import randint

def tour_joueur():
    #Complétez le corps de la fonction

def tour_ordi():
    #Complétez le corps de la fonction

#Écrivez le programme principal ici
```

````{solution}
```{exec} python
:linenos:
from random import randint

def tour_joueur():
    total_tour = 0
    choix = "l"
    while choix == "l":
        dé = randint(1, 6)
        if dé == 1:
            print("Tu fais 1... tu perds les points de ce tour !")
            return 0
        total_tour = total_tour + dé
        print("Tu fais", dé, "- total du tour :", total_tour)
        choix = input("Relancer (l) ou garder (g) ?")
    return total_tour

def tour_ordi():
    total_tour = 0
    while total_tour < 15:
        dé = randint(1, 6)
        if dé == 1:
            print("L'ordinateur fait 1 et perd les points de ce tour !")
            return 0
        total_tour = total_tour + dé
        print("L'ordinateur fait", dé, "- total du tour :", total_tour)
    print("L'ordinateur garde ses", total_tour, "points.")
    return total_tour

score_joueur = 0
score_ordi = 0

while score_joueur < 50 and score_ordi < 50:
    print("*** Ton tour *** Score :", score_joueur, "contre", score_ordi)
    score_joueur = score_joueur + tour_joueur()
    if score_joueur < 50:
        print("*** Tour de l'ordinateur ***")
        score_ordi = score_ordi + tour_ordi()

if score_joueur >= 50:
    print("Bravo, tu gagnes", score_joueur, "à", score_ordi, "!")
else:
    print("L'ordinateur gagne", score_ordi, "à", score_joueur, "...")
```
1. Le `return 0` à l'intérieur de la boucle met immédiatement fin au tour quand le dé tombe sur
   1 : les points accumulés sont perdus, et la suite de la fonction n'est jamais exécutée.
2. Les fonctions ne modifient pas les scores elles-mêmes : elles retournent les points du tour,
   et c'est le programme principal qui les ajoute au bon score.
3. Le `if score_joueur < 50` évite que l'ordinateur joue encore un tour alors que le joueur a
   déjà gagné.
````

```{admonition} Pour aller plus loin
:class: tip
L'ordinateur n'est pas très malin : même lorsque les points de son tour lui suffisent déjà pour
atteindre 50, il continue à relancer jusqu'à 15 et risque de tout perdre. Donnez à la fonction
`tour_ordi` un paramètre `score` (son score actuel), et faites-le s'arrêter dès que
`score + total_tour` atteint 50.
```

````{solution} Solution du bonus
```{exec} python
:linenos:
from random import randint

def tour_ordi(score):
    total_tour = 0
    while total_tour < 15 and score + total_tour < 50:
        dé = randint(1, 6)
        if dé == 1:
            print("L'ordinateur fait 1 et perd les points de ce tour !")
            return 0
        total_tour = total_tour + dé
        print("L'ordinateur fait", dé, "- total du tour :", total_tour)
    print("L'ordinateur garde ses", total_tour, "points.")
    return total_tour

print(tour_ordi(45))   # l'ordinateur s'arrête dès qu'il a au moins 5 points
```
Dans le programme principal, l'appel devient alors `score_ordi = score_ordi + tour_ordi(score_ordi)`.
````

## Le pendu

```{admonition} Compétences travaillées
:class: note dropdown
| Notion | Dans ce défi |
| :----- | :----------- |
| Variables et entrées utilisateur | `input()` (sans conversion) |
| Branchements conditionnels | `if` / `elif` / `else`, `and` |
| Boucles conditionnelles | `while` avec condition composée |
| Listes et boucles for | `append`, indexation, `in`, `not in`, `for ... in` (sur un `str`) |
| Fonctions | paramètres et `return` (dont un `return` dans une boucle) |

**Pour aller plus loin** ajoute : `len()` sur un `str`, `for ... in range()`.
```

Programmez le jeu du pendu. L'ordinateur choisit un mot au hasard dans une liste, et le joueur doit le deviner en proposant des lettres une par une. À chaque tour, le jeu affiche le mot avec les lettres déjà trouvées et des `_` à la place des autres. Le joueur a droit à **7 erreurs** ; une lettre déjà proposée ne compte pas comme une erreur, mais le jeu le signale.

Votre programme contiendra deux fonctions :

- `mot_masqué(mot, lettres)` qui **retourne** le mot à afficher, par exemple `"_ r _ _ o _ r _ "` pour le mot `fribourg` si les lettres proposées sont `["r", "o", "z"]` ;
- `mot_trouvé(mot, lettres)` qui **retourne** `True` si toutes les lettres du mot ont été trouvées, et `False` sinon.

```{code-block} text
_ _ _ _ _ _ - vies : 7
Propose une lettre : <-- [e]
Raté !
_ _ _ _ _ _ - vies : 6
Propose une lettre : <-- [o]
Bien vu !
_ _ _ _ o _ - vies : 6
Propose une lettre : <-- [o]
Tu as déjà proposé cette lettre !
_ _ _ _ o _ - vies : 6
...
Bravo, le mot était bien python
```

```{exec} python
:editor: 01a1630f-72c8-79cd-9332-c55763945a30
from random import randint

mots = ["python", "fribourg", "ordinateur", "fondue", "clavier", "girafe", "chocolat", "trampoline"]
mot = mots[randint(0, len(mots) - 1)]

def mot_masqué(mot, lettres):
    #Complétez le corps de la fonction

def mot_trouvé(mot, lettres):
    #Complétez le corps de la fonction

#Écrivez le programme principal ici
```

````{solution}
```{exec} python
:linenos:
from random import randint

mots = ["python", "fribourg", "ordinateur", "fondue", "clavier", "girafe", "chocolat", "trampoline"]
mot = mots[randint(0, len(mots) - 1)]

def mot_masqué(mot, lettres):
    résultat = ""
    for lettre in mot:
        if lettre in lettres:
            résultat = résultat + lettre + " "
        else:
            résultat = résultat + "_ "
    return résultat

def mot_trouvé(mot, lettres):
    for lettre in mot:
        if lettre not in lettres:
            return False
    return True

lettres_proposées = []
vies = 7

while vies > 0 and mot_trouvé(mot, lettres_proposées) == False:
    print(mot_masqué(mot, lettres_proposées) + "- vies :", vies)
    lettre = input("Propose une lettre :")
    if lettre in lettres_proposées:
        print("Tu as déjà proposé cette lettre !")
    else:
        lettres_proposées.append(lettre)
        if lettre in mot:
            print("Bien vu !")
        else:
            vies = vies - 1
            print("Raté !")

if vies > 0:
    print("Bravo, le mot était bien", mot)
else:
    print("Pendu ! Le mot était", mot)
```
1. `mot_masqué` construit le texte à afficher caractère par caractère, en partant d'un texte vide
   `""` auquel on ajoute soit la lettre, soit un `_`.
2. Dans `mot_trouvé`, il suffit d'**une seule** lettre non trouvée pour que le mot ne soit pas
   trouvé : la fonction retourne alors `False` immédiatement. Elle ne retourne `True` qu'après
   avoir vérifié toutes les lettres, donc **après** la boucle.
3. Toutes les lettres proposées sont rangées dans la même liste, qu'elles soient bonnes ou non :
   c'est ce qui permet de détecter les lettres déjà proposées.
````

```{admonition} Pour aller plus loin
:class: tip
Ajoutez un mode **deux joueurs** : au début de la partie, le premier joueur entre le mot à faire
deviner, puis le programme affiche 30 lignes vides pour le cacher avant que le second joueur ne
commence. Refusez aussi les propositions qui ne font pas exactement une lettre.
```

````{solution} Solution du bonus
```{exec} python
:linenos:
def mot_masqué(mot, lettres):
    résultat = ""
    for lettre in mot:
        if lettre in lettres:
            résultat = résultat + lettre + " "
        else:
            résultat = résultat + "_ "
    return résultat

def mot_trouvé(mot, lettres):
    for lettre in mot:
        if lettre not in lettres:
            return False
    return True

mot = input("Joueur 1, entre le mot à faire deviner :")
for i in range(30):
    print()

lettres_proposées = []
vies = 7

while vies > 0 and mot_trouvé(mot, lettres_proposées) == False:
    print(mot_masqué(mot, lettres_proposées) + "- vies :", vies)
    lettre = input("Joueur 2, propose une lettre :")
    if len(lettre) != 1:
        print("Propose exactement une lettre !")
    elif lettre in lettres_proposées:
        print("Tu as déjà proposé cette lettre !")
    else:
        lettres_proposées.append(lettre)
        if lettre in mot:
            print("Bien vu !")
        else:
            vies = vies - 1
            print("Raté !")

if vies > 0:
    print("Bravo, le mot était bien", mot)
else:
    print("Pendu ! Le mot était", mot)
```
1. Le mot n'est plus tiré au hasard : la ligne qui le choisissait est remplacée par un `input`,
   et l'import de `randint` devient inutile.
2. Un `print()` sans paramètre affiche une ligne vide : la boucle `for` en affiche 30 pour faire
   disparaître le mot de l'écran.
3. Le contrôle de la longueur est placé **en premier** : une proposition invalide n'est ni
   ajoutée à la liste, ni comptée comme une erreur.
````

## Le blackjack

```{admonition} Compétences travaillées
:class: note dropdown
| Notion | Dans ce défi |
| :----- | :----------- |
| Variables et entrées utilisateur | `input()` (sans conversion) |
| Branchements conditionnels | `if` / `elif` / `else`, `and`, `or` |
| Boucles conditionnelles | `while` |
| Listes et boucles for | `append`, `for ... in liste` |
| Fonctions | paramètres et `return` |

**Pour aller plus loin** ajoute : `input()` avec conversion `int()`, une boucle `while` imbriquée.
```

Au blackjack, le but est d'obtenir un total de cartes le plus proche possible de 21, **sans le dépasser**. Programmez une version simplifiée, dans laquelle chaque carte tirée vaut entre 1 et 10 (les valets, dames et rois valent 10, l'as vaut toujours 1) :

1. Le joueur reçoit deux cartes. Tant que son total est inférieur à 21, il peut demander une carte supplémentaire. S'il dépasse 21, il perd immédiatement.
2. Sinon, c'est au tour du croupier : il reçoit deux cartes, puis tire des cartes **tant que** son total est inférieur à 17.
3. Si le croupier dépasse 21, ou si le joueur a un meilleur total, le joueur gagne. En cas de totaux égaux, il y a égalité.

Votre programme contiendra au moins deux fonctions : `tire_carte()`, qui retourne la valeur d'une carte tirée au hasard, et `total(main)`, qui retourne le total d'une liste de cartes.

```{code-block} text
Tes cartes : [7, 10] - total : 17
Une autre carte ? (o/n) <-- [o]
Tes cartes : [7, 10, 3] - total : 20
Une autre carte ? (o/n) <-- [n]
Cartes du croupier : [10, 4, 5] - total : 19
Tu as gagné !
```

```{exec} python
:editor: 01a1630f-72cb-706e-95ac-b74dc8c32889
from random import randint

def tire_carte():
    #Une carte entre 1 et 13 (as, 2 à 10, valet, dame, roi)
    carte = randint(1, 13)
    #Complétez le corps de la fonction

def total(main):
    #Complétez le corps de la fonction

#Écrivez le programme principal ici
```

````{solution}
```{exec} python
:linenos:
from random import randint

def tire_carte():
    #Une carte entre 1 et 13 (as, 2 à 10, valet, dame, roi)
    carte = randint(1, 13)
    if carte > 10:
        return 10
    return carte

def total(main):
    somme = 0
    for carte in main:
        somme = somme + carte
    return somme

# Tour du joueur
main_joueur = [tire_carte(), tire_carte()]
print("Tes cartes :", main_joueur, "- total :", total(main_joueur))
choix = "o"
while choix == "o" and total(main_joueur) < 21:
    choix = input("Une autre carte ? (o/n)")
    if choix == "o":
        main_joueur.append(tire_carte())
        print("Tes cartes :", main_joueur, "- total :", total(main_joueur))

# Tour du croupier et résultat
if total(main_joueur) > 21:
    print("Tu dépasses 21, tu as perdu !")
else:
    main_croupier = [tire_carte(), tire_carte()]
    while total(main_croupier) < 17:
        main_croupier.append(tire_carte())
    print("Cartes du croupier :", main_croupier, "- total :", total(main_croupier))
    if total(main_croupier) > 21 or total(main_joueur) > total(main_croupier):
        print("Tu as gagné !")
    elif total(main_joueur) == total(main_croupier):
        print("Égalité !")
    else:
        print("Le croupier gagne...")
```
1. Les cartes de chaque joueur sont rangées dans une **liste**, que l'on complète avec `append`
   à chaque nouvelle carte. La fonction `total` permet de recalculer le total à tout moment.
2. Les valets, dames et rois correspondent aux valeurs 11, 12 et 13 tirées par `randint` : le
   `if` de `tire_carte` les ramène à 10.
3. Le croupier ne joue que si le joueur n'a pas dépassé 21 : dans le cas contraire, la partie est
   déjà perdue.
````

```{admonition} Pour aller plus loin
:class: tip
Ajoutez des **jetons** : le joueur commence avec 100 jetons. Avant chaque manche, il mise un
certain nombre de jetons (pas plus que ce qu'il possède). S'il gagne la manche, il remporte sa
mise ; s'il perd, il la perd. Le jeu enchaîne les manches jusqu'à ce que le joueur n'ait plus de
jetons ou décide d'arrêter. Indice : placez une manche complète dans une fonction `manche()` qui
retourne `"joueur"`, `"croupier"` ou `"égalité"`.
```

````{solution} Solution du bonus
```{exec} python
:linenos:
from random import randint

def tire_carte():
    carte = randint(1, 13)
    if carte > 10:
        return 10
    return carte

def total(main):
    somme = 0
    for carte in main:
        somme = somme + carte
    return somme

def manche():
    main_joueur = [tire_carte(), tire_carte()]
    print("Tes cartes :", main_joueur, "- total :", total(main_joueur))
    choix = "o"
    while choix == "o" and total(main_joueur) < 21:
        choix = input("Une autre carte ? (o/n)")
        if choix == "o":
            main_joueur.append(tire_carte())
            print("Tes cartes :", main_joueur, "- total :", total(main_joueur))

    if total(main_joueur) > 21:
        print("Tu dépasses 21 !")
        return "croupier"

    main_croupier = [tire_carte(), tire_carte()]
    while total(main_croupier) < 17:
        main_croupier.append(tire_carte())
    print("Cartes du croupier :", main_croupier, "- total :", total(main_croupier))
    if total(main_croupier) > 21 or total(main_joueur) > total(main_croupier):
        return "joueur"
    elif total(main_joueur) == total(main_croupier):
        return "égalité"
    else:
        return "croupier"

jetons = 100
continuer = "o"

while jetons > 0 and continuer == "o":
    print("Tu as", jetons, "jetons.")
    mise = int(input("Combien de jetons mises-tu ?"))
    while mise < 1 or mise > jetons:
        mise = int(input("Mise invalide ! Combien de jetons mises-tu ?"))

    résultat = manche()
    if résultat == "joueur":
        jetons = jetons + mise
        print("Tu gagnes la manche et remportes", mise, "jetons !")
    elif résultat == "croupier":
        jetons = jetons - mise
        print("Le croupier gagne la manche, tu perds", mise, "jetons.")
    else:
        print("Égalité, tu récupères ta mise.")

    if jetons > 0:
        continuer = input("Nouvelle manche ? (o/n)")

if jetons == 0:
    print("Tu n'as plus de jetons... La partie est terminée !")
else:
    print("Tu quittes la table avec", jetons, "jetons.")
```
1. La manche du challenge précédent est déplacée telle quelle dans la fonction `manche()`. Au
   lieu d'afficher le résultat, elle le **retourne**, ce qui permet au programme principal de
   mettre à jour les jetons.
2. Le `return "croupier"` placé juste après le dépassement de 21 met fin à la manche : le
   croupier ne joue alors même pas.
3. Une deuxième boucle `while` redemande la mise tant qu'elle n'est pas valide.
4. On ne propose une nouvelle manche que s'il reste des jetons : sinon, la boucle principale
   s'arrête d'elle-même.
````

## Le Tamagotchi

```{admonition} Compétences travaillées
:class: note dropdown
| Notion | Dans ce défi |
| :----- | :----------- |
| Variables et entrées utilisateur | calculs, `input()` (sans conversion), concaténation de `str` |
| Branchements conditionnels | `if` / `elif` / `else`, `and` |
| Boucles conditionnelles | `while` avec condition composée |
| Listes et boucles for | `for ... in range()` (pas de liste) |
| Fonctions | paramètres, avec et sans `return` |

**Pour aller plus loin** ajoute : une fonction de plus avec plusieurs `return`.
```

Pour terminer, programmez votre propre *Tamagotchi*, un petit animal virtuel dont il faut prendre soin pendant **15 jours**. L'animal a trois jauges, notées de 0 à 10 : la *satiété*, l'*énergie* et le *bonheur*. Toutes commencent à 6. Si l'une d'entre elles tombe à 0, l'animal s'enfuit et la partie est perdue.

Chaque jour se déroule de la manière suivante :

1. Le jeu affiche le numéro du jour et les trois jauges sous la forme de barres, par exemple `Satiété : ######---- 6 / 10`.
2. Le joueur choisit une action :
   - `manger` : satiété +4, énergie -1
   - `dormir` : énergie +4, satiété -1
   - `jouer` : bonheur +4, énergie -1
   - toute autre réponse : l'animal ne comprend pas et boude (bonheur -2)
3. Le temps passe : les trois jauges perdent 1 point.
4. Une fois sur cinq (au hasard), l'animal attrape un rhume et perd 2 points d'énergie.
5. Une jauge ne peut jamais dépasser 10 ni descendre sous 0.

Votre programme contiendra au moins deux fonctions : `affiche_jauge(nom, valeur)`, qui affiche une jauge sous forme de barre, et `limite(valeur)`, qui retourne la valeur ramenée entre 0 et 10.

```{code-block} text
Comment s'appelle ton animal ? <-- [Pixel]
=== Jour 1 ===
Satiété : ######---- 6 / 10
Énergie : ######---- 6 / 10
Bonheur : ######---- 6 / 10
Que fait Pixel ? (manger / dormir / jouer) <-- [jouer]
=== Jour 2 ===
Satiété : #####----- 5 / 10
Énergie : ####------ 4 / 10
Bonheur : #########- 9 / 10
Que fait Pixel ? (manger / dormir / jouer) <-- [dormir]
Oh non, Pixel a attrapé un rhume ! (-2 énergie)
=== Jour 3 ===
...
Bravo ! Pixel a survécu 15 jours grâce à toi !
```

```{exec} python
:editor: 01a1630f-72cd-7781-aed2-62fae0f90751
from random import randint

#Écrivez votre jeu ici
```

````{solution}
```{exec} python
:linenos:
from random import randint

def limite(valeur):
    if valeur > 10:
        return 10
    elif valeur < 0:
        return 0
    return valeur

def affiche_jauge(nom, valeur):
    barre = ""
    for i in range(10):
        if i < valeur:
            barre = barre + "#"
        else:
            barre = barre + "-"
    print(nom, barre, valeur, "/ 10")

nom = input("Comment s'appelle ton animal ?")
satiété = 6
énergie = 6
bonheur = 6
jour = 1

while jour <= 15 and satiété > 0 and énergie > 0 and bonheur > 0:
    print("=== Jour", jour, "===")
    affiche_jauge("Satiété :", satiété)
    affiche_jauge("Énergie :", énergie)
    affiche_jauge("Bonheur :", bonheur)

    # Action du joueur
    action = input("Que fait " + nom + " ? (manger / dormir / jouer)")
    if action == "manger":
        satiété = satiété + 4
        énergie = énergie - 1
    elif action == "dormir":
        énergie = énergie + 4
        satiété = satiété - 1
    elif action == "jouer":
        bonheur = bonheur + 4
        énergie = énergie - 1
    else:
        print(nom, "ne comprend pas et boude.")
        bonheur = bonheur - 2

    # Le temps passe
    satiété = satiété - 1
    énergie = énergie - 1
    bonheur = bonheur - 1

    # Événement aléatoire
    if randint(1, 5) == 1:
        print("Oh non,", nom, "a attrapé un rhume ! (-2 énergie)")
        énergie = énergie - 2

    satiété = limite(satiété)
    énergie = limite(énergie)
    bonheur = limite(bonheur)
    jour = jour + 1

if satiété > 0 and énergie > 0 and bonheur > 0:
    print("Bravo !", nom, "a survécu 15 jours grâce à toi !")
else:
    print("Oh non,", nom, "s'est enfui...")
```
1. La boucle s'arrête soit après le 15{sup}`ème` jour, soit dès qu'une jauge tombe à 0. Après la
   boucle, on teste les jauges pour savoir laquelle des deux situations s'est produite.
2. Dans `affiche_jauge`, la barre contient toujours 10 caractères : la boucle ajoute un `#` pour
   chaque point de la jauge, puis des `-` pour compléter.
3. Les jauges ne sont ramenées entre 0 et 10 qu'**à la fin** de la journée, une fois toutes les
   modifications effectuées. C'est plus simple que d'appeler `limite` après chaque calcul.
4. Le texte de l'`input` est construit en collant plusieurs `str` avec `+`, car `input()` ne
   prend qu'un seul texte en paramètre.
````

```{admonition} Pour aller plus loin
:class: tip
Faites **grandir** votre animal : il est un `œuf` les jours 1 à 3, un `bébé` les jours 4 à 7, un
`ado` les jours 8 à 11, puis un `adulte`. Affichez son stade au début de chaque jour. Ajoutez
ensuite une quatrième jauge, la *propreté*, avec l'action `laver` correspondante. Le jeu
reste-t-il gagnable ?
```

````{solution} Solution du bonus
```{exec} python
:linenos:
from random import randint

def limite(valeur):
    if valeur > 10:
        return 10
    elif valeur < 0:
        return 0
    return valeur

def affiche_jauge(nom, valeur):
    barre = ""
    for i in range(10):
        if i < valeur:
            barre = barre + "#"
        else:
            barre = barre + "-"
    print(nom, barre, valeur, "/ 10")

def stade(jour):
    if jour <= 3:
        return "œuf"
    elif jour <= 7:
        return "bébé"
    elif jour <= 11:
        return "ado"
    else:
        return "adulte"

nom = input("Comment s'appelle ton animal ?")
satiété = 6
énergie = 6
bonheur = 6
propreté = 6
jour = 1

while jour <= 15 and satiété > 0 and énergie > 0 and bonheur > 0 and propreté > 0:
    print("=== Jour", jour, "-", nom, "est un", stade(jour), "===")
    affiche_jauge("Satiété :", satiété)
    affiche_jauge("Énergie :", énergie)
    affiche_jauge("Bonheur :", bonheur)
    affiche_jauge("Propreté :", propreté)

    action = input("Que fait " + nom + " ? (manger / dormir / jouer / laver)")
    if action == "manger":
        satiété = satiété + 4
        énergie = énergie - 1
    elif action == "dormir":
        énergie = énergie + 4
        satiété = satiété - 1
    elif action == "jouer":
        bonheur = bonheur + 4
        énergie = énergie - 1
    elif action == "laver":
        propreté = propreté + 4
    else:
        print(nom, "ne comprend pas et boude.")
        bonheur = bonheur - 2

    # Le temps passe (la propreté ne baisse qu'un jour sur deux en moyenne)
    satiété = satiété - 1
    énergie = énergie - 1
    bonheur = bonheur - 1
    if randint(1, 2) == 1:
        propreté = propreté - 1

    if randint(1, 5) == 1:
        print("Oh non,", nom, "a attrapé un rhume ! (-2 énergie)")
        énergie = énergie - 2

    satiété = limite(satiété)
    énergie = limite(énergie)
    bonheur = limite(bonheur)
    propreté = limite(propreté)
    jour = jour + 1

if satiété > 0 and énergie > 0 and bonheur > 0 and propreté > 0:
    print("Bravo !", nom, "est devenu un", stade(15), "en pleine forme !")
else:
    print("Oh non,", nom, "s'est enfui...")
```
1. La fonction `stade` découpe les 15 jours en tranches avec une série de `elif`, de la même
   manière que les tarifs du zoo.
2. **Le jeu reste-t-il gagnable ?** Pas si la propreté baisse d'un point chaque jour, comme les
   autres jauges : avec une seule action par jour pour quatre jauges qui baissent toutes, même en
   s'occupant chaque jour de la jauge la plus basse, l'animal ne tient presque jamais 15 jours. Il faut donc
   **rééquilibrer** le jeu. Ici, la propreté ne baisse qu'une fois sur deux (au hasard) : en
   s'occupant chaque jour de la jauge la plus basse, on gagne alors environ une partie sur
   deux, alors qu'en jouant au hasard on perd presque à coup sûr.
3. Équilibrer un jeu est une vraie partie du travail des développeurs : n'hésitez pas à modifier
   les valeurs (+4, -1, la probabilité du rhume...) et à tester plusieurs parties pour trouver
   la difficulté qui vous plaît.
````
