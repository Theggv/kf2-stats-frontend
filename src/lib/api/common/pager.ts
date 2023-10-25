export interface PaginationRequest {
  page?: number;
  results_per_page?: number;
}

export interface PaginationResponse {
  page: number;
  results_per_page: number;
  total_results: number;
}
