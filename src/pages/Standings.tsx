import { Box, Tab, Tabs } from "@mui/material";
import PageHeader from "../components/header/PageHeader";
import GroupStandings from "../components/standings/GroupStandings";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Standings() {
  const [mode, setMode] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };

  return (
    <>
      <PageHeader title="Current Standings" />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={mode} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Group" sx={{ color: "white" }} />
          <Tab label="Item Two" sx={{ color: "white" }} />
          <Tab label="Item Three" sx={{ color: "white" }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={mode} index={0}>
        <GroupStandings />
      </CustomTabPanel>
      <CustomTabPanel value={mode} index={1}>
        Not done yet
      </CustomTabPanel>
      <CustomTabPanel value={mode} index={2}>
        Also not done yet
      </CustomTabPanel>
    </>
  );
}
