% Copyright 2025 Caroline Blank <caro@c-space.org>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

# Tutoriel

```{exec} micropython
:name: microbit-reset
:class: hidden
:when: never
from microbit import *
display.clear()
```

## Introduction

Le BBC micro:bit est un microcontrôleur développé par la BBC pour encourager la
programmation dans les écoles en Angleterre. Il s'agit d'un mini-ordinateur
programmable notamment en Python. En raison de son prix attractif (~15 CHF), son
utilisation est très répandue.

### Composants du micro:bit

Le micro:bit contient tous les composants essentiels d'un ordinateur, à savoir

- CPU (Central Processing Unit), ou **processeur** qui est le "cerveau" pouvant
  être programmé en Python ou dans un autre langage de programmation. C'est lui
  qui exécute les programmes et pilote tous les autres composants.

- RAM (Random Access Memory) ou **mémoire vive** qui permet de stocker les
  programmes exécutés ainsi que les données traitées par le programme.

- La **carte-mère** qui interconnecte tous les composants entre eux (c'est le
  système nerveux en quelque sorte).


```{figure} images/composants-microbit.png
:alt: Composants du micro:bit
:width: 100%
:align: center
```

```{important}
Faites attention aux points suivants lorsque vous utilisez le micro:bit:

- Le connecteur micro-USB utilisé pour programmer le micro:bit est fragile.
  Ne forcez jamais le câble et manipulez-le en douceur pour connecter
  déconnecter le câble.

- Évitez de toucher les connecteurs (Edge Connectors) et les connecteurs à
  l'arrière. Il arrive parfois qu'on soit chargé en électricité statique
  (très fort voltage), ce qui peut totalement détruire le micro:bit.

- Manipulez de préférence le micro:bit en le tenant par la tranche.
```

### Exécuter un programme

Voici la procédure pour exécuter un programme sur le micro:bit:

1.  Connectez le micro:bit au port USB de l'ordinateur\
    Faites attention à ne pas abîmer le connecter micro USB du micro:bit, car il
    est très fragile. Ne portez pas le microbit par le câble.

2.  Connectez l'éditeur au micro:bit\
    Cliquez sur l'icône **Tools** et sélectionnez **Connect**. Dans la boite de
    dialogue qui s'est ouverte, sélectionnez l'élément proposé et appuyez sur
    **Connexion**.

3.  Exécutez le programme sur le micro:bit\
    Appuyez sur le bouton **Run**.

### Exercice {num2}`exercice`

Le programme suivant affiche un sourire sur la matrice LED 5x5 du micro:bit.\
Exécutez-le sur le micro:bit.

```{exec} micropython
:after: microbit-reset
from microbit import *

smile = Image("00000:09090:00900:90009:09990")
display.show(smile)
```


## Affichage de texte

### Exercice {num2}`exercice`

{.lower-alpha-paren}
1.  Exécutez le programme suivant et répondez aux questions:
    - Que fait ce programme?
    - Que fait `display.scroll("Salut!")`?
    - Que fait `sleep(2000)`?

2. Modifiez le programme pour qu'il affiche 4 fois "Hello" et
    attende trois secondes entre les affichages. Utilisez une boucle `for`.

```{exec} micropython
:after: microbit-reset
:editor:
from microbit import *

display.scroll("Salut!")
sleep(2000)
display.scroll("Comment vas-tu?")
```

````{solution}
```{exec} micropython
:after: microbit-reset
from microbit import *

for _ in range(4):
    display.scroll("Hello")
    sleep(3000)
```
````

## Affichage d'image

### Image matricielle

Une image matricielle ou bitmap est une image composée de pixels de couleur. Dans
le cas du micro:bit, chaque pixel est représenté par une LED qui peut être
allumée ou éteinte, ce qui correspond à un dessin en noir et blanc.

```{figure} images/heart-microbit.png
:alt: Image matricielle
:align: center
:width: 70%
```

Il est donc possible de créer ses propres images ainsi:

```{exec} micropython
:when: never
img = Image("09090:"
            "99999:"
            "99999:"
            "09990:"
            "00900")
```

Le **module microbit** contient de nombreuses images intégrées, telles que
`Image.HEART`, `Image.HEART_SMALL`, `Image.HAPPY`, `Image.SAD`,
`Image.PACMAN`, `Image.GHOST`, `Image.SKULL`, etc.


### Exercice {num2}`exercice`

{.lower-alpha-paren}
1.  Sans l'exécuter, que fait le programme suivant?
    ```{exec} micropython
    :after: microbit-reset
    :editor:
    from microbit import *

    img = Image("00000:"
                "09990:"
                "09090:"
                "09990:"
                "00000")

    display.show(img)
    ```

