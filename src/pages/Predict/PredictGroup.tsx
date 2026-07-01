import PageHeader from "../../components/header/PageHeader";
import GroupMainTabs from "../../components/predict/group/GroupMainTabs";

export default function PredictGroup() {
  const closed = import.meta.env.VITE_CLOSE_GROUP === "true";
  return (
    <>
      <PageHeader title="Predict Group Stage" />
      <GroupMainTabs preview={closed} />
    </>
  );
}
