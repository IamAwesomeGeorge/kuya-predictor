import { Alert, Button, Card, CardActions, Skeleton } from "@mui/material";

export default function PredictSkeletonCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular" />
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small">Not Yet...</Button>
        <Alert severity="error" sx={{ py: 0, px: 1, fontSize: 12 }}>
          NOT OPEN
        </Alert>
      </CardActions>
    </Card>
  );
}
