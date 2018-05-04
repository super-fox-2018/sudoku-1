"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string=board_string // this.board_string itu properties, kalau board_string itu baca file dari set-01_sample.unsolved.txt 
  }

  // Returns a string representing the current state of the board
  board() {
    var printBoard=[]
    var index=0
    for(let i=0; i<9; i++){
      var smallBoard=[]
      for(let j=0; j<9; j++){
          smallBoard.push(Number(this.board_string[index])) // pakai Number supaya yg ke push langsung number diambil dr file board_string
          index++ // untuk hitung index dari file yg d dpt dari file set-01_sample.unsolved.txt
      }
      printBoard.push(smallBoard)
    }
    return printBoard
  }

  checkPosisi(){
    var checkPosisi= this.board()
    for(let i=0; i<checkPosisi.length; i++){
      // console.log(firstPosition[i])
      for(let j=0; j<checkPosisi[i].length; j++){
        // console.log(checkPosisi[i][j][0])
        if(checkPosisi[i][j] === 0){ // misal value nya 0 lngsung lakukan perintah line 30
          var index =[i,j] // untuk ambil si 0 ada di index mana
          // console.log(index)
          for(let x=1; x<=9; x++){
            var count=0
            // CHECK HORIZONTAL
            if(checkPosisi[i].indexOf(x) === -1){ // disini di cek jika value x tidak ada di array firstPosition[i]
              count+=1
              // LOOPING VERTICAL, tetap dilakukan didalam sini untuk cek setiap angka dari 1-9
              var checkValueVertical=0
              var newIndex=[i,j] // supaya yg index diatas g ke gnti jd bkin variabel baru newIndex
              // console.log(newIndex)
              for(let z=0; z < checkPosisi.length; z++){ // ini untuk pindah ke next row dgn column yg sama dimulai dari row awal sesuai dgn index j
                newIndex[0]=z
                // console.log([i,j])
                // console.log(checkPosisi[index[0]][j])
                if(checkPosisi[newIndex[0]][j] !== x){ // klu value index yg dimaksud nilai tidak sama dgn x hitung jumlahnya
                  checkValueVertical+=1
                }
              }
              if(checkValueVertical===9){ // klu jumlahnya 9 berarti kan g ada yg sama, jadi si count bisa ditmbah lg
                count+=1
              }
              //  CHECK SQUARE
              var indexSquare=[i,j]
              var checkValueSquare=0
              // console.log(indexSquare)
              // console.log(x)
              if(indexSquare[0] < 3 && indexSquare[1] < 3){
                for(let a=0; a < checkPosisi.length-6; a++){
                  for (let u=0; u < checkPosisi[a].length-6; u++){
                    indexSquare[0]=a
                    indexSquare[1]=u
                    if(checkPosisi[indexSquare[0]][indexSquare[1]] !== x){
                      checkValueSquare+=1
                    }
                  }
                }
                if(checkValueSquare===9){
                  count+=1
                }
              }

              else if(indexSquare[0] < 6 && indexSquare[1] < 6){
                for(let a=3; a < checkPosisi.length-3; a++){
                  for (let u=3; u<  checkPosisi[a].length-3; u++){
                    indexSquare[0]=a
                    indexSquare[1]=u
                    if(checkPosisi[indexSquare[0]][indexSquare[1]] !== x){
                      checkValueSquare+=1
                    }
                  }
                }
                if(checkValueSquare===9){
                  count+=1
                }
              }

              else if(indexSquare[0] < 9 && indexSquare[1] < 9){
                for(let a=6; a<checkPosisi.length; a++){
                  for (let u=6; u<checkPosisi[a].length; u++){
                    indexSquare[0]=a
                    indexSquare[1]=u
                    if(checkPosisi[indexSquare[0]][indexSquare[1]] !== x){
                      checkValueSquare+=1
                    }
                  }
                }
                // console.log(checkValueSquare)
                if(checkValueSquare===9){
                  count+=1
                }
              }
            }
            // console.log(count)
            if (count === 3){
              checkPosisi[i][j]=x // kalau cek udh selesai n sesuai kriteria baru di masukan value dgn value nilai baru
            }
          }
        }
      }
    }
    return checkPosisi
  } 

  solve() {
    var result = this.checkPosisi()
    return result
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0] // [0] berati index yang ke nol
  // console.log(board_string.length)

var game = new Sudoku(board_string)
// Remember: this will just fill out what it can and not "guess"
game.board()
console.log("Before:")
console.log(game.board()) // tampilkan board nya
console.log("")
// game.checkPosisi()
// console.log(game.checkPosisi())
console.log("After:")
game.solve()
console.log(game.solve())
// console.log(game) // akses class
// console.log(game.board_string) // akses properti
