import type { Difficulty, Status } from '$lib/api/sessions';
import type { PeriodData, TimePeriod } from '../dto';

export interface SessionOnlineRequest {
  server_id?: number;

  date_from?: Date;
  date_to?: Date;

  period: TimePeriod;
}

export interface SessionOnlineResponse {
  items: PeriodData[];
}

export interface UsageInMinutesRequest {
  server_id: number;

  date_from?: Date;
  date_to?: Date;

  period: TimePeriod;
}

export interface UsageInMinutesResponse {
  items: PeriodData[];
}

export interface PlayersOnlineRequest {
  server_id?: number;

  date_from?: Date;
  date_to?: Date;

  period: TimePeriod;
}

export interface PlayersOnlineResponse {
  items: PeriodData[];
}

export interface PopularServersResponseItem {
  id: number;
  name: string;
  diff: Difficulty;

  total_sessions: number;
  total_users: number;
}

export interface PopularServersResponse {
  items: PopularServersResponseItem[];
}

export interface TotalOnlineResponse {
  count: number;
}

export interface SessionCountHistRequest {
  server_id: number;

  date_from?: Date;
  date_to?: Date;

  map_ids?: number[];
  statuses?: Status[];

  spawn_cycle?: string;
  zeds_type?: string;
  min_wave?: number;
  max_monsters?: number;
}
