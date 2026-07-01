import PageHeader from "../../components/header/PageHeader";
import StartAllTheWay from "../../components/predict/knockout/StartAllTheWay";

export default function PredictAllTheWay() {
  const closed = import.meta.env.VITE_CLOSE_GROUP === "true";
  return (
    <>
      <PageHeader title="Predict All The Way" />
      <StartAllTheWay preview={closed} />
    </>
  );
}
