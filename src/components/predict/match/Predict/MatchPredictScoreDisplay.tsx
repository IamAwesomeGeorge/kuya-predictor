import { Box } from "@mui/material";
import { isMobile } from "../../../utils/MobileUtils";

interface MatchPredictScoreDisplayProps {
  id: string;
  value: number | string;
}

export default function MatchPredictScoreDisplay({ id, value }: MatchPredictScoreDisplayProps) {
  return (
    <Box
      id={id}
      sx={{
        color: "white",
        width: isMobile() ? "15%" : "5%",
        border: "1px solid rgba(255, 255, 255, 0.23)",
        borderRadius: "4px",
        padding: "16.5px 14px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {value}
    </Box>
  );
}
