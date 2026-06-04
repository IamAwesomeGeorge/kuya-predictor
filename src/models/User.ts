export interface AuthRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  created_at: string;
  avatar_url?: string;
  team?: string;
}
