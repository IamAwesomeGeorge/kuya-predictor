import { Box, Tab, Tabs } from "@mui/material";
import PageHeader from "../components/header/PageHeader";
import GroupStandings from "../components/standings/GroupStandings";
import { useState } from "react";
import { TabPanel } from "../components/utils/TabPanel";

export default function Standings() {
  const [mode, setMode] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <PageHeader title="Current Standings" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Group Stage" sx={{ color: "white" }} />
          <Tab label="Knockout Stage" disabled sx={{ color: "white" }} />
        </Tabs>
      </Box>
      <TabPanel value={mode} index={0}>
        <GroupStandings />
      </TabPanel>
    </>
  );
}
