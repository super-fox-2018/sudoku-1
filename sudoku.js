
"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.wholeBoard = [];
    this.wholeColumn = [];
    this.display = '';

    for (var i = 0; i < 9; i++) { /* Untuk input baris kedalam board */
      var awal = i * 9;
      var akhir = awal + 9;
      this.wholeBoard.push(this.cutString(awal, akhir));
    }

    for (var i = 0; i < this.wholeBoard.length; i++) {
      this.wholeColumn.push([]);
      for (var j = 0; j < this.wholeBoard.length; j++) {
        this.wholeColumn[i].push(this.wholeBoard[j][i]);
      }
    }
  }

  cutString(a, b) { /*which a is the start and b is count of numbers*/
    var hasil = this.board_string.slice(a, b).split('');
    return hasil;
  }

  solve() {
    for (var i = 0; i < this.wholeBoard.length; i++) {
      for (var j = 0; j < this.wholeBoard.length; j++) {
        if (this.wholeBoard[i][j] == 0) {
          for (var input = 1; input <= 9; input++) {
            console.log('search ' + input);
            console.log(i + ' ' + j + ' = ' + this.wholeBoard[i][j]);
            console.log('column');
            console.log(this.cekKolom(i, input));
            console.log(this.wholeColumn[i]);
            console.log('row');
            console.log(this.cekBaris(j, input));
            console.log(this.wholeBoard[j]);
            console.log('boxes');
            console.log(this.cekGroup(i, j, input));
            console.log(this.box(i, j, input));
            console.log(this.cekKolom(i, input) + this.cekBaris(j, input) + this.cekGroup(i, j, input));
            // if (this.cekKolom(i, input) === false && this.cekBaris(j, input) === false && this.cekGroup(i, j, input) === false) {
            //   this.wholeBoard[i][j] == input.toString(); //   this.wholeBoard[i][j] = input.toString();
            // }
            if(this.cekKolom(i, input)===false && this.cekBaris(j, input)===false && this.cekGroup(i, j, input)===false){
                this.wholeBoard[i][j] = input.toString();
            }
          }
        }
      }
    }
    // console.log(this.wholeBoard);
    return this.display;
  }

  // Returns a string representing the current state of the board
  board() {
    for (var k = 0; k < this.wholeBoard.length; k++) {
      for (var l = 0; l < this.wholeBoard.length; l++) {
        if (l % 3 === 0) {
          this.display += ' | ';
        }
        this.display += this.wholeBoard[k][l];
      }
      this.display += ' |';
      if ((k + 1) % 3 === 0) {
        this.display += '\n';
      }

      this.display += '\n';
    }
    this.display += '\n';
    this.display += '\n';
    this.display += '\n';
    return this.display;
  }

  cekKolom(kolom, input) {
    var ketemu = this.wholeColumn[kolom].indexOf(input.toString());
    if (ketemu === -1) {
      return false; /* jika tidak ditemukan return false */
    } else {
      return true; /* jika ditemukan return false */
    }
  }

  cekBaris(num, input) {
    var baris = this.wholeBoard[num];
    if (baris.indexOf(input.toString()) === -1) {
      return false; /* jika tidak ditemukan return false */
    } else {
      return true; /* jika ditemukan return true */
    }
  }

  box(kolom, baris, input) {
    var group = [];
    kolom = Math.floor(kolom / 3) * 3;
    baris = Math.floor(baris / 3) * 3;
    for (var j = kolom; j < kolom + 3; j++) { /* Kolom */
      for (var k = baris; k < baris + 3; k++) { /* Baris */
        // console.log(this.wholeBoard[j][k]);
        group.push(this.wholeBoard[j][k]);
      }
    }
    return group;
  }

  cekGroup(kolom, baris, input) {
    var area = this.box(kolom, baris, input);
    var ketemu = false;
    for (var i = 0; i < area.length; i++) {
      if (area[i] == input) {
        ketemu = true;
      }
    }
    return ketemu;
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

console.log(game.board()) //Output masih belum seperti yang di inginkan
// console.log('BARIS');
// console.log(game.wholeBoard[0]);
// console.log(game.cekBaris(0, 5));
// console.log('\n');
// console.log('KOLOM');
// console.log(game.wholeColumn[2]);
// console.log(game.cekKolom(2, 5));
// console.log('\n');
// console.log('GROUP/REGION');
// // console.log(game.box(6, 3, 2));
game.solve();
console.log(game.board());
// =================================
// 1 | 0 | 5 | 8 | 0 | 2 | 0 | 0 | 0
// 0 | 9 | 0 | 0 | 7 | 6 | 4 | 0 | 5
// 2 | 0 | 0 | 4 | 0 | 0 | 8 | 1 | 9
// 0 | 1 | 9 | 0 | 0 | 7 | 3 | 0 | 6
// 7 | 6 | 2 | 0 | 8 | 3 | 0 | 9 | 0
// 0 | 0 | 0 | 0 | 6 | 1 | 0 | 5 | 0
// 0 | 0 | 7 | 6 | 0 | 0 | 0 | 3 | 0
// 4 | 3 | 0 | 0 | 2 | 0 | 5 | 0 | 1
// 6 | 0 | 0 | 3 | 0 | 8 | 9 | 0 | 0
// =================================

/*
cekGroup(num, input) {
  var group = [];
  for (var j = 6; j < 9; j++) {
    for (var k = 0; k < 3; k++) {
      group.push(this.wholeBoard[j][k]);
    }
  }
  return group;
}
Kolom 0-3
Baris 0-3
[ '1', '0', '5', '0', '9', '0', '2', '0', '0' ]
Kolom 3-6
Baris 0-3
[ '0', '1', '9', '7', '6', '2', '0', '0', '0' ]
Kolom 6-9
Baris 0-3
[ '0', '0', '7', '4', '3', '0', '6', '0', '0' ]
// for (var k = 1; k <= 9; k++) { /*Cek input pada kolom bernilai 0, jika dimasukkan angka dari 1 sampai 9*/
//   if ((this.cekKolom(i, k) == false) && (this.cekBaris(j, k) == false) && (this.cekGroup(i, j, k) == false)){
//     this.wholeBoard[i][j] = k.toString();
//   }
// }
