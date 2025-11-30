async def main():
    pygame.init()

    pineapples = []
    basket = Actor("basket.png", 300, 550)

    game_over = False
    score = 0

    while True:
        await refresh((111, 255, 255))

        for p in pineapples:
            p.draw()
        basket.draw()

        actions = get_pressed_keys()

        for action in actions:
            if action == "QUIT":
                running = False
            elif action == "D":
                basket.move(3, 0)
            elif action == "A":
                basket.move(-3, 0)

        if game_over == False:
            if randint(0, 100) == 0:
                pineapple = Actor("orange.png", randint(0, width - 1), -100)
                pineapples.append(pineapple)

            for pineapple in pineapples:
                pineapple.move(0, 3)
                if pineapple.collide(basket):
                    score += 1
                    pineapple.kill()
                    pineapples.remove(pineapple)
                if pineapple.rect.y > height:
                    game_over = True
        else:
            game_over_text = Text(200, 100,f"Game over. Score: {score}", True, (10, 10, 10), (255, 90, 20))
            game_over_text.draw()