import { $api } from '$lib/http';
import type {
  FilterMatchesRequest,
  FilterMatchesResponse,
  GetMatchAggregatedStatsResponse,
  GetMatchPlayerStatsResponse,
  GetMatchWavesResponse,
  GetMatchWaveStatsResponse,
  MatchData,
} from './dto';

export class MatchesApiService {
  static getById(session_id: number) {
    return $api.get<MatchData>(`/matches/${session_id}`);
  }

  static getMatchWaves(session_id: number) {
    return $api.get<GetMatchWavesResponse>(`/matches/${session_id}/waves`);
  }

  static getWavePlayersStats(wave_id: number) {
    return $api.get<GetMatchWaveStatsResponse>(
      `/matches/wave/${wave_id}/stats`
    );
  }

  static getMatchPlayerStats(session_id: number, user_id: number) {
    return $api.get<GetMatchPlayerStatsResponse>(
      `/matches/${session_id}/user/${user_id}/stats`
    );
  }

  static getMatchSummary(session_id: number) {
    return $api.get<GetMatchAggregatedStatsResponse>(
      `/matches/${session_id}/summary`
    );
  }

  static getLastServerMatch(server_id: number) {
    return $api.get<MatchData>(`/matches/server/${server_id}`);
  }

  static filter(body: Partial<FilterMatchesRequest>) {
    return $api.post<FilterMatchesResponse>(`/matches/filter`, body);
  }
}
