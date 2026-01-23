```{metadata}
exec:
  python:
    packages: [numpy, pygame-ce]
    files:
      pacman.png:
      apple.png:
      blinky.png:
      roger.png:
      tuyau_bas.png:
      tuyau_haut.png:

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
:include: ../code/pygame_start.py
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

# Projet libre

```{exec} python main
:then: pygame_end
:editor: e722f1e6-542a-4106-b297-6f9511754d02
async def main():
  while True:
    await refresh((0, 0, 0))
```