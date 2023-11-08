import { $proxyApi } from '$lib/http';

import type { MapAnalyticsRequest, MapAnalyticsResponseItem } from './dto';

export class MapAnalyticsApiService {
  static get(body: MapAnalyticsRequest) {
    return $proxyApi.post<MapAnalyticsResponseItem[]>(`/analytics/maps`, body);
  }
}
