export interface UserProfile {
  id: number;

  name: string;
  profile_url?: string;
  avatar?: string;

  auth_id?: string;
  auth_type?: number;
}
