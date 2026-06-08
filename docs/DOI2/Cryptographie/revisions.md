<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Révisions Cryptographie

Cette page rassemble des exercices de révision couvrant tous les objectifs de
l'examen : chiffrement symétrique (César, substitution, masque jetable),
chiffrement asymétrique (RSA), leurs vulnérabilités, ainsi que les mots de passe
et le hachage. Pour les calculs de puissance modulaire (RSA), aidez-vous de
[WolframAlpha](https://www.wolframalpha.com).

```{role} input(quiz-input)
:right: width: 18rem; clear: right;
:check: split lowercase
```

## Symétrique ou asymétrique ?

### Exercice {num1}`exercice-revision`

Pour chaque affirmation, indiquez s'il s'agit du chiffrement **symétrique** ou
**asymétrique**.

```{role} type(quiz-select)
:right:
:options: |
: Symétrique
: Asymétrique
```

```{quiz}
:style: max-width: 46rem;
1.  {type}`Symétrique`  On utilise une **même clef secrète** pour chiffrer et déchiffrer
2.  {type}`Asymétrique` On chiffre avec une clef **publique** et on déchiffre avec une clef **privée**
3.  {type}`Asymétrique` RSA
4.  {type}`Symétrique`  Le chiffrement de César et le masque jetable
5.  {type}`Asymétrique` Permet de communiquer sans s'être partagé de secret au préalable
6.  {type}`Symétrique`  Beaucoup plus rapide, utilisé pour chiffrer de grandes quantités de données
```

## Chiffrement de César

### Exercice {num1}`exercice-revision`

Chiffrez le message `BONJOUR` avec le chiffrement de César et la clef $k = 5$.

```{quiz}
{input}`GTSOTZW`
Texte chiffré :

```

### Exercice {num1}`exercice-revision`

Vous recevez le texte chiffré `ZHSBA`, chiffré avec César et la clef $k = 7$.
Déchiffrez-le.

```{quiz}
{input}`SALUT`
Texte en clair :

```

### Exercice {num1}`exercice-revision`

Vous savez que le texte en clair `CHAT` a été chiffré en `MRKD` avec César.
Quelle clef $k$ a été utilisée ?

```{quiz}
{input}`10`
Clef $k$ :

```

### Exercice {num1}`exercice-revision`

Combien de clefs faut-il tester **au maximum** pour casser un chiffrement de
César par force brute ?

```{quiz}
{input}`25`
Nombre de clefs :

```

Le texte ci-dessous a été chiffré avec César, mais vous ne connaissez pas la
clef. Exécutez l'attaque par force brute pour retrouver la clef $k$ et le texte
en clair.

```{exec} python
:name: cesar_rev
:class: hidden
def cesar_chiffrer(texte, k):
    resultat = ""
    for char in texte.upper():
        if char.isalpha():
            ascii_a = ord('A')
            pos = ord(char) - ascii_a
            nouvelle_pos = (pos + k) % 26
            resultat += chr(ascii_a + nouvelle_pos)
        else:
            resultat += char
    return resultat

def cesar_dechiffrer(texte_chiffre, k):
    return cesar_chiffrer(texte_chiffre, -k)
```

```{exec} python
:after: cesar_rev
:editor: 019f0200-0c01-7c01-8c01-000000000c01
c = "KXRIDXGT"
for k in range(1, 26):
    print(f"k={k} : {cesar_dechiffrer(c, k)}")
```

```{quiz}
{input}`15`
Clef $k$ trouvée :

```

## Chiffrement par substitution

### Exercice {num1}`exercice-revision`

Déchiffrez le message `WKQCG`, chiffré par substitution avec la clef suivante :

| Clair  | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|--------|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chiffré| Q | W | E | R | T | Y | U | I | O | P | A | S | D | F | G | H | J | K | L | Z | X | C | V | B | N | M |

```{quiz}
{input}`BRAVO`
Texte en clair :

```

### Exercice {num1}`exercice-revision`

Questions sur l'**analyse de fréquence**.

```{role} vf(quiz-select)
:right:
:options: |
: Vrai
: Faux
```

```{quiz}
:style: max-width: 46rem;
1.  {vf}`Faux` La force brute est réaliste contre la substitution (il y a $26!$ clefs possibles)
2.  {vf}`Vrai` Le chiffrement par substitution conserve les fréquences d'apparition des lettres
3.  {vf}`Vrai` C'est cette conservation des fréquences qui permet de casser le chiffrement
```

Quelle est la lettre la plus fréquente dans un texte en français ?

```{quiz}
{input}`E`
Lettre :

```

## Masque jetable (One-Time Pad)

### Exercice {num1}`exercice-revision`

Chiffrez le message $t =$ `Hi` avec le masque jetable et la clef $k =$ `Ax`.

1. Convertissez chaque caractère en binaire à l'aide de la table ASCII
2. Effectuez l'opération XOR bit à bit

| Caractère | ASCII | Binaire | | Caractère | ASCII | Binaire |
|-----------|-------|------------|---|-----------|-------|------------|
| `H`       | 72    | `01001000` | | `A`       | 65    | `01000001` |
| `i`       | 105   | `01101001` | | `x`       | 120   | `01111000` |

```{quiz}
{input}`00001001 00010001`
Texte chiffré $c$ (groupes de 8 bits séparés par un espace) :

```

## Chiffrement asymétrique (RSA)

### Exercice {num1}`exercice-revision`

On génère une paire de clefs RSA avec les nombres premiers $p = 5$ et $q = 11$.
On a donc $n = p \times q = 55$.

**a)** Calculez $\phi(n) = (p-1) \times (q-1)$.

