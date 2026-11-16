```{metadata}
hide: [primary-sidebar, secondary-sidebar, prev-next, footer]
exec:
  python:
    packages: [pygame-ce]
    env:
        PYGAME_HIDE_SUPPORT_PROMPT:
    files:
      orange.png:
      basket.png:
      roger.png:
      banana.png:
      strawberry.png:
      dirt.png:
      bird.png:
      tuyau_haut.png:
      tuyau_bas.png:
```

```{exec} python
:name: setup
:when:
:class: hidden
import tdoc.pygame
setup_canvas()
```

```{exec} python
:name: pygame_start
:when:
:class: hidden
:include: code/pygame_start.py
```

```{defaults} exec
:env: main
:after: setup pygame_start
:style: max-height: 25rem;
```

```{exec} python
:name: pygame_end
:when:
:class: hidden
# Anciens programmes écrits dans une fonction « async def main() ».
if "main" in globals():
  try:
    await main()
  finally:
    pygame.quit()
# Le programme est terminé : pygame rend le clavier à la page.
pygame.quit()
```



# Pygame - TP 2

:::{container} projet-liens
[Documentation du module](pygame_doc.md)
:::

:::::{container} projet-consignes
``````{tab-set}
:sync-group: etape
`````{tab-item} Présentation
:sync: presentation
```{image} images/flappybirdheader.png
:width: 50%
:alt: Logo Pygame
:align: center
```

::::{container} projet-colonnes
:::{container}
Flappy Bird est un jeu vidéo mobile développé en 2013 au Vietnam par Hà Đông Nguyễn . Malgré son gameplay et son apparence très simple, ce jeu se hissera, en janvier 2014, à la première place des téléchargements de l'App Store et du Play Store. Grâce aux publicités intégrées, le développeur touchait jusqu'à 50'000$ par jour. De nombreuses controverses ont entouré Flappy Bird, notamment des accusations de plagiat avec ses tuyaux ressemblant étrangement à ceux des jeux *Super Mario Bros*. Hà Đông finit même par déclarer sur Twitter que ce jeu lui avait "ruiné sa vie". 

Le but de ce TP sera de s'approprier les concepts de Pygame en redéveloppant notre propre version de Flappy Bird. Pour bien comprendre le concept de ce jeu, vous pouvez vous rendre sur [flappybird.io](https://flappybird.io/) pour en faire 2-3 parties.

Vous disposez des 3 images suivantes pour votre développement.
:::

````{list-grid}
:style: grid-template-columns: 1fr 1fr 1fr; text-align:center;

- ```{figure} images/bird.png
  :alt: Oiseau
  :align: center
  :width: 20%

  Oiseau (bird.png)
  ```

- ```{figure} images/tuyau_haut.png
  :alt: Tuyau haut
  :align: center
  :width: 20%

  Tuyau du haut (tuyau_haut.png)
  ```

- ```{figure} images/tuyau_bas.png
  :alt: Tuyau bas
  :align: center
  :width: 20%

  Tuyau du bas (tuyau_bas.png)
  ```
````
::::
`````
`````{tab-item} 1
:sync: etape1
Ajoutez et dessinez l'acteur Flappy Bird en haut à gauche de l'écran avec l'image `bird.png`.
`````
`````{tab-item} 2
:sync: etape2
 - Avant la boucle `while True`, définissez une nouvelle variable `vitesse` qui déterminera la vitesse verticale de l'oiseau.
 - Définissez une variable `ACCELERATION` qui déterminera l'accélération de l'oiseau vers la Terre. Pour commencer, mettez-y la valeur `0.1`.
 - Définissez une variable `VITESSE_SAUT` qui déterminera la vitesse à laquelle l'oiseau "sautera" quand on appuiera sur une touche. Comme un saut fait monter l'oiseau, cette valeur doit être négative. Par exemple `-5`.
`````
`````{tab-item} 3
:sync: etape3
Complétez la boucle de jeu de sorte que l'oiseau tombe constamment vers le bas en fonction de la variable `vitesse`. Vous pouvez utiliser pour cela la fonction `move()`. L'oiseau ne bouge pas sur l'axe x, et proportionnellement à `vitesse` sur l'axe y.
`````
`````{tab-item} 4
:sync: etape4
A chaque tour de boucle de jeu, augmentez la valeur de `vitesse` avec l' `ACCELERATION`. Même si cela est peu visible, vous devriez voir votre oiseau tomber de plus en plus vite vers le bas.
`````
`````{tab-item} 5
:sync: etape5
 - Afin de faire "sauter" l'oiseau, commencez par ajouter la ligne de code `touches_pressées = get_new_keys()` à votre boucle de jeu. Vous récupérez ainsi la liste des touches que le joueur vient de presser. Contrairement à `get_pressed_keys()`, une touche maintenue enfoncée n'apparaît qu'une seule fois dans cette liste : l'oiseau ne saute donc qu'une fois par appui.
 - Avec un `if ... in ...`, contrôlez si l'utilisateur a appuyé sur la touche de saut. Vous pouvez choisir n'importe quelle touche du clavier, ou le clic gauche de la souris (`"MOUSE_1"`).
 - Si cette condition est respectée, la `vitesse` doit prendre la valeur de la variable `VITESSE_SAUT`.

 Testez votre programme et ajustez les valeurs de `ACCELERATION` et `VITESSE_SAUT` afin que l'effet de saut et de gravité vous convienne.
`````
`````{tab-item} 6
:sync: etape6
Nous allons maintenant faire apparaître des tuyaux toutes les 3 secondes. Pour cela, nous aurons besoin d'un *Timer* qui comptera le temps et permettra de déterminer le moment d'apparition des tuyaux.

- Pour créer un nouveau Timer de 3 secondes, écrivez la ligne suivante **avant** la boucle de jeu : `timer_tuyaux = Timer(3)`
- Afin d'instantanément démarrer ce Timer, faites suivre cette ligne de `timer_tuyaux.start()`.
- Dans la boucle de jeu, ajoutez un `print(timer_tuyaux)` afin de vérifier que vous avez bel et bien un Timer qui commence à 3s et termine à 0s.

Le `print()` affiche le temps 60 fois par seconde : arrêtez le programme après quelques secondes. Si le Timer s'affiche correctement, vous pouvez retirer le `print()`
`````
`````{tab-item} 7
:sync: etape7
 - Vous pouvez contrôler si le `timer_tuyaux` est terminé (c'est-à-dire est arrivé à 0.00s) avec `if timer_tuyaux.is_finished():`
 - Ajoutez cette condition dans la boucle de jeu. Lorsqu'elle est respectée, faites un `print("Nouveaux tuyaux")` et redémarrez le Timer avec la méthode `start()` utilisée précédemment.
 - Vous devriez alors voir le texte `Nouveaux tuyaux` apparaître toutes les 3 secondes.
`````
`````{tab-item} 8
:sync: etape8
Il faut maintenant retirer ce `print()` et faire véritablement apparaître les tuyaux. Nous n'allons pas créer une variable individuelle pour chaque tuyau, mais allons les stocker dans une liste. Pour cela :
 - Avant la boucle de jeu, créez une liste vide
 - Quand le timer est terminé, créez 2 nouveaux acteurs : un `tuyau_haut` et un `tuyau_bas` avec les images adéquates. Pour le tuyau du haut, vous pouvez utiliser `tuyau_haut = Actor("tuyau_haut.png", 500, -100)`. Vous pouvez adapter cet exemple pour le tuyau du bas.
 - Ajoutez ces 2 tuyaux à la liste avec `append()`
 - Pour que les tuyaux apparaissent, il faut les *draw*. Vous pouvez le faire dans la boucle de jeu avec la logique *Pour chaque tuyau dans la liste : dessiner le tuyau*.


3 secondes après le lancement, vous devriez voir une paire de tuyaux apparaître.
`````
`````{tab-item} 9
:sync: etape9
 Les tuyaux doivent se déplacer constamment vers la gauche.
 - Dans la boucle de jeu, ajoutez la logique suivante : *Pour chaque tuyau dans la liste : move le tuyau vers la gauche*. Vous devriez alors voir des tuyaux apparaître toutes les 3 secondes et se déplacer sans arrêt vers la gauche.
 - Quand un tuyau sort de l'écran à gauche, alors il doit être retiré de la liste. **Après** la boucle qui déplace les tuyaux, ajoutez une **deuxième** boucle `for` avec la logique suivante : *Pour chaque tuyau dans la liste : si la position horizontale du tuyau est inférieure à -100, alors retirer ce tuyau de la liste*. Notez que si `tuyau` est un acteur, alors `tuyau.get_x()` permet d'accéder à sa position horizontale. Utilisez `remove()` pour retirer un élément d'une liste.

 *Pourquoi une deuxième boucle ? Lorsqu'on retire un élément d'une liste pendant qu'on la parcourt avec `for`, Python saute l'élément suivant. Si on retirait les tuyaux dans la boucle qui les déplace, le tuyau suivant ne serait pas déplacé à ce tour-là, et les tuyaux du haut et du bas finiraient par se décaler.*
  - Modifiez la position initiale d'apparition des tuyaux pour qu'ils débutent en dehors de l'écran, à sa droite.

L'apparition et disparition des tuyaux devrait maintenant être parfaitement implémentée !
`````
`````{tab-item} 10
:sync: etape10
Le jeu doit maintenant s'arrêter lorsque Flappy Bird entre en collision avec un tuyau.
 - Créez une nouvelle variable `gameover = False` avant la boucle de jeu
 - Dans la boucle de jeu, ajoutez la logique suivante : *Pour chaque tuyau de la liste, si le Flappy Bird entre en collision avec ce tuyau, alors gameover devient True*
 - Ajoutez un ou plusieurs `if gameover == False:` dans votre programme de sorte à ce que l'apparition de tuyaux, leur mouvement, ainsi que le mouvement de l'oiseau n'aient plus lieu quand on perd.
`````
`````{tab-item} Personnalisation
:sync: perso
A ce stade, le jeu est déjà jouable. Cependant, afin qu'il soit vraiment intéressant, certains éléments manquent. Choisissez des améliorations dans la liste ci-dessous et implémentez-en au moins une.

 - Les tuyaux n'apparaissent pas tous à la même hauteur, mais avec un décalage aléatoire en utilisant `randint()`
 - Un texte de gameover s'affiche quand on perd
 - Ce même texte de gameover contient un score correspondant au nombre de paires de tuyaux que l'on a esquivé
 - Appuyer sur une touche quand on a perdu permet de redémarrer le jeu
 - Le jeu ne démarre pas instantanément, mais seulement lorsqu'on appuie sur une touche
`````
``````
:::::

