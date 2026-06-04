import "../App.css";
import pkg from "../../package.json";

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>Brutal Bros Predictor</h1>
          <p>
            Football predictor for world cup.
            <br />
            Made by Iam_George
          </p>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="warning">
        <h2>Warning</h2>
        <p>
          This is a work in progress. Please report any bugs you find.
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

export default App;
