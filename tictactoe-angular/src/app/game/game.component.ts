import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  // Configurable parameters
  boardSize = 5;  // Default to 5x5
  winCondition = 4;  // Default win condition is 4 consecutive cells
  players = ['X', 'O', 'Δ'];  // Player symbols
  currentPlayerIndex = 0;  // Track whose turn it is
  winner: string | null = null;  // Track the winner
  board: string[][] = [];  // Initialize an empty board

  ngOnInit() {
    this.resetGame();
  }
  // Reset the game state
  resetGame() {
    this.board = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(''));
    this.currentPlayerIndex = 0;
    this.winner = null;
  }

  // Make a move for the current player
  makeMove(row: number, col: number) {
    if (this.board[row][col] === '' && !this.winner) {
      this.board[row][col] = this.players[this.currentPlayerIndex];

      // Check if there is a winner after the move
      if (this.checkWinner(row, col)) {
        this.winner = this.players[this.currentPlayerIndex];
      } else {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      }
    }
  }

  // Check if the current player has won after making a move
  checkWinner(row: number, col: number): boolean {
    return (
      this.checkDirection(row, col, 0, 1) || // Horizontal
      this.checkDirection(row, col, 1, 0) || // Vertical
      this.checkDirection(row, col, 1, 1) || // Diagonal /
      this.checkDirection(row, col, 1, -1)   // Diagonal \
    );
  }

  // Check a specific direction for a winning condition
  checkDirection(row: number, col: number, rowDir: number, colDir: number): boolean {
    let count = 1;  // Start with the current cell
    count += this.countConsecutive(row, col, rowDir, colDir); // Check one direction
    count += this.countConsecutive(row, col, -rowDir, -colDir); // Check the opposite direction
    return count >= this.winCondition;
  }

  countConsecutive(row: number, col: number, rowDir: number, colDir: number): number {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;
  
    // check condition
    while (
      r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize && 
      this.board[r][c] === this.board[row][col]
    ) {
      count++;
      r += rowDir;
      c += colDir;
    }
  
    return count;
  }
  

 
}
