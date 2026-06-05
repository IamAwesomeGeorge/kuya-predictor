import { useContext } from "react";
import { TeamContext } from "../../contexts/TeamContext";

export function findTeam(code: string) {
  const { teams } = useContext(TeamContext);
  return teams.find((team) => team.code === code) || null;
}
