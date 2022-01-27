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
	
	get posPlus1(){
		return this._tokens[this._cursor+1]
	}

	consume() {
		this._currentWord += this.current
		this._cursor++;
	}

	parser(tokens) {
		this._tokens = tokens
		console.log(this._tokens)
		this.parseA()

		console.log(this._pile)

		this._result = this._pile.pop()

		return this._result
	}

	parseA(){

		if(this.current._type == TokenType.NUMBER){
			this._pile.push(parseInt(this.current._name))
			this.consume()
			this.parseB()
			this.parseA()
		}
		else if(this.current._type == TokenType.PAROUVERTE){
			this.consume();
			this.parseA;
			this.consume()
			this.parseB()
		}

		return true

	}

	parseB(){
		if(this.current){
			if(this.current._type == TokenType.PLUS){
				if(this.posPlus1._type == TokenType.NUMBER){
					this.parsePlus()
					this.consume()
					this.consume()
					if(this.current){
						if(this.current._type == TokenType.PAROUVERTE){
							this.parseA();
						}	
					this.parseB()
					}
					return true;
				}
				this.parseA()
				this.parseB()
			}else if (this.current._type == TokenType.MOINS){
				if(this.posPlus1._type == TokenType.NUMBER){
					this.parseMoins()
					this.consume()
					this.consume()
					console.log('hrllo')
					if(this.current){
						if(this.current._type == TokenType.PAROUVERTE){
							this.parseA();
						}	
					this.parseB()
					}
					return true;
				}

		}
		this.parseA()
		}
		return true

	}

	parseMoins(){
		this._pile.push(this._pile.pop()-parseInt(this.posPlus1._name))
	}

	parsePlus(){
		this._pile.push(this._pile.pop() + parseInt(this.posPlus1._name))
		return true
	}

	parsePlusPar(){
		this._pile.push(this._pile.pop()+this._pile.pop())
	}
}

module.exports = Parser