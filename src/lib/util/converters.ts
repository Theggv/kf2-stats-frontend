import { Mode, Status, type SessionData } from '$lib/api/sessions';

export function getWaveText(
  wave: number,
  session: Pick<SessionData, 'mode' | 'length' | 'status'>
): string {
  if (session.status === Status.Lobby || wave <= 0) return '-';
  if (session.mode === Mode.Endless) return `Wave ${wave}`;

  return `${wave} / ${session.length}`;
}
