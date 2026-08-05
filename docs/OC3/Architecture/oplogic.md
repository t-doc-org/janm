<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Opérateurs logiques

## L'algèbre de Boole
Au milieu du XIXᵉ siècle, bien avant l'invention du premier ordinateur, le
mathématicien anglais *George Boole* (1815–1864) a eu une idée révolutionnaire :
et si l'on pouvait **calculer avec le vrai et le faux**, comme on calcule avec
les nombres ? Dans son ouvrage *Les lois de la pensée* (1854), il construit une
algèbre où les variables ne prennent que **deux valeurs**, vrai ou faux, et se
combinent à l'aide d'*opérateurs logiques*. C'est ce que l'on appelle
aujourd'hui l'**algèbre de Boole**.

Pendant près d'un siècle, cette algèbre reste une curiosité de logicien. Puis,
en 1937, l'ingénieur *Claude Shannon* remarque qu'un interrupteur électrique n'a
lui aussi que deux états, **ouvert** ou **fermé**, et que des circuits
d'interrupteurs se comportent exactement comme les expressions de Boole. Cette
rencontre entre la logique et l'électricité est l'acte de naissance de
l'informatique numérique : encore aujourd'hui, **tout** ce que fait un
processeur se ramène à des opérations de l'algèbre de Boole.

## Deux valeurs : 0 et 1
En algèbre de Boole, une variable ne peut valoir que `0` ou `1`. Par convention,
`1` représente le **vrai** et `0` le **faux**. On peut aussi voir ces deux
valeurs comme les deux états d'un fil électrique : `1` = courant qui passe,
`0` = pas de courant.

Un opérateur logique prend une ou deux de ces valeurs et en produit une
nouvelle. Pour décrire complètement son comportement, on dresse une **table de
vérité** : un tableau qui donne le résultat pour **toutes** les combinaisons
possibles des entrées.

## Le ET, la conjonction (∧)
La conjonction, notée `a ∧ b`, ne vaut `1` **que si les deux** variables valent
`1` en même temps. Dans tous les autres cas, elle vaut `0`.

| `a` | `b` | `a ∧ b` |
| :-: | :-: | :-----: |
| `0` | `0` | `0`     |
| `0` | `1` | `0`     |
| `1` | `0` | `0`     |
| `1` | `1` | `1`     |

## Le OU, la disjonction (∨)
La disjonction, notée `a ∨ b`, vaut `1` **si au moins une** des deux variables
vaut `1`. Elle ne vaut `0` que lorsque les deux entrées valent `0`.

| `a` | `b` | `a ∨ b` |
| :-: | :-: | :-----: |
| `0` | `0` | `0`     |
| `0` | `1` | `1`     |
| `1` | `0` | `1`     |
| `1` | `1` | `1`     |

## Le NON, la négation (¬)
La négation, notée `¬a`, est particulière : elle ne porte que sur **une seule**
variable, qu'elle **inverse**. Elle transforme `0` en `1` et `1` en `0`.

| `a` | `¬a` |
| :-: | :--: |
| `0` | `1`  |
| `1` | `0`  |

