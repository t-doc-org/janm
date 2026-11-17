<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Partie 6 : mesurer et comparer

Dans les parties précédentes, vous avez déterminé la complexité des quatre tris en comptant leurs opérations. Il est temps de vérifier si la théorie se retrouve dans la pratique : dans cette partie, vous mesurez le **temps d'exécution** de vos tris sur des listes de plus en plus grandes, et vous représentez les résultats sur des graphiques.

Vos fonctions `tri_selection` et `tri_insertion` doivent fonctionner correctement avant de commencer cette partie : mesurer le temps d'exécution d'un tri faux n'aurait aucun sens !

## Installer matplotlib
Les graphiques sont tracés avec *matplotlib*, la bibliothèque de graphiques la plus utilisée en Python. Elle ne fait pas partie de Python lui-même et doit être installée :

- **Avec Thonny** : menu *Outils*, puis *Gérer les paquets...*. Cherchez `matplotlib`, puis cliquez sur *Installer*.
- **Avec Visual Studio Code** : ouvrez un terminal (menu *Terminal*, puis *Nouveau terminal*) et tapez la commande `pip install matplotlib` (ou `py -m pip install matplotlib` si la commande `pip` n'est pas reconnue).

Pour vérifier l'installation, exécutez le programme ci-dessous : il doit afficher le numéro de version de matplotlib, sans erreur.

```{code-block} python
import matplotlib
print(matplotlib.__version__)
```

## Mesurer un temps d'exécution
Le module `time` de Python contient une fonction `perf_counter()`, qui retourne la valeur d'un chronomètre très précis, en secondes. Pour mesurer la durée d'une partie d'un programme, on lit le chronomètre juste avant et juste après, et on calcule la différence.

```{code-block} python
:linenos:
import time

debut = time.perf_counter()
total = 0
for i in range(1000000):
    total = total + i
fin = time.perf_counter()

print("Durée :", fin - debut, "secondes")
```

Exécutez ce programme plusieurs fois sur votre ordinateur : la durée n'est jamais exactement la même ! Elle dépend aussi de ce que fait l'ordinateur au même moment (autres programmes, mises à jour, navigateur...). Pour obtenir des mesures fiables :

- on répète chaque mesure plusieurs fois, et on calcule la **moyenne** ;
- on ferme les programmes inutiles pendant les mesures, et on branche l'ordinateur portable sur le secteur.

```{warning}
Les tris par sélection, par insertion et rapide trient la liste **sur place**. Après une première
mesure, la liste est donc déjà triée, et une deuxième mesure sur la même liste ne mesurerait plus
du tout la même chose ! Il faut toujours trier une **copie** de la liste, obtenue avec
`liste.copy()`.
```

## Tracer un graphique avec matplotlib
Le programme ci-dessous trace un graphique avec deux courbes : les températures minimales et maximales d'une semaine (valeurs inventées pour l'exemple).

```{code-block} python
:linenos:
import matplotlib.pyplot as plt

jours = [1, 2, 3, 4, 5, 6, 7]
minimales = [2, 4, 3, 6, 7, 5, 3]
maximales = [9, 12, 11, 15, 17, 14, 10]

plt.plot(jours, minimales, marker="o", label="Température minimale")
plt.plot(jours, maximales, marker="o", label="Température maximale")
plt.title("Températures d'une semaine")
plt.xlabel("Jour")
plt.ylabel("Température (°C)")
plt.legend()
plt.grid(True)
plt.savefig("temperatures.png", dpi=150)
plt.show()
```

```{image} images/graphique_exemple.png
:width: 70%
:alt: Graphique avec deux courbes, les températures minimales et maximales sur sept jours, avec un titre, des axes nommés, une légende et une grille
:align: center
```

