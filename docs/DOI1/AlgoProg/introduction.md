<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```


# Introduction

## Qu'est-ce que la programmation ?

## Votre premier programme
Le premier programme que nous allons créer est un programme extrêmement simple, mais avec lequel tous les informaticien.nes ont débuté. Il s'agit d'un programme qui affiche simplement le texte `Hello World!` à l'utilisateur quand on l'exécute. Le code de ce premier programme est déjà écrit ci-dessous. Pour l'exécuter, il suffit de cliquer sur le bouton *Play* à sa droite.

```{exec} python
:editor:
print("Hello World!")
```

Cette première ligne de code contient les éléments suivants :
- `print()` : il s'agit d'une fonction qui affichera à l'utilisateur tout ce qui se trouve entre ses parenthèses.
- `"Hello World!"` : il s'agit d'un simple texte. En Python, on l'appelle plutôt une valeur de type `str`. Ces valeurs sont toujours entourées de guillemets.
## Exercices
### Exercice {num1}`exercice`
Ecrivez un programme affichant le texte `Salut, ça va ?` à l'utilisateur.
```{exec} python
:editor: 01987b15-222b-7e91-9566-54093c8f61a8

```
````{solution}
```{exec} python
:linenos:
print("Salut ça va ?")
```
````

### Exercice {num1}`exercice`
Le programme suivant est censé afficher 2 textes à l'utilisateur. Cependant, chaque ligne de code contient une erreur. Quelles sont-elles ? Identifiez-les et corrigez-les.
```{exec} python
:editor: 01987b15-36e5-7484-9f87-e4cd0e8b7cec
print(Je suis en première année au)
print "Collège Sainte-Croix")
```
````{solution}
 1. Il manque les guillemets autour du texte
 2. Il manque une parenthèse
```{exec} python
:linenos:
print("Je suis en première année au")
print("Collège Sainte-Croix")
```
````