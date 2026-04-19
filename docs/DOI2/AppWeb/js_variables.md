<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Variables en JavaScript

## Introduction

En 2ème année, vous découvrez un nouveau langage de programmation : **JavaScript**.
Ce langage permet de rendre vos pages Web **dynamiques**, c'est-à-dire capables
de réagir aux actions de l'utilisateur. Mais avant de l'utiliser avec du HTML
et du CSS, il est important de maîtriser ses bases en tant que langage de
programmation.

Bonne nouvelle : vous connaissez déjà Python. Les **concepts** de base
(variables, types, opérations, conditions, boucles, fonctions) existent à
l'identique en JavaScript. Seule la **syntaxe** change. Dans toute cette
partie théorique, vous retrouverez donc les notions Python connues, mises en
parallèle avec leur équivalent JavaScript.

## Déclarer une variable

Tout comme en Python, une variable en JavaScript permet de **stocker une
valeur** dans la mémoire du programme et de lui donner **un nom**. La
différence principale est qu'en JavaScript, on doit indiquer au programme que
l'on crée une nouvelle variable à l'aide du mot-clef `let`. De plus, chaque
instruction se termine par un **point-virgule** `;`.

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
- Chaque instruction se termine par un point-virgule `;`.
- Les noms de variables ne contiennent **jamais d'espaces** ni de caractères
  accentués. Pour les noms en plusieurs mots, la convention en JavaScript est
  d'utiliser le *camelCase* (ex: `nombreDeClics`, `prixTotal`), là où Python
  utilise le *snake_case* (ex: `nombre_de_clics`, `prix_total`).
```

## Types de valeurs

En JavaScript, les valeurs que l'on stocke dans les variables peuvent être de
plusieurs types. Les trois premiers types ci-dessous suffiront pour la plupart
de vos programmes.

| Type Python | Type JavaScript | Description                      | Exemple            |
|-------------|-----------------|----------------------------------|--------------------|
| `int`       | `number`        | Nombres entiers                  | `4`                |
| `float`     | `number`        | Nombres à virgules               | `4.125`            |
| `str`       | `string`        | Texte / Chaînes de caractères    | `"Bonjour"`        |
| `bool`      | `boolean`       | Vrai ou Faux                     | `true` / `false`   |

```{important}
- Contrairement à Python, JavaScript ne fait **pas de distinction** entre les
  nombres entiers et les nombres à virgule : les deux sont de type `number`.
- Les booléens s'écrivent en **minuscules** : `true` et `false` (en Python on
  écrit `True` et `False`).
- Le texte des strings est toujours entouré de **guillemets** (`"..."`) ou
  d'**apostrophes** (`'...'`). Les deux fonctionnent en JavaScript.
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
console.log("Je viens de", pays, "et j'habite à", ville);
</script></body></html>
```

## Opérations arithmétiques

Les opérations arithmétiques fonctionnent **exactement comme en Python**. Les
mêmes opérateurs sont disponibles, avec la même priorité.

| Opérateur | Nom                 | Exemple  | Résultat |
| :-------: | :-----------------: | :------: | :------: |
| `+`       | Addition            | `3 + 4`  | `7`      |
| `-`       | Soustraction        | `9 - 12` | `-3`     |
| `*`       | Multiplication      | `5 * 6`  | `30`     |
| `/`       | Division            | `11 / 2` | `5.5`    |
| `**`      | Puissance           | `2 ** 3` | `8`      |

Ces opérateurs s'utilisent avec des valeurs ou avec des variables :

```{exec} html
:editor: 019f01a0-0002-7a02-8002-000000000002
:style: max-height: 15rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let nombreDePersonnes = 13;
let prixParPersonne = 5.75;
let réduction = 10.5;
let total = nombreDePersonnes * prixParPersonne - réduction;
console.log("Le prix total est de", total, "CHF");
</script></body></html>
```

## Concaténation de chaînes

En JavaScript, l'opérateur `+` permet aussi de **coller** deux chaînes de
caractères (texte) bout à bout. On appelle cela la *concaténation*.

```{exec} html
:editor: 019f01a0-0003-7a03-8003-000000000003
:style: max-height: 15rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let prénom = "Lucien";
let nom = "Gremaud";
let nomComplet = prénom + " " + nom;
console.log("Bonjour " + nomComplet + " !");
</script></body></html>
```

```{important}
Attention : si vous utilisez `+` entre un nombre et un texte, le nombre sera
automatiquement transformé en texte.
 - `"J'ai " + 26 + " ans"` donne bien `"J'ai 26 ans"`
 - Mais `"Total : " + 3 + 4` donne `"Total : 34"` et non `"Total : 7"` !

