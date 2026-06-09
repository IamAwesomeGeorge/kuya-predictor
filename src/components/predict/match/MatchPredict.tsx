import { Box, Button, Checkbox, Divider, Grid, Stack, Typography } from "@mui/material";
import type { PredictMatchView } from "../../../models/Predict";
import { useTeamName } from "../../utils/TeamsUtils";
import type { MatchInfo } from "../../../models/Infos";
import { Flag } from "../../utils/FlagUtils";
import { formatMatchDateShort } from "../../utils/TimeUtils";
import { useEffect, useState } from "react";
import MatchPredictScore from "./MatchPredictScore";
import MatchPredictFirstButton from "./MatchPredictFirstButton";

interface MatchPredictProps {
  match: MatchInfo;
  current?: PredictMatchView;
  handlePredictChange: (
    matchId: number,
    score_left: number,
    score_right: number,
    first_scorer: string | null,
    double: boolean,
  ) => void;
  isLoading: boolean;
  doubleCode: number | null;
}

export default function MatchPredict({ match, current, handlePredictChange, isLoading, doubleCode }: MatchPredictProps) {
  const [stopSave, setStopSave] = useState(true);
  const [scoreLeft, setScoreLeft] = useState(current ? current.score_left : null);
  const [scoreRight, setScoreRight] = useState(current ? current.score_right : null);
  const [firstScorer, setFirstScorer] = useState<string | null>(current ? current.first_scorer : null);
  const [double, setDouble] = useState(doubleCode === match.id);

  useEffect(() => {
    setDouble(doubleCode === match.id);
  }, [doubleCode, match.id]);

  const winnerText =
    scoreLeft !== null && scoreRight !== null
      ? scoreLeft > scoreRight
        ? match.team_left
        : scoreLeft < scoreRight
          ? match.team_right
          : "DRAW"
      : "???";

  useEffect(() => {
    if (isLoading) {
      setStopSave(true);
    } else if (scoreLeft === null || scoreRight === null || firstScorer === null) {
      setStopSave(true);
    } else if (
      scoreLeft === current?.score_left &&
      scoreRight === current?.score_right &&
      firstScorer === current?.first_scorer &&
      ((double && doubleCode === match.id) || (!double && doubleCode !== match.id))
    ) {
      setStopSave(true);
    } else {
      setStopSave(false);
    }
  }, [isLoading, scoreLeft, scoreRight, firstScorer, double, doubleCode, current, match.id]);

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
        {/* Info row */}
        <Stack id={`match-${match.id}-details`} direction="row" spacing={1} sx={{ justifyContent: "center", opacity: 0.8 }}>
          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            {formatMatchDateShort(match.date_time)}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            ·
          </Typography>

          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            {match.stage} {match.stage_info}
          </Typography>

          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            ·
          </Typography>

          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            {match.stadium}
          </Typography>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Winner row */}
        <Stack id={`match-${match.id}-details`} direction="row" spacing={1} sx={{ justifyContent: "center" }}>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{useTeamName(winnerText)} to win</Typography>
        </Stack>

        {/* Score row */}
        <Stack id={`match-${match.id}-score`} direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          {/* Left team */}
          <Typography sx={{ fontWeight: 600, fontSize: 18, flex: 1 }}>
            {useTeamName(match.team_left)} <Flag code={match.team_left} />
          </Typography>

          <MatchPredictScore id={"left-" + match.id} value={scoreLeft} setValue={setScoreLeft} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 20,
              px: 2,
              color: "#38bdf8",
            }}
          >
            -
          </Typography>
          <MatchPredictScore id={"right-" + match.id} value={scoreRight} setValue={setScoreRight} />

          {/* Right team */}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
              textAlign: "right",
              flex: 1,
            }}
          >
            <Flag code={match.team_right} /> {useTeamName(match.team_right)}
          </Typography>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Extra row */}
        <Stack id={`match-${match.id}-extra`} direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          {/* First team to score */}
          <Box>
            <Typography variant="body2">First team to score</Typography>
            <MatchPredictFirstButton teamCode={match.team_left} firstScorer={firstScorer} setFirstScorer={setFirstScorer} />
            <br />
            <MatchPredictFirstButton teamCode={match.team_right} firstScorer={firstScorer} setFirstScorer={setFirstScorer} />
          </Box>
          {/* Double Points */}
          <Box>
            <Typography variant="body2">Double Points:</Typography>
            <Checkbox
              disabled={doubleCode !== null && doubleCode !== match.id}
              checked={double}
              onChange={(e) => setDouble(e.target.checked)}
              sx={{
                color: "White",
              }}
            />
          </Box>
          {/* Save Button */}
          <Button
            variant="contained"
            disabled={stopSave}
            onClick={() => handlePredictChange(match.id, scoreLeft ?? 0, scoreRight ?? 0, firstScorer, double)}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
}
