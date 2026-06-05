import { Box, Tab, Tabs } from "@mui/material";
import PageHeader from "../components/header/PageHeader";
import { useState } from "react";
import { TabPanel } from "../components/utils/TabPanel";
import GroupMatches from "../components/matches/GroupMatches";

export default function Matches() {
  const [mode, setMode] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <PageHeader title="Matches" />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Group" sx={{ color: "white" }} />
          <Tab label="Item Two" sx={{ color: "white" }} />
          <Tab label="Item Three" sx={{ color: "white" }} />
        </Tabs>
      </Box>
      <TabPanel value={mode} index={0}>
        <GroupMatches />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        Not done yet
      </TabPanel>
      <TabPanel value={mode} index={2}>
        Also not done yet
      </TabPanel>
    </>
  );
}
