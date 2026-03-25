<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Mots de passe et hachage

<script src="../../_static/hash-tools.js"></script>
<link rel="stylesheet" href="../../_static/hash-tools.css">

## Stockage des mots de passe

Lorsque vous créez un compte sur un site web, votre mot de passe ne devrait **jamais** être stocké en clair dans la base de données. À la place, on stocke un **hash** (empreinte) du mot de passe, obtenu à l'aide d'une **fonction de hachage**.

Une fonction de hachage prend une entrée de taille quelconque et produit une sortie de taille fixe, appelée **empreinte** ou **hash**. Elle possède les propriétés suivantes :

- **Déterministe** : la même entrée produit toujours le même hash
- **Irréversible** : il est impossible de retrouver l'entrée à partir du hash
- **Sensible** : un changement minime dans l'entrée change complètement le hash
- **Unique** : il est extrêmement improbable que deux entrées différentes produisent le même hash

### Exemple avec SHA-256

**SHA-256** est l'une des fonctions de hachage les plus utilisées. Elle produit une empreinte de 256 bits (64 caractères hexadécimaux).

| Entrée | Hash SHA-256 |
|--------|-------------|
| `hello` | `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824` |
| `Hello` | `185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969` |
| `hello1` | `91e9240f415223982edc345532630710e94a7f52cd5f48f5ee1afc555078f0ab` |

Remarquez qu'un simple changement de majuscule ou l'ajout d'un caractère produit un hash **complètement différent**.

### Vérification d'un mot de passe

Quand vous vous connectez :
1. Vous entrez votre mot de passe
2. Le serveur calcule le hash de ce que vous avez entré
3. Il compare ce hash avec celui stocké dans la base de données
4. Si les deux hash sont identiques, le mot de passe est correct

Le serveur n'a **jamais besoin** de connaître votre mot de passe en clair.

### Outil : Calculer un hash SHA-256

Utilisez l'outil ci-dessous pour calculer le hash SHA-256 de n'importe quel texte.

<div class="hash-tool">
<input type="text" id="hash-input" placeholder="Entrez un texte...">
<button onclick="computeHash()">Calculer le hash</button>
<div class="hash-output" id="hash-output"></div>
</div>

---

## Attaque par force brute

Si un attaquant vole la base de données d'un site web, il obtient les **hash** des mots de passe. Comme le hachage est irréversible, il ne peut pas directement retrouver les mots de passe. Cependant, il peut essayer de **deviner** le mot de passe en testant toutes les combinaisons possibles et en comparant le hash obtenu avec celui volé.

Cette méthode s'appelle une **attaque par force brute**. Elle consiste à tester systématiquement toutes les combinaisons possibles jusqu'à trouver celle qui produit le bon hash.

### Nombre de combinaisons

Le nombre de combinaisons dépend de la **longueur** du mot de passe et du **jeu de caractères** utilisé :

| Jeu de caractères | Taille | 4 caractères | 6 caractères | 8 caractères |
|---|---|---|---|---|
| Chiffres (0-9) | 10 | 10'000 | 1'000'000 | 100'000'000 |
| Minuscules (a-z) | 26 | 456'976 | 308'915'776 | 208'827'064'576 |
| Lettres (a-z, A-Z) | 52 | 7'311'616 | 19'770'609'664 | ~53 billions |
| Lettres + chiffres | 62 | 14'776'336 | 56'800'235'584 | ~218 billions |

Plus le mot de passe est **long** et utilise un **jeu de caractères varié**, plus l'attaque par force brute est difficile.

## Exercices

```{role} input(quiz-input)
:right: width: 18rem; clear: right;
:check: split lowercase
```

### Exercice {num1}`exercice_mdp`

Dans le tableau ci-dessous se trouvent des mots de passe hachés qui ont été volés. Retrouvez-les en les attaquant par force brute à l'aide de l'outil ci-dessous.

Pour chaque hash, le jeu de caractères utilisé ainsi que sa longueur vous sont donnés. Configurez l'attaque en conséquence.

| Hash SHA-256 | Contraintes |
|---|---|
| `4d879f38e01f1abccc8c9f416fdd4c3e66231c227c213fce27c40443a9a7dd5e` | 4 lettres minuscules |
| `c47a3668a2f46bcfac07c3af5f03fff5ebad310ba1c0bc2f766f6d35b2d06b68` | 4 lettres |
| `ca07d995d31e3ff25c84b463694da54fd748d75fcd3af1bed6ffe1c310cdb136` | 5 lettres minuscules |
| `dc1cb35f807dc61b48eb3d2a44b73c9f276deafccc46e3b86c95bbfadd3dd2da` | 5 lettres |
| `535d13b616d4fed002a39980d4aa1456986a369f4f4a201d7357afd00e70d262` | 5 lettres + chiffres |

