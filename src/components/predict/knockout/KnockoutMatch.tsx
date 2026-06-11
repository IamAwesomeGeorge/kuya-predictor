import { Box, Card, Typography } from "@mui/material";
import { useContext, useState } from "react";
import type { TeamInfo } from "../../../models/Infos";
import KnockoutButton from "./KnockoutButton";
import type { PredictKnockout } from "../../../models/Predict";
import { supabase } from "../../../utils/supabase";
import { UserContext } from "../../../contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface KnockoutMatchProps {
  id: number;
  topTeamLabel: string;
  bottomTeamLabel: string;
  topTeam?: TeamInfo;
  bottomTeam?: TeamInfo;
  currentPrediction?: PredictKnockout;
}

export default function KnockoutMatch({
  id,
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
    if (selection !== code) {
      setSelection(code);
      sendKnockoutStart(code);
    }
  };

  const { mutate: sendKnockoutStart, isPending } = useMutation({
    mutationFn: async (teamSelected: string) => {
      await supabase.from("predictions_knockout_start").delete().eq("user", user?.id).eq("matchId", id);
      const prediction: PredictKnockout = {
        updated_at: new Date().toISOString(),
        user: user?.id || 0,
        matchId: id,
        winner: teamSelected,
      };
      await supabase.from("predictions_knockout_start").insert(prediction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predict", "knockout", "start", user?.id] });
    },
  });

  const loading = isPending || !topTeam || !bottomTeam;

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
          M{id}
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
