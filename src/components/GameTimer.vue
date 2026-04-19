<template>
  <span class="game-timer"><span class="mdi mdi-timer" />
    <span class="timer-display"><span class="timer-value">{{ formattedValue }}</span></span>
  </span>
</template>

<script setup lang="ts">
import { useTimer } from "@/composables/timer";
import { computed } from "vue";

const { value, start, stop, reset } = useTimer();
const formattedValue = computed(() => {
  const mins = Math.floor(value.value / 60).toString().padStart(2, "0");
  const secs = (value.value % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
});

defineExpose({
  start,
  stop,
  reset,
});
</script>

<style scoped>
.game-timer {
  font-size: 2rem;
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
  font-size: 28px;
  padding-top: 4px;
}
</style>
