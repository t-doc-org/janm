<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Règles de l'algèbre de Boole

Deux expressions logiques différentes peuvent produire exactement la même
table de vérité. Nous l'avons déjà constaté au chapitre précédent : `a ⊕ b` et
`(a ∧ ¬b) ∨ (¬a ∧ b)` donnent les mêmes résultats, alors que la seconde est bien
plus longue.

Cette liberté est très utile. Une expression correspond à un circuit : chaque
opérateur devient une porte logique, donc un composant à fabriquer, à alimenter
et à traverser. Une expression plus courte, c'est un circuit **moins cher, plus
petit et plus rapide**. Les règles de cette page servent précisément à
transformer une expression en une autre, équivalente mais plus simple.

```{important}
Deux expressions sont **équivalentes** si elles ont la même table de vérité. On
écrit alors un signe `=` entre elles.
```

## Règles
Toutes les règles vont par paires : ce qui est vrai pour le ET (`∧`) l'est aussi pour le OU (`∨`).

| Règle                 | Avec `∧`                          | Avec `∨`                          |
| :-------------------- | :-------------------------------- | :-------------------------------- |
| **Commutativité**     | `a ∧ b = b ∧ a`                   | `a ∨ b = b ∨ a`                   |
| **Associativité**     | `(a ∧ b) ∧ c = a ∧ (b ∧ c)`       | `(a ∨ b) ∨ c = a ∨ (b ∨ c)`       |
| **Distributivité**    | `a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)` | `a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)` |
| **Élément neutre**    | `a ∧ 1 = a`                       | `a ∨ 0 = a`                       |
| **Élément absorbant** | `a ∧ 0 = 0`                       | `a ∨ 1 = 1`                       |
| **Idempotence**       | `a ∧ a = a`                       | `a ∨ a = a`                       |
| **Complémentarité**   | `a ∧ ¬a = 0`                      | `a ∨ ¬a = 1`                      |
| **De Morgan**         | `¬(a ∧ b) = ¬a ∨ ¬b`              | `¬(a ∨ b) = ¬a ∧ ¬b`              |

Le OU exclusif (`⊕`) peut se définir de deux manières équivalentes à partir des
opérateurs de base :

- `a ⊕ b = (a ∧ ¬b) ∨ (¬a ∧ b) = (a ∨ b) ∧ ¬(a ∧ b)`

## Les lois de De Morgan
Ces deux règles, dues au mathématicien *Augustus De Morgan* (1806-1871),
expliquent comment une négation "traverse" une parenthèse. Ce sont les plus
utiles, et aussi celles où l'on se trompe le plus.

- `¬(a ∧ b) = ¬a ∨ ¬b`
- `¬(a ∨ b) = ¬a ∧ ¬b`


L'intuition est plus claire en français. Posons `a` = "j'ai mon billet" et
`b` = "j'ai ma carte d'identité" :

- `¬(a ∧ b)` se lit "je n'ai pas à la fois mon billet **et** ma carte d'identité". Cela signifie qu'il me manque le
  billet **ou** la carte : `¬a ∨ ¬b`.
- `¬(a ∨ b)` se lit "je n'ai ni l'un ni l'autre". Cela signifie que je n'ai pas
  le billet **et** que je n'ai pas la carte : `¬a ∧ ¬b`.


## Simplifier une expression
Simplifier, c'est appliquer les règles les unes après les autres jusqu'à ce
qu'il n'y ait plus rien à retirer. La méthode habituelle tient en trois temps :

1. **Faire descendre les négations** avec De Morgan et la double négation, pour
   qu'aucun `¬` ne porte sur une parenthèse.
2. **Mettre en facteur** ce qui se répète, avec la distributivité.
3. **Nettoyer** avec la complémentarité, les éléments neutres et absorbants.

Prenons `¬(a ∨ b) ∨ (¬a ∧ b)`, qui demande **5 portes** logiques :

| Étape                       | Expression              | Règle utilisée   |
| :-------------------------- | :---------------------- | :--------------- |
| Départ                      | `¬(a ∨ b) ∨ (¬a ∧ b)`   |                  |
| Faire descendre la négation | `(¬a ∧ ¬b) ∨ (¬a ∧ b)`  | De Morgan        |
| Mettre `¬a` en facteur      | `¬a ∧ (¬b ∨ b)`         | Distributivité   |
| Simplifier la parenthèse    | `¬a ∧ 1`                | Complémentarité  |
| Retirer le neutre           | `¬a`                    | Élément neutre   |

