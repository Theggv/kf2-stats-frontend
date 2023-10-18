import { $api } from '$lib/http';

import type {
  CreateSessionRequest,
  CreateSessionResponse,
  FilterSessionsRequest,
  FilterSessionsResponse,
  GetLiveMatchesResponse,
  SessionData,
  UpdateStatusRequest,
} from './dto';

export class SessionsApiService {
  static add(body: CreateSessionRequest) {
    return $api.post<CreateSessionResponse>(`/sessions/`, body);
  }

  static getById(id: number) {
    return $api.get<SessionData>(`/sessions/${id}`);
  }

  static filter(body: Partial<FilterSessionsRequest>) {
    return $api.post<FilterSessionsResponse>(`/sessions/filter`, body);
  }

  static updateStatus(data: UpdateStatusRequest) {
    return $api.put(`/sessions/status`, data);
  }

  static getLiveMatches() {
    return $api.get<GetLiveMatchesResponse>(`/sessions/live`);
  }
}
