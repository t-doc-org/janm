#!/usr/bin/env python3
# Copyright 2025 Maxime Jan <maxime.jan@edufr.ch>
# SPDX-License-Identifier: CC-BY-SA-4.0
#
# Génère « databases/sql-murder-mystery.sql », la base de données de l'enquête
# de SQL City utilisée par la page docs/DOI2/Databases/murder.md.
#
# Scénario adapté de SQL Murder Mystery (Joon Park & Cathy He, Knight Lab,
# CC-BY-SA 4.0). Le schéma et le déroulé de l'enquête sont conservés ; les
# données, elles, sont entièrement régénérées par ce script.
#
# Utilisation :
#     python3 generate_murder_db.py
#
# Le script est DÉTERMINISTE (graine fixe) : deux exécutions produisent le même
# fichier. Il se termine par une série de vérifications qui garantissent que
# l'enquête reste résoluble et que chaque étape n'a qu'une seule solution.
#
# ---------------------------------------------------------------------------
# POURQUOI CE SCRIPT
#
# La base originale pesait 3.3 Mo pour 56 649 lignes, dont l'immense majorité
# était du remplissage sans rapport avec l'enquête (des citations littéraires
# recopiées dans les colonnes de texte). Ici le bruit est plus petit mais
# CIBLÉ : il est concentré autour de chaque étape de l'enquête, de sorte qu'une
# requête incomplète (une ou deux conditions) renvoie beaucoup trop de lignes
# pour être dépouillée à l'œil. Les comptes visés sont dans ENTONNOIRS.
# ---------------------------------------------------------------------------

import os
import random

# Le fichier est écrit à côté de ce script.
SORTIE = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                      "sql-murder-mystery.sql")
GRAINE = 20180115

# --- Taille de la base ------------------------------------------------------
N_PERSONNES = 2500
N_RAPPORTS = 900          # crime_scene_report
N_CHECKINS_FB = 4000      # facebook_event_checkin
N_INTERVIEWS = 400        # interview
N_MEMBRES_GYM = 300       # get_fit_now_member
N_CHECKINS_GYM = 900      # get_fit_now_check_in

# --- Constantes de l'enquête (à ne pas modifier sans relire murder.md) ------
VILLE = "SQL City"
DATE_CRIME = 20180115
RUE_TEMOIN1 = "Northwestern Dr"
RUE_TEMOIN2 = "Franklin Ave"
PRENOM_TEMOIN2 = "Annabel"
PREFIXE_SAC = "48Z"
ID_GYM_TUEUR = "48Z55"
DATE_GYM = 20180109
FRAGMENT_PLAQUE = "H42W"
PLAQUE_TUEUR = "H42W0X"
EVENEMENT_CIBLE = "SQL Symphony Concert"

TEMOIN1 = "Morty Schapiro"
TEMOIN2 = "Annabel Miller"
TUEUR = "Jeremy Bowers"
COMMANDITAIRE = "Miranda Priestly"

# Signalement de la commanditaire, donné par le tueur en interrogatoire.
TAILLE_MIN, TAILLE_MAX = 65, 67
CHEVEUX_C, GENRE_C = "red", "female"
VOITURE_C = ("Tesla", "Model S")
NB_CONCERTS = 3

# --- Tailles des chausse-trappes (le « bruit utile ») -----------------------
# Chaque nombre est vérifié par une assertion à la fin du script.
ENTONNOIRS = {
    "rapports_ville": 400,        # city = 'SQL City'
    "rapports_ville_date": 30,    # ... and date = 20180115
    "rapports_ville_meurtre": 15, # city = 'SQL City' and type = 'murder'
    "habitants_rue1": 60,         # address_street_name = 'Northwestern Dr'
    "habitants_rue2": 50,         # address_street_name = 'Franklin Ave'
    "prenoms_annabel": 25,        # name like 'Annabel%'
    "membres_48z": 40,            # get_fit_now_member.id like '48Z%'
    "membres_48z_gold": 15,       # ... and membership_status = 'gold'
    "checkins_gym_date": 30,      # check_in_date = 20180109
    "membres_48z_gold_date": 4,   # les trois conditions réunies
    "plaques_h42w": 25,           # plate_number like '%H42W%'
    "femmes_rousses": 300,        # gender = 'female' and hair_color = 'red'
    "femmes_rousses_taille": 80,  # ... and height between 65 and 67
    "femmes_rousses_tesla": 12,   # ... and car = Tesla Model S
    "tesla_model_s": 70,          # Tesla Model S, toutes personnes confondues
    "concert_3x": 40,             # 3 présences au concert en décembre 2017
    "concert_3x_rousses": 6,      # ... et femme rousse
    "concert_3x_rousses_taille": 2,  # ... et taille 65-67
    "revenus_superieurs": 15,     # au moins N personnes plus riches que la
}                                 # commanditaire (pour qu'un tri par revenu
                                  # ne donne pas la réponse)

# ---------------------------------------------------------------------------
# TEXTES DE L'ENQUÊTE
#
# Ce sont les seules chaînes qui comptent vraiment : elles portent tous les
# indices. Tout le reste du fichier est du bruit généré. Pour rejouer l'enquête
# dans une autre langue, il suffit de traduire ce bloc.
# ---------------------------------------------------------------------------
TEXTES = {
    "rapport_meurtre":
        "Les images de vidéosurveillance montrent qu'il y avait 2 témoins. "
        "Le premier témoin habite la dernière maison de « Northwestern Dr ». "
        "Le second témoin, prénommée Annabel, habite quelque part sur "
        "« Franklin Ave ».",

    "interview_temoin1":
        "J'ai entendu un coup de feu puis j'ai vu un homme sortir en courant. "
        "Il portait un sac de sport de la salle « Get Fit Now Gym ». Le numéro "
        "de membre inscrit sur le sac commençait par « 48Z ». Seuls les membres "
        "« gold » ont ce type de sac. L'homme est ensuite monté dans une "
        "voiture dont la plaque contenait « H42W ».",

    "interview_temoin2":
        "J'ai vu le meurtre se produire, et j'ai reconnu le tueur : je l'avais "
        "croisé dans ma salle de sport la semaine dernière, le 9 janvier.",

    "interview_tueur":
        "J'ai été engagé par une femme qui a beaucoup d'argent. Je ne connais "
        "pas son nom, mais je sais qu'elle mesure entre 65 et 67 (les tailles "
        "sont enregistrées en pouces sur les permis de conduire). Elle a les "
        "cheveux roux et conduit une Tesla Model S. Je sais aussi qu'elle est "
        "allée trois fois au SQL Symphony Concert en décembre 2017.",

    "solution_tueur":
        "Bravo, vous avez trouvé le meurtrier ! Mais ce n'est pas fini : ce "
        "n'est pas lui qui a commandité le crime. Allez lire sa déposition dans "
        "la table interview pour remonter jusqu'au cerveau de l'affaire.",

    "solution_commanditaire":
        "Bravo, vous avez trouvé le cerveau de l'affaire ! Tout SQL City vous "
        "salue comme le plus grand détective SQL de tous les temps.",

    "solution_faux":
        "Ce n'est pas la bonne personne. Essayez encore !",
}

