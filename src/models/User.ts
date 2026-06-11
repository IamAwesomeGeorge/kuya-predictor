export interface AuthRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  created_at: string;
  pfp_url?: string;
  team: Team;
}

export interface UserLoggedIn extends User, AuthRequest {}

export type Team = "KUYA" | "MGS" | "PACBOY";
