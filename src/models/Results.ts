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
