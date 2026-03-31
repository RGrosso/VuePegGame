<template>
  <div
    class="overlay-message"
    :class="{
      'overlay-success': variant === 'success',
      'overlay-error': variant === 'error',
    }"
  >
    <div class="overlay-inner-container">
      <h1>{{ heading }}</h1>
      <p v-for="(t, i) in text" :key="t" :class="`mb-${i === text.length - 1 ? 8 : 2}`">
        {{ t }}
      </p>

      <GameButton variant="primary" @click="emit('restartGame')">{{ restartGameText }}</GameButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameButton from "./GameButton.vue";

defineProps<{
  variant: "success" | "error",
  heading: string,
  text: string[],
  restartGameText: string,
}>();

const emit = defineEmits<{
  "restartGame": [],
}>();

</script>

<style scoped>
.overlay-message {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
  background-color: var(--clr-surface-a0);
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 5rem;
  z-index: 5;
  border-radius: var(--game-stage-border-radius);
  color: var(--white);
}

.overlay-success {
  border-color: var(--clr-success-a0);
}

.overlay-error {
  border-color: var(--clr-danger-a0);
}

:deep(p) {
  font-size: 1.5rem;
}

.overlay-inner-container {
  padding: 0 3rem;
}
</style>
