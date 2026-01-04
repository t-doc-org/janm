```{metadata}
solutions: dynamic
exec:
  python:
    packages: [numpy, pygame-ce]
    files:
      cactus.png:
      t-rex.png:


versions:
  pyodide: 0.27.7
```



```{exec} python
:name: setup
:when: never
:class: hidden
import io
with redirect(stdout=io.StringIO()):
    import tdoc.pygame
setup_canvas()
```

```{exec} python
:name: pygame_start
:when: never
:class: hidden
:include: code/pygame_start.py
```



```{defaults} exec
:after: setup pygame_start
:style: max-height: 25rem;
```



```{exec} python
:name: pygame_end
:when: never
:class: hidden

try:
    await main()
finally:
    pygame.quit()
```


```{exec} python
:name: catch_fruit
:when: never
:include: code/catch_fruit.py
:class: hidden

```

# Pygame - Le jeu du dino

```{exec} python main
:then: pygame_end
:editor: df3801b2-4727-463c-a7ba-c7d9aa0f5c5e
async def main():

  while True:
    await refresh((247, 247, 247))
```

````{solution}
À copier/coller ci-dessus :

```{code-block} text
async def main():
  # Création du T-Rex
  dino = Actor("t-rex.png", 100, 470)
  dino.scale(0.8)
  
  # Variables de saut
  est_au_sol = True
  vitesse_verticale = 0
  GRAVITE = 0.2
  FORCE_SAUT = -9
  SOL_Y = 470
  
  # Liste des cactus
  cactus_liste = []
  
  # Timer pour l'apparition des cactus
  timer_cactus = Timer(1.5)
  timer_cactus.start()
  
  # Variables de jeu
  score = 0
  gameover = False
  vitesse_jeu = 2
  
  # Textes
  txt_score = Text("Score: 0", 500, 30, True, (83, 83, 83), (247, 247, 247))
  txt_gameover = Text("GAME OVER - Appuyez sur R pour rejouer", 300, 250, True, (83, 83, 83), (247, 247, 247))
  txt_start = Text("Appuyez sur SPACE pour commencer", 300, 300, True, (83, 83, 83), (247, 247, 247))
  
  game_started = False
  
  while True:
    await refresh((247, 247, 247))
    
    touches_pressées = get_pressed_keys()
    
    # Écran de démarrage
    if not game_started:
      dino.draw()
      txt_start.draw()
      
      if "SPACE" in touches_pressées:
        game_started = True
        timer_cactus.start()
      
      continue
    
    # Logique du jeu
    if not gameover:
      # Gestion du saut
      if "SPACE" in touches_pressées and est_au_sol:
        vitesse_verticale = FORCE_SAUT
        est_au_sol = False
      
      # Application de la gravité
      if not est_au_sol:
        vitesse_verticale += GRAVITE
        dino.move(0, vitesse_verticale)
        
        # Vérifier si le dino retombe au sol
        if dino.get_y() >= SOL_Y:
          dino.set_position(100, SOL_Y)
          est_au_sol = True
          vitesse_verticale = 0
      
      # Apparition des cactus
      if timer_cactus.is_finished():
        nouveau_cactus = Actor("cactus.png", 650, 470)
        nouveau_cactus.scale(0.6)
        cactus_liste.append(nouveau_cactus)
        timer_cactus.start()
        
        # Augmenter progressivement la vitesse
        if score % 10 == 0 and score > 0:
          vitesse_jeu += 0.5
      
      # Déplacement et collision des cactus
      for cactus in cactus_liste:
        cactus.move(-vitesse_jeu, 0)
        
        # Collision avec le dino
        if dino.collide(cactus):
          gameover = True
        
        # Retirer les cactus hors écran et augmenter le score
        if cactus.get_x() < -50:
          cactus_liste.remove(cactus)
          score += 1
          txt_score = Text(f"Score: {score}", 500, 30, True, (83, 83, 83), (247, 247, 247))
      
      # Dessiner la ligne de sol
    
    else:
      # Game Over - Possibilité de recommencer
      if "R" in touches_pressées:
        # Réinitialisation
        dino.set_position(100, SOL_Y)
        est_au_sol = True
        vitesse_verticale = 0
        cactus_liste = []
        score = 0
        gameover = False
        vitesse_jeu = 5
        timer_cactus.start()
        txt_score = Text("Score: 0", 500, 30, True, (83, 83, 83), (247, 247, 247))
    
    # Dessiner tous les éléments
    dino.draw()
    
    for cactus in cactus_liste:
      cactus.draw()
    
    txt_score.draw()
    
    if gameover:
      txt_gameover.draw()
```

````