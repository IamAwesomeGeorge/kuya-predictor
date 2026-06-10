export interface TeamInfo {
  code: string;
  name: string;
  group: string;
}

export type Stage = "GROUP" | "ROUND_OF_32" | "ROUND_OF_16" | "QUARTERFINAL" | "SEMIFINAL" | "FINAL";

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
  first_scorer?: string;
}