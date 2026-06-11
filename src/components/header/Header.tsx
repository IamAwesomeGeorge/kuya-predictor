import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import LinkHeader from "./LinkHeader";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div data-testid="header">
      <LinkHeader to="/">Home</LinkHeader>
      <LinkHeader to="/matches">Matches</LinkHeader>
      <LinkHeader to="/standings">Standings</LinkHeader>
      {user ? (
        <>
          {window.innerWidth < 600 && <br />}
          <LinkHeader to="/predict">Predict</LinkHeader>
          <LinkHeader to="/scores">Scores</LinkHeader>
          <LinkHeader to="/account">My Account</LinkHeader>
        </>
      ) : (
        <LinkHeader to="/login">Login</LinkHeader>
      )}
      <hr />
    </div>
  );
}
