import { useContext } from "react";
import { TeamsContext } from "../../contexts/TeamsContext";

export function useTeamInfo(teamCode: string) {
  const { teams } = useContext(TeamsContext);
  return teams.find((team) => team.code === teamCode);
}

export function useTeamName(teamCode: string) {
  const teamInfo = useTeamInfo(teamCode);
  return teamInfo ? teamInfo.name : teamCode;
}

export function useTeamsFromGroup(group: string) {
  const { teams } = useContext(TeamsContext);
  return teams.filter((team) => team.group === group);
}
