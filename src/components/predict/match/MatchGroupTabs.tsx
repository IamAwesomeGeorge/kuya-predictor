import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { TabPanel } from "../../utils/TabPanel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import type { MatchInfo } from "../../../models/Infos";
import MatchGroupBase from "./MatchGroupBase";
import { UserContext } from "../../../contexts/UserContext";
import type { PredictMatchView } from "../../../models/Predict";
import { isMobile } from "../../utils/MobileUtils";

export default function MatchGroupTabs() {
  const [mode, setMode] = useState(0);
  const { user } = useContext(UserContext);

  const { data } = useQuery({
    queryKey: ["matches", "group"],
    queryFn: async () => {
      const { data } = await supabase.from("matches").select().eq("stage", "GROUP").order("date_time", { ascending: true });
      return data as MatchInfo[];
    },
  });

  const { data: predictions } = useQuery({
    queryKey: ["predictions", "matches", "view", "group", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_matches_view").select().eq("stage", "GROUP").eq("user", user?.id);
      return data as PredictMatchView[];
    },
  });

  const findMatchesFromGroup = (group: string) => {
    return data?.filter((m) => m.stage_info === group);
  };

  const findPredictionsFromGroup = (group: string) => {
    return predictions?.filter((p) => p.stage_info === group);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const groupsIndexMap: { [key: number]: string } = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J",
    10: "K",
    11: "L",
  };

  const groupsComplete = {
    A: findMatchesFromGroup("A")?.length === findPredictionsFromGroup("A")?.length,
    B: findMatchesFromGroup("B")?.length === findPredictionsFromGroup("B")?.length,
    C: findMatchesFromGroup("C")?.length === findPredictionsFromGroup("C")?.length,
    D: findMatchesFromGroup("D")?.length === findPredictionsFromGroup("D")?.length,
    E: findMatchesFromGroup("E")?.length === findPredictionsFromGroup("E")?.length,
    F: findMatchesFromGroup("F")?.length === findPredictionsFromGroup("F")?.length,
    G: findMatchesFromGroup("G")?.length === findPredictionsFromGroup("G")?.length,
    H: findMatchesFromGroup("H")?.length === findPredictionsFromGroup("H")?.length,
    I: findMatchesFromGroup("I")?.length === findPredictionsFromGroup("I")?.length,
    J: findMatchesFromGroup("J")?.length === findPredictionsFromGroup("J")?.length,
    K: findMatchesFromGroup("K")?.length === findPredictionsFromGroup("K")?.length,
    L: findMatchesFromGroup("L")?.length === findPredictionsFromGroup("L")?.length,
  };

  return (
    <>
      {data && predictions && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant={isMobile() ? "scrollable" : "standard"}
              scrollButtons="auto"
              value={mode}
              onChange={handleTabChange}
            >
              <Tab label="A" sx={{ color: groupsComplete["A"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="B" sx={{ color: groupsComplete["B"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="C" sx={{ color: groupsComplete["C"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="D" sx={{ color: groupsComplete["D"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="E" sx={{ color: groupsComplete["E"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="F" sx={{ color: groupsComplete["F"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="G" sx={{ color: groupsComplete["G"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="H" sx={{ color: groupsComplete["H"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="I" sx={{ color: groupsComplete["I"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="J" sx={{ color: groupsComplete["J"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="K" sx={{ color: groupsComplete["K"] ? "#c8ffc8" : "#ffc8c8" }} />
              <Tab label="L" sx={{ color: groupsComplete["L"] ? "#c8ffc8" : "#ffc8c8" }} />
            </Tabs>
          </Box>
          {Object.entries(groupsIndexMap).map(([index, group]) => (
            <TabPanel key={index} value={mode} index={parseInt(index)}>
              <MatchGroupBase matches={findMatchesFromGroup(group)} currents={findPredictionsFromGroup(group)} />
            </TabPanel>
          ))}
        </>
      )}
    </>
  );
}
