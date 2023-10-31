export interface MapAnalyticsRequest {
  server_id?: number;

  date_from: Date;
  date_to: Date;

  limit?: number;
}

export interface MapAnalyticsResponseItem {
  map_name: string;
  count: number;
}

export interface MapAnalyticsResponse {
  items: MapAnalyticsResponseItem[];
}
