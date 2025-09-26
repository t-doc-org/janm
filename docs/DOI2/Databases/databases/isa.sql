PRAGMA foreign_keys = ON;

-- Schema
CREATE TABLE Enseignant (
  id_enseignant  INTEGER PRIMARY KEY AUTOINCREMENT,
  nom            TEXT NOT NULL,
  prenom         TEXT NOT NULL,
  taux_travail   REAL NOT NULL
);

CREATE TABLE Classe (
  id_classe       INTEGER PRIMARY KEY AUTOINCREMENT,
  section         TEXT NOT NULL,        -- 'Francophone' | 'Germanophone' | 'Bilingue'
  nom             TEXT NOT NULL,        -- ex: 1F1, 2D2, 3B1
  mcl             INTEGER NOT NULL,     -- maître·sse de classe
  annee_scolaire  INTEGER NOT NULL,
  FOREIGN KEY (mcl) REFERENCES Enseignant(id_enseignant)
);

CREATE TABLE Cours (
  id_cours            INTEGER PRIMARY KEY AUTOINCREMENT,
  classe        INTEGER NOT NULL,
  enseignant    INTEGER NOT NULL,
  branche       TEXT NOT NULL,
  salle         TEXT NOT NULL,          -- ex: P101, E205
  heure_debut   INTEGER NOT NULL,       -- ex: 815, 1630
  heure_fin     INTEGER NOT NULL,
  FOREIGN KEY (classe)     REFERENCES Classe(id_classe),
  FOREIGN KEY (enseignant) REFERENCES Enseignant(id_enseignant)
);

CREATE TABLE Eleve (
  id_eleve   INTEGER PRIMARY KEY AUTOINCREMENT,
  nom        TEXT NOT NULL,
  prenom     TEXT NOT NULL,
  classe     INTEGER NOT NULL,
  FOREIGN KEY (classe) REFERENCES Classe(id_classe)
);

CREATE INDEX idx_cours_classe      ON Cours(classe);
CREATE INDEX idx_cours_enseignant  ON Cours(enseignant);
CREATE INDEX idx_eleve_classe      ON Eleve(classe);

-- ===================================================================
-- ENSEIGNANTS (18)
-- ===================================================================
INSERT INTO Enseignant (nom, prenom, taux_travail) VALUES
  ('Martin',  'Claire', 0.80),  -- 1  (Français / Philosophie)
  ('Dupont',  'Louis',  1.00),  -- 2  (Mathématiques / Informatique)
  ('Nguyen',  'Sophie', 0.90),  -- 3  (Biologie)
  ('Rossi',   'Marco',  0.60),  -- 4  (Informatique)
  ('Schmid',  'Anna',   1.00),  -- 5  (Allemand / Histoire)
  ('Garcia',  'Elena',  0.70),  -- 6  (Anglais)
  ('Favre',   'Paul',   0.80),  -- 7  (Géographie)
  ('Morel',   'Julie',  0.50),  -- 8  (Sport / Musique)
  ('Weber',   'Thomas', 0.90),  -- 9  (Physique)
  ('Keller',  'Sarah',  0.70),  -- 10 (Français / Anglais)
  ('Blanc',   'Antoine',1.00),  -- 11 (Philosophie)
  ('Silva',   'Marta',  0.70),  -- 12 (Musique)
  ('Meier',   'Kevin',  0.60),  -- 13 (Chimie)
  ('Conti',   'Laura',  0.85),  -- 14 (Histoire)
  ('Frei',    'Jonas',  0.75),  -- 15 (Arts visuels / Histoire)
  ('Renaud',  'Alex',   1.00),  -- 16 (Économie et droit)
  ('Schaller','Nina',   0.10),  -- 17 (Français)
  ('Da Silva','Inès',   0.90);  -- 18 (Langues)

-- ===================================================================
-- CLASSES (15) — sections & noms selon consigne
-- id_classe = ordre d'insertion (1..15)
-- ===================================================================
INSERT INTO Classe (section, nom, mcl, annee_scolaire) VALUES
  ('Francophone', '1F1',  1, 2025),   -- 1
  ('Francophone', '1F2',  2, 2025),   -- 2
  ('Francophone', '2F1',  3, 2025),   -- 3
  ('Francophone', '2F2',  4, 2025),   -- 4
  ('Francophone', '3F1',  5, 2025),   -- 5
  ('Germanophone','1D1',  6, 2025),   -- 6
  ('Germanophone','2D1',  7, 2025),   -- 7
  ('Germanophone','2D2',  8, 2025),   -- 8
  ('Germanophone','3D1',  9, 2025),   -- 9
  ('Germanophone','3D2', 10, 2025),   --10
  ('Bilingue',    '1BP1', 11, 2025),   --11
  ('Bilingue',    '2BS1', 12, 2025),   --12
  ('Bilingue',    '2BS2', 13, 2025),   --13
  ('Bilingue',    '2BP1', 14, 2025),   --14
  ('Bilingue',    '3BP1', 15, 2025);   --15

