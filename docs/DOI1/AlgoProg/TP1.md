<!-- Copyright 2024 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# TP de programmation

## Introduction
Entre les vacances d'automne et les vacances de Noël, vous participerez à 4 séances de TP durant lesquelles vous développerez un programme en Python de type "console" correspondant à un jeu d'escape game (ou à une histoire dont vous êtes le héros). Pour vous donnez une idée de ce à quoi pourrait ressembler de tels projets, je vous propose de commencer par copier/coller les codes ci-dessous dans Thonny et de les tester.

````{admonition} Projet style "Escape Game"
:class: note dropdown
```{code-block} python
clef_bleue = False
clef_rouge = False
sortie = False
acces_salle_rouge = False
acces_salle_bleue = False
coffret_ouvert = False

def salle_principale():
    while sortie == False:

        if acces_salle_rouge == False:
            txt_rouge = "- Aller vers la porte [rouge]"
        else:
            txt_rouge = "- Entrer dans la salle [rouge]"
        if acces_salle_bleue == False:
            txt_bleu = "- Aller vers la porte [bleue]"
        else:
            txt_bleu = "- Entrer dans la salle [bleue]"

        choix = input("Que voulez-vous faire ?\n " + txt_rouge+ "\n " + txt_bleu + "\n - Regarder dans votre [poche]\n - Examinez le [coffret]\n - Regarder sous le [tapis]\n")

        if choix == "rouge":
            choix_rouge()
        elif choix == "bleue":
            choix_bleu()
        elif choix == "poche":
            choix_poche()
        elif choix == "coffret":
            choix_coffret()
        elif choix == "tapis":
            choix_tapis()
            
def choix_rouge():
    global acces_salle_rouge
    if acces_salle_rouge == False:
        if clef_rouge == False and clef_bleue == False:
            print("Vous essayez d'ouvrir la porte rouge. Malheureusement, elle est fermée à clef. Peut-être que vous pourriez l'ouvrir avec une clé.")
        elif clef_rouge == False and clef_bleue == True:
            print("La porte rouge est fermée à clef. Vous essayez d'insérer la clé bleue dans la serrure, mais elle ne rentre pas.")
        elif clef_rouge == True:
            print("Vous insérez la clé rouge dans la serrure et parvenez à accéder à une nouvelle pièce, la pièce rouge.")
            acces_salle_rouge = True
    else:
        print("Vous entrez dans la salle rouge. Une carte du monde est accrochée au mur. Cette carte est en noir et blanc, si ce n'est la Slovaquie, l'Equateur, et le Kenya qui sont en couleur. Comme il n'y a rien d'autre, vous ressortez de la salle rouge.")

    
def choix_bleu():
    global acces_salle_bleue, sortie
    if acces_salle_bleue == False:
        if clef_bleue == False and clef_rouge == False:
            print("Vous essayez d'ouvrir la porte bleue. Malheureusement, elle est fermée à clef. Peut-être que vous pourriez l'ouvrir avec une clé.")
        elif clef_bleue == False and clef_rouge == True:
            print("La porte bleue est fermée à clef. Vous essayez d'insérer la clé rouge dans la serrure, mais elle ne rentre pas.")
        elif clef_bleue == True:
            print("Vous insérez la clé carrée dans la serrure et parvenez à accéder à une nouvelle pièce, la pièce bleue.")
            acces_salle_bleue = True
    else:
        print("Vous entrez dans la salle bleue. Vous y apercevez une porte avec une petite vitre qui donne sur l'extérieur. C'est votre porte de sortie!")

        choix_bleu = ""
        while choix_bleu != "bleue":
            choix_bleu = input("Que faire ?\n - Insepecter la porte de [sortie]\n - Inspecter la [salle]\n - Sortir de la salle [bleue]\n")
            if choix_bleu == "sortie":
                code = input("La porte est verrouillée avec un code à 3 lettres. Quel est ce code ?")
                if code == "KSE":
                    sortie = True
                    print("La porte s'ouvre !")
                    choix_bleu = "bleue"
                else:
                    print("Le code est incorrect")
            elif choix_bleu == "salle":
                print("Sur le mur est écrit 'Afrique Europe Amérique")
            else:
                print("Choix inconnu")

def choix_poche():
    global clef_rouge
    if clef_rouge == False:
        print("Vous trouvez une clef rouge dans votre poche")
        clef_rouge = True
    else:
        print("Il n'y a plus rien dans votre poche")
        
def choix_coffret():
    global clef_bleue
    if coffret_ouvert == False:
        code_coffret = input("Le coffret est fermé par un cadenas à 4 chiffres. Entrez le code pour l'ouvrir : ")
        if code_coffret == "1489":
            print("Vous avez ouvert le coffret. À l'intérieur, vous trouvez une clef bleue.")
            clef_bleue = True
        else:
            print("Mauvais code. Le coffret reste fermé.")
    else:
        print("Le coffret est déjà ouvert, il est vide.")
        
def choix_tapis():
    print('Sous le tapis, vous trouvez une note sur laquelle sont écrits les chiffres 4819 ainsi que le texte "Du plus petit au plus grand"')


print("Vous vous réveillez au milieu d'une pièce. Vous êtes couché sur un tapis, et vous voyez un petit coffret, ainsi 2 portes, une bleue et une rouge. En vous relevant, vous sentez également que vous avez quelque chose dans votre poche.")
salle_principale()
print("Bravo vous êtes sorti.e de la pièce ! Vous avez gagné :)")

```
````

## Déroulement et tâches à réaliser
Vous réaliserez ce projet par groupe de 2, et le travail attendu est le suivant :

-  Première séance : test du programme d'exemple, conception de votre Escape et de ses énigmes, mise en place du projet avec votre binôme. Eventuellement début de la programmation

- Séances suivantes :  Programmation de votre projet

## Evaluation
Au terme des 4 séances de TP, vous rendrez votre code pour évaluation. Celui-ci sera noté avec coefficient 1 en fonction du barème suivant :


| Critères                                                                                                       | Points |
| :------------------------------------------------------------------------------------------------------------- | :----- |
| **Critères côté utilisateur**                                                                                  |        |
| Le programme s’exécute sans erreur                                                                             | 1 pt   |
| Les instructions pour l’utilisateur sont claires                                                               | 1 pt   |
| Le déroulement du programme est cohérent                                                                       | 1 pt   |
| L'escape est intéressante à jouer et contient au moins 5 énigmes intéressantes à résoudre                 | 5 pts  |
| Les textes du programme sont soignés (phrases complètes, orthographe et grammaire soignées, vocabulaire adapté)| 1 pt  |
| **Critères côté développeur**                                                                                  |        |
| Le code comporte des commentaires pertinents pour expliquer à quoi sert une ligne ou un bloc de lignes         | 1 pt  |
| Le programme utilise au moins 2 variables de manière pertinente qui sont modifiées durant l’exécution         | 2 pts  |
| Le programme utilise au moins 3 entrées utilisateur de manière pertinente, dont au moins une pour une donnée numérique | 3 pts  |
| Le programme utilise au moins 3 branchements conditionnels pertinents, dont 1 avec un opérateur logique, et 1 avec un elif | 3 pts  |
| Le programme utilise au moins 2 boucles conditionnelles de manière pertinente                                 | 2 pts  |
| **Questions orales individuelles**                                                                                                 |        |
| Au terme du projet, 3 questions orales vous seront posées individuellement. Les questions seront du type "Quelle ligne de code permet de faire cette action ?", "A quoi sert cette ligne de code ?", et "Comment modifier cette ligne de code pour modifier le programme ?" | 3 pts |
