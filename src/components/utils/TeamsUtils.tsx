import { useContext } from "react";
import { TeamsContext } from "../../contexts/TeamsContext";

export function FindTeamInfo(teamCode: string) {
  const { teams } = useContext(TeamsContext);
  return teams.find((team) => team.code === teamCode);
}
