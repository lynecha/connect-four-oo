/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let startButton = document.getElementById("start");

let elements = document.querySelectorAll("tr > td");

let playing = false;

class Game {

  constructor(height, width) {
    this.boardHeight = height;
    this.boardWidth = width;
    this.currPlayer = 1;
    this.board = [];
    this.makeBoard();
    this.makeHtmlBoard();
    playing = true;
  }

  makeBoard() {
    for (let y = 0; y < this.boardHeight; y++) {
      this.board.push(Array.from({ length: this.boardWidth }));
    }
  }

  makeHtmlBoard() {

    const board = document.getElementById('board');

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.boardWidth; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.boardHeight; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.boardWidth; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.boardHeight - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  findSpotForCol(x) {
    for (let y = this.boardHeight - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer}`);
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
  }

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    // switch players
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  checkForWin() {

    let winner = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match this.currPlayer
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.boardHeight &&
          x >= 0 &&
          x < this.boardWidth &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (winner(horiz) || winner(vert) || winner(diagDR) || winner(diagDL)) {
          playing = false;
          return true;
        }
      }
    }
  }

  resetBoard() {
    this.board.forEach(row => {
      row.map(x => x = undefined);
    });

    for (let i = 0; i < elements.length; i++) {
      elements[i].parentElement.removeChild(elements[i]);
    }

  }
}

startButton.addEventListener("click", startGame);

function startGame() {

  if (playing) {
    connect.resetBoard();
  }

  else {
    let connect = new Game(6, 7);
  }

}





