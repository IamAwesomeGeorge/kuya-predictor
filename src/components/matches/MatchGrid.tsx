import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import type { MatchInfo } from "../../models/Results";
import { findTeam } from "../utils/TeamUtils";
import { Flag } from "../utils/FlagUtils";

interface MatchGridProps {
  match: MatchInfo;
}

export function MatchGrid(props: MatchGridProps) {
  const { match } = props;

  const teamLeft = findTeam(match.team_left);
  const teamRight = findTeam(match.team_right);

  return (
    <Grid size={6}>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#0f172a",
          color: "white",
          borderRadius: 2,
          p: 2,
        }}
      >
        {/* Top row */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* Left team */}
          <Typography sx={{ fontWeight: 600, fontSize: 18, flex: 1 }}>
            {teamLeft?.name} <Flag code={match.team_left} />
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
            {match.date_time}
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
            {teamRight?.name} <Flag code={match.team_right} />
          </Typography>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom row */}
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ opacity: 0.8 }}>
          <Typography variant="body2">{match.stage}</Typography>

          <Typography variant="body2">·</Typography>

          <Typography variant="body2">{match.stage_info}</Typography>

          <Typography variant="body2">·</Typography>

          <Typography variant="body2">{match.stadium}</Typography>
        </Stack>
      </Box>
    </Grid>
  );
}
