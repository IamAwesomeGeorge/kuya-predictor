import { Box, Tab, Tabs } from "@mui/material";
import PageHeader from "../../header/PageHeader";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { TabPanel } from "../../utils/TabPanel";

export default function MatchKnockTabs() {
  const [mode, setMode] = useState(0);
  const { user } = useContext(UserContext);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const groupComplete = false;
  const knockComplete = false;

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleTabChange}>
          <Tab label="Group Stage" sx={{ color: groupComplete ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="Knockout Stage" sx={{ color: knockComplete ? "#c8ffc8" : "#ffc8c8" }} />
        </Tabs>
      </Box>
      <TabPanel value={mode} index={0}></TabPanel>
      <TabPanel value={mode} index={1}></TabPanel>
    </>
  );
}
