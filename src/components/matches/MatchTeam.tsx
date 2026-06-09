import { Typography } from "@mui/material";
import { Flag } from "../utils/FlagUtils";
import { useTeamName } from "../utils/TeamsUtils";

interface MatchTeamProps {
  teamCode: string;
  side: "left" | "right";
}

export default function MatchTeam({ teamCode, side }: MatchTeamProps) {
  const sideSwap = side === "left" ? "right" : "left";
  return (
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: 18,
        textAlign: sideSwap,
        flex: 1,
      }}
    >
      {sideSwap === "left" && (
        <>
          <Flag code={teamCode} />{" "}
        </>
      )}
      {useTeamName(teamCode)}
      {sideSwap === "right" && (
        <>
          {" "}
          <Flag code={teamCode} />
        </>
      )}
    </Typography>
  );
}
