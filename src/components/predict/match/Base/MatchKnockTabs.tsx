import { Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { TabPanel } from "../../../utils/TabPanel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../../utils/supabase";
import type { MatchInfo, Stage } from "../../../../models/Infos";
import MatchBase from "./MatchBase";
import { UserContext } from "../../../../contexts/UserContext";
import type { PredictMatchView } from "../../../../models/Predict";
import { isMobile } from "../../../utils/MobileUtils";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { getCorrectBG } from "../../../utils/ColourUtils";

export default function MatchKnockoutTabs({ preview = false }: { preview?: boolean }) {
  const [mode, setMode] = useState(0);
  const { user } = useContext(UserContext);

  const { data } = useQuery({
    queryKey: ["matches", "knockout"],
    queryFn: async () => {
      const { data } = await supabase.from("matches").select().neq("stage", "GROUP").order("date_time", { ascending: true });
      return data as MatchInfo[];
    },
  });

  const { data: predictions } = useQuery({
    queryKey: ["predictions", "matches", "view", "knockout", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_matches_view").select().neq("stage", "GROUP").eq("user", user?.id);
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

  const isComplete = (stage: Stage) => {
    const matches = findMatchesFromStage(stage);
    const matchesFiltered = matches?.filter((m) => m.team_left !== "ZZ" && m.team_right !== "ZZ");
    const predictions = findPredictionsFromStage(stage);
    return matchesFiltered?.length === predictions?.length;
  };

  const stageComplete = {
    ROUND_OF_32: isComplete("ROUND_OF_32"),
    ROUND_OF_16: isComplete("ROUND_OF_16"),
    QUARTERFINAL: isComplete("QUARTERFINAL"),
    SEMIFINAL: isComplete("SEMIFINAL"),
    FINAL: isComplete("FINAL"),
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
              icon={stageComplete["ROUND_OF_32"] ? undefined : <PriorityHighIcon fontSize="small" />}
              iconPosition="end"
              sx={{ color: getCorrectBG(stageComplete["ROUND_OF_32"]) }}
            />
            <Tab
              label={isMobile() ? "R16" : "Round of 16"}
              icon={stageComplete["ROUND_OF_16"] ? undefined : <PriorityHighIcon fontSize="small" />}
              iconPosition="end"
              sx={{ color: getCorrectBG(stageComplete["ROUND_OF_16"]) }}
            />
            <Tab
              label={isMobile() ? "QF" : "Quarterfinals"}
              icon={stageComplete["QUARTERFINAL"] ? undefined : <PriorityHighIcon fontSize="small" />}
              iconPosition="end"
              sx={{ color: getCorrectBG(stageComplete["QUARTERFINAL"]) }}
            />
            <Tab
              label={isMobile() ? "SF" : "Semifinals"}
              icon={stageComplete["SEMIFINAL"] ? undefined : <PriorityHighIcon fontSize="small" />}
              iconPosition="end"
              sx={{ color: getCorrectBG(stageComplete["SEMIFINAL"]) }}
            />
            <Tab
              label={isMobile() ? "F" : "Final"}
              icon={stageComplete["FINAL"] ? undefined : <PriorityHighIcon fontSize="small" />}
              iconPosition="end"
              sx={{ color: getCorrectBG(stageComplete["FINAL"]) }}
            />
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
