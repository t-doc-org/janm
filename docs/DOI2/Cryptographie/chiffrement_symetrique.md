<!-- Copyright 2024 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Chiffrement symétrique

## Contexte historique : La machine Enigma

La machine Enigma est l'un des exemples les plus célèbres de chiffrement symétrique. Utilisée par l'Allemagne nazi pendant la Seconde Guerre mondiale, elle était une machine électromécanique aux airs de machine à écrire capable de chiffrer et déchiffrer des messages.

```{image} images/enigma.jpg
:width: 30%
:alt: Enigma
:align: center
```

La machine Enigma fonctionnait selon le principe du chiffrement symétrique :
- Les Allemands configuraient la machine avec une **clef secrète** (position initiale des rotors, configuration des fiches de permutation)
- Un message était saisi, et chaque lettre était transformée par un système de rotors et de substitution
- Le texte chiffré était transmis par radio
- Le destinataire, possédant une machine Enigma configurée avec la **même clef**, pouvait déchiffrer le message


## Définition

Le chiffrement symétrique, également appelé chiffrement à clé secrète, est une méthode de cryptographie où deux interlocuteurs (Alice et Bob) se sont partagés une même clef secrète par un canal sécurisé. Cette clef est utilisée autant pour chiffrer le message que pour le déchiffrer.

```{image} images/situation_sym.png
:width: 80%
:alt: Cryptographie symétrique
:align: center
```
 - Alice veut envoyer un texte en clair $t$ à Bob
 - Alice chiffre $t$ en utilisant la clef symétrique $k$. Le résultat est le texte chiffré $c = E_k(t)$
 - Alice envoie $c$ à Bob par un canal «public»
 - Bob déchiffre $c$ en utilisant la même clef $k$. Le résultat est $D_k(c) = t$
 - Pour Charles (un espion), il doit être extrêmement difficile de retrouver $t$ à partir de $c$ sans connaître $k$, même en connaissant les algorithmes de chiffrement et déchiffrement.

## Le chiffrement de César

Le **chiffrement de César** est l'un des plus anciens chiffrements symétriques connus, utilisé par Jules César lui-même. Cet algorithme ne garantit aujourd'hui plus la confidentialité d'un message, mais permet de bien comprendre les principes du chiffrement symétrique.

Le chiffrement de César fonctionne en décalant chaque lettre du message d'un nombre fixe de positions dans l'alphabet. Ce nombre de positions constitue la **clef secrète**.