-- ===================================================================
-- ÉLÈVES (10 par classe -> 150)
-- ===================================================================
INSERT INTO Eleve (nom, prenom, classe) VALUES
  -- 1F1 (10)
  ('Durand','Emma',1), ('Bernard','Lucas',1), ('Petit','Lina',1), ('Robert','Yanis',1),
  ('Favre','Zoé',1), ('Monod','Aline',1), ('Jaccard','Tim',1),
  ('Leresche','Hugo',1), ('Aubry','Maëlle',1), ('Piguet','Enzo',1),

  -- 1F2 (10)
  ('Richard','Noa',2), ('Moreau','Léo',2), ('Keller','Mia',2), ('Bovet','Nils',2),
  ('Lambert','Léna',2), ('Bajrami','Maxime',2), ('Rochat','Chloé',2),
  ('Perroud','Ethan',2), ('Grandjean','Sarah',2), ('Godinat','Jonas',2),

  -- 2F1 (10)
  ('Aebi','Nora',3), ('Girard','Ava',3), ('Monney','Eliot',3), ('Bosson','Nadia',3),
  ('Bourquin','Maya',3), ('Ayer','Noam',3), ('Fragnière','Mélina',3),
  ('Michaud','Alex',3), ('Caille','Sasha',3), ('Ammann','Zoe',3),

  -- 2F2 (10)
  ('Broillet','Marc',4), ('Gruber','Zoé',4), ('Perler','Tom',4), ('Rey','Milan',4),
  ('Remy','Nolan',4), ('Egger','Maud',4), ('Berset','Loris',4),
  ('Gillard','Naya',4), ('Loup','Evan',4), ('Hertig','Camille',4),

  -- 3F1 (10)
  ('Savoy','Aya',5), ('Cuennet','Jade',5), ('Berset','Luca',5), ('Cottet','Nina',5),
  ('Aellen','Yuna',5), ('Glauser','Kilian',5), ('Cuenat','Livia',5),
  ('Maradan','Théo',5), ('Pache','Inès',5), ('Vuillaume','Nico',5),

  -- 1D1 (10)
  ('Diop','Amir',6), ('Cottier','Sami',6), ('Rodriguez','Lina',6), ('Yerly','Noé',6),
  ('Zimmermann','Lea',6), ('Hofmann','Luca',6), ('Kunz','Mara',6),
  ('Schneider','Finn',6), ('Fischer','Mila',6), ('Huber','Noel',6),

  -- 2D1 (10)
  ('Baumann','Iris',7), ('Brügger','Liam',7), ('Schütz','Luna',7), ('Meyer','Alexis',7),
  ('Baumann','Noemi',7), ('Vogel','Alan',7), ('Graf','Lenn',7),
  ('Studer','Amelie',7), ('Rufener','Timo',7), ('Zbinden','Elina',7),

  -- 2D2 (10)
  ('Bapst','Nora',8), ('Ammann','Maya',8), ('Zen','Théo',8), ('Savary','Eva',8),
  ('Gerber','Nora',8), ('Keller','Yann',8), ('Bieri','Mia',8),
  ('Schmid','Julian',8), ('Frei','Lina',8), ('Steiner','Ben',8),

  -- 3D1 (10)
  ('Jordan','Ilan',9), ('Buchs','Mathis',9), ('Piller','Maël',9), ('Schenker','Ella',9),
  ('Imhof','Loris',9), ('Schmutz','Naomi',9), ('Gurtner','Elio',9),
  ('Bachmann','Nia',9), ('Sutter','Marco',9), ('Fankhauser','Marek',9),

  -- 3D2 (10)
  ('Fontana','Kimi',10), ('Maret','Jules',10), ('Ngoy','Sara',10), ('Suter','Dario',10),
  ('Moser','Giulia',10), ('Tanner','Robin',10), ('Wyss','Nadia',10),
  ('Roth','Ian',10), ('Kohler','Elena',10), ('Arnold','Luca',10),

  -- 1B1 (10)
  ('Pittet','Elsa',11), ('Burri','Noah',11), ('Vuadens','Inaya',11), ('Pittier','Yanis',11),
  ('Bersier','Maé',11), ('Marti','Isaac',11), ('Schafer','Ambre',11),
  ('Rey','Téo',11), ('Chollet','Leyla',11), ('Delgado','Rayan',11),

  -- 1B2 (10)
  ('Riedo','Celia',12), ('Zaugg','Clara',12), ('Carrel','Nolan',12), ('Ndaye','Liam',12),
  ('Dias','Livia',12), ('Pilloud','Noé',12), ('Gonçalves','Elisa',12),
  ('Berthoud','Yannick',12), ('Carvalho','Nina',12), ('Savary','Eden',12),

  -- 2B1 (10)
  ('Thalmann','Roxane',13), ('Chappuis','Luis',13), ('Aubert','Maya',13), ('Roth','Iris',13),
  ('Perrenoud','Alya',13), ('Grobety','Maël',13), ('Nussbaum','Iris',13),
  ('Chassot','Evan',13), ('Boscardin','Maia',13), ('Clerc','Nils',13),

  -- 2B2 (10)
  ('Monnin','Sami',14), ('Gilliéron','Ely',14), ('Gumy','Léa',14), ('Raemy','Loris',14),
  ('Progin','Léonie',14), ('Amherd','Timéo',14), ('Gabioud','Naya',14),
  ('Vuichard','Léo',14), ('Dousse','Jade',14), ('Gauthier','Arno',14),

  -- 3B1 (10)
  ('Camarasa','Noa',15), ('Broennimann','Léon',15), ('Angehrn','Lara',15), ('Lachat','Elio',15),
  ('Gumy','Nino',15), ('Bapst','Lena',15), ('Aubert','Evan',15),
  ('Hayoz','Alina',15), ('Savioz','Lyam',15), ('Cortes','Maya',15);

