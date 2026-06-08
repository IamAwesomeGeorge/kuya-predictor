import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { TabPanel } from "../../utils/TabPanel";

export default function matchGroupTabs() {
  const [mode, setMode] = useState(0);
  const { user } = useContext(UserContext);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  const groupsComplete = {
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleTabChange}>
          <Tab label="A" sx={{ color: groupsComplete["A"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="B" sx={{ color: groupsComplete["B"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="C" sx={{ color: groupsComplete["C"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="D" sx={{ color: groupsComplete["D"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="E" sx={{ color: groupsComplete["E"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="F" sx={{ color: groupsComplete["F"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="G" sx={{ color: groupsComplete["G"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="H" sx={{ color: groupsComplete["H"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="I" sx={{ color: groupsComplete["I"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="J" sx={{ color: groupsComplete["J"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="K" sx={{ color: groupsComplete["K"] ? "#c8ffc8" : "#ffc8c8" }} />
          <Tab label="L" sx={{ color: groupsComplete["L"] ? "#c8ffc8" : "#ffc8c8" }} />
        </Tabs>
      </Box>
      <TabPanel value={mode} index={0}></TabPanel>
      <TabPanel value={mode} index={1}></TabPanel>
      <TabPanel value={mode} index={2}></TabPanel>
      <TabPanel value={mode} index={3}></TabPanel>
    </>
  );
}
