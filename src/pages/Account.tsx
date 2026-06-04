import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "@tanstack/react-router";
import AccountCard from "../components/account/AccountCard";
import PageHeader from "../components/header/PageHeader";

export default function Account() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate({ to: "/" });
  };

  return (
    <>
      <PageHeader title="Account" />
      {user && <AccountCard user={user} handleLogOut={handleLogOut} />}
    </>
  );
}
