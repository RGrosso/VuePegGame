<template>
  <div id="game-stage">
    <GameIntro v-if="showIntro" @startGame="startGame" />
    <template v-else>
      <div class="game-actions">
        <button class="restart-game" @click="restartGame">
          <span class="mdi mdi-refresh" /><div class="sr-only">Restart game</div>
        </button>
        <GameTimer ref="timerEl" />
      </div>
      <GameSummaryRow :remaining-pegs="remainingPegs" />
      <PegBoard
        v-model="gameBoard"
        v-model:status="gameStatus"
        @pegSelected="tryStartTimer"
      />
      <OverlayMessage
        v-if="gameStatus === GameStatus.Won"
        variant="success"
        heading="Game Won"
        :text="[
          'Congratulations!',
          'You\'ve won the game!',
          `Your time was ${typeof gameSecondsDuration ==='number'  ? gameSecondsDuration + ' seconds' : 'N/A'}.`,
        ]"
        restartGameText="Play Again"
        @restartGame="restartGame"
      />
      <OverlayMessage
        v-if="gameStatus === GameStatus.NoPossibleMoves"
        variant="error"
        heading="Game Over"
        :text="[
          'There are no possible moves left to play.',
          `You had ${remainingPegs} remaining pegs left.`,
          `Your time was ${typeof gameSecondsDuration ==='number'  ? gameSecondsDuration + ' seconds' : 'N/A'}.`,
        ]"
        restartGameText="Retry"
        @restartGame="restartGame"
    />
    <ConfettiContainer :game-status="gameStatus" />
    </template>
  </div>
</template>

<script setup lang="ts">
import PegGame from "@/game/PegGame";
import { computed, ref, shallowRef, useTemplateRef, watch } from "vue";
import { GameStatus, TileState, type BoardState } from "@/game/constants";
import OverlayMessage from "./OverlayMessage.vue";
import ConfettiContainer from "./ConfettiContainer.vue";
import GameIntro from "./GameIntro.vue";
import GameTimer from "./GameTimer.vue";
import PegBoard from "./PegBoard.vue";
import GameSummaryRow from "./GameSummaryRow.vue";

const gameBoard = ref<BoardState>(PegGame.getInitialBoard());
const gameStatus = ref<GameStatus>(GameStatus.Ongoing);
const showIntro = shallowRef(true);
const gameSecondsDuration = shallowRef<number | null>(null);
const hasStartedTimer = shallowRef(false);

const remainingPegs = computed<number>(() => gameBoard.value.filter(peg => [TileState.Peg, TileState.SelectedPeg].includes(peg)).length);
const timerRef = useTemplateRef("timerEl");

function tryStartTimer() {
  if (timerRef.value && !hasStartedTimer.value) {
    timerRef.value.start();
    hasStartedTimer.value = true;
  }
}

function restartGame() {
  gameBoard.value = PegGame.getInitialBoard();
  hasStartedTimer.value = false;
  timerRef.value?.reset();
  gameStatus.value = GameStatus.Ongoing;
}

function startGame() {
  showIntro.value = false;
}

const cheatCode = ["ArrowUp",  "ArrowDown",  "ArrowLeft", "ArrowRight"];
let cheatCodeIndex = 0;
window.addEventListener("keydown", (e) => {
  if (gameStatus.value !== GameStatus.Ongoing && showIntro.value === false) {
    return;
  }
  if (e.key === cheatCode[cheatCodeIndex]) {
    cheatCodeIndex++;
    if (cheatCodeIndex === cheatCode.length) {
      timerRef.value?.start();
      // fill the game board with empty tiles except for the first tile which should be a peg
      gameBoard.value = [TileState.Peg, TileState.Peg, ...Array(gameBoard.value.length - 2).fill(TileState.Empty)] as BoardState;
      cheatCodeIndex = 0;
    }
    return;
  }

  cheatCodeIndex = 0;
});

watch(gameStatus, () => {
  if (gameStatus.value !== GameStatus.Ongoing) {
    gameSecondsDuration.value = timerRef.value?.stop() ?? null;
  }
});
</script>

<style scoped>
#game-stage {
  background-color: var(--game-bg);
  border-radius: var(--game-stage-border-radius);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  box-shadow:
    inset 0 0 4px rgba(255, 255, 255, 0.2),
    0 0 5px rgba(255, 255, 255, 0.4),
    0 0 15px rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(3px);
  padding: 2rem 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 640px;
  height: 720px;
}

.restart-game {
  font-size: 1.5rem;
  background: none;
  color: var(--white);
  border-radius: 64px;
  aspect-ratio: 1;
  height: 2.5rem;
  width: 2.5rem;
  transition: background-color 150ms ease-in-out;
  border: solid 2px var(--clr-primary);
}

.restart-game:hover {
  cursor: pointer;
  background-color: var(--clr-primary);
}

.game-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
