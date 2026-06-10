import { Typography, Grid, Card } from "@mui/material";
import { useState } from "react";
import type { TeamInfo } from "../../../models/Infos";
import KnockoutButton from "./KnockoutButton";

interface KnockoutMatchProps {
  topTeamLabel: string;
  bottomTeamLabel: string;
  topTeam?: TeamInfo;
  bottomTeam?: TeamInfo;
}

export default function KnockoutMatch({ topTeamLabel, bottomTeamLabel, topTeam, bottomTeam }: KnockoutMatchProps) {
  const [selection, setSelection] = useState<string>("");
  const loading = false;
  return (
    <Card key={topTeamLabel + bottomTeamLabel} sx={{ position: "relative" }}>
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
