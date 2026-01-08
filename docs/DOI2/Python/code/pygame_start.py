
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
    def kill(self):
        self.image = pygame.Surface((0,0))
        self.rect = self.image.get_rect()


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
    pressed_list = []
    keys = pygame.key.get_pressed()
    
    # 1. La boucle pour les touches "standards" (lettres, chiffres)
    # On itère sur les scancodes standards
    for scancode in range(len(keys)):
        if keys[scancode]:
            try:
                name = pygame.key.name(scancode).upper()
                # On filtre un peu pour éviter d'avoir des trucs bizarres ou vides
                if name and name != "UNKNOWN":
                    pressed_list.append(name)
            except ValueError:
                pass

    # 2. Vérification MANUELLE des touches spéciales (Flèches, Ctrl, etc.)
    # C'est nécessaire car elles échappent souvent à la boucle simple ci-dessus
    if keys[pygame.K_UP]:
        pressed_list.append("UP")
    if keys[pygame.K_DOWN]:
        pressed_list.append("DOWN")
    if keys[pygame.K_LEFT]:
        pressed_list.append("LEFT")
    if keys[pygame.K_RIGHT]:
        pressed_list.append("RIGHT")
    
    # Tu peux aussi ajouter d'autres touches spéciales souvent manquées par la boucle :
    if keys[pygame.K_LSHIFT] or keys[pygame.K_RSHIFT]:
        pressed_list.append("SHIFT")
    if keys[pygame.K_SPACE]:
        # Parfois "SPACE" ressort comme " " (vide) dans le name(), donc utile de le forcer
        if " " in pressed_list: pressed_list.remove(" ") # Nettoyage optionnel
        if "SPACE" not in pressed_list: pressed_list.append("SPACE")

    # 3. Souris (Ton code original)
    mouse_buttons = pygame.mouse.get_pressed()
    if mouse_buttons[0]: pressed_list.append("MOUSE_1")
    if mouse_buttons[1]: pressed_list.append("MOUSE_2")
    if mouse_buttons[2]: pressed_list.append("MOUSE_3")

    return pressed_list


