import type { MatchWavePlayerStats } from '../matches';

export interface ZedCounter {
  cyst: number;
  alpha_clot: number;
  slasher: number;
  stalker: number;
  crawler: number;
  gorefast: number;
  rioter: number;
  elite_crawler: number;
  gorefiend: number;

  siren: number;
  bloat: number;
  edar: number;
  husk: number;

  scrake: number;
  fp: number;
  qp: number;
  boss: number;
}

export type ZedGroups = {
  trash: number;
  medium: number;
  large: number;
  boss: number;
  total: number;
};

export function groupZeds(stats: MatchWavePlayerStats): ZedGroups {
  const groups = {
    trash:
      stats.kills.cyst +
      stats.kills.alpha_clot +
      stats.kills.slasher +
      stats.kills.stalker +
      stats.kills.crawler +
      stats.kills.gorefast +
      stats.kills.rioter +
      stats.kills.elite_crawler +
      stats.kills.gorefiend,
    medium:
      stats.kills.siren +
      stats.kills.bloat +
      stats.kills.edar +
      stats.kills.husk +
      stats.husk_b,
    large: stats.kills.scrake + stats.kills.fp + stats.kills.qp,
    boss: stats.kills.boss,
  };

  return {
    ...groups,
    total: groups.trash + groups.medium + groups.large + groups.boss,
  };
}