# ---------------------------------------------------------------------------
# BRUIT TEXTUEL
#
# Deux pièges à éviter, sans quoi l'élève repère les bonnes réponses sans lire :
#   - si les textes de bruit sont tous courts, les trois vraies dépositions
#     sautent aux yeux dans un simple SELECT * ;
#   - s'ils se ressemblent tous, un coup d'œil suffit à isoler l'intrus.
# Les listes ci-dessous couvrent donc la même plage de longueurs que les vrais
# textes, et sont recombinées avec les compléments pour varier encore.
# ---------------------------------------------------------------------------
DEPOSITIONS = [
    "Je n'ai rien remarqué d'inhabituel ce soir-là.",
    "J'étais chez moi, je regardais la télévision.",
    "J'ai entendu du bruit dans la rue mais je n'ai pas regardé par la fenêtre.",
    "Je rentrais du travail et je n'ai croisé personne sur le trajet.",
    "Je promenais mon chien deux rues plus loin, je n'ai rien vu.",
    "Je ne me souviens pas de la date exacte, désolé.",
    "J'ai vu une voiture passer, mais je n'ai fait attention ni au modèle ni à "
    "la plaque.",
    "Je dormais déjà à cette heure-là.",
    "Je n'habite pas le quartier, j'étais juste de passage pour rendre visite à "
    "ma sœur.",
    "Tout m'a semblé parfaitement normal.",
    "J'étais au restaurant avec des amis toute la soirée. Nous sommes arrivés "
    "vers dix-neuf heures et nous ne sommes repartis qu'à la fermeture. Le "
    "patron pourra le confirmer, il nous connaît bien : nous y allons presque "
    "toutes les semaines depuis des années.",
    "Je n'ai pas mes lunettes sur moi, je ne peux rien affirmer de précis.",
    "Il faisait déjà nuit, je n'ai pas vu grand-chose depuis mon balcon.",
    "J'ai cru entendre crier, mais c'était peut-être la télévision des voisins.",
    "Je ne veux pas être mêlé à cette histoire, j'ai déjà eu assez d'ennuis "
    "comme ça.",
    "Je travaillais tard au bureau ce jour-là. En sortant, j'ai croisé deux ou "
    "trois personnes sur le parking, mais je ne saurais pas les décrire. Il "
    "pleuvait, tout le monde marchait vite en regardant par terre. Je suis "
    "rentré directement chez moi.",
    "J'attendais le bus, je n'ai rien vu de particulier.",
    "Ma voisine m'a raconté quelque chose, mais je n'y crois pas une seconde.",
    "Je faisais mes courses au supermarché du coin, comme tous les lundis.",
    "Je n'ai aucune idée de ce dont vous parlez.",
    "Je vais à la salle de sport presque tous les jours, parfois le matin, "
    "parfois après le travail. J'y croise beaucoup de monde mais je ne connais "
    "presque personne par son nom. Les gens arrivent avec leur sac, ils se "
    "changent, ils repartent. Personne ne fait attention à personne.",
    "Un homme est passé avec un sac de sport sur l'épaule, mais c'était en "
    "plein après-midi et il marchait tranquillement.",
    "J'ai relevé une plaque d'immatriculation ce soir-là parce que la voiture "
    "était très mal garée. Je l'avais notée sur un bout de papier que j'ai "
    "perdu depuis.",
    "Je tiens le kiosque au coin de la rue. Le soir, je vois passer des "
    "dizaines de personnes et je serais bien incapable de vous dire laquelle "
    "était là tel ou tel jour. On me pose la question chaque fois qu'il se "
    "passe quelque chose dans le quartier.",
    "J'ai déménagé le mois dernier, je ne connais encore personne ici.",
    "Mon fils est rentré tard ce soir-là et m'a dit qu'il y avait beaucoup de "
    "police en bas de la rue. Je n'ai pas cherché à en savoir plus.",
    "Je suis chauffeur de taxi. Ce soir-là j'ai enchaîné les courses jusqu'à "
    "minuit passé, essentiellement entre la gare et les quartiers nord. Je "
    "n'ai pas mis les pieds dans cette rue-là, et de toute façon je regarde la "
    "route, pas les trottoirs.",
    "On m'a convoqué, mais je crois qu'il y a erreur sur la personne.",
    "Il y avait une voiture sombre arrêtée un peu plus loin, moteur allumé. Ça "
    "m'a paru bizarre sur le moment, puis je n'y ai plus pensé.",
    "J'habite juste en face et je passe mes soirées à ma fenêtre, c'est vrai. "
    "Mais ce soir-là j'étais chez ma fille pour son anniversaire. J'ai appris "
    "la nouvelle le lendemain matin par la boulangère, qui la tenait de son "
    "mari, qui l'avait entendue à la radio.",
    "Je sortais de mon cours de fitness quand j'ai vu passer une voiture un "
    "peu vite. Je n'ai pas pensé une seconde que ça pouvait avoir un rapport "
    "avec quoi que ce soit.",
    "On m'a dit que quelqu'un du quartier avait « tout vu », mais quand je lui "
    "ai demandé, il m'a répondu qu'il ne se souvenait plus de rien.",
    "Je suis facteur sur ce secteur depuis onze ans. Je connais les habitudes "
    "de tout le monde, qui part tôt, qui rentre tard, qui laisse sa porte "
    "ouverte. Mais ma tournée se termine à quatorze heures, donc ce qui se "
    "passe le soir m'échappe complètement. Vous feriez mieux d'interroger les "
    "gens qui promènent leur chien.",
    "Ce soir-là il y avait un match à la télévision et pratiquement tout "
    "l'immeuble le regardait. On entendait les cris de joie d'un appartement à "
    "l'autre. Autant vous dire qu'un bruit dans la rue, personne n'y aurait "
    "prêté la moindre attention. Moi-même je n'ai rien entendu du tout.",
    "J'ai témoigné dans une affaire il y a trois ans et ça m'a coûté des mois "
    "de tracas. Alors cette fois je vais être très clair : je n'étais pas "
    "là, je n'ai rien vu, je ne connais personne dans cette histoire et je "
    "n'ai aucune intention de me retrouver à nouveau convoqué tous les quinze "
    "jours.",
    "Je suis infirmière de nuit, je pars de chez moi vers vingt heures et je "
    "reviens au petit matin. Il m'arrive de croiser des gens à des heures "
    "improbables, mais je ne les remarque plus, c'est devenu une habitude. "
    "Cette nuit-là était une nuit comme les autres, avec le même trajet et les "
    "mêmes rues vides.",
    "Nous avons eu une coupure de courant dans tout le quartier pendant une "
    "bonne demi-heure. Les gens sont sortis sur le pas de leur porte, ça "
    "discutait d'un trottoir à l'autre, puis la lumière est revenue et chacun "
    "est rentré chez soi. Je serais incapable de dire qui était dehors à ce "
    "moment-là.",
    "Mon garage donne sur la ruelle de derrière. J'y bricole souvent le soir, "
    "avec la radio allumée et la porte relevée. Des voitures passent, "
    "certaines ralentissent, d'autres font demi-tour. Je ne lève même plus la "
    "tête. Si vous me demandez une couleur ou une marque, je vous inventerais "
    "n'importe quoi.",
    "J'organise les livraisons pour un restaurant du centre. Le soir, mes "
    "scooters sillonnent tout le quartier et je peux vous dire à la minute où "
    "ils se trouvaient. Aucun d'eux n'a signalé quoi que ce soit d'anormal, "
    "et croyez-moi, ces garçons remarquent tout et racontent tout.",
    "Je promenais mon chien comme chaque soir et il s'est mis à tirer sur sa "
    "laisse en aboyant vers le fond de la rue. Sur le moment j'ai pensé à un "
    "chat. Avec le recul je me demande s'il n'avait pas entendu quelque chose, "
    "mais je ne vais pas bâtir une accusation sur l'humeur d'un teckel.",
]

# Phrases ajoutées au hasard à la fin d'une déposition, pour varier la longueur.
COMPLEMENTS_DEPOSITION = [
    " Je suis désolé de ne pas pouvoir vous aider davantage.",
    " Si ça me revient, je vous appelle.",
    " Vous devriez interroger les gens de l'immeuble d'en face, ils voient tout.",
    " J'ai déjà tout raconté à votre collègue la semaine dernière.",
    " Ne comptez pas sur moi pour témoigner au tribunal.",
    " Franchement, je préfère ne pas m'avancer.",
    " C'est un quartier tranquille d'habitude, ça nous a tous secoués.",
    " Je peux vous donner le numéro de mon employeur si vous voulez vérifier.",
    " Je n'ai pas regardé l'heure, mais il ne faisait pas encore tout à fait nuit.",
    " Tout ce que je sais, je l'ai lu dans le journal.",
    " Vous n'êtes pas le premier à me poser la question.",
    " Je ne connais personne qui aurait pu faire une chose pareille.",
    " J'espère que vous le retrouverez rapidement.",
    " Ma femme était avec moi, elle vous dira la même chose.",
]

