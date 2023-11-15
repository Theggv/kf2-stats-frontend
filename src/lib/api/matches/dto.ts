import type {
  PaginationRequest,
  PaginationResponse,
  ZedCounter,
} from '../common';
import type {
  CDGameData,
  Difficulty,
  GameData,
  Length,
  Mode,
  Status,
} from '../sessions';

export enum Perk {
  Unknown = 0,
  Berserker,
  Commando,
  Medic,
  Sharpshooter,
  Gunslinger,
  Support,
  Swat,
  Demolitionist,
  Firebug,
  Survivalist,
}

export interface MatchSession {
  session_id: number;
  server_id: number;
  map_id: number;
  mode: Mode;
  length: Length;
  diff: Difficulty;
  status: Status;
  created_at: string;
  updated_at: string;
  started_at: string;
  completed_at: string;
}

export interface MatchMap {
  name: string;
  preview: string;
}

export interface MatchServer {
  name: string;
  address: string;
}

export interface MatchData {
  session: MatchSession;
  map?: MatchMap;
  server?: MatchServer;
  game_data?: GameData;
  cd_data?: CDGameData;
}

export interface Player {
  id: number;

  profile_url?: string;
  avatar?: string;
  name: string;

  player_stats_id: number;

  perk: Perk;
  level: number;
  prestige: number;
  is_dead: boolean;
}

export interface MatchWave {
  id: number;
  wave: number;
  attempt: number;
  players: Player[];
  started_at: string;
  completed_at: string;
}

export interface FilterMatchesRequest {
  server_id: number[];
  map_id: number[];

  mode: Mode;
  length: Length;
  diff: Difficulty;
  status: Status;

  include_server?: boolean;
  include_map?: boolean;
  include_game_data?: boolean;
  include_cd_data?: boolean;

  reverse_order?: boolean;
  pager?: PaginationRequest;
}

export interface FilterMatchesResponse {
  items: MatchData[];
  metadata: PaginationResponse;
}

export interface GetMatchWavesResponse {
  waves: MatchWave[];
}

export interface PlayerWaveStats {
  player_stats_id: number;

  shots_fired: number;
  shots_hit: number;
  shots_hs: number;

  dosh_earned: number;

  heals_given: number;
  heals_recv: number;

  damage_dealt: number;
  damage_taken: number;

  zedtime_count: number;
  zedtime_length: number;

  kills: ZedCounter;
  husk_b: number;
  husk_r: number;

  injured_by: ZedCounter;
}

export interface GetMatchWaveStatsResponse {
  players: PlayerWaveStats[];
}

export interface GetMatchPlayerStatsResponse {
  waves: PlayerWaveStats[];
}

export interface AggregatedPlayerStats {
  user_id: number;
  play_time: number;
  shots_fired: number;
  shots_hit: number;
  shots_hs: number;
  dosh_earned: number;
  heals_given: number;
  heals_recv: number;
  damage_dealt: number;
  damage_taken: number;
  zedtime_count: number;
  zedtime_length: number;
  kills: number;
  large_kills: number;
  husk_r: number;
}

export interface GetMatchAggregatedStatsResponse {
  players: AggregatedPlayerStats[];
}

export interface GetMatchLiveDataResponsePlayer {
  id: number;
  name: string;
  profile_url?: string;
  avatar?: string;
  perk: Perk;
  level: number;
  prestige: number;
  health: number;
  armor: number;
}

export interface GetMatchLiveDataResponse {
  status: Status;
  game_data: GameData;
  cd_data?: CDGameData;
  players: GetMatchLiveDataResponsePlayer[];
  spectators: GetMatchLiveDataResponsePlayer[];
}
