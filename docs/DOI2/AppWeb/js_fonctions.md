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

La syntaxe pour définir une fonction est très proche de Python. La seule
différence est que l'on utilise le mot-clef `function` au lieu de `def`.

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

## Fonctions avec paramètres

Une fonction devient beaucoup plus utile quand elle peut **recevoir des
paramètres** (aussi appelés **arguments**). Les paramètres sont des variables
que la fonction utilise dans son code.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
def saluer(nom):
    print("Bonjour", nom)

saluer("Alice")
saluer("Bob")
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
function saluer(nom) {
    console.log("Bonjour " + nom);
}

saluer("Alice");
saluer("Bob");
```

</td></tr></table>

On peut aussi avoir **plusieurs paramètres** :

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
def ajouter(a, b):
    print(a + b)

ajouter(5, 3)
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
function ajouter(a, b) {
    console.log(a + b);
}

ajouter(5, 3);
```

</td></tr></table>

## Fonctions qui renvoient une valeur

Une fonction peut aussi **renvoyer une valeur** en utilisant le mot-clef
`return`. On peut alors récupérer cette valeur dans une variable.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
def doubler(nombre):
    return nombre * 2

resultat = doubler(5)
print(resultat)
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
function doubler(nombre) {
    return nombre * 2;
}

let resultat = doubler(5);
console.log(resultat);
```

</td></tr></table>


## Exercices

### Exercice {num1}`exercice-js`

Le code ci-dessous définit 2 fonctions avec paramètres. Complétez le programme
**en appelant uniquement ces fonctions** pour obtenir les résultats demandés.

```{exec} html
:editor: 019f01a0-0302-7302-8302-000000000302
:style: max-height: 18rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
function calculerAire(rayon) {
    return 3.14159 * rayon * rayon;
}

function convertirCelsiusEnFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}

// Aire d'un cercle de rayon 5
let aire = ;
console.log("Aire du cercle :" + aire.toFixed(2));

// Conversion de 30°C en Fahrenheit
let tempF = ;
console.log("30°C = "+ tempF + "°F");
</script></body></html>
```

````{solution}
```{code-block} javascript
function calculerAire(rayon) {
    return 3.14159 * rayon * rayon;
}

function convertirCelsiusEnFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}

let aire = calculerAire(5);
console.log("Aire du cercle :" + aire.toFixed(2));

let tempF = convertirCelsiusEnFahrenheit(30);
console.log("30°C = " + tempF + "°F");
```
````

### Exercice {num1}`exercice-js`

Écrivez les 3 fonctions manquantes :

1. Une fonction `mettreEnMajuscules()` qui convertit un texte en majuscules.
2. Une fonction `ajouterPrefixe()` qui ajoute un préfixe à un texte.
3. Une fonction `genererSalutation()` qui crée un message de bienvenue personnalisé.

```{exec} html
:editor: 019f01a0-0303-7303-8303-000000000303
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Définissez vos trois fonctions ici


console.log(mettreEnMajuscules("hello"));

console.log(ajouterPrefixe("Bonjour", ">>> "));

console.log(genererSalutation("Alice"));
</script></body></html>
```

````{solution}
```{code-block} javascript
function mettreEnMajuscules(texte) {
    return texte.toUpperCase();
}

function ajouterPrefixe(texte, prefixe) {
    return prefixe + texte;
}

function genererSalutation(nom) {
    return "Bienvenue " + nom + " !";
}

console.log(mettreEnMajuscules("hello"));

console.log(ajouterPrefixe("Bonjour", ">>> "));

console.log(genererSalutation("Alice"));
```
````

### Exercice {num1}`exercice-js`

Créez deux fonctions pour un petit jeu de combat ET appelez-les avec différentes
valeurs.

1. Une fonction `calculerDegats()` qui prend la force d'une arme et un bonus,
et retourne les dégâts totaux.
2. Une fonction `soigner()` qui prend la vie actuelle et une quantité de soin,
et retourne la nouvelle vie (maximum 100).

```{code-block} text
Dégâts avec force 15 et bonus 5 : 20
Dégâts avec force 20 et bonus 3 : 23
Vie après soin : 85 (80 + 5, max 100)
Vie après soin : 105 devient 100 (80 + 25)
```

```{exec} html
:editor: 019f01a0-0304-7304-8304-000000000304
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Créez vos deux fonctions ici


console.log("Dégâts :" + calculerDegats(15, 5));
console.log("Dégâts :"+ calculerDegats(20, 3));

console.log("Vie après soin :"+ soigner(80, 5));
console.log("Vie après soin :"+ soigner(80, 25));
</script></body></html>
```

````{solution}
```{code-block} javascript
function calculerDegats(force, bonus) {
    return force + bonus;
}

function soigner(vie, soin) {
    let nouvellVie = vie + soin;
    if (nouvellVie > 100) {
        return 100;
    }
    return nouvellVie;
}

console.log("Dégâts :"+ calculerDegats(15, 5));
console.log("Dégâts :"+ calculerDegats(20, 3));

console.log("Vie après soin :"+ soigner(80, 5));
console.log("Vie après soin :"+ soigner(80, 25));
```
````
