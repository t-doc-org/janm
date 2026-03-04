<!-- Copyright 2024 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

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

## Le chiffrement par substitution

Le chiffrement de César est en réalité un cas particulier d'un chiffrement plus général : le **chiffrement par substitution**. Dans le chiffrement par substitution, chaque lettre de l'alphabet est remplacée par une autre lettre, mais contrairement à César, les remplacements ne suivent pas un décalage régulier. La **clef** est une permutation complète de l'alphabet, c'est-à-dire une table de correspondance entre chaque lettre et son remplacement.

**Exemple :** voici une clef de substitution possible :

| Clair  | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|--------|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chiffré| Q | W | E | R | T | Y | U | I | O | P | A | S | D | F | G | H | J | K | L | Z | X | C | V | B | N | M |

Avec cette clef, le texte `HELLO` serait chiffré en `ITSSG` :
- `H` → `I`
- `E` → `T`
- `L` → `S`
- `L` → `S`
- `O` → `G`

Pour déchiffrer, le destinataire utilise la table de correspondance **inversée** : il cherche la lettre chiffrée dans la ligne du bas et lit la lettre en clair correspondante dans la ligne du haut.

### Nombre de clefs possibles

Le chiffrement par substitution est **beaucoup plus résistant** à l'attaque par force brute que le chiffrement de César. En effet, le nombre de clefs possibles correspond au nombre de façons d'arranger 26 lettres, soit $26!$ (26 factorielle) :

$$26! = 26 \times 25 \times 24 \times \ldots \times 2 \times 1 \approx 4 \times 10^{26}$$

C'est environ **400'000'000'000'000'000'000'000'000** clefs possibles. Même un ordinateur testant un milliard de clefs par seconde mettrait des milliards d'années à toutes les essayer. L'attaque par force brute est donc **irréalisable** dans ce cas.

### Attaque par analyse de fréquence

Malgré ce très grand nombre de clefs, le chiffrement par substitution reste **vulnérable**. En effet, chaque lettre est toujours remplacée par la même lettre chiffrée. Cela signifie que les **fréquences d'apparition** des lettres sont conservées dans le texte chiffré.

Par exemple, en français, la lettre `E` est de loin la plus fréquente (environ 15% des lettres). Si dans un texte chiffré, la lettre `Z` apparaît le plus souvent, on peut supposer que `Z` remplace `E`. En répétant ce raisonnement pour les lettres les plus courantes (`E`, `A`, `S`, `I`, `N`, `T`...), on peut progressivement reconstituer la clef de substitution.

Cette méthode s'appelle l'**analyse de fréquence** et elle permet de casser le chiffrement par substitution sans avoir à tester toutes les clefs.

## Le masque jetable (One-Time Pad)

Le chiffrement de César et le chiffrement par substitution sont tous les deux vulnérables : le premier à la force brute, le second à l'analyse de fréquence. Existe-t-il un chiffrement **parfaitement sûr** ? La réponse est oui : le **masque jetable** (ou *One-Time Pad*, OTP), inventé par Gilbert Vernam en 1917.

### Principe

Le masque jetable fonctionne en combinant le texte en clair avec une **clef aléatoire de même longueur** que le message, à l'aide de l'opération **XOR** (ou exclusif). Pour cela, le texte et la clef doivent d'abord être représentés en binaire.

### Encodage ASCII

Pour représenter du texte en binaire, on utilise l'encodage **ASCII** (*American Standard Code for Information Interchange*). Chaque caractère est associé à un nombre entre 0 et 127, lui-même représenté sur 8 bits (un octet).

Voici quelques exemples :

| Caractère | Code ASCII (décimal) | Code ASCII (binaire) |
|-----------|---------------------|---------------------|
| `A`       | 65                  | `01000001`          |
| `B`       | 66                  | `01000010`          |
| `H`       | 72                  | `01001000`          |
| `e`       | 101                 | `01100101`          |
| `i`       | 105                 | `01101001`          |
| espace    | 32                  | `00100000`          |

Ainsi, le mot `Hi` s'encode en binaire comme : `01001000 01101001`.

### L'opération XOR

