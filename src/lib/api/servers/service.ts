import { $api } from '$lib/http';

import type {
  AddServerRequest,
  AddServerResponse,
  GetByPatternResponse,
  ServerData,
  UpdateNameRequest,
} from './dto';

export class ServersApiService {
  static add(body: AddServerRequest) {
    return $api.post<AddServerResponse>(`/servers/`, body);
  }

  static getByPattern(pattern?: string) {
    return $api.get<GetByPatternResponse>(`/servers/`, {
      params: { pattern },
    });
  }

  static getById(id: number) {
    return $api.get<ServerData>(`/servers/${id}`);
  }

  static updatePreview(data: UpdateNameRequest) {
    return $api.put(`/servers/name`, data);
  }
}
