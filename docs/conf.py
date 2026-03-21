# Copyright 2024 Maxime Jan <maxime.jan@edufr.ch>
# SPDX-License-Identifier: CC-BY-NC-SA-4.0

from tdoc.common.defaults import *

project = "Informatique JANM"
author = "Maxime Jan"
license = 'CC-BY-NC-SA-4.0'
language = 'fr'

html_theme_options = {
    'repository_url': 'https://github.com/t-doc-org/janm',
    'show_navbar_depth': 1,
    'show_toc_level': 2,
}

# Ressources statiques (CSS/JS) supplémentaires
html_css_files = ['custom.css']

metadata = {
    'solutions': 'dynamic',
}
