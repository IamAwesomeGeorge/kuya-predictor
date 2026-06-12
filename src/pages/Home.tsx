import "../App.css";
import pkg from "../../package.json";
import AccountRefresher from "../components/account/AccountRefresher";
import ConfettiButton from "../components/fun/ConfettiButton";

function Home() {
  return (
    <>
      <AccountRefresher />
      <section id="center">
        <div>
          <h1>Brutal Bros Predictor</h1>
          <p>
            Football predictor for world cup.
            <br />
            Made by Iam_George
          </p>
          <br />
          <br />
          <br />
          <ConfettiButton />
        </div>
      </section>

      <section id="warning">
        <p>
          Please report any bugs you find.
          <br />
          <strong>Security is not a priority! so pls don't break the site.</strong>
        </p>
        <p>Site version: {pkg.version}</p>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default Home;
