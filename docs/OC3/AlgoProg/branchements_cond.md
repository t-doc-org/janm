<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```
# Branchements conditionnels
```{youtube} FKuAnm_WXlg
```

## Qu'est-ce qu'un branchement conditionnel ?

Dans un programme, en fonction du contexte, toutes les instructions ne doivent pas toujours être exécutées. Par exemple, dans un mini-jeu, on souhaiterait que l'instruction `print("Gagné")` ne soit exécutée que si l'utilisateur a marqué au moins 100pts. Dans le cas contraire, c'est plutôt l'instruction `print("Perdu")` qui devrait être exécutée.

Un branchement conditionnel est donc composé d'une **condition**, ainsi que de **blocs d'instructions** qui sont effectués en fonction du résultat de la condition.

## Conditions

En programmation, une condition est composée de deux valeurs qui sont comparées entre elles par un opérateur de comparaison. Le résultat de la comparaison est de type `bool`. Il est donc `True` dans le cas où la condition est respectée, et `False` quand elle ne l'est pas

| Opérateur | Nom                  | Exemple | Résultat |
| :-------: | :------------------: | :-----: | :------: |
| `==`        | égal à               | 3 == 7  | `False`    |
| `!=`        | différent de         | 3 != 7  | `True`     |
| `>`         | plus grand que       | 3 > 7   | `False`    |
| `<`         | plus petit que       | 3 < 7   | `True`     |
| `>=`        | plus grand ou égal à | 3 >= 7  | `False`    |
| `<=`        | plus petit ou égal à | 3 <= 7  | `True`     |

## Si …

La forme la plus simple d’un branchement conditionnel est le `if` : on exécute le bloc d'instructions indenté en dessous seulement si la condition est vraie (`True`).

```{exec} python
:linenos:
note = float(input("Quelle est votre note ?"))
if note >= 4:
    print("Bravo, vous avez réussi l'examen")
    print("Continuez comme ça !")
print("Fin du programme")
```

```{important}
Les blocs d'instructions devant être exécutés dans un branchement conditionnel sont **indentés** sous le `if`. C'est-à-dire qu'ils sont légèrement décalés à droite. Une tabulation permet d'indenter de manière simple et claire.
```

## Si … Sinon

Le mot-clef `else` permet d’exécuter un autre bloc d’instructions indenté si la condition du `if` n'est pas respectée (`False`). Le `else` ne prend **jamais** de condition car il signifie *dans tous les autres cas*.

```{exec} python
:linenos:
age = int(input("Quel âge avez-vous ?"))
if age >= 18:
    print("Vous êtes majeur")
else:
    print("Vous êtes mineur")
```

## Si … Sinon si … Sinon

Le mot-clef `elif` (abréviation de *else if*) permet de tester plusieurs conditions à la suite. Il se place obligatoirement après un `if` et il peut y en avoir autant que souhaité. Il n'est pas obligatoire d'avoir un `else` après un `elif`, même si cela est souvent pratique.

```{exec} python
:linenos:
temperature = float(input("Quelle est la température en °C ?"))
if temperature < 0:
    print("Il gèle")
elif temperature < 15:
    print("Il fait frais")
elif temperature < 25:
    print("Il fait bon")
else:
    print("Il fait chaud")
```

## Opérateurs logiques (et/ou)
Lorsqu'une condition est plus complexe qu'une simple comparaison entre deux valeurs, il est possible de les chaîner. Ce chaînage se fait à l'aide des opérateurs logiques `and` et `or`.

| Opérateur | Description          | Exemples |
| :-------: | :------------------: |:--------------------------------------: |
| `and`       | donne `True` si **les deux** conditions sont vraies | `(4 > 1) and (5 == 4)` donne `False` car seulement la 1ère condition est vraie
| `or`        | donne `True` si **une des deux** conditions est vraie    | `(4 > 1) or (5 == 4)` donne `True` car la 1ère condition est vraie

Par exemple, le programme ci-dessous permet de déterminer le district d'origine de l'utilisateur en fonction d'un nom de ville.

```{exec} python
:linenos:
ville = input("D'où viens-tu ?")
if ville == "Romont" or ville == "Rue":
    print("Tu viens de la Glâne")