```{quiz}
{input}`40`
$\phi(n)$ :

```

**b)** Trouvez le plus petit nombre premier $e$ (différent de 2) qui ne divise
pas $\phi(n)$.

```{quiz}
{input}`3`
$e$ :

```

**c)** Trouvez $d$ tel que $(e \times d) \mod \phi(n) = 1$, avec $20 < d < 50$.
Sur WolframAlpha, vous pouvez taper `PowerMod[3, -1, 40]`.

```{quiz}
{input}`27`
$d$ :

```

**d)** Quelle est la clef publique ?

```{quiz}
{input}`(55 3)`
Clef publique $(n$ $e)$ sans virgule :

```

**e)** Quelle est la clef privée ?

```{quiz}
{input}`(55 27)`
Clef privée $(n$ $d)$ sans virgule :

```

### Exercice {num1}`exercice-revision`

Avec la clef publique $(n, e) = (55, 3)$, chiffrez le message $t = 4$ à l'aide
de la formule $c = t^e \mod n$.

```{quiz}
{input}`9`
Valeur chiffrée $c$ :

```

### Exercice {num1}`exercice-revision`

Vous recevez le message chiffré $c = 13$. Avec votre clef privée
$(n, d) = (55, 27)$, déchiffrez-le à l'aide de la formule $t = c^d \mod n$.

```{quiz}
{input}`7`
Valeur en clair $t$ :

```

## Mots de passe et hachage

### Exercice {num1}`exercice-revision`

Vrai ou faux ?

```{role} vf(quiz-select)
:right:
:options: |
: Vrai
: Faux
```

```{quiz}
:style: max-width: 50rem;
1.  {vf}`Faux` Un site sérieux stocke les mots de passe **en clair** dans sa base de données
2.  {vf}`Vrai` Une fonction de hachage est **irréversible** : on ne peut pas retrouver l'entrée à partir du hash
3.  {vf}`Vrai` La même entrée produit toujours le **même** hash
4.  {vf}`Vrai` Un mot de passe **long et varié** résiste mieux à une attaque par force brute
5.  {vf}`Faux` Un mot de passe comme `soleil` résiste bien à une attaque par **dictionnaire**
```

### Exercice {num1}`exercice-revision`

Une attaque teste une liste de **mots courants** (prénoms, mots du dictionnaire,
mots de passe répandus) plutôt que toutes les combinaisons possibles. Comment
s'appelle cette attaque ?

```{quiz}
{input}`dictionnaire`
Nom de l'attaque :

```

### Exercice {num1}`exercice-revision`

Citez **deux caractéristiques** d'un mot de passe sécurisé, capable de résister
à la fois à une attaque par force brute et par dictionnaire.

```{solution}
1. **Longueur** : un mot de passe long augmente énormément le nombre de
   combinaisons à tester en force brute.
2. **Variété des caractères** : mélanger minuscules, majuscules, chiffres et
   caractères spéciaux multiplie le nombre de combinaisons possibles.
3. **Imprévisibilité** : éviter les mots courants, prénoms et dates, afin de
   résister aux attaques par dictionnaire.

(Deux de ces trois caractéristiques suffisent.)
```
