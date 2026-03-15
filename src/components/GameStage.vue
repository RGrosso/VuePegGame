<template>
  <div id="game-stage">
    <div class="peg-container">
      <div v-for="(row, r) in gameBoardTiled" :key="`row-${r}`" class="row">
        <PegTile
          v-for="(state, c) in row"
          :key="`peg-${r}-${c}`"
          :row-index="r"
          :col-index="c"
          :state="state"
          @select-peg="game.selectPeg(r + (c + 1))"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PegGame from "@/game/PegGame";
import PegTile from "./PegTile.vue";
import { computed } from "vue";
import { TileState } from "@/game/constants";

const game = new PegGame();

const gameBoard = computed(() => game.getBoard());
const gameBoardTiled = computed(() => {
  // Map the 1D game board to a 2D array for easier rendering
  const tiledBoard: TileState[][] = [];
  let index = 0;
  for (let row = 0; row < rowCount; row++) {
    const rowTiles: TileState[] = [];
    for (let col = 0; col <= row; col++) {
      rowTiles.push(gameBoard.value[index]!);
      index++;
    }
    tiledBoard.push(rowTiles);
  }
  return tiledBoard;
});
const rowCount = 5;

</script>

<style scoped>
#game-stage {
  --tile-gap: 6px;
  background-color: var(--game-background);
  border-radius: 6px;
  border: 1px solid var(--grey);
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
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