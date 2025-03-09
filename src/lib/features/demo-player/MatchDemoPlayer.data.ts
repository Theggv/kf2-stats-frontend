import type { UserProfile } from '$lib/api/common';
import type {
  DemoRecordAnalysis,
  DemoRecordAnalysisPlayer,
  DemoRecordAnalysisWave,
  DemoRecordAnalysisWaveBuff,
  DemoRecordAnalysisWaveHpChange,
  DemoRecordAnalysisWaveZedtime,
} from '$lib/api/sessions/demo';

export function findEvents<T extends { tick: number }>(
  data: T[],
  tick: number,
  duration: number
): { start: number; end: number } {
  if (data.length == 0) return { start: -1, end: 0 };

  function binarySearch<T extends { tick: number }>(
    data: T[],
    tick: number,
    preferMin: boolean
  ) {
    let res = data[0].tick;
    let start = 0;
    let end = data.length - 1;
    let mid = 0;

    while (start <= end) {
      mid = (start + end) >> 1;
      const value = data[mid].tick;

      if (Math.abs(value - tick) < Math.abs(res - tick)) {
        res = value;
      } else if (Math.abs(value - tick) == Math.abs(res - tick)) {
        res = preferMin ? Math.min(value, res) : Math.max(value, res);
      }

      if (value == tick) return mid;
      else if (value < tick) start = mid + 1;
      else end = mid - 1;
    }

    return mid;
  }

  const startIdx = binarySearch(data, tick - duration, false);
  const endIdx = binarySearch(data, tick, true);

  return { start: startIdx, end: endIdx };
}

export function getWavePlayers(
  demo: DemoRecordAnalysis,
  selectedWave: DemoRecordAnalysisWave | undefined
) {
  if (!selectedWave || !selectedWave.perks || !selectedWave.perks.length) {
    return [];
  }

  const perks = selectedWave.perks;
  const waveUserIds = perks.map((x) => x.user_id);

  return demo.players.filter((x) => waveUserIds.includes(x.user_id));
}

export function getPlayerPerk(
  userId: number,
  selectedWave: DemoRecordAnalysisWave
) {
  return selectedWave.perks!.find((x) => x.user_id === userId)!.perk;
}

export function getUserProfile(
  player: DemoRecordAnalysisPlayer,
  users: UserProfile[]
) {
  return users.find((x) => x.auth_id === player.unique_id);
}

export function getUserProfileByUserId(
  userId: number,
  data: DemoRecordAnalysis,
  users: UserProfile[]
) {
  const player = data.players.find((x) => x.user_id === userId);
  if (!player) return undefined;

  return getUserProfile(player, users);
}

export function getKillEvents(
  selectedWave: DemoRecordAnalysisWave | undefined,
  currentTick: number,
  onlyLarges: boolean
) {
  if (!selectedWave || !selectedWave.kills) return [];

  return selectedWave.kills
    .filter((kill) => {
      if (onlyLarges && ![7, 8, 9].includes(kill.zed)) return false;

      return kill.tick >= currentTick - 1000 && kill.tick <= currentTick;
    })
    .reverse()
    .filter((_, idx) => idx < 8);
}

export function getLastHealthEvent(
  userId: number,
  currentTick: number,
  data: ReturnType<typeof prepareHealthData>
) {
  const userEvents = data.get(userId);
  if (!userEvents || !userEvents.length) return { health: 0, armor: 0 };

  let last = userEvents[0];

  for (let i = 0; i < userEvents.length; i++) {
    if (userEvents[i].tick < currentTick) last = userEvents[i];
    else break;
  }

  return { health: last.health, armor: last.armor };
}

export function getLastBuffEvent(
  userId: number,
  currentTick: number,
  data: ReturnType<typeof prepareBuffsData>
) {
  const userEvents = data.get(userId);
  if (!userEvents || !userEvents.length) return 0;

  let last = userEvents[0];

  for (let i = 0; i < userEvents.length; i++) {
    if (userEvents[i].tick < currentTick) last = userEvents[i];
    else break;
  }

  return last.max_buffs;
}

export function prepareHealthData(wave: DemoRecordAnalysisWave | undefined) {
  const map = new Map<
    number,
    Omit<DemoRecordAnalysisWaveHpChange, 'user_id'>[]
  >();

  if (!wave || !wave.hp_changes) return map;

  for (const event of wave.hp_changes) {
    const { user_id, ...rest } = event;

    if (map.get(user_id)) map.get(user_id)!.push(rest);
    else map.set(user_id, [rest]);
  }

  return map;
}

export function prepareBuffsData(wave: DemoRecordAnalysisWave | undefined) {
  const map = new Map<number, Omit<DemoRecordAnalysisWaveBuff, 'user_id'>[]>();

  if (!wave || !wave.buffs) return map;

  for (const event of wave.buffs) {
    const { user_id, ...rest } = event;

    if (map.get(user_id)) map.get(user_id)!.push(rest);
    else map.set(user_id, [rest]);
  }

  return map;
}

export type MajorEventsData = {
  zedtime: {
    current?: DemoRecordAnalysisWaveZedtime;
    previous?: DemoRecordAnalysisWaveZedtime;
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

  if (wave.zed_times) {
    const idx = wave.zed_times.findIndex(
      (x) => currentTick >= x.start_tick && currentTick <= x.end_tick
    );

    if (idx >= 0) {
      res.zedtime.current = wave.zed_times[idx];

      res.zedtime.largesKilled = (wave.kills || []).filter(
        (x) =>
          [7, 8, 9].includes(x.zed) &&
          x.tick >= res.zedtime.current!.start_tick &&
          x.tick <= currentTick
      ).length;
    }

    if (idx > 0) {
      res.zedtime.ticksSinceLast =
        wave.zed_times[idx].start_tick - wave.zed_times[idx - 1].end_tick;

      res.zedtime.previous = wave.zed_times[idx - 1];
    } else {
      const lastZt = wave.zed_times.findLast((x) => currentTick > x.end_tick);

      if (lastZt) {
        res.zedtime.previous = lastZt;
        res.zedtime.ticksSinceLast = currentTick - lastZt.end_tick;
      }
    }
  }

  res.zedsLeft =
    wave.zeds_left?.findLast((x) => x.tick <= currentTick)?.zeds_left || 0;

  return res;
}
