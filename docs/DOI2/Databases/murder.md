<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

Enquête adaptée de [SQL Murder Mystery](https://github.com/NUKnightLab/sql-mysteries), Joon Park & Cathy He, CC-BY-SA 4.0. Le schéma et le déroulé de l'enquête sont ceux de l'original ; les données ont été régénérées et traduites pour ce cours par le script `databases/generate_murder_db.py`.


% La base de l'enquête est incluse telle quelle dans la page. Sans cette
% option, Sphinx la colorie syntaxiquement balise par balise, ce qui fait
% passer la page de 700 Ko à 4.4 Mo pour rien : le bloc est caché, et le seul
% bloc visible est l'éditeur de l'élève, qui n'utilise pas cette coloration.
```{metadata}
exec:
  sql:
    highlight: text
```

# Un meurtre à SQL City

Un crime a eu lieu à SQL City et vous devez jouer les détectives pour trouver le meurtrier. Pour résoudre ce mystère, vous avez accès à toute la base de données que détient la police criminelle. Le schéma relationnel de cette base de données se trouve plus bas sur cette page.

Pour débuter votre enquête, la police ne vous donne aucun indice, mais savez simplement que le crime que vous devez investiguer a eu lieu le **15 janvier 2018 à SQL City**. Commencez par investiguer la table `crime_scene_report` pour trouver le rapport établi sur la scène du crime.


Quand vous aurez trouvé le coupable, vérifiez votre solution en bas de la page. Bonne chance !


```{image} images/murder_schema.png
:width: 100%
:alt: Schéma relationnel de la base de données de la police
:align: center
```


```{exec} sql
:include: databases/sql-murder-mystery.sql
:name: murder
:when:
:style: display: none;

```

```{exec} sql
:editor: 360753b5-e4ec-48ea-bc14-9d74ec9aa883
:after: murder
:output-style: max-height: 30rem

```

```{role} input(quiz-input)
:right: width: 18rem; clear: right;
:check: split lowercase
```

```{quiz}
{input}`Jeremy Bowers`
Le meurtrier est :

```


## Le commanditaire
Si vous avez trouvé le meurtrier, félicitations ! Toutefois, bien que vous ayez trouvé la personne ayant commis le meurtre, ce n'est pas elle qui l'a commandité. Pour trouver le cerveau derrière cette opération, allez lire le ce que le meurtrier raconte dans son interrogatoire de la table `interview`.

```{quiz}
{input}`Miranda Priestly`
Le commanditaire est :

```
