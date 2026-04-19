<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Branchements conditionnels en JavaScript

## Qu'est-ce qu'un branchement conditionnel ?

Comme en Python, un **branchement conditionnel** permet d'exécuter certaines
instructions seulement si une **condition** est remplie. La logique est
exactement la même qu'en Python : seule la syntaxe change.

## Conditions

Une condition est composée de deux valeurs comparées à l'aide d'un opérateur.
Le résultat est un `boolean` (`true` ou `false`).

| Opérateur | Nom                  | Exemple   | Résultat |
| :-------: | :------------------: | :-------: | :------: |
| `===`     | égal à               | `3 === 7` | `false`  |
| `!==`     | différent de         | `3 !== 7` | `true`   |
| `>`       | plus grand que       | `3 > 7`   | `false`  |
| `<`       | plus petit que       | `3 < 7`   | `true`   |
| `>=`      | plus grand ou égal à | `3 >= 7`  | `false`  |
| `<=`      | plus petit ou égal à | `3 <= 7`  | `true`   |

```{important}
En JavaScript, on utilise **trois signes égal** (`===`) pour tester l'égalité,
et `!==` pour tester l'inégalité. C'est une différence importante avec Python
qui utilise `==` et `!=`.
```

## Si …

La forme la plus simple d'un branchement conditionnel est le `if`. En
JavaScript, la condition est entourée de **parenthèses** et le bloc
d'instructions à exécuter est entouré d'**accolades** `{ ... }`.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
note = float(input("Quelle est ta note ?"))
if note >= 4:
    print("Bravo !")
    print("Continue comme ça")
print("Fin du programme")
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
let note = Number(prompt("Quelle est ta note ?"));
if (note >= 4) {
    console.log("Bravo !");
    console.log("Continue comme ça");
}
console.log("Fin du programme");
```

</td></tr></table>

```{important}
- En JavaScript, la **saisie utilisateur** se fait avec la fonction
  `prompt("...")` (équivalent de `input("...")` en Python).
- `prompt()` renvoie toujours un **texte**. Pour obtenir un nombre, il faut
  convertir la valeur avec `Number(...)` (équivalent de `int(...)` ou
  `float(...)` en Python).
- Contrairement à Python, **l'indentation n'est pas obligatoire** en
  JavaScript : ce sont les accolades `{ }` qui délimitent le bloc. L'indenter
  reste cependant une bonne pratique pour la lisibilité.
```

Vous pouvez tester le code ci-dessous :

```{exec} html
:editor: 019f01a0-0100-7100-8100-000000000100
:style: max-height: 16rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let note = Number(prompt("Quelle est ta note ?"));
if (note >= 4) {
    console.log("Bravo !");
    console.log("Continue comme ça");
}
console.log("Fin du programme");
</script></body></html>
```

## Si … Sinon

Le mot-clef `else` permet d'exécuter un autre bloc d'instructions quand la
condition du `if` est fausse. Comme en Python, `else` ne prend **jamais** de
condition.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
age = int(input("Quel âge as-tu ?"))
if age >= 18:
    print("Tu es majeur")
else:
    print("Tu es mineur")
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
let age = Number(prompt("Quel âge as-tu ?"));
if (age >= 18) {
    console.log("Tu es majeur");
} else {
    console.log("Tu es mineur");
}
```

</td></tr></table>

## Si … Sinon si … Sinon

Pour enchaîner plusieurs conditions, on utilise `else if`. Attention : ce sont
**deux mots séparés** en JavaScript, contrairement au `elif` de Python. On
peut en mettre autant que l'on veut.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
t = float(input("Température ?"))
if t < 0:
    print("Il gèle")
elif t < 15:
    print("Il fait frais")
elif t < 25:
    print("Il fait bon")
