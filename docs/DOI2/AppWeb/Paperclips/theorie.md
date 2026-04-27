<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Complément théorique

Pour ce TP, vous aurez besoin de deux nouveautés JavaScript que nous n'avons pas vues dans le cours.

## Exécuter du code régulièrement : `setInterval`

Pour qu'un assistant fabrique des trombones automatiquement, on a besoin d'exécuter du code **toutes les secondes** sans que le joueur ne fasse rien. La fonction `setInterval` est faite pour ça :

```{code-block} javascript
setInterval(maFonction, 1000);
```

Cela signifie : « toutes les **1000 millisecondes** (= 1 seconde), exécute `maFonction` ». Comme avec `addEventListener`, on passe le **nom de la fonction sans parenthèses**.

```{exec} html
:editor: 019f01a0-0800-7800-8800-000000000800
:style: max-height: 18rem;
:output-style: height: 4rem;
<!DOCTYPE html>
<html><body>
  <p id="compteur">0</p>
  <script>
    let n = 0;
    let affichage = document.getElementById("compteur");

    function incrementer() {
        n = n + 1;
        affichage.textContent = n;
    }

    setInterval(incrementer, 1000);
  </script>
</body></html>
```

Lancez le code ci-dessus : le nombre s'incrémente tout seul, une fois par seconde.

## Tirer un nombre au hasard : `Math.random` et `Math.floor`

Pour les mini-jeux, on aura besoin du **hasard**. JavaScript fournit la fonction `Math.random()` qui renvoie un nombre **entre 0 (inclus) et 1 (exclu)** :

```{code-block} javascript
let r = Math.random();   // par exemple 0.7321...
```

Pour faire un tirage avec 50% de chances, on peut écrire :

```{code-block} javascript
if (Math.random() < 0.5) {
    console.log("Pile");
} else {
    console.log("Face");
}
```

Pour obtenir un **nombre entier** entre 0 et 9 (inclus), on multiplie par 10 puis on arrondit vers le bas avec `Math.floor` :

```{code-block} javascript
let entier = Math.floor(Math.random() * 10);  // entier de 0 à 9
```

```{exec} html
:editor: 019f01a0-0801-7801-8801-000000000801
:style: max-height: 18rem;
:output-style: height: 4rem;
<!DOCTYPE html>
<html><body>
  <button id="lancer">Lancer un dé à 6 faces</button>
  <p id="resultat">?</p>
  <script>
    let bouton = document.getElementById("lancer");
    let resultat = document.getElementById("resultat");

    function lancer() {
        let de = Math.floor(Math.random() * 6) + 1;
        resultat.textContent = de;
    }

    bouton.addEventListener("click", lancer);
  </script>
</body></html>
```
