<!-- Copyright 2025 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

Enquête adaptée de [SQL Murder Mystery](https://github.com/NUKnightLab/sql-mysteries), Joon Park & Cathy He, CC-BY-SA 4.0. Le schéma et le déroulé de l'enquête sont ceux de l'original ; les données ont été régénérées et traduites pour ce cours.


```{metadata}
exec:
  sql:
    highlight: text
```

# Un meurtre à SQL City

Un crime a eu lieu à SQL City et vous devez jouer les détectives pour trouver le meurtrier. Pour résoudre ce mystère, vous avez accès à toute la base de données que détient la police criminelle. Le schéma relationnel de cette base de données se trouve plus bas sur cette page.

Pour débuter votre enquête, la police ne vous donne aucun indice, mais savez simplement que le crime que vous devez investiguer est un **meurtre** qui a eu lieu le **15 janvier 2018 à SQL City**. Commencez par investiguer la table `crime_scene_report` pour trouver le rapport établi sur la scène du crime.


Quand vous aurez trouvé le coupable, vérifiez votre solution en bas de la page. Bonne chance !


```{image} images/murder_schema.png
:width: 100%
:alt: Schéma relationnel de la base de données de la police
:align: center
```

{vspace}`1rem`

```{exec} sql
:include: databases/sql-murder-mystery.sql
:name: murder
:when:
:class: hidden
```

```{exec} sql
:editor: 360753b5-e4ec-48ea-bc14-9d74ec9aa883
:after: murder
:output-style: max-height: 30rem;
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


`````{solution}
Nous ne connaissons pas encore les jointures (`JOIN`) : nous allons donc croiser
les tables **à la main**. À chaque étape, on note les identifiants (`id`) trouvés,
et on les réutilise dans la requête suivante.

### Partie 1 — Trouver le meurtrier

**1. Lire le rapport du crime.** C'est un meurtre commis le 15 janvier 2018 à
SQL City.

```{code} sql
SELECT * FROM crime_scene_report
WHERE city = 'SQL City' AND date = 20180115 AND type = 'murder';
```

Le rapport parle de deux témoins : le premier habite **la dernière maison de
Northwestern Dr**, le second, prénommé **Annabel**, habite sur **Franklin Ave**.

**2. Retrouver le premier témoin.** « La dernière maison » = le plus grand
numéro. On trie donc par `address_number` décroissant et on regarde la première
ligne.

```{code} sql
SELECT * FROM person
WHERE address_street_name = 'Northwestern Dr'
ORDER BY address_number DESC;
```

La première ligne est **Morty Schapiro** (numéro 4919). On note son `id`.

**3. Retrouver le second témoin.** On combine le prénom et la rue.

```{code} sql
SELECT * FROM person
WHERE name LIKE 'Annabel%' AND address_street_name = 'Franklin Ave';
```

Une seule personne : **Annabel Miller**. On note son `id`.

**4. Lire les deux dépositions.** On réutilise les deux `id` notés (remplacez
`<id_morty>` et `<id_annabel>` par les valeurs trouvées aux étapes 2 et 3).

```{code} sql
SELECT * FROM interview WHERE person_id = <id_morty>;
```

```{code} sql
SELECT * FROM interview WHERE person_id = <id_annabel>;
```

Morty décrit le tueur : un homme, membre **gold** de la salle « Get Fit Now »,
dont le numéro de sac commence par **48Z**, et qui est monté dans une voiture
dont la plaque contient **H42W**. Annabel précise qu'elle l'a croisé à la salle
**le 9 janvier** (`20180109`).

**5. Les membres « gold » dont le numéro commence par 48Z.**

```{code} sql
SELECT * FROM get_fit_now_member
WHERE id LIKE '48Z%' AND membership_status = 'gold';
```

Il y en a **quatre**. On note leur `id` de membre et leur `person_id`.

**6. Qui est venu à la salle le 9 janvier ?**

```{code} sql
SELECT * FROM get_fit_now_check_in WHERE check_in_date = 20180109;
```

**7. Croiser à la main.** Parmi les 4 membres de l'étape 5, on ne garde que ceux
dont l'`id` de membre apparaît **aussi** dans la liste du 9 janvier. Il en reste
**trois** suspects.

**8. Départager grâce à la plaque.** On liste d'abord les plaques contenant
`H42W` :

```{code} sql
SELECT * FROM driver_license WHERE plate_number LIKE '%H42W%';
```

Puis, pour chacun des trois suspects, on remonte à son permis : on lit d'abord
son `license_id` dans `person`, puis sa plaque dans `driver_license`.

```{code} sql
SELECT license_id FROM person WHERE id = <person_id_du_suspect>;
```

```{code} sql
SELECT plate_number FROM driver_license WHERE id = <license_id_trouvé>;
```

Un seul des trois suspects a une plaque contenant `H42W` : **Jeremy Bowers**.
C'est le meurtrier. 🔍

### Partie 2 — Trouver le commanditaire

**9. Lire la déposition du meurtrier** (avec son `person_id`, trouvé à l'étape 8).

```{code} sql
SELECT * FROM interview WHERE person_id = <id_jeremy_bowers>;
```

Il décrit la personne qui l'a engagé : une **femme**, aux cheveux **roux**,
mesurant **entre 65 et 67**, qui conduit une **Tesla Model S** et qui est allée
**trois fois** au **SQL Symphony Concert** en décembre 2017.

**10. Filtrer les permis avec tout le signalement physique.**

```{code} sql
SELECT * FROM driver_license
WHERE gender = 'female' AND hair_color = 'red'
  AND height >= 65 AND height <= 67
  AND car_make = 'Tesla' AND car_model = 'Model S';
```

**Cinq** femmes correspondent. On note leur `id` de permis.

**11. Retrouver chaque personne, puis vérifier le concert.** Pour chaque permis,
on retrouve la personne grâce à son `license_id`, on note son `id`...

```{code} sql
SELECT * FROM person WHERE license_id = <id_du_permis>;
```

... puis on regarde combien de fois cette personne est allée au concert en
décembre 2017 :

```{code} sql
SELECT * FROM facebook_event_checkin
WHERE person_id = <id_de_la_personne>
  AND event_name = 'SQL Symphony Concert'
  AND date >= 20171201 AND date <= 20171231;
```

Une seule des cinq femmes y est allée **trois fois** : **Miranda Priestly**.
C'est elle, le cerveau de l'affaire. 🎻
`````
