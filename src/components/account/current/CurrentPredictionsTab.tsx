import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../../utils/TabPanel";
import GroupMatches from "../../matches/GroupMatches";

export default function CurrentPredictionsTab() {
  const [mode, setMode] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Matches" sx={{ color: "white" }} />
          <Tab label="Group Stage" sx={{ color: "white" }} />
          <Tab label="All The Way" sx={{ color: "white" }} />
          <Tab label="Knockout Stage" disabled sx={{ color: "white" }} />
        </Tabs>
      </Box>
      <TabPanel value={mode} index={0}>
        <GroupMatches />
      </TabPanel>
    </>
  );
}
