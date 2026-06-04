import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import LinkHeader from "./LinkHeader";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div data-testid="header">
      <LinkHeader to="/">Home</LinkHeader>
      <LinkHeader to="/standings">Standings</LinkHeader>
      <LinkHeader to="/scores">Scores</LinkHeader>
      {user ? <LinkHeader to="/account">My Account</LinkHeader> : <LinkHeader to="/login">Login</LinkHeader>}
      <hr />
    </div>
  );
}
