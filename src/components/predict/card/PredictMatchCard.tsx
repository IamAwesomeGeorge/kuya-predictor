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

export default function PredictMatchCard({ navigateTo }: PredictCardProps) {
  const { user } = useContext(UserContext);

  const { data: done, isFetched } = useQuery({
    queryKey: ["check", "match", user?.id],
    queryFn: async () => {
      return false;
      // const { data } = await supabase.from("predictions_group").select().eq("user", user?.id);
      // const { data: thirdPlaceData } = await supabase.from("predictions_group_third").select("data").eq("user", user?.id);
      // return data?.length === 12 && thirdPlaceData?.[0]?.data.length === 8;
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
