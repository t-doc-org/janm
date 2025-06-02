# TP Découverte JavaScript

## Introduction
Dans le cours d'informatique de 1ère année, vous avez appris les bases des langages HTML et CSS pour créer des pages webs. Cependant, les sites que vous avez créés ne correspondent pas tout à fait à ceux que vous visitez quotidiennement aujourd'hui. En effet, HTML et CSS vous ont permis de créer des pages **statiques**, c'est-à-dire des pages contenant des images, des textes, ou des vidéos, mais sans interactivité avec l'utilisateur. Pour rendre les pages Webs **dynamiques**, et donc y ajouter des fonctionnalités comme des formulaires interactifs, des boutons qui réagissent aux clics, ou des éléments qui se mettent à jour sans recharger la page, il faut utiliser un langage de programmation comme **JavaScript**. Dans ce TP, vous allez donc apprendre les bases de JavaScript pour créer une page Web dynamique.

## Rappels HTML et CSS
Pour commencer à créer une page Web dynamique, il est essentiel que vous vous rappeliez des langages HTML et CSS. La page Web ci-dessous contient les balises HTML essentielles et quelques propriétés CSS pratiques. Cliquez sur le bouton "Play" à côté de ce code pour voir le rendu de la page, puis faites les exercices en dessous.


```{exec} html
:when: load
:editor: de04d58dc5ccc4b9671c3627fb8d626fe4a15810bc1fe3e724feea761965fb71
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page Web</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: lightgrey;
      margin: 20px;
    }

    h1 {
      color: blue;
    }

    p {
      color: red;
    }

  </style>

</head>

<body>

  <h1>Ma page Web en HTML et CSS</h1>
  <p>Ceci est un paragraphe</p>
  <h2>Une image</h2>
  <img src="https://mediasp.twassets.cloud/legacy/2022/8/architecture_270722awi_01.jpg?auto=format%2Ccompress&w=3840&crop=focalpoint%2Ccenter&ar=7%3A4&fit=crop" width="200px">
  <h2>Une liste</h2>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>

</body>
</html>
```

### Exercice 1
 - Changez le titre principal de la page en "Bienvenue"
 - Faites passer la couleur de fond de la page de gris à jaune
 - Le texte "Une image" est actuellement un sous-titre. Changez la balise `h2` afin qu'il devienne également un titre principal
 - Ajoutez une propriété CSS de manière que la liste devienne verte

 ```{solution}
 - `<h1>Bienvenue</h1>`
 - `background-color : white;`
 - `<h2>Une image</h2>`
 - `ul { color : green; }`
 ```

 ## Premiers pas en JavaScript
 Tout comme Python, JavaScript est un langage de programmation. Vous y retrouverez donc les **mêmes** concepts, comme les variables, les branchements conditionnels, les boucles, les listes, les fonctions, ... mais avec une syntaxe différente. Dans ce TP, JavaScript aura également la particularité **d'interagir** avec le HTML et le CSS. Pour ce faire, le code JavaScript peut être ajouté dans une balise `<script>`

 Pour illustrer le fonctionnement de JavaScript, nous allons créer une page Web dynamique avec un bouton et un texte affichant le nombre de fois que ce bouton aura été cliqué. De plus, la couleur de la page changera en fonction du nombre de clics.
 
 Commençons par créer la page statique :

 ```{exec} html
 :output-style: height: 8rem
 :when: load
 :editor: e539a2f323302f80a10f029f795087cabe5b6814574b6dc13382a90fd614d091
 <!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <button id="bouton">Cliquez ici !</button>

  <p>Nombre de clics :</p>
  <p id="compte">0</p>

</body>
</html>
 ```
Notez que dans le code, la balise `<button>` est nommée grâce à l'id `bouton` et le paragraphe contenant le 0 par l'id `compte`


Pour l'instant, il est normal qu'un clic sur ce bouton ne modifie rien. Pour cela, nous allons ajouter, avant la fermeture du `<body>` la balise `<script>` et écrire le code JavaScript approprié à l'intérieur.

Nous allons commencer par y récupérer les balises HTML qui nous intéressent, c'est-à-dire les balises du bouton et du paragraphe compteur qui ont été nommées par les id précédemment, et les stocker dans des variables du même nom. La création de variable fonctionne comme en Python, en écrivant son nom, suivi d'un `=` puis de sa valeur.

