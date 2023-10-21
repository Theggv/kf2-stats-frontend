import type { PaginationRequest, PaginationResponse } from '../common';
import type {
  CDGameData,
  Difficulty,
  GameData,
  Length,
  Mode,
  Status,
} from '../sessions';

export interface MatchSession {
  session_id: number;
  server_id: number;
  map_id: number;
  mode: Mode;
  length: Length;
  diff: Difficulty;
  status: Status;
  created_at: string;
  updated_at: string;
  started_at: string;
  completed_at: string;
}

export interface MatchMap {
  name: string;
  preview: string;
}

export interface MatchServer {
  name: string;
  address: string;
}

export interface MatchData {
  session: MatchSession;
  map: MatchMap;
  server: MatchServer;
  game_data: GameData;
  cd_data: CDGameData;
}

export interface FilterMatchesRequest {
  server_id: number[];
  map_id: number[];

  mode: Mode;
  length: Length;
  diff: Difficulty;
  status: Status;

  include_server?: boolean;
  include_map?: boolean;
  include_game_data?: boolean;
  include_cd_data?: boolean;

  reverse_order?: boolean;
  pager: PaginationRequest;
}

export interface FilterMatchesResponse {
  items: MatchData[];
  metadata: PaginationResponse;
}
