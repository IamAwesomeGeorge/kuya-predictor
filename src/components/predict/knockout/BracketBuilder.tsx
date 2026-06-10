import type { TeamInfo } from "../../../models/Infos";
import type { KnockoutMatch, KnockoutMatchInfo } from "../../../models/Knockout";
import type { PredictGroup } from "../../../models/Predict";
import { findTeamInfo } from "../../utils/TeamsUtils";

const matches: KnockoutMatch[] = [
  { id: 74, stage: "ROUND_OF_32", left: "1E", right: "3E" },
  { id: 77, stage: "ROUND_OF_32", left: "1I", right: "3I" },

  { id: 73, stage: "ROUND_OF_32", left: "2A", right: "2B" },
  { id: 75, stage: "ROUND_OF_32", left: "1F", right: "2C" },

  { id: 76, stage: "ROUND_OF_32", left: "1C", right: "2F" },
  { id: 78, stage: "ROUND_OF_32", left: "2E", right: "2I" },

  { id: 79, stage: "ROUND_OF_32", left: "1A", right: "3A" },
  { id: 80, stage: "ROUND_OF_32", left: "1L", right: "3L" },

  { id: 83, stage: "ROUND_OF_32", left: "2K", right: "2L" },
  { id: 84, stage: "ROUND_OF_32", left: "1H", right: "2J" },

  { id: 81, stage: "ROUND_OF_32", left: "1D", right: "3D" },
  { id: 82, stage: "ROUND_OF_32", left: "1G", right: "3G" },

  { id: 86, stage: "ROUND_OF_32", left: "1J", right: "2H" },
  { id: 88, stage: "ROUND_OF_32", left: "2D", right: "2G" },

  { id: 85, stage: "ROUND_OF_32", left: "1B", right: "3B" },
  { id: 87, stage: "ROUND_OF_32", left: "1K", right: "3K" },
];

export function BracketBuilder(teams: TeamInfo[], predicts: PredictGroup[]) {
  const matchInfo: KnockoutMatchInfo[] = [];
  matches.forEach((match) => {
    const leftTeam = findPredictedTeam(match.left, teams, predicts);
    const rightTeam = findPredictedTeam(match.right, teams, predicts);
    matchInfo.push({ ...match, leftTeam, rightTeam });
  });
  return matchInfo;
}

function findPredictedTeam(position: string, teams: TeamInfo[], predicts: PredictGroup[]) {
  if (position[0] === "M") {
    return undefined;
  } else if (position[0] === "1") {
    const group = position[1];
    const predictGroup = predicts.find((p) => p.group === group);
    const teamCode = predictGroup?.pos_1;
    return findTeamInfo(teams, teamCode || "") || undefined;
  } else if (position[0] === "2") {
    const group = position[1];
    const predictGroup = predicts.find((p) => p.group === group);
    const teamCode = predictGroup?.pos_2;
    return findTeamInfo(teams, teamCode || "") || undefined;
  } else if (position[0] === "3") {
    return undefined;
  } else {
    return undefined;
  }
}
