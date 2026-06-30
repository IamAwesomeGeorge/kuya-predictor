import { Stack, Typography, Button } from "@mui/material";
import { Flag } from "../../flag/Flag";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import type { TeamInfo } from "../../../models/Infos";

interface KnockoutButtonProps {
  label: string;
  team?: TeamInfo;
  predicted?: string;
  winner?: string;
}

export default function KnockoutView({ team, label, predicted, winner }: KnockoutButtonProps) {
  const waitingForResult = winner === undefined;
  const isPredicted = predicted === team?.code;
  const correct = predicted === winner;

  return (
    <Button
      variant={isPredicted ? "contained" : "outlined"}
      disabled={!isPredicted}
      color={!waitingForResult && isPredicted ? (correct ? "success" : "error") : "primary"}
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
      {isPredicted && (waitingForResult ? <RadioButtonCheckedIcon /> : correct ? <CheckCircleIcon /> : <ClearIcon />)}
    </Button>
  );
}
