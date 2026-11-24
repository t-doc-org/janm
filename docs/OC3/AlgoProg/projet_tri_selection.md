<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

<script src="../../_static/tri-algos.js"></script>
<link rel="stylesheet" href="../../_static/tri-algos.css">

# Partie 2 : le tri par sélection

Les parties 2 à 5 présentent quatre algorithmes de tri, un par page. Pour chacun d'eux :

1. regardez la vidéo ;
2. observez l'algorithme dans la démonstration, étape par étape ou en lecture automatique ;
3. faites l'exemple à la main, dans l'exercice interactif ;
4. répondez aux questions.

Vous programmerez ensuite vous-mêmes les deux premiers, le tri par sélection et le tri par insertion, à la fin de leur page. Le code des deux autres, le tri fusion et le tri rapide, vous sera fourni dans la [partie 6](projet_mesures.md).

Les démonstrations comptent les comparaisons et les échanges effectués. Sous chacune d'elles, vous pouvez choisir la taille de la liste et son type (aléatoire, presque triée, triée à l'envers ou déjà triée), puis tirer une nouvelle liste : servez-vous-en pour répondre aux questions.

## Vidéo
```{youtube} 8u3Yq-5DTN8
```

## Démonstration
<div class="tri-visu" data-algo="selection" data-liste="7 3 9 1 5 8 2 6"></div>

### Exemple pas à pas
Le tableau ci-dessous résume le tri de la liste `[7, 3, 9, 1, 5]`. La partie déjà triée est en gras.

| Passage | Partie non triée | Minimum | Échange | Liste après le passage |
| :-----: | :--------------- | :-----: | :------ | :--------------------- |
| `i = 0` | `[7, 3, 9, 1, 5]` | `1` | `1` et `7` | [**1**, 3, 9, 7, 5] |
| `i = 1` | `[3, 9, 7, 5]` | `3` | aucun, il est déjà à sa place | [**1**, **3**, 9, 7, 5] |
| `i = 2` | `[9, 7, 5]` | `5` | `5` et `9` | [**1**, **3**, **5**, 7, 9] |
| `i = 3` | `[7, 9]` | `7` | aucun, il est déjà à sa place | [**1**, **3**, **5**, **7**, **9**] |

## Exemple à la main
Triez la liste ci-dessous en suivant **exactement** le tri par sélection. Sélectionnez deux éléments en cliquant dessus, puis choisissez l'opération : chaque comparaison et chaque échange doivent être faits dans le bon ordre.

<div class="tri-exo" data-algo="selection" data-liste="5 2 8 1 6"></div>

## Questions

### Question {num1}`question-tri:q-selection-trace`
Triez à la main la liste `[8, 3, 6, 1, 5, 2]` avec le tri par sélection. Présentez votre réponse dans un tableau comme celui de l'exemple, avec, pour chaque passage, le minimum trouvé, l'échange effectué et la liste obtenue.

### Question {num1}`question-tri:q-selection-complexite`
1. Dans la démonstration, triez des listes aléatoires de 8, de 16, puis de 32 éléments, et relevez à chaque fois le nombre de comparaisons. Recommencez avec des listes déjà triées. Que constatez-vous ?
2. Pour une liste de $n$ éléments, combien de comparaisons le premier passage effectue-t-il ? Et le deuxième ? Et le dernier ? Déduisez-en le nombre total de comparaisons en fonction de $n$, et vérifiez votre formule avec les nombres relevés au point 1.
3. Quelle est la complexité du tri par sélection ? Combien d'échanges effectue-t-il au maximum ?

```{tip}
Au point 2, vous obtenez une somme du type $1 + 2 + 3 + \ldots$, qu'il est inutile d'additionner
terme à terme : il existe une formule pour la somme des premiers entiers. Vous la trouverez, avec
d'autres sommes célèbres, sur la page [Calcul de sommation](https://www.dcode.fr/calcul-sommation)
du site dCode. La page [Nombre triangulaire](https://fr.wikipedia.org/wiki/Nombre_triangulaire)
de Wikipédia explique avec un dessin pourquoi cette formule est vraie. Attention : vérifiez bien
quel est le **dernier** terme de votre somme avant d'appliquer la formule !
```

## Programmer le tri par sélection
Il est temps de programmer le tri par sélection en Python. Le code s'écrit désormais **sur votre ordinateur**, et plus dans le navigateur : seuls les exemples de cette page peuvent encore être exécutés directement ici.

### Description de l'algorithme
Imaginez que vous deviez ranger les élèves d'une classe par taille, du plus petit au plus grand. Une méthode naturelle consiste à chercher le plus petit élève et à le placer au début de la rangée, puis à chercher le plus petit parmi ceux qui restent et à le placer en deuxième position, et ainsi de suite. C'est exactement le principe du *tri par sélection* : à chaque étape, on **sélectionne** le minimum de la partie non triée, et on l'**échange** avec le premier élément de cette partie.

