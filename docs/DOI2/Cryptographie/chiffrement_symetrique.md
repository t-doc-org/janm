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

Pour déchiffrer, Bob utilise la même clef $k = 3$ avec l'algorithme de déchiffrement dans lequel on décale chaque lettre de 3 positions **en arrière** pour retrouver le message original. Cela donne : $D_k(c) = \text{César inverse}_3($`KHOOR`$) =$`HELLO`=$t$.

## Attaque par force brute


Bien que simple à comprendre, le chiffrement de César est très **peu sûr** pour plusieurs raisons. Le problème majeur est qu'il n'y a que 25 clefs possibles (décalages de 1 à 25). Un espion (Charles dans le schéma) peut alors très rapidement tester ces 25 possibilités jusqu'à trouver la bonne.

Lorsqu'on teste toutes les clefs possibles sans autre réflexion, on appelle cela une **attaque par force brute**.

## Exercices

### Exercice {num1}`exercice_crypto`
Alice veut envoyer le message `RDV DEMAIN` à Bob avec le chiffrement de César. Au préalable, ils se sont échangés la clef $k=20$. Quel est le texte chiffré qu'Alice transmettra sur un canal public ?

### Exercice {num1}`exercice_crypto`

Vous connaissez le message chiffré `LSOXFOXEO`. Vous savez également qu'il a été chiffré avec César et un décalage de 10. Effectuez le déchiffrement $D_k(c) = t$ pour trouver le texte en clair.



### Exercice {num1}`exercice_crypto`

Vous connaissez le texte en clair $t = $ `SECRET` ainsi que son équivalent chiffré $c = $ `WIGVIX`. Quelle est la clef $k$ utilisée?

### Exercice {num1}`exercice_crypto`

```{exec} python
:name: cesar
:class: hidden
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
```

Les cellules de code ci-dessous contiennent 2 fonctions Python avec valeur de retour :`cesar_chiffrer` et `cesar_dechiffrer`. Celles-ci prennent chacune en paramètre le texte à chiffrer/déchiffrer et la clef. Elles retournent le texte adéquat.

Vous pouvez modifier le code ci-dessous pour chiffrer différents messages avec différentes clefs.
```{exec} python
:after: cesar
:editor: fdd03faf-8203-4c80-9f48-cb47420d73a2
t = "BONJOUR COMMENT ALLEZ-VOUS"
k = 6
c = cesar_chiffrer(t, k)
print("Texte chiffré :", c)
```

Utilisez maintenant la fonction `cesar_dechiffrer` avec la clef $k=23$ afin de trouver la signification du texte chiffré

```{exec} python
:after: cesar
:editor: fb4cac35-5395-465f-bb5c-612ce6bffa86
c = "BPQ-ZB NRB QR ZLKKXFP I'EFPQLFOB QOXDFNRB AB AXOH MIXDRBFP IB PXDB ?"
#Complétez ici
```

### Exercice {num1}`exercice_crypto`
Pour cet exercice, vous n'avez pas connaissance de la clef de chiffrement utilisée avec César. Vous allez donc attaquer $c$ par force brute. Pour cela, exécutez le code Python ci-dessous. La boucle `for k in range(1, 26):` permet de tester toutes les clefs $k$ de 1 à 25.

 - Trouvez la valeur de $k$ utilisée dans le chiffrement ainsi que le texte en clair.
 - Le texte en clair déchiffré contient de petites erreurs, pourquoi ?
```{exec} python
:after: cesar
:editor: 9a44b7db-acae-47c1-a790-63c27d64e698
c = "MZYUZFC ? BF'PYEPYOPK GZFD ALC WI ? XP DZFSLTEPK GZFD WP MZYUZFC ZF NZYDELEPK GZFD BFP N’PDE FYP MZYYP UZFCYRP, BFP UP WP GPFTWWP ZF YZY, ZF PYNZCP BFP N'PDE FYP UZFCYRP ZH TW QLFE SECP MZY ?"
for k in range(1, 26):
  t = cesar_dechiffrer(c, k)
  print(f"k={k} : t={t}")
```

