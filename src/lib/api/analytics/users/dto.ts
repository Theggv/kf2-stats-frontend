import type { Perk } from '$lib/api/matches';
import type { TimePeriod } from '../dto';

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
  limit?: number;
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
