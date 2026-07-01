import { keyframes } from "@mui/material/styles";

export const pulseYellow = keyframes`
  0% {
    background-color: #ffffff;
  }
  50% {
    background-color: rgb(255, 255, 200);
  }
  100% {
    background-color: #ffffff;
  }
`;

export const pulseRed = keyframes`
  0% {
    background-color: #253049;
  }
  25% {
    background-color: #492525;
  }
  75% {
    background-color: #492525;
  }
  100% {
    background-color: #253049;
  }
`;
