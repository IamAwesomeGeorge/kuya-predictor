import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { PredictCardProps } from "./PredictCardProps";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import PredictCardButtons from "./PredictCardButtons";
import { supabase } from "../../../utils/supabase";
import { PulseContext } from "../../../contexts/PulseContext";
import { pulseYellow } from "../../utils/PulseUtils";

export default function PredictKnockoutCard({ navigateTo }: PredictCardProps) {
  const { user } = useContext(UserContext);
  const { pulse } = useContext(PulseContext);

  const { data: done } = useQuery({
    queryKey: ["check", "knockout", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_knockout").select().eq("user", user?.id);
      return data?.length === 32;
    },
  });

  return (
    <Card
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        animation: !done && pulse ? `${pulseYellow} 1.5s ease-in-out infinite` : undefined,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Knockout Stage Prediction
        </Typography>
        <Typography variant="body2">
          Predict the outcome of the knockout stage, starting from the teams that advanced from the group stage.
        </Typography>
        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel1-content`} id={`panel1-header`}>
            <Typography component="span">Points breakdown</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>2 points</strong> for each match winner guessed correct.
            </Typography>
            <br />
            <Typography variant="body2">
              <em>64 points max - however becomes scarce further into the stage.</em>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <PredictCardButtons navigateTo={navigateTo} done={done} />
    </Card>
  );
}
