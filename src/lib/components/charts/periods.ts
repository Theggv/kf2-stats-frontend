import { TimePeriod } from '$lib/api/analytics';

export type Period = {
  id: string;
  label: string;
  date_from: Date;
  date_to: Date;
  period: TimePeriod;
  chartData?: any;
};

export const periods: Period[] = [
  {
    id: 'all',
    label: 'All Time',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18250),
    date_to: new Date(),
    period: TimePeriod.Year,
    chartData: {
      unit: 'year',
      tooltipFormat: 'yyyy',
      displayFormats: {
        year: 'yyyy',
      },
    },
  },
  {
    id: 'year',
    label: 'Year',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
    date_to: new Date(),
    period: TimePeriod.Month,
    chartData: {
      unit: 'month',
      tooltipFormat: 'MMMM',
      displayFormats: {
        month: 'MMM, yyyy',
      },
    },
  },
  {
    id: '3-month',
    label: '3 Months',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    date_to: new Date(),
    period: TimePeriod.Date,
    chartData: {
      unit: 'week',
      tooltipFormat: 'd MMM',
      displayFormats: {
        week: 'd MMM, yyyy',
      },
    },
  },
  {
    id: 'month',
    label: 'Month',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    date_to: new Date(),
    period: TimePeriod.Date,
    chartData: {
      unit: 'week',
      tooltipFormat: 'd MMM',
      displayFormats: {
        week: 'd MMM, yyyy',
      },
    },
  },
  {
    id: 'week',
    label: 'Week',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    date_to: new Date(),
    period: TimePeriod.DateHour,
    chartData: {
      unit: 'day',
      tooltipFormat: 'd MMM HH:00',
      displayFormats: {
        day: 'd MMM',
      },
    },
  },
];
