import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import type { PredictGroup } from "../../../models/Predict";
import { useTeamsReady } from "../../utils/TeamsUtils";
import type { GroupStageStandings } from "../../../models/Results";
import GroupRankingView from "./GroupRankingView";

interface GroupRankingViewerProps {
  teamCodes: string[];
  data?: PredictGroup[];
  isPending: boolean;
}

export default function GroupRankingViewer({ teamCodes, data, isPending }: GroupRankingViewerProps) {
  const { data: groupStandings } = useQuery({
    queryKey: ["group_standings"],
    queryFn: async () => {
      const { data } = await supabase
        .from("group_stage_standings")
        .select()
        .order("group", { ascending: true })
        .order("points", { ascending: false })
        .order("gd", { ascending: false })
        .order("gf", { ascending: false })
        .order("ga", { ascending: true });

      return data as GroupStageStandings[];
    },
  });

  const getCurrentPredictForGroup = (group: string) => {
    return data?.find((predict) => predict.group === group);
  };

  const getCurrentStandingsForGroup = (group: string) => {
    return groupStandings?.filter((standing) => standing.group === group);
  };

  return (
    <>
      {useTeamsReady() && !isPending && (
        <Grid container spacing={1}>
          {teamCodes.map((group) => (
            <GroupRankingView
              key={group}
              group={group}
              currentPredictRanking={getCurrentPredictForGroup(group)}
              groupStandings={getCurrentStandingsForGroup(group)}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
