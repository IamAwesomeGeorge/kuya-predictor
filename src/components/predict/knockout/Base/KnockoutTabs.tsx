import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../../../utils/TabPanel";
import type { PredictKnockout } from "../../../../models/Predict";
import KnockoutBase from "./KnockoutBase";
import type { MatchInfo, Stage } from "../../../../models/Infos";
import KnockoutFinals from "./KnockoutFinals";
import { isMobile } from "../../../utils/MobileUtils";
import type { KnockoutMatchInfo } from "../../../../models/Knockout";
import { getCorrectBG } from "../../../utils/ColourUtils";
import { findStage } from "../../../utils/TeamsUtils";

interface KnockoutTabsProps {
  preview: boolean;
  knockoutMode: "allTheWay" | "knockout";
  matches: MatchInfo[];
  bracket: KnockoutMatchInfo[];
  predictions?: PredictKnockout[];
}

export default function KnockoutTabs({ preview, knockoutMode, matches, bracket, predictions }: KnockoutTabsProps) {
  const [mode, setMode] = useState(findStage(matches));

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
        <Tab label={isMobile() ? "R32" : "Round of 32"} sx={{ color: getCorrectBG(isGroupComplete[32]) }} />
        <Tab label={isMobile() ? "R16" : "Round of 16"} sx={{ color: getCorrectBG(isGroupComplete[16]) }} />
        <Tab label={isMobile() ? "QF" : "Quarterfinals"} sx={{ color: getCorrectBG(isGroupComplete[8]) }} />
        <Tab label={isMobile() ? "SF" : "Semifinals"} sx={{ color: getCorrectBG(isGroupComplete[4]) }} />
        <Tab label={isMobile() ? "F" : "Final"} sx={{ color: getCorrectBG(isGroupComplete[2]) }} />
      </Tabs>

      <TabPanel value={mode} index={0}>
        <KnockoutBase
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "ROUND_OF_32")}
          currentPredictions={predictions}
        />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        <KnockoutBase
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "ROUND_OF_16")}
          currentPredictions={predictions}
        />
      </TabPanel>
      <TabPanel value={mode} index={2}>
        <KnockoutBase
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "QUARTERFINAL")}
          currentPredictions={predictions}
        />
      </TabPanel>
      <TabPanel value={mode} index={3}>
        <KnockoutBase
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "SEMIFINAL")}
          currentPredictions={predictions}
        />
      </TabPanel>
      <TabPanel value={mode} index={4}>
        <KnockoutFinals
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "FINAL")}
          currentPredictions={predictions}
        />
      </TabPanel>
    </>
  );
}
