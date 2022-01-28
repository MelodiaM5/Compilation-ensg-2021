# compilation-ensg-devoir-2021

**NB: Pour toute reponse nécéssitant un schema, vous pouvez utiliser sketchpad (https://sketch.io/sketchpad/), télécharger le résultat au format pdf et me le joindre à votre réponse.**


1 - Quel formalisme doit on aux auteurs **John Backus** et **Peter Naurr** ? Et à quoi sert-il ?

Il s'agit du BNF (Backus-Naur Form) qui permet la description des langages de programmation (l'écriture synthaxique).


2 - Donnez la grammaire capable de lire la syntaxe bien parenthésée suivante :
`[[{}([{}]){{}}]]`

E -> '['E']' | E-> '{'E'}' | E->'('E')' |E-> €

3 - Donnez la grammaire (lexer et parser) capable de comprendre du XML
exemple :
``` xml
<xml>
  <persons>
    <person firstName="Ada" lastName="Lovelace" />
    <person firstName="Grace" lastName="Hopper"/>
  </persons>
</xml>
```
lexer
char = (a-z)
word = (char)
key = {'xml' | 'persons'}
balise = '<' key '>''</'key'>'
classe = (word'=')
phrase = {char}
person = '<person' class phrase class phrase '/>'








4 - Transformez la grammaire suivante afin de résoudre le problème de la recursivité à gauche. **(2 points)**
``` go
E -> E '*' E | E '/' E | '-' E | n | €
```
A -> n | €

E -> A '*' A | A '/' A | '-' A |


5 - La grammaire `E -> E '||' E | E | €` est-elle acceptable pour un parseur **LR** ? Pourquoi ?
La grammaire n'est pas acceptable pour un parser LR. En effet ce dernier se dernier s'appelle tout le temps lui-même.


6 - Cette grammaire est inexact, pourquoi ?
``` go
A -> M '||' A
M -> E '&&' M
E -> '!' A | n
```
Il n'y a pase d'arret, les fonctions sont alors infini. Il faudrait faire ce qui suit :

A -> M '||' A | €
M -> E '&&' E 
E -> '!' A | n



7 - Dessinez l'AST correspondant à la formule suivante, avec le respect de la précédence des opérateurs : 
  - `(1 + 1) * 2 * (3 + 4) - 5`

```
       '-'
       /  \
	 '*'    5
     /   \
   '*'   '+'
   / \   / \
 '+'   2  3  4 
/  \  
1   1 

```


8 - A partir du premier AST, schematisez ce qu'il se passe dans la pile d'exécution lors de sa resolution
(vous devez dessiner une pile pour chaque étape en précisant les operations effectuées si nécéssaire) **(2 points)**
| 1| -> |1| -> |+| -> |2| -> |2|-> |*| -> |4| -> |3|-> |4| -> |+| -> |7| -> |*| -> |28| -> |5| -> |-| -> |23|
        |1|    |1|           |2|   |2|           |4|   |3|    |4|    |4|    |7|            |28|   |5|
		       |1|                 |2|                 |4|    |3|           |4|                   |28|
			                                                  |4|
9 - Dans une machine à pile, à l'aide des operations PUSH n, ADD et MULT écrivez un pseudo programme machine qui correspond à la formule de la question 7 : 
push 1
push 1
add
push 2
mult
push 2
mult
push 3
push 4
add
mult
push 5
substract


10 - Donnez deux raison pour lesquelles l'interpreteur du premier `Basic` n'est pas performants. Quels grammaire aurait il été impossible d'implémenter avec ce type de parseur ?

Il a un fort coût mémoire et ne détcte les erreurs qu'aprés execution. Il aurait était impossible d'implémenter LR


11 - Quel est la complexité d'un algorithme **`ll(*)`** ? Et comment l'optimiser (citez le nom de la technique et la decrire) ?
La complexite de ll(*) est exponentiel. En utilisant la solution Packrat. Cette solution utilise un cache elle y stocke uen paire de clé et une valeur. elle réutilise le cache lors de son prochain passage.

12 - Que veut dire **AOP** et décrire le paradigme

AOP veut dire Aspect Oriented Programming, on sépare les responsabilités.


13 - Quel est la différence entre un **typage implicite** et un **typage dynamique**. Peut-on rencontrer les deux concepts dans le même langage ?


Typage dynamique : typage donné lors de l'execution
Typage implicite :  typage déduit par analyse ou lors de l'execution
Oui cela est possible


14 - Donnez 5 exemples de mots possibles à la grammaire suivante : 
``` go
0* 1 ( 2? 1+ 0 )+
```
00001
0120
00011110
01210
0110

15 - La grammaire E -> E + n | n accept elle les formules suivantes :
- [ oui ] 1 + 1 
- [ non ] + 1
- [ non ] 1 +
- [ non ] +
- [ non ] vide
- [ oui ] 2 + 1 + 1
- [ oui ] 7
- [ non ] e + 1
- [ non ] a + a + a 

16 - Transformez les formules arithmétiques suivante en **Lisp** ex. `2 + 3 donne ( + 2 3 )` : **(2 points)**
``` go
5 + 7 * 2 * ( 1 + 1 ) / 4
1 + 2 * 7 + ( 2 * 2 ) + 7
```
+5( /( *7( *2( +11))) 4
+( +( +1 +(*27))(*22))7

17 - Comme le ferait un analyseur sémantique, optimisez le programme suivant :
``` go
func main (arg) {
	var a int = arg
	var b int = 7
	var c int = a + b
	var d = c

	if d - a < 5 {
		fmt.Println("La réponse à la question suivante est Algoid, bien entendu ! Mais ne nous distrayons pas. :-)")
	} else {
		fmt.Println("Le résultat de " + a + " + " + b + " est " + d)
	}
}
```

``` go
func main(arg){

	var c int= arg + 7

		fmt.Println("La réponse à la question suivante est Algoid, bien entendu ! Mais ne nous distrayons pas. :-)")
	} else {
		fmt.Println("Le résultat de " + arg + " 7 est " + d)
	}
}
```

Bonus - Quel est le meilleur langage au monde ? (20 points)

Algoid ? **oui** / **oui**

Nan.... J'rigole :-)
Bonne continuation à tous :-)
