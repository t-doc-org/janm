<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

```{metadata}
solutions: show
```

# Réagir à un clic

## Des pages encore statiques

Avec `getElementById`, vous savez maintenant modifier le texte ou le style
d'une balise HTML depuis JavaScript. Cependant, ce code ne s'exécute qu'**une
seule fois**, au chargement de la page : l'utilisateur n'a aucun moyen
d'intervenir ensuite.

Pour rendre une page réellement **interactive**, il faut pouvoir **réagir aux
actions de l'utilisateur** : un clic sur un bouton, un appui au clavier, un
déplacement de la souris, etc. On parle alors d'**événements**.

## Un bouton en HTML

Pour placer un bouton sur une page, on utilise la balise `<button>`. Comme
pour les autres balises, on lui donne un `id` afin de pouvoir le retrouver en
JavaScript.

```{code-block} html
<button id="monBouton">Cliquez ici !</button>
```

Tant que JavaScript ne s'en occupe pas, cliquer sur ce bouton ne fait
**rien**. Il faut lui associer une **fonction** à exécuter lors du clic.

## Lier un clic à une fonction : `addEventListener`

La méthode `addEventListener` permet de dire au navigateur :
« quand tel événement se produit sur telle balise, exécute telle fonction ».
Sa syntaxe est la suivante :

```{code-block} javascript
balise.addEventListener("événement", maFonction);
```

Pour réagir à un clic sur un bouton, la procédure se fait donc en **trois
étapes** :

1. Récupérer le bouton avec `getElementById`.
2. Définir une fonction qui décrit ce qu'il faut faire.
3. Lier la fonction au bouton avec `addEventListener("click", ...)`.

Voici un exemple complet : un clic sur le bouton change le texte du titre.

```{exec} html
:editor: 019f01a0-0500-7500-8500-000000000500
:style: max-height: 22rem;
<!DOCTYPE html>
<html><body>
  <h1 id="titre">Bonjour</h1>
  <button id="monBouton">Cliquez ici !</button>

  <script>
    // 1. Récupérer les balises
    let bouton = document.getElementById("monBouton");
    let titre = document.getElementById("titre");

    // 2. Définir la fonction
    function changerTitre() {
        titre.textContent = "Tu as cliqué !";
    }

    // 3. Lier la fonction au clic
    bouton.addEventListener("click", changerTitre);
  </script>
</body></html>
```

Tant que l'utilisateur ne clique pas, rien ne change. À chaque clic, la
fonction `changerTitre` est **appelée automatiquement** par le navigateur.

```{important}
Quand on passe une fonction à `addEventListener`, on écrit son nom seul, **sans parenthèses**.
```


## D'autres événements

L'événement `"click"` n'est pas le seul disponible. Voici quelques événements
utiles :

| Événement     | Déclenché quand …                                |
|:--------------|:-------------------------------------------------|
| `"click"`     | l'utilisateur clique sur la balise               |
| `"mouseover"` | la souris passe au-dessus de la balise           |
| `"mouseout"`  | la souris quitte la balise                       |
| `"keydown"`   | une touche du clavier est enfoncée               |

Il suffit de remplacer le premier argument de `addEventListener` par le nom
de l'événement souhaité :

```{code-block} javascript
titre.addEventListener("mouseover", changerTitre);
```

## Exercices

### Exercice {num1}`exercice-js`

Complétez le code ci-dessous pour qu'un clic sur le bouton change le texte
du paragraphe en `"Bravo, ça marche !"`.

```{exec} html
:editor: 019f01a0-0502-7502-8502-000000000502
:style: max-height: 20rem;
<!DOCTYPE html>
<html><body>
  <p id="message">En attente d'un clic...</p>
  <button id="bouton">Clique-moi</button>

  <script>
    let message = document.getElementById("message");
    let bouton = document.getElementById("bouton");

    function afficherMessage() {
        // Complétez ici
    }

    // Liez la fonction au clic du bouton

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let message = document.getElementById("message");
let bouton = document.getElementById("bouton");

function afficherMessage() {
    message.textContent = "Bravo, ça marche !";
}

bouton.addEventListener("click", afficherMessage);
```
````

### Exercice {num1}`exercice-js`

Ajoutez le code nécessaire pour que :

- un clic sur le bouton **"Allumer"** donne à la page un fond **jaune** ;
- un clic sur le bouton **"Éteindre"** donne à la page un fond **noir**.

Rappel : on change le fond de la page avec
`document.body.style.backgroundColor = "...";`

