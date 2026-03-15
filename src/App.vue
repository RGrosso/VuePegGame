<template>
  <div id="vue-app">
    <GameStage />
  </div>
</template>

<script setup lang="ts">
import GameStage from "./components/GameStage.vue";
</script>

<style scoped>
#vue-app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>