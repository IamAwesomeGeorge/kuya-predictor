import { Stack, Typography, Button } from "@mui/material";
import { Flag } from "../../../flag/Flag";
import type { TeamInfo } from "../../../../models/Infos";

interface KnockoutStandingProps {
  label: string;
  team?: TeamInfo;
  winner?: string;
}

export default function KnockoutStanding({ team, label, winner }: KnockoutStandingProps) {
  const waitingForResult = winner === undefined;
  const isWinner = winner ? winner === team?.code : false;

  return (
    <Button
      variant={isWinner ? "contained" : "outlined"}
      color={isWinner ? "success" : "primary"}
      disabled={!isWinner && !waitingForResult}
      fullWidth
      sx={{ justifyContent: "flex-start", py: 0.5, minHeight: 44, pointerEvents: "none" }}
    >
      <Stack direction="row" spacing={1} sx={{ width: "100%", alignItems: "center" }}>
        <Typography variant="body2" noWrap sx={{ color: "black", opacity: 0.5 }}>
          {label}
        </Typography>
        {team && (
          <>
            <Flag code={team.code} />
            <Typography variant="body2" noWrap>
              {team.name}
            </Typography>
          </>
        )}
      </Stack>
    </Button>
  );
}
