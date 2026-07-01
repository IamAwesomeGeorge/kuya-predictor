import type { TeamInfo } from "./Infos";
import type { User } from "./User";

export interface UserScoreInfo extends User {
  matches: number;
  matches_info: MatchScoreInfo;
  groups: number;
  groups_info: GroupScoreInfo;
  all: number;
  all_info: KnockoutScoreInfo;
  knockout: number;
  knockout_info: KnockoutScoreInfo;
  total: number;
}

export interface MatchScoreInfo {
  G: number;
  "32": number;
  "16": number;
  QF: number;
  SF: number;
  F: number;

  WIN: number;
  SCORE: number;
  GD: number;
  FIRST: number;
}

export interface GroupScoreInfo {
  GROUPS: number;
  THIRD: number;
}

export interface KnockoutScoreInfo {
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
