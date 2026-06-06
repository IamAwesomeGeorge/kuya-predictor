import { Grid } from "@mui/material";
import PageHeader from "../../components/header/PageHeader";
import PredictSkeletonCard from "../../components/predict/card/PredictSkeletonCard";
import PredictGroupCard from "../../components/predict/card/PredictGroupCard";

export default function Predict() {
  return (
    <>
      <PageHeader title="Predict" />
      <h1>Predictions not open yet</h1>
      <p>Still in development. Inputs likely to be removed.</p>

      <Grid container spacing={1}>
        <PredictGroupCard done={false} />
        <PredictGroupCard done={true} />
        <PredictSkeletonCard />
        <PredictSkeletonCard />
      </Grid>
    </>
  );
}
