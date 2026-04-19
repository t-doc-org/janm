<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Fonctions en JavaScript

## Qu'est-ce qu'une fonction ?

Comme en Python, une **fonction** est un bloc d'instructions **nommé** que
l'on peut réutiliser à différents endroits du programme. L'intérêt est
double :

- Éviter de recopier plusieurs fois le même code.
- Donner un **nom significatif** au code, ce qui rend le programme plus lisible.

En JavaScript, les fonctions joueront un rôle particulièrement important
quand nous interagirons avec du HTML : elles seront **appelées
automatiquement** quand l'utilisateur clique sur un bouton, tape au clavier,
etc. Il est donc essentiel de bien les maîtriser.

## Définir une fonction

La syntaxe pour définir une fonction est très proche de Python. Les
différences principales sont :

- On utilise le mot-clef `function` au lieu de `def`.
- Le corps de la fonction est entouré d'**accolades** `{ }` au lieu d'être
  indenté.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
def affiche_salutations():
    print("Bonjour")
    print("Comment allez-vous ?")
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
function afficheSalutations() {
    console.log("Bonjour");
    console.log("Comment allez-vous ?");
}
```

</td></tr></table>

```{important}
Définir une fonction **n'exécute pas** son code. Il faut ensuite l'**appeler**.
```

## Appeler une fonction

Pour appeler une fonction, on écrit simplement son nom suivi d'une paire de
parenthèses `()`. La syntaxe est identique à Python.

```{exec} html
:editor: 019f01a0-0300-7300-8300-000000000300
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
function afficheSalutations() {
    console.log("Bonjour");
    console.log("Comment allez-vous ?");
}

console.log("Début du programme");
afficheSalutations();
console.log("Pouvez-vous répéter svp, je n'ai pas compris");
afficheSalutations();
</script></body></html>
```

## Fonction avec paramètres

Une fonction peut être **paramétrée** : son comportement dépend alors de
valeurs passées entre les parenthèses lors de son appel. Les paramètres sont
déclarés entre les parenthèses de la définition, séparés par des virgules.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
def affiche_aire_triangle(base, hauteur):
    aire = base * hauteur / 2
    print("Aire :", aire)

affiche_aire_triangle(10, 20)
affiche_aire_triangle(35, 54)
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
function afficheAireTriangle(base, hauteur) {
    let aire = base * hauteur / 2;
    console.log("Aire :", aire);
}

afficheAireTriangle(10, 20);
afficheAireTriangle(35, 54);
```

</td></tr></table>

```{exec} html
:editor: 019f01a0-0301-7301-8301-000000000301
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
function afficheAireTriangle(base, hauteur) {
    let aire = base * hauteur / 2;
    console.log("L'aire d'un triangle de", base, "de base et", hauteur, "de hauteur est de", aire);
}

afficheAireTriangle(10, 20);
afficheAireTriangle(20, 10);
afficheAireTriangle(35, 54);
</script></body></html>
```

```{important}
L'ordre des paramètres à l'appel doit correspondre à celui de la définition.
Dans l'exemple ci-dessus, `afficheAireTriangle(10, 20)` signifie
`base = 10` et `hauteur = 20`.
```

## Exercices

### Exercice {num1}`exercice`

Le code ci-dessous définit 3 fonctions. Il contient aussi un petit programme
qui demande à l'utilisateur son humeur de 1 à 10 (10 = très bonne humeur).
Complétez le programme **en appelant uniquement les fonctions** adéquates.

```{exec} html
:editor: 019f01a0-0302-7302-8302-000000000302
:style: max-height: 24rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
function afficheContent() {
    console.log("😊");
}

function afficheNeutre() {
    console.log("😐");
}

function afficheTriste() {
    console.log("😢");
}

let humeur = Number(prompt("De 1 à 10, comment vas-tu ?"));

if (humeur < 3) {

} else if (humeur < 6) {

} else {

}
</script></body></html>
```

````{solution}
```{code-block} javascript
function afficheContent() {
    console.log("😊");
}
function afficheNeutre() {
    console.log("😐");
}
function afficheTriste() {
    console.log("😢");
}

let humeur = Number(prompt("De 1 à 10, comment vas-tu ?"));

if (humeur < 3) {
    afficheTriste();
} else if (humeur < 6) {
    afficheNeutre();
} else {
    afficheContent();
}
```
````

