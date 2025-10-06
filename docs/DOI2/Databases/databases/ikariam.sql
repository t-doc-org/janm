PRAGMA foreign_keys = ON;

-- ======================
-- Table JOUEUR
-- ======================
CREATE TABLE IF NOT EXISTS joueur (
  pseudo             TEXT    NOT NULL UNIQUE,
  email              TEXT    NOT NULL UNIQUE,
  mot_de_passe       TEXT    NOT NULL,                    -- mot de passe en clair (volontaire)
  PRIMARY KEY(email)
);
-- ======================
-- Table VILLE
-- ======================
CREATE TABLE IF NOT EXISTS ville (
  id_ville               INTEGER PRIMARY KEY AUTOINCREMENT,
  joueur        INTEGER NOT NULL,
  nom              TEXT    NOT NULL,
  population       INTEGER NOT NULL CHECK (population >= 0),
  argent           NUMERIC NOT NULL CHECK (argent >= 0),
  date_fondation   DATE    NOT NULL,  -- type DATE
  FOREIGN KEY (joueur) REFERENCES joueur(email) ON DELETE CASCADE
);

-- ======================
-- Table BATIMENT
-- ======================
CREATE TABLE IF NOT EXISTS batiment (
  id_batiment        INTEGER PRIMARY KEY AUTOINCREMENT,
  ville  INTEGER NOT NULL,
  nom       TEXT    NOT NULL,
  niveau    INTEGER NOT NULL CHECK (niveau BETWEEN 1 AND 10),
  FOREIGN KEY (ville) REFERENCES ville(id_ville) ON DELETE CASCADE
);


PRAGMA foreign_keys = ON;

-- ======================================
-- 1) JOUEURS (10 joueurs)
-- ======================================
INSERT INTO joueur (pseudo, email, mot_de_passe) VALUES
('AthenaLaSage',    'athena@gmail.com',   'Fr1B0urg'),
('ZeusLeRoi',       'zeus@bluewin.ch',     'mdp1234'),
('PoseidonDesMers', 'poseidon@proton.com', 'VkFnCJSm83'),
('AresLeGuerrier',  'ares@bluewin.ch',     'AuRezLit1'),
('ApolloLumineux',  'apollo@gmail.com',   'LoLo9876'),
('ArtemisChasseuse','artemis@proton.com',  'PoultryShout'),
('HermesRapide',    'hermes@gmail.com',   'ZuBDg66ND'),
('DemeterVerte',    'demeter@studentfr.ch',  'AreuhAreuh'),
('DionysosFou',     'dionysos@studentfr.ch', 'BecBecBinzène'),
('HadesSombre',     'hades@bluewin.ch',    'xXEliotropeXx');


-- ======================================
-- 2) VILLES (1 à 5 par joueur)
-- ======================================
INSERT INTO ville (joueur, nom, population, argent, date_fondation) VALUES
-- Joueur 1 (3 villes)
('athena@gmail.com', 'Athènes',   2500, 5230.50, DATE('2024-02-10')),
('athena@gmail.com', 'Delphes',   1800, 3120.00, DATE('2024-06-22')),
('athena@gmail.com', 'Corinthe',  2200, 4500.75, DATE('2024-08-12')),

-- Joueur 2 (2 villes)
('zeus@bluewin.ch', 'Olympe',    3500, 8750.90, DATE('2023-11-05')),
('zeus@bluewin.ch', 'Dodone',    2700, 4320.25, DATE('2024-03-19')),

-- Joueur 3 (2 villes)
('poseidon@proton.com', 'Poséidonis', 1900, 3890.80, DATE('2024-01-14')),
('poseidon@proton.com', 'Thalassa',   2600, 6025.20, DATE('2024-04-27')),

-- Joueur 4 (3 villes)
('ares@bluewin.ch', 'Sparte', 3100, 7420.00, DATE('2023-12-02')),
('ares@bluewin.ch', 'Mégare', 1600, 2680.00, DATE('2024-02-28')),
('ares@bluewin.ch', 'Argos',  1950, 3125.60, DATE('2024-05-17')),

-- Joueur 5 (1 ville)
('apollo@gmail.com', 'Delos',  2800, 5180.00, DATE('2024-07-03')),

-- Joueur 6 (3 villes)
('artemis@proton.com', 'Éphèse',   2400, 4100.00, DATE('2024-09-21')),
('artemis@proton.com', 'Orthosie', 1750, 2850.00, DATE('2024-10-01')),
('artemis@proton.com', 'Cymé',     1900, 3300.75, DATE('2024-11-15')),

-- Joueur 7 (2 villes)
('hermes@gmail.com', 'Hermopolis', 2700, 5000.00, DATE('2024-01-25')),
('hermes@gmail.com', 'Lycopolis',  2000, 3500.50, DATE('2024-03-14')),

