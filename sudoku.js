"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
  }

  solve() {

  }

  // Returns a string representing the current state of the board
  board() {
    let board = [];
    // let boardString = '105802000090076405200400819019007306762083090000061050007600030430020501600308900'
    let boardString = this.board_string;
    let countStr = 0;

    for (let i = 0; i < 9; i++) {
      let group = [];

      for (let j = 0; j < 9; j++) {
        group.push(boardString[countStr]);
        countStr++
      }
      board.push(group)
    }

    return board;
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
// game.solve()

console.log(game.board())
