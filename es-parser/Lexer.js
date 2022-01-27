const TokenType = require('./TokenType')
const Token = require('./Token')

class Lexer {

	constructor() {
		this._src = ''
		this._cursor = 0
		this._currentWord = ''
		this._tokens = []
	}

	get current() {
		return this._src[this._cursor]
	}

	consume() {
		this._currentWord += this.current
		this._cursor++;
	}

	produce(type) {
		this._tokens.push(new Token(this._currentWord, type))
		this.cleanCurrentWord()
	}

	cleanCurrentWord() {
		this._currentWord = ''
	}

	// digit = 0 | 1 | 2 | 3 ....
	testDigit() {
		if ("0123456789".includes(this.current)) return true;
		return false
	}

	// [0-9]+
	parseNumber() {
		if (!this.testDigit()) return false;
		do {
			this.consume()
		} while (this.testDigit())

		// production of number
		this.produce(TokenType.NUMBER)
		return true
	}

	// symbol =  '+' | '-' | '*' | '/' | '%' | '(' | ')'
	testSymbol() {
		if ("/%".includes(this.current)) return true;
		return false
	}

	parseSymbol() {
		
		if(this.testPlus()){ 
			this.consume();
			this.produce(TokenType.PLUS)
			return true
		}
		else if(this.testMoins()) {
		this.consume(); 
		this.produce(TokenType.MOINS)
		return true
	}else if(this.testMultiplication()){ 
		this.consume(); 
		this.produce(TokenType.MULTIPLICATION)
		return true
	}else if(this.testParOuverte()) {
		this.consume(); 
		this.produce(TokenType.PAROUVERTE)
		return true
	}else if(this.testParFerm()){ 
		this.consume(); 
		this.produce(TokenType.PARFERM)
		return true
	}else if (this.testSymbol()){
		this.consume();  
		this.produce(TokenType.SYMBOL)
		return true
	}else{ return false}

	}

	// PLUS = '+'
	testPlus(){
		if("+".includes(this.current)) return true;
		else return false
	}

	//
	testMoins(){
		if("-".includes(this.current)) return true;
		else return false
	}

	testParOuverte(){
		if("(".includes(this.current)) return true
		else return false
	}

	testParFerm(){
		if(")".includes(this.current)) return true
		else return false
	}

	testMultiplication(){
		if("*".includes(this.current)) return true
		else return false
	}

	// space = ' ' | '\t' | '\n' | '\l' | '\r' | '\0'
	testSpace() {
		if (" \t\n\l\r\0".includes(this.current)) return true;
		return false
	}

	avoidSpace() {
		while (this.testSpace()) {
			this.consume()
			this.cleanCurrentWord()
		}

		return this.current != undefined
	}

	// parser = (number | symbol | space)*
	parse(src) {
		this._src = src

		while (this.parseNumber() || this.parseSymbol() || this.avoidSpace()) {
			// nothing to do, consume already done in functions
		}

		return this._tokens
	}

}

module.exports = Lexer