import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../../utils/TabPanel";
import Doner from "../Doner";
import MatchMainTabs from "../../predict/match/MatchMainTabs";

export default function CurrentPredictionsTab() {
  const [mode, setMode] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const doner = import.meta.env.VITE_DEV === "true" && true;

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Matches" sx={{ color: "white" }} />
          <Tab label="Group Stage" sx={{ color: "red" }} />
          <Tab label="All The Way" sx={{ color: "red" }} />
          <Tab label="Knockout Stage" disabled sx={{ color: "red" }} />
          {doner && <Tab label="Done" sx={{ color: "white" }} />}
        </Tabs>
      </Box>
      <TabPanel value={mode} index={0}>
        <MatchMainTabs preview />
      </TabPanel>

      <TabPanel value={mode} index={1}></TabPanel>
      <TabPanel value={mode} index={2}></TabPanel>
      <TabPanel value={mode} index={3}></TabPanel>

      {import.meta.env.VITE_DEV === "true" && (
        <TabPanel value={mode} index={4}>
          <Doner />
        </TabPanel>
      )}
    </>
  );
}
