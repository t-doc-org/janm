<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Interagir avec le HTML : `getElementById`

## Du JavaScript au HTML

Jusqu'ici, vous avez utilisé JavaScript comme un langage de programmation
classique : variables, conditions, fonctions, affichage dans la `console`. Mais
l'intérêt réel de JavaScript est de pouvoir **modifier une page HTML pendant
qu'elle est affichée** dans le navigateur : changer un texte, une couleur,
cacher un élément, etc.

Pour cela, JavaScript a besoin de **retrouver les balises HTML** sur lesquelles
il veut agir. La méthode la plus courante pour y parvenir s'appelle
`document.getElementById()`.

## Donner un identifiant à une balise

Pour que JavaScript puisse retrouver une balise HTML, on lui donne un
**identifiant unique** via l'attribut `id`. Chaque `id` doit être **unique**
dans toute la page.

```{code-block} html
<h1 id="titre">Bienvenue</h1>
<p id="message">Ceci est un paragraphe.</p>
```

## Récupérer la balise en JavaScript

On utilise ensuite `document.getElementById("...")` en lui passant l'`id` de la
balise recherchée. La fonction renvoie une **référence** à cette balise, que
l'on peut stocker dans une variable.

```{code-block} javascript
let titre = document.getElementById("titre");
```

La variable `titre` représente maintenant la balise `<h1>` dans le programme.
On peut ensuite lire ou modifier ses propriétés.

```{important}
La balise `<script>` doit être placée **après** le HTML qu'elle manipule, soit
juste avant la fermeture `</body>`. Sinon, au moment où `getElementById`
s'exécute, la balise n'existe pas encore et la fonction renvoie `null`.
```

## Modifier le texte : `textContent`

Pour changer le texte affiché à l'intérieur d'une balise, on modifie sa
propriété `textContent`.

```{exec} html
:editor: 019f01a0-0400-7400-8400-000000000400
:style: max-height: 18rem;
<!DOCTYPE html>
<html><body>
  <h1 id="titre">Ancien titre</h1>
  <p id="message">Ancien message</p>

  <script>
    let titre = document.getElementById("titre");
    titre.textContent = "Nouveau titre";

    let message = document.getElementById("message");
    message.textContent = "Bonjour tout le monde !";
  </script>
</body></html>
```

Même si le HTML contient au départ `"Ancien titre"`, c'est bien
`"Nouveau titre"` qui s'affiche : le JavaScript s'exécute après le chargement
du HTML et remplace son contenu.

## Modifier le style : `style`

Chaque balise possède une propriété `style` qui permet de lui appliquer du CSS
directement depuis JavaScript. On utilise ensuite le nom de la propriété CSS
que l'on souhaite modifier.

```{exec} html
:editor: 019f01a0-0401-7401-8401-000000000401
:style: max-height: 20rem;
<!DOCTYPE html>
<html><body>
  <h1 id="titre">Un titre coloré</h1>

  <script>
    let titre = document.getElementById("titre");
    titre.style.color = "red";
    titre.style.backgroundColor = "yellow";
    titre.style.fontSize = "48px";
    titre.style.textAlign = "center";
  </script>
</body></html>
```

```{important}
Les noms des propriétés CSS contenant un tiret en CSS s'écrivent en
**camelCase** en JavaScript :

| CSS                | JavaScript          |
|--------------------|---------------------|
| `color`            | `style.color`       |
| `background-color` | `style.backgroundColor` |
| `font-size`        | `style.fontSize`    |
| `text-align`       | `style.textAlign`   |
| `border-radius`    | `style.borderRadius`|

Les valeurs restent toujours des **chaînes de caractères** : `"red"`,
`"48px"`, `"10%"`, etc.
```

## Lire la valeur d'une balise

`textContent` et `style` peuvent aussi être **lus**, pas seulement modifiés.
On peut donc récupérer le texte actuel d'une balise pour le transformer.

```{exec} html
:editor: 019f01a0-0402-7402-8402-000000000402
:style: max-height: 18rem;
<!DOCTYPE html>
<html><body>
  <p id="phrase">bonjour</p>

  <script>
    let phrase = document.getElementById("phrase");
    let ancienTexte = phrase.textContent;
    phrase.textContent = ancienTexte.toUpperCase() + " !";
  </script>
</body></html>
```

## Exercices

### Exercice {num1}`exercice-js`

Complétez le script ci-dessous pour que, au chargement de la page, le titre
affiche `"JavaScript c'est génial"` à la place de `"À remplacer"`.

