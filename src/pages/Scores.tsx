import PageHeader from "../components/header/PageHeader";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Box } from "@mui/material";
import type { UserScoreInfo } from "../models/Results";
import Avatar from "../components/account/Avatar";
import { supabase } from "../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { User } from "../models/User";
import DevelopmentNotice from "../components/DevelopmentNotice";

export default function Scores() {
  const { data, isFetched } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await supabase.from("users").select("id, created_at, name, pfp_url, team");
      return data as User[];
    },
  });

  // Todo: translate a User into UserScoreInfo (placeholder defaults)
  const tempTrans = (user: User): UserScoreInfo => {
    // eslint-disable-next-line react-hooks/purity
    const groups = Math.floor(Math.random() * 51); // 0-50
    // eslint-disable-next-line react-hooks/purity
    const knockoutPre = Math.floor(Math.random() * 11); // 0-10
    // eslint-disable-next-line react-hooks/purity
    const knockout = Math.floor(Math.random() * 11); // 0-10
    // eslint-disable-next-line react-hooks/purity
    const matches = Math.floor(Math.random() * 11); // 0-10
    const points = groups + knockoutPre + knockout + matches;

    return {
      pfp_url: user.pfp_url,
      name: user.name,
      groups,
      knockoutPre,
      knockout,
      matches,
      points,
    };
  };

  const sorted = useMemo(() => {
    return data?.map(tempTrans).sort((a, b) => b.points - a.points);
  }, [data]);

  return (
    <>
      <PageHeader title="Scores" />
      <DevelopmentNotice />
      {isFetched && (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Groups</TableCell>
                <TableCell align="right">Knockout Pre</TableCell>
                <TableCell align="right">Knockout</TableCell>
                <TableCell align="right">Matches</TableCell>
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
                  <TableCell align="right">{row.groups}</TableCell>
                  <TableCell align="right">{row.knockoutPre}</TableCell>
                  <TableCell align="right">{row.knockout}</TableCell>
                  <TableCell align="right">{row.matches}</TableCell>
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
