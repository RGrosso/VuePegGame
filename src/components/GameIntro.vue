<template>
  <div class="game-intro">
    <h1>Intro</h1>
    <p>Welcome to the peg game inspired by the Cracker Barrel peg game.</p>
    <div class="how-to">
    <h2>How to Play the Peg Game</h2>
      <p><strong>Setup:</strong> The board is set up so that every hole is filled except one.</p>
      <p><strong>Make a jump:</strong> A move consists of one peg jumping over an immediately adjacent peg (horizontally, vertically, or diagonally) into an empty hole.</p>
      <p><strong>Remove the peg:</strong> The peg that was jupmed over is removed from the board, similar to capturing a piece in checkers.</p>
      <p><strong>Continue jumping:</strong> Keep making valid jumps until no more moves are possible.</p>
      <p><strong>Winning:</strong> The goal is to end the game with only a single peg remaining on the board.</p>
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
  margin-top: 2rem;
}

.how-to p {
  margin-bottom: 4px;
  text-align: justify;
}
</style>
