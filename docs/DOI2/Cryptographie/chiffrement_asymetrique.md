<!-- Copyright 2024 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

# Chiffrement asymétrique



Dans le chiffrement symétrique, Alice et Bob doivent se partager une **même clef secrète** par un canal sécurisé avant de pouvoir communiquer. Mais comment faire si Alice et Bob ne se sont jamais rencontrés ? Comment transmettre cette clef secrète sans qu'un espion ne l'intercepte ?

Le **chiffrement asymétrique** (ou chiffrement à clef publique) résout ce problème en utilisant non pas une, mais **deux clefs différentes** : une clef publique et une clef privée.


## Principe

```{image} images/situation_asym.png
:width: 80%
:alt: Cryptographie asymétrique
:align: center
```

Contrairement au chiffrement symétrique où une seule clef est partagée, le chiffrement asymétrique fonctionne avec une **paire de clefs** :

- Bob génère deux clefs mathématiquement liées :
  - Une **clef privée** $k_{B_{privée}}$ qu'il garde secrète pour lui seul
  - Une **clef publique** $k_{B_{publique}}$ qu'il peut partager à tout le monde
- Bob transmet sa clef publique à Alice (et à tout le monde) par un canal public
- Alice chiffre son message $t$ avec la clef **publique** de Bob : $c = E_{k_{B_{publique}}}(t)$
- Alice envoie $c$ à Bob par un canal public
- Bob déchiffre $c$ avec sa clef **privée** : $D_{k_{B_{privée}}}(c) = t$
- Charles, même s'il connaît la clef publique de Bob et le texte chiffré $c$, ne peut **pas** retrouver $t$ sans la clef privée

L'idée fondamentale est qu'il est facile de chiffrer avec la clef publique, mais **extrêmement difficile** de déchiffrer sans la clef privée. C'est comme une boîte aux lettres : tout le monde peut y déposer un courrier (chiffrer), mais seul le propriétaire possède la clef pour l'ouvrir (déchiffrer).

## RSA

L'algorithme **RSA**, nommé d'après ses inventeurs Rivest, Shamir et Adleman (1977), est le plus célèbre algorithme de chiffrement asymétrique. Sa sécurité repose sur un problème mathématique simple à énoncer mais très difficile à résoudre : la **factorisation de grands nombres**.

### Le problème de la factorisation

Multiplier deux nombres premiers entre eux est très facile :

$$61 \times 53 = 3233$$

Mais l'opération inverse, c'est-à-dire retrouver les deux facteurs à partir du produit, est **extrêmement difficile** lorsque les nombres sont très grands. Par exemple, essayez de trouver les deux facteurs premiers de :

$$9797$$

Il faut tester de nombreuses divisions pour trouver que $9797 = 97 \times 101$.

En pratique, RSA utilise des nombres premiers de plusieurs centaines de chiffres. Le produit de ces deux nombres est un nombre de plus de 600 chiffres. Même les ordinateurs les plus puissants ne peuvent pas factoriser de tels nombres en un temps raisonnable.

### Méthode

Pour que le chiffrement RSA soit sûr, il faut utiliser des clefs de taille suffisamment grande. Les nombres premiers choisis devront avoir plus de 100 chiffres. La méthode générale est la suivante :

1. Choisissez deux nombres premiers $p$ et $q$
2. Calculez $n = p \cdot q$
3. Calculez $\phi = (p-1) \cdot (q-1)$
4. Choisissez un nombre premier $e$ tel que $\phi \mod e \neq 0$
5. Recherchez $d$, $d \neq e$ tel que $(e \cdot d) \mod \phi = 1$

La **clef publique** sera composée des nombres $n$ et $e$, notée $(n, e)$.

La **clef privée** sera composée des nombres $n$ et $d$, notée $(n, d)$.

**Chiffrement** (avec la clef publique) : $c = t^e \mod n$

**Déchiffrement** (avec la clef privée) : $t = c^d \mod n$

### Exemple complet

Appliquons cette méthode avec de petits nombres pour comprendre le fonctionnement.

#### Génération des clefs

**Étape 1 :** On choisit deux nombres premiers $p$ et $q$.

$$p = 61, \quad q = 53$$

**Étape 2 :** On calcule $n = p \cdot q$.

$$n = 61 \times 53 = 3233$$

**Étape 3 :** On calcule $\phi = (p-1) \cdot (q-1)$.

$$\phi = 60 \times 52 = 3120$$

**Étape 4 :** On choisit un nombre premier $e$ tel que $\phi \mod e \neq 0$, c'est-à-dire que $e$ ne divise pas $\phi$.

$$e = 17 \quad \text{(17 est premier et } 3120 \mod 17 = 8 \neq 0 \text{)}$$

**Étape 5 :** On recherche $d$ tel que $(e \cdot d) \mod \phi = 1$, c'est-à-dire $(17 \cdot d) \mod 3120 = 1$.

Pour trouver $d$, on teste les valeurs une par une en cherchant celle pour laquelle $17 \times d$ donne un reste de 1 quand on divise par 3120 :

| $d$ | $17 \times d$ | $17 \times d \mod 3120$ | Résultat |
|-----|------------|----------------------|----------|
| 1 | 17 | 17 | $\neq 1$ |
| 2 | 34 | 34 | $\neq 1$ |
| 3 | 51 | 51 | $\neq 1$ |
| ... | ... | ... | ... |
| 184 | 3128 | 8 | $\neq 1$ |
| 185 | 3145 | 25 | $\neq 1$ |
| ... | ... | ... | ... |
| 2753 | 46801 | **1** | $= 1$ ✓ |

