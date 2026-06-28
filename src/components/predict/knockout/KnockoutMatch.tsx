import { Box, Card, Typography } from "@mui/material";
import { useContext, useState } from "react";
import type { MatchInfo, TeamInfo } from "../../../models/Infos";
import KnockoutButton from "./KnockoutButton";
import type { PredictKnockout } from "../../../models/Predict";
import { supabase } from "../../../utils/supabase";
import { UserContext } from "../../../contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hasMatchStarted } from "../../utils/TimeUtils";

interface KnockoutMatchProps {
  id: number;
  preview: boolean;
  matches: MatchInfo[];
  knockoutMode: "allTheWay" | "knockout";
  topTeamLabel: string;
  bottomTeamLabel: string;
  topTeam?: TeamInfo;
  bottomTeam?: TeamInfo;
  currentPrediction?: PredictKnockout;
}

export default function KnockoutMatch({
  id,
  preview,
  matches,
  knockoutMode,
  topTeamLabel,
  bottomTeamLabel,
  topTeam,
  bottomTeam,
  currentPrediction,
}: KnockoutMatchProps) {
  const [selection, setSelection] = useState<string>(currentPrediction?.winner || "");
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const handleSelectionChange = (code: string) => {
    if (selection !== code && !preview) {
      setSelection(code);
      sendKnockoutStart(code);
    }
  };

  const { mutate: sendKnockoutStart, isPending } = useMutation({
    mutationFn: async (teamSelected: string) => {
      const table = knockoutMode === "allTheWay" ? "predictions_knockout_start" : "predictions_knockout";
      await supabase.from(table).delete().eq("user", user?.id).eq("matchId", id);
      const prediction: PredictKnockout = {
        updated_at: new Date().toISOString(),
        user: user?.id || 0,
        matchId: id,
        winner: teamSelected,
      };
      await supabase.from(table).insert(prediction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predict", knockoutMode, user?.id] });
    },
  });

  // If id is 103, set label to "3RD PLACE", if id is 104, set label to "FINAL", else set label to "M" + id
  const label = id === 103 ? "3RD PLACE" : id === 104 ? "FINAL" : "M" + id;

  const matchInfo = matches.find((match) => match.id === id);
  const isStarted = matchInfo ? hasMatchStarted(matchInfo.date_time) : false;

  const loading = isPending || !topTeam || !bottomTeam || isStarted;

  return (
    <Card key={"M" + id} sx={{ position: "relative" }}>
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
          my: 0.25,
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
          {label} {isStarted && "(Started)"}
        </Typography>
      </Box>
      <KnockoutButton
        team={topTeam}
        label={topTeamLabel}
        selected={selection === topTeam?.code}
        setSelected={(code) => handleSelectionChange(code)}
        disabled={loading}
      />
      <KnockoutButton
        team={bottomTeam}
        label={bottomTeamLabel}
        selected={selection === bottomTeam?.code}
        setSelected={(code) => handleSelectionChange(code)}
        disabled={loading}
      />
    </Card>
  );
}
