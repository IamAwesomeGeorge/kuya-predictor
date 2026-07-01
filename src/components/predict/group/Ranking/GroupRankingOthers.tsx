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
import type { PredictGroupView } from "../../../../models/Predict";
import { supabase } from "../../../../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../../../contexts/UserContext";
import { useContext, useState } from "react";
import { Flag } from "../../../flag/Flag";
import NameTag from "../../../account/NameTag";
import { isMobile } from "../../../utils/MobileUtils";
import type { GroupStageStandings } from "../../../../models/Results";
import { numberIconMap } from "../Helpers";
import { getCorrectBG } from "../../../utils/ColourUtils";

interface GroupRankingOthersProps {
  group: string;
  groupStandings: GroupStageStandings[];
}

export default function GroupRankingOthers({ group, groupStandings }: GroupRankingOthersProps) {
  const { user } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  const { data } = useQuery({
    queryKey: ["predict", "group", "others", group],
    enabled: expanded,
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group_view").select().eq("group", group);
      const dataWithPoints = (data as PredictGroupView[]).map((predict) => ({
        ...predict,
        points: calcPoints(predict),
      }));
      return dataWithPoints as PredictGroupView[];
    },
  });

  const calcPoints = (predict: PredictGroupView) => {
    let points = 0;
    if (predict.pos_1 === groupStandings[0].code) points += 1;
    if (predict.pos_2 === groupStandings[1].code) points += 1;
    if (predict.pos_3 === groupStandings[2].code) points += 1;
    if (predict.pos_4 === groupStandings[3].code) points += 1;
    return points;
  };

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
                {!isMobile() && (
                  <>
                    <TableCell align="center">{numberIconMap[1]}</TableCell>
                    <TableCell align="center">{numberIconMap[2]}</TableCell>
                    <TableCell align="center">{numberIconMap[3]}</TableCell>
                    <TableCell align="center">{numberIconMap[4]}</TableCell>
                  </>
                )}
                <TableCell align="right">{"Points"}</TableCell>
              </TableRow>
            </TableHead>
            {data ? (
              <TableBody>
                {!isMobile() && (
                  <TableRow key={"current"} sx={{ backgroundColor: "#f0f0f0" }}>
                    <TableCell>Current</TableCell>
                    {groupStandings.map((standing) => (
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: 0.5,
                            py: 0.5,
                            borderRadius: "6px",
                          }}
                        >
                          <Flag code={standing.code} tooltip />
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                )}
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
                          ) : p.name.length > 7 && !isMobile() ? (
                            p.name.slice(0, 5) + "..."
                          ) : (
                            p.name
                          )}
                        </TableCell>
                      </Tooltip>
                      {!isMobile() &&
                        [p.pos_1, p.pos_2, p.pos_3, p.pos_4].map((pos, index) => (
                          <TableCell align="center">
                            <Box
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                px: 0.5,
                                py: 0.5,
                                borderRadius: "6px",
                                backgroundColor: getCorrectBG(pos == groupStandings[index].code),
                              }}
                            >
                              <Flag code={pos} tooltip />
                            </Box>
                          </TableCell>
                        ))}
                      <TableCell align="right">
                        <span
                          style={{
                            display: "inline-block",
                            color: p.points === 4 ? "rgb(0, 100, 0)" : "inherit",
                          }}
                        >
                          <strong>{p.points}</strong>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            ) : (
              // Skeletons.
              <TableBody>
                {[...Array(10)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(6)].map((_, j) => (
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
