import { Button } from "@mui/material";
import { useRef, useState } from "react";
import Confetti from "react-confetti";
import { useReward } from "react-rewards";

export default function ConfettiButton() {
  const [confetti, setConfetti] = useState<number[]>([]);
  const nextId = useRef(0);

  const handleClick = () => {
    reward();
    const id = nextId.current++;
    setConfetti([...confetti, id]);
  };

  const handleComplete = (id: number) => {
    setConfetti(confetti.filter((c) => c !== id));
  };

  const { reward } = useReward("rewardId", "confetti");

  return (
    <>
      {confetti.map((id) => (
        <Confetti
          key={id}
          recycle={false}
          gravity={0.5}
          numberOfPieces={200}
          onConfettiComplete={() => handleComplete(id)}
        />
      ))}
      <Button onClick={handleClick}>
        Pr<span id="rewardId">e</span>ss Me!
      </Button>
    </>
  );
}
