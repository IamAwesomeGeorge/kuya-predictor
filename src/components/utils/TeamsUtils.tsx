import { useContext } from "react";
import { TeamsContext } from "../../contexts/TeamsContext";
import type { TeamInfo } from "../../models/Infos";
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
  if (teamCode === "ZZ") return "???";
  const teamInfo = useTeamInfo(teamCode);
  return teamInfo ? teamInfo.name : teamCode;
}

export function findTeamName(teams: TeamInfo[], teamCode: string) {
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
