<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Création de l'usine à trombones

Lisez chaque étape et complétez progressivement le code dans l'éditeur ci-dessous. Testez votre jeu après chaque étape avant de passer à la suivante.

````{tab-set}
:sync-group: etape

```{tab-item} 1
:sync: etape1
**Structure HTML.** Mettez en place les éléments de la page :

- Un titre `<h1>` avec le nom du jeu.
- Un paragraphe affichant `Trombones :` suivi d'un `<span id="nbTrombones">0</span>`. Un `span` permet d'insérer un texte modifiable au milieu d'une phrase, sans passer à la ligne.
- Un bouton `<button id="btnFabriquer">Fabriquer un trombone</button>`.
- Une balise `<script>` vide juste avant `</body>`.

À ce stade, le bouton n'a aucun effet : c'est normal, il n'y a pas encore de JavaScript.
```

```{tab-item}  2
:sync: etape2
**Production manuelle.** Faites en sorte qu'un clic sur le bouton augmente le compteur de 1.

Dans la balise `<script>` :

1. Récupérez le bouton et le `<span>` du compteur avec `document.getElementById(...)` et stockez-les dans des variables.
2. Créez une variable `let nbTrombones = 0;`.
3. Définissez une fonction `fabriquer()` qui :
   - augmente `nbTrombones` de 1 ;
   - met à jour le `textContent` du `<span>` compteur.
4. Liez la fonction au bouton avec `addEventListener("click", fabriquer)`.

Vous devriez maintenant pouvoir cliquer sur le bouton et voir le compteur augmenter.
```

```{tab-item}   3
:sync: etape3
**Boutique : acheter un assistant.** Les assistants vont nous servir à produire des trombones automatiquement, mais d'abord il faut pouvoir les acheter.

Dans le HTML, ajoutez :

- Un sous-titre `<h2>Boutique</h2>`.
- Un paragraphe `Assistants : <span id="nbAssistants">0</span>`.
- Un bouton `<button id="btnAssistant">Acheter un assistant (10 trombones)</button>`.

Dans le JavaScript :

1. Récupérez les nouvelles balises.
2. Créez `let nbAssistants = 0;`.
3. Écrivez une fonction `acheterAssistant()` qui :
   - vérifie avec un `if` que `nbTrombones >= 10` ;
   - si oui, retire 10 à `nbTrombones`, ajoute 1 à `nbAssistants`, et met à jour les **deux** affichages.
4. Liez le bouton à la fonction.

Cliquez 10 fois sur "Fabriquer", puis sur "Acheter un assistant" : le compteur de trombones doit retomber à 0 et celui des assistants passer à 1.
```

```{tab-item}   4
:sync: etape4
**Production automatique avec `setInterval`.** Vos assistants ne servent encore à rien : faisons-les travailler !

1. Définissez une nouvelle fonction `productionAutomatique()` qui :
   - ajoute `nbAssistants` à `nbTrombones` ;
   - met à jour l'affichage du compteur.
2. À la fin de votre script (après les `addEventListener`), écrivez `setInterval(productionAutomatique, 1000)`.

Achetez maintenant un assistant : vous devriez voir les trombones augmenter tout seuls, 1 par seconde. Achetez-en plusieurs et observez la production accélérer.
```

```{tab-item}   5
:sync: etape5
**Une vraie usine.** Une usine est plus chère qu'un assistant, mais produit beaucoup plus.

Dans le HTML, ajoutez :

- Un paragraphe `Usines : <span id="nbUsines">0</span>`.
- Un bouton `<button id="btnUsine">Acheter une usine (100 trombones)</button>`.

Dans le JavaScript :

1. Récupérez les nouvelles balises et créez `let nbUsines = 0;`.
2. Écrivez `acheterUsine()`, sur le même modèle que `acheterAssistant()` mais avec un coût de 100.
3. **Modifiez** `productionAutomatique()` pour qu'elle ajoute `nbAssistants + nbUsines * 5` à chaque seconde : chaque usine produit 5 trombones par seconde.
4. Liez le bouton à la fonction.
```

```{tab-item}   6
:sync: etape6
**Améliorer le clic.** Cliquer ne rapporte qu'un seul trombone : c'est faible. Ajoutons une amélioration.

Dans le HTML, ajoutez :

- Un paragraphe `Puissance du clic : <span id="puissanceClic">1</span>`.
- Un bouton `<button id="btnUpgrade">Améliorer le clic (50 trombones)</button>`.

Dans le JavaScript :

1. Récupérez les nouvelles balises et créez `let puissanceClic = 1;`.
2. **Modifiez** `fabriquer()` pour qu'elle ajoute `puissanceClic` à `nbTrombones` au lieu de 1.
3. Écrivez `ameliorerClic()` qui, si on a 50 trombones, en retire 50 et ajoute 1 à `puissanceClic`. N'oubliez pas de mettre à jour les deux affichages concernés.
4. Liez le bouton à la fonction.
```