Le circuit passe de 5 portes à une seule porte NON, pour un comportement identique.

## Le tableau de Karnaugh
Enchaîner les règles à la main marche bien sur de petites expressions, mais il
faut deviner quelle règle appliquer et dans quel ordre. Le **tableau de
Karnaugh** (inventé par *Maurice Karnaugh* en 1953) remplace cette intuition par
une méthode systématique

### Construire le tableau
Un tableau de Karnaugh est une table de vérité repliée en rectangle : chaque
case du tableau correspond à **une ligne** de la table de vérité. Avec deux
variables, cela donne quatre cases :

|         | `b = 0` | `b = 1` |
| :-----: | :-----: | :-----: |
| `a = 0` |         |         |
| `a = 1` |         |         |

La règle de construction est la suivante : **deux cases voisines ne diffèrent
que par une seule variable**. Avec trois variables, on regroupe `b` et `c` en
colonnes, dans l'ordre `00`, `01`, `11`, `10` (et non `00`, `01`, `10`, `11`) :

|         | `bc = 00` | `bc = 01` | `bc = 11` | `bc = 10` |
| :-----: | :-------: | :-------: | :-------: | :-------: |
| `a = 0` |           |           |           |           |
| `a = 1` |           |           |           |           |

```{important}
L'ordre des colonnes `00`, `01`, `11`, `10` n'est pas une coquille : d'une
colonne à la suivante, **un seul bit change**. C'est ce qui garantit que les
cases voisines sont bien "presque identiques", et c'est toute l'astuce de la
méthode.
```

### Lire la simplification
On entoure ensuite les `1` par **groupes**, en respectant quatre règles :

- un groupe est un **rectangle** de `1`, jamais une diagonale
- sa taille est une **puissance de 2** : 1, 2, 4 ou 8 cases
- on fait les groupes **les plus grands possibles**, quitte à ce qu'ils se
  chevauchent
- le tableau est **cyclique** : la colonne de gauche est voisine de celle de
  droite, la ligne du haut voisine de celle du bas.

Chaque groupe donne ensuite un terme `∧`, obtenu en gardant **uniquement les
variables qui ne changent pas** dans le groupe. Le résultat final est le `∨` de
tous les termes.

```{dropdown} Un exemple complet
Soit la fonction `s` définie par la table de vérité :

| `a` | `b` | `c` | `s` |
| :-: | :-: | :-: | :-: |
| `0` | `0` | `0` | `1` |
| `0` | `0` | `1` | `1` |
| `0` | `1` | `0` | `0` |
| `0` | `1` | `1` | `0` |
| `1` | `0` | `0` | `1` |
| `1` | `0` | `1` | `1` |
| `1` | `1` | `0` | `0` |
| `1` | `1` | `1` | `1` |

On reporte chaque `1` dans le tableau de Karnaugh, puis on entoure les groupes
(en gras) : un groupe de **4** cases (`bc = 00` et `01`) et un groupe de **2**
cases (`a = 1`, `bc = 01` et `11`), qui se chevauchent.

|         | `bc = 00` | `bc = 01` | `bc = 11` | `bc = 10` |
| :-----: | :-------: | :-------: | :-------: | :-------: |
| `a = 0` | **`1`**   | **`1`**   | `0`       | `0`       |
| `a = 1` | **`1`**   | **`1`**   | **`1`**   | `0`       |

Dans chaque groupe, on garde les variables qui ne changent pas :

- groupe de 4 : `b` vaut toujours `0`, d'où `¬b` ;
- groupe de 2 : `a` et `c` valent toujours `1`, d'où `a ∧ c`.

On combine les termes avec un `∨` :

`s = ¬b ∨ (a ∧ c)`
```



## Exercices

### Exercice {num1}`exercice`
Simplifiez les expressions suivantes en indiquant, à chaque étape, la règle
utilisée.

1.  `(a ∧ b) ∨ (a ∧ ¬b)`
2.  `(a ∨ b) ∧ (a ∨ ¬b)`
3.  `a ∨ (¬a ∧ b)`
4.  `(a ∧ b) ∨ (¬a ∧ b)`
5.  `(a ∧ ¬b) ∨ (¬a ∧ b)`
6.  `(a ∨ b) ∧ (¬a ∨ ¬b)`

````{solution}
**1.** On met `a` en facteur :

| Expression            | Règle utilisée  |
| :-------------------- | :-------------- |
| `(a ∧ b) ∨ (a ∧ ¬b)`  |                 |
| `a ∧ (b ∨ ¬b)`        | Distributivité  |
| `a ∧ 1`               | Complémentarité |
| `a`                   | Élément neutre  |

