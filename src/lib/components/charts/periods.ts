import { TimePeriod } from '$lib/api/analytics';

export type Period = {
  id: string;
  label: string;
  date_from?: Date;
  date_to?: Date;
  period: TimePeriod;
  chartData?: any;
};

export const periods: Period[] = [
  {
    id: 'all',
    label: 'Yearly',
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
    label: 'Monthly',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18250),
    date_to: new Date(),
    period: TimePeriod.Month,
    chartData: {
      unit: 'month',
      tooltipFormat: 'MMMM, yyyy',
      displayFormats: {
        month: 'MMM, yyyy',
      },
    },
  },
  {
    id: '3-month',
    label: 'Last 90 Days',
    date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    date_to: new Date(),
    period: TimePeriod.Date,
    chartData: {
      unit: 'week',
      tooltipFormat: 'd MMM, yyyy',
      displayFormats: {
        week: 'd MMM, yyyy',
      },
    },
  },
  {
    id: 'week',
    label: 'By Hour',
    date_from: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 90 - 1000 * 60 * 60 * 24 * 7
    ),
    date_to: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
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
