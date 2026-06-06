import { Button, Card, CardActions, CardContent, Skeleton, Typography } from "@mui/material";

export default function PredictSkeletonCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular" />
      <CardActions>
        <Button size="small">Soon</Button>
      </CardActions>
    </Card>
  );
}
