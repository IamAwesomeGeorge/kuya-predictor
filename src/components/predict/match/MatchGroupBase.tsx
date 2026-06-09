import { Grid } from "@mui/material";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../../contexts/UserContext";
import { supabase } from "../../../utils/supabase";
import type { PredictMatch, PredictMatchView } from "../../../models/Predict";
import { useTeamsReady } from "../../utils/TeamsUtils";
import type { MatchInfo } from "../../../models/Infos";
import MatchPredict from "./MatchPredict";

interface MatchGroupBaseProps {
  matches?: MatchInfo[];
  currents?: PredictMatchView[];
}

export default function MatchGroupBase({ matches, currents }: MatchGroupBaseProps) {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const { mutate: sendNewPrediction, isPending: isSendingNewPrediction } = useMutation({
    mutationFn: async (newPredict: PredictMatch) => {
      await supabase.from("predictions_match").delete().eq("user", user?.id).eq("match", newPredict.match);
      await supabase.from("predictions_match").insert(newPredict);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predict", "group", user?.id] });
    },
  });

  const findCurrentPredict = (matchId: number) => {
    return currents?.find((c) => c.match === matchId);
  };

  const handlePredictChange = (
    matchId: number,
    score_left: number,
    score_right: number,
    first_scorer: string | null,
    double: boolean,
  ) => {
    // Todo: check double is valid
    const newPredict: PredictMatch = {
      updated_at: new Date().toISOString(),
      user: user?.id ?? 0,
      match: matchId,
      score_left: score_left,
      score_right: score_right,
      first_scorer: first_scorer,
      double: double,
    };
    sendNewPrediction(newPredict);
  };

  return (
    <>
      {useTeamsReady() && matches && (
        <Grid container spacing={1}>
          {matches.map((match) => (
            <MatchPredict
              key={match.id}
              match={match}
              current={findCurrentPredict(match.id)}
              handlePredictChange={handlePredictChange}
              isLoading={isSendingNewPrediction}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
