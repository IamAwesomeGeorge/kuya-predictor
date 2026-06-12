import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CountUpNumber } from "./CountUpNumber";
import { useReward } from "react-rewards";

interface ScoreNumberProps {
  id: string;
  score: number;
}

export default function ScoreNumber({ id, score }: ScoreNumberProps) {
  const [celebration, setCelebration] = useState(false);
  const { reward } = useReward(id + "-reward", "confetti");

  useEffect(() => {
    if (score === 10 && !celebration) {
      const timer = setTimeout(() => {
        setCelebration(true);
        reward();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [reward, score, celebration]);

  return (
    <Typography
      component="span"
      sx={{ color: celebration ? "rgb(0, 100, 0)" : "inherit", transition: "color 1s ease-in-out" }}
    >
      <span id={id + "-reward"} />
      <strong>
        <CountUpNumber id={`${id}-total-score`} end={score} /> POINT{score !== 1 ? "S" : ""}
      </strong>
    </Typography>
  );
}
