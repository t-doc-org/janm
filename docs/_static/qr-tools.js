/**
 * Crée un outil interactif d'exploration de QR code.
 * @param {number[][]} qrData - Le QR code en liste de listes (0 et 1)
 * @param {string} containerId - L'id du conteneur HTML
 */
function createQRExplorer(qrData, containerId) {
  var SIZE = qrData.length, PIXEL_SIZE = 15;
  var root = document.getElementById(containerId);
  root.style.cssText = 'font-family:Arial,sans-serif;padding:20px;background:#f5f5f5;border-radius:8px;margin:20px 0;';
  root.innerHTML = '<div style="display:flex;gap:20px;align-items:center;justify-content:center;"><div><div class="qr-grid" style="display:inline-block;border:2px solid #333;background:white;image-rendering:pixelated;"></div></div><div style="min-width:280px;display:flex;flex-direction:column;justify-content:center;gap:15px;"><div><label style="font-size:12px;font-weight:bold;">Outil :</label><div style="display:flex;gap:5px;margin-top:5px;"><button class="btn-draw" style="flex:1;padding:6px;background:#4CAF50;color:white;cursor:pointer;border:none;border-radius:4px;font-size:11px;">Dessin</button><button class="btn-erase" style="flex:1;padding:6px;background:#ccc;color:#333;cursor:pointer;border:none;border-radius:4px;font-size:11px;">Gomme</button></div></div><div class="color-section"><label style="font-size:12px;color:#333;display:block;">Couleur de sélection :</label><div style="display:flex;align-items:center;gap:8px;margin-top:5px;"><input class="color-picker" type="color" value="#4CAF50" style="width:40px;height:30px;cursor:pointer;border:1px solid #999;"><input class="opacity-slider" type="range" min="10" max="100" value="50" style="width:80px;"><span class="opacity-value" style="font-size:11px;color:#666;min-width:30px;">50%</span></div></div><div><label style="font-size:12px;font-weight:bold;">Masques :</label><div class="mask-selector" style="margin-top:5px;display:flex;flex-wrap:wrap;gap:4px;"></div></div></div></div>';
  var masks = [
    function(i,j){return(i+j)%2===0;},
    function(i,j){return i%2===0;},
    function(i,j){return j%3===0;},
    function(i,j){return(i+j)%3===0;},
    function(i,j){return(Math.floor(i/2)+Math.floor(j/3))%2===0;},
    function(i,j){return((i*j)%2)+((i*j)%3)===0;},
    function(i,j){return(((i*j)%2)+((i*j)%3))%2===0;},
    function(i,j){return(((i+j)%2)+((i*j)%3))%2===0;}
  ];
  var currentMask = -1, selectedPixels = new Map(), isSelecting = false, startX, startY, currentTool = 'draw';
  var canvas = document.createElement('canvas');
  canvas.width = SIZE * PIXEL_SIZE; canvas.height = SIZE * PIXEL_SIZE; canvas.style.cursor = 'crosshair';
  var ctx = canvas.getContext('2d');
  var btnDraw = root.querySelector('.btn-draw'), btnErase = root.querySelector('.btn-erase');
  var colorSection = root.querySelector('.color-section'), colorPicker = root.querySelector('.color-picker');
  var opacitySlider = root.querySelector('.opacity-slider'), opacityValue = root.querySelector('.opacity-value');

  function isProtected(i, j) {
    if ((i < 9 && j < 9) || (i < 9 && j >= SIZE - 8) || (i >= SIZE - 8 && j < 9)) return true;
    if (i === 6 || j === 6) return true;
    if ((i < 9 && j === 8) || (i === 8 && j < 9)) return true;
    if ((i < 9 && j >= SIZE - 8) || (i === 8 && j >= SIZE - 8)) return true;
    if ((i >= SIZE - 8 && j === 8) || (i === 8 && j >= SIZE - 8)) return true;
    return false;
  }

  function drawQR() {
    ctx.fillStyle = 'white'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        var p = qrData[i][j];
        if (currentMask >= 0 && !isProtected(i, j) && masks[currentMask](i, j)) p = 1 - p;
        ctx.fillStyle = p ? 'black' : 'white';
        ctx.fillRect(j * PIXEL_SIZE, i * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        if (selectedPixels.has(i * SIZE + j)) {
          var opHex = Math.round((parseInt(opacitySlider.value) / 100) * 255).toString(16).padStart(2, '0');
          ctx.fillStyle = selectedPixels.get(i * SIZE + j) + opHex;
          ctx.fillRect(j * PIXEL_SIZE, i * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }
        ctx.strokeStyle = '#ddd'; ctx.lineWidth = 0.5;
        ctx.strokeRect(j * PIXEL_SIZE, i * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }

  canvas.addEventListener('mousedown', function(e) {
    isSelecting = true;
    var r = canvas.getBoundingClientRect();
    startX = Math.floor((e.clientX - r.left) / PIXEL_SIZE);
    startY = Math.floor((e.clientY - r.top) / PIXEL_SIZE);
  });
  canvas.addEventListener('mousemove', function(e) {
    if (!isSelecting) return; drawQR();
    var r = canvas.getBoundingClientRect();
    var curX = Math.floor((e.clientX - r.left) / PIXEL_SIZE), curY = Math.floor((e.clientY - r.top) / PIXEL_SIZE);
    var minX = Math.max(0, Math.min(startX, curX)), maxX = Math.min(SIZE - 1, Math.max(startX, curX));
    var minY = Math.max(0, Math.min(startY, curY)), maxY = Math.min(SIZE - 1, Math.max(startY, curY));
    ctx.strokeStyle = currentTool === 'draw' ? '#FFD700' : '#FF6B6B'; ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(minX * PIXEL_SIZE, minY * PIXEL_SIZE, (maxX - minX + 1) * PIXEL_SIZE, (maxY - minY + 1) * PIXEL_SIZE);
    ctx.setLineDash([]);
  });
  canvas.addEventListener('mouseup', function(e) {
    if (!isSelecting) return; isSelecting = false;
    var r = canvas.getBoundingClientRect();
    var curX = Math.floor((e.clientX - r.left) / PIXEL_SIZE), curY = Math.floor((e.clientY - r.top) / PIXEL_SIZE);
    var minX = Math.max(0, Math.min(startX, curX)), maxX = Math.min(SIZE - 1, Math.max(startX, curX));
    var minY = Math.max(0, Math.min(startY, curY)), maxY = Math.min(SIZE - 1, Math.max(startY, curY));
    if (currentTool === 'draw') {
      var col = colorPicker.value;
      for (var i = minY; i <= maxY; i++) for (var j = minX; j <= maxX; j++) selectedPixels.set(i * SIZE + j, col);
    } else {
      for (var i = minY; i <= maxY; i++) for (var j = minX; j <= maxX; j++) selectedPixels.delete(i * SIZE + j);
    }
    drawQR();
  });

  function createMaskPreview(maskIndex) {
    var container = document.createElement('div');
    container.style.display = 'flex'; container.style.flexDirection = 'column'; container.style.alignItems = 'center'; container.style.gap = '2px';
    var formatCanvas = document.createElement('canvas');
    formatCanvas.width = 42; formatCanvas.height = 14;
    var fmtCtx = formatCanvas.getContext('2d');
    fmtCtx.fillStyle = '#e0e0e0'; fmtCtx.fillRect(0, 0, 45, 15);
    var fmtPixelSize = 14;
    if (maskIndex >= 0) {
      var maskBitsMap = [0b101, 0b100, 0b111, 0b110, 0b001, 0b000, 0b011, 0b010];
      var v = maskBitsMap[maskIndex];
      var bits = [(v >> 2) & 1, (v >> 1) & 1, v & 1];
      for (var j = 0; j < 3; j++) {
        fmtCtx.fillStyle = bits[j] ? 'black' : 'white';
        fmtCtx.fillRect(j * fmtPixelSize, 0, fmtPixelSize, 14);
        fmtCtx.strokeStyle = '#999'; fmtCtx.lineWidth = 1;
        fmtCtx.strokeRect(j * fmtPixelSize, 0, fmtPixelSize, 14);
      }
    } else {
      fmtCtx.strokeStyle = '#999'; fmtCtx.lineWidth = 1;
      for (var j = 0; j < 3; j++) {
        fmtCtx.fillStyle = '#e0e0e0'; fmtCtx.fillRect(j * fmtPixelSize, 0, fmtPixelSize, 14);
        fmtCtx.strokeRect(j * fmtPixelSize, 0, fmtPixelSize, 14);
      }
      fmtCtx.beginPath(); fmtCtx.moveTo(0, 0); fmtCtx.lineTo(42, 14); fmtCtx.moveTo(42, 0); fmtCtx.lineTo(0, 14); fmtCtx.stroke();
    }
    container.appendChild(formatCanvas);
    var hr = document.createElement('div'); hr.style.cssText = 'width:42px;height:1px;background:#aaa;';
    container.appendChild(hr);
    var PREV_GRID = 6, PREV_PX = 7;
    var patternCanvas = document.createElement('canvas');
    patternCanvas.width = PREV_GRID * PREV_PX; patternCanvas.height = PREV_GRID * PREV_PX;
    var prevCtx = patternCanvas.getContext('2d');
    prevCtx.fillStyle = '#e0e0e0'; prevCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
    if (maskIndex >= 0) {
      for (var i = 0; i < PREV_GRID; i++) for (var j = 0; j < PREV_GRID; j++) {
        prevCtx.fillStyle = masks[maskIndex](i, j) ? 'black' : 'white';
        prevCtx.fillRect(j * PREV_PX, i * PREV_PX, PREV_PX, PREV_PX);
        prevCtx.strokeStyle = '#bbb'; prevCtx.lineWidth = 0.5;
        prevCtx.strokeRect(j * PREV_PX, i * PREV_PX, PREV_PX, PREV_PX);
      }
    } else {
      prevCtx.strokeStyle = '#999'; prevCtx.lineWidth = 1;
      for (var i = 0; i < PREV_GRID; i++) for (var j = 0; j < PREV_GRID; j++)
        prevCtx.strokeRect(j * PREV_PX, i * PREV_PX, PREV_PX, PREV_PX);
      prevCtx.beginPath(); prevCtx.moveTo(0, 0); prevCtx.lineTo(patternCanvas.width, patternCanvas.height);
      prevCtx.moveTo(patternCanvas.width, 0); prevCtx.lineTo(0, patternCanvas.height); prevCtx.stroke();
    }
    container.appendChild(patternCanvas);
    return container;
  }

  var maskContainer = root.querySelector('.mask-selector');
  [-1, 0, 1, 2, 3, 4, 5, 6, 7].forEach(function(maskIdx) {
    var btn = document.createElement('button');
    btn.style.cssText = 'padding:3px;background:#f0f0f0;border:2px solid #ccc;cursor:pointer;border-radius:4px;display:flex;align-items:center;justify-content:center;width:50px;height:68px;transition:all 0.2s;';
    btn.title = maskIdx === -1 ? 'Pas de masque' : 'Masque ' + maskIdx;
    btn.appendChild(createMaskPreview(maskIdx));
    btn.addEventListener('click', function() {
      currentMask = maskIdx;
      maskContainer.querySelectorAll('button').forEach(function(b) { b.style.borderColor = '#ccc'; });
      btn.style.borderColor = '#4CAF50'; btn.style.borderWidth = '3px';
      drawQR();
    });
    if (maskIdx === -1) btn.click();
    maskContainer.appendChild(btn);
  });

  opacitySlider.addEventListener('input', function() {
    opacityValue.textContent = opacitySlider.value + '%';
    drawQR();
  });

  btnDraw.addEventListener('click', function() {
    currentTool = 'draw'; btnDraw.style.background = '#4CAF50'; btnDraw.style.color = 'white';
    btnErase.style.background = '#ccc'; btnErase.style.color = '#333';
    colorSection.style.opacity = '1'; colorPicker.disabled = false;
  });
  btnErase.addEventListener('click', function() {
    currentTool = 'erase'; btnErase.style.background = '#ff6b6b'; btnErase.style.color = 'white';
    btnDraw.style.background = '#ccc'; btnDraw.style.color = '#333';
    colorSection.style.opacity = '0.5'; colorPicker.disabled = true;
  });

  root.querySelector('.qr-grid').appendChild(canvas);
  drawQR();
}

/**
 * Crée la visualisation du sens de lecture d'un QR code v1.
 * @param {number[][]} qrData - Le QR code en liste de listes (0 et 1)
 * @param {string} canvasId - L'id du canvas
 * @param {string} legendId - L'id du div légende
 * @param {string} inputId - L'id de l'input nb caractères
 */
function createQRReading(qrData, canvasId, legendId, inputId) {
  var S = 21, PX = 18;
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext('2d');
  canvas.width = S * PX; canvas.height = S * PX;

  function isP(r, c) {
    if ((r < 9 && c < 9) || (r < 9 && c >= 13) || (r >= 13 && c < 9)) return true;
    if (r === 6 || c === 6) return true;
    return false;
  }
  function isFmt(r, c) {
    if (r === 8 && (c <= 8 || c >= 13)) return true;
    if (c === 8 && (r <= 8 || r >= 13)) return true;
    return false;
  }
  function getOrder() {
    var o = [], up = true;
    for (var right = S - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (var ri = 0; ri < S; ri++) {
        var row = up ? (S - 1 - ri) : ri;
        if (!isP(row, right)) o.push([row, right]);
        if (right - 1 >= 0 && !isP(row, right - 1)) o.push([row, right - 1]);
      }
      up = !up;
    }
    return o;
  }
  var order = getOrder();
  var tColors = {mode: '#E65100', len: '#0D47A1', data: '#2E7D32', term: '#B71C1C', pad: '#616161', ec: '#4A148C'};

  function getZones(n) {
    n = Math.max(1, Math.min(14, n)); var z = [];
    z.push({s: 0, e: 3, label: 'Enc', type: 'mode'});
    z.push({s: 4, e: 11, label: 'Len', type: 'len'});
    for (var i = 0; i < n; i++) z.push({s: 12 + i * 8, e: 19 + i * 8, label: 'd' + (i + 1), type: 'data'});
    var ts = 12 + n * 8;
    z.push({s: ts, e: ts + 3, label: 'End', type: 'term'});
    var ps = ts + 4, pi = 1;
    while (ps <= 127) { z.push({s: ps, e: Math.min(ps + 7, 127), label: 'P' + pi, type: 'pad'}); ps += 8; pi++; }
    for (var i = 0; i < 10; i++) z.push({s: 128 + i * 8, e: 135 + i * 8, label: 'EC' + (i + 1), type: 'ec'});
    return z;
  }
  function getStripR(c) { return c >= 7 ? ((c % 2 === 0) ? c : c + 1) : ((c % 2 === 1) ? c : c + 1); }

  function draw() {
    var nChars = parseInt(document.getElementById(inputId).value) || 10;
    var zones = getZones(nChars);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    var r, c, v;
    for (r = 0; r < S; r++) for (c = 0; c < S; c++) {
      if (!isP(r, c)) continue;
      v = qrData[r][c];
      if (isFmt(r, c)) ctx.fillStyle = v ? '#d32f2f' : '#ffcdd2';
      else ctx.fillStyle = v ? '#000' : '#fff';
      ctx.fillRect(c * PX, r * PX, PX, PX);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 0.5; ctx.strokeRect(c * PX, r * PX, PX, PX);
    }
    for (var i = 0; i < order.length; i++) {
      r = order[i][0]; c = order[i][1]; v = qrData[r][c];
      ctx.fillStyle = v ? '#888' : '#ccc';
      ctx.fillRect(c * PX, r * PX, PX, PX);
      ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 0.5; ctx.strokeRect(c * PX, r * PX, PX, PX);
    }
    var strips = [], up = true;
    for (var right = S - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      var minR = S, maxR = -1;
      for (r = 0; r < S; r++) {
        if (!isP(r, right)) { minR = Math.min(minR, r); maxR = Math.max(maxR, r); }
        if (right - 1 >= 0 && !isP(r, right - 1)) { minR = Math.min(minR, r); maxR = Math.max(maxR, r); }
      }
      if (minR <= maxR) strips.push({right: right, minR: minR, maxR: maxR, up: up});
      up = !up;
    }
    for (var j = 0; j < zones.length; j++) {
      var zone = zones[j], groups = {};
      for (var i = zone.s; i <= zone.e && i < order.length; i++) {
        r = order[i][0]; c = order[i][1]; var sr = getStripR(c);
        if (!groups[sr]) groups[sr] = {r1: r, r2: r, c1: c, c2: c};
        else { var g = groups[sr]; g.r1 = Math.min(g.r1, r); g.r2 = Math.max(g.r2, r); g.c1 = Math.min(g.c1, c); g.c2 = Math.max(g.c2, c); }
      }
      var color = tColors[zone.type] || '#333';
      var keys = Object.keys(groups);
      var mr1 = S, mr2 = 0, mc1 = S, mc2 = 0;
      for (var gi = 0; gi < keys.length; gi++) { var g = groups[keys[gi]]; mr1 = Math.min(mr1, g.r1); mr2 = Math.max(mr2, g.r2); mc1 = Math.min(mc1, g.c1); mc2 = Math.max(mc2, g.c2); }
      ctx.strokeStyle = color; ctx.lineWidth = 1.5;
      ctx.strokeRect(mc1 * PX + 1, mr1 * PX + 1, (mc2 - mc1 + 1) * PX - 2, (mr2 - mr1 + 1) * PX - 2);
      var lx = (mc1 + mc2 + 1) / 2 * PX, ly = (mr1 + mr2 + 1) / 2 * PX;
      ctx.font = 'bold 8px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var tw = ctx.measureText(zone.label).width + 4;
      ctx.fillStyle = 'rgba(255,255,240,0.88)'; ctx.fillRect(lx - tw / 2, ly - 5, tw, 10);
      ctx.fillStyle = color; ctx.fillText(zone.label, lx, ly);
    }
    ctx.save(); ctx.strokeStyle = '#FF8C00'; ctx.fillStyle = '#FF8C00'; ctx.setLineDash([]);
    for (var si = 0; si < strips.length; si++) {
      var st = strips[si];
      var sx = (st.right - 0.5) * PX;
      var topY = st.minR * PX + PX * 0.9, botY = (st.maxR + 1) * PX - PX * 0.9;
      ctx.lineWidth = 1.5; ctx.globalAlpha = 0.45;
      ctx.beginPath(); ctx.moveTo(sx, topY); ctx.lineTo(sx, botY); ctx.stroke();
      ctx.globalAlpha = 1;
      if (st.up) { ctx.beginPath(); ctx.moveTo(sx - 3, topY + 5); ctx.lineTo(sx, topY - 1); ctx.lineTo(sx + 3, topY + 5); ctx.fill(); }
      else { ctx.beginPath(); ctx.moveTo(sx - 3, botY - 5); ctx.lineTo(sx, botY + 1); ctx.lineTo(sx + 3, botY - 5); ctx.fill(); }
      if (si < strips.length - 1) {
        var ns = strips[si + 1]; var ncx = (ns.right - 0.5) * PX;
        var midX = (sx + ncx) / 2;
        ctx.lineWidth = 1.5; ctx.globalAlpha = 0.85;
        ctx.beginPath();
        var offset = 2;
        if (st.up) {
          var cy = st.minR * PX + PX * 0.5;
          ctx.moveTo(sx, cy); ctx.quadraticCurveTo(midX, cy - PX * 0.8, ncx, cy); ctx.stroke();
          ctx.globalAlpha = 1; ctx.beginPath();
          ctx.moveTo(ncx - 3 + offset, cy - 3); ctx.lineTo(ncx + offset, cy + 3); ctx.lineTo(ncx + 3 + offset, cy - 3); ctx.fill();
        } else {
          var cy = (st.maxR) * PX + PX * 0.5;
          ctx.moveTo(sx, cy); ctx.quadraticCurveTo(midX, cy + PX * 0.8, ncx, cy); ctx.stroke();
          ctx.globalAlpha = 1; ctx.beginPath();
          ctx.moveTo(ncx - 3 + offset, cy + 3); ctx.lineTo(ncx + offset, cy - 3); ctx.lineTo(ncx + 3 + offset, cy + 3); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }
    ctx.restore();
    var leg = document.getElementById(legendId);
    var types = [{t: 'mode', n: 'Mode (Enc)', c: tColors.mode}, {t: 'len', n: 'Longueur (Len)', c: tColors.len}, {t: 'data', n: 'Données (dn)', c: tColors.data}, {t: 'term', n: 'Terminateur (End)', c: tColors.term}, {t: 'pad', n: 'Remplissage (Pn)', c: tColors.pad}, {t: 'ec', n: 'Correction (ECn)', c: tColors.ec}];
    leg.innerHTML = '<div style="margin-bottom:2px;"><span style="display:inline-block;width:10px;height:10px;background:#d32f2f;border:1px solid #999;vertical-align:middle;margin-right:4px;border-radius:2px;"></span><span style="display:inline-block;width:10px;height:10px;background:#ffcdd2;border:1px solid #999;vertical-align:middle;margin-right:4px;border-radius:2px;"></span>Format info</div>' + types.map(function(t) { return '<div><span style="display:inline-block;width:10px;height:10px;border:2px solid ' + t.c + ';box-sizing:border-box;vertical-align:middle;margin-right:4px;border-radius:2px;background:#ddd;"></span>' + t.n + '</div>'; }).join('');
  }
  document.getElementById(inputId).addEventListener('input', draw);
  draw();
}
