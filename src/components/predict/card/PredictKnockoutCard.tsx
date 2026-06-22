import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { PredictCardProps } from "./PredictCardProps";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import PredictCardButtons from "./PredictCardButtons";
import { isMobile } from "../../utils/MobileUtils";

export default function PredictKnockoutCard({ navigateTo }: PredictCardProps) {
  const { user } = useContext(UserContext);

  const closed = import.meta.env.VITE_CLOSE_GROUP === "true";

  const { data: done, isFetched } = useQuery({
    queryKey: ["check", "knockout", user?.id],
    queryFn: async () => {
      return true;
    },
  });

  return (
    <Card sx={{ width: 250, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Knockout Stage Prediction
        </Typography>
        <Typography variant="body2">After group round has ended, predict the outcome of the knockout stage.</Typography>
        {done && (
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
        )}
      </CardContent>
      {done && <PredictCardButtons navigateTo={navigateTo} closed={closed} done={done} isFetched={isFetched} />}
      <CardActions sx={{ display: "flex", justifyContent: "space-between", mt: "auto" }}>
        <Button size="small" disabled>
          Not Yet...
        </Button>
        <Alert severity="error" sx={{ py: 0, px: 1, fontSize: 12 }}>
          {!isMobile() && "NOT OPEN"}
        </Alert>
      </CardActions>
    </Card>
  );
}
