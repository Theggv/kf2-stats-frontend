import { $proxyApi } from '$lib/http';

import type {
  GetMatchLiveDataResponse,
  GetMatchWavesResponse,
  Match,
} from './dto';

export class MatchesApiService {
  static getById(session_id: number) {
    return $proxyApi.get<Match>(`/matches/${session_id}`);
  }

  static getMatchLive(session_id: number) {
    return $proxyApi.get<GetMatchLiveDataResponse>(
      `/matches/${session_id}/live`
    );
  }

  static getMatchWaves(session_id: number) {
    return $proxyApi.get<GetMatchWavesResponse>(`/matches/${session_id}/waves`);
  }

  static getLastServerMatch(server_id: number) {
    return $proxyApi.get<Match>(`/matches/server/${server_id}/last`);
  }
}
