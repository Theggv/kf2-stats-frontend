function pad(num: number, size: number = 2) {
  const str = '00000000' + num;
  return str.substring(str.length - size);
}

export function dateDiff(from: Date, to: Date): string {
  const totalSeconds = (to.getTime() - from.getTime()) / 1000;
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(minutes)}:${pad(seconds)}`;
}
