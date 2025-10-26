```{metadata}
solutions: show
```
# Révisions - Boucles conditionnelles
```{youtube} 0_gtEj-HR24
```
## Qu'est-ce qu'une boucle conditionnelle ?

Dans un programme, certaines instructions doivent s'exécuter plusieurs fois. Imaginez un programme dans lequel l'utilisateur doit entrer son mot de passe pour se connecter. Ici, l'instruction `print("Mot de pas incorrect")` doit être potentiellement exécutée plusieurs fois **tant que** l'utilisateur entre un mauvais mot de passe. C'est une boucle conditionnelle qui nous permettra de répéter des instructions de cette manière. Grâce à celle-ci, un bloc d'instructions peut être répété *en boucle* tant qu'une condition est respectée. 

En pseudocode, l'exemple du programme de connexion avec une boucle conditionnelle pourrait donc s'écrire de la manière suivante :
```{code-block} text
:linenos:
Demander le mot de passe à l'utilisateur et le stocker dans la variable mdp
Tant que mdp est différent de "Fr1B0urg"
    Afficher "Mot de passe incorrect"
    Redemander le mot de passe et le stocker dans mdp
Afficher "Connexion réussie"
```

Dans ce pseudocode, quand l'exécution arrive à la ligne 2, la condition est évaluée pour déterminer si l'on entre dans la boucle ou non. Dans le cas où le résultat de la condition est vrai (c'est-à-dire que le mot de passe est incorrect), on entre dans la boucle. Cela signifie que le bloc d'instruction indenté en dessous est exécuté. Au terme de l'exécution de ce bloc, on remonte à la ligne 2 pour réévaluer la condition. Si elle est vraie, on entre à nouveau dans la boucle et le bloc d'instruction indenté est réexécuté. Lorsqu'en revanche la condition de la ligne 2 est fausse, le bloc indenté est ignoré et la ligne 5 est exécutée.

## La boucle while

En Python, une boucle conditionnelle s'écrit avec le mot-clef `while` (littéralement *tant que*). Ce mot-clef est suivi d'une condition qui détermine si l'on entre dans la boucle (quand la condition est `True`) ou si on en sort (quand la condition est `False`). Quand on entre dans la boucle, le bloc d'instructions indenté sous le `while` est exécuté. Au terme de cette exécution, on *remonte* à la ligne du `while` et la condition est réévaluée pour déterminer si l'on entre à nouveau dans la boucle ou non.

L'exemple du programme de connexion décrit précédemment en pseudocode peut alors s'écrire de la manière suivante.


```{exec} python
:linenos:
mdp = input("Entrez le mot de passe")
while mdp != "Fr1B0urg" :
    print("Mot de passe incorrect")
    mdp = input("Entrez à nouveau le mot de passe")
print("Mot de passe correct")
```

Le boucle `while` peut également être utilisée pour répéter un bloc d'instructions un nombre déterminé de fois, comme dans le programme ci-dessous qui permet de compter jusqu'à 10.

```{exec} python
:linenos:
compteur = 1
while compteur <= 10 :
    print(compteur)
    compteur = compteur + 1
```


## Exercices

### Exercice {num1}`exercice-revision`

Chacun des programmes suivant comporte au moins une erreur. Parfois, cette erreur fait directement buguer le programme avec un message d'erreur rouge. D'autres fois, le programme s'exécute correctement, mais son résultat n'est pas logique.


Corrigez chacun de ces codes de manière à ce qu'ils s'exécutent correctement et affichent un résultat logique.

1.  ```{exec} python
    :editor:
    réponse = input("Tu aimes la pizza avec ananas ?")
    while réponse != "oui" and réponse != "Oui"
    réponse = input("Réfléchis bien ! Tu aimes la pizza ananas ?")
    print("Je savais que tu aimais ça !") 
    ```

2.  ```{exec} python
    :editor:
    nb_affichage = int(input("Combien de fois veux-tu voir mon magnifique dessin ?"))
    i = 0
    while i < nb_affichage 
        print(" _._     _,-'\"\"`-._\n(,-.`._,'(       |\\`-/|\n    `-.-' \\ )-`( , o o)\n          `-    \\`_`\"'-")

        i = i + 1
       
    ```

3.  ```{exec} python
    :editor:
    #Compte de 1 à 20 de 2 en 2
    compteur = 0
    while compteur >= 20:
        compteur = compteur + 2
        print(compteur)
    print("FIN")
    ```


4.  ```{exec} python
    :editor:
    quiz = input("Quelle est la capitale de la France ?")
    while quiz != "Paris":
        réponse = input("Faux ! Réessaie")
    print("Bonne réponse")
    ```



````{solution} 
1.  ```{exec} python
    :linenos:
    réponse = input("Tu aimes la pizza avec ananas ?")
    while réponse != "oui" and réponse != "Oui"
        réponse = input("Réfléchis bien ! Tu aimes la pizza ananas ?")
    print("Je savais que tu aimais ça !") 
    ```

2.  ```{exec} python
    :linenos:
    nb_affichage = int(input("Combien de fois veux-tu voir mon magnifique dessin ?"))
    i = 0
    while i < nb_affichage:
        i = i + 1
        print(" _._     _,-'\"\"`-._\n(,-.`._,'(       |\\`-/|\n    `-.-' \\ )-`( , o o)\n          `-    \\`_`\"'-")
    ```

3.  ```{exec} python
    :linenos:
    #Compte de 1 à 20 de 2 en 2
    compteur = 0
    while compteur < 20:
        compteur = compteur + 2
        print(compteur)
    print("FIN")
    ```


4.  ```{exec} python
    :linenos:
    quiz = input("Quelle est la capitale de la France ?")
    while quiz != "Paris":
        quiz = input("Faux ! Réessaie")
    print("Bonne réponse")
    ```
````


### Exercice {num1}`exercice-revision`
1.  Écrivez un programme utilisant seulement 2 instructions `print()` affichant un compte à rebours de 100 jusqu'à 0. L'exécution du programme ressemblera à ceci :
```{code-block} text
100
99
98
...
2
1
0
BOOM
```

```{exec} python
:editor: 019a206d-424e-7a30-bd1e-cc4610f335e5
#Ecrivez votre code ici
```

2.  Complétez le programme précédent avec un `if ... else ...` dans le `while` de manière qu'à chaque fois qu'un nombre inférieur à 10 est affiché, le texte `"FUYEZ !"` le suive :
```{code-block} text
100
99
98
...
2 FUYEZ
1 FUYEZ
0 FUYEZ
BOOM
```

````{solution}
1. 
```{exec} python
:linenos:
compte_a_rebours = 1000
while compte_a_rebours >= 0:
    print(compte_a_rebours)
    compte_a_rebours -= 1
print("BOOM")
```

2. 
```{exec} python
:linenos:
compte_a_rebours = 1000
while compte_a_rebours >= 0:
    if compte_a_rebours < 10:
        print(compte_a_rebours, "FUYEZ !")
    else:
        print(compte_a_rebours)
    compte_a_rebours -= 1
print("BOOM")
```
````

### Exercice {num1}`exercice-revision`
Écrivez un programme dans lequel l'utilisateur peut choisir un nombre pour lequel il souhaite voir apparaître sa table de multiplication. Un message d'au revoir sera également affiché à la fin. Votre programme ne doit utiliser que **une seule** instruction `print()`. Un exemple d'exécution pourrait être le suivant :

```{code-block} text
Quelle table de multiplication voulez-vous voir ? <--- [4]
1x4 = 4
2x4 = 8
3x4 = 12
...
10x4 = 40
```


```{exec} python
:editor: 019a206d-5a14-76e3-aed6-ab2c130f0605
#Ecrivez votre code ici

```

````{solution}
Il y a deux manières différentes pour résoudre ce problème. Toutefois, à moins d'être très à l'aise, je vous conseille de rester sur la première solution, car la 2ème est moins intuitive.


```{exec} python
:caption: Solution 1
:linenos:
n = int(input("Quelle table de multiplication voulez-vous voir ?"))
multiplicateur = 1
while multiplicateur <= 10:
    print(multiplicateur, "*", n, "=", multiplicateur * n)
    multiplicateur += 1
```

```{exec} python
:caption: Solution 2
:linenos:
n = int(input("Quelle table de multiplication voulez-vous voir ?"))
nombre_de_base = n
compteur = 0
while compteur < 10:
    compteur += 1
    print(compteur, "*", nombre_de_base, "=", n)
    n += nombre_de_base
```
````


### Exercice {num1}`exercice-revision`
Écrivez un programme dans lequel l'utilisateur peut consécutivement entrer les notes qu'il a faites dans une branche. À la fin, le programme affichera le nombre de notes insuffisantes qui ont été entrées. Les notes invalides seront simplement ignorées. Pour terminer le programme, l'utilisateur entrera la note `99`. Un exemple d'exécution peut être le suivant.

```{code-block} text
Entrez une note : 4.5
Entrez une note : 3.4
Entrez une note : 6
Entrez une note : 3.9
Entrez une note : 5.1
Entrez une note : 99
Vous avez fait 2 notes insuffisantes
```
```{exec} python
:editor: 019a206d-8ef4-7964-9e8c-bb6983cc605b
#Ecrivez votre code ici

```

````{solution}
```{exec} python
:linenos:
nb_notes_insuf = 0
note = 0
while note != 99:
    note = float(input("Entrez une note"))
    if note >= 1 and note < 4:
        nb_notes_insuf += 1
print("Vous avez fait", nb_notes_insuf, "notes insuffisantes")
```
````

### Exercice {num1}`exercice-revision`
Ecrivez un programme correspondant à une mini machine à calculer. Dans celle-ci, l'utilisateur pourra choisir de faire une addition, soustraction ou multiplication entre 2 nombres. Le programme demandera alors à l'utilisateur quel type d'opération il souhaite faire, avant de lui demander les 2 nombres à utiliser. Le programme demandera à l'utilisateur des opérations à faire en boucle, jusqu'à ce que celui-ci écrive "STOP". Un exemple d'utilisation est donné ci-dessous.

```{code-block} text
Bienvenue dans la mini calculatrice !
Quelle opération souhaitez-vous effectuer ?addition
Quel est le premier nombre ?4
Quel est le deuxième nombre ?7
Le résultat de 4 + 7 est 11

Quelle opération souhaitez-vous effectuer ?multiplication
Quel est le premier nombre ?9
Quel est le deuxième nombre ?11
Le résultat de 9 * 11 est 99

Quelle opération souhaitez-vous effectuer ?STOP
Au revoir !
```

```{exec} python
:editor: 019a206d-b208-796c-b80e-e116390caa78
#Ecrivez votre code ici

```

````{solution}

```{exec} python
:linenos:
print("Bienvenue dans la mini calculatrice !")
operation = ""
while operation != "STOP":
    operation = input("Quelle opération souhaitez-vous effectuer ?")
    if operation == "STOP":
        print("Au revoir !")
    else:
        nombre1 = float(input("Quel est le premier nombre ?"))
        nombre2 = float(input("Quel est le deuxième nombre ?"))
        if operation == "addition":
            resultat = nombre1 + nombre2
            print("Le résultat de", nombre1, "+", nombre2, "est", resultat)
        elif operation == "soustraction":
            resultat = nombre1 - nombre2
            print("Le résultat de", nombre1, "-", nombre2, "est", resultat)
        elif operation == "multiplication":
            resultat = nombre1 * nombre2
            print("Le résultat de", nombre1, "*", nombre2, "est", resultat)
        else:
            print("Opération non reconnue")

```
````

