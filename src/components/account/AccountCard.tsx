import { Button, Card, Checkbox, FormControlLabel, FormGroup, Tooltip, Typography } from "@mui/material";
import MuiAvatar from "./Avatar";
import type { UserLoggedIn } from "../../models/User";
import TeamTag from "./TeamTag";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";
import type { UserScoreInfo } from "../../models/Results";
import { PulseContext } from "../../contexts/PulseContext";
import { useContext, useState } from "react";

interface AccountCardProps {
  user: UserLoggedIn;
  handleLogOut: () => void;
}

export default function AccountCard(props: AccountCardProps) {
  const { user, handleLogOut } = props;
  const { pulse, setPulse } = useContext(PulseContext);

  const { data: totalPoints } = useQuery({
    queryKey: ["user", "score", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("user_scores").select().eq("id", user.id);
      // Calculate total points
      const userScore = data?.[0] as UserScoreInfo | undefined;
      const total = userScore ? userScore.matches + userScore.groups + userScore.all + userScore.knockout : 0;
      return total;
    },
  });

  const togglePulse = (value: React.ChangeEvent<HTMLInputElement>) => {
    const update = value.target.checked;
    localStorage.setItem("pulse", update.toString());
    setPulse(update);
  };

  return (
    <Card key={user.id} style={{ margin: "0.5em", padding: "1em" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <MuiAvatar text={user.name} url={user.pfp_url} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TeamTag team={user.team} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography align="left">
              <strong>{user.name}</strong> - {totalPoints} points
            </Typography>
            <Typography align="left">{user.username}</Typography>
          </div>
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Tooltip title="Toggle background pulses when there are actions to do. Indicators will remain.">
                    <Checkbox checked={pulse} onChange={togglePulse} />
                  </Tooltip>
                }
                label="Flashing Lights"
              />
            </FormGroup>
          </div>
        </div>

        <div>
          <Button data-testid="account-logout" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </div>
    </Card>
  );
}
