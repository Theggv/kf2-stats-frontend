import type { PaginationRequest, PaginationResponse } from '../common';
import type { MapData } from '../maps';
import type { ServerData } from '../servers';

export enum Mode {
  Any = 0,
  Survival,
  Endless,
  ControlledDifficulty,
}

export enum Length {
  Short = 4,
  Medium = 7,
  Long = 10,
  Custom = -1,
}

export enum Difficulty {
  Normal = 1,
  Hard,
  Suicidal,
  HellOnEarth,
}

export enum Status {
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

  mode: Mode;
  length: Length;
  diff: Difficulty;

  status: Status;

  created_at: string;
  updated_at: string;

  map?: SessionMap;
  server?: SessionServer;
}

export interface CreateSessionRequest {
  server_id: number;
  map_id: number;

  mode: Mode;
  length: Length;
  diff: Difficulty;
}

export interface CreateSessionResponse {
  id: number;
}

export interface FilterSessionsRequest {
  server_id: number[];
  map_id: number[];

  mode: Mode;
  length: Length;
  diff: Difficulty;

  include_server: boolean;
  include_map: boolean;

  pager: PaginationRequest;
}

export interface FilterSessionsResponse {
  items: SessionData[];
  metadata: PaginationResponse;
}

export interface UpdateStatusRequest {
  id: number;
  status: number;
}

export interface GameData {
  wave: number;
  is_trader_time: boolean;
  zeds_left: number;
  players_alive: number;
}

export interface CDGameData {
  spawn_cycle: string;
  max_monsters: number;
  wave_size_fakes: number;
  zeds_type: string;
}

export interface LiveMatch {
  session_id: number;

  mode: Mode;
  length: number;
  diff: Difficulty;

  map: MapData;
  server: ServerData;

  game_data: GameData;
  cd_data?: CDGameData;
}

export interface GetLiveMatchesResponse {
  items: LiveMatch[];
}
