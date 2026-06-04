import { createContext } from "react";
import type { User } from "../models/User";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Export only the context from this file. Fast refresh requires files that export
// non-components (like contexts) to not also export components.
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
