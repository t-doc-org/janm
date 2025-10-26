```{metadata}
solutions: show
```
# Révisions - Branchements conditionnels
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
Les blocs d'instructions devant être exécutées dans un branchement conditionnels sont **indentés** sous le `if`. C'est-à-dire qu'ils sont légèrement décalés à droite. Une tabulation permet d'indenter de manière simple et claire.
```

## Si … Sinon

Le mot-clef `else` permet d’exécuter un autre bloc d’instructions indenté si la condition du `if` est n'est pas respectée (`False`). Le `else` ne prend **jamais** de condition car il signifie *dans tous les autres cas*.

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
Lorsqu'une condition est plus complexe qu'une simple comparaison entre deux valeurs, il est possible de les chaîner. Ce chaînage peut à l'aide des opérateurs logiques `and` et `or`.

| Opérateur | Description          | Exemples |
| :-------: | :------------------: |:--------------------------------------: |
| `and`       | donne `True` si **les deux** conditions sont vraies | `(4 > 1) and (5 == 4)` donne `False` car seulement la 1ère condition est vraie
| `or`        | donne `True` si **une des deux** conditions est vraie    | `(4 > 1) or (5 == 4)` donne `True` car la 1ère condition est vraie

Par exemple, le programme ci-dessous permet de déterminer le district d'origine de l'utilsateur en fonction d'un nom de ville.

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

### Exercice {num1}`exercice-revision`

Est-ce que les conditions suivantes sont `True` (vrai) ou `False` (faux)?

```{role} select(quiz-select)
:right:
:options: |
: True
: False
```

```{quiz}
:style: max-width: 25rem;
1.  {select}`True`  `1 + 1 == 2`
2.  {select}`False` `2 * 3 == 3`
3.  {select}`True`  `2 + 3 != 4`
4.  {select}`False` `14 >= 15`
5.  {select}`False` `2 ** 3 == 6`
6.  {select}`True`  `13 >= 13`
```


### Exercice {num1}`exercice-revision`
Est-ce que les conditions suivantes sont `True` (vrai) ou `False` (faux), sachant que la variable `pays` contenant la valeur `"Suisse"` et la variable `temperature` la valeur `26.2`



```{role} select(quiz-select)
:right:
:options: |
: True
: False
```

```{quiz}
:style: max-width: 25rem;
1.  {select}`True`  `pays == "Suisse"`
2.  {select}`True` `pays != "France"`
3.  {select}`True`  `temperature > 20`
4.  {select}`False` `temperature < 26.2`
5.  {select}`False` `temperature < 26`
6.  {select}`False`  `temperature != 26.2`
```

### Exercice {num1}`exercice-revision`

Chacun des programmes suivant comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


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
    moyenne = float(input("Quelle moyenne principale as-tu ?"))
    if moyenne < 4
        print("Tu n'es pas promu")
    else
        print("Tu es promu")
    ```


4.  ```{exec} python
    :editor:
    nombre = float(input("Entre un nombre"))
    
    if nombre > 0:
        print(nombre, "est un nombre positif")
    if nombre < 0:
        print(nombre, "est un nombre négatif")
    else:
        print("Zéro est un nombre ni positif ni négatif")    
    ```


5.  ```{exec} python
    :editor:
    métier = input("Quel est ton métier ?")
    
    if métier == "étudiant" or "étudiante":
        print("Tu as droit à une réduction")
    else:
        print("Tu dois payer plein prix")
    ```

6.  ```{exec} python
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
    moyenne = float(input("Quelle moyenne principale as-tu ?"))
    if moyenne < 4:
        print("Tu n'es pas promu")
    else:
        print("Tu es promu")
    ```


4.  ```{exec} python
    :linenos:
    nombre = float(input("Entre un nombre"))
    
    if nombre > 0:
        print(nombre, "est un nombre positif")
    elif nombre < 0:
        print(nombre, "est un nombre négatif")
    else:
        print("Zéro est un nombre ni positif ni négatif")    
    ```

5.  ```{exec} python
    :linenos:
    métier = input("Quel est ton métier ?")
    
    if métier == "étudiant" or métier == "étudiante":
        print("Tu as droit à une réduction")
    else:
        print("Tu dois payer plein prix")
        
    ```

6.  ```{exec} python
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


### Exercice {num1}`exercice-revision`
Complétez le programme de commande de pizza suivant. Dans celui-ci, les clients doivent pouvoir entrer le nom de la pizza à commander et recevoir une confirmation de commande. Dans le cas où une pizza *hawaï est commandée, alors le programme affichera un message supplémentaire pour complimenter ce choix. Deux exemples d'exécution sont donnés ci-dessous.

```{code-block} text
Quelle pizza souhaitez-vous commander ? <-- [prosciutto]
Commande confirmée pour 1x pizza prosciutto

>>>

Quelle pizza souhaitez-vous commander ? <-- [hawaï]
Excellent choix !
Commande confirmée pour 1x pizza hawaï
```

```{exec} python
:editor: 019a2069-77aa-7897-8f50-62e2d0809548
pizza = input("Quelle pizza souhaitez-vous commander ?")
#Complétez le code ici


print("Commande confirmée pour 1x pizza", pizza)

