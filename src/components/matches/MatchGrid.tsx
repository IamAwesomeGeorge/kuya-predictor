import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import type { MatchInfo } from "../../models/Infos";
import { Flag } from "../utils/FlagUtils";

interface MatchGridProps {
  match: MatchInfo;
}

function formatMatchDate(dateTime: string) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  const parts = formatter.formatToParts(new Date(dateTime));
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${partMap.weekday} ${partMap.day} ${partMap.month} ${partMap.year} ${partMap.hour}:${partMap.minute}`;
}

export function MatchGrid(props: MatchGridProps) {
  const { match } = props;

  return (
    <Grid size={6} key={match.id}>
      <Box
        sx={{
          bgcolor: "#253049",
          color: "white",
          borderRadius: 2,
          p: 2,
        }}
      >
        {/* Top row */}
        <Stack id={`match-${match.id}-top`} direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          {/* Left team */}
          <Typography sx={{ fontWeight: 600, fontSize: 18, flex: 1 }}>
            {match.team_left} <Flag code={match.team_left} />
          </Typography>

          {/* Time */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 20,
              px: 2,
              color: "#38bdf8",
            }}
          >
            {formatMatchDate(match.date_time)}
          </Typography>

          {/* Right team */}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
              textAlign: "right",
              flex: 1,
            }}
          >
            <Flag code={match.team_right} /> {match.team_right}
          </Typography>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom row */}
        <Stack id={`match-${match.id}-bottom`} direction="row" spacing={1} sx={{ justifyContent: "center", opacity: 0.8 }}>
          <Typography variant="body2">{match.stage}</Typography>
          <Typography variant="body2">{match.stage_info}</Typography>

          <Typography variant="body2">·</Typography>

          <Typography variant="body2">{match.stadium}</Typography>
        </Stack>
      </Box>
    </Grid>
  );
}
