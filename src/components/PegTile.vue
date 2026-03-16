<template>
  <div 
    class="peg-tile" 
    :class="{
      'peg-tile--negative-y-offset': rowIndex !== 0,
      'peg-tile--has-peg': state === TileState.Peg || state === TileState.SelectedPeg,
      'peg-tile--is-possible-end': state === TileState.PossibleEnd,
      'peg-tile--selected-peg': state === TileState.SelectedPeg,
    }"
    @click="handlePegClick"
  />
</template>

<script setup lang="ts">
import { TileState } from "@/game/constants";

const { rowIndex, state } = defineProps<{
  rowIndex: number,
  state: TileState,
}>();

const emit = defineEmits<{
  selectPeg: [],
  selectEnd: [],
}>();

function handlePegClick() {
  if (state === TileState.Peg) {
    emit("selectPeg");
    return;
  }
  if (state === TileState.PossibleEnd) {
    emit("selectEnd");
    return;
  }

  // TODO: add an animated shake effect to indicate invalid move
}
</script>

<style scoped>
.peg-tile {
  --peg-tile-size: 96px;

  height: var(--peg-tile-size);
  width: var(--peg-tile-size);
  background-color: var(--grey);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: background-color 150ms ease-in-out;
  position: relative;
  z-index: 2;
}

/* Offset so all hexagons so they sit flush */
.peg-tile--negative-y-offset {
  margin-top: calc(var(--peg-tile-size) * -0.25);
}

.peg-tile.peg-tile--has-peg {
  background-color: var(--tile-bg);
  cursor: pointer;
}

.peg-tile.peg-tile--has-peg:hover {
  background-color: var(--tile-light-bg);
}

.peg-tile.peg-tile--is-possible-end {
  background-color: var(--possible-end-bg);
  cursor: pointer;
}

.peg-tile.peg-tile--selected-peg {
  background-color: var(--selected-border);
}

.peg-tile.peg-tile--selected-peg:hover {
  background-color: var(--selected-border-hover);
}

.peg-tile.peg-tile--selected-peg::before {
  position: absolute;
  content: "";
  height: calc(100% - 8px);
  width: calc(100% - 8px);
  background-color: var(--tile-bg);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.peg-tile.peg-tile--selected-peg:hover::before {
  background-color: var(--tile-light-bg);
}
</style>
