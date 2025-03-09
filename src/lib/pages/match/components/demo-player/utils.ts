import { pad } from '$lib/util';

export function tickToTime(tick: number, withMs?: boolean) {
  const minutes = Math.floor(tick / 6000);
  const seconds = Math.floor((tick - minutes * 6000) / 100);

  let str = `${pad(minutes)}:${pad(seconds)}`;

  if (withMs) str += `:${pad(Math.floor(tick % 100))}`;

  return str;
}

export function getZedName(zed: number) {
  if (zed < 0) return 'Custom Zed';

  const names = [
    'Custom Zed',
    'Cyst',
    'Alpha Clot',
    'Slasher',
    'Crawler',
    'Gorefast',
    'Stalker',
    'Scrake',
    'Fleshpound',
    'QuarterPound',
    'Bloat',
    'Siren',
    'Husk',
    'Rioter',
    'Alpha Crawler',
    'Gorefiled',
    'DAR_Emp',
    'DAR_Laser',
    'DAR_Rocket',
    'Hans',
    'Patriarch',
    'King Fleshpound',
    'Abomination',
    'Matriarch',
  ];

  return names[zed];
}
