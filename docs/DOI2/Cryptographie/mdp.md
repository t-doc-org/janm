<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Mots de passe et hachage

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

<style>
  .hash-tool input[type="text"], .hash-tool textarea { padding: 6px 10px; font-size: 14px; font-family: monospace; width: 100%; box-sizing: border-box; }
  .hash-tool button { margin-top: 8px; padding: 8px 20px; font-size: 14px; cursor: pointer; }
  .hash-tool .hash-output { margin-top: 8px; padding: 10px; background: #f0f0f0; border-radius: 6px; font-family: monospace; word-break: break-all; min-height: 1.5em; }
  .bf-grid { display: grid; grid-template-columns: auto 1fr; gap: 6px 10px; align-items: center; max-width: 500px; }
  .bf-grid input, .bf-grid select { padding: 4px 8px; font-size: 14px; font-family: monospace; }
  .bf-result { margin-top: 12px; padding: 10px; border-radius: 6px; font-weight: bold; }
  .bf-ok { background: #d4edda; color: #155724; }
  .bf-err { background: #f8d7da; color: #721c24; }
  .bf-info { background: #d1ecf1; color: #0c5460; }
  .bf-progress { margin-top: 8px; font-family: monospace; font-size: 13px; }
</style>

<div class="hash-tool">
<input type="text" id="hash-input" placeholder="Entrez un texte...">
<button onclick="computeHash()">Calculer le hash</button>
<div class="hash-output" id="hash-output"></div>
</div>

<script>
// SHA-256 synchrone en pur JS (pas d'async, pas de Web Crypto API)
const SHA256 = (() => {
  const K = new Uint32Array([
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
  ]);
  function rotr(n, x) { return (x >>> n) | (x << (32 - n)); }
  function hash(msg) {
    // Encode string to bytes
    const bytes = [];
    for (let i = 0; i < msg.length; i++) {
      const c = msg.charCodeAt(i);
      if (c < 0x80) bytes.push(c);
      else if (c < 0x800) { bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f)); }
      else { bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f)); }
    }
    const len = bytes.length;
    // Padding
    bytes.push(0x80);
    while ((bytes.length % 64) !== 56) bytes.push(0);
    const bits = len * 8;
    // Append length as 64-bit big-endian
    for (let i = 56; i >= 0; i -= 8) bytes.push((bits / Math.pow(2, i)) & 0xff);

    let h0=0x6a09e667, h1=0xbb67ae85, h2=0x3c6ef372, h3=0xa54ff53a;
    let h4=0x510e527f, h5=0x9b05688c, h6=0x1f83d9ab, h7=0x5be0cd19;
    const w = new Uint32Array(64);

    for (let off = 0; off < bytes.length; off += 64) {
      for (let i = 0; i < 16; i++)
        w[i] = (bytes[off+i*4]<<24)|(bytes[off+i*4+1]<<16)|(bytes[off+i*4+2]<<8)|bytes[off+i*4+3];
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(7,w[i-15]) ^ rotr(18,w[i-15]) ^ (w[i-15]>>>3);
        const s1 = rotr(17,w[i-2]) ^ rotr(19,w[i-2]) ^ (w[i-2]>>>10);
        w[i] = (w[i-16] + s0 + w[i-7] + s1) | 0;
      }
      let a=h0,b=h1,c=h2,d=h3,e=h4,f=h5,g=h6,h=h7;
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(6,e) ^ rotr(11,e) ^ rotr(25,e);
        const ch = (e & f) ^ (~e & g);
        const t1 = (h + S1 + ch + K[i] + w[i]) | 0;
        const S0 = rotr(2,a) ^ rotr(13,a) ^ rotr(22,a);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) | 0;
        h=g; g=f; f=e; e=(d+t1)|0; d=c; c=b; b=a; a=(t1+t2)|0;
      }
      h0=(h0+a)|0; h1=(h1+b)|0; h2=(h2+c)|0; h3=(h3+d)|0;
      h4=(h4+e)|0; h5=(h5+f)|0; h6=(h6+g)|0; h7=(h7+h)|0;
    }
    return [h0,h1,h2,h3,h4,h5,h6,h7].map(v=>(v>>>0).toString(16).padStart(8,'0')).join('');
  }
  return hash;
})();

function computeHash() {
  const input = document.getElementById('hash-input').value;
  if (!input) { document.getElementById('hash-output').textContent = ''; return; }
  document.getElementById('hash-output').textContent = SHA256(input);
}
</script>

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
  <label>Hash cible :</label><input type="text" id="bf-hash" style="width: 100%;" placeholder="Collez le hash ici">
  <label>Jeu de caractères :</label>
  <select id="bf-charset">
    <option value="lower">Lettres minuscules (a-z)</option>
    <option value="letters">Lettres (a-z, A-Z)</option>
    <option value="alnum">Lettres + chiffres</option>
  </select>
  <label>Longueur :</label><input type="number" id="bf-len" value="4" min="1" max="6" style="width: 80px;">
</div>
<button style="margin-top: 10px; padding: 8px 20px; font-size: 14px; cursor: pointer;" onclick="startBruteForce()">Lancer l'attaque</button>
<button style="margin-top: 10px; padding: 8px 20px; font-size: 14px; cursor: pointer;" onclick="stopBruteForce()">Arrêter</button>
<div class="bf-progress" id="bf-progress"></div>
<div id="bf-result"></div>

<script>
let bfRunning = false;
const CHARSETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alnum: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
};

function stopBruteForce() { bfRunning = false; }

