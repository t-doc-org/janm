# Branchements conditionnels

## Qu'est-ce qu'un branchement conditionnel ?

Il est très courant pour un programme informatique d'effectuer différentes instructions en fonction du contexte dans lequel il se trouve à un moment précis. Pensez par exemple à un jeu-vidéo dans lequel le joueur souhaite acheter une épée qui coûte 100 pièces d'or. Dans le cas où le joueur en possède suffisamment, celui-ci peut en effet acheter l'équipement, mais s'il en a moins, alors le vendeur lui refusera la vente. Cette situation peut être décrite de la manière suivante :

```{code-block} text
Si le nombre de pièces d’or est plus grand ou égal à 100
    Retirer 100 au nombre de pièces d’or
    Afficher le dialogue "Merci pour votre achat"
Sinon
    Afficher le dialogue "Revenez plus tard quand vous aurez assez d’argent"
```

On appelle une structure comme celle-ci un *branchement conditionnel*. En effet, comme si l'on se retrouvait à l'embranchement de deux routes différentes, la condition de la première ligne nous permet de choisir l'une des deux. Dans le cas où la condition est respectée, on choisit la première route et les deux instructions `Retirer` et `Afficher "Merci"` sont exécutées alors que la dernière, `Afficher "Revenez plus tard"`, ne l'est pas. Dans le cas contraire, lorsque la première condition n'est pas respectée, le programme emprunte alors la deuxième route et seule la dernière instruction est exécutée.

## Expressions conditionnelles

Pour commencer, nous allons écrire la condition du branchement conditionnelle. Dans notre exemple précédent, la condition était : `le nombre de pièces d’or est plus grand ou égal à 100`. Pour transcrire cette expression conditionnelle en Python, il semble naturel d'avoir une variable `pieces_d_or` contenant une valeur de type `int` ainsi qu'une simple valeur littérale `int` pour le `100`. Il ne manque ainsi plus qu'à transcrire le *plus grand ou égal à*. C'est ce que l'on appelle un opérateur de comparaison. Il en existe 6 différents et, en Python, ils se traduisent par un ou deux symboles :

-   Plus grand que `>`

-   Plus grand ou égal à `>=`

-   Plus petit que `<`

-   Plus petit ou égal à `<=`

-   Égal à `==`

-   Différent de `!=`

Une expression conditionnelle simple peut s'écrire avec un opérateur de comparaison entouré de deux valeurs, variables, ou expressions. Ainsi, avec une variable `piece_d_or` préalablement définie, notre exemple peut s'écrire de la manière suivante :


`piece_d_or >= 100`


Comme vu précédemment pour les expressions en général, une expression conditionnelle est également *évaluée* lorsqu'elle est exécutée. Comme le résultat d'une condition peut être *Oui* ou *Non*, il est logique qu'une expression conditionnelle soit évaluée à `True` ou `False`. Dans le programme suivant, l'expression à l'intérieur du premier `print()` est évaluée à `True`, alors que celle du deuxième est évaluée à `False`.

```{code-block} python
:caption: Ecriture d'expressions conditionnelles
pieces_d_or = 80
print(piece_d_or >= 100)
piece_d_or += 20
print(piece_d_or >= 100)
```

À l'exécution du programme suivant, celui-ci n'affichera `True` que si l'utilisateur écrit exactement le mot de passe *Fr1B0urG*, et `False` sinon.

```{code-block} python
:caption: Afficher une autre expression conditionnelle
mdp = input("Quel est le mot de passe ?")
mot_de_passe_correct = mdp == "Fr1B0urG"
print(mot_de_passe_correct)
```

## Si \... Sinon

Pour transcrire l'exemple de l'achat d'une épée complètement en Python, il ne manque maintenant plus qu'à traduire le *si* et *sinon*. Les mots-clefs Python qui permettent ceci sont faciles à retenir, car il s'agit de leur traduction littérale en anglais, c'est-à-dire `if` et `else`. Il faut toutefois se rappeler qu'une ligne contenant un `if` ou un `else` doit impérativement se terminer par deux-points. Ainsi, voici notre exemple complet en Python :