-- ===================================================================
-- COURS (7 par classe, horaires non chevauchants par classe)
-- ===================================================================

-- 1) 1F1 (template A)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (1, 1, 'Français',          'P101', 800, 900),
  (1, 2, 'Mathématiques',     'P102', 910, 1010),
  (1, 5, 'Allemand',          'P110', 1020, 1120),
  (1, 7, 'Géographie',        'E121', 1130, 1230),
  (1, 3, 'Biologie',          'E220', 1330, 1500),
  (1, 8, 'Sport',             'P111', 1520, 1620),
  (1, 4, 'Informatique',      'E205', 1630, 1730);

-- 2) 1F2 (template B)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (2,10, 'Français',          'E101', 815, 915),
  (2, 2, 'Mathématiques',     'P103', 925, 1025),
  (2, 6, 'Anglais',           'P110', 1035, 1135),
  (2,14, 'Histoire',          'E110', 1145, 1245),
  (2, 3, 'Biologie',          'E220', 1345, 1515),
  (2, 8, 'Sport',             'P111', 1525, 1625),
  (2, 4, 'Informatique',      'P112', 1635, 1735);

-- 3) 2F1 (template C)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (3, 1, 'Français',          'P121', 830, 930),
  (3, 2, 'Mathématiques',     'E101', 940, 1040),
  (3, 6, 'Anglais',           'E121', 1050, 1150),
  (3,11, 'Philosophie',       'P220', 1300, 1400),
  (3, 7, 'Géographie',        'P102', 1410, 1510),
  (3, 3, 'Biologie',          'E205', 1520, 1650),
  (3, 4, 'Informatique',      'P110', 1700, 1800);

-- 4) 2F2 (template A)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (4,17, 'Français',          'P103', 800, 900),
  (4, 2, 'Mathématiques',     'P121', 910, 1010),
  (4, 5, 'Allemand',          'E101', 1020, 1120),
  (4,16, 'Économie et droit', 'E110', 1130, 1230),
  (4,13, 'Chimie',            'E220', 1330, 1430),
  (4,14, 'Histoire',          'P111', 1440, 1540),
  (4, 8, 'Sport',             'P112', 1550, 1650);

-- 5) 3F1 (template B)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (5, 1, 'Français',          'P110', 815, 915),
  (5, 2, 'Mathématiques',     'P121', 925, 1025),
  (5, 9, 'Physique',          'E121', 1035, 1135),
  (5,11, 'Philosophie',       'E110', 1145, 1245),
  (5, 4, 'Informatique',      'P112', 1345, 1445),
  (5, 3, 'Biologie',          'E220', 1455, 1625),
  (5,12, 'Musique',           'P103', 1635, 1735);

-- 6) 1D1 (template A)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (6, 5, 'Allemand',          'P101', 800, 900),
  (6, 2, 'Mathématiques',     'E101', 910, 1010),
  (6,10, 'Français',          'E121', 1020, 1120),
  (6, 4, 'Informatique',      'P102', 1130, 1230),
  (6, 7, 'Géographie',        'P110', 1330, 1430),
  (6, 9, 'Physique',          'E220', 1440, 1540),
  (6, 8, 'Sport',             'P111', 1550, 1650);

