clef_bleue = False
clef_rouge = False
sortie = False
acces_salle_rouge = False
acces_salle_bleue = False
coffret_ouvert = False

print("Vous vous réveillez au milieu d'une pièce. Vous êtes couché sur un tapis,\net vous voyez un petit coffret, ainsi 2 portes, une bleue et une rouge.\nEn vous relevant, vous sentez également que vous avez quelque chose dans votre poche.")

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
        if acces_salle_rouge == False:
            if clef_rouge == False and clef_bleue == False:
                print("Vous essayez d'ouvrir la porte rouge. Malheureusement, elle est fermée à clef. Peut-être que vous pourriez l'ouvrir avec une clé.")
            elif clef_rouge == False and clef_bleue == True:
                print("La porte rouge est fermée à clef. Vous essayez d'insérer la clé bleue dans la serrure, mais elle ne rentre pas.")
            elif clef_rouge == True:
                print("Vous insérez la clé carrée dans la serrure et parvenez à accéder à une nouvelle pièce, la pièce rouge.")
                acces_salle_rouge = True
        else:
            print("Vous entrez dans la salle rouge. Une carte du monde est accrochée au mur.\nCette carte est en noir et blanc, si ce n'est la Slovaquie, l'Equateur, et le Kenya\nqui sont en couleur. Comme il n'y a rien d'autre, vous ressortez de la salle rouge.")

    elif choix == "bleue":
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

    elif choix == "poche":
        if clef_rouge == False:
            print("Vous trouvez une clef rouge dans votre poche")
            clef_rouge = True
        else:
            print("Il n'y a plus rien dans votre poche")

    elif choix == "coffret":
        if coffret_ouvert == False:
            code_coffret = input("Le coffret est fermé par un cadenas à 4 chiffres. Entrez le code pour l'ouvrir : ")
            if code_coffret == "1489":
                print("Vous avez ouvert le coffret. À l'intérieur, vous trouvez une clef bleue.")
                clef_bleue = True
            else:
                print("Mauvais code. Le coffret reste fermé.")
        else:
            print("Le coffret est déjà ouvert, il est vide.")
    elif choix == "tapis":
        print('Sous le tapis, vous trouvez une note sur laquelle sont écrits les chiffres 4819 ainsi que le texte "Du plus petit au plus grand"')
    else:
        print("Choix invalide. Essayez autre chose.")

print("Bravo vous êtes sorti.e de la pièce ! Vous avez gagné :)")

