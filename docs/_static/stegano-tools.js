// --- Helpers ---
function textToBits(text) {
  const bits = [];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) & 0xFF;
    for (let b = 7; b >= 0; b--) bits.push((code >> b) & 1);
  }
  return bits;
}

function bitsToText(bits) {
  let text = '';
  for (let i = 0; i + 7 < bits.length; i += 8) {
    let byte = 0;
    for (let b = 0; b < 8; b++) byte = (byte << 1) | bits[i + b];
    if (byte === 0) break;
    text += String.fromCharCode(byte);
  }
  return text;
}

function intToBits32(n) {
  const bits = [];
  for (let b = 31; b >= 0; b--) bits.push((n >> b) & 1);
  return bits;
}

function bitsToInt32(bits) {
  let n = 0;
  for (let b = 0; b < 32; b++) n = (n << 1) | bits[b];
  return n;
}

function formatBinary(byte) {
  return byte.toString(2).padStart(8, '0');
}

// --- Chargement de l'image sample depuis _static ---
function loadSampleImage(canvas, callback) {
  const img = new Image();
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    if (callback) callback(img.width, img.height);
  };
  img.src = '../../_static/landscape.png';
}

// --- Outil A : Visualiseur MSB vs LSB ---
function initLsbVisualizer(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var SIZE = 4;
  var PIXEL_SIZE = 40;

  // Deux canvas : original et modifié, côte à côte
  var canvasOrig = document.createElement('canvas');
  canvasOrig.width = SIZE * PIXEL_SIZE;
  canvasOrig.height = SIZE * PIXEL_SIZE;
  canvasOrig.className = 'steg-canvas';

  var canvasMod = document.createElement('canvas');
  canvasMod.width = SIZE * PIXEL_SIZE;
  canvasMod.height = SIZE * PIXEL_SIZE;
  canvasMod.className = 'steg-canvas';

  var baseColors = [
    [200, 100, 50], [50, 180, 120], [100, 80, 200], [220, 200, 60],
    [180, 60, 60], [60, 60, 180], [150, 200, 100], [200, 150, 200],
    [120, 180, 200], [200, 120, 80], [80, 200, 160], [160, 100, 140],
    [100, 160, 80], [200, 180, 140], [140, 120, 200], [80, 140, 120]
  ];

  // Chaque pixel a un état MSB et LSB par canal (toggleMsb, toggleLsb)
  var pixels = [];
  for (var i = 0; i < SIZE * SIZE; i++) {
    pixels.push({
      r: baseColors[i][0], g: baseColors[i][1], b: baseColors[i][2],
      lsb: false, msb: false
    });
  }

  var table = document.createElement('table');
  table.className = 'steg-pixel-grid';

  function getModified(px) {
    var r = px.r, g = px.g, b = px.b;
    if (px.lsb) { r ^= 1; g ^= 1; b ^= 1; }
    if (px.msb) { r ^= 128; g ^= 128; b ^= 128; }
    return [Math.min(255, Math.max(0, r)), Math.min(255, Math.max(0, g)), Math.min(255, Math.max(0, b))];
  }

  function formatHighlight(val, lsbOn, msbOn) {
    var bin = formatBinary(val);
    var msb = msbOn ? '<span class="steg-msb-highlight">' + bin[0] + '</span>' : bin[0];
    var mid = bin.slice(1, 7);
    var lsb = lsbOn ? '<span class="steg-lsb-highlight">' + bin[7] + '</span>' : bin[7];
    return msb + mid + lsb;
  }

  function drawCanvas(cvs, getColor) {
    var ctx = cvs.getContext('2d');
    for (var i = 0; i < pixels.length; i++) {
      var col = getColor(pixels[i]);
      var x = (i % SIZE) * PIXEL_SIZE;
      var y = Math.floor(i / SIZE) * PIXEL_SIZE;
      ctx.fillStyle = 'rgb(' + col[0] + ',' + col[1] + ',' + col[2] + ')';
      ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
    }
  }

  function draw() {
    drawCanvas(canvasOrig, function(px) { return [px.r, px.g, px.b]; });
    drawCanvas(canvasMod, function(px) { return getModified(px); });
  }

  function buildTable() {
    var html = '<tr><th>Pixel</th><th>R</th><th>G</th><th>B</th><th>Inverser MSB</th><th>Inverser LSB</th></tr>';
    for (var i = 0; i < pixels.length; i++) {
      var px = pixels[i];
      var mod = getModified(px);
      var msbChecked = px.msb ? ' checked' : '';
      var lsbChecked = px.lsb ? ' checked' : '';
      html += '<tr><td>' + i + '</td>';
      html += '<td>' + formatHighlight(mod[0], px.lsb, px.msb) + '</td>';
      html += '<td>' + formatHighlight(mod[1], px.lsb, px.msb) + '</td>';
      html += '<td>' + formatHighlight(mod[2], px.lsb, px.msb) + '</td>';
      html += '<td><input type="checkbox" data-idx="' + i + '" data-bit="msb"' + msbChecked + '></td>';
      html += '<td><input type="checkbox" data-idx="' + i + '" data-bit="lsb"' + lsbChecked + '></td>';
      html += '</tr>';
    }
    table.innerHTML = html;
  }

  table.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
      var idx = parseInt(e.target.getAttribute('data-idx'));
      var bit = e.target.getAttribute('data-bit');
      pixels[idx][bit] = e.target.checked;
      draw();
      buildTable();
    }
  });

  var resetBtn = document.createElement('button');
  resetBtn.className = 'tool-btn';
  resetBtn.textContent = 'Réinitialiser';
  resetBtn.addEventListener('click', function() {
    for (var i = 0; i < pixels.length; i++) { pixels[i].lsb = false; pixels[i].msb = false; }
    draw();
    buildTable();
  });

  // Layout : canvas à gauche, tableau à droite
  var layout = document.createElement('div');
  layout.className = 'steg-vis-wrap';

  var canvasColumn = document.createElement('div');
  var labelOrig = document.createElement('div');
  labelOrig.innerHTML = '<strong>Original</strong>';
  labelOrig.style.textAlign = 'center';
  labelOrig.style.marginBottom = '4px';
  var labelMod = document.createElement('div');
  labelMod.innerHTML = '<strong>Modifié</strong>';
  labelMod.style.textAlign = 'center';
  labelMod.style.marginTop = '8px';
  labelMod.style.marginBottom = '4px';
  canvasColumn.appendChild(labelOrig);
  canvasColumn.appendChild(canvasOrig);
  canvasColumn.appendChild(labelMod);
  canvasColumn.appendChild(canvasMod);

  var tableWrap = document.createElement('div');
  tableWrap.style.overflowX = 'auto';
  tableWrap.style.flex = '1';
  tableWrap.appendChild(table);

  layout.appendChild(canvasColumn);
  layout.appendChild(tableWrap);

  container.appendChild(layout);
  container.appendChild(resetBtn);

  draw();
  buildTable();
}