**2.** On met `a` en facteur (distributivité du `∨` sur le `∧`) :

| Expression            | Règle utilisée  |
| :-------------------- | :-------------- |
| `(a ∨ b) ∧ (a ∨ ¬b)`  |                 |
| `a ∨ (b ∧ ¬b)`        | Distributivité  |
| `a ∨ 0`               | Complémentarité |
| `a`                   | Élément neutre  |

**3.**

| Expression            | Règle utilisée  |
| :-------------------- | :-------------- |
| `a ∨ (¬a ∧ b)`        |                 |
| `(a ∨ ¬a) ∧ (a ∨ b)`  | Distributivité  |
| `1 ∧ (a ∨ b)`         | Complémentarité |
| `a ∨ b`               | Élément neutre  |

**4.** On met `b` en facteur :

| Expression            | Règle utilisée  |
| :-------------------- | :-------------- |
| `(a ∧ b) ∨ (¬a ∧ b)`  |                 |
| `(a ∨ ¬a) ∧ b`        | Distributivité  |
| `1 ∧ b`               | Complémentarité |
| `b`                   | Élément neutre  |

**5.** On reconnaît directement la définition du XOR :

| Expression            | Règle utilisée   |
| :-------------------- | :--------------- |
| `(a ∧ ¬b) ∨ (¬a ∧ b)` |                  |
| `a ⊕ b`               | Définition du XOR |

**6.** On applique d'abord De Morgan au second facteur :

| Expression            | Règle utilisée    |
| :-------------------- | :---------------- |
| `(a ∨ b) ∧ (¬a ∨ ¬b)` |                   |
| `(a ∨ b) ∧ ¬(a ∧ b)`  | De Morgan         |
| `a ⊕ b`               | Définition du XOR |
````

### Exercice {num1}`exercice`
Voici la table de vérité d'une fonction `s` à deux variables. Construisez son
tableau de Karnaugh et donnez l'expression **simplifiée** de `s`.

| `a` | `b` | `s` |
| :-: | :-: | :-: |
| `0` | `0` | `1` |
| `0` | `1` | `1` |
| `1` | `0` | `0` |
| `1` | `1` | `1` |

````{solution}
|         | `b = 0` | `b = 1` |
| :-----: | :-----: | :-----: |
| `a = 0` | `1`     | `1`     |
| `a = 1` | `0`     | `1`     |

Deux groupes de deux cases :

- la **ligne** `a = 0` : `b` change, `a` vaut toujours `0`, d'où `¬a` ;
- la **colonne** `b = 1` : `a` change, `b` vaut toujours `1`, d'où `b`.

`s = ¬a ∨ b`
````

### Exercice {num1}`exercice`
Même consigne, pour cette fonction `s` à trois variables.

| `a` | `b` | `c` | `s` |
| :-: | :-: | :-: | :-: |
| `0` | `0` | `0` | `1` |
| `0` | `0` | `1` | `1` |
| `0` | `1` | `0` | `1` |
| `0` | `1` | `1` | `1` |
| `1` | `0` | `0` | `0` |
| `1` | `0` | `1` | `0` |
| `1` | `1` | `0` | `0` |
| `1` | `1` | `1` | `1` |

````{solution}
|         | `bc = 00` | `bc = 01` | `bc = 11` | `bc = 10` |
| :-----: | :-------: | :-------: | :-------: | :-------: |
| `a = 0` | `1`       | `1`       | `1`       | `1`       |
| `a = 1` | `0`       | `0`       | `1`       | `0`       |

Deux groupes :

- la **ligne** `a = 0` entière (4 cases) : `a` vaut toujours `0`, d'où `¬a` ;
- les **2** cases `bc = 11` : `a` change, mais `b` et `c` valent toujours `1`,
  d'où `b ∧ c`.

`s = ¬a ∨ (b ∧ c)`
````

### Exercice {num1}`exercice`
Même consigne.

| `a` | `b` | `c` | `s` |
| :-: | :-: | :-: | :-: |
| `0` | `0` | `0` | `0` |
| `0` | `0` | `1` | `1` |
| `0` | `1` | `0` | `0` |
| `0` | `1` | `1` | `1` |
| `1` | `0` | `0` | `1` |
| `1` | `0` | `1` | `1` |
| `1` | `1` | `0` | `0` |
| `1` | `1` | `1` | `1` |

