"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_str = board_string;
  }


  checkCol(arr, colPos, target){
    for(let row = 0; row < 9; row++){
      if(arr[row][colPos] === target){
        return false;
      }
    }
    return true;
  }

  checkRow(arr, rowPos, target){
    for(let idx = 0; idx < 9; idx++){
      if(arr[rowPos][idx] === target){
        return false;
      }
    }
    return true;
  }
  checkBox(arr, rowPos, colPos, target){
    if(rowPos === 0 || rowPos <= 2){
      rowPos = 0;
    }
    else if(rowPos === 3 || rowPos <= 5){
      rowPos = 3;
    }
    else if(rowPos === 6 || rowPos <= 8){
      rowPos = 6;
    }

    if(colPos === 0 || colPos <= 2){
      colPos = 0;
    }
    else if(colPos === 3 || colPos <= 5){
      colPos = 3;
    }
    else if(colPos === 6 || colPos <= 8){
      colPos = 6;
    }

    for(let row = rowPos; row < 3; row++){
      for(let idx = colPos; idx < 3; idx++){
        if(arr[row][idx] === target){
          return false;
        }
      }
    }
    return true;
  }


  backtrack(arr, row, col, arr0){
    var coord = [];
    for(let i = 0; i < arr0.length; i++){
      if(row === arr0[i][0] && col === arr0[i][1]){
        coord = [arr0[i-1][0], arr0[i-1][1]];
      }
    }
    return coord;
  }

  guessingGame(arr, row,col, target, positionCol, positionRow){
    while(target < 9){
      if(this.checkRow(arr, positionRow,target) === true && this.checkCol(arr, positionCol,target) === true && this.checkBox(arr,positionCol,positionRow,target)){
        arr[row][col] = target;
        target = 9;
      }
      else{
        target++;
      }
    }
  }

  solve() {
    var arr = this.board();
    var positionCol = 0;
    var positionRow = 0;
    var arr0 = [];

    for(let i = 0; i < arr.length; i++){
      for(let k = 0; k < 9; k++){
        arr[i][k] = parseInt(arr[i][k]);
      }
    }


    for(let row = 0; row < arr.length; row++){
      for(let col = 0; col < arr.length; col++){
        if(arr[row][col] === 0){
          arr0.push([row,col]);
          positionCol = col;
          positionRow = row;
          var x = 1;
          this.guessingGame(arr, row, col, x, positionCol,positionRow);
        }
      }
    }


    for(let row = 0; row < 9; row++){
      for(let col = 0; col < 9; col++){
        if(arr[row][col] === 0){
        // do{
          var coord = this.backtrack(arr, row, col, arr0);
          var currentGuess = arr[coord[0]][coord[1]]
          this.guessingGame(arr, coord[0], coord[1], currentGuess, positionCol,positionRow);
          if( arr[coord[0]][coord[1]] === currentGuess){
            arr[coord[0]][coord[1]] = 0;
            coord = this.backtrack(arr, coord[0], coord[1], arr0);
          }
        // }while(arr[coord[0]][coord[1]] !== currentGuess) //infinite loop?
        }
      }
    }

    console.log(arr);
  }




  board() {
    var arr = [];
    var content = this.board_str.split("");

    for(let i = 0; i < 9; i++){
      arr.push([]);
    }

    var x = 0;
    var count = 0;
    for(let i = 0; i < 9; i++){
      while(count < 9){
        arr[i].push(content[x]);
        x++;
        count++;
      }
      count = 0;
    }

    return arr;
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
game.solve();


console.log(game.board());

// console.log(board_string);
