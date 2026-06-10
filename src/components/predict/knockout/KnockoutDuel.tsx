import { Box, Grid, Stack } from "@mui/material";
import type { TeamInfo } from "../../../models/Infos";
import KnockoutMatch from "./KnockoutMatch";

interface KnockoutDuelProps {
  topTopTeamLabel: string;
  topBottomTeamLabel: string;
  topTopTeam?: TeamInfo;
  topBottomTeam?: TeamInfo;
  bottomTopTeamLabel: string;
  bottomBottomTeamLabel: string;
  bottomTopTeam?: TeamInfo;
  bottomBottomTeam?: TeamInfo;
}

export default function KnockoutDuel({
  topTopTeamLabel,
  topBottomTeamLabel,
  topTopTeam,
  topBottomTeam,
  bottomTopTeamLabel,
  bottomBottomTeamLabel,
  bottomTopTeam,
  bottomBottomTeam,
}: KnockoutDuelProps) {
  return (
    <Grid
      key={topTopTeamLabel + topBottomTeamLabel + bottomTopTeamLabel + bottomBottomTeamLabel}
      size={3}
      sx={{ position: "relative" }}
    >
      <Stack spacing={0} sx={{ width: "100%" }}>
        <KnockoutMatch
          topTeamLabel={topTopTeamLabel}
          bottomTeamLabel={topBottomTeamLabel}
          topTeam={topTopTeam}
          bottomTeam={topBottomTeam}
        />
        <Box
          aria-hidden
          sx={{
            position: "relative",
            height: 32,
            width: "100%",
            flexShrink: 0,
            "&::before": {
              content: '""',
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              borderLeft: "2px solid",
              borderColor: "white",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              left: "50%",
              right: 0,
              top: "50%",
              height: 2,
              backgroundImage: "linear-gradient(to right, white 0%, white 0%, transparent 75%)",
              WebkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 78%, rgba(0, 0, 0, 0) 100%)",
              maskImage: "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 78%, rgba(0, 0, 0, 0) 100%)",
              transform: "translateY(-1px)",
            },
          }}
        />
        <KnockoutMatch
          topTeamLabel={bottomTopTeamLabel}
          bottomTeamLabel={bottomBottomTeamLabel}
          topTeam={bottomTopTeam}
          bottomTeam={bottomBottomTeam}
        />
      </Stack>
    </Grid>
  );
}
