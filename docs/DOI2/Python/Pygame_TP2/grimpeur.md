```{metadata}
hide: [primary-sidebar, secondary-sidebar, prev-next, footer]
exec:
  python:
    files:
      roger.png:
      brick.png:
      brick_red.png:
      brick_green.png:
      trampoline.png:
      blinky.png:
      heart.png:
      shield.png:
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

# Projet Grimpeur

:::{container} projet-liens
[Documentation du module](../pygame_doc.md)
:::

:::{container} projet-consignes
``````{tab-set}
:sync-group: etape
`````{tab-item} Présentation
:sync: presentation
Dans ce jeu, Roger doit grimper le plus haut possible en rebondissant de plateforme en plateforme. Il rebondit automatiquement dès qu'il retombe sur une plateforme : le joueur contrôle seulement sa direction, vers la gauche ou vers la droite. S'il rate une plateforme et tombe en bas de l'écran, la partie est perdue.
`````
`````{tab-item} 1
:sync: etape1
Créez et dessinez l'acteur principal `roger` avec l'image `roger.png`, à la position `300, 450`. Utilisez ensuite la méthode `scale()` pour le rendre un peu plus petit (par exemple `0.7`). Rappel : l'écran fait 600x600 pixels.
`````
`````{tab-item} 2
:sync: etape2
Comme pour Flappy Bird, Roger est soumis à la gravité.
 - Avant la boucle de jeu, créez une variable `vitesse_y = 0` et une variable `GRAVITE = 0.3`.
 - Dans la boucle de jeu, augmentez `vitesse_y` de `GRAVITE` à chaque tour, puis déplacez Roger verticalement de `vitesse_y` avec `move()`.

Roger devrait tomber de plus en plus vite et sortir de l'écran par le bas.
`````
`````{tab-item} 3
:sync: etape3
Le joueur doit pouvoir diriger Roger.
 - Avec `get_pressed_keys()`, déplacez Roger de 5 pixels vers la gauche avec {kbd}`A` et vers la droite avec {kbd}`D`.
 - Pour que Roger regarde dans la direction où il va, utilisez `roger.set_flip(True)` lorsqu'il va à gauche et `roger.set_flip(False)` lorsqu'il va à droite.
 - Lorsque Roger sort de l'écran par un côté, il doit réapparaître de l'autre côté : si sa position horizontale (`get_x()`) est inférieure à 0, placez-le à `600` avec `set_position()` (sans changer sa position verticale). Faites l'inverse s'il dépasse 600.
`````
`````{tab-item} 4
:sync: etape4
Créons les plateformes. Elles seront stockées dans une liste.
 - Avant la boucle de jeu, copiez/collez le code suivant. Il crée une première plateforme juste sous Roger, puis 7 autres plateformes à des positions horizontales aléatoires, espacées de 75 pixels verticalement :
```python
plateformes = [Actor("brick.png", 300, 570)]
for i in range(7):
  plateforme = Actor("brick.png", randint(40, 560), 495 - i * 75)
  plateformes.append(plateforme)
```
 - Juste après, avec une boucle `for`, agrandissez chaque plateforme 2 fois avec `scale()`.
 - Dans la boucle de jeu, dessinez toutes les plateformes avec une boucle `for`.

Pour l'instant, Roger traverse les plateformes et tombe.
`````
`````{tab-item} 5
:sync: etape5
Roger doit rebondir sur les plateformes.
 - Avant la boucle de jeu, créez une variable `VITESSE_SAUT = -11`.
 - Dans la boucle de jeu, pour chaque plateforme, si Roger est en collision avec la plateforme **et** qu'il est en train de descendre (`vitesse_y > 0`), alors `vitesse_y` prend la valeur `VITESSE_SAUT`.

