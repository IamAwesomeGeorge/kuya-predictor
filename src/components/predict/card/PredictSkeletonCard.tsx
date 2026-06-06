import { Alert, Button, Card, CardActions, Skeleton } from "@mui/material";

export default function PredictSkeletonCard() {
  return (
    <Card sx={{ width: 275 }}>
      <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular" />
      <CardActions sx={{ display: "flex", justifyContent: "space-between", mt: "auto" }}>
        <Button size="small">Not Yet...</Button>
        <Alert severity="error" sx={{ py: 0, px: 1, fontSize: 12 }}>
          NOT OPEN
        </Alert>
      </CardActions>
    </Card>
  );
}
