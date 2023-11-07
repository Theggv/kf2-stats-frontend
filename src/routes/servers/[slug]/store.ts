import type { SvelteComponent } from 'svelte';
import RecentMatches from './RecentMatches.svelte';
import AnalyticsContainer from './AnalyticsContainer.svelte';
import { TimePeriod, type PeriodData } from '$lib/api/analytics';
import { padStart } from 'lodash';

type TabData = {
  options?: string[];
  href: string;
  content: string;
  component?: typeof SvelteComponent<{ serverId: number }>;
};

export const tabs: TabData[] = [
  {
    options: ['', '#recent'],
    href: '#recent',
    content: 'Recent matches',
    component: RecentMatches,
  },
  {
    href: '#stats',
    content: 'Server stats',
    component: AnalyticsContainer,
  },
];

export const isTabSelected = (current: string, tab: TabData) =>
  tab.href === current || tab.options?.includes(current);

export function normalizeData(
  from: Date,
  to: Date,
  period: TimePeriod,
  data: PeriodData[]
): (PeriodData & { label: string })[] {
  switch (period) {
    case TimePeriod.Hour:
      return normalizeDataByHour(data);
    case TimePeriod.Day:
      return normalizeDataByDay(from, to, data);
    case TimePeriod.Week:
      return normalizeDataByWeek(from, data);
    case TimePeriod.Month:
      return normalizeDataByMonth(data);
    case TimePeriod.Year:
      return data.map((x) => ({ ...x, label: x.period }));
  }
}

function normalizeDataByHour(data: PeriodData[]) {
  if (!data.length) return [];

  const map = new Map<string, PeriodData & { label: string }>();
  const offset = -Math.round(new Date().getTimezoneOffset() / 60);

  for (let i = 0; i < 24; i++) {
    const key = padStart(`${i}`, 2, '0');
    map.set(key, { count: 0, period: key, label: `${key}:00` });
  }

  for (const item of data) {
    const hour = Number(item.period);
    let key = padStart(`${(hour + offset) % 24}`, 2, '0');
    map.set(key, { ...map.get(key)!, count: item.count });
  }

  return [...map.values()];
}

function normalizeDataByDay(from: Date, to: Date, data: PeriodData[]) {
  const map = new Map<string, PeriodData & { label: string }>();

  for (let i = 1; i <= to.getDate(); i++) {
    const key = i.toString();
    map.set(key, {
      count: 0,
      period: key,
      label: `${key} ${from.toLocaleString('default', { month: 'long' })}`,
    });
  }

  for (const item of data) {
    const key = Number(item.period).toString();
    map.set(key, { ...map.get(key)!, count: item.count });
  }

  return [...map.values()];
}

function normalizeDataByWeek(from: Date, data: PeriodData[]) {
  const map = new Map<string, PeriodData & { label: string }>();
  const day = 86400 * 1000;

  for (let i = 0; i < 7; i++) {
    const dayOfWeek = new Date(from.getTime() + i * day);
    const key = dayOfWeek.getUTCDate().toString();
    map.set(key, {
      count: 0,
      period: key,
      label: dayOfWeek.toLocaleString('default', {
        month: 'long',
        day: 'numeric',
      }),
    });
  }

  for (const item of data) {
    const key = Number(item.period).toString();
    map.set(key, { ...map.get(key)!, count: item.count });
  }

  return [...map.values()];
}

function normalizeDataByMonth(data: PeriodData[]) {
  const map = new Map<string, PeriodData & { label: string }>();
  const now = new Date();

  for (let i = 1; i <= 12; i++) {
    const date = new Date(now.getUTCFullYear(), i, 0, 0, 0, 0);
    const key = padStart(`${i}`, 2, '0');
    map.set(key, {
      count: 0,
      period: key,
      label: date.toLocaleString('default', { month: 'long' }),
    });
  }

  for (const item of data) {
    const key = Number(item.period).toString();
    map.set(key, { ...map.get(key)!, count: item.count });
  }

  return [...map.values()];
}