-- Joueur 8 (3 villes)
('demeter@studentfr.ch', 'Eleusis',  3000, 6250.25, DATE('2024-02-09')),
('demeter@studentfr.ch', 'Tripolis', 1500, 2180.10, DATE('2024-03-29')),
('demeter@studentfr.ch', 'Tégée',    2200, 4080.90, DATE('2024-05-11')),

-- Joueur 9 (4 villes)
('dionysos@studentfr.ch', 'Naxos',  2100, 3750.80, DATE('2024-06-22')),
('dionysos@studentfr.ch', 'Syros',  1950, 2890.20, DATE('2024-07-30')),
('dionysos@studentfr.ch', 'Andros', 2500, 4980.60, DATE('2024-08-19')),
('dionysos@studentfr.ch', 'Paros',  1700, 2850.40, DATE('2024-09-25')),

-- Joueur 10 (3 villes)
('hades@bluewin.ch', 'Tartare', 2600, 4120.00, DATE('2023-10-10')),
('hades@bluewin.ch', 'Érébos',  2300, 3860.50, DATE('2023-12-24')),
('hades@bluewin.ch', 'Lethe',   2000, 2950.75, DATE('2024-03-05'));

-- ======================================
-- 3) BÂTIMENTS (1 à 10 par ville)
--    Pour chaque ville, on insère 1..10 bâtiments avec niveaux 1..10.
--    On identifie la ville par son nom pour récupérer l'id.
--    Liste de types utilisée : Scierie, Forum, Port, Caserne, Temple,
--    Ferme, Marché, Muraille, Entrepôt, Mine
-- ======================================

