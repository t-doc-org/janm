```{metadata}
hide: [primary-sidebar, secondary-sidebar, prev-next, footer]
exec:
  python:
    files:
      brick.png:
      ball.png:
      paddle.png:
      heart.png:
      bubble.png:
      brick_red.png:
      brick_green.png:
      strawberry.png:
      orange.png:
      banana.png:
      shield.png:
      bomb.png:
      tools.png:
      gift_blue.png:
      gift_yellow.png:
      gift_red.png:
      trampoline.png:
      landscape.jpg:
      skull.png:
      megaman.ogg:
      futuriste.ogg:
      winners.ogg:
      sad.ogg:
      yoshi.ogg:
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
:include: ../code/pygame_start.py
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

# Projet Casse-Briques

[Documentation du module](../pygame_doc.md)

``````{tab-set}
:sync-group: etape
`````{tab-item} 1
:sync: etape1
Créez et dessinez l'acteur principal `raquette` en bas au centre de l'écran avec l'image `paddle.png`. Rappel : l'écran fait 600x600 pixels.
`````
`````{tab-item} 2
:sync: etape2
La raquette est un peu petite. Agrandissez-la !
 - Juste après avoir créé la raquette (étape 1), utilisez la méthode `scale()` pour la rendre 2 fois plus grande.

La raquette devrait maintenant être plus large et plus facile à utiliser.
`````
`````{tab-item} 3
:sync: etape3
Permettez à la raquette de se déplacer latéralement.
 - Dans la boucle de jeu, récupérez les touches pressées avec `get_pressed_keys()`.
 - Si la touche {kbd}`A` est pressée, déplacez la raquette vers la gauche avec `move()`.
 - Si la touche {kbd}`D` est pressée, déplacez la raquette vers la droite avec `move()`.
 - Ajustez la vitesse de déplacement pour que la maniabilité soit agréable.
`````
`````{tab-item} 4
:sync: etape4
Créons maintenant la balle qui va rebondir !
 - Avant la boucle `while True`, créez un acteur `balle` avec l'image `ball.png`. Placez-la juste au-dessus de la raquette.
 - Créez deux variables `vitesse_balle_x = 3` et `vitesse_balle_y = -3` pour contrôler la vitesse de la balle. Ces vitesses initiales signifient que la balle se dirigera au début du jeu en diagonal vers le haut/droite.
 - Dans la boucle de jeu, déplacez la balle avec `balle.move(vitesse_balle_x, vitesse_balle_y)`.
 - N'oubliez pas de dessiner la balle avec `draw()`.

Vous devriez voir la balle se déplacer en diagonale vers le haut à droite et disparaître hors de l'écran.
`````
`````{tab-item} 5
:sync: etape5
La balle doit rebondir sur les murs gauche, droit et haut de l'écran.
 - Dans la boucle de jeu, après avoir déplacé la balle, vérifiez sa position :
   - Si le bord gauche de la balle (`balle.get_left()`) est inférieur à 0 **OU** si son bord droit (`balle.get_right()`) est supérieur à 600, inversez la vitesse horizontale : `vitesse_balle_x = -vitesse_balle_x`
   - Si le bord haut de la balle (`balle.get_top()`) est inférieur à 0, inversez la vitesse verticale.

La balle devrait maintenant rebondir sur les trois côtés de l'écran.
`````
`````{tab-item} 6
:sync: etape6
La balle doit également rebondir sur la raquette.
 - Dans la boucle de jeu, vérifiez si la balle entre en collision avec la raquette **et** si elle descend : `if balle.collide(raquette) and vitesse_balle_y > 0:`
 - Si c'est le cas, inversez la vitesse verticale de la balle.

 *Pourquoi vérifier que la balle descend ? Une collision dure souvent plusieurs tours de boucle. Sans cette condition, la vitesse serait inversée à chaque tour et la balle resterait « collée » à la raquette.*
 - Afin que le joueur ait également un contrôle sur le rebond de la balle, sa vitesse horizontale doit être modifiée en fonction de l'endroit où elle percute la raquette. Ajoutez pour cela la ligne suivante en cas de collision : `vitesse_balle_x = (balle.get_x() - raquette.get_x()) / 10`.

