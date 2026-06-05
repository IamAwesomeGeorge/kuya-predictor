import PageHeader from "../components/header/PageHeader";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Box } from "@mui/material";
import type { ScoreInfo } from "../models/Results";
import Avatar from "../components/account/Avatar";
import { supabase } from "../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { User } from "../models/User";

export default function Scores() {
  const { data, isFetched } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await supabase.from("users").select("id, created_at, username, name, pfp_url");
      return data as User[];
    },
  });

  // Todo: translate a User into ScoreInfo (placeholder defaults)
  const tempTrans = (user: User): ScoreInfo => {
    // eslint-disable-next-line react-hooks/purity
    const played = Math.floor(Math.random() * 11); // 0-10
    // eslint-disable-next-line react-hooks/purity
    const won = Math.floor(Math.random() * (played + 1));
    // eslint-disable-next-line react-hooks/purity
    const draw = Math.floor(Math.random() * (played - won + 1));
    const lost = played - won - draw;
    const points = won * 3 + draw;

    return {
      pfp_url: user.pfp_url,
      name: user.name,
      played,
      won,
      draw,
      lost,
      points,
    };
  };

  const sorted = useMemo(() => {
    return data?.map(tempTrans).sort((a, b) => b.points - a.points);
  }, [data]);

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
                      <Avatar text={row.name} url={row.pfp_url} />
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
