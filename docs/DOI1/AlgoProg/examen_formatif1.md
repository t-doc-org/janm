---
orphan: true
---

<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

# Examen formatif
## Question 1 - Tableau d'état
Pas ici ! Répondez sur l'interface de Exam.net

## Question 2 - Correction de code

Le code suivant comporte de nombreuses erreurs. Corrigez les afin que le programme s'exécute correctement et de manière logique.

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: c0b25ad7-62c5-42b7-97b8-115c7eaf03e7
distance en km = 210
vitesse = 87,5
temps = "distance en km" / "vitesse"
if temps => 2:
    print(Le trajet est long)
marque = int(input("De quelle marque est ta voiture ?"))
if marque == Audi or Mercedes or VW:
    print(C'est une bonne marque)

```

## Question 3 - Vente de courges
Comme Halloween approche, il est temps d'acheter des courges pour la décoration. Dans ce programme de vente, on demande à l'utilisateur combien de courges il veut acheter, et s'il veut des petites, moyennes, ou grandes courges. Finalement, le prix total à payer est calculé en fonction de ces valeurs, et est affiché.

Les prix de chaque type de courge sont les suivants :
 - 4CHF pour la taille "petit"
 - 7CHF pour la taille "moyen"
 - 10CHF pour la taille "gros"
 - N'importe quelle autre taille de courge prendrait par défaut le prix de 20CHF

Dans le cas où l'utilisateur entre soit un nombre de courges négatif ou supérieur à 100, alors le programme affiche "Impossible".

Des exemples d'utilisation sont donnés ci-dessous. Pour obtenir le maximum de points, veillez à utiliser les textes comme ci-dessous et à n'utiliser qu'une seule fois la fonction `print()`.

Exemples d'utilisation :
```{code-block} text
Nombre de courges : 3
Taille des courges : petit
Total : 12 CHF
>>>
Nombre de courges : 2
Taille des courges : blabla
Total : 40 CHF
>>>
Nombre de courges : -10
Taille des courges : petit
Impossible
```

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 3002c62f-e395-4aec-857c-615bf550b290
#Testez votre programme ici avant de le COPIER-COLLER dans Exam.net

```