Vous pouvez maintenant contrôler la raquette pour renvoyer la balle !
`````
`````{tab-item} 7
:sync: etape7
Créons maintenant les briques à détruire
 - Avant la boucle de jeu, créez une liste vide `briques = []`.
 - Puis, copiez/collez le code suivant. Vous ne devez pas forcément comprendre à 100% ce qu'il se passe, mais devrez légèrement le modifier après.
```python
for ligne in range(3):
  for colonne in range(5):
    brique = Actor("brick.png", 120 + colonne * 80, 80 + ligne * 40)
    briques.append(brique)
```

 - Dans la boucle de jeu, utilisez une boucle `for` pour dessiner toutes les briques. *Pour chaque brique dans la liste des briques : draw cette brique*.

Vous devriez voir 3 rangées de 5 briques alignées en haut de l'écran.
`````
`````{tab-item} 8
:sync: etape8
La balle doit maintenant détruire les briques en les touchant.
 - Dans la boucle de jeu, créez une variable `brique_touchée = False`.
 - Juste après, parcourez la liste des briques avec une boucle `for`.
 - Pour chaque brique, vérifiez si la balle est en collision avec elle : `if balle.collide(brique):`
 - Si c'est le cas :
   1. Supprimez la brique de la liste avec `remove()`.
   2. `brique_touchée` devient `True`.
 - **Après** la boucle `for` (et non dedans), si `brique_touchée` vaut `True`, inversez la vitesse verticale de la balle : `vitesse_balle_y = -vitesse_balle_y`

*Pourquoi ne pas inverser la vitesse directement dans la boucle ? Si la balle touche deux briques en même temps, sa vitesse serait inversée deux fois : elle ne rebondirait pas et traverserait les briques.*

Les briques devraient maintenant se détruire lorsque la balle les touche !
`````
`````{tab-item} 9
:sync: etape9
Gérons maintenant la défaite du joueur lorsque la balle tombe en bas de l'écran.
 - Avant la boucle de jeu, créez une variable `gameover = False`.
 - Dans la boucle de jeu, vérifiez si la position verticale de la balle (`balle.get_y()`) est supérieure à 620.
 - Si c'est le cas, `gameover` devient `True`.
 - Modifiez votre code de sorte que tous les mouvements (raquette, balle) et les collisions ne se produisent plus que si `gameover` est `False`.

Le jeu devrait se figer lorsque la balle tombe en bas de l'écran.
`````
`````{tab-item} 10
:sync: etape10
Ajoutons un message de fin de jeu.
 - Avant la boucle `while True`, créez deux textes :
   - `txt_gameover = Text("PERDU !", 300, 300, (255, 0, 0), (255, 255, 255))` pour la défaite
   - `txt_victoire = Text("VICTOIRE !", 300, 300, (0, 255, 0), (255, 255, 255))` pour la victoire
 - Si `gameover` est `True`, dessinez `txt_gameover`.
 - Si la liste `briques` est vide (toutes les briques détruites), dessinez `txt_victoire` et arrêtez les mouvements.

Vous avez maintenant un jeu complet avec conditions de victoire et de défaite !
`````
`````{tab-item} Partie 2
:sync: partie2
**Partie 2 : fonctionnalités intermédiaires**

Les fonctionnalités de la partie 2 valent au maximum 10 pts. Vous pouvez donc choisir des éléments de la liste suivante à implémenter et s'additionnant à 10 pts.

 - (2 pts) Ajoutez un score au jeu. Chaque brique détruite augmente le score de 10 points. Affichez le score en temps réel en haut de l'écran avec un `Text` (et sa méthode `set_text()`).
 - (2 pts) Donnez des couleurs différentes aux briques selon leur rangée. Vous pouvez utiliser les images `brick_green.png` et `brick_red.png`.
 - (2 pts) Faites accélérer progressivement la balle. À chaque fois qu'une brique est détruite, augmentez légèrement `vitesse_balle_x` et `vitesse_balle_y` (en conservant leur signe) pour rendre le jeu plus difficile.
 - (4 pts) Ajoutez des vies au joueur. Le joueur commence avec 3 vies. Lorsque la balle tombe, une vie est perdue et la balle est replacée au centre. Le gameover n'arrive que lorsque toutes les vies sont perdues. +1 pt si vous utilisez des images de coeur (`heart.png`).