# Descriptions de faits divers, classées par type de crime : le type et la
# description doivent rester cohérents, sinon la base est absurde (un « murder »
# qui décrit un vol de colis).
FAITS_DIVERS = {
    "theft": [
        "Un vélo a disparu devant la gare.",
        "Un portefeuille a été dérobé dans les transports publics.",
        "Un colis a été volé devant une porte d'entrée.",
        "Un chien a été volé dans un jardin privé.",
        "Une voiture a été forcée sur le parking du centre commercial.",
        "Une série de vols de colis a été constatée dans plusieurs immeubles du "
        "même secteur. Le mode opératoire est identique à chaque fois : les "
        "paquets disparaissent dans l'heure qui suit leur livraison.",
        "Plusieurs véhicules stationnés le long de l'avenue ont été fouillés "
        "pendant la nuit. Les vitres n'ont pas été brisées, ce qui laisse "
        "supposer que les portières n'étaient pas verrouillées. Seuls des "
        "objets de faible valeur ont été emportés.",
    ],
    "assault": [
        "Deux personnes se sont battues à la sortie d'un bar.",
        "Une bagarre a éclaté après un match de football.",
        "Un passant a été bousculé et frappé sans raison apparente.",
        "Deux groupes se sont affrontés à la sortie d'un établissement peu "
        "après la fermeture. L'intervention de la patrouille a permis de "
        "séparer les protagonistes, dont plusieurs ont refusé de décliner leur "
        "identité.",
        "Une altercation a dégénéré sur le parking d'une salle de sport. Les "
        "deux hommes se connaissaient et ont refusé de porter plainte l'un "
        "contre l'autre. Aucun des témoins présents n'a souhaité faire de "
        "déclaration.",
    ],
    "fraud": [
        "Des faux billets ont circulé sur le marché du samedi.",
        "Une somme d'argent a disparu de la caisse d'un commerce.",
        "Un client conteste des prélèvements qu'il affirme n'avoir jamais "
        "autorisés.",
        "Le gérant d'un commerce signale des différences répétées dans sa "
        "caisse depuis le début du mois. Les montants sont faibles mais "
        "réguliers, ce qui oriente les soupçons vers une personne ayant accès "
        "au local.",
        "Plusieurs habitants du quartier disent avoir reçu un appel les "
        "informant d'un problème sur leur compte bancaire. Deux d'entre eux ont "
        "communiqué leurs codes avant de comprendre qu'il s'agissait d'une "
        "escroquerie.",
    ],
    "vandalism": [
        "Une vitrine a été brisée pendant la nuit.",
        "Des graffitis ont été retrouvés sur le mur de l'école.",
        "Une boîte aux lettres a été fracturée.",
        "Des pneus ont été crevés sur toute une rangée de voitures.",
        "Une vitrine a été brisée pendant la nuit. Les caméras du magasin "
        "voisin étaient hors service depuis plusieurs jours et personne ne "
        "s'est manifesté. Le montant des dégâts est estimé à plusieurs milliers "
        "de francs.",
        "Le mobilier urbain de la place centrale a été systématiquement dégradé "
        "au cours du week-end. Bancs descellés, panneaux tordus, éclairage "
        "cassé : la commune évoque plusieurs semaines de travaux pour tout "
        "remettre en état.",
    ],
    "arson": [
        "Une poubelle a été incendiée derrière l'immeuble.",
        "Un scooter a été retrouvé abandonné et brûlé.",
        "Un départ de feu a été maîtrisé dans une cave.",
        "Un hangar désaffecté a pris feu au milieu de la nuit. Les pompiers ont "
        "mis plusieurs heures à venir à bout du sinistre. L'origine criminelle "
        "est privilégiée en raison de traces d'accélérant relevées à deux "
        "endroits distincts.",
    ],
    "robbery": [
        "Un téléphone a été arraché des mains d'un passant.",
        "Une station-service a été braquée en fin de service.",
        "Un livreur s'est fait dérober sa sacoche à l'arrêt.",
        "Deux individus cagoulés ont fait irruption dans une bijouterie peu "
        "avant la fermeture. Ils ont pris la fuite à scooter avec plusieurs "
        "montres. Le signalement fourni par la vendeuse reste très général.",
    ],
    "blackmail": [
        "Une plainte a été déposée pour harcèlement téléphonique.",
        "Un commerçant affirme recevoir des menaces répétées.",
        "Une personne dit être victime d'un chantage par messages.",
        "Un habitant du quartier signale recevoir depuis des semaines des "
        "lettres anonymes exigeant de l'argent en échange du silence sur une "
        "affaire ancienne. Il n'a jamais donné suite et n'a pas souhaité "
        "détailler le contenu des courriers.",
    ],
    "burglary": [
        "Une alarme s'est déclenchée sans que rien ne soit dérobé.",
        "Une porte de cave a été fracturée dans un immeuble locatif.",
        "Un local commercial a été visité pendant les vacances.",
        "Un cambriolage a été signalé dans une villa du quartier résidentiel. "
        "Aucune trace d'effraction n'a été relevée, ce qui laisse penser que "
        "les auteurs disposaient d'une clef ou connaissaient les habitudes des "
        "propriétaires.",
        "Un individu a été aperçu en train de forcer la porte d'un immeuble en "
        "pleine journée. Il a pris la fuite à pied avant l'arrivée de la "
        "patrouille et n'a pas pu être identifié malgré les recherches menées "
        "dans le secteur.",
    ],
    "murder": [
        "Un corps a été découvert dans un appartement du quartier est.",
        "Une victime a été retrouvée sans vie au bord du canal.",
        "Un homme a été tué par balle dans un parking souterrain. Aucun témoin "
        "ne s'est présenté.",
        "Une femme a été retrouvée morte à son domicile. Le voisinage affirme "
        "n'avoir rien entendu.",
        "Un corps a été découvert par un promeneur en bordure de la voie "
        "ferrée. L'identification a pris plusieurs jours, faute de papiers. "
        "L'enquête n'a pour l'instant permis d'établir ni les circonstances ni "
        "l'heure exacte du décès.",
        "Une dispute qui a mal tourné a coûté la vie à l'un des deux "
        "protagonistes. L'auteur présumé s'est présenté de lui-même au poste le "
        "lendemain matin, accompagné de son avocat, et a reconnu les faits sans "
        "en expliquer le déroulement.",
    ],
}

# Phrases ajoutées au hasard à la fin d'un fait divers.
COMPLEMENTS_FAIT = [
    " L'enquête de voisinage n'a rien donné.",
    " Aucune interpellation n'a eu lieu à ce jour.",
    " Une patrouille a été dépêchée sur place.",
    " Le dossier a été transmis au procureur.",
    " La victime n'a pas souhaité déposer plainte.",
    " Les images de vidéosurveillance sont en cours d'analyse.",
    " Aucun témoin ne s'est manifesté.",
    " Le préjudice reste à évaluer.",
    " Le rapport initial est incomplet.",
    " Les faits se sont produits en fin de soirée.",
]

TYPES_CRIME = sorted(FAITS_DIVERS)

AUTRES_VILLES = ["NYC", "Chicago", "Los Angeles", "Seattle", "Boston",
                 "Austin", "Denver", "Miami", "Portland", "Detroit",
                 "Atlanta", "Phoenix", "Toronto", "San Francisco"]

EVENEMENTS = [
    "SQL Symphony Concert", "The Funky Grooves Tour", "Kesha Rave",
    "Kelly's Bar Crawl", "Hamilton", "Cirque du Soleil",
    "Gnomes and Trolls Convention", "Salsa Dancing Night",
    "Stanford University Alumni Meeting", "Christmas Market",
    "Rock Concert at The Vault", "Comic Con", "SQL City Marathon",
    "Food Truck Festival", "Winter Ice Gala", "Startup Pitch Night",
    "Jazz Under the Stars", "Vintage Car Show", "Book Fair",
    "Charity Gala", "Farmers Market", "Halloween Costume Party",
]

COULEURS_YEUX = ["brown", "blue", "green", "hazel", "amber", "black"]
COULEURS_CHEVEUX = ["black", "brown", "blonde", "red", "grey", "white",
                    "blue", "green"]
