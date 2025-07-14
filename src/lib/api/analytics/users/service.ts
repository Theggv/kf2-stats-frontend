import { $proxyApi } from '$lib/http';

import type {
  AccuracyHist,
  GetLastSeenUsersRequest,
  GetLastSeenUsersResponse,
  GetLastSessionsWithUserRequest,
  GetLastSessionsWithUserResponse,
  GetPlayedMapsRequest,
  GetPlayedMapsResponse,
  GetTeammatesRequest,
  GetTeammatesResponse,
  PlayTimeHist,
  UserAnalyticsRequest,
  UserAnalyticsResponse,
  UserPerkHistRequest,
  UserPerksAnalyticsRequest,
  UserPerksAnalyticsResponse,
} from './dto';

export class UserAnalyticsApiService {
  static getUserAnalytics(body: UserAnalyticsRequest) {
    return $proxyApi.post<UserAnalyticsResponse>(`/analytics/users`, body);
  }

  static getUserPerksAnalytics(body: UserPerksAnalyticsRequest) {
    return $proxyApi.post<UserPerksAnalyticsResponse>(
      `/analytics/users/perks`,
      body
    );
  }

  static getPlaytimeHist(body: UserPerkHistRequest) {
    return $proxyApi.post<PlayTimeHist>(
      `/analytics/users/perks/playtime`,
      body
    );
  }

  static getAccuracyHist(body: UserPerkHistRequest) {
    return $proxyApi.post<AccuracyHist>(
      `/analytics/users/perks/accuracy`,
      body
    );
  }

  static getTeammates(body: GetTeammatesRequest) {
    return $proxyApi.post<GetTeammatesResponse>(
      `/analytics/users/teammates`,
      body
    );
  }

  static getLastSeenUsers(body: GetLastSeenUsersRequest) {
    return $proxyApi.post<GetLastSeenUsersResponse>(
      `/analytics/users/lastseen`,
      body
    );
  }

  static getLastGamesWithUser(body: GetLastSessionsWithUserRequest) {
    return $proxyApi.post<GetLastSessionsWithUserResponse>(
      `/analytics/users/lastgameswithuser`,
      body
    );
  }
}