Le **XOR** (ou exclusif, noté $\oplus$) est une opération logique sur des bits. Elle renvoie `1` si les deux bits sont **différents**, et `0` s'ils sont **identiques** :

| $a$ | $b$ | $a \oplus b$ |
|-----|-----|--------------|
| 0   | 0   | 0            |
| 0   | 1   | 1            |
| 1   | 0   | 1            |
| 1   | 1   | 0            |

Une propriété essentielle du XOR est qu'il est **réversible** : si $c = t \oplus k$, alors $t = c \oplus k$. C'est cette propriété qui permet d'utiliser la même clef pour chiffrer et déchiffrer.

### Exemple complet

Chiffrons le message $t =$ `Hi` avec la clef $k =$ `Wp` :

**1. Encodage ASCII en binaire :**

| | Caractère | ASCII | Binaire |
|---|-----------|-------|------------|
| $t$ | `H` | 72 | `01001000` |
| $t$ | `i` | 105 | `01101001` |
| $k$ | `W` | 87 | `01010111` |
| $k$ | `p` | 112 | `01110000` |

**2. Chiffrement : $c = t \oplus k$ (XOR bit à bit) :**

```
  t = 01001000 01101001
  k = 01010111 01110000
  ⊕ ─────────────────────
  c = 00011111 00011001
```

Le texte chiffré $c$ en binaire est `00011111 00011001`, ce qui correspond aux codes ASCII 31 et 25 (des caractères non imprimables, ce qui est normal).

**3. Déchiffrement : $t = c \oplus k$ :**

```
  c = 00011111 00011001
  k = 01010111 01110000
  ⊕ ─────────────────────
  t = 01001000 01101001
```

On retrouve bien `01001000` = 72 = `H` et `01101001` = 105 = `i`, soit le message original `Hi`.

### Sécurité parfaite

Le masque jetable est le **seul chiffrement prouvé mathématiquement incassable**, à condition de respecter trois règles strictes :

