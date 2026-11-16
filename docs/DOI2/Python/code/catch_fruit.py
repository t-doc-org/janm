oranges = []
basket = Actor("basket.png", 300, 550)

game_over = False
score = 0

score_text = Text("Score: 0", 70, 30, (10, 10, 10))
game_over_text = Text("Game over", 300, 300, (10, 10, 10), (255, 90, 20))

while True:
  refresh((111, 255, 255))

  for orange in oranges:
    orange.draw()
  basket.draw()
  score_text.draw()

  if game_over == False:
    actions = get_pressed_keys()
    if "D" in actions and basket.get_right() < width:
      basket.move(3, 0)
    if "A" in actions and basket.get_left() > 0:
      basket.move(-3, 0)

    if randint(0, 100) == 0:
      orange = Actor("orange.png", randint(40, width - 40), -100)
      oranges.append(orange)

    for orange in oranges:
      if orange.is_killed() == False:
        orange.move(0, 3)
        if orange.collide(basket):
          score += 1
          score_text.set_text(f"Score: {score}")
          orange.kill()
        elif orange.get_top() > height:
          game_over = True
          game_over_text.set_text(f"Game over. Score: {score}")
  else:
    game_over_text.draw()
