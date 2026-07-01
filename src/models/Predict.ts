import type { Team } from "./User";

export interface PredictBase {
  id?: number;
  updated_at: string;
  user: number;
}

export interface PredictData extends PredictBase {
  data: string[];
}

export interface PredictGroupPre {
  group: string;
  pos_1: string;
  pos_2: string;
  pos_3: string;
  pos_4: string;
}

export interface PredictGroup extends PredictBase, PredictGroupPre {
  id?: number;
  updated_at: string;
  user: number;
}

export interface PredictGroupView extends UserView, PredictGroup {
  points?: number;
}

export interface PredictMatch extends PredictBase {
  match: number;
  score_left: number;
  score_right: number;
  tie_break: string | null;
  first_scorer: string | null;
  double: boolean;
}

export interface PredictMatchView extends UserView, PredictMatch {
  date_time: string;
  stage: string;
  stage_info: string;
  points?: number;
  gd: number;
  winner: string;
}

export interface PredictKnockout extends PredictBase {
  matchId: number;
  winner: string;
}

export interface PredictKnockoutView extends PredictKnockout, UserView {}

interface UserView {
  name: string;
  pfp_url?: string;
  team: Team;
}
