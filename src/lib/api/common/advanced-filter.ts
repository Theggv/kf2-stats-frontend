export enum AdvancedFilterOp {
  Eq = 1,
  NotEq,
  Gt,
  Gte,
  Lt,
  Lte,
  In,
  NotIn,
  Between,
}

export interface AdvancedFilter {
  operator: AdvancedFilterOp;
  args: number[];
}
