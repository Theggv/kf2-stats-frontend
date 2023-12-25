import { $proxyApi } from '$lib/http';

import type { LeaderBoardsRequest, LeaderBoardsResponse } from './dto';

export class LeaderBoardsApiService {
  static getLeaderboard(body: LeaderBoardsRequest) {
    return $proxyApi.post<LeaderBoardsResponse>(`/leaderboards`, body);
  }
}
