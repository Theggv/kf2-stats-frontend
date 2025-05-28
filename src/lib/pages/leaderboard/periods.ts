type TimePeriod = {
  label: string;
  initialPeriod: { from: Date; to: Date };
  allTime?: boolean;
  transform?: (
    from: Date,
    to: Date,
    previous: boolean
  ) => { from: Date; to: Date };
  format: (from: Date, to: Date) => string;
};

function getToday() {
  const now = new Date();
  now.setUTCMinutes(0);
  now.setUTCSeconds(0);
  now.setUTCMilliseconds(0);
  now.setUTCHours(0);

  return now;
}

function getSunday() {
  const now = getToday();
  const day = now.getDay();
  const diff = now.getDate() - day;

  return new Date(now.setDate(diff));
}

function getCurrentMonth() {
  const now = getToday();
  now.setDate(1);

  return now;
}

function getCurrentYear() {
  const now = getToday();
  now.setDate(1);
  now.setMonth(0);

  return now;
}

export const periods: TimePeriod[] = [
  {
    label: 'Weekly',
    initialPeriod: {
      from: getSunday(),
      to: getToday(),
    },
    transform(_from, _, previous) {
      const offset = previous ? -7 : 7;

      const from = new Date(new Date(_from).setDate(_from.getDate() + offset));
      const to = new Date(new Date(from).setDate(from.getDate() + 6));

      if (to > this.initialPeriod.to) return this.initialPeriod;

      return { from, to };
    },
    format(from, to) {
      return (
        from.toLocaleDateString('en', { dateStyle: 'medium' }) +
        ' — ' +
        to.toLocaleDateString('en', { dateStyle: 'medium' })
      );
    },
  },
  {
    label: 'Monthly',
    initialPeriod: {
      from: getCurrentMonth(),
      to: getToday(),
    },
    transform(_from, _, previous) {
      const offset = previous ? -1 : 1;

      const from = new Date(
        new Date(_from).setMonth(_from.getMonth() + offset)
      );
      const to = new Date(new Date(from).setMonth(from.getMonth() + 1));
      to.setDate(to.getDate() - 1);

      if (to > this.initialPeriod.to) return this.initialPeriod;

      return { from, to };
    },
    format(from) {
      return from.toLocaleDateString('en', { month: 'long', year: 'numeric' });
    },
  },
  {
    label: 'By Years',
    initialPeriod: {
      from: new Date(getCurrentYear()),
      to: getToday(),
    },
    transform(_from, _, previous) {
      const offset = previous ? -1 : 1;

      const from = new Date(
        new Date(_from).setFullYear(_from.getFullYear() + offset)
      );
      const to = new Date(new Date(from).setFullYear(from.getFullYear() + 1));
      to.setDate(to.getDate() - 1);

      if (to > this.initialPeriod.to) return this.initialPeriod;

      return { from, to };
    },
    format(from) {
      return from.toLocaleDateString('en', { year: 'numeric' });
    },
  },
  {
    label: 'All Time',
    initialPeriod: {
      from: new Date(
        getCurrentYear().setFullYear(getCurrentYear().getFullYear() - 50)
      ),
      to: getToday(),
    },
    allTime: true,
    format() {
      return '';
    },
  },
];
