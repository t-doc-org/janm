```{metadata}
hide: [primary-sidebar, secondary-sidebar, prev-next, footer]
exec:
  python:
    files:
      pacman.png:
      apple.png:
      blinky.png:
      roger.png:
      tuyau_bas.png:
      tuyau_haut.png:
      son.mp3:
      son.ogg:
      megaman.ogg:
      futuriste.ogg:
      winners.ogg:
      sad.ogg:
      yoshi.ogg:
      MARIO.png:
```

```{defaults} exec
:editor-config: store: 'cloud'
```

```{exec} python
:name: setup
:when:
:class: hidden
import tdoc.pygame
setup_canvas()
```

```{exec} python
:name: pygame_start
:when:
:class: hidden
:include: ../code/pygame_start.py
```

```{defaults} exec
:env: main
:after: setup pygame_start
:style: max-height: 25rem;
```

```{exec} python
:name: pygame_end
:when:
:class: hidden
# Anciens programmes écrits dans une fonction « async def main() ».
if "main" in globals():
  try:
    await main()
  finally:
    pygame.quit()
# Le programme est terminé : pygame rend le clavier à la page.
pygame.quit()
```

# Projet libre

[Documentation du module](../pygame_doc.md)

```{exec} python
:then: pygame_end
:editor: e722f1e6-542a-4106-b297-6f9511754d02
while True:
  refresh((0, 0, 0))
```
