import type { TeamInfo } from "./Infos";
import type { User } from "./User";

export interface UserScoreInfo extends User {
  groups: number;
  knockoutPre: number;
  knockout: number;
  matches: number;
  total: number;
}

export interface GroupStageStandings extends TeamInfo {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  gw: number;
  points: number;
}
