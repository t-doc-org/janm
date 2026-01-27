
```{metadata}
exec:
  python:
    packages: [numpy, pygame-ce]
    files:
      spaceship.png:
      asteroide.png:
      laser.png:
      galaxy_background.jpg:
      heart.png:
      bubble.png:
      strawberry.png:
      orange.png:
      banana.png:
      shield.png:
      bomb.png:
      enemy_spaceship.png:
      metal_skull.png:
      tools.png:


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


# Projet Space Shooter

## Partie 1 : fonctionnalités de base
````{tab-set}
:sync-group: etape
```{tab-item} 1
:sync: etape1
Créez et dessinez l'acteur principal `vaisseau` en bas au centre de l'écran avec l'image `spaceship.png`. Rappel : l'écran fait 600x600 pixels.
```
```{tab-item}  2
:sync: etape2
Permettez au vaisseau de se déplacer latéralement.
 - Dans la boucle de jeu, récupérez les touches pressées avec `get_pressed_keys()`.
 - Si la touche {kbd}`A` est pressée, déplacez le vaisseau vers la gauche avec `move()`.
 - Si la touche {kbd}`D` est pressée, déplacez le vaisseau vers la droite avec `move()`.
 - Ajustez la vitesse de déplacement pour que la maniabilité soit agréable.
```
```{tab-item}   3
:sync: etape3
Armons notre vaisseau ! Pour pouvoir tirer plusieurs fois, nous allons stocker nos projectiles dans une liste.
 - Avant la boucle `while True`, créez une liste vide `lasers = []`.
 - Dans la boucle de jeu, si la touche `"SPACE"` est pressée :
   1. Créez un nouvel acteur avec l'image `laser.png`. Sa position de départ doit correspondre à celle du vaisseau. Pour récupérer la position horizontale, utilisez `vaisseau.get_x()`. Ajustez manuellement la position verticale par rapport à votre vaisseau.
   2. Ajoutez ce laser à la liste `lasers` avec `append()`.
 - Dans la boucle de jeu, dessinez `draw()` tous les lasers de la liste grâce à une boucle `for`.

Vous devriez alors voir des lasers apparaître à l'endroit de votre vaisseau lorsque vous appuyez sur la touche {kbd}`Espace`. *Attention : Pour l'instant, rester appuyé sur espace créera un flux continu de lasers, c'est normal.*
```
```{tab-item}   4
:sync: etape4
Les lasers doivent maintenant se déplacer vers le haut.
 - Dans la boucle de jeu, parcourez la liste des lasers avec un `for`.
 - Déplacez chaque laser vers le haut (vitesse verticale négative, ex: `move(0, -7)`).
 - Pour éviter de ralentir l'ordinateur, si un laser sort par le haut de l'écran (y < -50), supprimez-le de la liste avec `remove()`. Vous pouvez récupérer la position verticale d'un laser avec `laser.get_y()`.
```
```{tab-item}   5
:sync: etape5
Nous allons maintenant faire apparaître et tomber des astéroïdes régulièrement.
 - Avant la boucle de jeu, créez une liste vide `asteroides = []`.
 - Créez également un `timer_asteroides = Timer(1)` et démarrez-le immédiatement avec `timer_asteroides.start()`.
 - Dans la boucle de jeu, vérifiez si le timer est terminé (`if timer_asteroides.is_finished():`).
 - Si c'est le cas :
   1. Créez un nouvel acteur `asteroide.png` en dessus de l'écran (y=-50).
   2. Ajoutez cet acteur à la liste `asteroides`.
   3. Redémarrez le timer.
 - Enfin, en vous inspirant grandement de ce que vous avez fait pour les lasers, utilisez une boucle `for` dans la boucle de jeu de sorte à dessiner les astéroïdes et à les faire bouger vers le bas.
Vous devriez voir une succession d'astéroïdes tomber du haut de l'écran les uns sous les autres.
```
```{tab-item}   6
:sync: etape6
Pour l'instant les astéroïdes apparaissent tous à la même position horizontaale. Nous allons remédier à cela.

Modifiez la création d'astéroïde de l'étape précédente. Plutôt que de donner une position horizontale fixe lors de la création de l'acteur, utilisez `randint(20, 580)`. Cette fonction permet de tirer un nombre entier aléatoire entre les deux bornes données en paramètre.

Vous devriez maintenant voir une pluie d'astéroïdes tomber du haut de l'écran.
```

```{tab-item}   7
:sync: etape7
Nous allons nous lancer dans une étape assez complexe : gérer la collision entre un laser et un astéroïde. Il faut vérifier **chaque** laser contre **chaque** astéroïde.
 - Dans la boucle de jeu, créez une boucle `for` pour parcourir chaque laser.
 - À l'intérieur de celle-ci, créez une **deuxième** boucle `for` pour parcourir les astéroïdes.
 - Vérifiez la collision : `if laser.collide(asteroide):`. S'il y a bien une collision alors :
    1. Supprimez l'astéroïde de sa liste.
    2. Supprimez le laser de sa liste.
