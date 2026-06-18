import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, TableSortLabel } from "@mui/material";
import type { UserScoreInfo } from "../../models/Results";
import NameTag from "../account/NameTag";
import { CountUpNumber } from "../fun/CountUpNumber";
import { useState } from "react";

type SortKey = "pos" | "name" | "matches" | "groups" | "way" | "knockout" | "total";

interface UserRow {
  pos: number;
  name: string;
  matches: number;
  groups: number;
  way: number;
  knockout: number;
  total: number;
}

const sortValue = (key: SortKey, row: UserRow) => row[key];

export default function TableUserScores({ data }: { data: UserScoreInfo[] }) {
  const [orderBy, setOrderBy] = useState<SortKey>("pos");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const scoresWithPositions = data?.reduce<Array<UserScoreInfo & { position: number }>>((accumulator, row, index) => {
    const previousRow = accumulator[accumulator.length - 1];
    const position = !previousRow || row.total !== previousRow.total ? index + 1 : previousRow.position;

    accumulator.push({
      ...row,
      position,
    });

    return accumulator;
  }, []);

  const handleSort = (key: SortKey) => {
    if (orderBy === key) {
      setOrder((currentOrder) => (currentOrder === "asc" ? "desc" : "asc"));
      return;
    }

    setOrderBy(key);
    setOrder("asc");
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "pos"}
                direction={orderBy === "pos" ? order : "asc"}
                onClick={() => handleSort("pos")}
              ></TableSortLabel>
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "matches"}
                direction={orderBy === "matches" ? order : "asc"}
                onClick={() => handleSort("matches")}
              >
                Matches
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "groups"}
                direction={orderBy === "groups" ? order : "asc"}
                onClick={() => handleSort("groups")}
              >
                Groups
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "way"}
                direction={orderBy === "way" ? order : "asc"}
                onClick={() => handleSort("way")}
              >
                All the Way
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "knockout"}
                direction={orderBy === "knockout" ? order : "asc"}
                onClick={() => handleSort("knockout")}
              >
                Knockout
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "total"}
                direction={orderBy === "total" ? order : "asc"}
                onClick={() => handleSort("total")}
              >
                <strong>Total</strong>
              </TableSortLabel>
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
