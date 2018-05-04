"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_temp = board_string;

  }

  solve() {
    var board_sudo = this.board();
    var arr_bt = [];
    // var cek_horizontal = this.horizontal();
    // var cek_vertical = this.vertical();
    // var cek_area = this.area();

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if(board_sudo[i][j]==0){
          for (var k = 1; k <= 9; k++) {
            var cadangan = [];
            if (this.horizontal(k,[i],board_sudo)==true) {
              if (this.vertical(k,[j],board_sudo)==true) {
                if(this.area(k,[i,j],board_sudo)==true){
                  board_sudo[i][j]=k;
                  cadangan.push(i);
                  cadangan.push(j);
                  arr_bt.push(cadangan);
                  break;
                }
              }
            }
          }//k
          //Backtrack
          // if(board_sudo[i][j]==0){
          //   var tamp_arr = arr_bt[arr_bt.length-1];
          //   arr_bt.pop();
          //   var tamp_isi = board_sudo[tamp_arr[0]][tamp_arr[1]];
          //   board_sudo[tamp_arr[0]][tamp_arr[1]]=0;
          //   i = tamp_arr[0]-1;
          //   j = tamp_arr[1]-1;
          //   k = tamp_isi;
          //   console.log(tamp_arr);
          // }
        }
        // console.log(j);
      }//j
    }//i
    return board_sudo;
    // return arr_bt;
    // return this.area(3,[2,2],board_sudo);
  }

  horizontal(num,arr_position,board){
    // var board_sudo = this.board();
    var cek_h = true;

      for (var j = 0; j < 9; j++) {
        if(board[arr_position][j]==num){
          cek_h = false;
          break;
        }
      }
      return cek_h;
  }

  vertical(num,arr_position,board){
    // var board_sudo = this.board();
    var cek_v = true;

    for (var i = 0; i < 9; i++) {
      if(board[i][arr_position]==num){
        cek_v = false;
        break;
      }
    }
      return cek_v;
    // }
  }

  area(num,arr_position,board){
    var cek_a = true;
    var hitung = '';
    var batas = [
                  [0,0,2,2],[0,3,2,5],[0,6,2,8],
                  [3,0,5,2],[3,3,5,5],[3,6,5,8],
                  [6,0,8,2],[6,3,8,5],[6,6,8,8]
                ];
    if(arr_position[0]>=0&&arr_position[0]<=2&arr_position[1]>=0&&arr_position[1]<=2){
      hitung = batas[0];
    }//1(00)(22)
    if(arr_position[0]>=0&&arr_position[0]<=2&arr_position[1]>=3&&arr_position[1]<=5){
      hitung = batas[1];
    }//2(03)(25)
    if(arr_position[0]>=0&&arr_position[0]<=2&arr_position[1]>=6&&arr_position[1]<=8){
      hitung = batas[2];
    }//3(06)(28)
    if(arr_position[0]>=0&&arr_position[0]<=2&arr_position[1]>=3&&arr_position[1]<=5){
      hitung = batas[3];
    }//4(30)(52)
    if(arr_position[0]>=3&&arr_position[0]<=5&arr_position[1]>=3&&arr_position[1]<=5){
      hitung = batas[4];
    }//5(33)(55)
    if(arr_position[0]>=3&&arr_position[0]<=5&arr_position[1]>=6&&arr_position[1]<=8){
      hitung = batas[5];
    }//6(36)(58)
    if(arr_position[0]>=6&&arr_position[0]<=8&arr_position[1]>=0&&arr_position[1]<=2){
      hitung = batas[5];
    }//7(60)(82)
    if(arr_position[0]>=6&&arr_position[0]<=8&arr_position[1]>=3&&arr_position[1]<=5){
      hitung = batas[5];
    }//8(63)(85)
    if(arr_position[0]>=6&&arr_position[0]<=8&arr_position[1]>=6&&arr_position[1]<=8){
      hitung = batas[5];
    }//9(66)(88)

    for (var i = hitung[0]; i <= hitung[2]; i++) {
      for (var j = hitung[1]; j <= hitung[3]; j++) {
        if(board[i][j]==num){
          cek_a = false;
        }
      }
    }
    // // if (num==1) {
      return cek_a;
    // }
  }




  // Returns a string representing the current state of the board
  board() {
    var big_board = [];
    var idx = 0;
    for (var i = 0; i < 9; i++) {
      var small_board = [];
      for (var j = 0; j < 9; j++) {
        small_board.push(parseInt(board_string[idx]));
        idx++;
      }
      big_board.push(small_board);
    }
    return big_board;
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
// game.solve()

console.log(game.solve());
// console.log(game.board());
