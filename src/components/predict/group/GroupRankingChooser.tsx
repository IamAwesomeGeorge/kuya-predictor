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
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { TeamInfo } from "../../../models/Infos";
import { Flag } from "../../utils/FlagUtils";

interface GroupRankingChooserProps {
  teams?: TeamInfo[];
}

export default function GroupRankingChooser({ teams }: GroupRankingChooserProps) {
  const teamDemo = ["MX", "ZA", "KR", "CZ"];

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Team</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {teamDemo.map((team, index) => (
              <TableRow key={team} sx={{ bgcolor: index < 2 ? "rgb(200, 255, 200, 0.5)" : "transparent" }}>
                <TableCell align="right" sx={{ width: "1%" }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {index + 1}.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Flag code={team} />
                    <Typography variant="body2">{team}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
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
    </>
  );
}
