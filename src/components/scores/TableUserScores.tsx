import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  TableSortLabel,
  Tooltip,
  Box,
} from "@mui/material";
import type { UserScoreInfo } from "../../models/Results";
import NameTag from "../account/NameTag";
import { CountUpNumber } from "../fun/CountUpNumber";
import { useState, useMemo } from "react";
import KnockoutTooltip from "./KnockoutToolTip";
import MatchTooltip from "./MatchTooltip";
import GroupTooltip from "./GroupTooltip";

type SortKey = "position" | "name" | "matches" | "groups" | "all" | "knockout" | "total";

interface UserRow extends UserScoreInfo {
  position: number;
}

const sortValue = (key: SortKey, row: UserRow) => row[key];

export default function TableUserScores({ data }: { data: UserScoreInfo[] }) {
  const [ani, setAni] = useState(false);
  const [orderBy, setOrderBy] = useState<SortKey>("position");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const scoresWithPositions = useMemo(
    () =>
      data?.reduce<UserRow[]>((accumulator, row, index) => {
        const previousRow = accumulator[accumulator.length - 1];
        const position = !previousRow || row.total !== previousRow.total ? index + 1 : previousRow.position;

        accumulator.push({
          ...row,
          position,
        });

        return accumulator;
      }, []),
    [data],
  );

  const sortedScores = useMemo(
    () =>
      [...scoresWithPositions].sort((a, b) => {
        const left = sortValue(orderBy, a);
        const right = sortValue(orderBy, b);

        if (left === right) {
          return a.position - b.position || a.name.localeCompare(b.name);
        }

        if (typeof left === "string" && typeof right === "string") {
          return order === "asc" ? left.localeCompare(right) : right.localeCompare(left);
        }

        return order === "asc" ? (left as number) - (right as number) : (right as number) - (left as number);
      }),
    [scoresWithPositions, order, orderBy],
  );

  const handleSort = (key: SortKey) => {
    if (orderBy === key) {
      setOrder((currentOrder) => (currentOrder === "asc" ? "desc" : "asc"));
      return;
    }
    setAni(true);
    setOrderBy(key);
    setOrder(key === "position" || key === "name" ? "asc" : "desc");
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "position"}
                direction={orderBy === "position" ? order : "asc"}
                onClick={() => handleSort("position")}
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
                direction={orderBy === "matches" ? order : "desc"}
                onClick={() => handleSort("matches")}
              >
                Matches
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "groups"}
                direction={orderBy === "groups" ? order : "desc"}
                onClick={() => handleSort("groups")}
              >
                Groups
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "all"}
                direction={orderBy === "all" ? order : "desc"}
                onClick={() => handleSort("all")}
              >
                All The Way
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "knockout"}
                direction={orderBy === "knockout" ? order : "desc"}
                onClick={() => handleSort("knockout")}
              >
                Knockout
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
              <TableSortLabel
                active={orderBy === "total"}
                direction={orderBy === "total" ? order : "desc"}
                onClick={() => handleSort("total")}
              >
                <strong>Total</strong>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedScores?.map((row) => (
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
                <Tooltip title={<MatchTooltip info={row.matches_info} />} placement="top">
                  <Box>
                    <CountUpNumber id={`matches-${row.name}`} end={row.matches} duration={ani ? 0 : 2} />
                  </Box>
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                <Tooltip title={<GroupTooltip info={row.groups_info} />} placement="top">
                  <Box>
                    <CountUpNumber id={`groups-${row.name}`} end={row.groups} delay={ani ? 0 : 0.5} duration={ani ? 0 : 2} />
                  </Box>
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                <Tooltip title={<KnockoutTooltip info={row.all_info} n={4} />} placement="top">
                  <Box>
                    <CountUpNumber id={`all-${row.name}`} end={row.all} delay={ani ? 0 : 1} duration={ani ? 0 : 2} />
                  </Box>
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                <Tooltip title={<KnockoutTooltip info={row.knockout_info} n={2} />} placement="top">
                  <Box>
                    <CountUpNumber
                      id={`knockout-${row.name}`}
                      end={row.knockout}
                      delay={ani ? 0 : 1.5}
                      duration={ani ? 0 : 2}
                    />
                  </Box>
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                <strong>
                  <CountUpNumber
                    id={`total-${row.name}`}
                    end={row.total}
                    delay={ani ? 0 : ani ? 0 : 2}
                    duration={ani ? 0 : 2}
                  />
                </strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
