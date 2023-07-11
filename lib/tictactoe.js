const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

const EMPTY_CELL = ' ';
const PLAYER_X = '❌';
const PLAYER_O = '⭕';
const BOARD_SIZE = 3;

class TicTacToe {
  constructor() {
    this.board = this.createBoard();
    this.currentPlayer = PLAYER_X;
    this.gameOver = false;
  }

  createBoard() {
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      board[row] = new Array(BOARD_SIZE).fill(EMPTY_CELL);
    }
    return board;
  }

  makeMove(row, col) {
    if (this.gameOver || !this.isValidMove(row, col)) {
      return false;
    }

    this.board[row][col] = this.currentPlayer;
    this.checkGameOver();
    this.currentPlayer = this.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    return true;
  }

  isValidMove(row, col) {
    return (
      row >= 0 &&
      row < BOARD_SIZE &&
      col >= 0 &&
      col < BOARD_SIZE &&
      this.board[row][col] === EMPTY_CELL
    );
  }

  checkGameOver() {
    const lines = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (
        this.board[a[0]][a[1]] !== EMPTY_CELL &&
        this.board[a[0]][a[1]] === this.board[b[0]][b[1]] &&
        this.board[a[0]][a[1]] === this.board[c[0]][c[1]]
      ) {
        this.gameOver = true;
        return;
      }
    }

    // Check for a tie
    if (this.isBoardFull()) {
      this.gameOver = true;
    }
  }

  isBoardFull() {
    for (const row of this.board) {
      if (row.includes(EMPTY_CELL)) {
        return false;
      }
    }
    return true;
  }

  renderBoard() {
    let boardString = '';
    for (const row of this.board) {
      boardString += row.join(' | ') + '\n';
      boardString += '---------\n';
    }
    return boardString;
  }

  handlePlayerMove(message) {
    if (this.gameOver || !message.body.match(/^\d$/)) {
      return;
    }

    const move = parseInt(message.body) - 1;
    const row = Math.floor(move / BOARD_SIZE);
    const col = move % BOARD_SIZE;

    if (!this.makeMove(row, col)) {
      return;
    }

    const content = {
      body: this.renderBoard(),
      quotedMessage: message.message,
    };

    if (this.gameOver) {
      const winner = this.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      content.body += `¡El juego ha terminado! ${winner} es el ganador.`;
    } else {
      this.makeBotMove();
    }

    message.reply(generateWAMessageFromContent(content));
  }

  makeBotMove() {
    const availableMoves = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (this.board[row][col] === EMPTY_CELL) {
          availableMoves.push({ row, col });
        }
      }
    }

    if (availableMoves.length === 0) {
      return;
    }

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    this.makeMove(randomMove.row, randomMove.col);
  }

  startGame(message) {
    if (this.gameOver) {
      this.board = this.createBoard();
      this.currentPlayer = PLAYER_X;
      this.gameOver = false;

      const content = {
        body: '¡Comienza un nuevo juego de Tic-Tac-Toe!',
        quotedMessage: message.message,
      };

      message.reply(generateWAMessageFromContent(content));
    }
  }
}

module.exports = TicTacToe;