2. Exécutez le programme sur le micro:bit pour vérifier votre réponse.
3. Modifiez le programme ci-dessus pour afficher une croix sur le microbit.

````{solution}
```{exec} micropython
:after: microbit-reset
from microbit import *

img = Image("90009:"
            "09090:"
            "00900:"
            "09090:"
            "90009")

display.show(img)
```
````

### Exercice {num2}`exercice`

{.lower-alpha-paren}
1.  Écrivez un programme qui affiche l'image de pacman, attend 2 secondes et
    ensuite affiche l'image d'un fantôme.
    ```{tip}
    La fonction `sleep(ms)` met en pause l'exécution du programme pendant un
    nombre défini de millisecondes.<br>
    1000 millisecondes (ms) correspondent à 1 seconde.
    ```

2.  Modifiez le programme de la partie a) pour qu'il change d'images toutes les
    secondes en continu.
    ````{tip}
    Pour faire défiler les images de manière continue, on utilise une boucle
    `while`. Cette boucle s'exécute tant que la condition reste vraie. En
    écrivant `while True`, on crée une boucle infinie, c’est-à-dire qu'elle
    s'exécutera sans fin, sauf si on l’interrompt manuellement.

    ```{exec} python
    :when: never
    # Ce code va afficher le texte sans s'arrêter
    while True:
        print("Bonjour !")
    ```
    ````

```{exec} micropython
:after: microbit-reset
:editor: c925f708-dd7c-4747-bba8-3c535d9d02e6
:reset: hide
from microbit import *

# Écrivez le programme ici
```

````{solution}
{.lower-alpha-paren}
1.  ```{exec} micropython
    :after: microbit-reset
    from microbit import *

    display.show(Image.PACMAN)    # affiche l'image de pacman
    sleep(2000)                   # attend 2 secondes
    display.show(Image.GHOST)     # affiche l'image du fantôme
    ```
2.  ```{exec} micropython
    :after: microbit-reset
    from microbit import *

    while True:
      display.show(Image.PACMAN)  # affiche l'image de pacman
      sleep(1000)                 # attend une seconde
      display.show(Image.GHOST)   # affiche l'image du fantôme
      sleep(1000)                 # attend une seconde
    ```
````

## Utilisation des boutons A et B

Le micro:bit contient deux boutons A et B sur sa face avant. Lorsqu'un bouton
est appuyé, une action se produira dans votre programme.

La fonction `was_pressed()` retourne la value `True` si le bouton a été
enfoncé depuis le début du programme ou depuis le dernier appel de cette
fonction.

### Exercice{num2}`exercice`

{.lower-alpha-paren}
1.  Sans l'exécuter, expliquez ce que fait le programme ci-dessous.
2.  Vérifiez votre réponse.
3.  Modifiez le programme pour qu'il affiche "B" quand le bouton B est appuyé.<br>
    Utilisez la structure if/elif/else.

```{exec} micropython
:after: microbit-reset
:editor: 92705dbe-1349-4d3b-b4ec-1af76ba48a91
:console-style: max-height: 10rem
from microbit import *

while True:
  if button_a.was_pressed():
    display.show("A")
  else:
    display.show("X")
  sleep(500)
```

````{solution}
```{exec} micropython
:after: microbit-reset
:console-style: max-height: 10rem
from microbit import *

while True:
  if button_a.was_pressed():
    display.show("A")
  elif button_b.was_pressed():
    display.show("B")
  else:
    display.show("X")
  sleep(500)
```
````

## Changement d'état d'un pixel

Un pixel est un point dans une image. Sur le micro:bit un pixel est représenté
par une LED qui a une coordonnée x et y. La coordonnée (0, 0) se trouve en haut
à gauche de l'image.

```{figure} images/pixel-microbit.png
:alt: leds du microbit
:align: center
:width: 30%
```

La fonction `display.set_pixel(x, y, intensite)` permet d'appliquer la valeur de
l'**intensité** à la LED de coordonnée (x, y). L'intensité est un nombre entre
0 et 9 où 0 signifie que la LED est éteinte et 9 la luminosité maximale.

### Exercice {num2}`exercice`

Écrivez un programme qui allume la LED du milieu de l'image avec la valeur
maximale et les LED des quatre coins avec une valeur intermédiaire.

```{exec} micropython
:after: microbit-reset
:editor: 830d1f74-9ab6-42de-b50f-ce0a4c974112
:reset: hide
from microbit import *

# Écrivez le programme ici
```

````{solution}
```{exec} micropython
:after: microbit-reset
from microbit import *

display.set_pixel(2, 2, 9)
display.set_pixel(0, 0, 5)
display.set_pixel(4, 0, 5)
display.set_pixel(0, 4, 5)
display.set_pixel(4, 4, 5)
```
````


