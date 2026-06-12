import React from "react";
import "flag-icons/css/flag-icons.min.css";
import "./custom-flag-icons.css";

type FlagProps = React.HTMLAttributes<HTMLSpanElement> & {
  code: string;
  tooltip?: boolean;
};

export function Flag({ code, tooltip, ...props }: FlagProps) {
  if (code.toLowerCase() === "draw") {
    console.log("DRAW");
    return <span className="fi fi-equal" {...props}></span>;
  }
  if (!code || code.length !== 2) return "";
  if (code.toLowerCase() === "en") {
    return <span className="fi fi-gb-eng" {...props}></span>;
  }
  if (code.toLowerCase() === "sc") {
    return <span className="fi fi-gb-sct" {...props}></span>;
  }
  const className = `fi fi-${code.toLowerCase()}`;
  return <span className={className} {...props}></span>;

  // todo: tooltip with country name
  // return (
  //   <Tooltip title={"You can double for one match per group."} placement="top">
  //     <span className={className} {...props}></span>
  //   </Tooltip>
  // );
}
