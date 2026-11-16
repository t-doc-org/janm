```{metadata}
hide: [primary-sidebar, secondary-sidebar, prev-next, footer]
exec:
  python:
    files:
      pacman.png:
      apple.png:
      blinky.png:
      heart.png:
      bubble.png:
      inky.png:
      strawberry.png:
      orange.png:
      banana.png:
      shield.png:
      bomb.png:
      tools.png:
      gift_blue.png:
      gift_yellow.png:
      gift_red.png:
      lamp.png:
      trampoline.png:
      brick.png:
      brick_red.png:
      brick_green.png:
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

# Projet Pacman-like

:::{container} projet-liens
[Documentation du module](../pygame_doc.md)
:::

:::{container} projet-consignes
``````{tab-set}
:sync-group: etape
`````{tab-item} 1
:sync: etape1
Créez et dessinez l'acteur principal `pacman` au centre de l'écran avec l'image `pacman.png`. Rappel : l'écran fait 600x600 pixels.
`````
`````{tab-item} 2
:sync: etape2
Dans ce jeu, pacman doit se déplacer automatiquement. Appuyer sur une touche permet de changer la direction de ce déplacement automatique.
 - Avant la boucle de jeu, créez deux variables `vitesse_x = 0` et `vitesse_y = -3` pour contrôler la direction du mouvement.
 - Dans la boucle de jeu, déplacez en tout temps pacman avec `move()` par rapport à ses deux vitesses.

pacman devrait maintenant avancer continuellement vers le haut et sortir de l'écran.
`````
`````{tab-item} 3
:sync: etape3
Permettez à pacman de changer de direction avec les touches WASD.
 - Dans la boucle de jeu, récupérez les touches pressées avec `get_pressed_keys()`.
 - Si la touche {kbd}`A` est pressée, changez la direction vers la gauche. Cela signifie que `vitesse_x = -3` et `vitesse_y = 0`
 - Si la touche {kbd}`S` est pressée, changez la direction vers le bas : `vitesse_x = 0` et `vitesse_y = 3`
 - Faites de même pour les touches {kbd}`W` et {kbd}`D`.

Vous pouvez maintenant contrôler la direction de pacman qui avance continuellement !
`````
`````{tab-item} 4
:sync: etape4
Faisons en sorte que pacman regarde dans la direction où il se déplace.
 - Juste après avoir changé les vitesses avec les touches WASD, utilisez la méthode `set_angle()` pour orienter pacman (l'angle est en degrés, et l'image tourne autour de son centre) :
   - Si vous allez vers la gauche, l'angle est de 90° : `pacman.set_angle(90)`
   - Si vous allez vers le bas, l'angle est de 180°
   - Vers la droite, l'angle est de 270°
   - Vers le haut, l'angle est de 0°

pacman devrait maintenant tourner pour regarder dans la direction où il se déplace !
`````
`````{tab-item} 5
:sync: etape5
pacman doit rebondir sur les bords de l'écran.
 - Si le bord gauche de pacman (`pacman.get_left()`) est inférieur à 0 **OU** si son bord droit (`pacman.get_right()`) est supérieur à 600, inversez la vitesse horizontale : `vitesse_x = -vitesse_x`
 - Faites de même avec les bords haut et bas (`get_top()`, `get_bottom()` et `vitesse_y`).
 - Lorsque pacman rebondit, il doit aussi se retourner. Pour chaque rebond, utilisez `set_angle()` avec l'angle correspondant à sa **nouvelle** direction (étape 4). Par exemple, s'il rebondit sur le bord gauche, il repart vers la droite : `pacman.set_angle(270)`. Pour savoir sur quel bord il a rebondi, vous pouvez séparer vos conditions en quatre `if`.

pacman devrait maintenant rebondir sur les murs comme une balle de ping-pong !
`````
`````{tab-item} 6
:sync: etape6
Faisons apparaître des pommes à ramasser aléatoirement.
 - Avant la boucle de jeu, créez une liste vide `pommes = []`.
 - Créez également un `timer_pommes = Timer(2)` et démarrez-le immédiatement avec `timer_pommes.start()`.
 - Dans la boucle de jeu, vérifiez si le timer est terminé (`if timer_pommes.is_finished():`).
 - Si c'est le cas :
   1. Créez un nouvel acteur `pomme` avec l'image `apple.png`. Pour ses positions x et y, à la place de valeurs fixes, utilisez à chaque fois `randint(30, 570)`. Cette fonction permet de tirer un nombre entier aléatoire entre ces deux bornes et donc de placer la pomme aléatoirement sur l'écran.
   2. Ajoutez cette pomme à la liste `pommes`.
   3. Redémarrez le timer.
 - Utilisez une boucle `for` dans la boucle de jeu pour dessiner `draw()` toutes les pommes. *Pour chaque pomme dans la liste de pommes : draw cette pomme*.

