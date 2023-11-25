export function shortenNumber(num: number): string {
  if (num >= 1000000000) return `${Math.round(num / 1000000000)}B`;
  if (num >= 1000000) return `${Math.round(num / 1000000)}M`;
  if (num >= 10000) return `${Math.round(num / 1000)}K`;

  return num.toFixed(0);
}
