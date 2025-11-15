import { GameMode, GameStatus, type SessionData } from '$lib/api/sessions';

export function getWaveText(
  wave: number,
  session: Pick<SessionData, 'mode' | 'length' | 'status'>
): string {
  if (session.status === GameStatus.Lobby || wave <= 0) return '-';
  if (session.mode === GameMode.Endless) return `Wave ${wave}`;

  return `${wave} / ${session.length}`;
}
