import { useContext, useEffect } from "react";
import { refreshUserData } from "../utils/LogInUtils";
import { UserContext } from "../../contexts/UserContext";

export default function AccountRefresher() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    refreshUserData(user, setUser);
  }, []);

  return <></>;
}
