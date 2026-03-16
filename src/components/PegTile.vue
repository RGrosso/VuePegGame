<template>
  <div 
    class="tile" 
    :class="{
      'tile--negative-y-offset': rowIndex !== 0,
      'tile__state--empty': state === TileState.Empty,
      'tile__state--peg': state === TileState.Peg,
      'tile__state--possible-end': state === TileState.PossibleEnd,
      'tile__state--selected-peg': state === TileState.SelectedPeg,
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
  if (state === TileState.Peg || state === TileState.SelectedPeg) {
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
.tile {
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
.tile--negative-y-offset {
  margin-top: calc(var(--peg-tile-size) * -0.25);
}

.tile__state--peg,
.tile__state--selected-peg,
.tile__state--possible-end {
  cursor: pointer;

  &:hover {
    filter: brightness(120%);
  }
}

.tile__state--empty {
  background-color: var(--tile-empty-bg);
}

.tile__state--peg {
  background-color: var(--tile-peg-bg);
}

.tile__state--possible-end {
  background-color: var(--tile-possible-end-bg);
}

.tile__state--selected-peg {
  background-color: var(--tile-selected-peg-bg);
}

/* .tile__state--selected-peg::before {
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
} */
</style>
