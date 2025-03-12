import type { DemoRecordAnalysisWave } from '$lib/api/sessions/demo';

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

export function prepareDifficultyDataset(wave: DemoRecordAnalysisWave) {
  function getMaxValue(values: number[]) {
    if (!values.length) return 0;

    return values.reduce((a, x) => (x > a ? x : a), 0);
  }

  const diff = wave.analytics.difficulty.details;

  const dataset = diff.buckets.map((bucket, i) => ({
    x: wave.meta_data.start_tick + diff.step * i,
    y: bucket.score + 10,
  }));

  return { dataset, max: getMaxValue(dataset.map((item) => item.y)) };
}

export function prepareZedtimeDataset(wave: DemoRecordAnalysisWave) {
  if (!wave.zedtimes) return { dataset: [] };

  const dataset = wave.zedtimes.map((x) => [
    { x: x.meta_data.start_tick, y: 1 },
    { x: x.meta_data.end_tick, y: 1 },
  ]);

  return { dataset };
}

export function prepareDeathDataset(wave: DemoRecordAnalysisWave) {
  if (!wave.player_events.deaths) return { dataset: [] };

  const wavePlayers = wave.player_events.perks.map((x) => x.user_index);

  const dataset = wave.player_events.deaths
    .filter((x) => wavePlayers.includes(x.user_index))
    .map((x) => [
      { x: x.tick, y: 1 },
      { x: x.tick, y: 100 },
    ]);

  return { dataset };
}