STATUTS_GYM = ["gold", "silver", "regular"]
PRENOMS = [
    'Gary', 'Edward', 'Ricardo', 'Courtney', 'Billie', 'Erwin', 'Merrill', 'Deon',
    'Giovanni', 'Denver', 'Andre', 'Cliff', 'Dan', 'Federico', 'Kurt', 'Hollis',
    'Bobbie', 'Carrol', 'Donald', 'Dusty', 'Scottie', 'Jermaine', 'Kerry', 'Jordan',
    'Leslie', 'Kenneth', 'Shane', 'Cordell', 'Lonnie', 'Terrell', 'Marcelino', 'Lacy',
    'Demetrius', 'Carmen', 'Rudy', 'Jasper', 'Herschel', 'Michael', 'George', 'Carl',
    'Eric', 'Kirby', 'Davis', 'Jimmie', 'Harrison', 'Jude', 'Roberto', 'Huey',
    'Harvey', 'Val', 'Quentin', 'Cody', 'Cruz', 'Joel', 'Robbie', 'Cecil',
    'Tommy', 'Patricia', 'Refugio', 'Valentine', 'Ted', 'Everette', 'Martin', 'Julio',
    'Zachary', 'Louis', 'Lawrence', 'Wes', 'Wilmer', 'Hank', 'Gustavo', 'James',
    'Angel', 'Kelley', 'Mitchel', 'Derick', 'Paris', 'Mauro', 'Jason', 'Ryan',
    'Emanuel', 'Minh', 'Stacy', 'Russell', 'Mario', 'Jules', 'Taylor', 'Odell',
    'Jame', 'Ramon', 'Kristopher', 'Maximo', 'Cletus', 'Sydney', 'Erin', 'Quintin',
    'Avery', 'Raymond', 'Claud', 'Jamie', 'Sammie', 'Ezra', 'Randolph', 'Junior',
    'Rene', 'Monty', 'Dennis', 'Logan', 'Lyle', 'Heath', 'Jody', 'Christoper',
    'Vern', 'Odis', 'Milford', 'Lupe', 'Bradly', 'Terrance', 'Charlie', 'Colby',
    'Kelly', 'Robert', 'Bruno', 'Chong', 'Santo', 'Basil', 'Jeffrey', 'Monroe',
    'Fausto', 'Gerry', 'Sam', 'Alvin', 'Leif', 'Percy', 'Loren', 'Harland',
    'Barry', 'Vance', 'Johnnie', 'Jae', 'Jesse', 'Roderick', 'Berta', 'Lynwood',
    'Jose', 'Mohamed', 'Lino', 'Isidro', 'Arthur', 'Hector', 'Israel', 'Herman',
    'Dillon', 'Douglas', 'Stevie', 'Sid', 'Richard', 'Christian', 'Isaiah', 'Lucien',
    'Maxwell', 'Giuseppe', 'Al', 'Abe', 'Miles', 'Nicky', 'Williams', 'Bryan',
    'Lazaro', 'Philip', 'William', 'Rory', 'Blake', 'Evan', 'Kevin', 'Mickey',
    'Shelby', 'Travis', 'Numbers', 'Norbert', 'Chuck', 'Lionel', 'Nestor', 'Clare',
    'Rich', 'Orlando', 'Michel', 'Noe', 'Jacques', 'Lee', 'Clinton', 'Brett',
    'Filiberto', 'Antione', 'Cory', 'Rogelio', 'Brad', 'Otto', 'Kory', 'Daren',
]
NOMS = [
    'Palla', 'Kogan', 'Tag', 'Madenford', 'Katzman', 'Lenoue', 'Gumbert',
    'Laminack', 'Kinnie', 'Zajdel', 'Host', 'Lustig', 'Krichbaum', 'Stillwagon',
    'Meals', 'Miyamoto', 'Kaplun', 'Dehoff', 'Pele', 'Wisbey', 'Dressler',
    'Tavernier', 'Barncastle', 'Beteta', 'Braim', 'Gehrlein', 'Hamiter', 'Chestand',
    'Rummler', 'Arlia', 'Silverberg', 'Steady', 'Cochrum', 'Gangwer', 'Digsby',
    'Baragar', 'Fullmer', 'Dehrer', 'Spuhler', 'Schroer', 'Chikko', 'Dittberner',
    'Goodness', 'Chadwell', 'Farrelly', 'Lazzar', 'Wolpe', 'Mayer', 'Korth',
    'Cali', 'Dumaine', 'Stansifer', 'Chamber', 'Holubar', 'Shumpert', 'Noggles',
    'Milbradt', 'Survis', 'Wegleitner', 'Foos', 'Turberville', 'Harrop', 'Apolito',
    'Fearheller', 'Tann', 'Goetzke', 'Bohne', 'Stutes', 'Nordling', 'Ingrim',
    'Muhlestein', 'Damoro', 'Yasin', 'Billeter', 'Lese', 'Kuklenski', 'Cagney',
    'Bilbo', 'Shiring', 'Nabers', 'Chenard', 'Sinnett', 'Wakefield', 'Febles',
    'Mcgarrigle', 'Rawdon', 'Kellough', 'Oxton', 'Ledlow', 'Ellingboe', 'Veliz',
    'Satter', 'Vida', 'Martiny', 'Peeters', 'Elfenbein', 'Poncio', 'Stargell',
    'Aaby', 'Corsa', 'Cowboy', 'Soliz', 'Fegaro', 'Mitschelen', 'Delira',
    'Sortland', 'Meloan', 'Vansant', 'Bosack', 'Olcus', 'Reyolds', 'Gies',
    'Krason', 'Tamburrino', 'Carrauza', 'Deboe', 'Havener', 'Moscariello', 'Faupel',
    'Hookano', 'Ottalagano', 'Maung', 'Cenat', 'Masson', 'Rambo', 'Gerster',
    'Gambler', 'Bartling', 'Schwarzlose', 'Kalland', 'Pierpoint', 'Werre', 'Kirstein',
    'Caracciolo', 'Golba', 'Rudnick', 'Huisinga', 'Marvray', 'Henkey', 'Caton',
    'Nasalroad', 'Husch', 'Zalwsky', 'Stolze', 'Krasnecky', 'Hawken', 'Cieszynski',
    'Gamber', 'Seil', 'Wussow', 'Face', 'Trible', 'Shimizu', 'Humm',
    'Kuhnel', 'Ulses', 'Gloodt', 'Whitecloud', 'Pokswinski', 'Josselyn', 'Julitz',
    'Maberry', 'Bury', 'Boling', 'Mccanse', 'Hindle', 'Bethke', 'Coler',
    'Monholland', 'Pancoast', 'Milder', 'Eacret', 'Germain', 'Szymczak', 'Lathan',
    'Pliler', 'Billiter', 'Langlands', 'Queeley', 'Dumire', 'Bjork', 'Wade',
    'Montaluo', 'Mcquiddy', 'Pilgreen', 'Mehalic', 'Pousson', 'Smigaj', 'Crosslin',
    'Culkin', 'Woolen', 'Niemi', 'Mckoy', 'Macreno', 'Ellanson', 'Troia',
    'Corrga', 'Majkut', 'Wagle', 'Paguirigan', 'Berland', 'Provine', 'Heziak',
    'Sessa', 'Dallis', 'Wigger', 'Sioma', 'Drilling', 'Mazzera', 'Odebralski',
    'Mcgown', 'Lipkovitch', 'Botdorf', 'Borodec', 'Goralski', 'Raudenbush', 'Purdum',
    'Schabert', 'Threats', 'Dashem', 'Hardnette', 'Vogelzang', 'Huelsman', 'Chimeno',
    'Baka', 'Meharg', 'Nyreen', 'Grau', 'Lorin', 'Swanigan', 'Mantell',
    'Niebyl', 'Huskin', 'Mcferren', 'Roher', 'Siering', 'Klawitter', 'Sanosyan',
    'Dainels', 'Rickels',
]
RUES = [
    'A H Gray Dr', 'Aaron Park Blvd', 'Abbey Field Circle', 'Abbey Glen Ave',
    'Abbey Manor Dr', 'Abbeyfeale Way', 'Abbie Dr', 'Abbotshall Dr',
    'Abbotsleigh St', 'Abbottswell St', 'Abby Wood Rd', 'Abden St',
    'Abe Way', 'Abels Dr', 'Abels Way', 'Abercairn Dr',
    'Aberford Way', 'Abington Woods Way', 'Abner Belcher St', 'Abrahams Blvd',
    'Academia Rd', 'Access Rd', 'Accokeek Landing Ave', 'Accomodation Ave',
    'Acela Way', 'Acer Blvd', 'Acer Dr', 'Acheson St',
    'Acushnet Rd', 'Adalis Rd', 'Adam Rd', 'Adanac Ave',
    'Adare Circle', 'Adclare Ave', 'Adcroft Ave', 'Addisson Circle',
    'Adelia Circle', 'Adenlee Rd', 'Adkins Ave', 'Adley St',
    'Admiralty Rd', 'Adria Ave', 'Adrianne Rd', 'Adult Way',
    'Aeolus Way', 'Aerator St', 'Aerie Wynde Way', 'Afterglow Ave',
    'Agatite St', 'Ager St', 'Agostino Dr', 'Agraria Circle',
    'Aikens Circle', 'Aimee Ave', 'Ainslie Wood Rd', 'Air Base Way',
    'Air View Way', 'Airbase Ave', 'Airfield Circle', 'Airport Plaza Rd',
    'Airport St', 'Airport Way', 'Aitken Ave', 'Akbar Ave',
    'Akerman Ave', 'Akron Dr', 'Aladdin Ave', 'Alam Rd',
    'Alamo Oaks Dr', 'Alan Crest St', 'Alandale St', 'Alann Dr',
    'Albee Dr', 'Alcinda Way', 'Alcova Blvd', 'Alcova Way',
    'Alden Rd', 'Alder Woods St', 'Alderfold Blvd', 'Alders End St',
    'Aldershot Ave', 'Alderue Way', 'Alderwick St', 'Aldrich St',
    'Aldwin Blvd', 'Aldworth Circle', 'Alexander Fleming Blvd', 'Alexanders Dr',
    'Alfan St', 'Alfold Circle', 'Alfreda Circle', 'Algosi Blvd',
    'Algosi Way', 'Alherst Dr', 'Alice Griffith Circle', 'Alinda Rd',
    'Aline Circle', 'Aljay Ave', 'Aljay Circle', 'Alkerden St',
    'Alkham Dr', 'All Souls Blvd', 'Allanhill Way', 'Alldens Circle',
    'Allegany St', 'Allende Rd', 'Allenwood St', 'Aller St',
    'Allerman Ave', 'Allied St', 'Alling Ave', 'Alliott Way',
    'Allmen Way', 'Allwood St', 'Alma Bridge Way', 'Alma Dr',
    'Almaden Blvd', 'Alness Blvd', 'Alonzo Dr', 'Alosio Blvd',
    'Alp Dr', 'Alpenglow Rd', 'Alpha Rd', 'Alt Hill Blvd',
    'Alta Garden St', 'Alta Sierra Rd', 'Altair Way', 'Altamara Circle',
    'Altamara St', 'Altamira Ave', 'Altamount Dr', 'Altenitas Blvd',
    'Altenitas Circle', 'Altessa Way', 'Althea Blvd', 'Althorn Rd',
    'Altimont Rd', 'Alton Way', 'Altona Circle', 'Altschul Way',
    'Alyson Dr', 'Alyssum Rd', 'Alywne Way', 'Amaro Dr',
    'Amaya Creek Circle', 'Amaya Creek Way', 'Amber Way', 'Amberley Rd',
    'Amberson St', 'Amblewood St', 'Ambric Knolls Rd', 'Ambum Ave',
    'Ambum Blvd', 'Amendodge Circle', 'Americana Circle', 'Amersham Hill St',
    'Amman St', 'Ammunition Rd', 'Amondo Way', 'Amott Ave',
    'Amour Rd', 'Amulet Ave', 'Amur Hill Circle', 'Amvet Dr',
    'Ana Lisa Blvd', 'Anamosa St', 'Anand Brook Circle', 'Anand Brook Rd',
    'Ananda Way', 'Ancho Vista Circle', 'Ancroft Rd', 'Andard St',
    'Andersen Ave', 'Andover Dr', 'Andres Ave', 'Andwell Circle',
    'Andy Rd', 'Anfred Ave', 'Angas Dr', 'Angela Rose Dr',
    'Angelica Ave', 'Angelica St', 'Anglefield Ave', 'Anglers Blvd',
    'Anglican Way', 'Angophora Way', 'Angouleme Dr', 'Angwin St',
    'Anna Mac Ave', 'Annapolitan Dr', 'Anne Arundel Dr', 'Anne Tucker Rd',
    'Annes Prospect Blvd', 'Anniston Ave', 'Annunciation Way', 'Anola Circle',
    'Ansdell Blvd', 'Ansdell Rd', 'Ansley Way', 'Antares Dr',
]
VOITURES = [
    ('GMC', 'Sierra 1500'), ('Hyundai', 'Elantra'), ('Toyota', 'Corolla'),
    ('GMC', 'Yukon'), ('Toyota', 'Land Cruiser'), ('GMC', 'Savana 3500'),
    ('Lexus', 'LX'), ('Lexus', 'GS'), ('BMW', '5 Series'),
    ('Nissan', 'Maxima'), ('Audi', 'A4'), ('BMW', 'X5'),
    ('Porsche', '911'), ('GMC', 'Yukon XL 2500'), ('Infiniti', 'G'),
    ('Jeep', 'Wrangler'), ('Land Rover', 'Discovery'), ('Mercedes-Benz', 'SLK-Class'),
    ('Chevrolet', 'Suburban 2500'), ('Jeep', 'Grand Cherokee'), ('Mercedes-Benz', 'M-Class'),
    ('Chevrolet', 'Suburban 1500'), ('Chrysler', 'Town & Country'), ('Ford', 'F250'),
    ('Ford', 'F350'), ('Honda', 'Odyssey'), ('Lexus', 'LS'),
    ('Mercedes-Benz', 'S-Class'), ('Subaru', 'Legacy'), ('Toyota', 'Sequoia'),
    ('Audi', 'A8'), ('Chevrolet', 'Express 2500'), ('Chevrolet', 'Malibu'),
    ('Dodge', 'Dakota'), ('Dodge', 'Ram 2500'), ('Dodge', 'Ram 3500'),
    ('Ford', 'E-Series'), ('Ford', 'Taurus'), ('GMC', 'Savana 2500'),
    ('Mazda', 'Miata MX-5'), ('Mitsubishi', 'Galant'), ('Toyota', 'RAV4'),
    ('Acura', 'TL'), ('Chevrolet', 'Corvette'), ('Ford', 'Mustang'),
    ('GMC', 'Savana 1500'), ('Hyundai', 'Santa Fe'), ('Saab', '9-3'),
    ('Acura', 'MDX'), ('Chevrolet', 'Express 1500'), ('Ford', 'F150'),
    ('Ford', 'Ranger'), ('Lexus', 'ES'), ('Lincoln', 'Town Car'),
    ('Nissan', 'Sentra'), ('Volkswagen', 'New Beetle'), ('Volvo', 'S60'),
    ('BMW', '7 Series'), ('Chevrolet', 'Express 3500'), ('Chrysler', 'Sebring'),
    ('Ford', 'Escape'), ('GMC', 'Sierra 2500'), ('Hyundai', 'Accent'),
    ('Toyota', 'Matrix'), ('Volkswagen', 'Passat'), ('BMW', '3 Series'),
    ('Cadillac', 'Escalade ESV'), ('Dodge', 'Caravan'), ('Ford', 'Explorer'),
    ('Honda', 'CR-V'),
]
# ===========================================================================
# GÉNÉRATION
# ===========================================================================
from datetime import date, timedelta

