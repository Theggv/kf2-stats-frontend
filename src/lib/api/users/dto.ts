import type { PaginationRequest, PaginationResponse } from '../common';
import type {
  ExtraGameData,
  Difficulty,
  Length,
  Mode,
  Status,
} from '../sessions';

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
  cd_data?: ExtraGameData;
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
