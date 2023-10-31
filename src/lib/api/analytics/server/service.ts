import { $api } from '$lib/http';

import type {
  PlayersOnlineRequest,
  PlayersOnlineResponse,
  SessionOnlineRequest,
  SessionOnlineResponse,
  UsageInMinutesRequest,
  UsageInMinutesResponse,
} from './dto';

export class ServerAnalyticsApiService {
  static getSessionCount(body: SessionOnlineRequest) {
    return $api.post<SessionOnlineResponse>(
      `/analytics/server/session/count`,
      body
    );
  }

  static getUsageInMinutes(body: UsageInMinutesRequest) {
    return $api.post<UsageInMinutesResponse>(`/analytics/server/usage`, body);
  }

  static getPlayersOnline(body: PlayersOnlineRequest) {
    return $api.post<PlayersOnlineResponse>(`/analytics/server/online`, body);
  }
}
