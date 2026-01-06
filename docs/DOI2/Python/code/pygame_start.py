
import pygame
import math
import pathlib
from random import randint, choice

width, height = 600, 600
window = pygame.display.set_mode((width, height))
pygame.init()

async def refresh(color):
    await animation_frame()
    pygame.display.flip()
    window.fill(color)



class Actor(pygame.sprite.Sprite):
    def __init__(self, image_path, cx, cy):
        super().__init__()
        self.original_image = pygame.image.load(image_path).convert_alpha()
        self.image = self.original_image.copy()
        self.rect = self.image.get_rect(center=(cx, cy))
        self.collision_margin = 0.05  # 5% de marge
        self.angle = 0

    @property
    def collision_rect(self):
        """Crée le rect de collision à la volée basé sur le rect actuel"""
        return self.rect.inflate(
            -self.rect.width * self.collision_margin,
            -self.rect.height * self.collision_margin
        )

    def draw(self):
        global window
        window.blit(self.image, self.rect)

    def get_x(self):
        return self.rect.centerx
    def get_y(self):
        return self.rect.centery

    def move(self, dx, dy):
        self.rect.move_ip(dx, dy)
    def set_position(self, x, y):
        self.rect.centerx = x
        self.rect.centery = y
    def collide(self, other_actor):
        other_rect = getattr(other_actor, 'collision_rect', other_actor.rect)
        return self.collision_rect.colliderect(other_rect)

    def flip(self, horizontal=True, vertical=False):
        self.image = pygame.transform.flip(self.image, horizontal, vertical)
        self.rect = self.image.get_rect(center=self.rect.center)

    def scale(self, factor):
        new_size = (
            int(self.original_image.get_width() * factor),
            int(self.original_image.get_height() * factor)
        )
        self.image = pygame.transform.scale(self.original_image, new_size)
        self.rect = self.image.get_rect(center=self.rect.center)
        
    def kill(self):
        self.image = pygame.Surface((0, 0))
        self.original_image = pygame.Surface((0, 0))
        self.rect = self.image.get_rect()

    def set_angle(self, angle):
        self.angle = angle
        self.image = pygame.transform.rotate(self.original_image, angle)

class Text(pygame.sprite.Sprite):


    def __init__(self, text, cx, cy, *args):
        super().__init__()
        self.font = pygame.font.Font(None, 36)
        self.image = self.font.render(text, *args)
        self.rect = self.image.get_rect()
        self.rect.centerx, self.rect.centery = cx, cy
    def draw(self):
        global window
        window.blit(self.image, self.rect)


class Timer(pygame.time.Clock):
    def __init__(self, time):
        super().__init__()
        self.time = time * 1000
        self.started = False

    def start(self):
        self.started = True
        self.start_time = animation_time()
        self.end_time = self.start_time + self.time

    def is_finished(self):
        return animation_time() >= self.end_time

    def __str__(self):
        if not self.started:
            return "Not started"
        elif self.is_finished():
            return "0.00s"
        else:
            return f"{(self.end_time - animation_time()) / 1000:.2f}s"

def get_pressed_keys():
    """
    Retourne la liste des touches et boutons de souris ACTUELLEMENT enfoncés.
    """
    pressed_list = []
    
    keys = pygame.key.get_pressed()
    
# On utilise len(keys) pour déterminer combien de scancodes il faut vérifier.
    # C'est la méthode la plus fiable depuis Pygame 2.
    for scancode in range(len(keys)):
        if keys[scancode]: # Si l'état de la touche à cet index est True (appuyé)
            try:
                # Utiliser try/except est plus sûr car certains scancodes peuvent ne pas 
                # avoir de nom de touche lisible, mais ils devraient être rares.
                nom_touche = pygame.key.name(scancode).upper()
                pressed_list.append(nom_touche)
            except ValueError:
                # Gérer les scancodes inconnus si nécessaire, mais on peut juste les ignorer.
                pass
    mouse_buttons = pygame.mouse.get_pressed()
    
    if mouse_buttons[0]: # Gauche
        pressed_list.append("MOUSE_1")
    if mouse_buttons[1]: # Molette
        pressed_list.append("MOUSE_2")
    if mouse_buttons[2]: # Droit
        pressed_list.append("MOUSE_3")

    return pressed_list


