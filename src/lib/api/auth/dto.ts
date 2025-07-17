export interface ValidateOpenIdRequest {
  params: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface TokenPayload {
  user_id: number;
  name: string;
  steam_id: string;
  avatar: string;
  profile_url: string;
}