rng = random.Random(GRAINE)
ALNUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"


def esc(v):
    """Échappe une valeur pour l'insérer dans une requête SQL."""
    if v is None:
        return "NULL"
    if isinstance(v, int):
        return str(v)
    return "'" + str(v).replace("'", "''") + "'"


def jour(debut="2017-01-01", fin="2018-06-30"):
    """Date aléatoire au format entier AAAAMMJJ."""
    d1, d2 = date.fromisoformat(debut), date.fromisoformat(fin)
    d = d1 + timedelta(days=rng.randrange((d2 - d1).days))
    return int(d.strftime("%Y%m%d"))


_noms, _ssn, _plaques = set(), set(), set()


def nom(prenom=None):
    while True:
        n = f"{prenom or rng.choice(PRENOMS)} {rng.choice(NOMS)}"
        if n not in _noms:
            _noms.add(n)
            return n


def ssn():
    while True:
        s = str(rng.randrange(100000000, 999999999))
        if s not in _ssn:
            _ssn.add(s)
            return s


def plaque(avec_fragment=False):
    """Plaque de 6 caractères. Le fragment H42W n'apparaît QUE si demandé,
    afin que le nombre de plaques suspectes soit exactement maîtrisé."""
    while True:
        if avec_fragment:
            i = rng.randrange(0, 3)
            p = ("".join(rng.choice(ALNUM) for _ in range(i)) + FRAGMENT_PLAQUE
                 + "".join(rng.choice(ALNUM) for _ in range(2 - i)))
        else:
            p = "".join(rng.choice(ALNUM) for _ in range(6))
            if FRAGMENT_PLAQUE in p:
                continue
        if p not in _plaques:
            _plaques.add(p)
            return p


personnes = []
_ids_p = rng.sample(range(10000, 100000), N_PERSONNES)
_ids_l = rng.sample(range(100000, 1000000), N_PERSONNES)


def viser_le_milieu(ids, nb, bas=0.35, haut=0.72):
    """Les tables person et driver_license sont écrites triées par identifiant.
    Comme les personnages de l'enquête sont créés en premier, on leur attribue
    des identifiants situés au milieu du classement : sans cela, un simple
    SELECT * les afficherait dans les toutes premières lignes."""
    tri = sorted(ids)
    cibles = rng.sample(tri[int(len(tri) * bas):int(len(tri) * haut)], nb)
    for i, cible in enumerate(cibles):
        j = ids.index(cible)
        ids[i], ids[j] = ids[j], ids[i]


viser_le_milieu(_ids_p, 4)
viser_le_milieu(_ids_l, 4)


def ajouter(nom_complet=None, prenom=None, rue=None, numero=None,
            genre=None, cheveux=None, taille=None, voiture=None,
            fragment=False, permis=True):
    """Crée une personne (et son permis) et renvoie son index."""
    i = len(personnes)
    # Règle d'or : une personne générique ne doit JAMAIS être une femme rousse.
    # Toutes les femmes rousses sont placées explicitement dans les cohortes
    # ci-dessous, ce qui rend les compteurs de l'entonnoir final exacts.
    while True:
        g = genre or rng.choice(["male", "female"])
        h = cheveux or rng.choice(COULEURS_CHEVEUX)
        if genre is None and cheveux is None and g == GENRE_C and h == CHEVEUX_C:
            continue
        break
    v = voiture or rng.choice(VOITURES)
    p = {
        "id": _ids_p[i],
        "name": nom_complet or nom(prenom),
        "license_id": _ids_l[i] if permis else None,
        "address_number": numero if numero is not None else rng.randrange(100, 4800),
        "address_street_name": rue or rng.choice(RUES),
        "ssn": ssn(),
        "age": rng.randrange(18, 86),
        "height": taille if taille is not None else rng.randrange(60, 79),
        "eye_color": rng.choice(COULEURS_YEUX),
        "hair_color": h,
        "gender": g,
        "plate_number": plaque(fragment),
        "car_make": v[0],
        "car_model": v[1],
    }
    personnes.append(p)
    return i


# --- 1. Les quatre personnages de l'enquête ---------------------------------
I_TUEUR = ajouter(nom_complet=TUEUR, genre="male", fragment=True)
personnes[I_TUEUR]["plate_number"] = PLAQUE_TUEUR
_plaques.add(PLAQUE_TUEUR)

I_CERVEAU = ajouter(nom_complet=COMMANDITAIRE, genre=GENRE_C, cheveux=CHEVEUX_C,
                    taille=66, voiture=VOITURE_C)

I_TEMOIN1 = ajouter(nom_complet=TEMOIN1, rue=RUE_TEMOIN1, numero=4919)
I_TEMOIN2 = ajouter(nom_complet=TEMOIN2, rue=RUE_TEMOIN2)

# --- 2. Cohortes de bruit ciblé ---------------------------------------------
# 2a. Les voisins du témoin 1. Sans ORDER BY, l'élève voit 60 lignes ; les
#     numéros les plus élevés sont volontairement proches de 4919.
numeros = rng.sample(range(100, 4890), ENTONNOIRS["habitants_rue1"] - 1)
numeros[:6] = [4901, 4888, 4877, 4860, 4842, 4831]
C_RUE1 = [ajouter(rue=RUE_TEMOIN1, numero=n) for n in numeros]

# 2b. Les voisins du témoin 2 (aucun ne s'appelle Annabel).
C_RUE2 = [ajouter(rue=RUE_TEMOIN2) for _ in range(ENTONNOIRS["habitants_rue2"] - 1)]

# 2c. Les homonymes : 'Annabel%' seul ne suffit pas, il faut croiser avec la rue.
C_ANNABEL = [ajouter(prenom=rng.choice(["Annabel", "Annabelle", "Annabell"]))
             for _ in range(ENTONNOIRS["prenoms_annabel"] - 1)]

# 2d. Les sosies de la commanditaire, par cercles concentriques.
C_TESLA = [ajouter(genre=GENRE_C, cheveux=CHEVEUX_C,
                   taille=rng.randrange(TAILLE_MIN, TAILLE_MAX + 1), voiture=VOITURE_C)
           for _ in range(ENTONNOIRS["femmes_rousses_tesla"] - 1)]
_autres = [v for v in VOITURES if tuple(v) != VOITURE_C]
C_TAILLE = [ajouter(genre=GENRE_C, cheveux=CHEVEUX_C,
                    taille=rng.randrange(TAILLE_MIN, TAILLE_MAX + 1),
                    voiture=rng.choice(_autres))
            for _ in range(ENTONNOIRS["femmes_rousses_taille"]
                           - ENTONNOIRS["femmes_rousses_tesla"])]
