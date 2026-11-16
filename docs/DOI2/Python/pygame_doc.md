% Copyright 2025 Caroline Blank <caro@c-space.org> & Maxime Jan
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

# Pygame - Documentation

```{metadata}
hide: [navbar, primary-sidebar, prev-next, footer]
```

Ce module simplifie l'utilisation de Pygame pour créer des jeux en 2D. Il fournit des classes et fonctions facilitant la gestion des acteurs, du texte, des timers, des sons et des interactions.

L'écran de jeu fait **600x600 pixels**. Les variables `width` et `height` contiennent ces dimensions. Les fonctions `randint(min, max)` (nombre entier aléatoire entre `min` et `max`) et `choice(liste)` (élément aléatoire d'une liste) sont disponibles sans `import`.

## Boucle de jeu


```{py:method} refresh(couleur)
Rafraîchit l'écran avec une nouvelle image de fond.
:arg couleur: La couleur de fond au format RGB, par exemple `(255, 255, 0)` pour du jaune.

Cette fonction doit être appelée **au début de chaque tour** de la boucle de jeu. Elle efface l'écran précédent et prépare le dessin de la nouvelle image. Le jeu tourne à 60 images par seconde, quel que soit l'écran de l'ordinateur.
```

**Exemple d'utilisation :**
```python
while True:
  refresh((197, 255, 143))  # Fond vert clair
```

## Gestion des entrées utilisateur

```{py:method} get_pressed_keys()
Retourne la liste des touches actuellement pressées par l'utilisateur. La liste contient des chaînes de caractères représentant les touches pressées.

- Lettres et chiffres : en majuscule (`"A"`, `"D"`, `"W"`, `"S"`, `"1"`, etc.)
- Flèches : `"UP"`, `"DOWN"`, `"LEFT"`, `"RIGHT"`
- Autres touches : `"SPACE"`, `"ENTER"`, `"SHIFT"`, `"CTRL"`, `"ALT"`, `"ESCAPE"`, `"TAB"`
- Clics de souris : `"MOUSE_1"` (gauche), `"MOUSE_2"` (molette), `"MOUSE_3"` (droit)

Une touche reste dans la liste **tant qu'elle est maintenue**.
```

```{py:method} get_new_keys()
Comme `get_pressed_keys()`, mais retourne uniquement les touches qui **viennent d'être pressées** (pressées à cette image-ci, mais pas à la précédente). Maintenir une touche ne la fait apparaître qu'une seule fois. Pratique pour un saut, un tir unique ou un menu.
```

```{py:method} get_mouse_x()
Retourne la position horizontale (x) de la souris sur l'écran de jeu.
```

```{py:method} get_mouse_y()
Retourne la position verticale (y) de la souris sur l'écran de jeu.
```

**Exemple d'utilisation :**
```python
while True:
  touches_pressées = get_pressed_keys()
  if "D" in touches_pressées:
    print("La touche D est enfoncée")
  if "MOUSE_1" in touches_pressées:
    print("Clic gauche détecté")

  nouvelles_touches = get_new_keys()
  if "SPACE" in nouvelles_touches:
    print("Saut !")  # Une seule fois par appui
```


## Actor

La classe `Actor` représente un élément visuel du jeu (personnage, ennemi, objet, etc.).

```{py:class} Actor(image_path, x, y)
Crée un nouvel acteur.
:arg image_path: Le chemin vers l'image de l'acteur (ex: `"roger.png"`).
:arg x,y: Les coordonnées du centre de l'acteur.
```

### Méthodes

```{py:method} Actor.draw()
Dessine l'acteur à l'écran.

Cette méthode doit être appelée à chaque tour de boucle pour que l'acteur soit visible.
```

```{py:method} Actor.move(dx, dy)
Déplace l'acteur de dx pixels horizontalement et dy pixels verticalement. Les nombres à virgule sont acceptés (ex: `move(0, 0.5)`).
:arg dx: Le déplacement horizontal (positif = droite, négatif = gauche).
:arg dy: Le déplacement vertical (positif = bas, négatif = haut).
```

