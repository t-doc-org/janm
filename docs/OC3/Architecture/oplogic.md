<!-- Copyright 2026 Maxime Jan <maxime.jan@edufr.ch> -->
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->

# Opérateurs logiques

## L'algèbre de Boole
Au milieu du XIXᵉ siècle, le
mathématicien anglais *George Boole* (1815–1864) a eu une idée révolutionnaire :
et si l'on pouvait **calculer avec le vrai et le faux**, comme on calcule avec
les nombres ? Dans son ouvrage *Les lois de la pensée* (1854), il construit une
algèbre où les variables ne prennent que **deux valeurs**, vrai ou faux, et se
combinent à l'aide d'*opérateurs logiques*. C'est ce que l'on appelle
aujourd'hui l'**algèbre de Boole**.

```{figure} images/GeorgesBoole.jpg
:width: 40%
:alt: Portrait de George Boole
:align: center

George Boole (1815–1864), l'inventeur de l'algèbre qui porte son nom.

*Portrait dans le domaine public, via Wikimedia Commons.*
```

Pendant près d'un siècle, cette algèbre reste une curiosité de logicien. Puis,
en 1937, l'ingénieur *Claude Shannon* remarque qu'un interrupteur électrique n'a
lui aussi que deux états, **ouvert** ou **fermé**, et que des circuits
d'interrupteurs se comportent exactement comme les expressions de Boole. Cette
rencontre entre la logique et l'électricité est l'acte de naissance de
l'informatique numérique : encore aujourd'hui, **tout** ce que fait un
processeur se ramène à des opérations de l'algèbre de Boole.

```{figure} images/ClaudeShannon.jpg
:width: 40%
:alt: Portrait de Claude Shannon
:align: center

Claude Shannon (1916–2001), qui a relié l'algèbre de Boole aux circuits électriques.

*Photo : Konrad Jacobs, Erlangen, MFO, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/deed.fr)*
```

## Une proposition, c'est vrai ou faux
Avant de calculer, il faut savoir sur quoi on calcule. En logique, une
*proposition* est une **affirmation dont on peut dire si elle est vraie ou
fausse**, sans hésitation possible. "La lampe est allumée", "j'ai 18 ans" ou
"7 est un nombre pair" sont des propositions. En revanche, "quelle heure
est-il ?" ou "ferme la porte !" n'en sont pas : on ne peut pas leur attribuer un
vrai ou un faux.

À chaque proposition, on associe une **variable logique**, notée par une lettre
(`a`, `b`, `c`…). Cette variable résume la proposition en une seule valeur : `1`
si la proposition est vraie, `0` si elle est fausse. Par exemple, en posant
`a` = "la lampe est allumée" :

- si la lampe est allumée, alors `a` vaut `1` ;
- si elle est éteinte, alors `a` vaut `0`.

| Proposition                    | Vaut `1` (vrai) si…          | Vaut `0` (faux) si…   |
| :----------------------------- | :--------------------------- | :-------------------- |
| `a` = "la lampe est allumée"   | la lampe est allumée         | la lampe est éteinte  |
| `b` = "l'élève est majeur"     | l'élève a 18 ans ou plus     | l'élève a moins de 18 ans |
| `c` = "le nombre est pair"     | le nombre est divisible par 2| le nombre est impair  |

Tout l'intérêt de l'algèbre de Boole est là : une fois les propositions
traduites en `0` et `1`, on peut les **combiner** et **calculer** avec,
exactement comme avec des nombres. Les opérateurs logiques des sections
suivantes servent justement à relier plusieurs propositions.


## Le ET, la conjonction (∧)
La conjonction, notée `a ∧ b`, ne vaut `1` **que si les deux** variables valent
`1` en même temps. Dans tous les autres cas, elle vaut `0`.

Posons `a` = "j'ai mon billet" et `b` = "j'ai ma carte d'identité". La
proposition `a ∧ b` se lit "j'ai mon billet **et** ma carte d'identité". Au
contrôle du concert, on ne laisse entrer que si les **deux** sont vraies ; dès
qu'il en manque une, l'entrée est refusée.

| `a` | `b` | `a ∧ b` |
| :-: | :-: | :-----: |
| `0` | `0` | `0`     |
| `0` | `1` | `0`     |
| `1` | `0` | `0`     |
| `1` | `1` | `1`     |

## Le OU, la disjonction (∨)
La disjonction, notée `a ∨ b`, vaut `1` **si au moins une** des deux variables
vaut `1`. Elle ne vaut `0` que lorsque les deux entrées valent `0`.

