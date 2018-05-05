"use strict"

function solve () {

  let board = generateBoard()
  
  let movementHistory =[]
  
  //Buat template history
  for(let a=0; a<board.length; a++) {
      for(let b=0; b<board[a].length; b++) {
          if(board[a][b]===0) {
              movementHistory.push([])
          }
      }
  }
  // masukan kordinat kedalam history
  // d=vertical
  // e=horizontal
  let temp=0
      for(let d=0; d<board.length; d++) {
          for(let e=0; e<board[d].length; e++) {
              for(let c=temp; c<movementHistory.length; c++) {
              if(board[d][e]===0) {
                  movementHistory[c].push(d)
                  movementHistory[c].push(e)
                  temp += 1
                  break
              }
          }
      }
  }
   
  let bun=1
  for(let x=0; x<movementHistory.length; x+=bun) {
      let korVer=movementHistory[x][0]   
      let korHor=movementHistory[x][1]
      if(bun===-1) { 
          let temp 
      } else if (bun==1 ) {
          
      }
          for(let z=temp +1; z<=9; z++) {
              if(checkHorizontal(z, korVer, korHor)!==false && 
                  checkVertical(z, korVer, korHor)!==false && 
                  checkBox(z, korVer, korHor)!==false) {
                          board[korVer][korHor]=z
                          break       
                  
              } else {
                  if(z===9 && checkHorizontal(z, korVer, korHor)===false) {
                      bun = -1
                       break
                  } else if(z===9 && checkVertical(z, korVer, korHor)===false) {
                      bun = -1
                      break
                  } else if(z===9 && checkBox(z, korVer, korHor)===false) {
                      bun = -1
                      break
                  }

              }
          }
  
          
      
  }


  /* old code ignore
  // x = vertical
  // y = horizontal
  //for(let q=0; q<movementHistory.length; q++) {
      for(let x=0; x<board.length; x++) {
        for(let y=0; y<board[x].length; y++) {
          if(board[x][y]===0){
              for(let z=0; z<=9; z++) {
                  //if(z===9 && )
                  if(checkHorizontal(z, x, y)!==false) {
                      if(checkVertical(z, x, y)!==false) {
                          if(checkBox(z, x, y)!==false) {
                              board[x][y]=z
                              break
                          }
                      }
                  }
              }
          }
        }
      }
  //}
  */
  console.log(movementHistory)

  return board

}

console.log(solve())

function generateBoard() {
  var board=[]

  var sampleBoard = '105802000090076405200400819019007306762083090000061050007600030430020501600308900'
  var numArr = sampleBoard.split("")
  for(let a=0; a<9; a++) {
      board.push([])
  }
  var temp=0
  for(var z=0; z<board.length; z++) {
      for(var y=temp; y<numArr.length; y++) {
          if(board[z].length>=9) {
              temp+=9
              break
          } else {
              board[z].push(Number(numArr[y]))
          } 
      } 
  }
  return board
}
console.log(generateBoard())

function checkHorizontal(num, ver, hor) {
//                         4    0   1
  let board=generateBoard()

  for(let x=0; x<9; x++) {
      if(board[ver][x]===num) {
          return false
      }
  }
}

function checkVertical(num, ver, hor) {
//                        4    0   1
  let board=generateBoard()

  for(let x=0; x<9; x++) {
      if(board[x][hor]===num) {
          return false
      }
  }
}

function checkBox(num, ver, hor) {
//                  4   0    1
  let board=generateBoard()

  if(ver>=0 && ver<=2 && hor>=0 && hor<=2) {
      for(let a=0; a<=2; a++) {
          for(let b=0; b<=2; b++) {
              if(board[a][b]===num) {
                  return false
              }
          }
      }

  } else if(ver>=0 && ver<=2 && hor>=3 && hor<=5) {
      for(let c=0; c<=2; c++) {
          for(let d=3; d<=5; d++) {
              if(board[c][d]===num) {
                  return false
              }
          }
      }

  } else if(ver>=0 && ver<=2 && hor>=6 && hor<=8) {
      for(let e=0; e<=2; e++) {
          for(let f=3; f<=5; f++) {
              if(board[e][f]===num) {
                  return false
              }
          }
      }

  } else if(ver>=3 && ver<=5 && hor>=0 && hor<=2) {
      for(let g=0; g<=2; g++) {
          for(let h=3; h<=5; h++) {
              if(board[g][h]===num) {
                  return false
              }
          }
      }

  } else if(ver>=3 && ver<=5 && hor>=3 && hor<=5) {
      for(let i=0; i<=2; i++) {
          for(let j=3; j<=5; j++) {
              if(board[i][j]===num) {
                  return false
              }
          }
      }

  } else if(ver>=3 && ver<=5 && hor>=6 && hor<=8) {
      for(let k=0; k<=2; k++) {
          for(let l=3; l<=5; l++) {
              if(board[k][l]===num) {
                  return false
              }
          }
      }

  } else if(ver>=6 && ver<=8 && hor>=0 && hor<=2) {
      for(let m=0; m<=2; m++) {
          for(let n=3; n<=5; n++) {
              if(board[m][n]===num) {
                  return false
              }
          }
      }

  } else if(ver>=6 && ver<=8 && hor>=3 && hor<=5) {
      for(let o=0; o<=2; o++) {
          for(let p=3; p<=5; p++) {
              if(board[o][p]===num) {
                  return false
              }
          }
      }

  } else if(ver>=6 && ver<=8 && hor>=6 && hor<=8) {
      for(let q=0; q<=2; q++) {
          for(let r=3; r<=5; r++) {
              if(board[q][r]===num) {
                  return false
              }
          }
      }
  }
}


/*
class Sudoku {
  constructor(board_string) {}

  solve() {}

  // Returns a string representing the current state of the board
  board() {}
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

console.log(game.board())
*/