export function hasMatchStarted(dateTime: string) {
  const matchDate = new Date(dateTime);
  const now = new Date();
  return matchDate < now;
}

export function hasMatchFinished(dateTime: string) {
  const matchDate = new Date(dateTime);
  matchDate.setHours(matchDate.getHours() + 2); // Add 2 hours to account for match duration
  const now = new Date();
  return matchDate < now;
}

export function formatMatchDateFull(dateTime: string) {
  // Friday 12 June 2026 03:00
  const formatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date(dateTime));
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${partMap.weekday} ${partMap.day} ${partMap.month} ${partMap.year} ${partMap.hour}:${partMap.minute}`;
}

export function formatMatchDateShort(dateTime: string) {
  // 12/06/2026 03:00
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date(dateTime));
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${partMap.day}/${partMap.month}/${partMap.year} ${partMap.hour}:${partMap.minute}`;
}
