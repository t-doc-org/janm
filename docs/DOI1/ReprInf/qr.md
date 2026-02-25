# Codes QR

## Qu'est-ce qu'un code QR ?

Un code QR (Quick Response code) est un type de code-barres qui permet de stocker des informations numériques et de les lire rapidement. Contrairement aux codes-barres traditionnels qui ne stockent que des données en une seule dimension, les codes QR peuvent stocker des données en deux dimensions, ce qui permet de coder beaucoup plus d'informations dans un espace plus petit.


## Structure d'un code QR

Un code QR est composé de plusieurs éléments clés :

| Élément | Description |
| :-- | :-- |
| Motifs de position | Trois carrés dans les coins (haut-gauche, haut-droit, bas-gauche) permettant d'identifier et d'orienter le code |
| Bande de synchronisation | Lignes alternées noires et blanches reliant les motifs de position |
| Zone tranquille | Bordure blanche autour du code QR |
| Données encodées | L'information réelle contenue dans le code |
| Motif de format | Information sur le niveau de correction d'erreur et le type de masque utilisé |


## Outil interactif : Explorer et décoder un code QR

Utilisez l'outil interactif ci-dessous pour décoder manuellement le texte de ce code QR

1. Mettez en évidence en **vert** les motifs de recherche
2. Mettez en évidence en **jaune** le motif de synchronisation
3. Mettez en évidence en **bleu** les séparateurs
4. Mettez en évidence en **rose** les 3 bits permettant de déterminer le masque à appliquer
5. Cliquez sur le masque adéquat pour l'appliquer sur tout le code QR
6. Mettez en évidence en **orange** les 4 bits permettant de déterminer l'encodage du texte.
7. Déterminez quel encodage est utilisé en
```{raw} html
<div id="qr-explorer" style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; border-radius: 8px; margin: 20px 0;">
  <div style="display: flex; gap: 20px; align-items: center; justify-content: center;">
    <div>
      <div id="qr-grid" style="display: inline-block; border: 2px solid #333; background: white; image-rendering: pixelated;"></div>
    </div>
    <div style="min-width: 280px; display: flex; flex-direction: column; justify-content: center; gap: 15px;">
      <div>
        <label style="font-size: 12px; font-weight: bold;">Outil :</label>
        <div style="display: flex; gap: 5px; margin-top: 5px;">
          <button id="tool-draw" style="flex: 1; padding: 6px; background: #4CAF50; color: white; cursor: pointer; border: none; border-radius: 4px; font-size: 11px;">Dessin</button>
          <button id="tool-erase" style="flex: 1; padding: 6px; background: #ccc; color: #333; cursor: pointer; border: none; border-radius: 4px; font-size: 11px;">Gomme</button>
        </div>
      </div>
      <div id="color-section">
        <label style="font-size: 12px; color: #333; display: block;">Couleur de sélection :</label>
        <input id="color-picker" type="color" value="#4CAF50" style="width: 40px; height: 30px; cursor: pointer; border: 1px solid #999; margin-top: 5px;">
      </div>
      <div>
        <label style="font-size: 12px; font-weight: bold;">Masques :</label>
        <div id="mask-selector" style="margin-top: 5px; display: flex; flex-wrap: wrap; gap: 4px;"></div>
      </div>
    </div>
  </div>
</div>
<script>
(function() {
  const SIZE=21,PIXEL_SIZE=15;
  const qrData=[[1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
  [1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0],
  [1,1,0,0,0,1,0,1,1,1,0,1,0,0,0,1,1,1,0,0,1],
  [0,0,0,1,0,1,1,0,0,1,0,1,0,1,0,1,1,0,0,1,1],
  [0,0,1,1,1,0,0,1,1,0,1,1,1,1,0,1,1,0,0,1,1],
  [0,1,0,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,0,1,1],
  [0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,1,1,1,1,0],
  [1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
  [1,0,1,1,1,0,1,0,1,0,0,0,1,0,1,1,1,0,0,0,0],
  [1,0,1,1,1,0,1,0,0,0,0,1,0,1,0,0,1,1,0,1,0],
  [1,0,1,1,1,0,1,0,1,0,0,1,0,1,1,1,1,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,1,1,0,0,1,0,0,1,0],
  [1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,0,0,1,1],
];
  const masks=[(i,j)=>(i+j)%2===0,(i,j)=>i%2===0,(i,j)=>j%3===0,(i,j)=>(i+j)%3===0,(i,j)=>(Math.floor(i/2)+Math.floor(j/3))%2===0,(i,j)=>((i*j)%2)+((i*j)%3)===0,(i,j)=>(((i*j)%2)+((i*j)%3))%2===0,(i,j)=>(((i+j)%2)+((i*j)%3))%2===0];
  let currentMask=-1,selectedPixels=new Map(),isSelecting=false,startX,startY,currentTool='draw';
  const canvas=document.createElement('canvas');
  canvas.width=SIZE*PIXEL_SIZE;canvas.height=SIZE*PIXEL_SIZE;canvas.style.cursor='crosshair';
  const ctx=canvas.getContext('2d');
  function isProtected(i,j){if((i<9&&j<9)||(i<9&&j>=SIZE-8)||(i>=SIZE-8&&j<9))return true;if(i===6||j===6)return true;if((i<9&&j===8)||(i===8&&j<9))return true;if((i<9&&j>=SIZE-8)||(i===8&&j>=SIZE-8))return true;if((i>=SIZE-8&&j===8)||(i===8&&j>=SIZE-8))return true;return false;}
  function drawQR(){ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);for(let i=0;i<SIZE;i++){for(let j=0;j<SIZE;j++){let p=qrData[i][j];if(currentMask>=0&&!isProtected(i,j)&&masks[currentMask](i,j))p=1-p;ctx.fillStyle=p?'black':'white';ctx.fillRect(j*PIXEL_SIZE,i*PIXEL_SIZE,PIXEL_SIZE,PIXEL_SIZE);if(selectedPixels.has(i*SIZE+j)){const col=selectedPixels.get(i*SIZE+j);ctx.fillStyle=col+'80';ctx.fillRect(j*PIXEL_SIZE,i*PIXEL_SIZE,PIXEL_SIZE,PIXEL_SIZE);}ctx.strokeStyle='#ddd';ctx.lineWidth=0.5;ctx.strokeRect(j*PIXEL_SIZE,i*PIXEL_SIZE,PIXEL_SIZE,PIXEL_SIZE);}}}
  canvas.addEventListener('mousedown',(e)=>{isSelecting=true;const r=canvas.getBoundingClientRect();startX=Math.floor((e.clientX-r.left)/PIXEL_SIZE);startY=Math.floor((e.clientY-r.top)/PIXEL_SIZE);});
  canvas.addEventListener('mousemove',(e)=>{if(!isSelecting)return;drawQR();const r=canvas.getBoundingClientRect(),curX=Math.floor((e.clientX-r.left)/PIXEL_SIZE),curY=Math.floor((e.clientY-r.top)/PIXEL_SIZE);const minX=Math.max(0,Math.min(startX,curX)),maxX=Math.min(SIZE-1,Math.max(startX,curX)),minY=Math.max(0,Math.min(startY,curY)),maxY=Math.min(SIZE-1,Math.max(startY,curY));ctx.strokeStyle=currentTool==='draw'?'#FFD700':'#FF6B6B';ctx.lineWidth=2;ctx.setLineDash([3,3]);ctx.strokeRect(minX*PIXEL_SIZE,minY*PIXEL_SIZE,(maxX-minX+1)*PIXEL_SIZE,(maxY-minY+1)*PIXEL_SIZE);ctx.setLineDash([]);});
  canvas.addEventListener('mouseup',(e)=>{if(!isSelecting)return;isSelecting=false;const r=canvas.getBoundingClientRect(),curX=Math.floor((e.clientX-r.left)/PIXEL_SIZE),curY=Math.floor((e.clientY-r.top)/PIXEL_SIZE);const minX=Math.max(0,Math.min(startX,curX)),maxX=Math.min(SIZE-1,Math.max(startX,curX)),minY=Math.max(0,Math.min(startY,curY)),maxY=Math.min(SIZE-1,Math.max(startY,curY));if(currentTool==='draw'){const col=document.getElementById('color-picker').value;for(let i=minY;i<=maxY;i++)for(let j=minX;j<=maxX;j++)selectedPixels.set(i*SIZE+j,col);}else{for(let i=minY;i<=maxY;i++)for(let j=minX;j<=maxX;j++)selectedPixels.delete(i*SIZE+j);}drawQR();});
  function createMaskPreview(maskIndex){const container=document.createElement('div');container.style.display='flex';container.style.flexDirection='column';container.style.alignItems='center';container.style.gap='2px';const formatCanvas=document.createElement('canvas');formatCanvas.width=42;formatCanvas.height=14;const fmtCtx=formatCanvas.getContext('2d');fmtCtx.fillStyle='#e0e0e0';fmtCtx.fillRect(0,0,45,15);const fmtPixelSize=14;if(maskIndex>=0){const maskBitsMap=[0b101,0b100,0b111,0b110,0b001,0b000,0b011,0b010];const v=maskBitsMap[maskIndex];const bits=[(v>>2)&1,(v>>1)&1,v&1];for(let j=0;j<3;j++){fmtCtx.fillStyle=bits[j]?'black':'white';fmtCtx.fillRect(j*fmtPixelSize,0,fmtPixelSize,14);fmtCtx.strokeStyle='#999';fmtCtx.lineWidth=1;fmtCtx.strokeRect(j*fmtPixelSize,0,fmtPixelSize,14);}}else{fmtCtx.strokeStyle='#999';fmtCtx.lineWidth=1;for(let j=0;j<3;j++){fmtCtx.fillStyle='#e0e0e0';fmtCtx.fillRect(j*fmtPixelSize,0,fmtPixelSize,14);fmtCtx.strokeRect(j*fmtPixelSize,0,fmtPixelSize,14);}fmtCtx.beginPath();fmtCtx.moveTo(0,0);fmtCtx.lineTo(42,14);fmtCtx.moveTo(42,0);fmtCtx.lineTo(0,14);fmtCtx.stroke();}container.appendChild(formatCanvas);const hr=document.createElement('div');hr.style.cssText='width:42px;height:1px;background:#aaa;';container.appendChild(hr);const PREV_GRID=6,PREV_PX=7;const patternCanvas=document.createElement('canvas');patternCanvas.width=PREV_GRID*PREV_PX;patternCanvas.height=PREV_GRID*PREV_PX;const prevCtx=patternCanvas.getContext('2d');prevCtx.fillStyle='#e0e0e0';prevCtx.fillRect(0,0,patternCanvas.width,patternCanvas.height);if(maskIndex>=0){for(let i=0;i<PREV_GRID;i++){for(let j=0;j<PREV_GRID;j++){prevCtx.fillStyle=masks[maskIndex](i,j)?'black':'white';prevCtx.fillRect(j*PREV_PX,i*PREV_PX,PREV_PX,PREV_PX);prevCtx.strokeStyle='#bbb';prevCtx.lineWidth=0.5;prevCtx.strokeRect(j*PREV_PX,i*PREV_PX,PREV_PX,PREV_PX);}}}else{prevCtx.strokeStyle='#999';prevCtx.lineWidth=1;for(let i=0;i<PREV_GRID;i++)for(let j=0;j<PREV_GRID;j++)prevCtx.strokeRect(j*PREV_PX,i*PREV_PX,PREV_PX,PREV_PX);prevCtx.beginPath();prevCtx.moveTo(0,0);prevCtx.lineTo(patternCanvas.width,patternCanvas.height);prevCtx.moveTo(patternCanvas.width,0);prevCtx.lineTo(0,patternCanvas.height);prevCtx.stroke();}container.appendChild(patternCanvas);return container;}
  const maskContainer=document.getElementById('mask-selector');
  [-1,0,1,2,3,4,5,6,7].forEach(maskIdx=>{const btn=document.createElement('button');btn.style.cssText='padding:3px;background:#f0f0f0;border:2px solid #ccc;cursor:pointer;border-radius:4px;display:flex;align-items:center;justify-content:center;width:50px;height:68px;transition:all 0.2s;';btn.title=maskIdx===-1?'Pas de masque':`Masque ${maskIdx}`;const preview=createMaskPreview(maskIdx);btn.appendChild(preview);btn.addEventListener('click',()=>{currentMask=maskIdx;document.querySelectorAll('#mask-selector button').forEach(b=>b.style.borderColor='#ccc');btn.style.borderColor='#4CAF50';btn.style.borderWidth='3px';drawQR();});if(maskIdx===-1){btn.click();}maskContainer.appendChild(btn);});
  document.getElementById('tool-draw').addEventListener('click',()=>{currentTool='draw';document.getElementById('tool-draw').style.background='#4CAF50';document.getElementById('tool-draw').style.color='white';document.getElementById('tool-erase').style.background='#ccc';document.getElementById('tool-erase').style.color='#333';document.getElementById('color-section').style.opacity='1';document.getElementById('color-picker').disabled=false;});
  document.getElementById('tool-erase').addEventListener('click',()=>{currentTool='erase';document.getElementById('tool-erase').style.background='#ff6b6b';document.getElementById('tool-erase').style.color='white';document.getElementById('tool-draw').style.background='#ccc';document.getElementById('tool-draw').style.color='#333';document.getElementById('color-section').style.opacity='0.5';document.getElementById('color-picker').disabled=true;});
  document.getElementById('qr-grid').appendChild(canvas);
  drawQR();
})();
</script>
```

