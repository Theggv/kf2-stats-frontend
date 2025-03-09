import { groupZeds, type UserProfile } from '$lib/api/common';
import {
  type GetMatchLiveDataResponse,
  type MatchData,
  type MatchWave,
  type MatchWavePlayerStats,
  MatchesApiService,
} from '$lib/api/matches';
import { Status } from '$lib/api/sessions';
import { debounce } from '$lib/util';
import { tweened } from 'svelte/motion';
import { derived, get, writable, type Readable } from 'svelte/store';
import type { WithRequired } from '$lib/util/types';
import {
  DemoApiService,
  type DemoRecordAnalysis,
} from '$lib/api/sessions/demo';

export type Match = WithRequired<MatchData, 'game_data' | 'map' | 'server'>;

function isMatchLive(status?: Status) {
  return status === Status.Lobby || status === Status.InProgress;
}

export type ContextType = ReturnType<typeof getMatchStore>;
export const ContextName = 'match-store';

export function getMatchStore() {
  const matchId = writable<number>();

  const loading = writable(false);
  const error = writable<unknown>(false);
  const overview = writable<Match | null>(null);
  const waves = writable<MatchWave[]>([]);
  const users = writable<UserProfile[]>([]);
  const live = writable<GetMatchLiveDataResponse | null>(null);

  const demoStore = getDemoStore();
  const waveInputStore = getWaveInputStore(waves);

  let intervalId: number;

  const fetch = debounce(async () => {
    const id = get(matchId);
    loading.set(true);

    try {
      const status = await MatchesApiService.getById(id).then(({ data }) => {
        overview.set(data as Match);
        return data.session.status;
      });

      await MatchesApiService.getMatchWaves(id).then(({ data }) => {
        waves.set(data.waves.filter((wave) => wave.players?.length));
        users.set(data.users);
      });

      if (isMatchLive(status)) {
        intervalId = setTimeout(() => fetch(), 10000);

        await MatchesApiService.getMatchLive(id).then(({ data }) =>
          live.set(data)
        );
      } else {
        live.set(null);
      }
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  matchId.subscribe((id) => {
    if (!id) return;

    clearInterval(intervalId);
    fetch();
  });

  return {
    matchId,
    match: {
      overview,
      waves,
      users,
      live,
      loading,
      error,
    },
    demo: demoStore,
    waveInput: waveInputStore,
  };
}

export function getDemoStore() {
  const demo = writable<DemoRecordAnalysis | null>(null);
  const loading = writable(false);
  const error = writable<unknown>(false);

  const fetch = debounce(async (matchId: number) => {
    loading.set(true);

    try {
      const { data } = await DemoApiService.getById(matchId);

      demo.set(data);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  return { demo, loading, error, fetch };
}

export function getWaveInputStore(waves: Readable<MatchWave[]>) {
  const waveIdx = writable<number>(1);
  const wave = derived([waves, waveIdx], ([waves, index]) =>
    waves.at(index - 1)
  );

  const showOnlyCurrentWave = writable<boolean>(false);
  const maxWaves = derived([waves], ([waves]) => waves.length);

  waves.subscribe((waves) => waveIdx.set(waves.length));

  return { waveIdx, wave, maxWaves, showOnlyCurrentWave };
}

export function getSelectedUserStore() {
  const hover = writable<number>();
  const active = writable<number>();

  return { hover, active };
}

export function getWaveUserIds(
  selectedWave: Readable<MatchWave | undefined>,
  showOnlyCurrentWave: Readable<boolean>,
  waves: Readable<MatchWave[]>
) {
  return derived(
    [selectedWave, showOnlyCurrentWave, waves],
    ([selectedWave, showOnlyCurrentWave, waves]) => {
      if (!selectedWave || !waves.length) return [];

      if (showOnlyCurrentWave) {
        return (
          waves
            .find((wave) => wave.wave_id === selectedWave.wave_id)
            ?.players?.map((player) => player.user_id) || []
        );
      }

      return [
        ...waves
          .filter((wave) => wave.wave_id <= selectedWave.wave_id)
          .reduce((set, wave) => {
            wave.players?.forEach((player) => set.add(player.user_id));
            return set;
          }, new Set<number>()),
      ];
    }
  );
}

export function getWaveStatsStore() {
  const damage_dealt = tweened(0, { duration: 200 });
  const damage_taken = tweened(0, { duration: 200 });
  const heals_given = tweened(0, { duration: 200 });
  const heals_recv = tweened(0, { duration: 200 });
  const accuracy = tweened(0, { duration: 200 });
  const hsAccuracy = tweened(0, { duration: 200 });
  const headshots = tweened(0, { duration: 200 });
  const avgZTLength = tweened(0, { duration: 200 });
  const kills = {
    total: tweened(0, { duration: 200 }),
    scrake: tweened(0, { duration: 200 }),
    fp: tweened(0, { duration: 200 }),
    qp: tweened(0, { duration: 200 }),
    boss: tweened(0, { duration: 200 }),
    husk_n: tweened(0, { duration: 200 }),
    husk_b: tweened(0, { duration: 200 }),
    husk_r: tweened(0, { duration: 200 }),
  };

  function updateSingle(stats: MatchWavePlayerStats) {
    damage_dealt.set(stats.damage_dealt);
    damage_taken.set(stats.damage_taken);
    heals_given.set(stats.heals_given);
    heals_recv.set(stats.heals_recv);

    const zeds = groupZeds(stats);

    kills.total.set(zeds.total);
    kills.scrake.set(stats.kills.scrake);
    kills.fp.set(stats.kills.fp);
    kills.qp.set(stats.kills.qp);
    kills.boss.set(stats.kills.boss);
    kills.husk_n.set(stats.kills.husk);
    kills.husk_b.set(stats.husk_b);
    kills.husk_r.set(stats.husk_r);
    accuracy.set(stats.shots_fired ? stats.shots_hit / stats.shots_fired : 0);
    hsAccuracy.set(stats.shots_hit ? stats.shots_hs / stats.shots_hit : 0);
    headshots.set(stats.shots_hs);
    avgZTLength.set(
      stats.zedtime_count ? stats.zedtime_length / stats.zedtime_count : 0
    );
  }

  function updateMultiple(stats: MatchWavePlayerStats[]) {
    damage_dealt.set(stats.reduce((acc, x) => acc + x.damage_dealt, 0));
    damage_taken.set(stats.reduce((acc, x) => acc + x.damage_taken, 0));
    heals_given.set(stats.reduce((acc, x) => acc + x.heals_given, 0));
    heals_recv.set(stats.reduce((acc, x) => acc + x.heals_recv, 0));

    const zeds = stats.map(groupZeds).reduce(
      (acc, x) => {
        acc.trash += x.trash;
        acc.medium += x.medium;
        acc.large += x.large;
        acc.boss += x.boss;
        acc.total += x.total;

        return acc;
      },
      { trash: 0, medium: 0, large: 0, boss: 0, total: 0 }
    );

    kills.total.set(zeds.total);

    kills.scrake.set(stats.reduce((acc, x) => acc + x.kills.scrake, 0));
    kills.fp.set(stats.reduce((acc, x) => acc + x.kills.fp, 0));
    kills.qp.set(stats.reduce((acc, x) => acc + x.kills.qp, 0));
    kills.boss.set(stats.reduce((acc, x) => acc + x.kills.boss, 0));
    kills.husk_n.set(stats.reduce((acc, x) => acc + x.kills.husk, 0));
    kills.husk_b.set(stats.reduce((acc, x) => acc + x.husk_b, 0));
    kills.husk_r.set(stats.reduce((acc, x) => acc + x.husk_r, 0));

    const shots_fired = stats.reduce((acc, x) => acc + x.shots_fired, 0);
    const shots_hit = stats.reduce((acc, x) => acc + x.shots_hit, 0);
    const shots_hs = stats.reduce((acc, x) => acc + x.shots_hs, 0);

    accuracy.set(shots_fired ? shots_hit / shots_fired : 0);
    hsAccuracy.set(shots_hit ? shots_hs / shots_hit : 0);
    headshots.set(shots_hs);

    const zedtime_count = stats.reduce((acc, x) => acc + x.zedtime_count, 0);
    const zedtime_length = stats.reduce((acc, x) => acc + x.zedtime_length, 0);

    avgZTLength.set(zedtime_count ? zedtime_length / zedtime_count : 0);
  }

  return {
    damage_dealt,
    damage_taken,
    heals_given,
    heals_recv,
    accuracy,
    hsAccuracy,
    headshots,
    avgZTLength,
    kills,
    updateSingle,
    updateMultiple,
  };
}
