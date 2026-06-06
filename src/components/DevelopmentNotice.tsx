import { Alert, AlertTitle, Box } from "@mui/material";

export default function DevelopmentNotice() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Alert severity="warning" variant="filled">
        <AlertTitle>Still Under Development</AlertTitle>
        Information displayed here may be inaccurate.
      </Alert>
    </Box>
  );
}