C_ROUSSES = [ajouter(genre=GENRE_C, cheveux=CHEVEUX_C,
                     taille=rng.choice(list(range(60, TAILLE_MIN))
                                       + list(range(TAILLE_MAX + 1, 79))))
             for _ in range(ENTONNOIRS["femmes_rousses"]
                            - ENTONNOIRS["femmes_rousses_taille"])]

# 2e. Des Tesla Model S conduites par d'autres profils, pour que la marque et
#     le modèle seuls ne suffisent jamais à désigner quelqu'un. La règle d'or
#     de ajouter() garantit qu'aucun de ces conducteurs n'est une femme rousse.
C_TESLA_NEUTRE = [ajouter(voiture=VOITURE_C)
                  for _ in range(ENTONNOIRS["tesla_model_s"]
                                 - ENTONNOIRS["femmes_rousses_tesla"])]

# 2f. Les plaques suspectes : 25 véhicules contiennent H42W.
C_PLAQUE = [ajouter(fragment=True) for _ in range(ENTONNOIRS["plaques_h42w"] - 1)]

# --- 3. Le reste de la population -------------------------------------------
C_QUELCONQUE = [ajouter(permis=rng.random() > 0.04)
                for _ in range(N_PERSONNES - len(personnes))]

INTERDITS_PLAQUE = set(C_PLAQUE) | {I_TUEUR}

# --- 4. Salle de sport « Get Fit Now » --------------------------------------
_ids_gym = set()


def id_gym(avec_prefixe):
    while True:
        i = (PREFIXE_SAC + "".join(rng.choice(ALNUM) for _ in range(2))
             if avec_prefixe else "".join(rng.choice(ALNUM) for _ in range(5)))
        if not avec_prefixe and i.startswith(PREFIXE_SAC):
            continue
        if i not in _ids_gym:
            _ids_gym.add(i)
            return i


membres = []           # (id, index_personne, statut)


def membre(i_pers, prefixe, statut):
    m = (id_gym(prefixe), i_pers, statut)
    membres.append(m)
    return m


# Le tueur : c'est LUI que décrit le témoin (sac 48Z, statut gold).
_ids_gym.add(ID_GYM_TUEUR)
M_TUEUR = (ID_GYM_TUEUR, I_TUEUR, "gold")
membres.append(M_TUEUR)

# 14 autres membres « gold » dont le numéro commence par 48Z. Aucun d'eux n'a
# de plaque suspecte : c'est ce qui rend la solution finale unique.
_dispo = [i for i in C_QUELCONQUE if i not in INTERDITS_PLAQUE]
rng.shuffle(_dispo)
_pool = iter(_dispo)
M_48Z_GOLD = [membre(next(_pool), True, "gold")
              for _ in range(ENTONNOIRS["membres_48z_gold"] - 1)]
# 25 membres 48Z qui ne sont pas « gold »
M_48Z_AUTRES = [membre(next(_pool), True, rng.choice(["silver", "regular"]))
                for _ in range(ENTONNOIRS["membres_48z"] - ENTONNOIRS["membres_48z_gold"])]
# Le témoin 2 est membre : c'est là qu'elle a reconnu le tueur.
M_TEMOIN2 = membre(I_TEMOIN2, False, "regular")
# Le reste des membres
M_AUTRES = [membre(next(_pool), False, rng.choice(STATUTS_GYM))
            for _ in range(N_MEMBRES_GYM - len(membres))]

checkins_gym = []      # (id_membre, date, entree, sortie)


def checkin(id_membre, d):
    e = rng.randrange(300, 1300)
    checkins_gym.append((id_membre, d, e, e + rng.randrange(20, 120)))


# Le 9 janvier : 30 passages, dont exactement 4 membres « gold » en 48Z.
checkin(ID_GYM_TUEUR, DATE_GYM)
for m in rng.sample(M_48Z_GOLD, ENTONNOIRS["membres_48z_gold_date"] - 1):
    checkin(m[0], DATE_GYM)
checkin(M_TEMOIN2[0], DATE_GYM)
_non_suspects = [m for m in M_48Z_AUTRES + M_AUTRES if m is not M_TEMOIN2]
for m in rng.sample(_non_suspects,
                    ENTONNOIRS["checkins_gym_date"] - ENTONNOIRS["membres_48z_gold_date"] - 1):
    checkin(m[0], DATE_GYM)

while len(checkins_gym) < N_CHECKINS_GYM:
    d = jour("2017-06-01", "2018-06-30")
    if d != DATE_GYM:
        checkin(rng.choice(membres)[0], d)

# --- 5. Événements Facebook -------------------------------------------------
# 40 personnes sont allées 3 fois au concert en décembre 2017. Ce critère seul
# ne suffit donc pas : il faut le croiser avec le signalement physique.
# La composition des 40 est choisie exprès : on y place une femme rousse de la
# bonne taille (mais qui ne conduit pas de Tesla) et quelques autres rousses.
# Ainsi, en partant du concert, l'élève descend 40 -> 6 -> 2 -> 1 : chaque
# critère du signalement sert vraiment à quelque chose.
_leurre_taille = rng.sample(C_TAILLE, ENTONNOIRS["concert_3x_rousses_taille"] - 1)
_leurre_rousses = rng.sample(C_ROUSSES, ENTONNOIRS["concert_3x_rousses"]
                             - ENTONNOIRS["concert_3x_rousses_taille"])
_neutres = [i for i in C_QUELCONQUE]
rng.shuffle(_neutres)
C_CONCERT = ([I_CERVEAU] + _leurre_taille + _leurre_rousses
             + _neutres[:ENTONNOIRS["concert_3x"] - 1
                        - len(_leurre_taille) - len(_leurre_rousses)])
_candidats = _neutres[len(C_CONCERT):]
_deja_concert = set(C_CONCERT)

checkins_fb = []       # (index_personne, id_evenement, nom, date)


def checkin_fb(i_pers, evenement, d):
    checkins_fb.append((i_pers, EVENEMENTS.index(evenement) + 1, evenement, d))


for i in C_CONCERT:
    for j in rng.sample(range(1, 32), NB_CONCERTS):
        checkin_fb(i, EVENEMENT_CIBLE, 20171200 + j)

# 250 personnes y sont allées une ou deux fois seulement.
for i in _candidats[:250]:
    for j in rng.sample(range(1, 32), rng.randrange(1, NB_CONCERTS)):
        checkin_fb(i, EVENEMENT_CIBLE, 20171200 + j)
    _deja_concert.add(i)

# Le concert existe aussi en dehors de décembre 2017.
_autres_evts = [e for e in EVENEMENTS if e != EVENEMENT_CIBLE]
while len(checkins_fb) < N_CHECKINS_FB:
    i = rng.randrange(N_PERSONNES)
    checkin_fb(i, rng.choice(_autres_evts), jour())

# --- 6. Interrogatoires -----------------------------------------------------
def texte(base, complements):
    """Compose un texte de bruit : un énoncé, plus zéro à deux compléments.
    C'est ce qui donne au bruit la même variété de longueur qu'aux vrais
    textes, pour qu'un SELECT * ne trahisse pas les bonnes réponses."""
    t = rng.choice(base)
    for c in rng.sample(complements, rng.choices([0, 1, 2, 3], weights=[20, 35, 28, 17])[0]):
        t += c
    return t



interviews = [(I_TEMOIN1, TEXTES["interview_temoin1"]),
              (I_TEMOIN2, TEXTES["interview_temoin2"]),
              (I_TUEUR, TEXTES["interview_tueur"])]
_deja = {I_TEMOIN1, I_TEMOIN2, I_TUEUR}
while len(interviews) < N_INTERVIEWS:
    i = rng.randrange(N_PERSONNES)
    if i not in _deja:
        _deja.add(i)
        interviews.append((i, texte(DEPOSITIONS, COMPLEMENTS_DEPOSITION)))

# --- 7. Rapports de police --------------------------------------------------
rapports = [(DATE_CRIME, "murder", TEXTES["rapport_meurtre"], VILLE)]
_pas_meurtre = [t for t in TYPES_CRIME if t != "murder"]


def fait(type_crime):
    """Description cohérente avec le type de crime."""
    return texte(FAITS_DIVERS[type_crime], COMPLEMENTS_FAIT)


# 29 autres faits le jour du crime, à SQL City
for _ in range(ENTONNOIRS["rapports_ville_date"] - 1):
    t = rng.choice(_pas_meurtre)
    rapports.append((DATE_CRIME, t, fait(t), VILLE))
# 14 autres meurtres à SQL City, mais à d'autres dates
for _ in range(ENTONNOIRS["rapports_ville_meurtre"] - 1):
    d = jour()
    while d == DATE_CRIME:
        d = jour()
    rapports.append((d, "murder", fait("murder"), VILLE))
# le reste des faits à SQL City
while len([r for r in rapports if r[3] == VILLE]) < ENTONNOIRS["rapports_ville"]:
    d = jour()
    if d == DATE_CRIME:
        continue
    t = rng.choice(_pas_meurtre)
    rapports.append((d, t, fait(t), VILLE))
# les autres villes
while len(rapports) < N_RAPPORTS:
    t = rng.choice(TYPES_CRIME)
    rapports.append((jour(), t, fait(t), rng.choice(AUTRES_VILLES)))
rng.shuffle(rapports)

