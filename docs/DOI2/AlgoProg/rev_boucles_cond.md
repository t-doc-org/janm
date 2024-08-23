# Boucles conditionnelles

## Qu'est-ce qu'une boucle conditionnelle ?

De manière générale, une boucle conditionnelle permet de répéter l'exécution d'un bloc d'instructions plusieurs fois *tant qu*'une certaine condition est respectée. On peut typiquement penser à un système de connexion qui ne laisse pas l'utilisateur entrer dans le système avant que le bon mot de passe soit donné. Le programme ressemblerait alors à ceci.

```{code-block} text
Afficher "Connectez-vous"
Demander le mot de passe à l’utilisateur
Tant que le mot de passe est différent de "Fr1B0urg"
    Afficher "Mot de passe incorrect"
    Redemander le mot de passe à l’utilisateur
Afficher "Mot de passe correct, bienvenue"
```

Grâce à l'instruction `tant que`, le bloc d'instruction indenté en dessous est répété en boucle tant que la condition `mot de passe est différent de "Fr1B0urg"` est vraie. Comme la dernière instruction n'est pas indentée, celle-ci ne sera pas exécutée avant que l'exécution de la boucle soit terminée, et ainsi que le mot de passe soit correct. Ainsi, en fonction des entrées de l'utilisateur, on peut distinguer les exécutions suivantes.

````{admonition} Exécution 1
:class: note dropdown
L'utilisateur entre directement le bon mot de passe à la ligne 2 :

1.  L'expression conditionnelle de la ligne 3 est fausse, donc on ne rentre pas dans la boucle.

2.  `"Mot de passe correct"` est affiché`
````

````{admonition} Exécution 2
:class: note dropdown
L'utilisateur entre le mauvais mot de passe à la ligne 2, mais le bon mot de passe au 2ème essai à la ligne 5 :

1.  L'expression de la ligne 3 est vraie, donc on rentre dans la
    boucle.
2.  `Mot de passe incorrect` est affiché.
3.  Le mot de passe est redemandé (et l'utilisateur entre le bon).
4.  Comme on arrive à la fin du bloc d'instructions indenté, on
    retourne vers le haut à la ligne du `tant que`. L'expression
    conditionnelle est réévaluée. Cette fois, elle est fausse, donc
    on ne rentre plus dans la boucle.
5.  `"Mot de passe correct"` est affiché.
````

````{admonition} Exécution 3
:class: note dropdown
L'utilisateur entre le mauvais mot de passe à la ligne 2, puis entre
    15 fois le mauvais mot de passe quand on le lui redemande, avant
    d'entrer finalement le bon mot de passe.

1.  L'expression de la ligne 3 est vraie, donc on rentre dans la
    boucle.
2.  `Mot de passe incorrect` est affiché.
3.  Le mot de passe est redemandé (et l'utilisateur en entre un
    faux).
4.  Comme on arrive à la fin du bloc d'instructions indenté, on
    retourne vers le haut à la ligne du `tant que`. L'expression
    conditionnelle est réévaluée. Celle-ci est toujours vraie, donc
    on rentre à nouveau dans la boucle.
5.  `"Mot de passe incorrect"` est affiché.
6.  Le mot de passe est redemandé (et l'utilisateur en entre un
    faux).
7.  Comme on arrive à la fin du bloc d'instructions indenté, on
    retourne vers le haut à la ligne du `tant que`.\
    Ainsi de suite avec l'utilisateur qui entre encore 13 fois le
    mauvais mot de passe. Jusqu'à ce que :\
49.  Le mot de passe est redemandé (et l'utilisateur entre le bon).
50.  On retourne à la ligne du `tant que`. La condition est
    maintenant fausse, donc on ne rentre plus dans la boucle.
51. `"Mot de passe correct"` est affiché.
````
## La boucle while

En Python, la boucle conditionnelle `tant que` se traduit littéralement par le mot anglais `while`. Ce mot-clef est suivi d'une expression conditionnelle qui détermine la condition d'arrêt de la boucle, et la ligne se termine par deux points. À chaque fois que le programme passe par cette ligne, l'expression conditionnelle est réévaluée, et, à chaque fois que le résultat de cette évaluation est `True`, le bloc d'instructions indenté en dessous est exécuté. Après ce bloc indenté, l'exécution remonte à la ligne du `while` pour réévaluer l'expression conditionnelle. Ainsi, l'exemple du programme de connexion avec un mot de passe peut s'écrire de la manière suivante en Python.

```{code-block} python
:caption: Programme Python de contrôle de mot de passe
print("Connectez-vous")
mdp = input("Entrez le mot de passe")
while mdp != "Fr1B0urg" :
    print("Mot de passe incorrect")
    mdp = input("Entrez à nouveau le mot de passe")
print("Mot de passe correct")
```

Dans ce deuxième exemple, les nombres de 0 à 100 sont affichés :

```{code-block} python
nombre = 0
while nombre <= 100:
    print(nombre)
    nombre += 1
```

Dans ce troisième exemple, le programme demande à l'utilisateur d'entrer les notes qu'il a faites en informatique, et compte combien sont insuffisantes. Le programme s'arrête lorsque l'utilisateur entre une note invalide (inférieure à 1 ou supérieure à 6). Notez qu'il est impératif que la variable `note` soit définie avant la ligne du `while` de sorte que la condition puisse être exécutée une première fois pour entrer dans la boucle.

```{code-block} python
nombre_notes_insuffisantes = 0
note = 5
while note > 1 and note < 6:
    note = input("Entrez une note : ")
    if note < 4 and note > 1 :
        nombre_notes_insuffisantes += 1
print("Vous avez fait", nombre_notes_insuffisantes, "note insuffisantes.")
```
