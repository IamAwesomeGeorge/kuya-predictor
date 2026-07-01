import type { PredictGroup } from "../../../../models/Predict";
import GroupRankingViewer from "./GroupRankingViewer";
import GroupRankingEditer from "./GroupRankingEditer";

interface GroupRankingBaseProps {
  teamCodes: string[];
  data?: PredictGroup[];
  isPending: boolean;
  preview: boolean;
}

export default function GroupRankingBase({ teamCodes, data, isPending, preview }: GroupRankingBaseProps) {
  return (
    <>
      {preview ? (
        <GroupRankingViewer teamCodes={teamCodes} data={data} isPending={isPending} />
      ) : (
        <GroupRankingEditer teamCodes={teamCodes} data={data} isPending={isPending} />
      )}
    </>
  );
}
