import { Grid } from "@mui/material";
import { StandingsTable } from "../standings/StandingsTable";
import type { GroupStageStandings } from "../../models/Results";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";

export default function Standings() {
  const { data, isFetched } = useQuery({
    queryKey: ["group_standings"],
    queryFn: async () => {
      const { data } = await supabase
        .from("group_stage_standings")
        .select()
        .order("group", { ascending: true })
        .order("points", { ascending: false });

      return data as GroupStageStandings[];
    },
  });

  const findGroupData = (group: string) => {
    return data?.filter((entry) => entry.group === group) || [];
  };

  return (
    <>
      {isFetched ? (
        <Grid container spacing={2}>
          <StandingsTable tableName="Group A" data={findGroupData("A")} />
          <StandingsTable tableName="Group B" data={findGroupData("B")} />
          <StandingsTable tableName="Group C" data={findGroupData("C")} />
          <StandingsTable tableName="Group D" data={findGroupData("D")} />
          <StandingsTable tableName="Group E" data={findGroupData("E")} />
          <StandingsTable tableName="Group F" data={findGroupData("F")} />
          <StandingsTable tableName="Group G" data={findGroupData("G")} />
          <StandingsTable tableName="Group H" data={findGroupData("H")} />
          <StandingsTable tableName="Group I" data={findGroupData("I")} />
          <StandingsTable tableName="Group J" data={findGroupData("J")} />
          <StandingsTable tableName="Group K" data={findGroupData("K")} />
          <StandingsTable tableName="Group L" data={findGroupData("L")} />
        </Grid>
      ) : (
        <p>Loading standings...</p>
      )}
    </>
  );
}