Des pommes devraient apparaître toutes les 2 secondes à des positions aléatoires.
`````
`````{tab-item} 7
:sync: etape7
pacman doit pouvoir ramasser les pommes.
 - Avant la boucle de jeu, créez une variable `score = 0`.
 - Créez également un texte pour afficher le score : `txt_score = Text("Score: 0", 70, 30, (255, 255, 255), (0, 0, 0))`.
 - Dans la boucle de jeu, parcourez la liste des pommes avec une boucle `for`.
 - Pour chaque pomme, vérifiez si pacman est en collision avec elle : `if pacman.collide(pomme):`.
 - Si c'est le cas :
   1. Supprimez la pomme de la liste avec `remove()`.
   2. Augmentez le score de 10 : `score += 10`.
   3. Mettez à jour le texte : `txt_score.set_text(f"Score: {score}")`.
 - N'oubliez pas de dessiner `draw()` le texte du score dans la boucle de jeu.

Les pommes devraient maintenant disparaître quand vous les touchez et le score augmenter !
`````
`````{tab-item} 8
:sync: etape8
Créons maintenant un fantôme qui se déplace tout seul.
 - Avant la boucle de jeu, créez un acteur `fantome` avec l'image `blinky.png` à une position aléatoire.
 - Créez deux variables `vitesse_fantome_x = 2` et `vitesse_fantome_y = 2` pour contrôler le mouvement du fantôme.
 - Dans la boucle de jeu, déplacez le fantôme avec `move()` de manière similaire à pacman.
 - N'oubliez pas de dessiner `draw()` le fantôme.

Le fantôme devrait maintenant se déplacer en diagonale et sortir de l'écran.
`````
`````{tab-item} 9
:sync: etape9
Le fantôme doit rebondir sur les bords de l'écran, exactement comme pacman.
 - Si le bord gauche du fantôme est inférieur à 0 **OU** si son bord droit est supérieur à 600, inversez sa vitesse horizontale.
 - Faites de même avec les bords haut et bas et sa vitesse verticale.

Le fantôme devrait maintenant rebondir sur les murs et se déplacer partout dans l'écran !
`````
`````{tab-item} 10
:sync: etape10
Ajoutons la condition de gameover quand pacman touche le fantôme.
 - Dans la boucle de jeu, vérifiez si pacman est en collision avec le fantôme avec `collide()`. Si c'est le cas, utilisez la fonction `kill()` pour détruire pacman

pacman devrait maintenant disparaître lorsqu'il entre en contact avec le fantôme. Vous pouvez ensuite savoir si pacman a été détruit avec `pacman.is_killed()`, qui retourne `True` ou `False`.
`````
`````{tab-item} Partie 2
:sync: partie2
**Partie 2 : fonctionnalités intermédiaires**

Les fonctionnalités de la partie 2 valent au maximum 10 pts. Vous pouvez donc choisir des éléments de la liste suivante à implémenter et s'additionnant à 10 pts.

 - (2 pts) Faites accélérer progressivement le fantôme. À chaque fois que pacman ramasse une pomme, augmentez légèrement les vitesses du fantôme (en conservant leur signe) pour rendre le jeu plus difficile.
 - (4 pts) Ajoutez un système de vies. pacman commence avec 3 vies affichées à l'écran. Toucher un fantôme fait perdre une vie au lieu du gameover immédiat. Après avoir perdu une vie, pacman est invincible pendant 2 secondes. Le gameover n'arrive que lorsque toutes les vies sont perdues. +1 pt si vous utilisez des images de coeur (`heart.png`). Un acteur *killed* peut réapparaître grâce à sa méthode `revive()`.
 - (2 pts) Ajoutez de nouveaux fruits autres que la pomme qui apparaissent aléatoirement. Ceux-ci permettent d'obtenir plus de points que la pomme. Vous pouvez utiliser `banana.png`, `orange.png` ou `strawberry.png`.
 - (4 pts) Ajoutez de nouveaux fruits autres que la pomme qui apparaissent aléatoirement. Ceux-ci permettent d'obtenir des bonus tels que pacman qui bouge plus rapidement, le fantôme qui ralentit, etc.
 - (3 pts) Ajoutez un 2ème fantôme (`inky.png`) qui apparaît lorsqu'on atteint un certain nombre de points
 - (2 pts) Ajoutez un "écran" de gameover.