Grâce à la condition `vitesse_y > 0`, Roger peut traverser une plateforme par le dessous en montant, et ne rebondit que lorsqu'il retombe dessus. Ajustez `GRAVITE` et `VITESSE_SAUT` si vous le souhaitez.
`````
`````{tab-item} 6
:sync: etape6
Pour l'instant, Roger ne peut pas monter plus haut que le haut de l'écran. Nous allons faire « défiler » le jeu : lorsque Roger monte trop haut, ce n'est plus lui qui monte, mais les plateformes qui descendent.
 - Dans la boucle de jeu, si la position verticale de Roger (`get_y()`) est inférieure à 250 :
   1. Calculez de combien il dépasse : `decalage = 250 - roger.get_y()`
   2. Replacez Roger à la hauteur 250 (sans changer sa position horizontale).
   3. Déplacez **toutes** les plateformes vers le bas de `decalage` pixels.

Roger reste maintenant toujours dans l'écran, et les plateformes défilent vers le bas lorsqu'il monte. Mais au bout de quelques rebonds, il n'y a plus de plateformes...
`````
`````{tab-item} 7
:sync: etape7
Plutôt que de créer sans arrêt de nouvelles plateformes, nous allons **recycler** celles qui sortent de l'écran par le bas.
 - Dans la boucle de jeu, pour chaque plateforme, si son bord haut (`get_top()`) est supérieur à 600, replacez-la tout en haut avec `set_position()` :
   - sa nouvelle position horizontale est aléatoire : `randint(40, 560)`
   - sa nouvelle position verticale est `plateforme.get_y() - 600`

Comme les 8 plateformes sont espacées de 75 pixels (8 x 75 = 600), remonter une plateforme de 600 pixels la place exactement au-dessus de la plus haute. Roger peut maintenant grimper sans fin !
`````
`````{tab-item} 8
:sync: etape8
Affichons la hauteur atteinte par Roger.
 - Avant la boucle de jeu, créez une variable `hauteur = 0` et un texte `txt_hauteur` en haut de l'écran.
 - À l'étape 6, à chaque défilement, augmentez `hauteur` de `decalage`.
 - Mettez ensuite à jour le texte : `txt_hauteur.set_text(f"Hauteur : {int(hauteur / 10)} m")`. Ici, on considère que 10 pixels valent 1 mètre, et `int()` permet de supprimer les décimales.
`````
`````{tab-item} 9
:sync: etape9
Gérons la défaite.
 - Avant la boucle de jeu, créez une variable `gameover = False`.
 - Si le bord haut de Roger (`get_top()`) est supérieur à 600, c'est-à-dire s'il est complètement sorti de l'écran par le bas, `gameover` devient `True`.
 - Modifiez votre code de sorte que tous les mouvements (gravité, déplacements, défilement, recyclage) ne se produisent plus que si `gameover` est `False`.
`````
`````{tab-item} 10
:sync: etape10
Lorsque `gameover` est `True`, affichez un texte « GAME OVER » au milieu de l'écran. Ajoutez-y la hauteur atteinte, par exemple `GAME OVER - 152 m`. Pour cela, vous pouvez créer le texte avant la boucle de jeu et le mettre à jour avec `set_text()` au moment où `gameover` devient `True`.
`````
`````{tab-item} Partie 2
:sync: partie2
**Partie 2 : fonctionnalités intermédiaires**

Les fonctionnalités de la partie 2 valent au maximum 10 pts. Vous pouvez donc choisir des éléments de la liste suivante à implémenter et s'additionnant à 10 pts.

 - (1 pt) Un son est joué à chaque rebond.
 - (2 pts) Les plateformes ont des couleurs aléatoires (`brick.png`, `brick_green.png` ou `brick_red.png`).
 - (2 pts) Augmentez progressivement la difficulté : au-delà d'une certaine hauteur, les plateformes recyclées deviennent plus petites.
 - (2 pts) Des cadeaux (`gift_blue.png`, ...) apparaissent sur certaines plateformes. Les ramasser rapporte des points bonus. Attention, ils doivent défiler avec les plateformes !
 - (3 pts) Une des plateformes se déplace horizontalement et rebondit sur les bords de l'écran.
 - (3 pts) Plateformes fragiles : certaines plateformes (par exemple les rouges) disparaissent avec `kill()` après un rebond. Elles réapparaissent avec `revive()` lorsqu'elles sont recyclées.
 - (3 pts) Un fantôme (`blinky.png`) traverse régulièrement l'écran. Si Roger le touche, la partie est perdue.
 - (4 pts) Un trampoline (`trampoline.png`, à réduire fortement avec `scale()`) apparaît de temps en temps sur une plateforme. Rebondir dessus fait faire un super saut à Roger.
