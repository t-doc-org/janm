
```{metadata}
exec:
  python:
    packages: [numpy, pygame-ce]
    files:
      spaceship.png:
      asteroide.png:
      laser.png:

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

# Projet Snake-like

## Partie 1 : fonctionnalités de base
````{tab-set}
:sync-group: etape
```{tab-item} 1
:sync: etape1
Créez et dessinez l'acteur principal `joueur` au centre de l'écran avec l'image `player.png`. Rappel : l'écran fait 600x600 pixels.
```
```{tab-item} 2
:sync: etape2
Le joueur doit avancer automatiquement vers le haut de l'écran.
 - Avant la boucle de jeu, créez deux variables `vitesse_x = 0` et `vitesse_y = -3` pour contrôler la direction du mouvement.
 - Dans la boucle de jeu, déplacez le joueur avec `joueur.move(vitesse_x, vitesse_y)`.

Le joueur devrait maintenant avancer continuellement vers le haut et sortir de l'écran.
```
```{tab-item} 3
:sync: etape3
Permettez au joueur de changer de direction avec les touches WASD.
 - Dans la boucle de jeu, récupérez les touches pressées avec `get_pressed_keys()`.
 - Si la touche {kbd}`W` est pressée, changez la direction vers le haut : `vitesse_x = 0` et `vitesse_y = -3`
 - Si la touche {kbd}`S` est pressée, changez la direction vers le bas : `vitesse_x = 0` et `vitesse_y = 3`
 - Si la touche {kbd}`A` est pressée, changez la direction vers la gauche : `vitesse_x = -3` et `vitesse_y = 0`
 - Si la touche {kbd}`D` est pressée, changez la direction vers la droite : `vitesse_x = 3` et `vitesse_y = 0`

Vous pouvez maintenant contrôler la direction du joueur qui avance continuellement !
```
```{tab-item} 4
:sync: etape4
Le joueur doit rebondir sur les bords de l'écran.
 - Après avoir déplacé le joueur, vérifiez sa position avec `joueur.get_x()` et `joueur.get_y()`.
 - Si la position horizontale est inférieure à 0 **OU** supérieure à 600, inversez la vitesse horizontale : `vitesse_x = -vitesse_x`
 - Si la position verticale est inférieure à 0 **OU** supérieure à 600, inversez la vitesse verticale : `vitesse_y = -vitesse_y`

Le joueur devrait maintenant rebondir sur les murs comme une balle de ping-pong !
```
```{tab-item} 5
:sync: etape5
Faisons apparaître des pièces à ramasser aléatoirement.
 - Avant la boucle de jeu, créez une liste vide `pieces = []`.
 - Créez également un `timer_pieces = Timer(2)` et démarrez-le immédiatement avec `timer_pieces.start()`.
 - Dans la boucle de jeu, vérifiez si le timer est terminé (`if timer_pieces.is_finished():`).
 - Si c'est le cas :
   1. Créez un nouvel acteur avec l'image `coin.png` à une position aléatoire : `piece = Actor("coin.png", randint(30, 570), randint(30, 570))`.
   2. Ajoutez cette pièce à la liste `pieces`.
   3. Redémarrez le timer.
 - Utilisez une boucle `for` dans la boucle de jeu pour dessiner toutes les pièces.

Des pièces devraient apparaître toutes les 2 secondes à des positions aléatoires.
```
```{tab-item} 6
:sync: etape6
Le joueur doit pouvoir ramasser les pièces.
 - Avant la boucle de jeu, créez une variable `score = 0`.
 - Créez également un texte pour afficher le score : `txt_score = Text("Score: 0", 70, 30, True, (255, 255, 255), (0, 0, 0))`.
 - Dans la boucle de jeu, parcourez la liste des pièces avec une boucle `for`.
 - Pour chaque pièce, vérifiez si le joueur est en collision avec elle : `if joueur.collide(piece):`.
 - Si c'est le cas :
   1. Supprimez la pièce de la liste avec `remove()`.
   2. Augmentez le score de 10 : `score += 10`.
   3. Mettez à jour le texte : `txt_score = Text(f"Score: {score}", 70, 30, True, (255, 255, 255), (0, 0, 0))`.
 - N'oubliez pas de dessiner le texte du score dans la boucle de jeu.

Les pièces devraient maintenant disparaître quand vous les touchez et le score augmenter !
```
```{tab-item} 7
:sync: etape7
Créons maintenant un ennemi qui se déplace tout seul.
 - Avant la boucle de jeu, créez un acteur `ennemi` avec l'image `enemy.png` à une position aléatoire.
 - Créez deux variables `vitesse_ennemi_x = 2` et `vitesse_ennemi_y = 2` pour contrôler le mouvement de l'ennemi.
 - Dans la boucle de jeu, déplacez l'ennemi avec `ennemi.move(vitesse_ennemi_x, vitesse_ennemi_y)`.
 - N'oubliez pas de dessiner l'ennemi.

L'ennemi devrait maintenant se déplacer en diagonale et sortir de l'écran.
```
```{tab-item} 8
:sync: etape8
L'ennemi doit rebondir sur les bords de l'écran, exactement comme le joueur.
 - Après avoir déplacé l'ennemi, vérifiez sa position avec `ennemi.get_x()` et `ennemi.get_y()`.
 - Si la position horizontale est inférieure à 0 **OU** supérieure à 600, inversez la vitesse horizontale : `vitesse_ennemi_x = -vitesse_ennemi_x`
 - Si la position verticale est inférieure à 0 **OU** supérieure à 600, inversez la vitesse verticale : `vitesse_ennemi_y = -vitesse_ennemi_y`

