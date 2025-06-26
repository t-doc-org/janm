# Représentation des nombres

## Représentation binaire (base 2)
Quand une séquence de bits représente un nombre entier en utilisant le système binaire, on peut retrouver son équivalent décimal en multipliant chaque chiffre par la puissance de 2 correspondant à sa position et en additionnant le tout. Le bit le plus à droite est multiplié par $2^0$, celui à sa gauche par $2^1$, puis $2^2$, etc... Par exemple, on peut retrouver la valeur décimale de 111001 de la manière suivante :

$$
111001_2 &= 1 \cdot 2^0 + 0 \cdot 2^1 + 0 \cdot 2^2 + 1 \cdot 2^3 + 1 \cdot 2^4 + 1 \cdot 2^5 \\
         &= 1 + 0 + 0 + 8 + 16 + 32 \\
         &= 57_{10}
$$

## De la base 10 à 2
Si on souhaite trouver la représentation binaire d'un nombre décimal, on peut appliquer l'algorithme suivant :

1) Trouver la puissance de 2 la plus grande dans le nombre décimal.
2) Mettre un `1` dans le nombre à la position de cette puissance. Par exemple, si la puissance de 2 la plus grande est $2^4$, alors on a `1xxxx` où la valeur des x reste à déterminer.
3) Soustraire cette plus grande puissance de 2 au nombre décimal.
4) Recommencer à l'étape 1 avec le reste trouvé à l'étape 3. S'arrêter quand le reste est de 0

 Par exemple, si on veut trouver la valeur binaire de $43$, on procède de la manière suivante :

- La plus grande puissance de 2 dans $43$ est $2^5$.
  - On met un `1` à la position 5 : `1xxxxx`
  - $43 - 2^5 = 11$
- La plus grande puissance de 2 fans $11$ est $2^3$
  - On met un `1` à la position 3 : `1x1xxx`
  - $11 - 2^3 = 3$
- La plus grande puissance de 2 dans $3$ est $2^1$
  - On met un `1` à la position 1 : `1x1x1x`
  - $3 - 2^1 = 1$
- La plus grande puissance de 2 dans $1$ est $2^0$
  - On met un `1` à la position 0 : `1x1x11`
  - $1 - 2^0 = 0$
- Arrivé à $0$, l'algorithme est terminé, on remplace simplement les `x` par des `0`. On obtient alors $43_{10} = 101011_2$

## Addition en binaire
On peut additionner deux nombres binaires en utilisant l'addition en colonne que vous connaissez déjà bien. Pour cela, il faut simplement connaître le résultat des quelques additions basiques :

$$
      0_2 + 0_2 &= 0_2 \\
      1_2 + 0_2 &= 1_2 \\
      1_2 + 1_2 &= 10_2 \\
1_2 + 1_2 + 1_2 &= 11_2
$$

L'addition en colonne peut ensuite être appliquée en n'oubliant pas la retenue :

```
 1 1 1 1    ← Retenues
   1 1 1 1
+  0 1 0 1
------------
 1 1 0 0 0 0
```

## Représentation hexadécimale (base 16)
Dans la représentation hexadécimale, les symboles utilisants pour les nombres décimaux sont complétés par des lettres. Ainsi, après le $9$, nous avons encore `A`, `B`, `C`, `D`, `E`, et `F`, valant respectivement les valeurs de $10_{10}$ à $15_{10}$. Pour trouver la représentation décimale d'un nombre en base 16, on peut procéder comme pour la base 2, mais en multipliant par des puissances de 16. Ainsi, pour trouver la représentation décimale de $C6E_{16}$, on fait :

$$
C6E_{16} &= 14 \cdot 16^0 + 6 \cdot 16^1 + 12 \cdot 16^2 \\
         &= 14 + 96 + 3072 \\
         &= 3182_{10}
$$

### Exercice 1

<script type="module">
const [core, quiz] = await tdoc.imports('tdoc/core.js', 'tdoc/quiz.js');
const debug = false;

function conversion(fromRadix, toRadix, min, max) {
    return () => {
        const v = core.randomInt(min, max);
        const solution = core.toRadix(v, toRadix);
        if (debug) console.log(solution);
        return {
            v,
            equal(other) { return v === other.v; },
            history: (max - min + 1) / 2,

            value(ph) { ph.textContent = `${core.toRadix(v, fromRadix)}`; },
            result(args) { args.ok = args.answer.trim() === solution; },
        };
    };
}

quiz.generator('bin2dec', conversion(2, 10, 17, 511));
quiz.generator('dec2bin', conversion(10, 2, 17, 511));
</script>

Convertissez le nombre binaire suivant en notation décimale. Répétez l'exercice au moins 3 fois pour vous assurer de la bonne compréhension de cette conversion.

```{role} input(quiz-input)
:style: width: 4rem; text-align: center;
```

```{quiz} table bin2dec
| Binaire          | Décimal         |
| :--------------: | :-------------: |
| {quiz-ph}`value` | {input}`result` |
```

### Exercice 2
Convertissez le nombre décimal suivant en notation binaire. Répétez l'exercice au moins 3 fois pour vous assurer de la bonne compréhension de cette conversion.

```{role} input(quiz-input)
:style: width: 8rem; text-align: center;
```

```{quiz} table dec2bin
| Décimal          | Binaire         |
| :--------------: | :-------------: |
| {quiz-ph}`value` | {input}`result` |
```
