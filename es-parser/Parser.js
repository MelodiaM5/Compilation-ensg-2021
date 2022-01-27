const Lexer = require('./Lexer')
const { PLUS } = require('./TokenType')
const TokenType = require('./TokenType')


class Parser {

	constructor() {
		this._tokens = null
		this._cursor = 0
		this._result = null
		this._pile = new Array
	}

	get current() {
		if(this._tokens[this._cursor]){
		return this._tokens[this._cursor]
		}
	}
	

	consume() {
		this._cursor++;
	}

	parser(tokens) {
		this._tokens = tokens

		this.parserA();

		this._result = this._pile.pop()
		console.log(this._pile)

		return this._result
	}

	parserA(){

		if(this.current._type == TokenType.NUMBER){

			this._pile.push(parseInt(this.current._name))
			this.consume()
			console.log(this._pile)
			this.parserB()
		}
		else if(this.current._type == TokenType.PAROUVERTE){
			this.consume()
			console.log(this._pile)
			this.parserA()
			this.consume()
			console.log(this._pile)
			if(this.current){
				this.parserB()
		}else{
			return true
		}
	}
	return true
}

	parserB(){
		if(this.current){

		
		if(this.current._type==TokenType.PLUS){
			this.consume()
			console.log(this._pile)
			this.parserA()
			this.parsePlus()
			console.log(this._pile)
		}
		else if(this.current._type==TokenType.MOINS){
			this.consume()
			console.log(this._pile)
			this.parserA()
			this.parseMoins()
			console.log(this._pile)
		}
		else if(this.current._type==TokenType.MULTIPLICATION){
			this.consume()
			console.log(this._pile)
			this.parserA()
			this.parseMultiplication()
			console.log(this._pile)
		}
		else if(this.current._type==TokenType.PARFERM){
			return true
		}
		return true
	}

		return true
	}

	parsePlus(){
		this._pile.push(this._pile.pop()+this._pile.pop())
		return true
	}

	parseMoins(){
		let a = this._pile.pop()
		console.log(a)
		this._pile.push(this._pile.pop()-a)
	}

	parseMultiplication(){
		this._pile.push(this._pile.pop()*this._pile.pop())
		console.log('hello')
	}



		
}

module.exports = Parser

//piste pour multiplication ajout d'un parse c pour gérér l'ordre.