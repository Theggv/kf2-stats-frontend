import { $proxyApi } from '$lib/http';

import type { PerkStats, PerksKillsRequest, PerksPlayTimeRequest } from './dto';

export class PerksAnalyticsApiService {
  static getPlayTime(body: PerksPlayTimeRequest) {
    return $proxyApi.post<PerkStats[]>(`/analytics/perks/playtime`, body);
  }

  static getKills(body: PerksKillsRequest) {
    return $proxyApi.post<PerkStats[]>(`/analytics/perks/kills`, body);
  }
}
