import { Alert, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import type { PredictCardProps } from "./PredictCardProps";

export default function PredictGroupCard({ done }: PredictCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Photo?
        </Typography>
        <Typography variant="h5" component="div">
          Group Stage Prediction
        </Typography>
        <Typography variant="body2">Predict the stage round</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small">{done ? "Edit" : "Start"}</Button>
        <Alert severity={done ? "success" : "warning"} sx={{ py: 0, px: 1, fontSize: 12 }}>
          {done ? "DONE" : "NOT DONE"}
        </Alert>
      </CardActions>
    </Card>
  );
}
