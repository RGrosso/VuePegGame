<template>
  <Teleport v-if="gameStatus === GameStatus.Won" to="#vue-app">
    <div class="confetti-container">
      <ConfettiExplosion
        :stageHeight="height"
        :stageWidth="width"
        :duration="5000"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { GameStatus } from "@/game/constants";
import ConfettiExplosion from "vue-confetti-explosion";

defineProps<{
  gameStatus: GameStatus,
}>();

const height = window.innerHeight;
const width = window.innerWidth;
</script>

<style scoped>
.confetti-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 5;
}
</style>
