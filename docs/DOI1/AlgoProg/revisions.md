# Exercices de révision

## Exercice 1 - Coupe de bois
Dans la forêt à côté de STX, une coupe de bois a été organisée. Chaque arbre coupé peut être revendu pour un certain prix. Plus particulièrement, un sapin peut être revendu pour 50CHF par mètre, et un frêne pour 80CHF par mètre. Pour aider les bûcherons à calculer le prix de vente, écrivez un programme demandant à l'utilisateur le type l'arbre ainsi que sa hauteur en mètre et affichant le prix de cet arbre. Si le type n'est pas correct, ou la hauteur négative, le programme affiche "ERREUR". Des exemples d'utilisation sont donnés ci-dessous
```{code-block} text
Entrez le type d'arbre : sapin
Entrez la hauteur de l'arbre : 10.5
Le prix de cet arbre est de 525CHF

Entrez le type d'arbre : épicéa
Entrez la hauteur de l'arbre : -3
ERREUR
```

## Exercice 2 - Quiz répété
1.  Dans ce programme de quiz, l'utilisateur doit pouvoir répondre à la question "Qui est le premier homme à avoir posé le pied sur la Lune ?". Tant qu'il ne donne pas une bonne réponse, le programme affiche "Faux" et repose la question. Lorsqu'il a répondu correct, le programme affiche "Bravo" et se termine. Un exemple d'utilisation est donné ci-dessous.
```{code-block} text
Qui est le premier homme à avoir posé le pied sur la Lune ?Buzz Aldrin
Faux !
Qui est le premier homme à avoir posé le pied sur la Lune ?Obama
Faux !
Qui est le premier homme à avoir posé le pied sur la Lune ?Neil Armstrong
Bravo !
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

## Exercice 3
Ecrivez une fonction nommée `conversion_argent` prenant en paramètre une somme d'argent en CHF, et une devise étrangère (qui pourrait prendre plus tard comme valeur par exemple "EUR" pour des euros, "USD" pour des dollars, etc.)

En fonction de ces paramètres, la fonction doit ensuite afficher la valeur de la somme en CHF dans cette autre devise sachant que :
- 1 CHF = 0.95 EUR
- 1 CHF = 1.05 USD
- 1 CHF = 0.85 GBP
La fonction devra afficher un message d'erreur si la devise n'est pas supportée.

Le code suivant devrait ensuite permettre d'afficher la valeur de 150CHF en euros, et la valeur de 4560CHF en Livres Sterling.

```{code-block} python
conversion_argent(150, "EUR")
conversion_argent(4560, "GBP")
```