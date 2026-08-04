# Copyright 2024 Maxime Jan <maxime.jan@edufr.ch>
# SPDX-License-Identifier: CC-BY-NC-SA-4.0

import os

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

# Build for the exam server (exam-server/build_exam.py sets TDOC_EXAM_BUILD).
# The domain-wide storage uses an iframe to https://t-doc.org, which never
# responds when the site is served from another origin (localhost, LAN IP).
# api.js awaits it at load time, which blocks load.js and prevents {exec}
# blocks from rendering. Disabling it makes core.js fall back to localStorage.
if os.environ.get('TDOC_EXAM_BUILD'):
    tdoc_domain_storage = {'origin': ''}