// --- Outil E : Exercice encodage manuel LSB ---
function initLsbEncoder(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var NUM_PIXELS = 6;
  var PIXEL_SIZE = 50;
  var COLS = 6;

  // Couleurs de base des pixels (paires pour que le LSB soit toujours 0 au départ)
  var basePixels = [
    [142, 86, 200], [54, 190, 114], [210, 162, 78],
    [98, 144, 212], [176, 62, 130], [120, 200, 94]
  ];

  // LSBs actuels (tous à 0 au départ car valeurs paires)
  var lsbs = [];
  for (var i = 0; i < NUM_PIXELS * 3; i++) lsbs.push(0);

  var TARGET = 'OK';

  // Texte cible
  var targetDiv = document.createElement('div');
  targetDiv.style.marginBottom = '12px';
  targetDiv.innerHTML = '<strong>Texte à cacher :</strong> <code style="font-size:18px;">' + TARGET + '</code>';
  container.appendChild(targetDiv);

  // Table ASCII de référence
  var asciiRef = document.createElement('details');
  asciiRef.style.marginBottom = '12px';
  asciiRef.innerHTML = '<summary style="cursor:pointer;font-weight:bold;">Table ASCII (cliquez pour déplier)</summary>' +
    '<table class="steg-pixel-grid" style="margin-top:8px;font-size:12px;">' +
    '<tr><th>Car.</th><th>Dec.</th><th>Binaire</th>' +
    '<th>Car.</th><th>Dec.</th><th>Binaire</th>' +
    '<th>Car.</th><th>Dec.</th><th>Binaire</th></tr>' +
    buildAsciiRows() + '</table>';
  container.appendChild(asciiRef);

  function buildAsciiRows() {
    // Afficher les caractères imprimables (32-126) sur 3 colonnes
    var chars = [];
    for (var i = 32; i <= 126; i++) chars.push(i);
    var rows = Math.ceil(chars.length / 3);
    var html = '';
    for (var r = 0; r < rows; r++) {
      html += '<tr>';
      for (var col = 0; col < 3; col++) {
        var idx = r + col * rows;
        if (idx < chars.length) {
          var code = chars[idx];
          var ch = code === 32 ? '(espace)' : String.fromCharCode(code);
          html += '<td>' + ch + '</td><td>' + code + '</td><td><code>' + formatBinary(code) + '</code></td>';
        } else {
          html += '<td></td><td></td><td></td>';
        }
      }
      html += '</tr>';
    }
    return html;
  }

  // Layout : canvas + tableau côte à côte
  var layout = document.createElement('div');
  layout.className = 'steg-vis-wrap';

  // Canvas des pixels
  var canvasWrap = document.createElement('div');
  var canvas = document.createElement('canvas');
  canvas.width = COLS * PIXEL_SIZE;
  canvas.height = Math.ceil(NUM_PIXELS / COLS) * PIXEL_SIZE;
  canvas.className = 'steg-canvas';
  canvas.style.imageRendering = 'pixelated';
  canvasWrap.appendChild(canvas);
  layout.appendChild(canvasWrap);

  // Tableau
  var tableWrap = document.createElement('div');
  tableWrap.style.overflowX = 'auto';
  tableWrap.style.flex = '1';
  var table = document.createElement('table');
  table.className = 'steg-pixel-grid';
  tableWrap.appendChild(table);
  layout.appendChild(tableWrap);

  container.appendChild(layout);

  // Texte décodé en live
  var decoded = document.createElement('div');
  decoded.style.marginTop = '14px';
  decoded.style.fontSize = '15px';
  decoded.style.fontFamily = 'monospace';
  container.appendChild(decoded);

  // Boutons
  var btnWrap = document.createElement('div');
  btnWrap.style.marginTop = '10px';

  var verifyBtn = document.createElement('button');
  verifyBtn.className = 'tool-btn';
  verifyBtn.textContent = 'Vérifier';
  verifyBtn.addEventListener('click', function() {
    var targetBits = textToBits(TARGET);
    var allCorrect = true;
    for (var i = 0; i < targetBits.length; i++) {
      if (i >= lsbs.length || lsbs[i] !== targetBits[i]) { allCorrect = false; break; }
    }
    if (allCorrect) {
      verifyResult.className = 'steg-result steg-ok';
      verifyResult.textContent = '✓ Bravo ! Le message « ' + TARGET + ' » est correctement encodé dans les LSBs.';
    } else {
      verifyResult.className = 'steg-result steg-err';
      verifyResult.textContent = '✗ Le message ne correspond pas encore. Continuez !';
    }
  });
  btnWrap.appendChild(verifyBtn);

  var resetBtn = document.createElement('button');
  resetBtn.className = 'tool-btn';
  resetBtn.style.marginLeft = '8px';
  resetBtn.textContent = 'Réinitialiser';
  resetBtn.addEventListener('click', function() {
    for (var i = 0; i < lsbs.length; i++) lsbs[i] = 0;
    verifyResult.className = '';
    verifyResult.textContent = '';
    render();
  });
  btnWrap.appendChild(resetBtn);

  container.appendChild(btnWrap);

  var verifyResult = document.createElement('div');
  container.appendChild(verifyResult);

  function getCurrentValue(pixelIdx, channel) {
    var base = basePixels[pixelIdx][channel];
    var lsbIdx = pixelIdx * 3 + channel;
    return (base & 0xFE) | lsbs[lsbIdx];
  }

  function drawCanvas() {
    var ctx = canvas.getContext('2d');
    for (var i = 0; i < NUM_PIXELS; i++) {
      var r = getCurrentValue(i, 0);
      var g = getCurrentValue(i, 1);
      var b = getCurrentValue(i, 2);
      var x = (i % COLS) * PIXEL_SIZE;
      var y = Math.floor(i / COLS) * PIXEL_SIZE;
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
      // Numéro du pixel
      ctx.fillStyle = (r * 0.299 + g * 0.587 + b * 0.114) > 150 ? '#000' : '#fff';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(i, x + PIXEL_SIZE / 2, y + PIXEL_SIZE / 2 + 4);
    }
  }

  function render() {
    drawCanvas();

    // Construire le tableau sans indication de cible
    var channels = ['R', 'G', 'B'];
    var html = '<tr><th>Pixel</th><th>Canal</th><th>Valeur</th><th>Binaire</th><th>LSB</th></tr>';
    for (var p = 0; p < NUM_PIXELS; p++) {
      for (var c = 0; c < 3; c++) {
        var lsbIdx = p * 3 + c;
        var val = getCurrentValue(p, c);
        var bin = formatBinary(val);

        html += '<tr>';
        if (c === 0) html += '<td rowspan="3" style="vertical-align:middle;font-weight:bold;">' + p + '</td>';
        html += '<td>' + channels[c] + '</td>';
        html += '<td>' + val + '</td>';
        html += '<td style="font-family:monospace;">' + bin.slice(0, 7) + '<span class="steg-lsb-highlight">' + bin[7] + '</span></td>';
        html += '<td><button class="steg-lsb-btn" data-idx="' + lsbIdx + '">' + lsbs[lsbIdx] + '</button></td>';
        html += '</tr>';
      }
    }
    table.innerHTML = html;

    // Décoder le texte actuel depuis les LSBs
    var currentText = bitsToText(lsbs);
    var bitsStr = '';
    for (var i = 0; i < lsbs.length; i++) {
      bitsStr += '<span class="steg-lsb-highlight">' + lsbs[i] + '</span>';
      if ((i + 1) % 8 === 0 && i < lsbs.length - 1) bitsStr += ' ';
    }
    decoded.innerHTML = '<strong>LSBs :</strong> ' + bitsStr + '<br>' +
      '<strong>Texte décodé :</strong> <code style="font-size:18px;">' + (currentText || '') + '</code>';
  }

  table.addEventListener('click', function(e) {
    var btn = e.target.closest('.steg-lsb-btn');
    if (!btn) return;
    var idx = parseInt(btn.getAttribute('data-idx'));
    lsbs[idx] = lsbs[idx] === 0 ? 1 : 0;
    render();
  });

  render();
}

