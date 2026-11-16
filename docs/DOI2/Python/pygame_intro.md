```{metadata}
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
      son.ogg:
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
:include: code/pygame_end.py
```

```{exec} python
:name: catch_fruit
:when:
:include: code/catch_fruit.py
:class: hidden
```

# Pygame - TP 1 : Découverte

```{image} images/pygame_logo.png
:width: 60%
:alt: Logo Pygame
:align: center
```

## Qu'est-ce que Pygame ?

Pygame est une librairie Python qui permet de créer facilement de petits jeux en 2D : afficher des personnages, les faire bouger avec le clavier ou la souris, détecter quand ils se touchent, afficher un score, jouer des sons, etc.

Dans ce TP, vous allez découvrir **pas à pas** tous les outils dont vous aurez besoin pour les TP suivants. À la fin, vous programmerez vous-même le petit jeu ci-dessous. Essayez-le : attrapez les oranges avec le panier grâce aux touches {kbd}`A` et {kbd}`D`.

```{exec} python
:after: catch_fruit
:then: pygame_end
# Exécutez cette cellule pour tester le jeu
```

```{admonition} Lancer et arrêter un programme
:class: note
 - Cliquez sur ▶ à droite du code (ou appuyez sur {kbd}`Maj+Entrée` dans l'éditeur) pour lancer le programme.
 - Le jeu s'affiche dans une fenêtre par-dessus la page. Il ne s'arrête jamais tout seul : fermez la fenêtre avec × (ou cliquez à côté) pour l'arrêter.
 - Toutes les fonctions utilisées dans ce TP sont décrites dans la [documentation du module](pygame_doc.md). Gardez-la ouverte dans un autre onglet !
```

## Étape {num1}`etapes-intro-pygame` : la boucle de jeu

Un jeu vidéo n'est qu'une succession d'images fixes, affichées très rapidement : ici, **60 images par seconde**. Un programme Pygame est donc toujours construit de la même façon :

 1. **Avant** la boucle de jeu, on prépare le jeu : on crée les personnages, les variables (score, vitesse, ...), etc.
 2. **Dans** la boucle de jeu `while True`, qui tourne sans s'arrêter, on fabrique une nouvelle image à chaque tour :
     - `refresh(couleur)` efface l'image précédente et la remplit avec une couleur de fond. Cette ligne doit toujours être **au début** de la boucle ;
     - ensuite, on fait évoluer le jeu (déplacements, collisions, score, ...) et on dessine les personnages.

Le programme ci-dessous affiche un écran jaune de 600x600 pixels : la couleur `(255, 255, 0)` est donnée au format RGB (rouge, vert, bleu), chaque valeur allant de 0 à 255.

```{exec} python
:then: pygame_end
:editor: b21b5606-40b3-48e0-bd9f-a7a3212d8c08
while True:
  refresh((255, 255, 0))
```

### Exercice {num1}`exo-intro-pygame`

