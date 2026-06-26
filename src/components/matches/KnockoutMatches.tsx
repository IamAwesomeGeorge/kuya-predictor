import { Grid } from "@mui/material";
import type { MatchInfo } from "../../models/Infos";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";
import { MatchGrid } from "./MatchGrid";

export default function KnockoutMatches() {
  const { data, isFetched } = useQuery({
    queryKey: ["matches", "knockout"],
    queryFn: async () => {
      const { data } = await supabase
        .from("matches")
        .select()
        .not("stage", "eq", "GROUP")
        .order("date_time", { ascending: true });
      return data as MatchInfo[];
    },
  });

  return (
    <>
      {isFetched ? (
        <Grid container spacing={1}>
          {data?.map((match) => (
            <MatchGrid match={match} />
          ))}
        </Grid>
      ) : (
        <p>Loading matches...</p>
      )}
    </>
  );
}