```
```{tab-item}   8
:sync: etap8
Pour éviter que le joueur puisse continuellement tirer des lasers, nous allons maintenant revenir sur leur tir afin de le limiter.
 - Avant la boucle de jeu, créez un nouveau `timer_tir` avec une durée de 0.5 secondes. Démarrez immédiatement ce timer.
 - Modifiez la condition d'apparition d'un nouveau laser. On ne peut tirer que si la touche `"SPACE"` est pressée **ET** que le `timer_tir` est fini.
 - Dans cette condition, redémarrez le `timer_tir`.

 Votre vaisseau ne devrait maintenant plus tirer qu'un seul laser toutes les 0.5 secondes. Vous êtes évidemment libre d'adapter ce temps à votre convenance.
```
```{tab-item}   9
:sync: etape9
Nous allons maintenant gérer la fin du jeu. Celle-ci doit avoir lieu quand un astéroïde entre en collision avec le vaisseau ou lorsqu'un astéroïde n'a pas été détruit et continue sa route vers la terre.
- Avant la boucle de jeu, créez une variable `gameover = False`.
- Parcourez la liste des astéroïdes avec la boucle `for`
  - Si un astéroïde est un collision avec le vaisseau **OU** si la position verticale (rappelez-vous de `get_y()`) d'un astéroïde est supérieure à 650, alors gameover devient `True`.
- Modifiez votre code de sorte que tous les mouvements (vaisseau, lasers, astéroïdes) ainsi que toutes les apparitions (lasers et astéroïdes) ne se produisent plus que si gameover est `False`.

En testant votre jeu, celui-ci devrait alors complètement se figer lorsqu'une des conditions de gameover est respectée.
```

```{tab-item}  10
:sync: etape10
Lorsque gameover est `True`, nous allons indiquer écrire le texte "GAMEOVER" à l'écran. Pour cela :

 - Avant la boucle `while True`, créez un nouveau `Text` comme ceci : `txt_gameover = Text("GAMEOVER", 300, 50, True, (0,0,0), (255, 255, 255))`
 - Si gameover est `True`, dessinez `draw()` le `txt_gameover`.
 - Modifiez les couleurs et les position du texte à votre convenance.
````


```{exec} python main
:then: pygame_end
:editor: 351561ff-39c1-4c28-834b-01556c44a642
async def main():
  while True:
    await refresh((14, 0, 38))
```



## Partie 2 : fonctionnalités intermédiaires

Les fonctionnalités de la partie 2 valent au maximum 10 pts. Vous pouvez donc choisir des éléments de la liste suivante à implémenter et s'additionnant à 10 pts.

 - (2 pts) Ajoutez un score au jeu s'affichant avec le gameover. Par exemple, chaque astéroïde détruit augmente le score de 1, et, lors du gameover, le texte `Score : x` où x est remplacé par le véritable score est affiché.
 - (2 pts) Accélérez graduellement la vitesse des astéroïdes. Actuellement, les astéroïdes se déplacent toujours à la même vitesse. A chaque fois que l'on détruit un astéroïde, leur vitesse pourrait augmenter afin de rendre le jeu progressivement plus difficile.
 - (2 pts) Accélérez la vitesse d'apparition des astéroïdes. Pour le moment, les astéroïdes apparaissent à un intervalle régulier. Afin d'augmenter progressivement la difficulté du jeu, réduisez petit à petit l'écart d'apparition entre chaque astéroïde (par exemple à chaque fois que le vaisseau en détruit un)
 - (4 pts) Ajoutez un système de vies. Le vaisseau commence avec 3 vies affichées à l'écran. Toucher un astéroïde ou en laisser passer un fait perdre une vie au lieu du gameover immédiat. Le gameover n'arrive que lorsque toutes les vies sont perdues. +1 pt si vous utilisez des images de coeur (`heart.png`).
 - (3 pts) Ajoutez des bonus qui tombent du ciel comme les astéroïdes. Lorsque le vaisseau ramasse l'un de ces bonus, il obtient un bonus de points (fonctionnalité à combiner avec l'affichage du score).
 - (1 pt) Ajoutez l'image `galaxy_background.jpg` comme image de fond.

 ## Partie 3 : fonctionnalités avancées
 - (4 pts) Ajoutez des bonus qui tombent du ciel comme les astéroïdes. Lorsqu'il le ramasse, le vaisseau obtient un pouvoir supplémentaire (tirs plus fréquents, vitesse augmentée, ...). +1 pt si le bonus obtenu est temporaire.
 - (2 pts) Afin que le jeu ne commence pas immédiatement lorsqu'on lance le programme, définissez une touche sur laquelle on doit appuyer afin que le jeu démarre.
 - (3 pts) Ajoutez une fonctionnalité permettant de redémarrer le jeu une fois qu'on a perdu et qu'on appuie sur la touche `R`.