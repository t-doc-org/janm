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
    const bytes = [];
    for (let i = 0; i < msg.length; i++) {
      const c = msg.charCodeAt(i);
      if (c < 0x80) bytes.push(c);
      else if (c < 0x800) { bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f)); }
      else { bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f)); }
    }
    const len = bytes.length;
    bytes.push(0x80);
    while ((bytes.length % 64) !== 56) bytes.push(0);
    const bits = len * 8;
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

// --- Outil de hachage ---
function computeHash() {
  const input = document.getElementById('hash-input').value;
  if (!input) { document.getElementById('hash-output').textContent = ''; return; }
  document.getElementById('hash-output').textContent = SHA256(input);
}

// --- Attaque par force brute ---
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

// --- Attaque par dictionnaire ---
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
