<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Boucles en JavaScript

## Qu'est-ce qu'une boucle ?

Comme en Python, une **boucle** permet de répéter un bloc d'instructions
plusieurs fois. En JavaScript, on retrouve le même type de boucle
conditionnelle que vous connaissez : le `while`. Vous découvrirez également
une nouvelle forme de boucle très courante en JavaScript : la boucle `for`.

## La boucle while

La boucle `while` (*tant que*) exécute un bloc d'instructions **tant qu'une
condition est vraie**. La condition est placée entre **parenthèses**, et le
bloc d'instructions entre **accolades**.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
compteur = 1
while compteur <= 10:
    print(compteur)
    compteur = compteur + 1
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
let compteur = 1;
while (compteur <= 10) {
    console.log(compteur);
    compteur = compteur + 1;
}
```

</td></tr></table>

Testez le programme ci-dessous qui compte jusqu'à 10 :

```{exec} html
:editor: 019f01a0-0200-7200-8200-000000000200
:style: max-height: 16rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let compteur = 1;
while (compteur <= 10) {
    console.log(compteur);
    compteur = compteur + 1;
}
</script></body></html>
```

Le `while` est aussi très pratique pour redemander une information à
l'utilisateur tant qu'il n'a pas donné une réponse attendue :

```{exec} html
:editor: 019f01a0-0201-7201-8201-000000000201
:style: max-height: 16rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let mdp = prompt("Entrez le mot de passe");
while (mdp !== "Fr1B0urg") {
    console.log("Mot de passe incorrect");
    mdp = prompt("Entrez à nouveau le mot de passe");
}
console.log("Mot de passe correct");
</script></body></html>
```

## Raccourcis utiles

En JavaScript (comme en Python), on a souvent besoin d'ajouter ou de retirer
une valeur à une variable. Il existe des raccourcis pratiques :

| Écriture complète | Raccourci | Description                    |
| :---------------- | :-------: | :----------------------------- |
| `compteur = compteur + 1` | `compteur++`  | Ajoute 1 (*incrémentation*)    |
| `compteur = compteur - 1` | `compteur--`  | Retire 1 (*décrémentation*)    |
| `total = total + 5`       | `total += 5` | Ajoute 5                       |
| `total = total - 5`       | `total -= 5` | Retire 5                       |
| `total = total * 2`       | `total *= 2` | Multiplie par 2                |

Ces raccourcis existent aussi en Python (sauf `++` et `--` qui sont propres
au JavaScript). Ils rendent le code plus court et plus lisible.

## La boucle for

JavaScript propose une deuxième forme de boucle très utilisée : la boucle
`for`. Elle permet d'écrire en **une seule ligne** l'initialisation d'un
compteur, sa condition d'arrêt et son incrémentation.

La syntaxe est la suivante :

```{code-block} javascript
for (initialisation; condition; incrémentation) {
    // bloc d'instructions
}
```

Les trois parties entre parenthèses sont séparées par des **points-virgules**
et correspondent à :

1. **Initialisation** : exécutée une seule fois au début (souvent la création
   du compteur).
2. **Condition** : vérifiée avant chaque répétition. Tant qu'elle est `true`,
   la boucle continue.
3. **Incrémentation** : exécutée à la fin de chaque répétition (souvent
   `i++`).

Le programme de comptage jusqu'à 10 devient ainsi beaucoup plus compact :

<table><tr style="text-align: center">
  <th>Avec while</th><th>Avec for</th>
</tr><tr><td>

```{code-block} javascript
let i = 1;
while (i <= 10) {
    console.log(i);
    i++;
}
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
```

</td></tr></table>

Les deux programmes font **exactement** la même chose. La boucle `for` est
plus concise quand on connaît à l'avance le nombre de répétitions.

```{exec} html
:editor: 019f01a0-0202-7202-8202-000000000202
:style: max-height: 14rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
</script></body></html>
```

```{important}
- La boucle `for` est idéale quand on veut répéter un nombre **connu** de
  fois (par exemple : afficher un livret, parcourir de 0 à 100).
- La boucle `while` est idéale quand on ne sait pas à l'avance combien de
  fois on va répéter (par exemple : tant que l'utilisateur donne une mauvaise
  réponse).
