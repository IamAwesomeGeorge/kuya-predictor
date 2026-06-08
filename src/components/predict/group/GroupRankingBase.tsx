import { Grid } from "@mui/material";
import { useContext } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../../contexts/UserContext";
import { supabase } from "../../../utils/supabase";
import type { PredictGroup } from "../../../models/Predict";
import GroupRankingChooser from "./GroupRankingChooser";
import { useTeamsReady } from "../../utils/TeamsUtils";

export default function GroupRankingBase({ teamCodes }: { teamCodes: string[] }) {
  const { user } = useContext(UserContext);

  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["predict", "group", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group").select().eq("user", user?.id);
      return data as PredictGroup[];
    },
  });

  const { mutate: sendNewPrediction, isPending: isSendingNewPrediction } = useMutation({
    mutationFn: async (newPredict: PredictGroup) => {
      await supabase.from("predictions_group").insert(newPredict);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predict", "group", user?.id] });
    },
  });

  const { mutate: updatePrediction, isPending: isUpdatingPrediction } = useMutation({
    mutationFn: async (newPredict: PredictGroup) => {
      await supabase.from("predictions_group").update(newPredict).eq("id", newPredict.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predict", "group", user?.id] });
    },
  });

  const getCurrentPredictForGroup = (group: string) => {
    return data?.find((predict) => predict.group === group);
  };

  const handlePredictChange = (group: string, selection: Record<number, string | null>) => {
    if (!(selection[1] && selection[2] && selection[3] && selection[4])) {
      return;
    }

    const existingPredict = getCurrentPredictForGroup(group);
    if (existingPredict) {
      const updatedPredict: PredictGroup = {
        ...existingPredict,
        updated_at: new Date().toISOString(),
        pos_1: selection[1],
        pos_2: selection[2],
        pos_3: selection[3],
        pos_4: selection[4],
      };
      updatePrediction(updatedPredict);
    } else {
      const newPredict: PredictGroup = {
        updated_at: new Date().toISOString(),
        user: user?.id ?? 0,
        group,
        pos_1: selection[1],
        pos_2: selection[2],
        pos_3: selection[3],
        pos_4: selection[4],
      };
      sendNewPrediction(newPredict);
    }
  };

  const isLoading = isSendingNewPrediction || isUpdatingPrediction;

  return (
    <>
      {useTeamsReady() && !isPending && (
        <Grid container spacing={1}>
          {teamCodes.map((group) => (
            <GroupRankingChooser
              key={group}
              group={group}
              loading={isLoading}
              currentPredictRanking={getCurrentPredictForGroup(group)}
              handlePredictChange={handlePredictChange}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