Posons `a` = "j'aime le foot" et `b` = "j'aime le tennis". La proposition
`a ∨ b` se lit "j'aime le foot **ou** le tennis". Elle est vraie dès que l'on
aime au moins un des deux sports, et même si on aime les deux. Elle n'est fausse
que si on n'aime ni l'un ni l'autre.

| `a` | `b` | `a ∨ b` |
| :-: | :-: | :-----: |
| `0` | `0` | `0`     |
| `0` | `1` | `1`     |
| `1` | `0` | `1`     |
| `1` | `1` | `1`     |

## Le NON, la négation (¬)
La négation, notée `¬a`, est particulière : elle ne porte que sur **une seule**
variable, qu'elle **inverse**. Elle transforme `0` en `1` et `1` en `0`.

Si `a` = "la lampe est allumée", alors `¬a` se lit "la lampe **n'est pas**
allumée". Quand `a` vaut `1` (lampe allumée), `¬a` vaut `0` ; et quand `a` vaut
`0` (lampe éteinte), `¬a` vaut `1`.

| `a` | `¬a` |
| :-: | :--: |
| `0` | `1`  |
| `1` | `0`  |

## Le OU exclusif (⊕)
Le OU exclusif, noté `a ⊕ b` (ou *XOR*, de l'anglais *eXclusive OR*), vaut `1`
lorsque les deux entrées sont **différentes**, et `0` lorsqu'elles sont
**identiques**. Contrairement au OU ordinaire, il vaut donc `0` quand les deux
entrées valent `1`.

Posons `a` = "je pars en train" et `b` = "je pars en bus". La proposition
`a ⊕ b` se lit "je prends soit le train, soit le bus, **mais pas les deux**".
Elle est vraie si l'on choisit exactement un moyen de transport, et fausse si on
n'en prend aucun ou si on tente de prendre les deux à la fois.

| `a` | `b` | `a ⊕ b` |
| :-: | :-: | :-----: |
| `0` | `0` | `0`     |
| `0` | `1` | `1`     |
| `1` | `0` | `1`     |
| `1` | `1` | `0`     |

```{tip}
Une façon simple de retenir le OU exclusif : il répond à la question
"**l'une ou l'autre, mais pas les deux** ?". C'est l'opérateur idéal pour
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
- Le `⊕` s'écrit toujours avec des **parenthèses** explicites, pour éviter toute
  ambiguïté : on note `(a ⊕ b) ∧ c` et jamais `a ⊕ b ∧ c`.
- En cas de doute, on ajoute des **parenthèses** pour lever toute ambiguïté :
  `(a ∨ b) ∧ c` n'a pas le même sens que `a ∨ (b ∧ c)`.
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
On peut fabriquer un OU exclusif (XOR) à partir des trois opérateurs de base.

1.  Créez et complétez une table de vérité contenant les variables booléennes
    `a` et `b` ainsi que `s = a ⊕ b` et `t = (a ∧ ¬b) ∨ (¬a ∧ b)`. Comparez `s`
    et `t` : que constatez-vous ? Quel sens en français pourriez-vous donner à
    la variable `t` ?
2.  Trouvez une autre expression logique donnant le même résultat que `s` et
    `t`. Celle-ci se base sur la logique qu'un OU exclusif peut également se
    traduire en français par "A ou B, mais pas les deux".

````{solution}
**1.** Table de vérité :

| `a` | `b` | `s = a ⊕ b` | `t = (a ∧ ¬b) ∨ (¬a ∧ b)` |
| :-: | :-: | :---------: | :-----------------------: |
| `0` | `0` | `0`         | `0`                       |
| `0` | `1` | `1`         | `1`                       |
| `1` | `0` | `1`         | `1`                       |
| `1` | `1` | `0`         | `0`                       |

Les colonnes `s` et `t` sont **identiques** : l'expression `(a ∧ ¬b) ∨ (¬a ∧ b)`
produit exactement le même résultat que `a ⊕ b`. Autrement dit, une porte OU
exclusif peut être construite uniquement avec des portes ET, OU et NON.

En français, `t` se lit "soit `a` est vraie et `b` fausse, **soit** `b` est
vraie et `a` fausse", c'est-à-dire "exactement une des deux propositions est
vraie".

**2.** L'autre formulation traduit littéralement "A ou B, mais pas les deux" :

`(a ∨ b) ∧ ¬(a ∧ b)`

| `a` | `b` | `a ∨ b` | `a ∧ b` | `¬(a ∧ b)` | `(a ∨ b) ∧ ¬(a ∧ b)` |
| :-: | :-: | :-----: | :-----: | :--------: | :------------------: |
| `0` | `0` | `0`     | `0`     | `1`        | `0`                  |
| `0` | `1` | `1`     | `0`     | `1`        | `1`                  |
| `1` | `0` | `1`     | `0`     | `1`        | `1`                  |
| `1` | `1` | `1`     | `1`     | `0`        | `0`                  |

Le `a ∨ b` exige "au moins une des deux", et le `¬(a ∧ b)` interdit le cas où
les deux sont vraies. On retrouve bien la colonne de `s`.
````


### Exercice {num1}`exercice`
Dans ce chapitre, nous utiliserons souvent [Logix](https://maximejan.github.io/logix/) afin de simuler des circuits logiques. Vous pouvez vous rendre directement sur le site pour jouer avec tous les composants, ou suivre des exercices spécifiques directement sur ce site.

La consigne se trouve toujours dans le bandeau à gauche et, une fois le circuit créé, il est possible de vérifier sa réponse avec le bouton bleu.

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQ3LDqWVyIHVuIGNpcmN1aXQgbG9naXF1ZSIsIm8iOiJFbiBnbGlzc2FudCBldCByZWxpYW50IGRlcyBwb3J0ZXMgbG9naXF1ZXMsIHLDqWFsaXNleiBsZSBjaXJjdWl0IGNvcnJlc3BvbmRhbnQgw6AgbGEgZm9uY3Rpb24gbG9naXF1ZSBTID0gQSDiiKcgQiIsInMiOltdLCJhIjpbIklOUFVUIiwiT1VUUFVUIiwiQU5EIl0sImkiOltbIkEiLDFdLFsiQiIsMV1dLCJ1IjpbWyJTIiwxXV0sImsiOiJ0dCIsInIiOltbWzAsMF0sWzBdXSxbWzAsMV0sWzBdXSxbWzEsMF0sWzBdXSxbWzEsMV0sWzFdXV19&embed=1
:style: height: 400px; aspect-ratio: auto; border: 1px solid black;
:title: Simulateur Logix : construire un circuit S = A ∧ B
```


### Exercice {num1}`exercice`

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQ29uc3RydWlyZSB1biBjaXJjdWl0IiwibyI6IlLDqWFsaXNleiB1biBjaXJjdWl0IGxvZ2lxdWUgY29ycmVzcG9uZGFudCDDoCBsYSBmb25jdGlvbiBsb2dpcXVlIFMgPSDCrChBIOKIqCDCrEIpIiwicyI6W10sImEiOlsiSU5QVVQiLCJPVVRQVVQiLCJPUiIsIk5PVCJdLCJpIjpbWyJBIiwxXSxbIkIiLDFdXSwidSI6W1siUyIsMV1dLCJrIjoidHQiLCJyIjpbW1swLDBdLFswXV0sW1swLDFdLFsxXV0sW1sxLDBdLFswXV0sW1sxLDFdLFswXV1dfQ&embed=1
:style: height: 400px; aspect-ratio: auto; border: 1px solid black;
:title: Simulateur Logix : construire un circuit
```


### Exercice {num1}`exercice`

```{iframe} https://maximejan.github.io/logix/?ex=eyJ2IjoxLCJ0IjoiQ3LDqWVyIHVuIGNpcmN1aXQiLCJvIjoiUsOpYWxpc2V6IHVuIGNpcmN1aXQgbG9naXF1ZSBjb3JyZXNwb25kYW50IMOgIGxhIGZvbmN0aW9uIGxvZ2lxdWUgUyA9IMKsKEMg4oqVICjCrEEg4oioIEIpKSDiiKcgQSIsInMiOltdLCJhIjpbIklOUFVUIiwiT1VUUFVUIiwiQU5EIiwiT1IiLCJOT1QiLCJYT1IiXSwiaSI6W1siQSIsMV0sWyJCIiwxXSxbIkMiLDFdXSwidSI6W1siUyIsMV1dLCJrIjoidHQiLCJyIjpbW1swLDAsMF0sWzBdXSxbWzAsMCwxXSxbMF1dLFtbMCwxLDBdLFswXV0sW1swLDEsMV0sWzBdXSxbWzEsMCwwXSxbMV1dLFtbMSwwLDFdLFswXV0sW1sxLDEsMF0sWzBdXSxbWzEsMSwxXSxbMV1dXX0&embed=1
:style: height: 400px; aspect-ratio: auto; border: 1px solid black;
:title: Simulateur Logix : construire un circuit
```

### Exercice {num1}`exercice`
Déterminez la fonction logique de `S`
```{figure} images/circuit1.png
:width: 100%
:align: center
```
````{solution}
`¬((((A ∧ ¬C) ∨ D) ∧ B) ⊕ A)`
````


