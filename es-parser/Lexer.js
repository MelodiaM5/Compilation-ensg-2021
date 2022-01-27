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

	test(c) {
		if (this.current === c) {
			return true;
		} else {
			return false;
		}
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

	// symbol =  '-' | '*' | '/' | '%' | '(' | ')'
	testSymbol() {
		if ("/%".includes(this.current)) return true;
		return false
	}

	parseSymbol() {
		if (this.testSymbol()) this.consume()
		else return false

		if(this.testPlus()) this.produce(TokenType.PLUS)
		this.produce(TokenType.SYMBOL)
		return true
	}

	// PLUS = '+'
	testPlus(){
		if("+".includes(this.current)) return true;
		else return false
	}

	// PLUS = '+'
	parsePlus(){
		if(this.testPlus()) this.consume()
		else return false

		this.produce(TokenType.PLUS);
		return true
	}

	testMoins(){
		if("-".includes(this.current)) return true;
		else return false
	}

	parseMoins(){
		if(this.testMoins()) this.consume()
		else return false

		this.produce(TokenType.MOINS);
		return true
	}

	testParOuverte(){
		if("(".includes(this.current)) return true
		else return false
	}

	parseParOuverte(){
		if(this.testParOuverte()) this.consume();
		else return false

		this.produce(TokenType.PAROUVERTE);
		return true
	}

	testParOuverte(){
		if("(".includes(this.current)) return true
		else return false
	}

	parseParFerm(){
		if(this.testParFerm()) this.consume();
		else return false

		this.produce(TokenType.PARFERM);
		return true
	}

	testMultiplication(){
		if("(".includes(thid.current)) return true
		else return false
	}

	parseMultiplication(){
		if(this.testMultiplication()) this.consume();
		else return false

		this.produce(TokenType.MULTIPLICATION);
		return true
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

		while (this.parseNumber() || this.parseSymbol() || this.parsePlus() || this.parseMoins|| this.parseMultiplication() || this.parseParFerm() || this.parseParOuverte() || this.avoidSpace()) {
			// nothing to do, consume already done in functions
		}

		return this._tokens
	}

}

module.exports = Lexer