```{code-block} python
:caption: Programme Python d'achat d'une épée
pieces_d_or = 120
if piece_d_or >= 100:
    piece_d_or -= 100
    print("Merci pour votre achat")
else:
    print("Revenez plus tard quand vous aurez assez d'argent")
```

Vous pouvez noter dans cet exemple que les trois instructions faisant partie des deux branches différentes sont décalées vers la droite. On appelle un tel décalage une *indentation*. Cette indentation est obligatoire en dessous d'un `if` ou d'un `else` et permet de décrire le *bloc d'instructions* qui doit être exécuté lorsque l'expression conditionnelle est respectée ou non. Concrètement, lorsque l'expression conditionnelle est évaluée à `True`, les instructions indentées sous le `if` sont exécutées, et, lorsqu'elle est évaluée à `False`, celles indentées sous le `else` le sont. L'utilité de l'indentation s'illustre dans l'exemple suivant :

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

Si toutefois on décidait d'indenter ce dernier `print()` sous le `else`, alors ce texte ne serait affiché que dans le cas où `age` ne serait pas inférieur à `18`. Il faut donc être très vigilant avec l'indentation et ne décaler que les instructions devant appartenir au branchement conditionnel.

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

Certaines situations conditionnelles nécessitent plus que 1 ou 2 blocs d'instructions. Pensez par exemple au jeu du Devin que nous avons présenté en introduction. Lorsque l'utilisateur essaie de deviner le nombre, 3 chemins différents peuvent être empruntés :

```{code-block} text
Si le nombre du joueur est plus grand que le nombre mystère
    Afficher le message "Le nombre est trop grand"
Sinon si le nombre du joueur est plus petit que le nombre mystère
    Afficher le message "Le nombre est trop petit"
Sinon
    Afficher le message "Félicitations ! Tu as trouvé le nombre mystère"
```

Dans cet exemple, notez bien les deux éléments suivants :

1.  Nous n'avons pas besoin de condition contrôlant si le nombre du joueur est égal au nombre mystère. En effet, si les deux premières conditions ne sont pas respectées, il est alors logique que le cas `Sinon` corresponde au cas où les deux nombres sont égaux.

2.  La 2ème condition est bien précédée par un `Sinon si`. De cette manière, on comprend que ce cas est lié au précédent. Il est également impératif de suivre ce raisonnement en programmation.

En Python, on peut simplement transcrire le `Sinon si` par `elif` (qui est la contraction de `else` et `if`). De cette manière, le branchement conditionnel de notre jeu du Devin peut s'écrire comme dans le programme ci-dessous. Ce code ne permet pas encore de jouer réellement à ce mini-jeu, car nous devons relancer le programme entre chaque essai, et le nombre à deviner ne change jamais. Ces problèmes seront résolus dans le prochain chapitre.

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

## Étude de cas : algorithme du discriminant

Maintenant que vous maîtrisez les variables, les entrées, les sorties, et les branchements conditionnels, nous pouvons commencer à écrire des programmes intéressants. En cours de mathématiques, vous avez probablement étudié la résolution d'équations du 2ème degré grâce à l'algorithme du discriminant. Pour rappel, il s'agit de résoudre une équation du type


$$ax^2 + bx + c = 0$$


pour une inconnue $x$ et des nombres réels $a$, $b$, et $c$. La méthode du discriminant permet de trouver les éventuelles solutions de la manière suivante :


- Calculer le discriminant $D = b^2 - 4ac$
- Si $D$ est plus grand que 0
    - L’équation a deux solutions
    - $x_1 = \frac{-b + \sqrt{D}}{2a}$
    - $x_2 = \frac{-b - \sqrt{D}}{2a}$
- Sinon si $D$ est égal à 0
    - L’équation a une solution
    - $x = \frac{-b}{2a}$
- Sinon
    - L’équation n’a pas de solution

