import PageHeader from "../../components/header/PageHeader";
import KnockoutTabs from "../../components/predict/knockout/KnockoutTabs";

export default function PredictKnockout() {
  return (
    <>
      <PageHeader title="Predict Knockout Stage" />
      <KnockoutTabs />
    </>
  );
}
