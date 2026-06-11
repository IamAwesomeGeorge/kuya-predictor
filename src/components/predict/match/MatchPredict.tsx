import { Box, Button, Checkbox, Divider, Grid, Stack, Tooltip, Typography } from "@mui/material";
import type { PredictMatchView } from "../../../models/Predict";
import { findTeamName } from "../../utils/TeamsUtils";
import type { MatchInfo } from "../../../models/Infos";
import { Flag } from "../../utils/FlagUtils";
import { formatMatchDateShort } from "../../utils/TimeUtils";
import { useContext, useEffect, useState } from "react";
import MatchPredictScore from "./MatchPredictScore";
import MatchPredictFirstButton from "./MatchPredictFirstButton";
import { isMobile } from "../../utils/Mobileutils";
import { TeamsContext } from "../../../contexts/TeamsContext";

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
  const { teams } = useContext(TeamsContext);
  const [scoreLeft, setScoreLeft] = useState(current ? current.score_left : null);
  const [scoreRight, setScoreRight] = useState(current ? current.score_right : null);
  const [firstScorer, setFirstScorer] = useState<string | null>(current ? current.first_scorer : null);
  const [double, setDouble] = useState(doubleCode === match.id);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    setDouble(doubleCode === match.id);
  }, [doubleCode, match.id]);

  const stopSave =
    isLoading ||
    scoreLeft === null ||
    scoreRight === null ||
    firstScorer === null ||
    (scoreLeft === current?.score_left &&
      scoreRight === current?.score_right &&
      firstScorer === current?.first_scorer &&
      ((double && doubleCode === match.id) || (!double && doubleCode !== match.id)));
  const saveLabel =
    scoreLeft === current?.score_left &&
    scoreRight === current?.score_right &&
    firstScorer === current?.first_scorer &&
    ((double && doubleCode === match.id) || (!double && doubleCode !== match.id))
      ? "Saved"
      : "Save";

  const winnerText =
    scoreLeft !== null && scoreRight !== null
      ? scoreLeft > scoreRight
        ? match.team_left
        : scoreLeft < scoreRight
          ? match.team_right
          : "DRAW"
      : "???";

  return (
    <Grid size={{ xs: 12, md: 6 }} key={match.id}>
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
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{findTeamName(teams, winnerText)} to win</Typography>
        </Stack>

        {/* Score row */}
        {isMobile() ? (
          <>
            <Stack
              id={`match-${match.id}-score-top`}
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              {/* Left team */}
              <Typography sx={{ fontWeight: 600, fontSize: 18, flex: 1 }}>
                {findTeamName(teams, match.team_left)} <Flag code={match.team_left} />
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
                <Flag code={match.team_right} /> {findTeamName(teams, match.team_right)}
              </Typography>
            </Stack>
            <Stack
              id={`match-${match.id}-score-bottom`}
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
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
            </Stack>
          </>
        ) : (
          <Stack
            id={`match-${match.id}-score`}
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            {/* Left team */}
            <Typography sx={{ fontWeight: 600, fontSize: 18, flex: 1 }}>
              {findTeamName(teams, match.team_left)} <Flag code={match.team_left} />
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
              <Flag code={match.team_right} /> {findTeamName(teams, match.team_right)}
            </Typography>
          </Stack>
        )}

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

          {isMobile() ? (
            <>
              <Box>
                <Tooltip title={"You can double for one match per group."} placement="top">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" sx={{ opacity: doubleCode !== null && doubleCode !== match.id ? 0.5 : 1 }}>
                      X2:
                    </Typography>
                    <Checkbox
                      disabled={doubleCode !== null && doubleCode !== match.id}
                      checked={double}
                      onChange={(e) => setDouble(e.target.checked)}
                      sx={{
                        color: "White",
                      }}
                    />
                  </Box>
                </Tooltip>

                {/* Save Button */}
                <Button
                  variant="contained"
                  disabled={stopSave}
                  onClick={() => handlePredictChange(match.id, scoreLeft ?? 0, scoreRight ?? 0, firstScorer, double)}
                >
                  {saveLabel}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Tooltip title={"You can double for one match per group."} placement="top">
                <Box>
                  <Typography variant="body2" sx={{ opacity: doubleCode !== null && doubleCode !== match.id ? 0.5 : 1 }}>
                    Double Points:
                  </Typography>
                  <Checkbox
                    disabled={doubleCode !== null && doubleCode !== match.id}
                    checked={double}
                    onChange={(e) => setDouble(e.target.checked)}
                    sx={{
                      color: "White",
                    }}
                  />
                </Box>
              </Tooltip>

              {/* Save Button */}
              <Button
                variant="contained"
                disabled={stopSave}
                onClick={() => handlePredictChange(match.id, scoreLeft ?? 0, scoreRight ?? 0, firstScorer, double)}
              >
                {saveLabel}
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Grid>
  );
}
