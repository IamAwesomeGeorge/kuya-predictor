import { Box } from "@mui/material";
import { useContext } from "react";
import { BracketKnockoutBuilderStart } from "./BracketBuilder";
import type { PredictKnockout } from "../../../models/Predict";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import { TeamsContext } from "../../../contexts/TeamsContext";
import { UserContext } from "../../../contexts/UserContext";
import KnockoutTabs from "./KnockoutTabs";
import type { FinalTeams } from "../../../models/Knockout";
import type { MatchInfo } from "../../../models/Infos";

export default function StartKnockout({ preview = false }: { preview?: boolean }) {
  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamsContext);

  const { data: matchesData } = useQuery({
    queryKey: ["matches", "knockout"],
    queryFn: async () => {
      const { data } = await supabase.from("matches").select().neq("stage", "GROUP").order("date_time", { ascending: true });
      return data as MatchInfo[];
    },
  });

  const { data: finalTeams } = useQuery({
    queryKey: ["finalTeams"],
    enabled: !!user?.id && teams.length > 0,
    queryFn: async () => {
      const { data } = await supabase.from("final_teams").select();
      return data as FinalTeams[];
    },
  });

  const { data: predictKnockoutData } = useQuery({
    queryKey: ["predict", "knockout", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_knockout").select().eq("user", user?.id);
      return data as PredictKnockout[];
    },
  });

  const bracket = BracketKnockoutBuilderStart(teams, finalTeams || [], predictKnockoutData || []);

  return predictKnockoutData ? (
    <KnockoutTabs
      preview={preview}
      knockoutMode="knockout"
      matches={matchesData || []}
      bracket={bracket}
      predictions={predictKnockoutData}
    />
  ) : (
    <Box sx={{ p: 2 }}>Loading...</Box>
  );
}
