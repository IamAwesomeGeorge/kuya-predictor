import { useContext } from "react";
import { TeamsContext } from "../../contexts/TeamsContext";
import type { MatchInfo, TeamInfo } from "../../models/Infos";
import type { GroupStageStandings } from "../../models/Results";

export function useTeamsReady() {
  const { teams } = useContext(TeamsContext);
  return teams.length > 0;
}

export function useTeamInfo(teamCode: string) {
  const { teams } = useContext(TeamsContext);
  return findTeamInfo(teams, teamCode);
}

export function findTeamInfo(teams: TeamInfo[], teamCode: string) {
  return teams.find((team) => team.code === teamCode);
}

export function useTeamName(teamCode: string) {
  const teamInfo = useTeamInfo(teamCode);
  if (teamCode === "ZZ") return "???";
  return teamInfo ? teamInfo.name : teamCode;
}

export function findTeamName(teams: TeamInfo[], teamCode: string) {
  if (teamCode === "ZZ") return "???";
  const teamInfo = findTeamInfo(teams, teamCode);
  return teamInfo ? teamInfo.name : teamCode;
}

export function useTeamsFromGroup(group: string) {
  const { teams } = useContext(TeamsContext);
  return teams.filter((team) => team.group === group).sort((a, b) => a.name.localeCompare(b.name));
}

export function sortStandings(a: GroupStageStandings, b: GroupStageStandings) {
  if (a.points !== b.points) return b.points - a.points;
  if (a.gd !== b.gd) return b.gd - a.gd;
  if (a.gf !== b.gf) return b.gf - a.gf;
  if (a.ga !== b.ga) return a.ga - b.ga;
  return a.gw - b.gw;
}

export function isTopPoints(points: number | undefined, double: boolean) {
  if (double && points == 12) return true;
  if (!double && points == 6) return true;
  return false;
}

export function stageGroupText(match: MatchInfo) {
  if (match.stage === "GROUP") {
    return `Group ${match.stage_info}`;
  }
  if (match.stage === "ROUND_OF_32") {
    return "Round of 32";
  }
  if (match.stage === "ROUND_OF_16") {
    return "Round of 16";
  }
  if (match.stage === "QUARTERFINAL") {
    return "Quarterfinal";
  }
  if (match.stage === "SEMIFINAL") {
    return "Semifinal";
  }
  if (match.stage === "FINAL") {
    return match.stage_info;
  }
}

export function findWinner(match: MatchInfo) {
  if (
    match.score_left === undefined ||
    match.score_right === undefined ||
    match.score_left === null ||
    match.score_right === null
  )
    return undefined;
  if (match.tie_break) return match.tie_break;
  if (match.score_left > match.score_right) return match.team_left;
  if (match.score_left < match.score_right) return match.team_right;
  return "DRAW";
}
