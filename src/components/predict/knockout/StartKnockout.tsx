import { Box } from "@mui/material";
import { useContext } from "react";
import { BracketKnockoutBuilderStart } from "./BracketBuilder";
import type { PredictData, PredictGroup, PredictKnockout } from "../../../models/Predict";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import { TeamsContext } from "../../../contexts/TeamsContext";
import { UserContext } from "../../../contexts/UserContext";
import KnockoutTabs from "./KnockoutTabs";
import type { FinalTeams } from "../../../models/Knockout";

export default function StartKnockout({ preview = false }: { preview?: boolean }) {
  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamsContext);

  const { data: finalTeams } = useQuery({
    queryKey: ["finalTeams"],
    enabled: !!user?.id && teams.length > 0,
    queryFn: async () => {
      const { data } = await supabase.from("final_teams").select();
      console.log("finalTeams", data);
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
    <KnockoutTabs preview={preview} knockoutMode="knockout" bracket={bracket} predictions={predictKnockoutData} />
  ) : (
    <Box sx={{ p: 2 }}>Loading...</Box>
  );
}
