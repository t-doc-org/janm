<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: dynamic
```

# TP : RSA en pratique

## Mise en situation

Dans ce TP, vous allez utiliser RSA pour communiquer **pour de vrai** avec vos camarades de classe. Chaque personne va générer sa propre paire de clefs, publier sa clef publique, et échanger des messages secrets.

Tout au long de ce TP, utilisez [WolframAlpha](https://www.wolframalpha.com) pour les calculs de puissance modulaire.

---

## Étape 1 : Génération de vos clefs

### Rappel de la méthode

1. Choisir deux nombres premiers $p$ et $q$
2. Calculer $n = p \times q$ (il faut que $n > 127$ pour pouvoir encoder les caractères ASCII)
3. Calculer $\phi = (p-1) \times (q-1)$
4. Choisir $e$ premier tel que $\phi \mod e \neq 0$
5. Trouver $d$ tel que $(e \times d) \mod \phi = 1$, avec $d \neq e$

### Choix des nombres premiers

Choisissez deux nombres premiers dans cette liste. Assurez-vous que $n = p \times q > 127$.

$$11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97$$

### Exercice 1 : Générer vos clefs

**a)** Choisissez vos deux nombres premiers $p$ et $q$. Ils doivent rester **secrets**.

**b)** Calculez $n = p \times q$ et $\phi = (p-1) \times (q-1)$.

**c)** Choisissez un nombre premier $e$ tel que $\phi \mod e \neq 0$. Les choix courants sont 3, 5, 7, 11, 13, 17...

Vérifiez sur WolframAlpha que $\phi \mod e \neq 0$.

**d)** Trouvez $d$ tel que $(e \times d) \mod \phi = 1$.

Sur WolframAlpha, tapez `PowerMod[e, -1, phi]` en remplaçant par vos valeurs. Par exemple, `PowerMod[17, -1, 3120]` donne 2753.

**e)** Notez vos clefs :

| | Valeur |
|---|---|
| **Clef publique** $(n, e)$ | ( ___ , ___ ) |
| **Clef privée** $(n, d)$ | ( ___ , ___ ) |

**f)** Vérifiez vos clefs en chiffrant puis déchiffrant le nombre 42 :
- $c = 42^e \mod n$
- $t = c^d \mod n$

Si vous retrouvez 42, vos clefs sont correctes.

---

## Étape 2 : Annuaire public

Rendez-vous au tableau et inscrivez votre nom et votre clef **publique** $(n, e)$ dans l'annuaire de la classe. Copiez les clefs publiques de **deux** camarades dans vos notes.

---

## Étape 3 : Envoyer un message chiffré

### Exercice 2 : Chiffrement

**a)** Choisissez un destinataire et un message de 3 à 5 caractères. Convertissez chaque caractère en code ASCII :

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 |

| a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 |

| espace | ! | ? | . | , |
|--------|---|---|---|---|
| 32 | 33 | 63 | 46 | 44 |

**b)** Chiffrez chaque code ASCII avec la clef **publique** du destinataire :

$$c = t^{e_{dest}} \mod n_{dest}$$

**c)** Transmettez votre message sur un papier :

> De : _______ → Pour : _______
>
> Message chiffré : ___ , ___ , ___ , ___

---

## Étape 4 : Déchiffrer un message

### Exercice 3 : Déchiffrement

**a)** Déchiffrez chaque valeur du message reçu avec votre **clef privée** :

$$t = c^d \mod n$$

**b)** Convertissez les codes ASCII en caractères. Quel est le message ?

**c)** Vérifiez avec l'expéditeur que vous avez bien retrouvé le message original.

---

## Étape 5 : Mais qui a vraiment envoyé ce message ?

Vous avez reçu un message signé du nom d'un camarade. Mais **comment être sûr** que c'est bien cette personne qui l'a envoyé ? N'importe qui aurait pu écrire un faux nom sur le papier et chiffrer un message avec la clef publique du destinataire. Celle-ci est au tableau, visible par tous.

### Exercice 4 : L'imposteur

**a)** Envoyez un message chiffré à un camarade **en vous faisant passer pour quelqu'un d'autre**. Écrivez un faux nom d'expéditeur sur le papier.

**b)** Le destinataire peut-il détecter la supercherie ? Pourquoi ?

```{solution}
Non, il ne peut pas. Le chiffrement RSA garantit la **confidentialité** (seul le destinataire peut lire le message), mais il ne garantit pas l'**authenticité** (n'importe qui peut chiffrer avec une clef publique). Le destinataire n'a aucun moyen de vérifier qui a réellement écrit le message.
```

### La signature numérique

Pour prouver son identité, l'expéditeur peut **signer** son message en utilisant sa **clef privée**. Puisque seul l'expéditeur connaît sa clef privée, personne d'autre ne peut produire cette signature.

Le principe est simple : on applique RSA « à l'envers ».

**Signer** (l'expéditeur utilise sa clef **privée**) :

$$s = t^{d_{exp}} \mod n_{exp}$$

**Vérifier** (le destinataire utilise la clef **publique** de l'expéditeur) :

$$t_{vérifié} = s^{e_{exp}} \mod n_{exp}$$

Si $t_{vérifié}$ correspond au message déchiffré, alors le message vient bien de l'expéditeur.

### Exercice 5 : Envoyer un message signé

**a)** Choisissez un destinataire et **un seul caractère** à envoyer (pour limiter les calculs).

**b)** Convertissez le caractère en code ASCII (valeur $t$).

**c)** **Chiffrez** avec la clef publique du destinataire : $c = t^{e_{dest}} \mod n_{dest}$

**d)** **Signez** avec votre clef privée : $s = t^{d_{vous}} \mod n_{vous}$

**e)** Transmettez le tout sur un papier :

> De : _______ → Pour : _______
>
> Message chiffré : $c =$ ___
>
> Signature : $s =$ ___

### Exercice 6 : Vérifier une signature

**a)** Déchiffrez le message reçu avec votre clef privée : $t = c^d \mod n$

**b)** Vérifiez la signature avec la clef **publique** de l'expéditeur (au tableau) :

$$t_{vérifié} = s^{e_{exp}} \mod n_{exp}$$

**c)** Comparez $t$ et $t_{vérifié}$. Sont-ils identiques ?

**d)** Si oui, vous avez la garantie que :
- Le message est **confidentiel** : seul vous pouvez le lire
- Le message est **authentique** : il vient bien de l'expéditeur indiqué

**e)** Un imposteur pourrait-il produire une signature valide au nom de quelqu'un d'autre ? Pourquoi ?

```{solution}
Non. Pour signer au nom de quelqu'un, il faudrait connaître sa clef **privée** $d$. Or seul le propriétaire de la clef la connaît. L'imposteur peut écrire un faux nom, mais il ne peut pas produire une signature que la clef publique de la vraie personne pourrait vérifier. La vérification échouerait car $t_{vérifié} \neq t$.
```
