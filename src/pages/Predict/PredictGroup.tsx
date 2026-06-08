import { Box, Tab, Tabs } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import { TabPanel } from "../../components/utils/TabPanel";
import { useContext, useState } from "react";
import GroupRankingBase from "../../components/predict/group/GroupRankingBase";
import { useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../contexts/UserContext";
import type { PredictGroup } from "../../models/Predict";
import GroupThirdChooser from "../../components/predict/group/GroupThirdChooser";

export default function PredictGroup() {
  const [mode, setMode] = useState(0);
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const predictData = queryClient.getQueryData<PredictGroup[]>(["predict", "group", user?.id]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const doesPredictForGroupExist = (group: string) => {
    return predictData?.some((predict) => predict.group === group);
  };

  const group1Complete = ["A", "B", "C", "D"].every((group) => doesPredictForGroupExist(group));
  const group2Complete = ["E", "F", "G", "H"].every((group) => doesPredictForGroupExist(group));
  const group3Complete = ["I", "J", "K", "L"].every((group) => doesPredictForGroupExist(group));
  const groupComplete = predictData?.length == 12;
  const thirdPlaceComplete = false; // TODO: implement this

  return (
    <>
      <PageHeader title="Predict Group" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleTabChange}>
          <Tab label="Groups A-D" sx={{ color: group1Complete ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="Groups E-H" sx={{ color: group2Complete ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="Groups I-L" sx={{ color: group3Complete ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="3rd Place" disabled={!groupComplete} sx={{ color: thirdPlaceComplete ? "#c8ffc8" : "#ffc8c8" }} />
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
      <TabPanel value={mode} index={3}>
        <GroupThirdChooser />
      </TabPanel>
    </>
  );
}