Pour éviter ce genre de problème, utilisez des virgules `,` dans
`console.log()` comme vu précédemment, ou effectuez le calcul dans une
variable au préalable.
```

## Commentaires

Comme en Python, on peut ajouter des commentaires pour expliquer son code. La
syntaxe est cependant différente : on utilise `//` à la place de `#`.

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{code-block} python
# Ceci est un commentaire
prix = 3.2  # en CHF/kg
```

</td><td style="padding-left: 1rem">

```{code-block} javascript
// Ceci est un commentaire
let prix = 3.2; // en CHF/kg
```

</td></tr></table>

JavaScript permet également d'écrire des commentaires sur **plusieurs lignes**
en les entourant de `/*` et `*/` :

```{code-block} javascript
/*
   Ce commentaire occupe
   plusieurs lignes.
*/
```

## Exercices

### Exercice {num1}`exercice-revision`


### Exercice {num1}`exercice-revision`

Chacun des programmes JavaScript suivants comporte au moins une erreur.
Certaines erreurs empêchent le programme de s'exécuter ; d'autres le laissent
s'exécuter mais donnent un résultat faux.

Corrigez chacun de ces codes dans l'éditeur puis cliquez sur "Play" pour
vérifier. L'affichage du résultat apparaîtra dans la zone de sortie.

1.  ```{exec} html
        :editor: 019f01a0-0004-7a04-8004-000000000004
    :style: max-height: 12rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    console.log(Bonjour);
    </script></body></html>
    ```


2.  ```{exec} html
        :editor: 019f01a0-0006-7a06-8006-000000000006
    :style: max-height: 14rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let note = 4,5;
    let bonus = 0,2;
    let noteFinale = note + bonus;
    console.log("La note finale est", noteFinale);
    </script></body></html>
    ```

3.  ```{exec} html
        :editor: 019f01a0-0007-7a07-8007-000000000007
    :style: max-height: 12rem;
    :output-style: height: 0;
    <!DOCTYPE html>
    <html><body><script>
    let prénom = Maxime;
    console.log("Je m'appelle", prénom);
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
    let côté = 5
    let aire = côté ** 2
    console.log("aire")
    </script></body></html>
    ```

````{solution}
1.  ```{code-block} javascript
    console.log("Bonjour");
    ``` 
    Sans guillemets, `Bonjour` est considéré comme un nom de variable, qui
    n'existe pas.

    

2.  ```{code-block} javascript
    let note = 4.5;
    let bonus = 0.2;
    let noteFinale = note + bonus;
    console.log("La note finale est", noteFinale);
    ```
    En JavaScript (comme en Python), les nombres à virgule utilisent un
    **point** et non une virgule.

3.  ```{code-block} javascript
    let prénom = "Maxime";
    console.log("Je m'appelle", prénom);
    ```
    `Maxime` sans guillemets est interprété comme un nom de variable.

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
    Il manquait les points-virgules à la fin de chaque ligne, et les
    guillemets autour de `aire` affichaient le texte `"aire"` au lieu de la
    valeur de la variable.
````

### Exercice {num1}`exercice-revision`

Complétez le programme ci-dessous pour calculer la moyenne des notes
principales. La note de math est de 4, celles de français et d'allemand sont
de 5 et demi.

Affichez ensuite la moyenne avec `console.log()`. Le programme doit afficher
`La moyenne principale est de 5`.

```{exec} html
:editor: 019f01a0-000a-7a0a-800a-00000000000a
:style: max-height: 16rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let math = ;
let francais = ;
let allemand = ;
let moyenne = ;
console.log();
</script></body></html>
```

````{solution}
```{code-block} javascript
let math = 4;
let francais = 5.5;
let allemand = 5.5;
let moyenne = (math + francais + allemand) / 3;
console.log("La moyenne principale est de", moyenne);
```
Pour calculer la moyenne, on additionne toutes les notes puis on divise par
3. Comme la division a la priorité sur l'addition, il ne faut pas oublier les
parenthèses.
````

### Exercice {num1}`exercice-revision`

Écrivez un programme JavaScript qui calcule le volume $V$ d'un cylindre en
fonction de son rayon et de sa hauteur. Votre programme contiendra les lignes
suivantes :

- Créer une variable `pi` contenant la valeur `3.14`.
- Créer une variable `hauteur` contenant la valeur `30`.
- Créer une variable `diamètre` contenant la valeur `11`.
- Créer une variable `rayon` contenant la moitié de `diamètre`.
- Créer une variable `aireDisque` contenant le résultat de $\pi \cdot r^2$.
- Créer une variable `volume` contenant le résultat de l'aire du disque
  multipliée par la hauteur.
- Afficher le contenu de la variable `volume` avec un texte explicatif. Si
  tout est correct, le programme doit afficher
  `Le volume est de 2849.55 m3`.

```{exec} html
:editor: 019f01a0-000b-7a0b-800b-00000000000b
:style: max-height: 20rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
// Écrivez votre code ici

