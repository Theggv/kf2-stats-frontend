import type { Treshhold } from '$lib/components/activity-calendar';
import type { ActivityType } from './Maps.store';

export const treshhold: Treshhold<ActivityType> = {
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
    'rgba(100, 180, 100, 0.4)',
    'rgba(100, 180, 100, 0.6)',
    'rgba(100, 180, 100, 0.8)',
    'rgba(180, 180, 100, 1)',
  ],
  altColors: [
    'rgba(200, 200, 200, 0.5)',
    'rgba(100, 180, 180, 0.25)',
    'rgba(100, 180, 180, 0.5)',
    'rgba(100, 180, 180, 0.75)',
    'rgba(100, 180, 180, 1)',
  ],
};
