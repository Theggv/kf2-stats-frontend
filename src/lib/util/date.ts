import { pad } from './pad';

export function dateDiff(from: Date, to: Date): string {
  const totalSeconds = (to.getTime() - from.getTime()) / 1000;
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function formatDate(str: string) {
  return new Date(str).toLocaleString('en', {
    day: 'numeric',
    month: 'long',
    year:
      new Date(str).getFullYear() !== new Date().getFullYear()
        ? 'numeric'
        : undefined,
  });
}

export function getTimeSinceNow(date: Date, shorten: boolean = false) {
  type DateFormat = {
    short: (value: number) => string;
    long: (value: number) => string;
  };

  const formatter: { [T in string]: DateFormat } = {
    second: {
      long: (value) => `${Math.round(value)} seconds ago`,
      short: (value) => `${Math.round(value)}s ago`,
    },
    minute: {
      long: (value) => `${Math.round(value / 60)} minutes ago`,
      short: (value) => `${Math.round(value / 60)}m ago`,
    },
    hour: {
      long: (value) => `${Math.round(value / 3600)} hours ago`,
      short: (value) => `${Math.round(value / 3600)}h ago`,
    },
    day: {
      long: (value) => `${Math.round(value / 86400)} days ago`,
      short: (value) => `${Math.round(value / 86400)}d ago`,
    },
  };

  const format = shorten ? 'short' : 'long';

  const diff = (Date.now() - date.getTime()) / 1000;

  if (diff < 60) return formatter.second[format](diff);
  if (diff < 60 * 60) return formatter.minute[format](diff);
  if (diff < 3600 * 48) return formatter.hour[format](diff);

  return formatter.day[format](diff);
}

export function getDayNames(
  locale: string = 'default',
  type: 'long' | 'short' | 'narrow' = 'short'
) {
  return new Array(7)
    .fill(0)
    .map((_, i) => new Date(Date.now() - 1000 * 60 * 60 * 24 * i))
    .map((x) => ({
      index: x.getDay(),
      name: x.toLocaleString(locale, { weekday: type }),
    }))
    .sort((a, b) => a.index - b.index)
    .map((x) => x.name.charAt(0).toUpperCase() + x.name.slice(1));
}

export function getMonthNames(
  locale: string = 'default',
  type: 'long' | 'short' | 'narrow' = 'short'
) {
  return new Array(12)
    .fill(0)
    .map(
      (_, i) =>
        new Date(1000 * 60 * 60 * 24 * 15 + 1000 * 60 * 60 * 24 * 30 * i)
    )
    .map((x) => ({
      index: x.getMonth(),
      name: x.toLocaleString(locale, { month: type }),
    }))
    .sort((a, b) => a.index - b.index)
    .map((x) => x.name.replaceAll('.', ''))
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1));
}
