import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import type { MatchInfo } from "../../models/Infos";
import { Flag } from "../utils/FlagUtils";
import { MatchTime } from "./MatchTime";
import { formatMatchDateShort, hasMatchFinished } from "../utils/TimeUtils";
import { MatchScore } from "./MatchScore";
import { findTeamInfo } from "../utils/TeamsUtils";

interface MatchGridProps {
  match: MatchInfo;
}

export function MatchGrid(props: MatchGridProps) {
  const { match } = props;

  const finished = hasMatchFinished(match.date_time);
  const teamLeftName = findTeamInfo(match.team_left)?.name || match.team_left;
  const teamRightName = findTeamInfo(match.team_right)?.name;

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
            {teamLeftName} <Flag code={match.team_left} />
          </Typography>

          {finished ? <MatchScore match={match} /> : <MatchTime match={match} />}

          {/* Right team */}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
              textAlign: "right",
              flex: 1,
            }}
          >
            <Flag code={match.team_right} /> {teamRightName}
          </Typography>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom row */}
        <Stack id={`match-${match.id}-bottom`} direction="row" spacing={1} sx={{ justifyContent: "center", opacity: 0.8 }}>
          {finished && (
            <>
              <Typography variant="body2">{formatMatchDateShort(match.date_time)}</Typography>
              <Typography variant="body2">·</Typography>
            </>
          )}

          <Typography variant="body2">
            {match.stage} {match.stage_info}
          </Typography>

          <Typography variant="body2">·</Typography>

          <Typography variant="body2">{match.stadium}</Typography>
        </Stack>
      </Box>
    </Grid>
  );
}
