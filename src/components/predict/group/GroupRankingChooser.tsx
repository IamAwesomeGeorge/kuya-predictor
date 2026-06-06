import {
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { TeamInfo } from "../../../models/Infos";
import { Flag } from "../../utils/FlagUtils";

interface GroupRankingChooserProps {
  teams: TeamInfo[];
}

export default function GroupRankingChooser({ teams }: GroupRankingChooserProps) {
  return (
    <Grid size={6}>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          GROUP {teams[0].group}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pt: 0, pb: 0.5 }}>Position</TableCell>
              <TableCell sx={{ pt: 0, pb: 0.5 }}>Team</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {teams.map((team, index) => (
              <TableRow key={team.code} sx={{ bgcolor: index < 2 ? "rgb(200, 255, 200, 0.5)" : "transparent" }}>
                <TableCell align="right" sx={{ width: "1%", pt: 0, pb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {index + 1}.
                  </Typography>
                </TableCell>
                <TableCell sx={{ pt: 0, pb: 0.5 }}>
                  <Stack direction="row" spacing={1}>
                    <Flag code={team.code} />
                    <Typography variant="body2">{team.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ pt: 0, pb: 0.5 }}>
                  <IconButton edge="end" aria-label="moveUp">
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="moveDown">
                    <ArrowDownwardIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