**Exemple :** avec une clef $k = 3$
- La lettre `A` devient `D`
- La lettre `B` devient `E`
- La lettre `Z` devient `C` (on revient au début de l'alphabet)


Prenons le texte en clair $t=$ `HELLO`, $E=\text{César}$ et la clef $k=3$.
- `H` décalé de 3 → `K`
- `E` décalé de 3 → `H`
- `L` décalé de 3 → `O`
- `L` décalé de 3 → `O`
- `O` décalé de 3 → `R`

On a donc le texte chiffré $c = \text{César}_3($`HELLO`$) =$`KHOOR`

Pour déchiffrer, Bob utilise la même clef $k = 3$ avec l'algorithme de déchiffrement dans lequel on décale chaque lettre de 3 positions **en arrière** pour retrouver le message original. Cela donne : $D_k(c) = \text{César inverse}_3($`KHOOR`$) =$`HELLO`=`$t$.

## Attaque par force brute


Bien que simple à comprendre, le chiffrement de César est très **peu sûr** pour plusieurs raisons. Le problème majeur est qu'il n'y a que 25 clefs possibles (décalages de 1 à 25). Un espion (Charles dans le schéma) peut alors très rapidement tester ces 25 possibilités jusqu'à trouver la bonne.


Lorsqu'on teste toutes les clefs possibles sans autre réflexion, on appelle cela une **attaque par force brute**.

## Exercices


### Exercice {num1}`exercice_crypto`

Vous interceptez le message chiffré suivant: `LSOXFOXEO`. Vous savez qu'il a été chiffré avec le chiffrement de César avec une clef $k = 10$.

1. Identifiez les éléments suivants du chiffrement symétrique:
   - $t$ (texte en clair)
   - $c$ (texte chiffré)
   - $k$ (clef)
   - $E$ (algorithme de chiffrement)
   - $D$ (algorithme de déchiffrement)

2. Effectuez le déchiffrement $D_k(c) = t$ et écrivez le message en clair.



### Exercice {num1}`exercice_crypto`

Vous connaissez le message: $t = $ `SECRET`. Le texte chiffré avec César est $c = $ `VHFUHW`. Quelle est la clef $k$ utilisée?



### Exercice {num1}`exercice_crypto`

Le code Python suivant implémente le chiffrement et le déchiffrement de César, ainsi qu'une attaque par force brute.

Testez le code avec différentes clefs et messages, puis:
1. Chiffrez le message `INFORMATIQUE` avec la clef $k = 5$
2. Effectuez une attaque par force brute sur le texte chiffré pour retrouver la clef

```{exec} python
def cesar_chiffrer(texte, k):
    """
    Chiffre un texte avec le chiffrement de César.

    Args:
        texte: Le texte en clair
        k: La clef (décalage)

    Returns:
        Le texte chiffré
    """
    resultat = ""
    for char in texte.upper():
        if char.isalpha():
            # Décaler le caractère de k positions
            ascii_a = ord('A')
            pos = ord(char) - ascii_a
            nouvelle_pos = (pos + k) % 26
            resultat += chr(ascii_a + nouvelle_pos)
        else:
            resultat += char
    return resultat


def cesar_dechiffrer(texte_chiffre, k):
    """
    Déchiffre un texte chiffré avec le chiffrement de César.

    Args:
        texte_chiffre: Le texte chiffré
        k: La clef (décalage)

    Returns:
        Le texte en clair
    """
    # Déchiffrer c'est chiffrer avec l'inverse de la clef
    return cesar_chiffrer(texte_chiffre, -k)


def cesar_attaque_brute(texte_chiffre):
    """
    Effectue une attaque par force brute pour casser le chiffrement César.

    Args:
        texte_chiffre: Le texte chiffré

    Returns:
        Une liste de tuples (clef, texte_en_clair)
    """
    resultats = []
    for k in range(1, 26):
        texte_clair = cesar_dechiffrer(texte_chiffre, k)
        resultats.append((k, texte_clair))
    return resultats


# EXEMPLE 1: Chiffrement et déchiffrement
print("=== EXEMPLE 1: Chiffrement et déchiffrement ===")
message = "HELLO WORLD"
clef = 3
chiffre = cesar_chiffrer(message, clef)
dechiffre = cesar_dechiffrer(chiffre, clef)

print(f"Message en clair: {message}")
print(f"Clef: {clef}")
print(f"Message chiffré: {chiffre}")
print(f"Message déchiffré: {dechiffre}")

print("\n=== EXEMPLE 2: Attaque par force brute ===")
message_intercepte = "KHOOR ZRUOG"
print(f"Message intercepté: {message_intercepte}")
print(f"\nTous les déchiffrements possibles:")

resultats = cesar_attaque_brute(message_intercepte)
for k, texte in resultats:
    print(f"  k={k:2d} → {texte}")

print("\n=== À VOUS DE JOUER ===")
print("1. Chiffrez 'INFORMATIQUE' avec la clef k=5")
message_test = "INFORMATIQUE"
clef_test = 5
chiffre_test = cesar_chiffrer(message_test, clef_test)
print(f"   Résultat: {chiffre_test}")

print("\n2. Attaque par force brute sur le message chiffré:")
print(f"   (Cherchez le texte qui ressemble à du français)")
resultats_test = cesar_attaque_brute(chiffre_test)
for k, texte in resultats_test:
    print(f"     k={k:2d} → {texte}")
```

````{solution}
**1. Chiffrement de `INFORMATIQUE` avec k=5:**

En utilisant le code, on obtient: `NSYJWRFSHZRD`

**2. Attaque par force brute:**

En testant tous les 25 décalages possibles, le texte qui ressemble à du français est celui avec $k = 5$, qui donne `INFORMATIQUE` (le message original).

Cet exercice montre pourquoi César est totalement insécurisé: même sans connaître la clef, il suffit de quelques décalages pour retrouver le message!
````
