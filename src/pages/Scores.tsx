import PageHeader from "../components/header/PageHeader";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Grid } from "@mui/material";
import type { ScoreInfo } from "../models/Results";
import Avatar from "../components/account/Avatar";

export default function Scores() {
  const dummy: ScoreInfo[] = [
    { avatar: "a", name: "George", played: 0, won: 0, draw: 0, lost: 0, points: 4 },
    { avatar: "a", name: "Sam", played: 0, won: 0, draw: 0, lost: 0, points: 3 },
    { avatar: "a", name: "Jack", played: 0, won: 0, draw: 0, lost: 0, points: 5 },
    { avatar: "a", name: "OM", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
  ];
  const sorted = [...dummy].sort((a, b) => b.points - a.points);

  return (
    <>
      <PageHeader title="Scores" />
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Name</TableCell>
              <TableCell align="right">P</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">D</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sorted.map((row) => (
              <TableRow key={row.name}>
                <TableCell size="small">
                  <Avatar text={row.name} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
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
    </>
  );
}
