import type { SessionMetadata } from '../analytics';
import type {
  PaginationRequest,
  PaginationResponse,
  UserProfile,
  ZedCounter,
} from '../common';
import type {
  ExtraGameData,
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

export interface MatchPlayer {
  profile: UserProfile;

  perk: Perk;
  level: number;
  prestige: number;

  health: number;
  armor: number;
}

export interface MatchData {
  session: MatchSession;

  map?: MatchMap;
  server?: MatchServer;

  game_data?: GameData;
  cd_data?: ExtraGameData;

  players?: MatchPlayer[];
  spectators?: MatchPlayer[];

  metadata: SessionMetadata;
}

export interface MatchWave {
  wave_id: number;
  wave: number;
  attempt: number;

  players?: MatchWavePlayer[];

  started_at: string;
  completed_at: string;
}

export interface MatchWavePlayer {
  user_id: number;
  player_stats_id: number;

  perk: Perk;
  level: number;
  prestige: number;
  is_dead: boolean;

  stats: MatchWavePlayerStats;
}

export interface MatchWavePlayerStats {
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
}

export interface FilterMatchesRequest {
  server_ids: number[];
  map_ids: number[];
  statuses: Status[];

  mode: Mode;
  length: Length;
  diff: Difficulty;

  include_server?: boolean;
  include_map?: boolean;
  include_game_data?: boolean;
  include_cd_data?: boolean;
  include_players?: boolean;

  reverse_order?: boolean;
  pager?: PaginationRequest;
}

export interface FilterMatchesResponse {
  items: MatchData[];
  metadata: PaginationResponse;
}

export interface GetMatchWavesResponse {
  waves: MatchWave[];
  users: UserProfile[];
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
  cd_data?: ExtraGameData;
  players: GetMatchLiveDataResponsePlayer[];
  spectators: GetMatchLiveDataResponsePlayer[];
}
