import type { UserProfile } from '$lib/api/common';

export interface DifficultyScore {
  score: number;

  wave_size_bonus: number;
  speed_bonus: number;
  zeds_bonus: number;
  players_bonus: number;
  zt_bonus: number;
}

export interface DifficultyAnalyticsDetails {
  step: number;
  period: number;

  buckets: DifficultyScore[];
}

export interface DifficultyAnalytics {
  overall: DifficultyScore;

  details: DifficultyAnalyticsDetails;
}

export interface DemoRecordParsedPlayer {
  user_index: number;

  auth_id: string;
  auth_type: number;

  profile: UserProfile;
}

export interface DemoRecordParsedZedtime {
  start_tick: number;
  end_tick: number;
  ticks: number[];

  duration: number;
  extends_count: number;
}

export interface DemoRecordParsedWave {
  wave: number;
  attempt: number;

  start_tick: number;
  end_tick: number;
}

export interface DemoRecordParsedEventZedsLeft {
  tick: number;
  zeds_left: number;
}

export interface DemoRecordParsedEventPerkChange {
  tick: number;

  user_index: number;
  perk: number;
}

export interface DemoRecordParsedEventDeath {
  tick: number;

  user_index: number;
  cause: number;
}

export interface DemoRecordParsedEventKill {
  tick: number;

  user_index: number;
  zed: number;
}

export interface DemoRecordParsedEventBuff {
  tick: number;

  user_index: number;
  max_buffs: number;
}

export interface DemoRecordParsedEventHpChange {
  tick: number;

  user_index: number;
  health: number;
  armor: number;
}

export interface DemoRecordParsedEventConnection {
  tick: number;

  user_index: number;
  type: number;
}

export interface DemoRecordParsedEventHuskRage {
  tick: number;
  user_index: number;
}

export interface DemoRecordParsedPlayerEvents {
  connection_log: DemoRecordParsedEventConnection[];
  perks: DemoRecordParsedEventPerkChange[];
  kills: DemoRecordParsedEventKill[];
  buffs: DemoRecordParsedEventBuff[];
  deaths: DemoRecordParsedEventDeath[];
  husk_rages: DemoRecordParsedEventHuskRage[];
  hp_changes: DemoRecordParsedEventHpChange[];
}

export interface DemoRecordAnalysisWaveBuffsUptime {
  user_index: number;
  total_ticks: number;
  percent: number;
}

export interface DemoRecordAnalysisZedtime {
  meta_data: DemoRecordParsedZedtime;

  ticks_since_last: number;

  total_kills: number;
  large_kills: number;
  husk_kills: number;
  siren_kills: number;
}

export interface Metric {
  min: number;
  max: number;
  avg: number;
}

export interface ZedtimeAnalytics {
  total_zt_count: number;

  first_zt_tick: Metric;
  zt_duration_seconds: Metric;
  time_between_zt_seconds: Metric;

  avg_extends_count: number;
  avg_extend_duration: number;
}

export interface DifficultyDetailed {
  score: number;

  wave_size_bonus: number;
  speed_bonus: number;
  zeds_bonus: number;
  players_bonus: number;
}

export interface Summary {
  wave_size: number;
  zeds_left: number;
  completion_percent: number;

  duration: number;
  avg_kills_per_second: number;

  difficulty: DifficultyDetailed;

  total_killed: number;
  trash_killed: number;
  medium_killed: number;
  large_killed: number;

  trash_percent: number;
  medium_percent: number;
  large_percent: number;
}

export interface DemoRecordAnalysisWaveAnalytics {
  summary: Summary;
  difficulty: DifficultyAnalytics;
  zedtime: ZedtimeAnalytics;
  buffs_uptime: DemoRecordAnalysisWaveBuffsUptime[];
}

export interface DemoRecordAnalysisWave {
  meta_data: DemoRecordParsedWave;
  analytics: DemoRecordAnalysisWaveAnalytics;

  zedtimes: DemoRecordAnalysisZedtime[];
  zeds_left: DemoRecordParsedEventZedsLeft[];

  player_events: DemoRecordParsedPlayerEvents;
}

export interface DemoRecordAnalysisAnalytics {
  summary: Summary;
  zedtime: ZedtimeAnalytics;
  difficulty: DifficultyAnalytics;
}

export interface DemoRecordAnalysis {
  protocol_version: number;
  session_id: number;

  start_tick: number;
  end_tick: number;

  analytics: DemoRecordAnalysisAnalytics;
  players: DemoRecordParsedPlayer[];
  waves: DemoRecordAnalysisWave[];
}