`````
`````{tab-item} Partie 3
:sync: partie3
**Partie 3 : fonctionnalités avancées**

 - (2 pts) Afin que le jeu ne commence pas immédiatement lorsqu'on lance le programme, définissez une touche sur laquelle on doit appuyer afin que le jeu démarre.
 - (3 pts) Ajoutez une fonctionnalité permettant de redémarrer le jeu une fois qu'on a perdu et qu'on appuie sur la touche `R`.
 - (5 pts) Ajoutez un 2ème niveau. Lorsque toutes les briques sont détruites, créez un nouveau niveau avec plus de rangées ou des configurations différentes.
 - (5 pts) Ajoutez des bonus : quand on casse une brique, un bonus peut aléatoirement apparaître et tomber. Si la raquette ramasse le bonus, le joueur l'obtient. Les bonus peuvent être les suivants : raquette plus rapide, balle plus lente, raquette plus grande, ... . Ajoutez 1 bonus pour 5pts, puis +1pt par autre bonus. + 1 pt si le bonus est temporaire.
 - (3 pts) Ajoutez plusieurs balles simultanément (bonus "multi-ball"). Gérez une liste de balles comme pour les briques.
`````
``````

```{exec} python
:then: pygame_end
:editor: fce1ff87-ed2f-496e-9229-90e3d86166db
while True:
  refresh((40, 40, 60))
```

````{solution} Solution (étapes 1 à 10)
```{code-block} python
# Étapes 1 et 2 : la raquette
raquette = Actor("paddle.png", 300, 560)
raquette.scale(2)

# Étape 4 : la balle
balle = Actor("ball.png", 300, 540)
vitesse_balle_x = 3
vitesse_balle_y = -3

# Étape 7 : les briques
briques = []
for ligne in range(3):
  for colonne in range(5):
    brique = Actor("brick.png", 120 + colonne * 80, 80 + ligne * 40)
    briques.append(brique)

# Étapes 9 et 10 : fin de partie
gameover = False
txt_gameover = Text("PERDU !", 300, 300, (255, 0, 0), (255, 255, 255))
txt_victoire = Text("VICTOIRE !", 300, 300, (0, 255, 0), (255, 255, 255))

while True:
  refresh((30, 30, 60))

  if gameover == False and len(briques) > 0:
    # Étape 3 : déplacement de la raquette
    touches = get_pressed_keys()
    if "A" in touches:
      raquette.move(-6, 0)
    if "D" in touches:
      raquette.move(6, 0)

    # Étape 4 : déplacement de la balle
    balle.move(vitesse_balle_x, vitesse_balle_y)

    # Étape 5 : rebonds sur les murs
    if balle.get_left() < 0 or balle.get_right() > 600:
      vitesse_balle_x = -vitesse_balle_x
    if balle.get_top() < 0:
      vitesse_balle_y = -vitesse_balle_y

    # Étape 6 : rebond sur la raquette
    if balle.collide(raquette) and vitesse_balle_y > 0:
      vitesse_balle_y = -vitesse_balle_y
      vitesse_balle_x = (balle.get_x() - raquette.get_x()) / 10

    # Étape 8 : destruction des briques
    brique_touchée = False
    for brique in briques:
      if balle.collide(brique):
        briques.remove(brique)
        brique_touchée = True
    if brique_touchée:
      vitesse_balle_y = -vitesse_balle_y

    # Étape 9 : la balle tombe
    if balle.get_y() > 620:
      gameover = True

  raquette.draw()
  balle.draw()
  for brique in briques:
    brique.draw()
  # Étape 10
  if gameover:
    txt_gameover.draw()
  if len(briques) == 0:
    txt_victoire.draw()
```
````
