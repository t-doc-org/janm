% Copyright 2025 Caroline Blank <caro@c-space.org> & Maxime Jan
% SPDX-License-Identifier: CC-BY-NC-SA-4.0

```{metadata}
solutions: dynamic
```

# Dessiner avec Python

Python peut être utilisé pour faire des dessins.

## Fonctions à disposition

```{exec} python
:name: fonctions_dessin_svg
:class: hidden
:when: never
from tdoc import svg

def creation_image(largeur, hauteur, couleur):
  global img
  img = svg.Image(largeur, hauteur, stroke='black', style='width: 100%; height: 100%')
  rectangle(0, 0, largeur, hauteur, couleur)

def rectangle(x, y, largeur, hauteur, remplissage, bord="transparent"):
  img.rect(x, y, largeur, hauteur, stroke=bord, fill=remplissage)

def triangle(point_1, point_2, point_3, remplissage, bord="transparent"):
  img.polygon(point_1, point_2, point_3, stroke=bord, fill=remplissage)

def cercle(centre_x, centre_y, rayon, remplissage, bord="transparent"):
  img.circle(centre_x, centre_y, rayon, stroke=bord, fill=remplissage)

def ellipse(centre_x, centre_y, rayon_x, rayon_y, remplissage, bord="transparent"):
  img.ellipse(centre_x, centre_y, rayon_x, rayon_y, stroke=bord, fill=remplissage)

def ligne(x1, y1, x2, y2, couleur, epaisseur):
  img.line(x1, y1, x2, y2, stroke=svg.Stroke(couleur, width=epaisseur))

def texte(x, y, texte, couleur, taille):
  font = f"font: bold italic {taille}px serif"
  img.text(x, y, texte, stroke='transparent', fill=couleur, style=font)

def rendu():
  render(img)
```

```{exec} python
:name: rendu
:class: hidden
:when: never

# Affiche l'image
render(img)
```

Voici la définition de fonctions de base pour dessiner des rectangles, des
triangles, des cercles, des lignes, etc.

```{py:method} creation_image(largeur, hauteur, couleur)
Crée une image.
:arg largeur,hauteur: Les dimensions de l'image.
:arg couleur: La couleur de fond de l'image.
```

```{py:method} rectangle(x, y, largeur, hauteur, remplissage, bord="transparent")
Ajoute un rectangle sur l'image.
:arg x,y: L'origine du rectangle (sommet en haut à gauche).
:arg largeur,hauteur: Les dimensions du rectangle.
:arg remplissage: La couleur de remplissage du rectangle.
:arg bord: La couleur du bord du rectangle (par défaut transparent).
```

```{py:method} triangle(point_1, point_2, point_3, remplissage, bord="transparent")
Ajoute un triangle sur l'image.
:arg point_1,point_2,point_3: Les coordonnées des trois sommets sous la forme `(x1, y1)`.
:arg remplissage: La couleur de remplissage du triangle.
:arg bord: La couleur du bord du triangle (par défaut transparent).
```

```{py:method} cercle(x, y, r, remplissage, bord="transparent")
Ajoute un cercle sur l'image.
:arg x,y: Les coordonnées du centre du cercle.
:arg r: Le rayon du cercle.
:arg remplissage: La couleur de remplissage du cercle.
:arg bord: La couleur du bord du cercle (par défaut transparent).
```

```{py:method} ellipse(x, y, rx, ry, remplissage, bord="transparent")
Ajoute une ellipse sur l'image.
:arg x,y: Les coordonnées du centre de l'ellipse.
:arg rx,ry: Les rayons horizontaux et verticaux de l'ellipse.
:arg remplissage: La couleur de remplissage de l'ellipse.
:arg bord: La couleur du bord de l'ellipse (par défaut transparent).
```