L'ennemi devrait maintenant rebondir sur les murs et se déplacer partout dans l'écran !
```
```{tab-item} 9
:sync: etape9
Ajoutons la condition de gameover quand le joueur touche l'ennemi.
 - Avant la boucle `while True`, créez une variable `gameover = False`.
 - Créez un texte : `txt_gameover = Text("PERDU !", 300, 300, True, (255, 0, 0), (255, 255, 255))`
 - Dans la boucle de jeu, vérifiez si le joueur est en collision avec l'ennemi : `if joueur.collide(ennemi):`. Si c'est le cas, `gameover` devient `True`.
 - Modifiez votre code pour que tous les mouvements (joueur, ennemi) et l'apparition des pièces ne se produisent que si `gameover` est `False`.
 - Si `gameover` est `True`, dessinez `txt_gameover`.

Le jeu devrait se figer si vous touchez l'ennemi !
```
```{tab-item} 10
:sync: etape10
Ajoutons une condition de victoire.
 - Avant la boucle `while True`, créez une variable `victoire = False`.
 - Créez un texte : `txt_victoire = Text("VICTOIRE !", 300, 300, True, (0, 255, 0), (255, 255, 255))`
 - Dans la boucle de jeu, vérifiez si le score atteint 100 ou plus. Si c'est le cas, `victoire` devient `True`.
 - Modifiez votre code pour que tous les mouvements ne se produisent que si `gameover` **ET** `victoire` sont tous les deux `False`.
 - Si `victoire` est `True`, dessinez `txt_victoire`.

Vous avez maintenant un jeu complet : évitez l'ennemi et collectez 100 points pour gagner !
```
````


```{exec} python main
:then: pygame_end
:editor: a130776b-40b4-46b1-969d-b172edd44ba7
async def main():
  while True:
    await refresh((20, 20, 40))
```



## Partie 2 : fonctionnalités intermédiaires

Les fonctionnalités de la partie 2 valent au maximum 10 pts. Vous pouvez donc choisir des éléments de la liste suivante à implémenter et s'additionnant à 10 pts.

 - (2 pts) Ajoutez plusieurs ennemis (par exemple 3). Créez une liste `ennemis = []` avec plusieurs acteurs. Vous aurez besoin de deux listes parallèles : `vitesses_ennemis_x = []` et `vitesses_ennemis_y = []` pour stocker les vitesses de chaque ennemi. Gérez leurs mouvements et rebonds dans une boucle `for`.
 - (2 pts) Faites varier la vitesse d'apparition des pièces. Au fur et à mesure que le score augmente, réduisez progressivement la durée du timer des pièces pour rendre le jeu plus difficile.
 - (2 pts) Ajoutez des pièces spéciales qui valent plus de points (par exemple 25 points). Utilisez une image différente (par exemple `coin_gold.png`) et faites-les apparaître moins souvent avec un timer séparé.
 - (3 pts) Faites accélérer progressivement l'ennemi. À chaque fois que le joueur ramasse une pièce, augmentez légèrement les vitesses de l'ennemi (en conservant leur signe) pour rendre le jeu plus difficile.
 - (3 pts) Ajoutez un power-up d'invincibilité. Créez un acteur qui apparaît rarement (timer de 10 secondes). Si le joueur le ramasse, il devient invincible pendant 5 secondes (utilisez un timer). Pendant ce temps, faites clignoter le joueur et l'ennemi ne peut plus le toucher.
 - (4 pts) Ajoutez un système de vies. Le joueur commence avec 3 vies affichées à l'écran. Toucher un ennemi fait perdre une vie au lieu du gameover immédiat. Après avoir perdu une vie, le joueur est invincible pendant 2 secondes. Le gameover n'arrive que lorsque toutes les vies sont perdues.

 ## Partie 3 : fonctionnalités avancées
 
 - (5 pts) Ajoutez un système de combo. Si le joueur ramasse plusieurs pièces rapidement (sans laisser passer plus de 2 secondes entre chaque), le score augmente avec un multiplicateur (x2, x3, x4...). Affichez le multiplicateur à l'écran et réinitialisez-le si trop de temps passe.
 - (5 pts) Créez un ennemi "chasseur" qui se dirige lentement vers le joueur. Calculez la direction entre l'ennemi et le joueur : si le joueur est à droite, augmentez légèrement `vitesse_ennemi_x`, s'il est à gauche, diminuez-la. Faites de même pour la direction verticale. L'ennemi rebondit toujours sur les murs.
 - (6 pts) Ajoutez des zones de téléportation. Créez deux portails (acteurs fixes) à des positions aléatoires. Quand le joueur ou l'ennemi touche un portail, utilisez `set_position()` pour le téléporter à l'autre portail. Les portails changent de position toutes les 10 secondes.
 - (6 pts) Créez un mode "dash" : en appuyant sur la barre espace, le joueur fait un déplacement rapide dans sa direction actuelle pendant 0.3 seconde (utilisez un timer pour mesurer la durée). Pendant le dash, multipliez les vitesses par 3 et le joueur traverse les ennemis sans perdre. Le dash a un cooldown de 3 secondes.
 - (7 pts) Ajoutez un système de niveaux. Après avoir atteint 100 points, passez au niveau 2 : ajoutez un ennemi supplémentaire à la liste, augmentez les vitesses de tous les ennemis, et réduisez le temps d'apparition des pièces. Réinitialisez le score à 0 et affichez le numéro du niveau à l'écran.
 - (8 pts) Créez des obstacles fixes (murs) disposés aléatoirement dans l'écran. Au début du jeu, créez une liste de 5-10 acteurs `wall.png` à des positions aléatoires. Le joueur et les ennemis rebondissent sur ces murs (vérifiez la collision et inversez les vitesses). Régénérez la disposition des murs à chaque nouveau niveau.