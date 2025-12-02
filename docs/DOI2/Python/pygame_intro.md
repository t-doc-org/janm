```{metadata}
exec:
  python:
    packages: [numpy, pygame-ce]
    files:
      orange.png:
      basket.png:
      roger.png:
      banana.png:
      strawberry.png:
      dirt.png:

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
:include: code/pygame_start.py
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


```{exec} python
:name: catch_fruit
:when: never
:include: code/catch_fruit.py
:class: hidden

```

# Pygame - Introduction

```{image} images/pygame_logo.png
:width: 75%
:alt: Logo Pygame
:align: center
```
## Qu'est-ce que Pygame ?

Pygame est une librairie Python permettant de facilement de facilement créer de petits jeux en 2D. Avec celle-ci, vous pourrez facilement créer une fenêtre de jeu, ajouter des personnages, les faire se déplacer, gérer leurs collisions, afficher du texte, etc. Pour vous donner une idée de ce à quoi peut ressembler un jeu Pygame, vous pouvez exécuter le programme ci-dessous ci-dessous. Vous le reproduirez durant le 1er TP. Le but est d'attraper les oranges avec le panier en le déplaçant à l'aide des touches {kbd}`A` et {kbd}`D`.

```{exec} python main
:after: catch_fruit
:then: pygame_end
#Exécutez cette cellule pour tester le jeu du TP1
```

Pour débuter avec Pygame, vous allez commencer par réaliser des exercices pratiques qui introduiront pas à pas les concepts qui vous permettront de réaliser un jeu complet.

## Etape  {num1}`etapes-intro-pygame` : la boucle de jeu
Comme décrit en cours, tout jeu vidéo n'est qu'une succession d'images fixes dépendant des entrées de l'utilisateur. Afin de pouvoir afficher des images en boucle, une boucle `while` infinie est nécessaire. De plus la fonction `refresh` permet de créer une nouvelle image avec un fond de la couleur RGB passée en paramètre (ici la couleur `(255, 255, 0)` correspond à du jaune).



```{exec} python main
:then: pygame_end
:editor: 5b09530d-d320-4550-9619-8fa5e2bd87f7
async def main():
  while True:
    await refresh((255, 255, 0))
```

### Exercice {num1}`exo-intro-pygame`
Modifiez la couleur de l'image ci-dessus. Si la notation RGB des couleurs n'est plus claire depuis la 1ère année, consultez [ce site](https://www.rapidtables.com/web/color/RGB_Color.html) pour trouvez le code correspondant à la couleur de votre choix.

## Etape {num1}`etapes-intro-pygame` : les acteurs
Le jeu créé à l'étape précédente est bien entendu complétement vide. Nous allons lui rajouter des *acteurs*. Dans un jeu Pygame, chaque élénebt du jeu est un *acteur* (en anglais et en Python **Actor**).

 - Le personnage principal : un acteur
 - Une pomme que l'on peut ramasser : un acteur
 - Un mur que l'on peut détruire : un acteur
 - ...

Comme un acteur doit avoir un aspect visuel, il faut lui attribuer une image. En tant normal, il est possible de choisir n'importe quelle image. Toutefois, dans le cadre de ce site, seuls quelques images choisis au préalable sont utilisables. Pour cette étape, nous utiliserons un petit personnage du nom de Roger avec son image `roger.png`.

```{image} images/roger.png
:width: 8%
:alt: Roger
:align: center
```

Pour ajouter Roger à un jeu Pygame en tant qu'acteur, faut non seulement préciser son image, mais également ses coordonnées de départ avec la notation suivante :

```{code-block} python
nouvelle_variable = Actor("image.png", coord_x, coord_y)
```

Par exemple, pour créer Roger au milieu du haut de l'écran, on pourrait écrire :

```{code-block} python
roger = Actor("roger.png", 300, 50)
```

Un acteur doit être créé **avant la boucle de jeu**. Cependant, il ne faut pas oublier après chaque *refresh* de redessiner chaque acteur sur l'écran grâce à la méthode `draw`. Ainsi, le code ci-dessous permet de créer Roger et de l'afficher à l'écran.

```{exec} python main
:then: pygame_end
:editor: a6e28294-fad5-4523-86dc-660cb3dc334f
async def main():
  roger = Actor("roger.png", 300, 50)
  while True:
    await refresh((197, 255, 143))
    roger.draw()

