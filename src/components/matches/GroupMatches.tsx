import { Grid } from "@mui/material";
import type { MatchInfo } from "../../models/Infos";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";
import { MatchGrid } from "./MatchGrid";

export default function Standings() {
  const { data, isFetched } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const { data } = await supabase.from("matches").select().order("date_time", { ascending: true });
      return data as MatchInfo[];
    },
  });

  return (
    <>
      {isFetched ? (
        <Grid container spacing={2}>
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
