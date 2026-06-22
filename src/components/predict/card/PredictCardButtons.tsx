import { Button, CardActions, Skeleton } from "@mui/material";
import DoneSymbol from "./DoneSymbol";

interface PredictCardButtonsProps {
  navigateTo: () => void;
  closed?: boolean;
  done?: boolean;
}

export default function PredictCardButtons({ navigateTo, closed, done }: PredictCardButtonsProps) {
  return (
    <CardActions sx={{ display: "flex", justifyContent: "space-between", mt: "auto" }}>
      {closed ? (
        <Button size="small" onClick={navigateTo} disabled>
          Closed
        </Button>
      ) : (
        <Button size="small" onClick={navigateTo}>
          {done ? "Edit" : "Start"}
        </Button>
      )}
      {done !== undefined ? (
        <DoneSymbol done={done} />
      ) : (
        <Skeleton variant="rounded" width={65} height={35} sx={{ py: 0, px: 1, fontSize: 12 }} />
      )}
    </CardActions>
  );
}
