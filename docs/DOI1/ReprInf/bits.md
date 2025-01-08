# Bits, octets, et tableaux de correspondance

## Bits et octets
Un bit (contraction de "binary digit") est l’unité de base de l’information numérique. C’est un élément binaire, c’est-à-dire qu’il n’a que deux états possibles. Pour faciliter l’écriture, ces deux états sont couramment représentés par un 0 et par un 1. On retrouve souvent ces bits groupés par séquence. Par exemple 1011 est une séquence de 4 bits. En informatique, la séquence de bits de longueur 8 est très souvent utilisée. Une telle séquence de 8 bits se nomme octet, que l’on retrouve également fréquemment sous son nom anglais byte. Notez que bit est souvent abbrégé par b et octet par o (Byte est quant à lui abbrégé par B).

Comme pour toute autre unité de mesure, le bit et l’octet peuvent être précédés de préfixes afin d’en désigner de grandes quantités. Ces préfixes sont donnés dans le tableau ci-dessous

| Préfixe  | Taille  | 
| :--| :--| 
| kilo (k) | 10<sup>3|
| Méga (M) | 10<sup>6  | 
| Giga (G) | 10<sup>9  | 
| Téra (T) | 10<sup>12 |
| Péta (P) | 10<sup>15 |

Ainsi, 20 kb vaut 20 · 10<sup>3</sup>b, ce qui équivaut à 20’000b. De manière similaire, 0.1Go vaut 0.1 · 10<sup>9</sup>o, ou
10’000’000o, et donc 80’000’000b.

## Nombre d'états

Précédemment, nous avons dit qu’un bit ne peut avoir que deux états (0 et 1). Qu’en est-il alors des séquences de bits ?
- Séquence de 2 bits → 00/01/10/11 → 4 états
- Séquence de 3 bits → 000/001/010/011/100/101/110/111 → 8 états
- Séquence de 4 bits → 0000/0001/0010/0011/0100/0101/0110/0111/1000/1001/1010/1011/1100/1101/1110/1111 → 16 états


De cette énumération, on peut rapidement conclure qu’une séquence de n bits peut prendre 2<sup>n</sup> états différents.

## Tableaux de correspondance

Une première manière de représenter n’importe quelle information avec des bits est le tableau de correspondance. Celui-ci consiste simplement à lier une séquence de bits à une donnée. Prenons l’exemple où l’on souhaite représenter les 7 couleurs de l’arc-en-ciel. La séquence de bits doit alors pouvoir prendre au minimum 7 états. On remarque que la puissance de 2 supérieure la plus proche est 8, et comme 8 = 23, nous avons besoin de 3 bits pour représenter ces 7 couleurs. Ensuite, on peut arbitrairement faire correspondre une couleur à une séquence de 3 bits comme ci-dessous.

| Couleur  | Séquence de bits  | 
| :--| :--| 
| Violet | 000 |
| Indigo | 001  | 
| Bleu | 010  | 
| Vert | 011 |
| Jaune | 100 |
| Orange | 101 |
| Rouge | 110 |

Ainsi, avec ce tableau de correspondance, la séquence de bits 010100101 représenterait les couleurs [bleu, jaune, orange]. Ces tableaux de correspondance ne sont toutefois pas adaptés pour représenter tout type de données. Par exemple, si l’on souhaitait représenter des millions de nuances de couleur, ce tableau deviendrait gigantesque, et cette technique ne serait alors plus efficace. Les tableaux de correspondance sont donc adaptés pour représenter des informations qui ne peuvent prendre que peu d’états.

## Exercices

## Exercices

### Exercice 1
a) On imagine un ordinateur dont la mémoire ne peut stocker que 4 bits. Combien d’états différents cette mémoire peut-elle représenter ?


b) Si cet ordinateur possède maintenant 10 bits de mémoire, combien d’états pourraient être représentés ?


c) Un ordinateur un peu plus réaliste possède maintenant 512 miliards de bits de mémoire. Combien d’états peuvent être représentés sur celle-ci ? (Donnez la réponse sous forme de puissance)

