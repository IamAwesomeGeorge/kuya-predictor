import PageHeader from "../components/header/PageHeader";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Box } from "@mui/material";
import type { UserScoreInfo } from "../models/Results";
import Avatar from "../components/account/Avatar";
import { supabase } from "../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import TeamTag from "../components/account/TeamTag";

export default function Scores() {
  const { data, isFetched } = useQuery({
    queryKey: ["users", "scores"],
    queryFn: async () => {
      const { data } = await supabase.from("user_scores").select();
      // Calculate total points
      const updatedData =
        data?.map((row) => ({
          ...row,
          total: row.groups + row.knockoutPre + row.knockout + row.matches,
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

  const scoresWithPositions = data?.reduce<Array<UserScoreInfo & { position: number }>>((accumulator, row, index) => {
    const previousRow = accumulator[accumulator.length - 1];
    const position = !previousRow || row.total !== previousRow.total ? index + 1 : previousRow.position;

    accumulator.push({
      ...row,
      position,
    });

    return accumulator;
  }, []);

  return (
    <>
      <PageHeader title="Scores" />
      {isFetched && (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Groups</TableCell>
                <TableCell align="right">Knockout Pre</TableCell>
                <TableCell align="right">Knockout</TableCell>
                <TableCell align="right">Matches</TableCell>
                <TableCell align="right">
                  <strong>Total</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {scoresWithPositions?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    backgroundColor:
                      row.position === 1
                        ? "rgb(255, 247, 200)"
                        : row.position === 2
                          ? "rgb(242, 242, 242)"
                          : row.position === 3
                            ? "rgb(255, 234, 213)"
                            : "inherit",
                  }}
                >
                  <TableCell>{row.position}.</TableCell>
                  <TableCell>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                      <Avatar text={row.name} url={row.pfp_url} />
                      <span>{row.name}</span>
                      <TeamTag team={row.team} />
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.groups}</TableCell>
                  <TableCell align="right">{row.knockoutPre}</TableCell>
                  <TableCell align="right">{row.knockout}</TableCell>
                  <TableCell align="right">{row.matches}</TableCell>
                  <TableCell align="right">
                    <strong>{row.total}</strong>
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
