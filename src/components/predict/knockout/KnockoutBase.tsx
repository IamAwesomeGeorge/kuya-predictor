import { Grid } from "@mui/material";
import KnockoutDuel from "./KnockoutDuel";
import type { KnockoutMatchInfo } from "../../../models/Knockout";
import type { JSX } from "react/jsx-runtime";
import type { PredictKnockout } from "../../../models/Predict";

interface KnockoutBaseProps {
  preview: boolean;
  knockoutMatchInfo: KnockoutMatchInfo[];
  currentPredictions?: PredictKnockout[];
}

export default function KnockoutBase({ preview, knockoutMatchInfo, currentPredictions }: KnockoutBaseProps) {
  return (
    <>
      <Grid container spacing={1}>
        {knockoutMatchInfo.reduce<JSX.Element[]>((acc, match, index) => {
          if (index % 2 === 0) {
            const nextMatch = knockoutMatchInfo[index + 1];
            acc.push(
              <KnockoutDuel
                key={match.id}
                preview={preview}
                topId={match.id}
                topTopTeamLabel={match.left}
                topTopTeam={match.leftTeam}
                topBottomTeamLabel={match.right}
                topBottomTeam={match.rightTeam}
                bottomId={nextMatch ? nextMatch.id : 0}
                bottomTopTeamLabel={nextMatch?.left}
                bottomTopTeam={nextMatch?.leftTeam}
                bottomBottomTeamLabel={nextMatch?.right}
                bottomBottomTeam={nextMatch?.rightTeam}
                currentPredictions={currentPredictions}
              />,
            );
          }
          return acc;
        }, [])}
      </Grid>
    </>
  );
}