-- 7) 2D1 (template B)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (7, 5, 'Allemand',          'E101', 815, 915),
  (7, 2, 'Mathématiques',     'P103', 925, 1025),
  (7, 6, 'Anglais',           'P110', 1035, 1135),
  (7,14, 'Histoire',          'E110', 1145, 1245),
  (7,13, 'Chimie',            'E220', 1345, 1445),
  (7, 4, 'Informatique',      'P111', 1455, 1555),
  (7, 8, 'Sport',             'P112', 1605, 1705);

-- 8) 2D2 (template C)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (8, 5, 'Allemand',          'P121', 830, 930),
  (8, 2, 'Mathématiques',     'P102', 940, 1040),
  (8, 1, 'Français',          'P101', 1050, 1150),
  (8, 9, 'Physique',          'E205', 1300, 1400),
  (8, 7, 'Géographie',        'P121', 1410, 1510),
  (8, 3, 'Biologie',          'E101', 1520, 1650),
  (8, 4, 'Informatique',      'P112', 1700, 1800);

-- 9) 3D1 (template A)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (9, 5, 'Allemand',          'P110', 800, 900),
  (9, 2, 'Mathématiques',     'P121', 910, 1010),
  (9,11, 'Philosophie',       'E110', 1020, 1120),
  (9,14, 'Histoire',          'P102', 1130, 1230),
  (9, 9, 'Physique',          'E205', 1330, 1430),
  (9, 4, 'Informatique',      'P112', 1440, 1540),
  (9, 8, 'Sport',             'P220', 1550, 1650);

-- 10) 3D2 (template B)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (10, 5, 'Allemand',         'P101', 815, 915),
  (10, 2, 'Mathématiques',    'E101', 925, 1025),
  (10,10, 'Français',         'P121', 1035, 1135),
  (10,16, 'Économie et droit','E110', 1145, 1245),
  (10,13, 'Chimie',           'E220', 1345, 1445),
  (10, 6, 'Anglais',          'P111', 1455, 1555),
  (10,12, 'Musique',          'P103', 1605, 1705);

-- 11) 1B1 (template A)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (11, 1, 'Français',         'P110', 800, 900),
  (11, 5, 'Allemand',         'P102', 910, 1010),
  (11, 6, 'Anglais',          'E121', 1020, 1120),
  (11, 2, 'Mathématiques',    'P121', 1130, 1230),
  (11, 4, 'Informatique',     'E205', 1330, 1430),
  (11, 7, 'Géographie',       'P111', 1440, 1540),
  (11, 8, 'Sport',            'P112', 1550, 1650);

-- 12) 1B2 (template B)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (12,10, 'Français',         'E101', 815, 915),
  (12, 5, 'Allemand',         'P103', 925, 1025),
  (12, 6, 'Anglais',          'P110', 1035, 1135),
  (12, 2, 'Mathématiques',    'E205', 1145, 1245),
  (12,14, 'Histoire',         'E110', 1345, 1445),
  (12, 3, 'Biologie',         'E220', 1455, 1625),
  (12,12, 'Musique',          'P220', 1635, 1735);

-- 13) 2B1 (template C)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (13, 1, 'Français',         'P101', 830, 930),
  (13, 5, 'Allemand',         'P121', 940, 1040),
  (13, 6, 'Anglais',          'E121', 1050, 1150),
  (13, 2, 'Mathématiques',    'P102', 1300, 1400),
  (13, 9, 'Physique',         'E205', 1410, 1510),
  (13, 4, 'Informatique',     'P112', 1520, 1620),
  (13,16, 'Économie et droit','E110', 1630, 1730);

-- 14) 2B2 (template A)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (14, 1, 'Français',         'E101', 800, 900),
  (14, 5, 'Allemand',         'P103', 910, 1010),
  (14, 6, 'Anglais',          'P110', 1020, 1120),
  (14, 2, 'Mathématiques',    'P121', 1130, 1230),
  (14,13, 'Chimie',           'E220', 1330, 1430),
  (14,14, 'Histoire',         'P111', 1440, 1540),
  (14, 8, 'Sport',            'P112', 1550, 1650);

-- 15) 3B1 (template B)
INSERT INTO Cours (classe, enseignant, branche, salle, heure_debut, heure_fin) VALUES
  (15, 1, 'Français',         'P110', 815, 915),
  (15, 5, 'Allemand',         'P102', 925, 1025),
  (15, 6, 'Anglais',          'E121', 1035, 1135),
  (15, 2, 'Mathématiques',    'P121', 1145, 1245),
  (15,11, 'Philosophie',      'E110', 1345, 1445),
  (15, 4, 'Informatique',     'E205', 1455, 1555),
  (15, 9, 'Physique',         'P112', 1605, 1705);

-- End
