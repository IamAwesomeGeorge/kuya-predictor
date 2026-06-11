import { OutlinedInput } from "@mui/material";
import { useState } from "react";
import { isMobile } from "../../utils/Mobileutils";

interface MatchPredictScoreProps {
  id: string;
  value: number | null;
  setValue: (value: number | null) => void;
}

export default function MatchPredictScore({ id, value, setValue }: MatchPredictScoreProps) {
  const [invalid, setInvalid] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setValue(null);
      setInvalid(true);
      return;
    }
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 99) {
      setValue(newValue);
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  };

  const onBlur = () => {
    if (value === null) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  };

  return (
    <OutlinedInput
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={invalid}
      inputProps={{ style: { textAlign: "center" } }}
      sx={{
        color: "white",
        width: isMobile() ? "30%" : "10%",
      }}
    />
  );
}
