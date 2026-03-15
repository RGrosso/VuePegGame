import { possibleMoves, TileState, type BoardState } from "./constants";

export default class PegGame {
  private board: BoardState;

  constructor() {
    this.board = this.getInitialBoard();
  }

  getBoard() {
    return this.board;
  }

  getInitialBoard(): BoardState {
    return [
      TileState.Empty, // Starting with the first tile empty
      TileState.Peg, TileState.Peg,
      TileState.Peg, TileState.Peg, TileState.Peg,
      TileState.Peg, TileState.Peg, TileState.Peg, TileState.Peg,
      TileState.Peg, TileState.Peg, TileState.Peg, TileState.Peg, TileState.Peg
    ];
  }

  canMove(from: number, to: number): boolean {
    const move = possibleMoves.find(
      (m) => m[0] === from && m[1] === to
    );
    if (!move) return false;
    const [_, over, __] = move;
    return this.board[from] === TileState.Peg
      && this.board[over] === TileState.Peg
      && this.board[to] === TileState.Empty;
  }

  /**
   * Based on the current board state, select a peg at the given index and mark it as selected.
   * Returns true if the peg was successfully selected, false otherwise (e.g., if the index is out of bounds or if there's no peg at that index).
   */
  selectPeg(index: number): boolean {
    if (this.board[index] !== TileState.Peg) {
      return false;
    }

    // Change any SelectedPeg and PossibleEnd back to Peg and Empty respectively
    this.board.forEach(peg => {
      if (peg === TileState.SelectedPeg) {
        peg = TileState.Peg;
      } else if (peg === TileState.PossibleEnd) {
        peg = TileState.Empty;
      }
    });


    let hasPossibleMoves = false;
    
    // Mark possible moves from the selected peg
    possibleMoves.forEach(([from, to]) => {
      if (from === index && this.canMove(from, to)) {
        this.board[to] = TileState.PossibleEnd;
        hasPossibleMoves = true;
      }
    });

    if (!hasPossibleMoves) {
      return false; // No possible moves from this peg, so don't select it
    }

    // Mark the selected peg
    this.board[index] = TileState.SelectedPeg;
    return true;
  }


  makeMove(from: number, to: number): boolean {
    if (!this.canMove(from, to)) return false;
    const move = possibleMoves.find(
      (m) => m[0] === from && m[1] === to
    )!;
    const [_, over, __] = move;
    this.board[from] = TileState.Empty;
    this.board[over] = TileState.Empty;
    this.board[to] = TileState.Peg;
    return true;
  }

  isGameOver(): boolean {
    return !possibleMoves.some(([from, to]) => this.canMove(from, to));
  }
}