elif ville == "Fribourg" or ville == "Marly":
    print("Tu viens de la Sarine")
elif ville == "Tafers" or ville == "Plaffeien" or ville == "Düdingen":
    print("Tu viens de la Singine")
else:
    print("Je ne sais pas d'où tu viens")
```

Celui ci-dessous permet de vérifier que l'utilisateur a bien l'âge d'acheter du vin, et qu'il a suffisamment d'argent pour le faire.

```{exec} python
:linenos:
age = int(input("Quel âge as-tu ? "))
argent = float(input("Combien d'argent as-tu (en CHF) ? "))

prix_vin = 39.90  # prix en CHF d'une bouteille de vin

if age >= 16 and argent >= prix_vin:
    print("Tu peux acheter du vin.")
elif age < 16:
    print("Tu es trop jeune pour acheter du vin.")
elif argent < prix_vin:
    print("Tu n'as pas assez d'argent pour acheter du vin.")

```



## Exercices

### Exercice {num1}`exercice-python`

Chacun des programmes suivants comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique.
1.  ```{exec} python
    :editor:
    collège = input("Dans quel collège es-tu ?")
    if collège = STX:
        print("Tu es dans le meilleur collège !")
    print("A bientôt")
    ```

2.  ```{exec} python
    :editor:
    âge = int(input("Quel âge as-tu ?"))
    if âge < 18:
    print("Tu es majeur")
    else:
    print("Tu es mineur")
    ```
3.  ```{exec} python
    :editor:
    nombre = float(input("Entre un nombre"))
    
    if nombre > 0:
        print(nombre, "est un nombre positif")
    if nombre < 0:
        print(nombre, "est un nombre négatif")
    else:
        print("Zéro est un nombre ni positif ni négatif")    
    ```


4.  ```{exec} python
    :editor:
    métier = input("Quel est ton métier ?")
    
    if métier == "étudiant" or "étudiante":
        print("Tu as droit à une réduction")
    else:
        print("Tu dois payer plein prix")
    ```

5.  ```{exec} python
    :editor:
    note = float(input("Quelle est ta dernière note en informatique"))
    
    if note >= 1 and <= 6:
        if note >= 4:
            print("C'est une note suffisante")
        else:
            print("C'est une note insuffisante")
    else:
        print("Tu as dû te tromper, ce n'est pas une note valide")
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    collège = input("Dans quel collège es-tu ?")
    if collège == "STX":
        print("Tu es dans le meilleur collège !")
    print("A bientôt")
    ```

2.  ```{exec} python
    :linenos:
    âge = int(input("Quel âge as-tu ?"))
    if âge >= 18:
        print("Tu es majeur")
    else:
        print("Tu es mineur")
    ```
3.  ```{exec} python
    :linenos:
    nombre = float(input("Entre un nombre"))
    
    if nombre > 0:
        print(nombre, "est un nombre positif")
    elif nombre < 0:
        print(nombre, "est un nombre négatif")
    else:
        print("Zéro est un nombre ni positif ni négatif")    
    ```

4.  ```{exec} python
    :linenos:
    métier = input("Quel est ton métier ?")
    
    if métier == "étudiant" or métier == "étudiante":
        print("Tu as droit à une réduction")
    else:
        print("Tu dois payer plein prix")
        
    ```

5.  ```{exec} python
    :linenos:
    note = float(input("Quelle est ta dernière note en informatique"))
    
    if note >= 1 and note <= 6:
        if note >= 4:
            print("C'est une note suffisante")
        else:
            print("C'est une note insuffisante")
    else:
        print("Tu as dû te tromper, ce n'est pas une note valide")
        
    ```
````


### Exercice {num1}`exercice-python`

Un zoo pratique les tarifs suivants:

- Les enfants jusqu'à 16 ans paient 15 CHF.
- Les jeunes jusqu'à 20 ans payent 22 CHF.
- Les adultes jusqu'à 65 ans payent 28 CHF.
- Les personnes âgées paient 20 CHF.

Écrivez un programme qui demande l'âge de l'utilisateur et affiche le prix à payer. Le rendu du programme doit être le suivant:
```{code-block} text
Quel est ton âge? <--- [16]
Pour une personne de 16 ans, le prix à payer est de 15 francs.
```

Pour une solution optimale, essayez de n'utiliser qu'une seule fois la fonction `print()`

```{exec} python
:editor: 01a162e3-3a8c-739e-936a-fb407447e502
# Écrivez votre code ici