1. `import matplotlib.pyplot as plt` importe la partie de matplotlib qui sert à tracer des graphiques, sous le nom abrégé `plt`.
2. `plt.plot(x, y)` trace une courbe qui relie les points dont les abscisses sont dans la liste `x` et les ordonnées dans la liste `y`. Les deux listes doivent donc avoir la **même longueur**. Chaque appel à `plt.plot` ajoute une courbe au graphique.
3. `marker="o"` dessine un point à chaque mesure, et `label` donne le nom de la courbe, affiché dans la légende par `plt.legend()`.
4. `plt.title`, `plt.xlabel` et `plt.ylabel` ajoutent le titre du graphique et le nom des axes. N'oubliez pas les **unités** !
5. `plt.grid(True)` ajoute une grille, qui facilite la lecture des valeurs.
6. `plt.savefig("temperatures.png", dpi=150)` enregistre le graphique dans une image, dans le même dossier que le programme. Le paramètre `dpi` règle la résolution de l'image.
7. `plt.show()` affiche le graphique dans une fenêtre. Le programme est en pause tant que cette fenêtre est ouverte.

```{important}
- Appelez `plt.savefig` **avant** `plt.show` : une fois la fenêtre fermée, le graphique est
  effacé, et l'image enregistrée serait vide.
- Pour tracer plusieurs graphiques dans le même programme, commencez chaque nouveau graphique par
  `plt.figure()`. Sinon, les nouvelles courbes s'ajoutent au graphique précédent.
- Pour tracer une courbe en traitillés, ajoutez le paramètre `linestyle="--"` à `plt.plot`.
```

## Le programme de mesure
Le code ci-dessous contient le tri fusion et le tri rapide, déjà programmés, ainsi que les outils pour mesurer les temps d'exécution et tracer le graphique. Dans votre fichier `tris.py`, supprimez les lignes de vérification (les `print`) qui suivent vos deux fonctions, puis copiez ce code à la suite. Tel quel, il mesure le temps moyen du tri par sélection pour des listes aléatoires de 500 à 5000 éléments, puis trace la courbe correspondante.

```{code-block} python
:linenos:
# ---------- Tris fournis : ne pas modifier ----------

# Fusionne deux listes triées en une nouvelle liste triée
def fusion(gauche, droite):
    resultat = []
    i = 0
    j = 0
    while i < len(gauche) and j < len(droite):
        if gauche[i] <= droite[j]:
            resultat.append(gauche[i])
            i = i + 1
        else:
            resultat.append(droite[j])
            j = j + 1
    while i < len(gauche):
        resultat.append(gauche[i])
        i = i + 1
    while j < len(droite):
        resultat.append(droite[j])
        j = j + 1
    return resultat

# Retourne une nouvelle liste triée
def tri_fusion(liste):
    if len(liste) <= 1:
        return liste
    milieu = len(liste) // 2
    gauche = tri_fusion(liste[:milieu])    # trie la moitié gauche
    droite = tri_fusion(liste[milieu:])    # trie la moitié droite
    return fusion(gauche, droite)

# Partitionne la zone de debut à fin autour du pivot liste[fin],
# puis retourne la position finale du pivot
def partition(liste, debut, fin):
    pivot = liste[fin]
    i = debut
    for j in range(debut, fin):
        if liste[j] < pivot:
            if i != j:
                temp = liste[i]
                liste[i] = liste[j]
                liste[j] = temp
            i = i + 1
    if i != fin:
        temp = liste[i]
        liste[i] = liste[fin]
        liste[fin] = temp
    return i

# Trie sur place la zone de debut à fin
def tri_rapide_zone(liste, debut, fin):
    if debut < fin:
        p = partition(liste, debut, fin)
        tri_rapide_zone(liste, debut, p - 1)    # trie la zone des petits
        tri_rapide_zone(liste, p + 1, fin)      # trie la zone des grands

def tri_rapide(liste):
    tri_rapide_zone(liste, 0, len(liste) - 1)
    return liste

# ---------- Outils de mesure ----------

import time
from random import randint
import matplotlib.pyplot as plt

def liste_aleatoire(n):
    liste = []
    for i in range(n):
        liste.append(randint(1, 1000000))
    return liste

# Retourne le temps (en secondes) nécessaire pour trier une copie de la liste
def temps_tri(tri, liste):
    copie = liste.copy()
    debut = time.perf_counter()
    tri(copie)
    fin = time.perf_counter()
    return fin - debut

# Retourne le temps moyen (en secondes) pour trier plusieurs listes aléatoires de n éléments
def temps_moyen(tri, n, repetitions):
    total = 0
    for k in range(repetitions):
        total = total + temps_tri(tri, liste_aleatoire(n))
    return total / repetitions

# ---------- Mesures ----------

tailles = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
temps_selection = []
for n in tailles:
    t = temps_moyen(tri_selection, n, 3)
    temps_selection.append(t)
    print("Tri par sélection,", n, "éléments :", round(t, 4), "s")

# ---------- Graphique ----------

plt.plot(tailles, temps_selection, marker="o", label="Tri par sélection")
plt.title("Temps d'exécution des tris sur des listes aléatoires")
plt.xlabel("Taille de la liste (nombre d'éléments)")
plt.ylabel("Temps moyen (s)")
plt.legend()
plt.grid(True)
plt.savefig("graphique_aleatoires.png", dpi=150)
plt.show()
```