#### Outil : Attaque par force brute

<div class="bf-grid">
  <label>Hash cible :</label><input type="text" id="bf-hash" placeholder="Collez le hash ici">
  <label>Jeu de caractères :</label>
  <select id="bf-charset">
    <option value="lower">Lettres minuscules (a-z)</option>
    <option value="letters">Lettres (a-z, A-Z)</option>
    <option value="alnum">Lettres + chiffres</option>
  </select>
  <label>Longueur :</label><input type="number" id="bf-len" value="4" min="1" max="6">
</div>
<button class="tool-btn" onclick="startBruteForce()">Lancer l'attaque</button>
<button class="tool-btn" onclick="stopBruteForce()">Arrêter</button>
<div class="tool-progress" id="bf-progress"></div>
<div id="bf-result"></div>

Notez les mots de passe retrouvés ainsi que le temps requis pour chaque attaque. Que constatez-vous ?

### Exercice {num1}`exercice_mdp`

En fonction de vos résultats de l'exercice précédent, quelles caractéristiques donneriez-vous à votre mot de passe pour qu'il reste sécurisé face à une attaque par force brute, même en cas de vol de la base de données ? Donnez 2 caractéristiques.

```{solution}
1. **Longueur** : un mot de passe long augmente exponentiellement le nombre de combinaisons à tester.
2. **Variété de caractères** : utiliser des minuscules, majuscules, chiffres et caractères spéciaux multiplie le nombre de combinaisons possibles.
```

---

## Attaque par dictionnaire

L'attaque par force brute est efficace contre les mots de passe courts, mais devient vite impossible pour les mots de passe longs. Cependant, beaucoup de gens utilisent des **mots courants** comme mot de passe (`password`, `soleil`, `football`...).

Une **attaque par dictionnaire** consiste à tester une liste de mots courants (un « dictionnaire ») plutôt que toutes les combinaisons possibles. Cette approche est **beaucoup plus rapide** car elle ne teste que quelques milliers ou millions de mots, au lieu de milliards de combinaisons.

### Exercice {num1}`exercice_mdp`

Dans le tableau ci-dessous se trouvent des mots de passe hachés qui ont été volés. Retrouvez-les en les attaquant par dictionnaire à l'aide de l'outil ci-dessous.

| Hash SHA-256 |
|---|
| `1f578606eb0a178927deb51f7348e82acf8d711d369f710c7ac202c00d5ce9b8` |
| `5186646859c5b07676015f15c581e2514b2b778309f9422150a6032f826f388e` |
| `4d11818aece668175264af668c9566408e1306260642c7e1a36512c46c65310f` |

#### Outil : Attaque par dictionnaire

<div>
<input type="text" id="dict-hash" class="tool-input-wide" placeholder="Collez le hash ici">
</div>
<button class="tool-btn" onclick="startDictAttack()">Lancer l'attaque</button>
<div class="tool-progress" id="dict-progress"></div>
<div id="dict-result"></div>

Notez les mots de passe retrouvés.

### Exercice {num1}`exercice_mdp`

L'attaque par dictionnaire impose une nouvelle contrainte sur vos mots de passe pour que ceux-ci soient sécurisés. Quelle est cette caractéristique ?

```{solution}
Le mot de passe ne doit **pas être un mot courant** ou une combinaison prévisible. Il faut éviter les mots du dictionnaire, les prénoms, les noms de lieux, les dates, etc. Un bon mot de passe est **aléatoire** ou utilise une **phrase de passe** composée de plusieurs mots sans lien logique.
```

---

## Votre mot de passe est-il sécurisé ?

### Exercice {num1}`exercice_mdp`

1. Utilisez l'outil de hachage SHA-256 en haut de cette page pour calculer le hash d'un de vos mots de passe
2. Essayez de l'attaquer par dictionnaire avec l'outil ci-dessus
3. Votre mot de passe a-t-il été retrouvé ? Si oui, il est temps de le changer !

```{important}
Ne partagez jamais votre mot de passe avec qui que ce soit, même sous forme de hash. Cet exercice est à faire **discrètement** et à titre personnel.
```
