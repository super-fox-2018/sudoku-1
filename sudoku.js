"use strict"

/**
 * @class - This class will generate new sudoku object
 */

class Sudoku {
  /**
   * @function - this function will get object from new keyword and applies property to that object
   * @param {String} board_string - a string representation of sudoku board
   * @property {string} board_string - a string representation of sudoku board
   * @property {Object[]} board_arr - an array representation of sudoku board
   */
  constructor(board_string) {
    this.board_string = board_string;
    this.board_arr = this.generateBoard(this.board_string);
    this.tempBoard = this.generateTempBoard();
  }

  /**
   * @function - This function will generate an array as representation of sudoku board from string version of sudoku board or by default generate temporary sudoku board to save every possible moves
   * @param {String} string - a string representation of sudoku board
   * @returns {Boolean} - an array representation of sudoku board
   */
  generateBoard(string) {
    const arr = [];
    let j = -1;
    let template = string.length > 0 ? string : new Array(81).fill(0);
    for(let i = 0; i < template.length; i += 1) {
      if (i % 9 === 0) {
        arr.push([]);
        j += 1;
      }
      
      arr[j].push(+template[i]);
    }

    return arr;
  }

  generateTempBoard() {
    const arr = [];
    const template = new Array(81).fill([]);
    let j = -1;
    for(let i = 0; i < template.length; i += 1) {
      if (i % 9 === 0) {
        arr.push([]);
        j += 1;
      }
      if (this.board_string.length > 0 && this.board_string[i] != 0) {
        arr[j].push(1);
      } else {
        arr[j].push(template[i]);
      }
    }

    return arr;
  }
  /**
   * @function - this function will check for duplicate number in horizontal, vertical, and 3x3 sub array in given board array
   * @param {Object[]} board - an array representation of sudoku board
   * @param {Number} number - possible number to be placed an given coordinate
   * @param {Number} x - x axis coordinate
   * @param {Number} y - y axis coordinate
   * @returns {Boolean} - true or false if there is a duplicate or not
   */
  checkDuplication(board, number, x, y) {
    for (let j = 0; j < board[x].length; j += 1) {
      if (board[x][j] === number) return false;
    }

    for (let i = 0; i < board.length; i += 1) {
      if (board[i][y] === number) return false;
    }

    const startI = Math.floor(x/3) * 3;
    const startJ = Math.floor(y/3) * 3;
    for (let i = startI; i < startI + 3; i += 1) {
      for (let j = startJ; j < startJ + 3; j += 1) {
        if(board[i][j] === number) return false;
      }
    }

    return true;
  }
  
  /**
   * @function - this function will solve sudoku problem in this sudoku object, for every loop in 0, it will generate every possible moves for that coordinate and saves them to moves array and then stores moves array to tempBoard in exactly same coordinate, if no move is possible it will activated backtrack mode and change every possible move in previous coordinates until it works. Then this function will assign completed board to this.board_arr property of this sudoku object
   */
  solve() {
    console.log('Problem : ');
    console.log(this.board_arr);
    const start = new Date().getTime();
    let x = 0;
    let y = 0;
    let backtrack = false;
    let counter = 0;
    while (x < this.board_arr.length) {
      if (this.tempBoard[x][y] !== 1) {
        counter += 1;
        if (backtrack) {
          const moves = this.tempBoard[x][y];
          const newIdx = moves.indexOf(this.board_arr[x][y]) + 1;
          
          if (newIdx < moves.length) {
            this.board_arr[x][y] = moves[newIdx];
            backtrack = false;
          } else {
            this.board_arr[x][y] = 0;
            this.tempBoard[x][y] = [];
          }
        } else {
          const moves = [];
          for (let num = 1; num <= 9; num += 1) {
            if (this.checkDuplication(this.board_arr, num, x, y)) {
              moves.push(num);
            }
          }
         this.tempBoard[x][y] = moves;
          if (moves.length === 0) {
            backtrack = true;
          }
          else this.board_arr[x][y] = moves[0];
        }

        /**
         * Uncomment this to view the process step by step
         */
        // console.log(`---------------------${counter}-----------------------`);
        // console.log('this.board_arr : ');
        // console.log(this.board_arr);
        // console.log('Temp Board : ');
        // console.log(this.tempBoard);
      }


      if (backtrack) {
        y -= 1;
        if (y === -1) {
          y = this.board_arr[0].length - 1;
          x -= 1;
        }
        if (x === -1) x = 0;
      } else {
        y += 1;
        if (y === this.board_arr[0].length) {
          y = 0;
          x += 1;
        }
      }
    }

    const end = new Date().getTime() - start;

    console.log(`\nFinished in ${end} ms\n`);

    let str = '';
    for (let i = 0; i < this.board_arr.length; i += 1) {
      str += this.board_arr[i].join('');
    }
    this.board_string = str;
  }

  /**
   * @function - this function will convert board_arr to string
   * @returns {String} - a string representation of sudoku board
   */
  board() {
    return this.board_string;
  }

  /**
   * @function - this will return this.board_arr
   * @returns {Object[]} - an array representation of sudoku board
   */
  printBoardArr() {
    return this.board_arr;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[13];

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
game.solve();

console.log('String: ');
console.log(game.board());
console.log('Solved: ');
console.log(game.printBoardArr());