```

## Exercices

### Exercice {num1}`exercice-revision`

Chacun des programmes suivants comporte au moins une erreur. Certaines
empêchent l'exécution ; d'autres donnent un résultat faux.

Corrigez chaque code puis cliquez sur "Play".

1.  ```{exec} html
    :editor: 019f01a0-0203-7203-8203-000000000203
    :style: max-height: 16rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let réponse = prompt("Tu aimes la pizza avec ananas ?");
    while (réponse !== "oui" && réponse !== "Oui")
        réponse = prompt("Réfléchis bien ! Tu aimes la pizza ananas ?");
    console.log("Je savais que tu aimais ça !");
    </script></body></html>
    ```

2.  ```{exec} html
    :editor: 019f01a0-0204-7204-8204-000000000204
    :style: max-height: 16rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    // Compte de 2 en 2 jusqu'à 20
    let compteur = 0;
    while (compteur >= 20) {
        compteur = compteur + 2;
        console.log(compteur);
    }
    console.log("FIN");
    </script></body></html>
    ```

3.  ```{exec} html
    :editor: 019f01a0-0205-7205-8205-000000000205
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let quiz = prompt("Quelle est la capitale de la France ?");
    while (quiz !== "Paris") {
        réponse = prompt("Faux ! Réessaie");
    }
    console.log("Bonne réponse");
    </script></body></html>
    ```

4.  ```{exec} html
    :editor: 019f01a0-0206-7206-8206-000000000206
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    for (let i = 0, i < 5, i++) {
        console.log("Bonjour !");
    }
    </script></body></html>
    ```

5.  ```{exec} html
    :editor: 019f01a0-0207-7207-8207-000000000207
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    // Affiche les nombres pairs de 2 à 10
    for (let i = 2; i <= 10; i++) {
        console.log(i);
    }
    </script></body></html>
    ```

````{solution}
1.  ```{code-block} javascript
    let réponse = prompt("Tu aimes la pizza avec ananas ?");
    while (réponse !== "oui" && réponse !== "Oui") {
        réponse = prompt("Réfléchis bien ! Tu aimes la pizza ananas ?");
    }
    console.log("Je savais que tu aimais ça !");
    ```
    Le bloc du `while` doit être entouré d'accolades `{ }`.

2.  ```{code-block} javascript
    let compteur = 0;
    while (compteur < 20) {
        compteur = compteur + 2;
        console.log(compteur);
    }
    console.log("FIN");
    ```
    La condition était inversée : avec `>= 20` on n'entre jamais dans la
    boucle. Il faut `< 20`.

3.  ```{code-block} javascript
    let quiz = prompt("Quelle est la capitale de la France ?");
    while (quiz !== "Paris") {
        quiz = prompt("Faux ! Réessaie");
    }
    console.log("Bonne réponse");
    ```
    La variable mise à jour dans la boucle (`réponse`) n'était pas la même
    que celle testée (`quiz`) : la boucle tournait à l'infini.

4.  ```{code-block} javascript
    for (let i = 0; i < 5; i++) {
        console.log("Bonjour !");
    }
    ```
    Les trois parties du `for` doivent être séparées par des
    **points-virgules** `;`, pas des virgules.

5.  ```{code-block} javascript
    for (let i = 2; i <= 10; i = i + 2) {
        console.log(i);
    }
    ```
    Avec `i++` on saute de 1 en 1 ; pour afficher les nombres pairs, il faut
    sauter de 2 en 2 (`i = i + 2` ou `i += 2`).
````

### Exercice {num1}`exercice-revision`

1.  Écrivez un programme qui affiche un compte à rebours de 100 jusqu'à 0,
    suivi du mot `"BOOM"`. Utilisez seulement **deux** `console.log()`.

    ```{code-block} text
    100
    99
    98
    ...
    2
    1
    0
    BOOM
    ```

    ```{exec} html
    :editor: 019f01a0-0208-7208-8208-000000000208
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    // Écrivez votre code ici

    </script></body></html>
    ```

2.  Complétez le programme précédent avec un `if/else` dans la boucle de
    manière qu'à chaque nombre inférieur à 10, le texte `"FUYEZ !"` soit
    ajouté :

    ```{code-block} text
    100
    99
    ...
    2 FUYEZ !
    1 FUYEZ !
    0 FUYEZ !
    BOOM
    ```

````{solution}
1.  ```{code-block} javascript
    let compte = 100;
    while (compte >= 0) {
        console.log(compte);
        compte--;
    }
    console.log("BOOM");
    ```

2.  ```{code-block} javascript
    let compte = 100;
    while (compte >= 0) {
        if (compte < 10) {
            console.log(compte, "FUYEZ !");
        } else {
            console.log(compte);
        }
        compte--;
    }
    console.log("BOOM");
    ```
````

### Exercice {num1}`exercice-revision`

Écrivez un programme qui demande à l'utilisateur un nombre et affiche ensuite
sa table de multiplication de 1 à 10. Votre programme ne doit utiliser
**qu'une seule** instruction `console.log()`.

```{code-block} text
Quelle table de multiplication voulez-vous voir ? <--- [4]
1 x 4 = 4
2 x 4 = 8
3 x 4 = 12
...
10 x 4 = 40
```

```{exec} html
:editor: 019f01a0-0209-7209-8209-000000000209
:style: max-height: 16rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Écrivez votre code ici

