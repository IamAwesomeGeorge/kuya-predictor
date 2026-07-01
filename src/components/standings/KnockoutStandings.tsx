import { Box } from "@mui/material";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";
import { TeamsContext } from "../../contexts/TeamsContext";
import type { MatchInfo } from "../../models/Infos";
import { BracketStandingsBuilderStart } from "../predict/knockout/BracketBuilder";
import KnockoutTabsStanding from "../predict/knockout/Standings/KnockoutTabsStanding";

export default function KnockoutStandings() {
  const { teams } = useContext(TeamsContext);

  const { data: matchesData } = useQuery({
    queryKey: ["matches", "knockout"],
    queryFn: async () => {
      const { data } = await supabase.from("matches").select().neq("stage", "GROUP").order("date_time", { ascending: true });
      return data as MatchInfo[];
    },
  });

  const bracket = BracketStandingsBuilderStart(teams, matchesData || []);

  return matchesData ? (
    <KnockoutTabsStanding preview={true} matches={matchesData || []} bracket={bracket} />
  ) : (
    <Box sx={{ p: 2 }}>Loading...</Box>
  );
}
