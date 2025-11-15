export enum GameMode {
  Any = 0,
  Survival,
  Endless,
  ControlledDifficulty,
  Weekly,
  Objective,
  Versus,
}

export enum GameLength {
  Short = 4,
  Medium = 7,
  Long = 10,
  Custom = -1,
}

export enum GameDifficulty {
  Normal = 1,
  Hard,
  Suicidal,
  HellOnEarth,
}

export enum GameStatus {
  Lobby = 0,
  InProgress,
  Win,
  Lose,
  Solomode,
  Aborted = -1,
}

export interface SessionMap {
  name: string;
  preview: string;
}

export interface SessionServer {
  name: string;
  address: string;
}

export interface SessionData {
  id: number;
  server_id: number;
  map_id: number;

  mode: GameMode;
  length: GameLength;
  diff: GameDifficulty;

  status: GameStatus;

  created_at: string;
  updated_at: string;

  map?: SessionMap;
  server?: SessionServer;
}

export interface CreateSessionRequest {
  server_id: number;
  map_id: number;

  mode: GameMode;
  length: GameLength;
  diff: GameDifficulty;
}

export interface CreateSessionResponse {
  id: number;
}

export interface UpdateStatusRequest {
  id: number;
  status: number;
}

export interface GameData {
  max_players: number;
  players_online: number;
  players_alive: number;
  wave: number;
  is_trader_time: boolean;
  zeds_left: number;
}

export interface ExtraGameData {
  spawn_cycle: string;
  max_monsters: number;
  wave_size_fakes: number;
  zeds_type: string;
}