`````
`````{tab-item} Partie 3
:sync: partie3
**Partie 3 : fonctionnalités avancées**

 - (2 pts) Afin que le jeu ne commence pas immédiatement lorsqu'on lance le programme, définissez une touche sur laquelle on doit appuyer afin que le jeu démarre.
 - (3 pts) Ajoutez une fonctionnalité permettant de redémarrer le jeu une fois qu'on a perdu et qu'on appuie sur la touche `R`.
 - (2 pts) Rendez le mouvement du fantôme moins prévisible d'une manière ou d'une autre. Par exemple, à intervalle régulier, celui-ci pourrait aléatoirement changer de direction. Ou, lorsqu'il rebondit contre un mur, il pourrait aléatoirement revenir dans la même direction.
 - (3 pts) Ajoutez un obstacle fixe sur le terrain. Lorsque Pacman entre en collision avec cet obstacle, il rebondit comme sur un mur. +2pts si vous utilisez une liste d'obstacles.
 - (5 pts) Ajoutez un 2ème niveau avec une condition de victoire. Lorsque Pacman atteint un certain score, le joueur gagne, et un 2ème niveau apparaît. Celui-ci est différent du premier (différents obstacles, différents fantômes, différents fruits, ...)
`````
``````
:::

:::{container} projet-ide
```{exec} python
:then: pygame_end
:editor: a130776b-40b4-46b1-969d-b172edd44ba7
while True:
  refresh((0, 0, 0))
```
:::

````{solution} Solution (étapes 1 à 10)
```{code-block} python
# Étape 1 : pacman
pacman = Actor("pacman.png", 300, 300)

# Étape 2 : déplacement automatique
vitesse_x = 0
vitesse_y = -3

# Étape 6 : les pommes
pommes = []
timer_pommes = Timer(2)
timer_pommes.start()

# Étape 7 : le score
score = 0
txt_score = Text("Score: 0", 70, 30, (255, 255, 255), (0, 0, 0))

# Étape 8 : le fantôme
fantome = Actor("blinky.png", randint(50, 550), randint(50, 550))
vitesse_fantome_x = 2
vitesse_fantome_y = 2

while True:
  refresh((0, 0, 0))

  # Étapes 3 et 4 : changement de direction
  touches = get_pressed_keys()
  if "A" in touches:
    vitesse_x = -3
    vitesse_y = 0
    pacman.set_angle(90)
  if "S" in touches:
    vitesse_x = 0
    vitesse_y = 3
    pacman.set_angle(180)
  if "D" in touches:
    vitesse_x = 3
    vitesse_y = 0
    pacman.set_angle(270)
  if "W" in touches:
    vitesse_x = 0
    vitesse_y = -3
    pacman.set_angle(0)

  # Étape 2 : déplacement
  pacman.move(vitesse_x, vitesse_y)

  # Étape 5 : rebonds sur les bords
  if pacman.get_left() < 0:
    vitesse_x = -vitesse_x
    pacman.set_angle(270)
  if pacman.get_right() > 600:
    vitesse_x = -vitesse_x
    pacman.set_angle(90)
  if pacman.get_top() < 0:
    vitesse_y = -vitesse_y
    pacman.set_angle(180)
  if pacman.get_bottom() > 600:
    vitesse_y = -vitesse_y
    pacman.set_angle(0)

  # Étape 6 : apparition des pommes
  if timer_pommes.is_finished():
    pomme = Actor("apple.png", randint(30, 570), randint(30, 570))
    pommes.append(pomme)
    timer_pommes.start()

  # Étape 7 : ramasser les pommes
  for pomme in pommes:
    if pacman.collide(pomme):
      pommes.remove(pomme)
      score += 10
      txt_score.set_text(f"Score: {score}")

  # Étapes 8 et 9 : déplacement et rebonds du fantôme
  fantome.move(vitesse_fantome_x, vitesse_fantome_y)
  if fantome.get_left() < 0 or fantome.get_right() > 600:
    vitesse_fantome_x = -vitesse_fantome_x
  if fantome.get_top() < 0 or fantome.get_bottom() > 600:
    vitesse_fantome_y = -vitesse_fantome_y

  # Étape 10 : pacman touche le fantôme
  if pacman.collide(fantome):
    pacman.kill()

  for pomme in pommes:
    pomme.draw()
  pacman.draw()
  fantome.draw()
  txt_score.draw()
```
````
