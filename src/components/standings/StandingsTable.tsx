import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import type { GroupStageStandings } from "../../models/Results";
import { Flag } from "../flag/Flag";

interface StandingsTableProps {
  tableName: string;
  data: GroupStageStandings[];
}

export function StandingsTable(props: StandingsTableProps) {
  const { tableName, data } = props;
  const sorted = [...data].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{tableName}</TableCell>
              <TableCell align="right">P</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">D</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">GF</TableCell>
              <TableCell align="right">GA</TableCell>
              <TableCell align="right">GD</TableCell>
              <TableCell align="right">Pts</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sorted.map((row, index) => (
              <TableRow key={row.name} sx={{ bgcolor: index < 2 ? "rgb(200, 255, 200, 0.5)" : "transparent" }}>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {index + 1}.
                    </Typography>
                    <Flag tooltip code={row.code} />
                    <Typography variant="body2">{row.name.length > 8 ? row.name.slice(0, 5) + "..." : row.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">{row.played}</TableCell>
                <TableCell align="right">{row.won}</TableCell>
                <TableCell align="right">{row.drawn}</TableCell>
                <TableCell align="right">{row.lost}</TableCell>
                <TableCell align="right">{row.gf}</TableCell>
                <TableCell align="right">{row.ga}</TableCell>
                <TableCell align="right">{row.gd}</TableCell>
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
