import React from "react";
import "flag-icons/css/flag-icons.min.css";

type FlagProps = React.HTMLAttributes<HTMLSpanElement> & {
  code: string;
};

export function Flag({ code, ...props }: FlagProps) {
  if (!code || code.length !== 2) return "";
  if (code.toLowerCase() === "en") {
    return <span className="fi fi-gb-eng" {...props}></span>;
  }
  if (code.toLowerCase() === "sc") {
    return <span className="fi fi-gb-sct" {...props}></span>;
  }
  const className = `fi fi-${code.toLowerCase()}`;
  return <span className={className} {...props}></span>;
}
