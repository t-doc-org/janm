
```{metadata}
exec:
  python:
    packages: [numpy, pygame-ce]
    files:
      brick.png:
      ball.png:
      paddle.png:

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

# Projet Casse-Briques

## Partie 1 : fonctionnalités de base
``````{tab-set}
:sync-group: etape
````{tab-item} 1
:sync: etape1
Créez et dessinez l'acteur principal `raquette` en bas au centre de l'écran avec l'image `paddle.png`. Rappel : l'écran fait 600x600 pixels.
````
````{tab-item} 2
:sync: etape2
La raquette est un peu petite. Agrandissez-la !
 - Juste après avoir créé la raquette (étape 1), utilisez la méthode `scale()` pour la rendre 2 fois plus grande.

La raquette devrait maintenant être plus large et plus facile à utiliser.
````
````{tab-item} 3
:sync: etape3
Permettez à la raquette de se déplacer latéralement.
 - Dans la boucle de jeu, récupérez les touches pressées avec `get_pressed_keys()`.
 - Si la touche {kbd}`A` est pressée, déplacez la raquette vers la gauche avec `move()`.
 - Si la touche {kbd}`D` est pressée, déplacez la raquette vers la droite avec `move()`.
 - Ajustez la vitesse de déplacement pour que la maniabilité soit agréable.
````
````{tab-item} 4
:sync: etape4
Créons maintenant la balle qui va rebondir !
 - Avant la boucle `while True`, créez un acteur `balle` avec l'image `ball.png`. Placez-la juste au-dessus de la raquette.
 - Créez deux variables `vitesse_balle_x = 3` et `vitesse_balle_y = -3` pour contrôler la vitesse de la balle. Ces vitesses initiales signifient que la balle se dirigera au début du jeu en diagonal vers le haut/droite.
 - Dans la boucle de jeu, déplacez la balle avec `balle.move(vitesse_balle_x, vitesse_balle_y)`.
 - N'oubliez pas de dessiner la balle avec `draw()`.

Vous devriez voir la balle se déplacer en diagonale vers le haut à droite et disparaître hors de l'écran.
````
````{tab-item} 5
:sync: etape5
La balle doit rebondir sur les murs gauche, droit et haut de l'écran.
 - Dans la boucle de jeu, après avoir déplacé la balle, vérifiez sa position :
   - Si la position horizontale (`balle.get_x()`) est inférieure à 0 **OU** supérieure à 600, inversez la vitesse horizontale : `vitesse_balle_x = -vitesse_balle_x`
   - Si la position verticale (`balle.get_y()`) est inférieure à 0, inversez la vitesse verticale.

La balle devrait maintenant rebondir sur les trois côtés de l'écran.
````
````{tab-item} 6
:sync: etape6
La balle doit également rebondir sur la raquette.
 - Dans la boucle de jeu, vérifiez si la balle entre en collision avec la raquette : `if balle.collide(raquette):`
 - Si c'est le cas, inversez la vitesse verticale de la balle.
 - Afin que le joueur ait également un contrôle sur le rebond de la balle, sa vitesse horizontale doit être modifiée en fonction de l'endroit où elle percute la raquette. Ajoutez pour cela la ligne suivante en cas de collision : `vitesse_balle_x = (balle.get_x() - raquette.get_x()) / 10`.

Vous pouvez maintenant contrôler la raquette pour renvoyer la balle !
````
````{tab-item} 7
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
````
````{tab-item} 8
:sync: etape8
La balle doit maintenant détruire les briques en les touchant.
 - Dans la boucle de jeu, parcourez la liste des briques avec une boucle `for`.
 - Pour chaque brique, vérifiez si la balle est en collision avec elle : `if balle.collide(brique):`
 - Si c'est le cas :
   1. Supprimez la brique de la liste avec `remove()`.
   2. Inversez la vitesse verticale de la balle : `vitesse_balle_y = -vitesse_balle_y`

Les briques devraient maintenant se détruire lorsque la balle les touche !
````
````{tab-item} 9
:sync: etape9
Gérons maintenant la défaite du joueur lorsque la balle tombe en bas de l'écran.
 - Avant la boucle de jeu, créez une variable `gameover = False`.
 - Dans la boucle de jeu, vérifiez si la position verticale de la balle (`balle.get_y()`) est supérieure à 620.
 - Si c'est le cas, `gameover` devient `True`.
 - Modifiez votre code de sorte que tous les mouvements (raquette, balle) et les collisions ne se produisent plus que si `gameover` est `False`.

Le jeu devrait se figer lorsque la balle tombe en bas de l'écran.
````
````{tab-item} 10
:sync: etape10
Ajoutons un message de fin de jeu.
 - Avant la boucle `while True`, créez deux textes :
   - `txt_gameover = Text("PERDU !", 300, 300, True, (255, 0, 0), (255, 255, 255))` pour la défaite
   - `txt_victoire = Text("VICTOIRE !", 300, 300, True, (0, 255, 0), (255, 255, 255))` pour la victoire
 - Si `gameover` est `True`, dessinez `txt_gameover`.
 - Si la liste `briques` est vide (toutes les briques détruites), dessinez `txt_victoire` et arrêtez les mouvements.

Vous avez maintenant un jeu complet avec conditions de victoire et de défaite !
````

``````


```{exec} python main
:then: pygame_end
:editor: fce1ff87-ed2f-496e-9229-90e3d86166db
async def main():
  while True:
    await refresh((40, 40, 60))
```



## Partie 2 : fonctionnalités intermédiaires

Les fonctionnalités de la partie 2 valent au maximum 10 pts. Vous pouvez donc choisir des éléments de la liste suivante à implémenter et s'additionnant à 10 pts.

 - (2 pts) Ajoutez un score au jeu. Chaque brique détruite augmente le score de 10 points. Affichez le score en temps réel en haut de l'écran avec un `Text`.
 - (2 pts) Ajoutez des couleurs différentes aux briques selon leur rangée. Vous pouvez utiliser différentes images ou la méthode `scale()` pour varier l'apparence.
 - (3 pts) Faites accélérer progressivement la balle. À chaque fois qu'une brique est détruite, augmentez légèrement `vitesse_balle_x` et `vitesse_balle_y` (en conservant leur signe) pour rendre le jeu plus difficile.
 - (3 pts) Ajoutez des vies au joueur. Le joueur commence avec 3 vies. Lorsque la balle tombe, une vie est perdue et la balle est replacée au centre. Le gameover n'arrive que lorsque toutes les vies sont perdues.
 - (4 pts) Ajoutez des bonus qui tombent aléatoirement lorsqu'une brique est détruite (par exemple : raquette plus large, balle plus lente, vie supplémentaire). Le joueur doit attraper ces bonus avec sa raquette.

 ## Partie 3 : fonctionnalités avancées
 - (5 pts) Ajoutez plusieurs niveaux. Lorsque toutes les briques sont détruites, créez un nouveau niveau avec plus de rangées ou des configurations différentes.
 - (5 pts) Ajoutez un effet de "spin" : la direction horizontale de la balle après rebond sur la raquette dépend de l'endroit où elle touche (centre = tout droit, bords = angles prononcés).
 - (6 pts) Créez des briques spéciales qui nécessitent plusieurs coups pour être détruites (changement d'image à chaque coup).
 - (7 pts) Ajoutez plusieurs balles simultanément (bonus "multi-ball"). Gérez une liste de balles comme pour les briques.