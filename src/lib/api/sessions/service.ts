import { $api } from '$lib/http';

import type {
  CreateSessionRequest,
  CreateSessionResponse,
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

  static updateStatus(data: UpdateStatusRequest) {
    return $api.put(`/sessions/status`, data);
  }
}
