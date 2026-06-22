% Copyright 2025 Caroline Blank <caro@c-space.org>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

# Exercices

```{exec} micropython
:name: microbit-reset
:class: hidden
:when: never
from microbit import *
display.clear()
```

## Exercice {num2}`exercice`

Dans cet exercice, vous allez déplacer un pixel sur l'écran, d'abord sur la
première ligne et ensuite sur tout l'écran.

Dans le programme ci-dessous le premier pixel de la première ligne est allumé.

{.lower-alpha-paren}
1.  En utilisant une boucle `for`, déplacez le pixel sur la première ligne.
    ```{tip}
    Dans chaque passage dans la boucle, il faudra effacer tout l'écran en
    utilisant la fonction `display.clear()`, avant d'afficher le pixel au nouvel
    emplacement
    ```
2.  [Optionnel] En utilisant une deuxième boucle for, faites parcourir au pixel
    tout l'écran.
    ```{tip}
    Une des boucles va modifier la valeur de `x` et l'autre la valeur de `y`.
    ```
3.  [Optionnel] Modifiez la vitesse de déplacement du pixel.

```{exec} micropython
:after: microbit-reset
:editor: 84d579d6-d427-4edf-817d-e2c7a0eb237b
:reset: hide
from microbit import *

# coordonnées du pixel
x = 0
y = 0

# affichage du pixel
display.set_pixel(x, y, 9)
```

````{solution}
```{exec} micropython
:after: microbit-reset
from microbit import *

# coordonnées du pixel
x = 0
y = 0

# affichage du pixel
for _ in range(5):
  for _ in range(5):
      display.set_pixel(x, y, 9)
      x += 1
      sleep(100)
      display.clear()
  y += 1
  x = 0
```
````


## Exercice {num2}`exercice`

{.lower-alpha-paren}
1.  Écrivez un programme qui affiche l'image de Pacman `Image.PACMAN` lorsque le
    bouton A est appuyé et affiche l'image d'un fantôme `Image.GHOST` lorsque
    c'est le bouton B.
2.  Ajoutez que l'écran ne doit rien afficher quand aucun bouton n'est pressé.
    ```{tip}
    La fonction `display.clear()` efface l'écran, c'est-à-dire éteint toutes les
    LED.<br>
    ```

```{exec} micropython
:after: microbit-reset
:editor: 7c6de191-9dc8-486b-b1c1-5cb7e1549ff1
:reset: hide
from microbit import *

# Écrivez le programme ici
```

````{solution}
```{exec} micropython
:after: microbit-reset
from microbit import *

while True:
    if button_a.was_pressed():
        display.show(Image.PACMAN)
    elif button_b.was_pressed():
        display.show(Image.GHOST)
    else:
        display.clear()
    sleep(500)
```
````

## Exercice {num2}`exercice`

{.lower-alpha-paren}
1.  En utilisant une boucle `while`, écrivez un programme qui affiche un décompte:
    9, 8, ... et lorsque le compteur est arrivé à 0, affichez "BOOM" suivi de
    l'image d'un crâne.
    (Image.SKULL).

2.  Ajoutez un son après l'affichage du crâne.
    ```{tip}
    Le micro:bit permet d'ajouter des sons. Voir le site officiel
    [microbit.org](https://python.microbit.org/v/3/reference/sound) pour les
    détails.
    ```

```{exec} micropython
:after: microbit-reset
:editor: 41b8a48d-bf5a-4ba8-96f8-7cd5dd84a7b6
:reset: hide
from microbit import *

# Écrivez le programme ici
```

````{solution}
```{exec} micropython
:after: microbit-reset
from microbit import *
import music

compteur = 9
while compteur > 0:
  display.show(compteur)
  compteur -= 1
  sleep(200)
display.scroll("BOOM")
display.show(Image.SKULL)
music.play(music.POWER_DOWN)
```
````

## Exercice {num2}`exercice`

{.lower-alpha-paren}
1.  Écrivez un programme qui simule un lancer de dé, c'est-à-dire que lorsque
    vous secouez le micro:bit, un nombre aléatoire entre 1 et 6 doit s'afficher.
    ```{tip}
    La fonction `randint(a, b)` du module `random` renvoie un nombre entier
    "aléatoire" entre a et b, tous les deux compris ($a \leq randint(a,b) \leq b$).
    ```

2.  [Optionnel] Modifiez le programme de la partie a) pour qu'il affiche la
    valeur obtenue comme sur un dé: &#9856; &#9857; &#9858; &#9859; &#9860; et
    &#9861;.