## Tables de référence pour le décodage

Les 4 premiers bits de données (en bas à droite du QR code, après application du masque) indiquent le mode d'encodage utilisé :

| 4 bits | Décimal | Mode | Description |
| :-- | :-- | :-- | :-- |
| 0001 | 1 | Numérique | Chiffres 0-9 uniquement |
| 0010 | 2 | Alphanumérique | Chiffres, lettres majuscules et quelques symboles |
| 0100 | 4 | ASCII | Caractères ASCII / ISO 8859-1 |
| 1000 | 8 | Kanji | Caractères japonais |


```{raw} html
<div id="encoding-tabs" style="font-family: Arial, sans-serif; margin: 20px 0;">
  <div style="display: flex; gap: 0; border-bottom: 2px solid #333;">
    <button class="enc-tab active" data-tab="numeric" style="padding: 8px 16px; background: #333; color: white; border: none; border-radius: 6px 6px 0 0; cursor: pointer; font-size: 13px; font-weight: bold;">Numérique</button>
    <button class="enc-tab" data-tab="alphanum" style="padding: 8px 16px; background: #ddd; color: #333; border: none; border-radius: 6px 6px 0 0; cursor: pointer; font-size: 13px;">Alphanumérique</button>
    <button class="enc-tab" data-tab="byte" style="padding: 8px 16px; background: #ddd; color: #333; border: none; border-radius: 6px 6px 0 0; cursor: pointer; font-size: 13px;">ASCII</button>
    <button class="enc-tab" data-tab="kanji" style="padding: 8px 16px; background: #ddd; color: #333; border: none; border-radius: 6px 6px 0 0; cursor: pointer; font-size: 13px;">Kanji</button>
  </div>
  <div id="tab-numeric" class="enc-panel" style="display: block; padding: 15px; background: #fafafa; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
    <p style="margin: 0 0 10px 0; font-size: 13px;">En mode numérique, les chiffres sont groupés par <strong>3</strong> et encodés sur <strong>10 bits</strong> (le dernier groupe utilise 7 bits s'il reste 2 chiffres, ou 4 bits s'il en reste 1).</p>
    <p style="margin: 0; font-size: 13px;">Il suffit de convertir chaque groupe de 10 bits en décimal pour obtenir le nombre à 3 chiffres correspondant.</p>
    <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;"><em>Exemple : 0001010110 → 86 → les chiffres "086"</em></p>
  </div>
  <div id="tab-alphanum" class="enc-panel" style="display: none; padding: 15px; background: #fafafa; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
    <p style="margin: 0 0 10px 0; font-size: 13px;">En mode alphanumérique, les caractères sont groupés par <strong>2</strong> et encodés sur <strong>11 bits</strong> : <code>valeur = c1 × 45 + c2</code>. Le dernier caractère seul utilise 6 bits.</p>
    <table style="border-collapse: collapse; font-size: 12px; width: 100%;">
      <tr><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Val.</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Car.</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Val.</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Car.</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Val.</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Car.</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Val.</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Car.</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Val.</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Car.</th></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">9</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">9</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">18</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">I</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">27</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">R</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">36</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">SP</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">1</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">1</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">10</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">A</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">19</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">J</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">28</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">S</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">37</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">$</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">2</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">2</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">11</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">B</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">20</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">K</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">29</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">T</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">38</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">%</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">3</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">3</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">12</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">C</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">21</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">L</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">30</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">U</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">39</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">*</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">4</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">4</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">13</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">D</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">22</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">M</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">31</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">V</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">40</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">+</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">5</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">5</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">14</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">E</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">23</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">N</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">32</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">W</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">41</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">-</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">6</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">6</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">15</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">F</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">24</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">O</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">33</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">X</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">42</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">.</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">7</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">7</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">16</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">G</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">25</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">P</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">34</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">Y</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">43</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">/</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">8</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">8</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">17</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">H</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">26</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">Q</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">35</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">Z</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">44</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">:</td></tr>
    </table>
  </div>
  <div id="tab-byte" class="enc-panel" style="display: none; padding: 15px; background: #fafafa; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; max-height: 400px; overflow-y: auto;">
    <p style="margin: 0 0 10px 0; font-size: 13px;">En mode octet, chaque caractère est encodé sur <strong>8 bits</strong>. La valeur correspond au code ASCII / ISO 8859-1 du caractère.</p>
    <table style="border-collapse: collapse; font-size: 11px; width: 100%;">
      <tr><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Déc.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Bin.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Car.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Déc.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Bin.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Car.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Déc.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Bin.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Car.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Déc.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Bin.</th><th style="border:1px solid #ccc;padding:2px 4px;background:#eee;">Car.</th></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">32</td><td style="border:1px solid #ccc;padding:2px 4px;">00100000</td><td style="border:1px solid #ccc;padding:2px 4px;">SP</td><td style="border:1px solid #ccc;padding:2px 4px;">56</td><td style="border:1px solid #ccc;padding:2px 4px;">00111000</td><td style="border:1px solid #ccc;padding:2px 4px;">8</td><td style="border:1px solid #ccc;padding:2px 4px;">80</td><td style="border:1px solid #ccc;padding:2px 4px;">01010000</td><td style="border:1px solid #ccc;padding:2px 4px;">P</td><td style="border:1px solid #ccc;padding:2px 4px;">104</td><td style="border:1px solid #ccc;padding:2px 4px;">01101000</td><td style="border:1px solid #ccc;padding:2px 4px;">h</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">33</td><td style="border:1px solid #ccc;padding:2px 4px;">00100001</td><td style="border:1px solid #ccc;padding:2px 4px;">!</td><td style="border:1px solid #ccc;padding:2px 4px;">57</td><td style="border:1px solid #ccc;padding:2px 4px;">00111001</td><td style="border:1px solid #ccc;padding:2px 4px;">9</td><td style="border:1px solid #ccc;padding:2px 4px;">81</td><td style="border:1px solid #ccc;padding:2px 4px;">01010001</td><td style="border:1px solid #ccc;padding:2px 4px;">Q</td><td style="border:1px solid #ccc;padding:2px 4px;">105</td><td style="border:1px solid #ccc;padding:2px 4px;">01101001</td><td style="border:1px solid #ccc;padding:2px 4px;">i</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">34</td><td style="border:1px solid #ccc;padding:2px 4px;">00100010</td><td style="border:1px solid #ccc;padding:2px 4px;">"</td><td style="border:1px solid #ccc;padding:2px 4px;">58</td><td style="border:1px solid #ccc;padding:2px 4px;">00111010</td><td style="border:1px solid #ccc;padding:2px 4px;">:</td><td style="border:1px solid #ccc;padding:2px 4px;">82</td><td style="border:1px solid #ccc;padding:2px 4px;">01010010</td><td style="border:1px solid #ccc;padding:2px 4px;">R</td><td style="border:1px solid #ccc;padding:2px 4px;">106</td><td style="border:1px solid #ccc;padding:2px 4px;">01101010</td><td style="border:1px solid #ccc;padding:2px 4px;">j</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">35</td><td style="border:1px solid #ccc;padding:2px 4px;">00100011</td><td style="border:1px solid #ccc;padding:2px 4px;">#</td><td style="border:1px solid #ccc;padding:2px 4px;">59</td><td style="border:1px solid #ccc;padding:2px 4px;">00111011</td><td style="border:1px solid #ccc;padding:2px 4px;">;</td><td style="border:1px solid #ccc;padding:2px 4px;">83</td><td style="border:1px solid #ccc;padding:2px 4px;">01010011</td><td style="border:1px solid #ccc;padding:2px 4px;">S</td><td style="border:1px solid #ccc;padding:2px 4px;">107</td><td style="border:1px solid #ccc;padding:2px 4px;">01101011</td><td style="border:1px solid #ccc;padding:2px 4px;">k</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">36</td><td style="border:1px solid #ccc;padding:2px 4px;">00100100</td><td style="border:1px solid #ccc;padding:2px 4px;">$</td><td style="border:1px solid #ccc;padding:2px 4px;">60</td><td style="border:1px solid #ccc;padding:2px 4px;">00111100</td><td style="border:1px solid #ccc;padding:2px 4px;">&lt;</td><td style="border:1px solid #ccc;padding:2px 4px;">84</td><td style="border:1px solid #ccc;padding:2px 4px;">01010100</td><td style="border:1px solid #ccc;padding:2px 4px;">T</td><td style="border:1px solid #ccc;padding:2px 4px;">108</td><td style="border:1px solid #ccc;padding:2px 4px;">01101100</td><td style="border:1px solid #ccc;padding:2px 4px;">l</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">37</td><td style="border:1px solid #ccc;padding:2px 4px;">00100101</td><td style="border:1px solid #ccc;padding:2px 4px;">%</td><td style="border:1px solid #ccc;padding:2px 4px;">61</td><td style="border:1px solid #ccc;padding:2px 4px;">00111101</td><td style="border:1px solid #ccc;padding:2px 4px;">=</td><td style="border:1px solid #ccc;padding:2px 4px;">85</td><td style="border:1px solid #ccc;padding:2px 4px;">01010101</td><td style="border:1px solid #ccc;padding:2px 4px;">U</td><td style="border:1px solid #ccc;padding:2px 4px;">109</td><td style="border:1px solid #ccc;padding:2px 4px;">01101101</td><td style="border:1px solid #ccc;padding:2px 4px;">m</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">38</td><td style="border:1px solid #ccc;padding:2px 4px;">00100110</td><td style="border:1px solid #ccc;padding:2px 4px;">&amp;</td><td style="border:1px solid #ccc;padding:2px 4px;">62</td><td style="border:1px solid #ccc;padding:2px 4px;">00111110</td><td style="border:1px solid #ccc;padding:2px 4px;">&gt;</td><td style="border:1px solid #ccc;padding:2px 4px;">86</td><td style="border:1px solid #ccc;padding:2px 4px;">01010110</td><td style="border:1px solid #ccc;padding:2px 4px;">V</td><td style="border:1px solid #ccc;padding:2px 4px;">110</td><td style="border:1px solid #ccc;padding:2px 4px;">01101110</td><td style="border:1px solid #ccc;padding:2px 4px;">n</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">39</td><td style="border:1px solid #ccc;padding:2px 4px;">00100111</td><td style="border:1px solid #ccc;padding:2px 4px;">'</td><td style="border:1px solid #ccc;padding:2px 4px;">63</td><td style="border:1px solid #ccc;padding:2px 4px;">00111111</td><td style="border:1px solid #ccc;padding:2px 4px;">?</td><td style="border:1px solid #ccc;padding:2px 4px;">87</td><td style="border:1px solid #ccc;padding:2px 4px;">01010111</td><td style="border:1px solid #ccc;padding:2px 4px;">W</td><td style="border:1px solid #ccc;padding:2px 4px;">111</td><td style="border:1px solid #ccc;padding:2px 4px;">01101111</td><td style="border:1px solid #ccc;padding:2px 4px;">o</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">40</td><td style="border:1px solid #ccc;padding:2px 4px;">00101000</td><td style="border:1px solid #ccc;padding:2px 4px;">(</td><td style="border:1px solid #ccc;padding:2px 4px;">64</td><td style="border:1px solid #ccc;padding:2px 4px;">01000000</td><td style="border:1px solid #ccc;padding:2px 4px;">@</td><td style="border:1px solid #ccc;padding:2px 4px;">88</td><td style="border:1px solid #ccc;padding:2px 4px;">01011000</td><td style="border:1px solid #ccc;padding:2px 4px;">X</td><td style="border:1px solid #ccc;padding:2px 4px;">112</td><td style="border:1px solid #ccc;padding:2px 4px;">01110000</td><td style="border:1px solid #ccc;padding:2px 4px;">p</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">41</td><td style="border:1px solid #ccc;padding:2px 4px;">00101001</td><td style="border:1px solid #ccc;padding:2px 4px;">)</td><td style="border:1px solid #ccc;padding:2px 4px;">65</td><td style="border:1px solid #ccc;padding:2px 4px;">01000001</td><td style="border:1px solid #ccc;padding:2px 4px;">A</td><td style="border:1px solid #ccc;padding:2px 4px;">89</td><td style="border:1px solid #ccc;padding:2px 4px;">01011001</td><td style="border:1px solid #ccc;padding:2px 4px;">Y</td><td style="border:1px solid #ccc;padding:2px 4px;">113</td><td style="border:1px solid #ccc;padding:2px 4px;">01110001</td><td style="border:1px solid #ccc;padding:2px 4px;">q</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">42</td><td style="border:1px solid #ccc;padding:2px 4px;">00101010</td><td style="border:1px solid #ccc;padding:2px 4px;">*</td><td style="border:1px solid #ccc;padding:2px 4px;">66</td><td style="border:1px solid #ccc;padding:2px 4px;">01000010</td><td style="border:1px solid #ccc;padding:2px 4px;">B</td><td style="border:1px solid #ccc;padding:2px 4px;">90</td><td style="border:1px solid #ccc;padding:2px 4px;">01011010</td><td style="border:1px solid #ccc;padding:2px 4px;">Z</td><td style="border:1px solid #ccc;padding:2px 4px;">114</td><td style="border:1px solid #ccc;padding:2px 4px;">01110010</td><td style="border:1px solid #ccc;padding:2px 4px;">r</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">43</td><td style="border:1px solid #ccc;padding:2px 4px;">00101011</td><td style="border:1px solid #ccc;padding:2px 4px;">+</td><td style="border:1px solid #ccc;padding:2px 4px;">67</td><td style="border:1px solid #ccc;padding:2px 4px;">01000011</td><td style="border:1px solid #ccc;padding:2px 4px;">C</td><td style="border:1px solid #ccc;padding:2px 4px;">91</td><td style="border:1px solid #ccc;padding:2px 4px;">01011011</td><td style="border:1px solid #ccc;padding:2px 4px;">[</td><td style="border:1px solid #ccc;padding:2px 4px;">115</td><td style="border:1px solid #ccc;padding:2px 4px;">01110011</td><td style="border:1px solid #ccc;padding:2px 4px;">s</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">44</td><td style="border:1px solid #ccc;padding:2px 4px;">00101100</td><td style="border:1px solid #ccc;padding:2px 4px;">,</td><td style="border:1px solid #ccc;padding:2px 4px;">68</td><td style="border:1px solid #ccc;padding:2px 4px;">01000100</td><td style="border:1px solid #ccc;padding:2px 4px;">D</td><td style="border:1px solid #ccc;padding:2px 4px;">92</td><td style="border:1px solid #ccc;padding:2px 4px;">01011100</td><td style="border:1px solid #ccc;padding:2px 4px;">\</td><td style="border:1px solid #ccc;padding:2px 4px;">116</td><td style="border:1px solid #ccc;padding:2px 4px;">01110100</td><td style="border:1px solid #ccc;padding:2px 4px;">t</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">45</td><td style="border:1px solid #ccc;padding:2px 4px;">00101101</td><td style="border:1px solid #ccc;padding:2px 4px;">-</td><td style="border:1px solid #ccc;padding:2px 4px;">69</td><td style="border:1px solid #ccc;padding:2px 4px;">01000101</td><td style="border:1px solid #ccc;padding:2px 4px;">E</td><td style="border:1px solid #ccc;padding:2px 4px;">93</td><td style="border:1px solid #ccc;padding:2px 4px;">01011101</td><td style="border:1px solid #ccc;padding:2px 4px;">]</td><td style="border:1px solid #ccc;padding:2px 4px;">117</td><td style="border:1px solid #ccc;padding:2px 4px;">01110101</td><td style="border:1px solid #ccc;padding:2px 4px;">u</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">46</td><td style="border:1px solid #ccc;padding:2px 4px;">00101110</td><td style="border:1px solid #ccc;padding:2px 4px;">.</td><td style="border:1px solid #ccc;padding:2px 4px;">70</td><td style="border:1px solid #ccc;padding:2px 4px;">01000110</td><td style="border:1px solid #ccc;padding:2px 4px;">F</td><td style="border:1px solid #ccc;padding:2px 4px;">94</td><td style="border:1px solid #ccc;padding:2px 4px;">01011110</td><td style="border:1px solid #ccc;padding:2px 4px;">^</td><td style="border:1px solid #ccc;padding:2px 4px;">118</td><td style="border:1px solid #ccc;padding:2px 4px;">01110110</td><td style="border:1px solid #ccc;padding:2px 4px;">v</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">47</td><td style="border:1px solid #ccc;padding:2px 4px;">00101111</td><td style="border:1px solid #ccc;padding:2px 4px;">/</td><td style="border:1px solid #ccc;padding:2px 4px;">71</td><td style="border:1px solid #ccc;padding:2px 4px;">01000111</td><td style="border:1px solid #ccc;padding:2px 4px;">G</td><td style="border:1px solid #ccc;padding:2px 4px;">95</td><td style="border:1px solid #ccc;padding:2px 4px;">01011111</td><td style="border:1px solid #ccc;padding:2px 4px;">_</td><td style="border:1px solid #ccc;padding:2px 4px;">119</td><td style="border:1px solid #ccc;padding:2px 4px;">01110111</td><td style="border:1px solid #ccc;padding:2px 4px;">w</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">48</td><td style="border:1px solid #ccc;padding:2px 4px;">00110000</td><td style="border:1px solid #ccc;padding:2px 4px;">0</td><td style="border:1px solid #ccc;padding:2px 4px;">72</td><td style="border:1px solid #ccc;padding:2px 4px;">01001000</td><td style="border:1px solid #ccc;padding:2px 4px;">H</td><td style="border:1px solid #ccc;padding:2px 4px;">96</td><td style="border:1px solid #ccc;padding:2px 4px;">01100000</td><td style="border:1px solid #ccc;padding:2px 4px;">`</td><td style="border:1px solid #ccc;padding:2px 4px;">120</td><td style="border:1px solid #ccc;padding:2px 4px;">01111000</td><td style="border:1px solid #ccc;padding:2px 4px;">x</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">49</td><td style="border:1px solid #ccc;padding:2px 4px;">00110001</td><td style="border:1px solid #ccc;padding:2px 4px;">1</td><td style="border:1px solid #ccc;padding:2px 4px;">73</td><td style="border:1px solid #ccc;padding:2px 4px;">01001001</td><td style="border:1px solid #ccc;padding:2px 4px;">I</td><td style="border:1px solid #ccc;padding:2px 4px;">97</td><td style="border:1px solid #ccc;padding:2px 4px;">01100001</td><td style="border:1px solid #ccc;padding:2px 4px;">a</td><td style="border:1px solid #ccc;padding:2px 4px;">121</td><td style="border:1px solid #ccc;padding:2px 4px;">01111001</td><td style="border:1px solid #ccc;padding:2px 4px;">y</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">50</td><td style="border:1px solid #ccc;padding:2px 4px;">00110010</td><td style="border:1px solid #ccc;padding:2px 4px;">2</td><td style="border:1px solid #ccc;padding:2px 4px;">74</td><td style="border:1px solid #ccc;padding:2px 4px;">01001010</td><td style="border:1px solid #ccc;padding:2px 4px;">J</td><td style="border:1px solid #ccc;padding:2px 4px;">98</td><td style="border:1px solid #ccc;padding:2px 4px;">01100010</td><td style="border:1px solid #ccc;padding:2px 4px;">b</td><td style="border:1px solid #ccc;padding:2px 4px;">122</td><td style="border:1px solid #ccc;padding:2px 4px;">01111010</td><td style="border:1px solid #ccc;padding:2px 4px;">z</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">51</td><td style="border:1px solid #ccc;padding:2px 4px;">00110011</td><td style="border:1px solid #ccc;padding:2px 4px;">3</td><td style="border:1px solid #ccc;padding:2px 4px;">75</td><td style="border:1px solid #ccc;padding:2px 4px;">01001011</td><td style="border:1px solid #ccc;padding:2px 4px;">K</td><td style="border:1px solid #ccc;padding:2px 4px;">99</td><td style="border:1px solid #ccc;padding:2px 4px;">01100011</td><td style="border:1px solid #ccc;padding:2px 4px;">c</td><td style="border:1px solid #ccc;padding:2px 4px;">123</td><td style="border:1px solid #ccc;padding:2px 4px;">01111011</td><td style="border:1px solid #ccc;padding:2px 4px;">{</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">52</td><td style="border:1px solid #ccc;padding:2px 4px;">00110100</td><td style="border:1px solid #ccc;padding:2px 4px;">4</td><td style="border:1px solid #ccc;padding:2px 4px;">76</td><td style="border:1px solid #ccc;padding:2px 4px;">01001100</td><td style="border:1px solid #ccc;padding:2px 4px;">L</td><td style="border:1px solid #ccc;padding:2px 4px;">100</td><td style="border:1px solid #ccc;padding:2px 4px;">01100100</td><td style="border:1px solid #ccc;padding:2px 4px;">d</td><td style="border:1px solid #ccc;padding:2px 4px;">124</td><td style="border:1px solid #ccc;padding:2px 4px;">01111100</td><td style="border:1px solid #ccc;padding:2px 4px;">|</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">53</td><td style="border:1px solid #ccc;padding:2px 4px;">00110101</td><td style="border:1px solid #ccc;padding:2px 4px;">5</td><td style="border:1px solid #ccc;padding:2px 4px;">77</td><td style="border:1px solid #ccc;padding:2px 4px;">01001101</td><td style="border:1px solid #ccc;padding:2px 4px;">M</td><td style="border:1px solid #ccc;padding:2px 4px;">101</td><td style="border:1px solid #ccc;padding:2px 4px;">01100101</td><td style="border:1px solid #ccc;padding:2px 4px;">e</td><td style="border:1px solid #ccc;padding:2px 4px;">125</td><td style="border:1px solid #ccc;padding:2px 4px;">01111101</td><td style="border:1px solid #ccc;padding:2px 4px;">}</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">54</td><td style="border:1px solid #ccc;padding:2px 4px;">00110110</td><td style="border:1px solid #ccc;padding:2px 4px;">6</td><td style="border:1px solid #ccc;padding:2px 4px;">78</td><td style="border:1px solid #ccc;padding:2px 4px;">01001110</td><td style="border:1px solid #ccc;padding:2px 4px;">N</td><td style="border:1px solid #ccc;padding:2px 4px;">102</td><td style="border:1px solid #ccc;padding:2px 4px;">01100110</td><td style="border:1px solid #ccc;padding:2px 4px;">f</td><td style="border:1px solid #ccc;padding:2px 4px;">126</td><td style="border:1px solid #ccc;padding:2px 4px;">01111110</td><td style="border:1px solid #ccc;padding:2px 4px;">~</td></tr>
      <tr><td style="border:1px solid #ccc;padding:2px 4px;">55</td><td style="border:1px solid #ccc;padding:2px 4px;">00110111</td><td style="border:1px solid #ccc;padding:2px 4px;">7</td><td style="border:1px solid #ccc;padding:2px 4px;">79</td><td style="border:1px solid #ccc;padding:2px 4px;">01001111</td><td style="border:1px solid #ccc;padding:2px 4px;">O</td><td style="border:1px solid #ccc;padding:2px 4px;">103</td><td style="border:1px solid #ccc;padding:2px 4px;">01100111</td><td style="border:1px solid #ccc;padding:2px 4px;">g</td><td style="border:1px solid #ccc;padding:2px 4px;"></td><td style="border:1px solid #ccc;padding:2px 4px;"></td><td style="border:1px solid #ccc;padding:2px 4px;"></td></tr>
    </table>
  </div>
  <div id="tab-kanji" class="enc-panel" style="display: none; padding: 15px; background: #fafafa; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
    <p style="margin: 0 0 10px 0; font-size: 13px;">En mode Kanji, chaque caractère est encodé sur <strong>13 bits</strong>. Le QR code utilise le jeu de caractères <strong>Shift JIS</strong>. La valeur encodée est obtenue après soustraction d'un offset selon la plage du caractère.</p>
    <p style="margin: 0 0 10px 0; font-size: 13px;">Voici quelques exemples de caractères Kanji courants avec leur valeur encodée :</p>
    <table style="border-collapse: collapse; font-size: 12px; width: 100%;">
      <tr><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Kanji</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Signification</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Shift JIS</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">Valeur encodée</th><th style="border:1px solid #ccc;padding:3px 6px;background:#eee;">13 bits</th></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">茗</td><td style="border:1px solid #ccc;padding:3px 6px;">thé</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x8ACF</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x0ACF</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0001011001111</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">点</td><td style="border:1px solid #ccc;padding:3px 6px;">point</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x9356</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x0D56</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0011010101100</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">人</td><td style="border:1px solid #ccc;padding:3px 6px;">personne</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x906C</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x0A6C</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0001010011011</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">山</td><td style="border:1px solid #ccc;padding:3px 6px;">montagne</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x8E52</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x0852</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0001000010100</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">水</td><td style="border:1px solid #ccc;padding:3px 6px;">eau</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x9085</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x0A85</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0001010100010</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">日</td><td style="border:1px solid #ccc;padding:3px 6px;">jour / soleil</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x93FA</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x0DFA</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0011011111010</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">月</td><td style="border:1px solid #ccc;padding:3px 6px;">lune / mois</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x8C8E</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x0C8E</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0001100100011</td></tr>
      <tr><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">火</td><td style="border:1px solid #ccc;padding:3px 6px;">feu</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x89CE</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0x09CE</td><td style="border:1px solid #ccc;padding:3px 6px;text-align:center;">0001001110011</td></tr>
    </table>
    <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;"><em>Calcul : pour les codes Shift JIS entre 0x8140 et 0x9FFC, soustraire 0x8140. Pour ceux entre 0xE040 et 0xEBBF, soustraire 0xC140. Puis : octet haut × 0xC0 + octet bas.</em></p>
  </div>
