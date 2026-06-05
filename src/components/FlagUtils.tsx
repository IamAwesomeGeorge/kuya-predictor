// FlagUtils.js

/**
 * Converts a 2-letter ISO country code into a flag emoji.
 * Example: "gb" -> 🇬🇧
 */
export function countryCodeToEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return "";

  // Accept EN for England
  if (countryCode.toLowerCase() === "en") {
    return "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
  }
  // Accept SC for Scotland
  if (countryCode.toLowerCase() === "sc") {
    return "🏴󠁧󠁢󠁳󠁣󠁴󠁿";
  }

  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))
    .map((code) => String.fromCodePoint(code))
    .join("");
}

/**
 * Optional helper: validates ISO alpha-2 format
 */
export function isValidCountryCode(code: string) {
  return /^[A-Z]{2}$/i.test(code);
}

/**
 * React helper component (optional convenience)
 */
import React from "react";

type FlagProps = React.HTMLAttributes<HTMLSpanElement> & {
  code: string;
};

export function Flag({ code, ...props }: FlagProps) {
  return <span {...props}>{countryCodeToEmoji(code)}</span>;
}
