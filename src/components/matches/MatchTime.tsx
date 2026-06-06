import { Typography } from "@mui/material";
import type { MatchInfo } from "../../models/Infos";
import { formatMatchDateFull } from "../utils/TimeUtils";

export function MatchTime({ match }: { match: MatchInfo }) {
  return (
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: 20,
        px: 2,
        color: "#38bdf8",
      }}
    >
      {formatMatchDateFull(match.date_time)}
    </Typography>
  );
}
