import { createContext } from "react";
import type { TeamInfo } from "../models/Infos";

interface TeamContextType {
  teams: TeamInfo[];
  setTeams: React.Dispatch<React.SetStateAction<TeamInfo[]>>;
}

// Export only the context from this file. Fast refresh requires files that export
// non-components (like contexts) to not also export components.
export const TeamContext = createContext<TeamContextType>({
  teams: [],
  setTeams: () => {},
});