Plutôt que de toujours effectuer cet algorithme à la main, pourquoi ne pas créer un programme qui l'exécute automatiquement ? Mis à part le calcul de la racine carrée, vous avez déjà tous les outils en main pour le réaliser. Allons-y pas à pas. Pour commencer, nous allons demander à l'utilisateur quelle équation il souhaite résoudre. Cela implique de lui demander les 3 coefficients $a$, $b$, et $c$. Comme il s'agit de nombres réels, nous allons convertir les entrées de l'utilisateur en `float`. Nous allons ensuite utiliser ces valeurs pour calculer le discriminant $D$.

```{code-block} python
print("Quelle équation de type ax\^2+bx+c = 0 souhaitez-vous résoudre ?")
a = float(input("Quel est le coefficient a ?"))
b = float(input("Quel est le coefficient b ?"))
c = float(input("Quel est le coefficient c ?"))
D = b**2 - 4 * a * c
```

A ce point, nous entrons dans la partie de l'algorithme contenant un branchement conditionnel. Il s'agit alors d'utiliser une structure `if elif else` pour afficher le nombre de solutions de l'équation. Ainsi, sans encore calculer les solutions, le programme devient :

```{code-block} python
print("Quelle équation de type ax\^2+bx+c = 0 souhaitez-vous résoudre ?")
a = float(input("Quel est le coefficient a ?"))
b = float(input("Quel est le coefficient b ?"))
c = float(input("Quel est le coefficient c ?"))
D = b**2 - 4 * a * c

if D > 0:
    print("L'équation a deux solutions")
elif D == 0:
    print("L'équation a une solution")
else:
    print("L'équation n'a pas de solution")
```

Il ne reste alors plus qu'à calculer les solutions pour ensuite les afficher. Nous n'avons toutefois pas encore vu comment effectuer une racine carrée. En effet, de base, il n'existe pas en Python d'opérateur ou de fonction permettant de calculer une racine carrée. Pour obtenir une telle fonction, il faut l'*importer* depuis un *module*. Un module est simplement un bout de code écrit par un autre programmeur et que nous allons réutiliser. Ces modules doivent souvent être téléchargés et installés. Toutefois, le module `math` qui contient notre fonction de racine carrée est déjà installé avec Python. Ainsi, pour importer le module dans notre code, il suffit d'ajouter **tout au début de notre code** la ligne suivante :

```{code-block} python
from math import *
```

Celle-ci signifie *importer toutes les fonctions du module math*. Cette ligne permet donc d'importer des fonctions telles que `sin()`, `cos()`, `log()`, ou, celle qui nous intéresse, `sqrt()` (abréviation de *square root*, racine carrée en anglais). On peut donc maintenant mettre une valeur de type `int` ou `float` entre les parenthèses de `sqrt()` pour obtenir sa racine carrée. Ainsi, en étant vigilant avec les parenthèses pour respecter la priorité des opérations, l'expression correspondant au calcul $\frac{-b + \sqrt{D}}{2a}$ et permettant de trouver la première solution lorsque `D > 0` est :

::: center
`( -b + sqrt(D) ) / (2 * a)`
:::

Ainsi, le programme suivant permet de résoudre n'importe quelle équation du 2ème degré.

```{code-block} python
from math import *

print("Quelle équation de type ax\^2+bx+c = 0 souhaitez-vous résoudre ?")
a = float(input("Quel est le coefficient a ?"))
b = float(input("Quel est le coefficient b ?"))
c = float(input("Quel est le coefficient c ?"))
D = b**2 - 4 * a * c

if D > 0:
    x_1 = ( -b + sqrt(D) ) / (2 * a)
    x_2 = ( -b - sqrt(D) ) / (2 * a)
    print("L'équation a deux solutions : x_1 =", x_1, "et x_2 =", x_2)
elif D == 0:
    x = -b / (2 * a)
    print("L'équation a une solution : x =", x)
else:
    print("L'équation n'a pas de solution")
```

On peut dès lors facilement résoudre l'équation $4x^2 + 5x + 1$ en exécutant le programme et en y écrivant les coefficients correspondant de la manière suivante :

