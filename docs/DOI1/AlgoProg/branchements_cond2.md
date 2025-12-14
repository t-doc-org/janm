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


# Examen de programmationn Python 2
## Question 1 - Tableau d'état
Pas ici ! Répondez sur l'interface de Exam.net


## Question 2 - Exécution de fonctions
Pas ici ! Répondez sur l'interface de Exam.net

## Question 3 - Nombres aléatoires
Pas ici ! Répondez sur l'interface de Exam.net

## Question 4 - Compter de X en X

Ecrivez un programme demandant à l'utilisateur deux nombre entiers :

 - Jusqu'à combien il veut compter
 - De combien en combien il veut compter

Le programme affichera ensuite le compte depuis 0 tel que demandé. Dans le cas où l'utilisateur entrerait une valeur inférieure à 1 pour au moins une de ces valeurs, le texte `Erreur` serait affiché.

Trois exemples d'exécutions sont donnés ci-dessous

```{code-block} text
Jusqu'à combien veux-tu compter ? <--- [10]
De combien en combien veux-tu compter ? <--- [2]
0
2
4
6
8
10
>>>>>>
Jusqu'à combien veux-tu compter ? <--- [100]
De combien en combien veux-tu compter ? <--- [25]
0
25
50
75
100
>>>>>>
Jusqu'à combien veux-tu compter ? <--- [5]
De combien en combien veux-tu compter ? <--- [0]
Erreur
```

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 019b1dec-03c9-7098-8b20-0d485502c703
:then: trap
#Ecrivez le programme ici
```

## Question 5 - Prix du carburant
Définissez une nouvelle fonction nommée `calcule_et_affiche_prix_carburant` prenant en paramètre un volume de carburant en litre, un type de carburant (SP95, SP98, ou Diesel), et un code de réduction. Complétez le corps de cette fonction sachant que 
 - 1L de SP95 coûte 1.66 CHF
 - 1L de SP98 coûte 1.76 CHF
 - 1L de Diesel coûte 1.8 CHF
 - Pour un volume négatif ou un type de carburant inconnu, le prix affiché serait de 0 CHF

Pour obtenir le maximum des points, n'utilisez qu'une seule fois la fonction `print()`

Utilisez ensuite 2 fois cette fonction pour calculer et afficher le prix de :
 - 45L de SP95
 - 20L de Diesel

 **N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 019b1dfd-bf50-7883-b0fa-4f09c09b3774
:then: trap
#Ecrivez le programme ici
```




## Question 6 - Des maisons
La fonction ci-dessous permet de dessiner une maison à différents endroits.

1. Appelez deux fois la fonction de sorte à dessiner deux maisons l'une à côté de l'autre.
2. Complétez le corps de la fonction avec un nouveau `rectangle` de sorte à ajouter une cheminée à ces maisons. La documentation de cette fonction est donnée en dessous du code. Ne vous préoccupez pas de la position exacte de la cheminée, celle-ci doit juste apparaître sur le flanc droite du toit, comme sur l'image ci-dessous.
3. Ajoutez un paramètre à `maison` de sorte à ce que la couleur de la façade des maisons soit personnalisable. Modifiez ensuite vos appels de sorte à avoir une maison dont la façade est `yellow` et l'autre `pink`.

```{image} images/maisons.png
:width: 30%
:align: center
```

 **N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:after: fonctions_dessin_svg
:then: rendu trap
:editor: 019b1dff-91c3-7259-abaf-fb0da088ba9c
def maison(x, y):
  rectangle(x, y, 150, 150, "gray", "black")
  triangle((x, y), (x+150, y), (x+75, y-100), "brown")

creation_image(600, 400, "#f0ffffff")

```
```{py:method} rectangle(x, y, largeur, hauteur, remplissage, bord="transparent")
:no-index:
Ajoute un rectangle sur l'image.
:arg x,y: L'origine du rectangle (sommet en haut à gauche).
:arg largeur,hauteur: Les dimensions du rectangle.
:arg remplissage: La couleur de remplissage du rectangle.
:arg bord: La couleur du bord du rectangle (par défaut transparent).
```