import { Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { TabPanel } from "../../utils/TabPanel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import type { MatchInfo, Stage } from "../../../models/Infos";
import MatchBase from "./MatchBase";
import { UserContext } from "../../../contexts/UserContext";
import type { PredictMatchView } from "../../../models/Predict";
import { isMobile } from "../../utils/MobileUtils";

export default function MatchKnockoutTabs({ preview = false }: { preview?: boolean }) {
  const [mode, setMode] = useState(0);
  const { user } = useContext(UserContext);

  const { data } = useQuery({
    queryKey: ["matches", "knockout"],
    queryFn: async () => {
      const { data } = await supabase
        .from("matches")
        .select()
        .not("stage", "eq", "GROUP")
        .order("date_time", { ascending: true });
      return data as MatchInfo[];
    },
  });

  const { data: predictions } = useQuery({
    queryKey: ["predictions", "matches", "view", "knockout", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("predictions_matches_view")
        .select()
        .not("stage", "eq", "GROUP")
        .eq("user", user?.id);
      return data as PredictMatchView[];
    },
  });

  const findMatchesFromStage = (stage: Stage) => {
    return data?.filter((m) => m.stage === stage);
  };

  const findPredictionsFromStage = (stage: Stage) => {
    return predictions?.filter((p) => p.stage === stage);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const groupsIndexMap: { [key: number]: Stage } = {
    0: "ROUND_OF_32",
    1: "ROUND_OF_16",
    2: "QUARTERFINAL",
    3: "SEMIFINAL",
    4: "FINAL",
  };

  const stageComplete = {
    ROUND_OF_32: findMatchesFromStage("ROUND_OF_32")?.length === findPredictionsFromStage("ROUND_OF_32")?.length,
    ROUND_OF_16: findMatchesFromStage("ROUND_OF_16")?.length === findPredictionsFromStage("ROUND_OF_16")?.length,
    QUARTERFINAL: findMatchesFromStage("QUARTERFINAL")?.length === findPredictionsFromStage("QUARTERFINAL")?.length,
    SEMIFINAL: findMatchesFromStage("SEMIFINAL")?.length === findPredictionsFromStage("SEMIFINAL")?.length,
    FINAL: findMatchesFromStage("FINAL")?.length === findPredictionsFromStage("FINAL")?.length,
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
            <Tab
              label={isMobile() ? "R32" : "Round of 32"}
              sx={{ color: stageComplete["ROUND_OF_32"] ? "#c8ffc8" : "#ffc8c8" }}
            />
            <Tab
              label={isMobile() ? "R16" : "Round of 16"}
              sx={{ color: stageComplete["ROUND_OF_16"] ? "#c8ffc8" : "#ffc8c8" }}
            />
            <Tab
              label={isMobile() ? "QF" : "Quarterfinals"}
              sx={{ color: stageComplete["QUARTERFINAL"] ? "#c8ffc8" : "#ffc8c8" }}
            />
            <Tab
              label={isMobile() ? "SF" : "Semifinals"}
              sx={{ color: stageComplete["SEMIFINAL"] ? "#c8ffc8" : "#ffc8c8" }}
            />
            <Tab label={isMobile() ? "F" : "Final"} sx={{ color: stageComplete["FINAL"] ? "#c8ffc8" : "#ffc8c8" }} />
          </Tabs>

          {Object.entries(groupsIndexMap).map(([index, stage]) => (
            <TabPanel key={index} value={mode} index={parseInt(index)}>
              <MatchBase
                preview={preview}
                matches={findMatchesFromStage(stage)}
                currents={findPredictionsFromStage(stage)}
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
