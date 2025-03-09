import { get, writable } from 'svelte/store';

export function getMatchDemoPlayerStore(tickRate: number = 10) {
  const range = writable({ start_tick: 0, end_tick: 0 });

  const playing = writable(false);
  const currentTick = writable(0);
  const speed = writable(1);

  let intervalId: number;

  function play() {
    if (get(currentTick) === get(range).end_tick) {
      currentTick.set(get(range).start_tick);
    }

    playing.set(true);

    const dt = 1000 / tickRate / get(speed);

    intervalId = setInterval(() => {
      const { start_tick, end_tick } = get(range);
      const prev = get(currentTick);
      const next = prev + 100 / tickRate;

      if (next > end_tick) {
        currentTick.set(end_tick);
        pause();
      } else if (next < start_tick) {
        currentTick.set(start_tick);
      } else {
        currentTick.set(next);
      }
    }, dt);
  }

  function pause() {
    clearInterval(intervalId);
    playing.set(false);
  }

  range.subscribe((range) => {
    pause();
    currentTick.set(range.start_tick);
  });

  speed.subscribe(() => {
    if (get(playing)) {
      pause();
      play();
    }
  });

  return { range, currentTick, playing, speed, play, pause };
}
