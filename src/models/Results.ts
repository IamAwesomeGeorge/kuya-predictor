import type { TeamInfo } from "./Infos";
import type { User } from "./User";

export interface UserScoreInfo extends User {
  matches: number;
  groups: number;
  all: number;
  all_info: KnockoutInfo;
  knockout: number;
  knockout_info: KnockoutInfo;
  total: number;
}

export interface KnockoutInfo {
  "32": number;
  "16": number;
  QF: number;
  SF: number;
  F: number;
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
