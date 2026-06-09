import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { PredictCardProps } from "./PredictCardProps";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";

export default function PredictGroupCard({ navigateTo }: PredictCardProps) {
  const { user } = useContext(UserContext);

  const { data: done, isFetched } = useQuery({
    queryKey: ["check", "group", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group").select().eq("user", user?.id);
      const { data: thirdPlaceData } = await supabase.from("predictions_group_third").select("data").eq("user", user?.id);
      return data?.length === 12 && thirdPlaceData?.[0]?.data.length === 8;
    },
  });

  return (
    <Card sx={{ width: 275, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Group Stage Prediction
        </Typography>
        <Typography variant="body2">Predict the final positions of each group in the stage round.</Typography>
        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel1-content`} id={`panel1-header`}>
            <Typography component="span">Points breakdown</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>1 point</strong> for each position guessed correctly.
            </Typography>
            <br />
            <Typography variant="body2">
              <em>56 points max - 48 points for groups, 8 points for third places</em>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", mt: "auto" }}>
        <Button size="small" onClick={navigateTo}>
          {done ? "Edit" : "Start"}
        </Button>
        {isFetched ? (
          <Alert severity={done ? "success" : "warning"} sx={{ py: 0, px: 1, fontSize: 12 }}>
            {done ? "DONE" : "NOT DONE "}
          </Alert>
        ) : (
          <Skeleton variant="rounded" width={65} height={35} sx={{ py: 0, px: 1, fontSize: 12 }} />
        )}
      </CardActions>
    </Card>
  );
}
