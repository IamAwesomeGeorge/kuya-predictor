export interface AuthRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username?: string;
  name: string;
  created_at: string;
  pfp_url?: string;
  team?: Team;
}

export type Team = "KUYA" | "MGS" | "PACBOY";