```{code-block} text
Quelle ´equation de type ax^2+bx+c= 0 souhaitez-vous résoudre ?
Quel est le coefficient a ?4
Quel est le coefficient b ?5
Quel est le coefficient c ?1
L’´equation a deux solutions : x 1 = -0.25 et x 2 = -1.0
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

Voici un dernier exemple combinant plusieurs opérateurs logiques. Essayez de réfléchir quelles devraient être les entrées de l'utilisateur pour afficher chacun des textes.

```{code-block} python
meteo = input("Quel temps fait-il ? (soleil/pluie/neige)")
lieu = input("Où voulez-vous aller ? (dedans/dehors)")
humeur = input ("Vous êtes de bonne/mauvaise humeur ?")

if meteo == "soleil" and lieu == "dehors" :
    print("Mettez de la crème solaire ! ")

if meteo == "pluie" or meteo == "neige" :
    print("Mettez une veste !")

elif meteo == "soleil" or (humeur == "mauvaise" and meteo != "neige"):
    print("Allez chercher une glace !")

else:
    print("Je n'ai pas de recommandation")
```

## Exercices

### Exercice 1
Évaluez les expressions conditionnelles ci-dessous à `True` ou `False`, pour une variable `pays` contenant la valeur `"Suisse"` et la variable `temperature` contenant la valeur `26.2`

1.  `pays == "Suisse"`

2.  `pays != "France"`

3.  `temperature > 20`

4.  `temperature < 26.2`

5.  `temperature >= 26.2`

6.  `temperature < 26`

7.  `temperature != 26.2`

````{admonition} Solution
:class: note dropdown
1.  `True`

2.  `True`

3.  `True`

4.  `False`

5.  `True`

6.  `False`

7.  `False`
````

### Exercice 2
Le programme suivant est censé contrôler si un utilisateur est majeur ou non. Toutefois, il contient 6 erreurs. Trouvez-les et corrigez-les

```{code-block} python
age = input("Quel âge avez-vous ?")
if age > 18
print("Vous êtes mineur")
else
print("Vous êtes majeur")
```

````{admonition} Solution
:class: note dropdown
```{code-block} python
age = int(input("Quel âge avez-vous ?"))
if age < 18:
    print("Vous êtes mineurs")
else:
    print("Vous êtes majeurs")
```

1.  Comme `age` est comparé avec `18` qui est un `int`, il faut convertir cette variable dans ce type.

2.  Il manquait les deux-points à la fin des lignes du `if` et du `else`.

3.  Il y avait une erreur de logique : le programme disait que l'on était mineur si l'on avait plus de 18 ans. Il fallait donc remplacer le `>` par un `<`.
````

### Exercice 3
Écrivez un programme permettant de calculer le prix que coûte un certain nombre d'œufs que l'utilisateur souhaite acheter, sachant qu'un œuf coûte 1.50 CHF. Si l'utilisateur entre un nombre négatif, alors le programme ne calculera pas de prix et affichera un message d'erreur à la place. Deux exécutions possibles de ce programme pourraient être les suivantes.

````{admonition} Solution
:class: note dropdown
```{code-block} python
nb_oeufs = int(input("Combien d'œufs souhaitez-vous acheter ?"))
if nb_oeufs < 0:
    print("Cela n'est pas possible, vous avez écrit un nombre négatif")
else:
    print("Cela vous coûtera ", nb_oeufs * 1.5, " CHF")
```
````

### Exercice 4
Expliquez la différence entre les deux programmes ci-dessous.


```{code-block} python
:caption: Programme 1
prenom = input("Quel est votre prénom ?")
if prenom == "Maxime":
    print("Très joli prénom !")
else:
    print("Bonjour", prenom)
print("A bientôt")
```


```{code-block} python
:caption: Programme 2
prenom = input("Quel est votre prénom ?")
if prenom == "Maxime":
    print("Très joli prénom !")
else:
    print("Bonjour", prenom)
    print("A bientôt")
