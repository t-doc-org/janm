```{metadata}
hide: [primary-sidebar, secondary-sidebar, prev-next, footer]
exec:
  python:
    files:
      case_claire.png:
      case_foncee.png:
      pion_blanc.png:
      tour_blanc.png:
      cavalier_blanc.png:
      fou_blanc.png:
      dame_blanc.png:
      roi_blanc.png:
      pion_noir.png:
      tour_noir.png:
      cavalier_noir.png:
      fou_noir.png:
      dame_noir.png:
      roi_noir.png:
      curseur.png:
      selection.png:
      survol.png:
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

# Projet Échecs

[Documentation du module](../pygame_doc.md)

``````{tab-set}
:sync-group: etape
`````{tab-item} Présentation
:sync: presentation
Ce projet est **un peu plus difficile** que les autres : il demande d'organiser son code avec soin, car beaucoup de conditions s'imbriquent. Le but n'est pas de programmer toutes les règles des échecs, mais un plateau sur lequel deux joueurs peuvent déplacer leurs pièces chacun leur tour et capturer les pièces adverses. Les règles de déplacement de chaque pièce sont des bonus des parties 2 et 3.

Le plateau est composé de 8x8 cases de 70x70 pixels. Il est décalé de 20 pixels vers la droite et de 40 pixels vers le bas, afin de laisser de la place en haut de l'écran pour un texte.
`````
`````{tab-item} 1
:sync: etape1
Créons le plateau de jeu. Chaque case est un acteur, et toutes les cases sont stockées dans une liste.
 - Avant la boucle de jeu, créez une liste vide `cases = []`.
 - Puis, copiez/collez le code suivant :
```python
for ligne in range(8):
  for colonne in range(8):
    if (ligne + colonne) % 2 == 0:
      case = Actor("case_claire.png", 55 + colonne * 70, 75 + ligne * 70)
    else:
      case = Actor("case_foncee.png", 55 + colonne * 70, 75 + ligne * 70)
    cases.append(case)
```
 - Dans la boucle de jeu, dessinez toutes les cases avec une boucle `for`.

L'opérateur `%` donne le reste d'une division : `(ligne + colonne) % 2 == 0` signifie que `ligne + colonne` est un nombre pair. C'est ce qui permet d'alterner les cases claires et foncées. Vous devriez voir un damier de 8x8 cases.
`````
`````{tab-item} 2
:sync: etape2
Plaçons les pions. Les pièces de chaque joueur sont stockées dans leur propre liste.
 - Avant la boucle de jeu, créez deux listes vides `pieces_blanches` et `pieces_noires`.
 - Avec une boucle `for colonne in range(8):`, créez pour chaque colonne :
   - un acteur `pion_blanc.png` à la position `55 + colonne * 70, 495` et ajoutez-le à `pieces_blanches` ;
   - un acteur `pion_noir.png` à la position `55 + colonne * 70, 145` et ajoutez-le à `pieces_noires`.
 - Dans la boucle de jeu, dessinez toutes les pièces des deux listes. Attention : les pièces doivent être dessinées **après** les cases, sinon elles seront cachées par le plateau.

Vous devriez voir une rangée de pions blancs en bas et une rangée de pions noirs en haut.
`````
`````{tab-item} 3
:sync: etape3
Plaçons les autres pièces. Cette fois, chaque pièce est créée « à la main », l'une après l'autre.
 - Avant la boucle de jeu, créez chaque pièce dans sa propre variable, puis ajoutez-la à sa liste avec `append()`. Par exemple, pour la première tour blanche :
```python
tour_blanche_1 = Actor("tour_blanc.png", 55, 565)
pieces_blanches.append(tour_blanche_1)
```
 - Les pièces blanches sont sur la rangée du bas (`y = 565`) et les pièces noires sur la rangée du haut (`y = 75`). Leur position horizontale dépend de la colonne :

