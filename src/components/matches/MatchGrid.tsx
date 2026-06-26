import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import type { MatchInfo } from "../../models/Infos";
import { MatchTime } from "./MatchTime";
import { formatMatchDateShort, hasMatchFinished } from "../utils/TimeUtils";
import { MatchScore } from "./MatchScore";
import MatchTeam from "./MatchTeam";
import { stageGroupText } from "../utils/TeamsUtils";

interface MatchGridProps {
  match: MatchInfo;
}

export function MatchGrid(props: MatchGridProps) {
  const { match } = props;

  const finished = hasMatchFinished(match.date_time);

  return (
    <Grid key={match.id} size={{ xs: 12, md: 6 }}>
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
          <MatchTeam teamCode={match.team_left} side="left" />

          {finished ? <MatchScore match={match} /> : <MatchTime match={match} />}

          {/* Right team */}
          <MatchTeam teamCode={match.team_right} side="right" />
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom row */}
        <Stack id={`match-${match.id}-bottom`} direction="row" spacing={1} sx={{ justifyContent: "center", opacity: 0.8 }}>
          {finished && (
            <>
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                {formatMatchDateShort(match.date_time)}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                ·
              </Typography>
            </>
          )}

          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            {stageGroupText(match)}
          </Typography>

          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            ·
          </Typography>

          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            {match.stadium}
          </Typography>
        </Stack>
      </Box>
    </Grid>
  );
}
