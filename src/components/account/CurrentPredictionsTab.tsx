import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../utils/TabPanel";
import Doner from "./Doner";
import MatchMainTabs from "../predict/match/MatchMainTabs";
import GroupMainTabs from "../predict/group/GroupMainTabs";
import StartAllTheWay from "../predict/knockout/StartAllTheWay";
import StartKnockout from "../predict/knockout/StartKnockout";

export default function CurrentPredictionsTab() {
  const [mode, setMode] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const doner = import.meta.env.VITE_DEV === "true" && true;

  return (
    <>
      <Tabs value={mode} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Matches" sx={{ color: "white" }} />
        <Tab label="Group Stage" sx={{ color: "white" }} />
        <Tab label="All The Way" sx={{ color: "white" }} />
        <Tab label="Knockout Stage" disabled sx={{ color: "white" }} />
        {doner && <Tab label="Done" sx={{ color: "white" }} />}
      </Tabs>
      <TabPanel value={mode} index={0}>
        <MatchMainTabs preview />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        <GroupMainTabs preview />
      </TabPanel>
      <TabPanel value={mode} index={2}>
        <StartAllTheWay preview />
      </TabPanel>
      <TabPanel value={mode} index={3}>
        <StartKnockout preview />
      </TabPanel>

      {doner && (
        <TabPanel value={mode} index={4}>
          <Doner />
        </TabPanel>
      )}
    </>
  );
}