```{code-block} text
:linenos:
Pour chaque position i, de la première à l'avant-dernière :
    Chercher la position du minimum parmi les éléments de la position i jusqu'à la fin
    Échanger ce minimum avec l'élément de la position i
```

Après le premier passage, le plus petit élément est à sa place définitive au début de la liste. Après le deuxième passage, les deux plus petits sont à leur place, etc. Le dernier élément n'a pas besoin d'être traité : quand tous les autres sont à leur place, il l'est forcément aussi.

### Mise en place
1. Installez un éditeur Python sur votre ordinateur, si ce n'est pas déjà fait. Le plus simple est [Thonny](https://thonny.org), qui installe Python en même temps. Visual Studio Code, avec son extension *Python*, convient aussi.
2. Créez un dossier `projet_tris`, idéalement sur OneDrive, qui contiendra les fichiers du projet.
3. Dans ce dossier, créez un fichier `tris.py` et copiez-y le code ci-dessous. La fonction `tri_selection` reçoit une liste, la trie sur place, puis la retourne. Pour l'instant, elle ne fait encore rien d'utile : à vous de la compléter !

    ```{code-block} python
    :linenos:
    # Projet : algorithmes de tri
    # Groupe : (vos noms)

    def tri_selection(liste):
        # À compléter
        return liste

    # Vérification
    print(tri_selection([7, 3, 9, 1, 5, 8, 2, 6]))
    ```

### Les outils nécessaires
Pour programmer les tris, il faut savoir **modifier** un élément d'une liste. Pour cela, on affecte une nouvelle valeur à l'élément, désigné par son index.

```{exec} python
:linenos:
scores = [10, 25, 7]
scores[2] = 30               # remplace le 7 par 30
scores[0] = scores[0] + 5    # ajoute 5 au premier score
print(scores)
```

Pour **échanger** deux éléments, il ne suffit pas d'écrire `liste[i] = liste[j]` puis `liste[j] = liste[i]` : la première affectation écrase la valeur de `liste[i]`, qui est alors perdue. Il faut d'abord la sauvegarder dans une variable temporaire.

```{exec} python
:linenos:
lettres = ["A", "B", "C", "D"]
temp = lettres[0]
lettres[0] = lettres[3]
lettres[3] = temp
print(lettres)
```

Enfin, une fonction peut recevoir une liste en paramètre et la **modifier directement**. Dans ce cas, la modification reste visible après l'appel : c'est ce que font le tri par sélection, le tri par insertion et le tri rapide, qui trient la liste *sur place*.

```{exec} python
:linenos:
def bonus(notes):
    notes[0] = notes[0] + 0.5

mes_notes = [4.5, 5, 3.5]
bonus(mes_notes)
print(mes_notes)
```

```{important}
- `liste[i] = valeur` remplace l'élément d'index `i`.
- Pour échanger deux éléments, on passe par une variable temporaire.
- Une fonction qui modifie une liste reçue en paramètre la modifie **pour tout le programme**.
```

### Le code
Complétez la fonction `tri_selection(liste)` dans `tris.py`, en suivant la description de l'algorithme ci-dessus. Exécutez `tris.py` pour la vérifier : la ligne affichée doit être la liste triée.

```{admonition} Indices
:class: tip dropdown
- Il faut deux boucles imbriquées. La boucle extérieure parcourt les positions `i` à remplir,
  de `0` à `n - 2`. La boucle intérieure cherche le minimum parmi les éléments des positions `i`
  à `n - 1`.
- Mémorisez la **position** du minimum, et non sa valeur : c'est elle dont vous avez besoin pour
  faire l'échange. Partez du principe que le minimum est en position `i`, puis comparez-lui chacun
  des éléments suivants.
```

### Question {num1}`question-tri:q-code-selection`
Vérifiez votre fonction sur des listes variées, en ajoutant des appels à la fin de `tris.py`. Pensez aux cas particuliers, qui sont souvent ceux où un programme se trompe : une liste vide, une liste d'un seul élément, une liste déjà triée, une liste triée à l'envers, une liste qui contient des doublons... Par exemple :

```{code-block} python
print(tri_selection([5, 3, 5, 1, 3, 5]))    # doublons : [1, 3, 3, 5, 5, 5]
print(tri_selection([]))                    # liste vide : []
print(tri_selection([6, 5, 4, 3, 2, 1]))    # triée à l'envers : [1, 2, 3, 4, 5, 6]
```

Lorsque votre fonction est correcte, ajoutez-y des commentaires pour expliquer ses étapes importantes.

```{admonition} Pour le rapport
:class: note
- **Questions {numref}`%s <question-tri:q-selection-trace>` et {numref}`%s <question-tri:q-selection-complexite>`** :
  le tableau et les réponses, avec les nombres relevés dans la démonstration et vos explications.
- **Question {numref}`%s <question-tri:q-code-selection>`** : le code de votre fonction
  `tri_selection`, commenté.
```
