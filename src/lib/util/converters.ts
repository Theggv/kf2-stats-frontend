import { Mode, type SessionData } from '$lib/api/sessions';

export function getWaveText(
  wave: number,
  session: Pick<SessionData, 'mode' | 'length'>
): string {
  if (session.mode === Mode.Endless) return `Wave ${wave}`;

  return `${wave} / ${session.length}`;
}
