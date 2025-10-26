# Mini Aventure - 100% if/elif/else
# Objectif: récupérer la relique et sortir vivant.

print("=== Mini Aventure : Grotte-Brise ===")
print("Tu es devant une grotte froide, au bord d'une falaise. Tu veux y entrer\npour récupérer une relique ancienne.")
print("Deux options: entrer directement (e) ou faire le tour (t).")

torche = False
cle = False
relique = False
fin = "perdu"

choix1 = input("> ").strip().lower()

if choix1 == "e":
    print("\nTu entres sans lumière. C'est le noir complet.")
    print("Tu avances à tâtons et glisses dans un trou caché...")
    print("Fin. (Tu aurais dû chercher une source de lumière)")
    
elif choix1 == "t":
    print("\nTu fais le tour. Derrière un rocher, tu trouves une TORCHE.")
    print("Tu l'allumes. Une lumière chaude t'éclaire.")
    torche = True

    print("\nTu entres dans la grotte éclairée. Un couloir mène à une PORTE massive.")
    print("Tenter de forcer (f) ou chercher un passage caché (c) ?")
    choix2 = input("> ").strip().lower()

    if choix2 == "f":
        print("\nTu forces de toutes tes forces. CRAC ! Un éboulement se déclenche.")
        print("Des pierres te bloquent le bras. Tu es coincé...")
        print("Fin.")
        
    elif choix2 == "c":
        print("\nÀ la lueur de ta torche, tu inspectes les murs.")
        print("Tu repères une fissure discrète. À l'intérieur: une CLÉ rouillée !")
        cle = True

        print("\nTu reviens à la PORTE. Utiliser la clé (o) ou abandonner (a) ?")
        choix3 = input("> ").strip().lower()

        if choix3 == "o":
            print("\nLa clé grince dans la serrure... CLIC ! La porte s'ouvre.")
            print("Dans la salle: un piédestal de pierre ancien.")
            print("Dessus, une RELIQUE bleutée pulse faiblement.")
            print("La prendre (p) ou inspecter la salle d'abord (i) ?")
            choix4 = input("> ").strip().lower()

            if choix4 == "p":
                print("\nTu saisis la relique. Elle est tiède au toucher.")
                print("Le sol vibre légèrement, mais la salle reste stable.")
                relique = True

                print("\nSortir immédiatement (s) ou fouiller la salle (f) ?")
                choix5 = input("> ").strip().lower()

                if choix5 == "s":
                    print("\nTu fais demi-tour, torche en main, relique sous le bras.")
                    print("Tu sors dans la brise marine. La relique pulse dans ta main.")
                    print("\n*** VICTOIRE ! Tu as récupéré la relique ! ***")
                    fin = "gagné"
                    
                elif choix5 == "f":
                    print("\nTon pied enfonce une dalle piégée.")
                    print("Des dards empoisonnés jaillissent des murs !")
                    print("Fin. (L'avidité te perd)")
                    
                else:
                    print("\nTu hésites trop longtemps. Un grondement résonne.")
                    print("Le plafond commence à s'effondrer... Fin.")
                    
            elif choix4 == "i":
                print("\nTu inspectes prudemment les murs. Tu repères un symbole étrange...")
                print("En t'approchant, tu déclenches un mécanisme ancien.")
                print("Un gaz verdâtre envahit la salle. Fin.")
                
            else:
                print("\nTu perds de précieuses secondes à hésiter.")
                print("La salle tremble et s'effondre sur toi. Fin.")
                
        elif choix3 == "a":
            print("\nTu renonces à ta quête et ressors bredouille.")
            print("Parfois, la prudence n'est que de la lâcheté. Fin.")
            
        else:
            print("\nTu tergiverses devant la porte...")
            print("Un grondement sourd te fait fuir en panique. Fin.")
            
    else:
        print("\nTu hésites trop longtemps dans le couloir.")
        print("Un courant d'air éteint soudainement ta torche.")
        print("Dans le noir complet, tu te perds... Fin.")
        
else:
    print("\nTu restes planté là, indécis.")
    print("La marée monte lentement et t'isole sur la falaise.")
    print("Fin. (Il fallait agir)")

# Résumé de la partie
print("\n" + "="*40)
print("=== RÉSUMÉ DE TA QUÊTE ===")
print("="*40)
print(f"🔥 Torche obtenue : {'OUI' if torche else 'NON'}")
print(f"🔑 Clé obtenue : {'OUI' if cle else 'NON'}")
print(f"💎 Relique obtenue : {'OUI' if relique else 'NON'}")
print("="*40)

if fin == "gagné":
    print("ISSUE : VICTOIRE")
    print("Tu es un véritable aventurier !")
else:
    print("ISSUE : DÉFAITE 💀")
    print("Réessaie pour découvrir le bon chemin...")
    
print("="*40)