```{code} javascript
//Récupère la balise avec l'id "bouton"
bouton = document.querySelector("#bouton")
//Récupère la balise avec l'id "compte"
compte = document.querySelector("#compte")
```
Puis, nous allons définir une fonction qui sera exécutée quand on clique sur le bouton. Contrairement à Python, pour définir une fonction on utilise pas le mot-clef `def`, mais `function`. De plus, le contenu d'une fonction est ajouté entre une paire de crochet.

```{code} javascript
bouton = document.querySelector("#bouton")
compte = document.querySelector("#compte")

function ajouter(){
    ... //code de la fonction ajouter
}

 //Demande d'exécuter la fonction ajouter quand on clique sur le bouton
bouton.addEventListener("click", ajouter)
```

Nous allons maintenant compléter le code de la fonction `ajouter()`. Celle-ci doit simplement ajouter 1 à un compteur, et l'afficher dans le paragraphe approprié. Nous allons donc créer une variable tenant le compte de clic et l'initialiser. Puis, dans la fonction, nous allons l'augmenter de 1 et changer le texte du paragraphe `compte`.

```{code} javascript
bouton = document.querySelector("#bouton")
compte = document.querySelector("#compte")
//Initialise une variable à 0
compteur = 0

function ajouter(){
    //Ajoute 1 à la variable compteur
    compteur += 1
    //Donne la valeur du compteur au texte du paragraphe compte
    compte.text = compteur
}

bouton.addEventListener("click", ajouter)
```

Ce code peut maintenant être ajouté au bas de notre page HTML, dans une balise `<script>` :

 ```{exec} html
 :output-style: height: 8rem
 :when: load
 :editor: 6effc5f5355aac32d84b1a2f43564a693a97c6f095eb1bb860d1c4df2bd99b80
 <!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <button id="bouton">Cliquez ici !</button>

  <p>Nombre de clics :</p>
  <p id="compte">0</p>
<script>

bouton = document.querySelector("#bouton")
compte = document.querySelector("#compte")
compteur = 0

function ajouter(){
    compteur += 1
    compte.innerText = compteur
}

bouton.addEventListener("click", ajouter)

</script>
</body>
</html>
 ```

 ## Exercice 2
 Le bouton actuel permet d'ajouter 1 au compte. Inspirez vous de ce code pour ajouter un nouveau bouton permettant d'ajouter 10 au compte dans le code ci-dessus. Pour cela, suivez ces étapes :

 - Ajouter une nouvelle balise `<button>` avec un id **différent** du premier bouton
 - Dans le JavaScript, récupérez ce nouveau bouton dans une variable nommée `boutonDix`
 - Créez une nouvelle fonction `ajouterDix()` et liez la à `boutonDix` quand on clique dessus
 - Dans le contenu de `ajouterDix()` faites en sorte que 10 soit ajouté au compteur, et que ce résultat soit affiché dans le paragraphe `compte`.

## Branchements conditionnels
Tout comme en Python, on peut écrire des branchements conditionnels avec `if` en JavaScript. Nous allons les utiliser pour effectuer différentes actions en fonction du nombre de clics.

Observez la différence de syntaxe entre les deux langages :

<table><tr style="text-align: center">
  <th>Python</th><th>JavaScript</th>
</tr><tr><td>

```{exec} python
:when: never
if compte <= 10:
    ...
elif compte <= 20:
    ...
else:
    ...
```

</td><td style="padding-left: 1rem">

```{exec} html
:when: never
<script>
if(compte <= 10){
    ...
}
else if(compte <= 20){
    ...
}
else{
    ...
}
</script>
```
</td></tr></table>

## Exercice 3
Avec JavaScript, vous pouvez également modifier le style de la page en intéragissant avec CSS. La ligne suivante permet par exemple de changer la couleur du fond de la page en bleu.

```{code} javascript
document.body.style.backgroundColor = "blue";
```

En utilisant les branchements conditionnels, modifiez votre page de l'exercice précédent de manière à ce que :
 - De 1 à 10 clics, le fond de la page devient gris
 - De 11 à 30 clics, le fond devient jaune
 - A partir de 31 clics, le fond devient vert.

 ## Exercice 4
 Pour terminer cette introduction à JavaScript, implémentez une (ou plusieurs si vous avez le temps) des fonctionnalités suivantes à votre page :

 - Ajout d'un bouton `Reset` qui remet le compteur à 0, ainsi que la page en blanc.
 - Ajout d'un bouton `Retirer` qui retire 1 au compteur, et qui met à jour les couleurs de fond.
 - Ajout d'un texte d'avertissement qui apparaît lorsque l'utilisateur dépasse les 50 clics