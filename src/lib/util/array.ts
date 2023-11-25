export function groupBy<TData, TKey>(
  data: TData[],
  keyFunction: (item: TData) => TKey
): Map<TKey, TData[]> {
  if (!data) return new Map();

  return data.reduce((map, item) => {
    const key = keyFunction(item);

    if (map.has(key)) map.get(key)!.push(item);
    else map.set(key, [item]);

    return map;
  }, new Map<TKey, TData[]>());
}
