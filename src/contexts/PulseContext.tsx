import { createContext } from "react";

interface PulseContextType {
  pulse: boolean;
  setPulse: React.Dispatch<React.SetStateAction<boolean>>;
}

// Export only the context from this file. Fast refresh requires files that export
// non-components (like contexts) to not also export components.
export const PulseContext = createContext<PulseContextType>({
  pulse: true,
  setPulse: () => {},
});
