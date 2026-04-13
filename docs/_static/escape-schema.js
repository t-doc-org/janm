// Editeur interactif de schema d'escape game
// Copyright 2026 Maxime Jan <maxime.jan@edufr.ch>
// SPDX-License-Identifier: CC-BY-NC-SA-4.0

function initEscapeSchema(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  // --- Constantes ---
  var NODE_RX = 60, NODE_RY = 30, NODE_PAD = 20;
  var ARROW_SIZE = 12;
  var EDGE_HIT_DIST = 10;
  var FONT = '14px sans-serif';
  var FONT_SMALL = '12px sans-serif';
  var COLORS = {
    nodeSelected: '#E8A838',
    edgeStroke: '#555',
    edgeText: '#333',
    edgeLabelBg: '#fff',
    edgeSourceHighlight: '#2ECC71',
    canvasBg: '#fafafa',
    gridLine: '#e8e8e8'
  };

  var NODE_TYPES = {
    normal:  { fill: '#4A90D9', stroke: '#2C6BAF', hover: '#5BA0E9', text: '#fff', label: 'Normal' },
    start:   { fill: '#F1C40F', stroke: '#C49E0C', hover: '#F4D03F', text: '#333', label: 'Depart' },
    victory: { fill: '#2ECC71', stroke: '#1E8E4E', hover: '#3DDB80', text: '#fff', label: 'Victoire' },
    defeat:  { fill: '#E74C3C', stroke: '#B83A2E', hover: '#EE6B5E', text: '#fff', label: 'Defaite' }
  };

  // --- Etat ---
  var state = { nodes: [], edges: [] };
  var nextNodeId = 1;
  var nextEdgeId = 1;
  var mode = 'select'; // 'select' | 'addNode' | 'addEdge'
  var selected = null; // { type: 'node'|'edge', id: string }
  var hovered = null;  // { type: 'node'|'edge', id: string }
  var dragging = null; // { nodeId, offsetX, offsetY }
  var edgeSource = null; // node id when creating edge
  var editingInput = null;
  var needsRedraw = true;
  var dirty = false; // true if unsaved changes exist

  // --- Viewport (pan & zoom) ---
  var viewX = 0, viewY = 0; // pan offset in world coords
  var viewZoom = 1;
  var panning = null; // { startX, startY, viewX0, viewY0 }

  // --- Construction du DOM ---
  container.classList.add('escape-tool');
  container.innerHTML = '';

  var toolbar = document.createElement('div');
  toolbar.className = 'escape-toolbar';

  var btnSelect = makeBtn('Selectionner', 'escape-btn active', function() { setMode('select'); });
  var btnAddNode = makeBtn('Bulle', 'escape-btn', function() { setMode('addNode'); });
  var btnAddEdge = makeBtn('Lien', 'escape-btn', function() { setMode('addEdge'); });

  var spacer = document.createElement('span');
  spacer.className = 'escape-spacer';

  var btnExport = makeBtn('Sauvegarder', 'escape-btn escape-btn-export', function() { exportJSON(); });
  var btnImport = makeBtn('Charger', 'escape-btn escape-btn-export', function() { fileInput.click(); });

  var fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.style.display = 'none';
  fileInput.addEventListener('change', function(e) {
    if (e.target.files.length > 0) importJSON(e.target.files[0]);
    fileInput.value = '';
  });

  toolbar.appendChild(btnSelect);
  toolbar.appendChild(btnAddNode);
  toolbar.appendChild(btnAddEdge);
  toolbar.appendChild(spacer);
  toolbar.appendChild(btnExport);
  toolbar.appendChild(btnImport);
  toolbar.appendChild(fileInput);
  container.appendChild(toolbar);

  var statusBar = document.createElement('div');
  statusBar.className = 'escape-status';
  container.appendChild(statusBar);

  var canvasWrap = document.createElement('div');
  canvasWrap.className = 'escape-canvas-wrap';
  canvasWrap.style.position = 'relative';

  var canvas = document.createElement('canvas');
  canvas.className = 'escape-canvas';
  canvasWrap.appendChild(canvas);
  container.appendChild(canvasWrap);

  // --- Canvas sizing ---
  var dpr = window.devicePixelRatio || 1;
  function resizeCanvas() {
    var w = canvasWrap.clientWidth || 800;
    var h = 500;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    needsRedraw = true;
  }
  resizeCanvas();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(resizeCanvas).observe(canvasWrap);
  }

  // --- Helpers ---
  function makeBtn(text, cls, onclick) {
    var b = document.createElement('button');
    b.textContent = text;
    b.className = cls;
    b.addEventListener('click', onclick);
    return b;
  }

  function makeBtnIcon(icon, title, cls, onclick) {
    var b = document.createElement('button');
    b.className = cls;
    b.title = title;
    b.addEventListener('click', onclick);
    var sp = document.createElement('span');
    sp.className = 'escape-btn-icon';
    sp.textContent = icon;
    b.appendChild(sp);
    var tx = document.createElement('span');
    tx.className = 'escape-btn-label';
    tx.textContent = title;
    b.appendChild(tx);
    return b;
  }

  function getNode(id) {
    for (var i = 0; i < state.nodes.length; i++) {
      if (state.nodes[i].id === id) return state.nodes[i];
    }
    return null;
  }

  function getEdge(id) {
    for (var i = 0; i < state.edges.length; i++) {
      if (state.edges[i].id === id) return state.edges[i];
    }
    return null;
  }

  function nodeSize(node) {
    var ctx = canvas.getContext('2d');
    ctx.font = FONT;
    var tw = ctx.measureText(node.label || '').width;
    var rx = Math.max(NODE_RX, (tw / 2) + NODE_PAD);
    var ry = NODE_RY;
    return { rx: rx, ry: ry };
  }

  // --- Maths ---
  function pointInEllipse(px, py, cx, cy, rx, ry) {
    var dx = (px - cx) / rx, dy = (py - cy) / ry;
    return dx * dx + dy * dy <= 1;
  }

  function ellipseIntersection(cx, cy, rx, ry, px, py) {
    var dx = px - cx, dy = py - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { x: cx + rx, y: cy };
    var nx = dx / dist, ny = dy / dist;
    // parametric: (rx*cos(t), ry*sin(t)), find t where direction matches
    var t = Math.atan2(ny * rx, nx * ry);
    return { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t) };
  }

  function distToSegment(px, py, x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1;
    var lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
    var t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
    var projX = x1 + t * dx, projY = y1 + t * dy;
    return Math.sqrt((px - projX) * (px - projX) + (py - projY) * (py - projY));
  }

  function distToCubic(px, py, x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, steps) {
    var minDist = Infinity;
    steps = steps || 20;
    for (var i = 0; i <= steps; i++) {
      var t = i / steps, u = 1 - t;
      var bx = u*u*u*x1 + 3*u*u*t*cp1x + 3*u*t*t*cp2x + t*t*t*x2;
      var by = u*u*u*y1 + 3*u*u*t*cp1y + 3*u*t*t*cp2y + t*t*t*y2;
      var d = Math.sqrt((px - bx) * (px - bx) + (py - by) * (py - by));
      if (d < minDist) minDist = d;
    }
    return minDist;
  }

  function distToQuadratic(px, py, x1, y1, cpx, cpy, x2, y2, steps) {
    var minDist = Infinity;
    steps = steps || 20;
    for (var i = 0; i <= steps; i++) {
      var t = i / steps;
      var u = 1 - t;
      var bx = u * u * x1 + 2 * u * t * cpx + t * t * x2;
      var by = u * u * y1 + 2 * u * t * cpy + t * t * y2;
      var d = Math.sqrt((px - bx) * (px - bx) + (py - by) * (py - by));
      if (d < minDist) minDist = d;
    }
    return minDist;
  }

  // Count edges between same pair of nodes (both directions)
  function edgesBetween(idA, idB) {
    var edges = [];
    for (var i = 0; i < state.edges.length; i++) {
      var e = state.edges[i];
      if ((e.from === idA && e.to === idB) || (e.from === idB && e.to === idA)) {
        edges.push(e);
      }
    }
    return edges;
  }

  function edgeCurveOffset(edge) {
    var group = edgesBetween(edge.from, edge.to);
    var idx = group.indexOf(edge);
    var total = group.length;
    if (total === 1) {
      // Single edge: slight arc so it's never a straight line
      return 20;
    }
    // Multiple edges: spread them with enough spacing
    var spacing = 45;
    var base = spacing; // minimum offset so nothing is straight
    return base + idx * spacing;
  }

  function computeEdgeControlPoint(fromNode, toNode, offset) {
    var mx = (fromNode.x + toNode.x) / 2;
    var my = (fromNode.y + toNode.y) / 2;
    var dx = toNode.x - fromNode.x;
    var dy = toNode.y - fromNode.y;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    // perpendicular direction
    var nx = -dy / len, ny = dx / len;
    return { x: mx + nx * offset, y: my + ny * offset };
  }

  // --- Hit testing ---
  function hitTestNode(mx, my) {
    // reverse order so topmost nodes are hit first
    for (var i = state.nodes.length - 1; i >= 0; i--) {
      var n = state.nodes[i];
      var s = nodeSize(n);
      if (pointInEllipse(mx, my, n.x, n.y, s.rx, s.ry)) return n;
    }
    return null;
  }

  function hitTestEdge(mx, my) {
    for (var i = state.edges.length - 1; i >= 0; i--) {
      var e = state.edges[i];
      var from = getNode(e.from), to = getNode(e.to);
      if (!from || !to) continue;

      if (e.from === e.to) {
        // self-loop hit test (bezier curve)
        var sn = nodeSize(from);
        var sx = from.x + 15, sy = from.y - sn.ry;
        var cp1x = from.x + 45, cp1y = from.y - sn.ry - 65;
        var cp2x = from.x - 45, cp2y = from.y - sn.ry - 65;
        var ex = from.x - 15, ey = from.y - sn.ry;
        var dist = distToCubic(mx, my, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey);
        if (dist < EDGE_HIT_DIST) return e;
        continue;
      }

      var offset = edgeCurveOffset(e);
      var cp = computeEdgeControlPoint(from, to, offset);
      var d = distToQuadratic(mx, my, from.x, from.y, cp.x, cp.y, to.x, to.y);
      if (d < EDGE_HIT_DIST) return e;
    }
    return null;
  }

  // --- Modes & status ---
  function setMode(m) {
    mode = m;
    edgeSource = null;
    selected = null;
    btnSelect.classList.toggle('active', m === 'select');
    btnAddNode.classList.toggle('active', m === 'addNode');
    btnAddEdge.classList.toggle('active', m === 'addEdge');
    canvas.style.cursor = m === 'select' ? 'default' : 'crosshair';
    updateStatus();
    needsRedraw = true;
  }

  function updateStatus() {
    var msgs = {
      select: 'Double-clic: renommer. Clic droit: type. Molette: zoom. Glisser le vide: deplacer la vue.',
      addNode: 'Cliquez sur le canevas pour placer une nouvelle bulle.',
      addEdge: edgeSource
        ? 'Cliquez sur la bulle d\'arrivee. (Echap pour annuler)'
        : 'Cliquez sur la bulle de depart.'
    };
    statusBar.textContent = msgs[mode] || '';
  }

  updateStatus();

  // --- Dessin ---
  function draw() {
    if (!needsRedraw) { requestAnimationFrame(draw); return; }
    needsRedraw = false;

    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var w = canvas.width / dpr, h = canvas.height / dpr;

    // Background
    ctx.fillStyle = COLORS.canvasBg;
    ctx.fillRect(0, 0, w, h);

    // Apply viewport transform
    ctx.save();
    ctx.scale(viewZoom, viewZoom);
    ctx.translate(-viewX, -viewY);

    // Grid (compute visible range)
    var gridStep = 30;
    var gx0 = Math.floor(viewX / gridStep) * gridStep;
    var gy0 = Math.floor(viewY / gridStep) * gridStep;
    var gx1 = viewX + w / viewZoom;
    var gy1 = viewY + h / viewZoom;
    ctx.strokeStyle = COLORS.gridLine;
    ctx.lineWidth = 0.5 / viewZoom;
    for (var gx = gx0; gx < gx1; gx += gridStep) {
      ctx.beginPath(); ctx.moveTo(gx, gy0); ctx.lineTo(gx, gy1); ctx.stroke();
    }
    for (var gy = gy0; gy < gy1; gy += gridStep) {
      ctx.beginPath(); ctx.moveTo(gx0, gy); ctx.lineTo(gx1, gy); ctx.stroke();
    }

    // Draw edges
    for (var i = 0; i < state.edges.length; i++) {
      drawEdge(ctx, state.edges[i]);
    }

    // Draw nodes
    for (var j = 0; j < state.nodes.length; j++) {
      drawNode(ctx, state.nodes[j]);
    }

    // Edge creation preview
    if (mode === 'addEdge' && edgeSource && hovered && hovered.type === 'node' && hovered.id !== edgeSource) {
      var src = getNode(edgeSource);
      var tgt = getNode(hovered.id);
      if (src && tgt) {
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = COLORS.edgeSourceHighlight;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    ctx.restore(); // end viewport transform
    requestAnimationFrame(draw);
  }

  function drawNode(ctx, node) {
    var s = nodeSize(node);
    var isHovered = hovered && hovered.type === 'node' && hovered.id === node.id;
    var isSelected = selected && selected.type === 'node' && selected.id === node.id;
    var isEdgeSource = edgeSource === node.id;
    var nt = NODE_TYPES[node.nodeType] || NODE_TYPES.normal;

    ctx.save();
    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    ctx.ellipse(node.x, node.y, s.rx, s.ry, 0, 0, Math.PI * 2);

    if (isEdgeSource) {
      ctx.fillStyle = COLORS.edgeSourceHighlight;
    } else if (isHovered) {
      ctx.fillStyle = nt.hover;
    } else {
      ctx.fillStyle = nt.fill;
    }
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 2;
    ctx.strokeStyle = nt.stroke;
    ctx.stroke();

    // Selection: dashed outline ring around the node
    if (isSelected) {
      ctx.beginPath();
      ctx.ellipse(node.x, node.y, s.rx + 5, s.ry + 5, 0, 0, Math.PI * 2);
      ctx.setLineDash([5, 3]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#333';
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();

    // Label
    ctx.fillStyle = isEdgeSource ? '#fff' : nt.text;
    ctx.font = FONT;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.label || '', node.x, node.y);
  }

  function drawEdge(ctx, edge) {
    var from = getNode(edge.from), to = getNode(edge.to);
    if (!from || !to) return;

    var isHovered = hovered && hovered.type === 'edge' && hovered.id === edge.id;
    var isSelected = selected && selected.type === 'edge' && selected.id === edge.id;

    ctx.strokeStyle = isSelected ? COLORS.nodeSelected : isHovered ? '#888' : COLORS.edgeStroke;
    ctx.lineWidth = isSelected ? 2.5 : isHovered ? 2 : 1.5;

    if (edge.from === edge.to) {
      // Self-loop
      drawSelfLoop(ctx, from, edge, isSelected, isHovered);
      return;
    }

    var offset = edgeCurveOffset(edge);
    var cp = computeEdgeControlPoint(from, to, offset);

    var sFrom = nodeSize(from), sTo = nodeSize(to);
    var startPt = ellipseIntersection(from.x, from.y, sFrom.rx, sFrom.ry, cp.x, cp.y);
    var endPt = ellipseIntersection(to.x, to.y, sTo.rx, sTo.ry, cp.x, cp.y);

    ctx.beginPath();
    ctx.moveTo(startPt.x, startPt.y);
    ctx.quadraticCurveTo(cp.x, cp.y, endPt.x, endPt.y);
    ctx.stroke();

    // Arrow angle from control point to end
    var arrowAngle = Math.atan2(endPt.y - cp.y, endPt.x - cp.x);
    drawArrowhead(ctx, endPt.x, endPt.y, arrowAngle);

    // Label at midpoint of quadratic bezier (t=0.5)
    var labelX = 0.25 * startPt.x + 0.5 * cp.x + 0.25 * endPt.x;
    var labelY = 0.25 * startPt.y + 0.5 * cp.y + 0.25 * endPt.y;

    if (edge.label) {
      drawEdgeLabel(ctx, edge.label, labelX, labelY, isSelected);
    }
  }

  function drawSelfLoop(ctx, node, edge, isSelected, isHovered) {
    var s = nodeSize(node);
    // Bezier self-loop above the node
    var sx = node.x + 15, sy = node.y - s.ry;   // start (right of top)
    var ex = node.x - 15, ey = node.y - s.ry;   // end (left of top)
    var cp1x = node.x + 45, cp1y = node.y - s.ry - 65;
    var cp2x = node.x - 45, cp2y = node.y - s.ry - 65;

    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
    ctx.stroke();

    // Arrowhead: direction from CP2 toward end point
    var arrowAngle = Math.atan2(ey - cp2y, ex - cp2x);
    drawArrowhead(ctx, ex, ey, arrowAngle);

    // Label at top of the loop
    if (edge.label) {
      drawEdgeLabel(ctx, edge.label, node.x, node.y - s.ry - 50, isSelected);
    }
  }

  function drawArrowhead(ctx, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-ARROW_SIZE, -ARROW_SIZE / 2.5);
    ctx.lineTo(-ARROW_SIZE, ARROW_SIZE / 2.5);
    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
    ctx.restore();
  }

  function drawEdgeLabel(ctx, text, x, y, isSelected) {
    ctx.font = FONT_SMALL;
    var tw = ctx.measureText(text).width;
    ctx.fillStyle = COLORS.edgeLabelBg;
    ctx.fillRect(x - tw / 2 - 4, y - 8, tw + 8, 16);
    if (isSelected) {
      ctx.strokeStyle = COLORS.nodeSelected;
      ctx.lineWidth = 1;
      ctx.strokeRect(x - tw / 2 - 4, y - 8, tw + 8, 16);
    }
    ctx.fillStyle = COLORS.edgeText;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
  }

  // --- Mouse coords ---
  function getScreenPos(e) {
    var rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function screenToWorld(sx, sy) {
    return { x: sx / viewZoom + viewX, y: sy / viewZoom + viewY };
  }

  function worldToScreen(wx, wy) {
    return { x: (wx - viewX) * viewZoom, y: (wy - viewY) * viewZoom };
  }

  function getMousePos(e) {
    var s = getScreenPos(e);
    return screenToWorld(s.x, s.y);
  }

  // --- Inline editing ---
  function startEditing(obj, type) {
    if (editingInput) finishEditing();

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'escape-inline-input';

    if (type === 'node') {
      var n = getNode(obj.id);
      if (!n) return;
      var s = nodeSize(n);
      var sc = worldToScreen(n.x, n.y);
      input.value = n.label || '';
      input.style.left = (sc.x - s.rx * viewZoom) + 'px';
      input.style.top = (sc.y - 12 * viewZoom) + 'px';
      input.style.width = (s.rx * 2 * viewZoom) + 'px';
      input.style.fontSize = (14 * viewZoom) + 'px';
    } else {
      // edge label
      var e = getEdge(obj.id);
      if (!e) return;
      var from = getNode(e.from), to = getNode(e.to);
      if (!from || !to) return;
      var mx, my;
      if (e.from === e.to) {
        var ns = nodeSize(from);
        mx = from.x;
        my = from.y - ns.ry - 50;
      } else {
        var offset = edgeCurveOffset(e);
        var cp = computeEdgeControlPoint(from, to, offset);
        var sFrom = nodeSize(from), sTo = nodeSize(to);
        var sp = ellipseIntersection(from.x, from.y, sFrom.rx, sFrom.ry, cp.x, cp.y);
        var ep = ellipseIntersection(to.x, to.y, sTo.rx, sTo.ry, cp.x, cp.y);
        mx = 0.25 * sp.x + 0.5 * cp.x + 0.25 * ep.x;
        my = 0.25 * sp.y + 0.5 * cp.y + 0.25 * ep.y;
      }
      var sc2 = worldToScreen(mx, my);
      input.value = e.label || '';
      input.style.left = (sc2.x - 50 * viewZoom) + 'px';
      input.style.top = (sc2.y - 12 * viewZoom) + 'px';
      input.style.width = (100 * viewZoom) + 'px';
      input.style.fontSize = (12 * viewZoom) + 'px';
    }

    editingInput = { element: input, type: type, id: obj.id };
    canvasWrap.appendChild(input);
    input.focus();
    input.select();

    input.addEventListener('keydown', function(ev) {
      if (ev.key === 'Enter') { finishEditing(); }
      else if (ev.key === 'Escape') { cancelEditing(); }
    });
    input.addEventListener('blur', function() {
      // small delay to allow button clicks to process
      setTimeout(function() { if (editingInput) finishEditing(); }, 100);
    });
  }

  function finishEditing() {
    if (!editingInput) return;
    var val = editingInput.element.value.trim();
    if (editingInput.type === 'node') {
      var n = getNode(editingInput.id);
      if (n && val) n.label = val;
    } else {
      var e = getEdge(editingInput.id);
      if (e) e.label = val;
    }
    editingInput.element.remove();
    editingInput = null;
    markDirty();
    needsRedraw = true;
  }

  function cancelEditing() {
    if (!editingInput) return;
    editingInput.element.remove();
    editingInput = null;
  }

  // --- Actions ---
  function markDirty() { dirty = true; }

  function addNode(x, y) {
    var id = 'node_' + nextNodeId++;
    var node = { id: id, label: 'Bulle', x: x, y: y };
    state.nodes.push(node);
    markDirty();
    needsRedraw = true;
    selected = { type: 'node', id: id };
    startEditing(selected, 'node');
  }

  function addEdge(fromId, toId) {
    var id = 'edge_' + nextEdgeId++;
    var edge = { id: id, from: fromId, to: toId, label: '' };
    state.edges.push(edge);
    markDirty();
    needsRedraw = true;
    selected = { type: 'edge', id: id };
    startEditing(selected, 'edge');
  }

  function deleteSelected() {
    if (!selected) return;
    if (selected.type === 'node') {
      state.edges = state.edges.filter(function(e) {
        return e.from !== selected.id && e.to !== selected.id;
      });
      state.nodes = state.nodes.filter(function(n) { return n.id !== selected.id; });
    } else {
      state.edges = state.edges.filter(function(e) { return e.id !== selected.id; });
    }
    selected = null;
    markDirty();
    needsRedraw = true;
  }

  // --- Export / Import ---
  function exportJSON() {
    var data = JSON.stringify(state, null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'schema-escape.json';
    a.click();
    URL.revokeObjectURL(url);
    dirty = false;
  }

  function importJSON(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var data = JSON.parse(e.target.result);
        if (!Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
          alert('Fichier JSON invalide : il doit contenir "nodes" et "edges".');
          return;
        }
        // Validate edges reference existing nodes
        var nodeIds = {};
        for (var i = 0; i < data.nodes.length; i++) {
          nodeIds[data.nodes[i].id] = true;
        }
        for (var j = 0; j < data.edges.length; j++) {
          if (!nodeIds[data.edges[j].from] || !nodeIds[data.edges[j].to]) {
            alert('Fichier JSON invalide : un lien reference une salle inexistante.');
            return;
          }
        }
        state.nodes = data.nodes;
        state.edges = data.edges;
        // Reset counters
        var maxNode = 0, maxEdge = 0;
        for (var k = 0; k < state.nodes.length; k++) {
          var num = parseInt(state.nodes[k].id.replace('node_', ''), 10);
          if (num > maxNode) maxNode = num;
        }
        for (var l = 0; l < state.edges.length; l++) {
          var enum_ = parseInt(state.edges[l].id.replace('edge_', ''), 10);
          if (enum_ > maxEdge) maxEdge = enum_;
        }
        nextNodeId = maxNode + 1;
        nextEdgeId = maxEdge + 1;
        selected = null;
        edgeSource = null;
        dirty = false;
        needsRedraw = true;
      } catch (err) {
        alert('Erreur de lecture du fichier JSON : ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // --- Context menu for node type ---
  var ctxMenu = document.createElement('div');
  ctxMenu.className = 'escape-ctx-menu';
  ctxMenu.style.display = 'none';
  canvasWrap.appendChild(ctxMenu);

  function showContextMenu(nodeId, x, y) {
    ctxMenu.innerHTML = '';
    var types = ['normal', 'start', 'victory', 'defeat'];
    for (var i = 0; i < types.length; i++) {
      (function(t) {
        var item = document.createElement('div');
        item.className = 'escape-ctx-item';
        var dot = document.createElement('span');
        dot.className = 'escape-ctx-dot';
        dot.style.background = NODE_TYPES[t].fill;
        item.appendChild(dot);
        item.appendChild(document.createTextNode(NODE_TYPES[t].label));
        var node = getNode(nodeId);
        if (node && (node.nodeType || 'normal') === t) {
          item.classList.add('escape-ctx-active');
        }
        item.addEventListener('click', function() {
          var n = getNode(nodeId);
          if (n) {
            n.nodeType = t;
            markDirty();
            needsRedraw = true;
          }
          hideContextMenu();
        });
        ctxMenu.appendChild(item);
      })(types[i]);
    }
    ctxMenu.style.left = x + 'px';
    ctxMenu.style.top = y + 'px';
    ctxMenu.style.display = 'block';
  }

  function hideContextMenu() {
    ctxMenu.style.display = 'none';
  }

  // --- Event handlers ---
  canvas.addEventListener('mousedown', function(e) {
    hideContextMenu();
    if (editingInput) return;
    var pos = getMousePos(e);

    if (mode === 'addNode') {
      addNode(pos.x, pos.y);
      setMode('select');
      return;
    }

    if (mode === 'addEdge') {
      var node = hitTestNode(pos.x, pos.y);
      if (!node) return;
      if (!edgeSource) {
        edgeSource = node.id;
        updateStatus();
        needsRedraw = true;
      } else {
        addEdge(edgeSource, node.id);
        edgeSource = null;
        setMode('select');
      }
      return;
    }

    // Select mode
    var hitNode = hitTestNode(pos.x, pos.y);
    if (hitNode) {
      selected = { type: 'node', id: hitNode.id };
      dragging = { nodeId: hitNode.id, offsetX: pos.x - hitNode.x, offsetY: pos.y - hitNode.y };
      needsRedraw = true;
      return;
    }

    var hitEdge = hitTestEdge(pos.x, pos.y);
    if (hitEdge) {
      selected = { type: 'edge', id: hitEdge.id };
      needsRedraw = true;
      return;
    }

    // Pan: drag on empty space
    selected = null;
    var sp = getScreenPos(e);
    panning = { startX: sp.x, startY: sp.y, viewX0: viewX, viewY0: viewY };
    needsRedraw = true;
  });

  canvas.addEventListener('mousemove', function(e) {
    if (panning) {
      var sp = getScreenPos(e);
      viewX = panning.viewX0 - (sp.x - panning.startX) / viewZoom;
      viewY = panning.viewY0 - (sp.y - panning.startY) / viewZoom;
      canvas.style.cursor = 'grabbing';
      needsRedraw = true;
      return;
    }

    var pos = getMousePos(e);

    if (dragging) {
      var node = getNode(dragging.nodeId);
      if (node) {
        node.x = pos.x - dragging.offsetX;
        node.y = pos.y - dragging.offsetY;
        needsRedraw = true;
      }
      return;
    }

    // Hover detection
    var prevHovered = hovered;
    var hitNode = hitTestNode(pos.x, pos.y);
    if (hitNode) {
      hovered = { type: 'node', id: hitNode.id };
    } else {
      var hitEdge = hitTestEdge(pos.x, pos.y);
      if (hitEdge) {
        hovered = { type: 'edge', id: hitEdge.id };
      } else {
        hovered = null;
      }
    }

    if (mode === 'select') {
      canvas.style.cursor = hovered ? 'pointer' : 'default';
    }

    if (hovered !== prevHovered) needsRedraw = true;
  });

  canvas.addEventListener('mouseup', function() {
    if (dragging) markDirty();
    dragging = null;
    panning = null;
    if (mode === 'select') canvas.style.cursor = hovered ? 'pointer' : 'default';
  });

  canvas.addEventListener('dblclick', function(e) {
    var pos = getMousePos(e);
    var hitNode = hitTestNode(pos.x, pos.y);
    if (hitNode) {
      selected = { type: 'node', id: hitNode.id };
      startEditing(selected, 'node');
      return;
    }
    var hitEdge = hitTestEdge(pos.x, pos.y);
    if (hitEdge) {
      selected = { type: 'edge', id: hitEdge.id };
      startEditing(selected, 'edge');
      return;
    }
  });

  canvas.addEventListener('wheel', function(e) {
    e.preventDefault();
    var sp = getScreenPos(e);
    var worldBefore = screenToWorld(sp.x, sp.y);

    var delta = e.deltaY > 0 ? 0.9 : 1.1;
    viewZoom = Math.max(0.2, Math.min(5, viewZoom * delta));

    // Adjust pan so the point under cursor stays fixed
    var worldAfter = screenToWorld(sp.x, sp.y);
    viewX -= (worldAfter.x - worldBefore.x);
    viewY -= (worldAfter.y - worldBefore.y);
    needsRedraw = true;
  }, { passive: false });

  canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    var pos = getMousePos(e);
    var sp = getScreenPos(e);
    var hitNode = hitTestNode(pos.x, pos.y);
    if (hitNode) {
      selected = { type: 'node', id: hitNode.id };
      needsRedraw = true;
      showContextMenu(hitNode.id, sp.x, sp.y);
    }
  });

  document.addEventListener('keydown', function(e) {
    if (editingInput) return;

    if (e.key === 'Escape') {
      if (edgeSource) {
        edgeSource = null;
        updateStatus();
        needsRedraw = true;
      } else {
        setMode('select');
      }
      return;
    }

    if ((e.key === 'Delete' || e.key === 'Backspace') && selected) {
      e.preventDefault();
      deleteSelected();
    }
  });

  // --- Warn before leaving with unsaved changes ---
  window.addEventListener('beforeunload', function(e) {
    if (dirty) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  // --- Start render loop ---
  requestAnimationFrame(draw);
}
