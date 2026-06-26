import { Box, Button, Checkbox, Divider, Grid, Stack, Tooltip, Typography } from "@mui/material";
import type { PredictMatchView } from "../../../models/Predict";
import { findTeamName, stageGroupText } from "../../utils/TeamsUtils";
import type { MatchInfo } from "../../../models/Infos";
import { formatMatchDateShort } from "../../utils/TimeUtils";
import { useContext, useEffect, useState } from "react";
import MatchPredictScore from "./MatchPredictScore";
import MatchPredictFirstButton from "./MatchPredictFirstButton";
import { isMobile } from "../../utils/MobileUtils";
import { TeamsContext } from "../../../contexts/TeamsContext";
import MatchTeam from "../../matches/MatchTeam";
import { keyframes } from "@mui/material/styles";
import NotDone from "./NotDone";

//todo: remove paulse
const pulseRed = keyframes`
  0% {
    background-color: #253049;
  }
  25% {
    background-color: #492525;
  }
  75% {
    background-color: #492525;
  }
  100% {
    background-color: #253049;
  }
`;

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

  const isDummy = match.team_left === "ZZ" || match.team_right === "ZZ";

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    setDouble(doubleCode === match.id);
  }, [doubleCode, match.id]);

  const needsToBeDone =
    (current?.score_left === undefined || current?.score_right === undefined || current?.first_scorer === undefined) &&
    match.team_left !== "ZZ" &&
    match.team_right !== "ZZ";

  const stopSave =
    isLoading ||
    isDummy ||
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
  const gdText =
    scoreLeft !== null && scoreRight !== null
      ? scoreLeft - scoreRight > 0
        ? scoreLeft - scoreRight
        : scoreRight - scoreLeft
      : 0;

  return (
    <Grid size={{ xs: 12, md: 6 }} key={match.id}>
      <Box
        sx={{
          bgcolor: "#253049",
          color: "white",
          borderRadius: 2,
          p: 2,
          animation: needsToBeDone ? `${pulseRed} 1.5s ease-in-out infinite` : undefined,
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
            {stageGroupText(match)}
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
        <Box sx={{ position: "relative" }}>
          {needsToBeDone && <NotDone sx={{ position: "absolute", top: -5, right: -5, zIndex: 10 }} />}
          <Stack id={`match-${match.id}-winner`} direction="row" spacing={1} sx={{ justifyContent: "center" }}>
            <Typography sx={{ fontSize: 18 }}>
              <strong>{findTeamName(teams, winnerText)}</strong> to win
            </Typography>
          </Stack>
        </Box>

        {/* Score row */}
        {isMobile() ? (
          <>
            <Stack
              id={`match-${match.id}-score-top`}
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              {/* Left team */}
              <MatchTeam teamCode={match.team_left} side="left" />

              {/* Right team */}
              <MatchTeam teamCode={match.team_right} side="right" />
            </Stack>
            <Stack
              id={`match-${match.id}-score-bottom`}
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <MatchPredictScore id={"left-" + match.id} isDummy={isDummy} value={scoreLeft} setValue={setScoreLeft} />
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
              <MatchPredictScore id={"right-" + match.id} isDummy={isDummy} value={scoreRight} setValue={setScoreRight} />
            </Stack>
          </>
        ) : (
          <Stack
            id={`match-${match.id}-score`}
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            {/* Left team */}
            <MatchTeam teamCode={match.team_left} side="left" />

            <MatchPredictScore id={"left-" + match.id} isDummy={isDummy} value={scoreLeft} setValue={setScoreLeft} />
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
            <MatchPredictScore id={"right-" + match.id} isDummy={isDummy} value={scoreRight} setValue={setScoreRight} />

            {/* Right team */}
            <MatchTeam teamCode={match.team_right} side="right" />
          </Stack>
        )}
        {/* GD row */}
        <Stack id={`match-${match.id}-gd`} direction="row" spacing={1} sx={{ justifyContent: "center" }}>
          <Typography sx={{ fontSize: 18 }}>
            Goal Difference: <strong>{gdText}</strong>
          </Typography>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Extra row */}
        <Stack id={`match-${match.id}-extra`} direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          {/* First team to score */}
          <Box>
            <Typography variant="body2">First team to score</Typography>
            <MatchPredictFirstButton
              isDummy={isDummy}
              teamCode={match.team_left}
              firstScorer={firstScorer}
              setFirstScorer={setFirstScorer}
            />
            <br />
            <MatchPredictFirstButton
              isDummy={isDummy}
              teamCode={match.team_right}
              firstScorer={firstScorer}
              setFirstScorer={setFirstScorer}
            />
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
