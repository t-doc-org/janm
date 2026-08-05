% Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
% SPDX-License-Identifier: CC-BY-NC-SA-4.0
%
% Examen fictif de démonstration pour le serveur d'examens (t-doc/exam-server).
% - Sur le site public (GitHub Pages), cette page est une page d'entraînement.
% - Servie par le serveur d'examens, elle devient un vrai examen : sauvegarde
%   continue, blocage en cas de perte de focus, bouton de remise.
%
% Les vrais examens ne doivent PAS être commités : placez leurs sources dans
% exam-server/exams/<id>/src/, elles seront copiées temporairement dans
% docs/_exam/<id>/ (ignoré par git/hg) lors de la construction.

```{metadata}
orphan: true
subject: Informatique
hide: [navbar, primary-sidebar, secondary-sidebar, prev-next, footer]
scripts:
  - src: exam.js
    type: module
styles:
  - exam.css
```

# Examen de démonstration

Répondez directement sur cette page. Vos réponses sont **sauvegardées
automatiquement** toutes les 15 secondes. À la fin, cliquez sur **« Rendre
l'examen »** dans la barre bleue en haut de la page.

```{important}
Ne quittez pas cette page pendant l'examen (changement d'onglet, autre
fenêtre, ...) : l'examen serait **bloqué** et vous devriez appeler
l'enseignant pour continuer.
```

## Question 1 — Programmation *(6 points)*

% grille:
% Parcours de la liste avec une boucle : 2
% Comptage correct des serpents et lézards : 3
% Affichage du résultat : 1

Le code ci-dessous permet de récupérer la liste des noms des animaux d'un
refuge. Complétez le programme afin d'afficher **le nombre de reptiles**
(serpents et lézards) présents dans ce refuge. Vous pouvez exécuter votre code
autant de fois que nécessaire.

```{exec} python
:name: exam-animaux
:class: hidden
import random


def execute_sql(request):
    serpents = ["serpent"] * 2
    lezards = ["lézard"] * 6
    autres = ["chien", "chat", "lapin", "furet", "cochon d'inde",
              "perroquet", "canari", "hamster", "rat"] * 10
    animaux_refuge = serpents + lezards + autres
    random.shuffle(animaux_refuge)
    return animaux_refuge
```

```{exec} python
:editor: 8bf08a7e-7f75-42db-8251-648e5684ab00
:after: exam-animaux
animaux = execute_sql("SELECT nom FROM Animal")

```

## Question 2 — Fonctions *(4 points)*

% grille:
% Définition correcte de la fonction (paramètres, return) : 2
% Calcul du prix selon la couleur : 1
% Appels et affichage du total : 1

Définissez une fonction `prix_tissu(surface, couleur)` qui retourne le prix
d'un tissu : 15 CHF par m² pour un tissu bleu, 10 CHF par m² pour les autres
couleurs. Utilisez ensuite cette fonction pour afficher le prix total d'un
tissu rouge de 4 m² et d'un tissu bleu de 10 m².

```{exec} python
:editor: fb6bb87e-5f2c-486a-810a-8372d5fba7d4

```

## Question 3 — Choix multiple *(2 points)*

% grille:
% Longueur de la tranche : 1 | qcm q3-longueur-slice = b
% Affirmations sur les listes : 1 | qcm q3b-listes = mutable, append ; per-option

Que vaut l'expression Python `len("bonjour"[2:5])` ?

```{raw} html
<ul class="tdoc-exam-choices">
  <li><label><input type="radio" name="q3" value="a"
    data-exam-id="q3-longueur-slice"> a) 2</label></li>
  <li><label><input type="radio" name="q3" value="b"
    data-exam-id="q3-longueur-slice"> b) 3</label></li>
  <li><label><input type="radio" name="q3" value="c"
    data-exam-id="q3-longueur-slice"> c) 5</label></li>
  <li><label><input type="radio" name="q3" value="d"
    data-exam-id="q3-longueur-slice"> d) 7</label></li>
</ul>
```

Parmi les affirmations suivantes sur les listes Python, lesquelles sont
vraies ? *(plusieurs réponses possibles)*

```{raw} html
<ul class="tdoc-exam-choices">
  <li><label><input type="checkbox" name="q3b" value="mutable"
    data-exam-id="q3b-listes"> Une liste est modifiable (mutable)</label></li>
  <li><label><input type="checkbox" name="q3b" value="homogene"
    data-exam-id="q3b-listes"> Tous les éléments doivent être du même
    type</label></li>
  <li><label><input type="checkbox" name="q3b" value="append"
    data-exam-id="q3b-listes"> <code>append()</code> ajoute un élément à la
    fin</label></li>
  <li><label><input type="checkbox" name="q3b" value="index1"
    data-exam-id="q3b-listes"> Le premier élément a l'indice 1</label></li>
</ul>
```

## Question 4 — Question ouverte *(3 points)*

% grille:
% Différence for/while expliquée : 1.5
% Exemples de situations pertinents : 1.5

Expliquez, avec vos propres mots, la différence entre une **boucle `for`** et
une **boucle `while`**, et donnez un exemple de situation où chacune est
préférable.

```{raw} html
<textarea data-exam-id="q4-boucles" rows="8"
  placeholder="Rédigez votre réponse ici..."></textarea>
```

## Fin de l'examen

Relisez vos réponses, puis cliquez sur **« Rendre l'examen »** dans la barre
en haut de la page.
