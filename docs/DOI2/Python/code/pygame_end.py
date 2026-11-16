# Anciens programmes écrits dans une fonction « async def main() ».
if "main" in globals():
  try:
    await main()
  finally:
    pygame.quit()
# Le programme est terminé : pygame rend le clavier à la page.
pygame.quit()