```{exec} html
:editor: 019f01a0-0503-7503-8503-000000000503
:style: max-height: 22rem;
<!DOCTYPE html>
<html><body>
  <button id="boutonOn">Allumer</button>
  <button id="boutonOff">Éteindre</button>

  <script>
    // Complétez ici

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let boutonOn = document.getElementById("boutonOn");
let boutonOff = document.getElementById("boutonOff");

function allumer() {
    document.body.style.backgroundColor = "yellow";
}

function eteindre() {
    document.body.style.backgroundColor = "black";
}

boutonOn.addEventListener("click", allumer);
boutonOff.addEventListener("click", eteindre);
```
````

### Exercice {num1}`exercice-js`

Le programme ci-dessous contient **3 erreurs** qui l'empêchent de fonctionner.
Corrigez-les pour qu'un clic sur le bouton change le titre en `"Youpi !"`.

```{exec} html
:editor: 019f01a0-0504-7504-8504-000000000504
:style: max-height: 22rem;
<!DOCTYPE html>
<html><body>
  <h1 id="titre">À cliquer</h1>
  <button id="bouton">Go</button>

  <script>
    let titre = document.getElementById(titre);
    let bouton = document.getElementById("bouton");

    function changerTitre() {
        titre.textContent = Youpi !;
    }

    bouton.addEventListener("click", changerTitre());
  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let titre = document.getElementById("titre");
let bouton = document.getElementById("bouton");

function changerTitre() {
    titre.textContent = "Youpi !";
}

bouton.addEventListener("click", changerTitre);
```

Les trois erreurs :
1. `getElementById(titre)` → `getElementById("titre")` : l'`id` doit être une
   **chaîne de caractères**.
2. `Youpi !` → `"Youpi !"` : le texte doit être entouré de **guillemets**.
3. `changerTitre()` → `changerTitre` : on passe la fonction **sans
   parenthèses**, sinon elle s'exécute immédiatement au chargement.
````

### Exercice {num1}`exercice-js`

Créez la page suivante avec un paragraphe et **trois boutons** :

- "Majuscules" met le texte du paragraphe en majuscules
  (`texte.textContent.toUpperCase()`).
- "Minuscules" met le texte en minuscules (`toLowerCase()`).
- "Normal" remet le texte d'origine, `"Bonjour tout le monde"`.

```{exec} html
:editor: 019f01a0-0505-7505-8505-000000000505
:style: max-height: 24rem;
<!DOCTYPE html>
<html><body>
  <p id="texte">Bonjour tout le monde</p>
  <button id="bMaj">Majuscules</button>
  <button id="bMin">Minuscules</button>
  <button id="bNormal">Normal</button>

  <script>
    // Complétez ici

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let texte = document.getElementById("texte");
let bMaj = document.getElementById("bMaj");
let bMin = document.getElementById("bMin");
let bNormal = document.getElementById("bNormal");

function enMajuscules() {
    texte.textContent = texte.textContent.toUpperCase();
}
function enMinuscules() {
    texte.textContent = texte.textContent.toLowerCase();
}
function remettreNormal() {
    texte.textContent = "Bonjour tout le monde";
}

bMaj.addEventListener("click", enMajuscules);
bMin.addEventListener("click", enMinuscules);
bNormal.addEventListener("click", remettreNormal);
```
````

### Exercice {num1}`exercice-js`

Complétez le code pour créer un petit **quiz** :

- un clic sur **"Vrai"** affiche `"Bonne réponse"` dans le paragraphe et le
  met en vert ;
- un clic sur **"Faux"** affiche `"Mauvaise réponse"` et le met en rouge.

```{exec} html
:editor: 019f01a0-0506-7506-8506-000000000506
:style: max-height: 24rem;
<!DOCTYPE html>
<html><body>
  <h2>Le soleil est une étoile ?</h2>
  <button id="bVrai">Vrai</button>
  <button id="bFaux">Faux</button>
  <p id="resultat"></p>

  <script>
    // Complétez ici

  </script>
</body></html>
```

````{solution}
```{code-block} javascript
let bVrai = document.getElementById("bVrai");
let bFaux = document.getElementById("bFaux");
let resultat = document.getElementById("resultat");

function bonneReponse() {
    resultat.textContent = "Bonne réponse";
    resultat.style.color = "green";
}

function mauvaiseReponse() {
    resultat.textContent = "Mauvaise réponse";
    resultat.style.color = "red";
}

bVrai.addEventListener("click", bonneReponse);
bFaux.addEventListener("click", mauvaiseReponse);
```
````
