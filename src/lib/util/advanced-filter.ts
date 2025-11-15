import { type AdvancedFilter, AdvancedFilterOp } from '$lib/api/common';

export function parseFilterExpr(expr: string): AdvancedFilter | undefined {
  expr = expr.trim();

  type OperationRegexp = {
    operator: AdvancedFilterOp;
    regexp: RegExp;
    toFilter: (expr: string) => AdvancedFilter;
  };

  const tests: OperationRegexp[] = [
    {
      operator: AdvancedFilterOp.Eq,
      regexp: /^(\d+)$/,
      toFilter: function (expr) {
        const matches = this.regexp.exec(expr)!;
        return { operator: this.operator, args: [parseInt(matches[1])] };
      },
    },
    {
      operator: AdvancedFilterOp.NotEq,
      regexp: /^!(\d+)$/,
      toFilter: function (expr) {
        const matches = this.regexp.exec(expr)!;
        return { operator: this.operator, args: [parseInt(matches[1])] };
      },
    },
    {
      operator: AdvancedFilterOp.Gt,
      regexp: /^>(\d+)$/,
      toFilter: function (expr) {
        const matches = this.regexp.exec(expr)!;
        return { operator: this.operator, args: [parseInt(matches[1])] };
      },
    },
    {
      operator: AdvancedFilterOp.Gte,
      regexp: /^>=(\d+)$/,
      toFilter: function (expr) {
        const matches = this.regexp.exec(expr)!;
        return { operator: this.operator, args: [parseInt(matches[1])] };
      },
    },
    {
      operator: AdvancedFilterOp.Lt,
      regexp: /^<(\d+)$/,
      toFilter: function (expr) {
        const matches = this.regexp.exec(expr)!;
        return { operator: this.operator, args: [parseInt(matches[1])] };
      },
    },
    {
      operator: AdvancedFilterOp.Lte,
      regexp: /^<=(\d+)$/,
      toFilter: function (expr) {
        const matches = this.regexp.exec(expr)!;
        return { operator: this.operator, args: [parseInt(matches[1])] };
      },
    },
    {
      operator: AdvancedFilterOp.In,
      regexp: /^\d+(?:[ \t]*,[ \t]*\d+)+$/,
      toFilter: function (expr) {
        return {
          operator: this.operator,
          args: expr.split(',').map((x) => parseInt(x.trim())),
        };
      },
    },
    {
      operator: AdvancedFilterOp.NotIn,
      regexp: /^!\d+(?:[ \t]*,[ \t]*\d+)+$/,
      toFilter: function (expr) {
        return {
          operator: this.operator,
          args: expr.split(',').map((x) => parseInt(x.trim())),
        };
      },
    },
    {
      operator: AdvancedFilterOp.Between,
      regexp: /^(\d+)\-(\d+)$/,
      toFilter: function (expr) {
        const matches = this.regexp.exec(expr)!;
        return {
          operator: this.operator,
          args: [parseInt(matches[1]), parseInt(matches[2])],
        };
      },
    },
  ];

  for (const item of tests) {
    if (item.regexp.test(expr)) return item.toFilter(expr);
  }

  return undefined;
}
