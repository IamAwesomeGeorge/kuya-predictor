import { Stack, Typography, Button } from "@mui/material";
import { Flag } from "../../flag/Flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { TeamInfo } from "../../../models/Infos";

interface KnockoutButtonProps {
  label: string;
  team?: TeamInfo;
  predicted: boolean;
  winner: boolean;
}

export default function KnockoutView({ team, label, predicted, winner }: KnockoutButtonProps) {
  const selected = predicted;
  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      fullWidth
      sx={{ justifyContent: "flex-start", py: 0.5, minHeight: 44 }}
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
      {selected && <CheckCircleIcon />}
    </Button>
  );
}
