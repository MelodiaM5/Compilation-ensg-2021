const Lexer = require('./Lexer')
const Parser = require('./Parserb')

const src = '2 + 3*( 7 - 2 ) + 4 * 5'
//const src = '1234'

const tokens = new Lexer().parse(src)
const ast = new Parser().parser(tokens)

console.log(src)
console.log(tokens);
console.log(ast)