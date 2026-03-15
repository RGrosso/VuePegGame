<template>
  <div id="game-stage">
    <div class="peg-container">
      <div v-for="(row, r) in rows" :key="`row-${r}`" class="row">
        <PegTile
        v-for="i in row"
        :key="`peg-${i}`"
        :row-index="r"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PegTile from "./PegTile.vue";

const PEG_COUNT = 15;

// Calculate triangular rows
const rows: number[][] = [];
let pegIndex = 1;
for (let rowNum = 1; pegIndex <= PEG_COUNT; rowNum++) {
  const row: number[] = [];
  for (let i = 0; i < rowNum && pegIndex <= PEG_COUNT; i++) {
    row.push(pegIndex++);
  }
  rows.push(row);
}
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