```{tab-item}   7
:sync: etape7
**Mini-jeu de la chance.** Un bouton qui, contre 5 trombones, donne 50% de chances de gagner 20 trombones (et 50% de tout perdre).

Dans le HTML, ajoutez :

- Un sous-titre `<h2>Mini-jeu</h2>`.
- Un bouton `<button id="btnChance">Tente ta chance ! (5 trombones)</button>`.
- Un paragraphe vide `<p id="resultatChance"></p>` qui affichera le résultat.

Dans le JavaScript :

1. Récupérez les nouvelles balises.
2. Écrivez une fonction `tenterChance()` qui :
   - vérifie qu'on a au moins 5 trombones ;
   - retire 5 trombones ;
   - tire un nombre avec `Math.random()` ;
   - si le tirage est inférieur à `0.5`, ajoute 20 trombones et affiche `"Gagné ! +20 trombones"` dans le paragraphe résultat ;
   - sinon, affiche `"Perdu ! Réessaie."` ;
   - met à jour l'affichage du compteur de trombones.
3. Liez le bouton à la fonction.
```

```{tab-item}   8
:sync: etape8
**Mise en forme CSS.** Pour finir cette première partie, ajoutez quelques règles CSS dans une balise `<style>` placée dans le `<head>` afin que votre jeu soit agréable à regarder. Par exemple :

- Centrer le contenu de la page (`text-align: center`).
- Donner une couleur de fond à la page (`background-color`).
- Agrandir les boutons et leur donner une couleur (`font-size`, `padding`, `background-color`).
- Mettre les valeurs des compteurs en gras (`font-weight: bold`).
```
````

```{exec} html
:editor: 019f01a0-0810-7810-8810-000000000810
:style: max-height: 35rem;
:output-style: height: 40rem;
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>L'usine de trombones</title>
</head>
<body>

  <!-- Construisez votre jeu ici, étape par étape -->


</body>
</html>
```

````{solution}
```{code-block} html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>L'usine de trombones</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; background: #eef; }
    button { font-size: 1rem; padding: 0.5rem 1rem; margin: 0.3rem; }
    span { font-weight: bold; }
  </style>
</head>
<body>

  <h1>L'usine de trombones</h1>

  <p>Trombones : <span id="nbTrombones">0</span></p>
  <button id="btnFabriquer">Fabriquer un trombone</button>

  <h2>Boutique</h2>
  <p>Assistants : <span id="nbAssistants">0</span></p>
  <button id="btnAssistant">Acheter un assistant (10 trombones)</button>

  <p>Usines : <span id="nbUsines">0</span></p>
  <button id="btnUsine">Acheter une usine (100 trombones)</button>

  <p>Puissance du clic : <span id="puissanceClic">1</span></p>
  <button id="btnUpgrade">Améliorer le clic (50 trombones)</button>

  <h2>Mini-jeu</h2>
  <button id="btnChance">Tente ta chance ! (5 trombones)</button>
  <p id="resultatChance"></p>

  <script>
    let nbTrombones = 0;
    let nbAssistants = 0;
    let nbUsines = 0;
    let puissanceClic = 1;

    let affTrombones = document.getElementById("nbTrombones");
    let affAssistants = document.getElementById("nbAssistants");
    let affUsines = document.getElementById("nbUsines");
    let affPuissance = document.getElementById("puissanceClic");
    let resultatChance = document.getElementById("resultatChance");

    let btnFabriquer = document.getElementById("btnFabriquer");
    let btnAssistant = document.getElementById("btnAssistant");
    let btnUsine = document.getElementById("btnUsine");
    let btnUpgrade = document.getElementById("btnUpgrade");
    let btnChance = document.getElementById("btnChance");

    function fabriquer() {
        nbTrombones = nbTrombones + puissanceClic;
        affTrombones.textContent = nbTrombones;
    }

    function acheterAssistant() {
        if (nbTrombones >= 10) {
            nbTrombones = nbTrombones - 10;
            nbAssistants = nbAssistants + 1;
            affTrombones.textContent = nbTrombones;
            affAssistants.textContent = nbAssistants;
        }
    }

    function acheterUsine() {
        if (nbTrombones >= 100) {
            nbTrombones = nbTrombones - 100;
            nbUsines = nbUsines + 1;
            affTrombones.textContent = nbTrombones;
            affUsines.textContent = nbUsines;
        }
    }

    function ameliorerClic() {
        if (nbTrombones >= 50) {
            nbTrombones = nbTrombones - 50;
            puissanceClic = puissanceClic + 1;
            affTrombones.textContent = nbTrombones;
            affPuissance.textContent = puissanceClic;
        }
    }

    function productionAutomatique() {
        nbTrombones = nbTrombones + nbAssistants + nbUsines * 5;
        affTrombones.textContent = nbTrombones;
    }

    function tenterChance() {
        if (nbTrombones >= 5) {
            nbTrombones = nbTrombones - 5;
            if (Math.random() < 0.5) {
                nbTrombones = nbTrombones + 20;
                resultatChance.textContent = "Gagné ! +20 trombones";
            } else {
                resultatChance.textContent = "Perdu ! Réessaie.";
            }
            affTrombones.textContent = nbTrombones;
        }
    }

    btnFabriquer.addEventListener("click", fabriquer);
    btnAssistant.addEventListener("click", acheterAssistant);
    btnUsine.addEventListener("click", acheterUsine);
    btnUpgrade.addEventListener("click", ameliorerClic);
    btnChance.addEventListener("click", tenterChance);

    setInterval(productionAutomatique, 1000);
  </script>
</body>
</html>
```
````

