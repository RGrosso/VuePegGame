<template>
  <div class="peg-container">
    <div v-for="(row, r) in gameBoardTiled" :key="`row-${r}`" class="peg-row">
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
  <p v-if="instructions" class="instructions">{{ instructions }}</p>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ROW_COUNT, TileState } from "@/game/constants";
import PegTile from "./PegTile.vue";
import PegGame from "@/game/PegGame";
import { useGameStore } from "@/stores/gameStore";
import { storeToRefs } from "pinia";

const gameStore = useGameStore();
const { gameBoard, gameStatus } = storeToRefs(gameStore);

const emit = defineEmits<{
  pegSelected: [],
}>();

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

function selectPeg(index: number) {
  emit("pegSelected");
  const result = PegGame.selectPeg(gameBoard.value, index);
  if (result.valid) {
    gameBoard.value = result.newBoard;
  }
}

function selectEnd(endIndex: number) {
  const result = PegGame.selectEnd(gameBoard.value, endIndex);
  if (result.valid) {
    gameBoard.value = result.newBoard;
    gameStatus.value = PegGame.getGameState(result.newBoard);
  }
}

const instructions = computed(() => {
  if (gameBoard.value.every(t => t !== TileState.SelectedPeg)) {
    return "Select a peg to jump...";
  }

  // TODO:
  // This logic is a bit rough and needs a clean up
  // We also should show some more useful messages if the user keeps selecting pegs with no possible moves
  const containsSelectedPeg = gameBoard.value.some(t => t === TileState.SelectedPeg);
  const hasPossibleEnd = gameBoard.value.some(t => t === TileState.PossibleEnd);


  if (containsSelectedPeg) {
    if (hasPossibleEnd) {
      return "Select an empty tile to jump to...";
    }
    return "No possible moves, select another peg jump.";
  }

  return null;
});
</script>

<style scoped>
.peg-container {
  --tile-gap: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tile-gap);
}

.peg-row {
  display: flex;
  justify-content: center;
  gap: var(--tile-gap);
}

.instructions {
  text-align: center;
  margin-top: 1rem;
  font-size: 1.25rem;
  color: var(--off-white);
}
</style>
