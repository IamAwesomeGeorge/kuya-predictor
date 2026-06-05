import PageHeader from "../components/header/PageHeader";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Box } from "@mui/material";
import type { ScoreInfo } from "../models/Results";
import Avatar from "../components/account/Avatar";
import { supabase } from "../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../models/User";

export default function Scores() {
  const { data, isFetched } = useQuery({
    queryKey: ["group_standings"],
    queryFn: async () => {
      const { data } = await supabase.from("users").select("id, created_at, username, name");
      return data as User[];
    },
  });

  // Todo: translate a User into ScoreInfo (placeholder defaults)
  const tempTrans = (user: User): ScoreInfo => {
    const played = Math.floor(Math.random() * 11); // 0-10
    const won = Math.floor(Math.random() * (played + 1));
    const draw = Math.floor(Math.random() * (played - won + 1));
    const lost = played - won - draw;
    const points = won * 3 + draw;

    return {
      avatar: user.name,
      name: user.name,
      played,
      won,
      draw,
      lost,
      points,
    };
  };

  const sorted = data?.map(tempTrans).sort((a, b) => b.points - a.points);

  return (
    <>
      <PageHeader title="Scores" />
      {isFetched && (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">P</TableCell>
                <TableCell align="right">W</TableCell>
                <TableCell align="right">D</TableCell>
                <TableCell align="right">L</TableCell>
                <TableCell align="right">Points</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sorted?.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                      <Avatar text={row.name} />
                      <span>{row.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.played}</TableCell>
                  <TableCell align="right">{row.won}</TableCell>
                  <TableCell align="right">{row.draw}</TableCell>
                  <TableCell align="right">{row.lost}</TableCell>
                  <TableCell align="right">
                    <strong>{row.points}</strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
