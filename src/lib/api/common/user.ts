export interface UserProfile {
  id: number;
  auth_id: string;

  name: string;
  profile_url?: string;
  avatar?: string;
}