// --- Outil B : Cacher un message ---
let stegOriginalData = null;

function initHideTool() {
  const canvas = document.getElementById('steg-hide-original');
  if (!canvas) return;
  loadSampleImage(canvas, function(w, h) {
    stegOriginalData = canvas.getContext('2d').getImageData(0, 0, w, h);
  });
}

function hideMessage() {
  const input = document.getElementById('steg-hide-input');
  const result = document.getElementById('steg-hide-result');
  const progress = document.getElementById('steg-hide-progress');
  const outputCanvas = document.getElementById('steg-hide-canvas');
  const downloadBtn = document.getElementById('steg-download-btn');

  if (!stegOriginalData) {
    initHideTool();
    result.className = 'steg-result steg-info';
    result.textContent = 'Image en cours de chargement, veuillez réessayer.';
    return;
  }

  const text = input.value;
  if (!text) {
    result.className = 'steg-result steg-err';
    result.textContent = 'Veuillez entrer un message.';
    return;
  }

  const messageBits = textToBits(text);
  const headerBits = intToBits32(text.length);
  const allBits = headerBits.concat(messageBits);

  const data = new Uint8ClampedArray(stegOriginalData.data);
  const w = stegOriginalData.width;
  const h = stegOriginalData.height;
  const capacity = w * h * 3;

  if (allBits.length > capacity) {
    result.className = 'steg-result steg-err';
    result.textContent = 'Message trop long ! Capacité : ' + Math.floor((capacity - 32) / 8) + ' caractères max.';
    return;
  }

  let bitIdx = 0;
  for (let i = 0; i < w * h && bitIdx < allBits.length; i++) {
    const base = i * 4;
    for (let c = 0; c < 3 && bitIdx < allBits.length; c++) {
      data[base + c] = (data[base + c] & 0xFE) | allBits[bitIdx];
      bitIdx++;
    }
  }

  outputCanvas.width = w;
  outputCanvas.height = h;
  outputCanvas.style.display = 'block';
  const ctx = outputCanvas.getContext('2d');
  const imgData = ctx.createImageData(w, h);
  imgData.data.set(data);
  ctx.putImageData(imgData, 0, 0);

  downloadBtn.style.display = 'inline-block';
  progress.textContent = '';
  result.className = 'steg-result steg-ok';
  result.textContent = '✓ Message caché ! (' + allBits.length + ' / ' + capacity + ' bits utilisés, soit ' + text.length + ' caractères)';
}

