export enum AuthType {
  Steam = 1,
  EGS = 2,
}

export interface UserData {
  id: number;
  auth_id: number;
  auth_type: AuthType;

  name: string;
}

export interface UserNameHistory {
  user_id: number;
  name: string;
  updated_at: string;
}

export interface CreateUserRequest {
  auth_id: string;
  type: AuthType;

  name: string;
}

export interface CreateUserResponse {
  id: number;
}
