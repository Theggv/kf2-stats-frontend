import { dateDiff } from '$lib/util/date';
import { writable } from 'svelte/store';

export function getTimeSince() {
  const from = writable<Date>();
  const data = writable<string>();

  let fromDate: Date;

  from.subscribe(($from) => {
    fromDate = $from;
    if (fromDate) data.set(dateDiff(fromDate, new Date()));
  });

  const interval = setInterval(() => {
    if (!fromDate) return;

    data.set(dateDiff(fromDate, new Date()));
  }, 1000);

  return { from, data, interval };
}
