import { Alert, Button, Card, CardActions, CardContent, Skeleton, Typography } from "@mui/material";
import type { PredictCardProps } from "./PredictCardProps";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";

export default function PredictGroupCard({ navigateTo }: PredictCardProps) {
  const { user } = useContext(UserContext);

  const { data, isFetched } = useQuery({
    queryKey: ["predict", "count", "group", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("predictions_group").select().eq("user", user?.id);
      return data?.length;
    },
  });
  const done = data === 12;

  return (
    <Card sx={{ width: 275, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Group Stage Prediction
        </Typography>
        <Typography variant="body2">Predict the stage round</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", mt: "auto" }}>
        <Button size="small" onClick={navigateTo}>
          {done ? "Edit" : "Start"}
        </Button>
        {isFetched ? (
          <Alert severity={done ? "success" : "warning"} sx={{ py: 0, px: 1, fontSize: 12 }}>
            {done ? "DONE" : "NOT DONE " + (data ? `(${data}/12)` : "")}
          </Alert>
        ) : (
          <Skeleton variant="rounded" width={65} height={35} sx={{ py: 0, px: 1, fontSize: 12 }} />
        )}
      </CardActions>
    </Card>
  );
}
