import { Button, Card, Typography } from "@mui/material";
import MuiAvatar from "./Avatar";
import type { User } from "../../models/User";

interface AccountCardProps {
  user: User;
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
        <div data-testid="account-avatar">
          {/* <MuiAvatar text={user.name} /> */}
          {/* <MuiAvatar text={"test"} /> */}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography data-testid="account-name" align="left" sx={{ fontWeight: "bold" }}>
            {user.name}
          </Typography>
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