```

### Exercice {num1}`exo-intro-pygame`
Modifiez le code ci-dessus afin de déplacer Roger à divers endroits de l'écran. 
1. Dans le coin en haut à gauche
2. Dans le coin en bas à droite
3. au milieu de l'écran

Pour cela, vous remarquerez que le système d'axe de Pygame (et de la grande majorité des applications informatiques) n'est pas exactement pareil que celui que vous utilisez couramment en mathématiques. Ici, l'axe vertical pointe vers le bas. Donc plus la coordonnée *y* est élevée, plus l'acteur sera bas.

```{image} images/axes.png
:width: 33%
:alt: Axes
:align: center
```

### Exercice {num1}`exo-intro-pygame`
1. Sur le site, une autre image `orange.png` est disponible. Créez un 2ème acteur avec cette image et placez l'orange à côté de Roger.
2. Cette orange est un peu grande par rapport à Roger. Réduisez sa taille de moitié grâce à la méthode `scale`. Par exemple, pour un acteur `bloc`, alors `bloc.scale(2)` permettrait d'obtenir un bloc 2x plus grand.


## Etape {num1}`etapes-intro-pygame` : les entrées utilisateur
Pour le moment, le jeu est complètement statique. Afin que les personnages puissent se déplacer, il faut, à chaque tour de boucle, contrôler quelles touches ont été pressées par le joueur. La **liste** des touches pressées peut être récupérée avec `touches_pressées = get_pressed_keys()`. Par exemple, si l'utilisateur a appuyé sur les touches {kbd}`S` et {kbd}`P` en même temps qu'un clic-gauche, alors la liste contiendra les valeurs `["S", "P", "MOUSE_0"]`.

Ainsi, avec la strucutre `if ... in ...` travaillée en cours, il est facile d'effectuer une action précise quand le joueur appuie sur une touche. Pour déplacer un acteur, il est possible d'utiliser la fonction `move`. Ses paremètres définissent le nombre de pixels sur l'axe horizontal et vertical dont l'acteur doit être déplacé.


Ainsi, le code ci-dessous permet de déplacer Roger vers la droite lorsqu'on appuie sur {kbd}`D`.
```{exec} python main
:then: pygame_end
:editor: cd37e935-680e-451a-9f22-2ca4595de57a
async def main():
  roger = Actor("roger.png", 300, 50)
  while True:
    await refresh((197, 255, 143))

    touches_pressées = get_pressed_keys()

    if "D" in touches_pressées:
      roger.move(2, 0)

    roger.draw()

```

### Exercice {num1}`exo-intro-pygame`
1. Que devriez-vous modifier dans le programme ci-dessous pour que Roger se déplace plus rapidement ? Testez votre hypothèse.
2. Complétez le programme ci-dessus pour que Roger puisse également se déplacer vers la gauche, le haut, et le bas, grâce aux touches {kbd}`A`, {kbd}`W` et {kbd}`S`. Pour cela, quelle est la différence entre utiliser des `if/elif/elif/elif` ou `if/if/if/if` ?

### Exercice {num1}`exo-intro-pygame`
Dans le programme ci-dessus, ajoutez à nouveau une orange à côté de Roger. Puis, ajoutez la ligne `orange.move(0, 1)` juste après le `refresh`. Que se passe-t-il ? Pourquoi ?


## Etape {num1}`etapes-intro-pygame` : les collisions
L'interaction la plus commune entre deux acteurs est la collision.
 - Lorsqu'on le drapeau d'arrivée à la fin d'un niveau, il y a une collision entre le joueur et le drapeau.
 - Lorsqu'un ennemi se fait toucher par une flèche, il y a une collision entre la flèche et l'ennemi.
 - Lorsqu'un serpent mange une pomme, il y a une collision entre la pomme et le serpent.
 - ...

Avec Pygame, il est possible de contrôler si deux acteurs sont en collision avec la méthode `collide`. Dans le programme ci-dessous, on contrôle à chaque tour de boucle de jeu si Roger est en collision avec une orange. Si tel est le cas, l'orange est détruite avec sa méthode `kill` et la vitesse de Roger est augmentée. Cela permet de simuler le fait que Roger ramasse l'orange qui lui octroie un bonus de rapidité.

```{exec} python main
:then: pygame_end
:editor: 99d5ff38-8e4c-46bd-a032-fffc1daf41be
async def main():
  orange = Actor("orange.png", 300, 50)
  orange.scale(0.75)
  roger = Actor("roger.png", 57, 50)
  vitesse = 3

  while True:
    await refresh((197, 255, 143))

    touches_pressées = get_pressed_keys()
    if "D" in touches_pressées:
      roger.move(vitesse, 0)
    if "A" in touches_pressées:
      roger.move(-vitesse, 0)
    if "S" in touches_pressées:
      roger.move(0, vitesse)
    if "W" in touches_pressées:
      roger.move(0, -vitesse)

    if roger.collide(orange):
      orange.kill()
      vitesse += 5

    roger.draw()
    orange.draw()

