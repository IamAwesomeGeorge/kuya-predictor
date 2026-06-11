import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { PredictCardProps } from "./PredictCardProps";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import PredictCardButtons from "./PredictCardButtons";

export default function PredictKnockoutStartCard({ navigateTo }: PredictCardProps) {
  const { user } = useContext(UserContext);

  const closed = import.meta.env.VITE_CLOSE_GROUP === "true";

  const { data: done, isFetched } = useQuery({
    queryKey: ["check", "knockoutStart", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_knockout_start").select().eq("user", user?.id);
      return data?.length === 32;
    },
  });

  return (
    <Card sx={{ width: 275, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Knockout Stage Prediction
        </Typography>
        <Typography variant="body2">Predict the knockout bracket based on your group predictions.</Typography>
        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel1-content`} id={`panel1-header`}>
            <Typography component="span">Points breakdown</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>5 points</strong> for each match outcome correct with correct teams playing in that match.
            </Typography>
            <br />
            <Typography variant="body2">
              <em>160 points max - however requires you to already have a perfect score in group stage.</em>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <PredictCardButtons navigateTo={navigateTo} closed={closed} done={done} isFetched={isFetched} />
    </Card>
  );
}