On peut vérifier : $17 \times 2753 = 46801 = 15 \times 3120 + 1$, donc $46801 \mod 3120 = 1$. ✓

En pratique, un algorithme efficace (l'algorithme d'Euclide étendu) permet de trouver $d$ sans tester toutes les valeurs. Mais le principe reste le même : on cherche $d$ tel que le produit $e \cdot d$ donne un reste de 1 dans la division par $\phi$.

$$d = 2753$$

**Résultat :**
- **Clef publique** : $(n, e) = (3233, 17)$ : Bob la partage avec tout le monde
- **Clef privée** : $(n, d) = (3233, 2753)$ : Bob la garde secrète

#### Chiffrement

Alice veut envoyer le message $t = 65$ (par exemple, la lettre `A` en ASCII) à Bob. Elle utilise la **clef publique** de Bob $(n, e) = (3233, 17)$ :

$$c = t^e \mod n = 65^{17} \mod 3233 = 2790$$

Alice envoie $c = 2790$ à Bob.

#### Déchiffrement

Bob reçoit $c = 2790$ et utilise sa **clef privée** $(n, d) = (3233, 2753)$ :

$$t = c^d \mod n = 2790^{2753} \mod 3233 = 65$$

Bob retrouve bien le message original $t = 65$, soit la lettre `A`.

### Pourquoi est-ce sûr ?

Charles connaît la clef publique $(n, e) = (3233, 17)$ et le texte chiffré $c = 2790$. Pour déchiffrer, il aurait besoin de $d$, l'exposant de déchiffrement. Pour calculer $d$, il faudrait connaître $\phi(n)$, et donc les facteurs premiers $p$ et $q$ de $n$.

Autrement dit, casser RSA revient à **factoriser** $n$. Avec notre exemple, $n = 3233$ est facile à factoriser. Mais en pratique, RSA utilise des valeurs de $n$ d'au moins **2048 bits** (environ 617 chiffres décimaux). Factoriser de tels nombres est considéré comme impossible avec les moyens de calcul actuels.

### Limites

Malgré sa sécurité, RSA présente un inconvénient majeur : il est **beaucoup plus lent** que le chiffrement symétrique (environ 1000 fois plus lent). C'est pourquoi, en pratique, RSA n'est pas utilisé pour chiffrer directement de longs messages.

À la place, on combine les deux approches dans ce qu'on appelle le **chiffrement hybride** :
1. Alice génère une clef symétrique aléatoire $k$ (rapide)
2. Alice chiffre $k$ avec la clef publique RSA de Bob (lent, mais $k$ est court)
3. Alice chiffre le message avec $k$ en chiffrement symétrique (rapide)
4. Bob déchiffre $k$ avec sa clef privée RSA, puis déchiffre le message avec $k$

C'est cette méthode qui est utilisée dans les protocoles sécurisés du quotidien comme **HTTPS** (le cadenas dans votre navigateur).

## Exercices

```{role} input(quiz-input)
:right: width: 18rem; clear: right;
:check: split lowercase
```

### Exercice {num1}`exercice_crypto`
On souhaite générer une clef publique et une clef privée avec RSA. On choisit les deux nombres premiers suivants :
- $p = 13$
- $q = 11$

On a donc $n = p \times q = 143$.

**a)** Calculez la valeur de $\phi(n) = (p-1) \times (q-1)$.

```{quiz}
{input}`120`
$\phi(n)$ :

```

**b)** Trouvez un $e$ premier, inférieur à 10, qui ne divise pas $\phi(n)$.

```{quiz}
{input}`7`
$e$ :

```

**c)** Trouvez $d$ tel que $(e \cdot d) \mod \phi(n) = 1$. Cherchez un $d > 100$. Vous pouvez vous aider de [WolframAlpha](https://wolframalpha.com) pour le calcul du modulo.

```{quiz}
{input}`103`
$d$ :

```

**d)** Quelle est la clef publique ?

```{quiz}
{input}`(143 7)`
Clef publique $(n$ $e)$ sans virgule:

```

**e)** Quelle est la clef privée ?

```{quiz}
{input}`(143 103)`
Clef privée $(n$ $d)$ sans virgule :

```

### Exercice {num1}`exercice_crypto`

Alice souhaite envoyer le message `Do` à Bob. La clef publique de Bob est $(n, e) = (143, 7)$.

Pour chiffrer, il faut d'abord convertir chaque caractère en son code ASCII (aidez-vous d'une [table ASCII](https://www.ascii-code.com/fr)), puis appliquer la formule $c = t^e \mod n$ à chaque valeur. Vous pouvez utiliser [WolframAlpha](https://www.wolframalpha.com) pour les calculs.

```{quiz}
{input}`29`
Valeur chiffrée pour `D` :

```

```{quiz}
{input}`45`
Valeur chiffrée pour `o` :

```

### Exercice {num1}`exercice_crypto` 

Bob reçoit le texte chiffré $c_1 = 123$, $c_2 = 18$. Sa clef privée est $(n, d) = (143, 103)$.

Pour déchiffrer, appliquez la formule $t = c^d \mod n$ à chaque valeur, puis convertissez les résultats en caractères ASCII (aidez-vous d'une [table ASCII](https://www.ascii-code.com/fr)). Vous pouvez utiliser [WolframAlpha](https://www.wolframalpha.com) pour les calculs.

```{quiz}
{input}`Up`
Message en clair :

```
