import { OutlinedInput, Tooltip } from "@mui/material";
import { useState } from "react";
import { isMobile } from "../../utils/MobileUtils";

interface MatchPredictScoreProps {
  id: string;
  isDummy: boolean;
  value: number | null;
  setValue: (value: number | null) => void;
}

export default function MatchPredictScore({ id, isDummy, value, setValue }: MatchPredictScoreProps) {
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
    <Tooltip title={isDummy ? "Match teams not set yet" : undefined}>
      <OutlinedInput
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={invalid}
        inputProps={{ style: { textAlign: "center" } }}
        disabled={isDummy}
        sx={{
          color: "white",
          width: isMobile() ? "30%" : "10%",
        }}
      />
    </Tooltip>
  );
}
