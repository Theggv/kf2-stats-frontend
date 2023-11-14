import { $proxyApi } from '$lib/http';

import type {
  FilterMatchesRequest,
  FilterMatchesResponse,
  GetMatchAggregatedStatsResponse,
  GetMatchLiveDataResponse,
  GetMatchPlayerStatsResponse,
  GetMatchWavesResponse,
  GetMatchWaveStatsResponse,
  MatchData,
} from './dto';

export class MatchesApiService {
  static getById(session_id: number) {
    return $proxyApi.get<MatchData>(`/matches/${session_id}`);
  }

  static getMatchLive(session_id: number) {
    return $proxyApi.get<GetMatchLiveDataResponse>(
      `/matches/${session_id}/live`
    );
  }

  static getMatchWaves(session_id: number) {
    return $proxyApi.get<GetMatchWavesResponse>(`/matches/${session_id}/waves`);
  }

  static getWavePlayersStats(wave_id: number) {
    return $proxyApi.get<GetMatchWaveStatsResponse>(
      `/matches/wave/${wave_id}/stats`
    );
  }

  static getMatchPlayerStats(session_id: number, user_id: number) {
    return $proxyApi.get<GetMatchPlayerStatsResponse>(
      `/matches/${session_id}/user/${user_id}/stats`
    );
  }

  static getMatchSummary(session_id: number) {
    return $proxyApi.get<GetMatchAggregatedStatsResponse>(
      `/matches/${session_id}/summary`
    );
  }

  static getLastServerMatch(server_id: number) {
    return $proxyApi.get<MatchData>(`/matches/server/${server_id}/last`);
  }

  static filter(body: Partial<FilterMatchesRequest>) {
    return $proxyApi.post<FilterMatchesResponse>(`/matches/filter`, body);
  }
}