1. Le tri fusion et le tri rapide sont des fonctions *récursives* : `tri_fusion` et `tri_rapide_zone` s'appellent elles-mêmes pour trier des parties plus petites de la liste, exactement comme dans les arbres des appels des visualisations du [tri fusion](projet_tri_fusion.md) et du [tri rapide](projet_tri_rapide.md). Vous pouvez comparer leur code aux descriptions des parties 4 et 5, mais vous n'avez pas besoin de le comprendre en détail.
2. `temps_tri(tri, liste)` mesure le temps nécessaire pour trier une **copie** de la liste. Une fonction peut recevoir une autre fonction en paramètre, comme n'importe quelle valeur : `temps_tri` reçoit dans son paramètre `tri` la fonction de tri à mesurer, par exemple `tri_selection`, et l'appelle avec `tri(copie)`.
3. `temps_moyen(tri, n, repetitions)` trie plusieurs listes aléatoires différentes de `n` éléments, et retourne le temps moyen.
4. La boucle des mesures remplit la liste `temps_selection` : pour chaque taille de la liste `tailles`, elle contient le temps moyen correspondant. Les deux listes ont donc la même longueur, et peuvent être passées à `plt.plot`.

```{tip}
Les mesures prennent du temps : avec les quatre tris, le programme complet peut tourner une à deux
minutes. Pendant la mise au point de votre programme, travaillez avec moins de tailles et une seule
répétition, puis lancez les mesures définitives une fois que tout fonctionne.
```

## Les expériences
Complétez les parties « Mesures » et « Graphique » du programme pour réaliser les expériences ci-dessous. Chaque expérience produit un graphique, enregistré dans sa propre image. Pour les questions qui demandent des calculs, utilisez les valeurs affichées par le programme.

### Question {num1}`question-tri:q-quatre-tris`
Complétez le programme pour mesurer le temps moyen des **quatre** tris sur des listes aléatoires de 500 à 5000 éléments, et tracez les quatre courbes sur le même graphique. Décrivez la forme de chaque courbe. Classez les quatre tris du plus rapide au plus lent.

### Question {num1}`question-tri:q-doublement`
Pour chacun des quatre tris, calculez par combien le temps est multiplié lorsque la taille de la liste double : de 1000 à 2000 éléments, puis de 2000 à 4000 éléments. Présentez vos résultats dans un tableau. Ces rapports sont-ils cohérents avec la complexité de chaque tri, déterminée dans les parties 2 à 5 ? Justifiez en calculant le rapport attendu par la théorie.

### Question {num1}`question-tri:q-grandes-listes`
Sur le graphique précédent, les courbes du tri fusion et du tri rapide sont presque plates. Pour mieux les comparer, tracez un nouveau graphique avec le tri fusion et le tri rapide uniquement, pour des listes aléatoires de 10 000 à 100 000 éléments (par pas de 10 000). Ajoutez sur ce graphique une troisième courbe : celle de la fonction `sorted` de Python, que vous pouvez mesurer exactement comme vos propres tris, avec `temps_moyen(sorted, n, 3)`.

