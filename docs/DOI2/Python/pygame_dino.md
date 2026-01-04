```{metadata}
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

