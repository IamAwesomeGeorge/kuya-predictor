import { Grid } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import GroupRankingChooser from "../../components/predict/group/GroupRankingChooser";
import { useTeamsFromGroup, useTeamsReady } from "../../components/utils/TeamsUtils";

export default function PredictGroup() {
  return (
    <>
      <PageHeader title="Predict Group" />
      {useTeamsReady() && (
        <Grid container spacing={1}>
          <GroupRankingChooser teams={useTeamsFromGroup("A")} />
          <GroupRankingChooser teams={useTeamsFromGroup("B")} />
          <GroupRankingChooser teams={useTeamsFromGroup("C")} />
          <GroupRankingChooser teams={useTeamsFromGroup("D")} />
          <GroupRankingChooser teams={useTeamsFromGroup("E")} />
          <GroupRankingChooser teams={useTeamsFromGroup("F")} />
          <GroupRankingChooser teams={useTeamsFromGroup("G")} />
          <GroupRankingChooser teams={useTeamsFromGroup("H")} />
          <GroupRankingChooser teams={useTeamsFromGroup("I")} />
          <GroupRankingChooser teams={useTeamsFromGroup("J")} />
        </Grid>
      )}
    </>
  );
}
