import { Box, Tab, Tabs } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import { useState } from "react";
import { TabPanel } from "../../components/utils/TabPanel";
import MatchGroupTabs from "../../components/predict/match/MatchGroupTabs";
import MatchKnockTabs from "../../components/predict/match/MatchKnockTabs";

export default function PredictMatch() {
  const [mode, setMode] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <PageHeader title="Predict Matches" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleTabChange}>
          <Tab label="Group Stage" />
          <Tab label="Knockout Stage" disabled />
        </Tabs>
      </Box>
      <TabPanel value={mode} index={0}>
        <MatchGroupTabs />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        <MatchKnockTabs />
      </TabPanel>
    </>
  );
}
