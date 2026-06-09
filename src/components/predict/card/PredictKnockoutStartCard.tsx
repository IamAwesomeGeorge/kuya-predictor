import { Alert, Button, Card, CardActions, CardContent, Skeleton, Typography } from "@mui/material";
import type { PredictCardProps } from "./PredictCardProps";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

export default function PredictKnockoutStartCard({ navigateTo }: PredictCardProps) {
  const { user } = useContext(UserContext);

  const { data: done, isFetched } = useQuery({
    queryKey: ["check", "knockout", user?.id],
    queryFn: async () => {
      return false;
    },
  });

  return (
    <Card sx={{ width: 275, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Knockout Stage Prediction
        </Typography>
        <Typography variant="body2">Predict the final positions of each group in the stage round.</Typography>
        <Typography variant="body2">
          <strong>1 point</strong> for each position guessed correctly.
        </Typography>
        <Typography variant="body2">
          <em>56 points max - 48 points for groups, 8 points for third places</em>
        </Typography>
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