```{tip}
Le micro:bit contient un accéléromètre qui permet de connaître sa position,
ainsi que ses mouvements. La fonction `accelerometer.was_gesture('shake')`
renvoie `True` si le micro:bit a été secoué.
```

```{exec} micropython
:after: microbit-reset
:editor: 1f26bdb4-c78d-41ed-9a30-1f56b3c9a340
:reset: hide
from microbit import *

# Écrivez le programme ici
```

````{solution}
{.lower-alpha-paren}
1.  ```{exec} micropython
    :after: microbit-reset
    from microbit import *
    from random import randint

    while True:
      if accelerometer.was_gesture('shake'):
        display.show(randint(1, 6))
    ```
2.  ```{exec} micropython
    :after: microbit-reset
    from microbit import *
    from random import randint

    while True:
      if accelerometer.was_gesture('shake'):
        n = randint(1, 6)
        if n == 1:
          display.show(Image("00000:00000:00900:00000:00000"))
        elif n == 2:
          display.show(Image("90000:00000:00000:00000:00009"))
        elif n == 3:
          display.show(Image("90000:00000:00900:00000:00009"))
        elif n == 4:
          display.show(Image("90009:00000:00000:00000:90009"))
        elif n == 5:
          display.show(Image("90009:00000:00900:00000:90009"))
        elif n == 6:
          display.show(Image("90009:00000:90009:00000:90009"))
    ```
````

## Exercice {num2}`exercice`

Écrivez un programme qui:

- allume le pixel du centre de l'écran,
- si l'utilisateur appuie sur le bouton A, le pixel se déplace à gauche,
- si l'utilisateur appuie sur le bouton B, le pixel se déplace à droite,
- si le pixel est au bord de l'écran, il ne se passe rien.

```{exec} micropython
:after: microbit-reset
:editor: 1eb13c044-deed-4951-a000-92c09b171f31
:reset: hide
from microbit import *

# Écrivez le programme ici
```

````{solution}
```{exec} micropython
:after: microbit-reset
from microbit import *

x = 2
y = 2
display.set_pixel(x, y, 9)
while True:
    if button_a.was_pressed():
        if x != 0:
            x -= 1
    elif button_b.was_pressed():
        if x != 4:
            x +=  1
    display.clear()
    display.set_pixel(x, y, 9)
    sleep(200)
```
````

## Exercice {num2}`exercice`

Écrivez un programme qui mesure votre temps de réaction en secondes.

{.lower-alpha-paren}
1.  Des images d'animaux défilent aléatoirement sur l'écran. (`Image.RABBIT`,
    `Image.COW`, `Image.TORTOISE`, `Image.DUCK`, `Image.SNAKE`,
    `Image.BUTTERFLY`, `Image.GIRAFFE`)

2.  Lorsqu'une flèche vers la droite `Image.ARROW_E` apparaît, il faut appuyer
    le plus rapidement possible sur le bouton B. Le temps de réaction sera
    calculé et affiché.

3.  Ajoutez une difficulté supplémentaire:\
    Lorsqu'une flèche vers la gauche `Image.ARROW_W` apparaît, il faut appuyer
    sur le bouton A.

```{tip}
La fonction `running_time()` renvoie le nombre de millisecondes depuis le
démarrage du micro:bit.
```

```{exec} micropython
:after: microbit-reset
:editor: 9ebc49b0-40b5-47ab-a8c5-e3d2bb638a22
:reset: hide
from microbit import *

# Écrivez le programme ici
```

````{solution}
```{exec} micropython
:after: microbit-reset
from microbit import *
from random import randint

while True:
  nombre = randint(1, 32)
  if nombre <= 5:
    display.show(Image.RABBIT)
  elif nombre <= 10:
    display.show(Image.COW)
  elif nombre <= 15:
    display.show(Image.TORTOISE)
  elif nombre <= 20:
    display.show(Image.DUCK)
  elif nombre <= 25:
    display.show(Image.BUTTERFLY)
  elif nombre <= 30:
    display.show(Image.SNAKE)
  elif nombre == 31:
    display.show(Image.ARROW_E)
    debut = running_time()
    while True:
      if button_b.was_pressed():
        fin = running_time()
        break
    temps_ecoule = (fin - debut)/1000
    display.scroll(temps_ecoule)
    sleep(2000)
  elif nombre == 32:
    display.show(Image.ARROW_W)
    debut = running_time()
    while True:
      if button_a.was_pressed():
        fin = running_time()
        break
    temps_ecoule = (fin - debut)/1000
    display.scroll(temps_ecoule)
    sleep(2000)
  sleep(200)
```
````



