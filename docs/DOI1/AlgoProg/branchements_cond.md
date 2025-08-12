```{metadata}
solutions: dynamic
```
# Branchements conditionnels

## Qu'est-ce qu'un branchement conditionnel ?

Dans un programme, en fonction du contexte, toutes les instructions ne doivent pas toujours être exécutées. Par exemple, dans un mini-jeu, on souhaiterait que l'instruction `print("Gagné")` ne soit exécutée que si l'utilisateur a marqué au moins 100pts. Dans le cas contraire, c'est plutôt l'instruction `print("Perdu")` qui devrait être affichée.

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

## Exercices

### Exercice {num1}`exercice`

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





### Exercice {num1}`exercice`
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

### Exercice {num1}`exercice`

Écrivez l'algorithme suivant en Python:

```{code-block} text
Demander à l'utilisateur d'entrer un nombre positif et le stocker dans la variable a
Si a est plus petit que 0 alors
  Afficher "Ce n'est pas un nombre positif !"
```

```{exec} python
:editor: f0cd9039-aa2a-4a6e-a855-ad51d4cd557e
a = float(input("Entrez un nombre positif: "))
# Complétez le programme ici
```

````{solution}
```{exec} python
:linenos:
a = float(input("Entrez un nombre positif: "))
if a < 0:
  print("Ce n'est pas un nombre positif !")
```
````

### Exercice {num1}`exercice`
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
:editor: 01989dc2-0cf9-79ad-8aa4-01ea1afe17d1
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

### Exercice {num1}`exercice`
Le programme suivant est censé contrôler si un utilisateur est majeur ou non. Toutefois, il contient 6 erreurs. Trouvez-les et corrigez-les

```{exec} python
:editor: 01989dd1-7d73-75cf-9833-596e6bacc179
age = input("Quel âge avez-vous ?")
if age > 18
print("Vous êtes mineur")
else
print("Vous êtes majeur")
```

````{solution}
```{exec} python
:linenos:
age = int(input("Quel âge avez-vous ?"))
if age < 18:
    print("Vous êtes mineur")
else:
    print("Vous êtes majeur")
```

1.  Comme `age` est comparé avec `18` qui est un `int`, il faut convertir cette variable dans ce type.

2.  Il manquait les deux-points à la fin des lignes du `if` et du `else`.

3.  Il y avait une erreur de logique : le programme disait que l'on était mineur si l'on avait plus de 18 ans. Il fallait donc remplacer le `>` par un `<`.
````

### Exercice {num1}`exercice`
Écrivez un programme permettant de calculer le prix d'un certain nombre de bananes, sachant qu'une banane coûte 1.50 CHF. Si l'utilisateur entre un nombre négatif, alors le programme ne calculera pas de prix et affichera un message d'erreur à la place. Deux exécutions possibles de ce programme pourraient être les suivantes.

```{code-block} text
Combien de bananes souhaitez-vous acheter ? <-- [4]
Cela vous coûtera 6.0CHF

>>>

Combien de bananes souhaitez-vous acheter ? <-- [-8]
ERREUR : nombre négatif invalide
```

```{exec} python
:editor: 01989dd6-ecd5-7800-b86f-bb8691f22a4c
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

### Exercice {num1}`exercice`
Sans les exécuter, lisez attentivement les deux programmes ci-dessous. Leur seule différence est l'indentation de la dernière ligne. Expliquez l'impact de cette indentation sur le déroulement de chaque programme.


```{exec} python
:caption: Programme 1
:when: never
prenom = input("Quel est votre prénom ?")
if prenom == "Maxime":
    print("Très joli prénom !")
else:
    print("Bonjour", prenom)
print("A bientôt")
```


```{exec} python
:caption: Programme 2
:when: never
prenom = input("Quel est votre prénom ?")
if prenom == "Maxime":
    print("Très joli prénom !")
else:
    print("Bonjour", prenom)
    print("A bientôt")
```

````{solution}
Dans le premier programme, le message `A bientôt` est affiché dans tous les cas, peu importe le prénom entré. Dans le deuxième programme, ce message n'est affiché que lorsque l'utilisateur entre un prénom **différent** de Maxime.
````

### Exercice {num1}`exercice`

```{role} input(quiz-input)
:right: width: 10rem;
:check: json remove lowercase
```

````{quiz}
{input}`{"0": true, "-x+2": "Il faut remplacer x par sa valeur."}`
Que va afficher ce programme?

```{code-block} python
:linenos:
x = 2
if x <= -1:
  print(2 * x + 1)
elif x <= 3:
  print(-x + 2)
else:
  print(2 * x - 5)
```
````


### Exercice {num1}`exercice`
Complétez le programme suivant pour qu'il corresponde à cet algorithme :
```{code-block} text
Demander à l'utilisateur d'entrer un nombre et le stocker dans la variable a
Si a est plus grand que 0 alors
  Afficher "Vous avez entré un nombre positif"
Sinon si a est égal à 0
  Afficher "Vous avez entré le nombre zéro"
Sinon
  Afficher "Vous avez entré un nombre négatif"
```


```{exec} python
:editor: 49f2047d-751c-42d6-8832-40953fa8db92
a = 
if  :

elif  :

else:

```

````{solution}
```{exec} python
:linenos:
a = float(input("Entrez un nombre : "))
if a > 0:
    print("Vous avez entré un nombre positif")
elif a == 0:
    print("Vous avez entré le nombre zéro")
else:
    print("Vous avez entré un nombre négatif")
