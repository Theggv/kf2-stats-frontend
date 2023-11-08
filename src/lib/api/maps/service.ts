import type { MapData } from './dto';
import { $proxyApi } from '$lib/http';

export class MapsApiService {
  static getByPattern(pattern?: string) {
    return $proxyApi.get<MapData[]>(`/maps`, {
      params: { pattern },
    });
  }

  static getById(id: number) {
    return $proxyApi.get<MapData>(`/maps/${id}`);
  }
}
