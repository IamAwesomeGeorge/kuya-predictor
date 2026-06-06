import { Tooltip, Typography } from "@mui/material";
import type { MatchInfo } from "../../models/Infos";

export function MatchScore({ match }: { match: MatchInfo }) {
  const left = match.score_left ?? null;
  const right = match.score_right ?? null;
  const isScoreAvailable = left != null && right != null;
  const winner = isScoreAvailable ? (left > right ? "left" : left < right ? "right" : "draw") : null;
  const leftColor = winner === "left" ? "#34d399" : winner === "right" ? "#f87171" : "#fbbf24";
  const rightColor = winner === "right" ? "#34d399" : winner === "left" ? "#f87171" : "#fbbf24";

  if (!isScoreAvailable) {
    return (
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 20,
          px: 2,
          color: "#fbbf24",
        }}
      >
        <Tooltip title="Score not added to database yet.">
          <span>Finished</span>
        </Tooltip>
      </Typography>
    );
  }
  return (
    <>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 20,
          px: 2,
          color: "#38bdf8",
        }}
      >
        <span style={{ color: leftColor }}>{match.score_left}</span> -{" "}
        <span style={{ color: rightColor }}>{match.score_right}</span>
      </Typography>
    </>
  );
}
