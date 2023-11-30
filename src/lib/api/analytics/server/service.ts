import { $proxyApi } from '$lib/http';

import type {
  PeriodData,
  PlayersOnlineRequest,
  PopularServersResponse,
  SessionOnlineRequest,
  TotalOnlineResponse,
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

  static getPopularServers() {
    return $proxyApi.get<PopularServersResponse>(`/analytics/server/popular`);
  }

  static getCurrentOnline() {
    return $proxyApi.get<TotalOnlineResponse>(
      `/analytics/server/current-online`
    );
  }
}