# --- 8. Revenus -------------------------------------------------------------
_echantillon = rng.sample([p for p in personnes if p is not personnes[I_CERVEAU]], 1999)
revenus = [(p["ssn"], rng.randrange(120, 1300) * 100) for p in _echantillon]
# La commanditaire « a beaucoup d'argent », mais quelques dizaines de personnes
# gagnent davantage : trier la table income ne donne donc pas la réponse.
revenus.append((personnes[I_CERVEAU]["ssn"], 127500))
rng.shuffle(revenus)

# ===========================================================================
# ÉCRITURE DU FICHIER SQL
# ===========================================================================
SCHEMA = '''BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "crime_scene_report" (
\t"date"\tinteger,
\t"type"\ttext,
\t"description"\ttext,
\t"city"\ttext
);
CREATE TABLE IF NOT EXISTS "driver_license" (
\t"id"\tinteger,
\t"age"\tinteger,
\t"height"\tinteger,
\t"eye_color"\ttext,
\t"hair_color"\ttext,
\t"gender"\ttext,
\t"plate_number"\ttext,
\t"car_make"\ttext,
\t"car_model"\ttext,
\tPRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "facebook_event_checkin" (
\t"person_id"\tinteger,
\t"event_id"\tinteger,
\t"event_name"\ttext,
\t"date"\tinteger,
\tFOREIGN KEY("person_id") REFERENCES "person"("id")
);
CREATE TABLE IF NOT EXISTS "interview" (
\t"person_id"\tinteger,
\t"transcript"\ttext,
\tFOREIGN KEY("person_id") REFERENCES "person"("id")
);
CREATE TABLE IF NOT EXISTS "get_fit_now_member" (
\t"id"\ttext,
\t"person_id"\tinteger,
\t"name"\ttext,
\t"membership_start_date"\tinteger,
\t"membership_status"\ttext,
\tPRIMARY KEY("id"),
\tFOREIGN KEY("person_id") REFERENCES "person"("id")
);
CREATE TABLE IF NOT EXISTS "get_fit_now_check_in" (
\t"membership_id"\ttext,
\t"check_in_date"\tinteger,
\t"check_in_time"\tinteger,
\t"check_out_time"\tinteger,
\tFOREIGN KEY("membership_id") REFERENCES "get_fit_now_member"("id")
);
CREATE TABLE IF NOT EXISTS "solution" (
\t"user"\tinteger,
\t"value"\ttext
);
CREATE TABLE IF NOT EXISTS "income" (
\t"ssn"\tCHAR,
\t"annual_income"\tinteger,
\tPRIMARY KEY("ssn")
);
CREATE TABLE IF NOT EXISTS "person" (
\t"id"\tinteger,
\t"name"\ttext,
\t"license_id"\tinteger,
\t"address_number"\tinteger,
\t"address_street_name"\ttext,
\t"ssn"\tCHAR,
\tPRIMARY KEY("id"),
\tFOREIGN KEY("ssn") REFERENCES "income"("ssn"),
\tFOREIGN KEY("license_id") REFERENCES "driver_license"("id")
);
'''

TRIGGER = '''CREATE TRIGGER check_solution AFTER INSERT ON solution
    WHEN new.user==1
    BEGIN
        DELETE FROM solution;
        INSERT INTO solution VALUES (0,
        CASE WHEN new.value=={tueur} THEN {msg_tueur}
             WHEN new.value=={cerveau} THEN {msg_cerveau}
             ELSE {msg_faux}
        END
        );
    END;
COMMIT;
'''


def insert(table, lignes):
    if not lignes:
        return ""
    corps = [",\n ".join("(" + ",".join(esc(v) for v in l) + ")" for l in lignes)]
    return f'INSERT INTO "{table}" VALUES ' + "".join(corps) + ";\n"


# ORDRE DES LIGNES — important.
# Les personnages de l'enquête sont créés en premier dans ce script. Si on les
# écrivait dans cet ordre, un simple SELECT * les afficherait en tête de table
# et l'énigme se résoudrait à l'œil. Les tables munies d'une clef primaire sont
# donc triées sur cette clef (qui est tirée au hasard, donc les personnages
# atterrissent au milieu), et les autres sont mélangées.
def au_milieu(liste, est_cle, bas=0.35, haut=0.72):
    """Mélange la liste puis replace les lignes clefs au milieu."""
    liste = liste[:]
    rng.shuffle(liste)
    cles = [x for x in liste if est_cle(x)]
    reste = [x for x in liste if not est_cle(x)]
    for x in cles:
        reste.insert(rng.randrange(int(len(reste) * bas), int(len(reste) * haut)), x)
    return reste


rapports = au_milieu(rapports, lambda r: r[1] == "murder" and r[0] == DATE_CRIME
                     and r[3] == VILLE)
interviews = au_milieu(interviews, lambda t: t[0] in (I_TUEUR, I_TEMOIN1, I_TEMOIN2))
checkins_fb = au_milieu(checkins_fb, lambda c: c[0] == I_CERVEAU
                        and c[2] == EVENEMENT_CIBLE and 20171201 <= c[3] <= 20171231)
checkins_gym = au_milieu(checkins_gym, lambda c: c[0] == ID_GYM_TUEUR
                         and c[1] == DATE_GYM)
_membres_melanges = au_milieu(membres, lambda m: m[0] == ID_GYM_TUEUR)

parties = [SCHEMA]
parties.append(insert("crime_scene_report", rapports))
parties.append(insert("driver_license",
                      sorted([(p["license_id"], p["age"], p["height"], p["eye_color"],
                               p["hair_color"], p["gender"], p["plate_number"],
                               p["car_make"], p["car_model"])
                              for p in personnes if p["license_id"] is not None])))
parties.append(insert("facebook_event_checkin",
                      [(personnes[i]["id"], e, n, d) for i, e, n, d in checkins_fb]))
parties.append(insert("interview", [(personnes[i]["id"], t) for i, t in interviews]))
parties.append(insert("get_fit_now_member",
                      [(mid, personnes[i]["id"], personnes[i]["name"],
                        jour("2016-01-01", "2017-12-31"), st)
                       for mid, i, st in _membres_melanges]))
parties.append(insert("get_fit_now_check_in", checkins_gym))
parties.append(insert("income", sorted(revenus)))
parties.append(insert("person",
                      sorted([(p["id"], p["name"], p["license_id"], p["address_number"],
                               p["address_street_name"], p["ssn"]) for p in personnes])))
parties.append(TRIGGER.format(
    tueur=esc(TUEUR), cerveau=esc(COMMANDITAIRE),
    msg_tueur=esc(TEXTES["solution_tueur"]),
    msg_cerveau=esc(TEXTES["solution_commanditaire"]),
    msg_faux=esc(TEXTES["solution_faux"])))

sql = "".join(parties)
# Le dépôt est sous Windows et ses fichiers sont en CRLF : on respecte cette
# convention, sinon la moindre régénération produit un diff sur toutes les lignes.
with open(SORTIE, "w", encoding="utf-8", newline="\r\n") as f:
    f.write(sql)
taille_octets = len(sql.replace("\n", "\r\n").encode("utf-8"))

# ===========================================================================
# VÉRIFICATIONS
#
# Elles échouent bruyamment si une modification casse l'enquête : chaque étape
# doit renvoyer le bon nombre de lignes, et la dernière doit être unique.
# ===========================================================================
import sqlite3
import sys

db = sqlite3.connect(":memory:")
db.executescript(sql)


def un(requete):
    return db.execute(requete).fetchone()[0]


def verifier(libelle, obtenu, attendu):
    etat = "OK " if obtenu == attendu else "ÉCHEC"
    print(f"  [{etat}] {libelle:52s} {obtenu:>5} (attendu {attendu})")
    return obtenu == attendu


print(f"\nFichier écrit : {SORTIE}  ({taille_octets / 1024:.0f} Ko, "
      f"{sql.count(chr(10))} lignes)")
print("\nTailles des tables")
for t in ["crime_scene_report", "driver_license", "facebook_event_checkin",
          "interview", "get_fit_now_member", "get_fit_now_check_in",
          "income", "person"]:
    print(f"  {t:24s} {un(f'select count(*) from {t}'):6d}")

ok = True
print("\nEntonnoirs (ce que voit un élève selon le nombre de conditions)")
ok &= verifier("rapports à SQL City", un(
    f"select count(*) from crime_scene_report where city='{VILLE}'"),
    ENTONNOIRS["rapports_ville"])
ok &= verifier("... + la bonne date", un(
    f"select count(*) from crime_scene_report where city='{VILLE}' "
    f"and date={DATE_CRIME}"), ENTONNOIRS["rapports_ville_date"])
ok &= verifier("... + le bon type (meurtre)", un(
    f"select count(*) from crime_scene_report where city='{VILLE}' "
    f"and date={DATE_CRIME} and type='murder'"), 1)
ok &= verifier("meurtres à SQL City, toutes dates", un(
    f"select count(*) from crime_scene_report where city='{VILLE}' "
    f"and type='murder'"), ENTONNOIRS["rapports_ville_meurtre"])
ok &= verifier(f"habitants de {RUE_TEMOIN1}", un(
    f"select count(*) from person where address_street_name='{RUE_TEMOIN1}'"),
    ENTONNOIRS["habitants_rue1"])
ok &= verifier(f"habitants de {RUE_TEMOIN2}", un(
    f"select count(*) from person where address_street_name='{RUE_TEMOIN2}'"),
    ENTONNOIRS["habitants_rue2"])
ok &= verifier("personnes prénommées Annabel*", un(
    "select count(*) from person where name like 'Annabel%'"),
    ENTONNOIRS["prenoms_annabel"])