```

````{solution}
```{exec} python
:linenos:
pizza = input("Quelle pizza souhaitez-vous commander ?")
if pizza == "hawaï":
    print("Excellent choix !")
print("Commande confirmée pour 1x pizza", pizza)
```
````

### Exercice {num1}`exercice-revision`
Écrivez un programme permettant de calculer le prix d'un certain nombre de bananes, sachant qu'une banane coûte 1.50 CHF. Si l'utilisateur entre un nombre négatif, alors le programme ne calculera pas de prix et affichera un message d'erreur à la place. Deux exécutions possibles de ce programme pourraient être les suivantes.

```{code-block} text
Combien de bananes souhaitez-vous acheter ? <-- [4]
Cela vous coûtera 6.0CHF

>>>

Combien de bananes souhaitez-vous acheter ? <-- [-8]
ERREUR : nombre négatif invalide
```

```{exec} python
:editor: 019a2069-e5bd-7ccc-a54e-77e86a843972
#Ecrivez votre code ici

```

````{solution} 
```{exec} python
:linenos:
nb_bananes = int(input("Combien de bananes souhaitez-vous acheter ?"))
if nb_bananes >= 0:
    prix = 1.5 * nb_bananes
    print("Cela vous coûtera", prix, "CHF")
else:
    print("ERREUR : nombre négatif invalide")
```
````


### Exercice {num1}`exercice-revision`
Complétez le programme suivant pour qu'il corresponde à cet algorithme :
```{code-block} text
Demander à l'utilisateur quel temps il fait et l'enregistrer dans une variable météo
Si météo est égal à "pluie"
  Afficher "Prenez un parapluie"
Sinon si météo est égal à "neige"
  Afficher "Prenez une veste"
Sinon si météo est égal à "soleil"
  Afficher "Prenez une casquette"
Sinon
  Afficher "Je ne sais pas ce que vous devez prendre"
```


```{exec} python
:editor: 019a206b-c0b2-732f-95ab-059ce3ee4586
météo =

print("Prenez un parapluie")

print("Prenez une veste")

print("Prenez une casquette")

print("Je ne sais pas ce que vous devez prendre")

```

````{solution}
```{exec} python
:linenos:
météo = input("Quel temps fait-il ?")

if météo == "pluie" :
    print("Prenez un parapluie")
elif météo == "neige":
    print("Prenez une veste")
elif météo == "soleil":
    print("Prenez une casquette")
else:
    print("Je ne sais pas ce que vous devez prendre")
```
````


### Exercice {num1}`exercice-revision`

Un zoo pratique les tarifs suivants:

- Les enfants jusqu'à 16 ans paient 15 CHF.
- Les jeunes jusqu'à 20 ans payent 22 CHF.
- Les adultes jusqu'à 65 ans payent 28 CHF.
- Les personnes âgées paient 20 CHF.

Écrivez un programme qui demande l'âge de l'utilisateur et affiche le prix à payer. Le rendu du programme doit être le suivant:
```{code-block} text
Quel est ton âge? <--- [16]
Pour une personne de 16 ans, le prix à payer est de 22 francs.
```

Pour une solution optimale, essayez de n'utiliser qu'une seule fois la fonction `print()`

```{exec} python
:editor: 019a206c-44fe-77a4-862b-774dba18dc38
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




### Exercice {num1}`exercice-revision`
Complétez le programme de quiz ci-dessous qui doit fonctionner de la manière suivante :

```{code-block} text
Demander à l'utilisateur s'il souhaite répondre à un quiz
Si l'utilisteur dit "oui" ou "ok"
    Poser la question "Qui a écrit Les Misérables ?" et enregistrer la réponse dans une variable réponse
    Si la réponse est égale à "Victor Hugo"
        Afficher "Bonne réponse"
    Sinon
        Afficher Mauvaise réponse
Sinon
    Afficher "Pas de problème, au revoir"
```

```{exec} python
:editor: 019a20e1-5c6a-77e4-a99f-e4f6386ef545
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



### Exercice {num1}`exercice-revision`
Le programme ci-dessous demande 3 notes à l'utilisateur. Complétez le de manière à ce qu'il n'affiche `Tu n'as aucune note insufissante` que si ces 3 notes sont supérieure ou égales à 4.


```{exec} python
:editor: 019a206c-816e-74a4-8c0d-52340deef916
math = float(input("Quelle note ta note de math ?"))
français = float(input("Quelle est ta note de français ?"))
allemand = float(input("Quelle est ta note d'allemand ?"))

#Complétez le code ici
print("Tu n'as aucune note insuffisante")

print("Tu as au moins 1 note insuffisante")
```

````{solution}
```{exec} python
:linenos:
math = float(input("Quelle est ta note de math ? "))
français = float(input("Quelle est ta note de français ? "))
allemand = float(input("Quelle est ta note d'allemand ? "))

# Complétez le code ici
if math >= 4 and français >= 4 and allemand >= 4:
    print("Tu n'as aucune note insuffisante")
else:
    print("Tu as au moins 1 note insuffisante")
```
````



### Exercice {num1}`exercice-revision`
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
:editor: 019a206c-9594-72e9-abb6-4f7e00f63a3e
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
