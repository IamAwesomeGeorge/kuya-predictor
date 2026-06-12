import { Button } from "@mui/material";
import { useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiButton() {
  const [confetti, setConfetti] = useState<number[]>([]);

  const handleClick = () => {
    const id = Date.now();
    setConfetti([...confetti, id]);
  };

  const handleComplete = (id: number) => {
    setConfetti(confetti.filter((c) => c !== id));
  };

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
      <Button onClick={handleClick}>Press Me!</Button>
    </>
  );
}
