export enum TimePeriod {
  Hour = 1,
  Day,
  Week,
  Month,
  Year,
  Date,
  DateHour,
}

export interface PeriodData {
  period: string;

  value: number;
  prev: number;
  diff: number;
  max_value: number;
  trend: number;
}
