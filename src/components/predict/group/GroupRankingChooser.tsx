import { Stack, Typography, Grid, Card, Button, IconButton } from "@mui/material";
import { Flag } from "../../utils/FlagUtils";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type { JSX } from "react/jsx-runtime";
import type { PredictGroupPre } from "../../../models/Predict";
import { useState } from "react";
import { useTeamsFromGroup } from "../../utils/TeamsUtils";

interface GroupRankingChooserProps {
  group: string;
  loading: boolean;
  currentPredictRanking?: PredictGroupPre;
  handlePredictChange: (group: string, selection: Record<number, string | null>) => void;
  setShowWarning: (show: boolean) => void;
}

const EMPTY_SELECTION: Record<number, string | null> = {
  1: null,
  2: null,
  3: null,
  4: null,
};

export default function GroupRankingChooser({
  group,
  loading,
  currentPredictRanking,
  handlePredictChange,
  setShowWarning,
}: GroupRankingChooserProps) {
  const teams = useTeamsFromGroup(group);
  const [selection, setSelection] = useState<Record<number, string | null>>(() =>
    currentPredictRanking
      ? {
          1: currentPredictRanking.pos_1,
          2: currentPredictRanking.pos_2,
          3: currentPredictRanking.pos_3,
          4: currentPredictRanking.pos_4,
        }
      : EMPTY_SELECTION,
  );

  const numberIconMap: Record<number, JSX.Element> = {
    1: <LooksOneIcon />,
    2: <LooksTwoIcon />,
    3: <Looks3Icon />,
    4: <Looks4Icon />,
  };

  const resetSelection = () => {
    setSelection(EMPTY_SELECTION);
    setShowWarning(true);
  };

  const handleTeamClick = (code: string) => {
    if (isInSelection(code)) return;
    if (!selection[1]) {
      setSelection({ ...selection, 1: code });
    } else if (!selection[2]) {
      setSelection({ ...selection, 2: code });
    } else if (!selection[3]) {
      const lastSelected =
        teams.map((t) => t.code).find((c) => c !== selection[1] && c !== selection[2] && c !== code) ?? null;
      const updatedSelection = { ...selection, 3: code, 4: lastSelected };
      setSelection(updatedSelection);
      handlePredictChange(group, updatedSelection);
    }
  };

  const isInSelection = (code: string) => {
    return Object.values(selection).includes(code);
  };

  const selectionPos = (code: string) => {
    const pos = Object.entries(selection).find(([, c]) => c === code)?.[0];
    return pos ? parseInt(pos) : null;
  };

  const isSelectionComplete = Object.values(selection).every((c) => c !== null);

  return (
    <Grid key={group} size={{ xs: 12, md: 6 }}>
      <Card key={group} sx={{ position: "relative" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            pt: 1,
            color: isSelectionComplete ? "#006400" : "#640000",
          }}
        >
          GROUP {group}
        </Typography>
        <IconButton
          aria-label="restart"
          size="small"
          onClick={resetSelection}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <RestartAltIcon fontSize="small" />
        </IconButton>
        <Grid container spacing={1} sx={{ p: 1, pt: 0 }}>
          {teams.map((team) => (
            <Grid key={team.code} size={6}>
              <Button
                disabled={loading}
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
