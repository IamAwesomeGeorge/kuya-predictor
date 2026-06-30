import { Tab, Tabs } from "@mui/material";
import PageHeader from "../components/header/PageHeader";
import GroupStandings from "../components/standings/GroupStandings";
import { useState } from "react";
import { TabPanel } from "../components/utils/TabPanel";

export default function Standings() {
  const [mode, setMode] = useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <PageHeader title="Current Standings" />
      <Tabs value={mode} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Group Stage" sx={{ color: "white" }} />
        {/* todo: Implement Knockout Stage */}
        <Tab label="Knockout Stage" disabled sx={{ color: "white" }} />
      </Tabs>
      <TabPanel value={mode} index={0}>
        <GroupStandings />
      </TabPanel>
    </>
  );
}
