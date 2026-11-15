
import asyncio
import os
import sys
import pygame
from random import randint, choice
from pyodide.ffi import run_sync

# Tant que pygame est actif, il capture le clavier de toute la page (on ne peut
# plus écrire dans les éditeurs). Il faut donc toujours appeler pygame.quit()
# à la fin du programme : arrêt avec le bouton « stop » (voir _wait_frame),
# erreur (ci-dessous) ou fin normale (bloc pygame_end).
if not getattr(sys.excepthook, "_pygame_quit", False):
    _original_excepthook = sys.excepthook

    def _excepthook(*args):
        pygame.quit()
        _original_excepthook(*args)

    _excepthook._pygame_quit = True
    sys.excepthook = _excepthook

pygame.quit()  # repart de zéro si l'exécution précédente a été interrompue
pygame.init()
width, height = 600, 600
window = pygame.display.set_mode((width, height))


# ---------------------------------------------------------------------------
# Boucle de jeu
# ---------------------------------------------------------------------------

_FRAME_MS = 1000 / 60      # 60 images par seconde, quel que soit l'écran
_FREEZE_MS = 3000          # délai après lequel on considère que le jeu est bloqué
_next_frame = None
_last_refresh = animation_time()
_keys_now = []
_keys_before = []


class _Done:
    """Permet aux anciens programmes d'écrire « await refresh(...) »."""
    def __await__(self):
        return iter(())


def _wait_frame():
    """Attend la prochaine image du navigateur, sans async/await."""
    t = run_sync(animation_frame())
    # Le bouton « stop » annule la tâche, mais du code sans await ne le
    # remarquerait jamais : on arrête donc le programme ici.
    task = asyncio.current_task()
    if task is not None and task.cancelling():
        # L'annulation est traitée ici : sinon asyncio l'appliquerait une
        # seconde fois à la fin du programme (message « PythonError »).
        task.uncancel()
        try:
            task._must_cancel = False
        except AttributeError:
            pass
        pygame.quit()  # rend le clavier à la page
        raise asyncio.CancelledError()
    return t


def refresh(color):
    global _next_frame, _last_refresh, _keys_now, _keys_before
    # Sur un écran 120 ou 144 Hz, requestAnimationFrame est appelé plus de 60
    # fois par seconde : on saute des images pour garder la même vitesse de jeu
    # sur tous les ordinateurs.
    t = _wait_frame()
    if _next_frame is None:
        _next_frame = t
    while t < _next_frame - _FRAME_MS / 2:
        t = _wait_frame()
    _next_frame = max(_next_frame + _FRAME_MS, t)

    pygame.display.flip()
    window.fill(color)

    pygame.event.get()  # vide la file d'événements (sinon elle se remplit)
    _keys_before = _keys_now
    _keys_now = _read_keys()
    _last_refresh = animation_time()
    return _Done()


def _check_not_frozen():
    """Détecte une boucle de jeu qui ne rend jamais la main au navigateur."""
    if animation_time() - _last_refresh > _FREEZE_MS:
        raise RuntimeError(
            "Le jeu est bloqué : refresh(...) n'a pas été exécuté depuis plus "
            "de 3 secondes. Avez-vous oublié refresh(...) au début de la "
            "boucle de jeu ? Ou avez-vous écrit une autre boucle while qui ne "
            "se termine jamais ?")


# ---------------------------------------------------------------------------
# Entrées utilisateur
# ---------------------------------------------------------------------------

# Touches dont le code est en dehors de 0-511 et qui échappent donc à la
# boucle de _read_keys().
_SPECIAL_KEYS = [
    (pygame.K_UP, "UP"), (pygame.K_DOWN, "DOWN"),
    (pygame.K_LEFT, "LEFT"), (pygame.K_RIGHT, "RIGHT"),
    (pygame.K_LSHIFT, "SHIFT"), (pygame.K_RSHIFT, "SHIFT"),
    (pygame.K_LCTRL, "CTRL"), (pygame.K_RCTRL, "CTRL"),
    (pygame.K_LALT, "ALT"), (pygame.K_RALT, "ALT"),
    (pygame.K_RETURN, "ENTER"), (pygame.K_KP_ENTER, "ENTER"),
    (pygame.K_KP0, "0"), (pygame.K_KP1, "1"), (pygame.K_KP2, "2"),
    (pygame.K_KP3, "3"), (pygame.K_KP4, "4"), (pygame.K_KP5, "5"),
    (pygame.K_KP6, "6"), (pygame.K_KP7, "7"), (pygame.K_KP8, "8"),
    (pygame.K_KP9, "9"),
]


