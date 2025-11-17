import type {
  AdvancedFilter,
  SortByRequest,
  PaginationRequest,
  PaginationResponse,
} from '$lib/api/common';
import type {
  GameMode,
  GameDifficulty,
  GameStatus,
  GameLength,
} from '$lib/api/sessions';
import type { Match, Perk } from '../dto';

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