-- Athènes (10 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 5 FROM ville WHERE nom='Athènes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 4 FROM ville WHERE nom='Athènes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 3 FROM ville WHERE nom='Athènes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Caserne', 2 FROM ville WHERE nom='Athènes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 6 FROM ville WHERE nom='Athènes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 7 FROM ville WHERE nom='Athènes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Marché', 5 FROM ville WHERE nom='Athènes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 4 FROM ville WHERE nom='Athènes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 3 FROM ville WHERE nom='Athènes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 6 FROM ville WHERE nom='Athènes';

-- Delphes (4 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 4 FROM ville WHERE nom='Delphes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 7 FROM ville WHERE nom='Delphes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 3 FROM ville WHERE nom='Delphes';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 5 FROM ville WHERE nom='Delphes';

-- Corinthe (4 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 6 FROM ville WHERE nom='Corinthe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Marché', 5 FROM ville WHERE nom='Corinthe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 4 FROM ville WHERE nom='Corinthe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 2 FROM ville WHERE nom='Corinthe';

-- Olympe (6 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 9 FROM ville WHERE nom='Olympe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 6 FROM ville WHERE nom='Olympe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 7 FROM ville WHERE nom='Olympe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Caserne', 8 FROM ville WHERE nom='Olympe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 10 FROM ville WHERE nom='Olympe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 7 FROM ville WHERE nom='Olympe';

-- Dodone (3 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 6 FROM ville WHERE nom='Dodone';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 5 FROM ville WHERE nom='Dodone';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 4 FROM ville WHERE nom='Dodone';

-- Poséidonis (5 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 7 FROM ville WHERE nom='Poséidonis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 6 FROM ville WHERE nom='Poséidonis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Caserne', 4 FROM ville WHERE nom='Poséidonis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 5 FROM ville WHERE nom='Poséidonis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 3 FROM ville WHERE nom='Poséidonis';

-- Thalassa (7 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 8 FROM ville WHERE nom='Thalassa';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 6 FROM ville WHERE nom='Thalassa';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Marché', 5 FROM ville WHERE nom='Thalassa';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 7 FROM ville WHERE nom='Thalassa';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 4 FROM ville WHERE nom='Thalassa';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Caserne', 5 FROM ville WHERE nom='Thalassa';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 6 FROM ville WHERE nom='Thalassa';

-- Sparte (9 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Caserne', 9 FROM ville WHERE nom='Sparte';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 7 FROM ville WHERE nom='Sparte';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 6 FROM ville WHERE nom='Sparte';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 6 FROM ville WHERE nom='Sparte';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 5 FROM ville WHERE nom='Sparte';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 6 FROM ville WHERE nom='Sparte';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 7 FROM ville WHERE nom='Sparte';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 4 FROM ville WHERE nom='Sparte';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 5 FROM ville WHERE nom='Sparte';

-- Mégare (3 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 4 FROM ville WHERE nom='Mégare';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 5 FROM ville WHERE nom='Mégare';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 3 FROM ville WHERE nom='Mégare';

-- Argos (5 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 6 FROM ville WHERE nom='Argos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 5 FROM ville WHERE nom='Argos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 4 FROM ville WHERE nom='Argos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 6 FROM ville WHERE nom='Argos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 4 FROM ville WHERE nom='Argos';

-- Delos (6 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 8 FROM ville WHERE nom='Delos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 6 FROM ville WHERE nom='Delos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Marché', 5 FROM ville WHERE nom='Delos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 6 FROM ville WHERE nom='Delos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 7 FROM ville WHERE nom='Delos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 6 FROM ville WHERE nom='Delos';

-- Éphèse (8 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 7 FROM ville WHERE nom='Éphèse';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 5 FROM ville WHERE nom='Éphèse';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 6 FROM ville WHERE nom='Éphèse';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 6 FROM ville WHERE nom='Éphèse';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 7 FROM ville WHERE nom='Éphèse';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 4 FROM ville WHERE nom='Éphèse';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 5 FROM ville WHERE nom='Éphèse';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 6 FROM ville WHERE nom='Éphèse';

-- Orthosie (2 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 4 FROM ville WHERE nom='Orthosie';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 3 FROM ville WHERE nom='Orthosie';

-- Cymé (5 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 5 FROM ville WHERE nom='Cymé';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 5 FROM ville WHERE nom='Cymé';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 6 FROM ville WHERE nom='Cymé';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 4 FROM ville WHERE nom='Cymé';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 3 FROM ville WHERE nom='Cymé';

-- Hermopolis (7 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Marché', 6 FROM ville WHERE nom='Hermopolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 5 FROM ville WHERE nom='Hermopolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 6 FROM ville WHERE nom='Hermopolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 7 FROM ville WHERE nom='Hermopolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 6 FROM ville WHERE nom='Hermopolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 4 FROM ville WHERE nom='Hermopolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 5 FROM ville WHERE nom='Hermopolis';

-- Lycopolis (4 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Caserne', 5 FROM ville WHERE nom='Lycopolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 5 FROM ville WHERE nom='Lycopolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 4 FROM ville WHERE nom='Lycopolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 3 FROM ville WHERE nom='Lycopolis';

-- Eleusis (6 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 7 FROM ville WHERE nom='Eleusis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 5 FROM ville WHERE nom='Eleusis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Marché', 6 FROM ville WHERE nom='Eleusis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 5 FROM ville WHERE nom='Eleusis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 6 FROM ville WHERE nom='Eleusis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 6 FROM ville WHERE nom='Eleusis';

-- Tripolis (3 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 3 FROM ville WHERE nom='Tripolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 4 FROM ville WHERE nom='Tripolis';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 3 FROM ville WHERE nom='Tripolis';

-- Tégée (5 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 5 FROM ville WHERE nom='Tégée';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 6 FROM ville WHERE nom='Tégée';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 4 FROM ville WHERE nom='Tégée';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 5 FROM ville WHERE nom='Tégée';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 6 FROM ville WHERE nom='Tégée';

-- Naxos (8 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 7 FROM ville WHERE nom='Naxos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Marché', 6 FROM ville WHERE nom='Naxos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 6 FROM ville WHERE nom='Naxos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 6 FROM ville WHERE nom='Naxos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 5 FROM ville WHERE nom='Naxos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 4 FROM ville WHERE nom='Naxos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 5 FROM ville WHERE nom='Naxos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 7 FROM ville WHERE nom='Naxos';

-- Syros (4 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 4 FROM ville WHERE nom='Syros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 5 FROM ville WHERE nom='Syros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 3 FROM ville WHERE nom='Syros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 3 FROM ville WHERE nom='Syros';

-- Andros (6 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Port', 6 FROM ville WHERE nom='Andros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 5 FROM ville WHERE nom='Andros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 6 FROM ville WHERE nom='Andros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 6 FROM ville WHERE nom='Andros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 4 FROM ville WHERE nom='Andros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 6 FROM ville WHERE nom='Andros';

-- Paros (5 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 7 FROM ville WHERE nom='Paros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 5 FROM ville WHERE nom='Paros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 5 FROM ville WHERE nom='Paros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Marché', 4 FROM ville WHERE nom='Paros';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 4 FROM ville WHERE nom='Paros';

-- Tartare (7 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Caserne', 8 FROM ville WHERE nom='Tartare';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Muraille', 7 FROM ville WHERE nom='Tartare';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 6 FROM ville WHERE nom='Tartare';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Scierie', 6 FROM ville WHERE nom='Tartare';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 6 FROM ville WHERE nom='Tartare';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 5 FROM ville WHERE nom='Tartare';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 7 FROM ville WHERE nom='Tartare';

-- Érébos (3 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Mine', 6 FROM ville WHERE nom='Érébos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 5 FROM ville WHERE nom='Érébos';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Forum', 4 FROM ville WHERE nom='Érébos';

-- Lethe (4 bâtiments)
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Temple', 6 FROM ville WHERE nom='Lethe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Marché', 4 FROM ville WHERE nom='Lethe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Ferme', 5 FROM ville WHERE nom='Lethe';
INSERT INTO batiment (ville, nom, niveau)
SELECT id_ville, 'Entrepôt', 4 FROM ville WHERE nom='Lethe';