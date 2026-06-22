import { Grid } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import PredictGroupCard from "../../components/predict/card/PredictGroupCard";
import { useNavigate } from "@tanstack/react-router";
import PredictMatchCard from "../../components/predict/card/PredictMatchCard";
import PredictAllTheWayCard from "../../components/predict/card/PredictAllTheWayCard";
import PredictKnockoutCard from "../../components/predict/card/PredictKnockoutCard";
import { isMobile } from "../../components/utils/MobileUtils";

export default function Predict() {
  const navigate = useNavigate();

  const closed = import.meta.env.VITE_CLOSE_GROUP === "true";

  const matchCard = <PredictMatchCard navigateTo={() => navigate({ to: "/predict/match" })} />;
  const groupCard = <PredictGroupCard navigateTo={() => navigate({ to: "/predict/group" })} />;
  const allTheWayCard = <PredictAllTheWayCard navigateTo={() => navigate({ to: "/predict/all-the-way" })} />;
  const knockoutCard = <PredictKnockoutCard navigateTo={() => navigate({ to: "/predict/knockout" })} />;

  const cards = closed
    ? [matchCard, knockoutCard, groupCard, allTheWayCard]
    : [matchCard, groupCard, allTheWayCard, knockoutCard];

  return (
    <>
      <PageHeader title="Predict" />
      {isMobile() ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {cards[0]}
            {cards[1]}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {cards[2]}
            {cards[3]}
          </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Grid container spacing={0.5}>
            {cards.map((card) => card)}
          </Grid>
        </div>
      )}
    </>
  );
}
