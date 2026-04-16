import { ref } from "vue";

export function useTimer() {
  const timer = ref(0);

  let interval: ReturnType<typeof setInterval> | null = null;

  function resetInterval() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function start() {
    resetInterval();

    timer.value = 0;
    interval = setInterval(() => {
      timer.value += 1;
    }, 1000);
  }

  function stop(): number {
    return timer.value;
  }

  return {
    value: timer,
    start,
    stop,
  };
}
