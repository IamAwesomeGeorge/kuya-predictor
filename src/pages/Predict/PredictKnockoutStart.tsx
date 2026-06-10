import { useContext } from "react";
import PageHeader from "../../components/header/PageHeader";
import { TeamsContext } from "../../contexts/TeamsContext";
import type { PredictData, PredictGroup } from "../../models/Predict";
import { supabase } from "../../utils/supabase";
import { UserContext } from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { useTeamInfo } from "../../components/utils/TeamsUtils";
import KnockoutMatch from "../../components/predict/knockout/KnockoutMatch";
import { Grid, Stack } from "@mui/material";
import KnockoutDuel from "../../components/predict/knockout/KnockoutDuel";

export default function PredictKnockoutStart() {
  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamsContext);

  const { data: predictData } = useQuery({
    queryKey: ["predict", "group", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group").select().eq("user", user?.id);
      return (data ?? [])
        .filter((item): item is PredictGroup => item !== null && item !== undefined)
        .sort((a, b) => a.group.localeCompare(b.group));
    },
  });

  const { data: predictThirdData } = useQuery({
    queryKey: ["predict", "third", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group_third").select().eq("user", user?.id);
      if (data && data.length > 0) {
        const predictThird: PredictData = data[0];
        return predictThird.data
          .map((code) => useTeamInfo(code))
          .filter((team): team is NonNullable<typeof team> => team !== undefined)
          .sort((a, b) => a.group.localeCompare(b.group));
      }
      return null;
    },
  });

  return (
    <>
      <PageHeader title="Predict Knockout Start" />
      <Grid container spacing={1}>
        {predictData && (
          <>
            <KnockoutDuel
              topTopTeamLabel={"1F"}
              topBottomTeamLabel={"2F"}
              topTopTeam={useTeamInfo(predictData[0].pos_1)}
              topBottomTeam={useTeamInfo(predictData[0].pos_2)}
              bottomTopTeamLabel={"3F"}
              bottomBottomTeamLabel={"4F"}
              bottomTopTeam={useTeamInfo(predictData[0].pos_3)}
              bottomBottomTeam={useTeamInfo(predictData[0].pos_4)}
            />
            <KnockoutDuel
              topTopTeamLabel={"M78"}
              topBottomTeamLabel={"M87"}
              topTopTeam={useTeamInfo(predictData[0].pos_1)}
              bottomTopTeamLabel={"3F"}
              bottomBottomTeamLabel={"4F"}
            />
          </>
        )}
      </Grid>
      {predictData &&
        predictData.map((groupPredict) => (
          <div key={groupPredict.group}>
            <h2>Group {groupPredict.group}</h2>
            <p>1st: {teams.find((t) => t.code === groupPredict.pos_1)?.name || "N/A"}</p>
            <p>2nd: {teams.find((t) => t.code === groupPredict.pos_2)?.name || "N/A"}</p>
          </div>
        ))}
    </>
  );
}
