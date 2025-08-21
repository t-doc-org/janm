<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Challenges

## Le jeu du Devin
Créez un petit jeu dans lequel l'utilisateur doit deviner un nombre entre 1 et 100 que l'ordinateur a choisi au hasard. Les lignes de code déjà données permettent justement de créer une variable `nombre_mystere` avec une valeur aléatoire.

Le jeu doit remplir les critères suivants :
 - Le jeu ne doit pas s'arrêter tant que l'utilisateur n'a pas trouvé le bon nombre.
 - A chaque essai, le programme doit dire à l'utilisateur si son essai est trop grand ou trop petit.
 - A la fin du jeu, il faut afficher le nombre d'essais de l'utilisateur pour trouver le bon nombre.


```{exec} python
:editor: 0198ccf4-35d5-7374-803b-4f6a514514bb
from random import randint
nombre_mystere = randint(1, 100)
#Continuez le challenge ici

```