import { Alert } from "@mui/material";
import { isMobile } from "../../utils/MobileUtils";

export default function DoneSymbol({ done }: { done?: boolean }) {
  return (
    <Alert severity={done ? "success" : "warning"} sx={{ py: 0, px: 1, fontSize: 12 }}>
      {!isMobile() && (done ? "DONE" : "NOT DONE ")}
    </Alert>
  );
}