```{exec} html
:editor: 019f01a0-0403-7403-8403-000000000403
:style: max-height: 16rem;
<!DOCTYPE html>
<html><body>
  <h1 id="titre">À remplacer</h1>

  <script>
    let titre = ;
    titre.textContent = ;
  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let titre = document.getElementById("titre");
titre.textContent = "JavaScript c'est génial";
```
````

### Exercice {num1}`exercice-js`

Complétez le script pour que le paragraphe soit affiché en **bleu**, avec
un fond **jaune** et une taille de police de **32 pixels**.

```{exec} html
:editor: 019f01a0-0404-7404-8404-000000000404
:style: max-height: 18rem;
<!DOCTYPE html>
<html><body>
  <p id="message">Regarde comme je suis stylé !</p>

  <script>
    let message = document.getElementById("message");
    // Complétez ici

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let message = document.getElementById("message");
message.style.color = "blue";
message.style.backgroundColor = "yellow";
message.style.fontSize = "32px";
```
````

### Exercice {num1}`exercice-js`

Le programme ci-dessous contient **3 erreurs** qui l'empêchent de fonctionner.
Corrigez-les pour que le titre devienne `"Corrigé !"` et s'affiche en vert.

```{exec} html
:editor: 019f01a0-0405-7405-8405-000000000405
:style: max-height: 18rem;
<!DOCTYPE html>
<html><body>
  <h1 id="titre">À corriger</h1>

  <script>
    let titre = document.GetElementById(titre);
    titre.textContent = Corrigé !;
    titre.style.color = green;
  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let titre = document.getElementById("titre");
titre.textContent = "Corrigé !";
titre.style.color = "green";
```

Les trois erreurs :
1. `GetElementById` → `getElementById` (JavaScript est sensible à la casse).
2. L'`id` passé en argument doit être une **chaîne de caractères** :
   `"titre"` et non `titre`.
3. Les valeurs `"Corrigé !"` et `"green"` doivent être entre **guillemets**.
````

### Exercice {num1}`exercice-js`

Écrivez un programme qui :

1. Récupère le paragraphe d'`id` `"citation"`.
2. Remplace son texte par `"Je code, donc je suis."`.
3. Le met en **italique** (`fontStyle = "italic"`), en **blanc**
   (`color = "white"`), sur un fond **noir** (`backgroundColor = "black"`).
4. Ajoute un espacement intérieur de 20 pixels (`padding = "20px"`).

```{exec} html
:editor: 019f01a0-0406-7406-8406-000000000406
:style: max-height: 18rem;
<!DOCTYPE html>
<html><body>
  <p id="citation">...</p>

  <script>
    // Complétez ici

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let citation = document.getElementById("citation");
citation.textContent = "Je code, donc je suis.";
citation.style.fontStyle = "italic";
citation.style.color = "white";
citation.style.backgroundColor = "black";
citation.style.padding = "20px";
```
````

### Exercice {num1}`exercice-js`

Le HTML ci-dessous contient trois paragraphes avec des `id` différents.
Écrivez le script pour que :

- le paragraphe `"feu1"` devienne **rouge** ;
- le paragraphe `"feu2"` devienne **orange** ;
- le paragraphe `"feu3"` devienne **green**.

```{exec} html
:editor: 019f01a0-0407-7407-8407-000000000407
:style: max-height: 20rem;
<!DOCTYPE html>
<html><body>
  <p id="feu1">STOP</p>
  <p id="feu2">ATTENTION</p>
  <p id="feu3">GO</p>

  <script>
    // Complétez ici

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let feu1 = document.getElementById("feu1");
feu1.style.color = "red";

let feu2 = document.getElementById("feu2");
feu2.style.color = "orange";

let feu3 = document.getElementById("feu3");
feu3.style.color = "green";
```
````

### Exercice {num1}`exercice-js`

Complétez le programme pour qu'il :

1. Récupère le texte actuel du paragraphe d'`id` `"nom"`.
2. Remplace son contenu par `"Bonjour "` suivi du texte récupéré, le tout
   en majuscules.

Par exemple, si le paragraphe contient `"Alice"`, il doit afficher
`"Bonjour ALICE"`.

```{exec} html
:editor: 019f01a0-0408-7408-8408-000000000408
:style: max-height: 18rem;
<!DOCTYPE html>
<html><body>
  <p id="nom">Alice</p>

  <script>
    let paragraphe = document.getElementById("nom");
    let ancien = ;
    paragraphe.textContent = ;
  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let paragraphe = document.getElementById("nom");
let ancien = paragraphe.textContent;
paragraphe.textContent = "Bonjour " + ancien.toUpperCase();
```
````
