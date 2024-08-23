# Branchements conditionnels


## Expressions conditionnelles

En Python, il existe 6 opérateurs permettant d'effectuer des comparaisons :

-   Plus grand que `>`

-   Plus grand ou égal à `>=`

-   Plus petit que `<`

-   Plus petit ou égal à `<=`

-   Égal à `==`

-   Différent de `!=`

Une expression conditionnelle simple peut s'écrire avec un opérateur de comparaison entouré de deux valeurs, variables, ou expressions. Ainsi, avec des variables préalablement définie, on pourrait écrire les expressions conditionnelles ci-dessous.


```{code-block} python
age >= 18 # Une personne est-elle majeure ?
mot_de_passe == "Fr1B0urG" # Len mot de passe est-il correct ?
temps_en_secondes < 60 # Reste-t-il moins de 60 secondes ?
meteo != "pluie" # La météo est-elle différente de la pluie ?
```

Comme le résultat d'une condition peut être *Oui* ou *Non*, il est logique qu'une expression conditionnelle soit évaluée à `True` ou `False`. Dans le programme suivant, l'expression à l'intérieur du premier `print()` est évaluée à `True`, alors que celle du deuxième est évaluée à `False`. Ces valeurs sont alors affichées sur la console avec `print()`.

```{code-block} python
:caption: Ecriture d'expressions conditionnelles
age = 20
print(age >= 18)
meteo = "pluie"
print(meteo != "pluie")
```

À l'exécution du programme suivant, celui-ci n'affichera `True` que si l'utilisateur écrit exactement le mot de passe *Fr1B0urG*, et `False` sinon.

```{code-block} python
:caption: Afficher une autre expression conditionnelle
mdp = input("Quel est le mot de passe ?")
mot_de_passe_correct = mdp == "Fr1B0urG"
print(mot_de_passe_correct)
```

## Si \... Sinon

Ces expressions conditionnelles peuvent être utilisées avec une structure `if ... else ...` afin d'exécuter différentes instructions en fonction de son résultat. Dans le cas où l'expression est évaluée à `True`, les instructions indentées sous le `if` sont exécutées. Quand l'expression est évaluée à `False`, ce sont les instructions indentées sous le `else` qui sont exécutées. Etudiez l'exemple ci-dessous.

```{code-block} python
:caption: Programme Python d'achat d'un billet de cinéma
crédit = 50
print("Achetez votre billet de cinéma en ligne")
age = int(input("Quel âge avez-vous ?"))
if age < 18:
    crédit -= 12
else:
    crédit -= 16
print("Achat confirmé, crédit restant :", crédit)
```

-   Le crédit est débité de `12` seulement lorsque l'utilisateur entre une valeur inférieure à `18`.

-   Le crédit est débité de `16` seulement lorsque l'utilisateur entre une valeur supérieure ou égale à `18`.

-   Le texte `Achat confirmé…` est affiché **dans tous les cas**, car cette instruction n'est pas indentée sous le `else`.

Si on décidait d'indenter ce dernier `print()` sous le `else`, alors ce texte ne serait affiché que dans le cas où `age` ne serait pas inférieur à `18`. Il faut donc être très vigilant avec l'indentation et ne décaler que les instructions devant appartenir au branchement conditionnel.

## Si \...

Un bloc `if ...` peut également s'écrire sans `else ...` dans le cas où rien ne doit être fait si la condition n'est pas respectée. Dans l'exemple suivant, un message est affiché lorsque le choix de pizza est différent de Hawaï, mais rien de particulier ne se passe lorsque cela n'est pas le cas.

```{code-block} python
:caption: Utilisation d'un if sans else
pizza = input("Quelle pizza voulez-vous commander ?")
if pizza != "Hawaï":
    print("Ce n'est pas le meilleur choix...")
print("Votre pizza sera prête dans 15min")
```

## Si \... Sinon si \... Sinon

Certaines situations conditionnelles nécessitent plus que 1 ou 2 blocs d'instructions. Prenez l'exemple d'un petit jeu dans lequel l'utilisateur doit entrer un nombre pour deviner le nombre mystère, et dans lequel le programme répond par `Trop grand`, `Trop petit`, ou `Correct`. Le pseudocode du branchement conditionnel pourrait alors être :

