import type { MatchInfo, TeamInfo } from "../../../models/Infos";
import type { PredictKnockout } from "../../../models/Predict";
import { hasMatchFinished, hasMatchStarted } from "../../utils/TimeUtils";
import KnockoutMatchEdit from "./KnockoutMatchEdit";
import KnockoutMatchView from "./KnockoutMatchView";

interface KnockoutMatchProps {
  id: number;
  preview: boolean;
  matches: MatchInfo[];
  knockoutMode: "allTheWay" | "knockout";
  topTeamLabel: string;
  bottomTeamLabel: string;
  topTeam?: TeamInfo;
  bottomTeam?: TeamInfo;
  currentPrediction?: PredictKnockout;
}

export default function KnockoutMatch({
  id,
  preview,
  matches,
  knockoutMode,
  topTeamLabel,
  bottomTeamLabel,
  topTeam,
  bottomTeam,
  currentPrediction,
}: KnockoutMatchProps) {
  const matchInfo = matches.find((match) => match.id === id);
  const isStarted = matchInfo ? hasMatchStarted(matchInfo.date_time) : false;
  const isFinished = matchInfo ? hasMatchFinished(matchInfo.date_time) : false;

  const isViewing = preview || isStarted;

  return isViewing ? (
    <KnockoutMatchView
      id={id}
      isFinished={isFinished}
      matchInfo={matchInfo}
      topTeamLabel={topTeamLabel}
      bottomTeamLabel={bottomTeamLabel}
      topTeam={topTeam}
      bottomTeam={bottomTeam}
      predictedWinner={currentPrediction?.winner}
    />
  ) : (
    <KnockoutMatchEdit
      id={id}
      knockoutMode={knockoutMode}
      topTeamLabel={topTeamLabel}
      bottomTeamLabel={bottomTeamLabel}
      topTeam={topTeam}
      bottomTeam={bottomTeam}
      predictedWinner={currentPrediction?.winner}
    />
  );
}