```

````{admonition} Solution
:class: note dropdown
Dans le premier programme, le message `A bientôt` est affiché dans tous les cas. Dans le deuxième programme, ce message n'est affiché que lorsque l'utilisateur n'entre pas le prénom `Maxime`.
````

### Exercice 5
Expliquez ce que fait le programme suivant et complétez les chaînes de caractères de manière cohérente.

```{code-block} python
CHF = float(input("Combien avez-vous de francs suisses en poche ?"))
a_deposer = float(input("Combien de francs souhaitez-vous déposer en banque ?")) banque = 0
if a_deposer > CHF:
    print("")
elif a_deposer > 0:
    CHF -= a_deposer
    banque += a_deposer
    print("", CHF, "")
    print("", banque, "")
else: print("")
```

````{admonition} Solution
:class: note dropdown
Ce programme permet de déposer de l'argent sur un compte bancaire fictif. Ce programme contrôle que l'utilisateur possède assez d'argent sur lui avant de créditer le compte. De plus, si l'utilisateur a entré un nombre négatif de CHF à déposer sur le compte, aucune transaction n'est réalisée.

```{code-block} python
CHF = float(input("Combien avez-vous de francs suisses en poche ?"))
a_deposer = float(input("Combien de francs souhaitez-vous déposer en banque ?"))
banque = 0
if a_deposer > CHF:
    print("Vous n'avez pas autant d'argent !")
elif a_deposer > 0:
    CHF -= a_deposer
    banque += a_deposer
    print("Il vous reste", CHF, "CHF en poche")
    print("Il y a", banque, "CHF en banque")
else:
    print("Aucune transaction n'a été réalisée")
```
````

### Exercice 6
Écrivez un programme demandant un prénom à l'utilisateur et affichant sa signification. Le programme connaît les significations suivantes.

-   Maxime signifie "celui qui est le plus grand"

-   Félix signifie "celui qui est heureux"

-   Sylvie signifie "celle qui vient de la forêt"

-   Fabien signifie "l'artisan"

-   Clara signifie "celle qui est brillante"

Si un autre prénom est donné au programme, le message `"Je ne connais pas la signification de ce prénom"` sera affiché. De plus, le programme se terminera dans tous les cas par le message `"Au revoir"`.


````{admonition} Solution
:class: note dropdown
```{code-block} python
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

### Exercice 7
Donnez l'affichage du programme suivant pour `x` étant initialisé à -10 et 7.

```{code-block} python
x = ...
if x < 0 :
    print("A")
else :
    print("B")
if x >= 3 or x < -5 :
    print("C")
if x**2 >= 10 and x >= 0 :
    print("D")
if x / 2 < 0 :
    x += 5
else :
    x -= 5
print("E")
if x <= -5 :
    print("F")
elif x <= 10:
    print("G")
else :
    print("H")
if x > -2 or x <= -5 :
    print(x * x)
else :
    print(x + x)
```

````{admonition} Solution
:class: note dropdown
Avec des retours à la ligne plutôt que des espaces :

-   Pour `x = -10` : A C E F 25

-   Pour `x = 7` : B C D E G 4
````

### Exercice 8
Écrivez un programme dans lequel l'utilisateur peut entrer le prix d'un article ainsi qu'un code de réduction et qui calcule le prix final en conséquence. Les conditions d'application de réduction ainsi que 3 exemples d'exécution sont donnés ci-dessous. Votre programme ne doit utiliser la fonction `print()` **qu'une seule fois** et à la dernière ligne du programme.

-   Avec le code `"STX"`, un article à moins de 100CHF est réduit de 20%

-   Avec le code `"STX"`, un article à plus de 200CHF est réduit de 35%

-   Les autres articles avec le code `"STX"` ont une réduction de 20CHF

-   Avec le code `"CSMI"` ou le code `"CGAM"`, le prix est **augmenté**
    de 10CHF

-   Autrement, aucun changement de prix n'est effectué

````{admonition} Solution
:class: note dropdown
```{code-block} python
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
