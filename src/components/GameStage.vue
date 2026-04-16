<template>
  <div id="game-stage">
    <GameIntro v-if="showIntro" @startGame="startGame" />
    <template v-else>
      <GameTimer ref="timerEl" />
      <button class="restart-game" @click="restartGame">
        <span class="mdi mdi-refresh" /><div class="sr-only">Restart game</div>
      </button>
      <div class="peg-container">
        <div v-for="(row, r) in gameBoardTiled" :key="`row-${r}`" class="row">
          <PegTile
            v-for="(gameBoardIndex, c) in row"
            :key="`peg-${r}-${c}`"
            :row-index="r"
            :col-index="c"
            :state="gameBoard[gameBoardIndex]!"
            @select-peg="selectPeg(gameBoardIndex)"
            @select-end="selectEnd(gameBoardIndex)"
          />
        </div>
      </div>
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
import PegTile from "./PegTile.vue";
import { computed, ref, shallowRef, useTemplateRef } from "vue";
import { GameStatus, ROW_COUNT, TileState, type BoardState } from "@/game/constants";
import OverlayMessage from "./OverlayMessage.vue";
import ConfettiContainer from "./ConfettiContainer.vue";
import GameIntro from "./GameIntro.vue";
import GameTimer from "./GameTimer.vue";

const gameBoard = ref<BoardState>(PegGame.getInitialBoard());
const gameStatus = ref<GameStatus>(GameStatus.Ongoing);
const remainingPegs = computed<number>(() => gameBoard.value.filter(peg => [TileState.Peg, TileState.SelectedPeg].includes(peg)).length);
const showIntro = ref(true);
const timerRef = useTemplateRef("timerEl");
const gameSecondsDuration = shallowRef<number | null>(null);
const hasStartedTimer = shallowRef(false);

const gameBoardTiled = computed(() => {
  // Map the 1D game board to a 2D index array for easier rendering
  const tiledBoard: number[][] = [];
  let index = 0;
  for (let row = 0; row < ROW_COUNT; row++) {
    const rowTiles: number[] = [];
    for (let col = 0; col <= row; col++) {
      rowTiles.push(index);
      index++;
    }
    tiledBoard.push(rowTiles);
  }
  return tiledBoard;
});

function updateGameState() {
  gameStatus.value = PegGame.getGameState(gameBoard.value);
  if (gameStatus.value !== GameStatus.Ongoing) {
    gameSecondsDuration.value = timerRef.value?.stop() ?? null;
  }
}

function selectPeg(index: number) {
  // Start the timer on the first peg selection
  if (!hasStartedTimer.value) {
    timerRef.value?.start();
    hasStartedTimer.value = true;
  }
  const result = PegGame.selectPeg(gameBoard.value, index);
  if (result.valid) {
    gameBoard.value = result.newBoard;
  }
}

function selectEnd(endIndex: number) {
  const result = PegGame.selectEnd(gameBoard.value, endIndex);
  if (result.valid) {
    gameBoard.value = result.newBoard;
    updateGameState();
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
  } else {
    cheatCodeIndex = 0;
  }
});
</script>

<style scoped>
#game-stage {
  --tile-gap: 6px;
  background-color: var(--game-bg);
  border-radius: var(--game-stage-border-radius);
  border: 2px solid var(--border);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 640px;
  height: 640px;
}

.peg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tile-gap);
}

.row {
  display: flex;
  justify-content: center;
  gap: var(--tile-gap);
}

.restart-game {
  position: absolute;
  top: 3rem;
  left: 4rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: var(--white);
  border-radius: 64px;
  aspect-ratio: 1;
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;
  border: solid 2px var(--clr-primary);
}

.restart-game:hover {
  background-color: var(--clr-primary);
}
</style>