</script></body></html>
```

````{solution}
Avec une boucle `for`, le code est très compact :

```{code-block} javascript
let n = Number(prompt("Quelle table de multiplication voulez-vous voir ?"));
for (let i = 1; i <= 10; i++) {
    console.log(i, "x", n, "=", i * n);
}
```

Avec une boucle `while` c'est équivalent, mais plus verbeux :

```{code-block} javascript
let n = Number(prompt("Quelle table de multiplication voulez-vous voir ?"));
let i = 1;
while (i <= 10) {
    console.log(i, "x", n, "=", i * n);
    i++;
}
```
````

### Exercice {num1}`exercice-revision`

Écrivez un programme dans lequel l'utilisateur peut entrer ses notes les unes
après les autres. À la fin, le programme affiche le nombre de notes
insuffisantes (inférieures à 4). Les notes invalides (en dehors de 1 à 6)
sont ignorées. Pour terminer, l'utilisateur entre la note `99`.

```{code-block} text
Entrez une note : 4.5
Entrez une note : 3.4
Entrez une note : 6
Entrez une note : 3.9
Entrez une note : 5.1
Entrez une note : 99
Vous avez fait 2 notes insuffisantes
```

```{exec} html
:editor: 019f01a0-020a-720a-820a-00000000020a
:style: max-height: 16rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Écrivez votre code ici

</script></body></html>
```

````{solution}
```{code-block} javascript
let nbNotesInsuf = 0;
let note = 0;
while (note !== 99) {
    note = Number(prompt("Entrez une note"));
    if (note >= 1 && note < 4) {
        nbNotesInsuf++;
    }
}
console.log("Vous avez fait", nbNotesInsuf, "notes insuffisantes");
```
````

### Exercice {num1}`exercice-revision`

Écrivez un programme qui correspond à une mini calculatrice. L'utilisateur
peut choisir entre `"addition"`, `"soustraction"` ou `"multiplication"`, puis
entre les deux nombres. Le programme effectue l'opération en boucle tant que
l'utilisateur n'a pas écrit `"STOP"`.

```{code-block} text
Bienvenue dans la mini calculatrice !
Quelle opération souhaitez-vous effectuer ? addition
Quel est le premier nombre ? 4
Quel est le deuxième nombre ? 7
Le résultat de 4 + 7 est 11

Quelle opération souhaitez-vous effectuer ? multiplication
Quel est le premier nombre ? 9
Quel est le deuxième nombre ? 11
Le résultat de 9 * 11 est 99

Quelle opération souhaitez-vous effectuer ? STOP
Au revoir !
```

```{exec} html
:editor: 019f01a0-020b-720b-820b-00000000020b
:style: max-height: 18rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Écrivez votre code ici

</script></body></html>
```

````{solution}
```{code-block} javascript
console.log("Bienvenue dans la mini calculatrice !");
let operation = "";
while (operation !== "STOP") {
    operation = prompt("Quelle opération souhaitez-vous effectuer ?");
    if (operation === "STOP") {
        console.log("Au revoir !");
    } else {
        let nombre1 = Number(prompt("Quel est le premier nombre ?"));
        let nombre2 = Number(prompt("Quel est le deuxième nombre ?"));
        if (operation === "addition") {
            let resultat = nombre1 + nombre2;
            console.log("Le résultat de", nombre1, "+", nombre2, "est", resultat);
        } else if (operation === "soustraction") {
            let resultat = nombre1 - nombre2;
            console.log("Le résultat de", nombre1, "-", nombre2, "est", resultat);
        } else if (operation === "multiplication") {
            let resultat = nombre1 * nombre2;
            console.log("Le résultat de", nombre1, "*", nombre2, "est", resultat);
        } else {
            console.log("Opération non reconnue");
        }
    }
}
```
````
