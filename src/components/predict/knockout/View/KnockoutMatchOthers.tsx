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
import type { PredictKnockoutView } from "../../../../models/Predict";
import { supabase } from "../../../../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../../../contexts/UserContext";
import { useContext, useState } from "react";
import { Flag } from "../../../flag/Flag";
import NameTag from "../../../account/NameTag";
import { isMobile } from "../../../utils/MobileUtils";
import { getCorrectBGExt } from "../../../utils/ColourUtils";

interface KnockoutMatchOthersProps {
  match: number;
  winner: string;
  knockoutMode: "allTheWay" | "knockout";
}

export default function KnockoutMatchOthers({ match, winner, knockoutMode }: KnockoutMatchOthersProps) {
  const { user } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  const { data } = useQuery({
    queryKey: ["predict", knockoutMode, "others", match],
    enabled: expanded,
    queryFn: async () => {
      const table = knockoutMode === "allTheWay" ? "predictions_knockout_start_view" : "predictions_knockout_view";
      const { data } = await supabase.from(table).select().eq("matchId", match);
      return data as PredictKnockoutView[];
    },
  });

  return (
    <Accordion expanded={expanded} onChange={(_, isExpanded) => setExpanded(isExpanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel1-content`} id={`panel1-header`}>
        <Typography component="span">Others guessed:</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Winner</TableCell>
              </TableRow>
            </TableHead>
            {data ? (
              <TableBody>
                {data
                  .sort((a, b) => {
                    // Put winner on top, then sort by winner alphabetically, then sort by name alphabetically
                    if (a.winner === winner && b.winner !== winner) return -1;
                    if (a.winner !== winner && b.winner === winner) return 1;
                    if (a.winner < b.winner) return -1;
                    if (a.winner > b.winner) return 1;
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                  })
                  .map((p) => (
                    <TableRow key={p.id}>
                      <Tooltip title={<NameTag name={p.name} pfp_url={p.pfp_url} team={p.team} />} placement="left">
                        <TableCell>
                          {p.user === user?.id ? (
                            <strong>You</strong>
                          ) : p.name.length > 7 && !isMobile() ? (
                            p.name.slice(0, 5) + "..."
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
                            backgroundColor: getCorrectBGExt(winner === "??", p.winner === winner),
                          }}
                        >
                          <Flag code={p.winner} tooltip />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            ) : (
              // Skeletons.
              <TableBody>
                {[...Array(10)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(2)].map((_, j) => (
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
