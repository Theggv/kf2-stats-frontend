import type { PlayTimeHistItem } from '$lib/api/analytics';
import type { Treshhold } from '$lib/components/activity-calendar';

export const treshholds: Treshhold<PlayTimeHistItem>[] = [
  {
    title: 'Playtime, hrs',
    evaluate: (value) => Math.round(value.minutes / 60),
    tooltip: (date, value) => `
      <div>
        <sub><b>${date.toDateString()}</b></sub>
        <div>Playtime: <b>${value?.minutes ?? 0}</b> minutes</div>
      </div`,
    values: [0, 1, 2, 3, 4],
    colors: [
      'rgba(200, 200, 250, 0.15)',
      'rgba(100, 180, 100, 0.4)',
      'rgba(100, 180, 100, 0.6)',
      'rgba(100, 180, 100, 0.8)',
      'rgba(180, 180, 100, 1)',
    ],
  },
  {
    title: 'Matches',
    evaluate: (value) => value.count,
    tooltip: (date, value) => `
      <div>
        <sub><b>${date.toDateString()}</b></sub>
        <div>Matches: <b>${value?.count ?? 0}</b></div>
      </div`,
    values: [0, 3, 6, 9, 12],
    colors: [
      'rgba(200, 200, 250, 0.15)',
      'rgba(200, 110, 110, 0.4)',
      'rgba(200, 110, 110, 0.6)',
      'rgba(200, 110, 110, 0.8)',
      'rgba(200, 110, 110, 1)',
    ],
  },
];
