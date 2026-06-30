import { Box, Card, Typography } from "@mui/material";
import type { MatchInfo, TeamInfo } from "../../../models/Infos";
import { findWinner } from "../../utils/TeamsUtils";
import { Flag } from "../../flag/Flag";
import KnockoutStanding from "./KnockoutStanding";

interface KnockoutMatchStandingProps {
  id: number;
  isStarted: boolean;
  isFinished: boolean;
  matchInfo: MatchInfo | undefined;
  topTeamLabel: string;
  bottomTeamLabel: string;
  topTeam?: TeamInfo;
  bottomTeam?: TeamInfo;
}

export default function KnockoutMatchStanding({
  id,
  isStarted,
  isFinished,
  matchInfo,
  topTeamLabel,
  bottomTeamLabel,
  topTeam,
  bottomTeam,
}: KnockoutMatchStandingProps) {
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
      <KnockoutStanding label={topTeamLabel} team={topTeam} winner={winnerTeam} />
      <KnockoutStanding label={bottomTeamLabel} team={bottomTeam} winner={winnerTeam} />
    </Card>
  );
}
