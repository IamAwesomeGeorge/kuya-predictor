import { Stack, Typography, Grid, Card, Button, IconButton } from "@mui/material";
import type { TeamInfo } from "../../../models/Infos";
import { Flag } from "../../utils/FlagUtils";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import CancelIcon from "@mui/icons-material/Cancel";
import type { JSX } from "react/jsx-runtime";
import type { GroupPredictPre } from "../../../models/Predict";
import { useState } from "react";

interface GroupRankingChooserProps {
  teams: TeamInfo[];
  predictRanking: GroupPredictPre;
}

export default function GroupRankingChooser({ teams, predictRanking }: GroupRankingChooserProps) {
  const [selection, setSelection] = useState<Record<number, string | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const numberIconMap: Record<number, JSX.Element> = {
    1: <LooksOneIcon />,
    2: <LooksTwoIcon />,
    3: <Looks3Icon />,
    4: <Looks4Icon />,
  };

  const resetSelection = () => {
    setSelection({
      1: null,
      2: null,
      3: null,
      4: null,
    });
  };

  const handleTeamClick = (code: string) => {
    if (isInSelection(code)) {
      return;
    }
    if (!selection[1]) {
      setSelection({ ...selection, 1: code });
    } else if (!selection[2]) {
      setSelection({ ...selection, 2: code });
    } else if (!selection[3]) {
      // find the 4th team not selected
      const lastSelected =
        teams.map((t) => t.code).find((c) => c !== selection[1] && c !== selection[2] && c !== code) ?? null;
      setSelection({ ...selection, 3: code, 4: lastSelected });
    }
  };

  const isInSelection = (code: string) => {
    return Object.values(selection).includes(code);
  };

  const selectionPos = (code: string) => {
    const pos = Object.entries(selection).find(([_, c]) => c === code)?.[0];
    return pos ? parseInt(pos) : null;
  };

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          GROUP {teams[0].group}
        </Typography>
        <IconButton aria-label="restart" size="small" onClick={resetSelection}>
          <CancelIcon fontSize="small" />
        </IconButton>
        <Grid container spacing={1} sx={{ p: 1, pt: 0 }}>
          {teams.map((team) => (
            <Grid key={team.code} size={6}>
              <Button
                variant={isInSelection(team.code) ? "contained" : "outlined"}
                fullWidth
                sx={{ justifyContent: "flex-start", py: 0.5, minHeight: 44 }}
                onClick={() => handleTeamClick(team.code)}
              >
                <Stack direction="row" spacing={1} sx={{ width: "100%", alignItems: "center" }}>
                  <Flag code={team.code} />
                  <Typography variant="body2" noWrap>
                    {team.name}
                  </Typography>
                </Stack>
                {selectionPos(team.code) && numberIconMap[selectionPos(team.code)!]}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Grid>
  );
}
