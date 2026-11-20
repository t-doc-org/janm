```{metadata}
hide: [primary-sidebar, secondary-sidebar, prev-next, footer]
exec:
  python:
    files:
      viseur.png:
      blinky.png:
      inky.png:
      pinky.png:
      bomb.png:
      heart.png:
      gift_blue.png:
      gift_yellow.png:
      gift_red.png:
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

# Projet Chasse aux fantômes

[Documentation du module](../pygame_doc.md)

``````{tab-set}
:sync-group: etape
`````{tab-item} Présentation
:sync: presentation
Dans ce jeu de tir, des fantômes traversent l'écran et le joueur doit les toucher en visant avec la souris et en cliquant. La partie dure 30 secondes et le chargeur ne contient que 6 balles : il faudra viser juste !
`````
`````{tab-item} 1
:sync: etape1
Créez l'acteur `viseur` avec l'image `viseur.png`, à n'importe quelle position.
 - Dans la boucle de jeu, placez le viseur à la position de la souris : `viseur.set_position(get_mouse_x(), get_mouse_y())`
 - Dessinez le viseur.

Le viseur devrait maintenant suivre la souris lorsqu'elle survole le jeu.
`````
`````{tab-item} 2
:sync: etape2
Faisons apparaître un premier fantôme.
 - Avant la boucle de jeu, créez un acteur `fantome` avec l'image `blinky.png`, à la position `-30, 300`, c'est-à-dire juste à gauche de l'écran.
 - Dans la boucle de jeu, déplacez-le de 3 pixels vers la droite à chaque tour et dessinez-le. Le viseur doit être dessiné **en dernier**, afin d'être toujours visible par-dessus les fantômes.

Le fantôme devrait traverser l'écran de gauche à droite.
`````
`````{tab-item} 3
:sync: etape3
Un seul fantôme, c'est un peu trop facile. Nous allons en faire apparaître un nouveau chaque seconde, et les stocker dans une liste. Le fantôme de l'étape 2 n'est plus nécessaire : vous pouvez le supprimer.
 - Avant la boucle de jeu, créez une liste vide `fantomes_droite` (les fantômes qui vont vers la droite), ainsi qu'un `timer_apparition = Timer(1)` que vous démarrez immédiatement.
 - Dans la boucle de jeu, si le timer est terminé :
   1. Créez un nouvel acteur `blinky.png` à gauche de l'écran (`x = -30`), à une position verticale aléatoire : `randint(60, 560)`.
   2. Ajoutez-le à la liste `fantomes_droite`.
   3. Redémarrez le timer.
 - Avec une boucle `for`, déplacez chaque fantôme de la liste vers la droite et dessinez-le.
`````
`````{tab-item} 4
:sync: etape4
Des fantômes doivent aussi arriver par la droite.
 - Avant la boucle de jeu, créez une deuxième liste vide `fantomes_gauche`.
 - Lors de l'apparition d'un fantôme (étape 3), tirez un nombre aléatoire avec `randint(1, 2)` :
   - s'il vaut 1, créez un fantôme `blinky.png` à gauche, comme à l'étape 3 ;
   - sinon, créez un fantôme `inky.png` à droite de l'écran (`x = 630`) et ajoutez-le à `fantomes_gauche`. Utilisez `set_flip(True)` pour qu'il regarde vers la gauche.
 - Avec une deuxième boucle `for`, déplacez les fantômes de `fantomes_gauche` vers la gauche et dessinez-les.

Des fantômes devraient maintenant arriver des deux côtés.
`````
`````{tab-item} 5
:sync: etape5
Le joueur doit pouvoir tirer sur les fantômes.
 - Dans la boucle de jeu, récupérez les touches nouvellement pressées : `nouvelles_touches = get_new_keys()`. Avec `get_new_keys()`, un clic ne compte que pour un seul tir, même si le bouton reste enfoncé.
 - Si `"MOUSE_1"` est dans `nouvelles_touches`, parcourez les deux listes de fantômes. Si le viseur est en collision avec un fantôme, détruisez ce fantôme avec `kill()`.

Un fantôme *killed* n'est plus dessiné et ne peut plus être touché. Vous pouvez maintenant chasser les fantômes !
`````
`````{tab-item} 6
:sync: etape6
Ajoutons un score.
 - Avant la boucle de jeu, créez une variable `score = 0` et un texte `txt_score = Text("Score : 0", 80, 20, (255, 255, 255))`. Dessinez ce texte dans la boucle de jeu.
 - Chaque fantôme touché augmente le score de 1. Mettez alors à jour le texte avec `txt_score.set_text(f"Score : {score}")`.
