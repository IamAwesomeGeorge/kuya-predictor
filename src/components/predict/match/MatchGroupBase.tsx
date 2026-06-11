import { Grid } from "@mui/material";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../../contexts/UserContext";
import { supabase } from "../../../utils/supabase";
import type { PredictMatch, PredictMatchView } from "../../../models/Predict";
import { useTeamsReady } from "../../utils/TeamsUtils";
import type { MatchInfo } from "../../../models/Infos";
import MatchPredict from "./MatchPredict";
import { hasMatchStarted } from "../../utils/TimeUtils";
import MatchFinished from "./MatchFinished";

interface MatchGroupBaseProps {
  matches?: MatchInfo[];
  currents?: PredictMatchView[];
}

export default function MatchGroupBase({ matches, currents }: MatchGroupBaseProps) {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const doubleCode = currents?.find((c) => c.double)?.match ?? null;

  const { mutate: sendNewPrediction, isPending: isSendingNewPrediction } = useMutation({
    mutationFn: async (newPredict: PredictMatch) => {
      await supabase.from("predictions_matches").delete().eq("user", user?.id).eq("match", newPredict.match);
      await supabase.from("predictions_matches").insert(newPredict);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predictions", "matches", "view", "group", user?.id] });
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
          {matches.map((match) => {
            return hasMatchStarted(match.date_time) ? (
              <MatchFinished
                key={match.id}
                match={match}
                current={findCurrentPredict(match.id)}
                handlePredictChange={handlePredictChange}
                isLoading={isSendingNewPrediction}
                doubleCode={doubleCode}
              />
            ) : (
              <MatchPredict
                key={match.id}
                match={match}
                current={findCurrentPredict(match.id)}
                handlePredictChange={handlePredictChange}
                isLoading={isSendingNewPrediction}
                doubleCode={doubleCode}
              />
            );
          })}
        </Grid>
      )}
    </>
  );
}