1. La clef doit être **aussi longue** que le message
2. La clef doit être **parfaitement aléatoire**
3. La clef ne doit **jamais être réutilisée** (d'où le nom de masque *jetable*)

Si ces conditions sont remplies, le texte chiffré ne révèle **aucune information** sur le texte en clair. En effet, pour un même texte chiffré, toutes les clefs possibles produisent des textes en clair différents et tous sont équiprobables. Un espion ne peut donc pas savoir lequel est le bon, même avec une puissance de calcul infinie.

### Limites pratiques

Malgré sa sécurité parfaite, le masque jetable est **rarement utilisé en pratique** car :
- Il faut générer et transmettre de manière sécurisée une clef **aussi longue que le message**, ce qui est souvent plus difficile que de transmettre le message lui-même
- Chaque clef ne peut servir qu'**une seule fois** : pour envoyer 1 Go de données, il faut 1 Go de clef

Le téléphone rouge entre Washington et Moscou pendant la Guerre froide est l'un des rares exemples d'utilisation du masque jetable : des clefs étaient échangées physiquement par valise diplomatique.

## Exercices

```{role} input(quiz-input)
:right: width: 18rem; clear: right;
:check: split lowercase
```

### Exercice {num1}`exercice_crypto`
Alice veut envoyer le message `RDV DEMAIN` à Bob avec le chiffrement de César. Au préalable, ils se sont échangés la clef $k=20$. Quel est le texte chiffré qu'Alice transmettra sur un canal public ?

```{quiz}
{input}`LXP XYGUCH`
Texte chiffré :

```

### Exercice {num1}`exercice_crypto`

Vous connaissez le message chiffré `LSOXFOXEO`. Vous savez également qu'il a été chiffré avec César et un décalage de 10. Effectuez le déchiffrement $D_k(c) = t$ pour trouver le texte en clair.

```{quiz}
{input}`BIENVENUE`
Texte en clair :

```


### Exercice {num1}`exercice_crypto`

Vous connaissez le texte en clair $t = $ `SECRET` ainsi que son équivalent chiffré $c = $ `WIGVIX`. Quelle est la clef $k$ utilisée?

```{quiz}
{input}`4`
Clef $k$ :

```

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

```{quiz}
{input}`EST-CE QUE TU CONNAIS L'HISTOIRE TRAGIQUE DE DARK PLAGUEIS LE SAGE`
Texte en clair (sans le ?) :

```

### Exercice {num1}`exercice_crypto`
Pour cet exercice, vous n'avez pas connaissance de la clef de chiffrement utilisée avec César. Vous allez donc attaquer $c$ par force brute. Pour cela, exécutez le code Python ci-dessous. La boucle `for k in range(1, 26):` permet de tester toutes les clefs $k$ de 1 à 25.

 - Trouvez la valeur de $k$ utilisée dans le chiffrement ainsi que le texte en clair.
 - Le texte en clair déchiffré contient de petites erreurs, pourquoi ?
```{exec} python
:after: cesar
:editor: 9a44b7db-acae-47c1-a790-63c27d64e698
c = "MZYUZFC ? BF’PYEPYOPK GZFD ALC WI ? XP DZFSLTEPK GZFD WP MZYUZFC ZF NZYDELEPK GZFD BFP N’PDE FYP MZYYP UZFCYRP, BFP UP WP GPFTWWP ZF YZY, ZF PYNZCP BFP N’PDE FYP UZFCYRP ZH TW QLFE SECP MZY ?"
for k in range(1, 26):
  t = cesar_dechiffrer(c, k)
  print(f"k={k} : t={t}")
```

```{quiz}
{input}`11`
Valeur de $k$ :

```

### Exercice {num1}`exercice_crypto`

Le texte chiffré ci-dessous a été chiffré avec un **chiffrement par substitution** en utilisant la clef suivante :

| Clair  | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|--------|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chiffré| Q | W | E | R | T | Y | U | I | O | P | A | S | D | F | G | H | J | K | L | Z | X | C | V | B | N | M |

Déchiffrez le message suivant : $c =$ `WKQCG CGXL QCTM KTXLLO`

```{quiz}
{input}`BRAVO VOUS AVEZ REUSSI`
Texte en clair :

```

### Exercice {num1}`exercice_crypto`

Le texte chiffré ci-dessous a été chiffré avec un **chiffrement par substitution**. L’attaque par force brute est donc impossible. Vous allez devoir utiliser l’**analyse de fréquence** pour le déchiffrer.

```{exec} python
:name: substitution
:class: hidden
def frequences(texte):
    freq = {}
    for char in texte:
        if char.isalpha():
            freq[char] = freq.get(char, 0) + 1
    total = sum(freq.values())
    for lettre, count in sorted(freq.items(), key=lambda x: x[1], reverse=True):
        print(f"{lettre} : {count} fois ({count/total*100:.1f}%)")

def dechiffrer_substitution(texte, clef):
    resultat = ""
    for char in texte:
        lower = char.lower()
        if lower in clef:
            remplacement = clef[lower]
            if remplacement != "_":
                resultat += remplacement.upper() if char.isupper() else remplacement
            else:
                resultat += "_"
        elif lower.isalpha():
            resultat += "_"
        else:
            resultat += char
    print("Déchiffrement :", resultat)
```

Le code Python ci-dessous compte les fréquences des lettres dans le texte chiffré. Exécutez-le et comparez les fréquences obtenues avec celles des lettres en français pour commencer votre analyse.

```{image} images/freq_fr.gif
:width: 80%
:alt: Fréquence d'apparition des lettres en français
:align: center
```
```{exec} python
:after: substitution
:editor: c8f1a2b3-4d5e-6f7a-8b9c-0d1e2f3a4b5c
c = """Furnsyp h’qeqjn njc qvn h’qj ey, yvp lujn, yvp gqmvjljsyp jgqmp, zqvn yv fjerp nyr fq Lurpo Ejprmp syj n’qttpfqjo « Kjnoujrpn Epxypn ». Xq rptrpnpvoqjo yv nprtpvo wuq syj qeqfqjo yv lqyep. Eujfq fq xutjp zy zpnnjv. Uv zjnqjo zqvn fp fjerp : « Fpn nprtpvon wuqn qeqfpvo fpyr trujp ouyo pvojprp, nqvn fq gqxkpr. Pvnyjop jfn vp tpyepvo tfyn wuympr po jfn zurgpvo tpvzqvo fpn njc gujn zp fpyr zjmpnojuv. » H’qj qfurn wpqyxuyt rplfpxkj nyr fpn qepvoyrpn zp fq hyvmfp po, q guv ouyr, h’qj rpynnj, qepx yv xrqbuv zp xuyfpyr, q orqxpr guv trpgjpr zpnnjv."""
frequences(c)
```

Utilisez maintenant le code ci-dessous pour tester vos hypothèses de substitution. Complétez le dictionnaire `k` avec vos découvertes (ex: `"z": "e"` signifierait que `z` dans le texte chiffré remplace le `e` du texte en clair). Les lettres non encore devinées apparaîtront comme `_`.

```{exec} python
:after: substitution
:editor: d9e2f3a4-5b6c-7d8e-9f0a-1b2c3d4e5f6a
c = """Furnsyp h’qeqjn njc qvn h’qj ey, yvp lujn, yvp gqmvjljsyp jgqmp, zqvn yv fjerp nyr fq Lurpo Ejprmp syj n’qttpfqjo « Kjnoujrpn Epxypn ». Xq rptrpnpvoqjo yv nprtpvo wuq syj qeqfqjo yv lqyep. Eujfq fq xutjp zy zpnnjv. Uv zjnqjo zqvn fp fjerp : « Fpn nprtpvon wuqn qeqfpvo fpyr trujp ouyo pvojprp, nqvn fq gqxkpr. Pvnyjop jfn vp tpyepvo tfyn wuympr po jfn zurgpvo tpvzqvo fpn njc gujn zp fpyr zjmpnojuv. » H’qj qfurn wpqyxuyt rplfpxkj nyr fpn qepvoyrpn zp fq hyvmfp po, q guv ouyr, h’qj rpynnj, qepx yv xrqbuv zp xuyfpyr, q orqxpr guv trpgjpr zpnnjv."""
k = {
    "a": "_", "b": "_", "c": "_", "d": "_", "e": "_", "f": "_",
    "g": "_", "h": "_", "i": "_", "j": "_", "k": "_", "l": "_",
    "m": "_", "n": "_", "o": "_", "p": "_", "q": "_", "r": "_",
    "s": "_", "t": "_", "u": "_", "v": "_", "w": "_", "x": "_",
    "y": "_", "z": "_"
}
dechiffrer_substitution(c, k)
```

```{quiz}
{input}`le petit prince`
De quel livre est tirée cette citation ?

```

### Exercice {num1}`exercice_crypto`

Alice veut chiffrer le message $t =$ `OK` avec le masque jetable (One-Time Pad). Sa clef est $k =$ `Zr`.

1. Convertissez chaque caractère de $t$ et $k$ en binaire à l'aide de la table ASCII ci-dessous
2. Effectuez l'opération XOR bit à bit pour obtenir le texte chiffré $c$

| Caractère | ASCII | Binaire | | Caractère | ASCII | Binaire |
|-----------|-------|------------|---|-----------|-------|------------|
| `K`       | 75    | `01001011` | | `Z`       | 90    | `01011010` |
| `O`       | 79    | `01001111` | | `r`       | 114   | `01110010` |

```{quiz}
{input}`00010101 00111001`
Texte chiffré $c$ (groupes de 8 bits séparés par un espace) :

```

### Exercice {num1}`exercice_crypto`

Bob reçoit le texte chiffré $c =$ `00011011 00001010` (en binaire). Il connaît la clef $k =$ `Sc`. Effectuez le déchiffrement avec le masque jetable pour retrouver le texte en clair $t$.

1. Convertissez chaque caractère de $k$ en binaire à l'aide de la table ASCII ci-dessous
2. Effectuez l'opération XOR entre $c$ et $k$ pour obtenir $t$ en binaire
3. Convertissez le résultat en caractères ASCII

| Caractère | ASCII | Binaire |
|-----------|-------|------------|
| `S`       | 83    | `01010011` |
| `c`       | 99    | `01100011` |

```{quiz}
{input}`Hi`
Texte en clair $t$ :

```