```{py:method} Actor.set_position(x, y)
Place l'acteur à une position précise.
:arg x,y: Les nouvelles coordonnées du centre de l'acteur.
```

```{py:method} Actor.get_x()
Retourne la position horizontale (x) du centre de l'acteur.
```

```{py:method} Actor.get_y()
Retourne la position verticale (y) du centre de l'acteur.
```

```{py:method} Actor.get_width()
Retourne la largeur de l'acteur en pixels. `get_height()` retourne sa hauteur.
```

```{py:method} Actor.get_left()
Retourne la position horizontale du bord gauche de l'acteur. De même, `get_right()`, `get_top()` et `get_bottom()` retournent la position des bords droit, haut et bas. Pratique pour faire rebondir un acteur exactement sur le bord de l'écran.
```

```{py:method} Actor.collide(autre_acteur)
Vérifie si cet acteur entre en collision avec un autre acteur. Retourne `True` si les acteurs sont en collision, `False` sinon. Un acteur *killed* n'entre jamais en collision.
:arg autre_acteur: L'acteur avec lequel tester la collision (un seul acteur, pas une liste).
```

```{py:method} Actor.scale(facteur)
Redimensionne l'acteur par rapport à la taille de son image d'origine.
:arg facteur: Le facteur de redimensionnement (2 = deux fois plus grand, 0.5 = deux fois plus petit).

Le facteur est toujours appliqué à l'image d'origine : appeler deux fois `scale(2)` donne un acteur 2x plus grand, et non 4x.
```

```{py:method} Actor.set_angle(angle)
Tourne l'acteur autour de son centre.
:arg angle: L'angle en degrés, dans le sens inverse des aiguilles d'une montre (`0` = image d'origine, `90` = quart de tour vers la gauche).
```

```{py:method} Actor.flip(horizontal=True, vertical=False)
Retourne l'image de l'acteur (effet miroir). **Chaque appel inverse l'image** : appeler deux fois `flip()` revient à l'image de départ.
:arg horizontal: Si `True`, retourne l'image horizontalement.
:arg vertical: Si `True`, retourne l'image verticalement.
```

```{py:method} Actor.set_flip(horizontal, vertical=False)
Fixe le sens de l'image : `set_flip(True)` affiche l'image en miroir, `set_flip(False)` l'affiche normalement. Contrairement à `flip()`, cette méthode peut être appelée à chaque tour de boucle, par exemple pour qu'un personnage regarde dans la direction où il se déplace.
```

```{py:method} Actor.kill()
Supprime l'acteur : il n'est plus dessiné et n'entre plus en collision.

L'acteur existe toujours en mémoire (et reste dans les listes où il a été ajouté), mais n'est plus visible à l'écran.
```

```{py:method} Actor.is_killed()
Retourne `True` si l'acteur a été *killed*, `False` sinon.
```

```{py:method} Actor.revive()
Fait réapparaître un acteur qui a été *killed*.
```

**Exemple d'utilisation complète :**
```python
roger = Actor("roger.png", 300, 100)
orange = Actor("orange.png", 400, 300)
orange.scale(0.5)

vitesse = 3

while True:
  refresh((197, 255, 143))

  touches_pressées = get_pressed_keys()
  if "D" in touches_pressées:
    roger.move(vitesse, 0)
    roger.set_flip(False)
  if "A" in touches_pressées:
    roger.move(-vitesse, 0)
    roger.set_flip(True)

  if roger.collide(orange):
    orange.kill()
    vitesse += 2

  roger.draw()
  orange.draw()
```

## Text

La classe `Text` permet d'afficher du texte à l'écran.

```{py:class} Text(texte, x, y, couleur_texte, couleur_fond, taille)
Crée un élément texte.
:arg texte: Le texte à afficher (un nombre est automatiquement converti en texte).
:arg x,y: Les coordonnées du centre du texte.
:arg couleur_texte: (optionnel) La couleur du texte au format RGB. Noir par défaut.
:arg couleur_fond: (optionnel) La couleur de fond du texte au format RGB. Transparent par défaut (ou si `None`).
:arg taille: (optionnel) La taille du texte. `36` par défaut.

L'ancienne écriture avec `True` (antialiasing) avant les couleurs reste acceptée : `Text("Bonjour", 300, 50, True, (0, 0, 0), (255, 255, 255))`.
```