async function startBruteForce() {
  const target = document.getElementById('bf-hash').value.trim().toLowerCase();
  const charset = CHARSETS[document.getElementById('bf-charset').value];
  const len = parseInt(document.getElementById('bf-len').value);
  const progress = document.getElementById('bf-progress');
  const result = document.getElementById('bf-result');

  if (!target || target.length !== 64) {
    result.className = 'bf-result bf-err';
    result.textContent = 'Veuillez entrer un hash SHA-256 valide (64 caractères hexadécimaux).';
    return;
  }

  bfRunning = true;
  result.className = 'bf-result bf-info';
  result.textContent = 'Attaque en cours...';
  await new Promise(r => setTimeout(r, 0));
  const start = performance.now();
  let count = 0;
  const total = Math.pow(charset.length, len);
  const indices = new Array(len).fill(0);
  const BATCH = 50000;

  while (bfRunning) {
    // Boucle serrée synchrone — pas d'await dans le batch
    for (let b = 0; b < BATCH; b++) {
      let word = '';
      for (let i = 0; i < len; i++) word += charset[indices[i]];
      count++;

      if (SHA256(word) === target) {
        const elapsed = ((performance.now() - start) / 1000).toFixed(1);
        result.className = 'bf-result bf-ok';
        result.textContent = '✓ Mot de passe trouvé : ' + word + ' (en ' + elapsed + 's, ' + count.toLocaleString('fr-CH') + ' essais)';
        progress.textContent = '';
        bfRunning = false;
        return;
      }

      let pos = len - 1;
      while (pos >= 0) {
        indices[pos]++;
        if (indices[pos] < charset.length) break;
        indices[pos] = 0;
        pos--;
      }
      if (pos < 0) { bfRunning = false; break; }
    }

    // Rendre la main au navigateur pour l'UI
    const elapsed = ((performance.now() - start) / 1000).toFixed(1);
    const rate = Math.round(count / (performance.now() - start) * 1000);
    progress.textContent = count.toLocaleString('fr-CH') + ' / ' + total.toLocaleString('fr-CH') + ' (' + rate.toLocaleString('fr-CH') + ' hash/s, ' + elapsed + 's)';
    await new Promise(r => setTimeout(r, 0));
  }

  if (count >= total) {
    const elapsed = ((performance.now() - start) / 1000).toFixed(1);
    result.className = 'bf-result bf-err';
    result.textContent = '✗ Mot de passe non trouvé (' + count.toLocaleString('fr-CH') + ' combinaisons testées en ' + elapsed + 's).';
  } else {
    result.className = 'bf-result bf-err';
    result.textContent = 'Attaque arrêtée (' + count.toLocaleString('fr-CH') + ' combinaisons testées).';
  }
  progress.textContent = '';
  bfRunning = false;
}
</script>

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
<input type="text" id="dict-hash" style="padding: 6px 10px; font-size: 14px; font-family: monospace; width: 100%; box-sizing: border-box;" placeholder="Collez le hash ici">
</div>
<button style="margin-top: 8px; padding: 8px 20px; font-size: 14px; cursor: pointer;" onclick="startDictAttack()">Lancer l'attaque</button>
<div class="bf-progress" id="dict-progress"></div>
<div id="dict-result"></div>

<script>
let dictLoaded = null;

async function loadDictionary() {
  if (dictLoaded) return dictLoaded;
  const progress = document.getElementById('dict-progress');
  progress.textContent = 'Chargement du dictionnaire (10\'000 mots)...';
  const resp = await fetch('../../_static/passwords-10000.txt');
  if (!resp.ok) throw new Error('Échec du chargement');
  const text = await resp.text();
  dictLoaded = text.split('\n').map(w => w.trim()).filter(w => w.length > 0);
  progress.textContent = '';
  return dictLoaded;
}

async function startDictAttack() {
  const target = document.getElementById('dict-hash').value.trim().toLowerCase();
  const progress = document.getElementById('dict-progress');
  const result = document.getElementById('dict-result');

  if (!target || target.length !== 64) {
    result.className = 'bf-result bf-err';
    result.textContent = 'Veuillez entrer un hash SHA-256 valide (64 caractères hexadécimaux).';
    return;
  }

  let dictionary;
  try {
    dictionary = await loadDictionary();
  } catch (e) {
    result.className = 'bf-result bf-err';
    result.textContent = 'Impossible de charger le dictionnaire.';
    progress.textContent = '';
    return;
  }

  result.className = 'bf-result bf-info';
  result.textContent = 'Attaque en cours (' + dictionary.length.toLocaleString('fr-CH') + ' mots)...';
  await new Promise(r => setTimeout(r, 0));
  const start = performance.now();

  // Boucle synchrone avec SHA256 pur JS
  const BATCH = 5000;
  for (let offset = 0; offset < dictionary.length; offset += BATCH) {
    const end = Math.min(offset + BATCH, dictionary.length);
    for (let i = offset; i < end; i++) {
      if (SHA256(dictionary[i]) === target) {
        const elapsed = ((performance.now() - start) / 1000).toFixed(2);
        result.className = 'bf-result bf-ok';
        result.textContent = '✓ Mot de passe trouvé : ' + dictionary[i] + ' (en ' + elapsed + 's, ' + (i + 1).toLocaleString('fr-CH') + ' essais)';
        progress.textContent = '';
        return;
      }
    }
    progress.textContent = end.toLocaleString('fr-CH') + ' / ' + dictionary.length.toLocaleString('fr-CH') + ' mots testés...';
    await new Promise(r => setTimeout(r, 0));
  }

  const elapsed = ((performance.now() - start) / 1000).toFixed(2);
  result.className = 'bf-result bf-err';
  result.textContent = '✗ Mot de passe non trouvé dans le dictionnaire (' + dictionary.length.toLocaleString('fr-CH') + ' mots testés en ' + elapsed + 's).';
  progress.textContent = '';
}
</script>

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
