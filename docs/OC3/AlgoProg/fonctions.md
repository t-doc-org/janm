<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Fonctions

## Qu'est-ce qu'une fonction ?
Dans un programme, certains blocs d'instructions doivent être réutilisés à plusieurs endroits. On peut par exemple imaginer une dizaine d'instructions permettant de vérifier qu'un mot de passe est suffisamment robuste (au moins 12 caractères, une majuscule, un caractère spécial, etc.). Ces instructions devront non seulement être utilisées lors de l'inscription d'un nouvel utilisateur, mais également lors du changement de mot de passe.

On pourrait simplement copier/coller ces dix lignes à ces deux endroits du programme. Dès lors, le programme pourrait être représenté avec le schéma ci-dessous, dans lequel les cases bleues représentent le même code dupliqué à deux endroits différents.

```{image} images/func_copy_paste.png
:width: 25%
:alt: Schéma d'un programme dans lequel le même bloc de code est copié à deux endroits
:align: center
```

Toutefois, recopier les mêmes instructions plusieurs fois vient avec des désavantages
 - Si le code doit être modifié, il faudra aller le changer partout où il a été copié/collé
 - Du point de vue d'un programmeur qui découvre le code, il n'est pas clair au 1er coup d'oeil que ces lignes copiées/collées sont les mêmes et qu'elles doivent le rester
 - Pour ce même programmeur, l'utilité de ces lignes n'est pas directement claire non plus : il devra les lire pour les analyser et les comprendre.

Pour pallier ces problèmes, le code utilisé 2x ne doit pas être copié/collé, mais déplacé "en marge" du programme principal dans une **fonction**. Lorsque, dans notre programme, on souhaite utiliser ces instructions mises en marge, on ne fait alors qu'un *appel* à cette fonction. Le programme ressemblera dès lors à cela :

```{image} images/func_side.png
:width: 50%
:alt: Schéma d'un programme qui appelle deux fois une fonction F définie en marge
:align: center
```

Avec cela, lorsqu'on modifie une fois le code à réutiliser, la modification impactera tous les appels de fonction. De plus, le nom de la fonction (ici `F`) devrait être significatif et nommer l'action effectuée par la fonction. Dans l'exemple de la vérification de sécurité du mot de passe, la fonction aurait pu avoir comme nom `vérifie_sécurité_mdp`. Ainsi, avec une fonction, le programme devient plus lisible et est plus facilement modifiable.

## Définir et appeler une fonction
Le mot-clef permettant de définir une fonction est `def`. Celui-ci est suivi du nom de la fonction puis d'une paire de parenthèses et de deux-points. Les instructions indentées sous la définition constituent le *corps* de la fonction, c'est-à-dire le bloc d'instructions à exécuter lorsque la fonction est appelée.

Définir une fonction ne l'exécute pas : il faut encore l'**appeler**, en écrivant son nom suivi d'une paire de parenthèses. Dans l'exemple ci-dessous, la fonction `affiche_salutations` est définie une seule fois, puis appelée 2x à différents endroits du programme.

```{exec} python
:linenos:
def affiche_salutations():
    print("Bonjour")
    print("Comment allez-vous ?")

print("Début du programme")
affiche_salutations()
print("Pouvez-vous répéter svp, je n'ai pas compris")
affiche_salutations()
```

## Fonction avec paramètres
Les fonctions peuvent être *paramétrées*. C'est-à-dire que leur exécution va dépendre de valeurs qui seront précisées au moment de l'appel. Ces paramètres se placent entre les parenthèses de la définition de la fonction et sont séparés par une virgule. Ils peuvent ensuite être réutilisés dans le corps de la fonction. Lors de l'appel, on précise obligatoirement les valeurs des paramètres entre les parenthèses.

```{exec} python
:linenos:
def calcul_et_affiche_aire_triangle(base, hauteur):
    aire = base * hauteur / 2
    print("L'aire d'un triangle de", base, "de base et", hauteur, "de hauteur est de", aire)

calcul_et_affiche_aire_triangle(10, 20)
calcul_et_affiche_aire_triangle(20, 10)
calcul_et_affiche_aire_triangle(35, 54)
```

