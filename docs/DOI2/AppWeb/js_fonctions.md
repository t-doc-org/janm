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