`````
`````{tab-item} 7
:sync: etape7
Les fantômes qui sortent de l'écran continuent d'avancer indéfiniment, ce qui ralentit l'ordinateur. Retirons-les de leur liste.
 - Après les boucles qui déplacent les fantômes, ajoutez **deux nouvelles** boucles `for` :
   - pour chaque fantôme de `fantomes_droite`, si son bord gauche (`get_left()`) est supérieur à 600, retirez-le de la liste avec `remove()` ;
   - pour chaque fantôme de `fantomes_gauche`, si son bord droit (`get_right()`) est inférieur à 0, retirez-le de la liste.

*Pourquoi de nouvelles boucles ? Lorsqu'on retire un élément d'une liste pendant qu'on la parcourt, Python saute l'élément suivant. Si on retirait les fantômes dans la boucle qui les déplace, le fantôme suivant ne serait pas déplacé à ce tour-là.*
`````
`````{tab-item} 8
:sync: etape8
La partie dure 30 secondes.
 - Avant la boucle de jeu, créez un `chrono = Timer(30)` et démarrez-le immédiatement.
 - Créez aussi un texte `txt_chrono` en haut au centre de l'écran.
 - Dans la boucle de jeu, mettez à jour ce texte avec le temps restant : `txt_chrono.set_text(int(chrono.get_time_left()))`. La méthode `get_time_left()` donne le temps restant en secondes, et `int()` supprime les décimales.