</div>
<script>
(function(){
  document.querySelectorAll('.enc-tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      document.querySelectorAll('.enc-tab').forEach(function(t){t.style.background='#ddd';t.style.color='#333';t.classList.remove('active');});
      document.querySelectorAll('.enc-panel').forEach(function(p){p.style.display='none';});
      tab.style.background='#333';tab.style.color='white';tab.classList.add('active');
      document.getElementById('tab-'+tab.getAttribute('data-tab')).style.display='block';
    });
  });
})();
</script>
```

## Sens de lecture d'un QR code v1

Le QR code se lit en suivant un parcours en **zigzag**, partant du **coin inférieur droit** et remontant par bandes de 2 colonnes. Dans chaque bande, on lit d'abord la colonne de droite puis celle de gauche, en alternant montée et descente. La colonne 6 (synchronisation) est sautée.

```{raw} html
<div id="qr-reading" style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; border-radius: 8px; margin: 20px 0;">
  <div style="display: flex; gap: 30px; align-items: flex-start; justify-content: center; flex-wrap: wrap;">
    <div>
      <canvas id="reading-canvas" style="border: 1px solid #999; border-radius: 4px;"></canvas>
    </div>
    <div style="min-width: 220px;">
      <div style="margin-bottom: 12px;">
        <label style="font-size: 12px; font-weight: bold; display:block; margin-bottom:4px;">Nb. caractères données :</label>
        <input id="data-chars" type="number" min="1" max="14" value="10" style="width: 60px; padding: 4px; border:1px solid #aaa; border-radius:4px;">
        <span style="font-size:11px;color:#666;margin-left:6px;">(mode octet, EC-M)</span>
      </div>
      <div id="reading-legend" style="font-size: 12px; line-height: 2.2;"></div>
      <div style="margin-top:12px;font-size:11px;color:#666;border-top:1px solid #ccc;padding-top:8px;">
        <strong>Lecture :</strong> dans chaque bande de 2 colonnes, on lit la colonne droite puis gauche, ligne par ligne.<br>
        <span style="color:red;">■</span> = module de départ (bit 0)
      </div>
    </div>
  </div>
  <h4 style="margin-top: 20px; margin-bottom: 10px;">Structure linéaire par mot de code</h4>
  <p style="font-size:12px;color:#555;margin:0 0 10px 0;">Chaque mot de code (codeword) contient 8 bits. Le bit le plus significatif (MSB, 2⁷) est lu en premier.</p>
  <div id="reading-linear" style="overflow-x: auto;"></div>
