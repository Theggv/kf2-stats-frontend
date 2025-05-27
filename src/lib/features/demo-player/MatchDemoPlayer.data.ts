import type {
  DemoRecordAnalysisWave,
  DemoRecordAnalysisZedtime,
  DemoRecordParsedEventBuff,
  DemoRecordParsedEventConnection,
  DemoRecordParsedEventDeath,
  DemoRecordParsedEventHpChange,
  DemoRecordParsedEventHuskRage,
  DemoRecordParsedPlayer,
} from '$lib/api/sessions/demo';
import { filterByRange, findLastLowerIndex } from './utils';

export type ReplayTabsEnum = 'wave-replay' | 'wave-overview' | 'match-overview';

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
  death?: DemoRecordParsedEventDeath;
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

    lookup.set(ev.user_index, {
      perk: ev.perk,

      profile: player?.profile,
      health,
      buffs,
      death,
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
    ({ tick }, needle) => tick - needle,
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
  const idx = findLastLowerIndex(
    data,
    ({ tick }, needle) => tick - needle,
    currentTick
  );
  const item = data[Math.max(0, idx)];

  if (!item) return { health: 0, armor: 0 };

  return { health: item.health, armor: item.armor };
}

export function getLastBuffEvent(
  currentTick: number,
  data: PreparedPlayerWaveData['buffs']
) {
  const idx = findLastLowerIndex(
    data,
    ({ tick }, needle) => tick - needle,
    currentTick
  );
  const item = data[Math.max(0, idx)];

  if (!item) return 0;

  return item.max_buffs;
}

export type MajorEventsData = {
  zedsLeft: number;
};

type GenericEvent<T> = { from: number; to: number; payload: T };

export type BuffsEvent = {
  type: 'buffs';
} & GenericEvent<DemoRecordParsedEventBuff>;

export type HealthEventPayload = Pick<
  DemoRecordParsedEventHpChange,
  'tick' | 'user_index'
> & { old_value: number; new_value: number };

export type HealthEvent = {
  type: 'health';
} & GenericEvent<HealthEventPayload>;

export type DeathEvent = {
  type: 'death';
} & GenericEvent<DemoRecordParsedEventDeath>;

export type ConnectionEvent = {
  type: 'connect';
} & GenericEvent<DemoRecordParsedEventConnection>;

export type HuskRageEventPayload = DemoRecordParsedEventHuskRage & {
  count: number;
};

export type WaveStartedEvent = {
  type: 'wave-started';
} & GenericEvent<undefined>;

export type WaveEndedEvent = {
  type: 'wave-ended';
} & GenericEvent<undefined>;

export type HuskRageEvent = {
  type: 'husk_r';
} & GenericEvent<HuskRageEventPayload>;

export type ZedtimeEvent = {
  type: 'zedtime';
} & GenericEvent<DemoRecordAnalysisZedtime>;

export type EventUnion =
  | WaveStartedEvent
  | WaveEndedEvent
  | ZedtimeEvent
  | ConnectionEvent
  | HealthEvent
  | BuffsEvent
  | DeathEvent
  | HuskRageEvent;

export function clearBuffEvents(wave: DemoRecordAnalysisWave | undefined) {
  if (!wave) return [];

  const lookup = new Map<number, DemoRecordParsedEventBuff[]>();

  for (const ev of wave.player_events.buffs) {
    if (lookup.has(ev.user_index)) lookup.get(ev.user_index)?.push(ev);
    else lookup.set(ev.user_index, [ev]);
  }

  const events: DemoRecordParsedEventBuff[] = [];

  for (const [_, userEvents] of lookup) {
    let found = false;

    for (const ev of userEvents) {
      if (!found && !ev.max_buffs) continue;

      events.push(ev);
      found = true;
    }
  }

  return events.toSorted((a, b) => a.tick - b.tick);
}

export function clearHealthEvents(wave: DemoRecordAnalysisWave | undefined) {
  if (!wave) return [];

  const lookup = new Map<number, DemoRecordParsedEventHpChange[]>();

  for (const ev of wave.player_events.hp_changes) {
    if (lookup.has(ev.user_index)) lookup.get(ev.user_index)?.push(ev);
    else lookup.set(ev.user_index, [ev]);
  }

  const events: HealthEventPayload[] = [];

  for (const [_, userEvents] of lookup) {
    for (let i = 1; i < userEvents.length; i++) {
      const ev = userEvents[i];
      const old_value = userEvents[i - 1].health;

      if (ev.health >= old_value) continue;

      events.push({
        tick: ev.tick,
        user_index: ev.user_index,
        new_value: ev.health,
        old_value,
      });
    }
  }

  return events.toSorted((a, b) => a.tick - b.tick);
}

export function prepareWaveEventsFeed(
  wave: DemoRecordAnalysisWave | undefined,
  clearedData: {
    buffs: DemoRecordParsedEventBuff[];
    hp_changes: HealthEventPayload[];
  },
  tick: number,
  eventFilter: string[],
  userFilter: number[]
): EventUnion[] {
  if (!wave) return [];

  const events: EventUnion[] = [];

  if (tick - 1000 <= wave.meta_data.start_tick) {
    events.push({
      type: 'wave-started',
      from: wave.meta_data.start_tick,
      to: wave.meta_data.start_tick,
      payload: undefined,
    });
  }

  if (tick >= wave.meta_data.end_tick - 100) {
    events.push({
      type: 'wave-ended',
      from: wave.meta_data.end_tick,
      to: wave.meta_data.end_tick,
      payload: undefined,
    });
  }

  if (!eventFilter.length || eventFilter.includes('buffs')) {
    const items = filterByRange(
      clearedData.buffs,
      ({ tick }, needle) => tick - needle,
      tick - 1000,
      tick
    );

    for (const ev of items) {
      if (userFilter.length && !userFilter.includes(ev.user_index)) {
        continue;
      }

      events.push({ type: 'buffs', from: ev.tick, to: ev.tick, payload: ev });
    }
  }

  if (!eventFilter.length || eventFilter.includes('health')) {
    const items = filterByRange(
      clearedData.hp_changes,
      ({ tick }, needle) => tick - needle,
      tick - 1000,
      tick
    );

    for (const ev of items) {
      if (userFilter.length && !userFilter.includes(ev.user_index)) {
        continue;
      }

      events.push({ type: 'health', from: ev.tick, to: ev.tick, payload: ev });
    }
  }

  if (!eventFilter.length || eventFilter.includes('death')) {
    const wavePlayers = wave.player_events.perks.map((x) => x.user_index);

    const items = filterByRange(
      wave.player_events.deaths,
      ({ tick }, needle) => tick - needle,
      tick - 1000,
      tick
    ).filter((x) => wavePlayers.includes(x.user_index));

    for (const ev of items) {
      if (userFilter.length && !userFilter.includes(ev.user_index)) {
        continue;
      }

      events.push({ type: 'death', from: ev.tick, to: ev.tick, payload: ev });
    }
  }

  if (!eventFilter.length || eventFilter.includes('connect')) {
    const items = filterByRange(
      wave.player_events.connection_log,
      ({ tick }, needle) => tick - needle,
      tick - 1000,
      tick
    );

    for (const ev of items) {
      if (userFilter.length && !userFilter.includes(ev.user_index)) {
        continue;
      }

      events.push({ type: 'connect', from: ev.tick, to: ev.tick, payload: ev });
    }
  }

  if (!eventFilter.length || eventFilter.includes('husk_r')) {
    const items = filterByRange(
      wave.player_events.husk_rages,
      ({ tick }, needle) => tick - needle,
      tick - 1000,
      tick
    );

    let count = 1;

    for (let i = 0; i < items.length; i++) {
      const ev = items[i];

      if (userFilter.length && !userFilter.includes(ev.user_index)) {
        continue;
      }

      const common: Omit<HuskRageEvent, 'payload'> = {
        type: 'husk_r',
        from: ev.tick,
        to: ev.tick,
      };

      if (i === items.length - 1) {
        events.push({
          ...common,
          payload: { user_index: ev.user_index, tick: ev.tick, count },
        });

        break;
      }

      const next = items[i + 1];

      if (ev.tick === next.tick && ev.user_index === next.user_index) {
        count += 1;
        continue;
      }

      events.push({
        ...common,
        payload: { user_index: ev.user_index, tick: ev.tick, count },
      });

      count = 1;
    }
  }

  if (!eventFilter.length || eventFilter.includes('zedtime')) {
    const items = filterByRange(
      wave.zedtimes,
      ({ meta_data: { start_tick, end_tick } }, needle) => {
        if (needle >= start_tick && needle <= end_tick) return 0;

        return needle < start_tick ? 1 : -1;
      },
      tick - 1000,
      tick
    );

    for (const ev of items) {
      events.push({
        type: 'zedtime',
        from: ev.meta_data.start_tick,
        to: ev.meta_data.end_tick,
        payload: ev,
      });
    }
  }

  return events.toSorted((a, b) => {
    if (a.to !== b.to) return a.to - b.to;

    return b.to - a.from;
  });
}

export function prepareMajorEventsData(
  currentTick: number,
  wave: DemoRecordAnalysisWave | undefined
): MajorEventsData {
  const res: MajorEventsData = {
    zedsLeft: 0,
  };

  if (!wave) return res;

  if (wave.zeds_left && wave.zeds_left.length) {
    const idx = findLastLowerIndex(
      wave.zeds_left,
      ({ tick }, needle) => tick - needle,
      currentTick
    );
    const item = wave.zeds_left[Math.max(0, idx)];

    res.zedsLeft = item.zeds_left;
  }

  return res;
}
