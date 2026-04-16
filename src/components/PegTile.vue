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
  --peg-tile-height: 96px;
  --peg-tile-width: calc(var(--peg-tile-height) * 0.866);
  --duration: 6s;
  --hex-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

  --current-border: var(--tile-empty-border, #444);
  --current-bg: var(--tile-empty-bg, #2a2a2a);

  height: var(--peg-tile-height);
  width: var(--peg-tile-width);
  background-color: var(--current-border);
  clip-path: var(--hex-path);

  transition: background-color 150ms ease-in-out;
  position: relative;
  display: inline-block;
  transform-origin: center center;
}

.tile::before {
  position: absolute;
  content: "";
  inset: 2px;
  background-color: var(--current-bg);
  clip-path: var(--hex-path);
}


.tile__state--peg {
  --current-border: var(--tile-peg-border);
  --current-bg: var(--tile-peg-bg);
}

.tile__state--selected-peg {
  --current-border: var(--tile-selected-peg-border);
  --current-bg: var(--tile-selected-peg-bg);
  z-index: 10;
  animation: rotate-pause var(--duration) cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.tile__state--possible-end {
  --current-border: var(--tile-possible-end-border);
  --current-bg: var(--tile-possible-end-bg);
}

.tile__state--peg:hover::before,
.tile__state--selected-peg:hover::before,
.tile__state--possible-end:hover::before {
  animation: pulse-scale 1s ease-in-out infinite;
}

.tile--negative-y-offset {
  margin-top: calc(var(--peg-tile-height) * -0.25);
}

@keyframes rotate-pause {
  0%, 12% { transform: rotate(0deg); }
  16.6%, 28% { transform: rotate(60deg); }
  33.3%, 45% { transform: rotate(120deg); }
  50%, 62% { transform: rotate(180deg); }
  66.6%, 78% { transform: rotate(240deg); }
  83.3%, 95% { transform: rotate(300deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.9); }
}

.tile__state--peg:hover,
.tile__state--selected-peg:hover,
.tile__state--possible-end:hover {
  cursor: pointer;
  filter: brightness(1.2);
}
</style>