| Colonne | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Pièce | tour | cavalier | fou | dame | roi | fou | cavalier | tour |
| `x` | 55 | 125 | 195 | 265 | 335 | 405 | 475 | 545 |

 - Les images ont toujours la forme `piece_couleur.png` : `tour_blanc.png`, `cavalier_noir.png`, `dame_blanc.png`, etc.
 - Chaque pièce doit avoir un nom de variable différent (`tour_blanche_1`, `tour_blanche_2`, ...). Nommez les deux rois `roi_blanc` et `roi_noir` : ces variables seront utiles à l'étape 10.

Vous devriez maintenant voir la position de départ d'une partie d'échecs.
`````
`````{tab-item} 4
:sync: etape4
Pour savoir sur quelle pièce ou quelle case le joueur clique, nous allons utiliser un acteur minuscule (un point de 2 pixels) qui suit la souris. Il suffira ensuite de tester ses collisions avec les pièces et les cases.
 - Avant la boucle de jeu, créez un acteur `curseur` avec l'image `curseur.png`, à n'importe quelle position.
 - Dans la boucle de jeu, placez le curseur à la position de la souris : `curseur.set_position(get_mouse_x(), get_mouse_y())`
 - Dessinez le curseur en tout dernier.

Vous devriez voir un petit point rouge sous la flèche de la souris lorsqu'elle survole le jeu.
`````
`````{tab-item} 5
:sync: etape5
Le joueur doit pouvoir sélectionner une pièce en cliquant dessus. Pour l'instant, seules les pièces blanches peuvent être sélectionnées.
 - Avant la boucle de jeu, créez une variable `piece_selectionnee = None`. En Python, `None` est une valeur spéciale qui signifie « rien » : aucune pièce n'est sélectionnée.
 - Dans la boucle de jeu, récupérez les touches nouvellement pressées : `nouvelles_touches = get_new_keys()`. Avec `get_new_keys()` (et non `get_pressed_keys()`), un clic n'est compté qu'une seule fois, même si le bouton reste enfoncé plusieurs images.
 - Si `"MOUSE_1"` est dans `nouvelles_touches` **et** que `piece_selectionnee == None` :
   - pour chaque pièce de `pieces_blanches`, si le curseur est en collision avec cette pièce, alors `piece_selectionnee` prend la valeur de cette pièce.
 - Pour montrer la pièce sélectionnée, créez avant la boucle de jeu un acteur `cadre` avec l'image `selection.png`. Dans la boucle de jeu, si `piece_selectionnee != None`, placez le cadre à la position de la pièce sélectionnée (`get_x()` et `get_y()`) et dessinez-le, **après** les cases mais **avant** les pièces.

En cliquant sur une pièce blanche, sa case devrait devenir verte.
`````
`````{tab-item} 6
:sync: etape6
Une fois une pièce sélectionnée, un deuxième clic doit la déplacer sur la case cliquée. Modifiez la condition de l'étape 5 de sorte à obtenir la structure suivante :
```text
Si le joueur clique :
    Si aucune pièce n'est sélectionnée :
        (code de l'étape 5)
    Sinon :
        Pour chaque case de la liste des cases :
            Si le curseur est en collision avec la case :
                Placer la pièce sélectionnée au centre de la case
        piece_selectionnee = None
```
 - Pour placer la pièce au centre de la case, utilisez `piece_selectionnee.set_position(case.get_x(), case.get_y())`.
 - Il est important d'utiliser un `if` / `else` : sinon, le même clic sélectionnerait la pièce **et** la déplacerait immédiatement.

Vous pouvez maintenant déplacer les pièces blanches où vous voulez. Si vous cliquez en dehors du plateau, la pièce est simplement désélectionnée.
`````
`````{tab-item} 7
:sync: etape7
Les joueurs doivent maintenant jouer chacun leur tour.
 - Avant la boucle de jeu, créez une variable `tour = "blanc"` et un texte `txt_tour = Text("Aux blancs de jouer", 300, 20, (255, 255, 255))`. Dessinez ce texte dans la boucle de jeu.
 - Au début de la boucle de jeu, ajoutez le code suivant. Il permet d'utiliser `mes_pieces` pour désigner la liste des pièces du joueur dont c'est le tour, et `pieces_adverses` pour celle de son adversaire :