## Afficher n'est pas retourner
La fonction ci-dessus **affiche** son résultat avec un `print`. Le problème, c'est que les valeurs affichées sont ensuite **perdues** : impossible de les additionner pour obtenir l'aire totale, de les comparer, ou de les réutiliser plus loin. La fonction a montré le résultat à l'écran, mais elle ne l'a pas *donné* au programme.

Avec le mot-clef `return`, la fonction **rend** sa valeur au programme au lieu de simplement l'afficher. On peut alors la récupérer dans une variable et l'utiliser à notre guise, par exemple pour additionner deux aires.

```{exec} python
:linenos:
def aire_triangle(base, hauteur):
    aire = base * hauteur / 2
    return aire

aire1 = aire_triangle(5, 10)
aire2 = aire_triangle(10, 13)

aire_totale = aire1 + aire2
print("Aire totale :", aire_totale)
```

```{important}
- `print` **affiche** une valeur à l'écran. On la voit, mais le programme ne peut pas la réutiliser.
- `return` **rend** une valeur au programme. Rien ne s'affiche, mais on peut la récupérer et la réutiliser.
```

## Récupérer et utiliser une valeur de retour
Une valeur retournée n'est utile que si on la **récupère**. Dans le programme ci-dessous, la fonction calcule bien le double de 5, mais comme le résultat n'est rangé nulle part, il est immédiatement **perdu** : le programme n'affiche donc rien du tout.

```{exec} python
:linenos:
def double(nombre):
    return nombre * 2

double(5)   # la valeur 10 est calculée... puis jetée
```

Pour utiliser la valeur retournée, il faut la **capter** en la plaçant après une variable et un `=`, exactement comme on le fait avec un `input()`. Plus généralement, l'appel d'une fonction qui retourne une valeur peut s'utiliser **partout où l'on pourrait écrire cette valeur** : dans une variable, directement dans un `print`, dans un calcul ou dans une condition.

```{exec} python
:linenos:
def double(nombre):
    return nombre * 2

resultat = double(5)            # ranger le résultat dans une variable
print(resultat)
print(double(5))                # afficher directement le résultat
total = double(5) + double(10)  # utiliser le résultat dans un calcul
print("Total :", total)

if double(5) > 8:               # utiliser le résultat dans une condition
    print("Le double de 5 est plus grand que 8")
```

```{warning}
C'est l'erreur la plus fréquente avec les fonctions : écrire `double(5)` en pensant que "ça va
afficher 10". Une fonction qui `return` **n'affiche jamais rien** toute seule. Si vous voulez
voir la valeur, il faut soit la ranger dans une variable, soit l'afficher vous-même avec un
`print`.
```

## Le `return` met fin à la fonction
Dès qu'un `return` est exécuté, la fonction **s'arrête immédiatement** : les instructions qui le suivent dans le corps de la fonction ne sont jamais exécutées. Dans l'exemple ci-dessous, si le nombre est positif, le premier `return` renvoie sa valeur et quitte la fonction ; le second `return` n'est atteint que pour les nombres négatifs. On n'a donc même pas besoin d'un `else`.

```{exec} python
:linenos:
def valeur_absolue(nombre):
    if nombre >= 0:
        return nombre
    return -nombre

print(valeur_absolue(7))
print(valeur_absolue(-4))
```

## Exercices

```{role} ordre(quiz-input)
:right: width: 8rem;
:check: uppercase remove
```

```{role} nb(quiz-input)
:right: width: 5rem;
:check: trim
```

```{role} aff(quiz-input)
:right: width: 8rem;
:check: lowercase trim
```

### Exercice {num1}`exercice-python`
Définir une fonction et l'appeler sont deux choses différentes, et les lignes d'un programme ne
s'exécutent plus forcément de haut en bas. Lisez attentivement le programme ci-dessous et
répondez **sans l'exécuter**.

