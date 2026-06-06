import { useContext, useEffect, useRef } from "react";
import { refreshUserData } from "../utils/LogInUtils";
import { UserContext } from "../../contexts/UserContext";

export default function AccountRefresher() {
  const { user, setUser } = useContext(UserContext);
  const initialUserRef = useRef(user);

  useEffect(() => {
    void refreshUserData(initialUserRef.current, setUser);
  }, [setUser]);

  return <></>;
}