</div>
<script>
(function(){
  var SIZE=21,PX=22;
  var canvas=document.getElementById('reading-canvas');
  var ctx=canvas.getContext('2d');
  canvas.width=SIZE*PX;canvas.height=SIZE*PX;
  function isP(r,c){if((r<9&&c<9)||(r<9&&c>=13)||(r>=13&&c<9))return true;if(r===6||c===6)return true;return false;}
  function getOrder(){var o=[],up=true;for(var right=SIZE-1;right>=1;right-=2){if(right===6)right=5;for(var ri=0;ri<SIZE;ri++){var row=up?(SIZE-1-ri):ri;if(!isP(row,right))o.push([row,right]);if(right-1>=0&&!isP(row,right-1))o.push([row,right-1]);}up=!up;}return o;}
  var order=getOrder();
  var ZONES=[{name:'Mode (4 bits)',color:'#FF9800',short:'M'},{name:'Longueur (8 bits)',color:'#2196F3',short:'L'},{name:'Données',color:'#4CAF50',short:'D'},{name:'Terminateur (4 bits)',color:'#f44336',short:'T'},{name:'Remplissage',color:'#9E9E9E',short:'R'},{name:'Correction d\'erreur',color:'#9C27B0',short:'EC'}];
  function getZoneBounds(n){n=Math.max(1,Math.min(14,n));var de=11+n*8,ts=de+1,te=ts+3,ps=te+1;var b=[{s:0,e:3,z:0},{s:4,e:11,z:1},{s:12,e:de,z:2},{s:ts,e:te,z:3}];if(ps<=127)b.push({s:ps,e:127,z:4});b.push({s:128,e:207,z:5});return b;}
  function zoneOf(bit,bounds){for(var i=0;i<bounds.length;i++){if(bit>=bounds[i].s&&bit<=bounds[i].e)return bounds[i].z;}return-1;}
  function draw(){
    var nChars=parseInt(document.getElementById('data-chars').value)||10;
    var bounds=getZoneBounds(nChars);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
    var i,r,c;
    for(r=0;r<SIZE;r++)for(c=0;c<SIZE;c++){if(isP(r,c)){ctx.fillStyle='#e8e8e8';ctx.fillRect(c*PX,r*PX,PX,PX);ctx.strokeStyle='#d0d0d0';ctx.lineWidth=0.5;ctx.strokeRect(c*PX,r*PX,PX,PX);}}
    for(i=0;i<order.length;i++){r=order[i][0];c=order[i][1];var z=zoneOf(i,bounds);var col=z>=0?ZONES[z].color:'#bbb';ctx.fillStyle=col+'CC';ctx.fillRect(c*PX,r*PX,PX,PX);ctx.strokeStyle='#fff';ctx.lineWidth=0.5;ctx.strokeRect(c*PX,r*PX,PX,PX);}
    ctx.font='bold 9px Arial';ctx.textAlign='center';ctx.textBaseline='middle';
    for(i=0;i<Math.min(24,order.length);i++){r=order[i][0];c=order[i][1];ctx.fillStyle='#fff';ctx.fillText(i,c*PX+PX/2,r*PX+PX/2);}
    var up=true;
    for(var right=SIZE-1;right>=1;right-=2){if(right===6)right=5;var cx=(right-0.5)*PX;ctx.fillStyle='rgba(0,0,0,0.25)';ctx.beginPath();if(up){ctx.moveTo(cx-5,10);ctx.lineTo(cx+5,10);ctx.lineTo(cx,3);}else{ctx.moveTo(cx-5,SIZE*PX-10);ctx.lineTo(cx+5,SIZE*PX-10);ctx.lineTo(cx,SIZE*PX-3);}ctx.fill();up=!up;}
    if(order.length>0){r=order[0][0];c=order[0][1];ctx.strokeStyle='#ff0000';ctx.lineWidth=2.5;ctx.strokeRect(c*PX+1,r*PX+1,PX-2,PX-2);}
    var legend=document.getElementById('reading-legend');
    legend.innerHTML=ZONES.map(function(z){return '<div><span style="display:inline-block;width:14px;height:14px;background:'+z.color+'CC;border:1px solid #999;vertical-align:middle;margin-right:6px;border-radius:2px;"></span>'+z.name+'</div>';}).join('');
    buildLinear(bounds);
  }
  function buildLinear(bounds){
    var container=document.getElementById('reading-linear');
    var html='<table style="border-collapse:collapse;font-size:11px;font-family:monospace;"><tr><th style="border:1px solid #ccc;padding:3px 8px;background:#eee;">CW</th>';
    for(var b=7;b>=0;b--)html+='<th style="border:1px solid #ccc;padding:3px 6px;background:#eee;min-width:28px;">2<sup>'+b+'</sup></th>';
    html+='<th style="border:1px solid #ccc;padding:3px 10px;background:#eee;">Zone</th></tr>';
    for(var cw=0;cw<26;cw++){html+='<tr><td style="border:1px solid #ccc;padding:3px 8px;font-weight:bold;background:#f9f9f9;text-align:center;">'+(cw+1)+'</td>';var zset={};for(var b=0;b<8;b++){var bit=cw*8+b;var z=zoneOf(bit,bounds);var col=z>=0?ZONES[z].color+'30':'#fff';var sh=z>=0?ZONES[z].short:'';if(z>=0)zset[ZONES[z].name]=1;html+='<td style="border:1px solid #ccc;padding:3px 6px;background:'+col+';text-align:center;" title="Bit '+bit+'">'+sh+'</td>';}var znames=Object.keys(zset);html+='<td style="border:1px solid #ccc;padding:3px 8px;font-size:10px;font-family:Arial,sans-serif;">'+znames.join(' / ')+'</td></tr>';}
    html+='</table>';
    container.innerHTML=html;
  }
  document.getElementById('data-chars').addEventListener('input',draw);
  draw();
})();
</script>
```
