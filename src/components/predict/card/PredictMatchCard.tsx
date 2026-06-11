import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { PredictCardProps } from "./PredictCardProps";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import PredictCardButtons from "./PredictCardButtons";

export default function PredictMatchCard({ navigateTo }: PredictCardProps) {
  const { user } = useContext(UserContext);

  const { data: done, isFetched } = useQuery({
    queryKey: ["check", "match", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("matches").select().eq("stage", "GROUP").order("date_time", { ascending: true });
      const { data: predictionsData } = await supabase
        .from("predictions_matches_view")
        .select()
        .eq("stage", "GROUP")
        .eq("user", user?.id);
      return data?.length === predictionsData?.length;
    },
  });

  return (
    <Card sx={{ width: 275, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Match Prediction
        </Typography>
        <Typography variant="body2">Predict outcomes of every match.</Typography>
        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel1-content`} id={`panel1-header`}>
            <Typography component="span">Points breakdown</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>1 point</strong> for getting the correct winner/draw.
              <br />
              <strong>3 points</strong> for getting the correct score.
              <br />
              <strong>1 point</strong> for getting the correct team to score first.
              <br />
              An option to <strong>double</strong> the points per group.
            </Typography>
            <br />
            <Typography variant="body2">
              <em>5 points per match max.</em>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <PredictCardButtons navigateTo={navigateTo} done={done} isFetched={isFetched} />
    </Card>
  );
}
