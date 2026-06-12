import { Accordion, AccordionDetails, AccordionSummary, Divider, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isMobile } from "../../utils/MobileUtils";
import ScoreNumber from "../../fun/ScoreNumber";

interface MatchFinishedBreakdownProps {
  id: string;
  totalScore: number;
  winnerCorrect: boolean;
  scoreCorrect: boolean;
  firstScorerCorrect: boolean;
  doubleUsed: boolean;
}

export default function MatchFinishedBreakdown({
  id,
  totalScore,
  winnerCorrect,
  scoreCorrect,
  firstScorerCorrect,
  doubleUsed,
}: MatchFinishedBreakdownProps) {
  return (
    <Accordion sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel1-content`} id={`panel1-header`}>
        <Stack direction="row" sx={{ justifyContent: "space-between", width: "100%" }}>
          <Typography component="span">You got:</Typography>
          <ScoreNumber id={`${id}-total-score`} score={totalScore} />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {winnerCorrect && (
          <Stack direction="row" sx={{ justifyContent: "space-between", width: "100%" }}>
            {isMobile() ? (
              <Typography component="span">Outcome:</Typography>
            ) : (
              <Typography component="span">Correct outcome:</Typography>
            )}
            <Typography component="span">1 POINT</Typography>
          </Stack>
        )}
        {scoreCorrect && (
          <Stack direction="row" sx={{ justifyContent: "space-between", width: "100%" }}>
            {isMobile() ? (
              <Typography component="span">Score:</Typography>
            ) : (
              <Typography component="span">Correct score:</Typography>
            )}
            <Typography component="span">3 POINTS</Typography>
          </Stack>
        )}
        {firstScorerCorrect && (
          <Stack direction="row" sx={{ justifyContent: "space-between", width: "100%" }}>
            {isMobile() ? (
              <Typography component="span">First scorer:</Typography>
            ) : (
              <Typography component="span">Correct first team score:</Typography>
            )}
            <Typography component="span">1 POINT</Typography>
          </Stack>
        )}
        {doubleUsed && (
          <Stack direction="row" sx={{ justifyContent: "space-between", width: "100%" }}>
            <Typography component="span">Double used:</Typography>
            <Typography component="span">
              <strong>2X</strong>
            </Typography>
          </Stack>
        )}
        <Divider sx={{ my: 1.5, borderColor: "rgba(0,0,0,0.5)" }} />
        <Stack direction="row" sx={{ justifyContent: "space-between", width: "100%" }}>
          <Typography component="span">
            <strong>Total:</strong>
          </Typography>
          <Typography component="span" sx={{ color: totalScore === 10 ? "rgb(0, 100, 0)" : "inherit" }}>
            <strong>
              {totalScore} POINT{totalScore !== 1 ? "S" : ""}
            </strong>
          </Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
