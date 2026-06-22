import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../../utils/TabPanel";
import type { PredictKnockout } from "../../../models/Predict";
import KnockoutBase from "../../predict/knockout/KnockoutBase";
import type { Stage } from "../../../models/Infos";
import KnockoutFinals from "../../predict/knockout/KnockoutFinals";
import { isMobile } from "../../utils/MobileUtils";
import type { KnockoutMatchInfo } from "../../../models/Knockout";

interface KnockoutTabsProps {
  preview: boolean;
  bracket: KnockoutMatchInfo[];
  predictions?: PredictKnockout[];
}

export default function KnockoutTabs({ preview, bracket, predictions }: KnockoutTabsProps) {
  const [mode, setMode] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const checkIfStageComplete = (stage: Stage) => {
    // Chekc if each match in the stage has a prediction
    const matchesInStage = bracket.filter((match) => match.stage === stage);
    return matchesInStage.every((match) => predictions?.some((predict) => predict.matchId === match.id));
  };

  const isGroupComplete = {
    32: checkIfStageComplete("ROUND_OF_32"),
    16: checkIfStageComplete("ROUND_OF_16"),
    8: checkIfStageComplete("QUARTERFINAL"),
    4: checkIfStageComplete("SEMIFINAL"),
    2: checkIfStageComplete("FINAL"),
  };

  return (
    <>
      <Tabs variant="scrollable" scrollButtons="auto" value={mode} onChange={handleTabChange}>
        <Tab label={isMobile() ? "R32" : "Round of 32"} sx={{ color: isGroupComplete[32] ? "#c8ffc8" : "#ffc8c8" }} />
        <Tab label={isMobile() ? "R16" : "Round of 16"} sx={{ color: isGroupComplete[16] ? "#c8ffc8" : "#ffc8c8" }} />
        <Tab label={isMobile() ? "QF" : "Quarterfinals"} sx={{ color: isGroupComplete[8] ? "#c8ffc8" : "#ffc8c8" }} />
        <Tab label={isMobile() ? "SF" : "Semifinals"} sx={{ color: isGroupComplete[4] ? "#c8ffc8" : "#ffc8c8" }} />
        <Tab label={isMobile() ? "F" : "Final"} sx={{ color: isGroupComplete[2] ? "#c8ffc8" : "#ffc8c8" }} />
      </Tabs>

      <TabPanel value={mode} index={0}>
        <KnockoutBase
          preview={preview}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "ROUND_OF_32")}
          currentPredictions={predictions}
        />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        <KnockoutBase
          preview={preview}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "ROUND_OF_16")}
          currentPredictions={predictions}
        />
      </TabPanel>
      <TabPanel value={mode} index={2}>
        <KnockoutBase
          preview={preview}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "QUARTERFINAL")}
          currentPredictions={predictions}
        />
      </TabPanel>
      <TabPanel value={mode} index={3}>
        <KnockoutBase
          preview={preview}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "SEMIFINAL")}
          currentPredictions={predictions}
        />
      </TabPanel>
      <TabPanel value={mode} index={4}>
        <KnockoutFinals
          preview={preview}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "FINAL")}
          currentPredictions={predictions}
        />
      </TabPanel>
    </>
  );
}
