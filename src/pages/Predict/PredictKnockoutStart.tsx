import { Box, Tab, Tabs } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import { useContext, useState } from "react";
import { TabPanel } from "../../components/utils/TabPanel";
import { BracketBuilderStart } from "../../components/predict/knockout/BracketBuilder";
import type { PredictData, PredictGroup, PredictKnockout } from "../../models/Predict";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";
import { TeamsContext } from "../../contexts/TeamsContext";
import { UserContext } from "../../contexts/UserContext";
import KnockoutBase from "../../components/predict/knockout/KnockoutBase";

export default function PredictKnockoutStart() {
  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamsContext);
  const [mode, setMode] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const { data: predictData } = useQuery({
    queryKey: ["predict", "group", user?.id],
    enabled: !!user?.id && teams.length > 0,
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group").select().eq("user", user?.id);
      return (data ?? [])
        .filter((item): item is PredictGroup => item !== null && item !== undefined)
        .sort((a, b) => a.group.localeCompare(b.group));
    },
  });

  const { data: predictThirdData } = useQuery({
    queryKey: ["predict", "third", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group_third").select().eq("user", user?.id);
      if (data && data.length > 0) {
        return data[0] as PredictData;
      }
      return null;
    },
  });

  const { data: predictKnockoutStartData } = useQuery({
    queryKey: ["predict", "knockout", "start", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_knockout_start").select().eq("user", user?.id);
      return data as PredictKnockout[];
    },
  });

  const bracket = BracketBuilderStart(teams, predictData || [], predictThirdData);

  return (
    <>
      <PageHeader title="Predict Knockout Start" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleTabChange}>
          <Tab label="Round of 32" sx={{ color: "white" }} />
          <Tab label="Round of 16" sx={{ color: "white" }} />
          <Tab label="Quarterfinals" sx={{ color: "white" }} />
          <Tab label="Semifinals" sx={{ color: "white" }} />
          <Tab label="Final" sx={{ color: "white" }} />
        </Tabs>
      </Box>
      <TabPanel value={mode} index={0}>
        <KnockoutBase
          knockoutMatchInfo={bracket.filter((match) => match.stage === "ROUND_OF_32")}
          currentPredictions={predictKnockoutStartData}
        />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        <KnockoutBase knockoutMatchInfo={bracket.filter((match) => match.stage === "ROUND_OF_16")} />
      </TabPanel>
      <TabPanel value={mode} index={2}>
        <KnockoutBase knockoutMatchInfo={bracket.filter((match) => match.stage === "QUARTERFINAL")} />
      </TabPanel>
      <TabPanel value={mode} index={3}>
        <KnockoutBase knockoutMatchInfo={bracket.filter((match) => match.stage === "SEMIFINAL")} />
      </TabPanel>
      <TabPanel value={mode} index={4}>
        <KnockoutBase knockoutMatchInfo={bracket.filter((match) => match.stage === "FINAL")} />
      </TabPanel>
    </>
  );
}
