import { groupZeds } from '$lib/api/common';
import { derived, writable } from 'svelte/store';

import type { DataSet } from './GraphsTab.util';
import type { UserWaveStats } from './util';

export function getSelecterUsersStore() {
  const selected = writable<number[]>([]);

  function toggle(userId: number) {
    selected.update((prev) => {
      if (prev.find((id) => id === userId)) {
        return prev.filter((id) => id !== userId);
      }

      return [...prev, userId];
    });
  }

  function clear() {
    selected.set([]);
  }

  return {
    selected: derived([selected], ([selected]) => [...selected]),
    toggle,
    clear,
  };
}

type GraphOptions = {
  title: string;
  selector: (wave: UserWaveStats | null) => number | undefined;
  formatter: (value: DataSet['values'][number]) => string;
};

function damageDealtSelector(wave: UserWaveStats | null): number | undefined {
  return wave?.stats.damage_dealt || undefined;
}

function largeKillsSelector(wave: UserWaveStats | null): number | undefined {
  if (!wave) return undefined;

  return groupZeds(wave.stats).large;
}

function totalKillsSelector(wave: UserWaveStats | null): number | undefined {
  if (!wave) return undefined;

  const groups = groupZeds(wave.stats);
  return groups.trash + groups.medium + groups.large + groups.boss;
}

function hsAccuracySelector(wave: UserWaveStats | null): number | undefined {
  if (!wave) return undefined;
  if (!wave.stats.shots_hs) return 0;
  return (wave.stats.shots_hs / wave.stats.shots_hit) * 100;
}

function healsGivenSelector(wave: UserWaveStats | null): number | undefined {
  if (!wave) return undefined;

  return wave.stats.heals_given;
}

export const graphOptions: GraphOptions[] = [
  {
    title: 'Damage Dealt',
    selector: damageDealtSelector,
    formatter: (value) => `${value.value}`,
  },
  {
    title: 'Large Kills',
    selector: largeKillsSelector,
    formatter: (value) => `${value.value}`,
  },
  {
    title: 'Total Kills',
    selector: totalKillsSelector,
    formatter: (value) => `${value.value}`,
  },
  {
    title: 'HS Accuracy',
    selector: hsAccuracySelector,
    formatter: (value) => `${value.value.toFixed(0)}%`,
  },
  {
    title: 'Heals Given',
    selector: healsGivenSelector,
    formatter: (value) => `${value.value}`,
  },
];
