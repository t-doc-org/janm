// Pages de cours : le jeu Pygame s'affiche dans une fenêtre par-dessus la page
// (voir custom.css). Ce script ajoute le bouton × et arrête le jeu lors d'un
// clic à côté de la fenêtre. Rien ne change sur les pages « projet ».
(() => {
  const popup = () => {
    if (document.querySelector('.projet-ide')) return null;
    for (const out of document.querySelectorAll(
        'div.tdoc-exec-output.tdoc-sectioned')) {
      if (out.querySelector(':scope > .canvas')) return out;
    }
    return null;
  };

  // Clique sur le bouton ■ du bloc de code qui a lancé le jeu.
  const stop = out => {
    let el = out.previousElementSibling;
    while (el && el.tagName !== 'TDOC-EXEC') el = el.previousElementSibling;
    el?.querySelector('button.tdoc-stop')?.click();
  };

  const observe = () => new MutationObserver(() => {
    const out = popup();
    if (out && !out.querySelector(':scope > .tdoc-popup-close')) {
      const btn = document.createElement('button');
      btn.className = 'tdoc-popup-close';
      btn.title = 'Arrêter le jeu';
      btn.textContent = '×';
      btn.addEventListener('click', () => stop(out));
      out.appendChild(btn);
    }
  }).observe(document.body, {childList: true, subtree: true});
  // Le script est chargé dans <head>, avant que <body> n'existe.
  if (document.body) {
    observe();
  } else {
    document.addEventListener('DOMContentLoaded', observe);
  }

  // Un clic à côté de la fenêtre arrête le jeu, sans rien activer d'autre sur
  // la page (lien, bouton...) : le « click » qui suit est aussi bloqué.
  let swallowClick = false;
  document.addEventListener('mousedown', ev => {
    const out = popup();
    swallowClick = false;
    if (out && !out.contains(ev.target)) {
      ev.preventDefault();
      ev.stopPropagation();
      swallowClick = true;
      stop(out);
    }
  }, true);
  for (const type of ['mouseup', 'click', 'auxclick']) {
    document.addEventListener(type, ev => {
      // (le clic simulé sur le bouton ■ par stop() doit passer)
      if (!swallowClick || !ev.isTrusted) return;
      ev.preventDefault();
      ev.stopPropagation();
      if (type !== 'mouseup') swallowClick = false;
    }, true);
  }
})();
