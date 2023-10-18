import { $api } from '$lib/http';

import type {
  AddMapRequest,
  AddMapResponse,
  GetByPatternResponse,
  MapData,
  UpdatePreviewRequest,
} from './dto';

export class MapsApiService {
  static add(body: AddMapRequest) {
    return $api.post<AddMapResponse>(`/maps/`, body);
  }

  static getByPattern(pattern?: string) {
    return $api.get<GetByPatternResponse>(`/maps/`, {
      params: { pattern },
    });
  }

  static getById(id: number) {
    return $api.get<MapData>(`/maps/${id}`);
  }

  static updatePreview(data: UpdatePreviewRequest) {
    return $api.put(`/maps/preview`, data);
  }
}
