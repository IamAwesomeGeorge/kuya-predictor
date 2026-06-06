import { Alert, Button, Card, CardActions, CardContent, Skeleton, Typography } from "@mui/material";
import type { PredictCardProps } from "./PredictCardProps";

export default function PredictMatchCard({ navigateTo }: PredictCardProps) {
  const done = false;
  const isFetched = true;
  return (
    <Card sx={{ width: 275, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Match Prediction
        </Typography>
        <Typography variant="body2">Predict outcomes of every match</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", mt: "auto" }}>
        <Button size="small" onClick={navigateTo}>
          {done ? "Edit" : "Start"}
        </Button>
        {isFetched ? (
          <Alert severity={done ? "success" : "warning"} sx={{ py: 0, px: 1, fontSize: 12 }}>
            {done ? "DONE" : "NOT DONE"}
          </Alert>
        ) : (
          <Skeleton variant="rounded" width={100} height={30} />
        )}
      </CardActions>
    </Card>
  );
}
