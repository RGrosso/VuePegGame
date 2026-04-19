<template>
  <div class="summary-row">
    <GameSummaryCol header="Pegs remaining">
      {{ remainingPegs }}
      <span class="mdi mdi-hexagon primary-color-text" />
    </GameSummaryCol>
    <GameSummaryCol header="Best score">
      TODO
    </GameSummaryCol>
  </div>
</template>

<script setup lang="ts">
import GameSummaryCol from "./GameSummaryCol.vue";

defineProps<{
  remainingPegs: number,
}>();
</script>

<style scoped>
.summary-row {
  display: flex;
  gap: 4rem;
  margin-bottom: 2rem;
}
</style>
