<template>
  <span class="game-timer"><span class="mdi mdi-timer" />
    <span class="timer-display"><span class="timer-value">{{ value }}</span></span>
  </span>
</template>

<script setup lang="ts">
import { useTimer } from "@/composables/timer";

const { value, start, stop, reset } = useTimer();

defineExpose({
  start,
  stop,
  reset,
});
</script>

<style scoped>
.game-timer {
  position: absolute;
  top: 3rem;
  right: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2px;
}

.timer-display {
  font-weight: bold;
}
.timer-value {
  font-family: 'Courier New', Courier, monospace;
}

.mdi {
  font-size: 24px;
  padding-top: 3px;
}
</style>
