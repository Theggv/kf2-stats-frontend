import { $proxyApi } from '$lib/http';
import type { GenericAbortSignal } from 'axios';
import type { FilterMatchesRequest, FilterMatchesResponse } from './dto';

export class MatchesFilterApiService {
  static filter(
    body: Partial<FilterMatchesRequest>,
    signal?: GenericAbortSignal
  ) {
    return $proxyApi.post<FilterMatchesResponse>(`/matches/filter/new`, body, {
      signal,
    });
  }
}
