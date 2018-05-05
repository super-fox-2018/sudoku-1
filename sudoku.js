"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string;
  }

  solve() {
    // loop 1 - 9
      // checkrow
    let board = this.board();
    let zeroCoordinates = this.getZeros(board)
    let counter = 0;

    //console.log(zeroCoordinates)
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          for (let val = 1; val <= 9; val++) {
            if (this.checkHorizontal(board, val, j) &&
                this.checkVertical(board, val, i) &&
                this.checkBox(board, val, j, i)) {
              board[i][j] = val;
            }
          }
        }
      }
    }
    return board;
  }

  getZeros(board) {
    //let board = this.board();
    let zeroCoordinates = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          zeroCoordinates.push([i,j]);
        }
      }
    }
    return zeroCoordinates;
  }

  checkHorizontal(board, number, x) {
    //let board = this.board();
    for (let i = 0; i < 9; i++) {
      if (number === board[x][i]) return false;
    }
    return true;
  }

  checkVertical(board, number, y) {
    //let board = this.board();
    for (let i = 0; i < 9; i++) {
      if (number === board[i][y]) return false;
    }
    return true;
  }

  checkBox(board, number, x, y) {
    let baseX = Math.floor(x / 3) * 3;
    let baseY = Math.floor(y / 3) * 3;

    for (let i = baseX; i < baseX + 3; i++) {
      for (let j = baseY; j < baseY + 3; j++) {
        if (number === board[i][j]) return false;
      }
    }
    return true
  }

  // Returns a string representing the current state of the board
  board() {
    let board = [];
    let boardString = this.string;
    let countStr = 0; // index for each string

    for (let i = 0; i < 9; i++) {
      let group = [];

      for (let j = 0; j < 9; j++) {
        group.push(Number(boardString[countStr]));
        countStr++ // increment string index
      }
      board.push(group);
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

// console.log(game.board())
console.log(game.solve());
