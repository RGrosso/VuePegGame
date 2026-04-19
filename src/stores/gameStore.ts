import { useLocalStorage } from "@/composables/localStorage";
import { GameStatus, TileState, type BoardState } from "@/game/constants";
import PegGame from "@/game/PegGame";
import { defineStore } from "pinia";
import { computed, ref, shallowRef, watch } from "vue";

type BestScore = {
  remainingPegs?: number,
};

export const useGameStore = defineStore("game", () => {
  const gameBoard = ref<BoardState>(PegGame.getInitialBoard());
  const gameStatus = ref<GameStatus>(GameStatus.Ongoing);
  // Time of the game in seconds (only set when game is won or no possible moves left)
  const gameSecondsDuration = shallowRef<number | null>(null);

  const remainingPegs = computed<number>(() => gameBoard.value.filter(peg => [TileState.Peg, TileState.SelectedPeg].includes(peg)).length);

  const bestScore = useLocalStorage<BestScore>("bestScore", {
    remainingPegs: undefined,
    // Maybe we will add the time here later
  });

  watch(remainingPegs, (v) => {
    if (gameStatus.value !== GameStatus.Ongoing) {
      const isBestScore = !bestScore.value.remainingPegs || v < bestScore.value.remainingPegs;
      if (isBestScore) {
        bestScore.value = {
          remainingPegs: v,
        };
      }
    }
  });

  return {
    gameBoard,
    gameStatus,
    remainingPegs,
    bestScore,
    gameSecondsDuration,
  };
});
