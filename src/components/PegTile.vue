<template>
  <div 
    class="peg-tile" 
    :class="{ 'peg-tile-negative-y-offset': rowIndex !== 0}"
  />
</template>

<script setup lang="ts">
const { rowIndex } = defineProps<{
  rowIndex: number,
}>();
</script>

<style scoped>
.peg-tile {
  --peg-tile-size: 96px;

  height: var(--peg-tile-size);
  width: var(--peg-tile-size);
  background-color: var(--grey);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

/* Offset so all hexagons so they sit flush */
.peg-tile-negative-y-offset {
  margin-top: calc(var(--peg-tile-size) * -0.25);
}
</style>
