import { Alert, Box, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../../contexts/UserContext";
import { supabase } from "../../../utils/supabase";
import type { PredictGroup } from "../../../models/Predict";
import GroupRankingChooser from "./GroupRankingChooser";
import { useTeamsReady } from "../../utils/TeamsUtils";

interface GroupRankingBaseProps {
  teamCodes: string[];
  data?: PredictGroup[];
  isPending: boolean;
}

export default function GroupRankingBase({ teamCodes, data, isPending }: GroupRankingBaseProps) {
  const { user } = useContext(UserContext);
  const [showWarning, setShowWarning] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: sendNewPrediction, isPending: isSendingNewPrediction } = useMutation({
    mutationFn: async (newPredict: PredictGroup) => {
      await supabase.from("predictions_group").delete().eq("user", user?.id).eq("group", newPredict.group);
      await supabase.from("predictions_group").insert(newPredict);
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
  };

  const isLoading = isSendingNewPrediction;

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
              setShowWarning={setShowWarning}
            />
          ))}
        </Grid>
      )}

      {showWarning && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Alert severity="warning" sx={{ mt: 2 }}>
            Ensure your third place selections are still valid after editing.
            <br />
            Invalid selections will result in 0 points across all group predictions.
          </Alert>
        </Box>
      )}
    </>
  );
}
