import { Box, Tab, Tabs } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import { TabPanel } from "../../components/utils/TabPanel";
import { useState } from "react";
import GroupRankingBase from "../../components/predict/group/GroupRankingBase";

export default function PredictGroup() {
  const [mode, setMode] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <PageHeader title="Predict Group" />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleTabChange}>
          <Tab label="Groups A-D" sx={{ color: "white" }} />
          <Tab label="Groups E-H" sx={{ color: "white" }} />
          <Tab label="Groups I-L" sx={{ color: "white" }} />
        </Tabs>
      </Box>
      <TabPanel value={mode} index={0}>
        <GroupRankingBase teamCodes={["A", "B", "C", "D"]} />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        <GroupRankingBase teamCodes={["E", "F", "G", "H"]} />
      </TabPanel>
      <TabPanel value={mode} index={2}>
        <GroupRankingBase teamCodes={["I", "J", "K", "L"]} />
      </TabPanel>
    </>
  );
}
