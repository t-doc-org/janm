<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Stéganographie

<script src="../../_static/stegano-tools.js"></script>
<link rel="stylesheet" href="../../_static/stegano-tools.css">

## Cacher plutôt que chiffrer

La **cryptographie** rend un message illisible : on sait qu'un message secret existe, mais on ne peut pas le lire sans la clef. La **stéganographie** va plus loin : elle **cache l'existence même** du message. Personne ne soupçonne qu'un secret est présent.

Le mot vient du grec *steganos* (couvert, caché) et *graphein* (écrire) : littéralement, « écriture couverte ».

Les deux approches peuvent être combinées : on chiffre d'abord le message (cryptographie), puis on le cache dans un support anodin (stéganographie). Ainsi, même si quelqu'un découvre le message caché, il ne pourra pas le lire.

---

## Un peu d'histoire

La stéganographie est une pratique très ancienne :

- **Grèce antique** : l'historien Hérodote raconte qu'Histiée rasa la tête de son esclave, tatoua un message sur son crâne, attendit que les cheveux repoussent, puis envoya l'esclave porter le message
- **Encre invisible** : écrire avec du jus de citron ou du lait sur du papier. Le message n'apparaît que lorsqu'on chauffe la feuille
- **Micropoints (WWII)** : pendant la Seconde Guerre mondiale, des espions photographiaient des documents en miniature sur des points minuscules (moins d'1 mm), collés sur des lettres ordinaires comme s'il s'agissait de points de ponctuation
- **Stéganographie numérique** : aujourd'hui, on peut cacher des messages dans des fichiers numériques (images, audio, vidéo) en modifiant imperceptiblement leurs données

---

## Comment une image est-elle stockée ?

Une image numérique est composée d'une grille de **pixels**. Chaque pixel possède trois composantes de couleur :

- **R** (Rouge) : intensité de 0 à 255
- **G** (Vert) : intensité de 0 à 255
- **B** (Bleu) : intensité de 0 à 255

Chaque composante est stockée sur **8 bits** (1 octet), ce qui donne 256 valeurs possibles.

| Composante | Valeur décimale | Valeur binaire |
|---|---|---|
| R | 200 | `11001000` |
| G | 150 | `10010110` |
| B | 100 | `01100100` |

---

## Le bit de poids faible (LSB)

Le **bit de poids faible** (*Least Significant Bit*, LSB) est le bit le plus à droite dans la représentation binaire d'un nombre. C'est celui qui a le **moins d'influence** sur la valeur : le modifier ne change la valeur que de 1.

Par exemple, pour la composante rouge d'un pixel :
- `11001000` = 200
- `1100100`**`1`** = 201

La différence entre 200 et 201 est **imperceptible** à l'oeil humain. C'est ce principe qui rend la stéganographie LSB possible : on remplace les bits de poids faible des pixels par les bits de notre message secret, sans que personne ne remarque de changement visuel.

Cochez les cases ci-dessous pour inverser le **LSB** ou le **MSB** (bit de poids fort, le plus à gauche) de chaque pixel. Comparez l'image originale et l'image modifiée : le changement du LSB est imperceptible, alors que le MSB change radicalement la couleur.

<div id="lsb-visualizer" class="steg-tool"></div>

---

## Cacher un message dans les LSB

Pour cacher un message dans une image, on suit ces étapes :

1. **Convertir** le message en binaire (code ASCII, 8 bits par caractère)
2. **Remplacer** le LSB de chaque canal (R, G, B) de chaque pixel par un bit du message
3. Un pixel peut stocker **3 bits** (un dans chaque canal R, G, B)

**Exemple :** cachons la lettre `H` (code ASCII 72 = `01001000`) dans 3 pixels.

| Pixel | Canal | Valeur originale | Binaire original | Bit à cacher | Binaire modifié | Valeur modifiée |
|---|---|---|---|---|---|---|
| 1 | R | 200 | `1100100`**`0`** | **0** | `1100100`**`0`** | 200 |
| 1 | G | 150 | `1001011`**`0`** | **1** | `1001011`**`1`** | 151 |
| 1 | B | 100 | `0110010`**`0`** | **0** | `0110010`**`0`** | 100 |
| 2 | R | 180 | `1011010`**`0`** | **0** | `1011010`**`0`** | 180 |
| 2 | G | 120 | `0111100`**`0`** | **1** | `0111100`**`1`** | 121 |
| 2 | B | 90  | `0101101`**`0`** | **0** | `0101101`**`0`** | 90  |
| 3 | R | 210 | `1101001`**`0`** | **0** | `1101001`**`0`** | 210 |
| 3 | G | 160 | `1010000`**`0`** | **0** | `1010000`**`0`** | 160 |

Les valeurs changent au maximum de 1. La différence est invisible à l'oeil nu.

La capacité de stockage dépend de la taille de l'image. Chaque pixel stocke **3 bits** (un par canal R, G, B). Par exemple, pour une image de 1920 x 1080 (Full HD) : 1920 x 1080 x 3 = **6'220'800 bits** = **777'600 caractères**, soit environ 130 pages de texte.

### Essayez vous-meme

Essayez maintenant de cacher un mot de votre choix dans les pixels ci-dessous. A l'aide de la table ASCII, convertissez chaque caractère en binaire, puis cliquez sur les boutons **LSB** pour placer vos bits dans l'ordre (pixel 0 R, pixel 0 G, pixel 0 B, pixel 1 R, ...). Le texte décodé se met à jour en temps réel.

<div id="lsb-encoder" class="steg-tool"></div>

---

## A vous de jouer

### Étape 1 : Cacher un message

Utilisez l'outil ci-dessous pour cacher un message dans une image.

```{important}
Seuls les caractères ASCII (sans accents) sont supportés par cet outil.
```

<div class="steg-tool">
<p><strong>Image source :</strong></p>
<canvas id="steg-hide-original" class="steg-canvas" style="max-width: 320px; image-rendering: pixelated;"></canvas>
<p><strong>Message à cacher :</strong></p>
<textarea id="steg-hide-input" rows="3" placeholder="Entrez votre message secret (ASCII uniquement, sans accents)..."></textarea>
<button class="tool-btn" onclick="hideMessage()">Cacher le message</button>
<div class="tool-progress" id="steg-hide-progress"></div>
<div id="steg-hide-result"></div>
<p><strong>Image avec message caché :</strong></p>
<canvas id="steg-hide-canvas" class="steg-canvas" style="display:none; max-width: 320px; image-rendering: pixelated;"></canvas>
<button class="tool-btn" id="steg-download-btn" style="display:none;" onclick="downloadCanvas('steg-hide-canvas', 'image_secrete.png')">Télécharger l'image</button>
</div>

### Étape 2 : Envoyer l'image

Téléchargez l'image générée et envoyez-la à un camarade par **email** ou **Teams**. L'image ressemble à un simple paysage, personne ne soupçonnera qu'elle contient un message secret.

```{important}
L'image doit rester au format **PNG**. Si elle est convertie en JPEG (par exemple par une compression automatique), les bits de poids faible seront modifiés et le message sera perdu.
```

### Étape 3 : Extraire un message

Votre camarade (ou vous-même) peut charger l'image PNG reçue dans l'outil ci-dessous pour retrouver le message caché.

<div class="steg-tool">
<input type="file" id="steg-extract-file" accept="image/png" onchange="loadExtractFile()">
<canvas id="steg-extract-canvas" class="steg-canvas" style="display:none; max-width: 320px;"></canvas>
<button class="tool-btn" onclick="extractMessage()">Extraire le message</button>
<div id="steg-extract-result"></div>
</div>

