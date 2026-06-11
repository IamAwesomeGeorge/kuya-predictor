import type { TeamInfo } from "../../../models/Infos";
import type { KnockoutMatch, KnockoutMatchInfo } from "../../../models/Knockout";
import type { PredictData, PredictGroup } from "../../../models/Predict";
import { findTeamInfo } from "../../utils/TeamsUtils";
import { thirdPlaceFinder } from "./ThirdPlaceHelper";

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

  { id: 89, stage: "ROUND_OF_16", left: "M74", right: "M77" },
  { id: 90, stage: "ROUND_OF_16", left: "M73", right: "M75" },
  { id: 91, stage: "ROUND_OF_16", left: "M76", right: "M78" },
  { id: 92, stage: "ROUND_OF_16", left: "M79", right: "M80" },
  { id: 93, stage: "ROUND_OF_16", left: "M83", right: "M84" },
  { id: 94, stage: "ROUND_OF_16", left: "M81", right: "M82" },
  { id: 95, stage: "ROUND_OF_16", left: "M86", right: "M88" },
  { id: 96, stage: "ROUND_OF_16", left: "M85", right: "M87" },

  { id: 97, stage: "QUARTERFINAL", left: "M89", right: "M90" },
  { id: 98, stage: "QUARTERFINAL", left: "M93", right: "M94" },
  { id: 99, stage: "QUARTERFINAL", left: "M91", right: "M92" },
  { id: 100, stage: "QUARTERFINAL", left: "M95", right: "M96" },

  { id: 101, stage: "SEMIFINAL", left: "M97", right: "M98" },
  { id: 102, stage: "SEMIFINAL", left: "M99", right: "M100" },

  { id: 103, stage: "FINAL", left: "M101L", right: "M102L" },
  { id: 104, stage: "FINAL", left: "M101", right: "M102" },
];

export function BracketBuilderStart(teams: TeamInfo[], predicts: PredictGroup[], thirds?: PredictData | null) {
  const thirdTeams = thirds?.data
    .map((code) => findTeamInfo(teams, code))
    .filter((team): team is NonNullable<typeof team> => team !== undefined)
    .sort((a, b) => a.group.localeCompare(b.group));
  const thirdPlaceTeams = thirdTeams ? thirdPlaceFinder(thirdTeams) : [];

  const matchInfo: KnockoutMatchInfo[] = [];
  matches.forEach((match) => {
    const leftTeam = findPredictedTeam(match.left, teams, predicts, thirdPlaceTeams);
    const rightTeam = findPredictedTeam(match.right, teams, predicts, thirdPlaceTeams);
    matchInfo.push({ ...match, leftTeam, rightTeam });
  });
  return fix3Label(matchInfo);
}

function findPredictedTeam(position: string, teams: TeamInfo[], predicts: PredictGroup[], thirds: string[]) {
  if (position[0] === "M" && position[4] === "L") {
    return undefined;
  } else if (position[0] === "M") {
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
    if (thirds.length === 0) return undefined;
    const index = slotOrder.indexOf(position);
    const groupCode = thirds[index][1];
    const group = predicts.find((p) => p.group === groupCode);
    return findTeamInfo(teams, group?.pos_3 || "") || undefined;
  } else {
    return undefined;
  }
}

function fix3Label(matchInfo: KnockoutMatchInfo[]) {
  const cleanInfo = [];
  for (const match of matchInfo) {
    if (match.right[0] === "3" && match.rightTeam?.group) {
      cleanInfo.push({ ...match, right: "3" + match.rightTeam?.group });
    } else {
      cleanInfo.push(match);
    }
  }
  return cleanInfo;
}

const slotOrder = ["3A", "3B", "3D", "3E", "3G", "3I", "3K", "3L"];
