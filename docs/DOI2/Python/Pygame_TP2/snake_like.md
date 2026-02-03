```{metadata}
exec:
  python:
    packages: [numpy, pygame-ce]
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


versions:
  pyodide: 0.27.7
```


```{exec} python
:name: setup
:when: never
:class: hidden
import io
with redirect(stdout=io.StringIO()):
    import tdoc.pygame
setup_canvas()
```

```{exec} python
:name: pygame_start
:when: never
:class: hidden
:include: ../code/pygame_start.py
```

```{defaults} exec
:after: setup pygame_start
:style: max-height: 25rem;
```

```{exec} python
:name: pygame_end
:when: never
:class: hidden

try:
    await main()
finally:
    pygame.quit()
```

# Projet Pacman-like

## Partie 1 : fonctionnalités de base
````{tab-set}
:sync-group: etape
```{tab-item} 1
:sync: etape1
Créez et dessinez l'acteur principal `pacman` au centre de l'écran avec l'image `pacman.png`. Rappel : l'écran fait 600x600 pixels.
```
```{tab-item} 2
:sync: etape2
Dans ce jeu, pacman doit se déplacer automatiquement. Appuyer sur une touche permet de changer la direction de ce déplacement automatique.
 - Avant la boucle de jeu, créez deux variables `vitesse_x = 0` et `vitesse_y = -3` pour contrôler la direction du mouvement.
 - Dans la boucle de jeu, déplacez en tout temps pacman avec `move()` par rapport à ses deux vitesses. 

pacman devrait maintenant avancer continuellement vers le haut et sortir de l'écran.
```
```{tab-item} 3
:sync: etape3
Permettez à pacman de changer de direction avec les touches WASD.
 - Dans la boucle de jeu, récupérez les touches pressées avec `get_pressed_keys()`.
 - Si la touche {kbd}`A` est pressée, changez la direction vers la gauche. Cela signifie que `vitesse_x = -3` et `vitesse_y = 0`
 - Si la touche {kbd}`S` est pressée, changez la direction vers le bas : `vitesse_x = 0` et `vitesse_y = 3`
 - Faites de même pour pour les touches {kbd}`W` et {kbd}`D`.

Vous pouvez maintenant contrôler la direction de pacman qui avance continuellement !
```
```{tab-item} 4
:sync: etape4
Faisons en sorte que pacman regarde dans la direction où il se déplace.
 - Juste après avoir changé les vitesses avec les touches WASD, utilisez la méthode `set_angle()` pour orienter pacman :
   - Si vous allez vers la gauche, l'angle est de 90° : `pacman.set_angle(90)`
   - Si vous allez vers le bas, l'angle est de 180°
   - Vers la droite, l'angle est de 270°
   - Vers le haut, l'angle est de 0°

pacman devrait maintenant tourner pour regarder dans la direction où il se déplace !
```
```{tab-item} 5
:sync: etape5
pacman doit rebondir sur les bords de l'écran.
 - Si la position horizontale de pacman (`pacman.get_x()`) est inférieure à 0 **OU** supérieure à 600, inversez la vitesse horizontale : `vitesse_x = -vitesse_x`
 - Faites de même avec la position verticale (`get_y()` et `vitesse_y`).

pacman devrait maintenant rebondir sur les murs comme une balle de ping-pong !
```
```{tab-item} 6
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
```
```{tab-item} 7
:sync: etape7
pacman doit pouvoir ramasser les pommes.
 - Avant la boucle de jeu, créez une variable `score = 0`.
 - Créez également un texte pour afficher le score : `txt_score = Text("Score: 0", 70, 30, True, (255, 255, 255), (0, 0, 0))`.
 - Dans la boucle de jeu, parcourez la liste des pommes avec une boucle `for`.
 - Pour chaque pomme, vérifiez si pacman est en collision avec elle : `if pacman.collide(pomme):`.
 - Si c'est le cas :
   1. Supprimez la pomme de la liste avec `remove()`.
   2. Augmentez le score de 10 : `score += 10`.
   3. Mettez à jour le texte : `txt_score = Text(f"Score: {score}", 70, 30, True, (255, 255, 255), (0, 0, 0))`.
 - N'oubliez pas de dessiner `draw()` le texte du score dans la boucle de jeu.

Les pommes devraient maintenant disparaître quand vous les touchez et le score augmenter !
```
```{tab-item} 8
:sync: etape8
Créons maintenant un fantôme qui se déplace tout seul.
 - Avant la boucle de jeu, créez un acteur `fantôme` avec l'image `blinky.png` à une position aléatoire.
 - Créez deux variables `vitesse_fantome_x = 2` et `vitesse_fantome_y = 2` pour contrôler le mouvement du fantôme.
 - Dans la boucle de jeu, déplacez le fantôme avec `move()` de manière similaire à pacman.
 - N'oubliez pas de dessiner `draw()` le fantôme.

Le fantôme devrait maintenant se déplacer en diagonale et sortir de l'écran.
```
```{tab-item} 9
:sync: etape9
Le fantôme doit rebondir sur les bords de l'écran, exactement comme pacman.
 - Si la position horizontale du fantôme est inférieure à 0 **OU** supérieure à 600, inversez-la.
 - Faites de même avec la position verticale.

Le fantôme devrait maintenant rebondir sur les murs et se déplacer partout dans l'écran !
```
```{tab-item} 10
:sync: etape10
Ajoutons la condition de gameover quand pacman touche le fantôme.
 - Dans la boucle de jeu, vérifiez si pacman est en collision avec le fantôme avec `collide()`. Si c'est le cas, utilisez la fonction `kill()` pour détruire pacman

pacman devrait maintenant disparaître lorsqu'il entre en contact avec le fantôme.
```
````


