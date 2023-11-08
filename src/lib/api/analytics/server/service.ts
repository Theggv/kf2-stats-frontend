import { $proxyApi } from '$lib/http';

import type {
  PeriodData,
  PlayersOnlineRequest,
  SessionOnlineRequest,
  UsageInMinutesRequest,
} from './dto';

export class ServerAnalyticsApiService {
  static getSessionCount(body: SessionOnlineRequest) {
    return $proxyApi.post<PeriodData[]>(
      `/analytics/server/session/count`,
      body
    );
  }

  static getUsageInMinutes(body: UsageInMinutesRequest) {
    return $proxyApi.post<PeriodData[]>(`/analytics/server/usage`, body);
  }

  static getPlayersOnline(body: PlayersOnlineRequest) {
    return $proxyApi.post<PeriodData[]>(`/analytics/server/online`, body);
  }
}
