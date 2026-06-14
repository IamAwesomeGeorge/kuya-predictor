import {
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Flag } from "../../flag/Flag";
import type { PredictGroupPre } from "../../../models/Predict";
import { useTeamsFromGroup } from "../../utils/TeamsUtils";
import type { GroupStageStandings } from "../../../models/Results";
import { EMPTY_SELECTION, numberIconMap } from "./Helpers";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface GroupRankingViewProps {
  group: string;
  currentPredictRanking?: PredictGroupPre;
  groupStandings?: GroupStageStandings[];
}

export default function GroupRankingView({ group, currentPredictRanking, groupStandings }: GroupRankingViewProps) {
  const teams = useTeamsFromGroup(group);

  const selection = currentPredictRanking
    ? {
        1: currentPredictRanking.pos_1,
        2: currentPredictRanking.pos_2,
        3: currentPredictRanking.pos_3,
        4: currentPredictRanking.pos_4,
      }
    : EMPTY_SELECTION;

  const selectionGuessPos = (code: string) => {
    const pos = Object.entries(selection).find(([, c]) => c === code)?.[0];
    return pos ? parseInt(pos) : null;
  };

  const selectionRealPos = (code: string) => {
    const pos = groupStandings?.sort((a, b) => b.points - a.points).findIndex((standing) => standing.code === code);
    return pos !== undefined && pos >= 0 ? pos + 1 : null;
  };

  const teamData = teams.map((team) => ({
    ...team,
    guessPos: selectionGuessPos(team.code) ?? 0,
    realPos: selectionRealPos(team.code) ?? 0,
    correct:
      selectionGuessPos(team.code) === selectionRealPos(team.code) &&
      selectionGuessPos(team.code) !== null &&
      selectionRealPos(team.code) !== null,
  }));

  return (
    <>
      <Grid size={{ xs: 3, md: 6 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> GROUP {group}</TableCell>
                <TableCell align="center">Your Guess</TableCell>
                <TableCell align="center">POS</TableCell>
                <TableCell align="center">Right</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {teamData
                .sort((a, b) => a.guessPos - b.guessPos)
                .map((row) => (
                  <TableRow key={row.name} sx={{ bgcolor: row.correct ? "rgb(200, 255, 200, 0.5)" : "transparent" }}>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Flag tooltip code={row.code} />
                        <Typography variant="body2">
                          {row.name.length > 8 ? row.name.slice(0, 5) + "..." : row.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">{numberIconMap[row.guessPos ?? 0]}</TableCell>
                    <TableCell align="center">{numberIconMap[row.realPos ?? 0]}</TableCell>
                    <TableCell align="center">
                      {row.correct ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}
