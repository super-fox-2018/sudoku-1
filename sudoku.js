"use strict"

class Sudoku {
  constructor(board_string) {
    this.number = board_string
    
  }
  
  cekHorizon(num,position,boardSudo) {
    var matchHor = true
    for(let i=0;i< 9;i++){
      if(boardSudo[position][i] == num){
        matchHor =false
        
      }
    }
    return matchHor
  }
  cekVertical(num,position,boardSudo){
    var matchVer = true
    for(let i =0;i<9;i++){
      if(boardSudo[i][position] == num){
        matchVer = false
        break
      }
    }
    return matchVer
  }

  cekBox(num,posX,posY,boardSudo){
    var matchBox = true
    var posX =Math.floor(posX /3) * 3
    var posY = Math.floor(posY/3) * 3 
    for(let i=0;i <posX + 3 ;i++){
      for(let j=0;j < posY + 3 ;j++){
        if(boardSudo[i][j] === num){
          matchBox = false
          
        }
      }
    }
    return matchBox
  }

  solve(){
  
   var boards = this.board()
    for(let i=0;i<boards.length;i++){
      for(let j=0;j<boards.length;j++){
        if(boards[i][j] == 0){
          for(let k =1;k<=9;k++){
            var row = this.cekHorizon(k,i,boards)
            var col = this.cekVertical(k,j,boards)
            var box = this.cekBox(k,i,j,boards)
            if(row === true  && col === true && box === true){
              boards[i][j] = k
         
            }
          }
        }
      }
    }
    return boards
  }

  board() {
    let arr =[]
    let idx =0
  
    for(let i =0;i<9;i++){
      let arrB =[]
      
      for(let j=0;j<9;j++){
        arrB.push(Number(board_string[idx]))
        idx++
      }
      arr.push(arrB)
      
      }
    return arr

 
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
game.board()
// console.log(game.solve())
console.log(game.solve())
console.log(game.board())
