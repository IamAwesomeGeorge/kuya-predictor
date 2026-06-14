import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../../utils/TabPanel";
import MatchGroupTabs from "./MatchGroupTabs";
import MatchKnockTabs from "./MatchKnockTabs";
import MatchLatest from "./MatchLatest";

export default function MatchMainTabs({ preview }: { preview?: boolean }) {
  const [mode, setMode] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <Tabs value={mode} onChange={handleTabChange}>
        <Tab label="Latest Matches" sx={{ color: "white" }} />
        <Tab label="Group Stage" sx={{ color: "white" }} />
        <Tab label="Knockout Stage" sx={{ color: "white" }} disabled />
      </Tabs>
      <TabPanel value={mode} index={0}>
        <MatchLatest preview={preview} />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        <MatchGroupTabs preview={preview} />
      </TabPanel>
      <TabPanel value={mode} index={2}>
        <MatchKnockTabs />
      </TabPanel>
    </>
  );
}
