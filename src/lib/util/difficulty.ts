import type { GetSessionDifficultyResponse } from '$lib/api/sessions/difficulty';

export function getMatchDifficulty(
  diff?: GetSessionDifficultyResponse
): number {
  let num = diff?.summary.final_score || 0;

  return Math.pow(num, 2);
}
