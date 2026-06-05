import type { TeamInfo } from "./Infos";

//Todo: better
export interface ScoreInfo {
  pfp_url?: string;
  name: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

export interface GroupStageStandings extends TeamInfo {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}
