"use strict"

class Sudoku {
  constructor(board_string) {
    this.name = 'mySudoku';
    this.record = [];
    this.zero = [];
    this.IndexToFix = [];
  }
  
  solve(boards) {
    var solveBoard = boards;
    var targetIndx = 0;
    var startRow = 0;
    var startCol = 0;
    var startValue =0;
    console.log(lastmove)
    
    //console.log(this.zero)  
    if(lastmove === undefined){
      console.log('lastmove masih kosong');
    }
    if(lastmove !== undefined){
      console.log('lastmove sudah ada') 
      //  startRow = lastmove[0]; console.log('======'+startRow);
          //  startCol = lastmove[1]; console.log('+++++++'+startCol);
          //  if(lastmove[2] === 9){
            //    startValue = 0; console.log('oooooooooo' + startValue);
            //   }else{
              //     startValue = lastmove[2]; console.log('-----' + startValue);
              
              //  }
            };
            
            for(let a=0; a<solveBoard.length; a++){
              for(let b=0; b<solveBoard[a].length; b++){
                if(solveBoard[a][b]==0){
                  if(a < startRow && b < startCol){
                    continue;
                  }
                  for(let c=1; c<= 9; c++){
                    if(c <= startValue){
                      continue;
                    }
                    var counterTrue = 0
                    var rowBox = this.findBoxRowCol(a);
                    var colBox = this.findBoxRowCol(b);
              //if group true false;
              
              if(this.clearHorizontal(a, solveBoard, c)){
                counterTrue += 1; 
              }//end if clearHorizontal
              
              if(this.clearVertical(b, solveBoard, c)){
                counterTrue += 1;
              }//end if
              
              if(this.clearBox(rowBox, colBox, solveBoard, c)){
                counterTrue += 1;
              }//end if clear box;
              
              if(counterTrue === 3){
                solveBoard[a][b]= c;
                this.record.push([a,b,c]);
              }
              
              }//end for c for number 1-9
            }
            if(solveBoard[a][b]===0){
              this.zero.push([a,b])
              targetIndx = this.findBackTrack(a, b)
              this.IndexToFix.push(targetIndx);
              console.log(targetIndx); 
              
            }   
          }//end for b
        }//end for a
        
        
        var lastmove = this.IndexToFix[0];
        console.log(lastmove);
        return solveBoard;
  }
  
  // Returns a string representing the current state of the board
  findBackTrack(key1, key2){
    var theIndex = 0
    
    
    for(let a = 0; a < this.record.length; a++){
      var rowRecord = this.record[a][0];
      var colRecord = this.record[a][1];
      if(rowRecord === key1 && colRecord === (key2-1) ){
        return a;
        }else if(rowRecord == (key1-1)){
          return a;
        }
      }
      return 'not found'
    }
    
    board(){
    var blankBoard = [];
    var fillBoard = board_string.split('')
    var ctrFill = 0
    
      for(let a = 0; a < 9; a++ ){
      blankBoard.push([]);
      for(let b = 0; b < 9; b++){
        //blankBoard[a].push(0);
        blankBoard[a].push(Number(fillBoard[ctrFill]));
        ctrFill += 1;
      }//for end b
    }//for end a
    return blankBoard;
  }//end board function

  

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
  .split("\n")[5]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.solve(game.board()))



console.log(game);


