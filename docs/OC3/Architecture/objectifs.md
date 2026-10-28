<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Objectifs de l'examen

## Opérateurs logiques et algèbre de Boole
- Connaître les opérateurs `ET` (`∧`), `OU` (`∨`), `NON` (`¬`) et `OU exclusif` (`⊕`), leurs tables de vérité et les portes logiques correspondantes
- Évaluer une expression logique pour des valeurs données, en respectant l'ordre de priorité (`¬`, puis `∧`, puis `∨`)
- Compléter la table de vérité d'une expression ou d'un circuit de portes logiques
- Déterminer l'expression logique de la sortie d'un circuit de portes logiques, et dessiner le circuit correspondant à une expression

## Arithmétique binaire
- Convertir un nombre de binaire à décimal (et vice-versa) en représentation des nombres positifs ou en complément à 2
- Calculer le complément à deux d'un nombre sur un nombre de bits donné
- Effectuer une addition binaire en posant le calcul colonne par colonne, avec les retenues
- Effectuer une soustraction en passant par l'addition du complément à deux (`a - b = a + ¬b + 1`)

## Circuits arithmétiques
- Expliquer le fonctionnement du demi-additionneur et de l'additionneur complet (table de vérité, expressions de la somme et de la retenue)
- Chaîner des additionneurs complets pour additionner des nombres de plusieurs bits, et repérer un dépassement (*overflow*)
- Expliquer le circuit qui additionne ou soustrait selon un signal de commande (portes `XOR` et retenue entrante)

## Multiplexeur, décodeur et ALU
- Expliquer le rôle d'un multiplexeur et d'un décodeur, et donner la sortie pour des entrées données
- Déterminer le nombre de bits de sélection nécessaires pour un nombre d'entrées donné (et inversement)
- Expliquer comment une ALU calcule toutes ses opérations en parallèle puis en choisit une avec un multiplexeur
- Donner le résultat d'une ALU pour deux opérandes en binaire et un code opération donnés

## Circuits séquentiels et mémoires
- Distinguer un circuit combinatoire d'un circuit séquentiel
- Expliquer le fonctionnement d'une bascule SR et d'une bascule D
- Compléter un chronogramme : repérer les fronts montants de l'horloge et en déduire la valeur de `Q`
- Expliquer le rôle des entrées d'un registre (`D`, `LD`, `CLK`) et prédire son contenu après une suite de fronts montants
- Expliquer le fonctionnement d'un banc de registres : écriture avec un décodeur, lecture avec des multiplexeurs
- Expliquer le fonctionnement d'une RAM (adresse, donnée, écriture `WE`), et calculer le nombre de cases adressables avec un nombre de bits d'adresse donné

## ISA et processeur
- Décoder une instruction de 8 bits sur un ISA simple (opcode, `Rd`, `Rs`) et, inversement, coder une instruction en binaire à l'aide du jeu d'instructions
- Suivre l'exécution d'un programme et donner le contenu des registres et la valeur affichée
- Écrire un court programme avec un ISA simple
- Expliquer le rôle du compteur de programme `pc`, du registre d'instruction `RI` et du multiplexeur d'écriture
- Décrire ce qui se passe à chaque étape (`T1` : chercher, `T2` : exécuter) pour chaque instruction, y compris `LOAD` qui occupe deux cases
- Donner la valeur des signaux de commande pour une instruction et une étape données
