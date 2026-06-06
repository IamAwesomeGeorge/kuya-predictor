import { Box, Grid, Tab, Tabs } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import GroupRankingChooser from "../../components/predict/group/GroupRankingChooser";
import { useTeamsFromGroup, useTeamsReady } from "../../components/utils/TeamsUtils";
import { TabPanel } from "../../components/utils/TabPanel";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { supabase } from "../../utils/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { GroupPredict } from "../../models/Predict";

export default function PredictGroup() {
  const { user } = useContext(UserContext);
  const [mode, setMode] = useState(0);
  const queryClient = useQueryClient();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const { data, isFetching } = useQuery({
    queryKey: ["predict", "group", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group").select().eq("user", user?.id);
      return data as GroupPredict[];
    },
  });

  const { mutate: sendNewPrediction, isPending: isSendingNewPrediction } = useMutation({
    mutationFn: async (newPredict: GroupPredict) => {
      await supabase.from("predictions_group").insert(newPredict);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predict", "group", user?.id] });
    },
  });

  const { mutate: updatePrediction, isPending: isUpdatingPrediction } = useMutation({
    mutationFn: async (newPredict: GroupPredict) => {
      await supabase.from("predictions_group").update(newPredict).eq("id", newPredict.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predict", "group", user?.id] });
    },
  });

  const getCurrentPredictForGroup = (group: string) => {
    return data?.find((predict) => predict.group === group);
  };

  const handlePredictChange = (group: string, selection: Record<number, string | null>) => {
    console.log("Predict change for group", group, selection);
    if (!(selection[1] && selection[2] && selection[3] && selection[4])) {
      return;
    }

    const existingPredict = getCurrentPredictForGroup(group);
    if (existingPredict) {
      console.log("there is one already");
      const updatedPredict: GroupPredict = {
        ...existingPredict,
        updated_at: new Date().toISOString(),
        pos_1: selection[1],
        pos_2: selection[2],
        pos_3: selection[3],
        pos_4: selection[4],
      };
      updatePrediction(updatedPredict);
    } else {
      const newPredict: GroupPredict = {
        updated_at: new Date().toISOString(),
        user: user?.id ?? 0,
        group,
        pos_1: selection[1],
        pos_2: selection[2],
        pos_3: selection[3],
        pos_4: selection[4],
      };
      sendNewPrediction(newPredict);
    }
  };

  const isLoading = isFetching || isSendingNewPrediction || isUpdatingPrediction;

  return (
    <>
      <PageHeader title="Predict Group" />
      {useTeamsReady() && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={mode} onChange={handleTabChange}>
              <Tab label="Groups A-D" sx={{ color: "white" }} />
              <Tab label="Groups E-H" sx={{ color: "white" }} />
              <Tab label="Groups I-L" sx={{ color: "white" }} />
            </Tabs>
          </Box>
          <TabPanel value={mode} index={0}>
            <Grid container spacing={1}>
              {["A", "B", "C", "D"].map((group) => (
                <GroupRankingChooser
                  key={group}
                  group={group}
                  teams={useTeamsFromGroup(group)}
                  loading={isLoading}
                  currentPredictRanking={getCurrentPredictForGroup(group)}
                  handlePredictChange={handlePredictChange}
                />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={mode} index={1}>
            <Grid container spacing={1}>
              {["E", "F", "G", "H"].map((group) => (
                <GroupRankingChooser
                  key={group}
                  group={group}
                  teams={useTeamsFromGroup(group)}
                  loading={isLoading}
                  currentPredictRanking={getCurrentPredictForGroup(group)}
                  handlePredictChange={handlePredictChange}
                />
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={mode} index={2}>
            <Grid container spacing={1}>
              {["I", "J", "K", "L"].map((group) => (
                <GroupRankingChooser
                  key={group}
                  group={group}
                  teams={useTeamsFromGroup(group)}
                  loading={isLoading}
                  currentPredictRanking={getCurrentPredictForGroup(group)}
                  handlePredictChange={handlePredictChange}
                />
              ))}
            </Grid>
          </TabPanel>
        </>
      )}
    </>
  );
}
