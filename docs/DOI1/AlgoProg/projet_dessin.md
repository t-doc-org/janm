% Copyright 2025 Maxime Jan
% SPDX-License-Identifier: CC-BY-NC-SA-4.0


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
```

```{exec} python
:name: rendu
:class: hidden
:when: never

# Affiche l'image
render(img)
```



# TP : carte de Noël

## Obectifs
Le but de ce TP est de réaliser un dessin complexe avec Python pour réaliser une carte de Noël. Le thème de la carte n'est pas imposé, et vous n'êtes donc pas tenu de réaliser un dessin en lien avec Noël. Toutefois, tout le monde est soumis à la même grille d'évaluation :

## Pour obtenir un 5

| Critère | Points |
|---------|-------|
| Le programme s'exécute sans aucune erreur et un dessin est affiché | **1 pt** |
| Le dessin contient au moins : un triangle, un rectangle, un cercle, une ellipse, une ligne et un texte, chacun utilisé de manière pertinente | **2 pts** |
| Le programme contient au moins **2 inputs** permettant à l'utilisateur de modifier le dessin (couleur, taille, nombre, ...) | **2 pts** |
| Le programme contient au moins **1 branchement conditionnel** `if / elif / else` utilisé de manière pertinente | **2 pts** |
| Le programme contient au moins **2 boucles while** utilisées pour répéter le dessin d’un objet plusieurs fois en faisant varier une propriété (taille, nombre, couleur, ...) | **4 pts** |
| Le programme définit et appelle au moins **5 fonctions**, dont au moins **3 paramétrées**, regroupant chacune les instructions permettant de dessiner un objet complexe du dessin | **5 pts** |
| Le dessin complet est **suffisamment complexe, visuellement intéressant et original** | **4 pts** |

**Total : 20 points possibles pour atteindre 5**

---

## Pour aller de **5 à 6**

| Critère | Points |
|---------|-------|
| Le dessin contient **2 éléments aléatoires** grâce au module `random` | **3 pts** |
| Le dessin contient **un élément animé** (déplacement, clignotement, etc.) | **2 pts** |

**Total possible : 25 points**  

## Mon projet

```{exec} python
:after: fonctions_dessin_svg
:then: rendu
:editor: 3da19d15-38f7-43ec-974a-4efa35a05fc2

```
