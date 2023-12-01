import { periods } from '$lib/components/charts';

export const periodsWithoutWeek = periods.filter((x) => x.id !== 'week');

export const serverUsagePeriods = periods.filter((x) =>
  ['3-month', 'month'].includes(x.id)
);

export const popularMapsPeriods = periods.filter((x) =>
  ['all', '3-month', 'month'].includes(x.id)
);
