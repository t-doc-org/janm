% Copyright 2025 Caroline Blank <caro@c-space.org>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0


# Liste des fonctions

Voici une liste de fonctions utiles pour le micro:bit.

## Écran

`display.scroll("un texte")`
: fait défiler sur l'écran la chaîne de caractère passée en paramètre

`display.show(Img)`
: affiche l'image définie dans la variable `Img`

`display.clear()`
: efface l'écran, c'est-à-dire éteint toutes les LED

`display.set_pixel(x, y, i)`
: allume la LED à la position (x; y) avec une intensité de i (i allant de 0
éteint à 9 intensité maximale)

`display.get_pixel(x, y)`
: renvoie la valeur de l'intensité de la LED à la position (x; y)


## Bouttons

`button_a.was_pressed()`
: renvoie `True` si le bouton A a été enfoncé depuis le dernier appel

`button_a.is_pressed()`
: renvoie `True` si le bouton A est enfoncé maintenant

`button_a.get_presses()`
: renvoie le nombre de fois que le bouton A a été appuyé et remet le compteur à
zéro


## Accéléromètre

`accelerometer.get_x()`
: renvoie la valeur de l'accélération dans la direction gauche-droite. Si le
nombre est négatif, l'accélération se fait vers la gauche, si elle est positive,
vers la droite

`accelerometer.get_y()`
: renvoie la valeur de l'accélération dans la direction avant-arrière. Si le
nombre est négatif, l'accélération se fait vers l'arrière, si elle est positive,
vers l'avant

`accelerometer.was_gesture(geste)`
: renvoie `True` si le geste passé en paramètre a été effectué depuis le dernier
appel

`accelerometer.current_gesture() == geste`
: renvoie le nom du geste actuel (`up`, `down`, `right`, `left`,
`face down`, `face up`, `freefall`, `shake`, etc. )


## Divers

`music.play(music.POWER_DOWN)`
: joue la musique "POWER_DOWN"

`sleep(n)`
: attend n millisecondes

`running_time()`
: renvoie le nombre de millisecondes depuis le démarrage du micro:bit.