else:
    print("Il fait chaud")
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
let t = Number(prompt("Température ?"));
if (t < 0) {
    console.log("Il gèle");
} else if (t < 15) {
    console.log("Il fait frais");
} else if (t < 25) {
    console.log("Il fait bon");
} else {
    console.log("Il fait chaud");
}
```

</td></tr></table>

```{exec} html
:editor: 019f01a0-0101-7101-8101-000000000101
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let t = Number(prompt("Quelle est la température en °C ?"));
if (t < 0) {
    console.log("Il gèle");
} else if (t < 15) {
    console.log("Il fait frais");
} else if (t < 25) {
    console.log("Il fait bon");
} else {
    console.log("Il fait chaud");
}
</script></body></html>
```

## Opérateurs logiques (et/ou)

Pour combiner plusieurs conditions, on utilise les opérateurs logiques. En
JavaScript, ils s'écrivent avec des symboles (et non des mots comme en
Python).

| Python | JavaScript | Nom | Description                                   |
| :----: | :--------: | :-: | :-------------------------------------------- |
| `and`  | `&&`       | ET  | `true` si **les deux** conditions sont vraies |
| `or`   | `\|\|`     | OU  | `true` si **au moins une** condition est vraie |

Voici un programme qui vérifie l'âge et l'argent pour acheter une bouteille
de vin :

```{exec} html
:editor: 019f01a0-0102-7102-8102-000000000102
:style: max-height: 24rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let age = Number(prompt("Quel âge as-tu ?"));
let argent = Number(prompt("Combien d'argent as-tu (en CHF) ?"));

let prixVin = 39.90;

if (age >= 16 && argent >= prixVin) {
    console.log("Tu peux acheter du vin.");
} else if (age < 16) {
    console.log("Tu es trop jeune pour acheter du vin.");
} else if (argent < prixVin) {
    console.log("Tu n'as pas assez d'argent pour acheter du vin.");
}
</script></body></html>
```

```{important}
Attention : chaque condition doit être **complète**. Par exemple, pour tester
si une ville est Romont ou Rue, il faut écrire :
`ville === "Romont" || ville === "Rue"` et **non** `ville === "Romont" || "Rue"`.
```

## Exercices


### Exercice {num1}`exercice-revision`

Chacun des programmes suivants comporte au moins une erreur. Certaines
bloquent l'exécution ; d'autres donnent un résultat faux.

Corrigez chaque code puis cliquez sur "Play".

1.  ```{exec} html
    :editor: 019f01a0-0103-7103-8103-000000000103
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let collège = prompt("Dans quel collège es-tu ?");
    if (collège = "STX") {
        console.log("Tu es dans le meilleur collège !");
    }
    console.log("A bientôt");
    </script></body></html>
    ```

2.  ```{exec} html
    :editor: 019f01a0-0104-7104-8104-000000000104
    :style: max-height: 16rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let âge = Number(prompt("Quel âge as-tu ?"));
    if (âge < 18) {
        console.log("Tu es majeur");
    } else {
        console.log("Tu es mineur");
    }
    </script></body></html>
    ```

3.  ```{exec} html
    :editor: 019f01a0-0105-7105-8105-000000000105
    :style: max-height: 16rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let moyenne = Number(prompt("Quelle moyenne principale as-tu ?"));
    if moyenne < 4 {
        console.log("Tu n'es pas promu");
    } else {
        console.log("Tu es promu");
    }
    </script></body></html>
    ```

4.  ```{exec} html
    :editor: 019f01a0-0106-7106-8106-000000000106
    :style: max-height: 18rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let nombre = Number(prompt("Entre un nombre"));

    if (nombre > 0) {
        console.log(nombre, "est positif");
    }
    if (nombre < 0) {
        console.log(nombre, "est négatif");
    } else {
        console.log("Zéro n'est ni positif ni négatif");
    }
    </script></body></html>
    ```

5.  ```{exec} html
    :editor: 019f01a0-0107-7107-8107-000000000107
    :style: max-height: 16rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let métier = prompt("Quel est ton métier ?");

    if (métier === "étudiant" || "étudiante") {
        console.log("Tu as droit à une réduction");
    } else {
        console.log("Tu dois payer plein prix");
    }
    </script></body></html>
    ```

````{solution}
1.  ```{code-block} javascript
    let collège = prompt("Dans quel collège es-tu ?");
    if (collège === "STX") {
        console.log("Tu es dans le meilleur collège !");
    }
    console.log("A bientôt");
    ```
    `=` est une affectation, il fallait utiliser `===` pour une comparaison.

2.  ```{code-block} javascript
    let âge = Number(prompt("Quel âge as-tu ?"));
    if (âge >= 18) {
        console.log("Tu es majeur");
    } else {
        console.log("Tu es mineur");
    }
    ```
    La condition était inversée : si l'âge est inférieur à 18, on est
    *mineur*, pas majeur.

3.  ```{code-block} javascript
    let moyenne = Number(prompt("Quelle moyenne principale as-tu ?"));
    if (moyenne < 4) {
        console.log("Tu n'es pas promu");
    } else {
        console.log("Tu es promu");
    }
    ```
    La condition doit être entourée de **parenthèses**.

4.  ```{code-block} javascript
    let nombre = Number(prompt("Entre un nombre"));

    if (nombre > 0) {
        console.log(nombre, "est positif");
    } else if (nombre < 0) {
        console.log(nombre, "est négatif");
    } else {
        console.log("Zéro n'est ni positif ni négatif");
    }
    ```
    Il fallait un `else if` pour relier les trois cas, sinon un nombre positif
    affichait aussi "Zéro n'est ni positif ni négatif".

5.  ```{code-block} javascript
    let métier = prompt("Quel est ton métier ?");

    if (métier === "étudiant" || métier === "étudiante") {
        console.log("Tu as droit à une réduction");
    } else {
        console.log("Tu dois payer plein prix");
    }
    ```
    Chaque condition doit être complète : il faut répéter `métier === ...`.
````

### Exercice {num1}`exercice-revision`

Écrivez un programme qui calcule le prix d'un certain nombre de bananes à
1.50 CHF pièce. Si l'utilisateur entre un nombre négatif, le programme
affiche un message d'erreur à la place.

```{code-block} text
Combien de bananes souhaitez-vous acheter ? <-- [4]
Cela vous coûtera 6 CHF

