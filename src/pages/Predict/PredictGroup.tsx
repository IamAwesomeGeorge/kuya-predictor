import PageHeader from "../../components/header/PageHeader";
import GroupRankingChooser from "../../components/predict/group/GroupRankingChooser";

export default function PredictGroup() {
  return (
    <>
      <PageHeader title="Predict Group" />
      <GroupRankingChooser />
    </>
  );
}
