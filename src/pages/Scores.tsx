import PageHeader from "../components/header/PageHeader";
import type { UserScoreInfo } from "../models/Results";
import { supabase } from "../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import TableUserScores from "../components/scores/TableUserScores";
import TableTeamScores from "../components/scores/TableTeamScores";

export default function Scores() {
  const { data } = useQuery({
    queryKey: ["users", "scores"],
    queryFn: async () => {
      const { data } = await supabase.from("user_scores").select();
      // Calculate total points
      const updatedData =
        data?.map((row) => ({
          ...row,
          total: row.matches + row.groups + row.all + row.knockout,
        })) ?? [];
      // Sort by total points, then by name
      updatedData.sort((a, b) => {
        if (b.total === a.total) {
          return a.name.localeCompare(b.name);
        }
        return b.total - a.total;
      });

      return updatedData as UserScoreInfo[];
    },
  });

  return (
    <>
      <PageHeader title="Scores" />
      {data && (
        <>
          <TableTeamScores data={data} />
          <TableUserScores data={data} />
        </>
      )}
    </>
  );
}
