"use strict"

class SudokuBoard {

  constructor(string){
    this.string = string
    this.board = []
  }

  //fungsi sleep*jika diperlukan*
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  //fungsi mengubah string menjadi board sudoku 9x9
  makeboard(){
    var output = [[]]
    var outputboard = [[]]
    var index = 0
    for(var i=0;i<this.string.length;i++){
      if(output[index].length==9){
        index++
        output[index]=[]
        outputboard[index]=[]
      }
      if(+this.string.split('')[i]==0){
        output[index].push("o")
        outputboard[index].push(0)
      }else {
        output[index].push(+this.string.split('')[i])        
        outputboard[index].push(+this.string.split('')[i])  
      }   
    }
    if(output.length>9)output.splice(output.length-1,1)
    if(outputboard.length>9)outputboard.splice(outputboard.length-1,1)
    this.board = output
    return outputboard
  }

  //getter untuk generate board
  get generateboard(){
    return this.makeboard()
  }
  
  //cek apakah spot yang masuk adalah spot yang dapat diubah
  checkFillability(spot){
    if(typeof(spot) == 'string') return true
    return false
  }

  //proses untuk mulai menyelesaikan soal sudoku
  checkboard(){
    //proses solving sudoku
    for(var i=0;i<this.board.length;i++){
      for(var j=0;j<this.board.length;j++){
        if(this.checkFillability(this.board[i][j])){
          this.board[i][j] = this.inputtingnumber(i,j)
          var checking = true
          while(checking){
            if(this.board[i][j]=='not found'){
              var lookforstring = true
              while(lookforstring){
                if(this.checkFillability(this.board[i][j])){
                  this.board[i][j]='o'
                }
                if(j==0){
                  j=this.board.length-1
                  i--
                }else{
                  j--
                }
                if(this.checkFillability(this.board[i][j])){
                  lookforstring = false
                  this.board[i][j]=this.backtrack(i,j);
                  if(this.board[i][j]!=='not found'){
                    checking = false
                  }
                }
                // this.sleep(50)
                // console.log('\n\n')
                // console.log(this.board)
              }
            }else{
              checking = false
            }
          }
        }
        // this.sleep(50)
        // console.log('\n\n')
        // console.log(this.board)
      }
    }
    return this.sterilizeanswer()
  }

  //proses backtrack apabila dipanggil
  backtrack(row,column){
    var checknumber = this.board[row][column]
    this.board[row][column] = 'o'
    var array=[]
    var sectionrow = (row+1)%3==0? row+1:row+3-row%3
    var sectioncolumn = (column+1)%3==0? column+1:column+3-column%3
    for(var i=1;i<=9;i++){
      if(this.acceptedNumber(i,row,column,[sectionrow,sectioncolumn])){
        array.push(i)
      }
    }
    var convertedArray = array.length==1||array.indexOf(+checknumber)==array.length-1||array.indexOf(+checknumber)<0? 'not found':array[array.indexOf(+checknumber)+1]
    if(convertedArray==undefined){
      convertedArray = 'not found'
    }
    return convertedArray.toString()
  }

  //untuk cek apakah nomor yang diinput merupakan nomor yang benar
  acceptedNumber(number,row,column,sectionarray){
    if(this.checkrow(number,column)&&this.checkcolumn(number,row)&&this.checksection(number,sectionarray)) return true
    return false
  }

  //untuk input number dan cek apakah nomor yang diinput adalah angka yang benar
  inputtingnumber(row,column){
    var sectionrow = (row+1)%3==0? row+1:row+3-row%3
    var sectioncolumn = (column+1)%3==0? column+1:column+3-column%3
      for(var i=1;i<=9;i++){
        if(this.acceptedNumber(i,row,column,[sectionrow,sectioncolumn])){
          return i.toString()
        }
      }
      return 'not found'
  }

  //untuk cek row
  checkrow(check,column){
    for(var i=0;i<this.board.length;i++){
      if(+this.board[i][column]==check){
        return false
      }
    }
    return true
  }

  //untuk cek kolom
  checkcolumn(check,row){
    for(var i=0;i<this.board.length;i++){
      if(+this.board[row][i]==check){
        return false
      }
    }
    return true
  }

  //untuk cek section
  checksection(check,section){
    for(var i=section[0]-3;i<section[0];i++){
      for(var j=section[1]-3;j<section[1];j++){
        if(+this.board[i][j]==check){

          return false
        }
      }
    }
    return true
  }

  sterilizeanswer(){
    for(var i=0;i<this.board.length;i++){
      for(var j=0;j<this.board[i].length;j++){
        if(this.board[i][j]=='o'||this.board[i][j]=='not found'){
          this.board[i][j] = 0
        }else{
          this.board[i][j]=+this.board[i][j]
        }
      }
    }
    return this.board
  }

}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[13]

var game = new SudokuBoard(board_string)
// Remember: this will just fill out what it can and not "guess"
console.log('\n\n soal: \n\n')
console.log(game.generateboard)

console.log('\n\n solusi: \n\n')
console.log(game.checkboard())

// var board1 = new SudokuBoard('105802000090076405200400819019007306762083090000061050007600030430020501600308900')
// var board2 = new SudokuBoard('005030081902850060600004050007402830349760005008300490150087002090000600026049503')
// var board3 = new SudokuBoard('300000000050703008000028070700000043000000000003904105400300800100040000968000200')
// var board4 = new SudokuBoard('302609005500730000000000900000940000000000109000057060008500006000000003019082040')
// var board5 = new SudokuBoard('290500007700000400004738012902003064800050070500067200309004005000080700087005109')
// var board6 = new SudokuBoard('080020000040500320020309046600090004000640501134050700360004002407230600000700450')
// var board7 = new SudokuBoard('608730000200000460000064820080005701900618004031000080860200039050000100100456200')
// var board8 = new SudokuBoard('370000001000700005408061090000010000050090460086002030000000000694005203800149500')
// var board9 = new SudokuBoard('000689100800000029150000008403000050200005000090240801084700910500000060060410000')
// var board10 = new SudokuBoard('030500804504200010008009000790806103000005400050000007800000702000704600610300500')
// var board11 = new SudokuBoard('096040001100060004504810390007950043030080000405023018010630059059070830003590007')
// var board12 = new SudokuBoard('000075400000000008080190000300001060000000034000068170204000603900000020530200000')
// var board13 = new SudokuBoard('300000000050703008000028070700000043000000000003904105400300800100040000968000200')
// var board14 = new SudokuBoard('302609005500730000000000900000940000000000109000057060008500006000000003019082040')
// var board15 = new SudokuBoard('000000000000000000000000000000000000000000000000000000000000000000000000000000000')
// var board16 = new SudokuBoard('069052478000674030014308260080020154507010820020830090130769042240503719905201306')
// var board17 = new SudokuBoard('000000000000000000000000200000001000000000000000000000000009000000000000000000000')
// console.log('\nsoal:\n')
// console.log(board1.generateboard)
// console.log('\nsolusi:\n')
// console.log(board14.checkboard())