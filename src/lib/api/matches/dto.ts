import type { SessionMetadata } from '../analytics';
import type { UserProfile, ZedCounter } from '../common';
import type {
  ExtraGameData,
  GameDifficulty,
  GameData,
  GameMode,
  GameStatus,
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
  last_seen: string;

  perks: number[];

  stats: MatchUserDataStats;
}

export interface MatchUserDataStats {
  damage_dealt: number;
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
  status: GameStatus;
  game_data: GameData;
  cd_data?: ExtraGameData;
  players: GetMatchLiveDataResponsePlayer[];
  spectators: GetMatchLiveDataResponsePlayer[];
}