def _read_keys():
    pressed = []
    keys = pygame.key.get_pressed()

    # Codes de touches 0-511 : lettres, chiffres, espace, échap, tab, ...
    # (les codes de touches suivent la disposition du clavier, QWERTZ compris)
    for keycode in range(len(keys)):
        if keys[keycode]:
            name = pygame.key.name(keycode).upper()
            if name and name != "UNKNOWN" and name not in pressed:
                pressed.append(name)

    for keycode, name in _SPECIAL_KEYS:
        if keys[keycode] and name not in pressed:
            pressed.append(name)

    mouse_buttons = pygame.mouse.get_pressed()
    if mouse_buttons[0]: pressed.append("MOUSE_1")
    if mouse_buttons[1]: pressed.append("MOUSE_2")
    if mouse_buttons[2]: pressed.append("MOUSE_3")
    return pressed


def get_pressed_keys():
    _check_not_frozen()
    return list(_keys_now)


def get_new_keys():
    _check_not_frozen()
    return [key for key in _keys_now if key not in _keys_before]


def get_mouse_x():
    return pygame.mouse.get_pos()[0]


def get_mouse_y():
    return pygame.mouse.get_pos()[1]


# ---------------------------------------------------------------------------
# Acteurs et textes
# ---------------------------------------------------------------------------

_images = {}
_IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp")


def _load_image(image_path):
    """Charge une image une seule fois, puis la réutilise."""
    if image_path not in _images:
        if not isinstance(image_path, str) or not os.path.isfile(image_path):
            available = sorted(f for f in os.listdir()
                               if f.lower().endswith(_IMAGE_EXTENSIONS))
            raise FileNotFoundError(
                f"L'image {image_path!r} n'existe pas. Vérifiez l'orthographe "
                f"et l'extension (par exemple \"roger.png\"). Images "
                f"disponibles sur cette page : {', '.join(available)}")
        _images[image_path] = pygame.image.load(image_path).convert_alpha()
    return _images[image_path]


class _Element:
    """Fonctionnalités communes à Actor et Text."""
    collision_margin = 0

    def draw(self):
        _check_not_frozen()
        if not self._killed:
            window.blit(self.image, self.rect)

    def get_x(self):
        return self.rect.centerx

    def get_y(self):
        return self.rect.centery

    def get_width(self):
        return self.rect.width

    def get_height(self):
        return self.rect.height

    def get_left(self):
        return self.rect.left

    def get_right(self):
        return self.rect.right

    def get_top(self):
        return self.rect.top

    def get_bottom(self):
        return self.rect.bottom

    def move(self, dx, dy):
        self.rect.move_ip(dx, dy)

    def set_position(self, x, y):
        self.rect.center = (x, y)

    @property
    def collision_rect(self):
        """Rectangle de collision, légèrement plus petit que l'image."""
        return self.rect.inflate(-self.rect.width * self.collision_margin,
                                 -self.rect.height * self.collision_margin)

    def collide(self, other_actor):
        if not isinstance(other_actor, _Element):
            if isinstance(other_actor, list):
                raise TypeError(
                    "collide() attend un acteur, pas une liste. Pour tester "
                    "tous les acteurs d'une liste, utilisez une boucle for.")
            raise TypeError(f"collide() attend un acteur (Actor ou Text), "
                            f"pas {type(other_actor).__name__}.")
        if self._killed or other_actor._killed:
            return False
        return self.collision_rect.colliderect(other_actor.collision_rect)

    def kill(self):
        self._killed = True

    def is_killed(self):
        return self._killed

    def revive(self):
        self._killed = False


class Actor(_Element):
    collision_margin = 0.05  # 5% de marge

    def __init__(self, image_path, x, y):
        self.image_path = image_path
        self.original_image = _load_image(image_path)
        self.image = self.original_image
        self.rect = self.image.get_frect(center=(x, y))
        self.factor = 1
        self.angle = 0
        self.flip_h = False
        self.flip_v = False
        self._killed = False

    def _update_image(self):
        """Reconstruit l'image à partir de l'originale (taille, miroir, angle)."""
        image = self.original_image
        if self.factor != 1:
            new_size = (round(image.get_width() * self.factor),
                        round(image.get_height() * self.factor))
            image = pygame.transform.scale(image, new_size)
        if self.flip_h or self.flip_v:
            image = pygame.transform.flip(image, self.flip_h, self.flip_v)
        if self.angle % 360 != 0:
            image = pygame.transform.rotate(image, self.angle)
        center = self.rect.center
        self.image = image
        self.rect = image.get_frect(center=center)

    def scale(self, factor):
        if factor < 0:
            raise ValueError("scale() attend un facteur positif, par exemple "
                             "2 (2x plus grand) ou 0.5 (2x plus petit).")
        self.factor = factor
        self._update_image()

    def set_angle(self, angle):
        self.angle = angle
        self._update_image()

    def flip(self, horizontal=True, vertical=False):
        # Inverse l'image à chaque appel
        self.flip_h = self.flip_h != horizontal
        self.flip_v = self.flip_v != vertical
        self._update_image()

    def set_flip(self, horizontal, vertical=False):
        # Fixe le sens de l'image : peut être appelé à chaque tour de boucle
        self.flip_h = horizontal
        self.flip_v = vertical
        self._update_image()


