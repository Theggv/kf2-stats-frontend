import { $proxyApi } from '$lib/http';
import type { GenericAbortSignal } from 'axios';

import type { LeaderBoardsRequest, LeaderBoardsResponse } from './dto';

export class LeaderBoardsApiService {
  static getLeaderboard(
    body: LeaderBoardsRequest,
    signal?: GenericAbortSignal
  ) {
    return $proxyApi.post<LeaderBoardsResponse>(`/leaderboards`, body, {
      signal,
    });
  }
}
