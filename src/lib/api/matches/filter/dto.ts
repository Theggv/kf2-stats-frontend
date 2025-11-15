import type { SessionMetadata } from '$lib/api/analytics';
import type {
  UserProfile,
  AdvancedFilter,
  SortByRequest,
  PaginationRequest,
  PaginationResponse,
} from '$lib/api/common';
import type {
  GameMode,
  GameDifficulty,
  GameStatus,
  GameData,
  ExtraGameData,
  GameLength,
} from '$lib/api/sessions';
import type { Perk } from '../dto';

export interface Match {
  session: MatchSession;

  details: MatchDetails;

  metadata: SessionMetadata;
}

export interface MatchSession {
  id: number;

  server_id: number;
  map_id: number;

  mode: GameMode;
  length: number;
  diff: GameDifficulty;

  status: GameStatus;

  created_at: string;
  updated_at: string;

  started_at?: string;
  completed_at?: string;
}

export interface MatchDetails {
  map?: MatchMap;
  server?: MatchServer;

  game_data?: GameData;
  extra_data?: ExtraGameData;

  live_data?: MatchLiveData;

  user_data?: MatchUserData;
}

export interface MatchMap {
  name: string;
  preview?: string;
}

export interface MatchServer {
  name: string;
  address: string;
}

export interface MatchLiveData {
  players: MatchPlayer[];
  spectators: MatchPlayer[];
}

export interface MatchPlayer {
  profile: UserProfile;

  perk: Perk;
  level: number;
  prestige: number;

  health: number;
  armor: number;
}

export interface MatchUserData {
  perks: number[];

  stats: MatchUserDataStats;
}

export interface MatchUserDataStats {
  damage_dealt: number;
}

export interface FilterMatchesRequestIncludes {
  server_data?: boolean;
  map_data?: boolean;
  game_data?: boolean;
  extra_game_data?: boolean;
  live_data?: boolean;
}

export interface FilterMatchesRequestExtra {
  wave?: AdvancedFilter;
  difficulty?: AdvancedFilter;
  max_monsters?: AdvancedFilter;
  spawn_cycle?: string;
  zeds_type?: string;
}

export interface FilterMatchesRequestExclude {
  server_ids?: number[];
  map_ids?: number[];
  statuses?: number[];
}

export interface FilterMatchesRequest {
  user_ids?: number[];

  server_ids?: number[];
  map_ids?: number[];

  exclude?: FilterMatchesRequestExclude;

  perks?: Perk[];
  statuses?: GameStatus[];

  mode?: GameMode;
  length?: GameLength;
  diff?: GameDifficulty;

  date_from?: Date;
  date_to?: Date;

  includes?: FilterMatchesRequestIncludes;
  extra?: FilterMatchesRequestExtra;

  sort_by?: SortByRequest;
  pager?: PaginationRequest;
}

export interface FilterMatchesResponse {
  items: Match[];

  metadata: PaginationResponse;
}
