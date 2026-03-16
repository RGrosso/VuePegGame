import { possibleMoves, TileState, type BoardState } from "./constants";
type ValidedMoveResult = { valid: true, newBoard: BoardState } | { valid: false };

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
  static selectPeg(board: BoardState, index: number): ValidedMoveResult {
    const newBoard: BoardState = [...board];

    if (newBoard[index] !== TileState.Peg) {
      console.error("selectPeg: Attempted to select a peg at an index that does not contain a peg.");
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
      console.error("selectPeg: No valid moves available from the selected peg.");
      return { valid: false };
    }
    
    return { valid: true, newBoard };
  }

  /**
   * We assume the end index is valid as the UI handles this
   */
  static selectEnd(board: BoardState, endIndex: number): ValidedMoveResult {
    const newBoard: BoardState = [...board];

    const startIndex = newBoard.findIndex(tile => tile === TileState.SelectedPeg);
    if (startIndex === -1) {
      console.error("selectEnd: No peg is currently selected.");
      return { valid: false };
    }

    let middleIndex = -1;
    for (let i = 0; i < possibleMoves.length; i++) {
      const [from, over, to] = possibleMoves[i]!;
      if (from === startIndex && to === endIndex) {
        middleIndex = over;
        break;
      }
    }

    if (middleIndex === -1) {
      console.error("selectEnd: No valid move found for the selected peg and end index.");
      return { valid: false };
    }

    // Move the peg from the starting position to the end position
    newBoard[startIndex] = TileState.Empty;
    newBoard[endIndex] = TileState.Peg;
    newBoard[middleIndex] = TileState.Empty; // Remove the peg that was jumped over

    return { valid: true, newBoard };
  }
}