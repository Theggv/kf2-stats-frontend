import type { SessionMetadata } from '../analytics';
import type { PaginationRequest, PaginationResponse } from '../common';
import type {
  ExtraGameData,
  GameDifficulty,
  GameLength,
  GameMode,
  GameStatus,
} from '../sessions';

export interface ServerData {
  id: number;
  name: string;
  address: string;
}

export interface AddServerRequest {
  name: string;
  address: string;
}

export interface AddServerResponse {
  id: number;
}

export interface GetByPatternResponse {
  items: ServerData[];
}

export interface UpdateNameRequest {
  id: number;
  name: string;
}

export interface RecentUsersRequest {
  server_id: number;
  pager: PaginationRequest;
}

export interface RecentUsersResponseUserSession {
  id: number;
  mode: GameMode;
  length: GameLength;
  diff: GameDifficulty;
  status: GameStatus;
  cd_data?: ExtraGameData;
  map_name: string;
  perks: number[];
  wave: number;

  metadata: SessionMetadata;
}

export interface RecentUsersResponseUser {
  id: number;
  name: string;
  profile_url?: string;
  avatar?: string;
  session: RecentUsersResponseUserSession;
  updated_at: string;
}

export interface RecentUsersResponse {
  items: RecentUsersResponseUser[];
  metadata: PaginationResponse;
}

export interface ServerLastSessionResponse {
  id: number;
  status: GameStatus;
}
