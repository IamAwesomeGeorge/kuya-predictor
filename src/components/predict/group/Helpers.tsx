import type { JSX } from "react/jsx-runtime";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";

export const EMPTY_SELECTION: Record<number, string | null> = {
  1: null,
  2: null,
  3: null,
  4: null,
};

export const numberIconMap: Record<number, JSX.Element> = {
  0: <HelpCenterIcon />,
  1: <LooksOneIcon />,
  2: <LooksTwoIcon />,
  3: <Looks3Icon />,
  4: <Looks4Icon />,
};
