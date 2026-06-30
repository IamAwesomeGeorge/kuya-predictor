import type { TeamInfo } from "./Infos";
import type { User } from "./User";

export interface UserScoreInfo extends User {
  matches: number;
  groups: number;
  all: number;
  knockout: number;
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
