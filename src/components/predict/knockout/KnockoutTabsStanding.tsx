import {  Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../../utils/TabPanel";
import KnockoutBase from "./KnockoutBase";
import type { MatchInfo } from "../../../models/Infos";
import KnockoutFinals from "./KnockoutFinals";
import { isMobile } from "../../utils/MobileUtils";
import type { KnockoutMatchInfo } from "../../../models/Knockout";

interface KnockoutTabsStandingsProps {
  preview: boolean;
  matches: MatchInfo[];
  bracket: KnockoutMatchInfo[];
}

export default function KnockoutTabsStanding({ preview, matches, bracket }: KnockoutTabsStandingsProps) {
  const [mode, setMode] = useState(0);
  const knockoutMode = "standings";

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <Tabs variant="scrollable" scrollButtons="auto" value={mode} onChange={handleTabChange}>
        <Tab label={isMobile() ? "R32" : "Round of 32"} sx={{ color: "white" }} />
        <Tab label={isMobile() ? "R16" : "Round of 16"} sx={{ color: "white" }} />
        <Tab label={isMobile() ? "QF" : "Quarterfinals"} sx={{ color: "white" }} />
        <Tab label={isMobile() ? "SF" : "Semifinals"} sx={{ color: "white" }} />
        <Tab label={isMobile() ? "F" : "Final"} sx={{ color: "white" }} />
      </Tabs>

      <TabPanel value={mode} index={0}>
        <KnockoutBase
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "ROUND_OF_32")}
        />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        <KnockoutBase
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "ROUND_OF_16")}
        />
      </TabPanel>
      <TabPanel value={mode} index={2}>
        <KnockoutBase
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "QUARTERFINAL")}
        />
      </TabPanel>
      <TabPanel value={mode} index={3}>
        <KnockoutBase
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "SEMIFINAL")}
        />
      </TabPanel>
      <TabPanel value={mode} index={4}>
        <KnockoutFinals
          preview={preview}
          knockoutMode={knockoutMode}
          matches={matches}
          knockoutMatchInfo={bracket.filter((match) => match.stage === "FINAL")}
        />
      </TabPanel>
    </>
  );
}
