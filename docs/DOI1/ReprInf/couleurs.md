# Représentation des couleurs

```{metadata}
solutions: show
```

## La synthèse additive et les pixels

Sur un écran d'ordinateur, chaque pixel est composé de trois sous-pixels qui émettent respectivement de la lumière rouge (R pour *Red*), verte (G pour *Green*), et bleue (B pour *Blue*). En modulant l'intensité de chacun de ces trois sous-pixels, on peut créer une grande variété de couleurs grâce au principe de **synthèse additive** : lorsque plusieurs lumières colorées se superposent, leurs couleurs s'additionnent.

Par exemple :
- Rouge + Vert = Jaune
- Rouge + Bleu = Magenta
- Vert + Bleu = Cyan
- Rouge + Vert + Bleu = Blanc

Lorsque tous les sous-pixels sont éteints, le pixel apparaît noir. Lorsque tous les sous-pixels sont allumés à intensité maximale, le pixel apparaît blanc.

## Représentation numérique d'une couleur

En informatique, l'intensité de chaque sous-pixel (rouge, vert, et bleu) est représentée par un octet, c'est-à-dire une séquence de 8 bits. Un octet peut prendre $2^8 = 256$ valeurs différentes, allant de $0_{10}$ à $255_{10}$ en notation décimale, ou de $00000000_2$ à $11111111_2$ en notation binaire, ou encore de $00_{16}$ à $FF_{16}$ en notation hexadécimale.

Une couleur complète est donc représentée par **3 octets** (24 bits au total) : un octet pour le rouge, un pour le vert, et un pour le bleu. On colle ces trois octets les uns après les autres dans l'ordre RGB.

### Exemple 1 : Le rouge pur
Pour obtenir du rouge pur, on met l'intensité du rouge au maximum et les deux autres à zéro :
- Rouge = 255, Vert = 0, Bleu = 0
- En binaire : `11111111 00000000 00000000`
- En hexadécimal : `FF0000`

### Exemple 2 : Le jaune
Le jaune s'obtient en combinant le rouge et le vert au maximum :
- Rouge = 255, Vert = 255, Bleu = 0
- En binaire : `11111111 11111111 00000000`
- En hexadécimal : `FFFF00`

### Exemple 3 : Un gris moyen
Les niveaux de gris s'obtiennent lorsque les trois composantes ont la même valeur :
- Rouge = 128, Vert = 128, Bleu = 128
- En binaire : `10000000 10000000 10000000`
- En hexadécimal : `808080`

## Couleurs usuelles

Voici quelques couleurs de base avec leurs représentations :

| Couleur | Rouge (R) | Vert (G) | Bleu (B) | Hexadécimal | Binaire |
| :------ | :-------: | :------: | :------: | :---------: | :------ |
| Noir | 0 | 0 | 0 | `000000` | `00000000 00000000 00000000` |
| Rouge | 255 | 0 | 0 | `FF0000` | `11111111 00000000 00000000` |
| Vert | 0 | 255 | 0 | `00FF00` | `00000000 11111111 00000000` |
| Bleu | 0 | 0 | 255 | `0000FF` | `00000000 00000000 11111111` |
| Jaune | 255 | 255 | 0 | `FFFF00` | `11111111 11111111 00000000` |
| Magenta | 255 | 0 | 255 | `FF00FF` | `11111111 00000000 11111111` |
| Cyan | 0 | 255 | 255 | `00FFFF` | `00000000 11111111 11111111` |
| Blanc | 255 | 255 | 255 | `FFFFFF` | `11111111 11111111 11111111` |
| Gris foncé | 64 | 64 | 64 | `404040` | `01000000 01000000 01000000` |
| Gris clair | 192 | 192 | 192 | `C0C0C0` | `11000000 11000000 11000000` |

## Nombre de couleurs représentables

Avec 3 octets (24 bits), on peut représenter :

$$2^{24} = 16\,777\,216 \text{ couleurs différentes}$$

C'est plus de 16 millions de couleurs ! Ce nombre est largement suffisant pour que l'œil humain perçoive des images avec des transitions de couleurs très douces et naturelles.

## Exercices

### Exercice 1
De quelle couleur s'agit-il ?

```{role} select(quiz-select)
:right:
:options: |
: noir
: blanc
: rouge
: vert
: bleu
: jaune
: magenta
: cyan
: gris foncé
: gris clair
```

```{quiz}
:style: max-width: 30rem;
1.  {select}`rouge` `FF0000`
2.  {select}`vert` `00FF00`
3.  {select}`bleu` `0000FF`
4.  {select}`jaune` `FFFF00`
5.  {select}`magenta` `FF00FF`
6.  {select}`cyan` `00FFFF`
7.  {select}`blanc` `FFFFFF`
8.  {select}`noir` `000000`
9.  {select}`gris foncé` `404040`
10. {select}`gris clair` `C0C0C0`
11. {select}`rouge` `11111111 00000000 00000000`
12. {select}`vert` `00000000 11111111 00000000`
13. {select}`bleu` `00000000 00000000 11111111`
14. {select}`blanc` `11111111 11111111 11111111`
15. {select}`noir` `00000000 00000000 00000000`
16. {select}`jaune` `R=255, V=255, B=0`
17. {select}`magenta` `R=255, V=0, B=255`
18. {select}`cyan` `R=0, V=255, B=255`
19. {select}`gris clair` `R=192, V=192, B=192`
```

### Exercice 2
Donnez la représentation hexadécimale ou décimale de chaque couleur affichée.

a) <span style="display: inline-block; width: 60px; height: 60px; background-color: #FF0000; border: 2px solid #000; vertical-align: middle;"></span> → Hexadécimal : ___________

