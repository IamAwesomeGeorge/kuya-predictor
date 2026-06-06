import { useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { UserLoggedIn } from "../models/User";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserLoggedIn | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