ok &= verifier("... + habitant Franklin Ave", un(
    f"select count(*) from person where name like 'Annabel%' "
    f"and address_street_name='{RUE_TEMOIN2}'"), 1)
ok &= verifier("membres dont le numéro commence par 48Z", un(
    f"select count(*) from get_fit_now_member where id like '{PREFIXE_SAC}%'"),
    ENTONNOIRS["membres_48z"])
ok &= verifier("... + statut gold", un(
    f"select count(*) from get_fit_now_member where id like '{PREFIXE_SAC}%' "
    f"and membership_status='gold'"), ENTONNOIRS["membres_48z_gold"])
ok &= verifier("passages au fitness le 9 janvier", un(
    f"select count(*) from get_fit_now_check_in where check_in_date={DATE_GYM}"),
    ENTONNOIRS["checkins_gym_date"])
ok &= verifier("... + 48Z + gold (les 3 conditions)", un(
    f"select count(*) from get_fit_now_member m join get_fit_now_check_in c "
    f"on c.membership_id=m.id where m.id like '{PREFIXE_SAC}%' "
    f"and m.membership_status='gold' and c.check_in_date={DATE_GYM}"),
    ENTONNOIRS["membres_48z_gold_date"])
ok &= verifier("plaques contenant H42W", un(
    f"select count(*) from driver_license where plate_number like '%{FRAGMENT_PLAQUE}%'"),
    ENTONNOIRS["plaques_h42w"])
ok &= verifier("femmes rousses", un(
    f"select count(*) from driver_license where gender='{GENRE_C}' "
    f"and hair_color='{CHEVEUX_C}'"), ENTONNOIRS["femmes_rousses"])
ok &= verifier("... + taille 65-67", un(
    f"select count(*) from driver_license where gender='{GENRE_C}' "
    f"and hair_color='{CHEVEUX_C}' and height between {TAILLE_MIN} and {TAILLE_MAX}"),
    ENTONNOIRS["femmes_rousses_taille"])
ok &= verifier("... + Tesla Model S", un(
    f"select count(*) from driver_license where gender='{GENRE_C}' "
    f"and hair_color='{CHEVEUX_C}' and height between {TAILLE_MIN} and {TAILLE_MAX} "
    f"and car_make='{VOITURE_C[0]}' and car_model='{VOITURE_C[1]}'"),
    ENTONNOIRS["femmes_rousses_tesla"])
ok &= verifier("Tesla Model S, tous profils confondus", un(
    f"select count(*) from driver_license where car_make='{VOITURE_C[0]}' "
    f"and car_model='{VOITURE_C[1]}'"), ENTONNOIRS["tesla_model_s"])
ok &= verifier("3 présences au concert en déc. 2017", un(
    f"select count(*) from (select person_id from facebook_event_checkin "
    f"where event_name='{EVENEMENT_CIBLE}' and date between 20171201 and 20171231 "
    f"group by person_id having count(*)={NB_CONCERTS})"), ENTONNOIRS["concert_3x"])

_concert = (f"select f.person_id from facebook_event_checkin f "
            f"join person p on p.id=f.person_id "
            f"join driver_license d on d.id=p.license_id "
            f"where f.event_name='{EVENEMENT_CIBLE}' "
            f"and f.date between 20171201 and 20171231 ")
ok &= verifier("... + femme rousse", un(
    f"select count(*) from ({_concert} and d.gender='{GENRE_C}' "
    f"and d.hair_color='{CHEVEUX_C}' group by f.person_id "
    f"having count(*)={NB_CONCERTS})"), ENTONNOIRS["concert_3x_rousses"])
ok &= verifier("... + taille 65-67", un(
    f"select count(*) from ({_concert} and d.gender='{GENRE_C}' "
    f"and d.hair_color='{CHEVEUX_C}' and d.height between {TAILLE_MIN} and {TAILLE_MAX} "
    f"group by f.person_id having count(*)={NB_CONCERTS})"),
    ENTONNOIRS["concert_3x_rousses_taille"])
ok &= verifier("personnes plus riches que la commanditaire", un(
    f"select count(*) >= {ENTONNOIRS['revenus_superieurs']} from income "
    f"where annual_income > (select annual_income from income where ssn="
    f"(select ssn from person where name={esc(COMMANDITAIRE)}))"), 1)

print("\nDiscrétion des bonnes réponses")


def position(table, condition):
    """Position relative (en %) de la ligne cherchée dans un SELECT * brut."""
    lignes = db.execute(f"select rowid from {table}").fetchall()
    cible = db.execute(f"select rowid from {table} where {condition}").fetchone()[0]
    return round(100 * [l[0] for l in lignes].index(cible) / len(lignes))


for libelle, table, cond in [
        ("le rapport du meurtre", "crime_scene_report",
         f"city='{VILLE}' and date={DATE_CRIME} and type='murder'"),
        ("le meurtrier", "person", f"name={esc(TUEUR)}"),
        ("la commanditaire", "person", f"name={esc(COMMANDITAIRE)}"),
        ("le témoin 1", "person", f"name={esc(TEMOIN1)}"),
        ("la fiche de gym du meurtrier", "get_fit_now_member", f"id='{ID_GYM_TUEUR}'"),
        ("la déposition du meurtrier", "interview",
         f"person_id=(select id from person where name={esc(TUEUR)})")]:
    p = position(table, cond)
    etat = "OK " if p >= 12 else "ÉCHEC"
    print(f"  [{etat}] {libelle:52s} {p:>4}% de la table")
    ok &= p >= 12

print("\nLongueur des textes (le bruit doit couvrir celle des vrais indices)")
for libelle, table, colonne, cond_vrai in [
        ("dépositions", "interview", "transcript",
         f"person_id in (select id from person where name in "
         f"({esc(TUEUR)},{esc(TEMOIN1)},{esc(TEMOIN2)}))"),
        ("rapports de police", "crime_scene_report", "description",
         f"city='{VILLE}' and date={DATE_CRIME} and type='murder'")]:
    vmin, vmax = db.execute(f"select min(length({colonne})), max(length({colonne})) "
                            f"from {table} where {cond_vrai}").fetchone()
    plus_longs = un(f"select count(*) from {table} "
                    f"where length({colonne}) > {vmax} and not ({cond_vrai})")
    aussi_longs = un(f"select count(*) from {table} "
                     f"where length({colonne}) >= {vmin} and not ({cond_vrai})")
    total = un(f"select count(*) from {table}")
    # Au moins 15 % des lignes doivent être PLUS LONGUES que le plus long des
    # vrais indices : sinon la longueur suffit à repérer les bonnes réponses.
    seuil = plus_longs >= total * 0.15
    etat = "OK " if seuil else "ÉCHEC"
    print(f"  [{etat}] {libelle:20s} indices {vmin}-{vmax} car. ; {plus_longs} lignes "
          f"de bruit plus longues ({round(100 * plus_longs / total)} %), "
          f"{aussi_longs} aussi longues")
    ok &= seuil

print("\nRésolution de l'enquête, étape par étape")
r = db.execute(f"select description from crime_scene_report where city='{VILLE}' "
               f"and date={DATE_CRIME} and type='murder'").fetchall()
ok &= verifier("le rapport de police est unique", len(r), 1)
t1 = db.execute(f"select name from person where address_street_name='{RUE_TEMOIN1}' "
                f"order by address_number desc limit 1").fetchone()
ok &= verifier(f"témoin 1 = {TEMOIN1}", t1[0] == TEMOIN1, True)
t2 = db.execute(f"select name from person where name like '{PRENOM_TEMOIN2}%' "
                f"and address_street_name='{RUE_TEMOIN2}'").fetchall()
ok &= verifier(f"témoin 2 = {TEMOIN2}", len(t2) == 1 and t2[0][0] == TEMOIN2, True)
sus = db.execute(f"""select p.name from person p
    join get_fit_now_member m on m.person_id=p.id
    join get_fit_now_check_in c on c.membership_id=m.id
    join driver_license d on d.id=p.license_id
    where m.id like '{PREFIXE_SAC}%' and m.membership_status='gold'
      and c.check_in_date={DATE_GYM}
      and d.plate_number like '%{FRAGMENT_PLAQUE}%'""").fetchall()
ok &= verifier(f"meurtrier = {TUEUR}", len(sus) == 1 and sus[0][0] == TUEUR, True)
cer = db.execute(f"""select p.name from person p
    join driver_license d on d.id=p.license_id
    join facebook_event_checkin f on f.person_id=p.id
    where d.gender='{GENRE_C}' and d.hair_color='{CHEVEUX_C}'
      and d.height between {TAILLE_MIN} and {TAILLE_MAX}
      and d.car_make='{VOITURE_C[0]}' and d.car_model='{VOITURE_C[1]}'
      and f.event_name='{EVENEMENT_CIBLE}' and f.date between 20171201 and 20171231
    group by p.id having count(*)={NB_CONCERTS}""").fetchall()
ok &= verifier(f"commanditaire = {COMMANDITAIRE}",
               len(cer) == 1 and cer[0][0] == COMMANDITAIRE, True)

taille_ko = taille_octets / 1024
ok &= verifier("taille du fichier sous 1 Mo", taille_ko < 1024, True)

print("\n" + ("Toutes les vérifications passent." if ok
              else "!! DES VÉRIFICATIONS ONT ÉCHOUÉ !!"))
sys.exit(0 if ok else 1)