function downloadCanvas(canvasId, filename) {
  const canvas = document.getElementById(canvasId);
  canvas.toBlob(function(blob) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename || 'stegano.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, 'image/png');
}

// --- Outil C : Extraire un message ---
function loadExtractFile() {
  const fileInput = document.getElementById('steg-extract-file');
  const canvas = document.getElementById('steg-extract-canvas');
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.style.display = 'block';
      canvas.getContext('2d').drawImage(img, 0, 0);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function extractMessage() {
  const canvas = document.getElementById('steg-extract-canvas');
  const result = document.getElementById('steg-extract-result');

  if (!canvas.width || !canvas.height) {
    result.className = 'steg-result steg-err';
    result.textContent = 'Veuillez d\'abord charger une image.';
    return;
  }

  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const totalPixels = canvas.width * canvas.height;

  // Extraire les bits LSB
  const bits = [];
  for (let i = 0; i < totalPixels; i++) {
    const base = i * 4;
    for (let c = 0; c < 3; c++) {
      bits.push(data[base + c] & 1);
    }
  }

  // Lire le header (32 bits = longueur du message)
  if (bits.length < 32) {
    result.className = 'steg-result steg-err';
    result.textContent = 'Image trop petite pour contenir un message.';
    return;
  }

  const msgLen = bitsToInt32(bits.slice(0, 32));
  if (msgLen <= 0 || msgLen > 100000 || (32 + msgLen * 8) > bits.length) {
    result.className = 'steg-result steg-err';
    result.textContent = 'Aucun message caché détecté dans cette image.';
    return;
  }

  const msgBits = bits.slice(32, 32 + msgLen * 8);
  const message = bitsToText(msgBits);

  result.className = 'steg-result steg-ok';
  result.textContent = '✓ Message trouvé (' + msgLen + ' caractères) : ' + message;
}

// --- Outil C bis : Extraire depuis une image intégrée (pour le défi) ---
function loadChallengeImage(imgElement, canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !imgElement) return;
  canvas.width = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;
  canvas.style.display = 'block';
  canvas.getContext('2d').drawImage(imgElement, 0, 0);
}

// --- Initialisation au chargement ---
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('lsb-visualizer')) {
    initLsbVisualizer('lsb-visualizer');
  }
  if (document.getElementById('lsb-encoder')) {
    initLsbEncoder('lsb-encoder');
  }
  if (document.getElementById('steg-hide-original')) {
    initHideTool();
  }
});