b) <span style="display: inline-block; width: 60px; height: 60px; background-color: #00FF00; border: 2px solid #000; vertical-align: middle;"></span> → Hexadécimal : ___________

c) <span style="display: inline-block; width: 60px; height: 60px; background-color: #0000FF; border: 2px solid #000; vertical-align: middle;"></span> → Hexadécimal : ___________

d) <span style="display: inline-block; width: 60px; height: 60px; background-color: #FFFF00; border: 2px solid #000; vertical-align: middle;"></span> → Décimal : R=___, V=___, B=___

e) <span style="display: inline-block; width: 60px; height: 60px; background-color: #C0C0C0; border: 2px solid #000; vertical-align: middle;"></span> → Décimal : R=___, V=___, B=___

f) <span style="display: inline-block; width: 60px; height: 60px; background-color: #FFFFFF; border: 2px solid #000; vertical-align: middle;"></span> → Hexadécimal : ___________

````{solution}
a) FF0000
b) 00FF00
c) 0000FF
d) R=255, V=255, B=0
e) R=192, V=192, B=192
f) FFFFFF
````

<script type="module">
const [core, quiz] = await tdoc.imports('tdoc/core.js', 'tdoc/quiz.js');

const colors = [
    { name: 'noir', r: 0, g: 0, b: 0, exact: true },
    { name: 'blanc', r: 255, g: 255, b: 255, exact: true },
    { name: 'rouge', r: 255, g: 0, b: 0 },
    { name: 'vert', r: 0, g: 255, b: 0 },
    { name: 'bleu', r: 0, g: 0, b: 255 },
    { name: 'jaune', r: 255, g: 255, b: 0 },
    { name: 'magenta', r: 255, g: 0, b: 255 },
    { name: 'cyan', r: 0, g: 255, b: 255 },
    { name: 'gris foncé', r: 64, g: 64, b: 64 },
    { name: 'gris clair', r: 192, g: 192, b: 192 },
];

function toHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16).toUpperCase().padStart(6, '0');
}

// Exercice 3: notation hex -> nom de couleur (avec variations)
quiz.generator('colorHexToName', () => {
    const colorIndex = core.randomInt(0, colors.length - 1);
    const baseColor = colors[colorIndex];
    
    // Générer des variations: soit 0-40 soit 210-255 pour chaque composante
    // Sauf pour blanc et noir qui doivent rester parfaits
    const vary = (base, isExact) => {
        if (isExact) {
            return base; // Pas de variation pour blanc et noir
        }
        if (base === 0) {
            return core.randomInt(0, 40);
        } else if (base === 255) {
            return core.randomInt(210, 255);
        } else if (base === 64) {
            return core.randomInt(50, 78);
        } else if (base === 192) {
            return core.randomInt(178, 206);
        }
        return base;
    };
    
    const r = vary(baseColor.r, baseColor.exact);
    const g = vary(baseColor.g, baseColor.exact);
    const b = vary(baseColor.b, baseColor.exact);
    const hex = toHex(r, g, b);
    
    return {
        colorIndex: colorIndex,
        hex: hex,
        equal(other) { return this.colorIndex === other.colorIndex; },
        history: 20,
        value(ph) { ph.textContent = hex; },
        result(args) { args.ok = args.answer === baseColor.name; }
    };
});
</script>

### Exercice 3
Identifiez la couleur correspondant au code hexadécimal donné. Répétez l'exercice plusieurs fois pour vous familiariser avec les variations de couleurs.

```{role} select(quiz-select)
:right:
:options: |
: noir
: blanc
: rouge
: vert
: bleu
: jaune
: magenta
: cyan
: gris foncé
: gris clair
```

```{quiz} table colorHexToName
| Code hexadécimal     | Couleur           |
| :------------------: | :---------------: |
| {quiz-ph}`value`     | {select}`result`  |
```

### Exercice 4
a) Quelle est la représentation hexadécimale de la couleur orange, sachant que celle-ci s'obtient avec un rouge à intensité maximale, un vert à intensité moyenne (128), et un bleu éteint ?

````{admonition} Solution
:class: note dropdown
Orange : R=255, V=128, B=0

En hexadécimal :
- Rouge = 255 = FF
- Vert = 128 = 80
- Bleu = 0 = 00

Donc orange = `FF8000`
````

b) Combien d'octets faut-il pour représenter une image de 1920 × 1080 pixels en couleur ?

````{admonition} Solution
:class: note dropdown
Chaque pixel nécessite 3 octets (un pour R, un pour G, un pour B).

Nombre de pixels = 1920 × 1080 = 2'073'600 pixels

Nombre d'octets = 2'073'600 × 3 = 6'220'800 octets

Cela correspond à environ 6,2 Mo (mégaoctets).
````

### Exercice 5
En vous aidant de la table ASCII et de vos connaissances sur la représentation des couleurs, expliquez pourquoi il est pratique d'utiliser la notation hexadécimale pour représenter les couleurs en informatique.

````{admonition} Solution
:class: note dropdown
La notation hexadécimale est pratique car :
1. Un octet (8 bits) peut être représenté exactement par 2 chiffres hexadécimaux (de 00 à FF)
2. C'est beaucoup plus compact que la notation binaire (6 caractères au lieu de 24)
3. C'est plus lisible que la notation décimale (on voit clairement la séparation entre les 3 composantes)
4. C'est facile à taper avec un clavier standard (uniquement des chiffres et des lettres A-F)

Par exemple, pour la couleur cyan :
- Hexadécimal : `00FFFF` (6 caractères)
- Binaire : `00000000 11111111 11111111` (24 caractères + espaces)
- Décimal : R=0, V=255, B=255 (plus verbeux)
````
