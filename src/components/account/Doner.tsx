import { supabase } from "../../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { User } from "../../models/User";
import Avatar from "./Avatar";
import DoneSymbol from "../predict/card/DoneSymbol";

export default function Doner() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await supabase.from("users").select("id, created_at, name, pfp_url, team");
      return data as User[];
    },
  });

  const { data } = useQuery({
    queryKey: ["dones", users],
    enabled: !!users,
    queryFn: async () => {
      if (!users) return null;
      const { data: predictionsGroup } = await supabase.from("predictions_group").select();
      const { data: thirdPlaceData } = await supabase.from("predictions_group_third").select("data, user");
      const { data: predictionsKnockoutStart } = await supabase.from("predictions_knockout_start").select();
      const { data: matchesData } = await supabase
        .from("matches")
        .select()
        .eq("stage", "GROUP")
        .order("date_time", { ascending: true });
      const { data: predictionsData } = await supabase.from("predictions_matches_view").select().eq("stage", "GROUP");

      const dones = {} as Record<string, boolean[]>;
      const matchesDoneNumbers = {} as Record<string, number>;
      matchesDoneNumbers[100] = (matchesData?.length || 2) - 2;
      for (const user of users) {
        const predictionsGroupUser = predictionsGroup?.filter((p) => p.user === user.id);
        const thirdPlaceDataUser = thirdPlaceData?.filter((p) => p.user === user.id);
        const groupDone = predictionsGroupUser?.length === 12 && thirdPlaceDataUser?.[0]?.data.length === 8;

        const predictionsKnockoutStartUser = predictionsKnockoutStart?.filter((p) => p.user === user.id);
        const knockoutPreDone = predictionsKnockoutStartUser?.length === 32;

        const knockoutDone = false;

        const predictionsDataUser = predictionsData?.filter((p) => p.user === user.id);
        // todo: remove 2
        const matchesDone = (matchesData?.length || 2) - 2 === predictionsDataUser?.length;
        matchesDoneNumbers[user.id] = predictionsDataUser?.length || 0;

        dones[user.id] = [groupDone, knockoutPreDone, knockoutDone, matchesDone];
      }
      return { dones, matchesDoneNumbers };
    },
  });

  return (
    <>
      {users && data ? (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Group</TableCell>
                <TableCell align="right">Knockout Pre</TableCell>
                <TableCell align="right">Knockout</TableCell>
                <TableCell align="right">Matches</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>
                      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                        <Avatar text={row.name} url={row.pfp_url} />
                        <span>{row.name}</span>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{<DoneSymbol done={data.dones[row.id]?.[0]} />}</TableCell>
                    <TableCell align="right">{<DoneSymbol done={data.dones[row.id]?.[1]} />}</TableCell>
                    <TableCell align="right">{<DoneSymbol done={data.dones[row.id]?.[2]} />}</TableCell>
                    <TableCell align="right">
                      {<DoneSymbol done={data.dones[row.id]?.[3]} />}
                      {data.matchesDoneNumbers[row.id]}/{data.matchesDoneNumbers[100]}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>Loading...</Box>
      )}
    </>
  );
}
