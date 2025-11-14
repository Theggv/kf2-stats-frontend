import { $proxyApi } from '$lib/http';
import type { GetSessionDifficultyResponse } from './dto';

export class GameDifficultyApiService {
  static getById(id: number) {
    return $proxyApi.get<GetSessionDifficultyResponse>(
      `/sessions/difficulty/${id}`
    );
  }
}