```{py:method} ligne(x1, y1, x2, y2, couleur, epaisseur)
Ajoute une ligne sur l'image.
:arg x1,y1: Les coordonnées du début de la ligne.
:arg x2,y2: Les coordonnées de la fin de la ligne.
:arg couleur: La couleur de la ligne.
:arg epaisseur: L'épaisseur de la ligne.
```

```{py:method} texte(x, y, texte, couleur, taille)
Ajoute du texte sur l'image.
:arg x,y: Les coordonnées du début du texte (ligne de base).
:arg texte: Le texte à afficher.
:arg couleur: La couleur du texte.
:arg epaisseur: La taille des caractères en pixels (px).
```
## Exercices de base
### Exercice {num1}`exercice-dessin`

1. Changez la couleur de fond de l'image en vert. Pour cela, le paramètre de la couleur peut prendre la valeur d'une couleur en anglais comme `"green"`, `"blue"`, `"purple"`, etc.

2. Changez la couleur du rectangle en blanc
3. Changez la couleur du contour en une couleur de votre choix en spécifiant la notation hexadécimale `#...`. Vous trouverez une liste de ces couleurs hexadécimale [ici](https://www.rapidtables.com/web/color/RGB_Color.html)

4. Déplacez le rectangle en haut à droite du dessin
5. Ajoutez un cercle et un triangle de la taille et la couleur de votre choix à ce dessin
```{exec} python
:after: fonctions_dessin_svg
:then: rendu
:editor: a72b3183-cb55-400c-8016-4317ee41ace5
creation_image(600, 400, "#CCFFFF")

rectangle(100, 200, 150, 150, "#F7E4E1", "black")
```

### Exercice {num1}`exercice-dessin`
1. Observez la fonction ci-dessous. Celle-ci permet de créer une maison à différents endroits du dessin en fonction des paramètres de coordonnées `x` et `y`. Appelez cette fonction 3x pour dessiner 3 maisons.

2. Modifiez le corps de la fonction `maison` afin d'y ajouter une porte brune

3. Ajoutez un paramètre `couleur_toit` permettant de préciser la couleur du toit d'une maison au moment de l'appel de la fonction. Ainsi, l'appel `maison(100, 100, "blue")` devrait dessiner une maison au toit bleu.


```{exec} python
:after: fonctions_dessin_svg
:then: rendu
:editor: 458d80f5-a896-4ce7-a45a-8ce188c546cc
def maison(x, y):
  rectangle(x, y, 150, 150, "gray", "black")
  triangle((x, y), (x+150, y), (x+80, y-100), "brown")

creation_image(600, 400, "#f0ffffff")

#Appelez la fonction ici
```


### Exercice {num1}`exercice-dessin`
1. Complétez le smiley ci-dessous avec 2 cercles pour les yeux, et un rectangle pour la bouche.

2. En vous inspirant du code du précédent exercice, définissez une fonction `smiley(x, y)` permettant de dessiner le smiley que vous avez créé aux coordonnées `(x, y)` lorsqu'on appelle la fonction

3. Utilisez la fonction 3x pour dessiner 3 smileys.

```{exec} python
:after: fonctions_dessin_svg
:then: rendu
:editor: bd1d954d-9db5-4f5e-961c-cbc12e319d83
creation_image(300, 300, "black")

cercle(150, 150, 100, "yellow")
```

### Exercice {num1}`exercice-dessin`
Le code ci-dessous permet de dessiner des cercles les uns à côtés des autres

1. Modifiez ce programme de sorte qu'il y ait plus d'espace entre les cercles.

2. Modifiez ce programme en y ajoutant une variable `rayon = 5`, de sorte que chaque cercle ait un rayon plus grand que le précédent.


```{exec} python
:after: fonctions_dessin_svg
:then: rendu
:editor: 65189273-0a76-4857-b0fd-cd2e489f6f5b
creation_image(600, 100, "black")

position_x = 25
while position_x < 600:
    cercle(position_x, 50, 12.5, "purple", "white")
    position_x += 25
```

