import type { Perk } from '$lib/api/matches';

export enum LeaderBoardType {
  TotalGames = 1,
  TotalDeaths,
  Accuracy,
  HsAccuracy,
  TotalDamage,
  MostDamage,
  TotalKills,
  TotalLargeKills,
  TotalHuskRages,
  TotalHeals,
  AverageZedtime,
  TotalPlaytime,
}

export interface LeaderBoardsRequest {
  type: LeaderBoardType;
  perk?: Perk;

  date_from: Date;
  date_to: Date;
}

export interface MostDamageMatch {
  session_id: number;
  value: number;
}

export interface LeaderBoardsResponseItem {
  id: number;
  name: string;

  profile_url?: string;
  avatar?: string;

  total_games: number;
  total_deaths: number;

  accuracy: number;
  hs_accuracy: number;

  total_damage: number;
  most_damage: MostDamageMatch;

  total_kills: number;
  total_large_kills: number;
  total_husk_rages: number;

  total_heals: number;
  avg_zt: number;
  total_playtime: number;
}

export interface LeaderBoardsResponse {
  items: LeaderBoardsResponseItem[];
}
