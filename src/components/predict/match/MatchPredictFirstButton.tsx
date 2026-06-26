import { Button, Stack, Typography } from "@mui/material";
import { useTeamName } from "../../utils/TeamsUtils";
import { Flag } from "../../flag/Flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface MatchPredictFirstButtonProps {
  isDummy: boolean;
  teamCode: string;
  firstScorer: string | null;
  setFirstScorer: (teamCode: string | null) => void;
}

export default function MatchPredictFirstButton({
  isDummy,
  teamCode,
  firstScorer,
  setFirstScorer,
}: MatchPredictFirstButtonProps) {
  const isFirstScore = firstScorer === teamCode;
  return (
    <Button
      disabled={isDummy}
      variant={isFirstScore ? "contained" : "outlined"}
      fullWidth
      onClick={() => setFirstScorer(teamCode)}
      sx={{ justifyContent: "flex-start", py: 0.5, minHeight: 44 }}
    >
      <Stack direction="row" spacing={1} sx={{ width: "100%", alignItems: "center" }}>
        <Flag code={teamCode} />
        <Typography variant="body2" noWrap>
          {useTeamName(teamCode)}
        </Typography>
        {isFirstScore && <CheckCircleIcon />}
      </Stack>
    </Button>
  );
}
