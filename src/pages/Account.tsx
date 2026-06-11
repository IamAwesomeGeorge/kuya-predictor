import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "@tanstack/react-router";
import AccountCard from "../components/account/AccountCard";
import PageHeader from "../components/header/PageHeader";
import AccountRefresher from "../components/account/AccountRefresher";
import { logOutUser } from "../components/utils/LogInUtils";
import Doner from "../components/account/Doner";

export default function Account() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <AccountRefresher />
      <PageHeader title="Account" />
      {user && <AccountCard user={user} handleLogOut={() => logOutUser(setUser, navigate)} />}
      <p>Todo: show the current predictions here</p>
      {import.meta.env.VITE_DEV === "true" && <Doner />}
    </>
  );
}
