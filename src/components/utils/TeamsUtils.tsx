import { useContext } from "react";
import { TeamsContext } from "../../contexts/TeamsContext";

export function useTeamInfo(teamCode: string) {
  const { teams } = useContext(TeamsContext);
  return teams.find((team) => team.code === teamCode);
}

export function useTeamsFromGroup(group: string) {
  const { teams } = useContext(TeamsContext);
  return teams.filter((team) => team.group === group);
}