```{code-block} python
:linenos:
def bonjour():
    print("B")
    print("C")

print("A")
bonjour()
print("D")
bonjour()
print("E")
```

```{quiz}
:style: max-width: 36rem;
1. {ordre}`ABCDBCE`
Dans quel ordre les lettres s'affichent-elles ? Écrivez-les à la suite, sans espaces.

2. {nb}`5`
Quelle est la **première** ligne exécutée par le programme ?

3. {nb}`2`
Combien de fois la ligne 3 est-elle exécutée ?

4. {nb}`1`
Combien de fois la ligne 5 est-elle exécutée ?
```

````{solution}
La réponse est **ABCDBCE**.

Les lignes 1 à 3 ne font que **définir** la fonction : elles ne s'exécutent pas au moment où
Python les lit. La première ligne réellement exécutée est donc la **ligne 5**, qui affiche `A`.

Arrivé à la ligne 6, Python saute dans le corps de la fonction, exécute les lignes 2 et 3
(`B` puis `C`), **revient** à la ligne 6, puis continue avec la ligne 7 (`D`). Le deuxième appel,
ligne 8, refait exactement le même détour : `B` puis `C` à nouveau. Enfin la ligne 9 affiche `E`.

Les lignes 2 et 3 s'exécutent donc **deux** fois chacune, alors qu'elles ne sont écrites qu'une
seule fois : c'est précisément l'intérêt d'une fonction.
````

### Exercice {num1}`exercice-python`
Les cinq programmes ci-dessous se ressemblent, mais n'affichent pas la même chose. Pour chacun,
prédisez **ce qui s'affiche à l'écran**, en réfléchissant à ce que fait vraiment chaque appel de
fonction. Si le programme n'affiche rien, écrivez `rien`.

```````{quiz}
1.  {aff}`Terminé`
    ```{code-block} python
    def double(nombre):
        return nombre * 2

    double(5)
    print("Terminé")
    ```

2.  {aff}`10`
    ```{code-block} python
    def double(nombre):
        return nombre * 2

    resultat = double(5)
    print(resultat)
    ```

3.  {aff}`10`
    ```{code-block} python
    def double(nombre):
        print(nombre * 2)

    double(5)
    ```

4.  {aff}`30`
    ```{code-block} python
    def double(nombre):
        return nombre * 2

    print(double(5) + double(10))
    ```

5.  {aff}`17`
    ```{code-block} python
    def prix_total(quantite):
        return quantite * 3

    commande = prix_total(4)
    print(commande + 5)
    ```
```````

````{solution}
1.  **`Terminé`** seulement. La fonction calcule bien `10`, mais comme cet appel `double(5)` n'est
    rangé dans aucune variable, la valeur est aussitôt **perdue**. La seule chose affichée est le
    `print("Terminé")` de la dernière ligne. C'est le piège n° 1 des fonctions : un `return`
    n'affiche rien tout seul.

2.  **`10`**. Cette fois l'appel est capté dans la variable `resultat`, que le `print` affiche
    ensuite.

3.  **`10`** également, mais pour une raison **opposée** au programme 2 ! Ici la fonction ne
    retourne rien : c'est elle-même qui contient le `print`. Le résultat s'affiche donc pendant
    l'appel. Les programmes 2 et 3 affichent la même chose, mais dans le programme 3 on ne
    pourrait **pas** réutiliser la valeur `10` ailleurs, alors que dans le programme 2, oui.

4.  **`30`**. Un appel qui retourne une valeur peut s'utiliser directement dans un calcul :
    `double(5)` vaut 10, `double(10)` vaut 20, et c'est leur somme qui est affichée.

5.  **`17`**. L'appel `prix_total(4)` retourne `12`, qui est rangé dans `commande`. La dernière
    ligne affiche donc `commande + 5`, soit `17`.
````

