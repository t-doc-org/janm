---
orphan: true
---

<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

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

```{exec} python
:name: trap
:class: hidden
try:
    pose_question()
except:
    pass
```


# Examen de programmation Python 2
## Question 1 - Tableau d'état
Pas ici ! Répondez sur l'interface de Exam.net

## Question 2 - Exécution de fonctions
Pas ici ! Répondez sur l'interface de Exam.net

## Question 3 - Racines
Pas ici ! Répondez sur l'interface de Exam.net

## Question 4 - Mot de passe

Ecrivez un programme dans lequel l'utilisateur doit entrer le mot de passe `STX`. Tant que l'utilisateur entre le mauvais mot de passe, il peut retenter sa chance. Quand il entre le bon mot de passe le texte `Tu as trouvé en x tentatives` est affiché, où `x` est évidemment remplacé par le vrai nombre d'essais.

Un exemple d'exécution est le suivant :
```{code-block} text
Quel est le mot de passe ? <--- [ABCD]
Quel est le mot de passe ? <--- [test]
Quel est le mot de passe ? <--- [le mot de passe]
Quel est le mot de passe ? <--- [STX]
Tu as trouvé en 4 tentatives
```


**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 31685a55-bde4-4de1-a994-48abea1969e2
:then: trap
#Ecrivez le programme ici
```

## Question 5 - Prix du terrain

1. Définissez une nouvelle fonction nommée `calcule_et_affiche_prix_terrain` prenant en paramètre une surface en $m^2$ et le nom d'un village.
2. Complétez ensuite le corps de cette fonction pour afficher le prix d'un terrain de cette taille dans ce village sachant que :
 - 1 $m^2$ au Mouret coûte 310 CHF
 - 1 $m^2$ à Bourguillon coûte 390 CHF
 - 1 $m^2$ à Pensier coûte 280 CHF

Pour obtenir le maximum des points, n'utilisez qu'une seule fois la fonction `print()`

3. Utilisez ensuite 2 fois cette fonction pour calculer et afficher le prix de :
 - un terrain de 1500 $m^2$ à Pensier
 - un terrain de 1000 $m^2$ à Bourguillon

 **N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 7bef834f-92ba-4c3d-b791-c96a1e50d9da
:then: trap
#Ecrivez le programme ici
```


## Question 6 - Des smileys
La fonction ci-dessous permet de dessiner un smiley à différents endroits du dessin.

1. Appelez deux fois la fonction de sorte à dessiner deux smileys l'un sous l'autre.

2. Ajoutez un paramètre à `smiley` de sorte à ce que la couleur de la "peau" soit personnalisable. Modifiez ensuite vos appels de sorte à avoir un smiley `orange` et un smiley `green`.



 **N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:after: fonctions_dessin_svg
:then: rendu trap
:editor: 946a8ccd-7327-4122-831b-29d2120af8bb
def smiley(x, y):
  cercle(x, y, 50, "yellow")
  cercle(x-25, y-20, 5, "black")
  cercle(x+25, y-20, 5, "black")
  rectangle(x-25, y+15, 50, 5, "black")

creation_image(1000, 400, "#f0ffffff")
```
