"use strict"

class Sudoku {
  constructor(board_string) {
  		this.board_string = board_string
		this.boardSudoku = []
		this.board = this.board()
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
  	let counterIndex = 0;
		for(let i=0;i<9;i++){
			this.boardSudoku[i]=[]
			for(var j=0;j<9;j++){
				this.boardSudoku[i][j]= Number(this.board_string[counterIndex])
				counterIndex++
			}
		}
		return this.boardSudoku
  }
  isRow(board,row,value){
		for(let col=0;col<board[row].length;col++){
			if (board[row][col]===value) {
				return false
			}
		}
		return true
	}
	isCol(board,col,value){
		for(let row=0;row<board.length;row++){
			if (board[row][col]===value) {
				return false
			}
		}
		return true
	}
	isBox(board,col,row,value){
	let rowBox = Math.floor(row / 3) * 3;
   	let colBox = Math.floor(col / 3) * 3;

    for (let i=0;i<3; i++) {
      for (let j=0;j<3;j++) {
        if (board[i+rowBox][j+colBox]==value) {
          return false;
        }
      }
    }
    return true;
   }
	isValue(board,col,row,value){
		return this.isRow(board, row, value) && this.isCol(board,col, value) && this.isBox(board, col, row, value)
	}
	isEmpty(){
		//check kotak yang tak terisi
		let index = []
		for(let i=0;i<9;i++){
			for(let j=0;j<9;j++){
				if (this.boardSudoku[i][j]===0) {
					index.push([i,j])
				}
			}
		}
		return index
	}
	solve(){
		let empty = this.isEmpty()
		for(let i=0;i<empty.length;){
			let row = empty[i][0]
			let col = empty[i][1]
			let value = this.board[row][col]
			let isOK = false
			while(isOK!==true && value<=9){
				if (this.isValue(this.board, col, row, value)) {
					this.sleep(10)
					this.reset_board()
					console.log(this.board);
					isOK = true
					this.board[row][col]=value
					i++
				}
				else{
					value++
				}
			}
			//trigger backtracking
			if(isOK===false){
				this.board[row][col]=0
				i--
			}
		}
		console.log(this.board);
		return ''
	}
	reset_board() {
    console.log("\x1B[2J");
  	}
  	sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      		}
    	}
  	}
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

//console.log(game.board())
