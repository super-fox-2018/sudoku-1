"use strict"
/*
sudoku solver
author : ridozaen
date   : friday, 04 May 2018
*/
class Sudoku {
  constructor(board_string) {
    this.string = board_string
  }

  solve(board) {
    //solving problem
    let start = 1;
    let end = 9;
    let arrBackTrack = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        let isUnique = false;
        if (String(board[i][j]) === '0') {
          for (let k = start; k <= end; k++) {
            if (this.checkRow(board[i], k) && this.checkCol(board, j, k) && this.checkSquare(board, i, j, k)) {
              board[i][j] = k.toString();
              arrBackTrack.push([i,j]);
              isUnique = true;
              start = 1;
              break;
            }
          }
          if (isUnique === false){
            //last koordinat
            let lastCoor = arrBackTrack.slice(-1)[0];
            arrBackTrack.splice(arrBackTrack.length-1);
            //change start
            start = Number(board[lastCoor[0]][lastCoor[1]]) + 1;
            i = lastCoor[0];
            j = lastCoor[1] - 1;
            //reset board;
            board[lastCoor[0]][lastCoor[1]] = '0';
          }
        }
      }
    }

    console.log('Sesudah: ');
    console.log(board);
    console.log('String:', board.join('').split(',').join(''));
  }

  // Returns a string representing the current state of the board
  board() {
    console.log('Sebelum: ');
    let arrCol = [];
    let strIdx = 0;
    for (let i = 0; i < 9; i++) {
      let arrRow = [];
      for (let j = 0; j < 9; j++) {
        arrRow.push(this.string[strIdx]);
        strIdx = strIdx + 1;
      }
      arrCol.push(arrRow);
    }
    console.log(arrCol);
    return arrCol;
  }
  //check per row
  checkRow(rowBoard, num) {
    if (rowBoard.indexOf(num.toString()) !== -1) {
      return false
    }
    return true;
  }

  //check per column
  checkCol(arrBoard, n, num) {
    let arrBoardCol = [];
    let arrCol = (arr, n) => arr.map(x => x[n]);
    arrBoardCol = arrCol(arrBoard, n);
    if (arrBoardCol.indexOf(num.toString()) !== -1) {
      return false;
    }
    return true;
  }

  //check per square3x3
  checkSquare(board, posX, posY, num) {
    let baseX = Math.floor(posX / 3) * 3;
    let baseY = Math.floor(posY / 3) * 3;
    for (let i = baseX; i < baseX + 3; i++) {
      for (let j = baseY; j < baseY + 3; j++) {
        if (board[i][j] === num.toString()) {
          return false;
        }
      }
    }
    return true;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[13]
// var board_string = '105802000090076405200400819019007306762083090000061050007600030430020501600308900';

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve(game.board())

// console.log(game.board())