`````
`````{tab-item} 9
:sync: etape9
Le chargeur ne contient que 6 balles.
 - Avant la boucle de jeu, créez une variable `balles = 6` et un texte `txt_balles` en haut à droite de l'écran.
 - On ne peut tirer que s'il reste des balles : modifiez la condition de l'étape 5 de sorte qu'il faille cliquer **et** que `balles` soit supérieur à 0.
 - Chaque tir (qu'il touche un fantôme ou non) enlève une balle. Mettez à jour le texte.
 - Appuyer sur {kbd}`Espace` (`"SPACE"` dans `nouvelles_touches`) recharge le chargeur : `balles` revient à 6.
`````
`````{tab-item} 10
:sync: etape10
Gérons la fin de la partie.
 - Avant la boucle de jeu, créez une variable `gameover = False` et un texte `txt_fin` au centre de l'écran.
 - Lorsque le chrono est terminé (`is_finished()`), `gameover` devient `True` et le texte affiche le score final, par exemple `Fin ! Score : 12`.
 - Modifiez votre code de sorte que les apparitions, les mouvements des fantômes et les tirs n'aient plus lieu lorsque `gameover` vaut `True`. Dessinez `txt_fin` lorsque la partie est terminée.
`````
`````{tab-item} Partie 2
:sync: partie2
**Partie 2 : fonctionnalités intermédiaires**

Les fonctionnalités de la partie 2 valent au maximum 10 pts. Vous pouvez donc choisir des éléments de la liste suivante à implémenter et s'additionnant à 10 pts.

 - (2 pts) Ajoutez des sons : un tir, un fantôme touché et un chargeur vide.
 - (2 pts) Augmentez progressivement la difficulté : les fantômes apparaissent de plus en plus souvent, ou vont de plus en plus vite.
 - (2 pts) Les fantômes ne vont plus tout droit : ils montent ou descendent légèrement de manière aléatoire à chaque tour (`randint(-2, 2)`).
 - (2 pts) Des bombes (`bomb.png`, à réduire fortement avec `scale()`) traversent aussi l'écran. Tirer sur une bombe fait perdre 5 points.
 - (3 pts) Un fantôme rose (`pinky.png`, à agrandir avec `scale()`) apparaît plus rarement. Il est plus rapide et rapporte 3 points.
 - (4 pts) Ajoutez un système de vies : le joueur commence avec 3 vies, et chaque fantôme qui traverse l'écran sans être touché lui fait perdre une vie. La partie se termine lorsque le temps est écoulé ou que toutes les vies sont perdues. +1 pt si vous utilisez des images de coeur (`heart.png`).
`````
`````{tab-item} Partie 3
:sync: partie3
**Partie 3 : fonctionnalités avancées**

 - (2 pts) Afin que le jeu ne commence pas immédiatement lorsqu'on lance le programme, définissez une touche sur laquelle on doit appuyer afin que le jeu démarre.
 - (3 pts) Ajoutez une fonctionnalité permettant de redémarrer le jeu une fois la partie terminée en appuyant sur la touche `R`.
 - (3 pts) Le meilleur score de la session (record) est affiché à la fin de chaque partie.
 - (3 pts) Des cadeaux (`gift_blue.png`, ...) traversent l'écran. Tirer dessus ajoute 5 secondes au chrono. Indice : un `Timer` ne peut pas être prolongé, mais vous pouvez en créer un nouveau avec `Timer(chrono.get_time_left() + 5)`.
 - (4 pts) Combo : à partir de 3 fantômes touchés d'affilée sans rater de tir, chaque fantôme rapporte le double de points.
 - (5 pts) Un fantôme « boss », plus grand et plus lent, apparaît de temps en temps. Il faut le toucher 3 fois pour le détruire, et il rapporte 10 points.
`````
``````

```{exec} python
:then: pygame_end
:editor: 19acc670-9503-41b6-952b-d4ad387b1b43
while True:
  refresh((20, 10, 40))
```

````{solution} Solution (étapes 1 à 10)
```{code-block} python
# Étape 1 : le viseur
viseur = Actor("viseur.png", 300, 300)

# Étapes 2 et 3 : fantômes venant de la gauche
fantomes_droite = []
timer_apparition = Timer(1)
timer_apparition.start()

# Étape 4 : fantômes venant de la droite
fantomes_gauche = []

# Étape 6 : score
score = 0
txt_score = Text("Score : 0", 80, 20, (255, 255, 255))

# Étape 8 : chrono
chrono = Timer(30)
chrono.start()
txt_chrono = Text("30", 300, 20, (255, 255, 255))

# Étape 9 : munitions
balles = 6
txt_balles = Text("Balles : 6", 520, 20, (255, 255, 255))

# Étape 10 : fin de partie
gameover = False
txt_fin = Text("Fin !", 300, 300, (255, 255, 255), (120, 0, 120), 60)

while True:
  refresh((20, 10, 40))

  viseur.set_position(get_mouse_x(), get_mouse_y())
  nouvelles_touches = get_new_keys()

  if gameover == False:
    # Étapes 3 et 4 : apparition
    if timer_apparition.is_finished():
      if randint(1, 2) == 1:
        fantomes_droite.append(Actor("blinky.png", -30, randint(60, 560)))
      else:
        fantome = Actor("inky.png", 630, randint(60, 560))
        fantome.set_flip(True)
        fantomes_gauche.append(fantome)
      timer_apparition.start()

    # Étapes 2 à 4 : déplacement
    for fantome in fantomes_droite:
      fantome.move(3, 0)
    for fantome in fantomes_gauche:
      fantome.move(-3, 0)

    # Étapes 5, 6 et 9 : tir
    if "MOUSE_1" in nouvelles_touches and balles > 0:
      balles -= 1
      txt_balles.set_text(f"Balles : {balles}")
      for fantome in fantomes_droite:
        if viseur.collide(fantome):
          fantome.kill()
          score += 1
      for fantome in fantomes_gauche:
        if viseur.collide(fantome):
          fantome.kill()
          score += 1
      txt_score.set_text(f"Score : {score}")

    # Étape 9 : recharger
    if "SPACE" in nouvelles_touches:
      balles = 6
      txt_balles.set_text("Balles : 6")

    # Étape 7 : nettoyage (boucles séparées)
    for fantome in fantomes_droite:
      if fantome.get_left() > 600:
        fantomes_droite.remove(fantome)
    for fantome in fantomes_gauche:
      if fantome.get_right() < 0:
        fantomes_gauche.remove(fantome)

    # Étape 8 : chrono
    txt_chrono.set_text(int(chrono.get_time_left()))

    # Étape 10 : fin
    if chrono.is_finished():
      gameover = True
      txt_fin.set_text(f"Fin ! Score : {score}")

  for fantome in fantomes_droite:
    fantome.draw()
  for fantome in fantomes_gauche:
    fantome.draw()
  txt_score.draw()
  txt_chrono.draw()
  txt_balles.draw()
  if gameover:
    txt_fin.draw()
  viseur.draw()
```
````