`````
`````{tab-item} Partie 3
:sync: partie3
**Partie 3 : fonctionnalités avancées**

 - (2 pts) Afin que le jeu ne commence pas immédiatement lorsqu'on lance le programme, définissez une touche sur laquelle on doit appuyer afin que le jeu démarre.
 - (3 pts) Ajoutez une fonctionnalité permettant de redémarrer le jeu une fois qu'on a perdu et qu'on appuie sur la touche `R`.
 - (3 pts) Le meilleur score de la session (record) est affiché, et un message apparaît lorsqu'il est battu.
 - (3 pts) La couleur du fond change progressivement avec la hauteur (par exemple du bleu ciel vers le noir de l'espace).
 - (4 pts) Un bonus (`shield.png`) donne un bouclier temporaire : pendant 5 secondes (`Timer`), Roger ne craint plus les fantômes.
 - (4 pts) Un bonus « fusée » fait monter Roger automatiquement et rapidement pendant 3 secondes.
 - (4 pts) Roger peut tirer vers le haut avec {kbd}`Espace` pour détruire les fantômes.
`````
``````
:::

:::{container} projet-ide
```{exec} python
:then: pygame_end
:editor: 40189215-4e90-45ff-a6e4-7dc280f085cc
while True:
  refresh((30, 40, 90))
```
:::

````{solution} Solution (étapes 1 à 10)
```{code-block} python
# Étape 1 : Roger
roger = Actor("roger.png", 300, 450)
roger.scale(0.7)

# Étape 2 : gravité
vitesse_y = 0
GRAVITE = 0.3
VITESSE_SAUT = -11

# Étape 4 : les plateformes
plateformes = [Actor("brick.png", 300, 570)]
for i in range(7):
  plateforme = Actor("brick.png", randint(40, 560), 495 - i * 75)
  plateformes.append(plateforme)
for plateforme in plateformes:
  plateforme.scale(2)

# Étape 8 : score
hauteur = 0
txt_hauteur = Text("Hauteur : 0 m", 300, 20, (255, 255, 255))

# Étapes 9 et 10 : fin de partie
gameover = False
txt_gameover = Text("GAME OVER", 300, 300, (255, 255, 255), (200, 0, 0), 60)

while True:
  refresh((30, 40, 90))

  if gameover == False:
    # Étape 2 : gravité
    vitesse_y += GRAVITE
    roger.move(0, vitesse_y)

    # Étape 3 : déplacement gauche/droite et sortie par les côtés
    touches = get_pressed_keys()
    if "A" in touches:
      roger.move(-5, 0)
      roger.set_flip(True)
    if "D" in touches:
      roger.move(5, 0)
      roger.set_flip(False)
    if roger.get_x() < 0:
      roger.set_position(600, roger.get_y())
    if roger.get_x() > 600:
      roger.set_position(0, roger.get_y())

    # Étape 5 : rebond sur les plateformes (seulement en descendant)
    for plateforme in plateformes:
      if roger.collide(plateforme) and vitesse_y > 0:
        vitesse_y = VITESSE_SAUT

    # Étape 6 : défilement de l'écran
    if roger.get_y() < 250:
      decalage = 250 - roger.get_y()
      roger.set_position(roger.get_x(), 250)
      for plateforme in plateformes:
        plateforme.move(0, decalage)
      # Étape 8 : score
      hauteur += decalage
      txt_hauteur.set_text(f"Hauteur : {int(hauteur / 10)} m")

    # Étape 7 : recyclage des plateformes sorties en bas
    for plateforme in plateformes:
      if plateforme.get_top() > 600:
        plateforme.set_position(randint(40, 560), plateforme.get_y() - 600)

    # Étape 9 : chute
    if roger.get_top() > 600:
      gameover = True

  for plateforme in plateformes:
    plateforme.draw()
  roger.draw()
  txt_hauteur.draw()
  # Étape 10
  if gameover:
    txt_gameover.draw()
```
````
