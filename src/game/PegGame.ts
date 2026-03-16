import { possibleMoves, TileState, type BoardState } from "./constants";

export default class PegGame {
  static getInitialBoard(): BoardState {
    return [
      TileState.Empty, // Starting with the first tile empty
      TileState.Peg, TileState.Peg,
      TileState.Peg, TileState.Peg, TileState.Peg,
      TileState.Peg, TileState.Peg, TileState.Peg, TileState.Peg,
      TileState.Peg, TileState.Peg, TileState.Peg, TileState.Peg, TileState.Peg
    ];
  }

  /**
   * Based on the current board state, select a peg at the given index and mark it as selected.
   * Returns true if the peg was successfully selected, false otherwise (e.g., if the index is out of bounds or if there's no peg at that index).
   */
  static selectPeg(board: BoardState, index: number): { valid: true, newBoard: BoardState } | { valid: false } {
    const newBoard: BoardState = [...board];

    if (newBoard[index] !== TileState.Peg) {
      return { valid: false };
    }

    // Change any SelectedPeg and PossibleEnd back to Peg and Empty respectively
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === TileState.SelectedPeg) {
        newBoard[i] = TileState.Peg;
      } else if (newBoard[i] === TileState.PossibleEnd) {
        newBoard[i] = TileState.Empty;
      }
    }

    let hasPossibleMoves = false;

    // Mark the selected peg
    newBoard[index] = TileState.SelectedPeg;
    
    // Mark possible moves from the selected peg
    possibleMoves.forEach(([from, over, to]) => {
      if (from !== index) return; // Only consider moves starting from the selected peg

      const isValidMove = newBoard[from] === TileState.SelectedPeg 
        && newBoard[over] === TileState.Peg
        && (newBoard[to] === TileState.Empty || newBoard[to] === TileState.PossibleEnd);

      if (isValidMove) {
        newBoard[to] = TileState.PossibleEnd;
        hasPossibleMoves = true;
      }
    });

    if (!hasPossibleMoves) {
      return { valid: false };
    }
    
    return { valid: true, newBoard };
  }
}