### Exercice {num1}`exercice-python`
Chacun des programmes suivants comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique.
1.  ```{exec} python
    :editor:
    def périmètre_carré(côté):
        périmètre = côté * 4
        print(périmètre)

    p1 = périmètre_carré(5)
    p2 = périmètre_carré(7)
    total = p1 + p2
    print(total)
    ```

2.  ```{exec} python
    :editor:
    def maximum(liste):
        maximum = -99999
        for n in liste:
            if n > maximum:
                maximum = n
        return maximum

    #Doit afficher le maximum de la liste ci-dessous
    ma_liste = [4, 6, 2, 8, -4, 3, 10, 9, 4, 7, -3]
    maximum(ma_liste)
    ```

3.  ```{exec} python
    :editor:
    def applique_réduction(prix, code):
        if code == "STX":
            return prix * 0.8
        elif code == "JANM":
            return prix * 0.65
        elif code == "FRI":
            return prix * 0.9
        else:
            return prix

    prix_de_base_1 = 67
    prix_de_base_2 = 45
    applique_réduction(prix_de_base_1, "JANM")
    applique_réduction(prix_de_base_2, "STX")
    prix_réduit_total = prix_de_base_1 + prix_de_base_2
    print(prix_réduit_total)
    ```

4.  ```{exec} python
    :editor:
    def ajoute_s(mot, nombre):
        if nombre > 1:
            mot + "s"
        else:
            mot

    n_chat = int(input("Combien de chats as-tu ?"))
    n_chien = int(input("Combien de chiens as-tu ?"))
    txt_chat = ajoute_s("chat", n_chat)
    txt_chien = ajoute_s("chien", n_chien)
    print("Tu as", n_chat, txt_chat, "et", n_chien, txt_chien)
    ```

````{solution}
1.  ```{exec} python
    :linenos:
    def périmètre_carré(côté):
        périmètre = côté * 4
        return périmètre

    p1 = périmètre_carré(5)
    p2 = périmètre_carré(7)
    total = p1 + p2
    print(total)
    ```
    Avec un `print`, la fonction affiche le périmètre mais ne le rend pas : `p1` et `p2` ne
    contiennent alors rien (`None`) et l'addition plante. Il faut un `return`.

2.  ```{exec} python
    :linenos:
    def maximum(liste):
        maximum = -99999
        for n in liste:
            if n > maximum:
                maximum = n
        return maximum

    #Doit afficher le maximum de la liste ci-dessous
    ma_liste = [4, 6, 2, 8, -4, 3, 10, 9, 4, 7, -3]
    m = maximum(ma_liste)
    print(m)
    ```
    La fonction est correcte, mais sa valeur de retour n'est ni récupérée ni affichée.

3.  ```{exec} python
    :linenos:
    def applique_réduction(prix, code):
        if code == "STX":
            return prix * 0.8
        elif code == "JANM":
            return prix * 0.65
        elif code == "FRI":
            return prix * 0.9
        else:
            return prix

    prix_de_base_1 = 67
    prix_de_base_2 = 45
    réduit_1 = applique_réduction(prix_de_base_1, "JANM")
    réduit_2 = applique_réduction(prix_de_base_2, "STX")
    prix_réduit_total = réduit_1 + réduit_2
    print(prix_réduit_total)
    ```
    Appeler la fonction ne modifie pas les variables `prix_de_base_1` et `prix_de_base_2` : les
    prix réduits sont **retournés**, il faut donc les récupérer dans de nouvelles variables.

4.  ```{exec} python
    :linenos:
    def ajoute_s(mot, nombre):
        if nombre > 1:
            return mot + "s"
        else:
            return mot

    n_chat = int(input("Combien de chats as-tu ?"))
    n_chien = int(input("Combien de chiens as-tu ?"))
    txt_chat = ajoute_s("chat", n_chat)
    txt_chien = ajoute_s("chien", n_chien)
    print("Tu as", n_chat, txt_chat, "et", n_chien, txt_chien)
    ```
    Calculer `mot + "s"` ne suffit pas : sans `return`, ce texte est calculé puis perdu.
