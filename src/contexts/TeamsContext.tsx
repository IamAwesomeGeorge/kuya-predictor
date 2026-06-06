import { createContext } from "react";
import type { TeamInfo } from "../models/Infos";

interface TeamsContextType {
  teams: TeamInfo[];
  setTeams: React.Dispatch<React.SetStateAction<TeamInfo[]>>;
}

// Export only the context from this file. Fast refresh requires files that export
// non-components (like contexts) to not also export components.
export const TeamsContext = createContext<TeamsContextType>({
  teams: [],
  setTeams: () => {},
});
