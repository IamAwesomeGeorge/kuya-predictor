import {
  Stack,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Card,
} from "@mui/material";
import { Flag } from "../../flag/Flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useContext } from "react";
import { supabase } from "../../../utils/supabase";
import { TeamsContext } from "../../../contexts/TeamsContext";
import { useQuery } from "@tanstack/react-query";
import type { PredictData } from "../../../models/Predict";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import type { GroupStageStandings } from "../../../models/Results";

interface ThirdRow {
  code: string;
  name: string;
  positionInThird: number;
  points: number;
  guessSelected: boolean;
  isQualifying: boolean;
  correct: boolean;
}

interface GroupThirdViewerProps {
  currentSelection?: PredictData | null;
}

export default function GroupThirdViewer({ currentSelection }: GroupThirdViewerProps) {
  const { teams } = useContext(TeamsContext);
  const getTeamName = (teamCode: string) => teams.find((team) => team.code === teamCode)?.name ?? teamCode;

  const { data: thirdPlaceStandings } = useQuery({
    queryKey: ["group_standings", "thirds"],
    queryFn: async () => {
      const { data } = await supabase
        .from("group_stage_standings")
        .select()
        .order("group", { ascending: true })
        .order("points", { ascending: false })
        .order("gf", { ascending: false })
        .order("ga", { ascending: true })
        .order("gd", { ascending: false });
      const standings = data as GroupStageStandings[];
      // Split standings by group, then find the 3rd place team in each
      const thirdPlaces: GroupStageStandings[] = [];
      const groups = Array.from(new Set(standings.map((s) => s.group)));
      groups.forEach((group) => {
        const groupStandings = standings.filter((s) => s.group === group);
        thirdPlaces.push(groupStandings[2]);
      });
      // sort by points, gf, ga, gd
      return thirdPlaces.sort((a, b) => {
        if (a.points !== b.points) return b.points - a.points;
        if (a.gf !== b.gf) return b.gf - a.gf;
        if (a.ga !== b.ga) return a.ga - b.ga;
        return b.gd - a.gd;
      });
    },
  });

  const sortedTeamData: ThirdRow[] =
    thirdPlaceStandings?.map((standing, index) => {
      const guessSelected = currentSelection?.data.includes(standing.code) ?? false;
      const isQualifying = index < 8;
      const correct = guessSelected && isQualifying;

      return {
        code: standing.code,
        name: getTeamName(standing.code),
        positionInThird: index + 1,
        points: standing.points,
        guessSelected,
        isQualifying,
        correct,
      };
    }) ?? [];

  const teamsSelectedNotInThirdPlace =
    currentSelection?.data
      .filter((code) => !thirdPlaceStandings?.some((standing) => standing.code === code))
      .map((code) => ({
        code,
        name: getTeamName(code),
      })) ?? [];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Current 3rd Places</TableCell>
              <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                Points
              </TableCell>
              <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                Selected
              </TableCell>
              <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                Qualifying?
              </TableCell>
              <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                Correct?
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedTeamData.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  bgcolor: row.isQualifying ? (row.correct ? "rgb(200, 255, 200, 0.5)" : "transparent") : "#999999",
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {row.positionInThird}.
                    </Typography>
                    <Flag tooltip code={row.code} />
                    <Typography variant="body2">{row.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="left">{row.points}</TableCell>
                <TableCell align="left">{row.guessSelected && <CheckCircleIcon />}</TableCell>
                <TableCell align="left">{row.isQualifying && <CheckCircleIcon />}</TableCell>
                <TableCell align="left">
                  {row.isQualifying && (row.correct ? <CheckIcon color="success" /> : <ClearIcon color="error" />)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Card sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5" }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Teams Selected, but not in 3rd Place:
        </Typography>
        {teamsSelectedNotInThirdPlace.length === 0 ? (
          <Typography variant="body2" sx={{ mt: 1 }}>
            None
          </Typography>
        ) : (
          <Stack direction="row" spacing={2} sx={{ mt: 1, flexWrap: "wrap", justifyContent: "center" }}>
            {teamsSelectedNotInThirdPlace.map((team) => (
              <Stack
                key={team.code}
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 1,
                  p: 1,
                  m: 0.5,
                  bgcolor: "background.paper",
                }}
              >
                <Flag code={team.code} />
                <Typography variant="body2">{team.name}</Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Card>
    </>
  );
}
