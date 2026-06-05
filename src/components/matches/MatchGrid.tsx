import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Grid } from "@mui/material";
import type { GroupStageStandings } from "../../models/Results";
import { Flag } from "../utils/FlagUtils";

interface StandingsTableProps {
  tableName: string;
  data: GroupStageStandings[];
}

export function StandingsTable(props: StandingsTableProps) {
  const { tableName, data } = props;
  const sorted = [...data].sort((a, b) => b.points - a.points);

  return (
    <Grid size={6}>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{tableName}</TableCell>
              <TableCell align="right">P</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">D</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">Pts</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sorted.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <Flag code={row.code} /> {row.name}
                </TableCell>
                <TableCell align="right">{row.played}</TableCell>
                <TableCell align="right">{row.won}</TableCell>
                <TableCell align="right">{row.drawn}</TableCell>
                <TableCell align="right">{row.lost}</TableCell>
                <TableCell align="right">
                  <strong>{row.points}</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
