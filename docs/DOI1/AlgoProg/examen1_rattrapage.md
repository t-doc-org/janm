---
orphan: true
---

<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

# Examen programmationn Python 1 - rattrapage
## Question 1 - Tableau d'état
Pas ici ! Répondez sur l'interface de Exam.net


## Question 2 - Vente de livres
Ecrivez un programme permettant de calculer le montant que vous pourrez obtenir en vendant vos vieux livres. Les romans se revendent pour 13CHF et les BDs pour 9CHF. Le programme demandera combien de BDs et de romans vous souhaitez vendre et affichera finalement le prix total de revente. Dans le cas où le montant de revente est supérieur ou égal à 100CHF, le programme affichera en plus `Vous êtes riche !`. Deux exemples d'exécution sont donnés ci-dessous. 

```{code-block} text
Combien de BDs souhaitez-vous vendre ? <-- [2]
Combien de romans souhaitez-vous vendre ? <--[1]
Le prix de revente est de 31 CHF
>>>
Combien de BDs souhaitez-vous vendre ? <-- [10]
Combien de romans souhaitez-vous vendre ? <--[1]
Le prix de revente est de 103 CHF
Vous êtes riche !
```

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 0070a5ed-7d72-4b32-bbce-474511de993e
#Ecrivez le programme de revente de livre ici
```
## Question 3 - Quiz

Ecrivez un programme de quiz suivant les instructions ci-dessous.

```{code-block} text
Demander à l'utilisateur s'il souhaite répondre à un quiz
Si l'utilisteur dit "oui" ou "ok"
    Poser la question "Qui a écrit Les Misérables ?"
    S'il a répondu "Victor Hugo"
        Afficher "Bonne réponse"
    Sinon
        Afficher "Mauvaise réponse"
Sinon
    Afficher "Pas de problème, au revoir"
```

**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 1f83f004-a9d5-4884-a275-d4df72f6578f
#Ecriver le programme de quiz ici
```
## Question 4 - Coupe de bois
Dans la forêt à côté de STX, une coupe de bois a été organisée. Chaque arbre coupé peut être revendu pour un certain prix. Plus particulièrement, un sapin peut être revendu pour 50CHF par mètre, et un frêne pour 80CHF par mètre. Pour aider les bûcherons à calculer le prix de vente, écrivez un programme demandant à l'utilisateur le type l'arbre ainsi que sa hauteur en mètre et affichant le prix de cet arbre. Si le type n'est pas correct, ou la hauteur négative, le programme affiche `ERREUR`. Des exemples d'utilisation sont donnés ci-dessous
```{code-block} text
Entrez le type d'arbre : sapin
Entrez la hauteur de l'arbre : 10.5
Le prix de cet arbre est de 525CHF

Entrez le type d'arbre : épicéa
Entrez la hauteur de l'arbre : -3
ERREUR
```
**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 5d07cfd4-0c1e-43fa-b368-4a79077dc50d
#Ecrivez le programme de coupe de bois ici

```

## Question 5 - Prix du cinéma
Ecrivez un programme demandant à l'utilisateur son âge et son métier et affichant le prix que lui coûtera une entrée au cinéma.

Le prix de base d'un billet est de 18CHF

- Les personnes de 65 ans et plus reçoivent une réduction de 20%
- Les `étudiant` et `étudiante` reçoivent une réduction de 10CHF
- Les `fonctionnaire` de moins de 30 ans reçoivent une réduction de 15%

Pour obtenir le maximum des points, veillez à n'utiliser qu'une seule fois la fonction `print`

3 exemples d'exécution sont donnés ci-dessous :

```{code-block} text
Quel âge avez-vous ? <--- [32]
Quel est votre métier ? <--- [fonctionnaire]
Le billet coûte : 18 CHF
>>>
Quel âge avez-vous ? <--- [15]
Quel est votre métier ? <--- [étudiante]
Le billet coûte : 8 CHF
>>>
Quel âge avez-vous ? <--- [65]
Quel est votre métier ? <--- [retraité]
Le billet coûte : 14.4 CHF
```


**N'oubliez pas de copier-coller ce code dans la question Exam.net**
```{exec} python
:editor: 5a845998-4801-45c3-80fd-8aac18c0959d
#Ecrivez le programme de prix d'entrée ici

```