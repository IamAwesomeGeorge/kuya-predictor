import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from "@mui/material";
import type { UserScoreInfo } from "../../models/Results";
import NameTag from "../account/NameTag";
import { CountUpNumber } from "../fun/CountUpNumber";

export default function TableUserScores({ data }: { data: UserScoreInfo[] }) {
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
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Matches</TableCell>
            <TableCell align="right">Groups</TableCell>
            <TableCell align="right">All the Way</TableCell>
            <TableCell align="right">Knockout</TableCell>
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
                <NameTag name={row.name} pfp_url={row.pfp_url} team={row.team} />
              </TableCell>
              <TableCell align="right">
                <CountUpNumber id={`matches-${row.name}`} end={row.matches} />
              </TableCell>
              <TableCell align="right">
                <CountUpNumber id={`groups-${row.name}`} end={row.groups} delay={0.5} />
              </TableCell>
              <TableCell align="right">
                <CountUpNumber id={`knockoutPre-${row.name}`} end={row.knockoutPre} delay={1} />
              </TableCell>
              <TableCell align="right">
                <CountUpNumber id={`knockout-${row.name}`} end={row.knockout} delay={1.5} />
              </TableCell>
              <TableCell align="right">
                <strong>
                  <CountUpNumber id={`total-${row.name}`} end={row.total} delay={2} />
                </strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
