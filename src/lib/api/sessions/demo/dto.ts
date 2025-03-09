export interface DemoRecordRawEvent {
  tick: number;
  event_type: number;
  payload: any;
}

export interface DemoRecordAnalysisPlayer {
  user_id: number;

  user_type: number;
  unique_id: string;
}

export interface DemoRecordAnalysisWavePerk {
  user_id: number;
  perk: number;
}

export interface DemoRecordAnalysisWaveZedtime {
  start_tick: number;
  end_tick: number;
  ticks: number[];

  duration: number;
  extends_count: number;

  total_kills: number;
  large_kills: number;
  husk_kills: number;
  siren_kills: number;
}

export interface DemoRecordAnalysisWaveKill {
  tick: number;

  user_id: number;
  zed: number;
}

export interface DemoRecordAnalysisWaveBuff {
  tick: number;

  user_id: number;
  max_buffs: number;
}

export interface DemoRecordAnalysisWaveZedsLeft {
  tick: number;

  zeds_left: number;
}

export interface DemoRecordAnalysisWaveHpChange {
  tick: number;

  user_id: number;
  health: number;
  armor: number;
}

export interface DemoRecordAnalysisWaveBuffsUptime {
  user_id: number;
  total_ticks: number;
  percent: number;
}

export interface DemoRecordAnalysisWaveDifficultyItem {
  tick: number;

  trash_kills: number;
  medium_kills: number;
  large_kills: number;
}

export interface DemoRecordAnalysisWaveDifficulty {
  step: number;
  period: number;
  ticks: DemoRecordAnalysisWaveDifficultyItem[];
}

export interface DemoRecordAnalysisWave {
  wave: number;

  start_tick: number;
  end_tick: number;

  raw_events?: DemoRecordRawEvent[];
  perks?: DemoRecordAnalysisWavePerk[];
  zed_times?: DemoRecordAnalysisWaveZedtime[];
  kills?: DemoRecordAnalysisWaveKill[];
  buffs?: DemoRecordAnalysisWaveBuff[];
  zeds_left?: DemoRecordAnalysisWaveZedsLeft[];

  hp_changes?: DemoRecordAnalysisWaveHpChange[];
  buffs_uptime?: DemoRecordAnalysisWaveBuffsUptime[];

  difficulty: DemoRecordAnalysisWaveDifficulty;
}

export interface DemoRecordAnalysis {
  header: any;
  start_tick: number;
  end_tick: number;
  players: DemoRecordAnalysisPlayer[];
  waves: DemoRecordAnalysisWave[];
}