:::{container} projet-ide
```{exec} python
:then: pygame_end
:editor: sdads
while True:
  refresh((112, 196, 209))
```
:::

````{solution} Solution (étapes 1 à 10)
```{code-block} python
# Étape 1 : l'oiseau
bird = Actor("bird.png", 50, 50)

# Étape 2 : vitesse et gravité
vitesse = 0
ACCELERATION = 0.1
VITESSE_SAUT = -4

# Étape 6 : timer des tuyaux
timer_tuyaux = Timer(3)
timer_tuyaux.start()

# Étape 8 : liste des tuyaux
tuyaux = []

# Étape 10 : fin de partie
gameover = False

while True:
  refresh((110, 195, 205))
  touches_pressées = get_new_keys()

  if gameover == False:
    # Étapes 3 et 4 : chute de plus en plus rapide
    bird.move(0, vitesse)
    vitesse = vitesse + ACCELERATION

    # Étape 5 : saut
    if "SPACE" in touches_pressées:
      vitesse = VITESSE_SAUT

    # Étapes 7 et 8 : nouveaux tuyaux toutes les 3 secondes
    if timer_tuyaux.is_finished():
      tuyau_haut = Actor("tuyau_haut.png", 650, -100)
      tuyau_bas = Actor("tuyau_bas.png", 650, 700)
      tuyaux.append(tuyau_haut)
      tuyaux.append(tuyau_bas)
      timer_tuyaux.start()

    # Étape 9 : déplacement puis suppression des tuyaux
    for tuyau in tuyaux:
      tuyau.move(-2, 0)
    for tuyau in tuyaux:
      if tuyau.get_x() < -100:
        tuyaux.remove(tuyau)

    # Étape 10 : collision
    for tuyau in tuyaux:
      if bird.collide(tuyau):
        gameover = True

  bird.draw()
  for tuyau in tuyaux:
    tuyau.draw()
```
````
