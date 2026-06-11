import { Button, Card, Typography } from "@mui/material";
import MuiAvatar from "./Avatar";
import type { UserLoggedIn } from "../../models/User";
import TeamTag from "./TeamTag";

interface AccountCardProps {
  user: UserLoggedIn;
  handleLogOut: () => void;
}

export default function AccountCard(props: AccountCardProps) {
  const { user, handleLogOut } = props;
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
          <Typography data-testid="account-name" align="left" sx={{ fontWeight: "bold" }}>
            {user.name}
          </Typography>
          <Typography data-testid="account-username" align="left">
            {user.username}
          </Typography>
        </div>

        {/* <TeamTag team={user.team} /> */}

        <div>
          <Button data-testid="account-logout" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </div>
    </Card>
  );
}
