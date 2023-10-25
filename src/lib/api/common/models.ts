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

export function groupZeds(zeds: ZedCounter) {
  return {
    trash:
      zeds.cyst +
      zeds.alpha_clot +
      zeds.slasher +
      zeds.stalker +
      zeds.crawler +
      zeds.gorefast +
      zeds.rioter +
      zeds.elite_crawler +
      zeds.gorefiend,
    medium: zeds.siren + zeds.bloat + zeds.edar + zeds.husk,
    large: zeds.scrake + zeds.fp + zeds.qp,
    boss: zeds.boss,
  };
}
