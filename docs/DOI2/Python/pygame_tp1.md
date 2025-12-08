```{metadata}
exec:
  python:
    packages: [numpy, pygame-ce]
    files:
      orange.png:
      basket.png:
      roger.png:
      banana.png:
      strawberry.png:
      dirt.png:
      bird.png:
      tuyau_haut.png:
      tuyau_bas.png:

versions:
  pyodide: 0.27.7
```


```{exec} python
:name: setup
:when: never
:class: hidden
import io
with redirect(stdout=io.StringIO()):
    import tdoc.pygame
setup_canvas()
```

```{exec} python
:name: pygame_start
:when: never
:class: hidden
:include: code/pygame_start.py
```



```{defaults} exec
:after: setup pygame_start
:style: max-height: 25rem;
```



```{exec} python
:name: pygame_end
:when: never
:class: hidden

try:
    await main()
finally:
    pygame.quit()
```


```{exec} python
:name: catch_fruit
:when: never
:include: code/catch_fruit.py
:class: hidden

```

# Pygame - TP 1

```{image} images/flappybirdheader.png
:width: 100%
:alt: Logo Pygame
:align: center
```
## Introduction

Flappy Bird est un jeu vidéo mobile développé en 2013 au Vietnam par Hà Đông Nguyễn . Malgré son gameplay et son apparence très simple, ce jeu se hissera, en janvier 2014, à la première place des téléchargements de l'App Store et du Play Store. Grâce aux publicités intégrées, le développeur touchait jusqu'à 50'000$ par jour. De nombreuses controverses ont entouré Flappy Bird, notamment des accusations de plagiat avec ses tuyaux ressemblant étrangements à ceux des jeux *Super Mario Bros*. Hà Đông finit même par déclarer sur Twitter que ce jeu lui avait "ruiné sa vie". 

Le but de ce TP sera de s'approprier les concepts de Pygame en redéveloppant notre propre version de Flappy Bird. Pour bien comprendre le concept de ce jeu, vous pouvez vous rendre sur [flappybird.io](https://flappybird.io/) pour en faire 2-3 parties.

Vous disposez des 3 images ci-dessous pour votre développement.

````{list-grid}
:style: grid-template-columns: 1fr 1fr 1fr; text-align:center;

- ```{figure} images/bird.png
  :alt: Oiseau
  :align: center
  :width: 20%

  Oiseau (bird.png)
  ```

- ```{figure} images/tuyau_haut.png
  :alt: Tuyau haut
  :align: center
  :width: 20%

  Tuyau du haut (tuyau_haut.png)
  ```

- ```{figure} images/tuyau_bas.png
  :alt: Tuyau bas
  :align: center
  :width: 20%

  Tuyau du bas (tuyau_bas.png)
  ```
````

## Objectifs et rendu
Pour terminer ce TP vous devez :

