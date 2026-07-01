import { Box, Card, Typography } from "@mui/material";
import type { MatchInfo, TeamInfo } from "../../../../models/Infos";
import { findWinner } from "../../../utils/TeamsUtils";
import KnockoutView from "./KnockoutView";
import { Flag } from "../../../flag/Flag";
import KnockoutMatchOthers from "./KnockoutMatchOthers";

interface KnockoutMatchViewProps {
  id: number;
  isStarted: boolean;
  isFinished: boolean;
  matchInfo: MatchInfo | undefined;
  knockoutMode: "allTheWay" | "knockout";
  topTeamLabel: string;
  bottomTeamLabel: string;
  topTeam?: TeamInfo;
  bottomTeam?: TeamInfo;
  predictedWinner?: string;
}

export default function KnockoutMatchView({
  id,
  isStarted,
  isFinished,
  matchInfo,
  knockoutMode,
  topTeamLabel,
  bottomTeamLabel,
  topTeam,
  bottomTeam,
  predictedWinner,
}: KnockoutMatchViewProps) {
  // If id is 103, set label to "3RD PLACE", if id is 104, set label to "FINAL", else set label to "M" + id
  const label = id === 103 ? "3RD PLACE" : id === 104 ? "FINAL" : "M" + id;
  const waitingForResult = matchInfo?.score_left === null || matchInfo?.score_right === null;
  const winnerTeam = matchInfo ? findWinner(matchInfo) : undefined;
  const infoBox = !isFinished ? "Started" : isFinished && waitingForResult ? " Waiting for result" : "Winner:";

  return (
    <Card key={"M" + id + "-view"} sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, my: 0.25 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2d3163",
            borderRadius: "6px",
            px: 1.75,
            py: 0.75,
            minWidth: 25,
            mx: 0.25,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.75rem",
              lineHeight: 1,
            }}
          >
            {label}
          </Typography>
        </Box>
        {isStarted && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: waitingForResult ? "#634b2d" : "#2d3163",
              borderRadius: "6px",
              px: 1.75,
              py: 0.75,
              minWidth: 25,
              mx: 0.25,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.75rem",
                lineHeight: 1,
              }}
            >
              {infoBox}
            </Typography>
            {!waitingForResult && <Flag code={winnerTeam ?? "ZZ"} tooltip style={{ lineHeight: 0.7 }} />}
          </Box>
        )}
      </Box>
      <KnockoutView label={topTeamLabel} team={topTeam} predicted={predictedWinner} winner={winnerTeam} />
      <KnockoutView label={bottomTeamLabel} team={bottomTeam} predicted={predictedWinner} winner={winnerTeam} />
      <KnockoutMatchOthers match={id} winner={winnerTeam ?? "??"} knockoutMode={knockoutMode} />
    </Card>
  );
}