## Le OU exclusif (⊕)
Le OU exclusif, noté `a ⊕ b` (ou *XOR*, de l'anglais *eXclusive OR*), vaut `1`
lorsque les deux entrées sont **différentes**, et `0` lorsqu'elles sont
**identiques**. Contrairement au OU ordinaire, il vaut donc `0` quand les deux
entrées valent `1`.

| `a` | `b` | `a ⊕ b` |
| :-: | :-: | :-----: |
| `0` | `0` | `0`     |
| `0` | `1` | `1`     |
| `1` | `0` | `1`     |
| `1` | `1` | `0`     |

```{tip}
Une façon simple de retenir le OU exclusif : il répond à la question
« **l'une ou l'autre, mais pas les deux** ? ». C'est l'opérateur idéal pour
tester si deux valeurs sont différentes.
```

## Priorité et parenthèses
On peut combiner plusieurs opérateurs dans une même expression. Comme en
mathématiques avec `+` et `×`, il existe un **ordre de priorité** : on évalue
d'abord le `¬`, puis le `∧`, et enfin le `∨`.

Par exemple, `1 ∨ 0 ∧ 0` se lit `1 ∨ (0 ∧ 0)` : le `∧` est prioritaire, donc on
calcule d'abord `0 ∧ 0 = 0`, puis `1 ∨ 0 = 1`.

```{important}
- Ordre de priorité : **`¬`** d'abord, puis **`∧`**, puis **`∨`**.
- En cas de doute, on ajoute des **parenthèses** pour lever toute ambiguïté :
  `(a ∨ b) ∧ c` n'a pas le même sens que `a ∨ (b ∧ c)`.
```

Voici un récapitulatif des cinq opérateurs de base de l'algèbre de Boole.

| Notation | Nom          | Vaut `1` lorsque…                        |
| :------: | :----------- | :--------------------------------------- |
| `a ∧ b`  | ET           | les deux entrées valent `1`              |
| `a ∨ b`  | OU           | au moins une entrée vaut `1`             |
| `¬a`     | NON          | l'entrée vaut `0` (il inverse)           |
| `a ⊕ b`  | OU exclusif  | les deux entrées sont différentes        |

```{tip}
En électronique, on rencontre souvent d'autres notations pour ces mêmes
opérateurs : le ET s'écrit `a · b` (comme une multiplication), le OU s'écrit
`a + b` (comme une addition), et le NON se note avec une barre au-dessus de la
variable.
```

## Des opérateurs aux portes logiques
La grande découverte de Shannon, c'est que chaque opérateur logique peut être
réalisé par un petit **composant électronique** appelé *porte logique*. Une
porte reçoit un ou deux signaux (`0` ou `1`) en entrée, à gauche, et produit le
résultat en sortie, à droite. Sur les schémas de circuits, chaque porte possède
une **forme normalisée** qui permet de la reconnaître d'un coup d'œil :

- la porte **ET** a un côté gauche plat et un côté droit **arrondi**, un peu en
  forme de D ;
- la porte **OU** a un dos incurvé et se termine par une **pointe** à droite ;
- la porte **NON** est un **triangle** suivi d'un petit **rond**, et c'est ce
  rond qui symbolise l'inversion ;
- la porte **OU exclusif** ressemble à la porte OU, avec une **double courbe** à
  l'entrée.

````{list-grid}
:style: grid-template-columns: 1fr 1fr; align-items: center; justify-items: center; gap: 0.5rem 2rem;
- **Porte ET** : `a ∧ b`
  ```{image} images/porte_et.svg
  :width: 90%
  :alt: Symbole de la porte logique ET, plate à gauche et arrondie à droite
  ```
- **Porte OU** : `a ∨ b`
  ```{image} images/porte_ou.svg
  :width: 90%
  :alt: Symbole de la porte logique OU, terminée en pointe
  ```
- **Porte NON** : `¬a`
  ```{image} images/porte_non.svg
  :width: 90%
  :alt: Symbole de la porte logique NON, un triangle suivi d'un rond
  ```
- **Porte OU exclusif** : `a ⊕ b`
  ```{image} images/porte_xor.svg
  :width: 90%
  :alt: Symbole de la porte logique OU exclusif
  ```
````


## Exercices

### Exercice {num1}`exercice`
Quelle est la valeur (`0` ou `1`) de chacune des expressions suivantes ?

```{role} bin(quiz-select)
:right:
:options: |
: 0
: 1
```

```{quiz}
:style: max-width: 22rem;
1.  {bin}`0` `1 ∧ 0`
2.  {bin}`1` `1 ∨ 0`
3.  {bin}`1` `¬0`
4.  {bin}`0` `1 ⊕ 1`
5.  {bin}`1` `1 ⊕ 0`
6.  {bin}`1` `(1 ∧ 1) ∨ 0`
7.  {bin}`0` `¬(1 ∨ 1)`
8.  {bin}`0` `0 ∨ ¬1`
```

### Exercice {num1}`exercice`
Complétez la table de vérité de l'expression `¬a ∨ b`.

| `a` | `b` | `¬a ∨ b` |
| :-: | :-: | :------: |
| `0` | `0` |   `?`    |
| `0` | `1` |   `?`    |
| `1` | `0` |   `?`    |
| `1` | `1` |   `?`    |

````{solution}
| `a` | `b` | `¬a ∨ b` |
| :-: | :-: | :------: |
| `0` | `0` | `1`      |
| `0` | `1` | `1`      |
| `1` | `0` | `0`      |
| `1` | `1` | `1`      |

Le `¬` étant prioritaire, on calcule d'abord `¬a`, puis on applique le `∨` avec
`b`. Le résultat ne vaut `0` que lorsque `¬a` **et** `b` valent tous les deux
`0`, c'est-à-dire lorsque `a` vaut `1` et `b` vaut `0`.
````

### Exercice {num1}`exercice`
On peut fabriquer un OU exclusif à partir des trois opérateurs de base. Complétez
les tables de vérité de `a ⊕ b` et de `(a ∧ ¬b) ∨ (¬a ∧ b)`, puis comparez la
dernière colonne des deux tables. Que constatez-vous ?

````{solution}
| `a` | `b` | `a ⊕ b` | `(a ∧ ¬b) ∨ (¬a ∧ b)` |
| :-: | :-: | :-----: | :-------------------: |
| `0` | `0` | `0`     | `0`                   |
| `0` | `1` | `1`     | `1`                   |
| `1` | `0` | `1`     | `1`                   |
| `1` | `1` | `0`     | `0`                   |

Les deux dernières colonnes sont **identiques** : l'expression
`(a ∧ ¬b) ∨ (¬a ∧ b)` produit exactement le même résultat que `a ⊕ b`. Autrement
dit, une porte OU exclusif peut être construite uniquement avec des portes ET,
OU et NON.
````

### Exercice {num1}`exercice`
Sur un schéma de circuit, à quel opérateur logique correspond chacune des formes
décrites ci-dessous ?

```{role} porte(quiz-select)
:right:
:options: |
: ET
: OU
: NON
: OU exclusif
```

```{quiz}
:style: max-width: 32rem;
1.  {porte}`ET`
    Un côté gauche plat et un côté droit arrondi, en forme de D.
2.  {porte}`OU`
    Un dos incurvé qui se termine par une pointe à droite.
3.  {porte}`NON`
    Un triangle terminé par un petit rond.
4.  {porte}`OU exclusif`
    La même forme que le OU, avec une double courbe à l'entrée.
```

### Exercice {num1}`exercice`
Sachant que `a = 1`, `b = 0` et `c = 1`, quelle est la valeur de chacune des
expressions suivantes ?

```{role} val(quiz-select)
:right:
:options: |
: 0
: 1
```

```{quiz}
:style: max-width: 30rem;
1.  {val}`1` `(a ∧ b) ∨ (¬b ∧ c)`
2.  {val}`1` `a ∧ (b ∨ c)`
3.  {val}`0` `¬a ∨ (b ∧ c)`
4.  {val}`0` `(a ∨ b) ∧ ¬c`
5.  {val}`0` `¬(a ∧ c) ∨ b`
6.  {val}`1` `(a ⊕ b) ∧ c`
```

````{solution}
On remplace chaque variable par sa valeur, puis on respecte les priorités
(`¬` d'abord, puis `∧`, puis `∨`) :

1.  `a ∧ b` vaut `1 ∧ 0 = 0` et `¬b ∧ c` vaut `¬0 ∧ 1 = 1`, donc `0 ∨ 1 = 1`.
2.  `b ∨ c` vaut `0 ∨ 1 = 1`, donc `a ∧ 1 = 1 ∧ 1 = 1`.
3.  `¬a` vaut `0` et `b ∧ c` vaut `0 ∧ 1 = 0`, donc `0 ∨ 0 = 0`.
4.  `a ∨ b` vaut `1` et `¬c` vaut `0`, donc `1 ∧ 0 = 0`.
5.  `a ∧ c` vaut `1 ∧ 1 = 1`, donc `¬1 = 0`, et `0 ∨ 0 = 0`.
6.  `a ⊕ b` vaut `1 ⊕ 0 = 1`, donc `1 ∧ 1 = 1`.
````
