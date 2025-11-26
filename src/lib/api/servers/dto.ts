import type {
  PaginationRequest,
  PaginationResponse,
  UserProfile,
} from '../common';
import type { Match } from '../matches';
import type { GameStatus } from '../sessions';

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

export interface RecentUsersResponseUser {
  user_profile: UserProfile;

  match: Match;
}

export interface RecentUsersResponse {
  items: RecentUsersResponseUser[];
  metadata: PaginationResponse;
}

export interface ServerLastSessionResponse {
  id: number;
  status: GameStatus;
}