````

### Exercice {num1}`exercice-python`
Définissez une fonction nommée `sanctions_STX` permettant de déterminer les sanctions à STX en fonction du nombre de retards et du nombre d'absences injustifiées. Pour rappel, les sanctions sont les suivantes :
 - Au moins 3 retards ou 2 absences injustifiées : `retenue`
 - Au moins 6 retards ou 4 absences injustifiées : `retenue samedi matin`
 - Au moins 9 retards ou 6 absences injustifiées : `avertissement écrit`
 - Au moins 12 retards ou 8 absences injustifiées : `menace d'exclusion`
 - Au moins 15 retards ou 10 absences injustifiées : `exclusion`
 - En dessous de tout cela : `rien`

La fonction **retourne** la sanction. Utilisez-la ensuite pour déterminer les sanctions de 2 élèves : l'un ayant 4 retards et 0 absence injustifiée, l'autre 2 retards et 2 absences injustifiées.

Si les deux sanctions sont pareilles, votre programme affichera en plus : `Deux mêmes sanctions...`

```{exec} python
:editor: 01a162e5-bacb-73c2-a238-c174e281f5a9

def sanctions_STX(n_retards, n_absences_inj):

```

````{solution}
```{exec} python
:linenos:
def sanctions_STX(n_retards, n_absences_inj):
    if n_retards >= 15 or n_absences_inj >= 10:
        return "exclusion"
    elif n_retards >= 12 or n_absences_inj >= 8:
        return "menace d'exclusion"
    elif n_retards >= 9 or n_absences_inj >= 6:
        return "avertissement écrit"
    elif n_retards >= 6 or n_absences_inj >= 4:
        return "retenue samedi matin"
    elif n_retards >= 3 or n_absences_inj >= 2:
        return "retenue"
    else:
        return "rien"

sanction1 = sanctions_STX(4, 0)
sanction2 = sanctions_STX(2, 2)
print("Sanction du 1er élève :", sanction1)
print("Sanction du 2ème élève :", sanction2)
if sanction1 == sanction2:
    print("Deux mêmes sanctions...")
```
Les conditions sont testées de la sanction la **plus grave** à la moins grave : comme un `return`
met fin à la fonction, dès qu'une condition est vraie, les suivantes ne sont plus testées. Dans
l'ordre inverse, un élève avec 15 retards recevrait une simple `retenue`.
````

### Exercice {num1}`exercice-python`
Une fonction devient vraiment utile lorsqu'on la réutilise sur des données différentes. Écrivez
une fonction `moyenne` qui reçoit une **liste de nombres** en paramètre et qui **retourne** leur
moyenne. Utilisez-la ensuite, sans la réécrire, pour afficher successivement le prix moyen des
pizzas d'une carte et la température moyenne de la semaine.

```{exec} python
:editor: 01a162e5-bacd-79a3-90ab-3180fa2f88f8
def moyenne(liste):
    # Complétez le corps de la fonction

prix_pizzas = [12.5, 18, 22.5, 15, 19]
températures = [14, 17, 21, 19, 12, 9, 13]

# Appelez la fonction deux fois et affichez les deux résultats
```

````{solution}
```{exec} python
:linenos:
def moyenne(liste):
    total = 0
    for valeur in liste:
        total = total + valeur
    return total / len(liste)

prix_pizzas = [12.5, 18, 22.5, 15, 19]
températures = [14, 17, 21, 19, 12, 9, 13]

print("Prix moyen d'une pizza :", moyenne(prix_pizzas), "CHF")
print("Température moyenne de la semaine :", moyenne(températures), "°C")
```
Le prix moyen est de 17.4 CHF et la température moyenne de 15 °C.

Remarquez que la fonction ne sait rien des pizzas ni de la météo : elle reçoit une liste de nombres et rend
leur moyenne, un point c'est tout. C'est ce qui permet de l'appeler deux fois sur des données
qui n'ont aucun rapport entre elles.
````
