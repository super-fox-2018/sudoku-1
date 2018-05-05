"use strict"

// first init -> game.board()
//NOTED: angka 0 adalah kosong / empty
// buat pengecekan nomor perbaris - new method
// buat pengecekan nomor perkolom - new method
// buat pengecekan per 3 x 3
// solving -> game.solve()
class Sudoku {
  constructor(board_string) {}

  //Method
  cekBaris(no, boards, row) {
    for (let i = 0; i < 9; i++) {
      if (boards[row][i] === no) {
        return false
      }
    }
    return true
  }



  cekKolom(no, boards, col) {
    for (let i = 0; i < 9; i++) {
      if (boards[i][col] === no) {
        return false
      }
    }
    return true
  }



  checkBox(boards, no, row, col) {
    let gridRow = Math.floor(row / 3) * 3;
    let gridCol = Math.floor(col / 3) * 3;
    for (let i = gridRow; i < gridRow + 3; i++) {
      for (let j = gridCol; j < gridCol + 3; j++) {
        if (no === boards[i][j]) {
          return false;
        }
      }
    }
    return true;
  }


  // all checker result collected here
  collectCheck(boards, no, row, col) {
    return this.cekBaris(no, boards, row) && this.cekKolom(no, boards, col) && this.checkBox(boards, no, row, col)
  }


  //solving
  solve() {

    let boards = this.board();
    for (let i = 0; i < boards.length; i++) {
      for (let j = 0; j < boards.length; j++) {
        if (boards[i][j] === 0) {
          for (let k = 9; k >= 1; k--) {
            if (this.collectCheck(boards, k, [i], [j]) == true) {
              boards[i][j] = k
              //  break;
            }
          }

        }
      }

    }

    return boards
  }


  // Returns a string representing the current state of the board
  board() {
    var board1 = [];
    var board2 = [];
    var no = 0;
    for (let i = 1; i <= 9; i++) {
      board1 = [];
      for (let j = 1; j <= 9; j++) {
        board1.push(Number(board_string[no]));
        no++
      }
      board2.push(board1);
    }
    return board2;
  }
  // end board method
}
//end class



// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);
console.log('\n BEFORE: ')
console.log(game.board())
// Remember: this will just fill out what it can and not "guess"
game.solve();
console.log('\n AFTER: ')
console.log(game.solve())
console.log('\n ')