## Partie 2 : Fonctionnalités intermédiaires

Les fonctionnalités de la partie 2 valent au maximum **10 points**. Choisissez librement des éléments dans la liste suivante de manière à atteindre 10 points.

- **(2 pts) Bouton "Reset".** Ajoutez un bouton qui remet `nbTrombones`, `nbAssistants`, `nbUsines` et `puissanceClic` à leur valeur de départ et met à jour tous les affichages.
- **(3 pts) Méga-usine.** Ajoutez un troisième niveau de production : une "méga-usine" qui coûte 1000 trombones et produit 50 trombones par seconde.
- **(2 pts) Couleur de fond évolutive.** Selon le nombre de trombones, changez la couleur de fond de la page avec un `if/else if/else` dans `productionAutomatique()` (par exemple : blanc < 50, jaune < 500, orange < 5000, rouge ensuite).
- **(3 pts) Total produit.** Ajoutez un compteur séparé `totalProduit` qui n'est **jamais** dépensé : il enregistre tous les trombones jamais fabriqués. Affichez-le sous le compteur de trombones actuels.
- **(3 pts) Achievements.** À chaque palier atteint (100, 1000, 10 000 trombones produits), affichez un message de félicitations dans un paragraphe dédié.
- **(2 pts) Désactivation visuelle.** Quand un bouton d'achat n'est pas utilisable (pas assez de trombones), changez sa couleur en gris (`style.backgroundColor = "grey"`). Remettez-la à la normale quand l'achat redevient possible. Mettez à jour ces couleurs dans `productionAutomatique()`.
- **(2 pts) Affichage visuel des assistants et usines.** En plus du nombre, affichez visuellement chaque assistant et chaque usine par une marque dans un paragraphe dédié (par exemple `[A]` pour un assistant et `[U]` pour une usine). À chaque achat, ajoutez la marque correspondante avec `paragraphe.textContent = paragraphe.textContent + "[A]"`.
- **(3 pts) Inflation des prix.** À chaque achat, augmentez le prix du composant de 50% (l'assistant passe à 15, puis 22, puis 33, ...). Mettez à jour le texte du bouton à chaque fois.
- **(2 pts) Vitesse de production.** Affichez en direct la vitesse de production sous la forme "X trombones / seconde". Mettez à jour cet affichage dans `productionAutomatique()`.
- **(2 pts) Animation au clic.** À chaque clic sur "Fabriquer", changez brièvement la couleur du bouton (par exemple en vert), puis remettez-la à la normale après 200 ms. Utilisez `setTimeout(maFonction, 200)` pour cela.
- **(2 pts) Statistiques.** Affichez deux compteurs supplémentaires : le nombre de clics manuels effectués et le nombre d'achats réalisés (tous types confondus).
- **(3 pts) Bonus de bienvenue.** Pendant les 30 premières secondes de la partie, la production automatique est doublée. Affichez un message indiquant que le bonus est actif. Utilisez `setTimeout` pour le désactiver après 30 secondes.
- **(2 pts) Niveau du joueur.** Affichez le titre du joueur selon son total de trombones : "Apprenti" (< 100), "Artisan" (< 1000), "Expert" (< 10 000), "Maître" (au-delà).
- **(2 pts) Temps de jeu.** Affichez le temps écoulé depuis le début de la partie (en secondes). Utilisez un `setInterval` qui incrémente une variable `tempsEcoule` toutes les secondes.
- **(2 pts) Message d'encouragement.** Toutes les 10 secondes, un message d'encouragement aléatoire est affiché dans un paragraphe (par exemple : "Continue !", "Tu es au top !", "Encore un effort !"). Choisissez le message avec `Math.random()`.
- **(3 pts) Mini-jeu Pile ou Face.** Un bouton "Pile ou Face" qui, contre 10 trombones, demande à l'utilisateur via `prompt()` "pile" ou "face". Si la réponse est juste, gagne 25 trombones, sinon perd la mise.

## Partie 3 : Fonctionnalités avancées

Les fonctionnalités de la partie 3 valent au maximum **10 points**. Cette partie est très peu guidée : libre à vous d'imaginer des fonctionnalités amusantes en respectant les contraintes du cours.

- **(3 pts) Système de victoire.** À 10 000 trombones, affichez un grand message de victoire et désactivez tous les boutons (`bouton.disabled = true`).
- **(4 pts) Bonus temporaire.** Un bouton "Boost" qui, contre 200 trombones, double la production automatique pendant 10 secondes. Utilisez `setTimeout(maFonction, 10000)` qui exécute une fonction **une seule fois** après le délai indiqué (en millisecondes).
- **(3 pts) Mini-jeu de devinette.** Un bouton qui demande à l'utilisateur (via `prompt()`) un nombre entre 1 et 5. Si le nombre correspond au tirage aléatoire, on gagne 100 trombones, sinon rien.
- **(4 pts) Mini-jeu de clic rapide.** Un bouton "Défi 5 secondes" qui lance un mini-jeu : l'utilisateur a 5 secondes pour cliquer un maximum de fois. Le score final est ajouté à `nbTrombones`.
- **(3 pts) Trombones surprises.** Toutes les 30 secondes, un bouton bonus apparaît brièvement dans la page. Cliquer dessus avant qu'il ne disparaisse donne un gros bonus.
- **(5 pts) Prestige.** Un bouton "Recommencer (x2)" qui n'apparaît qu'à partir de 5000 trombones. L'activer remet tous les compteurs à zéro mais double définitivement la production future via un multiplicateur permanent.
- **(4 pts) Mini-jeu de calcul mental.** Un bouton qui affiche une opération aléatoire (par exemple `7 + 5`) et demande la réponse via `prompt()`. Si correcte, +50 trombones, sinon rien.
- **(4 pts) Mini-jeu Pierre-Feuille-Ciseaux.** Un bouton qui demande "pierre", "feuille" ou "ciseaux" via `prompt()`, et qui tire au hasard un choix pour l'ordinateur. Si le joueur gagne, +30 trombones. En cas d'égalité, rien. Si l'ordinateur gagne, -10 trombones.
- **(3 pts) Catastrophe aléatoire.** Toutes les minutes, 10% de chance qu'une catastrophe survienne et fasse perdre 20% des trombones. Affichez un message d'avertissement quand cela arrive.
- **(4 pts) Système de quêtes.** Affichez 3 objectifs simultanés (par exemple "Produire 200 trombones", "Acheter 3 assistants", "Atteindre 5 d'amélioration de clic"). Quand un objectif est rempli, donnez une récompense et tirez un nouvel objectif au hasard.
- **(3 pts) Système de combo.** Quand le joueur clique plusieurs fois en moins d'une seconde, un compteur de combo augmente. Plus le combo est élevé, plus chaque clic rapporte de trombones (multiplicateur de combo). Le combo retombe à 0 si plus d'une seconde sépare deux clics.
- **(5 pts) Boss du chaos.** À partir de 5000 trombones, un boss apparaît : un bouton "Vaincre le boss" qui doit être cliqué 50 fois en 10 secondes. En cas de réussite, +1000 trombones. En cas d'échec, perte de 500 trombones.
- **(3 pts) Mini-jeu de réflexes.** Toutes les 10 secondes, un bouton bonus apparaît à un endroit aléatoire de la page (utilisez `style.position = "absolute"`, `style.left` et `style.top` avec des valeurs construites avec `Math.random()`). Cliquer dessus dans les 5 secondes donne 100 trombones.