````{solution}
|         | `bc = 00` | `bc = 01` | `bc = 11` | `bc = 10` |
| :-----: | :-------: | :-------: | :-------: | :-------: |
| `a = 0` | `0`       | `1`       | `1`       | `0`       |
| `a = 1` | `1`       | `1`       | `1`       | `0`       |

Deux groupes :

- les **4** cases `bc = 01` et `bc = 11` : `a` change, `b` change, mais `c` vaut
  toujours `1`, d'où `c` ;
- les **2** cases `a = 1`, `bc = 00` et `bc = 01` : `c` change, mais `a` vaut
  toujours `1` et `b` toujours `0`, d'où `a ∧ ¬b`.

`s = c ∨ (a ∧ ¬b)`
````

### Exercice {num1}`exercice`
Même consigne.

| `a` | `b` | `c` | `s` |
| :-: | :-: | :-: | :-: |
| `0` | `0` | `0` | `1` |
| `0` | `0` | `1` | `1` |
| `0` | `1` | `0` | `0` |
| `0` | `1` | `1` | `0` |
| `1` | `0` | `0` | `0` |
| `1` | `0` | `1` | `0` |
| `1` | `1` | `0` | `1` |
| `1` | `1` | `1` | `1` |

````{solution}
|         | `bc = 00` | `bc = 01` | `bc = 11` | `bc = 10` |
| :-----: | :-------: | :-------: | :-------: | :-------: |
| `a = 0` | `1`       | `1`       | `0`       | `0`       |
| `a = 1` | `0`       | `0`       | `1`       | `1`       |

Deux groupes de deux cases, qui ne peuvent pas fusionner :

- les cases `a = 0`, `bc = 00` et `01` : `c` change, mais `a` et `b` valent
  toujours `0`, d'où `¬a ∧ ¬b` ;
- les cases `a = 1`, `bc = 11` et `10` : `c` change, mais `a` et `b` valent
  toujours `1`, d'où `a ∧ b`.

`s = (¬a ∧ ¬b) ∨ (a ∧ b)`
````

### Exercice {num1}`exercice`
Même consigne, avec **4** variables. Le tableau de Karnaugh a alors 16 cases :
les lignes portent les valeurs de `a` et `b`, les colonnes celles de `c` et `d`,
toujours dans l'ordre `00`, `01`, `11`, `10`. Reportez la table de vérité dans le
tableau vide, puis donnez l'expression simplifiée de `s`.

| `a` | `b` | `c` | `d` | `s` |
| :-: | :-: | :-: | :-: | :-: |
| `0` | `0` | `0` | `0` | `1` |
| `0` | `0` | `0` | `1` | `1` |
| `0` | `0` | `1` | `0` | `1` |
| `0` | `0` | `1` | `1` | `1` |
| `0` | `1` | `0` | `0` | `0` |
| `0` | `1` | `0` | `1` | `0` |
| `0` | `1` | `1` | `0` | `0` |
| `0` | `1` | `1` | `1` | `1` |
| `1` | `0` | `0` | `0` | `0` |
| `1` | `0` | `0` | `1` | `0` |
| `1` | `0` | `1` | `0` | `0` |
| `1` | `0` | `1` | `1` | `1` |
| `1` | `1` | `0` | `0` | `0` |
| `1` | `1` | `0` | `1` | `0` |
| `1` | `1` | `1` | `0` | `0` |
| `1` | `1` | `1` | `1` | `1` |

|          | `cd = 00` | `cd = 01` | `cd = 11` | `cd = 10` |
| :------: | :-------: | :-------: | :-------: | :-------: |
| `ab = 00` |           |           |           |           |
| `ab = 01` |           |           |           |           |
| `ab = 11` |           |           |           |           |
| `ab = 10` |           |           |           |           |

````{solution}
|          | `cd = 00` | `cd = 01` | `cd = 11` | `cd = 10` |
| :------: | :-------: | :-------: | :-------: | :-------: |
| `ab = 00` | `1`       | `1`       | `1`       | `1`       |
| `ab = 01` | `0`       | `0`       | `1`       | `0`       |
| `ab = 11` | `0`       | `0`       | `1`       | `0`       |
| `ab = 10` | `0`       | `0`       | `1`       | `0`       |

Deux groupes de quatre cases :

- la **ligne** `ab = 00` entière : `c` et `d` changent, mais `a` et `b` valent
  toujours `0`, d'où `¬a ∧ ¬b` ;
- la **colonne** `cd = 11` entière : `a` et `b` changent, mais `c` et `d` valent
  toujours `1`, d'où `c ∧ d`.

`s = (¬a ∧ ¬b) ∨ (c ∧ d)`
````