```python
if tour == "blanc":
  mes_pieces = pieces_blanches
  pieces_adverses = pieces_noires
else:
  mes_pieces = pieces_noires
  pieces_adverses = pieces_blanches
```
 - À l'étape 5, remplacez `pieces_blanches` par `mes_pieces`.
 - À l'étape 6, juste après avoir placé la pièce sur sa case (donc **dans** le `if` de la collision avec la case), changez de joueur : si `tour` vaut `"blanc"`, il devient `"noir"`, sinon il devient `"blanc"`. Mettez aussi à jour le texte avec `txt_tour.set_text(...)`.

Les blancs et les noirs jouent maintenant chacun leur tour. Cliquer en dehors du plateau ne fait pas changer de joueur.
`````
`````{tab-item} 8
:sync: etape8
Gérons la capture des pièces adverses.
 - À l'étape 6, juste après avoir placé la pièce sur sa case, parcourez la liste `pieces_adverses` avec une boucle `for`.
 - Si la pièce sélectionnée est en collision avec une pièce adverse, détruisez la pièce adverse avec `kill()`.

Une pièce *killed* n'est plus dessinée et n'entre plus en collision : elle ne peut donc plus être sélectionnée ni capturée une deuxième fois. Vous pouvez maintenant capturer les pièces de votre adversaire !
`````
`````{tab-item} 9
:sync: etape9
Pour l'instant, un joueur peut déplacer une pièce sur l'une de ses propres pièces. Corrigeons cela : si le joueur clique sur une de ses pièces alors qu'une pièce est déjà sélectionnée, la sélection doit simplement changer.
 - Au début du `else` de l'étape 6, créez une variable `case_occupee = False`.
 - Parcourez `mes_pieces` : si le curseur est en collision avec l'une d'elles, cette pièce devient la `piece_selectionnee` et `case_occupee` devient `True`.
 - Le déplacement de l'étape 6 (la boucle sur les cases **et** le `piece_selectionnee = None`) ne doit maintenant avoir lieu que si `case_occupee == False`.

