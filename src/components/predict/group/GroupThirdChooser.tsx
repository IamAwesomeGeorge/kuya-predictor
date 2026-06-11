import { Stack, Typography, Grid, Card, Button, IconButton } from "@mui/material";
import { Flag } from "../../utils/FlagUtils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useContext, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { UserContext } from "../../../contexts/UserContext";
import { TeamsContext } from "../../../contexts/TeamsContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PredictData } from "../../../models/Predict";

interface GroupThirdChooserProps {
  currentSelection?: PredictData | null;
  isCurrentSelectionPending: boolean;
}

export default function GroupThirdChooser({ currentSelection, isCurrentSelectionPending }: GroupThirdChooserProps) {
  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamsContext);
  const queryClient = useQueryClient();
  const [selection, setSelection] = useState<string[]>(() => currentSelection?.data ?? []);

  const getTeamName = (teamCode: string) => teams.find((team) => team.code === teamCode)?.name ?? teamCode;

  const { data: thirdPlaces, isPending: isGroupPending } = useQuery({
    queryKey: ["predict", "third", "group", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group").select("pos_3").eq("user", user?.id);
      const teams: string[] = [];
      data?.forEach((predict) => {
        if (predict.pos_3) {
          teams.push(predict.pos_3);
        }
      });
      return teams;
    },
  });

  const { mutate: sendNewThird, isPending: isSendingNewThird } = useMutation({
    mutationFn: async (newThirds: string[]) => {
      await supabase.from("predictions_group_third").delete().eq("user", user?.id);
      const prediction: PredictData = {
        updated_at: new Date().toISOString(),
        user: user?.id || 0,
        data: newThirds,
      };
      await supabase.from("predictions_group_third").insert(prediction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predict", "third", user?.id] });
    },
  });

  const resetSelection = () => {
    setSelection([]);
  };

  const handleTeamClick = (code: string) => {
    if (isInSelection(code)) return;
    const newSelection = [...selection, code];
    setSelection(newSelection);
    if (newSelection.length === 8) {
      sendNewThird(newSelection);
    }
  };

  const isInSelection = (code: string) => {
    return Object.values(selection).includes(code);
  };

  const isSelectionComplete = selection.length === 8;

  const isLoading = isGroupPending || isCurrentSelectionPending || isSendingNewThird;

  return (
    <Card sx={{ position: "relative" }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          pt: 1,
          color: isSelectionComplete ? "#006400" : "#640000",
        }}
      >
        Third Place Winner {selection.length}/8
      </Typography>
      <IconButton aria-label="restart" size="small" onClick={resetSelection} sx={{ position: "absolute", right: 8, top: 8 }}>
        <RestartAltIcon fontSize="small" />
      </IconButton>
      <Grid container spacing={1} sx={{ p: 1, pt: 0 }}>
        {thirdPlaces &&
          thirdPlaces
            .sort((a, b) => getTeamName(a).localeCompare(getTeamName(b)))
            .map((teamCode) => (
              <Grid key={teamCode} size={{ xs: 6, md: 3 }}>
                <Button
                  disabled={isLoading || (selection.length === 8 && !isInSelection(teamCode))}
                  variant={isInSelection(teamCode) ? "contained" : "outlined"}
                  fullWidth
                  sx={{ justifyContent: "flex-start", py: 0.5, minHeight: 44 }}
                  onClick={() => handleTeamClick(teamCode)}
                >
                  <Stack direction="row" spacing={1} sx={{ width: "100%", alignItems: "center" }}>
                    <Flag code={teamCode} />
                    <Typography variant="body2" noWrap>
                      {getTeamName(teamCode)}
                    </Typography>
                  </Stack>
                  {isInSelection(teamCode) && <CheckCircleIcon />}
                </Button>
              </Grid>
            ))}
      </Grid>
    </Card>
  );
}
