import type {
  DemoRecordAnalysisWave,
  DemoRecordAnalysisZedtime,
  DemoRecordParsedEventBuff,
  DemoRecordParsedEventHpChange,
  DemoRecordParsedPlayer,
} from '$lib/api/sessions/demo';
import { filterByRange, findLastLowerIndex } from './utils';

export function getUserProfileByUserIndex(
  userIndex: number,
  players: DemoRecordParsedPlayer[]
) {
  return players.find((x) => x.user_index === userIndex)?.profile;
}

export function getWavePlayers(
  selectedWave: DemoRecordAnalysisWave | undefined,
  players: DemoRecordParsedPlayer[]
) {
  if (!selectedWave || !selectedWave.player_events.perks.length) {
    return [];
  }

  const perks = selectedWave.player_events.perks;
  const waveUserIds = perks.map((x) => x.user_index);

  return players.filter((x) => waveUserIds.includes(x.user_index));
}

export type PreparedPlayerWaveData = {
  perk: number;

  profile?: DemoRecordParsedPlayer['profile'];

  health: DemoRecordParsedEventHpChange[];
  buffs: DemoRecordParsedEventBuff[];
};

export function getPlayerWaveData(
  selectedWave: DemoRecordAnalysisWave | undefined,
  players: DemoRecordParsedPlayer[]
) {
  const lookup = new Map<number, PreparedPlayerWaveData>();

  if (!selectedWave) return lookup;

  for (const ev of selectedWave.player_events.perks) {
    const player = players.find((x) => x.user_index === ev.user_index);

    const health = selectedWave.player_events.hp_changes.filter(
      (x) => x.user_index === ev.user_index
    );

    const buffs = selectedWave.player_events.buffs.filter(
      (x) => x.user_index === ev.user_index
    );

    const death = selectedWave.player_events.deaths.find(
      (x) => x.user_index === ev.user_index
    );

    if (death) {
      health.push({
        user_index: ev.user_index,
        tick: death.tick,
        armor: 0,
        health: 0,
      });
    }

    lookup.set(ev.user_index, {
      perk: ev.perk,

      profile: player?.profile,
      health,
      buffs,
    });
  }

  return lookup;
}

export function getKillEvents(
  wave: DemoRecordAnalysisWave | undefined,
  currentTick: number,
  onlyLarges: boolean
) {
  if (!wave || !wave.player_events.kills.length) return [];

  const to = currentTick - 1000;

  return filterByRange(
    wave.player_events.kills,
    ({ tick }) => tick,
    to,
    currentTick
  )
    .filter((kill) => {
      if (onlyLarges && !(kill.zed >= 7 && kill.zed <= 9)) return false;

      return true;
    })
    .reverse()
    .filter((_, idx) => idx < 8);
}

export function getLastHealthEvent(
  currentTick: number,
  data: PreparedPlayerWaveData['health']
) {
  const idx = findLastLowerIndex(data, ({ tick }) => tick, currentTick);
  const item = data[Math.max(0, idx)];

  if (!item) return { health: 0, armor: 0 };

  return { health: item.health, armor: item.armor };
}

export function getLastBuffEvent(
  currentTick: number,
  data: PreparedPlayerWaveData['buffs']
) {
  const idx = findLastLowerIndex(data, ({ tick }) => tick, currentTick);
  const item = data[Math.max(0, idx)];

  if (!item) return 0;

  return item.max_buffs;
}

export type MajorEventsData = {
  zedtime: {
    current?: DemoRecordAnalysisZedtime;
    previous?: DemoRecordAnalysisZedtime;
    ticksSinceLast: number;
    largesKilled: number;
  };
  zedsLeft: number;
};

export function prepareMajorEventsData(
  currentTick: number,
  wave: DemoRecordAnalysisWave | undefined
): MajorEventsData {
  const res: MajorEventsData = {
    zedtime: { ticksSinceLast: 0, largesKilled: 0 },
    zedsLeft: 0,
  };

  if (!wave) return res;

  if (wave.zedtimes) {
    const idx = wave.zedtimes.findIndex(
      (x) =>
        currentTick >= x.meta_data.start_tick &&
        currentTick <= x.meta_data.end_tick
    );

    if (idx >= 0) {
      res.zedtime.current = wave.zedtimes[idx];

      res.zedtime.largesKilled = filterByRange(
        wave.player_events.kills,
        ({ tick }) => tick,
        res.zedtime.current.meta_data.start_tick,
        currentTick
      ).filter((x) => [7, 8, 9].includes(x.zed)).length;
    }

    if (idx > 0) {
      res.zedtime.ticksSinceLast =
        wave.zedtimes[idx].meta_data.start_tick -
        wave.zedtimes[idx - 1].meta_data.end_tick;

      res.zedtime.previous = wave.zedtimes[idx - 1];
    } else {
      const lastZt = wave.zedtimes.findLast(
        (x) => currentTick > x.meta_data.end_tick
      );

      if (lastZt) {
        res.zedtime.previous = lastZt;
        res.zedtime.ticksSinceLast = currentTick - lastZt.meta_data.end_tick;
      }
    }
  }

  if (wave.zeds_left && wave.zeds_left.length) {
    const idx = findLastLowerIndex(
      wave.zeds_left,
      ({ tick }) => tick,
      currentTick
    );
    const item = wave.zeds_left[Math.max(0, idx)];

    res.zedsLeft = item.zeds_left;
  }

  return res;
}
