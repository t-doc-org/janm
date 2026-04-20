<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Variables en JavaScript

## Déclarer une variable

Tout comme en Python, une variable en JavaScript permet de **stocker une
valeur** dans la mémoire du programme et de lui donner **un nom**. La
différence principale est qu'en JavaScript, on doit indiquer au programme que
l'on crée une nouvelle variable à l'aide du mot-clef `let`.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
nom = "Jan"
age = 26
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
let nom = "Jan";
let age = 26;
```

</td></tr></table>

Une fois qu'une variable a été déclarée avec `let`, on peut modifier sa valeur
en écrivant simplement son nom, un `=` et sa nouvelle valeur (sans répéter
`let`).

```{code-block} javascript
let score = 10;
score = 15;       // la variable score vaut maintenant 15
score = score + 5; // score vaut maintenant 20
```

```{important}
- Le mot-clef `let` ne doit être utilisé qu'une seule fois par variable, lors
  de sa **création**.
- Les noms de variables ne contiennent **jamais d'espaces** ni de caractères
  accentués. Pour les noms en plusieurs mots, la convention en JavaScript est
  d'utiliser le *camelCase* (ex: `nombreDeClics`, `prixTotal`), là où Python
  utilise le *snake_case* (ex: `nombre_de_clics`, `prix_total`).
```

## Afficher une variable

En Python, la fonction `print()` permet d'afficher une valeur. En JavaScript,
cette fonction s'appelle `console.log()`. Son affichage apparaît dans la
**console** du navigateur (ainsi que dans la zone de sortie ci-dessous).

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
pays = "Suisse"
print("J'habite en", pays)
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
let pays = "Suisse";
console.log("J'habite en", pays);
```

</td></tr></table>

Vous pouvez tester le code ci-dessous. Cliquez sur "Play" pour l'exécuter et
observer le résultat dans la zone de sortie.

```{exec} html
:editor: 019f01a0-0001-7a01-8001-000000000001
:style: max-height: 15rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let prénom = "Iliya";
let pays = "Bulgarie";
let ville = "Fribourg";
console.log(prénom);
console.log("Je viens de " + pays + " et j'habite à " + ville);
</script></body></html>
```


## Exercices


### Exercice {num1}`exercice-js`

Chacun des programmes JavaScript suivants comporte une erreur typique commise
par quelqu'un qui connaît Python. Certaines erreurs empêchent le programme de
s'exécuter ; d'autres le laissent s'exécuter mais donnent un résultat faux.

Corrigez chacun de ces codes dans l'éditeur puis cliquez sur "Play".

1.  ```{exec} html
        :editor: 019f01a0-0004-7a04-8004-000000000004
    :style: max-height: 12rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let ville = "Fribourg";
    print("Je viens de", ville);
    </script></body></html>
    ```

2.  ```{exec} html
        :editor: 019f01a0-0006-7a06-8006-000000000006
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    note = 4.5;
    bonus = 0.5;
    noteFinale = note + bonus;
    console.log("Note finale :", noteFinale);
    </script></body></html>
    ```

3.  ```{exec} html
        :editor: 019f01a0-0007-7a07-8007-000000000007
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let score = 0;
    let score = score + 10;
    let score = score + 5;
    console.log("Score :", score);
    </script></body></html>
    ```

4.  ```{exec} html
        :editor: 019f01a0-0008-7a08-8008-000000000008
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let longueur = 7;
    let largeur = 12;
    let périmètre = 2 * (Longueur + Largeur);
    console.log(périmètre);
    </script></body></html>
    ```

5.  ```{exec} html
        :editor: 019f01a0-0009-7a09-8009-000000000009
    :style: max-height: 12rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let côté = 5;
    let aire = côté ** 2;
    console.log("aire");
    </script></body></html>
    ```

````{solution}
1.  ```{code-block} javascript
    let ville = "Fribourg";
    console.log("Je viens de", ville);
    ```
    En JavaScript, la fonction d'affichage s'appelle `console.log()` et non
    `print()` comme en Python.

2.  ```{code-block} javascript
    "use strict";
    let note = 4.5;
    let bonus = 0.5;
    let noteFinale = note + bonus;
    console.log("Note finale :", noteFinale);
    ```
    Chaque variable doit être déclarée avec `let`. Sans `let`, JavaScript
    crée une variable globale, ce qui est interdit en mode strict (`"use strict"`)
    et constitue une mauvaise pratique dans tous les cas.

3.  ```{code-block} javascript
    let score = 0;
    score = score + 10;
    score = score + 5;
    console.log("Score :", score);
    ```
    Le mot-clef `let` ne sert qu'à **créer** une variable. Pour modifier sa
    valeur ensuite, on écrit simplement `score = ...` sans répéter `let`.

4.  ```{code-block} javascript
    let longueur = 7;
    let largeur = 12;
    let périmètre = 2 * (longueur + largeur);
    console.log(périmètre);
    ```
    JavaScript fait la différence entre majuscules et minuscules :
    `Longueur` et `longueur` ne sont pas la même variable.

5.  ```{code-block} javascript
    let côté = 5;
    let aire = côté ** 2;
    console.log(aire);
    ```
    Les guillemets autour de `"aire"` affichaient le texte littéral `aire`
    au lieu de la valeur de la variable.
````

### Exercice {num1}`exercice-js`

Une installation solaire sur un toit est composée de **12 panneaux**, chacun
d'une puissance de **400 watts**. Le toit reçoit en moyenne **5 heures de
soleil par jour**. L'électricité produite est revendue au réseau à
**0.20 CHF par kWh**.

Écrivez un programme JavaScript qui calcule et affiche :

- La production journalière en kWh
  (puissance totale en watts × heures de soleil ÷ 1000)
- La production annuelle en kWh (sur 365 jours)
- Le revenu annuel en CHF

Si tout est correct, votre programme doit afficher :
```{code-block} text
Production journalière : 24 kWh
Production annuelle : 8760 kWh
Revenu annuel : 1752 CHF
```

```{exec} html
:editor: 019f01a0-000e-7a0e-800e-00000000000e
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Écrivez votre code ici

</script></body></html>
```

````{solution}
```{code-block} javascript
let nombrePanneaux = 12;
let puissanceParPanneau = 400;
let heuresSoleil = 5;
let prixKWh = 0.20;

let productionJournalière = nombrePanneaux * puissanceParPanneau * heuresSoleil / 1000;
let productionAnnuelle = productionJournalière * 365;
let revenuAnnuel = productionAnnuelle * prixKWh;

console.log("Production journalière :", productionJournalière, "kWh");
console.log("Production annuelle :", productionAnnuelle, "kWh");
console.log("Revenu annuel :", revenuAnnuel, "CHF");
```
````

