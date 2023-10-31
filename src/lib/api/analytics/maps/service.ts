import { $api } from '$lib/http';

import type { MapAnalyticsRequest, MapAnalyticsResponse } from './dto';

export class MapAnalyticsApiService {
  static get(body: MapAnalyticsRequest) {
    return $api.post<MapAnalyticsResponse>(`/analytics/maps`, body);
  }
}
