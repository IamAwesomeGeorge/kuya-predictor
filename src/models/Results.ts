export interface ScoreInfo {
  avatar: string;
  name: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

export interface GroupStageStandings {
  code: string;
  name: string;
  group: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

export type Stage = "GROUP" | "ROUND_OF_16";

export interface MatchInfo {
  id: number;
  team_left: string;
  team_right: string;
  stage: Stage;
  stage_info: string;
  date_time: string;
  stadium: string;
  score_left?: number;
  score_right?: number;
}
