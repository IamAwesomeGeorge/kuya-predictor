import React from "react";
import "flag-icons/css/flag-icons.min.css";
import "./custom-flag-icons.css";
import { Tooltip } from "@mui/material";
import { useTeamName } from "../utils/TeamsUtils";

type FlagProps = React.HTMLAttributes<HTMLSpanElement> & {
  code: string;
  tooltip?: boolean;
};

export function Flag({ code, tooltip, ...props }: FlagProps) {
  const customMapping: { [key: string]: string } = {
    en: "gb-eng",
    sc: "gb-sct",
    draw: "equal",
  };

  const className = `fi fi-${customMapping[code.toLowerCase()] || code.toLowerCase()}`;
  const teamName = useTeamName(code);
  const tooltipText = tooltip ? teamName : "";
  return (
    <Tooltip title={tooltipText} placement="top">
      <span className={className} {...props}></span>
    </Tooltip>
  );
}
