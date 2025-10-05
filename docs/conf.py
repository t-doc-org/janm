# Copyright 2024 Maxime Jan <maxime.jan@edufr.ch>
# SPDX-License-Identifier: CC-BY-NC-SA-4.0

from tdoc.common.defaults import *

project = "Informatique JANM"
author = "Maxime Jan"
license = 'CC-BY-NC-SA-4.0'
language = 'fr'

html_theme_options = {
    # 'repository_url': 'https://github.com/t-doc-org/janm',
    # Désactivation globale des boutons Précédent/Suivant gérée via CSS
}

# Ressources statiques (CSS/JS) supplémentaires
html_static_path = ['_static']
html_css_files = [
    'custom.css',
]

# Désactive les barres latérales (gauche/droite) pour une page précise
html_sidebars = {
    'DOI2/Databases/examen_formatif': [],
    'DOI1/AlgoProg/examen_formatif1': [],
}
