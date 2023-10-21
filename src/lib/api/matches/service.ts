import { $api } from '$lib/http';
import type {
  FilterMatchesRequest,
  FilterMatchesResponse,
  MatchData,
} from './dto';

export class MatchesApiService {
  static getById(session_id: number) {
    return $api.get<MatchData>(`/matches/${session_id}`);
  }

  static getLastServerMatch(server_id: number) {
    return $api.get<MatchData>(`/matches/server/${server_id}`);
  }

  static filter(body: Partial<FilterMatchesRequest>) {
    return $api.post<FilterMatchesResponse>(`/matches/filter`, body);
  }
}
