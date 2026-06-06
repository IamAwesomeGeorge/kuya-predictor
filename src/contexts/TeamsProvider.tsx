import { useEffect, useState, type ReactNode } from "react";
import { TeamsContext } from "./TeamsContext";
import type { TeamInfo } from "../models/Infos";
import { supabase } from "../utils/supabase";

export const TeamsProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<TeamInfo[]>([]);

  useEffect(() => {
    if (teams.length > 0) {
      return;
    }

    const loadTeams = async () => {
      const { data } = await supabase.from("teams").select();
      setTeams((data as TeamInfo[]) ?? []);
    };

    void loadTeams();
  }, [teams.length]);

  return <TeamsContext.Provider value={{ teams, setTeams }}>{children}</TeamsContext.Provider>;
};
