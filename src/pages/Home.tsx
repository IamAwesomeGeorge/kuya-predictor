import { useEffect, useState } from "react";
import "../App.css";
import { supabase } from "../utils/supabase";
import pkg from "../../package.json";
import type { User } from "../models/User";

function App() {
  const [count, setCount] = useState(0);

  const [test, setTest] = useState<User[]>([]);

  useEffect(() => {
    async function getTest() {
      const { data } = await supabase.from("users").select();
      console.log("data", data);

      if (data) {
        setTest(data);
      }
    }

    getTest();
  }, []);

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
          {test.map((t) => (
            <p key={t.id}>
              {t.id} - {t.name}
            </p>
          ))}
        </div>
        <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
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