### Méthodes

```{py:method} Text.draw()
Dessine le texte à l'écran.
```

```{py:method} Text.set_text(nouveau_texte)
Change le texte affiché, sans changer sa position ni ses couleurs. Pratique pour un score.
```

Un texte possède également les méthodes `move`, `set_position`, `get_x`, `get_y`, `get_width`, `get_height`, `collide`, `kill`, `is_killed` et `revive` des acteurs.

**Exemple d'utilisation :**
```python
titre = Text("Bienvenue !", 300, 50, (0, 0, 0), (255, 255, 255))
score_txt = Text("Score: 0", 300, 100, (255, 0, 0), (255, 255, 0))
petit_txt = Text("Appuyez sur ESPACE", 300, 550, (0, 0, 0), None, 24)
score = 0

while True:
  refresh((197, 255, 143))

  if "SPACE" in get_new_keys():
    score += 1
    score_txt.set_text(f"Score: {score}")

  titre.draw()
  score_txt.draw()
  petit_txt.draw()
```

## Timer

La classe `Timer` permet de gérer des intervalles de temps dans le jeu.

```{py:class} Timer(duree)
Crée un timer.
:arg duree: La durée du timer en secondes.
```

### Méthodes

```{py:method} Timer.start()
Démarre ou redémarre le timer.
```

```{py:method} Timer.is_finished()
Retourne `True` si le timer est terminé (a atteint 0), `False` sinon. Un timer qui n'a encore jamais été démarré est considéré comme terminé.
```

```{py:method} Timer.get_time_left()
Retourne le temps restant en secondes (par exemple `1.25`), ou `0` si le timer est terminé.
```

`print(timer)` affiche le temps restant, par exemple `2.47s`.

**Exemple d'utilisation :**
```python
timer_spawn = Timer(2)  # Timer de 2 secondes
timer_spawn.start()

ennemis = []

while True:
  refresh((197, 255, 143))

  # Vérifier si le timer est terminé
  if timer_spawn.is_finished():
    # Créer un nouvel ennemi
    pos_x = randint(50, 550)
    nouvel_ennemi = Actor("ennemi.png", pos_x, 50)
    ennemis.append(nouvel_ennemi)

    # Redémarrer le timer
    timer_spawn.start()

  # Dessiner tous les ennemis
  for ennemi in ennemis:
    ennemi.move(0, 2)  # Les ennemis descendent
    ennemi.draw()
```

## Sound

La classe `Sound` permet de jouer des sons et des musiques. Plusieurs sons peuvent être joués en même temps (par exemple une musique de fond et des bruitages). Seule exception : les longues musiques (fichiers de plus de 500 Ko, comme `megaman.ogg`, `futuriste.ogg` ou `yoshi.ogg`) ne peuvent pas être jouées en même temps qu'une autre longue musique.

```{py:class} Sound(fichier)
Charge un son.
:arg fichier: Le chemin vers le fichier son (ex: `"yoshi.ogg"`).
```

### Méthodes

```{py:method} Sound.play(repetitions=0)
Joue le son.
:arg repetitions: Le nombre de répétitions supplémentaires. `-1` pour répéter le son en boucle (musique de fond).
```

```{py:method} Sound.pause()
Met le son en pause. `unpause()` le fait reprendre.
```

```{py:method} Sound.stop()
Arrête le son.
```

```{py:method} Sound.set_volume(volume)
Change le volume du son.
:arg volume: Le volume, entre `0` (muet) et `1` (maximum).
```

**Exemple d'utilisation :**
```python
musique = Sound("megaman.ogg")
bruitage = Sound("winners.ogg")
musique.set_volume(0.5)
musique.play(-1)  # En boucle

while True:
  refresh((197, 255, 143))

  if "SPACE" in get_new_keys():
    bruitage.play()
```
