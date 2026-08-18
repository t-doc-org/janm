-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch>
-- SPDX-License-Identifier: CC-BY-NC-SA-4.0
-- Base de données d'un cinéma : films, salles et séances.

PRAGMA foreign_keys = ON;

CREATE TABLE Film (
    titre TEXT,
    realisateur TEXT,
    duree_min INTEGER,
    genre TEXT,
    id_film INTEGER,
    PRIMARY KEY(id_film AUTOINCREMENT)
);

CREATE TABLE Salle (
    id_salle INTEGER,
    nom TEXT,
    nb_places INTEGER,
    PRIMARY KEY(id_salle AUTOINCREMENT)
);

CREATE TABLE Seance (
    id_seance INTEGER,
    film INTEGER,
    salle INTEGER,
    heure INTEGER,
    prix REAL,
    PRIMARY KEY(id_seance AUTOINCREMENT),
    FOREIGN KEY(film) REFERENCES Film(id_film),
    FOREIGN KEY(salle) REFERENCES Salle(id_salle)
);

INSERT INTO Film(titre, realisateur, duree_min, genre) VALUES
  ('Inception', 'Christopher Nolan', 148, 'Science-fiction'),
  ('Le Fabuleux Destin d''Amélie Poulain', 'Jean-Pierre Jeunet', 122, 'Comédie'),
  ('Dune', 'Denis Villeneuve', 155, 'Science-fiction'),
  ('Parasite', 'Bong Joon-ho', 132, 'Thriller'),
  ('Les Triplettes de Belleville', 'Sylvain Chomet', 80, 'Animation'),
  ('Interstellar', 'Christopher Nolan', 169, 'Science-fiction');

INSERT INTO Salle(nom, nb_places) VALUES
  ('Rouge', 220),
  ('Bleue', 120),
  ('Verte', 60),
  ('Studio', 35);

INSERT INTO Seance(film, salle, heure, prix) VALUES
  (1, 1, 2030, 19.50),
  (1, 3, 1400, 12.00),
  (2, 2, 1800, 16.00),
  (3, 1, 1730, 18.50),
  (3, 1, 2115, 18.00),
  (4, 2, 2100, 16.50),
  (5, 4, 1530, 11.00),
  (5, 3, 1030, 8.50),
  (6, 2, 2000, 17.00),
  (4, 4, 1900, 13.00),
  (2, 3, 2200, 14.00),
  (6, 1, 1100, 10.00);
