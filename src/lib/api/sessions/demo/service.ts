import { $proxyApi } from '$lib/http';

import type { DemoRecordAnalysis } from './dto';

export class DemoApiService {
  static getById(id: number) {
    return $proxyApi.get<DemoRecordAnalysis>(`/sessions/demo/${id}`);
  }
}
