<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Révisions JavaScript

Cette page rassemble des exercices de révision couvrant tous les objectifs de
l'examen : variables, branchements conditionnels, fonctions, manipulation du
HTML (DOM) et événements. Faites-les sans regarder la théorie, puis vérifiez
avec les solutions.

## Variables

### Exercice {num1}`exercice-revision`

Qu'affiche chacun de ces programmes dans la console ?

```{role} input(quiz-input)
:right: width: 12rem; clear: right;
:check: split lowercase
```

**1.**
```{code-block} javascript
let a = 5;
let b = a + 3;
console.log(b);
```
```{quiz}
{input}`8`
Affichage :

```

**2.**
```{code-block} javascript
let prix = 10;
prix = prix * 2;
console.log(prix);
```
```{quiz}
{input}`20`
Affichage :

```

**3.**
```{code-block} javascript
let nom = "Max";
console.log("Salut " + nom);
```
```{quiz}
{input}`Salut Max`
Affichage :

```

**4.**
```{code-block} javascript
let score = 0;
score = score + 10;
score = score + 2;
console.log(score);
```
```{quiz}
{input}`12`
Affichage :

```

### Exercice {num1}`exercice-revision`

Chacun de ces programmes comporte une erreur typique d'un habitué de Python.
Corrigez-les puis cliquez sur « Play ».

1.  ```{exec} html
    :editor: 019f01a0-0b01-7b01-8b01-000000000b01
    :style: max-height: 12rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    nom = "Iliya";
    console.log("Bonjour " + nom);
    </script></body></html>
    ```

2.  ```{exec} html
    :editor: 019f01a0-0b02-7b02-8b02-000000000b02
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let total = 50;
    let total = total + 10;
    print("Total : " + total);
    </script></body></html>
    ```

````{solution}
1.  ```{code-block} javascript
    let nom = "Iliya";
    console.log("Bonjour " + nom);
    ```
    Toute variable doit être **déclarée** avec `let` lors de sa création.

2.  ```{code-block} javascript
    let total = 50;
    total = total + 10;
    console.log("Total : " + total);
    ```
    `let` ne sert qu'à **créer** la variable : on ne le répète pas pour la
    modifier. De plus, la fonction d'affichage s'appelle `console.log()`, pas
    `print()`.
````

## Branchements conditionnels

### Exercice {num1}`exercice-revision`

Qu'affiche chacun de ces programmes ?

```{role} input(quiz-input)
:right: width: 12rem; clear: right;
:check: split lowercase
```

**1.**
```{code-block} javascript
let t = 10;
if (t < 0) {
    console.log("gèle");
} else if (t < 15) {
    console.log("frais");
} else {
    console.log("chaud");
}
```
```{quiz}
{input}`frais`
Affichage :

```

**2.**
```{code-block} javascript
let age = 18;
if (age >= 18) {
    console.log("majeur");
} else {
    console.log("mineur");
}
```
```{quiz}
{input}`majeur`
Affichage :

```

**3.**
```{code-block} javascript
let age = 15;
let argent = 100;
if (age >= 16 && argent >= 50) {
    console.log("accepté");
} else {
    console.log("refusé");
}
```
```{quiz}
{input}`refusé`
Affichage :

```

### Exercice {num1}`exercice-revision`

Chacun de ces programmes comporte au moins une erreur due à une habitude
Python. Corrigez-les.

1.  ```{exec} html
    :editor: 019f01a0-0b03-7b03-8b03-000000000b03
    :style: max-height: 16rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let age = Number(prompt("Quel âge as-tu ?"));
    if age >= 18 {
        console.log("Tu es majeur");
    }
    </script></body></html>
    ```

2.  ```{exec} html
    :editor: 019f01a0-0b04-7b04-8b04-000000000b04
    :style: max-height: 18rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let note = Number(prompt("Quelle est ta note ?"));
    if (note >= 5) {
        console.log("Très bien");
    } elif (note >= 4) {
        console.log("Suffisant");
    } else {
        console.log("Insuffisant");
    }
    </script></body></html>
    ```

3.  ```{exec} html
    :editor: 019f01a0-0b05-7b05-8b05-000000000b05
    :style: max-height: 16rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let heure = Number(prompt("Quelle heure est-il ?"));
    if (heure >= 9 and heure <= 17) {
        console.log("Le magasin est ouvert");
    } else {
        console.log("Le magasin est fermé");
    }
    </script></body></html>
    ```

4.  ```{exec} html
    :editor: 019f01a0-0b06-7b06-8b06-000000000b06
    :style: max-height: 16rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let ville = prompt("D'où viens-tu ?");
    if (ville == "Rue" or "Romont") {
        console.log("Tu viens de la Glâne");
    }
    </script></body></html>
    ```

````{solution}
1.  ```{code-block} javascript
    if (age >= 18) {
        console.log("Tu es majeur");
    }
    ```
    La condition doit être entourée de **parenthèses**.

2.  ```{code-block} javascript
    } else if (note >= 4) {
    ```
    En JavaScript, on écrit `else if` (deux mots), pas `elif`.

3.  ```{code-block} javascript
    if (heure >= 9 && heure <= 17) {
    ```
    L'opérateur logique ET s'écrit `&&`, pas `and`.

4.  ```{code-block} javascript
    if (ville === "Rue" || ville === "Romont") {
    ```
    Deux corrections : l'opérateur OU s'écrit `||` (pas `or`), et chaque
    condition doit être **complète** (`ville === "Romont"` et non `"Romont"`
    tout seul). On utilise aussi `===` pour tester l'égalité.
