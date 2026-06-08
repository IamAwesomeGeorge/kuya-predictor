import { Stack, Typography, Grid, Card, Button, IconButton } from "@mui/material";
import { Flag } from "../../utils/FlagUtils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useContext, useEffect, useState } from "react";
import { useTeamName } from "../../utils/TeamsUtils";
import { supabase } from "../../../utils/supabase";
import { UserContext } from "../../../contexts/UserContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { PredictData } from "../../../models/Predict";

export default function GroupThirdChooser() {
  const { user } = useContext(UserContext);
  const [selection, setSelection] = useState<string[]>([]);

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

  const { data: currentSelection, isPending: isCurrentSelectionPending } = useQuery({
    queryKey: ["predict", "third", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group_third").select().eq("user", user?.id);
      if (data && data.length > 0) {
        return data[0] as PredictData;
      }
      return null;
    },
  });

  useEffect(() => {
    if (currentSelection) {
      setSelection(currentSelection.data);
    }
  }, [currentSelection, setSelection]);

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
  });

  const resetSelection = () => {
    setSelection([]);
  };

  const handleTeamClick = (code: string) => {
    console.log("Clicked team code:", code);
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
            .sort((a, b) => useTeamName(a).localeCompare(useTeamName(b)))
            .map((teamCode) => (
              <Grid key={teamCode} size={3}>
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
                      {useTeamName(teamCode)}
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
