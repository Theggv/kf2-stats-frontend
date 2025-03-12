import type {
  DemoRecordAnalysis,
  DemoRecordAnalysisWave,
} from '$lib/api/sessions/demo';
import { derived, get, writable } from 'svelte/store';
import {
  clearBuffEvents,
  clearHealthEvents,
  getKillEvents,
  prepareWaveEventsFeed,
  type EventUnion,
} from './MatchDemoPlayer.data';
import { findLastLowerIndex } from './utils';

export function getDemoRecordStore(demoRecord: DemoRecordAnalysis) {
  const demo = writable(demoRecord);
  const control = getControlStore();

  const selectedWaveIdx = writable<number>(0);
  const selectedWave = derived([demo, selectedWaveIdx], ([demo, idx]) =>
    idx >= 0 ? demo.waves[idx] : undefined
  );

  selectedWave.subscribe((wave) => control.setRange(wave));

  const selectedUserIndexes = writable<number[]>([]);

  const onlyLarges = writable(false);
  const killEvents = derived(
    [selectedWave, control.currentTick, onlyLarges],
    ([wave, tick, onlyLarges]) => getKillEvents(wave, tick, onlyLarges)
  );

  const eventFilter = writable<EventUnion['type'][]>([]);

  const clearedData = derived([selectedWave], ([wave]) => ({
    buffs: clearBuffEvents(wave),
    hp_changes: clearHealthEvents(wave),
  }));

  const eventsFeed = derived(
    [
      selectedWave,
      clearedData,
      control.currentTick,
      eventFilter,
      selectedUserIndexes,
    ],
    ([wave, clearedData, tick, eventFilter, playerFilter]) =>
      prepareWaveEventsFeed(wave, clearedData, tick, eventFilter, playerFilter)
  );

  demo.subscribe((demo) => {
    selectedUserIndexes.set([]);
    selectedWaveIdx.set(0);
  });

  return {
    demo,
    control,
    selectedWaveIdx,
    selectedWave,
    selectedUserIndexes,
    events: {
      eventFilter,
      ticksSinceLastZt: derived(
        [selectedWave, control.currentTick],
        ([wave, tick]) => {
          if (!wave) return 0;

          const idx = findLastLowerIndex(
            wave?.zedtimes,
            ({ meta_data: { start_tick, end_tick } }, needle) => {
              if (needle >= start_tick && needle <= end_tick) return 0;

              return needle < start_tick ? 1 : -1;
            },
            tick
          );

          if (idx < 0) return 0;

          const zt = wave.zedtimes[idx];
          if (!zt) return 0;

          if (
            idx > 0 &&
            tick >= zt.meta_data.start_tick &&
            tick <= zt.meta_data.end_tick
          ) {
            const prev = wave.zedtimes[idx - 1];

            return zt.meta_data.start_tick - prev.meta_data.end_tick;
          }

          return tick - zt.meta_data.end_tick;
        }
      ),
      feed: derived([eventsFeed], ([feed]) =>
        feed.reverse().filter((_, i) => i < 10)
      ),
      kills: {
        onlyLarges,
        data: killEvents,
        filtered: derived(
          [killEvents, selectedUserIndexes],
          ([events, userIdx]) => {
            if (!userIdx.length) return events;
            return events.filter((x) => userIdx.includes(x.user_index));
          }
        ),
      },
    },
  };
}

export function getControlStore(tickRate: number = 10) {
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

  function setRange(wave?: DemoRecordAnalysisWave) {
    if (!wave) return;

    range.set({
      start_tick: wave.meta_data.start_tick,
      end_tick: wave.meta_data.end_tick,
    });
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

  return {
    range,
    currentTick,
    currentTickWithOffset: derived(
      [range, currentTick],
      ([range, currentTick]) => currentTick - range.start_tick
    ),
    playing,
    speed,
    play,
    pause,
    setRange,
  };
}
