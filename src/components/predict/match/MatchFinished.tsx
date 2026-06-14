import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import type { PredictMatchView } from "../../../models/Predict";
import { findTeamName } from "../../utils/TeamsUtils";
import type { MatchInfo } from "../../../models/Infos";
import { formatMatchDateShort, hasMatchFinished, hasMatchStarted } from "../../utils/TimeUtils";
import { useContext } from "react";
import MatchTeam from "../../matches/MatchTeam";
import { isMobile } from "../../utils/MobileUtils";
import { TeamsContext } from "../../../contexts/TeamsContext";
import MatchPredictScoreDisplay from "./MatchPredictScoreDisplay";
import MatchFinishedBreakdown from "./MatchFinishedBreakdown";
import MatchFinishedOthers from "./MatchFinishedOthers";
import X2 from "./X2";

interface MatchFinishedProps {
  match: MatchInfo;
  current?: PredictMatchView;
}

export default function MatchFinished({ match, current }: MatchFinishedProps) {
  const { teams } = useContext(TeamsContext);

  const isStarted = hasMatchStarted(match.date_time);
  const isFinished = hasMatchFinished(match.date_time);
  const waitingForResult = match.score_left === null || match.score_right === null;

  const guessedWinner = current?.winner ?? "???";
  const guessedScoreLeft = current?.score_left ?? "??";
  const guessedScoreRight = current?.score_right ?? "??";
  const guessedFirstScorer = current?.first_scorer ?? "???";
  const doubleUsed = current?.double ?? false;

  const trueWinnerText =
    match.score_left !== undefined && match.score_right !== undefined
      ? match.score_left > match.score_right
        ? match.team_left
        : match.score_left < match.score_right
          ? match.team_right
          : "DRAW"
      : "???";

  const winnerCorrect = guessedWinner === trueWinnerText && guessedWinner !== "???";
  const scoreCorrect = guessedScoreLeft === match.score_left && guessedScoreRight === match.score_right;
  const firstScorerCorrect = guessedFirstScorer === match.first_scorer && guessedFirstScorer !== "???";
  const finalScore = (winnerCorrect ? 1 : 0) + (scoreCorrect ? 3 : 0) + (firstScorerCorrect ? 1 : 0);
  const totalScore = doubleUsed ? finalScore * 2 : finalScore;

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

        {/* Guess Winner row */}
        <Box sx={{ position: "relative" }}>
          {doubleUsed && <X2 sx={{ position: "absolute", top: -5, right: -5, zIndex: 10 }} />}
          <Typography sx={{ fontSize: 20 }}>
            <strong>Your Prediction:</strong>
          </Typography>
          <Typography sx={{ fontSize: 18 }}>
            <strong>{findTeamName(teams, guessedWinner)}</strong> to win
          </Typography>

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
                <MatchPredictScoreDisplay id={"left-" + match.id} value={guessedScoreLeft ?? "??"} />
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
                <MatchPredictScoreDisplay id={"right-" + match.id} value={guessedScoreRight ?? "??"} />
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

              <MatchPredictScoreDisplay id={"left-" + match.id} value={guessedScoreLeft ?? "??"} />
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
              <MatchPredictScoreDisplay id={"right-" + match.id} value={guessedScoreRight ?? "??"} />

              {/* Right team */}
              <MatchTeam teamCode={match.team_right} side="right" />
            </Stack>
          )}
          <Typography sx={{ fontSize: 18 }}>
            <strong>{findTeamName(teams, guessedFirstScorer)}</strong> to score first
          </Typography>
        </Box>

        {isStarted && (
          <>
            {/* True Winner row */}
            <Typography sx={{ fontSize: 20, mt: 2 }}>
              <strong>Final Results:</strong>
            </Typography>
            {isFinished ? (
              <>
                {waitingForResult ? (
                  <Stack id={`match-${match.id}-details`} direction="row" spacing={1} sx={{ justifyContent: "center" }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Waiting for result...</Typography>
                  </Stack>
                ) : (
                  <Stack id={`match-${match.id}-details`} direction="row" spacing={6} sx={{ justifyContent: "center" }}>
                    <Typography sx={{ fontSize: 14, color: winnerCorrect ? "#c8ffc8" : "#ffc8c8" }}>
                      <strong>{findTeamName(teams, trueWinnerText)}</strong> won
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: scoreCorrect ? "#c8ffc8" : "#ffc8c8" }}>
                      FT:{" "}
                      <strong>
                        {match.score_left ?? "??"}-{match.score_right ?? "??"}
                      </strong>
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: firstScorerCorrect ? "#c8ffc8" : "#ffc8c8" }}>
                      <strong>{findTeamName(teams, match.first_scorer ?? "?")}</strong> scored first
                    </Typography>
                  </Stack>
                )}
              </>
            ) : (
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Match currently ongoing...</Typography>
            )}
          </>
        )}

        {!waitingForResult && (
          <>
            <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />
            <MatchFinishedBreakdown
              id={match.id.toString()}
              totalScore={totalScore}
              winnerCorrect={winnerCorrect}
              scoreCorrect={scoreCorrect}
              firstScorerCorrect={firstScorerCorrect}
              doubleUsed={doubleUsed}
            />
            <MatchFinishedOthers match={match} winner={trueWinnerText} />
          </>
        )}
      </Box>
    </Grid>
  );
}
