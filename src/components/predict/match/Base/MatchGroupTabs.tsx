import { Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { TabPanel } from "../../../utils/TabPanel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../../utils/supabase";
import type { MatchInfo } from "../../../../models/Infos";
import MatchBase from "./MatchBase";
import { UserContext } from "../../../../contexts/UserContext";
import type { PredictMatchView } from "../../../../models/Predict";
import { isMobile } from "../../../utils/MobileUtils";
import { getCorrectBG } from "../../../utils/ColourUtils";

export default function MatchGroupTabs({ preview = false }: { preview?: boolean }) {
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
      {data && predictions ? (
        <>
          <Tabs
            variant={isMobile() ? "scrollable" : "standard"}
            scrollButtons="auto"
            value={mode}
            onChange={handleTabChange}
          >
            <Tab label="A" sx={{ color: getCorrectBG(groupsComplete["A"]) }} />
            <Tab label="B" sx={{ color: getCorrectBG(groupsComplete["B"]) }} />
            <Tab label="C" sx={{ color: getCorrectBG(groupsComplete["C"]) }} />
            <Tab label="D" sx={{ color: getCorrectBG(groupsComplete["D"]) }} />
            <Tab label="E" sx={{ color: getCorrectBG(groupsComplete["E"]) }} />
            <Tab label="F" sx={{ color: getCorrectBG(groupsComplete["F"]) }} />
            <Tab label="G" sx={{ color: getCorrectBG(groupsComplete["G"]) }} />
            <Tab label="H" sx={{ color: getCorrectBG(groupsComplete["H"]) }} />
            <Tab label="I" sx={{ color: getCorrectBG(groupsComplete["I"]) }} />
            <Tab label="J" sx={{ color: getCorrectBG(groupsComplete["J"]) }} />
            <Tab label="K" sx={{ color: getCorrectBG(groupsComplete["K"]) }} />
            <Tab label="L" sx={{ color: getCorrectBG(groupsComplete["L"]) }} />
          </Tabs>

          {Object.entries(groupsIndexMap).map(([index, group]) => (
            <TabPanel key={index} value={mode} index={parseInt(index)}>
              <MatchBase
                preview={preview}
                matches={findMatchesFromGroup(group)}
                currents={findPredictionsFromGroup(group)}
              />
            </TabPanel>
          ))}
        </>
      ) : (
        <p>Loading matches...</p>
      )}
    </>
  );
}
