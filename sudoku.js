'use strict'

class Sudoku {
  constructor(boardString) {
    this.string = boardString;
    this.board = this.createBoard(this.string);
    this.blanks = this.getBlanks(this.board);
  }

  createBoard(string) {
    let sudokuBoard = [];
    for (let i = 0; i < 9; i++) {
      sudokuBoard.push([]);
      for (let j = 0; j < 9; j++) {
        sudokuBoard[i].push(Number(string[(9 * i) + j]));
      }
    }
    return sudokuBoard;
  }

  getBlanks(board) {
    let blankBoxes = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          blankBoxes.push([i,j]);
        }
      }
    }
    return blankBoxes;
  }

  checkVertical(board, value, column) { // column = checked column (column of the blank box)
    for (let i = 0; i < 9; i++) {
      if (value === board[i][column]) {
        return false;
      }
    }
    return true;
  }

  checkHorizontal(board, value, row) { // row = checked row (row of the blank box)
    for (let i = 0; i < 9; i++) {
      if (value === board[row][i]) {
        return false;
      }
    }
    return true;
  }

  check3x3 (board, value, row, column) {
    let topRow = Math.floor(row / 3) * 3;
    let leftColumn = Math.floor(column / 3) * 3;
    for (let i = topRow; i < topRow + 3; i++) {
      for (let j = leftColumn; j < leftColumn + 3; j++) {
        if (value === board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  allChecks (board, value, row, column) {
    if (this.check3x3(board, value, row, column) === true &&
      this.checkHorizontal(board, value, row) === true &&
      this.checkVertical(board, value, column) === true
     ) {
      return true;
    }
    return false;
  }

  solve() {
    let value = 0;
    let board = this.board;
    let blanks = this.blanks;
    let isSolved = false;
    let i = 0;
    while (i < blanks.length) {
      isSolved = false;
      let blankRow = blanks[i][0];
      let blankColumn = blanks[i][1];
      value = board[blankRow][blankColumn];
      while (isSolved === false && value <= 9) {
        if (this.allChecks(board, value, blankRow, blankColumn) === true) {
          isSolved = true;
          board[blankRow][blankColumn] = value;
        } else {
          value++;
        }
      }
      if (isSolved === false) {
        board[blankRow][blankColumn] = 0;
        i--;
      } else {
        i++;
      }
    }
  }

  // Returns a string representing the current state of the board
  returnToString() {
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = this.board[i].join('');
    }
    this.board = this.board.join('');
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)

var fs = require('fs');
var boardString = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split('\n')[3];

var game = new Sudoku(boardString);

// Remember: this will just fill out what it can and not "guess"

game.solve();

console.log(game.board);
