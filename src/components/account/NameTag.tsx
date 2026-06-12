import { Box } from "@mui/material";
import Avatar from "./Avatar";
import TeamTag from "./TeamTag";
import type { Team } from "../../models/User";

export default function NameTag({ name, pfp_url, team }: { name: string; pfp_url?: string; team: Team }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <Avatar text={name} url={pfp_url} />
      <span>{name}</span>
      <TeamTag team={team} />
    </Box>
  );
}
