import { Stack, Typography, Button } from "@mui/material";
import { Flag } from "../../utils/FlagUtils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { TeamInfo } from "../../../models/Infos";

interface KnockoutButtonProps {
  team?: TeamInfo;
  label: string;
  selected: boolean;
  setSelected: (code: string) => void;
  disabled: boolean;
}

export default function KnockoutButton({ team, label, selected, setSelected, disabled }: KnockoutButtonProps) {
  return (
    <Button
      disabled={disabled}
      variant={selected ? "contained" : "outlined"}
      fullWidth
      sx={{ justifyContent: "flex-start", py: 0.5, minHeight: 44 }}
      onClick={team && (() => setSelected(team.code))}
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
