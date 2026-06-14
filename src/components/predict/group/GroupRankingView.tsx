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
  TableSortLabel,
} from "@mui/material";
import { Flag } from "../../flag/Flag";
import type { PredictGroupPre } from "../../../models/Predict";
import { useTeamsFromGroup } from "../../utils/TeamsUtils";
import type { GroupStageStandings } from "../../../models/Results";
import { EMPTY_SELECTION, numberIconMap } from "./Helpers";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useCallback, useMemo, useState } from "react";

type SortKey = "guessPos" | "realPos" | "correct";

interface TeamRow {
  code: string;
  name: string;
  guessPos: number;
  realPos: number;
  correct: boolean;
}

const sortValue = (key: SortKey, row: TeamRow) => {
  if (key === "correct") {
    return row.correct ? 1 : 0;
  }

  return row[key];
};

interface GroupRankingViewProps {
  group: string;
  currentPredictRanking?: PredictGroupPre;
  groupStandings?: GroupStageStandings[];
}

export default function GroupRankingView({ group, currentPredictRanking, groupStandings }: GroupRankingViewProps) {
  const teams = useTeamsFromGroup(group);
  const [orderBy, setOrderBy] = useState<SortKey>("guessPos");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const selection = useMemo(
    () =>
      currentPredictRanking
        ? {
            1: currentPredictRanking.pos_1,
            2: currentPredictRanking.pos_2,
            3: currentPredictRanking.pos_3,
            4: currentPredictRanking.pos_4,
          }
        : EMPTY_SELECTION,
    [currentPredictRanking],
  );

  const selectionGuessPos = useCallback(
    (code: string) => {
      const pos = Object.entries(selection).find(([, c]) => c === code)?.[0];
      return pos ? parseInt(pos) : null;
    },
    [selection],
  );

  const selectionRealPos = useCallback(
    (code: string) => {
      const pos = [...(groupStandings ?? [])]
        .sort((a, b) => b.points - a.points)
        .findIndex((standing) => standing.code === code);
      return pos !== undefined && pos >= 0 ? pos + 1 : null;
    },
    [groupStandings],
  );

  const teamData = useMemo<TeamRow[]>(
    () =>
      teams.map((team) => {
        const guessPos = selectionGuessPos(team.code);
        const realPos = selectionRealPos(team.code);

        return {
          ...team,
          guessPos: guessPos ?? 0,
          realPos: realPos ?? 0,
          correct: guessPos !== null && realPos !== null && guessPos === realPos,
        };
      }),
    [teams, selectionGuessPos, selectionRealPos],
  );

  const sortedTeamData = useMemo(
    () =>
      [...teamData].sort((a, b) => {
        const left = sortValue(orderBy, a);
        const right = sortValue(orderBy, b);

        if (left === right) {
          return a.guessPos - b.guessPos || a.name.localeCompare(b.name);
        }

        return order === "asc" ? left - right : right - left;
      }),
    [teamData, order, orderBy],
  );

  const handleSort = (key: SortKey) => {
    if (orderBy === key) {
      setOrder((currentOrder) => (currentOrder === "asc" ? "desc" : "asc"));
      return;
    }

    setOrderBy(key);
    setOrder(key === "correct" ? "desc" : "asc");
  };

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>GROUP {group}</TableCell>
              <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                <TableSortLabel
                  active={orderBy === "guessPos"}
                  direction={orderBy === "guessPos" ? order : "asc"}
                  onClick={() => handleSort("guessPos")}
                >
                  Your Guess
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                <TableSortLabel
                  active={orderBy === "realPos"}
                  direction={orderBy === "realPos" ? order : "asc"}
                  onClick={() => handleSort("realPos")}
                >
                  Current
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                <TableSortLabel
                  active={orderBy === "correct"}
                  direction={orderBy === "correct" ? order : "asc"}
                  onClick={() => handleSort("correct")}
                >
                  Correct?
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedTeamData.map((row) => (
              <TableRow key={row.name} sx={{ bgcolor: row.correct ? "rgb(200, 255, 200, 0.5)" : "transparent" }}>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Flag tooltip code={row.code} />
                    <Typography variant="body2">{row.name.length > 8 ? row.name.slice(0, 5) + "..." : row.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="left">{numberIconMap[row.guessPos ?? 0]}</TableCell>
                <TableCell align="left">{numberIconMap[row.realPos ?? 0]}</TableCell>
                <TableCell align="left">
                  {row.correct ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
