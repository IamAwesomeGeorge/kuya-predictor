import { Box, Card, Typography } from "@mui/material";
import { useContext, useState } from "react";
import type { MatchInfo, TeamInfo } from "../../../models/Infos";
import KnockoutButton from "./KnockoutButton";
import type { PredictKnockout } from "../../../models/Predict";
import { supabase } from "../../../utils/supabase";
import { UserContext } from "../../../contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hasMatchStarted } from "../../utils/TimeUtils";
import { findWinner } from "../../utils/TeamsUtils";
import KnockoutView from "./KnockoutView";

interface KnockoutMatchViewProps {
  id: number;
  isFinished: boolean;
  matchInfo: MatchInfo | undefined;
  topTeamLabel: string;
  bottomTeamLabel: string;
  topTeam?: TeamInfo;
  bottomTeam?: TeamInfo;
  predictedWinner?: string;
}

export default function KnockoutMatchView({
  id,
  isFinished,
  matchInfo,
  topTeamLabel,
  bottomTeamLabel,
  topTeam,
  bottomTeam,
  predictedWinner,
}: KnockoutMatchViewProps) {
  // If id is 103, set label to "3RD PLACE", if id is 104, set label to "FINAL", else set label to "M" + id
  const label = id === 103 ? "3RD PLACE" : id === 104 ? "FINAL" : "M" + id;
  const waitingForResult = matchInfo?.score_left === null || matchInfo?.score_right === null;
  const winner = matchInfo ? findWinner(matchInfo) : undefined;
  const sufix = !isFinished ? "(Started)" : isFinished && waitingForResult ? " (Waiting for result)" : "Winner is " + winner;

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
            {sufix}
          </Typography>
        </Box>
      </Box>
      <KnockoutView label={topTeamLabel} team={topTeam} predicted={true} winner={true} />
      <KnockoutView label={bottomTeamLabel} team={bottomTeam} predicted={true} winner={true} />
    </Card>
  );
}
