La base de données provient de [SQL Mysteries](https://github.com/NUKnightLab/sql-mysteries/tree/master), Joon Park & Cathy He CC- BY-SA 4.0


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
:when: never
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
{input}`Miranda Priestly`
Le coupable est :

```
