import { Button, Typography } from "@mui/material";
import { useTeamName } from "../../utils/TeamsUtils";
import { Flag } from "../../flag/Flag";

interface MatchPredictTieButtonProps {
  isDummy: boolean;
  side: "left" | "right";
  teamCode: string;
  tieBreak: string | null;
  setTieBreak: (teamCode: string | null) => void;
}

export default function MatchPredictTieButton({
  isDummy,
  side,
  teamCode,
  tieBreak,
  setTieBreak,
}: MatchPredictTieButtonProps) {
  const isFirstScore = tieBreak === teamCode;
  return (
    <Button disabled={isDummy} variant={isFirstScore ? "contained" : "outlined"} onClick={() => setTieBreak(teamCode)}>
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
    </Button>
  );
}
