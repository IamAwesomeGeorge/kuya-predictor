import { Box, Card, Typography } from "@mui/material";
import { useState } from "react";
import type { TeamInfo } from "../../../models/Infos";
import KnockoutButton from "./KnockoutButton";

interface KnockoutMatchProps {
  id: number;
  topTeamLabel: string;
  bottomTeamLabel: string;
  topTeam?: TeamInfo;
  bottomTeam?: TeamInfo;
}

export default function KnockoutMatch({ id, topTeamLabel, bottomTeamLabel, topTeam, bottomTeam }: KnockoutMatchProps) {
  const [selection, setSelection] = useState<string>("");
  const loading = false;
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
        setSelected={(code) => setSelection(code)}
        disabled={loading || !topTeam || !bottomTeam}
      />
      <KnockoutButton
        team={bottomTeam}
        label={bottomTeamLabel}
        selected={selection === bottomTeam?.code}
        setSelected={(code) => setSelection(code)}
        disabled={loading || !topTeam || !bottomTeam}
      />
    </Card>
  );
}
