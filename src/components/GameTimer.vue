<template>
  <span class="game-timer">Time:
    <span class="timer-display"><span class="timer-value">{{ value }}</span>s</span>
  </span>
</template>

<script setup lang="ts">
import { useTimer } from "@/composables/timer";

const { value, start, stop } = useTimer();

defineExpose({
  start,
  stop,
});
</script>

<style scoped>
.game-timer {
  position: absolute;
  top: 3rem;
  right: 4rem;
  font-size: 1.5rem;
}

.timer-display {
  font-weight: bold;
  color: var(--clr-success-a20);
}
.timer-value {
  font-family: 'Courier New', Courier, monospace;
}
</style>
