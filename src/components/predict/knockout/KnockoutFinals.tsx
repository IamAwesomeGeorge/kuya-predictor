import { Grid, Stack } from "@mui/material";
import type { KnockoutMatchInfo } from "../../../models/Knockout";
import type { PredictKnockout } from "../../../models/Predict";
import KnockoutMatch from "./KnockoutMatch";

interface KnockoutFinalsProps {
  knockoutMatchInfo: KnockoutMatchInfo[];
  currentPredictions?: PredictKnockout[];
}

export default function KnockoutFinals({ knockoutMatchInfo, currentPredictions }: KnockoutFinalsProps) {
  const loserMatch = knockoutMatchInfo.find((match) => match.id === 103);
  const winnerMatch = knockoutMatchInfo.find((match) => match.id === 104);

  // Ensure both matches are found before rendering
  return (
    <>
      {loserMatch && winnerMatch && (
        <Grid container spacing={1}>
          <KnockoutMatch
            id={loserMatch.id}
            topTeamLabel={loserMatch.left}
            bottomTeamLabel={loserMatch.right}
            topTeam={loserMatch.leftTeam}
            bottomTeam={loserMatch.rightTeam}
            currentPrediction={currentPredictions?.find((pred) => pred.matchId === loserMatch.id)}
          />

          <KnockoutMatch
            id={winnerMatch.id}
            topTeamLabel={winnerMatch.left}
            bottomTeamLabel={winnerMatch.right}
            topTeam={winnerMatch.leftTeam}
            bottomTeam={winnerMatch.rightTeam}
            currentPrediction={currentPredictions?.find((pred) => pred.matchId === winnerMatch.id)}
          />
        </Grid>
      )}
    </>
  );
}
