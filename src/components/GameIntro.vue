<template>
  <div class="game-intro">
    <h1 class="mb-6">Clear the Board</h1>
    <p class="mb-8">One empty slot. Fourteen pegs. Can you leave just one?</p>
    <div class="how-to">
      <h2 class="mb-4">The Rules</h2>
      <p><strong>The Jump:</strong> Move a peg over an adjacent neighbor into an empty hole (horizontal, vertical, or diagonal).</p>
      <p><strong>The Capture:</strong> The peg you jumped over is removed from play.</p>
      <p><strong>The Chain:</strong> Keep jumping until no valid moves remain.</p>
    </div>
    <GameButton variant="primary" class="game-intro-cta" @click="emit('startGame')">
      Start <span class="mdi mdi-chevron-right" />
    </GameButton>
  </div>
</template>

<script setup lang="ts">
import GameButton from "./GameButton.vue";

const emit = defineEmits<{
  startGame: [],
}>();
</script>

<style scoped>
.game-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.game-intro-cta {
  margin-top: 4rem;
}

.how-to h2 {
  text-align: left;
}

.how-to p {
  margin-bottom: 4px;
  text-align: justify;
}
</style>
