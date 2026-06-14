import { Box, type SxProps } from "@mui/material";

export default function X2({ sx }: { sx?: SxProps }) {
  return (
    <Box
      sx={{
        ...sx,
        px: 1,
        py: 0.5,
        mr: 1,
        borderRadius: "6px",
        backgroundColor: "#000000",
      }}
    >
      <span style={{ color: "#ffffff" }}>X2</span>
    </Box>
  );
}
