import { createContext } from "react";
import type { UserLoggedIn } from "../models/User";

interface UserContextType {
  user: UserLoggedIn | null;
  setUser: React.Dispatch<React.SetStateAction<UserLoggedIn | null>>;
}

// Export only the context from this file. Fast refresh requires files that export
// non-components (like contexts) to not also export components.
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
