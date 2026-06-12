import { Typography } from "@mui/material";
import { Flag } from "../flag/Flag";
import { useTeamName } from "../utils/TeamsUtils";

interface MatchTeamProps {
  teamCode: string;
  side: "left" | "right";
}

export default function MatchTeam({ teamCode, side }: MatchTeamProps) {
  return (
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: 18,
        textAlign: side,
        flex: 1,
      }}
    >
      {side === "right" && (
        <>
          <Flag code={teamCode} />{" "}
        </>
      )}
      {useTeamName(teamCode)}
      {side === "left" && (
        <>
          {" "}
          <Flag code={teamCode} />
        </>
      )}
    </Typography>
  );
}
