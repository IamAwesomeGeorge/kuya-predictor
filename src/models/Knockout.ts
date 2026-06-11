import type { Stage, TeamInfo } from "./Infos";

export interface KnockoutMatch {
  id: number;
  stage: Stage;
  left: string;
  right: string;
}

export interface KnockoutMatchInfo extends KnockoutMatch {
  leftTeam?: TeamInfo;
  rightTeam?: TeamInfo;
}
