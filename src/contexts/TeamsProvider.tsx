import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { TeamContext } from "./TeamContext";
import type { TeamInfo } from "../models/Infos";
import { supabase } from "../utils/supabase";

export const TeamsProvider = ({ children }: { children: ReactNode }) => {
  const { data, isFetched } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const { data } = await supabase.from("teams").select();
      return data as TeamInfo[];
    },
  });

  const [teams, setTeams] = useState<TeamInfo[]>([]);

  useEffect(() => {
    if (isFetched && data) {
      setTeams(data);
    }
  }, [data, isFetched]);

  return <TeamContext.Provider value={{ teams, setTeams }}>{children}</TeamContext.Provider>;
};