>>>

Combien de bananes souhaitez-vous acheter ? <-- [-8]
ERREUR : nombre négatif invalide
```

```{exec} html
:editor: 019f01a0-0109-7109-8109-000000000109
:style: max-height: 16rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let nbBananes = Number(Prompt("Combien de bananes voulez-vous acheter ?"))

</script></body></html>
```

````{solution}
```{code-block} javascript
let nbBananes = Number(prompt("Combien de bananes souhaitez-vous acheter ?"));
if (nbBananes >= 0) {
    let prix = 1.5 * nbBananes;
    console.log("Cela vous coûtera", prix, "CHF");
} else {
    console.log("ERREUR : nombre négatif invalide");
}
```
````

### Exercice {num1}`exercice-revision`

Complétez le programme suivant pour qu'il corresponde à cet algorithme :

```{code-block} text
Demander à l'utilisateur quel temps il fait et l'enregistrer dans une variable météo
Si météo est égal à "pluie"
  Afficher "Prenez un parapluie"
Sinon si météo est égal à "neige"
  Afficher "Prenez une veste"
Sinon si météo est égal à "soleil"
  Afficher "Prenez une casquette"
Sinon
  Afficher "Je ne sais pas ce que vous devez prendre"
```

```{exec} html
:editor: 019f01a0-010a-710a-810a-00000000010a
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let météo = ;

console.log("Prenez un parapluie");

console.log("Prenez une veste");

console.log("Prenez une casquette");

console.log("Je ne sais pas ce que vous devez prendre");
</script></body></html>
```

````{solution}
```{code-block} javascript
let météo = prompt("Quel temps fait-il ?");

