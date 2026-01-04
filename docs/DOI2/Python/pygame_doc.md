% Copyright 2025 Caroline Blank <caro@c-space.org> & Maxime Jan
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{metadata}
solutions: dynamic
```

# Pygame - Documentation

Ce module simplifie l'utilisation de Pygame pour créer des jeux en 2D. Il fournit des classes et fonctions facilitant la gestion des acteurs, du texte, des timers et des interactions.

## Boucle de jeu


```{py:method} refresh(couleur)
Rafraîchit l'écran avec une nouvelle image de fond.
:arg couleur: La couleur de fond au format RGB, par exemple `(255, 255, 0)` pour du jaune.

Cette fonction doit être appelée à chaque tour de la boucle de jeu. Elle efface l'écran précédent et prépare le dessin de la nouvelle image.
```

**Exemple d'utilisation :**
```python
async def main():
  while True:
    await refresh((197, 255, 143))  # Fond vert clair
```

## Gestion des entrées utilisateur

```{py:method} get_pressed_keys()
Retourne la liste des touches actuellement pressées par l'utilisateur. La liste contient des chaînes de caractères représentant les touches pressées.

Les touches du clavier sont représentées par leur lettre en majuscule (`"A"`, `"D"`, `"W"`, `"S"`, `"SPACE"`, etc.).
Les clics de souris sont représentés par `"MOUSE_1"` (gauche), `"MOUSE_2"` (molette), `"MOUSE_3"` (droit).
```

**Exemple d'utilisation :**
```python
while True:
    touches_pressées = get_pressed_keys()
    if "D" in touches_pressées:
        print("La touche D est enfoncée")
    if "MOUSE_1" in touches_pressées:
        print("Clic gauche détecté")
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
Déplace l'acteur de dx pixels horizontalement et dy pixels verticalement.
:arg dx: Le déplacement horizontal (positif = droite, négatif = gauche).
:arg dy: Le déplacement vertical (positif = bas, négatif = haut).
```

```{py:method} Actor.set_position(x, y)
Place l'acteur à une position précise.
:arg x,y: Les nouvelles coordonnées du centre de l'acteur.
```

```{py:method} Actor.get_x()
Retourne la position horizontale (x) de l'acteur.
```

```{py:method} Actor.get_y()
Retourne la position verticale (y) de l'acteur.
```

```{py:method} Actor.collide(autre_acteur)
Vérifie si cet acteur entre en collision avec un autre acteur. Retourne `True` si les acteurs sont en collision, `False` sinon.
:arg autre_acteur: L'acteur avec lequel tester la collision.
```

```{py:method} Actor.scale(facteur)
Redimensionne l'acteur.
:arg facteur: Le facteur de redimensionnement (2 = deux fois plus grand, 0.5 = deux fois plus petit).
```

```{py:method} Actor.flip(horizontal=True, vertical=False)
Retourne l'image de l'acteur.
:arg horizontal: Si `True`, retourne l'image horizontalement (effet miroir).
:arg vertical: Si `True`, retourne l'image verticalement.
```

```{py:method} Actor.kill()
Supprime visuellement l'acteur en le rendant invisible.

L'acteur existe toujours en mémoire mais n'est plus visible à l'écran.
```

**Exemple d'utilisation complète :**
```python
async def main():
  roger = Actor("roger.png", 300, 100)
  orange = Actor("orange.png", 400, 300)
  orange.scale(0.5)
  
  vitesse = 3
  
  while True:
    await refresh((197, 255, 143))
    
    touches_pressées = get_pressed_keys()
    if "D" in touches_pressées:
      roger.move(vitesse, 0)
    if "A" in touches_pressées:
      roger.move(-vitesse, 0)
    
    if roger.collide(orange):
      orange.kill()
      vitesse += 2
    
    roger.draw()
    orange.draw()
```

## Text

La classe `Text` permet d'afficher du texte à l'écran.

```{py:class} Text(texte, x, y, antialiasing, couleur_texte, couleur_fond)
Crée un élément texte.
:arg texte: Le texte à afficher.
:arg x,y: Les coordonnées du centre du texte.
:arg antialiasing: `True` pour un texte lissé, `False` sinon.
:arg couleur_texte: La couleur du texte au format RGB.
:arg couleur_fond: La couleur de fond du texte au format RGB.
```

### Méthodes

```{py:method} Text.draw()
Dessine le texte à l'écran.
```

**Exemple d'utilisation :**
```python
async def main():
  titre = Text("Bienvenue !", 300, 50, True, (0, 0, 0), (255, 255, 255))
  score_txt = Text("Score: 0", 300, 100, True, (255, 0, 0), (255, 255, 0))
  
  while True:
    await refresh((197, 255, 143))
    
    titre.draw()
    score_txt.draw()
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
Retourne `True` si le timer est terminé (a atteint 0), `False` sinon.
```

**Exemple d'utilisation :**
```python
async def main():
  timer_spawn = Timer(2)  # Timer de 2 secondes
  timer_spawn.start()
  
  ennemis = []
  
  while True:
    await refresh((197, 255, 143))
    
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