```
````

### Exercice {num1}`exercice`
Écrivez un programme demandant un prénom à l'utilisateur et affichant sa signification. Le programme connaît les significations suivantes.

-   Maxime signifie "celui qui est le plus grand"

-   Félix signifie "celui qui est heureux"

-   Sylvie signifie "celle qui vient de la forêt"

-   Fabien signifie "l'artisan"

-   Clara signifie "celle qui est brillante"

Si un autre prénom est donné au programme, le message `"Je ne connais pas la signification de ce prénom"` sera affiché. De plus, le programme se terminera dans tous les cas par le message `"Au revoir"`.

```{exec} python
:editor: 01989dee-f437-7c55-9c32-35d5ba945223
#Ecrivez votre code ici

```

````{solution}
```{exec} python
:linenos:
prenom = input("Quel est votre prénom ?")
if prenom == "Maxime":
    print("Votre prénom signifie celui qui est le plus grand")
elif prenom == "Félix":
    print("Votre prénom signifie celui qui est heureux")
elif prenom == "Sylvie":
    print("Votre prénom signifie celle qui vient de la forêt")
elif prenom == "Fabien":
    print("Votre prénom signifie l'artisan")
elif prenom == "Clara":
    print("Votre prénom signifie celle qui est brillante")
else:
    print("Je ne connais pas la signification de votre prénom")
print("Au revoir")
```
````

### Exercice {num1}`exercice`

Le programme suivant est censé affiché le tarif appliqué en fonction de l'âge de
l'utilisateur. Mais il contient une erreur par ligne, trouvez-les et corrigez-les.

```{exec} python
:editor: 55bcea11-979f-43f8-8d1c-46f102e56b2b
age = input("Quel âge as-tu? ")
if age > 18:
print("Tu payes le tarif enfant.")
elif age < 65
  print "Tu payes le tarif adulte."
else age >= 65:
  print(Tu payes le tarif retraité.)
```

````{solution}
```{exec} python
:linenos:
age = int(input("Quel âge as-tu? "))
if age < 18:
  print("Tu payes le tarif enfant.")
elif age < 65:
  print("Tu payes le tarif adulte.")
else:
  print("Tu payes le tarif retraité.")
```
````

### Exercice {num1}`exercice`

Un zoo pratique les tarifs suivants:

- Les enfants jusqu'à 16 ans révolus payent 15 francs.
- Les jeunes entre 16 et 20 ans payent 22 francs.
- Les adultes à partir de 21 ans payent 28 francs.

Écrivez un programme qui demande l'âge de l'utilisateur et affiche le prix à
payer.

Le rendu du programme doit être le suivant:
```{code-block} text
Quel est ton âge? <--- [16]
Pour une personne de 16 ans, le prix à payer est de 22 francs.
```

```{exec} python
:editor: a7451ba3-2bd7-46f5-a2c6-1ab83c16c970
# Écrivez votre code ici

```

````{solution}
```{exec} python
:linenos:
age = int(input("Quel est ton âge?"))
if age < 16:
  prix = 15
elif age <= 20:
  prix = 22
else :
  prix = 28
print ("Pour une personne de", age, "ans, le prix à payer est de", prix, "francs.")
```
````




### Exercice {num1}`exercice`
Complétez les `...` dans le programme suivant pour que les textes soient affichés correctement en fonction des valeurs de `a` et `b` :


```{exec} python
:caption: Programme 1
:editor: 01989e05-3e0a-7791-b81a-f682bca28f18
a = float(input("Entrez un 1er nombre positif"))
b = float(input("Entrez un 2ème nombre positif"))

if ... :
    print("Les deux nombres sont positifs")
else:
    print("Au moins un des deux nombres n'est pas positif")
```

```{exec} python
:caption: Programme 2
:editor: 01989e07-1982-7581-9d72-e303f42c6858
a = float(input("Entrez un 1er nombre positif"))
b = float(input("Entrez un 2ème nombre positif"))

if ... :
    print("Au moins 1 nombre est positif")
else:
    print("Aucun des deux nombre est positif")
```

````{solution}
```{exec} python
:linenos:
:caption: Programme 1
a = int(input("Entrez le premier nombre : "))
b = int(input("Entrez le deuxième nombre : "))

if a > 0 and b > 0:
    print("Les deux nombres sont positifs")
else:
    print("Au moins un des deux nombres n'est pas positif")
```

```{exec} python
:linenos:
:caption: Programme 2
a = int(input("Entrez le premier nombre : "))
b = int(input("Entrez le deuxième nombre : "))

if a > 0 or b > 0:
    print("Au moins 1 nombre est positif")
else:
    print("Aucun des deux nombre est positif")
```
````

### Exercice {num1}`exercice`
Complàtez le programme ci-dessous pour vérifier si une note est suffisante ou non. De plus, si la note entrée n'est pas valide (c'est-à-dire qu'elle n'est pas comprises entre 1 et 6), alors un message d'erreur est affiché. Trois exemples d'exécution sont donnés ci-dessous :


```{code-block} text
Entrez une note : <--- [4.25]
Vous avez fait une note suffisante
>>>
Entrez une note : <--- [7]
ERREUR : note invalide
>>>
Entrez une note : <--- [3.75]
Vous avez fait une note insuffisante
```

```{exec} python
:editor: 55b24642-54c7-41f6-9b08-453cb5053dd4
note = float(input("Quelle note avez-vous fait ?"))
#Complétez le code ici

```

````{solution}
```{exec} python
:linenos:
note = float(input("Entrez la note : "))

if note < 1 or note > 6:
    print("ERREUR : note invalide")
elif note >= 4:
    print("Vous avez fait une note suffisante")
else:
    print("Vous avez fait une note insuffisante")
```
````



### Exercice {num1}`exercice`
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
:editor: 01989e00-b26f-7be2-941c-767923a735ea
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
