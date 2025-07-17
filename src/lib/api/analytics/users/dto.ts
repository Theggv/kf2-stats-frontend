import type { PaginationRequest, PaginationResponse } from '$lib/api/common';
import type { Perk } from '$lib/api/matches';
import type { Difficulty, Length, Mode, Status } from '$lib/api/sessions';
import type { TimePeriod } from '../dto';

export interface SessionData {
  id: number;
  mode: Mode;
  length: Length;
  diff: Difficulty;
  status: Status;
}

export interface ServerData {
  id: number;
  name: string;
}

export interface MapData {
  id: number;
  name: string;
}

export interface UserAnalyticsRequest {
  user_id: number;
  date_from?: Date;
  date_to?: Date;
}

export interface UserAnalyticsResponse {
  games: number;
  wins: number;
  minutes: number;
  kills: number;
  deaths: number;
}

export interface UserPerksAnalyticsRequest {
  user_id: number;
  date_from?: Date;
  date_to?: Date;
}

export interface UserPerksAnalyticsResponseItem {
  perk: Perk;
  games: number;
  wins: number;
  kills: number;
  large_kills: number;
  waves: number;
  deaths: number;
  accuracy: number;
  hs_accuracy: number;
  damage_dealt: number;
  damage_taken: number;
  heals_given: number;
  minutes: number;
}

export interface UserPerksAnalyticsResponse {
  avg_zt: number;
  items: UserPerksAnalyticsResponseItem[];
}

export interface UserPerkHistRequest {
  user_id: number;
  perk?: Perk;
  date_from?: Date;
  date_to?: Date;
  period: TimePeriod;
}

export interface AccuracyHistItem {
  period: string;
  accuracy: number;
  hs_accuracy: number;
}

export interface AccuracyHist {
  items: AccuracyHistItem[];
}

export interface PlayTimeHistItem {
  period: string;
  count: number;
  minutes: number;
}

export interface PlayTimeHist {
  items: PlayTimeHistItem[];
}

export interface GetTeammatesRequest {
  user_id: number;
  pager: PaginationRequest;
}

export interface GetTeammatesResponseItem {
  id: number;
  name: string;
  profile_url?: string;
  avatar?: string;
  games: number;
  wins: number;
}

export interface GetTeammatesResponse {
  items: GetTeammatesResponseItem[];
}

export interface GetPlayedMapsRequest {
  user_id: number;
  search_text?: string;

  perks?: number[];
  server_ids?: number[];

  date_from?: Date;
  date_to?: Date;
}

export interface GetPlayedMapsResponseItem {
  name: string;

  total_games: number;
  total_wins: number;

  last_played: string;
}

export interface GetPlayedMapsResponse {
  items: GetPlayedMapsResponseItem[];
}

export interface GetLastSeenUsersRequest {
  user_id: number;

  perks?: number[];
  server_ids?: number[];

  date_from?: Date;
  date_to?: Date;

  pager: PaginationRequest;
}

export interface GetLastSeenUsersResponseItem {
  id: number;
  name: string;

  profile_url: string;
  avatar: string;

  session: SessionData;
  server: ServerData;
  map: MapData;

  perks: number[];

  last_seen: string;
}

export interface GetLastSeenUsersResponse {
  items: GetLastSeenUsersResponseItem[];
  metadata: PaginationResponse;
}

export interface GetLastSessionsWithUserRequest {
  user_id: number;
  other_user_id: number;

  perks?: number[];
  server_ids?: number[];

  date_from?: Date;
  date_to?: Date;

  pager: PaginationRequest;
}

export interface GetLastSessionsWithUserResponseItem {
  session: SessionData;
  server: ServerData;
  map: MapData;

  perks: number[];

  last_seen: string;
}

export interface GetLastSessionsWithUserResponse {
  items: GetLastSessionsWithUserResponseItem[];
  metadata: PaginationResponse;
}
