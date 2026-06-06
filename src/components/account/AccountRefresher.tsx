import { useContext, useEffect, useRef } from "react";
import { refreshUserData } from "../utils/LogInUtils";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "@tanstack/react-router";

export default function AccountRefresher() {
  const { user, setUser } = useContext(UserContext);
  const initialUserRef = useRef(user);
  const navigator = useNavigate();

  useEffect(() => {
    if (initialUserRef.current) {
      void refreshUserData(initialUserRef.current, setUser, navigator);
    }
  }, [setUser]);

  return <></>;
}
