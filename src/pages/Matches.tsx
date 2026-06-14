import { Tab, Tabs } from "@mui/material";
import PageHeader from "../components/header/PageHeader";
import { useState } from "react";
import { TabPanel } from "../components/utils/TabPanel";
import GroupMatches from "../components/matches/GroupMatches";

export default function Matches() {
  const [mode, setMode] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <PageHeader title="Matches" />
      <Tabs value={mode} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Group Stage" sx={{ color: "white" }} />
        <Tab label="Knockout Stage" disabled sx={{ color: "white" }} />
      </Tabs>
      <TabPanel value={mode} index={0}>
        <GroupMatches />
      </TabPanel>
    </>
  );
}