Vous pouvez maintenant changer d'avis en cliquant sur une autre de vos pièces, et il est impossible de capturer ses propres pièces.
`````
`````{tab-item} 10
:sync: etape10
La partie se termine lorsqu'un roi est capturé.
 - Avant la boucle de jeu, créez une variable `gameover = False` et un texte `txt_fin` vide, par exemple `Text("", 300, 300, (0, 0, 0), (255, 255, 255), 60)`.
 - Dans la boucle de jeu, si le roi noir (la variable `roi_noir` créée à l'étape 3) est capturé (`roi_noir.is_killed()`), `gameover` devient `True` et le texte devient `"Les blancs ont gagné !"`. Faites de même pour le roi blanc.
 - Les clics ne doivent plus être pris en compte si `gameover` vaut `True`, et `txt_fin` doit être dessiné.

Bravo, vous avez un jeu d'échecs jouable à deux !
`````
`````{tab-item} Partie 2
:sync: partie2
**Partie 2 : fonctionnalités intermédiaires**

Les fonctionnalités de la partie 2 valent au maximum 10 pts. Vous pouvez donc choisir des éléments de la liste suivante à implémenter et s'additionnant à 10 pts.

````{admonition} Aide pour les règles de déplacement
:class: note
Pour vérifier qu'un déplacement respecte les règles, calculez **avant** de déplacer la pièce de combien de cases elle se déplacerait (dans la boucle sur les cases, quand le curseur touche la case) :
```python
dx = (case.get_x() - piece_selectionnee.get_x()) / 70
dy = (case.get_y() - piece_selectionnee.get_y()) / 70
```
`dx` vaut par exemple `2` si la pièce se déplace de 2 cases vers la droite, et `-1` si elle se déplace d'une case vers la gauche. De même pour `dy` (positif = vers le bas). La fonction `abs()` donne la valeur absolue d'un nombre : `abs(-2)` vaut `2`.

Pour savoir de quelle pièce il s'agit, utilisez `piece_selectionnee.image_path`, qui contient le nom de son image (par exemple `"cavalier_blanc.png"`).

Si le déplacement n'est pas autorisé, la pièce ne bouge pas, et le joueur doit rejouer.
````

 - (1 pt) Appuyer sur {kbd}`Échap` (`"ESCAPE"`) annule la sélection.
 - (2 pts) La case survolée par la souris est mise en évidence avec l'image `survol.png`.
 - (2 pts) Un son est joué lors d'un déplacement, et un autre lors d'une capture.
 - (2 pts) Le nombre de pièces capturées par chaque joueur est affiché en haut de l'écran.
 - (3 pts) Le roi ne peut se déplacer que d'une case, dans n'importe quelle direction.
 - (3 pts) Le cavalier se déplace en « L » : 2 cases dans une direction et 1 case dans l'autre.
 - (3 pts) Le pion avance d'une case (vers le haut pour les blancs, vers le bas pour les noirs), ou de deux cases s'il est encore sur sa ligne de départ. +1 pt s'il ne peut capturer qu'en diagonale.
 - (2 pts) La tour se déplace en ligne droite, horizontalement ou verticalement, sans tenir compte des pièces sur son chemin.
 - (2 pts) Le fou se déplace en diagonale, sans tenir compte des pièces sur son chemin.
 - (1 pt) La dame se déplace comme une tour ou comme un fou (nécessite les deux points précédents).
`````
`````{tab-item} Partie 3
:sync: partie3
**Partie 3 : fonctionnalités avancées**

 - (2 pts) Afin que le jeu ne commence pas immédiatement lorsqu'on lance le programme, définissez une touche sur laquelle on doit appuyer afin que le jeu démarre.
 - (3 pts) Ajoutez une fonctionnalité permettant de redémarrer la partie lorsqu'on appuie sur la touche `R`.
 - (5 pts) La tour, le fou et la dame ne peuvent plus passer par-dessus d'autres pièces.
 - (3 pts) Promotion : un pion qui atteint la dernière rangée devient une dame.
 - (4 pts) Pendule : chaque joueur dispose de 5 minutes pour toute la partie, affichées à l'écran. Seul le temps du joueur dont c'est le tour s'écoule, et un joueur qui n'a plus de temps perd la partie. Indice : un `Timer` ne peut pas être mis en pause, mais vous pouvez mémoriser le temps restant avec `get_time_left()` et recréer un nouveau `Timer` avec ce temps quand c'est à nouveau le tour du joueur.
 - (3 pts) Lorsqu'une pièce est sélectionnée, toutes les cases sur lesquelles elle peut se déplacer sont mises en évidence avec `survol.png` (nécessite les règles de déplacement de la partie 2).
 - (5 pts) Le roque.
 - (4 pts) Appuyer sur {kbd}`U` annule le dernier coup joué.
`````
``````

```{exec} python
:then: pygame_end
:editor: 798dfa7f-5769-4e6c-8751-b64f04c233cc
while True:
  refresh((50, 50, 50))
```

````{solution} Solution (étapes 1 à 10)
```{code-block} python
# Étape 1 : le plateau
cases = []
for ligne in range(8):
  for colonne in range(8):
    if (ligne + colonne) % 2 == 0:
      case = Actor("case_claire.png", 55 + colonne * 70, 75 + ligne * 70)
    else:
      case = Actor("case_foncee.png", 55 + colonne * 70, 75 + ligne * 70)
    cases.append(case)

# Étape 2 : les pions
pieces_blanches = []
pieces_noires = []
for colonne in range(8):
  pieces_blanches.append(Actor("pion_blanc.png", 55 + colonne * 70, 495))
  pieces_noires.append(Actor("pion_noir.png", 55 + colonne * 70, 145))

# Étape 3 : les autres pièces, à la main
tour_blanche_1 = Actor("tour_blanc.png", 55, 565)
cavalier_blanc_1 = Actor("cavalier_blanc.png", 125, 565)
fou_blanc_1 = Actor("fou_blanc.png", 195, 565)
dame_blanche = Actor("dame_blanc.png", 265, 565)
roi_blanc = Actor("roi_blanc.png", 335, 565)
fou_blanc_2 = Actor("fou_blanc.png", 405, 565)
cavalier_blanc_2 = Actor("cavalier_blanc.png", 475, 565)
tour_blanche_2 = Actor("tour_blanc.png", 545, 565)
pieces_blanches.append(tour_blanche_1)
pieces_blanches.append(cavalier_blanc_1)
pieces_blanches.append(fou_blanc_1)
pieces_blanches.append(dame_blanche)
pieces_blanches.append(roi_blanc)
pieces_blanches.append(fou_blanc_2)
pieces_blanches.append(cavalier_blanc_2)
pieces_blanches.append(tour_blanche_2)

tour_noire_1 = Actor("tour_noir.png", 55, 75)
cavalier_noir_1 = Actor("cavalier_noir.png", 125, 75)
fou_noir_1 = Actor("fou_noir.png", 195, 75)
dame_noire = Actor("dame_noir.png", 265, 75)
roi_noir = Actor("roi_noir.png", 335, 75)
fou_noir_2 = Actor("fou_noir.png", 405, 75)
cavalier_noir_2 = Actor("cavalier_noir.png", 475, 75)
tour_noire_2 = Actor("tour_noir.png", 545, 75)
pieces_noires.append(tour_noire_1)
pieces_noires.append(cavalier_noir_1)
pieces_noires.append(fou_noir_1)
pieces_noires.append(dame_noire)
pieces_noires.append(roi_noir)
pieces_noires.append(fou_noir_2)
pieces_noires.append(cavalier_noir_2)
pieces_noires.append(tour_noire_2)

# Étape 4 : le curseur
curseur = Actor("curseur.png", 0, 0)

# Étape 5 : la sélection
piece_selectionnee = None
cadre = Actor("selection.png", 0, 0)

# Étape 7 : chacun son tour
tour = "blanc"
txt_tour = Text("Aux blancs de jouer", 300, 20, (255, 255, 255))

# Étape 10 : fin de partie
gameover = False
txt_fin = Text("", 300, 300, (0, 0, 0), (255, 255, 255), 60)

while True:
  refresh((50, 50, 50))

  curseur.set_position(get_mouse_x(), get_mouse_y())

  if tour == "blanc":
    mes_pieces = pieces_blanches
    pieces_adverses = pieces_noires
  else:
    mes_pieces = pieces_noires
    pieces_adverses = pieces_blanches

  if "MOUSE_1" in get_new_keys() and gameover == False:
    if piece_selectionnee == None:
      # Étape 5 : sélectionner une de ses pièces
      for piece in mes_pieces:
        if curseur.collide(piece):
          piece_selectionnee = piece
    else:
      # Étape 9 : cliquer sur une de ses pièces change la sélection
      case_occupee = False
      for piece in mes_pieces:
        if curseur.collide(piece):
          piece_selectionnee = piece
          case_occupee = True

      if case_occupee == False:
        # Étape 6 : déplacer la pièce sur la case cliquée
        for case in cases:
          if curseur.collide(case):
            piece_selectionnee.set_position(case.get_x(), case.get_y())
            # Étape 8 : capture
            for adversaire in pieces_adverses:
              if piece_selectionnee.collide(adversaire):
                adversaire.kill()
            # Étape 7 : changement de joueur
            if tour == "blanc":
              tour = "noir"
              txt_tour.set_text("Aux noirs de jouer")
            else:
              tour = "blanc"
              txt_tour.set_text("Aux blancs de jouer")
        piece_selectionnee = None

  # Étape 10 : fin de partie
  if roi_noir.is_killed():
    gameover = True
    txt_fin.set_text("Les blancs ont gagné !")
  if roi_blanc.is_killed():
    gameover = True
    txt_fin.set_text("Les noirs ont gagné !")

  # Dessin
  for case in cases:
    case.draw()
  if piece_selectionnee != None:
    cadre.set_position(piece_selectionnee.get_x(), piece_selectionnee.get_y())
    cadre.draw()
  for piece in pieces_blanches:
    piece.draw()
  for piece in pieces_noires:
    piece.draw()
  txt_tour.draw()
  if gameover:
    txt_fin.draw()
  curseur.draw()
```
````
