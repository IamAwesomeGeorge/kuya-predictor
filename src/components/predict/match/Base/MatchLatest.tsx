import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../../utils/supabase";
import type { MatchInfo } from "../../../../models/Infos";
import MatchBase from "./MatchBase";
import { UserContext } from "../../../../contexts/UserContext";
import type { PredictMatchView } from "../../../../models/Predict";

export default function MatchLatest({ preview }: { preview: boolean }) {
  const { user } = useContext(UserContext);

  const { data } = useQuery({
    queryKey: ["matches", "latest"],
    queryFn: async () => {
      const { data } = await supabase
        .from("matches")
        .select()
        .not("score_left", "is", null)
        .not("score_right", "is", null)
        .order("date_time", { ascending: false })
        .limit(10);
      return data as MatchInfo[];
    },
  });

  const latestMatchesIds = data?.map((match) => match.id) || [];

  const { data: predictions } = useQuery({
    queryKey: ["predictions", "latest", user?.id, latestMatchesIds],
    enabled: !!user && latestMatchesIds.length > 0,
    queryFn: async () => {
      const { data } = await supabase
        .from("predictions_matches_view")
        .select()
        .eq("user", user?.id)
        .in("match", latestMatchesIds);
      return data as PredictMatchView[];
    },
  });

  return (
    <>
      {data && predictions ? (
        <MatchBase preview={preview} matches={data} currents={predictions} />
      ) : (
        <p>Loading matches...</p>
      )}
    </>
  );
}
