import { Grid, Stack } from "@mui/material";
import type { TeamInfo } from "../../../models/Infos";
import KnockoutMatch from "./KnockoutMatch";
import KnockoutLine from "./KnockoutLine";
import type { PredictKnockout } from "../../../models/Predict";

interface KnockoutDuelProps {
  preview: boolean;
  knockoutMode: "allTheWay" | "knockout";
  topId: number;
  topTopTeamLabel: string;
  topBottomTeamLabel: string;
  topTopTeam?: TeamInfo;
  topBottomTeam?: TeamInfo;
  bottomId: number;
  bottomTopTeamLabel: string;
  bottomBottomTeamLabel: string;
  bottomTopTeam?: TeamInfo;
  bottomBottomTeam?: TeamInfo;
  currentPredictions?: PredictKnockout[];
}

export default function KnockoutDuel({
  preview,
  knockoutMode,
  topId,
  topTopTeamLabel,
  topBottomTeamLabel,
  topTopTeam,
  topBottomTeam,
  bottomId,
  bottomTopTeamLabel,
  bottomBottomTeamLabel,
  bottomTopTeam,
  bottomBottomTeam,
  currentPredictions,
}: KnockoutDuelProps) {
  return (
    <Grid key={"M" + topId + "M" + bottomId} size={{ xs: 6, md: 3 }} sx={{ position: "relative" }}>
      <Stack spacing={0} sx={{ width: "100%" }}>
        <KnockoutMatch
          id={topId}
          preview={preview}
          knockoutMode={knockoutMode}
          topTeamLabel={topTopTeamLabel}
          bottomTeamLabel={topBottomTeamLabel}
          topTeam={topTopTeam}
          bottomTeam={topBottomTeam}
          currentPrediction={currentPredictions?.find((pred) => pred.matchId === topId)}
        />
        <KnockoutLine />
        <KnockoutMatch
          id={bottomId}
          preview={preview}
          knockoutMode={knockoutMode}
          topTeamLabel={bottomTopTeamLabel}
          bottomTeamLabel={bottomBottomTeamLabel}
          topTeam={bottomTopTeam}
          bottomTeam={bottomBottomTeam}
          currentPrediction={currentPredictions?.find((pred) => pred.matchId === bottomId)}
        />
      </Stack>
    </Grid>
  );
}
