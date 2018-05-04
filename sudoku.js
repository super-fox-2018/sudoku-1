"use strict"

class Sudoku {
  constructor(board_string) {
        this.name = 'mySudoku';
  }

  solve(boards) {
    var solveBoard = boards;
    var tempZeroIndex = [];
    var fillZero = [];
      for(let a=0; a<solveBoard.length; a++){
        for(let b=0; b<solveBoard[a].length; b++){
          if(solveBoard[a][b]==0){
            for(let c=0; c<= 9; c++){
             
              var counterTrue = 0
              var rowBox = this.findBoxRowCol(a);
              var colBox = this.findBoxRowCol(b);
              //if group true false;
              
              if(this.clearBox(rowBox, colBox, solveBoard, c)){
                  counterTrue += 1;
                  //break;
              }//end if clear box;
  
              if(this.clearHorizontal(a, solveBoard, c)){
                  counterTrue += 1; 
                  //break;
              }//end if clearHorizontal
  
              if(this.clearVertical(b, solveBoard, c)){
                  counterTrue += 1;
                  //break;
              }//end if
                if(counterTrue === 3){
                  fillZero.push([a, b, c]);
                  solveBoard[a][b]= c;
                  break;
                }
                //solveBoard[a][b]=c;
                
              }//end for c for number 1-9
              if(solveBoard[a][b]===0){
                    console.log(fillZero);
                    console.log(tempZeroIndex);
                    tempZeroIndex.push([a, b]);
                    return solveBoard;                  
                  }
          }
          
        }//end for b
        
      }//end for a
      return solveBoard;
  }

  // Returns a string representing the current state of the board


  board(){
    var blankBoard = [];
    var fillBoard = board_string.split('')
    var ctrFill = 0
    
      for(let a = 0; a < 9; a++ ){
      blankBoard.push([]);
      for(let b = 0; b < 9; b++){
        blankBoard[a].push(0);
        //blankBoard[a].push(Number(fillBoard[ctrFill]));
        ctrFill += 1;
      }//for end b
    }//for end a
    return blankBoard;
  }//end board function

  playBoard(){
    var result = this.solve(this.board());
    return result;
  }

  findBoxRowCol(spot){
    var newSpot = 0;
    if(spot >=0 && spot <=2){ newSpot = 1 };
    if(spot >=3 && spot <=5 ){ newSpot = 4 };
    if(spot >=6 && spot <=8 ){ newSpot = 7 };
    return newSpot;
  }

  clearBox(row, col, board, numGuest){
    
         if(board[row-1][col]   ===numGuest){return false}
    else if(board[row-1][col-1] ===numGuest){return false}
    else if(board[row-1][col+1] ===numGuest){return false}
    else if(board[row][col]     ===numGuest){return false}
    else if(board[row][col-1]   ===numGuest){return false}
    else if(board[row][col+1]   ===numGuest){return false}
    else if(board[row+1][col-1] ===numGuest){return false}
    else if(board[row+1][col]   ===numGuest){return false}
    else if(board[row+1][col+1] ===numGuest){return false};
    return true;
  }


  clearHorizontal(row, board, numGuest){
    let boardSize = 9;
    
    for(let a=0; a<boardSize; a++){
        if(board[row][a]===numGuest){
          return false;
        }
    }
   return true;
  }//end function clearHorizontal

  clearVertical(col, board, numGuest){
    let boardSize = 9;
    
    for(let a=0; a<boardSize; a++){
        if(board[a][col]===numGuest){
          return false;
        }
    }
   return true;
  }//end function clearHorizontale



  


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
//game.solve()

//console.log(game)

console.log(game.playBoard())

