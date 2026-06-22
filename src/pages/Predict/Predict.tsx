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

  return (
    <>
      <PageHeader title="Predict" />
      {isMobile() ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PredictMatchCard navigateTo={() => navigate({ to: "/predict/match" })} />
            <PredictGroupCard navigateTo={() => navigate({ to: "/predict/group" })} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PredictAllTheWayCard navigateTo={() => navigate({ to: "/predict/all-the-way" })} />
            <PredictKnockoutCard navigateTo={() => navigate({ to: "/predict/knockout" })} />
          </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Grid container spacing={0.5}>
            <PredictMatchCard navigateTo={() => navigate({ to: "/predict/match" })} />
            <PredictGroupCard navigateTo={() => navigate({ to: "/predict/group" })} />
            <PredictAllTheWayCard navigateTo={() => navigate({ to: "/predict/all-the-way" })} />
            <PredictKnockoutCard navigateTo={() => navigate({ to: "/predict/knockout" })} />
          </Grid>
        </div>
      )}
    </>
  );
}
