import { useCountUp } from "react-countup";

interface CountUpNumberProps {
  id: string;
  end: number;
  duration?: number;
  delay?: number;
}

export const CountUpNumber = ({ id, end, duration, delay }: CountUpNumberProps) => {
  useCountUp({ ref: id, end, duration, delay });
  return <span id={id} />;
};
