import { Stack, Typography, Button } from "@mui/material";
import { Flag } from "../../../flag/Flag";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import type { TeamInfo } from "../../../../models/Infos";

interface KnockoutButtonProps {
  label: string;
  team?: TeamInfo;
  selected: boolean;
  setSelected: (code: string) => void;
  disabled: boolean;
}

export default function KnockoutButton({ label, team, selected, setSelected, disabled }: KnockoutButtonProps) {
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
      {selected && <RadioButtonCheckedIcon />}
    </Button>
  );
}