if (météo === "pluie") {
    console.log("Prenez un parapluie");
} else if (météo === "neige") {
    console.log("Prenez une veste");
} else if (météo === "soleil") {
    console.log("Prenez une casquette");
} else {
    console.log("Je ne sais pas ce que vous devez prendre");
}
```
````

### Exercice {num1}`exercice-revision`

Un zoo pratique les tarifs suivants :

- Les enfants jusqu'à 16 ans paient 15 CHF.
- Les jeunes jusqu'à 20 ans paient 22 CHF.
- Les adultes jusqu'à 65 ans paient 28 CHF.
- Les personnes âgées paient 20 CHF.

Écrivez un programme qui demande l'âge de l'utilisateur et affiche le prix à
payer :

```{code-block} text
Quel est ton âge ? <--- [16]
Pour une personne de 16 ans, le prix à payer est de 22 francs.
```

Pour une solution optimale, essayez de n'utiliser qu'une seule fois
`console.log()`.

```{exec} html
:editor: 019f01a0-010b-710b-810b-00000000010b
:style: max-height: 18rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Écrivez votre code ici

</script></body></html>
```

````{solution}
```{code-block} javascript
let age = Number(prompt("Quel est ton âge ?"));
let prix;

if (age <= 16) {
    prix = 15;
} else if (age <= 20) {
    prix = 22;
} else if (age <= 65) {
    prix = 28;
} else {
    prix = 20;
}

console.log("Pour une personne de", age, "ans, le prix à payer est de", prix, "francs.");
```
Note : on peut déclarer `let prix;` sans valeur initiale ; la variable existe
alors mais son contenu sera défini dans les `if/else if/else`.
````

### Exercice {num1}`exercice-revision`

Complétez le programme de quiz ci-dessous selon cet algorithme :

```{code-block} text
Demander à l'utilisateur s'il souhaite répondre à un quiz
Si l'utilisateur dit "oui" ou "ok"
    Poser la question "Qui a écrit Les Misérables ?"
    Si la réponse est "Victor Hugo"
        Afficher "Bonne réponse"
    Sinon
        Afficher "Mauvaise réponse"
Sinon
    Afficher "Pas de problème, au revoir"
```

```{exec} html
:editor: 019f01a0-010c-710c-810c-00000000010c
:style: max-height: 18rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let participation = prompt("Veux-tu répondre à mon quiz ?");
// Complétez le code ici

</script></body></html>
```

````{solution}
```{code-block} javascript
let participation = prompt("Veux-tu répondre à mon quiz ?");

if (participation === "oui" || participation === "ok") {
    let reponse = prompt("Qui a écrit Les Misérables ?");
    if (reponse === "Victor Hugo") {
        console.log("Bonne réponse");
    } else {
        console.log("Mauvaise réponse");
    }
} else {
    console.log("Pas de problème, au revoir");
}
```
````

### Exercice {num1}`exercice-revision`

Écrivez un programme dans lequel l'utilisateur peut entrer le prix d'un
article et un code de réduction. Les règles sont les suivantes :

- Avec le code `"STX"`, un article à moins de 100 CHF est réduit de 20 %.
- Avec le code `"STX"`, un article à plus de 200 CHF est réduit de 35 %.
- Avec le code `"STX"`, les autres articles ont une réduction de 20 CHF.
- Avec le code `"CSMI"` ou `"CGAM"`, le prix est **augmenté** de 10 CHF.
- Sinon, aucun changement.

Votre programme ne doit utiliser `console.log()` **qu'une seule fois** et à
la dernière ligne.

```{code-block} text
Combien coûte l'article ? <--- [300]
Quel est votre code de réduction ? <--- [STX]
Le prix final est 195 CHF

>>>

Combien coûte l'article ? <--- [150]
Quel est votre code de réduction ? <--- [CSMI]
Le prix final est 160 CHF
```

```{exec} html
:editor: 019f01a0-010d-710d-810d-00000000010d
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Écrivez votre code ici

</script></body></html>
```

````{solution}
```{code-block} javascript
let prix = Number(prompt("Combien coûte l'article ?"));
let code = prompt("Quel est votre code de réduction ?");

if (code === "STX" && prix < 100) {
    prix = prix * 0.8;
} else if (code === "STX" && prix > 200) {
    prix = prix * 0.65;
} else if (code === "STX") {
    prix = prix - 20;
} else if (code === "CSMI" || code === "CGAM") {
    prix = prix + 10;
}

console.log("Le prix final est", prix, "CHF");
```
````
