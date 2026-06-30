import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../../utils/TabPanel";
import { useContext, useState } from "react";
import GroupRankingBase from "./GroupRankingBase";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../../contexts/UserContext";
import type { PredictData, PredictGroup } from "../../../models/Predict";
import GroupThirdChooser from "./GroupThirdChooser";
import { supabase } from "../../../utils/supabase";
import GroupThirdViewer from "./GroupThirdViewer";

export default function GroupMainTabs({ preview = false }: { preview?: boolean }) {
  const [mode, setMode] = useState(0);
  const { user } = useContext(UserContext);

  const { data: predictData, isPending } = useQuery({
    queryKey: ["predict", "group", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group").select().eq("user", user?.id);
      return data as PredictGroup[];
    },
  });

  const { data: currentSelection, isPending: isCurrentSelectionPending } = useQuery({
    queryKey: ["predict", "third", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group_third").select().eq("user", user?.id);
      if (data && data.length > 0) {
        return data[0] as PredictData;
      }
      return null;
    },
  });

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
  const thirdPlaceComplete = currentSelection?.data.length === 8;

  return (
    <>
      <Tabs value={mode} onChange={handleTabChange}>
        <Tab label="Groups A-D" sx={{ color: group1Complete ? "#c8ffc8" : "#ffc8c8" }} />
        <Tab label="Groups E-H" sx={{ color: group2Complete ? "#c8ffc8" : "#ffc8c8" }} />
        <Tab label="Groups I-L" sx={{ color: group3Complete ? "#c8ffc8" : "#ffc8c8" }} />
        <Tab label="3rd Place" sx={{ color: thirdPlaceComplete ? "#c8ffc8" : "#ffc8c8" }} />
      </Tabs>
      <TabPanel value={mode} index={0}>
        <GroupRankingBase teamCodes={["A", "B", "C", "D"]} data={predictData} isPending={isPending} preview={preview} />
      </TabPanel>
      <TabPanel value={mode} index={1}>
        <GroupRankingBase teamCodes={["E", "F", "G", "H"]} data={predictData} isPending={isPending} preview={preview} />
      </TabPanel>
      <TabPanel value={mode} index={2}>
        <GroupRankingBase teamCodes={["I", "J", "K", "L"]} data={predictData} isPending={isPending} preview={preview} />
      </TabPanel>
      <TabPanel value={mode} index={3}>
        {preview ? (
          <GroupThirdViewer currentSelection={currentSelection} />
        ) : groupComplete ? (
          <GroupThirdChooser currentSelection={currentSelection} isCurrentSelectionPending={isCurrentSelectionPending} />
        ) : (
          <Box sx={{ padding: 2 }}>Please complete the group rankings before predicting the third place teams.</Box>
        )}
      </TabPanel>
    </>
  );
}
