import type { PaginationRequest, PaginationResponse } from '../common';
import type { CDGameData, Difficulty, Length, Mode, Status } from '../sessions';

export enum AuthType {
  Steam = 1,
  EGS = 2,
}

export interface UserData {
  id: number;
  auth_id: number;
  auth_type: AuthType;

  name: string;
}

export interface UserNameHistory {
  user_id: number;
  name: string;
  updated_at: string;
}

export interface CreateUserRequest {
  auth_id: string;
  type: AuthType;

  name: string;
}

export interface CreateUserResponse {
  id: number;
}

export interface FilterUsersRequest {
  search_text?: string;

  pager?: PaginationRequest;
}

export interface FilterUsersResponseUserSession {
  id: number;
  mode: Mode;
  length: Length;
  diff: Difficulty;
  status: Status;
  wave: number;
  cd_data?: CDGameData;
  server_name: string;
  map_name: string;
}

export interface FilterUsersResponseUser {
  id: number;
  name: string;
  profile_url: string;
  avatar: string;
  last_session?: FilterUsersResponseUserSession;
  current_session?: FilterUsersResponseUserSession;
  updated_at: string;
}

export interface FilterUsersResponse {
  items: FilterUsersResponseUser[];
  metadata: PaginationResponse;
}

export interface RecentSessionsRequest {
  user_id: number;
  pager: PaginationRequest;
}

export interface RecentSessionsResponseSessionServer {
  id: number;
  name: string;
}

export interface RecentSessionsResponseSession {
  id: number;
  mode: Mode;
  length: Length;
  diff: Difficulty;
  status: Status;
  wave: number;
  cd_data?: CDGameData;
  map_name: Status;
  server: RecentSessionsResponseSessionServer;
  perks: number[];
  updated_at: Date;
}

export interface RecentSessionsResponse {
  items: RecentSessionsResponseSession[];
  metadata: PaginationResponse;
}
