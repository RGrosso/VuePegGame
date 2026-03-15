<template>
  <div 
    class="peg-tile" 
    :class="{
      'peg-tile--negative-y-offset': rowIndex !== 0,
      'peg-tile--has-peg': state === TileState.Peg || state === TileState.SelectedPeg,
      'peg-tile--is-possible-end': state === TileState.PossibleEnd,
      'peg-tile--selected-peg': state === TileState.SelectedPeg,
    }"
    @click="selectPeg"
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

function selectPeg() {
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
}

/* Offset so all hexagons so they sit flush */
.peg-tile--negative-y-offset {
  margin-top: calc(var(--peg-tile-size) * -0.25);
}

.peg-tile.peg-tile--has-peg {
  background-color: var(--red);
  cursor: pointer;
}
.peg-tile.peg-tile--has-peg:hover {
  background-color: var(--red-light);
}

.peg-tile--is-possible-end {
  background-color: var(--green);
  cursor: pointer;
}

.peg-tile--selected-peg::before {
  position: relative;
  content: "";
  /* Create the same shape 1px wider */
  height: calc(var(--peg-tile-size) + 2px);
  width: calc(var(--peg-tile-size) + 2px);
  background-color: var(--pale);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  /* Center the new shape behind the original */
  top: -1px;
  left: -1px;
}
</style>
