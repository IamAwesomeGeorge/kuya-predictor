import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { MatchInfo } from "../../../models/Infos";
import type { PredictMatchView } from "../../../models/Predict";
import { supabase } from "../../../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useState } from "react";
import { Flag } from "../../utils/Flag";
import NameTag from "../../account/NameTag";

interface MatchFinishedOthersProps {
  match: MatchInfo;
  winner: string;
}

export default function MatchFinishedOthers({ match, winner }: MatchFinishedOthersProps) {
  const { user } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  const { data } = useQuery({
    queryKey: ["predictions", "view", match.id],
    enabled: expanded,
    queryFn: async () => {
      const { data } = await supabase.from("predictions_matches_view1").select().eq("stage", "GROUP").eq("match", match.id);
      return (data as PredictMatchView[]).map((p) => ({
        ...p,
        points:
          ((p.winner === winner ? 1 : 0) +
            (p.score_left === match.score_left && p.score_right === match.score_right ? 3 : 0) +
            (p.first_scorer === match.first_scorer ? 1 : 0)) *
          (p.double ? 2 : 1),
      })) as PredictMatchView[];
    },
  });

  return (
    <Accordion sx={{ mt: 2 }} expanded={expanded} onChange={(_, isExpanded) => setExpanded(isExpanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel1-content`} id={`panel1-header`}>
        <Typography component="span">Others got:</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Win</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="center">First</TableCell>
                <TableCell align="right">Points</TableCell>
              </TableRow>
            </TableHead>
            {data ? (
              <TableBody>
                {data
                  .sort((a, b) => {
                    const pa = a.points ?? 0;
                    const pb = b.points ?? 0;
                    if (pb - pa !== 0) return pb - pa; // points desc
                    return (a.name ?? "").localeCompare(b.name ?? ""); // name asc
                  })
                  .map((p) => (
                    <TableRow key={p.id}>
                      <Tooltip title={<NameTag name={p.name} pfp_url={p.pfp_url} team={p.team} />} placement="left">
                        <TableCell>
                          {p.user === user?.id ? (
                            <strong>You</strong>
                          ) : p.name.length > 10 ? (
                            p.name.slice(0, 7) + "..."
                          ) : (
                            p.name
                          )}
                        </TableCell>
                      </Tooltip>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: 0.5,
                            py: 0.5,
                            borderRadius: "6px",
                            backgroundColor: p.winner === winner ? "#c8ffc8" : "#ffc8c8",
                          }}
                        >
                          <Flag code={p.winner ?? "??"} />
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: 0.5,
                            py: 0.5,
                            borderRadius: "6px",
                            backgroundColor:
                              p.score_left === match.score_left && p.score_right === match.score_right
                                ? "#c8ffc8"
                                : "#ffc8c8",
                          }}
                        >
                          {p.score_left}-{p.score_right}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: 0.5,
                            py: 0.5,
                            borderRadius: "6px",
                            backgroundColor: p.first_scorer === match.first_scorer ? "#c8ffc8" : "#ffc8c8",
                          }}
                        >
                          <Flag code={p.first_scorer ?? "??"} />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {p.double && (
                          <Box
                            sx={{
                              float: "left",
                              display: "inline-flex",
                              alignItems: "center",
                              px: 1,
                              py: 0.5,
                              mr: 1,
                              borderRadius: "6px",
                              backgroundColor: "#000000",
                            }}
                          >
                            <span style={{ color: "#ffffff" }}>X2</span>
                          </Box>
                        )}
                        <span
                          style={{ display: "inline-block", transform: p.double ? "translateY(+5px)" : "translateY(0)" }}
                        >
                          <strong>{p.points}</strong>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            ) : (
              <TableBody>
                {[...Array(10)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(5)].map((_, j) => (
                      <TableCell key={i + j}>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