</script></body></html>
```

````{solution}
```{code-block} javascript
let pi = 3.14;
let hauteur = 30;
let diamètre = 11;
let rayon = diamètre / 2;
let aireDisque = pi * rayon ** 2;
let volume = aireDisque * hauteur;
console.log("Le volume est de", volume, "m3");
```
````

### Exercice {num1}`exercice-revision`

Complétez le programme JavaScript ci-dessous pour calculer le prix total d'un
ordinateur sachant que :

- Le processeur coûte 250 CHF
- Une barrette de 4 Go de RAM coûte 29.95 CHF
- On met 4 barrettes de RAM dans l'ordinateur
- Le reste des composants coûte 870 CHF
- Une réduction de 15 % est appliquée sur le total

Le programme final doit afficher
`Le prix total de l'ordinateur après réduction est de 1053.83 CHF`.

```{exec} html
:editor: 019f01a0-000c-7a0c-800c-00000000000c
:style: max-height: 22rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let prixProcesseur = ;
let prixBarrette = ;
let nombreBarrettes = ;
let prixAutres = ;

// À vous de continuer depuis ici !

</script></body></html>
```

````{solution}
```{code-block} javascript
let prixProcesseur = 250;
let prixBarrette = 29.95;
let nombreBarrettes = 4;
let prixAutres = 870;

// Calcul du prix total avant réduction
let totalAvantReduction = prixProcesseur + prixBarrette * nombreBarrettes + prixAutres;

// Application de la réduction de 15 %
let reduction = 0.15;
let totalApresReduction = totalAvantReduction * (1 - reduction);

// Affichage du résultat
console.log("Le prix total de l'ordinateur après réduction est de", totalApresReduction, "CHF");
```
````

### Exercice {num1}`exercice-revision`

Complétez le programme ci-dessous pour calculer le montant que chaque élève
doit payer pour la sortie de classe :

- 25 élèves prennent part à la sortie.
- La journée débute à *FriBowling*. Le prix est de 10 CHF par personne et par
  heure. Les élèves jouent durant 1h30.
- En sortant, un élève chanceux trouve un billet de 50 CHF sur le sol et
  décide de le mettre dans la caisse de classe pour payer les activités
  suivantes.
- La classe va ensuite à la piscine de la Motta. L'entrée coûte 4.5 CHF par
  élève. Comme le groupe dépasse 20 personnes, un rabais de 20 % est accordé.
- L'après-midi, la classe fait un mini-golf urbain. Le prix pour tout le
  groupe est de 125 CHF.

Affichez le montant que chaque élève devra payer sachant que le collège paie
la moitié du montant total de la journée.

**ATTENTION** : veillez à inclure des commentaires dans votre code !

```{exec} html
:editor: 019f01a0-000d-7a0d-800d-00000000000d
:style: max-height: 24rem;
:output-style: height: 0;
<!DOCTYPE html>
<html><body><script>
let nombreÉlèves = ;

// Calcul du prix du bowling
let tarifBowling = 10;
let duréeBowling = ;
let prixBowling = ;

// À vous de continuer depuis ici !

</script></body></html>
```

````{solution}
```{code-block} javascript
let nombreÉlèves = 25;

// Calcul du prix du bowling
let tarifBowling = 10;
let duréeBowling = 1.5;
let prixBowling = nombreÉlèves * tarifBowling * duréeBowling;

// Billet trouvé sur le sol
let billetTrouvé = 50;

// Prix de la piscine
let tarifPiscine = 4.5;
let rabaisPiscine = 0.8;
let prixPiscine = nombreÉlèves * tarifPiscine * rabaisPiscine;

// Prix du mini-golf urbain
let prixMiniGolf = 125;

// Calcul du prix total
let total = prixBowling - billetTrouvé + prixPiscine + prixMiniGolf;

// Prise en charge de la moitié par le collège
total = total / 2;

// Calcul du prix par élève
let prixParÉlève = total / nombreÉlèves;

// Affichage du prix par élève
console.log("Chaque élève doit payer", prixParÉlève, "CHF");
```
````
