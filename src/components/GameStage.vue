<template>
  <div id="game-stage">
    <div class="peg-container">
      <div v-for="(row, r) in gameBoardTiled" :key="`row-${r}`" class="row">
        <PegTile
          v-for="(gameBoardIndex, c) in row"
          :key="`peg-${r}-${c}`"
          :row-index="r"
          :col-index="c"
          :state="gameBoard[gameBoardIndex]!"
          @select-peg="selectPeg(gameBoardIndex)"
          @select-end="selectEnd(gameBoardIndex)"
        />
      </div>
    </div>
    <OverlayMessage v-if="gameState === GameStatus.Won" variant="success"
     heading="Game Won"
      :text="[
        'Congratulations!',
        'You\'ve won the game!',
      ]"
      restartGameText="Play Again"
      @restartGame="restartGame"
    />
    <OverlayMessage
      v-if="gameState === GameStatus.NoPossibleMoves"
      variant="error"
      heading="Game Over"
      :text="[
        'There are no possible moves left to play.',
        `You had ${remainingPegs} remaining pegs left.`,
      ]"
      restartGameText="Retry"
      @restartGame="restartGame"
    />
  </div>
</template>

<script setup lang="ts">
import PegGame from "@/game/PegGame";
import PegTile from "./PegTile.vue";
import { computed, ref } from "vue";
import { GameStatus, ROW_COUNT, TileState, type BoardState } from "@/game/constants";
import OverlayMessage from "./OverlayMessage.vue";

const gameBoard = ref<BoardState>(PegGame.getInitialBoard());
const gameState = ref<GameStatus>(GameStatus.Ongoing);
const remainingPegs = computed<number>(() => gameBoard.value.filter(peg => [TileState.Peg, TileState.SelectedPeg].includes(peg)).length);

const gameBoardTiled = computed(() => {
  // Map the 1D game board to a 2D index array for easier rendering
  const tiledBoard: number[][] = [];
  let index = 0;
  for (let row = 0; row < ROW_COUNT; row++) {
    const rowTiles: number[] = [];
    for (let col = 0; col <= row; col++) {
      rowTiles.push(index);
      index++;
    }
    tiledBoard.push(rowTiles);
  }
  return tiledBoard;
});

function updateGameState() {
  gameState.value = PegGame.getGameState(gameBoard.value);
}

function selectPeg(index: number) {
  const result = PegGame.selectPeg(gameBoard.value, index);
  if (result.valid) {
    gameBoard.value = result.newBoard;
  }
}

function selectEnd(endIndex: number) {
  const result = PegGame.selectEnd(gameBoard.value, endIndex);
  if (result.valid) {
    gameBoard.value = result.newBoard;
    updateGameState();
  }
}

function restartGame() {
  gameBoard.value = PegGame.getInitialBoard();
  gameState.value = GameStatus.Ongoing;
}
</script>

<style scoped>
#game-stage {
  --tile-gap: 6px;
  background-color: var(--game-bg);
  border-radius: var(--game-stage-border-radius);
  border: 2px solid var(--border);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.peg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tile-gap);
}

.row {
  display: flex;
  justify-content: center;
  gap: var(--tile-gap);
}
</style>