_fonts = {}


class Text(_Element):
    def __init__(self, text, x, y, *args, size=36):
        args = list(args)
        # Ancienne forme : Text(texte, x, y, True, couleur, fond)
        self.antialias = True
        if args and isinstance(args[0], bool):
            self.antialias = args.pop(0)
        if len(args) > 3:
            raise TypeError("Trop de paramètres. Utilisez : Text(texte, x, y, "
                            "couleur_texte, couleur_fond, taille)")
        self.color = args[0] if len(args) >= 1 else (0, 0, 0)
        self.background = args[1] if len(args) >= 2 else None
        self.size = args[2] if len(args) >= 3 else size
        if self.size not in _fonts:
            _fonts[self.size] = pygame.font.Font(None, self.size)
        self.font = _fonts[self.size]
        self._killed = False
        self.rect = pygame.FRect(0, 0, 0, 0)
        self.rect.center = (x, y)
        self.set_text(text)

    def set_text(self, text):
        self.text = str(text)
        center = self.rect.center
        self.image = self.font.render(self.text, self.antialias, self.color,
                                      self.background)
        self.rect = self.image.get_frect(center=center)


# ---------------------------------------------------------------------------
# Timer
# ---------------------------------------------------------------------------

class Timer:
    def __init__(self, time):
        self.time = time * 1000
        self.started = False

    def start(self):
        self.started = True
        self.start_time = animation_time()
        self.end_time = self.start_time + self.time

    def is_finished(self):
        # Un timer qui n'a jamais été démarré est considéré comme terminé.
        if not self.started:
            return True
        return animation_time() >= self.end_time

    def get_time_left(self):
        if self.is_finished():
            return 0
        return (self.end_time - animation_time()) / 1000

    def __str__(self):
        if not self.started:
            return "Pas démarré"
        return f"{self.get_time_left():.2f}s"


# ---------------------------------------------------------------------------
# Sons
# ---------------------------------------------------------------------------

_MUSIC_MIN_SIZE = 500_000  # au-delà (en octets), le fichier est lu en streaming
_current_music = None


class Sound:
    """Les petits fichiers (bruitages) sont chargés en mémoire et peuvent être
    joués en même temps. Les gros fichiers (musiques) sont lus en streaming,
    car les décoder entièrement prendrait plusieurs secondes : une seule
    musique peut alors être jouée à la fois."""

    def __init__(self, file_path):
        if not pygame.mixer.get_init():
            pygame.mixer.init()
        if not isinstance(file_path, str) or not os.path.isfile(file_path):
            raise FileNotFoundError(
                f"Le son {file_path!r} n'existe pas. Vérifiez l'orthographe "
                f"et l'extension (par exemple \"yoshi.ogg\").")
        self.file_path = file_path
        self.volume = 1
        self.is_music = os.path.getsize(file_path) > _MUSIC_MIN_SIZE
        self.sound = None if self.is_music else pygame.mixer.Sound(file_path)
        self.channel = None

    def _is_current_music(self):
        return self.is_music and _current_music is self

    def play(self, loops=0):
        global _current_music
        if self.is_music:
            pygame.mixer.music.load(self.file_path)
            pygame.mixer.music.set_volume(self.volume)
            pygame.mixer.music.play(loops)
            _current_music = self
        else:
            self.channel = self.sound.play(loops)

    def pause(self):
        if self._is_current_music():
            pygame.mixer.music.pause()
        elif self.channel is not None:
            self.channel.pause()

    def unpause(self):
        if self._is_current_music():
            pygame.mixer.music.unpause()
        elif self.channel is not None:
            self.channel.unpause()

    def stop(self):
        if self._is_current_music():
            pygame.mixer.music.stop()
        elif self.sound is not None:
            self.sound.stop()

    def set_volume(self, volume):
        self.volume = volume
        if self._is_current_music():
            pygame.mixer.music.set_volume(volume)
        elif self.sound is not None:
            self.sound.set_volume(volume)
