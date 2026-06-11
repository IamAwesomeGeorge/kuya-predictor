import { Box, Typography } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import TheatersIcon from "@mui/icons-material/Theaters";
import GavelIcon from "@mui/icons-material/Gavel";
import type { Team } from "../../models/User";

interface mapInfo {
  bgColor: string;
  icon: React.ReactNode;
}
export default function TeamTag({ team }: { team: Team }) {
  const teamMap: Record<Team, mapInfo> = {
    KUYA: {
      bgColor: "#193219",
      icon: (
        <CasinoIcon
          sx={{
            fontSize: 14,
            color: "#c8ffc8",
          }}
        />
      ),
    },
    MGS: {
      bgColor: "#321919",
      icon: (
        <TheatersIcon
          sx={{
            fontSize: 14,
            color: "#ffc8c8",
          }}
        />
      ),
    },
    PACBOY: {
      bgColor: "#191932",
      icon: (
        <GavelIcon
          sx={{
            fontSize: 14,
            color: "#c8c8ff",
          }}
        />
      ),
    },
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: 1,
        py: 0.5,
        borderRadius: "6px",
        backgroundColor: teamMap[team].bgColor,
        userSelect: "none",
      }}
    >
      {teamMap[team].icon}
      <Typography
        sx={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "0.05em",
          lineHeight: 1,
        }}
      >
        {team}
      </Typography>
    </Box>
  );
}