```{exec} python main
:then: pygame_end
:editor: a130776b-40b4-46b1-969d-b172edd44ba7
async def main():
  while True:
    await refresh((0, 0, 0))
```



## Partie 2 : fonctionnalités intermédiaires

Les fonctionnalités de la partie 2 valent au maximum 10 pts. Vous pouvez donc choisir des éléments de la liste suivante à implémenter et s'additionnant à 10 pts.

 - (2 pts) Faites accélérer progressivement le fantôme. À chaque fois que pacman ramasse une pomme, augmentez légèrement les vitesses du fantôme (en conservant leur signe) pour rendre le jeu plus difficile.
 - (4 pts) Ajoutez un système de vies. pacman commence avec 3 vies affichées à l'écran. Toucher un fantôme fait perdre une vie au lieu du gameover immédiat. Après avoir perdu une vie, pacman est invincible pendant 2 secondes. Le gameover n'arrive que lorsque toutes les vies sont perdues. +1 pt si vous utilisez des images de coeur (`heart.png`).
 - (2 pts) Ajoutez de nouveaux fruits autres que la pomme qui apparaissent aléatoirement. Ceux-ci permettent d'obtenir plus de points que la pomme. Vous pouvez utiliser `banana.png`, `orange.png` ou `strawberry.png`.
 - (4 pts) Ajoutez de nouveaux fruits autres que la pomme qui apparaissent aléatoirement. Ceux-ci permettent d'obtenir des bonus tels que pacman qui bouge plus rapidement, le fantôme qui ralentit, etc.
 - (3 pts) Ajoutez un 2ème fantôme (`inky.png`) qui apparaît lorsque on atteint un certain nombre de points 
 - (2 pts) Ajoutez un "écran" de gameover.

 ## Partie 3 : fonctionnalités avancées
 - (2 pts) Afin que le jeu ne commence pas immédiatement lorsqu'on lance le programme, définissez une touche sur laquelle on doit appuyer afin que le jeu démarre.
 - (3 pts) Ajoutez une fonctionnalité permettant de redémarrer le jeu une fois qu'on a perdu et qu'on appuie sur la touche `R`.
 

 - (2 pts) Rendez le mouvement du fantôme moins prévisible d'une manière ou d'une autre. Par exemple, à interval régulier, celui-ci pourrait aléatoirement changer de directement. Ou, lorsqu'il rebondit contre un mur, il pourrait aléatoirement revenir dans la même direction.

 - (3 pts) Ajoutez un obstacle fixe sur le terrain. Lorsque Pacman entre en collision avec cet obstacle, il rebondit comme sur un mur. +2pts si vous utilisez une liste d'obstacles.
 - (5 pts) Ajoutez un 2ème niveau avec une condition de victoire. Lorsque Pacman atteint un certain score, le joueur gagne, et un 2ème niveau apparaît. Celui-ci est différent du premier (différents obstacles, différents fantômes, différents fruits, ...) 

