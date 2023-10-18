export interface MapData {
  id: number;
  name: string;
  preview: string;
}

export interface AddMapRequest {
  name: string;
  preview: string;
}

export interface AddMapResponse {
  id: number;
}

export interface GetByPatternResponse {
  items: MapData[];
}

export interface UpdatePreviewRequest {
  id: number;
  preview: string;
}
