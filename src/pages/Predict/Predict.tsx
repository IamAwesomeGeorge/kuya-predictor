import { Grid } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import PredictSkeletonCard from "../../components/predict/card/PredictSkeletonCard";
import PredictGroupCard from "../../components/predict/card/PredictGroupCard";
import { useNavigate } from "@tanstack/react-router";
import PredictMatchCard from "../../components/predict/card/PredictMatchCard";
// import PredictMatchCard from "../../components/predict/card/PredictMatchCard";

export default function Predict() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Predict" />
      <Grid container spacing={1}>
        <PredictGroupCard navigateTo={() => navigate({ to: "/predict/group" })} />
        <PredictSkeletonCard />
        <PredictSkeletonCard />
        <PredictMatchCard navigateTo={() => navigate({ to: "/predict/match" })} />
      </Grid>
    </>
  );
}
