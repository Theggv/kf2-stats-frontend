type TimePeriod = {
  label: string;
  date_from: Date;
  date_to: Date;
};

export const periods: TimePeriod[] = [
  {
    label: 'All Time',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3650),
    date_to: new Date(),
  },
  {
    label: '3 Months',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    date_to: new Date(),
  },
  {
    label: 'Month',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    date_to: new Date(),
  },
];