````{admonition} Solution
:class: note dropdown
a) 16 états

b) 1024 états

c) 2512′000′000′000 états
````


### Exercice 2
a) On veut représenter les 26 lettres de l’alphabet avec des séquences de bits grâce à un tableau de correspondance. Quelle doit être la longueur minimal de ces séquences de bits afin de pouvoir représenter ces 26 lettres ?


b) Qu’en est-il si l’on veut non seulement représenter les 26 lettres minuscule, mais également les majuscules ?

````{admonition} Solution
:class: note dropdown
a) 32 est la puissance de 2 supérieure la plus proche de 26. Comme 32 = 25, la longueur minimale de ces séquences de bits doit être de 5.

b) Il faut représenter 52 états et 64 = 26 est la puissance de 2 supérieure la plus proche. Il faut donc des séquence de bits de longueur 6 au minimum.
````

### Exercice 3
On compte aujourd’hui environ 1.3 millions espèces d’insectes répertoriées dans le monde entier. Combien d’octets au minimum doit-on utiliser pour représenter toutes ces espèces ? (Ici, un octet ne peut pas être coupé en deux)

````{admonition} Solution
:class: note dropdown
Il faut au minimum 3 octets. En effets, avec 2 octets, nous avons 16 bits, et 2<sup>16</sup> = 65′536 états ne sont pas suffisants. En revanche avec 3 octets, donc 24 bits, 2<sup>24</sup> = 16′777′216 états sont suffisants.
````

### Exercice 4
Soit un disque dur dont une partie de la mémoire contient la séquence de bits suivante :

100010100001010001000011001100

Sachant que cette séquence représente les avis des clients d’un hôtel en utilisant le tableau ci-dessous,
complétez-le avec le nombre de chaque type d’avis qui a été donné.

| Avis          | Séquence de bits | Nombre de cet avis |
| :--           | :--              | :--                |
| Excellent     | 000              |                    |
| Très bien     | 001              |                    |
| Bien          | 010              |                    |
| Moyen         | 011              |                    |
| Mauvais       | 100              |                    |
| Très Mauvais  | 101              |                    |
| Exécrable     | 110              |                    |

````{admonition} Solution
:class: note dropdown
Excellent : 1
Très bien : 3
Bien : 2
Moyen : 1
Mauvais : 3
Très Mauvais : 0
Excécrable : 0
````

### Exercice 5
a) Combien valent 5 To en ko ?

b) Combien valent 27ko en Go ?

c) Combien valent 8Go en Mb?

````{admonition} Solution
:class: note dropdown
a) 5’000’000’000 ko

b) 0.000027 Go

c) 64’000 Mb
````

### Exercice 6
a) Combien de bits il y a-t-il dans une clef USB de 8 Go ?

b) Combien bits peut-on recevoir par minute avec une connexion internet de 100Mo/s ?

c) Un appareil photo contient une carte SD permettant de stocker 128Go. Sachant que chaque photo de cet appareil prend 24Mb de mémoire, combien de photos peut-on prendre avant que la carte soit pleine ?

````{admonition} Solution
:class: note dropdown
a) 64’000’000’000 bits

b) 100Mo/s = 100’000’000 o/s = 800’000’000 b/s. Avec 60s dans 1min, on a donc 800′000′000 b/s ·  60 s/min = 48′000′000′000 b/min

c) Chaque photo pèse 24Mb = 3Mo. De plus, la taille de la carte SD est de 128Go = 128’000Mo. On peut donc mettre 128000/3 = 42666.6 photos sur cette carte. Comme on ne peut pas diviser une photo, on peut donc mettre 42’666 photos sur cette carte SD avant qu’elle ne soit (presque) pleine.
````

### Exercice 7
Chaque minute, 400 nouvelles heures de vidéo sont partagées sur Youtube. En prenant une moyenne de 120 Mo par minute de vidéo, combien de disques durs de 3 To faut-il ajouter chaque jour dans les centres de données de Youtube pour stocker ces vidéos ?

````{admonition} Solution
:class: note dropdown
ddd
````