```{code-block} text
Si le nombre du joueur est plus grand que le nombre mystère
    Afficher le message "Trop grand"
Sinon si le nombre du joueur est plus petit que le nombre mystère
    Afficher le message "Trop petit"
Sinon
    Afficher le message "Correct"
```

Dans cet exemple, notez bien les deux éléments suivants :

1.  Nous n'avons pas besoin de condition contrôlant si le nombre du joueur est égal au nombre mystère. En effet, si les deux premières conditions ne sont pas respectées, il est alors logique que le cas `Sinon` corresponde au cas où les deux nombres sont égaux.

2.  La 2ème condition est bien précédée par un `Sinon si`. De cette manière, on comprend que ce cas est lié au précédent. Il est également impératif de suivre ce raisonnement en programmation.

En Python, on peut simplement transcrire le `Sinon si` par `elif` (qui est la contraction de `else` et `if`). De cette manière, le branchement conditionnel de notre jeu du Devin peut s'écrire comme dans le programme ci-dessous. Ce code ne permet pas encore de jouer réellement à ce mini-jeu, car nous devons relancer le programme entre chaque essai, et le nombre à deviner ne change jamais.

```{code-block} python
:caption: Jeu du Devin incomplet
nombre_mystere = 76
nombre_du_joueur = int(input("À quel nombre est-ce que je pense ?"))
if nombre_du_joueur > nombre_mystere:
    print("Le nombre est trop grand")
elif nombre_du_joueur < nombre_mystere:
    print("Le nombre est trop petit")
else:
print("Félicitations ! Tu as trouvé le nombre mystère")
```

Pour illustrer l'utilité du `elif`, vous pouvez essayer de le remplacer par un `if` et constater le comportement inattendu lorsque vous écrivez un nombre plus grand que le nombre mystère. De plus, nous pouvons encore noter que les `elif` permettent de créer autant de chemins que l'on souhaite. Par exemple, le branchement conditionnel du programme ci-dessous comporte 5 chemins différents.

```{code-block} python
:caption: Utilisation de plusieurs elif
meteo = input("Quel temps fait-il ?")
if meteo == "soleil":
    print("Mettez de la crème solaire")
elif meteo == "pluie":
    print("Prenez un parapluie")
elif meteo == "neige":
    print("Mettez une veste")
elif meteo == "orage":
    print("Restez chez vous")
else:
    print("Je ne sais pas ce que vous devez faire...")
```


## Opérateurs logiques

Parfois, les conditions que l'on souhaite tester ne sont pas aussi simples que le permettent les expressions conditionnelles que nous avons écrites jusqu'à présent. En effet, on peut s'imaginer un programme d'achat de billet de festival qui applique une réduction de 20% aux visiteurs étudiants de moins de 30 ans. La condition est alors plus complexe, car celle-ci est composée de deux sous-conditions. Pour que le rabais s'applique, il faut que le métier du festivalier soit `"étudiant"` **ET** que son âge soit inférieur à 30. Ce ET est ce que l'on appelle un *opérateur logique*. Un opérateur logique permet de lier deux sous-expressions conditionnelles pour n'en former plus qu'une. L'opérateur logique ET se traduit simplement en Python par `and`. Ainsi, le programme suivant n'appliquera le rabais que si l'utilisateur entre le mot `étudiant` **et** un nombre plus petit que 30.

```{code-block} python
metier = input("Quel est votre métier ?")
age = int(input("Quel âge avez-vous ?"))
prix_billet = 30
if metier == "étudiant" and age < 30:
    prix_billet *= 0.8
print("Votre billet coûte", prix_billet, "CHF")
```

En fonction de la situation, l'opérateur logique ET ne sera peut-être pas adapté. En effet, imaginons que le festival applique cette fois un rabais pour les visiteurs qui sont étudiants **OU** retraités. L'opérateur logique est ici le OU qui se traduit en Python par `or`. Dans le programme ci-dessous, le rabais est alors appliqué lorsque l'utilisateur entre la valeur `étudiant`, mais aussi lorsqu'il entre la valeur `retraité`. Notez bien que même si, en français, on dit *son métier est étudiant ou retraité*, en Python, il est obligatoire de répéter la condition entière après l'opérateur logique, et on a donc *son métier est étudiant ou son métier est retraité*.

```{code-block} python
metier = input("Quel est votre métier ?")
prix_billet = 30
if metier == "étudiant" or metier == "retraité":
    prix_billet *= 0.8
print("Votre billet coûte", prix_billet, "CHF")
```
