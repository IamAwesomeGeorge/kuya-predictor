import { Box } from "@mui/material";
import { useContext } from "react";
import { BracketATWBuilderStart } from "./BracketBuilder";
import type { PredictData, PredictGroup, PredictKnockout } from "../../../models/Predict";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import { TeamsContext } from "../../../contexts/TeamsContext";
import { UserContext } from "../../../contexts/UserContext";
import KnockoutTabs from "./Base/KnockoutTabs";
import type { MatchInfo } from "../../../models/Infos";

export default function StartAllTheWay({ preview = false }: { preview?: boolean }) {
  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamsContext);

  const { data: matchesData } = useQuery({
    queryKey: ["matches", "knockout"],
    queryFn: async () => {
      const { data } = await supabase.from("matches").select().neq("stage", "GROUP").order("date_time", { ascending: true });
      return data as MatchInfo[];
    },
  });

  const { data: predictData } = useQuery({
    queryKey: ["predict", "group", user?.id],
    enabled: !!user?.id && teams.length > 0,
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group").select().eq("user", user?.id);
      return (data ?? [])
        .filter((item): item is PredictGroup => item !== null && item !== undefined)
        .sort((a, b) => a.group.localeCompare(b.group));
    },
  });

  const { data: predictThirdData } = useQuery({
    queryKey: ["predict", "third", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group_third").select().eq("user", user?.id);
      if (data && data.length > 0) {
        return data[0] as PredictData;
      }
      return null;
    },
  });

  const { data: predictKnockoutStartData } = useQuery({
    queryKey: ["predict", "allTheWay", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_knockout_start").select().eq("user", user?.id);
      return data as PredictKnockout[];
    },
  });

  const bracket = BracketATWBuilderStart(teams, predictData || [], predictKnockoutStartData || [], predictThirdData);

  return predictKnockoutStartData ? (
    <KnockoutTabs
      preview={preview}
      knockoutMode="allTheWay"
      matches={matchesData || []}
      bracket={bracket}
      predictions={predictKnockoutStartData}
    />
  ) : (
    <Box sx={{ p: 2 }}>Loading...</Box>
  );
}
