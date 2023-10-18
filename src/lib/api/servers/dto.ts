export interface ServerData {
  id: number;
  name: string;
  address: string;
}

export interface AddServerRequest {
  name: string;
  address: string;
}

export interface AddServerResponse {
  id: number;
}

export interface GetByPatternResponse {
  items: ServerData[];
}

export interface UpdateNameRequest {
  id: number;
  name: string;
}
