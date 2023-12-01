import type { PaginationRequest, PaginationResponse } from '../common';
import type { CDGameData, Difficulty, Length, Mode, Status } from '../sessions';

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
  mode: Mode;
  length: Length;
  diff: Difficulty;
  status: Status;
  cd_data?: CDGameData;
  map_name: string;
  perks: number[];
  wave: number;
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
  status: Status;
}
