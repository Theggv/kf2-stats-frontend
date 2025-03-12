import { pad } from '$lib/util';

export function tickToTime(tick: number, withMs?: boolean) {
  const hours = Math.floor(tick / 360000);
  const minutes = Math.floor((tick - hours * 360000) / 6000);
  const seconds = Math.floor((tick - hours * 360000 - minutes * 6000) / 100);

  let str = '';

  if (hours > 0) str += `${hours}:${pad(minutes)}`;
  else str += `${minutes}`;

  str += `:${pad(seconds)}`;

  if (withMs) str += `.${pad(Math.floor(tick % 100))}`;

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

export function findFirstGreaterIndex<T>(
  data: T[],
  predicate: (item: T, needle: number) => number,
  needle: number
) {
  if (!data.length) return -1;

  let lo = 0;
  let hi = data.length - 1;
  let mid = 0;

  while (lo <= hi) {
    mid = (lo + hi) >> 1;
    const condition = predicate(data[mid], needle);

    if (!condition) {
      for (let i = mid - 1; i >= lo; i--) {
        if (!predicate(data[i], needle)) mid = i;
        else break;
      }

      return mid;
    } else if (condition < 0) lo = mid + 1;
    else hi = mid - 1;
  }

  if (lo >= data.length) return -1;

  return lo;
}

export function findLastLowerIndex<T>(
  data: T[],
  predicate: (item: T, needle: number) => number,
  needle: number
) {
  if (!data.length) return -1;

  let lo = 0;
  let hi = data.length - 1;
  let mid = 0;

  while (lo <= hi) {
    mid = (lo + hi) >> 1;
    const condition = predicate(data[mid], needle);

    if (!condition) {
      for (let i = mid + 1; i <= hi; i++) {
        if (!predicate(data[i], needle)) mid = i;
        else break;
      }

      return mid;
    } else if (condition < 0) lo = mid + 1;
    else hi = mid - 1;
  }

  return hi;
}

export function findRangeIndex<T>(
  data: T[],
  predicate: (item: T, needle: number) => number,
  from: number,
  to: number
) {
  return {
    start: findFirstGreaterIndex(data, predicate, from),
    end: findLastLowerIndex(data, predicate, to),
  };
}

export function filterByRange<T>(
  data: T[],
  predicate: (item: T, needle: number) => number,
  from: number,
  to: number
) {
  const range = findRangeIndex(data, predicate, from, to);

  if (range.start < 0 || range.end < 0) return [];

  return data.slice(range.start, range.end + 1);
}
