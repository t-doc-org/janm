---
orphan: true
---

<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

# Examen programmationn Python 2 - rattrapage
## Question 1 - Tableau d'état
Pas ici ! Répondez sur l'interface de Exam.net


## Question 2 - Exécution de fonctions
Pas ici ! Répondez sur l'interface de Exam.net


## Question 3 - Quiz noté
Ecrivez un programme dans lequel une question de votre choix est posée à l'utilisateur, puis où celui-ci a plusieurs essais pour trouver la bonne réponse. Quand il trouve la bonne réponse, un des messages suivant est affiché :

 - `Excellent` si l'utilisateur a trouvé la bonne réponse du 1er coup.
 - `Bravo` si l'utilisateur a trouvé la bonne réponse entre le 2ème et le 4ème essai.
 - `Bravo, mais c'était difficile !` si la bonne réponse a été trouvée au 5ème essai
 - Dans le cas où l'utilisateur ne trouve la bonne réponse qu'après plus de 5 essais, le texte `ça ne compte pas` est affiché

Exemples d'exécution :
```{code-block} text
>>>
Combien il y a-t-il de cantons en Suisse ?10
Faux !
Combien il y a-t-il de cantons en Suisse ?32
Faux !
Combien il y a-t-il de cantons en Suisse ?26
Bravo !

>>>

Combien il y a-t-il de cantons en Suisse ?26
Excellent

>>>

Combien il y a-t-il de cantons en Suisse ?10
Faux !
Combien il y a-t-il de cantons en Suisse ?32
Faux !
Combien il y a-t-il de cantons en Suisse ?2
Faux
Combien il y a-t-il de cantons en Suisse ?21
Faux !
Combien il y a-t-il de cantons en Suisse ?25
Bravo, mais c'était difficile
```
**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 019c0ee6-89b9-78ed-be86-071e58d2cdcb
#Ecrivez le programme de quiz ici

```

## Question 4 - Salaire des TechDucks
a) Dans le collège STX d'un univers parallèle, les TechDucks sont payés différemment en fonction de leur année scolaire et de leur âge. Définissez une fonction nommée `affiche_salaire_techduck` prenant ces deux valeurs en paramètres. Cette fonction affiche ensuite le salaire d'un TechDuck en appliquant la logique suivante :

 - Dans tous les cas, les élèves de 1ère année sont payés 20CHF de l'heure
 - Les élèves de 2ème et 3ème année sont payés 22CHF de l'heure 
 - Pour les élèves de 4ème année :
   - S'ils ont moins de 19 ans, ils sont payés 25CHF de l'heure
   - S'ils ont 19 ou 20 ans, ils sont payés 26CHF de l'heure
   - S'ils ont plus de 20 ans, ils sont payés 27CHF de l'heure

b) Utilisez cette fonction pour afficher le salaire d'un TechDuck en 2ème année, ayant 17 ans et celui d'une élève de 4ème année ayant 20 ans.

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 019c0ecd-de54-733e-b74b-d5de56a2f9b6
#Ecrivez le programme de salaire ici

```

## Question 5 - Moyennes
Le programme ci-dessous est sensé demander des notes à l'utilisateurs afin de calculer sa moyenne. Tant que l'utilisateur entre des notes positives, le programme continuera de demander d'autres notes à inclure dans la moyenne. Mais dès que l'utilisateur entre une note négative, alors le programme s'arrête et affichera la moyenne des notes précédentes.

Ce programme comporte toutefois 5 erreurs. Trouvez ces 5 erreurs, corrigez les, et copiez/collez le programme correct dans l'interface exam.net.

**N'oubliez pas de copier-coller ce code (une fois corrigé) dans la question Exam.net**
```{exec} python
:editor: 019c0ed9-2d24-7941-9928-37c06c93a98f
somme_des_notes = 0
nombre_de_notes = 0
while note > 0:
    note = input("Entrez une note svp")
    somme_des_notes + note
    nombre_de_notes + 1
moyenne = somme_des_notes/nombre_de_notes
print("Votre moyenne est" moyenne)
```