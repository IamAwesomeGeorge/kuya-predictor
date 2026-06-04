import { Box, Grid } from "@mui/material";
import PageHeader from "../components/header/PageHeader";
import { StandingsTable } from "../components/standings/StandingsTable";
import type { GroupInfo } from "../models/Results";

export default function Standings() {
  const groups: { [key: string]: GroupInfo[] } = {
    A: [
      { team: "Mexico", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "South Africa", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "South Korea", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Czechia", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    B: [
      { team: "Canada", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Bosnia and Herzegovina", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Qatar", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Switzerland", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    C: [
      { team: "Brazil", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Morocco", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Haiti", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Scotland", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    D: [
      { team: "United States", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Paraguay", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Australia", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Turkey", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    E: [
      { team: "Germany", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Curacao", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Ivory Coast", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Ecuador", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    F: [
      { team: "Netherlands", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Japan", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Sweden", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Tunisia", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    G: [
      { team: "Belgium", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Egypt", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Iran", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "New Zealand", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    H: [
      { team: "Spain", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Cape Verde", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Saudi Arabia", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Uruguay", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    I: [
      { team: "France", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Senegal", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Iraq", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Norway", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    J: [
      { team: "Argentina", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Algeria", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Austria", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Jordan", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    K: [
      { team: "Portugal", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Jamaica", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Uzbekistan", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Colombia", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
    L: [
      { team: "England", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Croatia", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Ghana", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
      { team: "Panama", played: 0, won: 0, draw: 0, lost: 0, points: 0 },
    ],
  };

  return (
    <>
      <PageHeader title="Current Standings" />
      <Grid container spacing={2}>
        <StandingsTable data={groups["A"]} />
        <StandingsTable data={groups["B"]} />
        <StandingsTable data={groups["C"]} />
        <StandingsTable data={groups["D"]} />
        <StandingsTable data={groups["E"]} />
        <StandingsTable data={groups["F"]} />
        <StandingsTable data={groups["G"]} />
        <StandingsTable data={groups["H"]} />
        <StandingsTable data={groups["I"]} />
        <StandingsTable data={groups["J"]} />
        <StandingsTable data={groups["K"]} />
        <StandingsTable data={groups["L"]} />
      </Grid>
    </>
  );
}
