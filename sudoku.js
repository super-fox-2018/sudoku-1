"use strict"

class Sudoku {
  constructor(board_string) {
    this.input = board_string;
    this.board = this.generateBoard();
    
  }

  generateBoard() {
    var multiDim=[];
    var arr=[];
    var splitWord=this.input.split('');
      for(var i=0;i<splitWord.length;i++){
        arr.push(Number(splitWord[i]));
        if(arr.length===9){
           multiDim.push(arr);
           arr=[];
        } 
      }
    // this.board = multiDim
     return multiDim;
  }


 checkRow(row,value) {
    var count=1;
    for(var j=0;j<this.board[row].length;j++) {
      if(this.board[row][j]!==value) {
        count*=1;
      }else {
        count*=0;
      }
     } 
    if(count===1){
      return true;
    }else{
      return false;  
    }
        
 }  
    
 

 checkColumn(col,value) {
    var count=1;
    for(var i=0;i<this.board.length;i++) {
      if(this.board[i][col]!==value) {
        count*=1;
      }else {
        count*=0;
      }
    }
    if(count===1){
      return true;
    }else {
      return false;
    }
 }

 checkSquare(xIndex0,yIndex0,value){
    var arr=[];
    var count=1;
    if(xIndex0<=2 && yIndex0<=2) {
      for(var i=0;i<=2;i++) {
        for(var j=0;j<=2;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=2 && yIndex0>=3 && yIndex0<=5) {
      for(var i=0;i<=2;i++) {
        for(var j=3;j<=5;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }


    if(xIndex0<=2 && yIndex0>=6 && yIndex0<=8) {
      for(var i=0;i<=2;i++) {
        for(var j=6;j<=8;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=5 && xIndex0>=3 && yIndex0<=2) {
      for(var i=3;i<=5;i++) {
        for(var j=0;j<=2;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=5 && xIndex0>=3 && yIndex0>=3 && yIndex0<=5) {
      for(var i=3;i<=5;i++) {
        for(var j=3;j<=5;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=5 && xIndex0>=3 && yIndex0>=6 && yIndex0<=8) {
      for(var i=3;i<=5;i++) {
        for(var j=6;j<=8;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=8 && xIndex0>=6 && yIndex0<=2) {
      for(var i=6;i<=8;i++) {
        for(var j=0;j<=2;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=8 && xIndex0>=6 && yIndex0>=3 && yIndex0<=5) {
      for(var i=6;i<=8;i++) {
        for(var j=3;j<=5;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=8 && xIndex0>=6 && yIndex0>=6 && yIndex0<=8) {
      for(var i=6;i<=8;i++) {
        for(var j=6;j<=8;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    //=========EVALUATE==========
    for(var i=0;i<arr.length;i++){
      if(arr[i]!== value) {
        count*=1
      }else{
        count*=0
      }
    }

    if(count===1) {
      return true
    }else {
      return false;
    }
 }
 //method ini ingin dipakai untuk melakukan pengulangan jika masi ada kolom yang belum terisi,
 //tapi masih bingung implementasinya.
 checkPsb() {
  var arrIndex0=[];
  for(var i=0;i<this.board.length;i++) {
    for(var j=0;j<this.board[i].length;j++){
      if(this.board[i][j]===0) {
          //console.log(this.board[i][j])
          var objIndex0={};
          objIndex0.baris=i;
          objIndex0.kolom=j;
          arrIndex0.push(objIndex0)      
      }
    } 
  }
  return arrIndex0;
 }

 solve() {
   
    //console.log(zeroPos)
    for(let i=0;i<zeroPos.length;i++) {
      //console.log(i,zeroPos.length)
        for(let k=1;k<=9;k++){
            // console.log("masuk",[zeroPos[i].baris],[zeroPos[i].kolom],i)
            if(this.checkRow(zeroPos[i].baris,k) && this.checkColumn(zeroPos[i].kolom,k) && this.checkSquare(zeroPos[i].baris,zeroPos[i].kolom,k)){
              this.board[zeroPos[i].baris][zeroPos[i].kolom]=k;
              //console.log("xxx",[zeroPos[i].baris],[zeroPos[i].kolom])
            }
        }
        if(this.board[zeroPos[i].baris][zeroPos[i].kolom]==0 ){
          var status=false
          var temp2=i;
          while(status == false){
            var temp=i;
            temp2=temp2-1
            // console.log("zzz",temp2)
            //   console.log("temp2=",temp2,"i=",i,"value=",this.board[zeroPos[temp2].baris][zeroPos[temp2].kolom])
            //   console.log(this.generateBoard())
            //   console.log(===============)
            //   console.log(this.board)
            for(let k=1;k<=9;k++){
              // console.log("xxx",k)
              if(this.checkRow(zeroPos[temp2].baris,k) && this.checkColumn(zeroPos[temp2].kolom,k) && this.checkSquare(zeroPos[temp2].baris,zeroPos[temp2].kolom,k)){
               this.board[zeroPos[temp2].baris][zeroPos[temp2].kolom]=k;
              }
              for(let k=1;k<=9;k++) {
                if(this.checkRow(zeroPos[temp].baris,k) && this.checkColumn(zeroPos[temp].kolom,k) && this.checkSquare(zeroPos[temp].baris,zeroPos[temp].kolom,k)){
                  this.board[zeroPos[temp].baris][zeroPos[temp].kolom]=k;
                  status=true;
                }  
              }
              
            }  
          }  
        }    
    }
    return this.board;
  } 


}







// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[3]
//Note:work only case 0 until 3, error in backtrack

var game = new Sudoku(board_string)
var zeroPos=game.checkPsb()
//console.log(zeroPos);

console.log("===========SOAL===========")
console.log(game.generateBoard())
console.log("\n")

console.log("===========JAWABAN===========")
console.log(game.solve())

//  