```

### Exercice {num1}`exo-intro-pygame`
Utilisez l'image `banana.png` et `strawberry.png` afin de faire apparaître une banane et une fraise dans le jeu. Faites en sorte que Roger puisse ramasser chacun de ces fruits avec les effets suivants :
- La fraise ralentit le joueur
- La banane est fatale au joueur. S'il glisse dessus, alors Roger disparait et est *killed*.


## Etape {num1}`etapes-intro-pygame` : afficher du texte
Avec Pygame, il est possible de facilement afficher du texte dans son jeu. Un texte est lui aussi un acteur, mais qui se définit différemment. Lisez attentivement l'exemple ci-dessous et testez-le.
```{exec} python main
:then: pygame_end
:editor: d2334d57-7a9a-4a40-ad39-bae5b37d0011
async def main():
  txt_welcome = Text("Bienvenue dans mon jeu !", 300, 50, True, (0,0,0), (255, 255, 255))

  while True:
    await refresh((197, 255, 143))

    txt_welcome.draw()

```

### Exercice {num1}`exo-intro-pygame`
1. Ajoutez un 2ème texte **rouge** avec un fond **jaune** en dessous du premier texte de bienvenue
2. Avec vos connaissances des entrées utilisateurs, faites en sorte que ce texte ne s'affiche maintenant plus que lorsqu'on appuie sur la barre espace (`SPACE`).

## Etape {num1}`etapes-intro-pygame` : de l'aléatoire
Afin que vos jeux ne soient pas trop prévisibles et restent intéressants, il faut leur ajouter une dose d'aléatoire :

 - Un ennemi qui apparaît à une position aléatoire
 - Des bonus qui apparaissent à un interval de temps aléatoire
 - Un choix d'objets aléatoire que l'on trouve dans un coffre
 - ...

Pour cela, on peut utiliser la fonction `randint` (*random integer*) qui permet de sélectionner un nombre entier aléatoire entre deux bornes. Lisez et exécutez **plusieurs fois** le programme ci-dessous pour tester et comprendre le fonctionnement de `randint`.

```{exec} python main
:then: pygame_end
:editor: 3348777c-8819-47d3-b7f2-74e43071aee6
async def main():

  pos_x = randint(50, 550)
  pos_y = randint(50, 550)

  roger = Actor("roger.png", pos_x, pos_y)
  banane = Actor("banana.png", 50, 50)
  while True:
    await refresh((197, 255, 143))
    roger.draw()
    banana.draw()
```

### Exercice {num1}`exo-intro-pygame`
Modifiez le programme ci-dessus de sorte que la banane reste en haut de l'écran, mais que sa position horizontale soit aléatoire.

### Exercice {num1}`exo-intro-pygame`
Dans le programme ci-dessous, à chaque fois que Roger entre en collision avec une fraise, celle-ci est déplacée à de nouvelles coordonnées aléatoires. 

```{exec} python main
:then: pygame_end
:editor: 43a555a3-9439-4251-86a6-8091015599e0
async def main():
  roger = Actor("roger.png", 100, 100)
  fraise = Actor("strawberry.png", 200, 100)
  while True:
    await refresh((197, 255, 143))
    roger.draw()
    fraise.draw()

    touches_pressées = get_pressed_keys()
    if "D" in touches_pressées:
      roger.move(5, 0)
    if "A" in touches_pressées:
      roger.move(-5, 0)
    if "S" in touches_pressées:
      roger.move(0, 5)
    if "W" in touches_pressées:
      roger.move(0, -5)

    if roger.collide(fraise):
      pos_x = randint(50, 550)
      pos_y = randint(50, 550)
      fraise.set_position(pos_x, pos_y)
