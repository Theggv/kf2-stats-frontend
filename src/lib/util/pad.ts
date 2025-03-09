export function pad(num: number, size: number = 2) {
  const str = '00000000' + num;
  return str.substring(str.length - size);
}
