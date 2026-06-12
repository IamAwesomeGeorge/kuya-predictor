import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from "@mui/material";
import type { UserScoreInfo } from "../../models/Results";
import { CountUpNumber } from "../fun/CountUpNumber";
import type { Team } from "../../models/User";
import TeamTag from "../account/TeamTag";

export default function TableTeamScores({ data }: { data: UserScoreInfo[] }) {
  const bgColours: Record<Team, string> = {
    MGS: "#ffc8c8",
    KUYA: "#c8ffc8",
    PACBOY: "#c8c8ff",
  };

  // Find the average points for the team
  const teams = ["MGS", "KUYA", "PACBOY"];
  const teamScores: { [key in Team]: { total: number; count: number } } = teams.reduce(
    (acc, team) => {
      acc[team as Team] = { total: 0, count: 0 };
      return acc;
    },
    {} as { [key in Team]: { total: number; count: number } },
  );

  data.forEach((user) => {
    teamScores[user.team].total += user.total;
    teamScores[user.team].count += 1;
  });

  return (
    <TableContainer component={Paper} sx={{ mt: 1, width: "50%", mx: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Users</TableCell>
            <TableCell align="right">Total Points</TableCell>
            <TableCell align="right">
              <strong>Average Points</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(teamScores).map(([team, { total, count }]) => (
            <TableRow
              key={team}
              sx={{
                backgroundColor: bgColours[team as Team],
              }}
            >
              <TableCell>
                <TeamTag team={team as Team} />
              </TableCell>
              <TableCell align="right">
                <CountUpNumber id={`users-${team}`} end={count} />
              </TableCell>
              <TableCell align="right">
                <CountUpNumber id={`total-${team}`} end={total} delay={0.5} />
              </TableCell>
              <TableCell align="right">
                <strong>
                  <CountUpNumber id={`average-${team}`} end={count > 0 ? total / count : 0} delay={1} />
                </strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
