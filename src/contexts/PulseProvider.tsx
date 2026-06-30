import { useState, type ReactNode } from "react";
import { PulseContext } from "./PulseContext";

export const PulseProvider = ({ children }: { children: ReactNode }) => {
  const [pulse, setPulse] = useState<boolean>(() => {
    const storedPulse = localStorage.getItem("pulse");
    if (storedPulse === null) {
      return true;
    }
    if (storedPulse === "true") {
      return true;
    }
    return false;
  });

  return <PulseContext.Provider value={{ pulse, setPulse }}>{children}</PulseContext.Provider>;
};