````

## Fonctions

### Exercice {num1}`exercice-revision`

Complétez la fonction `aire` pour qu'elle **renvoie** l'aire d'un rectangle.
Le programme doit afficher `15`.

```{exec} html
:editor: 019f01a0-0b07-7b07-8b07-000000000b07
:style: max-height: 18rem;
:output-style: height: 4rem;
<!DOCTYPE html>
<html><body><script>
function aire(longueur, largeur) {
    // Complétez ici

}

let resultat = aire(5, 3);
console.log(resultat);
</script></body></html>
```

````{solution}
```{code-block} javascript
function aire(longueur, largeur) {
    return longueur * largeur;
}

let resultat = aire(5, 3);
console.log(resultat);
```
On utilise `return` pour renvoyer une valeur, que l'on récupère ensuite dans la
variable `resultat`.
````

### Exercice {num1}`exercice-revision`

Définissez une fonction `saluer` qui prend un prénom en paramètre et affiche un
message de bienvenue. Avec les appels déjà présents, le programme doit afficher :

```{code-block} text
Bienvenue Alice !
Bienvenue Bob !
```

```{exec} html
:editor: 019f01a0-0b08-7b08-8b08-000000000b08
:style: max-height: 18rem;
:output-style: height: 4rem;
<!DOCTYPE html>
<html><body><script>
// Définissez la fonction ici


saluer("Alice");
saluer("Bob");
</script></body></html>
```

````{solution}
```{code-block} javascript
function saluer(prénom) {
    console.log("Bienvenue " + prénom + " !");
}

saluer("Alice");
saluer("Bob");
```
````

## Manipulation du HTML (DOM)

### Exercice {num1}`exercice-revision`

Complétez le script pour que le titre affiche `"Révisions"` à la place de
`"Ancien titre"`, et qu'il devienne **rouge**.

```{exec} html
:editor: 019f01a0-0b09-7b09-8b09-000000000b09
:style: max-height: 18rem;
<!DOCTYPE html>
<html><body>
  <h1 id="titre">Ancien titre</h1>

  <script>
    let titre = document.getElementById("titre");
    // Complétez ici

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let titre = document.getElementById("titre");
titre.textContent = "Révisions";
titre.style.color = "red";
```
````

### Exercice {num1}`exercice-revision`

Le programme ci-dessous contient **3 erreurs**. Corrigez-les pour que le
paragraphe affiche `"Bonjour"` en **bleu**.

```{exec} html
:editor: 019f01a0-0b0a-7b0a-8b0a-000000000b0a
:style: max-height: 18rem;
<!DOCTYPE html>
<html><body>
  <p id="message">...</p>

  <script>
    let message = document.GetElementById(message);
    message.textContent = Bonjour;
    message.style.Color = "blue";
  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let message = document.getElementById("message");
message.textContent = "Bonjour";
message.style.color = "blue";
```
Les trois erreurs :
1. `GetElementById` → `getElementById` (JavaScript est sensible à la casse).
2. L'`id` et le texte doivent être des **chaînes de caractères** : `"message"`
   et `"Bonjour"`.
3. La propriété s'écrit `style.color` (minuscule), pas `style.Color`.
````

## Événements

### Exercice {num1}`exercice-revision`

Complétez le programme pour qu'un clic sur le bouton augmente le compteur de 1.

```{exec} html
:editor: 019f01a0-0b0b-7b0b-8b0b-000000000b0b
:style: max-height: 22rem;
<!DOCTYPE html>
<html><body>
  <p>Clics : <span id="compteur">0</span></p>
  <button id="bouton">Cliquez-moi</button>

  <script>
    let compteur = document.getElementById("compteur");
    let bouton = document.getElementById("bouton");
    let n = 0;

    // Complétez ici : définissez une fonction et liez-la au clic

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let compteur = document.getElementById("compteur");
let bouton = document.getElementById("bouton");
let n = 0;

function cliquer() {
    n = n + 1;
    compteur.textContent = n;
}

bouton.addEventListener("click", cliquer);
```
On passe le nom de la fonction `cliquer` **sans parenthèses** à
`addEventListener`.
````

### Exercice {num1}`exercice-revision`

**Synthèse.** Créez une page avec un titre, un bouton et un paragraphe vide.
Au clic sur le bouton, le programme doit demander le prénom de l'utilisateur
avec `prompt(...)`, puis afficher `"Bonjour <prénom>"` dans le paragraphe. Si
l'utilisateur n'entre rien, afficher `"Vous n'avez pas donné de prénom"` à la
place.

```{exec} html
:editor: 019f01a0-0b0c-7b0c-8b0c-000000000b0c
:style: max-height: 26rem;
<!DOCTYPE html>
<html><body>
  <h1>Accueil</h1>
  <button id="bouton">Dire bonjour</button>
  <p id="message"></p>

  <script>
    // Écrivez votre code ici

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

function direBonjour() {
    let prénom = prompt("Quel est ton prénom ?");
    if (prénom === "" || prénom === null) {
        message.textContent = "Vous n'avez pas donné de prénom";
    } else {
        message.textContent = "Bonjour " + prénom;
    }
}

bouton.addEventListener("click", direBonjour);
```
Cet exercice combine tous les objectifs : variables, condition avec `||`,
fonction, récupération d'une balise avec `getElementById`, modification du
`textContent` et réaction au clic avec `addEventListener`.
````
