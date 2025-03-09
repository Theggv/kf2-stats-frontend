import type {
  DemoRecordAnalysisWave,
  DemoRecordAnalysisWaveDifficultyItem,
} from '$lib/api/sessions/demo';

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

export function prepareDifficultyDataset(wave: DemoRecordAnalysisWave) {
  const diffCoeffs = {
    trash: 1,
    medium: 2,
    large: 4,
  };

  function calcDifficulty(tick: DemoRecordAnalysisWaveDifficultyItem) {
    return (
      tick.trash_kills * diffCoeffs.trash +
      tick.medium_kills * diffCoeffs.medium +
      tick.large_kills * diffCoeffs.large
    );
  }

  function getMaxValue(values: number[]) {
    if (!values.length) return 0;

    return values.reduce((a, x) => (x > a ? x : a), 0);
  }

  const dataset = wave.difficulty.ticks.map((x) => ({
    x: x.tick + wave.start_tick,
    y: calcDifficulty(x) + 10,
  }));

  return { dataset, max: getMaxValue(dataset.map((item) => item.y)) };
}

export function prepareZedtimeDataset(wave: DemoRecordAnalysisWave) {
  if (!wave.zed_times) return { dataset: [] };

  const dataset = wave.zed_times.map((x) => [
    { x: x.start_tick, y: 1 },
    { x: x.end_tick, y: 1 },
  ]);

  return { dataset };
}

export function prepareDeathDataset(wave: DemoRecordAnalysisWave) {
  if (!wave.hp_changes) return { dataset: [] };

  const dataset = wave.hp_changes
    .filter((x) => x.health === 0)
    .map((x) => [
      { x: x.tick, y: 1 },
      { x: x.tick, y: 100 },
    ]);

  return { dataset };
}
