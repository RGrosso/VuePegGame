<template>
  <div class="peg-container">
    <div v-for="(row, r) in gameBoardTiled" :key="`row-${r}`" class="peg-row">
      <PegTile
        v-for="(gameBoardIndex, c) in row"
        :key="`peg-${r}-${c}`"
        :row-index="r"
        :col-index="c"
        :state="model[gameBoardIndex]!"
        @select-peg="selectPeg(gameBoardIndex)"
        @select-end="selectEnd(gameBoardIndex)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { GameStatus, ROW_COUNT, type BoardState } from "@/game/constants";
import PegTile from "./PegTile.vue";
import PegGame from "@/game/PegGame";

const model = defineModel<BoardState>({ required: true });
const gameStatus = defineModel<GameStatus>("status", { required: true });

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
  const result = PegGame.selectPeg(model.value, index);
  if (result.valid) {
    model.value = result.newBoard;
  }
}

function selectEnd(endIndex: number) {
  const result = PegGame.selectEnd(model.value, endIndex);
  if (result.valid) {
    model.value = result.newBoard;
    gameStatus.value = PegGame.getGameState(result.newBoard);
  }
}
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
</style>