Modifiez la couleur de fond. Si la notation RGB ne vous dit plus rien, utilisez [ce site](https://www.rapidtables.com/web/color/RGB_Color.html) pour trouver le code de la couleur de votre choix.

### Exercice {num1}`exo-intro-pygame`

Pour vérifier que la boucle tourne vraiment 60 fois par seconde, faisons varier la couleur du fond.

 1. Avant la boucle, créez une variable `bleu` qui vaut `0`.
 2. Dans la boucle, utilisez `refresh((0, 0, bleu))`, puis augmentez `bleu` de 1.
 3. Une couleur ne peut pas dépasser 255 : lorsque `bleu` vaut plus de 255, remettez-le à `0`.

Combien de temps faut-il pour passer du noir au bleu ? Est-ce cohérent avec 60 images par seconde ?

```{exec} python
:then: pygame_end
:editor: 1dcfbe1a-b394-48e2-901a-05b6906a8d1c
while True:
  refresh((0, 0, 0))
```

````{solution}
```{code-block} python
bleu = 0
while True:
  refresh((0, 0, bleu))
  bleu = bleu + 1
  if bleu > 255:
    bleu = 0
```
Il faut environ 4 secondes : 255 images ÷ 60 images par seconde ≈ 4,25 s.
````

## Étape {num1}`etapes-intro-pygame` : les acteurs

Chaque élément d'un jeu est un **acteur** (*Actor* en anglais) : le personnage principal, un ennemi, une pomme à ramasser, un mur, ... Un acteur a une image et une position. Pour créer Roger avec l'image `roger.png`, au milieu du haut de l'écran :

```{code-block} python
roger = Actor("roger.png", 300, 50)
```

```{image} images/roger.png
:width: 6%
:alt: Roger
:align: center
```

 - Un acteur se crée **avant** la boucle de jeu (sinon, un nouveau Roger serait créé 60 fois par seconde !).
 - Dans la boucle, après le `refresh`, il faut le redessiner à chaque image avec `roger.draw()`.
 - Les coordonnées donnent la position du **centre** de l'image. Attention : l'axe vertical pointe **vers le bas**. Plus `y` est grand, plus l'acteur est bas.

```{image} images/axes.png
:width: 30%
:alt: Axes
:align: center
```

```{exec} python
:then: pygame_end
:editor: e7c9c6dc-f4fd-4bf3-854a-7af5b3353b71
roger = Actor("roger.png", 300, 50)

while True:
  refresh((197, 255, 143))
  roger.draw()
```

### Exercice {num1}`exo-intro-pygame`

L'image de Roger fait 57 pixels de large et 75 pixels de haut. Modifiez le programme ci-dessus pour placer Roger, entièrement visible :
 1. dans le coin en haut à gauche ;
 2. dans le coin en bas à droite ;
 3. au centre de l'écran.

````{solution}
 1. `roger = Actor("roger.png", 29, 38)` : la moitié de sa largeur et de sa hauteur.
 2. `roger = Actor("roger.png", 571, 562)` : 600 - 29 et 600 - 38.
 3. `roger = Actor("roger.png", 300, 300)`
````

### Exercice {num1}`exo-intro-pygame`

 1. Créez un deuxième acteur `orange` avec l'image `orange.png`, juste à droite de Roger.
 2. L'orange est presque aussi grande que Roger. Réduisez-la de moitié avec `orange.scale(0.5)`, juste après l'avoir créée (`scale(2)` la rendrait 2 fois plus grande).
 3. Placez l'orange **sur** Roger (mêmes coordonnées). Lequel des deux est visible ? Inversez l'ordre des deux `draw()` : que se passe-t-il ?

````{solution}
```{code-block} python
roger = Actor("roger.png", 300, 300)
orange = Actor("orange.png", 360, 300)
orange.scale(0.5)

while True:
  refresh((197, 255, 143))
  roger.draw()
  orange.draw()
```
Les acteurs sont dessinés les uns après les autres : celui qui est dessiné **en dernier** apparaît par-dessus les autres.
````

## Étape {num1}`etapes-intro-pygame` : faire bouger les acteurs

`roger.move(dx, dy)` déplace Roger de `dx` pixels horizontalement et de `dy` pixels verticalement. Placé dans la boucle de jeu, ce déplacement est répété à chaque image : `roger.move(2, 0)` déplace donc Roger de 2 x 60 = 120 pixels par seconde vers la droite.

Il est pratique de ranger la vitesse dans une variable, comme dans le programme ci-dessous.

```{exec} python
:then: pygame_end
:editor: 47ae34c1-56ff-4154-bb98-1ff2bb2bbdfd
roger = Actor("roger.png", 300, 300)
vitesse = 2

while True:
  refresh((197, 255, 143))
  roger.move(vitesse, 0)
  roger.draw()
```

Pour savoir où se trouve un acteur, vous disposez des méthodes suivantes. Elles sont indispensables pour savoir si un acteur sort de l'écran.

| Méthode | Résultat |
|---|---|
| `roger.get_x()`, `roger.get_y()` | position du centre |
| `roger.get_left()`, `roger.get_right()` | position du bord gauche, du bord droit |
| `roger.get_top()`, `roger.get_bottom()` | position du bord haut, du bord bas |
| `roger.set_position(x, y)` | place le centre de Roger en `(x, y)` |

### Exercice {num1}`exo-intro-pygame`

Dans le programme ci-dessus, Roger finit par sortir de l'écran. Faites-le réapparaître à gauche de l'écran dès qu'il a complètement disparu à droite (son bord gauche dépasse 600). Gardez sa position verticale avec `roger.get_y()`.

````{solution}
```{code-block} python
roger = Actor("roger.png", 300, 300)
vitesse = 2

while True:
  refresh((197, 255, 143))
  roger.move(vitesse, 0)
  if roger.get_left() > 600:
    roger.set_position(-30, roger.get_y())
  roger.draw()
```
````

### Exercice {num1}`exo-intro-pygame`

Cette fois, Roger doit faire demi-tour lorsqu'il touche le bord droit ou le bord gauche de l'écran, comme une balle qui rebondit.
 1. Lorsque le bord droit de Roger dépasse 600 **ou** que son bord gauche est inférieur à 0, inversez sa vitesse : `vitesse = -vitesse`.
 2. Roger marche à reculons quand il va vers la gauche. `roger.set_flip(True)` affiche son image en miroir et `roger.set_flip(False)` l'affiche normalement. Utilisez-les pour qu'il regarde toujours dans la direction où il marche.

````{solution}
```{code-block} python
roger = Actor("roger.png", 300, 300)
vitesse = 2

while True:
  refresh((197, 255, 143))
  roger.move(vitesse, 0)
  if roger.get_right() > 600 or roger.get_left() < 0:
    vitesse = -vitesse
  if vitesse < 0:
    roger.set_flip(True)
  else:
    roger.set_flip(False)
  roger.draw()
```
````

## Étape {num1}`etapes-intro-pygame` : le clavier

`get_pressed_keys()` donne la **liste** des touches enfoncées au moment de l'image. Si le joueur maintient {kbd}`D` et {kbd}`Espace`, elle vaut `["D", "SPACE"]`. Avec `if ... in ...`, on teste facilement si une touche est enfoncée. Les noms des touches (`"UP"`, `"ENTER"`, ...) sont donnés dans la [documentation](pygame_doc.md).

```{exec} python
:then: pygame_end
:editor: 7e7a514a-f4f2-4db8-a793-7022d0130e8f
roger = Actor("roger.png", 300, 300)

while True:
  refresh((197, 255, 143))

  touches = get_pressed_keys()
  if "D" in touches:
    roger.move(3, 0)

  roger.draw()
```

### Exercice {num1}`exo-intro-pygame`

 1. Complétez le programme pour que Roger se déplace dans les 4 directions avec {kbd}`W`, {kbd}`A`, {kbd}`S` et {kbd}`D`, et qu'il regarde dans la direction où il marche.
 2. Utilisez des `if` et non des `elif` : que permet de faire `if` / `if` / `if` / `if` que `if` / `elif` / `elif` / `elif` ne permet pas ?
 3. Roger ne doit pas pouvoir sortir de l'écran. Par exemple, il ne peut aller à gauche que si {kbd}`A` est enfoncée **et** que son bord gauche est plus grand que 0.

````{solution}
```{code-block} python
roger = Actor("roger.png", 300, 300)

while True:
  refresh((197, 255, 143))

  touches = get_pressed_keys()
  if "D" in touches and roger.get_right() < 600:
    roger.move(3, 0)
    roger.set_flip(False)
  if "A" in touches and roger.get_left() > 0:
    roger.move(-3, 0)
    roger.set_flip(True)
  if "S" in touches and roger.get_bottom() < 600:
    roger.move(0, 3)
  if "W" in touches and roger.get_top() > 0:
    roger.move(0, -3)

  roger.draw()
```
Avec des `if` séparés, plusieurs touches peuvent agir en même temps : {kbd}`W` + {kbd}`D` fait aller Roger en diagonale.
````

### Exercice {num1}`exo-intro-pygame`

Il existe une deuxième fonction : `get_new_keys()`. Elle ne donne que les touches qui **viennent d'être enfoncées**. Une touche maintenue n'y apparaît donc qu'une seule fois, au moment où on l'enfonce.

 1. Dans le programme ci-dessous, chaque pression sur {kbd}`Espace` doit faire grandir Roger de 10 %. La variable `taille` contient sa taille actuelle : augmentez-la de `0.1`, puis appliquez-la avec `roger.scale(taille)`.
 2. Testez d'abord avec `get_pressed_keys()`, puis avec `get_new_keys()`. Quelle est la différence ? Laquelle utiliseriez-vous pour faire sauter un personnage ? Pour le faire marcher ?

```{exec} python
:then: pygame_end
:editor: b16be177-7073-4864-81b4-d8a9d2186825
roger = Actor("roger.png", 300, 300)
taille = 1

while True:
  refresh((197, 255, 143))

  roger.draw()
```

````{solution}
```{code-block} python
roger = Actor("roger.png", 300, 300)
taille = 1

while True:
  refresh((197, 255, 143))

  nouvelles_touches = get_new_keys()
  if "SPACE" in nouvelles_touches:
    taille = taille + 0.1
    roger.scale(taille)

  roger.draw()
```
Avec `get_pressed_keys()`, Roger grandit 60 fois par seconde tant que la touche est maintenue. Avec `get_new_keys()`, il grandit une seule fois par pression. On utilise `get_new_keys()` pour une action ponctuelle (sauter, tirer une fois) et `get_pressed_keys()` pour une action continue (marcher).
````

## Étape {num1}`etapes-intro-pygame` : la souris

`get_mouse_x()` et `get_mouse_y()` donnent la position de la souris dans le jeu. Les clics apparaissent dans les listes de touches : `"MOUSE_1"` pour le clic gauche, `"MOUSE_3"` pour le clic droit. Dans le programme ci-dessous, le panier suit la souris horizontalement.

```{exec} python
:then: pygame_end
:editor: 95d94480-491d-48e8-8878-ca5fbf7d4855
panier = Actor("basket.png", 300, 550)

while True:
  refresh((111, 255, 255))
  panier.set_position(get_mouse_x(), 550)
  panier.draw()
```

### Exercice {num1}`exo-intro-pygame`

Ajoutez une orange (réduite de moitié) au programme ci-dessus. À chaque clic gauche, l'orange doit être placée à l'endroit où vous avez cliqué.

````{solution}
```{code-block} python
panier = Actor("basket.png", 300, 550)
orange = Actor("orange.png", 300, 100)
orange.scale(0.5)

while True:
  refresh((111, 255, 255))
  panier.set_position(get_mouse_x(), 550)

  if "MOUSE_1" in get_new_keys():
    orange.set_position(get_mouse_x(), get_mouse_y())

  panier.draw()
  orange.draw()
```
````

## Étape {num1}`etapes-intro-pygame` : les collisions et le hasard

`roger.collide(fraise)` vaut `True` si Roger et la fraise se touchent, et `False` sinon. C'est ainsi qu'on sait si un personnage ramasse un objet, se fait toucher par un ennemi, atteint l'arrivée, ...

Pour que le jeu ne soit pas toujours le même, `randint(a, b)` tire un nombre entier au hasard entre `a` et `b` (compris). Dans le programme ci-dessous, la fraise saute à une position au hasard dès que Roger la touche.

```{exec} python
:then: pygame_end
:editor: eaeb86b8-2420-42b0-a939-a237f9310994
roger = Actor("roger.png", 100, 100)
fraise = Actor("strawberry.png", 300, 300)
vitesse = 3

while True:
  refresh((197, 255, 143))

  touches = get_pressed_keys()
  if "D" in touches:
    roger.move(vitesse, 0)
  if "A" in touches:
    roger.move(-vitesse, 0)
  if "S" in touches:
    roger.move(0, vitesse)
  if "W" in touches:
    roger.move(0, -vitesse)

  if roger.collide(fraise):
    fraise.set_position(randint(30, 570), randint(30, 570))

  roger.draw()
  fraise.draw()
```

### Exercice {num1}`exo-intro-pygame`

 1. Chaque fraise ramassée rend Roger un peu plus rapide : augmentez `vitesse` de 1.
 2. Ajoutez une banane à une position au hasard. Si Roger glisse dessus, il est éliminé avec `roger.kill()`. Un acteur *killed* n'est plus dessiné et ne touche plus rien.
 3. Une fois Roger éliminé, la fraise ne doit plus bouger. `roger.is_killed()` vaut `True` si Roger a été éliminé.

````{solution}
```{code-block} python
roger = Actor("roger.png", 100, 100)
fraise = Actor("strawberry.png", 300, 300)
banane = Actor("banana.png", randint(30, 570), randint(30, 570))
vitesse = 3

while True:
  refresh((197, 255, 143))

  touches = get_pressed_keys()
  if "D" in touches:
    roger.move(vitesse, 0)
  if "A" in touches:
    roger.move(-vitesse, 0)
  if "S" in touches:
    roger.move(0, vitesse)
  if "W" in touches:
    roger.move(0, -vitesse)

  if roger.collide(fraise):
    fraise.set_position(randint(30, 570), randint(30, 570))
    vitesse = vitesse + 1
  if roger.collide(banane):
    roger.kill()

  roger.draw()
  fraise.draw()
  banane.draw()
```
Comme Roger *killed* ne touche plus rien, la fraise ne bouge plus d'elle-même : `roger.collide(fraise)` vaut toujours `False`. On aurait aussi pu écrire `if roger.collide(fraise) and roger.is_killed() == False:`.
````

## Étape {num1}`etapes-intro-pygame` : afficher du texte

Un texte se crée comme un acteur, avant la boucle, puis se dessine avec `draw()` :

```{code-block} python
txt_score = Text("Score : 0", 80, 30, (0, 0, 0), (255, 255, 255))
```

Les paramètres sont : le texte, sa position (centre), la couleur du texte, puis la couleur du fond (facultative) et la taille (facultative, 36 par défaut). Pour changer le texte, on utilise `set_text()`. Avec une *f-string*, il est facile d'y glisser la valeur d'une variable : `txt_score.set_text(f"Score : {score}")`.

```{exec} python
:then: pygame_end
:editor: e92c65fd-d691-4645-b57f-fe2d34c675cd
roger = Actor("roger.png", 100, 100)
fraise = Actor("strawberry.png", 300, 300)
score = 0
txt_score = Text("Score : 0", 80, 30, (0, 0, 0), (255, 255, 255))

while True:
  refresh((197, 255, 143))

  touches = get_pressed_keys()
  if "D" in touches:
    roger.move(3, 0)
  if "A" in touches:
    roger.move(-3, 0)
  if "S" in touches:
    roger.move(0, 3)
  if "W" in touches:
    roger.move(0, -3)

  if roger.collide(fraise):
    fraise.set_position(randint(30, 570), randint(30, 570))
    score = score + 1
    txt_score.set_text(f"Score : {score}")

  roger.draw()
  fraise.draw()
  txt_score.draw()
```

### Exercice {num1}`exo-intro-pygame`

Créez un texte `Gagné !` vert, en grand (taille 80) au centre de l'écran. Il ne doit s'afficher que lorsque Roger a ramassé au moins 5 fraises.

````{solution}
À ajouter avant la boucle :
```{code-block} python
txt_gagne = Text("Gagné !", 300, 300, (0, 150, 0), None, 80)
```
Et à la fin de la boucle :
```{code-block} python
  if score >= 5:
    txt_gagne.draw()
```
`None` signifie « pas de couleur de fond ».
````

## Étape {num1}`etapes-intro-pygame` : le temps

Un `Timer` est un chronomètre qui compte à rebours :

| Instruction | Effet |
|---|---|
| `chrono = Timer(10)` | crée un chronomètre de 10 secondes (avant la boucle) |
| `chrono.start()` | démarre (ou redémarre) le chronomètre |
| `chrono.is_finished()` | vaut `True` lorsque le temps est écoulé |
| `chrono.get_time_left()` | donne le temps restant, en secondes |

Un timer sert à deux choses :
 - **limiter la durée** d'une partie : on le démarre une fois, et on teste s'il est fini ;
 - **répéter une action** régulièrement : à chaque fois qu'il est fini, on fait l'action et on le redémarre.

Le programme ci-dessous affiche un compte à rebours de 10 secondes (`f"{chrono}"` donne le temps restant, par exemple `7.42s`).

```{exec} python
:then: pygame_end
:editor: 6931cb93-d054-40d4-9270-92910e428a7b
chrono = Timer(10)
chrono.start()
txt_temps = Text("", 300, 30, (0, 0, 0))

while True:
  refresh((197, 255, 143))

  txt_temps.set_text(f"Temps : {chrono}")
  txt_temps.draw()
```

### Exercice {num1}`exo-intro-pygame`

Reprenez le programme de l'étape précédente (Roger et le score) et transformez-le en une course contre la montre :
 1. Affichez le temps restant d'un chrono de 20 secondes en haut à droite.
 2. Lorsque le temps est écoulé, Roger ne peut plus bouger et le texte `Temps écoulé !` s'affiche au centre de l'écran.
 3. Pour corser le jeu, la fraise change de place toute seule toutes les 2 secondes : utilisez un deuxième timer, que vous redémarrez à chaque fois qu'il est fini.

````{solution}
```{code-block} python
roger = Actor("roger.png", 100, 100)
fraise = Actor("strawberry.png", 300, 300)
score = 0
txt_score = Text("Score : 0", 80, 30, (0, 0, 0), (255, 255, 255))

chrono = Timer(20)
chrono.start()
txt_temps = Text("", 500, 30, (0, 0, 0))
txt_fin = Text("Temps écoulé !", 300, 300, (200, 0, 0), (255, 255, 255), 60)

timer_fraise = Timer(2)
timer_fraise.start()

while True:
  refresh((197, 255, 143))

  if chrono.is_finished() == False:
    touches = get_pressed_keys()
    if "D" in touches:
      roger.move(3, 0)
    if "A" in touches:
      roger.move(-3, 0)
    if "S" in touches:
      roger.move(0, 3)
    if "W" in touches:
      roger.move(0, -3)

    if roger.collide(fraise):
      fraise.set_position(randint(30, 570), randint(30, 570))
      score = score + 1
      txt_score.set_text(f"Score : {score}")

    if timer_fraise.is_finished():
      fraise.set_position(randint(30, 570), randint(30, 570))
      timer_fraise.start()

  txt_temps.set_text(f"Temps : {chrono}")

  roger.draw()
  fraise.draw()
  txt_score.draw()
  txt_temps.draw()
  if chrono.is_finished():
    txt_fin.draw()
```
````

## Étape {num1}`etapes-intro-pygame` : des listes d'acteurs

Dans un vrai jeu, il y a souvent beaucoup d'acteurs du même type : des ennemis, des pièces, des projectiles, ... On les range alors dans une **liste**, et on utilise une boucle `for` pour les faire bouger et les dessiner **tous**.

Le programme ci-dessous fait tomber une orange chaque seconde, à une position horizontale au hasard :
 - quand le timer est fini, on crée une nouvelle orange et on l'ajoute à la liste avec `append()` ;
 - une première boucle `for` déplace chaque orange vers le bas ;
 - une **deuxième** boucle `for` retire de la liste, avec `remove()`, les oranges sorties de l'écran. Elles ne servent plus à rien, et les garder ralentirait l'ordinateur.

*Pourquoi deux boucles ? Lorsqu'on retire un élément d'une liste pendant qu'on la parcourt avec `for`, Python saute l'élément suivant. Si on retirait les oranges dans la boucle qui les déplace, certaines oranges ne seraient pas déplacées à ce tour-là.*

```{exec} python
:then: pygame_end
:editor: 4a743f3a-0419-4f6a-9e3e-901432608d72
oranges = []
timer_oranges = Timer(1)
timer_oranges.start()

while True:
  refresh((111, 255, 255))

  if timer_oranges.is_finished():
    orange = Actor("orange.png", randint(40, 560), -50)
    orange.scale(0.5)
    oranges.append(orange)
    timer_oranges.start()

  for orange in oranges:
    orange.move(0, 3)
  for orange in oranges:
    if orange.get_top() > 600:
      oranges.remove(orange)

  for orange in oranges:
    orange.draw()
```

### Exercice {num1}`exo-intro-pygame`

 1. Ajoutez un panier en bas de l'écran, déplacé avec {kbd}`A` et {kbd}`D`.
 2. Lorsque le panier touche une orange, l'orange est éliminée avec `orange.kill()` et le score (affiché en haut à gauche) augmente de 1. Une orange *killed* n'est plus dessinée et ne touche plus rien. Elle sera retirée de la liste quand elle sortira de l'écran.

*Attention : ne retirez pas l'orange de la liste avec `remove()` dans la boucle qui teste les collisions, pour la raison expliquée ci-dessus. C'est justement pour cela qu'on utilise `kill()`.*

````{solution}
```{code-block} python
panier = Actor("basket.png", 300, 550)
oranges = []
timer_oranges = Timer(1)
timer_oranges.start()
score = 0
txt_score = Text("Score : 0", 80, 30, (0, 0, 0))

while True:
  refresh((111, 255, 255))

  touches = get_pressed_keys()
  if "D" in touches:
    panier.move(4, 0)
  if "A" in touches:
    panier.move(-4, 0)

  if timer_oranges.is_finished():
    orange = Actor("orange.png", randint(40, 560), -50)
    orange.scale(0.5)
    oranges.append(orange)
    timer_oranges.start()

  for orange in oranges:
    orange.move(0, 3)
    if orange.collide(panier):
      orange.kill()
      score = score + 1
      txt_score.set_text(f"Score : {score}")
  for orange in oranges:
    if orange.get_top() > 600:
      oranges.remove(orange)

  panier.draw()
  for orange in oranges:
    orange.draw()
  txt_score.draw()
```
````

## Étape {num1}`etapes-intro-pygame` : les sons

Un son se charge avant la boucle, puis se joue avec `play()` au moment voulu. `play(-1)` le répète en boucle, ce qui est pratique pour une musique de fond.

```{code-block} python
son_point = Sound("son.ogg")      # un bruitage court
musique = Sound("yoshi.ogg")      # une musique
musique.play(-1)                  # la musique tourne en boucle
```

Les sons disponibles dans chaque TP sont indiqués dans ses consignes. *Pensez à monter le son de votre ordinateur, ou à brancher des écouteurs !*

### Exercice {num1}`exo-intro-pygame`

Reprenez votre programme de l'exercice précédent : jouez `son.ogg` à chaque orange attrapée, et la musique `yoshi.ogg` en boucle pendant toute la partie.

````{solution}
À ajouter avant la boucle :
```{code-block} python
son_point = Sound("son.ogg")
musique = Sound("yoshi.ogg")
musique.play(-1)
```
Et dans le `if orange.collide(panier):` :
```{code-block} python
      son_point.play()
```
````

## Mini-projet : attrape les oranges

Vous connaissez maintenant tous les outils nécessaires pour programmer le jeu présenté au début de ce TP. À vous de jouer ! Partez de votre programme de l'étape précédente et ajoutez une fin de partie :

 1. Créez une variable `gameover = False` avant la boucle de jeu.
 2. Si une orange qui n'a pas été attrapée (`orange.is_killed() == False`) touche le bas de l'écran, `gameover` devient `True`.
 3. Lorsque `gameover` vaut `True`, plus rien ne bouge et plus aucune orange n'apparaît : placez les déplacements, les apparitions et les collisions dans un `if gameover == False:`.
 4. Affichez au centre de l'écran le texte `Game over` suivi du score, par exemple `Game over. Score : 12`.
 5. Le panier ne doit pas pouvoir sortir de l'écran.

Idées pour aller plus loin :
 - les oranges tombent de plus en plus vite ;
 - de temps en temps, une banane tombe : il ne faut surtout pas l'attraper ;
 - le joueur a 3 vies, affichées en haut à droite.

```{exec} python
:then: pygame_end
:editor: 73cf25f6-2369-41d3-826e-39d6c50a7818
while True:
  refresh((111, 255, 255))
```

````{solution}
```{code-block} python
panier = Actor("basket.png", 300, 550)
oranges = []
timer_oranges = Timer(1)
timer_oranges.start()
score = 0
txt_score = Text("Score : 0", 80, 30, (0, 0, 0))
gameover = False
txt_gameover = Text("Game over", 300, 300, (0, 0, 0), (255, 90, 20), 60)
son_point = Sound("son.ogg")

while True:
  refresh((111, 255, 255))

  if gameover == False:
    touches = get_pressed_keys()
    if "D" in touches and panier.get_right() < 600:
      panier.move(4, 0)
    if "A" in touches and panier.get_left() > 0:
      panier.move(-4, 0)

    if timer_oranges.is_finished():
      orange = Actor("orange.png", randint(40, 560), -50)
      orange.scale(0.5)
      oranges.append(orange)
      timer_oranges.start()

    for orange in oranges:
      orange.move(0, 3)
      if orange.collide(panier):
        orange.kill()
        score = score + 1
        txt_score.set_text(f"Score : {score}")
        son_point.play()
      if orange.get_bottom() > 600 and orange.is_killed() == False:
        gameover = True
        txt_gameover.set_text(f"Game over. Score : {score}")
    for orange in oranges:
      if orange.get_top() > 600:
        oranges.remove(orange)

  panier.draw()
  for orange in oranges:
    orange.draw()
  txt_score.draw()
  if gameover:
    txt_gameover.draw()
```
````
