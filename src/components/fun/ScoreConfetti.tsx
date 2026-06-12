import { useReward } from "react-rewards";

export default function ScoreConfetti({ id }: { id: string }) {
  const { reward } = useReward(id + "-reward", "confetti");
  reward();

  return <span id={id + "-reward"} />;
}
