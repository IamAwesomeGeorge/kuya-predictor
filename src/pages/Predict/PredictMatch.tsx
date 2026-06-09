import { Box, Tab, Tabs } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { TabPanel } from "../../components/utils/TabPanel";
import MatchGroupTabs from "../../components/predict/match/MatchGroupTabs";
import MatchKnockTabs from "../../components/predict/match/MatchKnockTabs";

export default function PredictMatch() {
  const [mode, setMode] = useState(0);
  const { user } = useContext(UserContext);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const groupComplete = false;
  const knockComplete = false;

  return (
    <>
      <PageHeader title="Predict Matches" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleTabChange}>
          <Tab label="Group Stage" sx={{ color: groupComplete ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="Knockout Stage" disabled sx={{ color: knockComplete ? "#c8ffc8" : "#ffc8c8" }} />
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