1. Lequel de vos deux tris est le plus rapide ? Est-ce cohérent avec les parties 4 et 5 ?
2. Combien de fois `sorted` est-elle plus rapide que votre tri le plus rapide, pour 100 000 éléments ?
3. Faites une petite recherche sur l'algorithme utilisé par `sorted`, appelé *Timsort*. Sur quels tris est-il basé ? Pourquoi est-il si rapide ? Indiquez vos sources.

### Question {num1}`question-tri:q-ordre-initial`
Le temps d'exécution d'un tri dépend-il de l'ordre initial des éléments ? Écrivez deux fonctions `liste_triee(n)` et `liste_inverse(n)`, qui retournent respectivement la liste `[1, 2, ..., n]` et la liste `[n, ..., 2, 1]`. Mesurez ensuite, pour des listes de 500 à 5000 éléments, le temps du tri par sélection et du tri par insertion sur des listes déjà triées, aléatoires et triées à l'envers, et tracez les six courbes sur un même graphique. Expliquez ce que vous observez à l'aide de vos réponses aux questions {numref}`%s <question-tri:q-selection-complexite>` et {numref}`%s <question-tri:q-insertion-cas>`.

### Question {num1}`question-tri:q-rapide-trie`
Mesurez le temps du tri rapide sur des listes **déjà triées** de 100 à 900 éléments (par pas de 100), et comparez-le, sur un même graphique, au temps du tri rapide sur des listes aléatoires de mêmes tailles. Expliquez ce que vous observez à l'aide de votre réponse à la {numref}`question %s <question-tri:q-rapide-pire>`.

```{note}
Ne dépassez pas 900 éléments. Sur une liste déjà triée, le tri rapide accumule un appel en attente
par élément dans la pile d'appels, et Python arrête le programme avec une erreur
`RecursionError` au-delà d'environ 1000 appels en attente.
```

### Question {num1}`question-tri:q-theorie`
Comparons enfin les mesures à la théorie. D'après la théorie, le temps du tri par sélection devrait être proportionnel à $n^2$, c'est-à-dire de la forme $c \cdot n^2$, où $c$ est un nombre qui dépend de l'ordinateur.

1. Calculez $c$ à partir de votre mesure pour 5000 éléments : $c = \frac{\text{temps pour 5000 éléments}}{5000^2}$.
2. Sur un nouveau graphique, tracez la courbe des temps mesurés du tri par sélection, et, en traitillés, la courbe théorique $c \cdot n^2$ pour les mêmes tailles. Les deux courbes se superposent-elles ?
3. Faites de même pour le tri fusion, avec les mesures de la {numref}`question %s <question-tri:q-grandes-listes>` et une courbe théorique de la forme $c \cdot n \cdot \log_2(n)$. La fonction `log2` s'importe avec `from math import log2`.

## Synthèse

### Question {num1}`question-tri:q-synthese`
À l'aide de vos réponses aux parties 2 à 5 et de vos mesures, recopiez et complétez le tableau suivant. Pour chaque tri, indiquez sa complexité dans le meilleur cas, en moyenne (sur une liste aléatoire) et dans le pire cas, en précisant à chaque fois quel type de liste correspond au meilleur et au pire cas. Dans la dernière colonne, indiquez si le tri travaille directement dans la liste d'origine (sur place) ou s'il crée de nouvelles listes.

| Tri | Meilleur cas | Cas moyen | Pire cas | Sur place ? |
| :-- | :----------: | :-------: | :------: | :---------: |
| Sélection | | | | |
| Insertion | | | | |
| Fusion | | | | |
| Rapide | | | | |

```{admonition} Pour le rapport
:class: note
- **Questions {numref}`%s <question-tri:q-quatre-tris>` à {numref}`%s <question-tri:q-theorie>`** :
  les graphiques, chacun accompagné de sa description, ainsi que les tableaux, les calculs et les
  réponses aux questions.
- **Question {numref}`%s <question-tri:q-synthese>`** : le tableau récapitulatif complété.
- Pour finir, rédigez la conclusion du rapport, comme décrit dans la
  [présentation du projet](projet_tri.md).
```