```
1. Avant la boucle `while`, créez une nouvelle **liste vide** nommée `inventaire`, et un nouveau texte (voir étape précédente) contenant le message `Gagné !`.
2. A chaque fois que Roger entre en collision avec une fraise, ajoutez un élément `"fraise"` à l'inventaire.
3. Dès que la liste `inventaire` contient au moins 5 éléments, le texte `Gagné !` doit être affiché sur l'écran.



## Etape {num1}`etapes-intro-pygame` : des listes d'acteurs
Pour le moment, les exemples ne contiennent qu'un seul acteur de chaque type (1 personnage, 1 orange, 1 banane, ...). Cependant, dans un vrai jeu, chaque type d'acteurs peut apparaître de nombreuses fois. Dans ce cas, les acteurs sont stockés dans une liste.

- Une horde d'ennemis qui vous attaque : une liste d'acteurs `ennemis`
- Les 10 pièces d'or à ramasser dans un niveau : une liste de 10 acteurs `pièces_d_or`
- ...

Lisez attentivement le programme ci-dessous avant de l'exécuter. Celui-ci permet de définir une liste de fruits à afficher à l'écran. Grâce à la boucle `for ... in ...`, la fonction `draw` est appelée **pour chaque** fruit de la liste.

```{exec} python main
:then: pygame_end
:editor: 0eb2884f-e30e-406b-a648-489408abccbb
async def main():
  
  fruits = [Actor("strawberry.png", 200, 100), Actor("strawberry.png", 250, 200), Actor("banana.png", 400, 300), Actor("banana.png", 50, 300), Actor("strawberry.png", 50, 400), Actor("orange.png", 300, 500)]

  while True:
    await refresh((197, 255, 143))

    for fruit in fruits:
        fruit.draw()
```

### Exercice {num1}`exo-intro-pygame`
1. Tous les fruits du programme ci-dessus sont trop gros. Grâce à une boucle `for ... in ...` placée **avant** la boucle de jeu, réduisez de moitié la taille de chaque fruit avec `scale`.
2. A nouveau grâce à la boucle `for ... in ...`, mais cette fois **dans** la boucle de jeu, faites automatiquement se déplacer chaque fruit vers la droite.


### Exercice {num1}`exo-intro-pygame`
Avec les listes et `randint`, il est possible de simuler l'apparition d'acteurs à une position aléatoire avec un interval de temps aléatoire. Vous devriez déjà avoir compris comment les positions aléatoires fonctionnent. En ce qui concerne l'interval de temps aléatoire, l'algorithme permettant de le simuler est le suivant :

```{code-block} text
Définir une liste d'acteurs
Dans la boucle de jeu
    Choisir un nombre aléatoire entre 1 et 100
    Si le nombre aléatoire est exactement 1
        Ajouter un nouvel acteur à la liste
    Dessiner la liste d'acteurs
```

1. Complétez le code ci-dessous de sorte qu'il corresponde à cet algorithme et fasse apparaitre des fraises à un interval aléatoire, et à une position aléatoire. Pour cela, il faudra ajouter un nouvel acteur avec l'image `strawberry.png` à la liste `fruits` lorsque la condition portant sur le nombre aléatoire sera respectée.

2. Que se passe-t-il si au lieu de tirer un nombre aléatoire entre 1 et 100, on le tire entre 1 et 20 ?

3. Ajoutez un nouveau `randint` de sorte qu'à l'ajout d'un nouveau fruit, il y ait 1 chance sur 2 qu'il s'agisse d'une banane ou d'une fraise.

```{exec} python main
:then: pygame_end
:editor: 4bd75f23-8302-467d-a2d8-b5923e32b971
async def main():
  fruits = []
  while True:
    await refresh((197, 255, 143))

    #Compléter le code ici

    for fruit in fruits:
        fruit.draw()
```