1. Suivre les étapes 1-10 ci-dessous afin d'obtenir une première version jouable
2. Effectuer l'étape *Personnalisation* afin d'ajouter au moins un élément spécial au jeu
3. A la fin du TP, **dans tous les cas**, déposer votre code final du Flappy Bird [ici](https://exam.net/student?code=CPSZMH).


Ces rendus comptent à faible coefficient dans votre moyenne d'informatique. Il est donc impératif que votre code soit votre propre production. Cela signifie que vous ne pouvez pas rendre un code pareil à celui d'un collègue, et que l'utilisation de l'IA est strictement interdite. Si vous utilisez des notions de Python autres que celles vues en cours, vous devez m'en informer avant le rendu. Tout manquement à ces règles entraine automatiquement la note de 1.

## Création du jeu Flappy Bird
````{tab-set}
:sync-group: etape
```{tab-item} 1
:sync: etape1
Ajoutez et dessinez l'acteur Flappy Bird en haut à gauche de l'écran avec l'image `bird.png`.
```
```{tab-item}  2
:sync: etape2
 - Avant la boucle `while True`, définissez une nouvelle variable `vitesse` qui déterminera la vitesse verticale de l'oiseau. Si celle-ci est positive, alors l'oiseau tombera, si elle est négative, alors l'oiseau montera. Au début, la vitesse devrait être de `1`.
 - Définissez une variable `VITESSE_MAX` qui déterminera la vitesse maximale à laquelle l'oiseau peut tomber. Vous ajusterez cette valeur par la suite, mais vous pouvez y mettre `4` pour commencer.
 - Définissez une variable `ACCELERATION` qui déterminera l'accélération de l'oiseau vers la Terre. Pour commencer, mettez-y la valeur `0.05`.
 - Définissez une variable `VITESSE_SAUT` qui déterminera la vitesse à laquelle l'oiseau "sautera" quand on appuiera sur une touche. Comme un saut fait monter l'oiseau, cette valeur doit être négative. Par exemple `-3`.
```
```{tab-item}   3
:sync: etape3
Complétez la boucle de jeu de sorte que l'oiseau tombe constamment vers le bas en fonction de la variable `vitesse`. Vous pouvez utiliser pour cela la fonction `move()`.
```
```{tab-item}   4
:sync: etape4
A chaque tour de boucle de jeu, si la `vitesse` de l'oiseau est plus petite que la `VITESSE_MAX`, augmentez la valeur de `VITESSE` avec l' `ACCELERATION`. Même si cela est peu visible, vous devriez voir votre oiseau tomber de plus en plus vite vers le bas.
```
```{tab-item}   5
:sync: etape5
 - Afin de faire "sauter" l'oiseau, commencez par ajouter la ligne de code `touches_pressées = get_pressed_keys()` à votre boucle de jeu. Vous récupérez ainsi la liste des touches pressées par le joueur
 - Avec un `if ... in ...`, contrôlez si l'utilisateur a appuyé sur la touche de saut. Vous pouvez choisir n'importe quelle touche du clavier, ou le clic gauche de la souris (`"MOUSE_1"`).
 - Si cette condition est respectée, la `vitesse` doit prendre la valeur de la variable `VITESSE_SAUT`

 Testez votre programme et ajustez les valeurs des 3 variables constantes (en majuscules) afin que l'effet de saut et de gravité vous convienne.
```
```{tab-item}   6
:sync: etape6
Nous allons maintenant faire apparaître des tuyaux toutes les 3 secondes. Pour cela, nous aurons besoin d'un *Timer* qui comptera le temps et permettra de déterminer le moment d'apparition des tuyaux.

- Pour créer un nouveau Timer de 3 secondes, écrivez la ligne suivante **avant** la boucle de jeu : `timer_tuyaux = Timer(3)`
- Afin d'instantanément démarrer ce Timer, faites suivre cette ligne de `timer_tuyaux.start()`.
- Dans la boucle de jeu, ajoutez un `print(timer_tuyaux)` afin de vérifier que vous avez bel et bien un Timer qui commence à 3s et termine à 0s.

Si le Timer s'affiche correctement, vous pouvez retirer le `print()`
```
```{tab-item}   7
:sync: etape7
 - Vous pouvez contrôler si le `timer_tuyaux` est terminé (c'est-à-dire est arrivé à 0.00s) avec `if timer_tuyaux.is_finished():`
 - Ajoutez cette condition dans la boucle de jeu. Lorsqu'elle est respectée, faites un `print("Nouveaux tuyaux")` et redémarrez le Timer avec la méthode `start()` utilisée précédemment.
 - Vous devriez alors voir le texte `Nouveaux tuyaux` apparaître toutes les 5 secondes.
```
```{tab-item}   8
:sync: etape8
Il faut maintenant retirer ce `print()` et faire véritablement apparaître les tuyaux. Nous n'allons pas créer une variable individuelle pour chaque tuyau, mais allons les stocker dans une liste. Pour cela :
 - Avant la boucle de jeu, créez une liste vide
 - Quand le timer est terminé, créez 2 nouveau acteurs : un `tuyau_haut` et un `tuyau_bas` avec les images adéquates. Pour le tuyau du haut, vous pouvez utiliser `tuyau_haut = Actor("tuyau_haut.png", 500, -100)`. Vous pouvez adapter cet exemple pour le tuyau du bas.
 - Ajoutez ces 2 tuyaux à la liste avec `append()`
 - Pour que les tuyaux apparaissent, il faut les *draw*. Vous pouvez le faire dans la boucle de jeu avec la logique *Pour chaque tuyau dans la liste : dessiner le tuyau*.


5 secondes après le lancement, vous devriez voir une paire de tuyau apparaître.
```
```{tab-item}   9
:sync: etape9
 Les tuyaux doivent se déplacer constamment vers la gauche.
 - Dans la boucle de jeu, ajoutez la logique suivante : *Pour chaque tuyau dans la liste : move le tuyau vers la gauche*. Vous devriez alors voir des tuyaux apparaître toutes les 5 secondes et se déplacer sans arrêt vers la gauche.
 - Quand un tuyau sort de l'écran à gauche, alors il doit être retiré de la liste. La logique est donc : *Pour chaque tuyau dans la liste : si la position horizontale du tuyau est inférieure à -100, alors retirer ce tuyau de la liste. Notez que si `tuyau` est un acteur, alors `tuyau.get_x()` permet d'accéder à sa position horizontale. Utilisez `remove()` pour retirer un élément d'une liste.
  - Modifiez la position initiale d'apparition des tuyaux pour qu'ils débutent en dehors de l'écran, à sa droite.

L'apparition et disparition des tuyaux devrait maintenant être parfaitement implémentée !
```
```{tab-item}   10
:sync: etape10
Le jeu doit maintenant s'arrêter lorsque Flappy Bird entre en collision avec un tuyau.
 - Créez une nouvelle variable `gameover = False` avant la boucle de jeu
 - Dans la boucle de jeu, ajoutez la logique suivante : *Pour chaque tuyau de la liste, si le Flappy Bird entre en collision avec ce tuyau, alors gameover devient True*
 - Ajoutez un ou plusieurs `if gameover == False:` dans votre programme de sorte à ce que l'apparition de tuyaux, leur mouvement, ainsi que le mouvement de l'oiseau n'aient plus lieu quand on perd.
```

```{tab-item}  Personnalisation
:sync: perso
A ce stade, le jeu est déjà jouable. Cependant, afin qu'il soit vraiment intéressant, certains éléments manquent. Choisissez des améliorations dans la liste ci-dessous et implémentez-en au moins une.

 - Les tuyaux n'apparaissent pas tous à la même hauteur, mais avec un décalage aléatoire en utilisant `randint()`
 - Un texte de gameover s'affiche quand on perd
 - Ce même texte de gameover contient un score correspondant au nombre de paires de tuyaux que l'on a esquivé
 - Appuyer sur une touche quand on a perdu permet de redémarrer le jeu
 - Le jeu ne démarre pas instantanément, mais seulement lorsqu'on appuie sur une touche
```
````


```{exec} python main
:then: pygame_end
:editor: sdads
async def main():
  while True:
    await refresh((112, 196, 209))
```


