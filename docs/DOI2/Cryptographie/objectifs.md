<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Objectifs de l'examen

- Distinguer le chiffrement **symétrique**  du
  chiffrement **asymétrique** et citer leurs avantages/inconvénients
- Chiffrer et déchiffrer un message avec :
  - le chiffrement de **César**
  - le chiffrement par **substitution**
  - le **masque jetable** (encodé avec ASCII)
  - **RSA** : générer les clefs $(n, e)$ et $(n, d)$, puis chiffrer
    ($c = t^e \mod n$) et déchiffrer ($t = c^d \mod n$)
- Connaître les **vulnérabilités** de chaque méthode :
  - Attaque par **force brute**
  - Attaque par **analyse de fréquence**
- Mots de passe et hachage :
  - Définir ce qu'est une fonction de hachage en énonçant ses principales caractéristiques
  - Expliquer comment une fonction de hachage est utilisée pour stocker des mots de passe
  - Expliquer pourquoi un mot de passe haché peut être vulnérable à une attaque par **force brute** ou par **dictionnaire** et en déduire les principales caractéristiques d'un mot de passe sécurisé.