```

````{solution}
```{exec} python
:linenos:
age = int(input("Quel est ton âge? "))

if age <= 16:
    prix = 15
elif age <= 20:
    prix = 22
elif age <= 65:
    prix = 28
else:
    prix = 20

print ("Pour une personne de", age, "ans, le prix à payer est de", prix, "francs.")
```
````




### Exercice {num1}`exercice-python`
Complétez le programme de quiz ci-dessous qui doit fonctionner de la manière suivante :

```{code-block} text
Demander à l'utilisateur s'il souhaite répondre à un quiz
Si l'utilisateur dit "oui" ou "ok"
    Poser la question "Qui a écrit Les Misérables ?" et enregistrer la réponse dans une variable réponse
    Si la réponse est égale à "Victor Hugo"
        Afficher "Bonne réponse"
    Sinon
        Afficher "Mauvaise réponse"
Sinon
    Afficher "Pas de problème, au revoir"
```

```{exec} python
:editor: 01a162e3-3a8e-7d29-beb8-4ab1727e985d
participation = input("Veux-tu répondre à mon quiz ?")
#Complétez le code ici

```

````{solution}
```{exec} python
:linenos:
participation = input("Veux-tu répondre à mon quiz ?")

if participation == "oui" or participation == "ok":
    reponse = input("Qui a écrit Les Misérables ? ")
    if reponse == "Victor Hugo":
        print("Bonne réponse")
    else:
        print("Mauvaise réponse")
else:
    print("Pas de problème, au revoir")
```
````



### Exercice {num1}`exercice-python`
Écrivez un programme dans lequel l'utilisateur peut entrer le prix d'un article ainsi qu'un code de réduction et qui calcule le prix final en conséquence. Les conditions d'application de réduction ainsi que 3 exemples d'exécution sont donnés ci-dessous. Votre programme ne doit utiliser la fonction `print()` **qu'une seule fois** et à la dernière ligne du programme.

-   Avec le code `"STX"`, un article à moins de 100CHF est réduit de 20%

-   Avec le code `"STX"`, un article à plus de 200CHF est réduit de 35%

-   Les autres articles avec le code `"STX"` ont une réduction de 20CHF

-   Avec le code `"CSMI"` ou le code `"CGAM"`, le prix est **augmenté**
    de 10CHF

-   Autrement, aucun changement de prix n'est effectué

```{code-block} text
Combien coûte l'article ? <--- [300]
Quel est votre code de réduction ? <--- [STX]
Le prix final est 195.0 CHF

>>>

Combien coûte l'article ? <--- [150]
Quel est votre code de réduction ? <--- [CSMI]
Le prix final est 160.0 CHF

>>>

Combien coûte l'article ? <--- [50]
Quel est votre code de réduction ? <--- [JSP]
Le prix final est 50.0 CHF
```

```{exec} python
:editor: 01a162e3-3a92-7bf6-858f-0ed5e02c1ed5
# Écrivez votre code ici

```

````{solution}
```{exec} python
:linenos:
prix = float(input("Combien coûte l'article ?"))
code = input("Quel est votre code de réduction ?")
if code == "STX" and prix < 100:
    prix *= 0.8
elif code == "STX" and prix > 200:
    prix *= 0.65
elif code == "STX":
    prix -= 20
elif code == "CSMI" or code == "CGAM":
    prix += 10
print("Le prix final est", prix, "CHF")
```
````
