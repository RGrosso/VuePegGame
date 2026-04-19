<template>
  <div class="summary-row">
    <GameSummaryCol header="Pegs remaining">
      {{ gameStore.remainingPegs }}
      <span class="mdi mdi-hexagon primary-color-text" />
    </GameSummaryCol>
    <GameSummaryCol header="Best score">
      {{ gameStore.bestScore.remainingPegs ? gameStore.bestScore.remainingPegs + ' pegs' : 'N/A' }}
    </GameSummaryCol>
  </div>
</template>

<script setup lang="ts">
import GameSummaryCol from "./GameSummaryCol.vue";
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();
</script>

<style scoped>
.summary-row {
  display: flex;
  gap: 4rem;
  margin-bottom: 2rem;
}
</style>
