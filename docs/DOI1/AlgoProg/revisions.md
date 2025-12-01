```{metadata}
solutions: show
```
# Exercices de révision 2ème examen

## Révision 1 - Coupe de bois
Dans la forêt à côté de STX, une coupe de bois a été organisée. Chaque arbre coupé peut être revendu pour un certain prix. Plus particulièrement, un sapin peut être revendu pour 50CHF par mètre, et un frêne pour 80CHF par mètre. Pour aider les bûcherons à calculer le prix de vente, écrivez un programme demandant à l'utilisateur le type l'arbre ainsi que sa hauteur en mètre et affichant le prix de cet arbre. Si le type n'est pas correct, ou la hauteur négative, le programme affiche "ERREUR". Des exemples d'utilisation sont donnés ci-dessous
```{code-block} text
Entrez le type d'arbre : sapin
Entrez la hauteur de l'arbre : 10.5
Le prix de cet arbre est de 525CHF

Entrez le type d'arbre : épicéa
Entrez la hauteur de l'arbre : -3
ERREUR
```

```{exec} python
:editor: 0198ccfb-65ca-7379-889c-bb4d2dcb8747
#Ecrivez votre code ici

```

````{solution}

``` {exec} python
:linenos:
type_arbre = input("Entrez le type d'arbre : ")
hauteur_arbre = float(input("Entrez la hauteur de l'arbre : "))
if type_arbre == "sapin" and hauteur_arbre >= 0:
    print("Le prix de cet arbre est de", 50 * hauteur_arbre, "CHF")
elif type_arbre == "frêne" and hauteur_arbre >= 0:
    print("Le prix de cet arbre est de", 80 * hauteur_arbre, "CHF")
else:
    print("ERREUR")
```
````



## Révision 2 - Tableau d'état
Etablissez le tableau d'état du programme ci-dessous :
```{code-block} python
i = 0
j = 10
while i < 10:
    if i >= 5:
        j *= 2
    else:
        j-= 3
    i += j-3
while i > j:
    i -= 1
```

````{solution}
TODO
````


## Révision 3 - Quiz répété
1.  Dans ce programme de quiz, l'utilisateur doit pouvoir répondre à la question "Qui est le premier homme à avoir posé le pied sur la Lune ?". Tant qu'il ne donne pas une bonne réponse, le programme affiche "Faux" et repose la question. Lorsqu'il a répondu correct, le programme affiche "Bravo" et se termine. Un exemple d'utilisation est donné ci-dessous.
```{code-block} text
Qui est le premier homme à avoir posé le pied sur la Lune ?Buzz Aldrin
Faux !
Qui est le premier homme à avoir posé le pied sur la Lune ?Obama
Faux !
Qui est le premier homme à avoir posé le pied sur la Lune ?Neil Armstrong
Bravo !
```

```{exec} python
:editor: 0198ccfe-009d-7640-83e7-8ea3f0c00d5d
#Ecrivez votre code ici

```

2. Ajoutez une 2ème question de votre choix à la suite de la 1ère, également posée en boucle jusqu'à ce que l'utilisateur donne la bonne réponse. Un exemple d'utilisation est donné ci-dessous.
```{code-block} text
Qui est le premier homme à avoir posé le pied sur la Lune ?Buzz Aldrin
Faux !
Qui est le premier homme à avoir posé le pied sur la Lune ?Obama
Faux !
Qui est le premier homme à avoir posé le pied sur la Lune ?Neil Armstrong
Bravo !
En quelle année s'est déroulée la bataille de Marignan ?1600
Faux !
En quelle année s'est déroulée la bataille de Marignan ?
1515
Bravo !
```

````{solution}
``` {exec} python
:linenos:
reponse_1 = input("Qui est le premier homme à avoir posé le pied sur la Lune ?")
while reponse_1 != "Neil Armstrong":
    print("Faux !")
    reponse_1 = input("Qui est le premier homme à avoir posé le pied sur la Lune ?")
print("Bravo !")

reponse_2 = input("En quelle année s'est déroulée la bataille de Marignan ?")
while reponse_2 != "1515":
    print("Faux !")
    reponse_2 = input("En quelle année s'est déroulée la bataille de Marignan ?")
print("Bravo !")
```
````

## Révision 4 - Conversions
Ecrivez une fonction nommée `conversion_argent` prenant en paramètre une somme d'argent en CHF, et une devise étrangère (qui pourrait prendre plus tard comme valeur par exemple "EUR" pour des euros, "USD" pour des dollars, etc.)

En fonction de ces paramètres, la fonction doit ensuite afficher la valeur de la somme en CHF dans cette autre devise sachant que :
- 1 CHF = 0.95 EUR
- 1 CHF = 1.05 USD
- 1 CHF = 0.85 GBP
La fonction devra afficher un message d'erreur si la devise n'est pas supportée.

Le code suivant devrait ensuite permettre d'afficher la valeur de 150CHF en euros, et la valeur de 4560CHF en Livres Sterling.

```{exec} python
:when: never
conversion_argent(150, "EUR")
conversion_argent(4560, "GBP")
```


```{exec} python
:editor: 744a4bb2-8602-4b0e-bd41-bb0b6465a370
#Ecrivez votre code ici

```


````{solution}
``` {exec} python
:linenos:
def conversion_argent(montant, devise):
    if devise == "EUR":
        print(montant * 0.95, "EUR")
    elif devise == "USD":
        print(montant * 1.05, "USD")
    elif devise == "GBP":
        print(montant * 0.85, "GBP")
    else:
        print("Erreur : devise non supportée")

conversion_argent(150, "EUR")
conversion_argent(4560, "GBP")
```
````