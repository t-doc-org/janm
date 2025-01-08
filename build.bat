@echo off
set PYTHONPATH=..\common
sphinx-build -M html docs docs\_build --jobs=auto --fail-on-warning
python -m http.server --bind=localhost --directory=docs\_build\html
