import { Box, Grid, Tab, Tabs } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import GroupRankingChooser from "../../components/predict/group/GroupRankingChooser";
import { useTeamsFromGroup, useTeamsReady } from "../../components/utils/TeamsUtils";
import { TabPanel } from "../../components/utils/TabPanel";
import { useState } from "react";

export default function PredictGroup() {
  const [mode, setMode] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMode(newValue);
  };
  return (
    <>
      <PageHeader title="Predict Group" />
      {useTeamsReady() && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={mode} onChange={handleChange}>
              <Tab label="Groups A-D" sx={{ color: "white" }} />
              <Tab label="Groups E-H" sx={{ color: "white" }} />
              <Tab label="Groups I-L" sx={{ color: "white" }} />
            </Tabs>
          </Box>
          <TabPanel value={mode} index={0}>
            <Grid container spacing={1}>
              <GroupRankingChooser
                teams={useTeamsFromGroup("A")}
                currentPredictRanking={{
                  group: "A",
                  team1: "CZ",
                  team2: "KR",
                  team3: "ZA",
                  team4: "MX",
                }}
              />
              <GroupRankingChooser teams={useTeamsFromGroup("B")} />
              <GroupRankingChooser teams={useTeamsFromGroup("C")} />
              <GroupRankingChooser teams={useTeamsFromGroup("D")} />
            </Grid>
          </TabPanel>
          <TabPanel value={mode} index={1}>
            <Grid container spacing={1}>
              <GroupRankingChooser teams={useTeamsFromGroup("E")} />
              <GroupRankingChooser teams={useTeamsFromGroup("F")} />
              <GroupRankingChooser teams={useTeamsFromGroup("G")} />
              <GroupRankingChooser teams={useTeamsFromGroup("H")} />
            </Grid>
          </TabPanel>
          <TabPanel value={mode} index={2}>
            <Grid container spacing={1}>
              <GroupRankingChooser teams={useTeamsFromGroup("I")} />
              <GroupRankingChooser teams={useTeamsFromGroup("J")} />
              <GroupRankingChooser teams={useTeamsFromGroup("K")} />
              <GroupRankingChooser teams={useTeamsFromGroup("L")} />
            </Grid>
          </TabPanel>
        </>
      )}
    </>
  );
}
