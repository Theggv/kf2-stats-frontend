export type Treshhold<T extends { period: string }> = {
  title: string;
  evaluate: (value: T) => number;
  tooltip: (date: Date, value?: T) => number | string;
  values: number[];
  colors: string[];
};
