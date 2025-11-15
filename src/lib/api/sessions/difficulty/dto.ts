import type { GameDifficulty, GameLength, GameMode, GameStatus } from '../dto';

export interface DifficultyCalculatorGameScore {
  avg_zeds_difficulty: number;
  stddev_zeds_difficulty: number;
  min_zeds_difficulty: number;
  max_zeds_difficulty: number;

  completion_p: number;
  restarts_penalty: number;

  potential_score: number;
  final_score: number;
}

export interface DifficultyCalculatorGameSession {
  id: number;
  server_id: number;
  map_id: number;

  mode: GameMode;
  status: GameStatus;
  length: GameLength;
  diff: GameDifficulty;
}

export interface DifficultyCalculatorGameWaveScore {
  zeds_difficulty: number;

  predicted_duration: number;
  predicted_duration_err: number;

  kiting_penalty: number;
  wave_size_penalty: number;
  total_players_penalty: number;

  score: number;
}

export interface DifficultyCalculatorGameWave {
  id: number;

  wave: number;
  attempt: number;

  duration: number;
  duration_realtime: number;

  total_players: number;
  total_deaths: number;

  zedtime_length: number;
  zedtime_count: number;

  max_monsters: number;
  spawn_cycle: string;
  zeds_type: string;

  total_zeds: number;
  medium_p: number;
  large_p: number;

  result?: DifficultyCalculatorGameWaveScore;
}

export interface DifficultyCalculatorGame {
  session: DifficultyCalculatorGameSession;
  waves: DifficultyCalculatorGameWave[];
  result?: DifficultyCalculatorGameScore;
}

export interface GetSessionDifficultyResponseWave {
  wave_id: number;

  zeds_difficulty: number;

  duration: number;
  predicted_duration: number;
  predicted_duration_err: number;

  kiting_penalty: number;
  wave_size_penalty: number;
  total_players_penalty: number;

  score: number;
}

export interface GetSessionDifficultyResponseSummary {
  avg_zeds_difficulty: number;
  map_bonus: number;

  completion_p: number;
  restarts_penalty: number;

  potential_score: number;
  final_score: number;
}

export interface GetSessionDifficultyResponse {
  session_id: number;

  summary: GetSessionDifficultyResponseSummary;
  waves: GetSessionDifficultyResponseWave[];
}
