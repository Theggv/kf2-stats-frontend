import type { Perk } from '$lib/api/matches';

export interface PerkStats {
  perk: Perk;
  count: number;
}

export interface PerksPlayTimeRequest {
  server_id?: number;
  user_id?: number;
  date_from?: Date;
  date_to?: Date;
}

export interface PerksPlayTimeResponse {
  items: PerkStats[];
}

export interface PerksKillsRequest {
  server_id?: number;
  user_id?: number;
  date_from?: Date;
  date_to?: Date;
}

export interface PerksKillsResponse {
  items: PerkStats[];
}