### Exercice {num1}`exercice`

Le programme ci-dessous appelle deux fonctions qui n'existent pas encore.
Définissez-les et complétez leur corps pour que le programme affiche :

```{code-block} text
Bombe amorcée !
TIC TAC
TIC TAC
TIC TAC
...
TIC TAC
BOOM
```

```{exec} html
:editor: 019f01a0-0303-7303-8303-000000000303
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Définissez vos fonctions ici


let compteur = 10;
console.log("Bombe amorcée !");
while (compteur > 0) {
    compteur--;
    ticTac();
}
explosion();
</script></body></html>
```

````{solution}
```{code-block} javascript
function ticTac() {
    console.log("TIC TAC");
}
function explosion() {
    console.log("BOOM");
}

let compteur = 10;
console.log("Bombe amorcée !");
while (compteur > 0) {
    compteur--;
    ticTac();
}
explosion();
```
````

### Exercice {num1}`exercice`

Définissez une fonction nommée `afficheAireCercle`, paramétrée par le rayon
$r$ du cercle. L'aire se calcule avec la formule $\pi \cdot r^2$. Utilisez
`3.14` pour $\pi$. Appelez ensuite la fonction pour afficher l'aire de
cercles de rayon 3, 10 et 80.

```{exec} html
:editor: 019f01a0-0304-7304-8304-000000000304
:style: max-height: 18rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Écrivez votre code ici

</script></body></html>
```

````{solution}
```{code-block} javascript
function afficheAireCercle(rayon) {
    let aire = 3.14 * rayon ** 2;
    console.log("L'aire est de", aire);
}

afficheAireCercle(3);
afficheAireCercle(10);
afficheAireCercle(80);
```
````

### Exercice {num1}`exercice`

Définissez une fonction nommée `affichePrévisionMétéo` paramétrée par une
température (en °C) et une pression (en hPa). Selon ces valeurs, elle affiche
différents textes :

- Si la température est supérieure à 25 **et** la pression supérieure à
  1015 : `Grand ciel bleu`.
- Si la température est inférieure ou égale à 0 : `Froid glacial`.
- Si la pression est inférieure à 1000 **ou** la température supérieure à
  30 : `Temps orageux`.
- Sinon : `Météo changeante`.

Appelez ensuite cette fonction pour afficher la prévision pour 27 °C /
1011 hPa, puis pour 15 °C / 990 hPa.

```{exec} html
:editor: 019f01a0-0305-7305-8305-000000000305
:style: max-height: 18rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Écrivez votre code ici

</script></body></html>
```

````{solution}
```{code-block} javascript
function affichePrévisionMétéo(temperature, pression) {
    if (temperature > 25 && pression > 1015) {
        console.log("Grand ciel bleu");
    } else if (temperature <= 0) {
        console.log("Froid glacial");
    } else if (pression < 1000 || temperature > 30) {
        console.log("Temps orageux");
    } else {
        console.log("Météo changeante");
    }
}

affichePrévisionMétéo(27, 1011);
affichePrévisionMétéo(15, 990);
```
````

### Exercice {num1}`exercice`

La fonction `afficheLivret` définie ci-dessous affiche le livret de
multiplication du nombre donné en paramètre. **Sans toucher au corps de
cette fonction**, et en ne l'appelant qu'une seule fois, complétez le
programme pour afficher tous les livrets de multiplication de 2 à 10.

```{exec} html
:editor: 019f01a0-0306-7306-8306-000000000306
:style: max-height: 24rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
function afficheLivret(n) {
    console.log("Affichage du livret de", n);
    for (let i = 2; i <= 10; i++) {
        console.log(i, "x", n, "=", i * n);
    }
}

// Complétez le programme ici

</script></body></html>
```

````{solution}
```{code-block} javascript
function afficheLivret(n) {
    console.log("Affichage du livret de", n);
    for (let i = 2; i <= 10; i++) {
        console.log(i, "x", n, "=", i * n);
    }
}

for (let multiple = 2; multiple <= 10; multiple++) {
    afficheLivret(multiple);
}
```

On peut aussi utiliser un `while`, mais le `for` est plus adapté ici car on
connaît le nombre exact de répétitions.
````
